import ReadMore, { ReadingHint } from '../components/reading/ReadMore'
import React from "react";
import { resources } from "../data/resources";
import { ApaReference } from "../components/sections/ResourceBibliography";
import "./AcercaProyecto.css";

const projectReferences = resources.filter(item => ["ley", "estrategia-cr", "nist-completo"].includes(item.id));

const sections = [
  {
    id: "01",
    title: "Presentación del proyecto",
    icon: "🎓",
  },
  {
    id: "02",
    title: "Problemática que aborda",
    icon: "⚠️",
  },
  {
    id: "03",
    title: "Justificación",
    icon: "💡",
  },
  {
    id: "04",
    title: "Objetivo general",
    icon: "🎯",
  },
  {
    id: "05",
    title: "Objetivos específicos",
    icon: "📋",
  },
  {
    id: "06",
    title: "Metodología",
    icon: "🔬",
  },
  {
    id: "07",
    title: "Arquitectura tecnológica",
    icon: "💻",
  },
  {
    id: "08",
    title: "Componentes de la plataforma",
    icon: "🧩",
  },
  {
    id: "09",
    title: "Chatbot interactivo",
    icon: "🤖",
  },
  {
    id: "10",
    title: "Público objetivo",
    icon: "👥",
  },
  {
    id: "11",
    title: "Impacto esperado",
    icon: "📈",
  },
  {
    id: "12",
    title: "Innovación y aporte",
    icon: "🚀",
  },
  {
    id: "13",
    title: "Productos y estado actual",
    icon: "📊",
  },
  {
    id: "14",
    title: "Equipo académico",
    icon: "🎓",
  },
  {
    id: "15",
    title: "Tecnologías y herramientas",
    icon: "⚙️",
  },
  {
    id: "16",
    title: "Consideraciones y propósito",
    icon: "🛡️",
  },
  { id: "17", title: "Referencias de apoyo", icon: "📚" },
];

