\# SHAE HF Agentic MVP (Negative / Neutral / Positive)



\## Setup

python -m venv .venv

source .venv/bin/activate  # windows: .venv\\Scripts\\activate

pip install -r requirements.txt



cp .env.example .env

\# Fill in HF\_TOKEN if using gated models (like Meta Llama).

\# BACKEND=local or BACKEND=hf\_endpoint



\## Run

uvicorn app.main:app --reload

OR

uvicorn app.main:app --log-level debug --port 8001


\## Test

POST http://127.0.0.1:8000/chat

{

  "session\_id": "demo",

  "message": "I feel overwhelmed and stuck."

}



\## Notes

\- Safety check runs BEFORE response generation is returned.

\- No post-output safety check (MVP).

\- JSON outputs enforced by Pydantic + retry-on-fail.

