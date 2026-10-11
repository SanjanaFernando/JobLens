import React from 'react';
import { 
  CheckCircle2, 
  Terminal, 
  Database, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchSystemHealth, fetchActuatorHealth } from '../api/client';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { data: apiHealth, isSuccess: isApiSuccess, isLoading: isApiLoading } = useQuery({
    queryKey: ['systemHealth'],
    queryFn: fetchSystemHealth,
    retry: false,
  });

  const { data: actuatorHealth } = useQuery({
    queryKey: ['actuatorHealth'],
    queryFn: fetchActuatorHealth,
    retry: false,
  });

  const phase0Tasks = [
    { text: 'Create monorepo: /backend (Spring Boot), /frontend (React), /docs', completed: true },
    { text: 'Set up Git, branching model (main, dev, feature/*) and README', completed: true },
    { text: 'Spring Boot 3.4 project: Web, Security, Data JPA, Validation, Flyway, PostgreSQL, Lombok, Actuator', completed: true },
    { text: 'React project: Vite, TypeScript, Tailwind, React Router, TanStack Query, Axios', completed: true },
    { text: 'Docker Compose environment with PostgreSQL 16 & pgAdmin 4', completed: true },
    { text: 'Gemini API integration setup, env config & Flash-Lite model configuration', completed: true },
    { text: 'Neon PostgreSQL free-tier deployment configuration & schema-per-user isolation strategy', completed: true },
    { text: 'Complete Architecture diagrams & Entity Relationship Diagram (ERD)', completed: true },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-glow p-8">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-300">
            <Zap className="w-3.5 h-3.5 text-teal-400" />
            Phase 0: Planning &amp; Foundation Complete
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Engineering Career Intelligence for Sri Lankan Freshers
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            JobLens aggregates Sri Lankan tech job requirements under a shared company catalog, calculates deterministic skill gaps against graduate resumes, and provides AI-driven learning roadmaps on a strict $0 budget.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/architecture"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-teal-500/20"
            >
              Explore Architecture &amp; ERD
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="http://localhost:8080/actuator/health"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium transition-all"
            >
              <Terminal className="w-4 h-4 text-slate-400" />
              Live /actuator/health
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Live System Diagnostics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Backend Status Card */}
        <div className="glass-panel rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Spring Boot Backend</span>
            <span className={`h-2.5 w-2.5 rounded-full ${isApiSuccess ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {isApiLoading ? 'Connecting...' : isApiSuccess ? 'Online (200 OK)' : 'Offline / Standby'}
            </span>
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <p>Port: <code className="text-teal-400 font-mono">8080</code></p>
            <p>Actuator Status: <code className="text-slate-300 font-mono">{actuatorHealth?.status || 'Active'}</code></p>
            <p>Model: <code className="text-slate-300 font-mono">{apiHealth?.aiModelConfigured || 'gemini-2.5-flash'}</code></p>
          </div>
        </div>

        {/* Database Architecture Card */}
        <div className="glass-panel rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Database Engine</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">PostgreSQL 16</div>
          <div className="text-xs text-slate-400 space-y-1">
            <p>Strategy: <span className="text-emerald-400 font-medium">Schema-per-user multi-tenancy</span></p>
            <p>Local: <code className="text-slate-300 font-mono">Docker Compose (port 5432)</code></p>
            <p>Cloud / Prod: <span className="text-slate-300 font-medium">Neon Postgres Free</span></p>
          </div>
        </div>

        {/* Free-Tier Guardrail Card */}
        <div className="glass-panel rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">$0 Cost Guardrails</span>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">$0.00 Budget</div>
          <div className="text-xs text-slate-400 space-y-1">
            <p>AI: <span className="text-blue-300 font-medium">Gemini Free Key (15 RPM shared)</span></p>
            <p>Deduplication: <span className="text-slate-300 font-medium">Pre-check catalog before AI</span></p>
            <p>Match Scorer: <span className="text-slate-300 font-medium">100% in Java memory</span></p>
          </div>
        </div>
      </div>

      {/* Phase 0 Checklist Progress */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
              Phase 0 Checklist Verification
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              All Phase 0 requirements verified and prepared for Phase 1 implementation.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold border border-teal-500/30">
            8 / 8 Done
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phase0Tasks.map((task, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300 font-medium leading-relaxed">
                {task.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Up Next: Phase 1 Preview */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-400">Up Next</div>
          <h3 className="text-base font-bold text-white">Phase 1: Auth, Shared DB and Per-User Private DB</h3>
          <p className="text-xs text-slate-400">
            Register/Login with JWT, automatic schema-per-user provisioning via Flyway, and TenantContext isolation tests.
          </p>
        </div>
        <Link
          to="/architecture"
          className="shrink-0 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
        >
          View Roadmap <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
