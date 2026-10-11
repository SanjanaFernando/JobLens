import React from 'react';
import { X, GraduationCap, Lightbulb, BookOpen, ExternalLink, MessageSquare, Briefcase } from 'lucide-react';
import { JobRole, CandidateProfile, computeRoleMatch } from '../data/mockData';
import { ScoreGauge } from './ui/ScoreGauge';
import { SkillChip } from './ui/SkillChip';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

export interface RoleMatchModalProps {
  role: JobRole | null;
  candidate: CandidateProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const RoleMatchModal: React.FC<RoleMatchModalProps> = ({
  role,
  candidate,
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = React.useState(false);

  if (!isOpen || !role) return null;

  const result = computeRoleMatch(candidate, role);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 8);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        onScroll={handleScroll}
        className="bg-surface border border-border rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Glassmorphism */}
        <div className={`flex items-start justify-between p-4 sm:p-6 border-b sticky top-0 z-20 backdrop-blur-md transition-all duration-200 ${
          isScrolled 
            ? 'bg-surface/80 border-border/80 shadow-sm' 
            : 'bg-surface/85 border-border'
        }`}>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <Badge variant="primary">{role.companyName}</Badge>
              <Badge variant={role.status === 'verified' ? 'success' : 'warning'}>
                {role.status === 'verified' ? 'Verified role' : 'Unverified'}
              </Badge>
              <span className="text-xs text-text-muted">{role.location}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-normal text-text">
              {role.title}
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Benchmark salary: <span className="font-medium text-text">{role.salaryBandLKR}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 space-y-6 flex-1">
          {/* Match Score Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-4 rounded-xl bg-surface-2 border border-border">
            <div className="flex flex-col items-center justify-center">
              <ScoreGauge score={result.score} size={110} />
            </div>
            <div className="md:col-span-2 space-y-2 text-xs sm:text-sm">
              <h3 className="text-base font-medium text-text">
                Candidate: {candidate.name}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {candidate.degree} — {candidate.university} ({candidate.graduationYear})
              </p>
              <p className="text-text font-medium pt-1">
                You match {result.matchedSkills.length} of {role.requirements.length} requirements.
              </p>
            </div>
          </div>

          {/* Skill Breakdown */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-medium text-text-muted block mb-2">
                Matched skills you have:
              </span>
              <div className="flex flex-wrap gap-2">
                {result.matchedSkills.length > 0 ? (
                  result.matchedSkills.map((s, idx) => (
                    <SkillChip key={idx} name={s} status="matched" />
                  ))
                ) : (
                  <span className="text-xs text-text-muted">None matched yet.</span>
                )}
              </div>
            </div>

            {result.missingMustSkills.length > 0 && (
              <div>
                <span className="text-xs font-medium text-danger block mb-2">
                  Missing must-have skills:
                </span>
                <div className="flex flex-wrap gap-2">
                  {result.missingMustSkills.map((s, idx) => (
                    <SkillChip key={idx} name={s} status="missing" />
                  ))}
                </div>
              </div>
            )}

            {result.missingNiceSkills.length > 0 && (
              <div>
                <span className="text-xs font-medium text-text-muted block mb-2">
                  Missing nice-to-have skills:
                </span>
                <div className="flex flex-wrap gap-2">
                  {result.missingNiceSkills.map((s, idx) => (
                    <SkillChip key={idx} name={s} status="nice-to-have" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2-Week Actionable Learning Roadmap */}
          <div className="p-4 sm:p-5 rounded-xl border border-primary/20 bg-primary-soft/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" strokeWidth={1.75} />
                <h3 className="text-sm font-medium text-text">
                  Action plan for {result.learningPlan.skill}
                </h3>
              </div>
              <span className="text-xs font-medium text-primary">
                {result.learningPlan.weeks}
              </span>
            </div>

            {/* Step-by-step roadmap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {result.learningPlan.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-surface border border-border space-y-1">
                  <span className="font-semibold text-primary block">{step.day}</span>
                  <p className="text-text leading-relaxed">{step.task}</p>
                </div>
              ))}
            </div>

            {/* Free resources */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-medium text-text flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
                Curated free resources:
              </span>
              <div className="flex flex-wrap gap-2">
                {result.learningPlan.freeResources.map((res, idx) => (
                  <span
                    key={idx}
                    className="h-6 px-2.5 rounded-full text-xs font-medium bg-surface border border-border inline-flex items-center gap-1 text-text hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{res.name}</span>
                    <ExternalLink className="w-3 h-3 text-text-muted" strokeWidth={1.75} />
                  </span>
                ))}
              </div>
            </div>

            {/* CV Tip */}
            <div className="p-3 rounded-lg bg-surface border border-border text-xs text-text flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-warning shrink-0 mt-0.5" strokeWidth={1.75} />
              <span>{result.learningPlan.cvTip}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions with Glassmorphism */}
        <div className="p-4 sm:p-6 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface/80 backdrop-blur-md sticky bottom-0 z-20 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] dark:shadow-[0_-4px_16px_rgba(0,0,0,0.2)]">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="secondary"
              icon={MessageSquare}
              onClick={() => {
                onClose();
                navigate('/chat');
              }}
              className="flex-1 sm:flex-initial"
            >
              Ask coach about this role
            </Button>
            <Button
              variant="primary"
              icon={Briefcase}
              onClick={() => {
                alert(`Role "${role.title} at ${role.companyName}" saved to your private database!`);
                onClose();
              }}
              className="flex-1 sm:flex-initial"
            >
              Save role
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
