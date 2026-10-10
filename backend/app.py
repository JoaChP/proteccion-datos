"""Vercel entry point when ``backend`` is the project root."""

from pathlib import Path
import sys

# Vercel can load this file while the repository root is on ``sys.path``.
# Add this file's own directory so ``core`` is resolvable in either Vercel
# Root Directory configuration.  Its name also avoids a collision with
# this entry point, which Vercel imports as ``app``.
sys.path.insert(0, str(Path(__file__).resolve().parent))
from core.main import app
