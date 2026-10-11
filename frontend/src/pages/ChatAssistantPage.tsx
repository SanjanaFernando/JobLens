import React, { useState } from 'react';
import { BotMessageSquare, Send, ShieldCheck, Database, Wrench, Lock } from 'lucide-react';

export const ChatAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am your JobLens Career Advisor. I have read-only access strictly to your private schema (analyses, learning plans, resume) and the shared public role catalog. How can I help you today?',
      toolsUsed: ['initTenantContext'],
    },
  ]);
  const [input, setInput] = useState('');

  const sampleQuestions = [
    'What are my top missing skills across all saved jobs?',
    'What do Sri Lankan tech companies require most for QA roles?',
    'Explain my 2-week learning plan for Docker.',
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input, toolsUsed: [] };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `[Gemini Function Call Simulator] Evaluated user request. In Phase 6, Gemini will execute function calls (e.g. getMyTopMissingSkills) dynamically with tenant context derived exclusively from your verified JWT.`,
          toolsUsed: ['getMyTopMissingSkills(discipline="SE")'],
        },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)]">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <BotMessageSquare className="w-6 h-6 text-teal-400" />
          AI Career Advisor (Gemini Function Calling)
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Grounded solely in your private tenant data and public market stats. Model cannot access another user's database.
        </p>
      </div>

      {/* Security Architecture Tag */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
          <Lock className="w-3.5 h-3.5 text-teal-400" />
          Read-Only Tools Only
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          Tenant Injected From JWT (Never Model Arg)
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          Prompt-Injection Guardrails
        </span>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 glass-panel rounded-2xl p-6 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-teal-500 text-slate-950 font-medium'
                  : 'bg-slate-900 border border-slate-800 text-slate-200'
              }`}
            >
              <p>{m.content}</p>
              {m.toolsUsed && m.toolsUsed.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center gap-2 text-[10px] text-teal-400 font-mono">
                  <Wrench className="w-3 h-3" />
                  <span>Tools: {m.toolsUsed.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested prompts & input bar */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setInput(q)}
              className="text-[11px] px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all text-left"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Sri Lankan fresher roles, missing skills, or interview tips..."
            className="flex-1 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
          />
          <button
            onClick={handleSend}
            className="px-5 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-teal-500/20"
          >
            <Send className="w-3.5 h-3.5" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
