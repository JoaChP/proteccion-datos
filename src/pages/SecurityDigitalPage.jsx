import { useEffect } from 'react'
import './SecurityDigitalPage.css'

/*
 * ============================================================
 * SEGURIDAD DIGITAL
 * Módulo educativo de nivel universitario
 * ============================================================
 *
 * Estructura académica:
 *
 * 01. Fundamentos conceptuales
 * 02. Evolución de la seguridad digital
 * 03. Principios de seguridad de la información
 * 04. Gestión y evaluación del riesgo
 * 05. Amenazas y escenarios contemporáneos
 * 06. Ingeniería social y factor humano
 * 07. Malware, ransomware y fugas de información
 * 08. Tecnologías emergentes e inteligencia artificial
 * 09. Ciberseguridad y seguridad de la información
 * 10. Marcos y estándares internacionales
 * 11. Seguridad digital en Costa Rica
 * 12. Diagnóstico de la situación nacional
 * 13. Estrategia Nacional de Ciberseguridad 2023–2027
 * 14. Comparación internacional
 * 15. Educación, cultura y prevención
 * 16. Aplicación al proyecto
 * 17. Referencias
 *
 * El contenido se fundamenta en la investigación documental
 * desarrollada para el TFG y en las fuentes bibliográficas
 * incorporadas en dicho trabajo.
 * ============================================================
 */

