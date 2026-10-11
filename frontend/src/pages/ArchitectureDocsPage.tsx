import React from 'react';
import { 
  Database, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const ArchitectureDocsPage: React.FC = () => {
  const freeTierRows = [
    {
      component: 'AI LLM API',
      provider: 'Google AI Studio (Gemini Flash-Lite)',
      strategy: 'Shared project quota (15 RPM). Role deduplication avoids duplicate calls. Scoring computed 100% in Java memory.',
    },
    {
      component: 'Database',
      provider: 'Neon Postgres Free (or Docker Compose local)',
      strategy: 'Schema-per-user multi-tenancy in single project. Stores text and JSON only, never raw binary files.',
    },
    {
      component: 'Backend API',
      provider: 'Render Free / Oracle Always Free VM',
      strategy: 'Spring Boot 3.4 (Java 21) with minimal memory footprint. Handles cold starts gracefully.',
    },
    {
      component: 'Frontend UI',
      provider: 'Cloudflare Pages / Vercel Free',
      strategy: 'Static SPA deployment with global CDN and 0 compute overhead.',
    },
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-20 md:pb-8">
      {/* Page skeleton: Title + description + action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-normal leading-tight text-text">
            Architecture and database design
          </h1>
          <p className="text-sm text-text-muted mt-1">
            System topology, multi-tenant database isolation, and $0 budget constraints.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://neon.tech"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="secondary" icon={ExternalLink}>
              Neon console
            </Button>
          </a>
        </div>
      </div>

      {/* Dual Schema Strategy Section */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" strokeWidth={1.75} />
            <h2 className="text-lg font-normal text-text">
              1. Dual-layer storage model
            </h2>
          </div>
          <Badge variant="info">PostgreSQL</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-surface-2 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-text">Shared catalog (public schema)</h3>
              <Badge variant="success">Facts about the world</Badge>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Crowd-contributed, verified roles and requirements available to all job seekers. Deduplicated by company and role fingerprint.
            </p>
            <ul className="text-xs text-text-muted space-y-1 font-mono pt-1">
              <li>• company and company_alias</li>
              <li>• company_profile (market intelligence)</li>
              <li>• role (title, level, discipline, status)</li>
              <li>• requirement (MUST vs NICE)</li>
              <li>• app_user (auth and tenant schema pointer)</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-surface-2 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-text">Private user database (tenant_user_id)</h3>
              <Badge variant="primary">Facts about you</Badge>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Dedicated private schema provisioned on user registration. Connection bound via JWT and TenantContext. Zero cross-tenant data access.
            </p>
            <ul className="text-xs text-text-muted space-y-1 font-mono pt-1">
              <li>• resume_profile (structured JSON only)</li>
              <li>• saved_role (private bookmarks)</li>
              <li>• analysis (Java deterministic score)</li>
              <li>• skill_gap and learning_plan</li>
              <li>• chat_message (isolated user chat history)</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Zero-Dollar Free Tier Table (Section 6 Tables) */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-success" strokeWidth={1.75} />
            <h2 className="text-lg font-normal text-text">
              2. Zero-dollar free-tier design rules
            </h2>
          </div>
          <Badge variant="success">$0.00 Budget</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs text-text-muted font-medium">
              <tr>
                <th className="py-3 px-4">Component</th>
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4">Guardrail strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {freeTierRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-2 transition-colors h-12">
                  <td className="py-3 px-4 font-medium text-text">{row.component}</td>
                  <td className="py-3 px-4 text-text-muted">{row.provider}</td>
                  <td className="py-3 px-4 text-xs text-text-muted leading-relaxed">
                    {row.strategy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
