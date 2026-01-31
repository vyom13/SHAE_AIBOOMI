/**
 * Session management utilities for SHAE app
 */

const SESSION_KEY = 'shae_session_id';

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get or create a session ID
 * Persists in localStorage to maintain conversation context across page reloads
 */
export function getSessionId(): string {
  // Try to get existing session from localStorage
  const existingSession = localStorage.getItem(SESSION_KEY);

  if (existingSession) {
    return existingSession;
  }

  // Generate new session ID
  const newSession = generateSessionId();
  localStorage.setItem(SESSION_KEY, newSession);
  return newSession;
}

/**
 * Clear the current session (useful for starting fresh conversation)
 */
export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Update session ID (e.g., when user logs in)
 */
export function setSessionId(sessionId: string): void {
  localStorage.setItem(SESSION_KEY, sessionId);
}
