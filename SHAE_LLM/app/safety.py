from pydantic import ValidationError

from .llm_backend import ChatMsg, get_backend
from .schemas import SafetyResult
from .prompts import SAFETY_SYSTEM
from .json_utils import parse_model, build_fix_prompt

_backend = get_backend()

def run_safety(user_message: str, retries: int = 2) -> SafetyResult:
    msgs = [
        ChatMsg("system", SAFETY_SYSTEM),
        ChatMsg("user", user_message),
    ]
    text = _backend.chat(msgs)

    for _ in range(retries + 1):
        try:
            return parse_model(text, SafetyResult)
        except (ValidationError, ValueError) as e:
            fix = build_fix_prompt(text, str(e))
            text = _backend.chat([ChatMsg("system", SAFETY_SYSTEM), ChatMsg("user", fix)])

    # If still failing, default conservative
    return SafetyResult(
        severity="distressed",
        distress_score=6,
        risk={"self_harm": False, "suicide": False, "harm_others": False, "abuse": False},
        reason="Parser failed; defaulting to distressed for safety."
    )
