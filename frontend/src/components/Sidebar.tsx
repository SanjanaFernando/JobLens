import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  BotMessageSquare, 
  FileCode2, 
  Server,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Overview & Health', icon: LayoutDashboard },
    { to: '/jobs', label: 'Shared Job Catalog', icon: Building2 },
    { to: '/resume', label: 'Resume & Analysis', icon: FileText },
    { to: '/chat', label: 'AI Chat Advisor', icon: BotMessageSquare },
    { to: '/architecture', label: 'Architecture & ERD', icon: FileCode2 },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-950/50 backdrop-blur-md p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Navigation
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/10 text-teal-300 border border-teal-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Phase progress tracker */}
        <div className="p-3.5 rounded-2xl glass-panel space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Phase 0
            </span>
            <span className="text-[11px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
              100% Done
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-400 h-1.5 rounded-full w-full" />
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Skeleton, Docker, Spring Boot 3, React 18, and Architecture docs are ready.
          </p>
        </div>
      </div>

      {/* Stack signature */}
      <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
        <Server className="w-3.5 h-3.5 text-teal-400" />
        <span>PostgreSQL 16 + Flyway + Neon</span>
      </div>
    </aside>
  );
};
