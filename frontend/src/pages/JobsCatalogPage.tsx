import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Upload, 
  Info,
  Clock
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SkillChip } from '../components/ui/SkillChip';

export const JobsCatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data adhering to Section 6 Company Card and Job Badge requirements
  const sampleCompanies = [
    {
      id: '1',
      name: 'WSO2 Sri Lanka',
      type: 'Local software exporter',
      age: 'Long-standing (15+ yrs)',
      size: '500-1000 employees',
      isEstimate: false,
      roles: [
        {
          id: 'r1',
          title: 'Software engineer intern',
          level: 'Intern',
          discipline: 'Software engineering',
          status: 'verified' as const,
          closingDate: '30 Oct 2026',
          submissions: 8,
          mustSkills: ['Java', 'Algorithms', 'OOP', 'Git'],
          niceSkills: ['Ballerina', 'Docker'],
        },
        {
          id: 'r2',
          title: 'Associate software engineer',
          level: 'Associate',
          discipline: 'Software engineering',
          status: 'verified' as const,
          closingDate: '15 Nov 2026',
          submissions: 6,
          mustSkills: ['Java 21', 'Spring Boot', 'REST APIs', 'PostgreSQL'],
          niceSkills: ['Kubernetes', 'Microservices'],
        },
      ],
    },
    {
      id: '2',
      name: 'Sysco LABS Sri Lanka',
      type: 'MNC subsidiary',
      age: 'Established (5-15 yrs)',
      size: '1000+ employees',
      isEstimate: false,
      roles: [
        {
          id: 'r3',
          title: 'Associate quality assurance engineer',
          level: 'Associate',
          discipline: 'Quality assurance',
          status: 'verified' as const,
          closingDate: '20 Oct 2026',
          submissions: 4,
          mustSkills: ['Test automation', 'Selenium', 'Java', 'SQL'],
          niceSkills: ['Playwright', 'Cypress'],
        },
      ],
    },
    {
      id: '3',
      name: 'CloudPulse Technologies',
      type: 'Startup',
      age: 'New (< 5 yrs)',
      size: '20-50 employees',
      isEstimate: true, // "AI estimate, please verify" tag required
      roles: [
        {
          id: 'r4',
          title: 'Junior devops engineer',
          level: 'Junior',
          discipline: 'DevOps',
          status: 'unverified' as const,
          closingDate: '12 Nov 2026',
          submissions: 1,
          mustSkills: ['Linux', 'Docker', 'Bash', 'AWS basics'],
          niceSkills: ['Terraform', 'GitHub Actions'],
        },
      ],
    },
  ];

  const filtered = sampleCompanies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.roles.some((r) => r.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-20 md:pb-8">
      {/* Page skeleton: Title + description + primary action at top right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-normal leading-tight text-text">
            Shared job catalog
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Browse crowd-contributed engineering positions cataloged under company and role.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" icon={Upload}>
            Add job description
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 sm:p-4">
        <div className="relative">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company name or role title…"
            className="w-full pl-9 pr-4 h-10 rounded-lg bg-surface-2 border border-border text-sm text-text placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </Card>

      {/* Company & Role List */}
      <div className="space-y-4">
        {filtered.map((company) => (
          <Card key={company.id} className="space-y-4">
            {/* Company Card Header (Section 6) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-medium text-xs">
                  <Building2 className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <h2 className="text-base font-medium text-text">{company.name}</h2>
                <Badge variant="neutral">{company.type}</Badge>
                <Badge variant="neutral">{company.age}</Badge>
                <span className="text-xs text-text-muted">{company.size}</span>
                {company.isEstimate && (
                  <Badge variant="warning" icon={Info}>
                    AI estimate, please verify
                  </Badge>
                )}
              </div>
              <span className="text-xs text-text-muted">
                {company.roles.length} {company.roles.length === 1 ? 'role' : 'roles'}
              </span>
            </div>

            {/* Roles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {company.roles.map((role) => (
                <div key={role.id} className="p-4 rounded-lg bg-surface-2 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-medium text-text">{role.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-text-muted">{role.level}</span>
                        <span className="text-xs text-text-muted">•</span>
                        <span className="text-xs text-text-muted">{role.discipline}</span>
                      </div>
                    </div>
                    {/* Status Badge (Section 2) */}
                    <Badge variant={role.status === 'verified' ? 'success' : 'warning'}>
                      {role.status === 'verified' ? 'Verified' : 'Unverified'}
                    </Badge>
                  </div>

                  {/* Skills (Section 2 & 6) */}
                  <div className="space-y-2">
                    <div>
                      <span className="text-[11px] font-medium text-text-muted block mb-1">Must have:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {role.mustSkills.map((s, idx) => (
                          <SkillChip key={idx} name={s} status="matched" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] font-medium text-text-muted block mb-1">Nice to have:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {role.niceSkills.map((s, idx) => (
                          <SkillChip key={idx} name={s} status="nice-to-have" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
                      Closes {role.closingDate}
                    </span>
                    <span>{role.submissions} submissions</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
