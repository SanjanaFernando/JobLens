import React from 'react';
import { Sparkles, ShieldCheck, Database, Layers } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchSystemHealth } from '../api/client';

export const Navbar: React.FC = () => {
  const { data: health, isSuccess, isLoading } = useQuery({
    queryKey: ['systemHealth'],
    queryFn: fetchSystemHealth,
    refetchInterval: 15000,
    retry: 1,
  });

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-teal-500/20">
          <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-teal-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              JobLens
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
              Phase 0 Complete
            </span>
          </div>
          <p className="text-xs text-slate-400">Career Intelligence for Sri Lankan Engineering Graduates</p>
        </div>
      </div>

      {/* Center Status Indicators */}
      <div className="hidden md:flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
          <Layers className="w-3.5 h-3.5 text-teal-400" />
          <span>Spring Boot 3.4 &amp; React 18</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span>Dual DB Architecture</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>$0 Free-Tier Guardrails</span>
        </div>
      </div>

      {/* Backend API Connection Status */}
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
          isLoading
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            : isSuccess
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-500/10'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
        }`}>
          <span className={`w-2 h-2 rounded-full ${
            isLoading ? 'bg-amber-400 animate-pulse' : isSuccess ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
          }`} />
          <span>
            {isLoading ? 'Connecting to Backend...' : isSuccess ? `Backend Active (${health?.aiModelConfigured || 'OK'})` : 'Backend Offline'}
          </span>
        </div>
      </div>
    </header>
  );
};