const scrollToSection = (id) => {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

function SectionHeader({ eyebrow, number, title, icon }) {
  return (
    <div className="about-section-header">
      <div className="about-section-icon">
        <span>{icon}</span>
      </div>

      <div>
        <div className="about-eyebrow">{eyebrow}</div>

        <h2>
          {number}. {title}
        </h2>
      </div>
    </div>
  );
}

function InfoCard({ label, title, children, className = "" }) {
  return (
    <article className={`about-info-card ${className}`}>
      {label && <div className="about-card-label">{label}</div>}

      {title && <h3>{title}</h3>}

      <div className="about-card-content"><ReadMore label={title || label} limit={150}>{children}</ReadMore></div>
    </article>
  );
}

function ObjectiveCard({ number, title, children }) {
  return (
    <article className="about-objective-card">
      <div className="about-objective-number">{number}</div>

      <div className="about-objective-body">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}

function ProcessStep({ number, title, children }) {
  return (
    <article className="about-process-step">
      <div className="about-process-number">{number}</div>

      <div className="about-process-body">
        <h3>{title}</h3>
        <ReadMore label={title} limit={150}><p>{children}</p></ReadMore>
      </div>
    </article>
  );
}

export default function AcercaProyecto() {
  return (
    <div className="about-project-page">

      {/* =========================================================
          SIDEBAR
      ========================================================= */}

      <aside className="about-project-sidebar">
        <div className="about-sidebar-inner">

          <div className="about-sidebar-title">
            <span>ACERCA DEL PROYECTO</span>
          </div>

          <nav className="about-sidebar-nav">

            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className="about-sidebar-item"
                onClick={() => scrollToSection(`about-${section.id}`)}
              >
                <span className="about-sidebar-number">
                  {section.id}
                </span>

                <span className="about-sidebar-icon">
                  {section.icon}
                </span>

                <span className="about-sidebar-text">
                  {section.title}
                </span>
              </button>
            ))}

          </nav>

        </div>
      </aside>


      {/* =========================================================
          CONTENIDO PRINCIPAL
      ========================================================= */}

      <main className="about-project-main">

        {/* =======================================================
            HERO
        ======================================================= */}

        <section className="about-project-hero">

          <div className="about-hero-inner">

            <div className="about-hero-eyebrow">
              TRABAJO FINAL DE GRADUACIÓN · SISTEMAS DE INFORMACIÓN · COSTA RICA
            </div>

            <h1>
              Acerca del
              <br />
              Proyecto
            </h1>

            <p className="about-hero-description">
              Diseño de una Página Web con Chatbot Interactivo para la Orientación Ciudadana en Protección de Datos Personales en Costa Rica.
            </p>

            <div className="about-hero-tags">

              <span className="about-tag">
                🎓 Universidad Nacional
              </span>

              <span className="about-tag">
                🇨🇷 Costa Rica
              </span>

              <span className="about-tag">
                🛡️ Protección de datos
              </span>

              <span className="about-tag">
                🤖 Chatbot interactivo
              </span>

              <span className="about-tag">
                💻 Sistemas de información
              </span>

            </div>

          </div>

        </section>


        {/* =======================================================
            01. PRESENTACIÓN
        ======================================================= */}

        <ReadingHint />
        <section
          id="about-01"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="IDENTIDAD DEL PROYECTO"
            number="01"
            title="Presentación del proyecto"
            icon="🎓"
          />

          <p className="about-section-intro">
            El presente proyecto corresponde a un Trabajo Final de
            Graduación de la Licenciatura en Informática con énfasis
            en Sistemas de Información de la Universidad Nacional de
            Costa Rica. La propuesta se orienta al diseño e
            implementación de una plataforma web con un chatbot
            interactivo para apoyar la orientación ciudadana en
            materia de protección de datos personales y seguridad
            digital.
          </p>

          <div className="about-grid-2">

            <InfoCard
              label="NATURALEZA"
              title="Proyecto académico aplicado"
            >
              <p>
                La iniciativa integra conocimientos de ingeniería de
                sistemas de información con una problemática de
                relevancia social: la necesidad de facilitar a la
                ciudadanía el acceso a información clara y aplicable
                sobre privacidad, protección de datos personales y
                prevención de riesgos digitales.
              </p>

              <p>
                El proyecto combina investigación documental,
                análisis normativo, diseño de sistemas, desarrollo
                web, organización del conocimiento y evaluación de
                la experiencia de usuario.
              </p>
            </InfoCard>

            <InfoCard
              label="ENFOQUE"
              title="Orientación ciudadana"
            >
              <p>
                La solución se concibe como un recurso tecnológico
                educativo y preventivo. Su propósito no consiste
                únicamente en presentar información, sino en
                facilitar procesos de aprendizaje, orientación y
                toma de decisiones frente a situaciones relacionadas
                con el manejo de información personal.
              </p>

              <p>
                El enfoque busca acercar conocimientos técnicos y
                normativos a usuarios que no necesariamente poseen
                formación especializada en informática o
                ciberseguridad.
              </p>
            </InfoCard>

          </div>

        </section>


        {/* =======================================================
            02. PROBLEMÁTICA
        ======================================================= */}

        <section
          id="about-02"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="CONTEXTO Y NECESIDAD"
            number="02"
            title="Problemática que aborda"
            icon="⚠️"
          />

          <p className="about-section-intro">
            La transformación digital ha incrementado el uso de
            servicios en línea, redes sociales, aplicaciones móviles,
            servicios bancarios y plataformas digitales. Como
            consecuencia, también ha aumentado la cantidad de
            información personal que las personas proporcionan,
            almacenan y comparten en estos entornos.
          </p>

          <div className="about-grid-2">

            <InfoCard
              label="01"
              title="Desconocimiento ciudadano"
            >
              <p>
                Una parte de la ciudadanía presenta dificultades
                para identificar qué información constituye un dato
                personal, qué riesgos pueden afectar dicha
                información y cuáles medidas preventivas pueden
                aplicarse en situaciones cotidianas.
              </p>
            </InfoCard>

            <InfoCard
              label="02"
              title="Riesgos digitales"
            >
              <p>
                Situaciones como phishing, fraude electrónico, robo
                de identidad, accesos no autorizados y uso indebido
                de información personal pueden generar consecuencias
                económicas, sociales y personales.
              </p>
            </InfoCard>

            <InfoCard
              label="03"
              title="Brecha entre normativa y práctica"
            >
              <p>
                Aunque Costa Rica dispone de normativa relacionada
                con la protección de datos personales, persiste el
                desafío de transformar ese conocimiento normativo en
                acciones concretas que puedan ser comprendidas y
                aplicadas por la ciudadanía.
              </p>
            </InfoCard>

            <InfoCard
              label="04"
              title="Necesidad de herramientas interactivas"
            >
              <p>
                La disponibilidad de información estática no siempre
                permite que las personas comprendan cómo actuar ante
                situaciones concretas. El proyecto responde a esta
                necesidad mediante contenidos educativos y procesos
                guiados de interacción.
              </p>
            </InfoCard>

          </div>

        </section>


        {/* =======================================================
            03. JUSTIFICACIÓN
        ======================================================= */}

        <section
          id="about-03"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="FUNDAMENTACIÓN"
            number="03"
            title="Justificación"
            icon="💡"
          />

          <div className="about-highlight-box">

            <div className="about-highlight-icon">
              💡
            </div>

            <div>
              <h3>
                Tecnología orientada a una necesidad social
              </h3>

              <p>
                La propuesta busca acercar el conocimiento sobre protección de datos a las decisiones cotidianas de la ciudadanía. Su fundamentación considera la Ley N.º 8968 (Asamblea Legislativa de la República de Costa Rica, 2011), la Estrategia Nacional de Ciberseguridad 2023–2027 (Ministerio de Ciencia, Innovación, Tecnología y Telecomunicaciones [MICITT], 2023) y el marco de gestión del riesgo del National Institute of Standards and Technology (NIST, 2024).
              </p>

              <p>
                El aporte propuesto consiste en organizar información documental y normativa en contenidos accesibles y recorridos guiados. Su utilidad y aceptación deben estudiarse mediante la evaluación prevista en el TFG; la disponibilidad de la plataforma no demuestra por sí sola una mejora en el aprendizaje.
              </p>
            </div>

          </div>

          <div className="about-grid-3">

            <InfoCard
              label="SOCIAL"
              title="Orientación ciudadana"
            >
              <p>
                Facilitar información comprensible y aplicable a
                situaciones reales de la vida digital.
              </p>
            </InfoCard>

            <InfoCard
              label="TECNOLÓGICA"
              title="Integración de sistemas"
            >
              <p>
                Integrar interfaz web, servicios de aplicación y flujos del chatbot; diferenciar el modelo de datos previsto de los componentes implementados.
              </p>
            </InfoCard>

            <InfoCard
              label="ACADÉMICA"
              title="Aplicación de conocimientos"
            >
              <p>
                Aplicar conocimientos propios de la Informática y de
                los Sistemas de Información a una problemática
                contextualizada en Costa Rica.
              </p>
            </InfoCard>

          </div>

        </section>


        {/* =======================================================
            04. OBJETIVO GENERAL
        ======================================================= */}

        <section
          id="about-04"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="PROPÓSITO PRINCIPAL"
            number="04"
            title="Objetivo general"
            icon="🎯"
          />

          <div className="about-objective-main">

            <div className="about-objective-main-number">
              4.1
            </div>

            <div>
              <div className="about-card-label">
                OBJETIVO GENERAL DEL TFG
              </div>

              <h3>
                Desarrollar una página web con un chatbot interactivo
                orientado a la ciudadanía, prevención digital y
                protección de datos personales en Costa Rica,
                mediante procesos estructurados de interacción
                basados en criterios relacionados con la Ley N.º 8968.
              </h3>
            </div>

          </div>

        </section>


        {/* =======================================================
            05. OBJETIVOS ESPECÍFICOS
        ======================================================= */}

        <section
          id="about-05"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="OBJETIVOS DEL PROYECTO"
            number="05"
            title="Objetivos específicos"
            icon="📋"
          />

          <div className="about-objectives-list">

            <ObjectiveCard
              number="5.1"
              title="Investigación"
            >
              Investigar la ciberseguridad de protección de datos
              personales en Costa Rica, comparándola con otros países
              mundialmente reconocidos en el tema, identificando
              vacíos y oportunidades de mejora en el país.
            </ObjectiveCard>

            <ObjectiveCard
              number="5.2"
              title="Diseño tecnológico"
            >
              Diseñar la arquitectura tecnológica de la página web, la base de datos y la integración del chatbot interactivo, definiendo la estructura funcional y los flujos conversacionales necesarios para la orientación, evaluación y prevención en protección de datos personales y seguridad digital.
            </ObjectiveCard>

            <ObjectiveCard
              number="5.3"
              title="Desarrollo de la plataforma"
            >
              Desarrollar la página web con secciones sobre protección de datos personales, buenas prácticas de privacidad, recursos educativos y contenidos de prevención y seguridad digital, para la facilitación del acceso de la ciudadanía a información clara y accesible sobre protección de datos personales.
            </ObjectiveCard>

            <ObjectiveCard
              number="5.4"
              title="Implementación del chatbot"
            >
              Implementar un chatbot interactivo dentro de la página web para la orientación y evaluación al usuario mediante flujos conversacionales, brindando recomendaciones preventivas relacionadas con la protección de datos personales y la seguridad digital.
            </ObjectiveCard>

            <ObjectiveCard
              number="5.5"
              title="Evaluación"
            >
              Probar el uso y la aceptación de la página web informativa y del chatbot interactivo con distintos grupos de usuarios, para la evaluación de su usabilidad y utilidad como herramienta.
            </ObjectiveCard>

          </div>

        </section>


        {/* =======================================================
            06. METODOLOGÍA
        ======================================================= */}

        <section
          id="about-06"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="PROCESO DE DESARROLLO"
            number="06"
            title="Metodología"
            icon="🔬"
          />

          <p className="about-section-intro">
            El informe define una investigación aplicada, de enfoque cuantitativo y alcance descriptivo, orientada mediante Design Science Research (DSR). El proyecto se organiza en cinco etapas que relacionan el análisis del contexto, la construcción del artefacto y su evaluación.
          </p>

          <div className="about-process">

            <ProcessStep
              number="01"
              title="Investigación y análisis del contexto"
            >
              Revisión de literatura, normativa, documentación
              institucional y referentes nacionales e internacionales
              relacionados con ciberseguridad y protección de datos
              personales.
            </ProcessStep>

            <ProcessStep
              number="02"
              title="Sistematización y estructuración de la información"
            >
              Organización de los contenidos, categorías temáticas,
              criterios normativos y conocimientos que posteriormente
              conforman la base de conocimiento de la plataforma y
              del chatbot.
            </ProcessStep>

            <ProcessStep
              number="03"
              title="Diseño del sistema y modelado conceptual"
            >
              Definición de arquitectura, estructura de datos,
              componentes funcionales, interfaz y flujos de
              interacción conversacional.
            </ProcessStep>

            <ProcessStep
              number="04"
              title="Desarrollo e implementación"
            >
              Construcción de la interfaz web, los servicios de aplicación y los flujos del chatbot. La implementación del almacenamiento relacional previsto debe distinguirse del funcionamiento actual del prototipo.
            </ProcessStep>

            <ProcessStep
              number="05"
              title="Evaluación y validación"
            >
              Pruebas funcionales y de integración, y evaluación prevista con personas usuarias mediante encuesta y cuestionario estructurado. El informe contempla una muestra no probabilística por conveniencia, participación voluntaria y análisis con estadística descriptiva. No se presentan resultados de participantes sin evidencia documentada.
            </ProcessStep>

          </div>

        </section>


        {/* =======================================================
            07. ARQUITECTURA
        ======================================================= */}

        <section
          id="about-07"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="DISEÑO DE LA SOLUCIÓN"
            number="07"
            title="Arquitectura tecnológica"
            icon="💻"
          />

          <p className="about-section-intro">
            La solución tecnológica se estructura mediante
            componentes especializados que trabajan de forma
            integrada para proporcionar una experiencia de
            orientación, educación y prevención.
          </p>

          <div className="about-architecture">

            <div className="about-architecture-node">
              <span>01</span>
              <strong>Frontend</strong>
              <small>React</small>
              <p>
                Interfaz de usuario y navegación de la plataforma.
              </p>
            </div>

            <div className="about-architecture-connector">
              →
            </div>

            <div className="about-architecture-node">
              <span>02</span>
              <strong>Backend</strong>
              <small>Python</small>
              <p>
                Lógica de negocio e integración de servicios.
              </p>
            </div>

            <div className="about-architecture-connector">
              →
            </div>

            <div className="about-architecture-node">
              <span>03</span>
              <strong>Conocimiento estructurado</strong>
              <small>Archivos y reglas del prototipo</small>
              <p>
                Contenidos y reglas definidos en el código; interacción temporal sin almacenamiento relacional implementado.
              </p>
            </div>

          </div>

          <div className="about-grid-2">

            <InfoCard
              label="ARQUITECTURA FUNCIONAL"
              title="Componentes integrados"
            >
              <p>
                La arquitectura relaciona la página web, los
                contenidos educativos, los recursos informativos y
                el chatbot interactivo dentro de una misma solución.
              </p>

              <p>
                El chatbot se integra como un componente funcional
                de la plataforma y no como un sistema independiente.
              </p>
            </InfoCard>

            <InfoCard
              label="DISEÑO DE DATOS PREVISTO"
              title="Gestión estructurada del conocimiento"
            >
              <p>
                El informe contempla un modelo relacional para preguntas, opciones, escenarios, contenidos y recomendaciones. En la versión actual estos elementos se organizan en archivos de datos y módulos de código. La base de datos relacional corresponde al diseño previsto y no se presenta como una funcionalidad implementada.
              </p>
            </InfoCard>

          </div>

        </section>


        {/* =======================================================
            08. COMPONENTES
        ======================================================= */}

        <section
          id="about-08"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="ESTRUCTURA FUNCIONAL"
            number="08"
            title="Componentes de la plataforma"
            icon="🧩"
          />

          <div className="about-grid-2">

            <InfoCard
              label="COMPONENTE 01"
              title="Contenido informativo"
            >
              <p>
                Información organizada sobre protección de datos
                personales, privacidad, seguridad digital, normativa
                y buenas prácticas.
              </p>
            </InfoCard>

            <InfoCard
              label="COMPONENTE 02"
              title="Recursos educativos"
            >
              <p>
                Materiales destinados a facilitar el aprendizaje y
                fortalecer la comprensión de conceptos y prácticas
                relacionadas con la ciudadanía digital.
              </p>
            </InfoCard>

            <InfoCard
              label="COMPONENTE 03"
              title="Orientación ciudadana"
            >
              <p>
                Procesos guiados destinados a ayudar al usuario a
                comprender y enfrentar situaciones relacionadas con
                riesgos digitales y manejo de información personal.
              </p>
            </InfoCard>

            <InfoCard
              label="COMPONENTE 04"
              title="Evaluación preventiva"
            >
              <p>
                Procesos estructurados para analizar prácticas
                relacionadas con seguridad digital y generar
                recomendaciones preventivas.
              </p>
            </InfoCard>

          </div>

        </section>


        {/* =======================================================
            09. CHATBOT
        ======================================================= */}

        <section
          id="about-09"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="INTERACCIÓN GUIADA POR OPCIONES"
            number="09"
            title="Chatbot interactivo"
            icon="🤖"
          />

          <div className="about-highlight-box">

            <div className="about-highlight-icon">
              🤖
            </div>

            <div>

              <h3>
                Un sistema de orientación basado en procesos
                estructurados
              </h3>

              <p>
                El chatbot constituye uno de los componentes centrales
                de la propuesta tecnológica. Su diseño se basa en
                flujos conversacionales estructurados y procesos
                guiados que permiten conducir al usuario a través de
                diferentes situaciones y escenarios.
              </p>

              <p>
                La interacción se realiza exclusivamente seleccionando opciones, sin escribir consultas ni aportar documentos personales. Los recorridos permiten solicitar orientación, aprender y practicar, o revisar hábitos digitales. Las respuestas proceden de contenidos y reglas definidos para el proyecto, sin generación abierta de texto.
              </p>

            </div>

          </div>

          <div className="about-grid-3">

            <InfoCard
              label="MÓDULO 01"
              title="Orientación y asistencia"
            >
              <p>
                Guía al usuario ante situaciones reales relacionadas
                con protección de datos personales y riesgos
                digitales.
              </p>
            </InfoCard>

            <InfoCard
              label="MÓDULO 02"
              title="Educación y simulación"
            >
              <p>
                Ofrece contenidos, preguntas de comprensión y simulaciones por etapas. La retroalimentación identifica si la elección es correcta, explica la respuesta adecuada y propone una acción de mejora sin culpabilizar a la persona.
              </p>
            </InfoCard>

            <InfoCard
              label="MÓDULO 03"
              title="Revisión orientativa de hábitos digitales"
            >
              <p>
                Revisa cinco áreas mediante 25 preguntas: contraseñas, navegación, redes sociales, compras en línea y derechos digitales. Las recomendaciones se organizan por área. La puntuación es un criterio del prototipo basado en respuestas declaradas, no un diagnóstico ni una escala científicamente validada.
              </p>
            </InfoCard>

          </div>

        </section>


        {/* =======================================================
            10. PÚBLICO
        ======================================================= */}

        <section
          id="about-10"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="USUARIOS Y BENEFICIARIOS"
            number="10"
            title="Público objetivo"
            icon="👥"
          />

          <p className="about-section-intro">
            La población principal son personas usuarias de servicios digitales en Costa Rica, en actividades personales, educativas, laborales o comerciales. Los siguientes grupos son posibles beneficiarios; su inclusión no implica que hayan participado en la evaluación del proyecto.
          </p>

          <div className="about-grid-4">

            <InfoCard
              label="01"
              title="Ciudadanía"
            >
              <p>
                Personas que utilizan servicios digitales y desean
                fortalecer sus conocimientos sobre privacidad y
                protección de datos.
              </p>
            </InfoCard>

            <InfoCard
              label="02"
              title="Estudiantes"
            >
              <p>
                Usuarios interesados en desarrollar conocimientos
                relacionados con ciudadanía digital y seguridad.
              </p>
            </InfoCard>

            <InfoCard
              label="03"
              title="Profesionales"
            >
              <p>
                Personas que requieren reforzar buenas prácticas
                relacionadas con el manejo de información personal.
              </p>
            </InfoCard>

            <InfoCard
              label="04"
              title="Instituciones"
            >
              <p>
                Organizaciones que pueden utilizar la plataforma como
                recurso complementario de educación y sensibilización.
              </p>
            </InfoCard>

          </div>

        </section>


        {/* =======================================================
            11. IMPACTO
        ======================================================= */}

        <section
          id="about-11"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="CONTRIBUCIÓN SOCIAL"
            number="11"
            title="Impacto esperado"
            icon="📈"
          />

          <div className="about-grid-2">

            <InfoCard
              label="01"
              title="Fortalecimiento de la educación digital"
            >
              <p>
                Facilitar el acceso a conocimientos sobre protección
                de datos personales y seguridad digital mediante
                contenidos organizados y procesos interactivos.
              </p>
            </InfoCard>

            <InfoCard
              label="02"
              title="Prevención de riesgos"
            >
              <p>
                Promover la identificación temprana de situaciones
                potencialmente riesgosas y la adopción de medidas
                preventivas.
              </p>
            </InfoCard>

            <InfoCard
              label="03"
              title="Mayor comprensión normativa"
            >
              <p>
                Acercar conceptos relacionados con la Ley N.º 8968 y
                la protección de datos personales a usuarios no
                especializados.
              </p>
            </InfoCard>

            <InfoCard
              label="04"
              title="Cultura de seguridad"
            >
              <p>
                Contribuir al desarrollo de hábitos responsables
                relacionados con privacidad, seguridad y manejo de
                información personal.
              </p>
            </InfoCard>

          </div>

        </section>


        {/* =======================================================
            12. INNOVACIÓN
        ======================================================= */}

        <section
          id="about-12"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="VALOR DIFERENCIAL"
            number="12"
            title="Innovación y aporte"
            icon="🚀"
          />

          <div className="about-grid-2">

            <InfoCard
              label="INTEGRACIÓN"
              title="Privacidad + ciberseguridad"
            >
              <p>
                La propuesta integra la protección de datos
                personales con la seguridad digital dentro de una
                experiencia educativa común.
              </p>
            </InfoCard>

            <InfoCard
              label="INTERACTIVIDAD"
              title="Más allá del contenido estático"
            >
              <p>
                El usuario puede recorrer procesos guiados, responder
                preguntas, participar en escenarios y recibir
                recomendaciones.
              </p>
            </InfoCard>

            <InfoCard
              label="CONTEXTUALIZACIÓN"
              title="Enfoque costarricense"
            >
              <p>
                Los contenidos y procesos se contextualizan en el
                marco jurídico, institucional y social de Costa Rica.
              </p>
            </InfoCard>

            <InfoCard
              label="APLICACIÓN"
              title="Tecnología con propósito"
            >
              <p>
                La tecnología se utiliza como medio para atender una
                necesidad concreta de orientación y prevención
                ciudadana.
              </p>
            </InfoCard>

          </div>

        </section>


        {/* =======================================================
            13. RESULTADOS
        ======================================================= */}

        <section
          id="about-13"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="PRODUCTOS Y EVIDENCIAS"
            number="13"
            title="Productos y estado actual"
            icon="📊"
          />

          <p className="about-section-intro">
            La plataforma dispone de contenidos educativos, una biblioteca de recursos y un chatbot guiado. Estos productos se distinguen del diseño de almacenamiento relacional y de la evaluación de usabilidad, utilidad y aceptación con participantes, cuyos resultados requieren evidencia académica específica.
          </p>

          <div className="about-results">

            <div className="about-result-row">
              <span>01</span>
              <div>
                <h3>Base de conocimiento</h3>
                <p>
                  Organización de contenidos sobre ciberseguridad,
                  protección de datos personales, riesgos,
                  normativa y prevención.
                </p>
              </div>
            </div>

            <div className="about-result-row">
              <span>02</span>
              <div>
                <h3>Arquitectura tecnológica</h3>
                <p>
                  Definición de la relación funcional entre los
                  componentes de la plataforma.
                </p>
              </div>
            </div>

            <div className="about-result-row">
              <span>03</span>
              <div>
                <h3>Modelo de datos previsto</h3>
                <p>
                  Diseño de entidades y relaciones contemplado en el informe. El prototipo actual organiza sus contenidos en archivos y módulos de código, sin persistencia relacional implementada.
                </p>
              </div>
            </div>

            <div className="about-result-row">
              <span>04</span>
              <div>
                <h3>Interfaz de usuario</h3>
                <p>
                  Diseño de la organización visual, navegación,
                  contenidos, recursos y acceso al chatbot.
                </p>
              </div>
            </div>

            <div className="about-result-row">
              <span>05</span>
              <div>
                <h3>Flujos conversacionales</h3>
                <p>
                  Definición de recorridos para orientación,
                  educación y evaluación mediante procesos guiados.
                </p>
              </div>
            </div>

            <div className="about-result-row">
              <span>06</span>
              <div>
                <h3>Evaluación de la solución</h3>
                <p>
                  Las verificaciones técnicas del código son distintas de la evaluación con participantes. No se atribuyen resultados de aceptación, utilidad o mejora del aprendizaje hasta documentar los instrumentos, la muestra y el análisis.
                </p>
              </div>
            </div>

          </div>

        </section>


        {/* =======================================================
            14. EQUIPO
        ======================================================= */}

        <section
          id="about-14"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="RESPONSABILIDAD ACADÉMICA"
            number="14"
            title="Equipo académico"
            icon="🎓"
          />

          <div className="about-team-grid">

            <article className="about-team-card about-team-main">

              <div className="about-team-avatar">
                JC
              </div>

              <div>
                <div className="about-card-label">
                  ESTUDIANTE RESPONSABLE DEL TFG
                </div>

                <h3>
                  Joan Enrique Chavarría Peraza
                </h3>

                <p>
                  Licenciatura en Informática con énfasis en Sistemas
                  de Información.
                </p>

                <span>
                  Investigación · Diseño · Desarrollo · Evaluación
                </span>
              </div>

            </article>


            <article className="about-team-card">

              <div className="about-team-avatar">
                MV
              </div>

              <div>
                <div className="about-card-label">
                  PERSONA TUTORA
                </div>

                <h3>
                  Dra. María Marcela Vargas Sibaja
                </h3>

                <p>
                  Académica SRCH Campus Nicoya.
                </p>
              </div>

            </article>


            <article className="about-team-card">

              <div className="about-team-avatar">
                CC
              </div>

              <div>
                <div className="about-card-label">
                  PERSONA ASESORA 1
                </div>

                <h3>
                  M. Sc. Cristian Cháves Jaén
                </h3>

                <p>
                  Académico SRCH Campus Liberia.
                </p>
              </div>

            </article>


            <article className="about-team-card">

              <div className="about-team-avatar">
                DT
              </div>

              <div>
                <div className="about-card-label">
                  PERSONA ASESORA 2
                </div>

                <h3>
                  M. Sc. Doanson Torres Carrillo
                </h3>

                <p>
                  Académico SRCH Campus Nicoya y Administrativo
                  Coordinador de TI Campus Nicoya.
                </p>
              </div>

            </article>

          </div>

        </section>


        {/* =======================================================
            15. TECNOLOGÍAS
        ======================================================= */}

        <section
          id="about-15"
          className="about-content-section"
        >

          <SectionHeader
            eyebrow="ECOSISTEMA TECNOLÓGICO"
            number="15"
            title="Tecnologías y herramientas"
            icon="⚙️"
          />

          <div className="about-tech-grid">

            <article className="about-tech-card">
              <div className="about-tech-icon">
                ⚛️
              </div>

              <div>
                <span>FRONTEND</span>
                <h3>React</h3>

                <p>
                  Desarrollo de la interfaz de usuario y estructura
                  visual de la plataforma web.
                </p>
              </div>
            </article>


            <article className="about-tech-card">
              <div className="about-tech-icon">
                🐍
              </div>

              <div>
                <span>BACKEND</span>
                <h3>Python · FastAPI</h3>

                <p>
                  Implementación de la lógica de negocio y
                  componentes asociados al funcionamiento del sistema.
                </p>
              </div>
            </article>


            <article className="about-tech-card">
              <div className="about-tech-icon">
                🗄️
              </div>

              <div>
                <span>DATOS</span>
                <h3>Conocimiento estructurado</h3>

                <p>
                  Archivos de datos y módulos con contenidos, preguntas, opciones y reglas. El modelo relacional figura como parte del diseño previsto en el informe.
                </p>
              </div>
            </article>


            <article className="about-tech-card">
              <div className="about-tech-icon">
                🤖
              </div>

              <div>
                <span>INTERACCIÓN</span>
                <h3>Chatbot interactivo</h3>

                <p>
                  Procesos conversacionales estructurados para
                  orientación, educación y evaluación preventiva.
                </p>
              </div>
            </article>

          </div>

        </section>


        {/* =======================================================
            16. PROPÓSITO
        ======================================================= */}

        <section
          id="about-16"
          className="about-content-section about-final-section"
        >

          <SectionHeader
            eyebrow="CIERRE DEL PROYECTO"
            number="16"
            title="Consideraciones y propósito"
            icon="🛡️"
          />

          <div className="about-final-box">

            <div className="about-final-icon">
              🛡️
            </div>

            <div>

              <h3>
                Tecnología, conocimiento y responsabilidad ciudadana
              </h3>

              <p>
                Este proyecto se desarrolla con una finalidad
                académica y educativa. La plataforma busca facilitar
                el acceso a conocimientos relacionados con protección
                de datos personales y seguridad digital, promoviendo
                una ciudadanía capaz de reconocer riesgos y adoptar
                prácticas preventivas.
              </p>

              <p>
                La solución no pretende sustituir el asesoramiento
                jurídico, institucional o profesional. Su propósito
                es funcionar como una herramienta educativa y de
                orientación que facilite la comprensión inicial de
                situaciones relacionadas con privacidad, datos
                personales y seguridad digital.
              </p>

              <p>
                Desde la perspectiva de Sistemas de Información, el
                proyecto representa la integración de investigación,
                gestión del conocimiento, diseño de sistemas,
                desarrollo tecnológico y evaluación de usuarios en una
                solución orientada a una necesidad concreta del
                contexto costarricense.
              </p>

            </div>

          </div>


          <div className="about-closing-message">

            <span>
              TRABAJO FINAL DE GRADUACIÓN · 2026
            </span>

            <h3>
              Protección de Datos Personales en Costa Rica
            </h3>

            <p>
              Universidad Nacional · Licenciatura en Informática con énfasis en Sistemas de Información
            </p>

          </div>

        </section>

      <section id="about-17" className="about-content-section">
        <SectionHeader eyebrow="FUNDAMENTACIÓN DOCUMENTAL" number="17" title="Referencias de apoyo" icon="📚" />
        <p className="about-section-intro">La identidad, los objetivos y la metodología se sintetizan del borrador del informe final del TFG proporcionado por su autor (Chavarría Peraza, 2026). Las siguientes fuentes respaldan el contexto normativo y de gestión del riesgo; las características técnicas se describen según la implementación actual.</p>
        <div className="bibliography-list">
          <p className="apa-reference">Chavarría Peraza, J. E. (2026). <em>Diseño de una página web con chatbot interactivo para la orientación ciudadana en protección de datos personales en Costa Rica</em> [Borrador de informe final de Trabajo Final de Graduación, Universidad Nacional]. Documento proporcionado por el autor.</p>
          {projectReferences.map(item => <ApaReference key={item.id} reference={{ ...item.reference, suffix: "" }} />)}
        </div>
      </section>
      </main>

    </div>
  );
}