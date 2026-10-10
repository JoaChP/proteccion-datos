"""PostgreSQL bootstrap for the curated chatbot knowledge base."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any

try:
    from psycopg import connect
    from psycopg.types.json import Jsonb
except ModuleNotFoundError:  # Allows the educational API to run before dependencies install.
    connect = None
    Jsonb = None

SCHEMA_PATH = Path(__file__).resolve().parents[1] / "database" / "schema.sql"
_bootstrapped = False


def database_available() -> bool:
    return bool(os.getenv("DATABASE_URL")) and connect is not None


def _route(conn: Any, slug: str, title: str, description: str, position: int) -> int:
    return conn.execute(
        """INSERT INTO chatbot_routes (slug, title, description, position)
        VALUES (%s, %s, %s, %s)
        ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title,
            description = EXCLUDED.description, position = EXCLUDED.position,
            updated_at = NOW()
        RETURNING id""",
        (slug, title, description, position),
    ).fetchone()[0]


def _content(
    conn: Any, route_id: int, key: str, kind: str, title: str,
    body: dict[str, Any], position: int,
) -> int:
    return conn.execute(
        """INSERT INTO chatbot_content (route_id, content_key, content_type, title, body, position)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON CONFLICT (content_key) DO UPDATE SET route_id = EXCLUDED.route_id,
            content_type = EXCLUDED.content_type, title = EXCLUDED.title,
            body = EXCLUDED.body, position = EXCLUDED.position, updated_at = NOW()
        RETURNING id""",
        (route_id, key, kind, title, Jsonb(body), position),
    ).fetchone()[0]


def _options(conn: Any, content_id: int, values: list[dict[str, Any]]) -> None:
    conn.execute("DELETE FROM chatbot_options WHERE content_id = %s", (content_id,))
    for position, value in enumerate(values, start=1):
        conn.execute(
            """INSERT INTO chatbot_options
            (content_id, option_key, label, outcome, score, position)
            VALUES (%s, %s, %s, %s, %s, %s)""",
            (content_id, value["key"], value["label"], Jsonb(value.get("outcome", {})), value.get("score"), position),
        )


def _learning_checks(conn: Any, route_id: int, values: dict[str, dict[str, Any]]) -> None:
    """Store the knowledge checks that accompany each learning unit."""
    for position, (key, item) in enumerate(values.items(), start=1):
        content_id = _content(
            conn,
            route_id,
            f"learning_check:{key}",
            "learning_check",
            item["question"],
            {"correct": item["correct"], "explanation": item["explanation"]},
            position,
        )
        _options(conn, content_id, [
            {"key": letter, "label": label, "score": 0 if letter == item["correct"] else 1}
            for letter, label in zip("ABC", item["options"])
        ])


def bootstrap_chatbot_content(
    guidance: dict[str, dict[str, Any]],
    education_topics: dict[str, dict[str, Any]],
    learning_checks: dict[str, dict[str, Any]],
    simulations: dict[str, dict[str, Any]],
    assessment: list[tuple[str, str, str, str, str]],
    sources: list[dict[str, str]],
) -> bool:
    """Synchronize all current curated chatbot content into PostgreSQL.

    This is idempotent. It stores content definitions only; visitor messages and
    answers remain ephemeral and are not written to the database.
    """
    global _bootstrapped
    if _bootstrapped:
        return True
    if not database_available():
        return False

    with connect(os.environ["DATABASE_URL"], autocommit=False) as conn:
        for statement in SCHEMA_PATH.read_text(encoding="utf-8").split(";"):
            if statement.strip():
                conn.execute(statement)
        routes = {
            "guidance": _route(conn, "guidance", "Orientación y asistencia", "Guía preventiva ante situaciones digitales.", 1),
            "education": _route(conn, "education", "Educación y simulación", "Contenidos y decisiones guiadas.", 2),
            "assessment": _route(conn, "assessment", "Evaluación de riesgo digital", "Cuestionario educativo de prácticas digitales.", 3),
        }

        has_initial_content = conn.execute(
            "SELECT EXISTS (SELECT 1 FROM chatbot_content)"
        ).fetchone()[0]

        if not has_initial_content:
            for position, (key, item) in enumerate(guidance.items(), start=1):
                content_id = _content(conn, routes["guidance"], f"guidance:{key}", "guidance", item["label"], {"question": item["question"]}, position)
                _options(conn, content_id, [
                    {"key": label.split(")", 1)[0], "label": label, "outcome": {"reply": item["responses"][label.split(")", 1)[0]]}}
                    for label in item["options"]
                ])

            for position, (key, item) in enumerate(education_topics.items(), start=1):
                content_id = _content(conn, routes["education"], f"learning:{key}", "learning", item["label"], item, position)
                _options(conn, content_id, [])

            for position, (key, item) in enumerate(simulations.items(), start=1):
                scenario_id = _content(conn, routes["education"], f"simulation:{key}", "simulation", item["label"], {"goal": item["goal"], "sources": item["sources"]}, position)
                _options(conn, scenario_id, [])
                for step_position, step in enumerate(item["steps"], start=1):
                    step_id = _content(
                        conn, routes["education"], f"simulation:{key}:step:{step_position}", "simulation_step", step["title"],
                        {"scenario_key": key, "scene": step["scene"], "question": step["question"], "correct": step["correct"], "support": step["consequence"]}, step_position,
                    )
                    _options(conn, step_id, [
                        {"key": letter, "label": label, "outcome": {"explanation": step["explanations"][index]}, "score": 0 if letter == step["correct"] else 1}
                        for index, (letter, label) in enumerate(zip("ABC", step["options"]))
                    ])

            for position, (category, question, a, b, c) in enumerate(assessment, start=1):
                content_id = _content(conn, routes["assessment"], f"assessment:{position}", "assessment_question", question, {"category": category}, position)
                _options(conn, content_id, [
                    {"key": "A", "label": a, "score": 0},
                    {"key": "B", "label": b, "score": 1},
                    {"key": "C", "label": c, "score": 2},
                ])

        _learning_checks(conn, routes["education"], learning_checks)

        for index, source in enumerate(sources, start=1):
            conn.execute(
                """INSERT INTO chatbot_sources (source_key, title, url, citation, is_official)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (source_key) DO UPDATE SET title = EXCLUDED.title,
                    url = EXCLUDED.url, citation = EXCLUDED.citation,
                    is_official = EXCLUDED.is_official""",
                (f"source:{index}", source["title"], source["url"], source["title"], "Costa Rica" in source["title"]),
            )
        conn.commit()

    _bootstrapped = True
    return True


def load_chatbot_content() -> dict[str, Any] | None:
    """Build the rule-based chatbot structures from PostgreSQL content.

    The response engine keeps its existing, tested navigation logic. This
    loader replaces the definitions it consumes with the records maintained in
    Neon, so editing a question or option in the database changes the chatbot
    without a code deployment.
    """
    if not database_available():
        return None

    with connect(os.environ["DATABASE_URL"], autocommit=True) as conn:
        rows = conn.execute(
            """SELECT c.content_key, c.content_type, c.title, c.body, c.position,
                      o.option_key, o.label, o.outcome, o.score, o.position
                 FROM chatbot_content AS c
                 LEFT JOIN chatbot_options AS o ON o.content_id = c.id
                WHERE c.is_active = TRUE
                ORDER BY c.content_key, c.position, o.position"""
        ).fetchall()

    entries: dict[str, dict[str, Any]] = {}
    for row in rows:
        key, kind, title, body, position, option_key, label, outcome, score, option_position = row
        item = entries.setdefault(key, {
            "kind": kind,
            "title": title,
            "body": body or {},
            "position": position,
            "options": [],
        })
        if option_key is not None:
            item["options"].append({
                "key": option_key,
                "label": label,
                "outcome": outcome or {},
                "score": score,
                "position": option_position,
            })

    guidance: dict[str, dict[str, Any]] = {}
    education: dict[str, dict[str, Any]] = {}
    simulations: dict[str, dict[str, Any]] = {}
    steps: list[dict[str, Any]] = []
    assessment: list[tuple[str, str, str, str, str]] = []
    learning_checks: dict[str, dict[str, Any]] = {}

    for content_key, item in entries.items():
        kind = item["kind"]
        body = item["body"]
        options = item["options"]
        if kind == "guidance":
            key = content_key.removeprefix("guidance:")
            guidance[key] = {
                "label": item["title"],
                "question": body["question"],
                "options": [option["label"] for option in options],
                "responses": {option["key"]: option["outcome"].get("reply", "") for option in options},
            }
        elif kind == "learning":
            education[content_key.removeprefix("learning:")] = body
        elif kind == "simulation":
            simulations[content_key.removeprefix("simulation:")] = {
                "label": item["title"],
                "goal": body["goal"],
                "sources": body.get("sources", []),
                "steps": [],
            }
        elif kind == "simulation_step":
            steps.append({"body": body, "title": item["title"], "options": options})
        elif kind == "assessment_question":
            labels = [option["label"] for option in options]
            if len(labels) == 3:
                assessment.append((body["category"], item["title"], *labels))
        elif kind == "learning_check":
            learning_checks[content_key.removeprefix("learning_check:")] = {
                "question": item["title"],
                "options": [option["label"] for option in options],
                "correct": body["correct"],
                "explanation": body["explanation"],
            }

    for item in steps:
        body = item["body"]
        scenario = simulations.get(body["scenario_key"])
        if scenario is None:
            continue
        options = item["options"]
        scenario["steps"].append({
            "title": item["title"],
            "scene": body["scene"],
            "question": body["question"],
            "correct": body["correct"],
            "consequence": body["support"],
            "options": [option["label"] for option in options],
            "explanations": [option["outcome"].get("explanation", "") for option in options],
        })

    if not all((guidance, education, simulations, assessment, learning_checks)):
        return None
    return {
        "guidance": guidance,
        "education": education,
        "simulations": simulations,
        "assessment": assessment,
        "learning_checks": learning_checks,
    }
