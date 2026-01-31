from __future__ import annotations
from typing import Literal, List, Optional, Dict
from pydantic import BaseModel, Field


class RiskFlags(BaseModel):
    self_harm: bool = False
    suicide: bool = False
    harm_others: bool = False
    abuse: bool = False


class SafetyResult(BaseModel):
    severity: Literal["safe", "distressed", "crisis"]
    distress_score: int = Field(ge=0, le=10)
    risk: RiskFlags
    reason: str


class OrchestrationResult(BaseModel):
    distress_score: int = Field(ge=0, le=10)
    mode: Literal["listen", "reflect", "act"]
    route: List[Literal["negative", "neutral", "positive"]]
    allow_positive: bool
    notes: str

    # Explainability fields
    signals: Dict[str, float] = Field(default_factory=dict)
    triggers: List[str] = Field(default_factory=list)
    rule: str = "unknown"
    confidence: float = Field(default=0.6, ge=0.0, le=1.0)


class NegativeOut(BaseModel):
    type: Literal["negative"] = "negative"
    observations: List[str] = Field(min_length=1, max_length=3)
    emotion_labels: List[str] = Field(min_length=1, max_length=3)
    cognitive_patterns: List[str] = Field(default_factory=list, max_length=3)


class NeutralOut(BaseModel):
    type: Literal["neutral"] = "neutral"
    validation: str
    grounding: str
    question: str
    recommend_mode: Literal["listen", "reflect", "act"]


class PositiveOut(BaseModel):
    type: Literal["positive"] = "positive"
    permission_prompt: str
    reframes: List[str] = Field(default_factory=list, max_length=2)
    micro_actions: List[str] = Field(min_length=1, max_length=3)


class ChatRequest(BaseModel):
    session_id: str = Field(default="default")
    message: str


class ChatResponse(BaseModel):
    session_id: str
    safety: SafetyResult
    orchestration: Optional[OrchestrationResult] = None
    reply: str
    ui_actions: Optional[List[UIAction]] = None
    debug: Optional[dict] = None
    route_why: Optional[str] = None


class RouteExplain(BaseModel):
    summary: str
    triggers: List[str]
    rule: str
    evidence_spans: List[str] = Field(default_factory=list)

class UIAction(BaseModel):
    type: Literal["micro_action"] = "micro_action"
    id: Literal[
        "square_breathing",
        "burn_journaling",
        "fact_vs_story",
        "rain_process",
        "two_minute_rule",
    ]
    label: str
    deeplink: str
    params: Dict[str, object] = Field(default_factory=dict)
