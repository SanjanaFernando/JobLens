# JobLens 🔍

> **Engineering Career Intelligence for Sri Lankan Fresh Graduates**  
> Built with React (Vite + TypeScript + Tailwind), Spring Boot 3 (Java 21), PostgreSQL, and Google Gemini API on a strict **$0 Free-Tier Budget**.

[![Spring Boot 3.4](https://img.shields.io/badge/Spring_Boot-3.4-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Java 21](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/Gemini_API-Flash--Lite-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)

---

## 🌟 Overview

JobLens enables fresh Sri Lankan engineering graduates to:
1. **Analyze Job Descriptions (JDs):** Paste JD text or screenshots to extract structured requirements into a shared catalog (**Company → Role**).
2. **Deterministic Match Scoring:** Compare personal resume profiles against target roles with deterministic in-memory Java scoring (zero token cost).
3. **Personalized Learning Plans:** Generate 1-3 week actionable roadmaps and free curated learning resources for missing skills.
4. **Company Intelligence:** Distinguish between local tech exporters, MNC subsidiaries, startups, and state-owned firms.
5. **Private Career Chatbot:** Consult an AI career advisor powered by Gemini function calling with read-only tools and zero cross-tenant data access.

---

## 📐 Architecture Highlights

- **Shared Catalog (`public` schema):** Crowd-contributed market facts: companies, aliases, normalized roles, and requirements.
- **Private User Databases (`tenant_<user_id>` schema):** Isolated private schema per job seeker containing resumes, analyses, saved roles, learning roadmaps, and chat history.
- **$0 Free-Tier Guardrails:**
  - In-memory deterministic scoring saves LLM quota.
  - Role deduplication avoids redundant AI extraction calls.
  - Client-side privacy scrubbing removes PII prior to calling Google Gemini.

---

## 🚀 Quickstart

### 1. Start Database & pgAdmin
```bash
docker compose up -d
```
- PostgreSQL: `localhost:5432`
- pgAdmin: `http://localhost:5050` (`admin@joblens.lk` / `admin`)

### 2. Run Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```
*(On Windows: `.\mvnw.cmd spring-boot:run`)*  
Health endpoint: `http://localhost:8080/actuator/health`

### 3. Run Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173).

---

## 📂 Repository Structure

```
joblens/
├── docker-compose.yml       # Local PostgreSQL 16 & pgAdmin 4
├── .env.example             # Environment template
├── README.md                # Project documentation
├── docs/                    # Architecture, ERD, and setups
│   ├── ARCHITECTURE.md      # Multi-tenancy and system design
│   ├── ERD.md               # Shared vs Private database schema
│   ├── SETUP_GUIDE.md       # Dev quickstart & Neon deployment
│   └── Phases.md            # Comprehensive project roadmap
├── backend/                 # Spring Boot 3 (Java 21) REST API
└── frontend/                # React (Vite + TypeScript + Tailwind)
```

---

## 🗺️ Project Phases

- [x] **Phase 0:** Planning and Foundation Setup *(Current)*
- [ ] **Phase 1:** Auth, Shared DB, and Per-User Private DB
- [ ] **Phase 2:** Resume Upload and Local PII Scrubbing + Parsing
- [ ] **Phase 3:** JD Extraction and Shared Catalog Deduplication
- [ ] **Phase 4:** Match Analysis, Skill Gaps, and Learning Plans
- [ ] **Phase 5:** Company Intelligence & Classification
- [ ] **Phase 6:** AI Chatbot with Gemini Read-Only Function Calling
- [ ] **Phase 7:** Market Analytics Dashboard
- [ ] **Phase 8:** Moderation, Privacy, and Hardening
- [ ] **Phase 9:** Testing, Free-Tier Deployment, and Launch
