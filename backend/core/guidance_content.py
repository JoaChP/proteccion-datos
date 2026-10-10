"""Contextual follow-up questions and prioritized educational action plans."""
from .chat_sources import PRIVACY, LAW, PRODHAB, OIJ

FOLLOW_UPS = {
    "phishing": ("¿Hasta dónde llegaste con el mensaje?", ["A) Solo recibí el mensaje; no abrí el enlace.", "B) Abrí el enlace, pero no entregué datos ni instalé archivos.", "C) Entregué datos, un código o instalé algo."], [
        ("Verifica antes de interactuar", "No respondas ni uses el enlace. Accede por tu cuenta a la aplicación o al portal oficial para comprobar la solicitud.", "Conserva el mensaje si necesitas reportarlo; después utiliza las opciones de bloqueo o reporte del servicio.", "Reconoce la urgencia, las solicitudes de códigos y el dominio inesperado. Una apariencia conocida no demuestra autenticidad."),
        ("Detén la interacción y revisa lo ocurrido", "Cierra la página sospechosa y no completes formularios ni aceptes descargas. Abrir un enlace no demuestra por sí solo que tu cuenta fue comprometida.", "Revisa si hubo descargas o permisos concedidos y las alertas de tus cuentas. Si instalaste algo, vuelve a «Orientación ante una situación» e indica que instalaste un archivo o una aplicación.", "Verifica por un canal independiente; HTTPS cifra la conexión, pero no confirma la legitimidad del sitio."),
        ("Protege primero la cuenta o el medio de pago afectado", "Si entregaste credenciales, cambia la contraseña desde un dispositivo de confianza y el servicio oficial; revisa sesiones y recuperación. Si compartiste datos bancarios o autorizaste un pago, contacta al banco por un canal oficial.", "Conserva evidencia. Si instalaste un programa sospechoso, deja de usar ese equipo para operaciones sensibles y busca apoyo técnico antes de volver a utilizarlas.", "No compartas más códigos ni pagues por una supuesta recuperación. Haber respondido no te hace culpable: lo importante ahora es reducir la exposición.")
    ]),
    "fraude": ("¿Llegaste a entregar información o dinero?", ["A) No entregué datos ni realicé pagos.", "B) Compartí información o credenciales, pero no pagué.", "C) Pagué o veo una transacción que no reconozco."], [
        ("Pausa y verifica la solicitud", "No envíes dinero ni datos mientras verificas por un canal oficial independiente.", "Conserva la oferta y comprueba la identidad de la entidad, las condiciones y la finalidad de los datos solicitados.", "Una promoción atractiva o un perfil con seguidores no prueban legitimidad."),
        ("Reduce la exposición de la información compartida", "Si compartiste una contraseña o un código, protege la cuenta desde el servicio oficial. Si entregaste datos financieros, consulta al banco qué medidas corresponden.", "Registra qué compartiste y con quién, sin publicar esos datos. Revisa alertas de acceso y conserva evidencia.", "No necesitas describir aquí tus datos: selecciona opciones y consulta los canales correspondientes."),
        ("Contacta primero al banco o proveedor de pago", "Solicita revisión de la operación por los canales oficiales. Conserva comprobantes, mensajes y fechas.", "Para orientación sobre un posible delito, consulta el OIJ. La revisión de una operación no garantiza que el dinero pueda recuperarse.", "Evita pagos adicionales o personas que prometen recuperar el dinero a cambio de una comisión.")
    ]),
    "acceso": ("¿Todavía puedes entrar a la cuenta afectada?", ["A) Sí, puedo entrar y veo actividad sospechosa.", "B) No, perdí el acceso.", "C) No sé si el aviso de acceso es auténtico."], [
        ("Protege la cuenta desde su servicio oficial", "Desde un dispositivo de confianza, cambia la contraseña, revisa las sesiones y los medios de recuperación; activa autenticación multifactor si está disponible.", "Comprueba cambios que no reconoces y protege otras cuentas si reutilizabas la contraseña.", "Prioriza el correo principal: suele permitir recuperar otras cuentas."),
        ("Usa el proceso oficial de recuperación", "Accede por tu cuenta al servicio y utiliza su recuperación de cuenta. No entregues códigos a quienes prometen recuperarla por mensajería.", "Conserva avisos de cambios y revisa cuentas vinculadas. Si existe suplantación, informa a tus contactos mediante otro canal.", "La recuperación depende del proveedor; este asistente no puede restablecer el acceso."),
        ("Comprueba la alerta sin seguir sus enlaces", "Abre la aplicación o portal oficial por tu cuenta y revisa la actividad de seguridad.", "Si confirmas accesos desconocidos, protege la cuenta; si el aviso era falso, bloquéalo y repórtalo dentro del servicio.", "Una alerta exige verificación; no basta por sí sola para afirmar que hubo un ataque.")
    ]),
    "datos": ("¿Qué gestión realizaste con la entidad que trata tus datos?", ["A) Todavía no he solicitado información.", "B) Envié una solicitud y espero respuesta.", "C) Recibí una respuesta y necesito orientación."], [
        ("Identifica a la entidad y la finalidad del tratamiento", "Consulta su canal oficial y solicita información sobre el tratamiento de tus datos. Evita enviar más información de la necesaria.", "Conserva la solicitud y la respuesta para comprender qué datos se tratan y valorar la gestión que corresponde.", "Los requisitos y la procedencia de cada gestión dependen del caso y deben consultarse en las fuentes oficiales."),
        ("Conserva constancia y revisa el canal utilizado", "Guarda la fecha, el comprobante y el contenido de tu solicitud; verifica que utilizaste el canal oficial.", "Consulta los requisitos y el procedimiento aplicable. Si necesitas apoyo sobre tratamiento de datos, revisa los canales de PRODHAB.", "Este recorrido no determina plazos ni resuelve si una entidad incumplió una obligación."),
        ("Organiza la respuesta antes de buscar apoyo", "Revisa qué respondió la entidad y qué punto sigue sin aclararse. Conserva ambas gestiones.", "Consulta PRODHAB para orientación sobre tratamiento de datos personales. No publiques documentos con información tuya o de terceros.", "La revisión educativa no sustituye una valoración jurídica del caso.")
    ]),
    "identidad": ("¿Qué señal de posible suplantación observaste?", ["A) Un perfil utiliza mi nombre o fotografía.", "B) Alguien pide dinero o datos haciéndose pasar por mí.", "C) Hay cuentas, accesos u operaciones que no reconozco."], [
        ("Conserva evidencia y utiliza el reporte del servicio", "Registra el perfil y los mensajes relevantes, sin enfrentarte al usuario ni divulgar información privada.", "Utiliza el procedimiento oficial de reporte por suplantación y revisa quién puede ver tus publicaciones.", "Un perfil parecido requiere revisar el contexto; el asistente no puede confirmar quién lo creó."),
        ("Advierte a tus contactos por un canal independiente", "Pídeles verificar cualquier solicitud antes de enviar dinero o datos. Conserva los mensajes y reporta el perfil en la plataforma.", "Si tu cuenta también fue afectada, utiliza la recuperación oficial. Para posibles delitos, consulta los canales del OIJ.", "No solicites a otras personas que contacten al perfil ni que le entreguen información para comprobarlo."),
        ("Contacta al proveedor de la operación o la cuenta", "Verifica la actividad por sus canales oficiales y solicita medidas de protección según la situación.", "Conserva evidencia de las operaciones y consulta al OIJ sobre posibles delitos. Protege tus credenciales y medios de recuperación.", "No todas las situaciones tienen la misma causa; la institución competente debe valorar los hechos.")
    ]),
}

