"""Vercel entry point when ``backend`` is the project root."""

# On the API Vercel project the Root Directory is ``backend``.  Therefore
# ``app`` is already importable as a top-level package; importing
# ``backend.app`` would incorrectly look for a nested backend/backend folder.
from app.main import app
