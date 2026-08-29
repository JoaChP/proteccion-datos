import { useState, useRef, useEffect } from 'react'
import { Bot, ChevronRight, Minimize2 } from 'lucide-react'
import { useLang } from '../../hooks/useLang'
import { chatbotService } from '../../services/api'
import './ChatbotWidget.css'

export default function ChatbotWidget({ standalone = false }) {
  const { t } = useLang()

  const [messages, setMessages] = useState([
    { from: 'bot', text: t.chatbot.greeting, time: '10:30 AM' },
  ])

  const [loading, setLoading] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [suggestions, setSuggestions] = useState(() => t.chatbot.options)

  const bottomRef = useRef(null)
  const sessionId = useRef(crypto.randomUUID())

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, suggestions])

  const now = () =>
    new Date().toLocaleTimeString('es-CR', {
      hour: '2-digit',
      minute: '2-digit',
    })

  const sendMessage = async (text) => {
    const userText = text.trim()

    if (!userText || loading) return

    setMessages(m => [
      ...m,
      {
        from: 'user',
        text: userText,
        time: now(),
      },
    ])

    setSuggestions([])
    setLoading(true)

    try {
      const data = await chatbotService.sendMessage(
        userText,
        sessionId.current
      )

      setMessages(m => [
        ...m,
        {
          from: 'bot',
          text: data.reply,
          time: now(),
        },
      ])

      setSuggestions(data.suggestions || [])
    } catch {
      setMessages(m => [
        ...m,
        {
          from: 'bot',
          text: '⚠️ Error al conectar. Intenta más tarde.',
          time: now(),
        },
      ])

      setSuggestions([
        '🏠 Volver al inicio',
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`chatbot-widget${
        standalone ? ' chatbot-widget--standalone' : ''
      }${
        minimized ? ' chatbot-widget--minimized' : ''
      }`}
      role="complementary"
      aria-label="Chatbot de orientación"
    >
      {/* =====================================================
          HEADER
          ===================================================== */}
      <div className="chatbot-widget__header">
        <div className="chatbot-widget__header-info">
          <div className="chatbot-widget__avatar">
            <Bot size={20} />
          </div>

          <div>
            <p className="chatbot-widget__title">
              {t.chatbot.title}
            </p>

            <p className="chatbot-widget__status">
              <span className="chatbot-widget__dot" />
              {t.hero.online}
            </p>
          </div>
        </div>

        <button
          className="chatbot-widget__min-btn"
          onClick={() => setMinimized(m => !m)}
          aria-label={
            minimized
              ? 'Expandir chatbot'
              : 'Minimizar chatbot'
          }
        >
          <Minimize2 size={14} />
        </button>
      </div>

      {/* =====================================================
          BODY
          ===================================================== */}
      <div className="chatbot-widget__body">

        {/* ===================================================
            MENSAJES
            =================================================== */}
        <div
          className="chatbot-widget__messages"
          role="log"
          aria-live="polite"
          aria-label="Mensajes del chatbot"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chatbot-msg chatbot-msg--${msg.from}`}
            >
              <p className="chatbot-msg__text">
                {msg.text}
              </p>

              <span className="chatbot-msg__time">
                {msg.time}
              </span>
            </div>
          ))}

          {/* Indicador de procesamiento */}
          {loading && (
            <div className="chatbot-msg chatbot-msg--bot">
              <div className="chatbot-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ===================================================
            OPCIONES GUIADAS
            =================================================== */}
        {!loading && suggestions.length > 0 && (
          <div
            className="chatbot-widget__options"
            role="group"
            aria-label="Opciones disponibles"
          >
            {suggestions.map((opt, i) => (
              <button
                key={`${opt}-${i}`}
                type="button"
                className="chatbot-option"
                onClick={() => sendMessage(opt)}
                disabled={loading}
              >
                <span>{opt}</span>
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
        )}

        {/* ===================================================
            AVISO
            =================================================== */}
        <p className="chatbot-widget__notice">
          Orientación educativa e informativa; no sustituye
          asesoría legal ni atención de emergencias.
        </p>
      </div>
    </div>
  )
}