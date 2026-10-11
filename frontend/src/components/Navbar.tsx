import React, { useState, useEffect } from 'react';
import { Target, Sun, Moon, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchSystemHealth } from '../api/client';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: health, isSuccess, isLoading } = useQuery({
    queryKey: ['systemHealth'],
    queryFn: fetchSystemHealth,
    refetchInterval: 15000,
    retry: 1,
  });

  return (
    <header className={`h-16 border-b sticky top-0 z-50 px-4 sm:px-6 flex items-center justify-between transition-all duration-200 backdrop-blur-md ${
      isScrolled 
        ? 'bg-surface/80 border-border/80 shadow-sm' 
        : 'bg-surface/90 border-border'
    }`}>
      {/* Brand logo & name */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0">
          <Target className="w-5 h-5" strokeWidth={1.75} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-normal text-text tracking-tight">
              JobLens
            </span>
            <span className="h-6 px-2.5 rounded-full text-xs font-medium bg-primary-soft text-primary inline-flex items-center">
              Phase 0
            </span>
          </div>
          <p className="text-xs text-text-muted hidden sm:block">
            Career intelligence for Sri Lankan fresh engineering graduates
          </p>
        </div>
      </div>

      {/* Right controls: Status indicator + Theme toggle */}
      <div className="flex items-center gap-3">
        {/* Connection status badge (Section 2 & 6) */}
        <div
          className={`h-6 px-2.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5 border ${
            isLoading
              ? 'bg-warning/15 text-warning border-warning/30'
              : isSuccess
              ? 'bg-success/15 text-success border-success/30'
              : 'bg-danger/15 text-danger border-danger/30'
          }`}
        >
          {isLoading ? (
            <AlertTriangle className="w-3.5 h-3.5" strokeWidth={1.75} />
          ) : isSuccess ? (
            <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.75} />
          ) : (
            <XCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
          )}
          <span className="hidden sm:inline">
            {isLoading
              ? 'Connecting…'
              : isSuccess
              ? `Backend active (${health?.aiModelConfigured || 'OK'})`
              : 'Backend offline'}
          </span>
          <span className="sm:hidden">
            {isSuccess ? 'Active' : 'Offline'}
          </span>
        </div>

        {/* Theme toggle button (Section 2) */}
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="h-10 w-10 rounded-lg flex items-center justify-center text-text-muted hover:text-text hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" strokeWidth={1.75} />
          ) : (
            <Moon className="w-5 h-5" strokeWidth={1.75} />
          )}
        </button>
      </div>
    </header>
  );
};
