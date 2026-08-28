"""FastAPI application and guided knowledge base for Protección de Datos CR."""

from datetime import datetime, timezone
import os
from typing import Any
import unicodedata

from fastapi import FastAPI, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

API_PREFIX = "/api/v1"
DEFAULT_ORIGINS = (
    "http://localhost:5173,http://127.0.0.1:5173,"
    "https://proteccion-datos-web.vercel.app"
)
ALLOWED_ORIGINS = [item.strip() for item in os.getenv("FRONTEND_ORIGINS", DEFAULT_ORIGINS).split(",") if item.strip()]

app = FastAPI(title="Protección de Datos CR API", version="1.1.0")
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


class ChatReply(BaseModel):
    reply: str
    suggestions: list[str]

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


ROOT_OPTIONS = [
    "Orientación ante una situación",
    "Simulación educativa",
    "Evaluar mis prácticas digitales",
    "Mis derechos y denuncias",
]

GUIDANCE = {
    "fraude": (
        "Posible fraude o estafa",
        "No entregue datos, contraseñas, códigos ni dinero ante solicitudes inesperadas. Contacte a la entidad por canales oficiales y guarde capturas, correos o registros. Ante posible delito o pérdida económica, contacte al OIJ: 800-8000-645.",
    ),
    "phishing": (
        "Posible phishing",
        "No abra enlaces ni adjuntos. Revise el remitente y escriba usted mismo la dirección oficial en el navegador. Marque el mensaje como phishing; para incidentes de ciberseguridad puede reportar a CSIRT-CR: csirt@micitt.go.cr.",
    ),
    "acceso": (
        "Acceso no autorizado a una cuenta",
        "Cambie primero la clave del correo principal y luego las cuentas afectadas. Cierre sesiones, elimine dispositivos o aplicaciones desconocidas y active 2FA. Para movimientos bancarios no reconocidos, contacte al banco de inmediato por su canal oficial y considere acudir al OIJ.",
    ),
    "datos": (
        "Uso indebido de datos personales",
        "Solicite por escrito qué datos tiene la entidad, para qué los usa y con quién los comparte. Puede pedir acceso, rectificación, supresión u oposición cuando corresponda. Conserve las pruebas; PRODHAB publica su trámite de protección de derechos en prodhab.go.cr (2234-0189).",
    ),
    "denuncia": (
        "¿Dónde y cómo denunciar?",
        "Datos personales: PRODHAB, prodhab.go.cr, 2234-0189. Posibles delitos como fraude, suplantación o acceso indebido: OIJ, 800-8000-645. Incidentes de ciberseguridad: CSIRT-CR, csirt@micitt.go.cr. Conserve evidencia y use únicamente canales oficiales.",
    ),
}

SIMULATIONS = {
    "banco": {
        "label": "Correo sospechoso de un banco",
        "question": "Recibiste un correo de seguridad@banco-crcr.com: 'Su cuenta fue suspendida; haga clic aquí para reactivarla'. ¿Qué haces?",
        "options": ["A) Abro el enlace e ingreso mis datos.", "B) Entro al sitio oficial escribiendo su dirección en el navegador.", "C) Respondo el correo para pedir más información."],
        "feedback": {"A": "Incorrecto. Es una señal de phishing; el enlace podría capturar sus credenciales.", "B": "Correcto. El canal oficial permite confirmar el estado de la cuenta sin usar el enlace fraudulento.", "C": "No es recomendable: responder confirma que su correo está activo y no valida al remitente."},
    },
    "viaje": {
        "label": "Datos personales en redes sociales",
        "question": "Quiere publicar boletos de avión con su pasaporte, vuelo y hotel. ¿Cuál es el principal riesgo?",
        "options": ["A) Ninguno; es información pública.", "B) Puede facilitar suplantación, fraude y revelar que su vivienda estará vacía.", "C) Solo hay riesgo si el perfil no es privado."],
        "feedback": {"A": "Incorrecto. El pasaporte y el itinerario exponen datos que pueden usarse indebidamente.", "B": "Correcto. No publique documentos, ubicación precisa ni itinerarios; comparta las fotos después del viaje.", "C": "Parcialmente incorrecto. Un perfil privado reduce exposición, pero no elimina reenvíos ni capturas."},
    },
    "app": {
        "label": "Descarga de una aplicación",
        "question": "Una app de fotos fuera de la tienda oficial pide contactos, ubicación, micrófono y galería. ¿Qué hace?",
        "options": ["A) La descargo; esos permisos son normales.", "B) No la descargo: los permisos son excesivos y el canal no es oficial.", "C) La descargo y limito algunos permisos."],
        "feedback": {"A": "Incorrecto. Una app de fotos no necesita todos esos accesos; la fuente externa aumenta el riesgo de malware.", "B": "Correcto. Use tiendas oficiales y acepte solo permisos necesarios para la función ofrecida.", "C": "Parcialmente incorrecto. Limitar permisos ayuda, pero la descarga no oficial conserva el riesgo."},
    },
    "empleo": {
        "label": "Oferta de empleo sospechosa",
        "question": "Una oferta en redes le pide cédula, cuenta bancaria, tarjeta y foto con identificación antes de contratarle. ¿Cómo la evalúa?",
        "options": ["A) Es normal para una contratación.", "B) Es una alerta: una empresa legítima no pide esos datos por redes antes de contratar.", "C) Los envío si el perfil parece confiable."],
        "feedback": {"A": "Incorrecto. Esos datos pueden facilitar robo de identidad y fraude financiero.", "B": "Correcto. Verifique la empresa en canales oficiales y reporte la oferta sospechosa a la plataforma y, si corresponde, al OIJ.", "C": "Incorrecto. Un perfil convincente no prueba legitimidad; la solicitud es la alerta principal."},
    },
}

