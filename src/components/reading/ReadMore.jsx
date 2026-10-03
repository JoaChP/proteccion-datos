import { Children, isValidElement, useRef } from 'react'
import './ReadMore.css'

function textOf(node) {
  return Children.toArray(node).map(child => typeof child === 'string' || typeof child === 'number'
    ? String(child) : isValidElement(child) ? textOf(child.props.children) : '').join(' ').replace(/\s+/g, ' ').trim()
}

export default function ReadMore({ children, label = 'este contenido', preview, limit = 220, force = false }) {
  const details = useRef(null)
  const text = preview || textOf(children)
  if (!force && text.length <= limit + 20) return <>{children}</>
  const excerpt = text.length > limit ? `${text.slice(0, text.lastIndexOf(' ', limit)).trim()}…` : text
  const close = () => {
    details.current.open = false
    const control = details.current.querySelector('summary')
    control.focus({ preventScroll: true })
    control.scrollIntoView({ block: 'nearest', behavior: 'instant' })
  }
  return <div className="read-more">
    <p className="read-more__preview">{excerpt}</p>
    <details ref={details} className="read-more__details">
      <summary><span className="read-more__open">Leer más</span><span className="read-more__close">Leer menos</span><span className="sr-only"> sobre {label}</span><span className="read-more__icon" aria-hidden="true">+</span></summary>
      <div className="read-more__content">{children}</div>
      <button type="button" className="read-more__bottom" onClick={close}>Leer menos<span className="sr-only"> sobre {label}</span><span aria-hidden="true"> ↑</span></button>
    </details>
  </div>
}

export function ReadingHint() {
  return <aside className="reading-hint" aria-label="Cómo leer esta página"><span aria-hidden="true">✦</span><p><strong>Lee a tu ritmo.</strong> Consulta primero la vista breve y abre «Leer más» cuando quieras profundizar. El texto completo y sus fuentes están disponibles en cada apartado.</p></aside>
}
