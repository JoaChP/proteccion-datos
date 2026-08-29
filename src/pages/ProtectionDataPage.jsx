import './ProtectionDataPage.css'

const sections = [
  {
    id: 'conceptos',
    icon: '📋',
    title: '1. Conceptos fundamentales',
    intro:
      'La protección de datos personales comienza con la comprensión de qué información identifica o puede relacionarse con una persona y por qué debe tratarse de manera responsable.',
    blocks: [
      {
        title: '¿Qué son los datos personales?',
        text:
          'Los datos personales son información relacionada con una persona identificada o identificable. En la vida cotidiana pueden encontrarse en documentos, formularios, redes sociales, aplicaciones, servicios bancarios, plataformas educativas, comercios electrónicos y otros servicios digitales.',
      },
      {
        title: 'Ejemplos',
        list: [
          'Nombre y apellidos.',
          'Número de identificación.',
          'Dirección y número telefónico.',
          'Correo electrónico.',
          'Fotografías.',
          'Información académica o laboral.',
          'Información financiera.',
          'Datos de ubicación.',
          'Identificadores de dispositivos.',
          'Información relacionada con actividades y hábitos digitales.',
        ],
      },
      {
        title: 'Datos que requieren especial cuidado',
        text:
          'Determinada información puede generar consecuencias importantes si se divulga o utiliza indebidamente. Entre ella se encuentran información financiera, documentos de identidad, credenciales de acceso, información biométrica y otros datos vinculados con aspectos privados de la persona.',
      },
    ],
  },

  {
    id: 'importancia',
    icon: '🛡️',
    title: '2. ¿Por qué debemos protegerlos?',
    intro:
      'La información personal posee valor para las personas, las organizaciones y también para quienes intentan utilizarla de manera indebida.',
    blocks: [
      {
        title: 'Riesgos asociados',
        list: [
          'Robo o suplantación de identidad.',
          'Fraudes electrónicos.',
          'Acceso no autorizado a cuentas.',
          'Divulgación de información privada.',
          'Pérdidas económicas.',
          'Daños reputacionales.',
          'Uso indebido de información personal.',
          'Creación de perfiles sin conocimiento del titular.',
        ],
      },
      {
        title: 'La protección es preventiva',
        text:
          'Proteger los datos no significa únicamente reaccionar después de un incidente. También implica identificar qué información se comparte, con quién se comparte, para qué se utilizará y qué medidas pueden reducir una exposición innecesaria.',
      },
    ],
  },

  {
    id: 'principios',
    icon: '⚖️',
    title: '3. Principios de protección de datos',
    intro:
      'Los principios permiten establecer criterios para determinar cómo debe realizarse un tratamiento responsable de los datos personales.',
    blocks: [
      {
        title: 'Consentimiento e información',
        text:
          'Cuando corresponda obtener consentimiento, la persona debe contar con información suficiente para comprender qué datos serán tratados y con qué finalidad.',
      },
      {
        title: 'Finalidad',
        text:
          'Los datos deben recopilarse y utilizarse para finalidades determinadas y legítimas. La existencia de un dato en una base de datos no significa que pueda utilizarse para cualquier propósito.',
      },
      {
        title: 'Calidad y exactitud',
        text:
          'La información debe mantenerse correcta, completa y actualizada cuando sea necesario. Los datos incorrectos pueden producir decisiones o actuaciones equivocadas.',
      },
      {
        title: 'Minimización',
        text:
          'Debe evitarse solicitar o proporcionar información que no resulte necesaria para la finalidad correspondiente. Compartir más datos de los necesarios puede incrementar innecesariamente el riesgo.',
      },
      {
        title: 'Seguridad',
        text:
          'Los datos deben protegerse mediante medidas técnicas y organizativas apropiadas frente a pérdida, alteración, acceso no autorizado, divulgación o utilización indebida.',
      },
      {
        title: 'Confidencialidad',
        text:
          'La información personal debe manejarse de manera que solamente las personas autorizadas puedan acceder a ella cuando corresponda.',
      },
      {
        title: 'Responsabilidad',
        text:
          'La protección de datos requiere que las organizaciones adopten medidas y procedimientos que permitan demostrar que gestionan adecuadamente los riesgos asociados con el tratamiento de información personal.',
      },
    ],
  },

  {
    id: 'derechos',
    icon: '👤',
    title: '4. Derechos de las personas',
    intro:
      'Conocer los derechos relacionados con los datos personales permite a las personas ejercer un mayor control sobre la información que las identifica o que puede asociarse con ellas.',
    blocks: [
      {
        title: 'Acceso',
        text:
          'Permite conocer información relacionada con los datos personales que están siendo tratados y solicitar acceso a ellos cuando corresponda.',
      },
      {
        title: 'Rectificación',
        text:
          'Permite solicitar la corrección de información que sea incorrecta, incompleta o inexacta.',
      },
      {
        title: 'Cancelación o supresión',
        text:
          'Permite solicitar la eliminación o cancelación de información cuando las condiciones jurídicas aplicables permitan ejercer este derecho.',
      },
      {
        title: 'Oposición',
        text:
          'Permite oponerse a determinados tratamientos cuando se cumplan las condiciones establecidas por la normativa aplicable.',
      },
      {
        title: 'Autodeterminación informativa',
        text:
          'La protección de datos se relaciona con la capacidad de las personas para conocer y ejercer control sobre el tratamiento de su información personal.',
      },
    ],
  },

  {
    id: 'tratamiento',
    icon: '🔄',
    title: '5. Tratamiento de datos personales',
    intro:
      'El tratamiento de datos no consiste únicamente en almacenar información. Comprende diferentes operaciones realizadas sobre los datos.',
    blocks: [
      {
        title: 'Operaciones de tratamiento',
        list: [
          'Recopilación.',
          'Registro.',
          'Organización.',
          'Almacenamiento.',
          'Consulta.',
          'Utilización.',
          'Modificación.',
          'Comunicación.',
          'Transferencia.',
          'Conservación.',
          'Eliminación.',
        ],
      },
      {
        title: 'Una pregunta fundamental',
        text:
          'Antes de entregar información personal conviene preguntarse: ¿quién la solicita?, ¿para qué la necesita?, ¿qué información solicita?, ¿es realmente necesaria?, ¿quién tendrá acceso y cómo será protegida?',
      },
    ],
  },

  {
    id: 'costa-rica',
    icon: '🇨🇷',
    title: '6. Protección de datos en Costa Rica',
    intro:
      'Costa Rica cuenta con un marco jurídico específico para la protección de las personas frente al tratamiento de sus datos personales.',
    blocks: [
      {
        title: 'Ley N.º 8968',
        text:
          'La Ley N.º 8968, Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales, constituye el principal marco costarricense de referencia en esta materia. Su finalidad está relacionada con la protección de las personas frente al tratamiento de sus datos y con la garantía de la autodeterminación informativa.',
      },
      {
        title: '¿Qué busca proteger?',
        list: [
          'La privacidad de las personas.',
          'El control sobre la información personal.',
          'El tratamiento responsable de los datos.',
          'Los derechos de las personas titulares.',
          'La seguridad y confidencialidad de la información.',
        ],
      },
      {
        title: 'Importancia para la ciudadanía',
        text:
          'Conocer la Ley N.º 8968 permite comprender que la protección de los datos personales no depende únicamente de medidas tecnológicas. También existe un componente jurídico que reconoce derechos y establece responsabilidades.',
      },
    ],
  },

  {
    id: 'instituciones',
    icon: '🏛️',
    title: '7. Instituciones relacionadas en Costa Rica',
    intro:
      'La protección de datos y la seguridad digital requieren coordinación entre diferentes instituciones y actores nacionales.',
    blocks: [
      {
        title: 'PRODHAB',
        text:
          'La Agencia de Protección de Datos de los Habitantes (PRODHAB) es la institución directamente relacionada con la protección de los datos personales y la supervisión del cumplimiento del marco jurídico correspondiente.',
      },
      {
        title: 'MICITT',
        text:
          'El Ministerio de Ciencia, Innovación, Tecnología y Telecomunicaciones participa en la formulación de políticas y estrategias nacionales relacionadas con transformación digital y ciberseguridad.',
      },
      {
        title: 'CSIRT-CR',
        text:
          'El CSIRT-CR participa en acciones de prevención, coordinación y respuesta ante incidentes de ciberseguridad dentro de su ámbito de actuación.',
      },
      {
        title: 'OIJ',
        text:
          'El Organismo de Investigación Judicial participa en la investigación de delitos, incluidos aquellos relacionados con medios tecnológicos y entornos digitales.',
      },
    ],
  },

  {
    id: 'situaciones',
    icon: '📱',
    title: '8. Protección de datos en situaciones cotidianas',
    intro:
      'La protección de datos forma parte de actividades que realizamos diariamente. Identificar los riesgos permite tomar decisiones más seguras.',
    blocks: [
      {
        title: 'Redes sociales',
        list: [
          'Revisa quién puede visualizar tu información.',
          'Evita publicar documentos personales.',
          'No publiques información financiera.',
          'Evita revelar ubicaciones precisas innecesariamente.',
          'Revisa las aplicaciones conectadas a tus perfiles.',
        ],
      },
      {
        title: 'Aplicaciones',
        list: [
          'Descarga aplicaciones desde fuentes confiables.',
          'Revisa los permisos solicitados.',
          'Comprueba si los permisos son necesarios para la función ofrecida.',
          'Revisa periódicamente las aplicaciones instaladas.',
        ],
      },
      {
        title: 'Compras en línea',
        list: [
          'Verifica la identidad y reputación del comercio.',
          'Comprueba el dominio antes de introducir información.',
          'Evita enviar información financiera por canales informales.',
          'Conserva comprobantes de operaciones importantes.',
        ],
      },
      {
        title: 'Formularios y servicios digitales',
        text:
          'Antes de proporcionar información, identifica qué datos se solicitan y cuál es la finalidad del tratamiento. Evita proporcionar información adicional cuando no sea necesaria.',
      },
    ],
  },

  {
    id: 'uso-indebido',
    icon: '🚨',
    title: '9. ¿Qué hacer ante un uso indebido?',
    intro:
      'Cuando una persona sospecha que su información ha sido utilizada de manera indebida, debe actuar de forma ordenada y conservar información que pueda ayudar a documentar la situación.',
    blocks: [
      {
        title: 'Medidas iniciales',
        list: [
          'Identifica qué información pudo haber sido expuesta.',
          'Conserva correos, mensajes, comprobantes o capturas relacionados con el caso.',
          'Cambia credenciales cuando exista riesgo de acceso a una cuenta.',
          'Revisa la actividad de las cuentas involucradas.',
          'Utiliza canales oficiales de la organización correspondiente.',
          'Busca orientación institucional cuando corresponda.',
        ],
      },
      {
        title: 'PRODHAB',
        text:
          'Cuando la situación se relaciona específicamente con el tratamiento de datos personales, PRODHAB constituye una referencia institucional para obtener orientación y conocer los mecanismos disponibles conforme al marco costarricense.',
      },
      {
        title: 'Importante',
        text:
          'La plataforma ofrece orientación educativa e informativa. No sustituye los procedimientos oficiales, asesoría jurídica ni la atención de emergencias.',
      },
    ],
  },

  {
    id: 'internacional',
    icon: '🌎',
    title: '10. Perspectiva internacional',
    intro:
      'El análisis internacional desarrollado para el proyecto permite comparar diferentes modelos de protección de datos y extraer prácticas que pueden contribuir al fortalecimiento del contexto costarricense.',
    countries: [
      {
        name: 'Unión Europea',
        flag: '🇪🇺',
        text:
          'El Reglamento General de Protección de Datos (RGPD) constituye uno de los principales referentes internacionales. Destaca por sus principios, derechos de los titulares, responsabilidad proactiva y enfoques como la protección de datos desde el diseño y por defecto.',
      },
      {
        name: 'España',
        flag: '🇪🇸',
        text:
          'Combina regulación, supervisión, educación y mecanismos de orientación ciudadana mediante instituciones especializadas en protección de datos y ciberseguridad.',
      },
      {
        name: 'Canadá',
        flag: '🇨🇦',
        text:
          'Su modelo destaca la responsabilidad de las organizaciones y la necesidad de adoptar medidas apropiadas para proteger la información personal.',
      },
      {
        name: 'Australia',
        flag: '🇦🇺',
        text:
          'Integra protección de privacidad, derechos de las personas, supervisión institucional y medidas orientadas a fortalecer la confianza digital.',
      },
      {
        name: 'Japón',
        flag: '🇯🇵',
        text:
          'Su modelo combina regulación, supervisión y actualización frente a nuevos escenarios tecnológicos y riesgos emergentes.',
      },
      {
        name: 'Singapur',
        flag: '🇸🇬',
        text:
          'Integra protección de datos, gobernanza, cumplimiento, formación y cultura de privacidad dentro de un ecosistema nacional de transformación digital.',
      },
    ],
  },

  {
    id: 'lecciones',
    icon: '🌐',
    title: '11. Lecciones para Costa Rica',
    intro:
      'El análisis comparativo evidencia que la protección efectiva de los datos personales requiere más que una legislación formal.',
    blocks: [
      {
        title: 'Elementos comunes de los modelos analizados',
        list: [
          'Marcos jurídicos definidos.',
          'Instituciones especializadas.',
          'Mecanismos de supervisión.',
          'Gestión del riesgo.',
          'Cooperación entre sectores.',
          'Educación y concienciación ciudadana.',
          'Actualización normativa y tecnológica.',
          'Mejora continua.',
        ],
      },
      {
        title: 'Una protección integral',
        text:
          'La experiencia internacional muestra que la legislación, las instituciones, la tecnología y la educación deben funcionar de manera complementaria. Para Costa Rica, esto representa una oportunidad para fortalecer tanto las capacidades institucionales como el conocimiento ciudadano sobre privacidad y seguridad digital.',
      },
    ],
  },

  {
    id: 'buenas-practicas',
    icon: '✅',
    title: '12. Buenas prácticas para proteger tus datos',
    intro:
      'La protección de datos también depende de decisiones cotidianas. Estas prácticas ayudan a reducir la exposición innecesaria.',
    blocks: [
      {
        title: 'Antes de compartir información',
        list: [
          'Pregúntate quién solicita los datos.',
          'Identifica la finalidad.',
          'Comprueba si la solicitud es necesaria.',
          'Evita entregar información adicional.',
        ],
      },
      {
        title: 'En tus cuentas',
        list: [
          'Utiliza contraseñas únicas.',
          'Activa autenticación multifactor.',
          'Revisa periódicamente los accesos.',
          'No compartas códigos de autenticación.',
        ],
      },
      {
        title: 'En Internet',
        list: [
          'Verifica dominios y sitios web.',
          'Evita enlaces inesperados.',
          'Mantén dispositivos y aplicaciones actualizados.',
          'Utiliza fuentes confiables.',
        ],
      },
      {
        title: 'En redes sociales',
        list: [
          'Limita la información pública.',
          'Revisa la privacidad de tus perfiles.',
          'Controla aplicaciones conectadas.',
          'Piensa antes de publicar información personal.',
        ],
      },
    ],
  },
]

