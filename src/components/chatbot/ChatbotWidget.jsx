import { useState, useRef, useEffect } from 'react'
import { Bot, ChevronRight, Minimize2, ShieldCheck, BookOpen, CheckCircle, Home } from 'lucide-react'
import { useLang } from '../../hooks/useLang'
import { chatbotService } from '../../services/api'
import './ChatbotWidget.css'
import ChatAnswer from './ChatAnswer'

const starters = [
  { title: 'Necesito orientación', description: 'Elige lo que ocurrió y conoce qué puedes hacer y dónde buscar apoyo.', value: 'Orientación ante una situación', icon: ShieldCheck },
  { title: 'Quiero aprender y practicar', description: 'Comprende un tema con ejemplos y practica decisiones paso a paso.', value: 'Educación y simulación', icon: BookOpen },
  { title: 'Quiero revisar mis hábitos', description: 'Responde sobre tus prácticas y descubre qué puedes mejorar.', value: 'Evaluar mis prácticas digitales', icon: CheckCircle },
]
const safeSources = sources => Array.isArray(sources) ? sources.filter(source => {
  try { return typeof source.title === 'string' && ['https:', 'http:'].includes(new URL(source.url).protocol) } catch { return false }
}) : []

export default function ChatbotWidget({ standalone = false }) {
  const { t, lang } = useLang()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [progress, setProgress] = useState(null)
  const [simulation, setSimulation] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [route, setRoute] = useState(null)
  const scrollRef = useRef(null)
  const pending = useRef(false)
  const sessionId = useRef(crypto.randomUUID())
  const history = useRef([])
  useEffect(() => {
    const panel = scrollRef.current
    if (!panel) return
    if (!messages.length) { panel.scrollTop = 0; return }
    const latest = panel.querySelector('.chatbot-msg--bot:last-of-type')
    if (!loading && latest) {
      panel.scrollTop += latest.getBoundingClientRect().top - panel.getBoundingClientRect().top - 16
    } else panel.scrollTop = panel.scrollHeight
  }, [messages, suggestions, loading])

  const sendMessage = async (text, displayText = text) => {
    const value = text.trim()
    if (!value || pending.current || value.length > 1000) return
    pending.current = true
    const selectedRoute = starters.find(item => value.includes(item.value))
    if (selectedRoute) setRoute(selectedRoute.title)
    else if (/Quiero aprender|Elegir otro tema|Hacer una simulación|Simulación educativa/.test(value)) setRoute(starters[1].title)
    else if (/derechos|denunciar|PRODHAB/.test(value)) setRoute(starters[0].title)
    const now = () => new Date().toLocaleTimeString(lang === 'en' ? 'en-US' : 'es-CR', { hour: '2-digit', minute: '2-digit' })
    setMessages(items => [...items, { from: 'user', text: displayText.trim(), time: now() }])
    setSuggestions([])
    setProgress(null)
    setSimulation(null)
    setFeedback(null)
    setLoading(true)
    try {
      const startsRoute = starters.some(item => value.includes(item.value)) || /Hacer una simulación|Simulación educativa|Quiero aprender|Elegir otro tema|Volver al inicio/.test(value)
      const previousChoices = startsRoute ? [] : history.current
      const data = await chatbotService.sendMessage(value, sessionId.current, lang, previousChoices)
      history.current = [...previousChoices, value]
      setProgress(data.progress || null)
      setSimulation(data.simulation || null)
      setFeedback(data.feedback || null)
      setMessages(items => [...items, { from: 'bot', text: data.reply, time: now(), sources: safeSources(data.sources), areas: data.areas || [] }])
      setSuggestions((data.suggestions || []).map((value, index) => ({ value, label: data.display_suggestions?.[index] || value })))
    } catch {
      setMessages(items => [...items, { from: 'bot', text: 'No se pudo conectar con el asistente. Puedes volver a intentar tu consulta.', time: now() }])
      setSuggestions([{ value, label: 'Reintentar consulta', display: displayText }])
    } finally {
      pending.current = false
      setLoading(false)
    }
  }

  const decision = !loading && suggestions.length > 0 && <section className="chatbot-decision" aria-label="Siguiente paso"><h2>{simulation?.phase === 'decision' ? '¿Qué harías en esta situación?' : 'Selecciona cómo continuar'}</h2><div className="chatbot-widget__options" role="group" aria-label="Opciones para continuar">{suggestions.map((opt, index) => <button key={`${opt.value}-${index}`} className="chatbot-option" onClick={() => sendMessage(opt.value, opt.display || opt.label)}><span className="chat-option-number" aria-hidden="true">{/^[ABC]\)/.test(opt.value) ? opt.value[0] : String(index + 1).padStart(2, '0')}</span><span>{opt.label.replace(/^[ABC]\)\s*/, '')}</span><ChevronRight size={18} aria-hidden="true" /></button>)}</div></section>

  return <section className={`chatbot-widget${standalone ? ' chatbot-widget--standalone' : ''}${messages.length === 0 ? ' chatbot-widget--welcome' : ''}${minimized ? ' chatbot-widget--minimized' : ''}`} aria-label="Chatbot de orientación">
    <div className="chatbot-widget__header">
      <div className="chatbot-widget__header-info">
        <div className="chatbot-widget__avatar"><Bot size={24} aria-hidden="true" /></div>
        <div>{standalone ? <h1 className="chatbot-widget__title">{t.chatbot.title}</h1> : <h2 className="chatbot-widget__title">{t.chatbot.title}</h2>}<p className="chatbot-widget__status">Asistente educativo · Costa Rica</p></div>
      </div>
      {messages.length > 0 && <button className="chatbot-home" disabled={loading} onClick={() => {
        sessionId.current = crypto.randomUUID()
        history.current = []
        setMessages([]); setSuggestions([]); setProgress(null); setSimulation(null); setFeedback(null); setRoute(null)
      }}><Home size={18} aria-hidden="true" /> Volver al inicio</button>}
      {!standalone && <button className="chatbot-widget__min-btn" onClick={() => setMinimized(value => !value)} aria-label={minimized ? 'Expandir chatbot' : 'Minimizar chatbot'} aria-expanded={!minimized}><Minimize2 size={20} /></button>}
    </div>
    <div className="chatbot-workspace">
      {standalone && <aside className="chatbot-route-panel" aria-label="Recorridos del asistente">
        <span className="chatbot-route-panel__eyebrow">TU ESPACIO DE ORIENTACIÓN</span>
        <h2>Protege. Comprende. Decide.</h2>
        <p>Tres recorridos para fortalecer tu ciudadanía digital.</p>
        <nav aria-label="Elegir un recorrido">{starters.map(({ title, description, value, icon: Icon }, index) => <button key={value} disabled={loading} aria-current={route === title ? 'step' : undefined} onClick={() => sendMessage(value, title)}><span className="chat-route-number">0{index + 1}</span><Icon size={20} aria-hidden="true" /><span><strong>{title}</strong><small>{description}</small></span></button>)}</nav>
        <div className="chatbot-route-context"><strong>{route || 'Elige tu punto de partida'}</strong><p>{route ? 'Cada elección abre el siguiente paso. Puedes cambiar de recorrido o empezar de nuevo.' : 'No necesitas conocimientos técnicos. Selecciona la opción que se acerque a lo que necesitas.'}</p></div>
        <span className="chatbot-route-panel__foot">Costa Rica · Privacidad · Aprendizaje</span>
      </aside>}
    <div className="chatbot-widget__body">
      {route && <div className="chatbot-breadcrumb"><span>{route}</span><span>{simulation ? 'Práctica guiada' : progress ? `Pregunta ${progress.current} de ${progress.total}` : 'Plan de orientación'}</span></div>}
      {simulation && <div className="chat-simulation" aria-label="Progreso de la simulación"><strong>{simulation.title}</strong><ol>{['Reconocer', 'Verificar', 'Actuar', 'Dar seguimiento'].map((label, index) => <li key={label} aria-current={simulation.current === index + 1 ? 'step' : undefined} className={index + 1 < simulation.current || simulation.phase === 'complete' ? 'is-complete' : ''}><span>{index + 1}</span>{label}</li>)}</ol><p>{simulation.phase === 'complete' ? 'Recorrido completado · Revisa tus decisiones abajo' : simulation.phase === 'feedback' ? 'Lee la explicación y continúa cuando estés listo.' : `Paso ${simulation.current} de ${simulation.total} · Elige una respuesta; no necesitas escribir.`}</p></div>}
      {feedback && <div className={`chat-feedback ${feedback.correct ? 'chat-feedback--correct' : 'chat-feedback--improve'}`} role="status"><strong>{feedback.correct ? '✓ Respuesta correcta' : '↗ Respuesta incorrecta · Puedes mejorar'}</strong><p><b>La opción correcta es:</b> {feedback.answer}</p></div>}
      <div className="chatbot-widget__messages" ref={scrollRef}>
        {messages.length === 0 && <div className="chatbot-welcome">
          <span className="chatbot-welcome__icon"><ShieldCheck size={32} aria-hidden="true" /></span>
          <span className="chat-welcome-label">PROYECTO ACADÉMICO · COSTA RICA</span>
          <h2>Una decisión informada empieza aquí.</h2>
          <p>No necesitas conocimientos técnicos. Elige qué necesitas hoy; te acompañamos paso a paso.</p>
          <div className="chatbot-main-instructions">
            <ol><li>Elige un recorrido</li><li>Selecciona una opción</li><li>Comprende el siguiente paso</li></ol>
          </div>
          <div className="chatbot-starters">{starters.map(({ title, description, value, icon: Icon }) => <button key={value} onClick={() => sendMessage(value, title)} className="chatbot-starter"><Icon size={22} aria-hidden="true" /><span><strong>{title}</strong><span>{description}</span></span><ChevronRight size={18} aria-hidden="true" /></button>)}</div>
        </div>}
        <div className="chatbot-conversation" role="log" aria-live="polite" aria-label="Mensajes del chatbot" aria-busy={loading}>
          {messages.map((msg, index) => <article key={index} className={`chatbot-msg chatbot-msg--${msg.from}`}>
            <span className="chatbot-msg__author">{msg.from === 'user' ? 'Tú' : 'Asistente'}</span>
            {msg.from === 'user' ? <p className="chatbot-msg__text">{msg.text}</p> : index === messages.length - 1 ? <ChatAnswer message={msg} /> : <details className="chatbot-previous"><summary>Ver respuesta anterior</summary><ChatAnswer message={msg} /></details>}
            {msg.sources?.length > 0 && <details className="chatbot-sources"><summary>Referencias de apoyo · APA 7</summary><p className="chatbot-source-note">Fuentes seleccionadas para este contenido. Consulta el documento original para conocer su alcance; no es una búsqueda en tiempo real.</p><ul>{msg.sources.map((source, i) => <li key={i}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<span className="sr-only"> (nueva pestaña)</span></a></li>)}</ul></details>}
            <span className="chatbot-msg__time">{msg.time}</span>
          </article>)}
          {loading && <p className="chatbot-processing" role="status">Preparando respuesta…</p>}
        </div>
        {!simulation && decision}
      </div>
      {simulation && decision}
      {progress && <div className="chatbot-progress"><span>Pregunta {progress.current} de {progress.total}</span><progress value={progress.current} max={progress.total} aria-label="Progreso de la evaluación" /></div>}
      <p className="chatbot-widget__notice">Selecciona una opción para continuar. Orientación educativa; no sustituye asesoría legal ni atención de emergencias.</p>
    </div>
    </div>
  </section>
}
