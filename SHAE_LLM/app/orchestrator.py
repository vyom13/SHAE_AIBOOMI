from .agents import social_agent, state_agent, choose_coach_mode, coaching_agent
import re
from .schemas import UIAction
from .prompts import ALLOWED_UI_ACTIONS
from .memory_sqlite import (
    get_turn_count,
    get_last_turns,
    get_old_turns_excluding_last,
    delete_old_turns_excluding_last,
    append_turn,
    get_summary,
    set_summary,
)
from .llm_backend import ChatMsg, get_backend
from .prompts import SESSION_SUMMARY_PROMPT

_UI_ACTION_RE = re.compile(r"^\s*UI_ACTION:\s*(\w+)\s*$", re.MULTILINE)
# =========================
# Memory tuning constants
# =========================

KEEP_LAST_TURNS = 12          # how many recent turns go verbatim into the prompt
SUMMARIZE_AFTER_TURNS = 24    # when total turns exceed this, summarize older ones
def _format_turns(turns):
    return "\n".join([f"{role}: {text}" for role, text in turns])

def maybe_update_summary(session_id: str) -> None:
    total = get_turn_count(session_id)
    if total <= SUMMARIZE_AFTER_TURNS:
        return

    old_turns = get_old_turns_excluding_last(session_id, KEEP_LAST_TURNS)
    if not old_turns:
        return

    existing = get_summary(session_id)
    chunk_text = _format_turns(old_turns)

    backend = get_backend()
    prompt = f"""{SESSION_SUMMARY_PROMPT}

EXISTING SUMMARY:
{existing}

NEW CHUNK TO INCORPORATE:
{chunk_text}
"""

    new_summary = backend.chat([
        ChatMsg(role="system", content=prompt),
        ChatMsg(role="user", content="Update the summary."),
    ]).strip()

    set_summary(session_id, new_summary)

    # OPTIONAL: comment this out if you want DB to retain all turns forever
    # delete_old_turns_excluding_last(session_id, KEEP_LAST_TURNS)

def extract_ui_action(reply: str):
    if not reply:
        return reply, None

    print(f"[DEBUG] Raw reply: {repr(reply)}")
    m = _UI_ACTION_RE.search(reply)
    if not m:
        print("[DEBUG] No UI_ACTION match found")
        return reply.strip(), None

    action_id = m.group(1).strip()
    print(f"[DEBUG] Found UI_ACTION: {action_id}")

    # Remove the UI_ACTION line from the user-facing reply
    clean_reply = _UI_ACTION_RE.sub("", reply).strip()
    print(f"[DEBUG] Clean reply: {repr(clean_reply)}")

    if action_id not in ALLOWED_UI_ACTIONS:
        print(f"[DEBUG] Action {action_id} not in ALLOWED_UI_ACTIONS")
        return clean_reply, None  # safety fallback

    meta = ALLOWED_UI_ACTIONS[action_id]

    return clean_reply, UIAction(
        id=action_id,
        label=meta["label"],
        deeplink=meta["deeplink"],
        params=meta["params"],
    )

def _orch_payload(route: list[str], mode: str, notes: str, distress_score: int = 0, allow_positive: bool = True):
    """
    Build an orchestration dict that matches your existing Pydantic schema.
    """
    return {
        "route": route,                  # must be: negative|neutral|positive
        "mode": mode,                    # must be: listen|reflect|act
        "distress_score": distress_score,
        "allow_positive": allow_positive,
        "notes": notes,
    }

def run_orchestrator(user_message: str, safety, session_id: str):
    # 0) Update rolling summary (if chat is long)
    maybe_update_summary(session_id)

    # 1) Load memory context for this session
    summary = get_summary(session_id)
    recent = get_last_turns(session_id, KEEP_LAST_TURNS)
    recent_turns = [f"{role}: {text}" for role, text in recent]
    if summary:
        recent_turns = [f"summary: {summary}"] + recent_turns

    # 2) Social short-circuit (no LLM)
    sr = social_agent(user_message)
    if sr:
        reply = sr
        ui_action = None

        orch = _orch_payload(
            route=["neutral"],
            mode="listen",
            notes="social short-circuit (hi->hi)",
            distress_score=0,
            allow_positive=True,
        )

        # ✅ 3E: persist turns
        append_turn(session_id, "user", user_message)
        append_turn(session_id, "assistant", reply)

        return {
            "reply": reply,
            "orchestration": orch,
            "ui_actions": None,
            "debug": {
                "route": orch["route"],
                "mode": orch["mode"],
                "coach_mode": "SOCIAL",
                "ui_action": None,
            },
        }

    # 3) State agent (silent)
    state = state_agent(user_message, recent_turns)

    # 4) Coaching agent (only speaker beyond social)
    coach_mode = choose_coach_mode(state)  # LISTEN/GROUND/COACH/PLAN
    raw_reply = coaching_agent(coach_mode, user_message, recent_turns)
    reply, ui_action = extract_ui_action(raw_reply)

    # 5) Map coach_mode -> legacy mode
    legacy_mode = "listen" if coach_mode == "LISTEN" else "act"

    # 6) Map state -> legacy route + distress_score
    if state.get("needs_help") or state.get("arousal") == "high":
        legacy_route = ["negative"]
        distress = 7 if state.get("arousal") == "high" else 4
        allow_positive = False
    else:
        legacy_route = ["neutral"]
        distress = 1
        allow_positive = True

    notes = f"coaching:{coach_mode} via state(needs_help={state.get('needs_help')}, arousal={state.get('arousal')})"

    orch = _orch_payload(
        route=legacy_route,
        mode=legacy_mode,
        notes=notes,
        distress_score=distress,
        allow_positive=allow_positive,
    )

    # ✅ 3E: persist turns
    append_turn(session_id, "user", user_message)
    append_turn(session_id, "assistant", reply)

    return {
        "reply": reply,
        "orchestration": orch,
        "ui_actions": [ui_action] if ui_action else None,
        "debug": {
            "route": orch["route"],
            "mode": orch["mode"],
            "state": state,
            "coach_mode": coach_mode,
            "ui_action": ui_action.id if ui_action else None,
        },
    }
