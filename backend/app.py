"""Vercel entry point when ``backend`` is the project root."""

# Vercel loads this file as the module named ``app``.  The implementation
# package is named ``core`` so Python never confuses it with this entry point.
from core.main import app
