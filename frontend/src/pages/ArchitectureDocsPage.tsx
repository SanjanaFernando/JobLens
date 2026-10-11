import React from 'react';
import { FileCode2, Database, ShieldCheck } from 'lucide-react';

export const ArchitectureDocsPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <FileCode2 className="w-6 h-6 text-teal-400" />
          JobLens Architecture &amp; Database Design
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Detailed documentation of dual-layer storage, free-tier guardrails, and Phase 0 deliverable specs.
        </p>
      </div>

      {/* Dual Schema Strategy Section */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-400" />
          1. Dual-Layer PostgreSQL Storage Model
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-teal-400">Shared Catalog (`public` schema)</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-teal-300">
                Facts about the world
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Crowd-contributed, verified data accessible to all students. Deduped by company + role fingerprint.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 font-mono list-disc list-inside">
              <li>company &amp; company_alias</li>
              <li>company_profile (market intelligence)</li>
              <li>role (title, level, discipline, status)</li>
              <li>requirement (MUST vs NICE, TECH vs SOFT)</li>
              <li>app_user (authentication registry)</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-emerald-400">Private User DBs (`tenant_xxx` schema)</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                Facts about you
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Strictly isolated per-user schema provisioned during registration. Zero cross-tenant data leaks.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 font-mono list-disc list-inside">
              <li>resume_profile (parsed JSON only, no files)</li>
              <li>saved_role (private bookmarks)</li>
              <li>analysis (match score, gap breakdown)</li>
              <li>skill_gap &amp; learning_plan (curated steps)</li>
              <li>chat_message (isolated conversation history)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Free Tier Cost Architecture */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-400" />
          2. Zero-Dollar ($0) Free-Tier Constraints
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Component</th>
                <th className="py-3 px-4">Provider / Tool</th>
                <th className="py-3 px-4">Cost Strategy / Guardrail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              <tr>
                <td className="py-3 px-4 font-bold text-teal-400">AI LLM</td>
                <td className="py-3 px-4">Google AI Studio (Gemini Flash-Lite)</td>
                <td className="py-3 px-4 text-slate-400 font-sans">
                  Shared project quota (15 RPM). JD deduplication prevents duplicate calls. Java computes match scores.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-emerald-400">Database</td>
                <td className="py-3 px-4">Neon Postgres Free</td>
                <td className="py-3 px-4 text-slate-400 font-sans">
                  Schema-per-user in single Neon project. Stores structured JSON only (no binary file storage).
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-blue-400">Backend API</td>
                <td className="py-3 px-4">Render Free / Oracle Always Free</td>
                <td className="py-3 px-4 text-slate-400 font-sans">
                  Spring Boot 3.4 with minimal memory footprint. Handles cold starts gracefully.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-purple-400">Frontend UI</td>
                <td className="py-3 px-4">Cloudflare Pages / Vercel Free</td>
                <td className="py-3 px-4 text-slate-400 font-sans">
                  Static assets served globally with zero compute overhead.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
