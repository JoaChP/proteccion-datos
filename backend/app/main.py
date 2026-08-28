"""FastAPI application for the Protección de Datos CR frontend."""

from datetime import datetime, timezone
import os
from typing import Any

from fastapi import FastAPI, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

API_PREFIX = "/api/v1"
DEFAULT_ORIGINS = (
    "http://localhost:5173,http://127.0.0.1:5173,"
    "https://proteccion-datos-web.vercel.app"
)
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGINS", DEFAULT_ORIGINS).split(",")
    if origin.strip()
]
app = FastAPI(title="Protección de Datos CR API", version="1.0.0")
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


class AnalyticsEvent(BaseModel):
    event: str = Field(min_length=1, max_length=100)
    data: dict[str, Any] = Field(default_factory=dict)
    timestamp: datetime


RESOURCES = [
    {"id": "guia-contrasenas", "title": "Guía para crear contraseñas seguras", "category": "guide", "description": "Recomendaciones prácticas para proteger tus cuentas."},
    {"id": "phishing", "title": "Cómo reconocer intentos de phishing", "category": "guide", "description": "Señales de alerta y pasos para evitar fraudes digitales."},
    {"id": "datos-personales-video", "title": "¿Qué son los datos personales?", "category": "video", "description": "Introducción audiovisual a la protección de datos."},
]
LAW_8968 = {
    "name": "Ley N.º 8968",
    "title": "Ley de Protección de la Persona frente al tratamiento de sus datos personales",
    "summary": "Marco costarricense para el tratamiento responsable de datos personales.",
    "disclaimer": "Contenido informativo; no constituye asesoría legal.",
}
RIGHTS = [
    {"id": "access", "title": "Acceso", "description": "Conocer los datos personales que se tratan sobre ti."},
    {"id": "rectification", "title": "Rectificación", "description": "Solicitar la corrección de datos inexactos o incompletos."},
    {"id": "deletion", "title": "Supresión", "description": "Solicitar la eliminación cuando corresponda."},
]


def answer_message(message: str) -> ChatReply:
    normalized = message.lower().strip()
    if any(term in normalized for term in ("ley", "8968", "derecho")):
        return ChatReply(reply="La Ley N.º 8968 regula la protección de datos personales en Costa Rica. Entre los derechos comunes están acceder, rectificar y solicitar la supresión de datos cuando corresponda.", suggestions=["¿Cómo ejerzo mis derechos?", "Ver la Ley 8968"])
    if any(term in normalized for term in ("contraseña", "contrasena", "clave", "seguridad")):
        return ChatReply(reply="Usa contraseñas largas y únicas para cada cuenta, activa la verificación en dos pasos y evita compartir códigos de acceso.", suggestions=["¿Qué es el phishing?", "Ver recursos educativos"])
    if any(term in normalized for term in ("phishing", "estafa", "fraude", "correo")):
        return ChatReply(reply="Desconfía de mensajes urgentes que pidan claves, códigos o datos bancarios. Verifica el remitente y entra a los sitios escribiendo su dirección directamente.", suggestions=["Consejos de seguridad", "Ver recursos educativos"])
    return ChatReply(reply="Puedo orientarte sobre protección de datos, la Ley N.º 8968 y seguridad digital. Para un caso específico o asesoría legal, consulta a la entidad competente.", suggestions=["Saber más sobre la Ley 8968", "Consejos de seguridad digital"])


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post(f"{API_PREFIX}/chatbot/message", response_model=ChatReply)
def send_chatbot_message(payload: ChatMessage) -> ChatReply:
    return answer_message(payload.message)


@app.get(f"{API_PREFIX}/chatbot/options")
def get_chatbot_options() -> dict[str, list[str]]:
    return {"options": ["Saber más sobre la Ley 8968", "Consejos de seguridad digital", "Ver recursos educativos"]}


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
