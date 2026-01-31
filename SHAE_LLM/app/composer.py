from typing import Optional

from .llm_backend import ChatMsg, get_backend
from .schemas import NegativeOut, NeutralOut, PositiveOut
from .prompts import COMPOSER_SYSTEM

_backend = get_backend()

def compose_reply(
    user_message: str,
    negative: Optional[NegativeOut],
    neutral: Optional[NeutralOut],
    positive: Optional[PositiveOut],
) -> str:
    bundle = {
        "user_message": user_message,
        "negative": negative.model_dump() if negative else None,
        "neutral": neutral.model_dump() if neutral else None,
        "positive": positive.model_dump() if positive else None,
    }

    msgs = [
        ChatMsg("system", COMPOSER_SYSTEM),
        ChatMsg("user", str(bundle)),
    ]
    return _backend.chat(msgs).strip()