FOLLOW_UPS["solicitud"] = (
    "Te solicitaron datos personales. ¿Qué información tienes sobre la solicitud?",
    ["A) La entidad y la finalidad están claras; quiero revisar qué entregar.", "B) No explican la finalidad o piden datos que parecen excesivos.", "C) Ya entregué datos y quiero conocer cómo se utilizan."],
    [
        ("Comprueba qué datos son necesarios", "Verifica el canal oficial y pregunta cuáles datos son obligatorios, para qué se requieren y quién los tratará. No compartas una fotografía de tu cédula por un enlace sin verificar.", "Revisa la información del tratamiento y conserva constancia. Que una entidad solicite identificación no demuestra por sí solo un uso indebido.", "El artículo 5 de la Ley N.º 8968 regula información previa y consentimiento, con excepciones; el artículo 6 aborda calidad y adecuación de los datos."),
        ("Aclara la finalidad antes de entregar información", "Pregunta quién solicita los datos, con qué finalidad, quién podrá recibirlos y qué ocurre si no los proporcionas. Detén el envío por canales que no puedas verificar.", "Solicita una explicación de la necesidad de los datos. Si necesitas orientación sobre su tratamiento en Costa Rica, consulta PRODHAB.", "El artículo 5 contempla información previa; el artículo 6 relaciona los datos con su finalidad. No toda solicitud exige consentimiento: existen excepciones legales."),
        ("Consulta a la entidad responsable", "Usa su canal oficial y pregunta qué datos tiene, para qué los usa y con quién los comparte. Guarda la solicitud y la respuesta.", "Si la respuesta no aclara tu caso, revisa el procedimiento oficial o consulta a PRODHAB.", "El artículo 7 de la Ley N.º 8968 reconoce derechos sobre tus datos. Este asistente explica los pasos generales; no decide reclamos ni reemplaza el trámite oficial.")
    ])

LEGAL_CONTEXT = {
    "datos": "Ley N.º 8968, artículos 6 y 7: los datos deben ser pertinentes y exactos. Puedes pedir acceso, corrección o supresión cuando corresponda. Identifica a la entidad responsable y guarda constancia de tu gestión.",
    "solicitud": "Ley N.º 8968, artículos 5 y 6: antes de entregar datos, deben explicarte para qué los necesitan, quién los tratará y si son obligatorios. Verifica que lo solicitado tenga relación con esa finalidad.",
}

def guidance_sources(topic):
    return [LAW, PRODHAB] if topic in {"datos", "solicitud"} else [PRIVACY, OIJ]

def action_plan(topic, choice, context):
    question, options, plans = FOLLOW_UPS[topic]
    title, first, next_step, learning = plans[context]
    legal = f"\n\nFUNDAMENTO · LEY N.º 8968\n{LEGAL_CONTEXT[topic]}" if topic in LEGAL_CONTEXT else ""
    return (f"RESUMEN DE TU SITUACIÓN\n{options[context][3:]}\n\n"
            f"QUÉ HACER AHORA\n{first}\n\n"
            f"SIGUIENTE PASO\n{next_step}\n\n"
            f"RECUERDA\n{learning}"
            f"{legal}\n\n"
            "Esta es orientación educativa. No confirma un incidente ni sustituye a la institución competente.")
