import { createContext, useContext, useEffect, useState } from 'react'

const translations = {
  es: {
    nav: {
      home: 'Inicio',
      dataProtection: 'Protección de Datos',
      digitalSecurity: 'Seguridad Digital',
      resources: 'Recursos Educativos',
      chatbot: 'Chatbot de Orientación',
      about: 'Acerca del Proyecto',
    },
    hero: {
      badge: 'Proyecto de Tesis — UNA Costa Rica',
      title: 'Protege tu',
      titleHighlight: 'información personal',
      subtitle:
        'Orientación ciudadana interactiva para la educación y prevención en protección de datos personales en Costa Rica.',
      ctaPrimary: 'Iniciar orientación con el chatbot',
      ctaSecondary: 'Explorar recursos',
      online: 'En línea',
    },
    sections: {
      exploreTitle: 'Explora nuestros contenidos',
      exploreSubtitle: 'Todo lo que necesitas saber sobre protección de datos en un solo lugar',
      pillarsTitle: 'Nuestros pilares',
      pillarsSubtitle: 'Principios que guían este proyecto educativo',
    },
    cards: {
      dataProtection: {
        title: 'Protección de Datos Personales',
        desc: 'Conoce qué son tus datos personales, tus derechos y cómo protegerlos.',
      },
      digitalSecurity: {
        title: 'Seguridad Digital',
        desc: 'Aprende a identificar riesgos como phishing, fraude digital y robo de identidad.',
      },
      educationalResources: {
        title: 'Recursos Educativos',
        desc: 'Accede a guías, videos, infografías y materiales para fortalecer tus conocimientos.',
      },
      commonRisks: {
        title: 'Riesgos Comunes',
        desc: 'Información sobre amenazas digitales y recomendaciones para prevenirlas.',
      },
      law8968: {
        title: 'Ley N.° 8968',
        desc: 'Conoce la Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales.',
      },
    },
    pillars: {
      prevention: { title: 'Prevención', desc: 'Evita riesgos y protege tu información personal.' },
      guidance:   { title: 'Orientación', desc: 'Recibe ayuda y recomendaciones personalizadas.' },
      education:  { title: 'Educación', desc: 'Fortalece tus conocimientos sobre protección de datos y seguridad digital.' },
      trust:      { title: 'Confianza', desc: 'Tu privacidad y seguridad son nuestra prioridad.' },
    },
    chatbot: {
      title: 'Chatbot de Orientación',
      greeting: '¡Hola! Soy tu asistente virtual 👋\n¿En qué puedo orientarte hoy?',
      options: [
        'Quiero orientación sobre una situación',
        'Quiero aprender sobre riesgos digitales',
        'Evaluar mis prácticas digitales',
        'Información sobre la Ley N.° 8968',
      ],
      placeholder: 'Escribe tu mensaje...',
      comingSoon: '🚧 Chatbot en desarrollo — Próximamente conectado al backend',
    },
    thesis: {
      project: 'Proyecto de Tesis',
      projectDesc: 'Diseño de una Página Web con Chatbot Interactivo para la Orientación Ciudadana en Protección de Datos Personales en Costa Rica',
      student: 'Estudiante proponente:',
      studentName: 'Joan Enrique Chavarría Peraza',
      university: 'Universidad Nacional',
      faculty: 'Facultad de Ciencias Exactas y Naturales',
      school: 'Escuela de Informática',
      modality: 'Modalidad:',
      modalityDesc: 'Proyecto de Tesis para optar al grado de Licenciado en Informática con énfasis en Sistemas de Información',
      date: 'Fecha:',
      dateValue: 'Junio, 2026',
    },
    footer: {
      notice: 'Este sitio es parte de un proyecto de tesis. Su propósito es educativo e informativo.',
    },
    common: {
      learnMore: 'Saber más',
      comingSoon: 'Próximamente',
    },
  },
  en: {
    nav: {
      home: 'Home',
      dataProtection: 'Data Protection',
      digitalSecurity: 'Digital Security',
      resources: 'Educational Resources',
      chatbot: 'Guidance Chatbot',
      about: 'About the Project',
    },
    hero: {
      badge: 'Thesis Project — UNA Costa Rica',
      title: 'Protect your',
      titleHighlight: 'personal information',
      subtitle:
        'Interactive citizen guidance for education and prevention in personal data protection in Costa Rica.',
      ctaPrimary: 'Start chatbot guidance',
      ctaSecondary: 'Explore resources',
      online: 'Online',
    },
    sections: {
      exploreTitle: 'Explore our content',
      exploreSubtitle: 'Everything you need to know about data protection in one place',
      pillarsTitle: 'Our pillars',
      pillarsSubtitle: 'Principles that guide this educational project',
    },
    cards: {
      dataProtection: {
        title: 'Personal Data Protection',
        desc: 'Learn what personal data is, your rights, and how to protect it.',
      },
      digitalSecurity: {
        title: 'Digital Security',
        desc: 'Learn to identify risks such as phishing, digital fraud, and identity theft.',
      },
      educationalResources: {
        title: 'Educational Resources',
        desc: 'Access guides, videos, infographics, and materials to strengthen your knowledge.',
      },
      commonRisks: {
        title: 'Common Risks',
        desc: 'Information on digital threats and recommendations to prevent them.',
      },
      law8968: {
        title: 'Law No. 8968',
        desc: 'Learn about the Personal Data Protection Law in Costa Rica.',
      },
    },
    pillars: {
      prevention: { title: 'Prevention', desc: 'Avoid risks and protect your personal information.' },
      guidance:   { title: 'Guidance', desc: 'Receive personalized help and recommendations.' },
      education:  { title: 'Education', desc: 'Strengthen your knowledge of data protection and digital security.' },
      trust:      { title: 'Trust', desc: 'Your privacy and security are our priority.' },
    },
    chatbot: {
      title: 'Guidance Chatbot',
      greeting: 'Hello! I am your virtual assistant 👋\nHow can I help you today?',
      options: [
        'I want guidance on a situation',
        'I want to learn about digital risks',
        'Evaluate my digital practices',
        'Information about Law No. 8968',
      ],
      placeholder: 'Type your message...',
      comingSoon: '🚧 Chatbot under development — Coming soon connected to backend',
    },
    thesis: {
      project: 'Thesis Project',
      projectDesc: 'Design of a Web Page with Interactive Chatbot for Citizen Guidance in Personal Data Protection in Costa Rica',
      student: 'Proposing student:',
      studentName: 'Joan Enrique Chavarría Peraza',
      university: 'National University',
      faculty: 'Faculty of Exact and Natural Sciences',
      school: 'School of Computer Science',
      modality: 'Modality:',
      modalityDesc: 'Thesis Project to obtain the degree of Bachelor in Computer Science with emphasis in Information Systems',
      date: 'Date:',
      dateValue: 'June, 2026',
    },
    footer: {
      notice: 'This site is part of a thesis project. Its purpose is educational and informational.',
    },
    common: {
      learnMore: 'Learn more',
      comingSoon: 'Coming soon',
    },
  },
}

