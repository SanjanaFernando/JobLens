-- Private User Schema Migrations (Executed per-tenant)
CREATE TABLE IF NOT EXISTS resume_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parsed_json JSONB NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS saved_role (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shared_role_id UUID NOT NULL,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shared_role_id UUID NOT NULL,
    resume_version INTEGER NOT NULL,
    requirements_version INTEGER NOT NULL,
    match_score INTEGER NOT NULL,
    summary TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skill_gap (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES analysis(id) ON DELETE CASCADE,
    skill VARCHAR(255) NOT NULL,
    priority VARCHAR(20) NOT NULL,
    reason TEXT NOT NULL,
    role_count INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS learning_plan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_gap_id UUID NOT NULL REFERENCES skill_gap(id) ON DELETE CASCADE,
    steps_json JSONB NOT NULL,
    est_hours INTEGER NOT NULL,
    project_idea TEXT NOT NULL,
    resources_json JSONB NOT NULL,
    cv_tip TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS chat_message (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    tool_calls_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
