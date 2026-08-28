/**
 * API Service Layer
 * ─────────────────────────────────────────────────────
 * Replace BASE_URL with your Python/FastAPI backend URL.
 * All endpoints are pre-wired; swap mock data with real
 * fetch calls when the backend is ready.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

// Generic fetch wrapper
async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!response.ok) throw new Error(`API error ${response.status}`)
  return response.json()
}

// ─── Chatbot ─────────────────────────────────────────
export const chatbotService = {
  /**
   * Send a message to the chatbot
   * POST /chatbot/message
   * Body: { message: string, session_id: string }
   * Returns: { reply: string, suggestions: string[] }
   */
  sendMessage: (message, sessionId) =>
    apiFetch('/chatbot/message', {
      method: 'POST',
      body: JSON.stringify({ message, session_id: sessionId }),
    }),

  /** GET /chatbot/options — initial quick-reply options */
  getOptions: () => apiFetch('/chatbot/options'),
}

// ─── Resources / Videos ──────────────────────────────
export const resourcesService = {
  /** GET /resources?category=&page= */
  getResources: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return apiFetch(`/resources${qs ? `?${qs}` : ''}`)
  },

  /** GET /resources/videos */
  getVideos: () => apiFetch('/resources/videos'),

  /** GET /resources/guides */
  getGuides: () => apiFetch('/resources/guides'),
}

// ─── Law / Legal content ─────────────────────────────
export const legalService = {
  /** GET /legal/law-8968 */
  getLaw8968: () => apiFetch('/legal/law-8968'),

  /** GET /legal/rights */
  getRights: () => apiFetch('/legal/rights'),
}

// ─── Analytics (optional) ────────────────────────────
export const analyticsService = {
  /** POST /analytics/event */
  logEvent: (event, data) =>
    apiFetch('/analytics/event', {
      method: 'POST',
      body: JSON.stringify({ event, data, timestamp: new Date().toISOString() }),
    }),
}

export default { chatbotService, resourcesService, legalService, analyticsService }