function SectionBlock({ block }) {
  return (
    <article className="protection-data__block">
      <h3>{block.title}</h3>

      {block.text && <p>{block.text}</p>}

      {block.list && (
        <ul>
          {block.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default function ProtectionDataPage() {
  return (
    <main
      id="main-content"
      className="protection-data"
    >
      <header className="protection-data__hero">
        <div className="protection-data__hero-content">
          <span className="protection-data__eyebrow">
            EDUCACIÓN CIUDADANA · PRIVACIDAD · DERECHOS DIGITALES
          </span>

          <h1>Protección de Datos Personales</h1>

          <p>
            Conoce los conceptos fundamentales, principios, derechos,
            responsabilidades y buenas prácticas relacionadas con el
            tratamiento de datos personales, con especial atención al
            contexto costarricense.
          </p>

          <div className="protection-data__hero-tags">
            <span>🇨🇷 Costa Rica</span>
            <span>⚖️ Ley N.º 8968</span>
            <span>🛡️ Privacidad</span>
            <span>🎓 Educación digital</span>
          </div>
        </div>
      </header>

      <section className="protection-data__intro">
        <div className="protection-data__intro-card">
          <span className="protection-data__intro-icon">🔐</span>

          <div>
            <h2>La protección de datos es una responsabilidad compartida</h2>

            <p>
              La transformación digital ha incrementado la cantidad de
              información personal que se recopila, almacena, utiliza y
              comparte. Proteger estos datos requiere comprender los
              derechos de las personas, las responsabilidades de quienes
              realizan tratamientos y las medidas preventivas que pueden
              aplicarse en la vida cotidiana.
            </p>

            <p>
              Esta sección reúne información educativa para facilitar la
              comprensión de estos conceptos y fortalecer la capacidad
              de la ciudadanía para tomar decisiones informadas sobre
              su información personal.
            </p>
          </div>
        </div>
      </section>

      <nav
        className="protection-data__navigation"
        aria-label="Contenido de Protección de Datos"
      >
        {sections.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="protection-data__nav-item"
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span>{section.icon}</span>
            <strong>{section.title.replace(/^\d+\.\s/, '')}</strong>
          </a>
        ))}
      </nav>

      <div className="protection-data__content">
        {sections.map(section => (
          <section
            key={section.id}
            id={section.id}
            className="protection-data__section"
          >
            <div className="protection-data__section-heading">
              <span className="protection-data__section-icon">
                {section.icon}
              </span>

              <div>
                <span className="protection-data__section-kicker">
                  EDUCACIÓN
                </span>

                <h2>{section.title}</h2>
              </div>
            </div>

            <p className="protection-data__section-intro">
              {section.intro}
            </p>

            {section.blocks && (
              <div className="protection-data__blocks">
                {section.blocks.map((block, index) => (
                  <SectionBlock
                    key={`${section.id}-${index}`}
                    block={block}
                  />
                ))}
              </div>
            )}

            {section.countries && (
              <div className="protection-data__countries">
                {section.countries.map(country => (
                  <article
                    key={country.name}
                    className="protection-data__country"
                  >
                    <span className="protection-data__country-flag">
                      {country.flag}
                    </span>

                    <div>
                      <h3>{country.name}</h3>
                      <p>{country.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <section className="protection-data__closing">
        <div>
          <span className="protection-data__closing-icon">🎓</span>

          <h2>
            Aprender también es una forma de protegerse
          </h2>

          <p>
            Comprender cómo se recopilan, utilizan y protegen los datos
            personales permite tomar mejores decisiones frente a los
            riesgos digitales y conocer los mecanismos disponibles para
            ejercer los derechos correspondientes.
          </p>
        </div>
      </section>
    </main>
  )
}