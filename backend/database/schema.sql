-- PostgreSQL schema for the rule-based chatbot knowledge base.
-- No visitor conversations, credentials, or financial data are stored here.

CREATE TABLE IF NOT EXISTS chatbot_routes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    position SMALLINT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chatbot_content (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    route_id BIGINT NOT NULL REFERENCES chatbot_routes(id) ON DELETE CASCADE,
    content_key TEXT NOT NULL UNIQUE,
    content_type TEXT NOT NULL CHECK (content_type IN ('guidance', 'learning', 'simulation', 'simulation_step', 'assessment_question')),
    title TEXT NOT NULL,
    body JSONB NOT NULL DEFAULT '{}'::jsonb,
    position SMALLINT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS chatbot_content_route_position_idx ON chatbot_content(route_id, position);

CREATE TABLE IF NOT EXISTS chatbot_options (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content_id BIGINT NOT NULL REFERENCES chatbot_content(id) ON DELETE CASCADE,
    option_key TEXT NOT NULL,
    label TEXT NOT NULL,
    outcome JSONB NOT NULL DEFAULT '{}'::jsonb,
    score SMALLINT CHECK (score BETWEEN 0 AND 2),
    position SMALLINT NOT NULL,
    UNIQUE (content_id, option_key)
);

CREATE INDEX IF NOT EXISTS chatbot_options_content_position_idx ON chatbot_options(content_id, position);

CREATE TABLE IF NOT EXISTS chatbot_sources (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    source_key TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    citation TEXT,
    is_official BOOLEAN NOT NULL DEFAULT FALSE,
    reviewed_at DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chatbot_contacts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    contact_key TEXT NOT NULL UNIQUE,
    institution TEXT NOT NULL,
    purpose TEXT NOT NULL,
    website TEXT,
    phone TEXT,
    email TEXT,
    notes TEXT,
    reviewed_at DATE
);