const sections = [
  {
    id: 'fundamentos',
    number: '01',
    icon: '🛡️',
    title: 'Fundamentos conceptuales',
    kicker: 'SEGURIDAD DIGITAL · CONCEPTOS',
    intro:
      'La seguridad digital constituye un campo multidimensional orientado a proteger los activos, sistemas, redes, servicios e información que forman parte del ecosistema digital. Su análisis requiere considerar simultáneamente factores tecnológicos, organizacionales, humanos y de gobernanza, debido a que los riesgos digitales no se originan exclusivamente en fallas técnicas, sino también en decisiones, comportamientos, procesos y condiciones institucionales.',

    blocks: [
      {
        title: 'Seguridad digital y ciberseguridad',
        text:
          'La seguridad digital puede comprenderse como el conjunto de capacidades, prácticas y medidas destinadas a reducir los riesgos asociados con el uso de tecnologías y servicios digitales. La ciberseguridad constituye una dimensión central de este campo y se relaciona con la capacidad de prevenir, detectar, responder y recuperarse frente a eventos que puedan comprometer sistemas, redes, dispositivos o información. Desde una perspectiva de gestión del riesgo, la seguridad no debe entenderse como una condición absoluta, sino como un proceso continuo de identificación, tratamiento y monitoreo de riesgos (NIST, 2024a; OECD, 2022).',
      },
      {
        title: 'Seguridad de la información',
        text:
          'La seguridad de la información se concentra en preservar propiedades fundamentales de la información frente a amenazas que puedan modificarla, divulgarla, destruirla o impedir su utilización. El enfoque tradicional se estructura alrededor de la confidencialidad, la integridad y la disponibilidad, conocidas como la tríada CIA. Estas propiedades constituyen una referencia fundamental para determinar los objetivos de protección y seleccionar controles proporcionales a los riesgos identificados (ISO, 2022; NIST, 2024a).',
      },
      {
        title: 'Confidencialidad, integridad y disponibilidad',
        text:
          'La confidencialidad procura impedir el acceso o divulgación no autorizada; la integridad busca preservar la exactitud, consistencia y confiabilidad de la información; y la disponibilidad pretende garantizar que los recursos permanezcan accesibles cuando sean requeridos por usuarios autorizados. Una alteración en cualquiera de estas dimensiones puede generar consecuencias operativas, económicas, jurídicas o sociales, especialmente cuando se trata de servicios esenciales o información personal (NIST, 2024a; ISO, 2022).',
      },
      {
        title: 'Dimensión humana y organizacional',
        text:
          'La seguridad digital no depende exclusivamente de herramientas tecnológicas. Las políticas internas, la capacitación, la cultura organizacional, la definición de responsabilidades y la capacidad de toma de decisiones influyen directamente en la exposición al riesgo. La OCDE plantea que la seguridad digital debe incorporarse a la gestión estratégica y considerar factores tecnológicos, organizacionales y humanos como componentes interdependientes (OECD, 2022).',
      },
    ],
  },

  {
    id: 'evolucion',
    number: '02',
    icon: '↗️',
    title: 'Evolución de la seguridad digital',
    kicker: 'TRANSFORMACIÓN TECNOLÓGICA',
    intro:
      'La seguridad digital ha evolucionado paralelamente al desarrollo de las tecnologías de información y comunicación. La expansión de Internet, la computación en la nube, los dispositivos móviles, el Internet de las cosas y los servicios digitales ha generado nuevas oportunidades de desarrollo, pero también ha ampliado la superficie de exposición de personas, empresas e instituciones.',

    blocks: [
      {
        title: 'De la seguridad informática a la ciberseguridad',
        text:
          'Los primeros enfoques de seguridad informática se concentraban principalmente en proteger equipos, sistemas locales y redes institucionales. La creciente interconexión entre sistemas transformó este escenario y produjo una transición hacia modelos de ciberseguridad orientados a ecosistemas digitales más amplios. Actualmente, las organizaciones deben considerar no solo sus propios sistemas, sino también proveedores, servicios externos, usuarios y cadenas de suministro digitales (UIT, 2018; NIST, 2024a).',
      },
      {
        title: 'Transformación digital',
        text:
          'La transformación digital ha incrementado la dependencia de servicios tecnológicos para actividades financieras, educativas, comerciales, administrativas y sociales. Como consecuencia, una interrupción de los servicios digitales puede generar impactos que trascienden el ámbito tecnológico y afectar procesos esenciales de las organizaciones y de la ciudadanía. Esta dependencia convierte la resiliencia digital en un componente estratégico de la continuidad operativa (Banco Mundial, 2023; OECD, 2022).',
      },
      {
        title: 'Computación en la nube y servicios distribuidos',
        text:
          'La adopción de servicios en la nube ha modificado la manera en que las organizaciones almacenan información, procesan datos y despliegan aplicaciones. Aunque estos modelos ofrecen escalabilidad y flexibilidad, también introducen nuevas responsabilidades relacionadas con configuración, identidades, acceso, protección de datos, continuidad y dependencia de proveedores externos. Por ello, la seguridad debe incorporarse desde el diseño de la arquitectura y durante todo el ciclo de operación.',
      },
      {
        title: 'Ampliación de la superficie de ataque',
        text:
          'La interconexión creciente de dispositivos, aplicaciones, servicios y plataformas incrementa los puntos potenciales desde los cuales puede producirse un incidente. La expansión de la superficie de ataque obliga a adoptar mecanismos de identificación, monitoreo y protección que consideren tanto infraestructura tradicional como servicios digitales emergentes (ENISA, 2025a; NIST, 2024a).',
      },
    ],
  },

  {
    id: 'principios',
    number: '03',
    icon: '🔐',
    title: 'Principios de seguridad de la información',
    kicker: 'PRINCIPIOS FUNDAMENTALES',
    intro:
      'Los principios de seguridad permiten establecer criterios para diseñar, implementar y evaluar controles destinados a reducir riesgos. Estos principios deben interpretarse de manera complementaria, debido a que una medida efectiva de seguridad requiere combinar controles técnicos, administrativos y humanos.',

    principles: [
      {
        number: '01',
        title: 'Confidencialidad',
        text:
          'Garantiza que la información solamente sea accesible para personas, procesos o sistemas autorizados.',
      },
      {
        number: '02',
        title: 'Integridad',
        text:
          'Busca preservar la exactitud, consistencia y confiabilidad de la información durante su procesamiento y almacenamiento.',
      },
      {
        number: '03',
        title: 'Disponibilidad',
        text:
          'Procura que los sistemas y datos estén disponibles cuando sean requeridos por usuarios autorizados.',
      },
      {
        number: '04',
        title: 'Mínimo privilegio',
        text:
          'Limita los permisos de usuarios y procesos a aquellos estrictamente necesarios para cumplir una función.',
      },
      {
        number: '05',
        title: 'Defensa en profundidad',
        text:
          'Utiliza múltiples capas de controles para evitar que una única falla permita comprometer completamente un sistema.',
      },
      {
        number: '06',
        title: 'Seguridad por diseño',
        text:
          'Integra requisitos de seguridad desde las primeras etapas del diseño y desarrollo de sistemas y servicios.',
      },
    ],

    analysis: {
      title: 'La seguridad como proceso continuo',
      paragraphs: [
        'Los principios de seguridad no deben aplicarse como controles aislados. Su efectividad depende de la capacidad de una organización para relacionarlos con sus activos, riesgos, procesos y objetivos institucionales. El enfoque basado en riesgo permite priorizar recursos y establecer controles de acuerdo con la probabilidad e impacto de los eventos adversos (NIST, 2024a).',
        'Desde esta perspectiva, la seguridad debe evaluarse periódicamente. Los cambios tecnológicos, nuevos servicios, modificaciones organizacionales y evolución de las amenazas pueden alterar el nivel de exposición y requerir ajustes en las medidas de protección (ISO, 2022; OECD, 2022).',
      ],
    },
  },

  {
    id: 'riesgo',
    number: '04',
    icon: '📊',
    title: 'Gestión y evaluación del riesgo',
    kicker: 'GESTIÓN DEL RIESGO DIGITAL',
    intro:
      'La gestión del riesgo constituye uno de los componentes centrales de la ciberseguridad contemporánea. En lugar de asumir que todos los riesgos pueden eliminarse, el enfoque busca identificarlos, analizarlos, priorizarlos y establecer medidas que reduzcan sus posibles consecuencias.',

    riskFlow: [
      {
        step: '01',
        title: 'Activo',
        text: 'Identificar información, sistemas, servicios y recursos que requieren protección.',
      },
      {
        step: '02',
        title: 'Amenaza',
        text: 'Determinar eventos o actores capaces de generar consecuencias adversas.',
      },
      {
        step: '03',
        title: 'Vulnerabilidad',
        text: 'Identificar debilidades que podrían ser aprovechadas por una amenaza.',
      },
      {
        step: '04',
        title: 'Impacto',
        text: 'Estimar las consecuencias que tendría la materialización del riesgo.',
      },
      {
        step: '05',
        title: 'Tratamiento',
        text: 'Seleccionar controles para reducir, transferir, evitar o aceptar el riesgo.',
      },
    ],

    blocks: [
      {
        title: 'Identificación del riesgo',
        text:
          'La primera etapa consiste en comprender qué activos deben protegerse y cuáles son las amenazas y vulnerabilidades que pueden afectar su funcionamiento. Esta identificación permite construir una visión estructurada de la exposición institucional y establecer prioridades de protección (NIST, 2024a).',
      },
      {
        title: 'Análisis y evaluación',
        text:
          'El análisis del riesgo permite estimar la probabilidad de ocurrencia y las consecuencias potenciales de un evento. La evaluación posterior permite comparar los resultados con criterios institucionales para determinar cuáles riesgos requieren tratamiento prioritario.',
      },
      {
        title: 'Tratamiento del riesgo',
        text:
          'Las organizaciones pueden adoptar diferentes estrategias de tratamiento, entre ellas evitar determinadas actividades, reducir la probabilidad o impacto mediante controles, transferir determinadas consecuencias o aceptar riesgos cuando estos se encuentran dentro de los niveles establecidos.',
      },
      {
        title: 'Riesgo residual',
        text:
          'La implementación de controles no significa que el riesgo desaparezca completamente. El riesgo que permanece después de aplicar medidas de tratamiento se denomina riesgo residual y debe mantenerse bajo seguimiento para determinar si continúa siendo aceptable.',
      },
    ],
  },

  {
    id: 'amenazas',
    number: '05',
    icon: '🚨',
    title: 'Amenazas y escenarios contemporáneos',
    kicker: 'PANORAMA DE AMENAZAS',
    intro:
      'El panorama contemporáneo de amenazas digitales presenta una combinación de técnicas tradicionales y nuevas modalidades de ataque. La evolución tecnológica ha incrementado tanto la capacidad defensiva como las posibilidades de automatización y sofisticación de los actores maliciosos.',

    blocks: [
      {
        title: 'Phishing',
        text:
          'El phishing utiliza comunicaciones, sitios web o mensajes fraudulentos para inducir a las personas a revelar información, descargar contenido malicioso o ejecutar determinadas acciones. Su efectividad demuestra que los controles tecnológicos deben complementarse con educación y capacidad de análisis por parte de los usuarios (ENISA, 2025a; OEA, 2021).',
      },
      {
        title: 'Robo de credenciales',
        text:
          'Las credenciales representan uno de los principales mecanismos de acceso a servicios digitales. Su compromiso puede permitir accesos no autorizados y facilitar movimientos posteriores dentro de sistemas o cuentas. La autenticación multifactor, la gestión adecuada de contraseñas y el monitoreo constituyen medidas relevantes para disminuir este riesgo.',
      },
      {
        title: 'Explotación de vulnerabilidades',
        text:
          'Las vulnerabilidades presentes en sistemas, aplicaciones o dispositivos pueden ser aprovechadas para obtener acceso, modificar información o interrumpir servicios. La gestión de vulnerabilidades requiere identificación, priorización, actualización y seguimiento continuo.',
      },
      {
        title: 'Ataques a servicios expuestos',
        text:
          'Los servicios accesibles desde Internet pueden convertirse en objetivos de exploración y ataque. La exposición debe gestionarse mediante configuraciones seguras, segmentación, monitoreo, actualización y controles de acceso apropiados.',
      },
    ],
  },

  {
    id: 'factor-humano',
    number: '06',
    icon: '🧠',
    title: 'Ingeniería social y factor humano',
    kicker: 'PERSONAS Y SEGURIDAD',
    intro:
      'El factor humano constituye un componente fundamental de la seguridad digital. Las personas interactúan constantemente con sistemas, mensajes, aplicaciones y servicios, por lo que sus decisiones pueden contribuir tanto a prevenir como a facilitar incidentes de seguridad.',

    blocks: [
      {
        title: 'Ingeniería social',
        text:
          'La ingeniería social comprende técnicas orientadas a manipular el comportamiento de las personas para obtener información, acceder a recursos o provocar determinadas acciones. Su característica principal es que explota elementos relacionados con confianza, urgencia, autoridad, miedo o curiosidad en lugar de depender exclusivamente de una vulnerabilidad técnica.',
      },
      {
        title: 'Phishing dirigido',
        text:
          'El phishing dirigido puede adaptar el contenido de una comunicación a una persona u organización específica. Esto aumenta la posibilidad de que el mensaje resulte convincente y demuestra la importancia de verificar remitentes, enlaces, solicitudes y contextos antes de proporcionar información o ejecutar acciones.',
      },
      {
        title: 'Cultura de seguridad',
        text:
          'Una cultura de seguridad requiere convertir las prácticas preventivas en comportamientos habituales. Esto implica capacitación, comunicación institucional, procedimientos claros y mecanismos para reportar incidentes sin generar barreras innecesarias para las personas usuarias (OECD, 2022; UIT, 2018).',
      },
      {
        title: 'Responsabilidad compartida',
        text:
          'La seguridad no debe trasladarse exclusivamente al usuario final. Las organizaciones tienen la responsabilidad de diseñar sistemas comprensibles, implementar controles apropiados y establecer mecanismos que reduzcan la posibilidad de errores humanos y faciliten la respuesta ante incidentes.',
      },
    ],
  },

  {
    id: 'malware',
    number: '07',
    icon: '🦠',
    title: 'Malware, ransomware y fugas de información',
    kicker: 'SOFTWARE MALICIOSO',
    intro:
      'El malware comprende diferentes tipos de software diseñado para comprometer dispositivos, sistemas o información. Entre sus modalidades se encuentran virus, gusanos, troyanos, spyware y ransomware. Estas amenazas pueden afectar la confidencialidad, integridad y disponibilidad de la información.',

    blocks: [
      {
        title: 'Malware',
        text:
          'El malware puede utilizarse para obtener acceso no autorizado, modificar sistemas, recopilar información, mantener persistencia o afectar el funcionamiento de dispositivos. Su diversidad exige controles preventivos y mecanismos de detección capaces de identificar comportamientos anómalos.',
      },
      {
        title: 'Ransomware',
        text:
          'El ransomware constituye una modalidad especialmente relevante porque puede cifrar o bloquear el acceso a información y exigir un rescate para recuperar los datos. Su impacto puede extenderse más allá de los sistemas afectados y comprometer la continuidad de servicios y operaciones (ENISA, 2025a; WEF, 2022).',
      },
      {
        title: 'Exfiltración de información',
        text:
          'La exfiltración consiste en la extracción no autorizada de información desde un sistema. Cuando los datos contienen información personal, financiera, institucional o estratégica, una filtración puede generar consecuencias jurídicas, económicas y reputacionales.',
      },
      {
        title: 'Continuidad y recuperación',
        text:
          'La protección contra malware debe complementarse con mecanismos de respaldo, recuperación, segmentación, monitoreo y respuesta. La capacidad de recuperar servicios después de un incidente es una dimensión esencial de la resiliencia digital (NIST, 2024a).',
      },
    ],
  },

  {
    id: 'ia',
    number: '08',
    icon: '🤖',
    title: 'Tecnologías emergentes e inteligencia artificial',
    kicker: 'NUEVAS TECNOLOGÍAS',
    intro:
      'La incorporación de tecnologías emergentes está modificando tanto la manera en que se protegen los sistemas como las capacidades disponibles para desarrollar ataques. La inteligencia artificial representa uno de los principales ejemplos de esta transformación, debido a su capacidad para automatizar tareas, analizar grandes volúmenes de información y generar contenido.',

    blocks: [
      {
        title: 'IA como herramienta defensiva',
        text:
          'Las técnicas de inteligencia artificial pueden contribuir a analizar grandes cantidades de eventos, identificar patrones anómalos, priorizar alertas y apoyar procesos de detección. Sin embargo, su utilización debe acompañarse de controles adecuados, supervisión humana y evaluación de resultados.',
      },
      {
        title: 'IA como vector de riesgo',
        text:
          'Las mismas capacidades pueden utilizarse para mejorar campañas de ingeniería social, automatizar generación de contenido engañoso o facilitar determinadas actividades maliciosas. Por ello, el desarrollo tecnológico debe acompañarse de mecanismos de gobernanza, evaluación de riesgos y uso responsable.',
      },
      {
        title: 'Deepfakes y manipulación',
        text:
          'La generación artificial de imágenes, audio y video puede dificultar la diferenciación entre contenido auténtico y manipulado. Esta situación incrementa la importancia de mecanismos de verificación y de la alfabetización digital para evaluar críticamente la información recibida.',
      },
      {
        title: 'Seguridad y gobernanza tecnológica',
        text:
          'La incorporación de tecnologías emergentes requiere evaluar no solamente sus beneficios funcionales, sino también los riesgos asociados con privacidad, seguridad, dependencia tecnológica, errores, uso indebido y toma automatizada de decisiones.',
      },
    ],
  },

  {
    id: 'ciberseguridad',
    number: '09',
    icon: '🔒',
    title: 'Ciberseguridad y seguridad de la información',
    kicker: 'RELACIÓN CONCEPTUAL',
    intro:
      'Aunque seguridad de la información y ciberseguridad pueden analizarse como conceptos diferenciados, en la práctica mantienen una relación estrecha. Ambas buscan reducir riesgos y proteger activos de información, aunque la ciberseguridad incorpora de manera particular los desafíos derivados de entornos digitales interconectados.',

    blocks: [
      {
        title: 'Diferencias conceptuales',
        text:
          'La seguridad de la información posee un alcance amplio que comprende información independientemente del medio en que se encuentre. La ciberseguridad se concentra especialmente en sistemas digitales, redes, dispositivos, servicios y ecosistemas conectados. Esta distinción permite comprender por qué ambas áreas son complementarias y no excluyentes.',
      },
      {
        title: 'Controles tecnológicos',
        text:
          'Los controles tecnológicos incluyen mecanismos de autenticación, cifrado, segmentación, monitoreo, protección de endpoints, copias de respaldo y mecanismos de detección. Su selección debe responder a los riesgos concretos que enfrenta cada organización.',
      },
      {
        title: 'Controles organizacionales',
        text:
          'Las políticas, procedimientos, roles, responsabilidades, gestión de proveedores y programas de capacitación constituyen controles organizacionales que permiten establecer un marco para la gestión sistemática de la seguridad (ISO, 2022).',
      },
      {
        title: 'Seguridad y privacidad',
        text:
          'Cuando los sistemas procesan datos personales, las medidas de seguridad deben relacionarse con las obligaciones de privacidad y protección de datos. La protección efectiva requiere combinar controles técnicos y organizativos con principios jurídicos orientados a salvaguardar los derechos de las personas (ISO, 2019; OECD, 2022).',
      },
    ],
  },

  {
    id: 'marcos',
    number: '10',
    icon: '📐',
    title: 'Marcos y estándares internacionales',
    kicker: 'GOBERNANZA Y BUENAS PRÁCTICAS',
    intro:
      'Los marcos y estándares internacionales proporcionan estructuras de referencia para organizar las capacidades de seguridad y gestionar los riesgos de manera sistemática. Su utilidad consiste en proporcionar un lenguaje común y criterios que pueden adaptarse a diferentes organizaciones y contextos.',

    frameworks: [
      {
        label: 'NIST',
        title: 'Cybersecurity Framework 2.0',
        text:
          'El NIST CSF 2.0 organiza la gestión de la ciberseguridad alrededor de las funciones Govern, Identify, Protect, Detect, Respond y Recover. Su enfoque permite relacionar la gestión estratégica con actividades concretas de protección y resiliencia (NIST, 2024a).',
        tags: [
          'Gobernar',
          'Identificar',
          'Proteger',
          'Detectar',
          'Responder',
          'Recuperar',
        ],
      },
      {
        label: 'ISO',
        title: 'ISO/IEC 27001:2022',
        text:
          'ISO/IEC 27001 establece requisitos para implementar, mantener y mejorar un sistema de gestión de seguridad de la información. Su enfoque permite integrar procesos, políticas, evaluación de riesgos y controles dentro de un sistema de gestión institucional (ISO, 2022).',
        tags: [
          'SGSI',
          'Riesgo',
          'Controles',
          'Mejora continua',
        ],
      },
      {
        label: 'OCDE',
        title: 'Política de seguridad digital',
        text:
          'La OCDE aborda la seguridad digital como una dimensión relacionada con la confianza, la resiliencia, la gestión del riesgo y el desarrollo económico y social. Esta perspectiva permite superar una visión exclusivamente tecnológica (OECD, 2022).',
        tags: [
          'Riesgo',
          'Confianza',
          'Gobernanza',
          'Resiliencia',
        ],
      },
      {
        label: 'UIT',
        title: 'Estrategias nacionales de ciberseguridad',
        text:
          'La Unión Internacional de Telecomunicaciones proporciona orientaciones para la construcción de estrategias nacionales, destacando la necesidad de coordinación, gobernanza, capacidades, cooperación y participación de los diferentes actores del ecosistema digital (UIT, 2018).',
        tags: [
          'Política pública',
          'Gobernanza',
          'Cooperación',
        ],
      },
    ],
  },

  {
    id: 'costa-rica',
    number: '11',
    icon: '🇨🇷',
    title: 'Seguridad digital en Costa Rica',
    kicker: 'CONTEXTO NACIONAL',
    intro:
      'Costa Rica ha desarrollado diferentes instrumentos jurídicos, institucionales y estratégicos para fortalecer la seguridad digital. Este proceso debe comprenderse dentro de un contexto de transformación digital creciente, aumento de la dependencia tecnológica y evolución de las amenazas que afectan a instituciones públicas, empresas y ciudadanía.',

    blocks: [
      {
        title: 'Evolución institucional',
        text:
          'El país ha desarrollado capacidades institucionales relacionadas con la ciberseguridad, entre ellas el Centro de Respuesta a Incidentes de Seguridad Informática de Costa Rica (CSIRT-CR), estructuras especializadas dentro del MICITT y espacios de investigación académica. Estas iniciativas forman parte de un proceso progresivo de fortalecimiento de la capacidad nacional de prevención y respuesta (MICITT, 2023; Vega Briceño et al., 2024, 2025, 2026).',
      },
      {
        title: 'Marco jurídico',
        text:
          'La seguridad digital mantiene una relación directa con la protección de los datos personales. La Ley N.° 8968 establece disposiciones relacionadas con el tratamiento y protección de información personal, mientras que las estrategias nacionales de ciberseguridad abordan dimensiones más amplias relacionadas con sistemas, infraestructura, capacidades y resiliencia.',
      },
      {
        title: 'Estrategia nacional',
        text:
          'La Estrategia Nacional de Ciberseguridad 2023–2027 representa uno de los principales instrumentos de planificación nacional en esta materia. Su existencia evidencia una transición hacia una visión estratégica que reconoce la ciberseguridad como una responsabilidad que involucra al Estado, sector privado, academia y ciudadanía (MICITT, 2023).',
      },
      {
        title: 'Investigación nacional',
        text:
          'Los estudios desarrollados por LabCIBE permiten complementar la perspectiva normativa mediante análisis sobre el estado de la ciberseguridad en Costa Rica. Estos estudios identifican desafíos relacionados con capacidades institucionales, cultura de ciberseguridad, amenazas y formación especializada (Vega Briceño et al., 2024, 2025, 2026).',
      },
    ],
  },

  {
    id: 'diagnostico',
    number: '12',
    icon: '🔎',
    title: 'Diagnóstico de la situación nacional',
    kicker: 'ANÁLISIS DEL CONTEXTO COSTARRICENSE',
    intro:
      'El análisis documental realizado permite identificar fortalezas y desafíos en el ecosistema costarricense de ciberseguridad. La existencia de instituciones y estrategias constituye un avance importante, pero la consolidación de capacidades requiere continuidad, coordinación, formación especializada y fortalecimiento de la cultura de seguridad.',

    diagnostic: [
      {
        label: 'Fortaleza',
        title: 'Marco estratégico',
        text:
          'Costa Rica cuenta con una Estrategia Nacional de Ciberseguridad 2023–2027 que proporciona orientación para las acciones nacionales.',
      },
      {
        label: 'Fortaleza',
        title: 'Capacidad institucional',
        text:
          'Existen estructuras institucionales orientadas a prevención, coordinación y respuesta ante incidentes de seguridad.',
      },
      {
        label: 'Desafío',
        title: 'Capital humano',
        text:
          'Los estudios nacionales señalan la necesidad de fortalecer la disponibilidad de profesionales especializados y las capacidades técnicas.',
      },
      {
        label: 'Desafío',
        title: 'Cultura ciudadana',
        text:
          'Persisten necesidades relacionadas con conocimiento ciudadano, buenas prácticas y capacidad para reconocer riesgos digitales.',
      },
      {
        label: 'Desafío',
        title: 'Gestión del riesgo',
        text:
          'La evolución constante de las amenazas exige fortalecer procesos de identificación, evaluación, tratamiento y monitoreo de riesgos.',
      },
      {
        label: 'Prioridad',
        title: 'Resiliencia',
        text:
          'La capacidad de mantener y recuperar servicios frente a incidentes constituye un elemento estratégico para el país.',
      },
    ],
  },

  {
    id: 'estrategia',
    number: '13',
    icon: '🏛️',
    title: 'Estrategia Nacional de Ciberseguridad 2023–2027',
    kicker: 'POLÍTICA PÚBLICA COSTARRICENSE',
    intro:
      'La Estrategia Nacional de Ciberseguridad 2023–2027 constituye un instrumento central para orientar las capacidades nacionales en materia de ciberseguridad. Su planteamiento reconoce que la protección del entorno digital requiere coordinación entre diferentes sectores y no puede limitarse a acciones aisladas de carácter técnico (MICITT, 2023).',

    strategy: [
      {
        label: '01',
        title: 'Gobernanza y coordinación',
        text:
          'Fortalecimiento de mecanismos institucionales y coordinación entre actores nacionales para responder de manera articulada a los riesgos digitales.',
      },
      {
        label: '02',
        title: 'Marco jurídico',
        text:
          'Desarrollo y fortalecimiento de condiciones normativas que permitan responder a los desafíos asociados con el entorno digital.',
      },
      {
        label: '03',
        title: 'Infraestructura y resiliencia',
        text:
          'Protección de infraestructuras y fortalecimiento de capacidades para mantener y recuperar servicios frente a incidentes.',
      },
      {
        label: '04',
        title: 'Educación y capacidades',
        text:
          'Fortalecimiento de conocimientos, formación especializada y concientización sobre ciberseguridad.',
      },
      {
        label: '05',
        title: 'Cooperación',
        text:
          'Promoción de mecanismos de cooperación entre instituciones, sector privado, academia y actores internacionales.',
      },
    ],

    analysis: {
      title: 'Importancia estratégica para Costa Rica',
      paragraphs: [
        'La estrategia nacional permite comprender la ciberseguridad como una política pública y no únicamente como una responsabilidad de los departamentos técnicos. Este enfoque reconoce la interdependencia entre infraestructura, personas, instituciones, conocimiento y procesos de gobernanza (MICITT, 2023).',
        'Desde la perspectiva de este proyecto, la dimensión educativa adquiere especial importancia porque una estrategia nacional requiere que los conocimientos relacionados con prevención y seguridad puedan trasladarse también a la ciudadanía. La formación contribuye a reducir riesgos asociados con comportamientos inseguros y fortalece la capacidad individual para reconocer situaciones potencialmente perjudiciales.',
      ],
    },
  },

  {
    id: 'comparacion',
    number: '14',
    icon: '🌎',
    title: 'Comparación internacional',
    kicker: 'PERSPECTIVA COMPARATIVA',
    intro:
      'El análisis comparativo permite identificar diferentes formas de organización de las políticas de ciberseguridad. Costa Rica cuenta con una estrategia nacional vigente, mientras que otros referentes internacionales presentan mecanismos institucionales, regulatorios y de evaluación que ofrecen elementos útiles para el análisis del contexto nacional.',

    comparison: [
      {
        country: 'Costa Rica',
        strategy: 'Estrategia Nacional de Ciberseguridad 2023–2027.',
        focus:
          'Gobernanza, capacidades nacionales, resiliencia, educación y cooperación.',
      },
      {
        country: 'Unión Europea',
        strategy: 'Directiva NIS2 y políticas europeas de ciberseguridad.',
        focus:
          'Nivel común de ciberseguridad, gestión de riesgos, resiliencia y coordinación.',
      },
      {
        country: 'España',
        strategy: 'Estrategia Nacional de Ciberseguridad.',
        focus:
          'Coordinación nacional y fortalecimiento operativo mediante organismos especializados.',
      },
      {
        country: 'Canadá',
        strategy: 'Evaluaciones nacionales de amenazas.',
        focus:
          'Análisis periódico de amenazas y fortalecimiento de capacidades nacionales.',
      },
      {
        country: 'Australia',
        strategy: '2023–2030 Australian Cyber Security Strategy.',
        focus:
          'Resiliencia, protección de ciudadanos, empresas e infraestructura y posicionamiento internacional.',
      },
      {
        country: 'Japón',
        strategy: 'Estrategia nacional de ciberseguridad.',
        focus:
          'Coordinación nacional y protección estratégica del ecosistema digital.',
      },
      {
        country: 'Singapur',
        strategy: 'Singapore Cybersecurity Strategy 2021.',
        focus:
          'Resiliencia, gobernanza, capacidades, cooperación y confianza digital.',
      },
    ],

    analysis: {
      title: 'Lecciones para el contexto costarricense',
      paragraphs: [
        'La comparación evidencia que los países analizados comparten la necesidad de fortalecer capacidades nacionales, aunque difieren en mecanismos de implementación, estructuras institucionales, horizontes temporales y mecanismos de seguimiento. El análisis desarrollado en el TFG identifica que Costa Rica posee una planificación estratégica vigente, pero enfrenta oportunidades relacionadas con seguimiento, medición de resultados, formación y fortalecimiento de capacidades (Vega Briceño et al., 2024, 2025, 2026).',
        'La experiencia internacional permite observar que una estrategia de ciberseguridad requiere continuidad institucional, mecanismos de coordinación, desarrollo de capital humano y capacidad para adaptar las políticas a un entorno de amenazas en constante evolución (UIT, 2018).',
      ],
    },
  },

  {
    id: 'educacion',
    number: '15',
    icon: '🎓',
    title: 'Educación, cultura y prevención',
    kicker: 'CIUDADANÍA DIGITAL',
    intro:
      'La educación constituye una dimensión estratégica de la seguridad digital porque permite desarrollar conocimientos y capacidades que ayudan a las personas a reconocer riesgos y adoptar comportamientos preventivos. La existencia de controles técnicos no elimina la necesidad de contar con usuarios capaces de interpretar situaciones, identificar señales de alerta y tomar decisiones informadas.',

    practice: [
      {
        label: '01',
        title: 'Autenticación',
        text:
          'Utilizar mecanismos de autenticación apropiados y, cuando sea posible, factores adicionales de verificación.',
      },
      {
        label: '02',
        title: 'Contraseñas',
        text:
          'Evitar reutilizar credenciales y utilizar mecanismos adecuados para administrar contraseñas.',
      },
      {
        label: '03',
        title: 'Enlaces y mensajes',
        text:
          'Verificar remitentes, dominios, enlaces y solicitudes antes de proporcionar información.',
      },
      {
        label: '04',
        title: 'Actualizaciones',
        text:
          'Mantener sistemas y aplicaciones actualizados para reducir exposición frente a vulnerabilidades conocidas.',
      },
      {
        label: '05',
        title: 'Privacidad',
        text:
          'Revisar configuraciones de privacidad y limitar la exposición innecesaria de información personal.',
      },
      {
        label: '06',
        title: 'Respaldos',
        text:
          'Mantener copias de seguridad apropiadas para facilitar la recuperación frente a pérdida o compromiso de información.',
      },
      {
        label: '07',
        title: 'Reportar incidentes',
        text:
          'Comunicar situaciones sospechosas o incidentes para facilitar una respuesta oportuna.',
      },
      {
        label: '08',
        title: 'Pensamiento crítico',
        text:
          'Evaluar la autenticidad y contexto de la información antes de confiar en ella o compartirla.',
      },
      {
        label: '09',
        title: 'Capacitación',
        text:
          'Mantener conocimientos actualizados debido a la evolución constante de las amenazas digitales.',
      },
    ],

    analysis: {
      title: 'De la concientización a la capacidad preventiva',
      paragraphs: [
        'La educación digital efectiva no debería limitarse a transmitir definiciones. Debe permitir que las personas relacionen conceptos con situaciones reales y desarrollen criterios para tomar decisiones frente a riesgos concretos. Este enfoque coincide con el objetivo del proyecto de proporcionar orientación educativa y preventiva a la ciudadanía.',
        'Los documentos del proyecto contemplan escenarios prácticos, decisiones guiadas, retroalimentación y evaluación de hábitos digitales como mecanismos para fortalecer capacidades preventivas relacionadas con protección de datos y seguridad digital.',
      ],
    },
  },

  {
    id: 'aplicacion',
    number: '16',
    icon: '💡',
    title: 'Aplicación al proyecto',
    kicker: 'SEGURIDAD DIGITAL Y PLATAFORMA',
    intro:
      'La seguridad digital constituye uno de los componentes conceptuales que fundamentan la solución tecnológica desarrollada en este Trabajo Final de Graduación. La plataforma busca trasladar conocimientos técnicos y normativos hacia un entorno educativo accesible, utilizando recursos digitales que faciliten la comprensión y prevención de riesgos.',

    application: [
      {
        label: '01',
        title: 'Orientación ciudadana',
        text:
          'Presentar información estructurada para facilitar la comprensión de conceptos relacionados con seguridad digital y protección de datos.',
      },
      {
        label: '02',
        title: 'Escenarios prácticos',
        text:
          'Utilizar situaciones cotidianas para que la persona pueda reconocer riesgos y analizar posibles decisiones.',
      },
      {
        label: '03',
        title: 'Evaluación preventiva',
        text:
          'Incorporar cuestionarios relacionados con hábitos digitales y generar recomendaciones orientadas a reducir riesgos.',
      },
      {
        label: '04',
        title: 'Chatbot educativo',
        text:
          'Facilitar orientación mediante flujos conversacionales estructurados que acerquen información al usuario.',
      },
      {
        label: '05',
        title: 'Protección de datos',
        text:
          'Relacionar las prácticas de seguridad digital con la protección de información personal y los derechos de las personas.',
      },
      {
        label: '06',
        title: 'Educación digital',
        text:
          'Promover conocimientos y comportamientos preventivos que puedan aplicarse en situaciones cotidianas.',
      },
      {
        label: '07',
        title: 'Prevención',
        text:
          'Priorizar la identificación temprana de riesgos antes de que estos produzcan consecuencias sobre información o servicios.',
      },
      {
        label: '08',
        title: 'Accesibilidad del conocimiento',
        text:
          'Presentar contenidos técnicos mediante una estructura comprensible para personas con diferentes niveles de conocimiento tecnológico.',
      },
    ],

    analysis: {
      title: 'Aporte de la solución tecnológica',
      paragraphs: [
        'La propuesta no pretende sustituir las competencias de las autoridades ni proporcionar asesoría jurídica individualizada. Su finalidad es informativa, educativa y preventiva, de manera que el usuario pueda acceder a conocimientos estructurados y comprender mejor situaciones relacionadas con seguridad digital y protección de datos personales.',
        'Este enfoque permite vincular el componente tecnológico del proyecto con la problemática investigada. La plataforma funciona como un mecanismo de transferencia de conocimiento que integra investigación documental, desarrollo web, recursos educativos y orientación conversacional.',
      ],
    },
  },

  {
    id: 'referencias',
    number: '17',
    icon: '📚',
    title: 'Referencias',
    kicker: 'REFERENCIAS ACADÉMICAS',
    intro:
      'Las siguientes fuentes sustentan el contenido académico y normativo utilizado en este módulo. La presentación se organiza de acuerdo con criterios de referencia bibliográfica APA 7.',

    references: [
  {
    author:
      'Agencia de la Unión Europea para la Ciberseguridad',
    year: '2023',
    title:
      'Cybersecurity of AI and standardisation',
    publisher: 'ENISA',
    url:
      'https://www.enisa.europa.eu/sites/default/files/publications/Cybersecurity%20of%20AI%20and%20Standardisation.pdf',
  },

  {
    author:
      'Agencia de la Unión Europea para la Ciberseguridad',
    year: '2025a',
    title:
      'ENISA Threat Landscape 2025 Booklet',
    publisher: 'ENISA',
    url:
      'https://www.enisa.europa.eu/sites/default/files/2025-10/ENISA%20Threat%20Landscape%202025%20Booklet.pdf',
  },

  {
    author:
      'Agencia de la Unión Europea para la Ciberseguridad',
    year: '2025b',
    title:
      'ENISA Threat Landscape 2025',
    publisher: 'ENISA',
    url:
      'https://www.enisa.europa.eu/sites/default/files/2025-11/ENISA%20Threat%20Landscape%202025.pdf',
  },

  {
    author:
      'Agencia de Protección de Datos de los Habitantes',
    year: 's.f.',
    title: 'Acerca de PRODHAB',
    publisher: 'PRODHAB',
    url:
      'https://www.prodhab.go.cr/acercade/',
  },

  {
    author:
      'Agencia Española de Protección de Datos',
    year: '2022',
    title:
      'El manual del delegado de protección de datos',
    publisher: 'AEPD',
    url:
      'https://www.aepd.es/documento/el-manual-del-dpd-korffgeorges-esp.pdf',
  },

  {
    author:
      'Asamblea Legislativa de la República de Costa Rica',
    year: '2011, 25 de mayo',
    title:
      'Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales (Ley N.° 8968)',
    publisher:
      'Sistema Costarricense de Información Jurídica',
    url:
      'https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=70975&param2=85989&param3=1',
  },

  {
    author: 'Australian Government',
    year: '2023',
    title:
      '2023–2030 Australian Cyber Security Strategy',
    publisher: 'Department of Home Affairs',
    url:
      'https://www.homeaffairs.gov.au/cyber-security-subsite/files/2023-cyber-security-strategy.pdf',
  },

  {
    author:
      'Banco Interamericano de Desarrollo & Organización de los Estados Americanos',
    year: '2020',
    title:
      'Reporte Ciberseguridad 2020: Riesgos, avances y el camino a seguir en América Latina y el Caribe',
    publisher: 'BID',
    url:
      'https://publications.iadb.org/publications/spanish/document/Reporte-Ciberseguridad-2020-riesgos-avances-y-el-camino-a-seguir-en-America-Latina-y-el-Caribe.pdf',
  },

  {
    author: 'Banco Mundial',
    year: '2023',
    title:
      'Cybersecurity for development: Global trends and local implications',
    publisher: 'Grupo Banco Mundial',
    url:
      'https://documents1.worldbank.org/curated/en/099705012152346616/pdf/IDU044546588061b004aaf08b5805c55aaee4128.pdf',
  },

  {
    author: 'Banco Mundial',
    year: '2024',
    title:
      'Ciberseguridad para el desarrollo: Fortalecimiento de la resiliencia digital',
    publisher: 'Grupo Banco Mundial',
    url:
      'https://openknowledge.worldbank.org/server/api/core/bitstreams/9ebee657-5ead-40e7-9d13-1836c6d4cd48/content',
  },

  {
    author:
      'Canadian Centre for Cyber Security',
    year: '2023',
    title:
      'National Cyber Threat Assessment 2023–2024',
    publisher: 'Government of Canada',
    url:
      'https://www.cyber.gc.ca/sites/default/files/ncta-2023-24-web.pdf',
  },

  {
    author:
      'Canadian Centre for Cyber Security',
    year: '2025',
    title:
      'National Cyber Threat Assessment 2025–2026',
    publisher: 'Government of Canada',
    url:
      'https://www.cyber.gc.ca/sites/default/files/national-cyber-threat-assessment-2025-2026-e.pdf',
  },

  {
    author:
      'Cyber Security Agency of Singapore',
    year: '2021',
    title:
      'The Singapore Cybersecurity Strategy 2021',
    publisher: 'CCDCOE',
    url:
      'https://ccdcoe.org/uploads/2018/10/Singapore_Cybersecurity_Strategy_2021.pdf',
  },

  {
    author:
      'Ente Cooperativo de Ciberseguridad de la OTAN',
    year: '2013',
    title:
      'National Cyber Security Strategy Guidelines',
    publisher: 'CCDCOE',
    url:
      'https://ccdcoe.org/uploads/2018/10/NCSS-Guidelines_2013.pdf',
  },

  {
    author: 'Federal Trade Commission',
    year: '2016',
    title:
      'Protecting personal information: A guide for business',
    publisher: 'FTC',
    url:
      'https://www.ftc.gov/system/files/documents/plain-language/pdf-0136_proteting-personal-information.pdf',
  },

  {
    author: 'Government of Canada',
    year: '2000',
    title:
      'Personal Information Protection and Electronic Documents Act (PIPEDA)',
    publisher: 'Minister of Justice',
    url:
      'https://laws-lois.justice.gc.ca/pdf/p-8.6.pdf',
  },

  {
    author: 'Government of Japan',
    year: '2021a',
    title: 'Cybersecurity Strategy',
    publisher: 'Cybersecurity Strategy Headquarters',
    url:
      'https://www.cyber.go.jp/eng/pdf/cs-senryaku2021-en.pdf',
  },

  {
    author: 'Government of Japan',
    year: '2021b',
    title:
      'Act on the Protection of Personal Information (APPI)',
    publisher: 'Cabinet Secretariat',
    url:
      'https://www.cas.go.jp/jp/seisaku/hourei/data/APPI.pdf',
  },

  {
    author: 'Government of Singapore',
    year: '2018',
    title: 'Cybersecurity Act 2018',
    publisher: "Attorney-General's Chambers",
    url:
      'https://sso.agc.gov.sg/Act/CA2018?ViewType=Pdf&_=20240117190040',
  },

  {
    author:
      'International Organization for Standardization',
    year: '2018',
    title:
      'Gestión del riesgo — Directrices (ISO 31000:2018)',
    publisher: 'ISO',
    url:
      'https://biblioteca.dgmm.gob.hn/wp-content/uploads/2024/05/GC.D.07-ISO-31000-2018.pdf',
  },

  {
    author:
      'International Organization for Standardization',
    year: '2019',
    title:
      'Técnicas de seguridad — Extensión de las normas ISO/IEC 27001 e ISO/IEC 27002 para la gestión de la privacidad de la información — Requisitos y directrices (ISO/IEC 27701:2019)',
    publisher: 'ISO',
    url:
      'https://pdfcoffee.com/iso-iec-27701-2019-espanol-4-pdf-free.html',
  },

  {
    author:
      'International Organization for Standardization',
    year: '2022',
    title:
      'Information security, cybersecurity and privacy protection — Information security management systems — Requirements (ISO/IEC 27001:2022)',
    publisher: 'ISO',
    url:
      'https://www.exactls.com/wp-content/uploads/2025/02/ISO_IEC-270012022-ed.3.pdf',
  },

  {
    author:
      'Ministerio de Ciencia, Innovación, Tecnología y Telecomunicaciones',
    year: '2023',
    title:
      'Estrategia Nacional de Ciberseguridad de Costa Rica 2023–2027',
    url:
      'https://www.micitt.go.cr/sites/default/files/2023-11/NCS%20Costa%20Rica%20-%2010Nov2023%20SPA.pdf',
  },

  {
    author:
      'Ministerio de Ciencia, Innovación, Tecnología y Telecomunicaciones',
    year: '2025a',
    title: 'Dirección de Ciberseguridad',
    url:
      'https://www.micitt.go.cr/micitt/direccion-de-ciberseguridad',
  },

  {
    author:
      'Ministerio de Ciencia, Innovación, Tecnología y Telecomunicaciones',
    year: '2025b',
    title: 'CSIRT-CR – RFC-2350',
    url:
      'https://www.micitt.go.cr/micitt/csirt-cr-rfc-2350',
  },

  {
    author:
      'National Institute of Standards and Technology',
    year: '2024a',
    title:
      'Marco de ciberseguridad del NIST (CSF) 2.0',
    publisher:
      'Departamento de Comercio de los Estados Unidos',
    url:
      'https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.spa.pdf',
  },

  {
    author:
      'National Institute of Standards and Technology',
    year: '2024b',
    title:
      'Guía sobre privacidad de los datos para pequeñas empresas',
    publisher:
      'Departamento de Comercio de los Estados Unidos',
    url:
      'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1299.spa.pdf',
  },

  {
    author:
      'National Institute of Standards and Technology',
    year: '2024c',
    title:
      'Critical cybersecurity hygiene: A guide for organizations',
    publisher:
      'Departamento de Comercio de los Estados Unidos',
    url:
      'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-220.pdf',
  },

  {
    author:
      'Organisation for Economic Co-operation and Development',
    year: '2001',
    title:
      'OECD guidelines governing the protection of privacy and transborder flows of personal data',
    url:
      'https://www.oecd.org/content/dam/oecd/en/publications/reports/2002/02/oecd-guidelines-on-the-protection-of-personal-data-and-transborder-flows-of-personal-data_g1gh255f/9789264196391-en.pdf',
  },

  {
    author:
      'Organisation for Economic Co-operation and Development',
    year: '2022',
    title:
      'OECD policy framework on digital security',
    publisher: 'OECD Publishing',
    url:
      'https://www.oecd.org/content/dam/oecd/en/publications/reports/2022/12/oecd-policy-framework-on-digital-security_a0b1d79c/a69df866-en.pdf',
  },

  {
    author:
      'Organización de los Estados Americanos',
    year: '2021',
    title:
      'Revisión de capacidades de ciberseguridad en los Estados Miembros',
    publisher: 'OEA',
    url:
      'https://www.oas.org/es/sms/cicte/docs/ESP-Revision-de-capacidades-de-Ciberseguridad.pdf',
  },

  {
    author:
      'Pacheco, J., Chavez, J., & Mendoza De los Santos, A.',
    year: '2023',
    title:
      'Control de accesos en seguridad de la información: Una revisión sistemática de las técnicas actuales',
    publisher:
      'Revista Campus, 28(36), 163–176',
    url:
      'https://doi.org/10.24265/campus.2023.v28n36.01',
  },

  {
    author: 'Personal Data Protection Commission Singapore',
    year: '2022',
    title:
      'Advisory guidelines on key concepts in the Personal Data Protection Act',
    publisher: 'PDPC',
    url:
      'https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/advisory-guidelines/ag-on-key-concepts/advisory-guidelines-on-key-concepts-in-the-pdpa-17-may-2022.pdf',
  },

  {
    author: 'Sain, G.',
    year: '2015',
    title:
      'Delitos informáticos: Una aproximación a la criminalidad en la red',
    publisher: 'Pensamiento Penal, 1–32',
    url:
      'https://www.pensamientopenal.com.ar/system/files/2015/01/doctrina38717.pdf',
  },

  {
    author:
      'Sánchez Torres, J. M., & Juárez-Acosta, F.',
    year: '2009',
    title:
      'La cultura digital en las organizaciones',
    publisher:
      'Revista Escuela de Administración de Negocios, (65), 147–158',
    url:
      'https://www.redalyc.org/pdf/860/86011409025.pdf',
  },

  {
    author: 'Unión Europea',
    year: '2016',
    title:
      'Reglamento (UE) 2016/679 relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales (RGPD)',
    publisher:
      'Diario Oficial de la Unión Europea',
    url:
      'https://www.boe.es/doue/2016/119/L00001-00088.pdf',
  },

  {
    author: 'Unión Europea',
    year: '2022a',
    title:
      'Directiva (UE) 2022/2555 relativa a medidas destinadas a garantizar un elevado nivel común de ciberseguridad en toda la Unión (Directiva NIS2)',
    publisher:
      'Diario Oficial de la Unión Europea',
    url:
      'https://www.boe.es/doue/2022/333/L00080-00152.pdf',
  },

  {
    author: 'Unión Europea',
    year: '2022b',
    title:
      'Reglamento (UE) 2022/2554 sobre la resiliencia operativa digital del sector financiero (DORA)',
    publisher:
      'Diario Oficial de la Unión Europea',
    url:
      'https://eur-lex.europa.eu/legal-content/ES/TXT/PDF/?uri=CELEX:32022R2554',
  },

  {
    author:
      'Unión Internacional de Telecomunicaciones',
    year: '2018',
    title:
      'Guía para la elaboración de una estrategia nacional de ciberseguridad',
    publisher: 'UIT',
    url:
      'https://www.itu.int/dms_pub/itu-d/opb/str/D-STR-CYB_GUIDE.01-2018-PDF-S.pdf',
  },

  {
    author: 'Vega Briceño, E.',
    year: '2018, marzo',
    title:
      '¿Qué podemos esperar, en el 2018 para la seguridad de la información?',
    publisher:
      'CAMPUS, Oficina de Comunicación, Universidad Nacional',
    url:
      'https://repositorio.una.ac.cr/items/3f97fcf8-8b2f-4274-9805-ddf6d7123048',
  },

  {
    author: 'Vega Briceño, E.',
    year: '2020',
    title:
      'Planificación y ejecución de evaluaciones de seguridad informática desde un enfoque de ethical hacking',
    publisher: '3Ciencias',
    url:
      'https://repositorio.una.ac.cr/items/e567f0ca-c859-4c66-98c3-ac38d89ab6b2',
  },

  {
    author: 'Vega Briceño, E.',
    year: '2021a',
    title: 'Seguridad de la información',
    publisher: '3Ciencias',
    url:
      'https://repositorio.una.ac.cr/items/a25d1f19-b55f-49a7-ba52-52e029add65f',
  },

  {
    author: 'Vega Briceño, E.',
    year: '2021b, octubre',
    title:
      'Ciudades inteligentes, ciberseguridad y privacidad',
    publisher:
      'CAMPUS, Oficina de Comunicación, Universidad Nacional',
    url:
      'https://repositorio.una.ac.cr/items/2cb9d2dd-8b2f-4274-9805-ddf6d7123048',
  },

  {
    author:
      'Vega Briceño, E., Lemaitre Picado, R., Villegas Carranza, A., & Solís Cordoncillo, C. M.',
    year: '2024',
    title:
      'Estado de la ciberseguridad en Costa Rica 2023',
    publisher:
      'LabCIBE, Universidad Nacional de Costa Rica, Sede Regional Chorotega',
    url:
      'https://repositorio.una.ac.cr/items/edbb7510-bba6-44ef-86ca-8d83cdbbc262',
  },

  {
    author:
      'Vega Briceño, E., Lemaitre Picado, R., Villegas Carranza, A., & Solís Cordoncillo, C. M.',
    year: '2025',
    title:
      'Estado de la ciberseguridad en Costa Rica 2024',
    publisher:
      'LabCIBE, Universidad Nacional de Costa Rica, Sede Regional Chorotega',
    url:
      'https://d38tduvovkr85r.cloudfront.net/wp-content/uploads/2025/05/UNA-LabCIBE-Estado-de-la-Ciberseguridad-en-Costa-Rica-2024.pdf',
  },

  {
    author:
      'Vega Briceño, E., Lemaitre Picado, R., Villegas Carranza, A., & Flores Barrantes, L.',
    year: '2026',
    title:
      'Estado de la ciberseguridad en Costa Rica 2025',
    publisher:
      'LabCIBE, Universidad Nacional de Costa Rica, Sede Regional Chorotega',
    url:
      'https://repositorio.una.ac.cr/items/f33e6cb2-dfc8-4467-8480-14f52e64cbb7',
  },

  {
    author: 'World Economic Forum',
    year: '2022',
    title:
      'Global Cybersecurity Outlook 2022',
    publisher: 'WEF',
    url:
      'https://www3.weforum.org/docs/WEF_Global_Cybersecurity_Outlook_2022.pdf',
  },
],
  },
]

