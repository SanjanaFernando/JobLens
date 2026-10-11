import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Target,
  GraduationCap
} from 'lucide-react';

export const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/jobs', label: 'Jobs and roles', icon: Briefcase },
  { to: '/resume', label: 'Resume profile', icon: FileText },
  { to: '/chat', label: 'Career chat', icon: MessageSquare },
  { to: '/architecture', label: 'Architecture and ERD', icon: Target },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex w-60 border-r border-border bg-surface flex-col justify-between p-4 shrink-0">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-xs font-medium text-text-muted mb-2">
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
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-soft text-primary'
                        : 'text-text-muted hover:text-text hover:bg-surface-2'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0" strokeWidth={1.75} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Phase 0 status summary card */}
        <div className="p-4 rounded-xl border border-border bg-surface-2 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-text flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-primary" strokeWidth={1.75} />
              Phase 0 setup
            </span>
            <span className="h-6 px-2.5 rounded-full text-xs font-medium bg-success/15 text-success inline-flex items-center">
              Done
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
            <div className="bg-success h-1.5 rounded-full w-full" />
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            All foundation tasks completed. Ready for phase 1 auth and multi-tenancy.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-border text-xs text-text-muted">
        <span>$0 budget free tier</span>
      </div>
    </aside>
  );
};

export const MobileTabBar: React.FC = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border flex items-center justify-around z-50 px-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 w-14 py-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-text-muted'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" strokeWidth={1.75} />
            <span className="truncate max-w-[52px]">{item.label.split(' ')[0]}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
