import json
import re
from typing import Type, TypeVar, Optional
from pydantic import BaseModel, ValidationError

T = TypeVar("T", bound=BaseModel)

_JSON_RE = re.compile(r"\{.*\}", re.DOTALL)

def extract_json(text: str) -> Optional[str]:
    text = text.strip()
    # If the model wrapped JSON in prose, grab the first {...} block.
    m = _JSON_RE.search(text)
    return m.group(0) if m else None

def parse_model(text: str, model: Type[T]) -> T:
    raw = extract_json(text) or text
    data = json.loads(raw)
    return model.model_validate(data)

def build_fix_prompt(bad_text: str, error: str) -> str:
    return (
        "Your previous output was not valid JSON for the required schema.\n"
        f"Validation error: {error}\n"
        "Return ONLY corrected JSON. No prose.\n"
        f"Bad output:\n{bad_text}"
    )
