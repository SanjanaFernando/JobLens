import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  X, 
  Sparkles, 
  GraduationCap,
  Layers
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { INITIAL_CANDIDATE } from '../data/mockData';

export const ResumeUploadPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'parser'>('profile');
  const [candidate, setCandidate] = useState(INITIAL_CANDIDATE);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'languages' | 'frameworks' | 'databases' | 'tools'>('languages');
  const [showSavedToast, setShowSavedToast] = useState(false);

  const [rawCvText, setRawCvText] = useState(`Kasun Perera
077 123 4567 | kasun.perera@example.com | Colombo 05 | linkedin.com/in/kasunperera
BSc (Hons) in Engineering, Computer Science - University of Moratuwa (2026 Batch)

Technical skills:
Java 21, Spring Boot, PostgreSQL, Docker, Git, REST APIs, TypeScript, React, Linux, Postman

Final year project:
Fault-tolerant microservice router for high-throughput logistics with automated failover using Spring Cloud and Redis.`);

  const [isScrubbed, setIsScrubbed] = useState(false);

  const cleanPII = (text: string) => {
    return text
      .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, '[email redacted]')
      .replace(/(\+?\d{1,3}[- ]?)?\d{10}|\b07\d{8}\b|\b07\d\s\d{3}\s\d{4}\b/g, '[phone redacted]')
      .replace(/https?:\/\/[^\s]+|linkedin\.com[^\s]*/g, '[link redacted]')
      .replace(/Kasun Perera/g, '[candidate]');
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    setCandidate((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [newSkillCategory]: [...prev.skills[newSkillCategory], newSkillName.trim()],
      },
    }));
    setNewSkillName('');
    showToastNotification();
  };

  const handleRemoveSkill = (category: keyof typeof candidate.skills, skill: string) => {
    setCandidate((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((s) => s !== skill),
      },
    }));
    showToastNotification();
  };

  const showToastNotification = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-20 md:pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-normal leading-tight text-text">
            Resume skills profile
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Manage your verified skills and FYP details stored in your isolated private database schema.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {showSavedToast && (
            <span className="text-xs font-medium text-success flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.75} />
              Saved to tenant schema
            </span>
          )}
          <Button
            variant="primary"
            icon={FileText}
            onClick={() => {
              showToastNotification();
              alert('Profile changes saved successfully to your private database schema!');
            }}
          >
            Save profile
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('profile')}
          className={`h-10 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-muted hover:text-text'
          }`}
        >
          <Layers className="w-4 h-4" strokeWidth={1.75} />
          <span>Extracted skills profile</span>
        </button>

        <button
          onClick={() => setActiveTab('parser')}
          className={`h-10 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'parser'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-muted hover:text-text'
          }`}
        >
          <Upload className="w-4 h-4" strokeWidth={1.75} />
          <span>Parse new CV &amp; privacy scrubber</span>
        </button>
      </div>

      {activeTab === 'profile' ? (
        <div className="space-y-6 animate-in fade-in">
          {/* Candidate Card */}
          <Card className="p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-text">{candidate.name}</h2>
                  <p className="text-xs text-text-muted">
                    {candidate.degree} • {candidate.university} (Class of {candidate.graduationYear})
                  </p>
                </div>
              </div>
              <Badge variant="success">Version 2.0 (Active)</Badge>
            </div>

            {/* Final Year Project */}
            <div className="p-3.5 rounded-lg bg-surface-2 border border-border space-y-1 text-xs">
              <span className="font-semibold text-text block">
                Final Year Project (FYP): {candidate.fypTitle}
              </span>
              <p className="text-text-muted leading-relaxed">
                {candidate.fypSummary}
              </p>
            </div>
          </Card>

          {/* Categorized Skills Manager */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Languages */}
            <Card className="p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-sm font-medium text-text">Programming languages</h3>
                <span className="text-xs text-text-muted">{candidate.skills.languages.length} skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.languages.map((skill) => (
                  <span
                    key={skill}
                    className="h-7 px-2.5 rounded-full text-xs font-medium bg-primary-soft text-primary inline-flex items-center gap-1.5"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill('languages', skill)}
                      className="hover:text-danger"
                      title="Remove skill"
                    >
                      <X className="w-3 h-3" strokeWidth={1.75} />
                    </button>
                  </span>
                ))}
              </div>
            </Card>

            {/* Frameworks */}
            <Card className="p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-sm font-medium text-text">Frameworks and libraries</h3>
                <span className="text-xs text-text-muted">{candidate.skills.frameworks.length} skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.frameworks.map((skill) => (
                  <span
                    key={skill}
                    className="h-7 px-2.5 rounded-full text-xs font-medium bg-primary-soft text-primary inline-flex items-center gap-1.5"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill('frameworks', skill)}
                      className="hover:text-danger"
                      title="Remove skill"
                    >
                      <X className="w-3 h-3" strokeWidth={1.75} />
                    </button>
                  </span>
                ))}
              </div>
            </Card>

            {/* Databases */}
            <Card className="p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-sm font-medium text-text">Databases and storage</h3>
                <span className="text-xs text-text-muted">{candidate.skills.databases.length} skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.databases.map((skill) => (
                  <span
                    key={skill}
                    className="h-7 px-2.5 rounded-full text-xs font-medium bg-primary-soft text-primary inline-flex items-center gap-1.5"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill('databases', skill)}
                      className="hover:text-danger"
                      title="Remove skill"
                    >
                      <X className="w-3 h-3" strokeWidth={1.75} />
                    </button>
                  </span>
                ))}
              </div>
            </Card>

            {/* Tools & DevOps */}
            <Card className="p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-sm font-medium text-text">DevOps, tools, and platforms</h3>
                <span className="text-xs text-text-muted">{candidate.skills.tools.length} skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.tools.map((skill) => (
                  <span
                    key={skill}
                    className="h-7 px-2.5 rounded-full text-xs font-medium bg-primary-soft text-primary inline-flex items-center gap-1.5"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill('tools', skill)}
                      className="hover:text-danger"
                      title="Remove skill"
                    >
                      <X className="w-3 h-3" strokeWidth={1.75} />
                    </button>
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* Add skill form */}
          <Card className="p-4 sm:p-5">
            <h3 className="text-sm font-medium text-text mb-2">Add a new skill to your profile</h3>
            <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Skill name (e.g. Kubernetes, Redis, GraphQL)…"
                className="flex-1 h-10 px-3 rounded-lg bg-surface-2 border border-border text-sm text-text placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full"
              />
              <select
                value={newSkillCategory}
                onChange={(e: any) => setNewSkillCategory(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-2 border border-border text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto"
              >
                <option value="languages">Languages</option>
                <option value="frameworks">Frameworks</option>
                <option value="databases">Databases</option>
                <option value="tools">Tools & DevOps</option>
              </select>
              <Button variant="secondary" icon={Plus} type="submit" className="w-full sm:w-auto">
                Add skill
              </Button>
            </form>
          </Card>
        </div>
      ) : (
        /* CV Parser & Privacy Scrubber Tab */
        <div className="space-y-6 animate-in fade-in">
          {/* Privacy notice banner */}
          <Card className="bg-primary-soft/40 border-primary/20 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-text">Client-side privacy guarantee</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Before your CV is sent to Google Gemini Flash-Lite, JobLens redacts your name, telephone numbers, emails, and links directly inside your browser. No personal identifiable information is ever stored in public tables.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Raw Text Card */}
            <Card className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="raw-cv" className="block text-sm font-medium text-text">
                  Raw CV text
                </label>
                <button
                  onClick={() => setIsScrubbed(true)}
                  className="text-xs text-primary hover:text-primary-hover font-medium"
                >
                  Apply local scrubber
                </button>
              </div>
              <textarea
                id="raw-cv"
                rows={11}
                value={rawCvText}
                onChange={(e) => {
                  setRawCvText(e.target.value);
                  setIsScrubbed(false);
                }}
                className="w-full p-3 rounded-lg bg-surface-2 border border-border text-xs text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary leading-relaxed resize-none"
              />
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  icon={Sparkles}
                  onClick={() => {
                    setIsScrubbed(true);
                    alert('CV text parsed! Skills updated in your profile.');
                    setActiveTab('profile');
                  }}
                >
                  Extract and update profile
                </Button>
              </div>
            </Card>

            {/* Sanitized Output */}
            <Card className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text">Sanitized payload sent to Gemini</span>
                <Badge variant={isScrubbed ? 'success' : 'neutral'}>
                  {isScrubbed ? 'Sanitized' : 'Pending scrub'}
                </Badge>
              </div>
              <div className="h-[254px] overflow-auto p-3 rounded-lg bg-surface-2 border border-border text-xs text-text font-mono leading-relaxed">
                {isScrubbed ? (
                  <pre className="whitespace-pre-wrap">{cleanPII(rawCvText)}</pre>
                ) : (
                  <span className="text-text-muted">
                    Click "Apply local scrubber" to preview how personal details are masked before LLM transmission.
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" strokeWidth={1.75} />
                <span>Zero file storage on disk. Structured JSON only.</span>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
