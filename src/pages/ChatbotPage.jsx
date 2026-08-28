import ChatbotWidget from '../components/chatbot/ChatbotWidget'
import './ChatbotPage.css'

export default function ChatbotPage() {
  return (
    <main className="chatbot-page">
      <div className="container chatbot-page__inner">
        <div className="chatbot-page__header">
          <h1 className="chatbot-page__title">Chatbot de Orientación</h1>
          <p className="chatbot-page__sub">
            Resuelve tus dudas sobre protección de datos personales y seguridad digital.
          </p>
        </div>
        <div className="chatbot-page__widget">
          <ChatbotWidget standalone />
        </div>
      </div>
    </main>
  )
}
