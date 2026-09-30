# Backend — Protección de Datos CR

API FastAPI que sirve al frontend en `http://localhost:5173`.

## Ejecutar localmente

Desde la raíz del proyecto:

```powershell
python -m venv backend\.venv
backend\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
uvicorn app.main:app --app-dir backend --reload
```

La API se inicia en `http://localhost:8000`; la documentación interactiva está en `http://localhost:8000/docs`.

El frontend usa automáticamente `http://localhost:8000/api/v1`. Para otro entorno, crea un archivo `.env` en la raíz con:

```text
VITE_API_URL=https://tu-dominio/api/v1
```

## Despliegue en Vercel

El repositorio completo puede desplegarse con la raíz del proyecto: `api/index.py` exporta FastAPI y `requirements.txt` instala sus dependencias. La regla `/api/v1/:path*` en `vercel.json` debe preceder a la regla de la aplicación React. El frontend de producción usa `/api/v1` del mismo dominio, sin depender de localhost ni de una segunda URL de backend.

El cliente envía las selecciones previas del recorrido (máximo 100) y la API reconstruye su estado en cada petición con un identificador temporal. Así la evaluación y las simulaciones continúan aunque Vercel atienda la siguiente petición en otra instancia. Las elecciones se mantienen solo en memoria de la pestaña, sin persistencia en el navegador. La API no almacena estas conversaciones entre peticiones. Los clientes antiguos sin `history` siguen usando la sesión en memoria.

Al crear el proyecto de API en Vercel, selecciona `backend` como **Root Directory**. Vercel usa `app.py` como punto de entrada y `requirements.txt` para instalar las dependencias.

Configura `FRONTEND_ORIGINS` con la URL pública del frontend, por ejemplo `https://proteccion-datos.vercel.app`.

## Rutas

- `GET /health`
- `POST /api/v1/chatbot/message`
- `GET /api/v1/chatbot/options`
- `GET /api/v1/resources`, `/resources/videos`, `/resources/guides`
- `GET /api/v1/legal/law-8968`, `/legal/rights`
- `POST /api/v1/analytics/event`
