import React, { useState } from 'react';
import { 
  Send, 
  ShieldCheck, 
  RotateCcw,
  Target
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface ChatMsg {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  tools?: string[];
}

export const ChatAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hello Kasun! I am your JobLens career coach. I answer questions using your private resume and analyses, plus the shared role catalog. What would you like to explore today?',
      tools: ['initTenantContext'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = [
    'What are my top missing skills for associate roles?',
    'Show me companies actively hiring for QA in Colombo.',
    'Create a 2-week learning plan for Docker.',
  ];

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userText = input;
    setInput('');

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: userText,
        tools: [],
      },
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'AI suggestion: Based on your saved roles at WSO2 and Sysco LABS, Docker and CI/CD are your highest priority missing skills. Both appear in 75% of your target roles. Would you like to generate a step-by-step learning roadmap for Docker?',
          tools: ['getMyTopMissingSkills(discipline="Software engineering")'],
        },
      ]);
    }, 700);
  };

  const handleClear = () => {
    setMessages([
      {
        id: '1',
        sender: 'assistant',
        text: 'Conversation cleared. How can I assist you with your career goals?',
        tools: [],
      },
    ]);
  };

  return (
    <div className="space-y-4 max-w-[1000px] mx-auto pb-20 md:pb-8 flex flex-col h-[calc(100vh-140px)]">
      {/* Page skeleton: Title + description + action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-3 shrink-0">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-normal leading-tight text-text">
            Career coach chat
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            Grounded in your private database and verified shared company roles.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" icon={RotateCcw} onClick={handleClear}>
            Clear conversation
          </Button>
        </div>
      </div>

      {/* Safety Notice Badge (Section 9 & Section 2) */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted shrink-0">
        <Badge variant="success" icon={ShieldCheck}>
          Read-only tools
        </Badge>
        <Badge variant="info">
          Tenant schema isolated
        </Badge>
        <span className="text-text-muted">
          Model cannot access data belonging to another student.
        </span>
      </div>

      {/* Message History Area (Section 6: User right in primary-soft, Assistant left in surface) */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4 rounded-xl border border-border bg-surface">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-xl p-3.5 text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-primary-soft text-text'
                  : 'bg-surface border border-border text-text'
              }`}
            >
              <p>{m.text}</p>

              {m.tools && m.tools.length > 0 && (
                <div className="mt-2 pt-2 border-t border-border/80 text-[11px] text-text-muted flex items-center gap-1.5 font-mono">
                  <Target className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
                  <span>Tool call: {m.tools.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator (Section 6) */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-text-muted p-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>JobLens is thinking…</span>
          </div>
        )}
      </div>

      {/* Bottom Area: Suggested question chips + Input field */}
      <div className="space-y-3 shrink-0">
        {/* Suggested questions chips (Section 6) */}
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setInput(q)}
              className="h-6 px-2.5 rounded-full text-xs font-medium bg-surface-2 text-text-muted hover:text-text border border-border transition-colors truncate max-w-xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your skill gaps, Sri Lankan fresher roles, or learning roadmaps…"
            className="flex-1 h-10 px-3 rounded-lg bg-surface border border-border text-sm text-text placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <Button variant="primary" icon={Send} onClick={handleSend} disabled={isTyping || !input.trim()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
