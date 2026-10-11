import React, { useState } from 'react';
import { 
  Search, 
  Upload, 
  Clock, 
  Target, 
  Briefcase,
  SlidersHorizontal
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SkillChip } from '../components/ui/SkillChip';
import { SAMPLE_ROLES, INITIAL_CANDIDATE, JobRole } from '../data/mockData';
import { RoleMatchModal } from '../components/RoleMatchModal';
import { JobAnalyzeModal } from '../components/JobAnalyzeModal';

export const JobsCatalogPage: React.FC = () => {
  const [roles, setRoles] = useState<JobRole[]>(SAMPLE_ROLES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [candidate] = useState(INITIAL_CANDIDATE);
  const [matchModalRole, setMatchModalRole] = useState<JobRole | null>(null);
  const [isAnalyzeModalOpen, setIsAnalyzeModalOpen] = useState(false);

  const disciplines = ['All', 'Software engineering', 'Quality assurance', 'DevOps', 'Data engineering'];
  const levels = ['All', 'INTERN', 'ASSOCIATE', 'JUNIOR'];

  const filteredRoles = roles.filter((role) => {
    const matchesSearch =
      role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.requirements.some((r) => r.skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDiscipline = selectedDiscipline === 'All' || role.discipline === selectedDiscipline;
    const matchesLevel = selectedLevel === 'All' || role.level === selectedLevel;

    return matchesSearch && matchesDiscipline && matchesLevel;
  });

  const handleRoleAdded = (newRoleData: any) => {
    const newRole: JobRole = {
      id: `role-${Date.now()}`,
      companyId: `c-${Date.now()}`,
      companyName: newRoleData.companyName,
      companyType: 'Crowd submission',
      companyAge: 'New entry',
      companySize: 'Unspecified',
      title: newRoleData.title,
      level: newRoleData.level,
      discipline: newRoleData.discipline,
      location: newRoleData.location,
      salaryBandLKR: 'Benchmark Pending',
      closingDate: newRoleData.closingDate,
      status: 'unverified',
      seenCount: 1,
      description: 'Extracted via JobLens multimodal engine.',
      requirements: newRoleData.mustSkills.map((s: string) => ({
        skill: s,
        normalizedSkill: s.toLowerCase(),
        type: 'MUST' as const,
        category: 'TECH' as const,
      })),
    };
    setRoles([newRole, ...roles]);
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-20 md:pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-normal leading-tight text-text">
            Shared job catalog
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Explore and match Sri Lankan tech requirements categorized under Company → Role.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            icon={Upload}
            onClick={() => setIsAnalyzeModalOpen(true)}
          >
            Add job description
          </Button>
        </div>
      </div>

      {/* Search and Filters Card */}
      <Card className="p-4 sm:p-5 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company, title, or required skill (e.g. Java, Docker, QA)…"
            className="w-full pl-9 pr-4 h-10 rounded-lg bg-surface-2 border border-border text-sm text-text placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-border">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-text-muted font-medium mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.75} />
              Discipline:
            </span>
            {disciplines.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDiscipline(d)}
                className={`h-6 px-2.5 rounded-full text-xs font-medium transition-colors ${
                  selectedDiscipline === d
                    ? 'bg-primary text-white'
                    : 'bg-surface-2 text-text-muted hover:text-text'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-text-muted font-medium mr-1">Level:</span>
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`h-6 px-2.5 rounded-full text-xs font-medium transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-primary text-white'
                    : 'bg-surface-2 text-text-muted hover:text-text'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Roles List */}
      <div className="space-y-4">
        {filteredRoles.length > 0 ? (
          filteredRoles.map((role) => (
            <Card key={role.id} className="p-4 sm:p-6 space-y-4 hover:border-primary/40 transition-colors">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-border pb-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-primary">{role.companyName}</span>
                    <Badge variant="neutral">{role.companyType}</Badge>
                    <Badge variant={role.status === 'verified' ? 'success' : 'warning'}>
                      {role.status === 'verified' ? 'Verified' : 'Unverified'}
                    </Badge>
                    {role.isAiEstimate && (
                      <Badge variant="warning">AI estimate, please verify</Badge>
                    )}
                  </div>
                  <h2 className="text-lg font-medium text-text">{role.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
                    <span>{role.level}</span>
                    <span>•</span>
                    <span>{role.discipline}</span>
                    <span>•</span>
                    <span>{role.location}</span>
                    <span>•</span>
                    <span className="text-text font-medium">{role.salaryBandLKR}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="primary"
                    icon={Target}
                    onClick={() => setMatchModalRole(role)}
                    className="text-xs"
                  >
                    Match with my CV
                  </Button>
                </div>
              </div>

              {/* Requirements Chips */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-xs font-semibold text-text-muted mr-1">Must have:</span>
                  {role.requirements
                    .filter((r) => r.type === 'MUST')
                    .map((req, idx) => (
                      <SkillChip key={idx} name={req.skill} status="matched" />
                    ))}
                </div>

                {role.requirements.some((r) => r.type === 'NICE') && (
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-xs font-medium text-text-muted mr-1">Nice to have:</span>
                    {role.requirements
                      .filter((r) => r.type === 'NICE')
                      .map((req, idx) => (
                        <SkillChip key={idx} name={req.skill} status="nice-to-have" />
                      ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-text-muted pt-2 border-t border-border">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
                  Closing date: {role.closingDate}
                </span>
                <span className="flex items-center gap-3">
                  <span>{role.seenCount} submissions recorded</span>
                  <button 
                    onClick={() => alert(`Reported role "${role.title}". Thank you for keeping the catalog clean!`)}
                    className="hover:text-danger transition-colors"
                  >
                    Report inaccuracy
                  </button>
                </span>
              </div>
            </Card>
          ))
        ) : (
          <div className="p-8 text-center bg-surface border border-border rounded-xl space-y-3">
            <Briefcase className="w-8 h-8 text-text-muted mx-auto" strokeWidth={1.75} />
            <h3 className="text-base font-medium text-text">No matching roles found</h3>
            <p className="text-sm text-text-muted max-w-sm mx-auto">
              Try adjusting your search terms or filters, or add a new job description to the catalog.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                icon={Upload}
                onClick={() => setIsAnalyzeModalOpen(true)}
              >
                Add job description
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <RoleMatchModal
        role={matchModalRole}
        candidate={candidate}
        isOpen={!!matchModalRole}
        onClose={() => setMatchModalRole(null)}
      />

      <JobAnalyzeModal
        isOpen={isAnalyzeModalOpen}
        onClose={() => setIsAnalyzeModalOpen(false)}
        onRoleAdded={handleRoleAdded}
      />
    </div>
  );
};
