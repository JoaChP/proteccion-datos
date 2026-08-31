import './ProtectionDataPage.css'

/*
 * ============================================================
 * PROTECCIÓN DE DATOS PERSONALES
 * Módulo educativo de nivel universitario
 * ============================================================
 *
 * Estructura:
 *
 * 01. Fundamentos de la protección de datos
 * 02. Principios de protección de datos
 * 03. Ciclo de vida de los datos personales
 * 04. Derechos de las personas titulares
 * 05. Marco jurídico e institucional de Costa Rica
 * 06. Protección de datos y ciberseguridad
 * 07. Amenazas y escenarios de riesgo
 * 08. Protección de datos en la vida cotidiana
 * 09. Uso indebido y respuesta ante incidentes
 * 10. Perspectiva internacional
 * 11. Análisis comparativo y lecciones para Costa Rica
 * 12. Tecnologías y mecanismos de protección
 * 13. Educación y cultura digital
 * 14. Guía de buenas prácticas
 * 15. Recursos educativos
 * 16. Referencias
 *
 * NOTA:
 * El contenido mantiene un enfoque educativo y preventivo.
 * No sustituye asesoría jurídica ni procedimientos oficiales.
 * ============================================================
 */

const sections = [
  {
    id: 'fundamentos',
    icon: '📋',
    title: '1. Fundamentos de la protección de datos',
    intro:
      'La protección de datos personales constituye un componente esencial de la ciudadanía digital. Comprender qué información puede identificar o relacionarse con una persona permite reconocer los riesgos asociados con su recopilación, utilización, almacenamiento, transferencia y divulgación. Desde una perspectiva integral, la protección de datos combina dimensiones jurídicas, tecnológicas, organizativas y educativas.',
    blocks: [
      {
        title: '¿Qué son los datos personales?',
        text:
          'Los datos personales son información relacionada con una persona identificada o identificable. Esta información puede aparecer de forma directa, como ocurre con el nombre o el número de identificación, o mediante combinaciones de datos que permiten asociar información con una persona determinada. En el entorno digital, los datos pueden encontrarse en formularios, plataformas educativas, redes sociales, aplicaciones, servicios bancarios, comercios electrónicos y sistemas institucionales (Asamblea Legislativa de la República de Costa Rica, 2011; Unión Europea, 2016).',
      },
      {
        title: 'Datos personales en el entorno digital',
        text:
          'La transformación digital ha ampliado considerablemente los espacios donde se generan datos. Una persona puede producir información al registrarse en un servicio, realizar una compra, utilizar una aplicación, publicar contenido, desplazarse con un dispositivo conectado o interactuar con una plataforma. El riesgo no depende únicamente del dato individual, sino también de la posibilidad de combinar diferentes fuentes para construir perfiles o inferir características sobre una persona.',
      },
      {
        title: 'Ejemplos de datos personales',
        list: [
          'Nombre y apellidos.',
          'Número de identificación.',
          'Dirección física.',
          'Número telefónico.',
          'Correo electrónico.',
          'Información académica o laboral.',
          'Información financiera.',
          'Fotografías y videos.',
          'Datos de ubicación.',
          'Identificadores de dispositivos.',
          'Información asociada con cuentas digitales.',
          'Información sobre hábitos y actividades digitales.',
        ],
      },
      {
        title: 'Datos que requieren especial cuidado',
        text:
          'No toda la información presenta el mismo nivel de riesgo. Determinados datos pueden generar consecuencias particularmente relevantes cuando se divulgan o utilizan de manera indebida. Entre ellos pueden encontrarse información financiera, documentos de identidad, credenciales de acceso, información biométrica y otros datos cuya exposición pueda afectar significativamente la privacidad o seguridad de una persona. Por ello, la protección debe considerar tanto la naturaleza del dato como el contexto en que se trata.',
      },
      {
        title: 'Privacidad, protección de datos y seguridad',
        text:
          'Privacidad, protección de datos y seguridad de la información están relacionadas, pero no son conceptos idénticos. La privacidad se vincula con el ámbito personal y el control sobre información relacionada con la persona; la protección de datos establece principios, derechos y responsabilidades sobre su tratamiento; y la seguridad de la información comprende medidas destinadas a preservar propiedades como confidencialidad, integridad y disponibilidad (ISO, 2018, 2022; NIST, 2024).',
      },
    ],
  },

  {
    id: 'principios',
    icon: '⚖️',
    title: '2. Principios de protección de datos',
    intro:
      'Los principios proporcionan criterios para determinar si el tratamiento de información personal se realiza de manera responsable. Constituyen una base para orientar las decisiones de las organizaciones y también permiten a la ciudadanía formular preguntas sobre el uso que se hace de sus datos.',
    blocks: [
      {
        title: 'Licitud y legitimidad',
        text:
          'El tratamiento debe realizarse dentro del marco jurídico correspondiente y contar con una base que permita justificarlo. La existencia de una necesidad operativa o tecnológica no elimina las obligaciones relacionadas con la protección de las personas.',
      },
      {
        title: 'Finalidad',
        text:
          'Los datos deben recopilarse y utilizarse para finalidades determinadas y legítimas. Que una organización posea determinada información no significa que pueda utilizarla libremente para cualquier propósito diferente del que justificó su recopilación (OECD, 2001; Unión Europea, 2016).',
      },
      {
        title: 'Transparencia e información',
        text:
          'Las personas necesitan comprender, dentro de lo razonable, qué información se solicita, para qué será utilizada y qué actores podrían intervenir en su tratamiento. La transparencia favorece decisiones informadas y contribuye a fortalecer la confianza digital.',
      },
      {
        title: 'Proporcionalidad y minimización',
        text:
          'Una organización debería evitar recopilar información que no sea necesaria para la finalidad perseguida. Solicitar o conservar datos adicionales sin una justificación clara puede incrementar la superficie de exposición y, por consiguiente, el impacto potencial de un incidente.',
      },
      {
        title: 'Calidad y exactitud',
        text:
          'Los datos utilizados para tomar decisiones o prestar servicios deben mantenerse adecuados, correctos y actualizados cuando corresponda. La información incorrecta puede generar consecuencias negativas para las personas y afectar la calidad de los procesos institucionales.',
      },
      {
        title: 'Seguridad y confidencialidad',
        text:
          'La información debe protegerse frente a pérdida, alteración, acceso no autorizado, divulgación o utilización indebida mediante medidas técnicas y organizativas apropiadas. La seguridad debe responder al riesgo y al contexto del tratamiento (ISO, 2018, 2022; NIST, 2024).',
      },
      {
        title: 'Responsabilidad',
        text:
          'La protección efectiva requiere que las organizaciones establezcan políticas, procedimientos, controles y mecanismos de seguimiento que permitan gestionar los riesgos y demostrar que se han adoptado medidas razonables. La responsabilidad no se limita a instalar tecnología: requiere gobernanza y mejora continua.',
      },
    ],
  },

  {
    id: 'ciclo-vida',
    icon: '🔄',
    title: '3. Ciclo de vida de los datos personales',
    intro:
      'Los datos personales atraviesan diferentes etapas desde el momento en que son recopilados hasta que dejan de ser necesarios y son eliminados o sometidos a mecanismos de disposición adecuados. Analizar este ciclo permite identificar riesgos y controles en cada punto del tratamiento.',
    blocks: [
      {
        title: '1. Recopilación',
        text:
          'La primera etapa consiste en obtener información. En este momento debe analizarse qué datos se solicitan, cuál es su finalidad y si realmente son necesarios. La minimización constituye una medida preventiva fundamental.',
      },
      {
        title: '2. Registro y organización',
        text:
          'Una vez obtenidos, los datos pueden incorporarse a bases de datos, expedientes o sistemas de información. La organización debe aplicar controles de acceso y mecanismos que permitan mantener la integridad de la información.',
      },
      {
        title: '3. Almacenamiento',
        text:
          'El almacenamiento requiere considerar dónde se encuentran los datos, quién puede acceder a ellos, qué mecanismos de protección existen y cómo se gestionan los respaldos. El riesgo puede aumentar cuando existen múltiples copias o sistemas sin controles adecuados.',
      },
      {
        title: '4. Uso y procesamiento',
        text:
          'Durante esta etapa los datos pueden utilizarse para prestar servicios, generar información, ejecutar procesos o apoyar decisiones. El uso debe mantenerse vinculado con la finalidad correspondiente y respetar las condiciones jurídicas aplicables.',
      },
      {
        title: '5. Comunicación y transferencia',
        text:
          'Los datos pueden ser compartidos con terceros o transferidos entre sistemas y organizaciones. Cada transferencia requiere considerar la legitimidad, necesidad, seguridad y responsabilidades asociadas.',
      },
      {
        title: '6. Conservación',
        text:
          'La conservación debe responder a necesidades legítimas y a los requisitos aplicables. Mantener información indefinidamente puede incrementar la exposición al riesgo sin aportar necesariamente un beneficio adicional.',
      },
      {
        title: '7. Eliminación',
        text:
          'Cuando los datos dejan de ser necesarios, deben aplicarse mecanismos apropiados para su eliminación, anonimización o disposición, de acuerdo con las obligaciones legales y operativas correspondientes.',
      },
    ],
  },

  {
    id: 'derechos',
    icon: '👤',
    title: '4. Derechos de las personas titulares',
    intro:
      'El conocimiento de los derechos relacionados con los datos personales permite a la ciudadanía ejercer un papel activo frente al tratamiento de su información. Estos derechos forman parte de los mecanismos que buscan equilibrar la relación entre las personas y las organizaciones que procesan sus datos.',
    blocks: [
      {
        title: 'Derecho de acceso',
        text:
          'Permite conocer información relacionada con los datos personales que están siendo tratados y solicitar acceso cuando las condiciones jurídicas aplicables así lo permitan.',
      },
      {
        title: 'Derecho de rectificación',
        text:
          'Permite solicitar la corrección de información incorrecta, inexacta o incompleta cuando esta pueda afectar la adecuada representación de la persona.',
      },
      {
        title: 'Cancelación o supresión',
        text:
          'En las circunstancias previstas por la normativa, una persona puede solicitar la eliminación o cancelación de determinados datos cuando exista fundamento para ello.',
      },
      {
        title: 'Derecho de oposición',
        text:
          'Permite oponerse a determinados tratamientos cuando se cumplen las condiciones previstas por el marco jurídico aplicable.',
      },
      {
        title: 'Autodeterminación informativa',
        text:
          'La autodeterminación informativa se relaciona con la capacidad de las personas para ejercer control sobre su información y conocer las condiciones bajo las cuales esta es tratada. En Costa Rica constituye un elemento central del marco jurídico de protección de datos (Asamblea Legislativa de la República de Costa Rica, 2011).',
      },
      {
        title: 'Ejercer derechos de manera informada',
        text:
          'Antes de realizar una solicitud conviene identificar a la organización responsable, conservar evidencia relevante y utilizar los canales oficiales disponibles. Cuando la situación corresponda al ámbito de protección de datos personales, pueden consultarse los mecanismos institucionales correspondientes.',
      },
    ],
  },

  {
    id: 'costa-rica',
    icon: '🇨🇷',
    title: '5. Marco jurídico e institucional de Costa Rica',
    intro:
      'Costa Rica dispone de un marco jurídico e institucional orientado a la protección de las personas frente al tratamiento de sus datos personales y a la atención de riesgos relacionados con los entornos digitales.',
    blocks: [
      {
        title: 'Ley N.º 8968',
        text:
          'La Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales (Ley N.º 8968) constituye una referencia fundamental para comprender la protección de datos en Costa Rica. Su enfoque se relaciona con la protección de las personas y con la autodeterminación informativa (Asamblea Legislativa de la República de Costa Rica, 2011).',
      },
      {
        title: 'Protección de la persona',
        text:
          'El marco costarricense busca establecer condiciones para que el tratamiento de datos personales se realice respetando los derechos y garantías de las personas. Esto implica considerar tanto las obligaciones de quienes tratan información como los mecanismos disponibles para los titulares.',
      },
      {
        title: 'PRODHAB',
        text:
          'La Agencia de Protección de Datos de los Habitantes (PRODHAB) constituye una institución central en materia de protección de datos personales en Costa Rica. Su ámbito se relaciona con la supervisión y aplicación del marco jurídico correspondiente.',
      },
      {
        title: 'MICITT',
        text:
          'El Ministerio de Ciencia, Innovación, Tecnología y Telecomunicaciones participa en políticas públicas relacionadas con transformación digital, tecnología y ciberseguridad. Su papel permite conectar la protección de información con las estrategias nacionales de desarrollo digital.',
      },
      {
        title: 'CSIRT-CR',
        text:
          'El CSIRT-CR participa en actividades relacionadas con prevención, coordinación y respuesta frente a incidentes de ciberseguridad dentro de su ámbito de actuación. Su existencia evidencia la necesidad de capacidades técnicas para enfrentar amenazas digitales.',
      },
      {
        title: 'OIJ',
        text:
          'El Organismo de Investigación Judicial interviene en la investigación de delitos, incluyendo aquellos que pueden involucrar tecnologías de información y entornos digitales. Su función corresponde a un ámbito distinto del de la protección administrativa de datos personales.',
      },
      {
        title: 'Una responsabilidad compartida',
        text:
          'La protección de datos no corresponde exclusivamente a una institución. Requiere la participación coordinada del Estado, organizaciones privadas, instituciones educativas, profesionales de tecnología y ciudadanía. Esta visión integral coincide con las tendencias internacionales analizadas en la investigación.',
      },
    ],
  },

  {
    id: 'ciberseguridad',
    icon: '🛡️',
    title: '6. Protección de datos y ciberseguridad',
    intro:
      'La protección de datos personales y la ciberseguridad se complementan. Mientras la primera incorpora principios y derechos relacionados con el tratamiento de información, la segunda aporta capacidades técnicas y organizativas para reducir la probabilidad e impacto de incidentes.',
    blocks: [
      {
        title: 'Confidencialidad',
        text:
          'La confidencialidad busca evitar que la información sea conocida por personas, procesos o sistemas que no cuentan con autorización. El control de accesos, la autenticación y el cifrado son mecanismos que pueden contribuir a este objetivo.',
      },
      {
        title: 'Integridad',
        text:
          'La integridad se relaciona con mantener la información correcta y evitar modificaciones no autorizadas. Los controles de acceso, registros, validaciones y mecanismos de respaldo pueden contribuir a preservar esta propiedad.',
      },
      {
        title: 'Disponibilidad',
        text:
          'La disponibilidad busca que los sistemas y datos puedan utilizarse cuando sean necesarios por usuarios autorizados. Fallos técnicos, ataques, errores humanos o incidentes pueden afectar esta propiedad.',
      },
      {
        title: 'Gestión del riesgo',
        text:
          'La gestión del riesgo permite identificar amenazas, vulnerabilidades, posibles impactos y medidas de tratamiento. Marcos como NIST CSF 2.0 e ISO 31000 ofrecen referencias para estructurar procesos de gestión y mejora continua (ISO, 2018; NIST, 2024).',
      },
      {
        title: 'Medidas técnicas y organizativas',
        list: [
          'Control de acceso.',
          'Autenticación multifactor.',
          'Cifrado.',
          'Actualización de sistemas.',
          'Copias de seguridad.',
          'Monitoreo y registro.',
          'Gestión de incidentes.',
          'Capacitación del personal.',
          'Políticas y procedimientos.',
          'Evaluación periódica del riesgo.',
        ],
      },
    ],
  },

  {
    id: 'amenazas',
    icon: '🚨',
    title: '7. Amenazas y escenarios de riesgo',
    intro:
      'Los riesgos digitales pueden originarse en ataques deliberados, errores humanos, configuraciones incorrectas, vulnerabilidades técnicas o prácticas inseguras. Analizar escenarios permite comprender cómo una acción aparentemente sencilla puede producir consecuencias relevantes.',
    blocks: [
      {
        title: 'Phishing',
        text:
          'El phishing utiliza mensajes, sitios web o comunicaciones diseñadas para engañar a la persona y obtener información como credenciales, datos financieros o códigos de autenticación. Una medida preventiva consiste en verificar el remitente, el dominio y el contexto antes de interactuar.',
      },
      {
        title: 'Ingeniería social',
        text:
          'La ingeniería social explota factores humanos como confianza, urgencia, miedo o curiosidad. El atacante puede intentar obtener información mediante conversaciones, llamadas, mensajes o situaciones aparentemente legítimas.',
      },
      {
        title: 'Robo de identidad',
        text:
          'El uso indebido de información personal puede facilitar la suplantación de una persona ante servicios o terceros. La prevención requiere limitar la exposición de información y proteger especialmente documentos, credenciales y datos financieros.',
      },
      {
        title: 'Credenciales comprometidas',
        text:
          'La reutilización de contraseñas, el intercambio de credenciales y la ausencia de autenticación multifactor pueden aumentar el impacto de una filtración o ataque. Cada cuenta importante debería contar con mecanismos de protección adecuados.',
      },
      {
        title: 'Aplicaciones y permisos',
        text:
          'Una aplicación puede solicitar acceso a cámara, micrófono, ubicación, contactos, archivos u otros recursos. El usuario debe evaluar si esos permisos son coherentes con la función que ofrece la aplicación.',
      },
      {
        title: 'Pérdida o robo de dispositivos',
        text:
          'Un teléfono o computadora puede contener fotografías, documentos, sesiones abiertas, correos y credenciales. El bloqueo seguro, cifrado, autenticación y capacidad de borrado remoto pueden reducir el impacto de una pérdida.',
      },
      {
        title: 'Matriz básica de riesgo',
        list: [
          'Amenaza: evento o acción capaz de producir daño.',
          'Vulnerabilidad: debilidad que puede ser aprovechada.',
          'Exposición: grado en que una persona u organización está sometida al riesgo.',
          'Impacto: consecuencia potencial si el evento ocurre.',
          'Control: medida destinada a reducir probabilidad o impacto.',
        ],
      },
    ],
  },

  {
    id: 'vida-cotidiana',
    icon: '📱',
    title: '8. Protección de datos en la vida cotidiana',
    intro:
      'La protección de datos se manifiesta en decisiones aparentemente pequeñas. Antes de aceptar un servicio, publicar información o descargar una aplicación, la persona puede aplicar criterios sencillos de evaluación.',
    blocks: [
      {
        title: 'Redes sociales',
        list: [
          'Revisar quién puede visualizar las publicaciones.',
          'Evitar publicar documentos de identidad.',
          'Evitar exponer información financiera.',
          'Limitar la publicación de ubicaciones precisas.',
          'Revisar aplicaciones y servicios conectados.',
          'Analizar cuidadosamente fotografías y documentos antes de publicarlos.',
        ],
      },
      {
        title: 'Aplicaciones móviles',
        list: [
          'Descargar desde fuentes confiables.',
          'Revisar los permisos solicitados.',
          'Comprobar si los permisos son necesarios.',
          'Mantener las aplicaciones actualizadas.',
          'Eliminar aplicaciones que ya no se utilizan.',
          'Revisar periódicamente los accesos concedidos.',
        ],
      },
      {
        title: 'Banca y comercio electrónico',
        list: [
          'Comprobar el dominio del sitio.',
          'Evitar introducir información financiera desde enlaces sospechosos.',
          'Utilizar canales oficiales.',
          'No compartir códigos de autenticación.',
          'Conservar comprobantes de operaciones importantes.',
        ],
      },
      {
        title: 'Correo electrónico',
        list: [
          'Revisar cuidadosamente remitentes.',
          'Desconfiar de solicitudes urgentes.',
          'No abrir archivos inesperados.',
          'Comprobar los enlaces antes de utilizarlos.',
          'Evitar responder con información confidencial.',
        ],
      },
      {
        title: 'Entornos académicos y laborales',
        text:
          'En universidades y organizaciones pueden tratarse expedientes, información de contacto, documentos, evaluaciones, datos laborales y otra información personal. La protección requiere aplicar controles de acceso, políticas internas, capacitación y buenas prácticas de manejo de información.',
      },
    ],
  },

  {
    id: 'uso-indebido',
    icon: '⚠️',
    title: '9. Uso indebido y respuesta ante incidentes',
    intro:
      'Cuando una persona sospecha que sus datos fueron expuestos o utilizados indebidamente, es importante actuar de forma ordenada. Una respuesta temprana puede contribuir a limitar el impacto y conservar evidencia útil.',
    blocks: [
      {
        title: 'Identificar la situación',
        list: [
          'Determinar qué información pudo haberse expuesto.',
          'Identificar la cuenta, servicio o dispositivo involucrado.',
          'Determinar cuándo se detectó la situación.',
          'Revisar si existen actividades desconocidas.',
        ],
      },
      {
        title: 'Conservar evidencia',
        list: [
          'Guardar correos relevantes.',
          'Conservar mensajes y notificaciones.',
          'Tomar capturas de pantalla cuando corresponda.',
          'Guardar comprobantes de operaciones.',
          'Registrar fechas y circunstancias del incidente.',
        ],
      },
      {
        title: 'Proteger las cuentas',
        list: [
          'Cambiar contraseñas comprometidas.',
          'No reutilizar la nueva contraseña.',
          'Cerrar sesiones desconocidas.',
          'Activar autenticación multifactor.',
          'Revisar métodos de recuperación.',
        ],
      },
      {
        title: 'Utilizar canales oficiales',
        text:
          'Cuando el incidente se relaciona con un servicio determinado, se deben utilizar sus canales oficiales de soporte o atención. Si corresponde a protección de datos personales, pueden consultarse los mecanismos institucionales disponibles en Costa Rica.',
      },
      {
        title: 'No agravar el incidente',
        text:
          'Ante una situación sospechosa, no se deben proporcionar nuevos datos, códigos de autenticación o credenciales a personas que contacten mediante canales no verificados. La presión o urgencia son señales que deben analizarse cuidadosamente.',
      },
      {
        title: 'Alcance de esta plataforma',
        text:
          'La plataforma tiene finalidad educativa e informativa. No inspecciona dispositivos, cuentas ni actividad en Internet y no determina por sí misma la existencia de un delito o incidente. Para situaciones reales deben utilizarse los procedimientos y autoridades correspondientes.',
      },
    ],
  },

  {
    id: 'internacional',
    icon: '🌎',
    title: '10. Perspectiva internacional',
    intro:
      'La investigación desarrollada para el proyecto analiza diferentes experiencias internacionales con el propósito de identificar elementos que contribuyen a una protección integral de los datos y a una mayor resiliencia digital.',
    countries: [
      {
        name: 'Unión Europea',
        flag: '🇪🇺',
        text:
          'El Reglamento General de Protección de Datos (RGPD) constituye uno de los principales referentes internacionales. Incorpora principios, derechos de las personas, obligaciones para responsables y encargados y mecanismos de responsabilidad proactiva (Unión Europea, 2016).',
      },
      {
        name: 'España',
        flag: '🇪🇸',
        text:
          'España cuenta con una estructura institucional especializada que combina regulación, supervisión, orientación y educación. La experiencia de la Agencia Española de Protección de Datos constituye un referente para la protección de derechos y la concienciación ciudadana (AEPD, 2022).',
      },
      {
        name: 'Canadá',
        flag: '🇨🇦',
        text:
          'El modelo canadiense destaca la responsabilidad de las organizaciones en la protección de información personal y la importancia de mecanismos de supervisión y cumplimiento.',
      },
      {
        name: 'Singapur',
        flag: '🇸🇬',
        text:
          'Singapur integra protección de datos, gobernanza, cumplimiento, formación y cultura de privacidad dentro de una estrategia amplia de transformación digital (Cyber Security Agency of Singapore, 2021; Personal Data Protection Commission Singapore, 2022).',
      },
      {
        name: 'Japón',
        flag: '🇯🇵',
        text:
          'Japón combina regulación, supervisión, innovación tecnológica y estrategias nacionales de ciberseguridad. Su experiencia muestra la importancia de actualizar las políticas frente a la evolución tecnológica (Government of Japan, 2021a, 2021b).',
      },
      {
        name: 'Australia',
        flag: '🇦🇺',
        text:
          'Australia aborda la protección de información dentro de un ecosistema más amplio de privacidad, ciberseguridad y resiliencia digital. Su estrategia nacional destaca la necesidad de fortalecer capacidades frente a amenazas emergentes (Australian Government, 2023).',
      },
    ],
  },

  {
    id: 'comparativo',
    icon: '📊',
    title: '11. Análisis comparativo y lecciones para Costa Rica',
    intro:
      'La comparación internacional permite pasar de la descripción de diferentes modelos a la identificación de elementos comunes y oportunidades de fortalecimiento para Costa Rica.',
    blocks: [
      {
        title: 'Regulación',
        text:
          'Los países analizados cuentan con marcos normativos que establecen derechos, responsabilidades y mecanismos de protección. La existencia de una regulación clara proporciona una base, pero requiere instituciones y capacidades que permitan aplicarla de manera efectiva.',
      },
      {
        title: 'Supervisión institucional',
        text:
          'Los modelos internacionales muestran la relevancia de contar con instituciones especializadas capaces de orientar, supervisar y promover el cumplimiento. La especialización institucional contribuye a generar confianza y claridad para ciudadanía y organizaciones.',
      },
      {
        title: 'Gestión del riesgo',
        text:
          'La protección moderna no debe limitarse a reaccionar después de un incidente. La gestión del riesgo permite anticipar escenarios, establecer controles, evaluar resultados y realizar mejoras continuas (ISO, 2018; NIST, 2024).',
      },
      {
        title: 'Educación y concienciación',
        text:
          'La educación digital constituye un componente transversal. Una persona que comprende los riesgos puede tomar mejores decisiones frente a solicitudes de información, enlaces, permisos, configuraciones de privacidad y autenticación.',
      },
      {
        title: 'Capacidades técnicas',
        text:
          'La existencia de legislación requiere capacidades técnicas que permitan proteger sistemas, detectar incidentes, responder ante amenazas y recuperar servicios. La coordinación entre políticas públicas, instituciones y especialistas resulta fundamental.',
      },
      {
        title: 'Oportunidades para Costa Rica',
        list: [
          'Fortalecer la educación ciudadana en privacidad y seguridad digital.',
          'Promover la cultura de gestión del riesgo.',
          'Fortalecer capacidades técnicas e institucionales.',
          'Impulsar cooperación entre sectores.',
          'Promover estándares y buenas prácticas internacionales.',
          'Mantener actualizadas las políticas frente a cambios tecnológicos.',
          'Facilitar mecanismos de orientación accesibles para la ciudadanía.',
        ],
      },
      {
        title: 'Una visión integral',
        text:
          'La evidencia internacional analizada permite entender la protección de datos como un ecosistema en el que legislación, instituciones, tecnología, gestión del riesgo, educación y participación ciudadana deben funcionar de manera complementaria. Esta perspectiva coincide con el enfoque integral planteado por el proyecto de investigación.',
      },
    ],
  },

  {
    id: 'tecnologias',
    icon: '🔐',
    title: '12. Tecnologías y mecanismos de protección',
    intro:
      'La tecnología puede contribuir significativamente a la protección de datos, pero su efectividad depende de una implementación adecuada y de su integración con procesos, políticas y comportamiento humano.',
    blocks: [
      {
        title: 'Autenticación multifactor',
        text:
          'La autenticación multifactor incorpora más de un factor para verificar la identidad de una persona. Puede reducir el impacto de una contraseña comprometida cuando el segundo factor permanece protegido.',
      },
      {
        title: 'Cifrado',
        text:
          'El cifrado transforma la información para impedir que personas no autorizadas puedan interpretarla fácilmente. Su aplicación puede contribuir a proteger datos durante almacenamiento o transmisión, dependiendo del escenario y de la implementación.',
      },
      {
        title: 'Gestión de contraseñas',
        text:
          'Las contraseñas deben ser suficientemente robustas y, especialmente, no deberían reutilizarse entre servicios importantes. Los gestores de contraseñas pueden facilitar la generación y almacenamiento seguro de credenciales.',
      },
      {
        title: 'Control de acceso',
        text:
          'Los sistemas deben limitar el acceso a la información según las funciones y necesidades de cada usuario. El principio de mínimo privilegio reduce la cantidad de información disponible para cada cuenta.',
      },
      {
        title: 'Copias de seguridad',
        text:
          'Los respaldos permiten recuperar información después de fallos, pérdida de dispositivos, errores o determinados incidentes de seguridad. Deben protegerse adecuadamente para evitar que se conviertan en una nueva fuente de exposición.',
      },
      {
        title: 'Actualizaciones',
        text:
          'Mantener sistemas y aplicaciones actualizados contribuye a reducir riesgos asociados con vulnerabilidades conocidas. Las actualizaciones deben formar parte de una política continua de mantenimiento.',
      },
      {
        title: 'Privacidad desde el diseño',
        text:
          'La protección puede incorporarse desde las primeras etapas del diseño de servicios y sistemas, considerando desde el principio qué datos se necesitan, cómo serán protegidos y qué riesgos podrían aparecer (Unión Europea, 2016; ISO/IEC 27701).',
      },
    ],
  },

  {
    id: 'educacion',
    icon: '🎓',
    title: '13. Educación y cultura digital',
    intro:
      'La protección de datos no puede depender exclusivamente de herramientas tecnológicas. La educación y la cultura digital permiten desarrollar criterios para identificar riesgos, comprender derechos y adoptar comportamientos preventivos.',
    blocks: [
      {
        title: 'Alfabetización digital',
        text:
          'La alfabetización digital incluye la capacidad de utilizar tecnologías de manera informada, crítica y segura. En materia de protección de datos, implica comprender qué información se comparte y cuáles pueden ser sus consecuencias.',
      },
      {
        title: 'Concienciación',
        text:
          'La concienciación busca que las personas reconozcan situaciones de riesgo antes de que se produzca un incidente. No consiste únicamente en memorizar reglas, sino en desarrollar hábitos de evaluación y toma de decisiones.',
      },
      {
        title: 'Factor humano',
        text:
          'Los incidentes pueden involucrar errores, engaños, configuraciones incorrectas o decisiones apresuradas. Por ello, las medidas técnicas deben complementarse con formación y procedimientos claros.',
      },
      {
        title: 'Cultura de seguridad',
        text:
          'Una cultura de seguridad se desarrolla cuando la protección de la información forma parte de las decisiones cotidianas de una organización y de sus integrantes. Requiere liderazgo, capacitación, políticas y mejora continua.',
      },
      {
        title: 'Responsabilidad ciudadana',
        text:
          'La ciudadanía también participa en el ecosistema de protección. Revisar permisos, proteger cuentas, limitar información pública y reconocer intentos de fraude son acciones que contribuyen a reducir riesgos individuales y colectivos.',
      },
      {
        title: 'Aprender mediante escenarios',
        text:
          'Las simulaciones y escenarios educativos permiten practicar decisiones sin exponer datos reales. Este enfoque es especialmente útil para comprender amenazas como phishing, robo de identidad, solicitudes de información y compromisos de cuentas.',
      },
    ],
  },

  {
    id: 'buenas-practicas',
    icon: '✅',
    title: '14. Guía de buenas prácticas',
    intro:
      'Las siguientes recomendaciones sintetizan medidas preventivas que pueden aplicarse en la vida cotidiana. Su objetivo no es eliminar completamente el riesgo, sino reducir la exposición y mejorar la capacidad de respuesta.',
    blocks: [
      {
        title: 'Antes de compartir información',
        list: [
          'Identifica quién solicita la información.',
          'Comprende la finalidad de la solicitud.',
          'Evalúa si los datos son realmente necesarios.',
          'Evita entregar información adicional.',
          'Utiliza canales oficiales.',
        ],
      },
      {
        title: 'Protección de cuentas',
        list: [
          'Utiliza contraseñas únicas.',
          'Activa autenticación multifactor.',
          'No compartas códigos de autenticación.',
          'Revisa sesiones y dispositivos conectados.',
          'Mantén actualizados los mecanismos de recuperación.',
        ],
      },
      {
        title: 'Navegación segura',
        list: [
          'Comprueba el dominio de los sitios.',
          'Evita enlaces inesperados.',
          'No introduzcas credenciales en sitios sospechosos.',
          'Mantén actualizado el navegador.',
          'Utiliza servicios y fuentes confiables.',
        ],
      },
      {
        title: 'Redes sociales',
        list: [
          'Limita la información pública.',
          'Revisa las opciones de privacidad.',
          'Controla aplicaciones conectadas.',
          'Evita publicar documentos personales.',
          'Considera las consecuencias antes de publicar.',
        ],
      },
      {
        title: 'Dispositivos',
        list: [
          'Utiliza bloqueo de pantalla.',
          'Mantén actualizado el sistema.',
          'Activa mecanismos de protección disponibles.',
          'Realiza copias de seguridad.',
          'Evita instalar aplicaciones de fuentes desconocidas.',
        ],
      },
      {
        title: 'Ante un posible incidente',
        list: [
          'Mantén la calma y evita actuar impulsivamente.',
          'Conserva evidencia.',
          'Protege las cuentas afectadas.',
          'Contacta al servicio mediante canales oficiales.',
          'Busca orientación institucional cuando corresponda.',
        ],
      },
    ],
  },

  {
    id: 'recursos',
    icon: '📚',
    title: '15. Recursos educativos',
    intro:
      'La educación en protección de datos requiere combinar información conceptual con herramientas que permitan practicar y aplicar los conocimientos adquiridos.',
    blocks: [
      {
        title: 'Chatbot de orientación',
        text:
          'El proyecto incorpora un chatbot orientado a proporcionar información educativa y guiar al usuario frente a situaciones relacionadas con protección de datos y seguridad digital. Su finalidad es facilitar el acceso a orientación estructurada.',
      },
      {
        title: 'Simulaciones educativas',
        text:
          'Las simulaciones permiten presentar escenarios de riesgo y solicitar al usuario que tome decisiones. Este mecanismo facilita el aprendizaje mediante situaciones prácticas sin requerir información personal real.',
      },
      {
        title: 'Evaluación de prácticas digitales',
        text:
          'La evaluación educativa permite reflexionar sobre hábitos relacionados con contraseñas, autenticación, privacidad, navegación y manejo de información. Su resultado debe interpretarse como una herramienta preventiva y no como un diagnóstico de seguridad.',
      },
      {
        title: 'Materiales de consulta',
        list: [
          'Guías educativas.',
          'Infografías.',
          'Videos.',
          'Documentación institucional.',
          'Normativa aplicable.',
          'Estándares y marcos de referencia.',
        ],
      },
      {
        title: 'Cómo utilizar este módulo',
        text:
          'Se recomienda comenzar por los fundamentos, continuar con principios y derechos, revisar el contexto costarricense, estudiar los riesgos y posteriormente utilizar las herramientas prácticas del proyecto. Esta secuencia permite conectar conocimiento conceptual con toma de decisiones.',
      },
    ],
  },

  {
    id: 'referencias',
    icon: '📖',
    title: '16. Referencias',
    intro:
      'Las siguientes fuentes sustentan el contenido académico y normativo utilizado en este módulo. La presentación se organiza siguiendo criterios de referencia bibliográfica APA 7.',
        references: [
      {
        author: 'Agencia Española de Protección de Datos.',
        year: '2022',
        title: 'El manual del delegado de protección de datos.',
        source: 'AEPD.',
        url: 'https://www.aepd.es/documento/el-manual-del-dpd-korffgeorges-esp.pdf',
      },
      {
        author: 'Asamblea Legislativa de la República de Costa Rica.',
        year: '2011',
        title:
          'Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales (Ley N.º 8968).',
        source: 'Sistema Costarricense de Información Jurídica.',
        url: 'https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=70975&param2=85989&param3=1',
      },
      {
        author: 'Australian Government.',
        year: '2023',
        title: '2023–2030 Australian Cyber Security Strategy.',
        source: 'Department of Home Affairs.',
        url: 'https://www.homeaffairs.gov.au/cyber-security-subsite/files/2023-cyber-security-strategy.pdf',
      },
      {
        author: 'Banco Mundial.',
        year: '2023',
        title:
          'Cybersecurity for development: Global trends and local implications.',
        source: 'World Bank.',
        url: 'https://documents1.worldbank.org/curated/en/099705012152346616/pdf/IDU044546588061b004aaf08b5805c55aaee4128.pdf',
      },
      {
        author: 'Canadian Centre for Cyber Security.',
        year: '2025',
        title: 'National Cyber Threat Assessment 2025–2026.',
        source: 'Government of Canada.',
        url: 'https://www.cyber.gc.ca/sites/default/files/national-cyber-threat-assessment-2025-2026-e.pdf',
      },
      {
        author: 'Cyber Security Agency of Singapore.',
        year: '2021',
        title: 'The Singapore Cybersecurity Strategy 2021.',
        source: 'Government of Singapore.',
        url: 'https://ccdcoe.org/uploads/2018/10/Singapore_Cybersecurity_Strategy_2021.pdf',
      },
      {
        author: 'Government of Canada.',
        year: '2000',
        title:
          'Personal Information Protection and Electronic Documents Act (PIPEDA).',
        source: 'Minister of Justice.',
        url: 'https://laws-lois.justice.gc.ca/pdf/p-8.6.pdf',
      },
      {
        author: 'Government of Japan.',
        year: '2021a',
        title: 'Cybersecurity Strategy.',
        source: 'Cybersecurity Strategy Headquarters.',
        url: 'https://www.cyber.go.jp/eng/pdf/cs-senryaku2021-en.pdf',
      },
      {
        author: 'Government of Japan.',
        year: '2021b',
        title: 'Act on the Protection of Personal Information (APPI).',
        source: 'Cabinet Secretariat.',
        url: 'https://www.cas.go.jp/jp/seisaku/hourei/data/APPI.pdf',
      },
      {
        author: 'International Organization for Standardization.',
        year: '2018',
        title: 'Gestión del riesgo — Directrices (ISO 31000:2018).',
        source: 'ISO.',
        url: 'https://biblioteca.dgmm.gob.hn/wp-content/uploads/2024/05/GC.D.07-ISO-31000-2018.pdf',
      },
      {
        author: 'International Organization for Standardization.',
        year: '2019',
        title:
          'ISO/IEC 27701:2019 — Security techniques — Extension to ISO/IEC 27001 and ISO/IEC 27002 for privacy information management.',
        source: 'ISO.',
        url: 'https://pdfcoffee.com/iso-iec-27701-2019-espanol-4-pdf-free.html',
      },
      {
        author: 'International Organization for Standardization.',
        year: '2022',
        title:
          'ISO/IEC 27001:2022 — Information security management systems — Requirements.',
        source: 'ISO.',
        url: 'https://www.exactls.com/wp-content/uploads/2025/02/ISO_IEC-270012022-ed.3.pdf',
      },
      {
        author:
          'Ministerio de Ciencia, Innovación, Tecnología y Telecomunicaciones.',
        year: '2023',
        title:
          'Estrategia Nacional de Ciberseguridad de Costa Rica 2023–2027.',
        source: 'MICITT.',
        url: 'https://www.micitt.go.cr/sites/default/files/2023-11/NCS%20Costa%20Rica%20-%2010Nov2023%20SPA.pdf',
      },
      {
        author: 'National Institute of Standards and Technology.',
        year: '2024',
        title: 'The NIST Cybersecurity Framework (CSF) 2.0.',
        source: 'U.S. Department of Commerce.',
        url: 'https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.spa.pdf',
      },
      {
        author:
          'Organisation for Economic Co-operation and Development.',
        year: '2001',
        title:
          'OECD guidelines on the protection of privacy and transborder flows of personal data.',
        source: 'OECD Publishing.',
        url: 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2002/02/oecd-guidelines-on-the-protection-of-privacy-and-transborder-flows-of-personal-data_g1gh255f/9789264196391-en.pdf',
      },
      {
        author:
          'Organisation for Economic Co-operation and Development.',
        year: '2022',
        title: 'OECD policy framework on digital security.',
        source: 'OECD Publishing.',
        url: 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2022/12/oecd-policy-framework-on-digital-security_a0b1d79c/a69df866-en.pdf',
      },
      {
        author: 'Personal Data Protection Commission Singapore.',
        year: '2022',
        title:
          'Advisory guidelines on key concepts in the Personal Data Protection Act.',
        source: 'PDPC.',
        url: 'https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/advisory-guidelines/ag-on-key-concepts/advisory-guidelines-on-key-concepts-in-the-pdpa-17-may-2022.pdf',
      },
      {
        author: 'Unión Europea.',
        year: '2016',
        title:
          'Reglamento (UE) 2016/679 relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales (RGPD).',
        source: 'Diario Oficial de la Unión Europea.',
        url: 'https://www.boe.es/doue/2016/119/L00001-00088.pdf',
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

function ReferencesList({ references }) {
  return (
    <div className="protection-data__reference-list">
      {references.map((reference, index) => (
        <div
          className="protection-data__reference"
          key={`${reference.author}-${reference.year}-${index}`}
        >
          <p>
            <span className="protection-data__reference-author">
              {reference.author}
            </span>{' '}
            ({reference.year}).{' '}
            <em>{reference.title}</em>.
            {reference.source &&
              reference.source !== reference.author && (
                <>
                  {' '}
                  {reference.source}.
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
  )
}

export default function ProtectionDataPage() {
  return (
    <main
      id="main-content"
      className="protection-data"
    >
      {/* =====================================================
          HERO
          ===================================================== */}

      <header className="protection-data__hero">
        <div className="protection-data__hero-content">
          <span className="protection-data__eyebrow">
            EDUCACIÓN CIUDADANA · PRIVACIDAD · DERECHOS DIGITALES
          </span>

          <h1>Protección de Datos Personales</h1>

          <p>
            Módulo educativo sobre protección de datos personales,
            privacidad, derechos digitales y seguridad de la información,
            con especial atención al marco costarricense y a las
            principales experiencias internacionales.
          </p>

          <div className="protection-data__hero-tags">
            <span>🇨🇷 Costa Rica</span>
            <span>⚖️ Ley N.º 8968</span>
            <span>🛡️ Ciberseguridad</span>
            <span>🌎 Perspectiva internacional</span>
            <span>🎓 Educación digital</span>
          </div>
        </div>
      </header>

      {/* =====================================================
          INTRODUCCIÓN
          ===================================================== */}

      <section className="protection-data__intro">
        <div className="protection-data__intro-card">
          <span className="protection-data__intro-icon">
            🔐
          </span>

          <div>
            <h2>
              La protección de datos es una responsabilidad
              compartida
            </h2>

            <p>
              La transformación digital ha incrementado la cantidad
              de información personal que se recopila, almacena,
              utiliza y comparte. Esta realidad exige comprender
              tanto los derechos de las personas como las
              responsabilidades de quienes realizan tratamientos
              de información.
            </p>

            <p>
              Desde una perspectiva de ciudadanía digital, proteger
              los datos significa tomar decisiones informadas,
              reconocer riesgos, comprender el marco jurídico y
              utilizar medidas técnicas y organizativas adecuadas.
            </p>

            <p>
              Este módulo integra fundamentos conceptuales,
              normativa, análisis institucional, ciberseguridad,
              experiencias internacionales y recomendaciones
              prácticas para facilitar una comprensión integral de
              la protección de datos personales.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ÍNDICE
          ===================================================== */}

      <nav
        className="protection-data__navigation"
        aria-label="Índice de Protección de Datos"
      >
        <div className="protection-data__navigation-header">
          <span>ÍNDICE</span>
          <strong>Protección de Datos</strong>
        </div>

        <div className="protection-data__navigation-list">
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="protection-data__nav-item"
            >
              <span className="protection-data__nav-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="protection-data__nav-icon">
                {section.icon}
              </span>

              <strong>
                {section.title.replace(/^\d+\.\s/, '')}
              </strong>
            </a>
          ))}
        </div>
      </nav>

      {/* =====================================================
          CONTENIDO PRINCIPAL
          ===================================================== */}

      <div className="protection-data__content">
        {sections.map(section => (
          <section
            key={section.id}
            id={section.id}
            className={`protection-data__section${
              section.id === 'referencias'
                ? ' protection-data__references'
                : ''
            }`}
          >
            <div className="protection-data__section-heading">
              <span className="protection-data__section-icon">
                {section.icon}
              </span>

              <div>
                <span className="protection-data__section-kicker">
                  {section.id === 'referencias'
                    ? 'REFERENCIAS ACADÉMICAS'
                    : 'EDUCACIÓN Y PROTECCIÓN DE DATOS'}
                </span>

                <h2>{section.title}</h2>
              </div>
            </div>

            <p className="protection-data__section-intro">
              {section.intro}
            </p>

            {/* BLOQUES EDUCATIVOS */}

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

            {/* COMPARACIÓN INTERNACIONAL */}

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

            {/* REFERENCIAS APA */}

            {section.references && (
              <ReferencesList
                references={section.references}
              />
            )}
          </section>
        ))}
      </div>

      {/* =====================================================
          CIERRE
          ===================================================== */}

      <section className="protection-data__closing">
        <div>
          <span className="protection-data__closing-icon">
            🎓
          </span>

          <h2>
            Conocer, prevenir y actuar también es proteger
          </h2>

          <p>
            La protección de datos personales requiere combinar
            conocimiento, responsabilidad y medidas preventivas.
            Comprender los derechos, reconocer los riesgos y adoptar
            buenas prácticas permite fortalecer la seguridad y la
            confianza en los entornos digitales.
          </p>

          <p>
            La ciudadanía informada constituye un elemento
            fundamental para construir una cultura digital basada
            en la privacidad, la seguridad y el uso responsable de
            la información.
          </p>
        </div>
      </section>
    </main>
  )
}