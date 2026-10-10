# Base de datos del chatbot

`schema.sql` define una base PostgreSQL para los recorridos del chatbot sin almacenar conversaciones, contraseñas, PIN, cédulas ni información bancaria.

- `chatbot_routes`: recorridos principales.
- `chatbot_content`: orientación, aprendizaje, simulaciones y preguntas.
- `chatbot_options`: opciones, puntajes y retroalimentación.
- `chatbot_sources`: referencias y enlaces revisables.
- `chatbot_contacts`: canales institucionales de apoyo.

El backend usa la variable segura `DATABASE_URL` creada por la integración Neon de Vercel.