# Cada pregunta puntúa A=0 (segura), B=1 (riesgo moderado), C=2 (riesgo alto).
ASSESSMENT = [
    ("Contraseñas", "¿Cómo gestiona sus contraseñas?", "Uso una única y compleja por cuenta", "Reutilizo alguna en cuentas secundarias", "Uso la misma o variaciones simples"),
    ("Contraseñas", "¿Tiene 2FA activado?", "En todas mis cuentas importantes", "Solo en algunas", "En ninguna"),
    ("Contraseñas", "¿Con qué frecuencia cambia sus contraseñas?", "Cada 3 a 6 meses o ante sospecha", "Aproximadamente una vez al año", "Solo si la plataforma me obliga"),
    ("Contraseñas", "¿Comparte contraseñas?", "Nunca", "Solo en un caso excepcional", "Sí, con frecuencia"),
    ("Navegación", "Antes de ingresar datos, ¿verifica el sitio?", "Reviso dominio y HTTPS", "Solo si parece extraño", "No lo verifico"),
    ("Navegación", "¿Usa Wi-Fi público para banca o compras?", "No", "Solo ocasionalmente", "Sí, con frecuencia"),
    ("Navegación", "¿Abre enlaces inesperados?", "No; verifico antes", "A veces", "Sí, normalmente"),
    ("Navegación", "¿Actualiza sus dispositivos y aplicaciones?", "Sí, regularmente", "Solo a veces", "Casi nunca"),
    ("Redes sociales", "¿Quién puede ver su información?", "Solo contactos conocidos", "Depende de la red", "Cualquier persona"),
    ("Redes sociales", "¿Revisa apps conectadas a sus perfiles?", "Sí, periódicamente", "Rara vez", "Nunca"),
    ("Redes sociales", "¿Comparte cédula, dirección o datos financieros?", "Nunca", "Solo si creo que es necesario", "Sí, con facilidad"),
    ("Redes sociales", "¿Acepta solicitudes de personas desconocidas?", "No", "A veces", "Sí, normalmente"),
    ("Compras en línea", "¿Cómo evalúa una tienda?", "Verifico identidad, reputación y sitio", "Solo miro el precio", "Compro sin verificar"),
    ("Compras en línea", "¿Cómo paga en internet?", "Con métodos seguros y controlados", "Con mi tarjeta habitual", "Envío datos por cualquier medio"),
    ("Compras en línea", "¿Lee políticas de privacidad?", "Sí, antes de entregar datos", "Solo parcialmente", "Nunca"),
    ("Compras en línea", "¿Guarda comprobantes?", "Sí, siempre", "Solo algunos", "No"),
    ("Derechos digitales", "¿Conoce sus derechos sobre datos?", "Acceso, rectificación y supresión", "Conozco algunos", "No los conozco"),
    ("Derechos digitales", "¿Sabe cómo acudir a PRODHAB?", "Sí, sé que debo conservar evidencia y revisar su trámite", "Sé que existe, pero no el proceso", "No"),
    ("Derechos digitales", "¿Reconoce datos personales sensibles?", "Sí, identifico documentos, salud y datos financieros", "Reconozco algunos", "No los distingo"),
    ("Derechos digitales", "¿Revisa permisos y privacidad de apps?", "Sí, antes de instalarlas", "Solo los permisos visibles", "No"),
]

