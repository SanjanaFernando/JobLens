import React, { useState } from 'react';
import { Building2, Search } from 'lucide-react';

export const JobsCatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data demonstrating Sri Lankan engineering companies and roles
  const sampleCompanies = [
    {
      id: '1',
      name: 'WSO2 Sri Lanka',
      type: 'Local Group / Global Tech',
      roles: [
        {
          id: 'r1',
          title: 'Software Engineer - Intern',
          level: 'INTERN',
          discipline: 'SE',
          status: 'VERIFIED',
          mustSkills: ['Java', 'Algorithms', 'OOP', 'Git'],
          niceSkills: ['Ballerina', 'Kubernetes', 'Docker'],
          seenCount: 8,
        },
        {
          id: 'r2',
          title: 'Associate Software Engineer',
          level: 'ASSOCIATE',
          discipline: 'SE',
          status: 'VERIFIED',
          mustSkills: ['Java 17+', 'Spring Boot', 'REST APIs', 'PostgreSQL'],
          niceSkills: ['Microservices', 'GraphQL'],
          seenCount: 5,
        },
      ],
    },
    {
      id: '2',
      name: 'Sysco LABS Sri Lanka',
      type: 'MNC Subsidiary',
      roles: [
        {
          id: 'r3',
          title: 'Associate Quality Assurance Engineer',
          level: 'ASSOCIATE',
          discipline: 'QA',
          status: 'VERIFIED',
          mustSkills: ['Test Automation', 'Selenium', 'Java', 'SQL'],
          niceSkills: ['Cypress', 'Playwright', 'Jira'],
          seenCount: 4,
        },
      ],
    },
    {
      id: '3',
      name: 'CodeGen International',
      type: 'Local Software Exporter',
      roles: [
        {
          id: 'r4',
          title: 'Trainee Software Engineer',
          level: 'INTERN',
          discipline: 'SE',
          status: 'PENDING',
          mustSkills: ['Data Structures', 'C++', 'Java', 'Problem Solving'],
          niceSkills: ['AI / ML Basics', 'Travel Tech'],
          seenCount: 1,
        },
      ],
    },
  ];

  const filtered = sampleCompanies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.roles.some(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-teal-400" />
            Shared Catalog: Company → Role
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global crowd-contributed market data. Stored in public schema, deduplicated by fingerprint.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search company or role..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
          />
        </div>
      </div>

      {/* Catalog List */}
      <div className="space-y-4">
        {filtered.map((company) => (
          <div key={company.id} className="glass-panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-teal-400 text-sm">
                  {company.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">{company.name}</h2>
                  <span className="text-[11px] text-slate-400">{company.type}</span>
                </div>
              </div>
              <span className="text-xs text-slate-400">{company.roles.length} Roles Cataloged</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {company.roles.map((role) => (
                <div key={role.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200">{role.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {role.level}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {role.discipline}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      role.status === 'VERIFIED'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {role.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] font-bold uppercase text-teal-400">MUST:</span>
                      {role.mustSkills.map((s, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-300 text-[11px] border border-teal-500/20">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] font-bold uppercase text-slate-400">NICE:</span>
                      {role.niceSkills.map((s, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                    <span>Submissions: {role.seenCount} independent</span>
                    <span className="text-teal-400 cursor-pointer hover:underline">Match with my CV →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
