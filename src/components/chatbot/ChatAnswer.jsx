import { Link } from 'react-router-dom'

function blocks(text) {
  const parsed = text.split(/\n\s*\n/).filter(Boolean).map(block => {
    const [first, ...rest] = block.split('\n')
    const clean = first.replace(/[^\p{L}\p{N}\s¿?.,:–-]/gu, '').trim()
    const heading = clean.length > 4 && clean.length < 100 && /\p{L}/u.test(clean) && clean === clean.toLocaleUpperCase('es')
    return { heading: heading ? clean : null, body: heading ? rest.join('\n') : block }
  })
  return parsed.reduce((result, block) => {
    const previous = result[result.length - 1]
    if (previous?.heading && !previous.body && !block.heading) previous.body = block.body
    else result.push(block)
    return result
  }, [])
}

export default function ChatAnswer({ message }) {
  return <div className="chat-answer">
    {blocks(message.text).map((block, index) => <section className="chat-answer__section" key={index}>
      {block.heading && <h3>{block.heading}</h3>}
      {block.body && <p>{block.body}</p>}
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
