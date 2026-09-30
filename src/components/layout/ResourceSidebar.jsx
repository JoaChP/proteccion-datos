import { useEffect, useState } from 'react'
import { FileText, Library, ListChecks } from 'lucide-react'

const sections = [
  { id: 'informes-una', title: 'Informes de Costa Rica', icon: FileText },
  { id: 'biblioteca', title: 'Biblioteca de recursos', icon: Library },
  { id: 'referencias-recursos', title: 'Referencias APA 7', icon: ListChecks },
]

export default function ResourceSidebar() {
  const [active, setActive] = useState('informes-una')
  useEffect(() => {
    const update = () => {
      const current = sections.filter(({ id }) => document.getElementById(id)?.getBoundingClientRect().top <= 150).at(-1)
      setActive(current?.id || sections[0].id)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return <nav className="resources-sidebar" aria-label="Índice de Recursos Educativos">
    {sections.map(({ id, title, icon: Icon }, index) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
      <span className="resources-sidebar-number">{String(index + 1).padStart(2, '0')}</span>
      <Icon size={18} aria-hidden="true" /><strong>{title}</strong>
    </a>)}
  </nav>
}
