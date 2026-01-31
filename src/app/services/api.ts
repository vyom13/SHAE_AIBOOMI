// API service for communicating with SHAE LLAMA backend

const API_BASE_URL = 'http://127.0.0.1:8000';

export interface ChatMessage {
  session_id: string;
  message: string;
}

export interface SafetyResult {
  severity: 'safe' | 'distressed' | 'crisis';
  distress_score: number;
  risk: {
    self_harm: boolean;
    suicide: boolean;
    harm_others: boolean;
    abuse: boolean;
  };
  reason: string;
}

export interface OrchestrationResult {
  distress_score: number;
  mode: 'listen' | 'reflect' | 'act';
  route: Array<'negative' | 'neutral' | 'positive'>;
  allow_positive: boolean;
  notes: string;
  signals?: Record<string, number>;
  triggers?: string[];
  rule?: string;
  confidence?: number;
}

export interface UIAction {
  type: 'micro_action';
  id: 'square_breathing' | 'burn_journaling' | 'fact_vs_story' | 'rain_process' | 'two_minute_rule';
  label: string;
  deeplink: string;
  params?: Record<string, any>;
}

export interface ChatResponse {
  session_id: string;
  safety: SafetyResult;
  orchestration: OrchestrationResult | null;
  reply: string;
  ui_actions?: UIAction[] | null;
  debug?: any;
  route_why?: string | null;
}

/**
 * Send a message to the SHAE backend and get a response
 */
export async function sendMessage(sessionId: string, message: string): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: ChatResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling SHAE API:', error);
    throw error;
  }
}

/**
 * Check if the backend is healthy
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data.ok === true;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}
