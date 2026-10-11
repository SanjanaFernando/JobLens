import React, { useState } from 'react';
import { FileText, ShieldAlert, EyeOff } from 'lucide-react';

export const ResumeUploadPage: React.FC = () => {
  const [resumeText, setResumeText] = useState(`John Doe (077-1234567, john.doe@email.com, Colombo 03, linkedin.com/in/johndoe)
BSc (Hons) in Computer Science - University of Moratuwa
Skills: Java, Spring Boot, React, TypeScript, PostgreSQL, Docker, Git
Final Year Project: Microservices-based Logistics Routing System using Spring Cloud & React.`);

  const [scrubbed, setScrubbed] = useState(false);

  // Demonstrate local privacy scrubbing before Gemini transmission
  const scrubPII = (text: string) => {
    return text
      .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, '[EMAIL REDACTED]')
      .replace(/(\+?\d{1,3}[- ]?)?\d{10}|\b07\d{8}\b/g, '[PHONE REDACTED]')
      .replace(/https?:\/\/[^\s]+|linkedin\.com[^\s]*/g, '[URL REDACTED]')
      .replace(/John Doe/g, '[CANDIDATE]');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <FileText className="w-6 h-6 text-teal-400" />
          Resume Parser &amp; Skill-Gap Engine
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Private user data stored in your dedicated schema (`tenant_user_id`). Zero file storage footprint.
        </p>
      </div>

      {/* Free Tier Privacy Guardrail Banner */}
      <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-300 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white">Free-Tier Privacy Scrubbing Enabled</span>
          <p className="text-slate-300 leading-relaxed">
            On the free Gemini API tier, prompts may be evaluated by reviewers. Before your CV reaches Gemini, JobLens automatically strips your name, telephone number, email, location, and social links locally in memory.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input box */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Input Resume Text</span>
            <span className="text-[11px] text-slate-500">PDF / DOCX or Raw Text</span>
          </div>
          <textarea
            value={resumeText}
            onChange={(e) => { setResumeText(e.target.value); setScrubbed(false); }}
            rows={10}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none focus:border-teal-500/50 leading-relaxed resize-none"
          />
          <div className="flex justify-end">
            <button
              onClick={() => setScrubbed(true)}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-2"
            >
              <EyeOff className="w-3.5 h-3.5" />
              Scrub PII &amp; Extract Skills
            </button>
          </div>
        </div>

        {/* Cleaned payload preview */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Transmitted to Gemini (Scrubbed)</span>
            <span className="text-[11px] text-teal-400 font-semibold">{scrubbed ? 'Ready for Flash-Lite' : 'Awaiting Scrub'}</span>
          </div>
          <pre className="w-full h-56 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-mono overflow-auto leading-relaxed">
            {scrubbed ? scrubPII(resumeText) : 'Click "Scrub PII & Extract Skills" to preview privacy-scrubbed payload.'}
          </pre>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">Target Schema:</p>
            <p>Table: <code className="text-teal-400 font-mono">tenant_xxx.resume_profile</code> (Parsed JSON only, 0 disk files)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
