import { Link } from 'react-router-dom'

function blocks(text) {
  const parsed = text.split(/\n\s*\n/).filter(Boolean).map(block => {
    const [first, ...rest] = block.split('\n')
    const clean = first.replace(/[^\p{L}\p{N}\s¿?.,:–-]/gu, '').trim()
    const actionHeading = /^(PRIMERO|DESPUÉS|PARA LA PRÓXIMA VEZ|TE ACOMPAÑAMOS|TU SITUACIÓN)/.test(clean)
    const heading = actionHeading || clean.length > 4 && clean.length < 100 && /\p{L}/u.test(clean) && clean === clean.toLocaleUpperCase('es')
    return { heading: heading ? clean : null, body: heading ? rest.join('\n') : block }
  })
  return parsed.reduce((result, block) => {
    const previous = result[result.length - 1]
    if (previous?.heading && !previous.body && !block.heading) previous.body = block.body
    else result.push(block)
    return result
  }, [])
}

function AnswerBody({ text }) {
  const lines = text.split('\n').filter(Boolean)
  if (lines.length > 1 && lines.every(line => /^(?:[•-]|\d+[.)])\s/.test(line))) {
    return <ul>{lines.map((line, index) => <li key={index}>{line.replace(/^(?:[•-]|\d+[.)])\s/, '')}</li>)}</ul>
  }
  return <p>{text}</p>
}

export default function ChatAnswer({ message }) {
  return <div className="chat-answer">
    {blocks(message.text).map((block, index) => <section className="chat-answer__section" key={index}>
      {index > 1 && block.body.length > 350 ? <details className="chat-answer__details">
        <summary>{block.heading || 'Ampliar explicación'}</summary><AnswerBody text={block.body} />
      </details> : <>{block.heading && <h3>{block.heading}</h3>}{block.body && <AnswerBody text={block.body} />}</>}
    </section>)}
    {message.areas?.length > 0 && <section className="chat-area-report" aria-label="Plan personal por área">
      <h3>Tu plan de mejora por área</h3>
      <p>Prioriza las áreas con más oportunidades de mejora. Este resultado se basa en tus respuestas.</p>
      <div>{message.areas.map(area => <article key={area.area}>
        <div><h4>{area.area}</h4><span>{area.level}</span></div>
        <meter min="0" max="100" value={area.percentage} aria-label={`Puntuación orientativa en ${area.area}`} />
        <p>{area.action}</p><Link to={area.url}>Profundizar en esta área →</Link>
      </article>)}</div>
    </section>}
  </div>
}
