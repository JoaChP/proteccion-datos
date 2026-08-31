import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import { LangProvider } from './hooks/useLang'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ChatbotPage from './pages/ChatbotPage'
import PlaceholderPage from './pages/PlaceholderPage'
import ProtectionDataPage from './pages/ProtectionDataPage'
import SecurityDigitalPage from './pages/SecurityDigitalPage'
import AcercaProyecto from './pages/AcercaProyecto'

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

          {/* Página principal */}
          <Route
            path="/"
            element={<HomePage />}
          />

          {/* Chatbot */}
          <Route
            path="/chatbot"
            element={<ChatbotPage />}
          />

          {/* Protección de Datos Personales */}
          <Route
            path="/proteccion-datos"
            element={<ProtectionDataPage />}
          />

          {/* Seguridad Digital */}
          <Route
            path="/seguridad-digital"
            element={<SecurityDigitalPage />}
          />

          {/* Recursos Educativos */}
          <Route
            path="/recursos"
            element={
              <PlaceholderPage
                title="Recursos Educativos"
              />
            }
          />

          {/* Riesgos Comunes */}
          <Route
            path="/riesgos"
            element={
              <PlaceholderPage
                title="Riesgos Comunes"
              />
            }
          />

          {/* Ley N.° 8968 */}
          <Route
            path="/ley-8968"
            element={
              <PlaceholderPage
                title="Ley N.° 8968"
              />
            }
          />

          {/* Acerca del Proyecto */}
          <Route
            path="/acerca"
            element={<AcercaProyecto />}
          />

          <Route
            path="/acerca-del-proyecto"
            element={<AcercaProyecto />}
          />

          {/* Página 404 */}
          <Route
            path="*"
            element={
              <PlaceholderPage
                title="Página no encontrada"
              />
            }
          />

        </Routes>

        <Footer />

      </LangProvider>
    </ThemeProvider>
  )
}