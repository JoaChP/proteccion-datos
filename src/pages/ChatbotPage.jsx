import ChatbotWidget from '../components/chatbot/ChatbotWidget'
import { useEffect } from 'react'
import './ChatbotPage.css'
export default function ChatbotPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return <main id="main-content" className="chatbot-page"><ChatbotWidget standalone /></main>
}
