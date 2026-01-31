from __future__ import annotations
from dataclasses import dataclass
from typing import List
from .prompts import SHAE_MASTER_SYSTEM

from openai import OpenAI
from .config import (
    BACKEND,
    HF_TOKEN,
    HF_CHAT_MODEL,
    OLLAMA_BASE_URL,
    OLLAMA_MODEL,
    MAX_NEW_TOKENS,
    TEMPERATURE,
    TOP_P,
)

ROUTER_BASE_URL = "https://router.huggingface.co/v1"

@dataclass
class ChatMsg:
    role: str  # "system" | "user" | "assistant"
    content: str

class LLMBackend:
    def __init__(self):
        self.backend_type = BACKEND.lower()

        if self.backend_type == "ollama":
            # Ollama backend - runs locally
            print(f"[LLM] Using Ollama backend at {OLLAMA_BASE_URL} with model {OLLAMA_MODEL}")
            self.client = OpenAI(
                base_url=OLLAMA_BASE_URL,
                api_key="ollama",  # Ollama doesn't need a real API key
            )
            self.model = OLLAMA_MODEL
        elif self.backend_type == "hf_router":
            # HuggingFace Router backend
            if not HF_TOKEN:
                raise RuntimeError("HF_TOKEN missing. Create a HF token with Inference Providers permission.")
            print(f"[LLM] Using HuggingFace Router with model {HF_CHAT_MODEL}")
            self.client = OpenAI(
                base_url=ROUTER_BASE_URL,
                api_key=HF_TOKEN,
            )
            self.model = HF_CHAT_MODEL
        else:
            raise RuntimeError(f"Unknown BACKEND type: {BACKEND}. Use 'ollama' or 'hf_router'")

    def chat(self, messages: List[ChatMsg]) -> str:
        # Extract ONLY the user message and the agent-specific instruction
        user_msgs = [m for m in messages if m.role == "user"]
        system_msgs = [m for m in messages if m.role == "system"]

        # Merge all system instructions into ONE string
        merged_system = SHAE_MASTER_SYSTEM
        if system_msgs:
            merged_system += "\n\nADDITIONAL TASK INSTRUCTIONS:\n"
            merged_system += "\n".join(m.content for m in system_msgs)

        final_messages = [
            {"role": "system", "content": merged_system},
            *({"role": "user", "content": m.content} for m in user_msgs),
        ]

        resp = self.client.chat.completions.create(
            model=self.model,
            messages=final_messages,
            temperature=TEMPERATURE,
            top_p=TOP_P,
            max_tokens=MAX_NEW_TOKENS,
        )
        return (resp.choices[0].message.content or "").strip()

_backend_singleton = None

def get_backend() -> LLMBackend:
    global _backend_singleton
    if _backend_singleton is None:
        _backend_singleton = LLMBackend()
    return _backend_singleton
