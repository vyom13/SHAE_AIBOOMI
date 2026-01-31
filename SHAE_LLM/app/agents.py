import re
import json
from typing import List, Tuple

from .llm_backend import ChatMsg, get_backend
from .prompts import STATE_PROMPT, COACH_PROMPT


# ---------------------------
# 1) SOCIAL AGENT (no LLM)
# ---------------------------

_GREETING_RE = re.compile(r"^\s*(hi|hii+|hello|hey+)\s*[!.]*\s*$", re.IGNORECASE)

def social_agent(user_text: str):
    if _GREETING_RE.match(user_text or ""):
        return "Hi 🙂"
    return None


# ---------------------------
# Helpers: split summary vs turns
# We inject "summary:" as first line in orchestrator.
# ---------------------------

def _split_summary(recent_turns: List[str]) -> Tuple[str, List[str]]:
    """
    recent_turns may include a first line like 'summary: ...'
    Return (summary_text, turns_without_summary)
    """
    if not recent_turns:
        return "", []
    first = recent_turns[0]
    if first.lower().startswith("summary:"):
        return first[len("summary:"):].strip(), recent_turns[1:]
    return "", recent_turns

_JSON_RE = re.compile(r"\{.*\}", re.DOTALL)


# ---------------------------
# 2) STATE AGENT (silent)
# Outputs: intent, arousal, plan_request, needs_help
# ---------------------------

def state_agent(user_text: str, recent_turns: List[str]) -> dict:
    summary, turns = _split_summary(recent_turns)

    # Keep a small window of recent turns, but ALWAYS keep summary if present
    last_turns = turns[-8:]  # small, stable window

    prompt = f"""{STATE_PROMPT}

SESSION SUMMARY (if any):
{summary if summary else "(none)"}

RECENT TURNS:
{chr(10).join(last_turns) if last_turns else "(none)"}

CURRENT USER MESSAGE:
{user_text}

Return JSON only.
"""

    backend = get_backend()
    raw = backend.chat([
        ChatMsg(role="system", content=prompt),
        ChatMsg(role="user", content=user_text),
    ])

    # Parse JSON robustly (HF models sometimes add extra text)
    try:
        m = _JSON_RE.search(raw or "")
        if not m:
            raise ValueError("No JSON found")
        data = json.loads(m.group(0))

        intent = data.get("intent", "other")
        arousal = data.get("arousal", "low")
        plan_request = bool(data.get("plan_request", False))
        needs_help = bool(data.get("needs_help", False))

        # Light heuristic: if user explicitly asks for a plan/routine, treat as plan_request
        text_l = (user_text or "").lower()
        if any(k in text_l for k in ["21 day", "21-day", "plan", "routine", "schedule", "step by step", "program"]):
            plan_request = True

        return {
            "intent": intent if intent in ("greeting", "share", "question", "plan", "other") else "other",
            "arousal": arousal if arousal in ("low", "medium", "high") else "low",
            "plan_request": plan_request,
            "needs_help": needs_help,
        }
    except Exception:
        # Fallback safe defaults
        text_l = (user_text or "").lower()
        return {
            "intent": "other",
            "arousal": "high" if any(k in text_l for k in ["panic", "overwhelmed", "anxious", "can't breathe"]) else "low",
            "plan_request": any(k in text_l for k in ["21 day", "21-day", "plan", "routine", "schedule"]),
            "needs_help": any(k in text_l for k in ["help", "what do i do", "i don't know", "stuck"]),
        }


# ---------------------------
# 3) COACHING AGENT (only speaker beyond social)
# MODE: LISTEN / GROUND / COACH / PLAN
# ---------------------------

def choose_coach_mode(state: dict) -> str:
    """
    Decide whether to invoke the Coach module.

    Returns:
    - "GROUND" → when a micro-action / grounding is more useful than conversation
    - "PLAN"   → when the user explicitly asks for a plan
    - None     → when SHAE should continue the conversation normally
    """

    # 1) Explicit plan request → Coach PLAN
    if state.get("plan_request"):
        return "PLAN"

    # 2) High arousal or clear distress → Coach GROUND
    if state.get("arousal") == "high":
        return "GROUND"

    # 3) User needs help but isn't talk-ready → Coach GROUND
    # (e.g. overwhelmed, stuck, "what do I do", shutdown)
    if state.get("needs_help"):
        return "GROUND"

    # 4) Otherwise, do NOT invoke Coach
    return None


def coaching_agent(mode: str, user_text: str, recent_turns: List[str]) -> str:
    summary, turns = _split_summary(recent_turns)

    # Recent turns window for response quality
    last_turns = turns[-12:]

    prompt = f"""{COACH_PROMPT}
MODE={mode}

SESSION SUMMARY (if any):
{summary if summary else "(none)"}

RECENT TURNS:
{chr(10).join(last_turns) if last_turns else "(none)"}

CURRENT USER MESSAGE:
{user_text}
"""

    backend = get_backend()
    reply = backend.chat([
        ChatMsg(role="system", content=prompt),
        ChatMsg(role="user", content=user_text),
    ]).strip()

    # Hard caps to stop rambling, but preserve UI_ACTION line if present
    lines = [l.rstrip() for l in reply.splitlines() if l.strip()]

    # Keep UI_ACTION line if model produced it
    ui_line = None
    for l in lines[::-1]:
        if l.strip().lower().startswith("ui_action:"):
            ui_line = l.strip()
            break

    # Remove UI_ACTION line from truncation logic; we’ll re-attach at end
    core_lines = [l for l in lines if not l.strip().lower().startswith("ui_action:")]

    if mode == "GROUND":
        # GROUND mode: keep response short (2-3 lines)
        core = "\n".join(core_lines[:3]).strip()
    elif mode == "PLAN":
        # PLAN mode: can be longer for structured plans
        core = "\n".join(core_lines[:10]).strip()
    else:
        # Fallback
        core = "\n".join(core_lines[:3]).strip()

    if ui_line:
        core = (core + "\n\n" + ui_line).strip()

    return core
