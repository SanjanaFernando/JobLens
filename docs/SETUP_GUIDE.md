# JobLens Developer Setup & $0 Deployment Guide

Welcome to the JobLens developer setup guide. This document walks you through configuring and running the local development environment as well as staging on $0 free tiers.

---

## 1. Prerequisites

- **Java 21 LTS** (Eclipse Temurin / OpenJDK 21)
- **Node.js 20+** & **npm 10+**
- **Docker & Docker Compose** (Docker Desktop on Windows/macOS)
- **Google AI Studio Account** (Free Gemini API Key from [aistudio.google.com](https://aistudio.google.com/))

---

## 2. Local Development Quickstart

### Step 1: Clone and Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate `GEMINI_API_KEY` with your free Google AI Studio key.

### Step 2: Start Local PostgreSQL & pgAdmin
Run Docker Compose in the root directory:
```bash
docker compose up -d
```
- **PostgreSQL:** `localhost:5432` (User: `joblens`, DB: `joblens`, Pass: `joblens_dev_password`)
- **pgAdmin 4:** `http://localhost:5050` (Email: `admin@joblens.lk`, Pass: `admin`)

### Step 3: Run Spring Boot Backend
Navigate to `/backend`:
```bash
cd backend
./mvnw spring-boot:run
```
*(On Windows: `.\mvnw.cmd spring-boot:run`)*

- Backend will start on `http://localhost:8080`.
- Flyway automatically runs database migrations on startup.
- Verify health: `http://localhost:8080/actuator/health` or `http://localhost:8080/api/health`.

### Step 4: Run React Frontend
In a new terminal, navigate to `/frontend`:
```bash
cd frontend
npm install
npm run dev
```
- Frontend will start on `http://localhost:5173`.
- The Vite development server automatically proxies `/api` and `/actuator` calls to the Spring Boot backend on port 8080.

---

## 3. Free-Tier Neon PostgreSQL Setup (Staging & Production)

Neon offers serverless PostgreSQL with a generous free tier (no credit card required, 0.5-1 GB storage):

1. Sign up at [neon.tech](https://neon.tech).
2. Create a project named `joblens-prod`.
3. Copy the pooled connection string from the Neon dashboard.
4. Set the environment variable on your backend host:
   ```bash
   DATASOURCE_URL=jdbc:postgresql://<neon-endpoint>.neon.tech/neondb?sslmode=require
   DATASOURCE_USERNAME=<username>
   DATASOURCE_PASSWORD=<password>
   ```
5. **Schema-Per-User Isolation:** Because Neon supports standard PostgreSQL schemas, the JobLens multi-tenant architecture creates a private schema `tenant_<user_id>` per registered user inside this single Neon database.

---

## 4. Google AI Studio & Gemini API Configuration

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Click **Create API Key** (choose a project or create a free one).
3. Set your environment variable:
   ```bash
   export GEMINI_API_KEY="AIzaSy..."
   ```
4. **Model Selection:** Use `gemini-2.5-flash` or `gemini-2.0-flash-lite` in configuration:
   ```yaml
   joblens:
     ai:
       gemini:
         model: gemini-2.5-flash
   ```

---

## 5. Git Branching Model

- `main`: Production-ready releases.
- `dev`: Primary integration branch.
- `feature/<name>`: New feature work (e.g. `feature/phase-1-auth`).
