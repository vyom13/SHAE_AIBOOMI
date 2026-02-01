from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import traceback
from .memory_sqlite import init_db
from .explain import explain_route
from .schemas import ChatRequest, ChatResponse, SafetyResult
from .safety import run_safety
from .orchestrator import run_orchestrator

app = FastAPI(title="SHAE HF Agentic MVP", version="0.1.0")
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def crisis_response() -> str:
    return (
        "I'm really sorry you're feeling this way. "
        "If you're in immediate danger or thinking about harming yourself, "
        "please reach out for help right now:\n\n"
        "• Tele MANAS: 14416 or 1800-891-4416 (24/7, free)\n"
        "• Vandrevala Foundation: 1860-2662-345 or 1800-2333-330 (24/7, free)\n"
        "• AASRA: 91-22-2754-6669 (24/7)\n"
        "• iCall: 022-2556-3291 (Mon-Sat, 8am-10pm)\n"
        "• Snehi: 91-22-2772-6771 (24/7)\n\n"
        "Or reach out to someone you trust, or contact emergency services (112).\n\n"
        "Are you safe right now?"
    )

def _dump(x):
    """Return a plain dict if x is a Pydantic model; otherwise return x unchanged."""
    return x.model_dump() if hasattr(x, "model_dump") else x

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    try:
        session_id = req.session_id
        user_message = (req.message or "").strip()

        # 0) Keyword-based crisis detection (fallback before LLM safety check)
        crisis_keywords = [
            "kill myself", "end my life", "suicide", "suicidal",
            "want to die", "better off dead", "plan to die",
            "harm myself", "hurt myself", "cut myself"
        ]
        msg_lower = user_message.lower()
        if any(keyword in msg_lower for keyword in crisis_keywords):
            from .schemas import SafetyResult, RiskFlags
            crisis_safety = SafetyResult(
                severity="crisis",
                distress_score=10,
                risk=RiskFlags(self_harm=True, suicide=True, harm_others=False, abuse=False),
                reason="Keyword-based crisis detection"
            )
            resp = ChatResponse(
                session_id=session_id,
                safety=_dump(crisis_safety),
                orchestration=None,
                reply=crisis_response(),
                debug={"route": [], "note": "keyword crisis detection"},
            )
            return resp.model_dump()

        # 1) Safety layer
        safety: SafetyResult = run_safety(user_message)
        if safety.severity == "crisis":
            resp = ChatResponse(
                session_id=session_id,
                safety=_dump(safety),
                orchestration=None,
                reply=crisis_response(),
                debug={"route": [], "note": "crisis short-circuit"},
            )
            return resp.model_dump()

        # 2) New 3-agent pipeline (Social -> State -> Coaching)
        # run_orchestrator should return:
        # - reply: str
        # - orchestration: dict (or pydantic model) with routing info
        # - debug: dict
        result = run_orchestrator(
            user_message=user_message,
            safety=safety,
            session_id=session_id,
        )

        reply = result["reply"]
        orch = result.get("orchestration")
        ui_actions = result.get("ui_actions")
        debug = result.get("debug", {})

        resp = ChatResponse(
            session_id=session_id,
            safety=_dump(safety),
            orchestration=_dump(orch) if orch is not None else None,
            reply=reply,
            ui_actions=[_dump(action) for action in ui_actions] if ui_actions else None,
            debug=debug,
        )
        return resp.model_dump()

    except Exception as e:
        print("\n=== /chat ERROR ===")
        print(repr(e))
        traceback.print_exc()
        print("=== END ERROR ===\n")
        raise HTTPException(status_code=500, detail=str(e))

@app.exception_handler(Exception)
async def all_exception_handler(request: Request, exc: Exception):
    print("\n=== GLOBAL EXCEPTION ===")
    print("PATH:", request.url.path)
    print("ERROR:", repr(exc))
    traceback.print_exc()
    print("=== END GLOBAL EXCEPTION ===\n")
    return JSONResponse(status_code=500, content={"detail": str(exc)})
