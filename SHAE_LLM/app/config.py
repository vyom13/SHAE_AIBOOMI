import os
from dotenv import load_dotenv

# Load .env from project root
load_dotenv(dotenv_path=".env")

BACKEND = os.getenv("BACKEND", "hf_router").strip()

# HuggingFace Router Configuration
# Accept either name to avoid future confusion
HF_TOKEN = (os.getenv("HF_TOKEN") or os.getenv("HF_API_KEY") or "").strip()

HF_CHAT_MODEL = os.getenv(
    "HF_CHAT_MODEL",
    "meta-llama/Llama-3.1-8B-Instruct:cerebras"
).strip()

# Ollama Configuration (for local LLM)
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434/v1").strip()
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.1:8b").strip()

# LLM Parameters
MAX_NEW_TOKENS = int(os.getenv("MAX_NEW_TOKENS", "512"))
TEMPERATURE = float(os.getenv("TEMPERATURE", "0.3"))
TOP_P = float(os.getenv("TOP_P", "0.9"))

APP_ENV = os.getenv("APP_ENV", "dev").strip()
