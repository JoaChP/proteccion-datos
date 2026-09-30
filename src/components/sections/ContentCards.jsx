import { Link } from 'react-router-dom'
import { ShieldCheck, Wifi, BookOpen, MessageCircle, GraduationCap, ArrowRight } from 'lucide-react'
import { useLang } from '../../hooks/useLang'
import './ContentCards.css'

const cardConfig = [
  {
    key: 'dataProtection',
    icon: ShieldCheck,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
    href: '/proteccion-datos',
  },
  {
    key: 'digitalSecurity',
    icon: Wifi,
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.1)',
    href: '/seguridad-digital',
  },
  {
    key: 'educationalResources',
    icon: BookOpen,
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
    href: '/recursos',
  },
  {
    key: 'projectChatbot',
    icon: MessageCircle,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    href: '/chatbot',
  },
  {
    key: 'projectAbout',
    icon: GraduationCap,
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.1)',
    href: '/acerca',
  },
]

export default function ContentCards() {
  const { t } = useLang()

  return (
    <section className="content-cards" aria-labelledby="explore-heading">
      <div className="container">
        {/* Section header */}
        <div className="section-header">
          <h2 id="explore-heading" className="section-title">
            {t.sections.exploreTitle}
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">{t.sections.exploreSubtitle}</p>
        </div>

        {/* Cards grid */}
        <div className="cards-grid">
          {cardConfig.map(({ key, icon: Icon, color, bg, href }) => {
            const card = t.cards[key]
            return (
              <Link key={key} to={href} className="card" aria-label={card.title}>
                <div className="card__icon-wrap" style={{ background: bg, color }}>
                  <Icon size={28} strokeWidth={1.8} />
                </div>
                <h3 className="card__title">
                  {card.title}
                </h3>
                <p className="card__desc">{card.desc}</p>
                <div className="card__arrow" style={{ background: bg, color }}>
                  <ArrowRight size={16} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
