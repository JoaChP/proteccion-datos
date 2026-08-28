import { Shield } from 'lucide-react'
import { useLang } from '../../hooks/useLang'
import './Footer.css'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__notice">
        <Shield size={14} />
        <span>{t.footer.notice}</span>
      </div>
    </footer>
  )
}
