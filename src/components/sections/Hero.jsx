import { Link } from 'react-router-dom'
import { MessageCircle, BookOpen, ChevronRight, ShieldCheck, Lock, Database, Eye } from 'lucide-react'
import { useLang } from '../../hooks/useLang'
import ChatbotWidget from '../chatbot/ChatbotWidget'
import './Hero.css'

// Floating data particles in the background
function Particles() {
  const items = [
    { icon: Lock, x: 15, y: 20, delay: 0 },
    { icon: Database, x: 80, y: 15, delay: 1.2 },
    { icon: Eye, x: 70, y: 75, delay: 0.6 },
    { icon: ShieldCheck, x: 10, y: 65, delay: 1.8 },
  ]
  return (
    <div className="hero__particles" aria-hidden="true">
      {items.map(({ icon: Icon, x, y, delay }, i) => (
        <div
          key={i}
          className="hero__particle"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon size={16} />
        </div>
      ))}
    </div>
  )
}

// Shield illustration
function ShieldIllustration() {
  return (
    <div className="hero__illustration" aria-hidden="true">
      <div className="hero__shield-outer">
        <div className="hero__shield-ring hero__shield-ring--1" />
        <div className="hero__shield-ring hero__shield-ring--2" />
        <div className="hero__shield-ring hero__shield-ring--3" />
        <div className="hero__shield-core">
          <ShieldCheck size={64} strokeWidth={1.5} />
          <div className="hero__shield-glow" />
        </div>
      </div>

      {/* Floating badges */}
      <div className="hero__badge hero__badge--tl">
        <Lock size={14} />
        <span>SSL Cifrado</span>
      </div>
      <div className="hero__badge hero__badge--br">
        <ShieldCheck size={14} />
        <span>Ley N.° 8968</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <Particles />

      {/* Grid overlay */}
      <div className="hero__grid" aria-hidden="true" />

      <div className="container hero__container">
        {/* Left content */}
        <div className="hero__content">
          <div className="hero__badge-top">
            <span className="hero__badge-dot" />
            {t.hero.badge}
          </div>

          <h1 id="hero-heading" className="hero__title">
            {t.hero.title}{' '}
            <span className="hero__title-highlight">{t.hero.titleHighlight}</span>
          </h1>

          <p className="hero__subtitle">{t.hero.subtitle}</p>

          <div className="hero__cta-group">
            <Link to="/chatbot" className="btn btn--primary">
              <MessageCircle size={18} />
              {t.hero.ctaPrimary}
            </Link>
            <Link to="/recursos" className="btn btn--ghost">
              <BookOpen size={18} />
              {t.hero.ctaSecondary}
            </Link>
          </div>

          {/* Trust stats */}
          <div className="hero__stats">
            {[
              { value: '100%', label: 'Gratuito' },
              { value: 'Ley 8968', label: 'Respaldado' },
              { value: '24/7', label: 'Disponible' },
            ].map(({ value, label }) => (
              <div key={label} className="hero__stat">
                <span className="hero__stat-value">{value}</span>
                <span className="hero__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center illustration */}
        <ShieldIllustration />

        {/* Right chatbot widget */}
        <ChatbotWidget />
      </div>

      {/* Bottom fade */}
      <div className="hero__fade" aria-hidden="true" />
    </section>
  )
}
