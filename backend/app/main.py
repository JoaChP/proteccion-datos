"""FastAPI application and guided knowledge base for Protección de Datos CR."""

from datetime import datetime, timezone
import os
from typing import Any
import unicodedata
from urllib.parse import urlencode
from urllib.request import urlopen
import json

from fastapi import FastAPI, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

API_PREFIX = "/api/v1"
DEFAULT_ORIGINS = (
    "http://localhost:5173,http://127.0.0.1:5173,"
    "https://proteccion-datos-web.vercel.app"
)
ALLOWED_ORIGINS = [
    item.strip()
    for item in os.getenv("FRONTEND_ORIGINS", DEFAULT_ORIGINS).split(",")
    if item.strip()
]

app = FastAPI(title="Protección de Datos CR API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class ChatMessage(BaseModel):
    message: str = Field(min_length=1, max_length=1_000)
    session_id: str = Field(min_length=1, max_length=128)
    language: str = Field(default="es", max_length=10)


class ChatReply(BaseModel):
    reply: str
    suggestions: list[str]
    display_suggestions: list[str] | None = None

    def __init__(
        self,
        reply: str | None = None,
        suggestions: list[str] | None = None,
        **data: Any,
    ) -> None:
        if reply is not None:
            data["reply"] = reply
        if suggestions is not None:
            data["suggestions"] = suggestions
        super().__init__(**data)


class AnalyticsEvent(BaseModel):
    event: str = Field(min_length=1, max_length=100)
    data: dict[str, Any] = Field(default_factory=dict)
    timestamp: datetime


# ============================================================
# MENÚ PRINCIPAL
# ============================================================

ROOT_OPTIONS = [
    "Orientación ante una situación",
    "Simulación educativa",
    "Evaluar mis prácticas digitales",
    "Mis derechos y denuncias",
]


# ============================================================
# ORIENTACIÓN Y ASISTENCIA
# ============================================================

GUIDANCE = {
    "fraude": {
        "label": "Posible fraude o estafa",
        "question": (
            "⚠️ Vamos a identificar la situación para darte una orientación "
            "más adecuada.\n\n"
            "¿Qué ocurrió?"
        ),
        "options": [
            "A) Me solicitaron dinero o datos bancarios.",
            "B) Recibí una oferta, premio o promoción sospechosa.",
            "C) Realicé un pago y algo parece irregular.",
        ],
        "responses": {
            "A": (
                "⚠️ POSIBLE FRAUDE O ESTAFA\n\n"
                "Si una persona o entidad te solicita dinero, información "
                "bancaria, códigos de autenticación o credenciales de forma "
                "inesperada, existe un posible riesgo de fraude.\n\n"

                "🔎 ¿POR QUÉ ES UNA SEÑAL DE ALERTA?\n"
                "Los intentos de fraude suelen utilizar engaños, urgencia, "
                "amenazas o falsas oportunidades para conseguir que la persona "
                "actúe rápidamente y entregue información o dinero.\n\n"

                "🛡️ ¿QUÉ DEBES HACER?\n"
                "1. Detén la comunicación mientras verificas la situación.\n"
                "2. No entregues contraseñas, códigos de autenticación, PIN, "
                "números completos de tarjeta ni claves bancarias.\n"
                "3. No utilices enlaces, números telefónicos o contactos "
                "proporcionados por el mensaje sospechoso.\n"
                "4. Contacta a la institución mediante un canal oficial "
                "independiente.\n"
                "5. Si proporcionaste credenciales, cambia las contraseñas "
                "desde el sitio o aplicación oficial.\n"
                "6. Si existe una transacción que no reconoces, comunícate "
                "inmediatamente con el banco o proveedor de pago.\n"
                "7. Conserva capturas, correos, números telefónicos, enlaces, "
                "comprobantes y cualquier otra evidencia.\n\n"

                "🚫 ¿QUÉ DEBES EVITAR?\n"
                "• Continuar la conversación con el posible estafador.\n"
                "• Compartir códigos recibidos por SMS o aplicaciones.\n"
                "• Instalar programas que un desconocido te indique.\n"
                "• Realizar pagos adicionales para supuestamente recuperar "
                "dinero perdido.\n\n"

                "📋 PROTECCIÓN DE DATOS\n"
                "La información personal y financiera puede utilizarse para "
                "suplantación de identidad, fraude o acceso a servicios. Por "
                "eso es importante limitar la información que compartes y "
                "verificar quién la solicita y con qué finalidad.\n\n"

                "🏛️ ORIENTACIÓN\n"
                "Si existen indicios de un posible delito o una pérdida "
                "económica, puedes buscar orientación ante el OIJ. Si se trata "
                "de un incidente de ciberseguridad, puede corresponder acudir "
                "a los canales oficiales de CSIRT-CR.\n\n"

                "Esta orientación es preventiva e informativa y no sustituye "
                "una denuncia ni asesoría legal."
            ),

            "B": (
                "⚠️ OFERTA, PREMIO O PROMOCIÓN SOSPECHOSA\n\n"
                "Una oferta inesperada no debe considerarse legítima únicamente "
                "porque utilice el nombre, logotipo o apariencia de una "
                "organización conocida.\n\n"

                "🔎 SEÑALES DE ALERTA\n"
                "• Promesas de dinero, premios o beneficios poco realistas.\n"
                "• Solicitud de pago para recibir un supuesto premio.\n"
                "• Petición de documentos o información bancaria sin una "
                "justificación clara.\n"
                "• Mensajes que generan presión para actuar inmediatamente.\n"
                "• Enlaces o direcciones que no corresponden claramente con "
                "la organización.\n"
                "• Solicitudes realizadas únicamente mediante redes sociales "
                "o mensajería informal.\n\n"

                "🛡️ ANTES DE CONTINUAR\n"
                "1. Verifica la existencia de la promoción en el sitio oficial.\n"
                "2. Busca los canales oficiales de la organización por tu cuenta.\n"
                "3. No utilices enlaces proporcionados por el mensaje para "
                "realizar la verificación.\n"
                "4. No envíes documentos de identidad, datos bancarios o "
                "credenciales hasta comprobar quién realiza la solicitud.\n"
                "5. Conserva evidencia si sospechas que puede tratarse de fraude.\n\n"

                "💡 APRENDIZAJE\n"
                "La apariencia profesional de un mensaje no demuestra su "
                "autenticidad. La mejor defensa es verificar la información "
                "por un canal independiente y oficial."
            ),

            "C": (
                "⚠️ PAGO O TRANSACCIÓN SOSPECHOSA\n\n"
                "Si realizaste un pago y posteriormente observaste una situación "
                "irregular, actúa con rapidez y evita continuar realizando "
                "operaciones hasta verificar lo ocurrido.\n\n"

                "🛡️ PASOS RECOMENDADOS\n"
                "1. Contacta al banco o proveedor de pago utilizando únicamente "
                "sus canales oficiales.\n"
                "2. Solicita orientación sobre la transacción.\n"
                "3. Si proporcionaste credenciales, cambia las contraseñas "
                "comprometidas.\n"
                "4. Activa autenticación de dos factores cuando esté disponible.\n"
                "5. Revisa movimientos recientes y actividades que no reconozcas.\n"
                "6. Conserva comprobantes, mensajes, capturas y datos de la "
                "transacción.\n"
                "7. Si existen indicios de un delito, considera buscar "
                "orientación ante el OIJ.\n\n"

                "🚫 IMPORTANTE\n"
                "No vuelvas a utilizar enlaces, números telefónicos o contactos "
                "que provengan del mensaje sospechoso.\n\n"

                "💡 PREVENCIÓN\n"
                "Antes de realizar pagos digitales, verifica la identidad del "
                "destinatario y evita realizar operaciones bajo presión o "
                "mediante instrucciones recibidas inesperadamente."
            ),
        },
    },

    "phishing": {
        "label": "Posible phishing",
        "question": (
            "🎣 Vamos a determinar qué ocurrió con el mensaje o enlace.\n\n"
            "¿Cuál de estas situaciones describe mejor tu caso?"
        ),
        "options": [
            "A) Recibí un correo o mensaje sospechoso.",
            "B) Hice clic en un enlace sospechoso.",
            "C) Ingresé información en un sitio que ahora considero falso.",
        ],
        "responses": {
            "A": (
                "🎣 POSIBLE PHISHING\n\n"
                "El phishing es una técnica de engaño utilizada para conseguir "
                "que una persona entregue información, abra un enlace, descargue "
                "un archivo o realice una acción que beneficie al atacante.\n\n"

                "Puede presentarse mediante:\n"
                "• Correos electrónicos.\n"
                "• Mensajes SMS o WhatsApp.\n"
                "• Redes sociales.\n"
                "• Llamadas telefónicas.\n"
                "• Páginas web falsas.\n\n"

                "🔎 SEÑALES DE ALERTA\n"
                "• Mensajes que exigen actuar inmediatamente.\n"
                "• Amenazas de bloqueo o suspensión.\n"
                "• Solicitudes de contraseñas o códigos.\n"
                "• Solicitudes de datos bancarios.\n"
                "• Enlaces inesperados.\n"
                "• Dominios que no coinciden con la organización.\n"
                "• Mensajes fuera de contexto.\n\n"

                "🛡️ ¿QUÉ HACER?\n"
                "1. No respondas al mensaje.\n"
                "2. No abras enlaces ni archivos sospechosos.\n"
                "3. Verifica la situación directamente con la organización.\n"
                "4. Escribe manualmente la dirección oficial o utiliza la "
                "aplicación oficial.\n"
                "5. Si el mensaje parece fraudulento, conserva evidencia "
                "antes de eliminarlo.\n\n"

                "💡 APRENDIZAJE\n"
                "Un mensaje puede parecer legítimo y aun así ser fraudulento. "
                "La apariencia, el logotipo o el nombre utilizado no son "
                "suficientes para comprobar su autenticidad."
            ),

            "B": (
                "🎣 HICISTE CLIC EN UN ENLACE SOSPECHOSO\n\n"
                "Hacer clic no significa automáticamente que tus datos hayan "
                "sido comprometidos, pero es importante actuar con precaución.\n\n"

                "🛡️ SI SOLO ABRISTE EL ENLACE\n"
                "• No introduzcas información adicional.\n"
                "• Cierra la página sospechosa.\n"
                "• No descargues archivos que la página solicite.\n"
                "• No instales programas recomendados por el sitio.\n"
                "• Mantén actualizado tu dispositivo y sus mecanismos de seguridad.\n\n"

                "🔐 SI ADEMÁS INTRODUJISTE UNA CONTRASEÑA\n"
                "Cambia inmediatamente esa contraseña desde el sitio oficial. "
                "Si utilizabas la misma contraseña en otros servicios, también "
                "debes cambiarla allí.\n\n"

                "🛡️ PROTECCIÓN ADICIONAL\n"
                "Activa autenticación de dos factores en las cuentas afectadas "
                "y revisa sesiones o dispositivos que no reconozcas.\n\n"

                "📋 EVIDENCIA\n"
                "Conserva la dirección del sitio, capturas, correo o mensaje "
                "original y cualquier otro elemento que permita documentar "
                "lo ocurrido.\n\n"

                "Si se trata de un incidente de ciberseguridad, puede corresponder "
                "buscar orientación mediante los canales oficiales de CSIRT-CR."
            ),

            "C": (
                "🚨 POSIBLE COMPROMISO DE CREDENCIALES O DATOS\n\n"
                "Si ingresaste información en un sitio que ahora consideras "
                "fraudulento, debes asumir una posición preventiva y proteger "
                "las cuentas o servicios relacionados.\n\n"

                "🔐 ACTÚA EN ESTE ORDEN\n"
                "1. Cambia la contraseña desde el sitio oficial.\n"
                "2. Si reutilizabas esa contraseña, cámbiala también en otros "
                "servicios.\n"
                "3. Activa autenticación de dos factores.\n"
                "4. Revisa sesiones, dispositivos y accesos recientes.\n"
                "5. Comprueba que el correo y teléfono de recuperación sigan "
                "siendo los tuyos.\n"
                "6. Si entregaste datos bancarios, contacta inmediatamente "
                "a la entidad financiera mediante un canal oficial.\n"
                "7. Conserva la evidencia del incidente.\n\n"

                "⚠️ NO COMPARTAS MÁS INFORMACIÓN\n"
                "Si después del incidente recibes llamadas o mensajes solicitando "
                "códigos para 'proteger' tu cuenta, verifica la identidad del "
                "solicitante mediante un canal oficial.\n\n"

                "🏛️ ORIENTACIÓN\n"
                "Para un posible delito puedes considerar acudir al OIJ. "
                "Para incidentes de ciberseguridad puede corresponder CSIRT-CR.\n\n"

                "Esta orientación es educativa y preventiva y no determina "
                "jurídicamente las circunstancias de un caso concreto."
            ),
        },
    },

    "acceso": {
        "label": "Acceso no autorizado a una cuenta",
        "question": (
            "🔐 Vamos a identificar la señal de acceso no autorizado.\n\n"
            "¿Qué observaste?"
        ),
        "options": [
            "A) Apareció un inicio de sesión que no reconozco.",
            "B) Cambiaron mi contraseña o configuración.",
            "C) Se enviaron mensajes desde mi cuenta sin mi autorización.",
        ],
        "responses": {
            "A": (
                "🔐 INICIO DE SESIÓN NO RECONOCIDO\n\n"
                "Un acceso desconocido puede indicar que alguien obtuvo "
                "credenciales o acceso a tu cuenta. No significa por sí solo "
                "que exista una intrusión confirmada, pero merece atención.\n\n"

                "🛡️ PASOS RECOMENDADOS\n"
                "1. Cambia la contraseña desde el sitio o aplicación oficial.\n"
                "2. Cierra sesiones abiertas que no reconozcas.\n"
                "3. Revisa los dispositivos conectados.\n"
                "4. Comprueba las aplicaciones de terceros con acceso a la cuenta.\n"
                "5. Revisa correo y teléfono utilizados para recuperación.\n"
                "6. Activa autenticación de dos factores.\n"
                "7. Comprueba si utilizabas esa contraseña en otros servicios.\n\n"

                "🚫 NUNCA COMPARTAS\n"
                "No compartas códigos de recuperación, códigos de autenticación "
                "ni contraseñas con personas que contacten contigo para ayudarte "
                "a 'recuperar' la cuenta.\n\n"

                "📋 CONSERVA EVIDENCIA\n"
                "Guarda capturas de los accesos desconocidos y de cualquier "
                "actividad que no hayas realizado."
            ),

            "B": (
                "🚨 CAMBIO NO AUTORIZADO DE CONTRASEÑA O CONFIGURACIÓN\n\n"
                "Si alguien cambió la contraseña, correo de recuperación u "
                "otra configuración de seguridad sin tu autorización, la "
                "prioridad es recuperar el control de la cuenta mediante "
                "los mecanismos oficiales.\n\n"

                "🔐 RECUPERACIÓN\n"
                "1. Utiliza el procedimiento oficial de recuperación de la cuenta.\n"
                "2. Establece una contraseña nueva y única.\n"
                "3. Activa autenticación de dos factores.\n"
                "4. Revisa correo y teléfono de recuperación.\n"
                "5. Cierra sesiones desconocidas.\n"
                "6. Revisa actividad reciente.\n"
                "7. Revisa aplicaciones y servicios conectados.\n\n"

                "⚠️ PREVENCIÓN\n"
                "Si la contraseña comprometida se utilizaba en otros servicios, "
                "cámbiala también en ellos.\n\n"

                "📋 EVIDENCIA\n"
                "Conserva notificaciones de cambios, correos de seguridad, "
                "capturas y registros que puedan ayudar a documentar el incidente."
            ),

            "C": (
                "🔐 ACTIVIDAD NO AUTORIZADA DESDE TU CUENTA\n\n"
                "Si desde tu cuenta se enviaron mensajes que tú no escribiste, "
                "puede existir un problema de acceso o de seguridad.\n\n"

                "🛡️ QUÉ HACER\n"
                "1. Cambia la contraseña desde el sitio oficial.\n"
                "2. Cierra todas las sesiones que no reconozcas.\n"
                "3. Activa 2FA.\n"
                "4. Revisa dispositivos conectados.\n"
                "5. Revisa aplicaciones autorizadas.\n"
                "6. Comprueba la configuración de recuperación.\n\n"

                "📢 PROTEGE A TUS CONTACTOS\n"
                "Si desde tu cuenta se enviaron mensajes sospechosos, informa "
                "a tus contactos por otro medio para evitar que confíen en "
                "esos mensajes o enlaces.\n\n"

                "🏛️ SI EXISTE UN POSIBLE DELITO\n"
                "Conserva la evidencia y considera buscar orientación ante "
                "el OIJ.\n\n"

                "💡 APRENDIZAJE\n"
                "Una cuenta comprometida puede utilizarse para engañar a "
                "otras personas. Por eso recuperar el control y avisar "
                "a los contactos puede ayudar a limitar el impacto."
            ),
        },
    },

    "datos": {
        "label": "Uso indebido de mis datos",
        "question": (
            "📋 Vamos a identificar qué necesitas respecto al tratamiento "
            "de tus datos personales.\n\n"
            "¿Qué situación describe mejor tu caso?"
        ),
        "options": [
            "A) Una organización tiene datos míos y quiero saber para qué los usa.",
            "B) Mis datos son incorrectos o están desactualizados.",
            "C) Creo que mis datos fueron utilizados de forma indebida.",
        ],
        "responses": {
            "A": (
                "📋 CONOCER EL USO DE TUS DATOS\n\n"
                "Cuando una organización trata información personal, es "
                "importante conocer qué información mantiene y cómo se "
                "relaciona con el tratamiento realizado, según corresponda "
                "a la situación.\n\n"

                "⚖️ DESDE LA PROTECCIÓN DE DATOS\n"
                "La Ley N.º 8968 constituye el marco costarricense de referencia "
                "para la protección de las personas frente al tratamiento de "
                "sus datos personales.\n\n"

                "📝 ¿QUÉ PUEDES HACER?\n"
                "1. Identifica qué organización mantiene la información.\n"
                "2. Determina qué información deseas consultar.\n"
                "3. Realiza la solicitud por un medio que deje constancia.\n"
                "4. Conserva la solicitud y la respuesta recibida.\n\n"

                "💡 APRENDIZAJE\n"
                "Proteger los datos personales no significa únicamente evitar "
                "que sean robados. También implica conocer quién los trata, "
                "para qué finalidad y qué derechos puedes ejercer cuando "
                "corresponda.\n\n"

                "Esta información es general y educativa."
            ),

            "B": (
                "✏️ DATOS INCORRECTOS O INCOMPLETOS\n\n"
                "Si una organización mantiene información personal incorrecta "
                "o incompleta, puedes solicitar su rectificación cuando "
                "corresponda.\n\n"

                "📝 PASOS RECOMENDADOS\n"
                "1. Identifica exactamente cuál dato es incorrecto.\n"
                "2. Determina cuál debería ser la información correcta.\n"
                "3. Solicita la corrección mediante un medio que deje constancia.\n"
                "4. Conserva documentos que respalden la corrección cuando "
                "sea necesario.\n"
                "5. Guarda la respuesta de la organización.\n\n"

                "⚖️ DERECHO DE RECTIFICACIÓN\n"
                "La Ley N.º 8968 contempla el derecho de rectificación dentro "
                "de la protección de los datos personales.\n\n"

                "💡 APRENDIZAJE\n"
                "Mantener información personal correcta es importante porque "
                "los datos inexactos pueden producir decisiones o comunicaciones "
                "incorrectas."
            ),

            "C": (
                "⚠️ POSIBLE USO INDEBIDO DE DATOS PERSONALES\n\n"
                "Si consideras que una organización está utilizando tus datos "
                "de una manera que no corresponde, conviene documentar la "
                "situación antes de tomar otras medidas.\n\n"

                "📋 DOCUMENTA\n"
                "• Qué información fue utilizada.\n"
                "• Quién parece estar utilizándola.\n"
                "• Cuándo ocurrió.\n"
                "• Para qué finalidad aparenta utilizarse.\n"
                "• Qué comunicaciones recibiste.\n"
                "• Qué respuesta proporcionó la organización, si existe.\n\n"

                "⚖️ POSIBLES DERECHOS\n"
                "Dependiendo de las circunstancias, puede ser relevante "
                "informarte sobre derechos como acceso, rectificación, "
                "supresión u oposición.\n\n"

                "🏛️ ORIENTACIÓN\n"
                "Para situaciones relacionadas con el tratamiento de datos "
                "personales puedes buscar información y orientación ante "
                "PRODHAB.\n\n"

                "🚫 IMPORTANTE\n"
                "No publiques información adicional sobre tu caso si esto "
                "puede aumentar la exposición de tus datos.\n\n"

                "Esta información es general y no constituye asesoría legal."
            ),
        },
    },

    "identidad": {
        "label": "Robo de identidad",
        "question": (
            "👤 Vamos a identificar qué tipo de situación relacionada "
            "con identidad se presenta.\n\n"
            "¿Qué ocurrió?"
        ),
        "options": [
            "A) Alguien está utilizando mi identidad o mis datos.",
            "B) Apareció una cuenta o trámite que no reconozco.",
            "C) Entregué información personal y temo que sea utilizada indebidamente.",
        ],
        "responses": {
            "A": (
                "👤 POSIBLE ROBO DE IDENTIDAD\n\n"
                "El robo o uso indebido de identidad puede ocurrir cuando "
                "información personal se utiliza para hacerse pasar por otra "
                "persona o realizar actividades sin su autorización.\n\n"

                "🚨 ACTÚA CON PRIORIDAD\n"
                "1. Identifica las cuentas o servicios afectados.\n"
                "2. Cambia las credenciales comprometidas.\n"
                "3. Activa autenticación de dos factores.\n"
                "4. Contacta a las instituciones involucradas mediante "
                "canales oficiales.\n"
                "5. Revisa movimientos, solicitudes o actividades que "
                "no reconozcas.\n"
                "6. Conserva documentos, mensajes, capturas y comprobantes.\n\n"

                "📋 PROTECCIÓN DE DATOS\n"
                "La exposición innecesaria de información personal puede "
                "facilitar intentos de suplantación, fraude o acceso "
                "no autorizado.\n\n"

                "🏛️ ORIENTACIÓN\n"
                "Cuando existan indicios de un posible delito, considera "
                "buscar orientación ante el OIJ.\n\n"

                "💡 PREVENCIÓN\n"
                "Limita la publicación de información personal y verifica "
                "quién solicita tus datos antes de compartirlos."
            ),

            "B": (
                "🚨 CUENTA O TRÁMITE QUE NO RECONOCES\n\n"
                "Una cuenta, solicitud, trámite o actividad que no reconoces "
                "debe revisarse directamente con la institución correspondiente.\n\n"

                "🛡️ QUÉ HACER\n"
                "1. No contactes a la persona mediante el canal sospechoso.\n"
                "2. Utiliza el sitio o teléfono oficial de la institución.\n"
                "3. Solicita información sobre la actividad que no reconoces.\n"
                "4. Revisa si existen otras actividades similares.\n"
                "5. Cambia las credenciales de las cuentas relacionadas.\n"
                "6. Activa 2FA cuando esté disponible.\n"
                "7. Conserva toda la evidencia.\n\n"

                "🏛️ SI PUEDE SER UN DELITO\n"
                "La suplantación o utilización no autorizada de información "
                "puede requerir orientación de las autoridades competentes, "
                "por lo que puedes considerar acudir al OIJ.\n\n"

                "No compartas información adicional hasta verificar "
                "la situación."
            ),

            "C": (
                "🛡️ ENTREGASTE INFORMACIÓN PERSONAL Y TIENES DUDAS\n\n"
                "Si proporcionaste información personal y ahora sospechas "
                "que pudo ser utilizada indebidamente, lo primero es "
                "determinar qué información entregaste y a quién.\n\n"

                "🔎 REVISA\n"
                "• ¿Quién recibió la información?\n"
                "• ¿Por qué la solicitó?\n"
                "• ¿Qué información proporcionaste?\n"
                "• ¿Entregaste credenciales o códigos?\n"
                "• ¿El sitio o persona estaba verificado?\n\n"

                "🔐 SI ENTREGASTE CREDENCIALES\n"
                "Cambia inmediatamente las contraseñas desde los sitios "
                "oficiales y activa 2FA.\n\n"

                "💳 SI ENTREGASTE INFORMACIÓN BANCARIA\n"
                "Contacta al banco mediante un canal oficial y solicita "
                "orientación sobre las medidas necesarias.\n\n"

                "📋 SI SE TRATA DE DATOS PERSONALES\n"
                "Puedes informarte sobre tus derechos relacionados con "
                "el tratamiento de datos personales y consultar la "
                "orientación disponible ante PRODHAB.\n\n"

                "💡 APRENDIZAJE\n"
                "Antes de entregar información personal, verifica quién "
                "la solicita, cuál es la finalidad y si realmente "
                "es necesaria."
            ),
        },
    },
}

# ============================================================
# EDUCACIÓN
# ============================================================

EDUCATION_TOPICS = {

    "phishing": {
        "label": "🎣 Phishing",
        "title": "¿QUÉ ES EL PHISHING?",
        "content": (
            "🎣 PHISHING\n\n"

            "El phishing es una técnica de engaño utilizada para conseguir "
            "que una persona entregue información, abra un enlace, descargue "
            "un archivo o realice una acción que favorezca al atacante.\n\n"

            "Puede aparecer mediante correos electrónicos, mensajes de texto, "
            "WhatsApp, redes sociales, llamadas telefónicas o páginas web falsas.\n\n"

            "🔎 ¿CÓMO FUNCIONA?\n"
            "Normalmente el atacante intenta hacerse pasar por una persona, "
            "empresa o institución conocida. El mensaje puede indicar que existe "
            "un problema urgente con una cuenta, un pago, una entrega, un premio "
            "o cualquier otra situación que provoque una reacción rápida.\n\n"

            "🚨 SEÑALES DE ALERTA\n"
            "• Solicitudes inesperadas de información personal.\n"
            "• Peticiones de contraseñas, códigos o datos bancarios.\n"
            "• Mensajes que utilizan urgencia, amenazas o presión.\n"
            "• Enlaces que no corresponden claramente con el sitio oficial.\n"
            "• Archivos adjuntos inesperados.\n"
            "• Premios u ofertas difíciles de verificar.\n"
            "• Remitentes o dominios sospechosos.\n\n"

            "📋 ¿QUÉ INFORMACIÓN PUEDEN BUSCAR?\n"
            "Un atacante puede intentar obtener contraseñas, códigos de "
            "autenticación, información bancaria, documentos de identidad, "
            "datos de contacto u otra información que pueda utilizarse para "
            "fraude, suplantación o acceso no autorizado.\n\n"

            "🛡️ ¿CÓMO PREVENIRLO?\n"
            "1. No respondas mensajes sospechosos.\n"
            "2. No abras enlaces inesperados.\n"
            "3. No descargues archivos de remitentes desconocidos.\n"
            "4. Verifica la dirección del sitio antes de introducir información.\n"
            "5. Accede directamente al sitio oficial de la organización.\n"
            "6. Activa autenticación de dos factores.\n"
            "7. Mantén actualizado tu dispositivo y navegador.\n\n"

            "💡 EJEMPLO\n"
            "Un mensaje indica: 'Tu cuenta bancaria será suspendida hoy. "
            "Ingresa inmediatamente al siguiente enlace'. La urgencia y la "
            "solicitud de utilizar un enlace son señales que deben generar "
            "precaución.\n\n"

            "📚 APRENDIZAJE\n"
            "La apariencia profesional de un mensaje no demuestra que sea "
            "legítimo. Una de las mejores medidas preventivas es verificar "
            "la información utilizando un canal oficial independiente."
        ),
    },

    "passwords": {
        "label": "🔐 Contraseñas seguras",
        "title": "¿CÓMO PROTEGER TUS CONTRASEÑAS?",
        "content": (
            "🔐 CONTRASEÑAS SEGURAS\n\n"

            "Las contraseñas constituyen una de las principales barreras "
            "para proteger cuentas y servicios digitales. Una contraseña "
            "comprometida puede facilitar el acceso no autorizado a información "
            "personal.\n\n"

            "⚠️ ¿POR QUÉ ES PELIGROSO REUTILIZARLAS?\n"
            "Si utilizas la misma contraseña en diferentes servicios y una de "
            "esas plataformas sufre una exposición de credenciales, un atacante "
            "puede intentar utilizar esa misma combinación en otras cuentas.\n\n"

            "🛡️ BUENAS PRÁCTICAS\n"
            "• Utiliza una contraseña diferente para cada cuenta importante.\n"
            "• Prefiere contraseñas largas y difíciles de adivinar.\n"
            "• Evita información obvia como nombres, fechas o datos públicos.\n"
            "• No compartas contraseñas con otras personas.\n"
            "• No almacenes contraseñas de forma insegura.\n"
            "• Considera utilizar un gestor de contraseñas.\n"
            "• Activa autenticación de dos factores.\n\n"

            "🚨 ¿CUÁNDO CAMBIAR UNA CONTRASEÑA?\n"
            "Debes actuar especialmente cuando sospeches que una contraseña "
            "fue expuesta, cuando recibas una alerta de seguridad o cuando "
            "detectes actividad no autorizada.\n\n"

            "📋 RELACIÓN CON LOS DATOS PERSONALES\n"
            "Las cuentas digitales pueden almacenar información personal, "
            "fotografías, comunicaciones, documentos, información financiera "
            "u otros datos. Proteger las credenciales ayuda a reducir el riesgo "
            "de acceso no autorizado a esa información.\n\n"

            "💡 RECUERDA\n"
            "Una contraseña segura es importante, pero no debe ser la única "
            "medida de seguridad. Siempre que sea posible, utiliza autenticación "
            "multifactor."
        ),
    },

    "2fa": {
        "label": "🛡️ Autenticación de dos factores",
        "title": "¿QUÉ ES LA AUTENTICACIÓN DE DOS FACTORES?",
        "content": (
            "🛡️ AUTENTICACIÓN DE DOS FACTORES (2FA)\n\n"

            "La autenticación de dos factores agrega una segunda comprobación "
            "de identidad además de la contraseña.\n\n"

            "Esto significa que conocer la contraseña por sí sola no debería "
            "ser suficiente para completar el acceso cuando el segundo factor "
            "está correctamente configurado.\n\n"

            "🔐 ¿POR QUÉ ES IMPORTANTE?\n"
            "Si una contraseña es obtenida mediante phishing, filtraciones "
            "u otros métodos, una segunda medida de autenticación puede "
            "reducir el riesgo de que esa contraseña comprometida sea suficiente "
            "para acceder a la cuenta.\n\n"

            "📱 EJEMPLOS\n"
            "• Código generado por una aplicación de autenticación.\n"
            "• Código enviado por un mecanismo de verificación.\n"
            "• Llave de seguridad.\n"
            "• Otros mecanismos de autenticación compatibles con el servicio.\n\n"

            "🛡️ ¿DÓNDE CONVIENE ACTIVARLA?\n"
            "Prioriza cuentas que contengan información personal o que permitan "
            "recuperar otras cuentas, especialmente correo electrónico, banca "
            "y servicios importantes.\n\n"

            "🚨 IMPORTANTE\n"
            "Nunca compartas códigos de autenticación con otra persona. "
            "Si alguien te solicita un código que acabas de recibir para "
            "'verificar' o 'proteger' tu cuenta, verifica la situación mediante "
            "el canal oficial del servicio.\n\n"

            "💡 APRENDIZAJE\n"
            "La autenticación multifactor no elimina todos los riesgos, pero "
            "añade una capa adicional de protección y forma parte de una "
            "estrategia de seguridad más completa."
        ),
    },

    "identity": {
        "label": "👤 Robo de identidad",
        "title": "¿QUÉ ES EL ROBO DE IDENTIDAD?",
        "content": (
            "👤 ROBO DE IDENTIDAD\n\n"

            "El robo de identidad se relaciona con la utilización de información "
            "de una persona para hacerse pasar por ella o realizar actividades "
            "sin su autorización.\n\n"

            "📋 ¿QUÉ INFORMACIÓN PUEDE SER UTILIZADA?\n"
            "Puede involucrar datos personales, credenciales, documentos, "
            "información de contacto u otros elementos que permitan identificar "
            "a una persona o acceder a sus servicios.\n\n"

            "⚠️ ¿CÓMO PUEDE OCURRIR?\n"
            "• Phishing.\n"
            "• Contraseñas comprometidas.\n"
            "• Exposición excesiva de información en redes sociales.\n"
            "• Documentos compartidos sin las debidas precauciones.\n"
            "• Acceso no autorizado a cuentas.\n"
            "• Fraudes e ingeniería social.\n\n"

            "🚨 SEÑALES DE ALERTA\n"
            "• Cuentas que no reconoces.\n"
            "• Solicitudes o trámites que nunca realizaste.\n"
            "• Mensajes sobre actividades que no reconoces.\n"
            "• Cambios no autorizados en cuentas.\n"
            "• Transacciones que no identificas.\n\n"

            "🛡️ PREVENCIÓN\n"
            "• Limita la información personal que publicas.\n"
            "• No compartas documentos sin verificar el destinatario.\n"
            "• Utiliza contraseñas únicas.\n"
            "• Activa 2FA.\n"
            "• Revisa periódicamente tus cuentas.\n"
            "• Verifica solicitudes de información antes de responder.\n\n"

            "📚 APRENDIZAJE\n"
            "La protección de la identidad digital comienza antes de que ocurra "
            "un incidente. Cada dato publicado o compartido puede aumentar "
            "la información disponible para un atacante."
        ),
    },

    "malware": {
        "label": "🦠 Malware",
        "title": "¿QUÉ ES EL MALWARE?",
        "content": (
            "🦠 MALWARE\n\n"

            "Malware es un término general utilizado para referirse a programas "
            "o códigos diseñados para realizar acciones perjudiciales o no "
            "autorizadas en un dispositivo.\n\n"

            "Puede presentarse en diferentes formas y utilizar distintos "
            "métodos para afectar un equipo o acceder a información.\n\n"

            "📥 ¿CÓMO PUEDE LLEGAR?\n"
            "• Archivos adjuntos maliciosos.\n"
            "• Aplicaciones de fuentes no confiables.\n"
            "• Enlaces fraudulentos.\n"
            "• Sitios web comprometidos o maliciosos.\n"
            "• Programas descargados ilegalmente o modificados.\n"
            "• Dispositivos o archivos de origen desconocido.\n\n"

            "⚠️ POSIBLES CONSECUENCIAS\n"
            "Dependiendo del tipo de malware, puede producir pérdida de "
            "información, acceso no autorizado, alteración de archivos, "
            "espionaje, interrupción de servicios u otras consecuencias.\n\n"

            "🛡️ PREVENCIÓN\n"
            "• Descarga aplicaciones desde fuentes confiables.\n"
            "• Mantén actualizado el sistema operativo.\n"
            "• Mantén actualizadas las aplicaciones.\n"
            "• Evita abrir archivos inesperados.\n"
            "• No instales programas provenientes de fuentes desconocidas.\n"
            "• Revisa los permisos solicitados por las aplicaciones.\n"
            "• Realiza respaldos periódicos de información importante.\n\n"

            "💡 APRENDIZAJE\n"
            "La seguridad no depende únicamente de tener un programa de "
            "protección instalado. Las decisiones del usuario sobre qué "
            "descargar, abrir o instalar también forman parte de la prevención."
        ),
    },

    "privacy": {
        "label": "📱 Privacidad en redes sociales",
        "title": "¿CÓMO PROTEGER TU PRIVACIDAD EN REDES SOCIALES?",
        "content": (
            "📱 PRIVACIDAD EN REDES SOCIALES\n\n"

            "Las redes sociales permiten compartir información rápidamente, "
            "pero una publicación puede revelar datos que, combinados con "
            "otra información disponible en Internet, permiten conocer "
            "hábitos, relaciones, ubicaciones o actividades.\n\n"

            "📋 INFORMACIÓN QUE DEBES PROTEGER\n"
            "• Documentos de identidad.\n"
            "• Dirección de residencia.\n"
            "• Números telefónicos personales.\n"
            "• Información financiera.\n"
            "• Ubicación precisa en tiempo real.\n"
            "• Itinerarios y viajes.\n"
            "• Información sobre familiares.\n"
            "• Fotografías de documentos.\n\n"

            "⚠️ ¿POR QUÉ IMPORTA?\n"
            "La información publicada puede ser utilizada para construir "
            "perfiles, realizar ingeniería social, intentar suplantaciones "
            "o preparar ataques más personalizados.\n\n"

            "🛡️ BUENAS PRÁCTICAS\n"
            "• Revisa periódicamente la configuración de privacidad.\n"
            "• Limita quién puede ver tus publicaciones.\n"
            "• Revisa tus seguidores y contactos.\n"
            "• Revisa aplicaciones conectadas a tus perfiles.\n"
            "• Evita publicar documentos completos.\n"
            "• Evita compartir ubicaciones en tiempo real innecesariamente.\n"
            "• Piensa antes de publicar información que podría permanecer "
            "disponible durante mucho tiempo.\n\n"

            "💡 REGLA PRÁCTICA\n"
            "Antes de publicar, pregúntate: ¿Necesito compartir esta información? "
            "¿Quién podrá verla? ¿Podría utilizarse para identificarme, "
            "localizarme o engañarme?"
        ),
    },

    "internet": {
        "label": "🌐 Seguridad en Internet",
        "title": "BUENAS PRÁCTICAS DE NAVEGACIÓN",
        "content": (
            "🌐 SEGURIDAD EN INTERNET\n\n"

            "Navegar de forma segura implica evaluar los sitios, enlaces, "
            "descargas y solicitudes de información antes de interactuar "
            "con ellos.\n\n"

            "🔎 ANTES DE INTRODUCIR DATOS\n"
            "• Comprueba el dominio del sitio.\n"
            "• Verifica que estás utilizando el servicio esperado.\n"
            "• No confíes únicamente en logotipos o apariencia visual.\n"
            "• Evita utilizar enlaces inesperados para iniciar sesión.\n"
            "• Comprueba que la solicitud de información tenga sentido.\n\n"

            "📥 DESCARGAS\n"
            "Descarga programas y aplicaciones desde fuentes confiables. "
            "Evita archivos inesperados y programas que prometen beneficios "
            "poco realistas o solicitan permisos excesivos.\n\n"

            "📶 REDES PÚBLICAS\n"
            "Evita realizar operaciones altamente sensibles desde redes "
            "públicas no confiables. Cuando sea necesario utilizar una red "
            "pública, presta especial atención a los servicios a los que "
            "accedes y a la información que compartes.\n\n"

            "🔄 ACTUALIZACIONES\n"
            "Mantén actualizado el sistema operativo, navegador y aplicaciones. "
            "Las actualizaciones pueden incluir correcciones de seguridad.\n\n"

            "💡 APRENDIZAJE\n"
            "La seguridad en Internet no depende de una única herramienta. "
            "Es el resultado de combinar decisiones seguras, actualizaciones, "
            "autenticación y protección de la información personal."
        ),
    },

    "personal_data": {
        "label": "📋 Datos personales",
        "title": "¿QUÉ SON LOS DATOS PERSONALES?",
        "content": (
            "📋 DATOS PERSONALES\n\n"

            "Los datos personales son información relacionada con una persona "
            "identificada o identificable.\n\n"

            "🧾 EJEMPLOS\n"
            "• Nombre.\n"
            "• Número de identificación.\n"
            "• Dirección.\n"
            "• Teléfono.\n"
            "• Correo electrónico.\n"
            "• Información relacionada con cuentas o servicios.\n"
            "• Fotografías y otros elementos que puedan identificar a una persona.\n\n"

            "🔐 DATOS QUE REQUIEREN ESPECIAL ATENCIÓN\n"
            "Algunos tipos de información pueden generar riesgos particulares "
            "si se exponen o utilizan de forma indebida. Entre ellos pueden "
            "encontrarse información financiera, datos de salud, documentos "
            "de identidad y otros datos cuya exposición pueda producir "
            "consecuencias relevantes para la persona.\n\n"

            "⚠️ ¿POR QUÉ IMPORTAN?\n"
            "Los datos personales aparecen constantemente en actividades "
            "cotidianas: redes sociales, compras, aplicaciones, formularios, "
            "servicios digitales y comunicaciones.\n\n"

            "🛡️ ANTES DE COMPARTIRLOS\n"
            "Pregúntate:\n"
            "1. ¿Quién solicita la información?\n"
            "2. ¿Para qué la necesita?\n"
            "3. ¿Realmente es necesaria?\n"
            "4. ¿Por qué medio la estoy proporcionando?\n"
            "5. ¿Qué medidas existen para protegerla?\n\n"

            "⚖️ RELACIÓN CON LA PRIVACIDAD\n"
            "Proteger los datos personales implica reducir su exposición "
            "innecesaria y prestar atención a cómo son recopilados, utilizados, "
            "almacenados y compartidos.\n\n"

            "💡 APRENDIZAJE\n"
            "La protección de datos no comienza cuando ocurre un robo. "
            "Comienza en el momento en que decides qué información compartir, "
            "con quién y para qué finalidad."
        ),
    },

    "law": {
        "label": "⚖️ Ley N.º 8968",
        "title": "LEY N.º 8968",
        "content": (
            "⚖️ LEY N.º 8968\n\n"

            "La Ley N.º 8968, Ley de Protección de la Persona frente al "
            "tratamiento de sus datos personales, constituye el marco "
            "costarricense de referencia para la protección de las personas "
            "frente al tratamiento de sus datos personales.\n\n"

            "📋 ¿QUÉ BUSCA PROTEGER?\n"
            "La normativa se relaciona con la protección de la persona y "
            "el control sobre el tratamiento de su información personal.\n\n"

            "👤 DERECHOS RELACIONADOS\n"
            "Dentro del marco de protección de datos se contemplan derechos "
            "relacionados con el acceso, rectificación, supresión o cancelación "
            "y oposición, de acuerdo con las condiciones aplicables.\n\n"

            "🔎 ¿POR QUÉ ES IMPORTANTE?\n"
            "En la vida cotidiana las personas entregan información personal "
            "a organizaciones, plataformas y servicios. Conocer los principios "
            "y derechos relacionados con su tratamiento permite tomar decisiones "
            "más informadas sobre la privacidad.\n\n"

            "🏛️ PRODHAB\n"
            "La Agencia de Protección de Datos de los Habitantes (PRODHAB) "
            "es la autoridad costarricense relacionada con la protección "
            "de los datos personales y la supervisión del cumplimiento "
            "de la normativa correspondiente.\n\n"

            "💡 EJEMPLO\n"
            "Si una organización mantiene información personal sobre una "
            "persona, pueden existir mecanismos para ejercer derechos sobre "
            "esa información cuando se cumplan las condiciones correspondientes.\n\n"

            "⚠️ IMPORTANTE\n"
            "El chatbot proporciona información general y educativa. "
            "No determina jurídicamente si una situación concreta constituye "
            "una infracción ni sustituye asesoría legal o los procedimientos "
            "oficiales de las instituciones competentes."
        ),
    },

}

EDUCATION_OPTIONS = [item["label"] for item in EDUCATION_TOPICS.values()]


# ============================================================
# SIMULACIONES EDUCATIVAS
# ============================================================

SIMULATIONS = {

    "banco": {
        "label": "Correo sospechoso de un banco",
        "question": (
            "🎓 SIMULACIÓN: CORREO BANCARIO\n\n"
            "Recibes un correo aparentemente enviado por tu banco. "
            "El mensaje indica:\n\n"
            "\"Su cuenta será suspendida hoy debido a una actividad "
            "inusual. Para evitar el bloqueo, confirme sus datos "
            "inmediatamente haciendo clic en el siguiente enlace\".\n\n"
            "El mensaje contiene el logotipo del banco y solicita que "
            "ingreses tu usuario, contraseña y un código de seguridad.\n\n"
            "¿Qué decisión tomarías?"
        ),
        "options": [
            "A) Abro el enlace e ingreso los datos solicitados.",
            "B) Ignoro el enlace y verifico la situación mediante el sitio o aplicación oficial del banco.",
            "C) Respondo el correo para confirmar si realmente fue enviado por el banco.",
        ],
        "feedback": {
            "A": (
                "❌ DECISIÓN DE ALTO RIESGO\n\n"
                "Ingresar credenciales y códigos mediante un enlace recibido "
                "inesperadamente puede permitir que un atacante capture "
                "información de acceso.\n\n"

                "🔎 ¿QUÉ SEÑALES APARECEN EN EL ESCENARIO?\n"
                "• Existe una situación de urgencia.\n"
                "• Se amenaza con suspender la cuenta.\n"
                "• Se solicita información confidencial.\n"
                "• Se proporciona un enlace para realizar la acción.\n"
                "• Se solicita incluso un código de seguridad.\n\n"

                "🎣 ESTO PUEDE CORRESPONDER A PHISHING\n"
                "El hecho de que el correo utilice el logotipo o apariencia "
                "de una institución no demuestra que sea auténtico.\n\n"

                "🛡️ ¿QUÉ DEBISTE HACER?\n"
                "Debiste ingresar directamente al sitio oficial o utilizar "
                "la aplicación oficial del banco para comprobar si existe "
                "algún problema con la cuenta.\n\n"

                "📚 APRENDIZAJE\n"
                "Nunca debes entregar contraseñas o códigos de autenticación "
                "a través de enlaces recibidos inesperadamente. La urgencia "
                "es una de las técnicas utilizadas para provocar decisiones "
                "impulsivas."
            ),

            "B": (
                "✅ EXCELENTE DECISIÓN\n\n"
                "Evitar el enlace y verificar la situación mediante un canal "
                "oficial independiente es la alternativa más segura.\n\n"

                "🔎 ¿POR QUÉ?\n"
                "El mensaje intenta provocar una reacción rápida mediante "
                "una supuesta suspensión de la cuenta. En lugar de seguir "
                "las instrucciones del mensaje, verificas directamente "
                "con la institución.\n\n"

                "🛡️ BUENA PRÁCTICA\n"
                "• Escribe manualmente la dirección oficial.\n"
                "• Utiliza la aplicación oficial.\n"
                "• No compartas contraseñas ni códigos.\n"
                "• Verifica cualquier alerta desde el canal oficial.\n\n"

                "📋 PROTECCIÓN DE DATOS\n"
                "Tus credenciales permiten acceder a información personal "
                "y, en algunos servicios, financiera. Protegerlas también "
                "forma parte de proteger tus datos personales.\n\n"

                "📚 APRENDIZAJE\n"
                "Ante un mensaje sospechoso, no debes preguntarte únicamente "
                "si 'parece real'. Debes verificarlo utilizando un canal "
                "independiente y confiable."
            ),

            "C": (
                "⚠️ NO ES LA MEJOR OPCIÓN\n\n"
                "Responder al correo no permite confirmar que el remitente "
                "sea realmente el banco. Si el mensaje es fraudulento, "
                "estarías continuando la comunicación con el posible atacante.\n\n"

                "🔎 ¿QUÉ DEBES RECORDAR?\n"
                "Un remitente puede ser falsificado o una cuenta puede haber "
                "sido comprometida. Por eso no debes utilizar el mismo canal "
                "sospechoso para verificar la información.\n\n"

                "🛡️ ALTERNATIVA SEGURA\n"
                "Utiliza directamente el sitio oficial, la aplicación oficial "
                "o un número de contacto obtenido de una fuente confiable.\n\n"

                "📚 APRENDIZAJE\n"
                "La verificación debe hacerse por un canal independiente, "
                "no mediante el mismo mensaje que genera la sospecha."
            ),
        },
    },

    "viaje": {
        "label": "Datos personales en redes sociales",
        "question": (
            "🎓 SIMULACIÓN: PRIVACIDAD EN REDES SOCIALES\n\n"
            "Una persona publica una fotografía de sus boletos de avión "
            "antes de realizar un viaje.\n\n"
            "En la fotografía pueden observarse su nombre completo, "
            "número de documento, código de reserva, fecha del vuelo "
            "y nombre del hotel donde se hospedará.\n\n"
            "¿Cuál es la decisión más segura?"
        ),
        "options": [
            "A) Publicar la fotografía porque únicamente sus amigos pueden verla.",
            "B) Evitar publicar el documento y ocultar información personal e identificadores.",
            "C) Publicarla porque los datos de un boleto no representan información importante.",
        ],
        "feedback": {
            "A": (
                "⚠️ DECISIÓN DE RIESGO\n\n"
                "Aunque el perfil tenga restricciones de privacidad, publicar "
                "documentos o información detallada puede aumentar la exposición "
                "de datos personales.\n\n"

                "Además, las publicaciones pueden ser capturadas, reenviadas "
                "o visualizadas por personas que no esperabas.\n\n"

                "📋 ¿QUÉ INFORMACIÓN ESTÁ EXPUESTA?\n"
                "• Identidad.\n"
                "• Información del viaje.\n"
                "• Fechas y horarios.\n"
                "• Código de reserva.\n"
                "• Lugar de alojamiento.\n\n"

                "🛡️ BUENA PRÁCTICA\n"
                "Evita publicar documentos completos. Si deseas compartir "
                "una experiencia, elimina u oculta los identificadores y "
                "otra información innecesaria.\n\n"

                "📚 APRENDIZAJE\n"
                "Configurar un perfil como privado reduce la exposición, "
                "pero no elimina el riesgo. La privacidad también depende "
                "del tipo de información que decides publicar."
            ),

            "B": (
                "✅ CORRECTO\n\n"
                "Evitar la publicación de documentos e identificadores "
                "reduce la cantidad de información personal disponible.\n\n"

                "🔎 ¿POR QUÉ?\n"
                "Los datos de un boleto pueden revelar información sobre "
                "la identidad, desplazamientos y planes de una persona.\n\n"

                "🛡️ BUENA PRÁCTICA\n"
                "Si quieres publicar una fotografía del viaje, evita mostrar "
                "números de documento, códigos de reserva, datos de contacto, "
                "itinerarios completos o información que permita identificar "
                "servicios utilizados.\n\n"

                "📚 APRENDIZAJE\n"
                "Antes de publicar debes preguntarte qué información contiene "
                "la imagen y si realmente es necesario hacerla pública."
            ),

            "C": (
                "❌ INCORRECTO\n\n"
                "Los boletos y documentos pueden contener información que "
                "permita identificar a una persona o conocer detalles de "
                "sus actividades.\n\n"

                "📋 PROTECCIÓN DE DATOS\n"
                "La protección de datos personales también implica reducir "
                "la exposición innecesaria de información.\n\n"

                "🛡️ RECUERDA\n"
                "No debes evaluar únicamente si el dato parece importante. "
                "También debes considerar qué puede descubrir otra persona "
                "al combinarlo con información disponible en otros lugares.\n\n"

                "📚 APRENDIZAJE\n"
                "La combinación de varios datos aparentemente pequeños "
                "puede generar un perfil mucho más completo de una persona."
            ),
        },
    },

    "app": {
        "label": "Descarga de una aplicación",
        "question": (
            "🎓 SIMULACIÓN: APLICACIÓN MÓVIL\n\n"
            "Encuentras una aplicación gratuita de edición de fotografías "
            "fuera de una tienda oficial.\n\n"
            "Antes de instalarla observas que solicita acceso a:\n"
            "• Contactos.\n"
            "• Ubicación.\n"
            "• Micrófono.\n"
            "• Cámara.\n"
            "• Galería de fotografías.\n\n"
            "La aplicación no explica claramente por qué necesita todos "
            "esos permisos.\n\n"
            "¿Qué haces?"
        ),
        "options": [
            "A) La instalo porque es gratuita y esos permisos son normales.",
            "B) No la instalo hasta verificar la fuente, reputación y necesidad de los permisos.",
            "C) La instalo y acepto todos los permisos para comprobar cómo funciona.",
        ],
        "feedback": {
            "A": (
                "❌ DECISIÓN DE ALTO RIESGO\n\n"
                "El hecho de que una aplicación sea gratuita no significa "
                "que sea segura ni que todos los permisos solicitados sean "
                "necesarios.\n\n"

                "🚨 SEÑALES DE ALERTA\n"
                "• Fuente no oficial.\n"
                "• Múltiples permisos.\n"
                "• Falta de explicación clara sobre su finalidad.\n\n"

                "📋 DATOS QUE PODRÍAN EXPONERSE\n"
                "Los permisos pueden permitir acceso a información personal, "
                "fotografías, ubicación, contactos u otros recursos del dispositivo.\n\n"

                "🛡️ BUENA PRÁCTICA\n"
                "Verifica primero la procedencia de la aplicación, su reputación "
                "y la necesidad de cada permiso.\n\n"

                "📚 APRENDIZAJE\n"
                "Los permisos deben analizarse de acuerdo con la función "
                "que ofrece la aplicación. Más permisos no significa mejor funcionamiento."
            ),

            "B": (
                "✅ CORRECTO\n\n"
                "Verificar la fuente, reputación y necesidad de los permisos "
                "antes de instalar una aplicación es una práctica preventiva adecuada.\n\n"

                "🔎 ¿QUÉ DEBES REVISAR?\n"
                "• Procedencia de la aplicación.\n"
                "• Reputación del desarrollador.\n"
                "• Permisos solicitados.\n"
                "• Finalidad de esos permisos.\n"
                "• Información de privacidad disponible.\n\n"

                "📋 PROTECCIÓN DE DATOS\n"
                "Una aplicación puede acceder a información personal del "
                "dispositivo. Por eso es importante conceder únicamente "
                "los permisos necesarios.\n\n"

                "📚 APRENDIZAJE\n"
                "La seguridad comienza antes de instalar una aplicación: "
                "primero verifica qué estás instalando y qué información "
                "podría llegar a utilizar."
            ),

            "C": (
                "⚠️ DECISIÓN DE RIESGO\n\n"
                "Instalar la aplicación y aceptar todos los permisos sin "
                "comprender su finalidad aumenta innecesariamente la exposición "
                "de información.\n\n"

                "🛡️ MEJOR ALTERNATIVA\n"
                "Primero verifica la fuente y analiza los permisos. "
                "Si los permisos no tienen una relación clara con la función "
                "de la aplicación, es mejor no continuar.\n\n"

                "📚 APRENDIZAJE\n"
                "Aceptar permisos sin analizarlos puede permitir que una "
                "aplicación acceda a información que no necesita para cumplir "
                "su función."
            ),
        },
    },

    "empleo": {
        "label": "Oferta de empleo sospechosa",
        "question": (
            "🎓 SIMULACIÓN: OFERTA DE EMPLEO\n\n"
            "Recibes una supuesta oferta de empleo mediante redes sociales.\n\n"
            "Antes de una entrevista formal te solicitan enviar por WhatsApp "
            "una fotografía de tu documento de identidad, datos bancarios, "
            "una fotografía personal y una copia de otros documentos.\n\n"
            "La persona que te contacta asegura que 'todos los candidatos "
            "deben enviarlos inmediatamente'.\n\n"
            "¿Cómo reaccionas?"
        ),
        "options": [
            "A) Envío todos los documentos porque quiero conseguir el empleo.",
            "B) Verifico primero la empresa, el proceso y la finalidad de cada dato solicitado.",
            "C) Envío únicamente los documentos que me soliciten por WhatsApp.",
        ],
        "feedback": {
            "A": (
                "❌ DECISIÓN DE ALTO RIESGO\n\n"
                "El interés por conseguir un empleo no debe llevarte a "
                "entregar información personal sensible sin verificar "
                "la legitimidad del proceso.\n\n"

                "🚨 SEÑALES DE ALERTA\n"
                "• Solicitud de numerosos datos antes de verificar la empresa.\n"
                "• Presión para enviarlos inmediatamente.\n"
                "• Uso de un canal informal sin comprobar el proceso.\n"
                "• Falta de explicación clara sobre la finalidad.\n\n"

                "🛡️ ¿QUÉ DEBES HACER?\n"
                "Verifica la empresa mediante sus canales oficiales y "
                "determina qué información es realmente necesaria para "
                "la etapa del proceso.\n\n"

                "📚 APRENDIZAJE\n"
                "Una solicitud de información personal debe evaluarse "
                "por quién la realiza, para qué la necesita y cómo "
                "será utilizada."
            ),

            "B": (
                "✅ CORRECTO\n\n"
                "Antes de entregar información personal debes comprobar "
                "que el proceso laboral sea legítimo y comprender la finalidad "
                "de los datos solicitados.\n\n"

                "🔎 VERIFICA\n"
                "• Existencia de la empresa.\n"
                "• Identidad del reclutador.\n"
                "• Proceso de contratación.\n"
                "• Canal oficial utilizado por la organización.\n"
                "• Finalidad de cada dato solicitado.\n\n"

                "📋 PROTECCIÓN DE DATOS\n"
                "No toda información personal debe entregarse simplemente "
                "porque una persona la solicite. Es importante evaluar "
                "la necesidad y finalidad de la solicitud.\n\n"

                "📚 APRENDIZAJE\n"
                "La prevención consiste en detenerse antes de compartir "
                "información y verificar la legitimidad de la solicitud."
            ),

            "C": (
                "❌ INCORRECTO\n\n"
                "El hecho de que una persona solicite información mediante "
                "WhatsApp no demuestra que la solicitud sea legítima.\n\n"

                "Además, enviar únicamente algunos documentos no elimina "
                "el riesgo si todavía no has comprobado quién recibe "
                "la información ni para qué la utilizará.\n\n"

                "🛡️ BUENA PRÁCTICA\n"
                "Primero verifica la organización y el proceso mediante "
                "canales oficiales. Después evalúa qué información es "
                "realmente necesaria.\n\n"

                "📚 APRENDIZAJE\n"
                "El canal utilizado y la apariencia profesional del contacto "
                "no son suficientes para demostrar legitimidad."
            ),
        },
    },

}
SIMULATION_OPTIONS = [item["label"] for item in SIMULATIONS.values()]


# ============================================================
# EVALUACIÓN DE RIESGO DIGITAL
# ============================================================

# Cada pregunta puntúa:
# A = 0 (práctica segura)
# B = 1 (riesgo moderado)
# C = 2 (riesgo alto)

ASSESSMENT = [

    (
        "Contraseñas",
        "¿Cómo gestionas las contraseñas de tus cuentas digitales?",
        "Utilizo una contraseña única, larga y difícil de adivinar para cada cuenta.",
        "Reutilizo algunas contraseñas en cuentas secundarias.",
        "Utilizo la misma contraseña o variaciones simples en varias cuentas.",
    ),

    (
        "Contraseñas",
        "¿Tienes autenticación de dos factores (2FA) activada?",
        "Sí, la tengo activada en mis cuentas importantes.",
        "Solo la tengo activada en algunas cuentas.",
        "No utilizo autenticación de dos factores.",
    ),

    (
        "Contraseñas",
        "¿Qué haces cuando sospechas que una contraseña fue expuesta?",
        "La cambio inmediatamente desde el sitio o aplicación oficial y reviso la seguridad de la cuenta.",
        "Primero compruebo qué ocurrió y después considero cambiarla.",
        "Mantengo la contraseña hasta que la plataforma me obligue a cambiarla.",
    ),

    (
        "Contraseñas",
        "¿Compartes contraseñas o códigos de autenticación con otras personas?",
        "Nunca comparto contraseñas ni códigos de autenticación.",
        "Solo he compartido una contraseña en alguna situación excepcional.",
        "Comparto contraseñas o códigos con frecuencia.",
    ),

    (
        "Contraseñas",
        "¿Utilizas algún mecanismo para gestionar de forma segura tus contraseñas?",
        "Utilizo un gestor de contraseñas o un método seguro para mantener credenciales únicas.",
        "Las almaceno de una manera que considero razonablemente segura.",
        "Las guardo en lugares fácilmente accesibles o utilizo contraseñas fáciles de recordar.",
    ),

    (
        "Navegación",
        "Antes de ingresar información personal, ¿verificas que estás en el sitio correcto?",
        "Reviso el dominio, la dirección del sitio y compruebo que corresponda al servicio esperado.",
        "Solo verifico el sitio cuando algo me parece extraño.",
        "No verifico el sitio antes de ingresar información.",
    ),

    (
        "Navegación",
        "¿Cómo reaccionas ante un enlace inesperado recibido por correo o mensajería?",
        "Verifico el remitente y el destino utilizando un método seguro antes de abrirlo.",
        "A veces lo abro si el mensaje parece confiable.",
        "Abro directamente los enlaces que recibo.",
    ),

    (
        "Navegación",
        "¿Utilizas redes Wi-Fi públicas para realizar operaciones sensibles?",
        "Evito realizar operaciones sensibles cuando utilizo redes públicas no confiables.",
        "Lo hago ocasionalmente tomando algunas precauciones.",
        "Realizo operaciones bancarias o compras con frecuencia desde redes públicas.",
    ),

    (
        "Navegación",
        "¿Mantienes actualizado el sistema operativo, navegador y aplicaciones?",
        "Sí, mantengo regularmente actualizados mis dispositivos y aplicaciones.",
        "Actualizo algunos dispositivos o aplicaciones cuando recuerdo hacerlo.",
        "Casi nunca realizo actualizaciones.",
    ),

    (
        "Navegación",
        "¿Qué haces cuando una página web solicita información personal que no esperabas entregar?",
        "Me detengo, verifico la legitimidad del sitio y analizo si realmente necesito proporcionar esa información.",
        "Continúo si la página parece pertenecer a una organización conocida.",
        "Proporciono la información solicitada sin verificarla.",
    ),

    (
        "Redes sociales",
        "¿Quién puede acceder a la mayor parte de la información de tus perfiles?",
        "Solo personas seleccionadas, contactos conocidos o grupos definidos por mí.",
        "Depende de la red social y de la publicación.",
        "Cualquier persona puede acceder a gran parte de mi información.",
    ),

    (
        "Redes sociales",
        "¿Revisas periódicamente las aplicaciones conectadas a tus perfiles?",
        "Sí, reviso y elimino accesos que ya no necesito.",
        "Lo hago ocasionalmente.",
        "Nunca reviso las aplicaciones conectadas.",
    ),

    (
        "Redes sociales",
        "¿Publicas documentos, dirección, información financiera o identificadores personales?",
        "Evito publicar este tipo de información innecesariamente.",
        "Publico algunos datos cuando considero que la situación lo requiere.",
        "Publico este tipo de información con facilidad.",
    ),

    (
        "Redes sociales",
        "¿Aceptas solicitudes de personas que no conoces?",
        "No las acepto sin verificar primero quién es la persona y por qué desea contactarme.",
        "A veces acepto solicitudes si el perfil parece confiable.",
        "Normalmente acepto solicitudes aunque no conozca a la persona.",
    ),

    (
        "Redes sociales",
        "¿Revisas la información que aparece en fotografías antes de publicarlas?",
        "Sí, compruebo que no aparezcan documentos, ubicaciones, identificadores u otra información innecesaria.",
        "Solo reviso algunos elementos.",
        "Publico las fotografías sin comprobar qué información contienen.",
    ),

    (
        "Compras en línea",
        "¿Cómo evalúas una tienda antes de realizar una compra?",
        "Verifico la identidad del comercio, dominio, reputación, condiciones y métodos de contacto.",
        "Principalmente reviso el precio y algunos comentarios.",
        "Realizo compras sin verificar previamente la tienda.",
    ),

    (
        "Compras en línea",
        "¿Cómo manejas tus datos de pago?",
        "Utilizo métodos seguros y nunca envío información financiera mediante canales informales.",
        "Utilizo mi tarjeta habitual y reviso la operación posteriormente.",
        "Envío datos de pago por cualquier medio que me soliciten.",
    ),

    (
        "Compras en línea",
        "Antes de proporcionar datos personales a una tienda, ¿revisas para qué serán utilizados?",
        "Sí, reviso qué información se solicita y cuál es su finalidad.",
        "Solo reviso una parte de la información.",
        "Nunca reviso cómo serán utilizados mis datos.",
    ),

    (
        "Compras en línea",
        "¿Conservas comprobantes de compras y operaciones digitales importantes?",
        "Sí, conservo comprobantes y registros de operaciones importantes.",
        "Conservo solamente algunos comprobantes.",
        "No conservo comprobantes de mis operaciones digitales.",
    ),

    (
        "Compras en línea",
        "¿Qué haces si una tienda solicita más información personal de la que esperabas?",
        "Me detengo y verifico por qué se solicita, si es necesaria y quién la recibirá.",
        "La proporciono si la tienda parece confiable.",
        "La proporciono sin comprobar la finalidad.",
    ),

    (
        "Derechos digitales",
        "¿Qué tanto conoces tus derechos relacionados con tus datos personales?",
        "Conozco derechos como acceso, rectificación, supresión o cancelación y oposición.",
        "Conozco algunos derechos, pero no tengo claridad sobre su alcance.",
        "No conozco mis derechos relacionados con mis datos personales.",
    ),

    (
        "Derechos digitales",
        "¿Sabes dónde buscar orientación sobre protección de datos personales en Costa Rica?",
        "Conozco PRODHAB y su función general como autoridad relacionada con la protección de datos personales.",
        "Sé que existe una autoridad, pero no conozco claramente su función.",
        "No sé dónde buscar orientación.",
    ),

    (
        "Derechos digitales",
        "¿Reconoces información que puede requerir especial atención o protección?",
        "Sí, identifico información como datos financieros, documentos de identidad o información relacionada con la salud.",
        "Reconozco algunos casos, pero no todos.",
        "No sé distinguir qué información puede representar un riesgo especial.",
    ),

    (
        "Derechos digitales",
        "¿Antes de proporcionar datos personales analizas quién los solicita y para qué?",
        "Sí, verifico quién los solicita, la finalidad y si realmente son necesarios.",
        "Lo hago únicamente en algunas situaciones.",
        "Proporciono información sin analizar la finalidad.",
    ),

    (
        "Derechos digitales",
        "¿Revisas los permisos que solicitan las aplicaciones?",
        "Sí, compruebo que los permisos tengan relación con la función que ofrece la aplicación.",
        "Solo reviso algunos permisos.",
        "Acepto los permisos sin revisarlos.",
    ),

    (
        "Incidentes digitales",
        "¿Qué haces si detectas un inicio de sesión que no reconoces?",
        "Cambio la contraseña, cierro sesiones desconocidas, reviso la actividad y activo medidas adicionales de seguridad.",
        "Primero observo si vuelve a ocurrir antes de tomar medidas.",
        "No realizo ninguna acción mientras pueda seguir utilizando la cuenta.",
    ),

    (
        "Incidentes digitales",
        "¿Qué haces si ingresaste tu contraseña en un sitio que ahora consideras sospechoso?",
        "Cambio inmediatamente la contraseña desde el sitio oficial y reviso las demás cuentas donde pudiera reutilizarse.",
        "Espero para determinar si realmente existe algún problema.",
        "Mantengo la misma contraseña hasta recibir una alerta.",
    ),

    (
        "Incidentes digitales",
        "¿Qué haces si recibes un mensaje que solicita urgentemente datos personales?",
        "No respondo y verifico la solicitud mediante un canal oficial independiente.",
        "Pregunto al remitente antes de proporcionar información.",
        "Entrego la información porque la solicitud parece urgente.",
    ),

    (
        "Incidentes digitales",
        "¿Conservas evidencia cuando ocurre un incidente digital?",
        "Sí, conservo capturas, mensajes, correos, comprobantes y otros elementos relevantes.",
        "Solo conservo alguna evidencia.",
        "Elimino inmediatamente los mensajes sin conservar evidencia.",
    ),

]
SESSIONS: dict[str, dict[str, Any]] = {}


# ============================================================
# FUNCIONES AUXILIARES
# ============================================================

def normalize(value: str) -> str:
    """Normaliza texto para comparar opciones sin depender de mayúsculas/acentos."""
    return "".join(
        char
        for char in unicodedata.normalize("NFD", value.lower())
        if unicodedata.category(char) != "Mn"
    ).strip()


def root_reply() -> ChatReply:
    return ChatReply(
        (
            "¡Hola! Soy el asistente de Protección de Datos CR. 👋\n\n"
            "Este chatbot está diseñado para orientarte y ayudarte a aprender "
            "sobre protección de datos personales y seguridad digital.\n\n"
            "Selecciona una opción para comenzar. No necesitas escribir "
            "información personal."
        ),
        ROOT_OPTIONS,
    )


def option_letter(value: str) -> str | None:
    """Obtiene A, B o C cuando el usuario selecciona una opción."""
    value = normalize(value)
    for letter in ("a", "b", "c"):
        if (
            value == letter
            or value.startswith(f"{letter})")
            or value.startswith(f"{letter} ")
        ):
            return letter.upper()
    return None


def find_option_index(message: str, options: list[str]) -> int | None:
    """Permite seleccionar una opción mediante el texto exacto del botón."""
    text = normalize(message)

    for index, option in enumerate(options):
        if normalize(option) == text:
            return index

    return None


def assessment_question(session_id: str) -> ChatReply:
    state = SESSIONS[session_id]
    index = state["index"]
    category, question, a, b, c = ASSESSMENT[index]

    return ChatReply(
        (
            f"🛡️ EVALUACIÓN DE RIESGO DIGITAL\n\n"
            f"Pregunta {index + 1} de {len(ASSESSMENT)} · {category}\n\n"
            f"{question}\n\n"
            "Selecciona la opción que más se parezca a tu práctica habitual."
        ),
        [f"A) {a}", f"B) {b}", f"C) {c}"],
    )


def guidance_menu_reply() -> ChatReply:
    return ChatReply(
        (
            "🆘 ORIENTACIÓN Y ASISTENCIA\n\n"
            "Selecciona la situación que más se parece a tu caso.\n\n"
            "No compartas contraseñas, PIN, códigos de autenticación, "
            "números completos de tarjeta ni otra información confidencial."
        ),
        [item["label"] for item in GUIDANCE.values()],
    )


def education_menu_reply() -> ChatReply:
    return ChatReply(
        (
            "🎓 EDUCACIÓN Y APRENDIZAJE\n\n"
            "Selecciona un tema. Encontrarás una explicación, ejemplos, "
            "medidas preventivas y, cuando corresponda, una actividad para "
            "comprobar lo aprendido."
        ),
        EDUCATION_OPTIONS,
    )


def simulation_menu_reply() -> ChatReply:
    return ChatReply(
        (
            "🎯 SIMULACIONES EDUCATIVAS\n\n"
            "Selecciona un escenario cotidiano y toma una decisión. "
            "Después recibirás retroalimentación explicando por qué la "
            "decisión representa una buena práctica o un riesgo."
        ),
        SIMULATION_OPTIONS,
    )


def rights_menu_reply() -> ChatReply:
    return ChatReply(
        (
            "⚖️ DERECHOS Y ORIENTACIÓN EN COSTA RICA\n\n"
            "La Ley N.º 8968 establece un marco para la protección de las "
            "personas frente al tratamiento de sus datos personales.\n\n"
            "Selecciona qué deseas conocer:"
        ),
        [
            "📖 ¿Qué es la Ley N.º 8968?",
            "👁️ Derecho de acceso",
            "✏️ Derecho de rectificación",
            "🗑️ Derecho de supresión",
            "🚫 Derecho de oposición",
            "🏛️ PRODHAB",
            "📍 ¿Dónde puedo denunciar?",
        ],
    )


def rights_reply(message: str) -> ChatReply | None:
    text = normalize(message)

    if "ley n.º 8968" in text or "ley n 8968" in text or text == "ley 8968":
        return ChatReply(
            (
                "📖 LEY N.º 8968\n\n"
                "La Ley N.º 8968, Ley de Protección de la Persona frente al "
                "tratamiento de sus datos personales, constituye el marco "
                "costarricense de referencia para proteger a las personas "
                "frente al tratamiento de sus datos personales.\n\n"
                "Su finalidad se relaciona con la protección de la persona "
                "y el control sobre el uso de su información personal.\n\n"
                "El chatbot presenta información educativa y general. La "
                "aplicación de la normativa a un caso concreto puede depender "
                "de sus circunstancias."
            ),
            [
                "👁️ Derecho de acceso",
                "✏️ Derecho de rectificación",
                "🗑️ Derecho de supresión",
                "🚫 Derecho de oposición",
                "🏛️ PRODHAB",
                "📍 ¿Dónde puedo denunciar?",
            ],
        )

    if "derecho de acceso" in text:
        return ChatReply(
            (
                "👁️ DERECHO DE ACCESO\n\n"
                "Permite solicitar información relacionada con los datos "
                "personales que una entidad trata sobre la persona, en los "
                "términos que correspondan.\n\n"
                "¿Por qué es importante?\n"
                "Ayuda a conocer qué información se mantiene y cómo se "
                "relaciona con el tratamiento realizado.\n\n"
                "Buena práctica: realiza las solicitudes por un medio que "
                "deje constancia y conserva la respuesta."
            ),
            [
                "✏️ Derecho de rectificación",
                "🗑️ Derecho de supresión",
                "🚫 Derecho de oposición",
                "⬅️ Volver a derechos",
            ],
        )

    if "derecho de rectificacion" in text:
        return ChatReply(
            (
                "✏️ DERECHO DE RECTIFICACIÓN\n\n"
                "Permite solicitar la corrección de datos personales "
                "inexactos o incompletos cuando corresponda.\n\n"
                "Ejemplo: una organización mantiene un dato personal "
                "incorrecto y necesitas que sea actualizado.\n\n"
                "Buena práctica: identifica claramente el dato que debe "
                "corregirse y conserva evidencia de la solicitud."
            ),
            [
                "👁️ Derecho de acceso",
                "🗑️ Derecho de supresión",
                "🚫 Derecho de oposición",
                "⬅️ Volver a derechos",
            ],
        )

    if "derecho de supresion" in text:
        return ChatReply(
            (
                "🗑️ DERECHO DE SUPRESIÓN\n\n"
                "Se relaciona con la posibilidad de solicitar la eliminación "
                "de datos personales cuando corresponda.\n\n"
                "La procedencia de una solicitud puede depender del caso y "
                "de las condiciones aplicables al tratamiento.\n\n"
                "Por eso el chatbot ofrece orientación general y no determina "
                "jurídicamente si una solicitud concreta debe ser aceptada."
            ),
            [
                "👁️ Derecho de acceso",
                "✏️ Derecho de rectificación",
                "🚫 Derecho de oposición",
                "⬅️ Volver a derechos",
            ],
        )

    if "derecho de oposicion" in text:
        return ChatReply(
            (
                "🚫 DERECHO DE OPOSICIÓN\n\n"
                "Se relaciona con la posibilidad de oponerse a determinados "
                "tratamientos de datos personales cuando corresponda.\n\n"
                "La aplicación concreta depende de las circunstancias y de "
                "las condiciones establecidas por el marco jurídico aplicable.\n\n"
                "Si tienes un caso específico, conserva la evidencia y busca "
                "orientación institucional."
            ),
            [
                "👁️ Derecho de acceso",
                "✏️ Derecho de rectificación",
                "🗑️ Derecho de supresión",
                "🏛️ PRODHAB",
                "⬅️ Volver a derechos",
            ],
        )

    if "prodhab" in text:
        return ChatReply(
            (
                "🏛️ PRODHAB\n\n"
                "La Agencia de Protección de Datos de los Habitantes "
                "(PRODHAB) es la autoridad costarricense relacionada con "
                "la protección de los datos personales y la supervisión "
                "del cumplimiento de la normativa correspondiente.\n\n"
                "Para conocer procedimientos y requisitos actualizados, "
                "consulta directamente los canales oficiales de PRODHAB.\n\n"
                "El chatbot no sustituye el procedimiento oficial."
            ),
            [
                "📍 ¿Dónde puedo denunciar?",
                "⚖️ Volver a derechos",
                "🏠 Volver al inicio",
            ],
        )

    if "donde puedo denunciar" in text:
        return ChatReply(
            (
                "📍 ¿DÓNDE PUEDO BUSCAR ORIENTACIÓN?\n\n"
                "La institución depende de la naturaleza de la situación.\n\n"
                "🏛️ PRODHAB\n"
                "Para asuntos relacionados con protección y tratamiento de "
                "datos personales.\n\n"
                "👮 OIJ\n"
                "Para posibles delitos, como fraude, suplantación o acceso "
                "indebido, según corresponda.\n\n"
                "🛡️ CSIRT-CR\n"
                "Para determinados incidentes de ciberseguridad dentro de "
                "su ámbito de atención.\n\n"
                "Antes de reportar, conserva capturas, correos, enlaces, "
                "comprobantes y otros elementos relevantes.\n\n"
                "Utiliza siempre los canales oficiales de cada institución."
            ),
            [
                "🏛️ PRODHAB",
                "🆘 Orientación ante una situación",
                "🏠 Volver al inicio",
            ],
        )

    return None


# ============================================================
# MOTOR CONVERSACIONAL
# ============================================================

def answer_message(message: str, session_id: str) -> ChatReply:
    text = normalize(message)

    # --------------------------------------------------------
    # INICIO / REINICIO
    # --------------------------------------------------------
    if text in {
        "inicio",
        "menu",
        "menú",
        "reiniciar",
        "volver al menu",
        "volver al menú",
        "🏠 volver al inicio",
    }:
        SESSIONS.pop(session_id, None)
        return root_reply()

    state = SESSIONS.get(session_id)

    # --------------------------------------------------------
    # MENÚ DE ORIENTACIÓN
    # --------------------------------------------------------
    if state and state["mode"] == "guidance-menu":
        for key, item in GUIDANCE.items():

            if normalize(item["label"]) == text:
                state.update(
                    {
                        "mode": "guidance-question",
                        "topic": key,
                        "options": item["options"],
                    }
                )

                return ChatReply(
                    f"{item['question']}\n\nSelecciona una opción:",
                    item["options"],
                )

        if text in {
            "volver al menu",
            "volver al menú",
            "🏠 volver al inicio",
        }:
            SESSIONS.pop(session_id, None)
            return root_reply()

        return guidance_menu_reply()

    # --------------------------------------------------------
    # PREGUNTA DE ORIENTACIÓN
    # --------------------------------------------------------
    if state and state["mode"] == "guidance-question":
        choice = option_letter(message)

        if choice is None:
            return ChatReply(
                "Selecciona una de las opciones disponibles para continuar.",
                state["options"],
            )

        item = GUIDANCE[state["topic"]]
        response = item["responses"].get(choice)

        if response is None:
            return ChatReply(
                "Selecciona una de las opciones disponibles para continuar.",
                state["options"],
            )

        SESSIONS.pop(session_id, None)

        return ChatReply(
            response,
            [
                "🎯 Simulación educativa",
                "🎓 Quiero aprender",
                "🛡️ Evaluar mis prácticas digitales",
                "🏠 Volver al inicio",
            ],
        )

    # --------------------------------------------------------
    # MENÚ DE EDUCACIÓN
    # --------------------------------------------------------
    if state and state["mode"] == "education-menu":
        selected = find_option_index(
            message,
            EDUCATION_OPTIONS,
        )

        if selected is None:
            return education_menu_reply()

        topic_keys = list(EDUCATION_TOPICS.keys())

        if selected >= len(topic_keys):
            return education_menu_reply()

        topic_key = topic_keys[selected]
        topic = EDUCATION_TOPICS[topic_key]

        suggestions = [
            "🎯 Hacer una simulación",
            "📚 Elegir otro tema",
            "🏠 Volver al inicio",
        ]

        return ChatReply(
            f"{topic['title']}\n\n{topic['content']}",
            suggestions,
        )

    # --------------------------------------------------------
    # MENÚ DE SIMULACIONES
    # --------------------------------------------------------
    if state and state["mode"] == "simulation-menu":
        selected = find_option_index(
            message,
            SIMULATION_OPTIONS,
        )

        if selected is None:
            return simulation_menu_reply()

        scenario_keys = list(SIMULATIONS.keys())

        if selected >= len(scenario_keys):
            return simulation_menu_reply()

        scenario_key = scenario_keys[selected]
        simulation = SIMULATIONS[scenario_key]

        state.update(
            {
                "mode": "simulation-answer",
                "scenario": scenario_key,
                "options": simulation["options"],
            }
        )

        return ChatReply(
            simulation["question"],
            simulation["options"],
        )

    # --------------------------------------------------------
    # RESPUESTA DE SIMULACIÓN
    # --------------------------------------------------------
    if state and state["mode"] == "simulation-answer":
        choice = option_letter(message)

        if choice is None:
            return ChatReply(
                "Selecciona A, B o C para recibir la retroalimentación.",
                state["options"],
            )

        simulation = SIMULATIONS.get(state["scenario"])

        if simulation is None:
            SESSIONS.pop(session_id, None)
            return root_reply()

        feedback = simulation["feedback"].get(choice)

        if feedback is None:
            return ChatReply(
                "Selecciona A, B o C para recibir la retroalimentación.",
                state["options"],
            )

        SESSIONS.pop(session_id, None)

        return ChatReply(
            (
                f"{feedback}\n\n"
                "📚 La simulación busca fortalecer tu capacidad "
                "para reconocer riesgos y tomar decisiones preventivas.\n\n"
                "¿Qué deseas hacer ahora?"
            ),
            [
                "🎓 Quiero aprender",
                "🆘 Orientación ante una situación",
                "🛡️ Evaluar mis prácticas digitales",
                "🏠 Volver al inicio",
            ],
        )

    # --------------------------------------------------------
    # EVALUACIÓN DE RIESGO DIGITAL
    # --------------------------------------------------------
    if state and state["mode"] == "assessment":

        choice = option_letter(message)

        if choice is None:
            return ChatReply(
                "Selecciona A, B o C para continuar.",
                assessment_question(session_id).suggestions,
            )

        # ----------------------------------------------------
        # REGISTRO DE LA RESPUESTA
        # ----------------------------------------------------
        points = {
            "A": 0,
            "B": 1,
            "C": 2,
        }

        state["score"] += points[choice]
        state["answers"].append(choice)
        state["index"] += 1

        # ----------------------------------------------------
        # CONTINUAR CON LA SIGUIENTE PREGUNTA
        # ----------------------------------------------------
        if state["index"] < len(ASSESSMENT):
            return assessment_question(session_id)

        # ----------------------------------------------------
        # FINAL DE LA EVALUACIÓN
        # ----------------------------------------------------
        score = state["score"]
        answers = state["answers"]

        max_score = len(ASSESSMENT) * 2

        if max_score == 0:
            SESSIONS.pop(session_id, None)
            return ChatReply(
                "No hay preguntas disponibles para realizar la evaluación.",
                ["🏠 Volver al inicio"],
            )

        percentage = round((score / max_score) * 100)

        # ----------------------------------------------------
        # INDICADORES COMPLEMENTARIOS
        # ----------------------------------------------------
        high_risk_answers = answers.count("C")
        medium_risk_answers = answers.count("B")
        preventive_answers = answers.count("A")

        # ----------------------------------------------------
        # NIVEL DE RIESGO
        # ----------------------------------------------------
        if percentage <= 20:
            level = "🟢 BAJO"

            explanation = (
                "Tus respuestas muestran un nivel preventivo favorable. "
                "En general, presentas hábitos que reducen la exposición "
                "a riesgos relacionados con cuentas, información personal, "
                "navegación y servicios digitales.\n\n"
                "Esto no significa que estés completamente protegido. "
                "La seguridad digital requiere mantener y actualizar "
                "las buenas prácticas de manera constante."
            )

        elif percentage <= 40:
            level = "🟡 MODERADO"

            explanation = (
                "Tus respuestas muestran una combinación de buenas prácticas "
                "y hábitos que podrían mejorarse.\n\n"
                "Existe una exposición moderada a determinados riesgos "
                "digitales. Se recomienda priorizar las áreas donde "
                "seleccionaste respuestas intermedias o de mayor riesgo."
            )

        elif percentage <= 60:
            level = "🟠 ALTO"

            explanation = (
                "Tus respuestas muestran varias prácticas que pueden "
                "incrementar de forma importante tu exposición a riesgos "
                "digitales.\n\n"
                "Es recomendable establecer cambios preventivos en áreas "
                "como contraseñas, autenticación, navegación, privacidad, "
                "manejo de información personal y respuesta ante incidentes."
            )

        else:
            level = "🔴 CRÍTICO"

            explanation = (
                "Tus respuestas muestran un nivel elevado de exposición "
                "a diferentes riesgos digitales.\n\n"
                "Se recomienda priorizar cambios de seguridad y revisar "
                "especialmente las prácticas relacionadas con credenciales, "
                "autenticación, información personal, enlaces, aplicaciones "
                "y respuesta ante posibles incidentes."
            )

        # ----------------------------------------------------
        # RECOMENDACIONES PERSONALIZADAS
        # ----------------------------------------------------
        recommendations = []

        if high_risk_answers > 0:
            recommendations.append(
                "Revisa las preguntas donde seleccionaste la opción C "
                "y convierte esas prácticas en prioridades de mejora."
            )

        if medium_risk_answers >= 3:
            recommendations.append(
                "Trabaja las prácticas intermedias para convertirlas "
                "en hábitos preventivos permanentes."
            )

        if score >= 10:
            recommendations.append(
                "Utiliza contraseñas únicas y robustas para cada cuenta "
                "importante."
            )

        if score >= 15:
            recommendations.append(
                "Activa autenticación de dos factores en tus cuentas "
                "importantes."
            )

        if score >= 20:
            recommendations.append(
                "Verifica siempre los enlaces, dominios y sitios antes "
                "de introducir información personal."
            )

        if score >= 25:
            recommendations.append(
                "Reduce la publicación de información personal, documentos "
                "e identificadores en redes sociales."
            )

        if score >= 30:
            recommendations.append(
                "Revisa periódicamente los permisos de aplicaciones y "
                "los servicios conectados a tus cuentas."
            )

        if score >= 35:
            recommendations.append(
                "Mantén actualizado el sistema operativo, navegador y "
                "aplicaciones que utilizas."
            )

        if score >= 40:
            recommendations.append(
                "Establece un procedimiento personal para responder ante "
                "phishing, accesos no autorizados y exposición de datos."
            )

        if not recommendations:
            recommendations = [
                "Mantén contraseñas únicas y robustas.",
                "Conserva activada la autenticación de dos factores.",
                "Continúa verificando enlaces, dominios y permisos.",
                "Revisa periódicamente la configuración de privacidad.",
            ]

        recommendations_text = "\n".join(
            f"{index}. {item}"
            for index, item in enumerate(
                recommendations,
                start=1,
            )
        )

        # ----------------------------------------------------
        # INTERPRETACIÓN DEL RESULTADO
        # ----------------------------------------------------
        interpretation = (
            f"Respuestas preventivas: {preventive_answers}\n"
            f"Respuestas intermedias: {medium_risk_answers}\n"
            f"Respuestas de mayor riesgo: {high_risk_answers}"
        )

        # ----------------------------------------------------
        # FINALIZAR SESIÓN
        # ----------------------------------------------------
        SESSIONS.pop(session_id, None)

        return ChatReply(
            (
                "🛡️ RESULTADO DE TU EVALUACIÓN\n\n"

                f"Nivel de riesgo preventivo: {level}\n"
                f"Puntuación: {score}/{max_score} ({percentage}%)\n\n"

                "📊 INTERPRETACIÓN DE TUS RESPUESTAS\n"
                f"{interpretation}\n\n"

                "🧠 ANÁLISIS\n"
                f"{explanation}\n\n"

                "🎯 RECOMENDACIONES PRIORITARIAS\n"
                f"{recommendations_text}\n\n"

                "📚 SIGUIENTE PASO\n"
                "Puedes utilizar el módulo educativo para profundizar "
                "en los temas que necesitas mejorar o realizar una "
                "simulación para practicar la toma de decisiones.\n\n"

                "⚠️ IMPORTANTE\n"
                "Esta evaluación es educativa y preventiva. No inspecciona "
                "tus dispositivos, cuentas ni actividad en Internet y no "
                "determina por sí misma si has sufrido un incidente."
            ),
            [
                "🎓 Quiero aprender",
                "🎯 Hacer una simulación",
                "🆘 Orientación ante una situación",
                "🏠 Volver al inicio",
            ],
        )

    # --------------------------------------------------------
    # ACCIONES DESDE LOS BOTONES DEL FRONTEND
    # --------------------------------------------------------
    if text == normalize("Orientación ante una situación"):
        SESSIONS[session_id] = {
            "mode": "guidance-menu"
        }

        return guidance_menu_reply()

    if text == normalize("Simulación educativa"):
        SESSIONS[session_id] = {
            "mode": "simulation-menu"
        }

        return simulation_menu_reply()

    if text == normalize("Evaluar mis prácticas digitales"):
        SESSIONS[session_id] = {
            "mode": "assessment",
            "index": 0,
            "score": 0,
            "answers": [],
        }

        return ChatReply(
            (
                "🛡️ EVALUACIÓN DE RIESGO DIGITAL\n\n"

                "Responderás una serie de preguntas sobre hábitos "
                "de seguridad digital, privacidad y protección "
                "de información personal.\n\n"

                "Cada pregunta tendrá tres alternativas:\n"
                "A) Práctica preventiva.\n"
                "B) Práctica intermedia.\n"
                "C) Práctica de mayor riesgo.\n\n"

                "Al finalizar recibirás un nivel de riesgo preventivo, "
                "una interpretación de tus respuestas y recomendaciones "
                "para mejorar tus hábitos digitales.\n\n"

                "🔐 IMPORTANTE\n"
                "No compartas contraseñas, códigos de autenticación, "
                "números de tarjeta ni otra información confidencial."
            ),
            [
                "▶️ Iniciar evaluación",
                "🏠 Volver al inicio",
            ],
        )

    if text == normalize("▶️ Iniciar evaluación"):
        SESSIONS[session_id] = {
            "mode": "assessment",
            "index": 0,
            "score": 0,
            "answers": [],
        }

        return assessment_question(session_id)

    if text == normalize("Mis derechos y denuncias"):
        return rights_menu_reply()

    # --------------------------------------------------------
    # ACCIONES EDUCATIVAS
    # --------------------------------------------------------
    if text in {
        normalize("🎓 Quiero aprender"),
        normalize("📚 Elegir otro tema"),
    }:
        SESSIONS[session_id] = {
            "mode": "education-menu"
        }

        return education_menu_reply()

    if text == normalize("🎯 Hacer una simulación"):
        SESSIONS[session_id] = {
            "mode": "simulation-menu"
        }

        return simulation_menu_reply()

    # --------------------------------------------------------
    # ACCIONES DESDE ORIENTACIÓN
    # --------------------------------------------------------
    if text == normalize("🆘 Orientación ante una situación"):
        SESSIONS[session_id] = {
            "mode": "guidance-menu"
        }

        return guidance_menu_reply()

    # --------------------------------------------------------
    # DERECHOS
    # --------------------------------------------------------
    rights_response = rights_reply(message)

    if rights_response is not None:
        return rights_response

    if text == normalize("⚖️ Volver a derechos"):
        return rights_menu_reply()

    # --------------------------------------------------------
    # RESPUESTA SEGURA PARA ENTRADAS NO ESPERADAS
    # --------------------------------------------------------
    return ChatReply(
        (
            "Para mantener la orientación estructurada, selecciona "
            "una de las opciones disponibles."
        ),
        ROOT_OPTIONS,
    )

# ============================================================
# RECURSOS Y CONTENIDO LEGAL
# ============================================================

RESOURCES = [
    {
        "id": "guia-contrasenas",
        "title": "Guía para crear contraseñas seguras",
        "category": "guide",
        "description": "Recomendaciones prácticas para proteger tus cuentas.",
    },
    {
        "id": "phishing",
        "title": "Cómo reconocer intentos de phishing",
        "category": "guide",
        "description": "Señales de alerta y pasos para evitar fraudes digitales.",
    },
    {
        "id": "datos-personales-video",
        "title": "¿Qué son los datos personales?",
        "category": "video",
        "description": "Introducción a la protección de datos.",
    },
]

LAW_8968 = {
    "name": "Ley N.º 8968",
    "title": (
        "Ley de Protección de la Persona frente al tratamiento "
        "de sus datos personales"
    ),
    "summary": (
        "Marco costarricense de referencia para la protección de las "
        "personas frente al tratamiento de sus datos personales."
    ),
    "disclaimer": (
        "Contenido informativo y educativo; no constituye asesoría legal."
    ),
}

RIGHTS = [
    {
        "id": "access",
        "title": "Acceso",
        "description": (
            "Conocer los datos personales que se tratan sobre la persona, "
            "cuando corresponda."
        ),
    },
    {
        "id": "rectification",
        "title": "Rectificación",
        "description": (
            "Solicitar la corrección de datos personales inexactos "
            "o incompletos, cuando corresponda."
        ),
    },
    {
        "id": "deletion",
        "title": "Supresión",
        "description": (
            "Solicitar la eliminación de datos personales cuando corresponda."
        ),
    },
    {
        "id": "opposition",
        "title": "Oposición",
        "description": (
            "Oponerse a determinados tratamientos cuando corresponda."
        ),
    },
]


# ============================================================
# ENDPOINTS EXISTENTES
# ============================================================

SUPPORTED_CHAT_LANGUAGES = {"en", "fr", "pt", "de", "it", "ja", "zh-CN"}


def translate_chat_text(text: str, target_language: str) -> str:
    """Translate chatbot output while preserving Spanish as the flow language.

    If the translation provider is unavailable, the educational response is
    returned in Spanish instead of interrupting the chatbot conversation.
    """
    if target_language not in SUPPORTED_CHAT_LANGUAGES or not text:
        return text

    try:
        query = urlencode(
            {
                "client": "gtx",
                "sl": "es",
                "tl": target_language,
                "dt": "t",
                "q": text,
            }
        )
        with urlopen(
            f"https://translate.googleapis.com/translate_a/single?{query}",
            timeout=5,
        ) as response:
            translated = json.loads(response.read().decode("utf-8"))
        return "".join(piece[0] for piece in translated[0] if piece[0])
    except (OSError, ValueError, IndexError, TypeError):
        return text


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post(f"{API_PREFIX}/chatbot/message", response_model=ChatReply)
def send_chatbot_message(payload: ChatMessage) -> ChatReply:
    result = answer_message(payload.message, payload.session_id)
    language = payload.language

    if language == "es":
        return result

    # Keep suggestions in Spanish for the rules engine, and return translated
    # labels separately for the interface.
    return ChatReply(
        reply=translate_chat_text(result.reply, language),
        suggestions=result.suggestions,
        display_suggestions=[
            translate_chat_text(suggestion, language)
            for suggestion in result.suggestions
        ],
    )


@app.get(f"{API_PREFIX}/chatbot/options")
def get_chatbot_options() -> dict[str, list[str]]:
    return {"options": ROOT_OPTIONS}


@app.get(f"{API_PREFIX}/resources")
def get_resources(
    category: str | None = None,
    page: int = Query(default=1, ge=1),
) -> dict[str, Any]:
    filtered = [
        item
        for item in RESOURCES
        if category is None or item["category"] == category
    ]
    return {
        "items": filtered,
        "page": page,
        "total": len(filtered),
    }


@app.get(f"{API_PREFIX}/resources/videos")
def get_videos() -> dict[str, list[dict[str, str]]]:
    return {
        "items": [
            item for item in RESOURCES if item["category"] == "video"
        ]
    }


@app.get(f"{API_PREFIX}/resources/guides")
def get_guides() -> dict[str, list[dict[str, str]]]:
    return {
        "items": [
            item for item in RESOURCES if item["category"] == "guide"
        ]
    }


@app.get(f"{API_PREFIX}/legal/law-8968")
def get_law_8968() -> dict[str, str]:
    return LAW_8968


@app.get(f"{API_PREFIX}/legal/rights")
def get_rights() -> dict[str, list[dict[str, str]]]:
    return {"items": RIGHTS}


@app.post(f"{API_PREFIX}/analytics/event", status_code=status.HTTP_202_ACCEPTED)
def log_analytics_event(payload: AnalyticsEvent) -> dict[str, str]:
    _ = payload
    return {
        "status": "accepted",
        "received_at": datetime.now(timezone.utc).isoformat(),
    }