SESSIONS: dict[str, dict[str, Any]] = {}


def normalize(value: str) -> str:
    return "".join(char for char in unicodedata.normalize("NFD", value.lower()) if unicodedata.category(char) != "Mn").strip()


def root_reply() -> ChatReply:
    return ChatReply("Puedo ofrecer orientación ante incidentes, simulaciones educativas o una evaluación preventiva. Seleccione una opción.", ROOT_OPTIONS)


def option_letter(value: str) -> str | None:
    value = normalize(value)
    for letter in ("a", "b", "c"):
        if value == letter or value.startswith(f"{letter})") or value.startswith(f"{letter} "):
            return letter.upper()
    return None


def assessment_question(session_id: str) -> ChatReply:
    state = SESSIONS[session_id]
    index = state["index"]
    category, question, a, b, c = ASSESSMENT[index]
    return ChatReply(f"Evaluación {index + 1} de {len(ASSESSMENT)} · {category}\n{question}", [f"A) {a}", f"B) {b}", f"C) {c}"])


def answer_message(message: str, session_id: str) -> ChatReply:
    text = normalize(message)
    if text in {"inicio", "menu", "menú", "reiniciar", "volver al menu", "volver al menú"}:
        SESSIONS.pop(session_id, None)
        return root_reply()

    state = SESSIONS.get(session_id)
    if state and state["mode"] == "simulation-answer":
        choice = option_letter(message)
        if choice is None:
            return ChatReply("Seleccione A, B o C para recibir la retroalimentación.", state["options"])
        simulation = SIMULATIONS[state["scenario"]]
        SESSIONS.pop(session_id, None)
        return ChatReply(f"{simulation['feedback'][choice]}\n\nEsta simulación es educativa e informativa.", ROOT_OPTIONS)

    if state and state["mode"] == "assessment":
        choice = option_letter(message)
        if choice is None:
            return ChatReply("Para continuar, seleccione A, B o C.", assessment_question(session_id).suggestions)
        state["score"] += {"A": 0, "B": 1, "C": 2}[choice]
        state["index"] += 1
        if state["index"] < len(ASSESSMENT):
            return assessment_question(session_id)
        score = state["score"]
        SESSIONS.pop(session_id, None)
        if score <= 12:
            result = "Nivel preventivo bajo: mantenga sus prácticas y revise periódicamente accesos, permisos y actualizaciones."
        elif score <= 26:
            result = "Nivel preventivo moderado: priorice contraseñas únicas, 2FA, actualizaciones y revisión de privacidad."
        else:
            result = "Nivel preventivo alto: cambie primero las claves del correo y banca, active 2FA, retire accesos desconocidos y evite enlaces no verificados."
        return ChatReply(f"Resultado: {result}\n\nLa evaluación es educativa; no analiza dispositivos ni almacena sus respuestas al finalizar.", ROOT_OPTIONS)

    if state and state["mode"] == "guidance-menu":
        for key, (label, reply) in GUIDANCE.items():
            if normalize(label) in text or key in text:
                SESSIONS.pop(session_id, None)
                return ChatReply(reply, ["Volver al menú", "Simulación educativa", "Evaluar mis prácticas digitales"])
        return ChatReply("Seleccione la situación que mejor describe su caso. No comparta contraseñas, PIN ni datos bancarios aquí.", [item[0] for item in GUIDANCE.values()])

    if state and state["mode"] == "simulation-menu":
        for key, simulation in SIMULATIONS.items():
            if normalize(simulation["label"]) in text or key in text:
                state.update({"mode": "simulation-answer", "scenario": key, "options": simulation["options"]})
                return ChatReply(simulation["question"], simulation["options"])
        return ChatReply("Seleccione una simulación.", [item["label"] for item in SIMULATIONS.values()])

    if any(term in text for term in ("orientacion", "situacion", "fraude", "estafa", "acceso no autorizado", "uso indebido")):
        SESSIONS[session_id] = {"mode": "guidance-menu"}
        return ChatReply("¿Cuál situación describe mejor su caso?", [item[0] for item in GUIDANCE.values()])
    if "phishing" in text:
        return ChatReply(GUIDANCE["phishing"][1], ROOT_OPTIONS)
    if any(term in text for term in ("simulacion", "simulación", "aprender", "riesgo digital")):
        SESSIONS[session_id] = {"mode": "simulation-menu"}
        return ChatReply("Elija un escenario y responda A, B o C. Recibirá retroalimentación inmediata.", [item["label"] for item in SIMULATIONS.values()])
    if any(term in text for term in ("evaluar", "evaluacion", "evaluación", "practicas", "prácticas")):
        SESSIONS[session_id] = {"mode": "assessment", "index": 0, "score": 0}
        return assessment_question(session_id)
    if any(term in text for term in ("derecho", "prodhab", "denuncia", "ley", "8968")):
        return ChatReply("La Ley N.º 8968 protege los datos personales. Puede solicitar acceso, rectificación, supresión u oponerse al tratamiento cuando corresponda. " + GUIDANCE["denuncia"][1], ["Orientación ante una situación", "Evaluar mis prácticas digitales"])
    return root_reply()


