import { useState, useRef, useEffect } from 'react'
import { Send, Bot, ChevronRight, X, Minimize2 } from 'lucide-react'
import { useLang } from '../../hooks/useLang'
import { chatbotService } from '../../services/api'
import './ChatbotWidget.css'

export default function ChatbotWidget({ standalone = false }) {
  const { t } = useLang()
  const [messages, setMessages] = useState([
    { from: 'bot', text: t.chatbot.greeting, time: '10:30 AM' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [suggestions, setSuggestions] = useState(() => t.chatbot.options)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const sessionId = useRef(crypto.randomUUID())

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const now = () =>
    new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })

  const sendMessage = async (text) => {
    const userText = text.trim()
    if (!userText || loading) return

    setInput('')
    setMessages(m => [...m, { from: 'user', text: userText, time: now() }])
    setSuggestions([])
    setLoading(true)

    try {
      const data = await chatbotService.sendMessage(userText, sessionId.current)
      setMessages(m => [...m, { from: 'bot', text: data.reply, time: now() }])
      setSuggestions(data.suggestions || [])
    } catch {
      setMessages(m => [...m, {
        from: 'bot',
        text: '⚠️ Error al conectar. Intenta más tarde.',
        time: now(),
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className={`chatbot-widget${standalone ? ' chatbot-widget--standalone' : ''}${minimized ? ' chatbot-widget--minimized' : ''}`}
         role="complementary"
         aria-label="Chatbot de orientación">
      {/* Header */}
      <div className="chatbot-widget__header">
        <div className="chatbot-widget__header-info">
          <div className="chatbot-widget__avatar">
            <Bot size={20} />
          </div>
          <div>
            <p className="chatbot-widget__title">{t.chatbot.title}</p>
            <p className="chatbot-widget__status">
              <span className="chatbot-widget__dot" />
              {t.hero.online}
            </p>
          </div>
        </div>
        <button
          className="chatbot-widget__min-btn"
          onClick={() => setMinimized(m => !m)}
          aria-label={minimized ? 'Expandir chatbot' : 'Minimizar chatbot'}
        >
          <Minimize2 size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="chatbot-widget__body">
        {/* Messages */}
        <div className="chatbot-widget__messages" role="log" aria-live="polite" aria-label="Mensajes del chatbot">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-msg chatbot-msg--${msg.from}`}>
              <p className="chatbot-msg__text">{msg.text}</p>
              <span className="chatbot-msg__time">{msg.time}</span>
            </div>
          ))}
          {loading && (
            <div className="chatbot-msg chatbot-msg--bot">
              <div className="chatbot-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Guided options returned by the backend */}
        {suggestions.length > 0 && !loading && (
          <div className="chatbot-widget__options">
            {suggestions.map((opt, i) => (
              <button
                key={i}
                className="chatbot-option"
                onClick={() => sendMessage(opt)}
              >
                <span>{opt}</span>
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chatbot-widget__input-row">
          <input
            ref={inputRef}
            type="text"
            className="chatbot-widget__input"
            placeholder={t.chatbot.placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
            aria-label="Escribe tu mensaje al chatbot"
          />
          <button
            className="chatbot-widget__send"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            aria-label="Enviar mensaje"
          >
            <Send size={16} />
          </button>
        </div>

        <p className="chatbot-widget__notice">
          Orientación educativa e informativa; no sustituye asesoría legal ni atención de emergencias.
        </p>
      </div>
    </div>
  )
}
