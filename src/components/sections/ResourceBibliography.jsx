import { resources } from '../../data/resources'
import { referenceDate, referenceText } from '../../data/resourceReferences'

export function ApaReference({ reference: ref }) {
  return <p className="apa-reference">
    {ref.legal ? <>{ref.title}. ({referenceDate(ref)}).</> : <>{ref.author}{ref.author.endsWith('.') ? '' : '.'} ({referenceDate(ref)}). <em>{ref.title}</em>{ref.edition && <> ({ref.edition})</>}{ref.kind && <> [{ref.kind}]</>}.</>}
    {ref.publisher && <> {ref.publisher}.</>}{' '}
    <a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.url}<span className="sr-only"> (nueva pestaña)</span></a>
  </p>
}

const ordered = [...resources].sort((a, b) => {
  const ar = a.reference, br = b.reference
  const yearKey = year => /^\d{4}$/.test(year) ? year : ''
  return (ar.author || ar.title).localeCompare(br.author || br.title, 'es') || yearKey(ar.year).localeCompare(yearKey(br.year), 'es') || ar.title.localeCompare(br.title, 'es')
})

function downloadReferences() {
  const text = `REFERENCIAS BIBLIOGRÁFICAS · APA 7\nBiblioteca de Protección de Datos CR\n\n${ordered.map(item => referenceText(item.reference)).join('\n\n')}\n`
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'referencias-recursos-apa7.txt'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function ResourceBibliography() {
  return <section id="referencias-recursos" className="resource-bibliography" aria-labelledby="bibliography-heading">
    <span className="resources-eyebrow">FUENTES DE LA BIBLIOTECA</span><h2 id="bibliography-heading">Referencias bibliográficas · APA 7</h2>
    <p>Referencias de los {resources.length} recursos del catálogo, ordenadas alfabéticamente. El año corresponde a la publicación y puede diferir del período analizado. «s. f.» indica que no se pudo confirmar la fecha en la fuente consultada; no se ha usado el año de consulta como fecha de publicación.</p>
    <button className="resources-button" onClick={downloadReferences}>Descargar referencias (.txt)</button>
    <p className="resources-note">La versión en pantalla conserva las cursivas y la sangría francesa. El archivo de texto conserva los datos bibliográficos, pero no el formato tipográfico. Las letras a, b… distinguen obras del mismo autor y año dentro de esta biblioteca.</p>
    <div className="bibliography-list">{ordered.map(item => <ApaReference key={item.id} reference={item.reference} />)}</div>
  </section>
}