RESOURCES = [
    {"id": "guia-contrasenas", "title": "Guía para crear contraseñas seguras", "category": "guide", "description": "Recomendaciones prácticas para proteger tus cuentas."},
    {"id": "phishing", "title": "Cómo reconocer intentos de phishing", "category": "guide", "description": "Señales de alerta y pasos para evitar fraudes digitales."},
    {"id": "datos-personales-video", "title": "¿Qué son los datos personales?", "category": "video", "description": "Introducción a la protección de datos."},
]
LAW_8968 = {"name": "Ley N.º 8968", "title": "Ley de Protección de la Persona frente al tratamiento de sus datos personales", "summary": "Marco costarricense para el tratamiento responsable de datos personales.", "disclaimer": "Contenido informativo; no constituye asesoría legal."}
RIGHTS = [
    {"id": "access", "title": "Acceso", "description": "Conocer los datos personales que se tratan sobre ti."},
    {"id": "rectification", "title": "Rectificación", "description": "Solicitar la corrección de datos inexactos o incompletos."},
    {"id": "deletion", "title": "Supresión", "description": "Solicitar la eliminación cuando corresponda."},
    {"id": "opposition", "title": "Oposición", "description": "Oponerse al tratamiento cuando corresponda."},
]


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post(f"{API_PREFIX}/chatbot/message", response_model=ChatReply)
def send_chatbot_message(payload: ChatMessage) -> ChatReply:
    return answer_message(payload.message, payload.session_id)


@app.get(f"{API_PREFIX}/chatbot/options")
def get_chatbot_options() -> dict[str, list[str]]:
    return {"options": ROOT_OPTIONS}


@app.get(f"{API_PREFIX}/resources")
def get_resources(category: str | None = None, page: int = Query(default=1, ge=1)) -> dict[str, Any]:
    filtered = [item for item in RESOURCES if category is None or item["category"] == category]
    return {"items": filtered, "page": page, "total": len(filtered)}


@app.get(f"{API_PREFIX}/resources/videos")
def get_videos() -> dict[str, list[dict[str, str]]]:
    return {"items": [item for item in RESOURCES if item["category"] == "video"]}


@app.get(f"{API_PREFIX}/resources/guides")
def get_guides() -> dict[str, list[dict[str, str]]]:
    return {"items": [item for item in RESOURCES if item["category"] == "guide"]}


@app.get(f"{API_PREFIX}/legal/law-8968")
def get_law_8968() -> dict[str, str]:
    return LAW_8968


@app.get(f"{API_PREFIX}/legal/rights")
def get_rights() -> dict[str, list[dict[str, str]]]:
    return {"items": RIGHTS}


@app.post(f"{API_PREFIX}/analytics/event", status_code=status.HTTP_202_ACCEPTED)
def log_analytics_event(payload: AnalyticsEvent) -> dict[str, str]:
    _ = payload
    return {"status": "accepted", "received_at": datetime.now(timezone.utc).isoformat()}