const LangContext = createContext()

const supportedLanguages = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
  { code: 'zh-CN', label: '中文' },
]

function GoogleTranslate({ language }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const initialize = () => {
      if (!window.google?.translate || document.querySelector('.goog-te-combo')) return
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'es',
          includedLanguages: supportedLanguages.map(({ code }) => code).filter(code => code !== 'es').join(','),
          autoDisplay: false,
        },
        'google-translate-element',
      )
      setReady(true)
    }

    window.googleTranslateElementInit = initialize
    if (window.google?.translate) {
      initialize()
      return undefined
    }

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    }
    return undefined
  }, [])

  useEffect(() => {
    if (!ready) return
    const select = document.querySelector('.goog-te-combo')
    if (!select) return
    select.value = language === 'es' ? '' : language
    select.dispatchEvent(new Event('change'))
  }, [language, ready])

  return <div id="google-translate-element" aria-hidden="true" />
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'es')

  // All source copy remains Spanish and is translated consistently at runtime.
  const t = translations.es
  const setLanguage = (next) => {
    setLang(next)
    localStorage.setItem('lang', next)
  }
  const toggleLang = () => {
    const next = lang === 'es' ? 'en' : 'es'
    setLanguage(next)
  }

  return (
    <LangContext.Provider value={{ lang, t, toggleLang, setLanguage, supportedLanguages }}>
      <GoogleTranslate language={lang} />
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
