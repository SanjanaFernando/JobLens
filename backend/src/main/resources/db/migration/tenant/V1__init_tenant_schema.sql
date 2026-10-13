-- Private User Schema Migrations (Executed per-tenant)
CREATE TABLE IF NOT EXISTS resume_profile (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    parsed_json JSON NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS saved_role (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    shared_role_id UUID NOT NULL,
    saved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS analysis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    shared_role_id UUID NOT NULL,
    resume_version INTEGER NOT NULL,
    requirements_version INTEGER NOT NULL,
    match_score INTEGER NOT NULL,
    summary TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skill_gap (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    analysis_id UUID NOT NULL REFERENCES analysis(id) ON DELETE CASCADE,
    skill VARCHAR(255) NOT NULL,
    priority VARCHAR(20) NOT NULL,
    reason TEXT NOT NULL,
    role_count INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS learning_plan (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    skill_gap_id UUID NOT NULL REFERENCES skill_gap(id) ON DELETE CASCADE,
    steps_json JSON NOT NULL,
    est_hours INTEGER NOT NULL,
    project_idea TEXT NOT NULL,
    resources_json JSON NOT NULL,
    cv_tip TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS chat_message (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    tool_calls_json JSON,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
