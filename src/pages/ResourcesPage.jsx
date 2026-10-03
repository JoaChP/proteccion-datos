import { useState } from 'react'
import { BookOpen, FileText, PlayCircle, ArrowUpRight, Search, Download } from 'lucide-react'
import { resources } from '../data/resources'
import './ResourcesPage.css'
import ResourceBibliography, { ApaReference } from '../components/sections/ResourceBibliography'
import ResourceSidebar from '../components/layout/ResourceSidebar'
import ReadMore, { ReadingHint } from '../components/reading/ReadMore'

const types = ['Todos', ...new Set(resources.map(resource => resource.type))]
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export default function ResourcesPage() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('Todos')
  const [topic, setTopic] = useState('Todos los temas')
  const [language, setLanguage] = useState('Todos los idiomas')
  const filtered = resources.filter(resource =>
    (type === 'Todos' || resource.type === type) &&
    (topic === 'Todos los temas' || resource.topic === topic) &&
    (language === 'Todos los idiomas' || resource.format.includes(language)) &&
    normalize(`${resource.title} ${resource.description} ${resource.source} ${resource.topic} ${resource.scope}`).includes(normalize(query.trim()))
  )
  const reset = () => { setQuery(''); setType('Todos'); setTopic('Todos los temas'); setLanguage('Todos los idiomas') }

  return <main id="main-content" className="resources-page">
    <ResourceSidebar />
    <div className="resources-main">
    <header className="resources-hero">
      <div className="resources-hero-content">
        <span className="resources-hero-eyebrow">EDUCACIÓN CIUDADANA · DOCUMENTACIÓN · APRENDIZAJE DIGITAL</span>
        <h1>Recursos Educativos</h1>
        <p>Biblioteca de documentos, videos y páginas de consulta sobre protección de datos personales y seguridad digital, con especial atención al contexto costarricense y a referentes internacionales.</p>
        <div className="resources-hero-tags" aria-label="Contenidos de la biblioteca">
          <span>🇨🇷 Costa Rica</span>
          <span>📄 Documentos e informes</span>
          <span>🎬 Videos educativos</span>
          <span>🌐 Fuentes institucionales</span>
          <span>📚 Referencias APA 7</span>
        </div>
      </div>
    </header>

    <div className="container resources-content">
      <ReadingHint />
      <section id="informes-una" className="resources-una" aria-labelledby="una-heading">
        <span className="resources-eyebrow">DOCUMENTACIÓN NACIONAL · LABCIBE–UNA</span><h2 id="una-heading">Estado de la ciberseguridad en Costa Rica</h2>
        <p>Las tres ediciones del informe, con sus autores y años de publicación. Cada enlace abre el documento o su ficha de repositorio en una nueva pestaña.</p>
        <div className="resources-grid">{['una-2023', 'una-2024', 'una-2025'].map(id => {
          const item = resources.find(resource => resource.id === id)
          return <article className="resource-card" key={id}><span className="resources-eyebrow">EDICIÓN {item.reportYear || '2023'} · PUBLICADO EN {item.reference.year}</span><h3>{item.title}</h3><p>{item.description}</p><a href={item.url} target="_blank" rel="noopener noreferrer">Consultar informe {item.reportYear || '2023'} <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (nueva pestaña)</span></a><details className="resource-alignment"><summary>Referencia APA 7</summary><ApaReference reference={item.reference} /></details></article>
        })}</div>
        <p className="resources-note">El informe 2025 se ofrece mediante una copia del documento de la UNA alojada fuera del repositorio institucional. Se verificaron sus créditos y fecha de publicación.</p>
      </section>
      <section id="biblioteca" aria-labelledby="biblioteca-heading">
        <div className="resources-section-heading"><div><span className="resources-eyebrow">APRENDE A TU RITMO</span><h2 id="biblioteca-heading">Biblioteca de recursos</h2></div><span>{resources.length} recursos · Español e inglés</span></div>
        <p>Selección guiada por las referencias del proyecto: documentos oficiales, investigación académica, tutoriales y contexto periodístico. Cada ficha indica su origen, idioma y utilidad. Los procedimientos legales y canales de atención extranjeros corresponden a sus países de origen.</p>
        <div className="resources-reading-guide"><h3>¿Qué material elegir?</h3><ReadMore label="cómo elegir un recurso"><p><strong>Para empezar:</strong> explora los videos, las guías de privacidad y las páginas institucionales de Costa Rica. <strong>Para profundizar:</strong> consulta los informes de UNA, los marcos de NIST y los estudios internacionales.</p><p>Revisa siempre el período de cada informe: una noticia de 2022 o una encuesta de 2023 sirve como antecedente, pero no describe por sí sola la situación actual.</p></ReadMore></div>
        <div className="resources-controls">
          <div className="resources-search"><label htmlFor="resource-search">Buscar un recurso</label><div><Search size={18} aria-hidden="true" /><input id="resource-search" type="search" placeholder="Privacidad, contraseñas, Ley 8968…" value={query} onChange={event => setQuery(event.target.value)} /></div></div>
          <div><label htmlFor="resource-topic">Tema</label><select id="resource-topic" value={topic} onChange={event => setTopic(event.target.value)}><option>Todos los temas</option>{[...new Set(resources.map(resource => resource.topic))].map(item => <option key={item}>{item}</option>)}</select></div>
          <div><label htmlFor="resource-language">Idioma del material</label><select id="resource-language" value={language} onChange={event => setLanguage(event.target.value)}><option>Todos los idiomas</option><option>Español</option><option>Inglés</option></select></div>
        </div>
        <div className="resources-filters" role="group" aria-label="Filtrar por formato">{types.map(item => <button key={item} type="button" aria-pressed={type === item} onClick={() => setType(item)}>{item}</button>)}</div>
        <button className="resources-reset" onClick={reset}>Mostrar toda la biblioteca</button>
        {type === 'Videos' && <aside className="resources-reading-guide" aria-label="Videos y contexto costarricense"><h3>Cómo se relacionan con este proyecto</h3><p>El reportaje de Conti es una referencia costarricense citada en el TFG. Los tutoriales de AEPD y el video de INCIBE son complementos españoles para los temas de prevención y privacidad del capítulo VI. Sus instituciones, servicios de ayuda y procedimientos corresponden a España.</p><p>Para el marco costarricense, consulta la Ley N.º 8968 y la PRODHAB en esta biblioteca. Estos videos no constituyen una explicación de esa ley.</p></aside>}
        <p className="resources-count" role="status"><span key={filtered.length}>{filtered.length} {filtered.length === 1 ? 'recurso disponible' : 'recursos disponibles'}</span></p>
        <div className="resources-grid">{filtered.map(resource => {
          const Icon = resource.type === 'Videos' ? PlayCircle : resource.type === 'Documentos' ? FileText : BookOpen
          const action = resource.action || (resource.local ? 'Abrir ficha' : resource.type === 'Videos' ? 'Ver colección de videos' : 'Consultar recurso')
          return <article className="resource-card" key={resource.id}>
            <div className="resource-card-top"><Icon size={25} aria-hidden="true" /><span>{resource.type}</span></div>
            <p className="resource-meta">{resource.scope}</p><h3>{resource.title}</h3>
            <ReadMore label={resource.title} preview={resource.description} limit={160} force>
            <p>{resource.description}</p>
            {resource.alignment && <details className="resource-alignment"><summary>Relación con la documentación y Costa Rica</summary><p>{resource.alignment}</p><p>{resource.applicability}</p></details>}
            <div className="resource-details"><strong>{resource.source}</strong><span>{resource.format}</span><span>{resource.level}</span></div>
            <details className="resource-alignment"><summary>Referencia APA 7</summary><ApaReference reference={resource.reference} /></details>
            </ReadMore>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" aria-label={`${action}: ${resource.title} (nueva pestaña)`}>{action} <ArrowUpRight size={18} aria-hidden="true" /></a>
            {resource.local && <a href={resource.url} download="lista-proteccion-digital.html"><Download size={16} aria-hidden="true" /> Descargar ficha HTML</a>}
          </article>
        })}</div>
        {filtered.length === 0 && <div className="resources-empty"><h3>No encontramos recursos con esos filtros</h3><p>Prueba otra palabra o vuelve a mostrar toda la biblioteca.</p><button className="resources-button" onClick={reset}>Limpiar filtros</button></div>}
        <p className="resources-note">Los enlaces de consulta se abren en una nueva pestaña. Los videos se reproducen en YouTube o en el portal de su autor. El idioma indicado corresponde al material original. Selección revisada el 29 de septiembre de 2026.</p>
      </section>

      <ResourceBibliography />
      <p className="resources-note">Contenido educativo e informativo. Para interpretar la normativa o atender un caso concreto, consulta las fuentes oficiales y la asesoría correspondiente. Las guías externas conservan su autoría original.</p>
    </div>
    </div>
  </main>
}
