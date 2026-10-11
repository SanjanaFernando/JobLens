import React from 'react';
import { 
  CheckCircle2, 
  ExternalLink,
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchSystemHealth } from '../api/client';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { SkillChip } from '../components/ui/SkillChip';

export const DashboardPage: React.FC = () => {
  const { data: health, isLoading } = useQuery({
    queryKey: ['systemHealth'],
    queryFn: fetchSystemHealth,
    retry: 1,
  });

  const phase0Tasks = [
    'Create a monorepo: /backend (Spring Boot), /frontend (React), /docs.',
    'Set up Git, branching (main, dev, feature branches) and a basic README.',
    'Spring Boot project: Web, Security, Data JPA, Validation, Flyway, PostgreSQL driver, Lombok, Actuator.',
    'React project: Vite, TypeScript, Tailwind, React Router, TanStack Query, Axios.',
    'Docker Compose with PostgreSQL (and pgAdmin).',
    'Get a free Gemini API key from Google AI Studio and store it in environment variables.',
    'Create a free Neon project configuration for staging/production and Docker Compose for local dev.',
    'Draw the architecture diagram and the ERD (shared vs private tables).',
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-20 md:pb-8">
      {/* Page skeleton: Title + description + primary action at top right (Section 5) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-normal leading-tight text-text">
            Overview and progress
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Career intelligence for Sri Lankan fresh engineering graduates on a $0 budget.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/jobs">
            <Button variant="primary" icon={Briefcase}>
              Browse job catalog
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Cards Row: Architecture & Live Health Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-muted">Spring Boot backend</span>
            <Badge variant={isLoading ? 'warning' : health ? 'success' : 'danger'}>
              {isLoading ? 'Checking' : health ? 'Connected' : 'Offline'}
            </Badge>
          </div>
          <div className="text-xl font-medium text-text">
            {isLoading ? 'Connecting…' : health ? 'Ready on port 8080' : 'Offline'}
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Actuator health check returns 200 OK. AI model configured: {health?.aiModelConfigured || 'gemini-2.5-flash'}.
          </p>
          <div className="pt-1">
            <a
              href="http://localhost:8080/actuator/health"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-primary hover:text-primary-hover inline-flex items-center gap-1 font-medium"
            >
              Open actuator endpoint <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
            </a>
          </div>
        </Card>

        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-muted">Database architecture</span>
            <Badge variant="info">PostgreSQL 16</Badge>
          </div>
          <div className="text-xl font-medium text-text">
            Dual schema strategy
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Shared public catalog for crowd-contributed jobs, plus isolated private schemas (tenant_user_id) for each job seeker.
          </p>
          <div className="pt-1">
            <Link
              to="/architecture"
              className="text-xs text-primary hover:text-primary-hover inline-flex items-center gap-1 font-medium"
            >
              View architecture details <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </Card>

        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-muted">Cost guardrails</span>
            <Badge variant="success">100% Free tier</Badge>
          </div>
          <div className="text-xl font-medium text-text">
            $0.00 Running cost
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Deterministic Java match scoring, role deduplication before Gemini calls, and local client-side privacy scrubbing.
          </p>
          <div className="pt-1">
            <span className="text-xs text-text-muted">
              Gemini Flash-Lite API + Neon Postgres Free
            </span>
          </div>
        </Card>
      </div>

      {/* Interactive Preview of the Match Scorer & Skills */}
      <Card className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-lg font-normal text-text">
              Sample match analysis preview
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Deterministic skill comparison computed in Java without consuming AI tokens.
            </p>
          </div>
          <Badge variant="success">Sample profile</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex flex-col items-center justify-center p-4">
            <ScoreGauge score={78} />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <p className="text-xs font-medium text-text-muted mb-2">
                Matched skills you have:
              </p>
              <div className="flex flex-wrap gap-2">
                <SkillChip name="Java 21" status="matched" />
                <SkillChip name="Spring Boot" status="matched" />
                <SkillChip name="PostgreSQL" status="matched" />
                <SkillChip name="Git" status="matched" />
                <SkillChip name="REST APIs" status="matched" />
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-text-muted mb-2">
                Missing skills to learn:
              </p>
              <div className="flex flex-wrap gap-2">
                <SkillChip name="Docker" status="missing" />
                <SkillChip name="CI/CD Pipelines" status="missing" />
                <SkillChip name="Kubernetes" status="weak" />
                <SkillChip name="Microservices" status="nice-to-have" />
              </div>
            </div>

            <p className="text-xs text-text-muted pt-2 border-t border-border">
              You match 5 of 7 required skills for Associate Software Engineer roles in Sri Lanka.
            </p>
          </div>
        </div>
      </Card>

      {/* Phase 0 Checklist Progress */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="text-lg font-normal text-text">
              Phase 0 deliverables checklist
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Verified foundation tasks for the JobLens monorepo.
            </p>
          </div>
          <Badge variant="success">All 8 complete</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {phase0Tasks.map((task, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-2">
              <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" strokeWidth={1.75} />
              <span className="text-xs text-text leading-relaxed">
                {task}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
