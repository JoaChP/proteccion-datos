import { Construction, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../hooks/useLang'
import './PlaceholderPage.css'

export default function PlaceholderPage({ title }) {
  const { t } = useLang()
  return (
    <main className="placeholder-page">
      <div className="placeholder-page__inner">
        <div className="placeholder-page__icon">
          <Construction size={48} />
        </div>
        <h1 className="placeholder-page__title">{title}</h1>
        <p className="placeholder-page__sub">
          Esta sección está en desarrollo. Próximamente disponible con contenido completo.
        </p>
        <Link to="/" className="btn btn--primary">
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
