import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { SkillChip } from './ui/SkillChip';

export interface JobAnalyzeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoleAdded?: (newRole: any) => void;
}

export const JobAnalyzeModal: React.FC<JobAnalyzeModalProps> = ({
  isOpen,
  onClose,
  onRoleAdded,
}) => {
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedData, setExtractedData] = useState<any | null>(null);

  if (!isOpen) return null;

  const sampleJDs = [
    {
      title: '99x Trainee Full Stack Engineer',
      text: `99x Colombo is seeking Trainee Full Stack Engineers.
Requirements:
- Bachelor's in Computer Science, Software Engineering or equivalent (2026 graduates welcome).
- Strong foundation in OOP, Data Structures, and JavaScript/TypeScript.
- Experience with React, Node.js, and relational databases (PostgreSQL/MySQL).
- Nice to have: Docker basics, AWS experience, Agile methodology familiarity.
Closing Date: 15 November 2026. Send applications via our careers portal.`,
      company: '99x Technology',
      level: 'INTERN',
      discipline: 'Software engineering',
      must: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'OOP'],
      nice: ['Docker', 'AWS basics', 'Agile'],
    },
    {
      title: 'Axiata Digital Labs Associate QA',
      text: `Axiata Digital Labs (ADL) hiring Associate Quality Assurance Engineers.
Requirements:
- Degree in IT / Computer Science.
- Strong knowledge of software testing lifecycle (STLC) and bug tracking tools.
- Hands-on experience with Java and Selenium test automation.
- API testing experience using Postman.
- Nice to have: JMeter performance testing and Python scripting.
Closing Date: 30 October 2026.`,
      company: 'Axiata Digital Labs',
      level: 'ASSOCIATE',
      discipline: 'Quality assurance',
      must: ['STLC', 'Java', 'Selenium WebDriver', 'Postman'],
      nice: ['JMeter', 'Python'],
    },
  ];

  const handleAnalyze = () => {
    if (!jdText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      // Simulate Gemini structured extraction
      const is99x = jdText.toLowerCase().includes('99x');
      const isADL = jdText.toLowerCase().includes('axiata') || jdText.toLowerCase().includes('adl');

      if (is99x) {
        setExtractedData({
          companyName: '99x Technology',
          title: 'Trainee full stack engineer',
          level: 'INTERN',
          discipline: 'Software engineering',
          location: 'Colombo 03 / Hybrid',
          closingDate: '15 Nov 2026',
          status: 'unverified',
          mustSkills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'OOP concepts'],
          niceSkills: ['Docker', 'AWS basics', 'Agile'],
          fingerprint: '99x_trainee_full_stack_2026_a9b1c2',
        });
      } else if (isADL) {
        setExtractedData({
          companyName: 'Axiata Digital Labs',
          title: 'Associate quality assurance engineer',
          level: 'ASSOCIATE',
          discipline: 'Quality assurance',
          location: 'Colombo 02 / Hybrid',
          closingDate: '30 Oct 2026',
          status: 'unverified',
          mustSkills: ['STLC', 'Java', 'Selenium WebDriver', 'Postman'],
          niceSkills: ['JMeter', 'Python'],
          fingerprint: 'adl_assoc_qa_2026_f4e5d6',
        });
      } else {
        setExtractedData({
          companyName: 'Virtusa Sri Lanka',
          title: 'Associate software engineer',
          level: 'ASSOCIATE',
          discipline: 'Software engineering',
          location: 'Colombo 07 / Hybrid',
          closingDate: '20 Nov 2026',
          status: 'unverified',
          mustSkills: ['Java', 'Spring Boot', 'SQL', 'Data structures'],
          niceSkills: ['Angular', 'Cloud fundamentals'],
          fingerprint: 'virtusa_ase_2026_77c8e9',
        });
      }
    }, 800);
  };

  const handleSave = () => {
    if (extractedData && onRoleAdded) {
      onRoleAdded(extractedData);
    }
    alert(`Successfully contributed "${extractedData.title} at ${extractedData.companyName}" to the shared catalog!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-surface border border-border rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Glassmorphism */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-border/80 sticky top-0 bg-surface/80 backdrop-blur-md z-20 transition-all">
          <div>
            <h2 className="text-xl sm:text-2xl font-normal text-text">
              Extract and add job description
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Paste JD text or screenshot. Requirements are saved to the shared catalog under Company → Role.
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 flex-1">
          {/* Sample JD picker */}
          <div>
            <span className="text-xs font-medium text-text-muted block mb-2">
              Or test with real Sri Lankan fresher job descriptions:
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleJDs.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setJdText(s.text);
                    setExtractedData(null);
                  }}
                  className="h-7 px-3 rounded-lg text-xs font-medium bg-surface-2 text-text hover:bg-primary-soft hover:text-primary border border-border transition-colors text-left"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-2">
            <label htmlFor="jd-textarea" className="block text-sm font-medium text-text">
              Job description text
            </label>
            <textarea
              id="jd-textarea"
              rows={6}
              value={jdText}
              onChange={(e) => {
                setJdText(e.target.value);
                setExtractedData(null);
              }}
              placeholder="Paste raw JD text from LinkedIn, TopJobs, or email notice…"
              className="w-full p-3 rounded-lg bg-surface-2 border border-border text-xs text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary leading-relaxed resize-none"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-text-muted flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-success" strokeWidth={1.75} />
              Contact details and phone numbers are stripped automatically.
            </span>
            <Button
              variant="primary"
              icon={Sparkles}
              isLoading={isAnalyzing}
              onClick={handleAnalyze}
              disabled={!jdText.trim() || isAnalyzing}
            >
              Analyze with Gemini
            </Button>
          </div>

          {/* Extracted preview */}
          {extractedData && (
            <div className="p-4 sm:p-5 rounded-xl border border-success/30 bg-success/5 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" strokeWidth={1.75} />
                  <div>
                    <h3 className="text-base font-medium text-text">
                      {extractedData.title}
                    </h3>
                    <span className="text-xs text-text-muted">
                      {extractedData.companyName} • {extractedData.location}
                    </span>
                  </div>
                </div>
                <Badge variant="warning">Unverified (1st submission)</Badge>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-text block mb-1">Must-have requirements extracted:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {extractedData.mustSkills.map((s: string, idx: number) => (
                      <SkillChip key={idx} name={s} status="matched" />
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-text block mb-1">Nice-to-have requirements extracted:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {extractedData.niceSkills.map((s: string, idx: number) => (
                      <SkillChip key={idx} name={s} status="nice-to-have" />
                    ))}
                  </div>
                </div>

                <div className="pt-2 text-text-muted font-mono text-[11px]">
                  Role fingerprint: {extractedData.fingerprint}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Glassmorphism */}
        <div className="p-4 sm:p-6 border-t border-border/80 flex items-center justify-between bg-surface/80 backdrop-blur-md sticky bottom-0 z-20 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] dark:shadow-[0_-4px_16px_rgba(0,0,0,0.2)]">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          {extractedData && (
            <Button variant="primary" icon={ArrowRight} onClick={handleSave}>
              Save to shared catalog
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