function SectionHeading({ section }) {
  return (
    <div className="security-digital__section-heading">
      <div className="security-digital__section-icon">
        {section.icon}
      </div>

      <div>
        <span className="security-digital__section-kicker">
          {section.kicker}
        </span>

        <h2>
          {section.number}. {section.title}
        </h2>
      </div>
    </div>
  )
}

function Blocks({ blocks }) {
  return (
    <div className="security-digital__blocks">
      {blocks.map((block, index) => (
        <article
          className="security-digital__block"
          key={`${block.title}-${index}`}
        >
          <h3>{block.title}</h3>
          <p>{block.text}</p>
        </article>
      ))}
    </div>
  )
}

function Principles({ principles }) {
  return (
    <div className="security-digital__principles">
      {principles.map((item) => (
        <article
          className="security-digital__principle"
          key={item.number}
        >
          <span>{item.number}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

function RiskFlow({ items }) {
  return (
    <div className="security-digital__risk-flow">
      {items.map((item) => (
        <div key={item.step}>
          <span>{item.step}</span>
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

function Frameworks({ frameworks }) {
  return (
    <div className="security-digital__frameworks">
      {frameworks.map((item) => (
        <article
          className="security-digital__framework"
          key={item.label}
        >
          <span>{item.label}</span>

          <h3>{item.title}</h3>

          <p>{item.text}</p>

          <div>
            {item.tags.map((tag) => (
              <b key={tag}>{tag}</b>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

function Diagnostic({ items }) {
  return (
    <div className="security-digital__diagnostic-grid">
      {items.map((item, index) => (
        <article key={`${item.title}-${index}`}>
          <span>{item.label}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

function Strategy({ items }) {
  return (
    <div className="security-digital__strategy-grid">
      {items.map((item) => (
        <article key={item.label}>
          <span>{item.label}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

function Comparison({ items }) {
  return (
    <div className="security-digital__comparison-table-wrapper">
      <table className="security-digital__comparison-table">
        <thead>
          <tr>
            <th>País / región</th>
            <th>Estrategia o instrumento</th>
            <th>Orientación principal</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.country}>
              <th>{item.country}</th>
              <td>{item.strategy}</td>
              <td>{item.focus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Practice({ items }) {
  return (
    <div className="security-digital__practice-grid">
      {items.map((item) => (
        <article
          className="security-digital__practice"
          key={item.label}
        >
          <span>{item.label}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

function Application({ items }) {
  return (
    <div className="security-digital__application">
      {items.map((item) => (
        <article key={item.label}>
          <span>{item.label}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

function Analysis({ analysis }) {
  if (!analysis) {
    return null
  }

  return (
    <div className="security-digital__analysis">
      <h3>{analysis.title}</h3>

      {analysis.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

export default function SecurityDigitalPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [])

  return (
    <main className="security-digital">
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="security-digital__hero">
        <div className="security-digital__hero-content">
          <span className="security-digital__eyebrow">
            EDUCACIÓN CIUDADANA · CIBERSEGURIDAD · RESILIENCIA DIGITAL
          </span>

          <h1>
            Seguridad Digital
          </h1>

          <p>
            Módulo académico sobre seguridad digital, ciberseguridad,
            gestión del riesgo, protección de la información y
            resiliencia frente a amenazas en entornos digitales,
            con especial atención al contexto costarricense y a
            referentes internacionales.
          </p>

          <div className="security-digital__hero-tags">
            <span>🇨🇷 Costa Rica</span>
            <span>🛡️ Ciberseguridad</span>
            <span>📊 Gestión del riesgo</span>
            <span>🌎 Perspectiva internacional</span>
            <span>🎓 Educación digital</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCCIÓN
          ===================================================== */}

      <section className="security-digital__intro">
        <div className="security-digital__intro-card">
          <div className="security-digital__intro-icon">
            🔐
          </div>

          <div>
            <h2>
              La seguridad digital es una responsabilidad compartida
            </h2>

            <p>
              La transformación digital ha incrementado la dependencia
              de sistemas, redes, aplicaciones y servicios tecnológicos.
              Como consecuencia, también ha aumentado la exposición de
              personas y organizaciones a riesgos capaces de afectar la
              confidencialidad, integridad y disponibilidad de la
              información (NIST, 2024a; OECD, 2022).
            </p>

            <p>
              La ciberseguridad contemporánea requiere una visión integral
              que combine tecnología, procesos, personas y gobernanza.
              Las amenazas como phishing, malware, ransomware, robo de
              credenciales y explotación de vulnerabilidades pueden
              producir consecuencias que trascienden el ámbito técnico
              y afectar operaciones, servicios y datos personales
              (ENISA, 2025a; Vega Briceño et al., 2024, 2025, 2026).
            </p>

            <p>
              En Costa Rica, esta problemática se aborda mediante
              instrumentos jurídicos, institucionales y estratégicos,
              entre ellos la Estrategia Nacional de Ciberseguridad
              2023–2027. Este módulo relaciona dichos elementos con
              fundamentos académicos y buenas prácticas internacionales
              para facilitar una comprensión integral de la seguridad
              digital (MICITT, 2023).
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ÍNDICE LATERAL
          ===================================================== */}

      <nav
        className="security-digital__navigation"
        aria-label="Índice de Seguridad Digital"
      >
        <div className="security-digital__navigation-header">
          <span>ÍNDICE</span>
          <strong>Seguridad Digital</strong>
        </div>

        <div className="security-digital__navigation-list">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="security-digital__nav-item"
            >
              <span className="security-digital__nav-number">
                {section.number}
              </span>

              <span className="security-digital__nav-icon">
                {section.icon}
              </span>

              <strong>
                {section.title}
              </strong>
            </a>
          ))}
        </div>
      </nav>

      {/* =====================================================
          CONTENIDO
          ===================================================== */}

      <div className="security-digital__content">
        {sections.map((section) => {
          if (section.id === 'referencias') {
            return (
              <section
                key={section.id}
                id={section.id}
                className="security-digital__section security-digital__references"
              >
                <SectionHeading section={section} />

                <p className="security-digital__section-intro">
                  {section.intro}
                </p>

<div className="security-digital__reference-list">
  {section.references.map((reference, index) => (
    <div
      className="security-digital__reference"
      key={`${reference.author}-${reference.year}-${index}`}
    >
      <p>
        <span className="security-digital__reference-author">
          {reference.author}
        </span>{' '}
        ({reference.year}).{' '}
        <em>{reference.title}</em>.
        {reference.publisher &&
          reference.publisher !== reference.author && (
            <>
              {' '}
              {reference.publisher}.
            </>
          )}{' '}
        {reference.url && (
          <a
            href={reference.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {reference.url}
          </a>
        )}
      </p>
    </div>
  ))}
</div>
              </section>
            )
          }

          return (
            <section
              key={section.id}
              id={section.id}
              className="security-digital__section"
            >
              <SectionHeading section={section} />

              <p className="security-digital__section-intro">
                {section.intro}
              </p>

              {section.blocks && (
                <Blocks blocks={section.blocks} />
              )}

              {section.principles && (
                <Principles
                  principles={section.principles}
                />
              )}

              {section.riskFlow && (
                <RiskFlow items={section.riskFlow} />
              )}

              {section.frameworks && (
                <Frameworks
                  frameworks={section.frameworks}
                />
              )}

              {section.diagnostic && (
                <Diagnostic
                  items={section.diagnostic}
                />
              )}

              {section.strategy && (
                <Strategy
                  items={section.strategy}
                />
              )}

              {section.comparison && (
                <Comparison
                  items={section.comparison}
                />
              )}

              {section.practice && (
                <Practice
                  items={section.practice}
                />
              )}

              {section.application && (
                <Application
                  items={section.application}
                />
              )}

              {section.analysis && (
                <Analysis
                  analysis={section.analysis}
                />
              )}
            </section>
          )
        })}
      </div>

      {/* =====================================================
          CIERRE
          ===================================================== */}

      <section className="security-digital__closing">
        <div>
          <div className="security-digital__closing-icon">
            🛡️
          </div>

          <h2>
            La seguridad digital requiere conocimiento,
            prevención y capacidad de respuesta
          </h2>

          <p>
            La protección efectiva del entorno digital no depende de una
            única tecnología o mecanismo de seguridad. Requiere integrar
            gestión del riesgo, controles técnicos, capacidades
            institucionales, formación y participación ciudadana. En
            este sentido, fortalecer el conocimiento de las personas
            constituye una dimensión complementaria de la resiliencia
            digital y de la protección de la información.
          </p>
        </div>
      </section>
    </main>
  )
}