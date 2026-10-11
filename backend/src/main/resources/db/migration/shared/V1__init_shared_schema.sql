-- Enable UUID extension if available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. App Users (Authentication & Tenant mapping)
CREATE TABLE IF NOT EXISTS app_user (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    tenant_schema VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Companies
CREATE TABLE IF NOT EXISTS company (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    normalized_name VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Company Aliases
CREATE TABLE IF NOT EXISTS company_alias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES company(id) ON DELETE CASCADE,
    alias VARCHAR(255) NOT NULL UNIQUE
);

-- 4. Company Profile Intelligence
CREATE TABLE IF NOT EXISTS company_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL UNIQUE REFERENCES company(id) ON DELETE CASCADE,
    founded_year INTEGER,
    type VARCHAR(50),
    size VARCHAR(50),
    reputation_notes TEXT,
    sources TEXT,
    confidence VARCHAR(50) NOT NULL DEFAULT 'LOW',
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Roles
CREATE TABLE IF NOT EXISTS role (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES company(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    normalized_title VARCHAR(255) NOT NULL,
    level VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    discipline VARCHAR(100) NOT NULL,
    fingerprint VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    seen_count INTEGER NOT NULL DEFAULT 1,
    requirements_version INTEGER NOT NULL DEFAULT 1,
    closing_date DATE,
    first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Requirements
CREATE TABLE IF NOT EXISTS requirement (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id UUID NOT NULL REFERENCES role(id) ON DELETE CASCADE,
    skill VARCHAR(255) NOT NULL,
    normalized_skill VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL,
    category VARCHAR(50) NOT NULL
);

-- 7. Role Reports
CREATE TABLE IF NOT EXISTS role_report (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id UUID NOT NULL REFERENCES role(id) ON DELETE CASCADE,
    user_id UUID REFERENCES app_user(id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_role_company ON role(company_id);
CREATE INDEX IF NOT EXISTS idx_role_status ON role(status);
CREATE INDEX IF NOT EXISTS idx_requirement_role ON requirement(role_id);
CREATE INDEX IF NOT EXISTS idx_requirement_skill ON requirement(normalized_skill);
