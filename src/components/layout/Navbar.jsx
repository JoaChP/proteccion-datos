import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield, Sun, Moon, Globe } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useLang } from '../../hooks/useLang'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { lang, t, toggleLang } = useLang()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const navLinks = [
    { label: t.nav.home,           href: '/' },
    { label: t.nav.dataProtection, href: '/proteccion-datos' },
    { label: t.nav.digitalSecurity,href: '/seguridad-digital' },
    { label: t.nav.resources,      href: '/recursos' },
    { label: t.nav.chatbot,        href: '/chatbot' },
    { label: t.nav.about,          href: '/acerca' },
  ]

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="Inicio — Protección de Datos CR">
          <div className="navbar__logo-icon">
            <Shield size={22} strokeWidth={2.5} />
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-main">PROTECCIÓN DE</span>
            <span className="navbar__logo-main">DATOS PERSONALES</span>
            <span className="navbar__logo-sub">Costa Rica</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Navegación principal">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`navbar__link${location.pathname === link.href ? ' navbar__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Controls */}
        <div className="navbar__controls">
          <button
            className="navbar__icon-btn"
            onClick={toggleLang}
            aria-label={`Cambiar idioma (${lang === 'es' ? 'EN' : 'ES'})`}
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Globe size={18} />
            <span className="navbar__lang-label">{lang.toUpperCase()}</span>
          </button>

          <button
            className="navbar__icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-label="Menú de navegación"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="navbar__mobile" aria-label="Navegación móvil">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`navbar__mobile-link${location.pathname === link.href ? ' navbar__mobile-link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
