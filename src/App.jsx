import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import { LangProvider } from './hooks/useLang'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ChatbotPage from './pages/ChatbotPage'
import PlaceholderPage from './pages/PlaceholderPage'

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        {/* Skip to main content — accessibility */}
        <a href="#main-content" className="sr-only">
          Saltar al contenido principal
        </a>

        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/proteccion-datos" element={<PlaceholderPage title="Protección de Datos Personales" />} />
          <Route path="/seguridad-digital" element={<PlaceholderPage title="Seguridad Digital" />} />
          <Route path="/recursos" element={<PlaceholderPage title="Recursos Educativos" />} />
          <Route path="/riesgos" element={<PlaceholderPage title="Riesgos Comunes" />} />
          <Route path="/ley-8968" element={<PlaceholderPage title="Ley N.° 8968" />} />
          <Route path="/acerca" element={<PlaceholderPage title="Acerca del Proyecto" />} />
          {/* 404 */}
          <Route path="*" element={<PlaceholderPage title="Página no encontrada" />} />
        </Routes>

        <Footer />
      </LangProvider>
    </ThemeProvider>
  )
}
