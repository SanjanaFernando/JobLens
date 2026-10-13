import React, { useState } from 'react';
import {
  Upload,
  ArrowRight,
  Target,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  FileText,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SkillChip } from '../components/ui/SkillChip';
import { INITIAL_CANDIDATE, SAMPLE_ROLES, JobRole } from '../data/mockData';
import { RoleMatchModal } from '../components/RoleMatchModal';
import { JobAnalyzeModal } from '../components/JobAnalyzeModal';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [candidate] = useState(INITIAL_CANDIDATE);
  const [selectedRoleForMatch, setSelectedRoleForMatch] = useState<JobRole | null>(null);
  const [isAnalyzeModalOpen, setIsAnalyzeModalOpen] = useState(false);
  const [showPhase0Details, setShowPhase0Details] = useState(false);

  const topRoles = SAMPLE_ROLES.slice(0, 3);

  const marketTopSkills = [
    { name: 'SQL & Database Design', percentage: 92, count: 28 },
    { name: 'Java (Core / Spring Boot)', percentage: 84, count: 25 },
    { name: 'Git & Version Control', percentage: 88, count: 26 },
    { name: 'Docker & Containers', percentage: 70, count: 21 },
    { name: 'RESTful API Architecture', percentage: 76, count: 23 },
    { name: 'CI/CD Automation', percentage: 58, count: 17 },
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-20 md:pb-8">
      {/* Top Welcome Hero */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-text-muted">Welcome back,</span>
            <span className="h-6 px-2.5 rounded-full text-xs font-medium bg-primary-soft text-primary inline-flex items-center">
              Student account
            </span>
          </div>
          <h1 className="text-2xl sm:text-[28px] font-normal leading-tight text-text mt-0.5">
            {candidate.name}
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            {candidate.degree} • {candidate.university} (Class of {candidate.graduationYear})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="secondary"
            icon={FileText}
            onClick={() => navigate('/resume')}
          >
            Edit resume profile
          </Button>
          <Button
            variant="primary"
            icon={Upload}
            onClick={() => setIsAnalyzeModalOpen(true)}
          >
            Add job description
          </Button>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-4 space-y-1">
          <span className="text-xs font-medium text-text-muted">Target roles matched</span>
          <div className="text-2xl font-normal text-text font-heading">
            {SAMPLE_ROLES.length}
          </div>
          <p className="text-xs text-text-muted">In shared Sri Lankan catalog</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-xs font-medium text-text-muted">Average match score</span>
          <div className="text-2xl font-normal text-accent font-heading">
            76%
          </div>
          <p className="text-xs text-text-muted">Good match for freshers</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-xs font-medium text-text-muted">Top missing skill</span>
          <div className="text-xl font-normal text-danger truncate font-heading">
            Docker & CI/CD
          </div>
          <p className="text-xs text-text-muted">2-week roadmap ready</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-xs font-medium text-text-muted">Free AI quota ($0 budget)</span>
          <div className="text-2xl font-normal text-primary font-heading">
            6 / 100
          </div>
          <p className="text-xs text-text-muted">Calls used today • Resets 00:00</p>
        </Card>
      </div>

      {/* Main Grid: Recommended Roles + Market Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Recommended Roles with One-Click Match */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-normal text-text">
                Your highest matching job openings
              </h2>
              <p className="text-xs text-text-muted">
                Calculated deterministically from your resume skills and FYP technologies.
              </p>
            </div>
            <Link to="/jobs">
              <Button variant="ghost" className="text-xs">
                View all ({SAMPLE_ROLES.length}) <ArrowRight className="w-3.5 h-3.5 ml-1" strokeWidth={1.75} />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {topRoles.map((role) => (
              <Card key={role.id} className="p-4 sm:p-5 space-y-3 hover:border-primary/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium text-text">{role.title}</h3>
                      <Badge variant={role.status === 'verified' ? 'success' : 'warning'}>
                        {role.status === 'verified' ? 'Verified' : 'Unverified'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted mt-0.5">
                      <span className="font-medium text-text">{role.companyName}</span>
                      <span>•</span>
                      <span>{role.location}</span>
                      <span>•</span>
                      <span className="text-text font-medium">{role.salaryBandLKR}</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    icon={Target}
                    onClick={() => setSelectedRoleForMatch(role)}
                    className="self-start sm:self-auto text-xs"
                  >
                    Match with my CV
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-text-muted font-medium">Must-haves:</span>
                    {role.requirements.slice(0, 4).map((req, idx) => (
                      <SkillChip key={idx} name={req.skill} status="matched" />
                    ))}
                    {role.requirements.length > 4 && (
                      <span className="text-text-muted text-[11px]">
                        +{role.requirements.length - 4} more
                      </span>
                    )}
                  </div>

                  <span className="text-text-muted shrink-0 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
                    Closes {role.closingDate}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column (1 col): Market Intelligence & Skill Trends */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-normal text-text flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" strokeWidth={1.75} />
              Sri Lankan fresher demand
            </h2>
            <p className="text-xs text-text-muted">
              Aggregated across 30+ verified engineering postings in Colombo.
            </p>
          </div>

          <Card className="p-4 sm:p-5 space-y-3.5">
            {marketTopSkills.map((skill, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-text">{skill.name}</span>
                  <span className="text-text-muted">{skill.percentage}% of roles</span>
                </div>
                <div className="w-full bg-surface-2 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-3 border-t border-border">
              <Button
                variant="secondary"
                icon={Sparkles}
                onClick={() => navigate('/chat')}
                className="w-full text-xs"
              >
                Ask coach what to learn next
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Expandable Phase 0 Architecture & Developer Status Card */}
      <Card className="p-4 sm:p-5 space-y-3">
        <div
          className="flex items-center justify-between cursor-pointer select-none"
          onClick={() => setShowPhase0Details(!showPhase0Details)}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-success shrink-0" strokeWidth={1.75} />
            <div>
              <h3 className="text-sm font-medium text-text">
                Phase 0 foundation &amp; verification details
              </h3>
              <p className="text-xs text-text-muted">
                Monorepo skeleton, Docker Compose, Spring Boot 3 Actuator, and documentation verified.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Badge variant="success">All 8 tasks done</Badge>
            {showPhase0Details ? (
              <ChevronUp className="w-4 h-4" strokeWidth={1.75} />
            ) : (
              <ChevronDown className="w-4 h-4" strokeWidth={1.75} />
            )}
          </div>
        </div>

        {showPhase0Details && (
          <div className="pt-3 border-t border-border space-y-3 text-xs animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-text-muted">
              <div>• Backend health: <code className="text-text">http://localhost:8080/actuator/health (200 OK)</code></div>
              <div>• Database: <code className="text-text">PostgreSQL 16 (Local Docker + Neon Free setup)</code></div>
              <div>• Multi-tenancy: <code className="text-text">Schema-per-user (tenant_user_id)</code></div>
              <div>• UI Tokens: <code className="text-text">ui-rules.md compliant (Hallo Sans / Neutra Text / Light default)</code></div>
            </div>
            <div className="flex justify-end pt-1">
              <Link to="/architecture" className="text-xs text-primary hover:text-primary-hover font-medium">
                Open full architecture &amp; ERD docs →
              </Link>
            </div>
          </div>
        )}
      </Card>

      {/* Modals */}
      <RoleMatchModal
        role={selectedRoleForMatch}
        candidate={candidate}
        isOpen={!!selectedRoleForMatch}
        onClose={() => setSelectedRoleForMatch(null)}
      />

      <JobAnalyzeModal
        isOpen={isAnalyzeModalOpen}
        onClose={() => setIsAnalyzeModalOpen(false)}
      />
    </div>
  );
};
