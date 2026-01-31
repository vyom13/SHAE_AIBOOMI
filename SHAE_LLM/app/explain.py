from typing import Optional
from .schemas import SafetyResult, OrchestrationResult

def explain_route(safety: SafetyResult, orch: Optional[OrchestrationResult]) -> str:
    # Crisis is a special case
    if safety.severity == "crisis":
        return "Safety layer detected high risk. Returned crisis-safe response and skipped agent routing."

    if orch is None:
        return "No orchestration result available."

    route = ", ".join(orch.route) if orch.route else "none"

    # Map common triggers to plain-English phrases (customize anytime)
    trigger_map = {
        "high_distress": "high distress signals",
        "overwhelm_language": "overwhelm language",
        "hopeless_language": "hopelessness cues",
        "asked_for_steps": "user asked for actionable steps",
        "confusion": "confusion/uncertainty cues",
        "rumination": "rumination cues",
        "panic": "panic/anxiety cues",
        "fallback_routing": "fallback routing (parser failed)",
    }

    readable_triggers = []
    for t in (orch.triggers or []):
        readable_triggers.append(trigger_map.get(t, t.replace("_", " ")))

    # Keep it short for Swagger
    parts = [
        f"Route: [{route}].",
        f"Rule: {orch.rule}.",
    ]

    if readable_triggers:
        parts.append("Signals: " + ", ".join(readable_triggers) + ".")

    parts.append(f"Distress score: {orch.distress_score}/10. Allow positive: {orch.allow_positive}.")
    parts.append(f"Confidence: {orch.confidence:.2f}.")

    return " ".join(parts)
