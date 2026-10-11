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
      text: 'Hello Kasun! I am your JobLens career coach. I analyze your private skills profile alongside verified Sri Lankan engineering requirements to guide your preparation. What would you like to explore today?',
      tools: ['initTenantContext(tenantId="usr_moratuwa_2026")'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = [
    'What are my top missing skills for associate roles?',
    'What do Sri Lankan tech companies ask for in QA roles?',
    'How do I prepare for a WSO2 software engineering interview?',
    'Create a 2-week learning plan for Docker and CI/CD.',
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
      let replyText = '';
      let toolsCalled: string[] = [];

      const queryLower = userText.toLowerCase();

      if (queryLower.includes('qa') || queryLower.includes('quality')) {
        replyText = `AI suggestion: In Sri Lanka, companies like Sysco LABS and Axiata Digital Labs typically require:
• Core Language: Java or Python for automation scripting
• Frameworks: Selenium WebDriver (highest demand) and Playwright (growing rapidly)
• API Testing: Postman and REST Assured
• Database: SQL queries and test data preparation

Since your resume already highlights Java and REST APIs, you are already 60% qualified! Learning Selenium and writing an automated test suite for an open-source demo will make you interview-ready.`;
        toolsCalled = ['getRolesByDiscipline("Quality assurance")', 'getMyResumeSkills()'];
      } else if (queryLower.includes('wso2')) {
        replyText = `AI suggestion: For Associate Software Engineer roles at WSO2 Sri Lanka:
1. Data Structures & Algorithms: Strong emphasis on trees, graphs, sorting, and algorithmic complexity (LeetCode Medium).
2. Deep Java Understanding: Concurrency, multithreading, memory model, and JVM fundamentals.
3. System Design Basics: How HTTP, REST, and distributed communication work.
4. Final Year Project: Be ready to explain your microservice router architecture, bottlenecks faced, and why you chose Spring Cloud.`;
        toolsCalled = ['getCompanyProfile("WSO2")', 'getRequirements("WSO2", "Associate software engineer")'];
      } else if (queryLower.includes('docker') || queryLower.includes('plan')) {
        replyText = `AI suggestion: Here is your 2-Week Docker & CI/CD Action Plan:
• Week 1 (Days 1–5): Containerize your Spring Boot & React university FYP. Write multi-stage Dockerfiles to minimize image size below 150MB.
• Week 1 (Days 6–7): Orchestrate services locally using Docker Compose with PostgreSQL and Redis.
• Week 2 (Days 8–11): Write a GitHub Actions workflow that automatically builds images and runs tests on push.
• Week 2 (Days 12–14): CV phrasing: "Containerized 3-tier microservice using Docker Compose and established automated GitHub Actions CI pipeline."`;
        toolsCalled = ['getMyLearningPlan("Docker")', 'getMyTopMissingSkills()'];
      } else {
        replyText = `AI suggestion: Based on your saved roles across WSO2, Sysco LABS, and IFS:
• You match 78% of core requirements (Java, Spring Boot, PostgreSQL, Git).
• Your top missing skills are Docker, Kubernetes, and automated test pipelines.
• Recommendation: Focus on containerizing your Final Year Project this week to bridge the remaining 22% gap.`;
        toolsCalled = ['getMyTopMissingSkills(discipline="Software engineering")', 'getMySavedRoles()'];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: replyText,
          tools: toolsCalled,
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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-3 shrink-0">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-normal leading-tight text-text">
            Career coach chat
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            Grounded in your private resume database and verified shared company roles.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" icon={RotateCcw} onClick={handleClear}>
            Clear conversation
          </Button>
        </div>
      </div>

      {/* Safety Notice Badge */}
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

      {/* Message History */}
      <div className="flex-1 overflow-y-auto space-y-3.5 p-4 sm:p-5 rounded-xl border border-border bg-surface">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[80%] rounded-xl p-4 text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-primary-soft text-text border border-primary/20'
                  : 'bg-surface border border-border text-text'
              }`}
            >
              <p className="whitespace-pre-line">{m.text}</p>

              {m.tools && m.tools.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-border/80 text-[11px] text-text-muted flex items-center gap-1.5 font-mono">
                  <Target className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
                  <span>Tool call: {m.tools.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-text-muted p-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>JobLens is consulting your career data…</span>
          </div>
        )}
      </div>

      {/* Suggested question chips + Input field */}
      <div className="space-y-2.5 shrink-0">
        <div className="flex flex-wrap gap-1.5">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setInput(q)}
              className="h-6 px-2.5 rounded-full text-xs font-medium bg-surface-2 text-text-muted hover:text-text border border-border transition-colors truncate max-w-sm text-left"
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
            placeholder="Ask about your skill gaps, Sri Lankan fresher roles, or interview advice…"
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
