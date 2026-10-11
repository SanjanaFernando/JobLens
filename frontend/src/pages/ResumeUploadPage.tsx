import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const ResumeUploadPage: React.FC = () => {
  const [resumeText, setResumeText] = useState(`Kasun Perera
077 123 4567 | kasun.perera@example.com | Colombo 05 | linkedin.com/in/kasunperera
BSc (Hons) in Engineering, Computer Science - University of Moratuwa

Technical skills:
Java 21, Spring Boot, PostgreSQL, Docker, Git, REST APIs, TypeScript, React

Final year project:
Microservices routing engine for intercity logistics in Sri Lanka with automated failover.`);

  const [isCleaned, setIsCleaned] = useState(false);

  const cleanPII = (text: string) => {
    return text
      .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, '[email redacted]')
      .replace(/(\+?\d{1,3}[- ]?)?\d{10}|\b07\d{8}\b|\b07\d\s\d{3}\s\d{4}\b/g, '[phone redacted]')
      .replace(/https?:\/\/[^\s]+|linkedin\.com[^\s]*/g, '[link redacted]')
      .replace(/Kasun Perera/g, '[candidate]');
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-20 md:pb-8">
      {/* Page skeleton: Title + description + primary action at top right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-normal leading-tight text-text">
            Resume profile and privacy
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Upload your resume once to generate your skill profile. No files are stored permanently on disk.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" icon={Upload} onClick={() => setIsCleaned(true)}>
            Extract skills profile
          </Button>
        </div>
      </div>

      {/* Privacy Notice Card (Section 2 Info token + Section 9 Writing Style) */}
      <Card className="bg-primary-soft/50 border-primary/20 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-text">Your privacy on the free Gemini tier</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Google free tiers may review raw prompts. To protect your data, JobLens automatically strips your name, phone number, email address, and links locally in your browser before sending text to the AI model.
            </p>
          </div>
        </div>
      </Card>

      {/* Editor & Scrubbed Payload Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Card */}
        <Card className="space-y-4">
          <div>
            <label htmlFor="resume-input" className="block text-sm font-medium text-text mb-1">
              Resume text or paste
            </label>
            <p className="text-xs text-text-muted mb-2">
              Paste your resume or CV summary below.
            </p>
            <textarea
              id="resume-input"
              rows={12}
              value={resumeText}
              onChange={(e) => {
                setResumeText(e.target.value);
                setIsCleaned(false);
              }}
              className="w-full p-3 rounded-lg bg-surface-2 border border-border text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary leading-relaxed resize-none"
            />
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-text-muted">
              Destination: private schema (tenant_user_id)
            </span>
            <Button variant="secondary" icon={FileText} onClick={() => setIsCleaned(true)}>
              Preview cleaned text
            </Button>
          </div>
        </Card>

        {/* Cleaned Output Card */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div>
              <h3 className="text-sm font-medium text-text">Transmitted to Gemini Flash-Lite</h3>
              <p className="text-xs text-text-muted">
                Sanitized payload stripped of personal identifiable information.
              </p>
            </div>
            <Badge variant={isCleaned ? 'success' : 'neutral'}>
              {isCleaned ? 'Sanitized' : 'Awaiting scrub'}
            </Badge>
          </div>

          <div className="h-[288px] overflow-auto p-3 rounded-lg bg-surface-2 border border-border text-xs text-text font-mono leading-relaxed">
            {isCleaned ? (
              <pre className="whitespace-pre-wrap">{cleanPII(resumeText)}</pre>
            ) : (
              <span className="text-text-muted">
                Click "Preview cleaned text" or "Extract skills profile" to inspect the sanitized version.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-text-muted">
            <CheckCircle2 className="w-4 h-4 text-success shrink-0" strokeWidth={1.75} />
            <span>Structured JSON output saved only in your private database.</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
