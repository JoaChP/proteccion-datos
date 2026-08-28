"""Vercel entry point for the FastAPI application."""

import importlib.util
from pathlib import Path

main_path = Path(__file__).parent / "app" / "main.py"

spec = importlib.util.spec_from_file_location("backend_main", main_path)
if spec is None or spec.loader is None:
    raise ImportError(f"Could not load FastAPI application from {main_path}")

module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

app = module.app
