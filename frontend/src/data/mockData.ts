export interface RoleRequirement {
  skill: string;
  normalizedSkill: string;
  type: 'MUST' | 'NICE';
  category: 'TECH' | 'TOOL' | 'SOFT' | 'EDU';
}

export interface JobRole {
  id: string;
  companyId: string;
  companyName: string;
  companyType: string;
  companyAge: string;
  companySize: string;
  isAiEstimate?: boolean;
  title: string;
  level: 'INTERN' | 'ASSOCIATE' | 'JUNIOR';
  discipline: 'Software engineering' | 'Quality assurance' | 'DevOps' | 'Data engineering';
  location: string;
  salaryBandLKR: string;
  closingDate: string;
  status: 'verified' | 'unverified' | 'expired';
  seenCount: number;
  requirements: RoleRequirement[];
  description: string;
}

export interface CandidateProfile {
  name: string;
  degree: string;
  university: string;
  graduationYear: number;
  skills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
  };
  fypTitle: string;
  fypSummary: string;
}

export const INITIAL_CANDIDATE: CandidateProfile = {
  name: 'Kasun Perera',
  degree: 'BSc (Hons) in Engineering, Computer Science',
  university: 'University of Moratuwa',
  graduationYear: 2026,
  skills: {
    languages: ['Java', 'TypeScript', 'SQL', 'Python'],
    frameworks: ['Spring Boot', 'React', 'Node.js'],
    databases: ['PostgreSQL', 'MySQL'],
    tools: ['Git', 'Docker', 'Linux', 'REST APIs', 'Postman'],
  },
  fypTitle: 'Fault-tolerant microservice router for high-throughput logistics',
  fypSummary: 'Engineered an event-driven router using Spring Cloud, Kafka, and Redis caching with sub-50ms failover.',
};

export const SAMPLE_ROLES: JobRole[] = [
  {
    id: 'wso2-ase-2026',
    companyId: 'c-wso2',
    companyName: 'WSO2 Sri Lanka',
    companyType: 'Local tech exporter',
    companyAge: 'Long-standing (15+ yrs)',
    companySize: '500-1000 employees',
    isAiEstimate: false,
    title: 'Associate software engineer',
    level: 'ASSOCIATE',
    discipline: 'Software engineering',
    location: 'Colombo 03 / Hybrid',
    salaryBandLKR: 'LKR 160,000 - 220,000',
    closingDate: '30 Oct 2026',
    status: 'verified',
    seenCount: 14,
    description: 'Join our Open Source Integration and API Management engineering teams developing high-performance middleware.',
    requirements: [
      { skill: 'Java', normalizedSkill: 'java', type: 'MUST', category: 'TECH' },
      { skill: 'Data structures & algorithms', normalizedSkill: 'algorithms', type: 'MUST', category: 'TECH' },
      { skill: 'Spring Boot', normalizedSkill: 'spring boot', type: 'MUST', category: 'TECH' },
      { skill: 'REST APIs', normalizedSkill: 'rest apis', type: 'MUST', category: 'TECH' },
      { skill: 'PostgreSQL', normalizedSkill: 'postgresql', type: 'MUST', category: 'TECH' },
      { skill: 'Git', normalizedSkill: 'git', type: 'MUST', category: 'TOOL' },
      { skill: 'Docker', normalizedSkill: 'docker', type: 'MUST', category: 'TOOL' },
      { skill: 'Kubernetes', normalizedSkill: 'kubernetes', type: 'NICE', category: 'TOOL' },
      { skill: 'Microservices', normalizedSkill: 'microservices', type: 'NICE', category: 'TECH' },
      { skill: 'Kafka', normalizedSkill: 'kafka', type: 'NICE', category: 'TECH' },
    ],
  },
  {
    id: 'sysco-aqa-2026',
    companyId: 'c-sysco',
    companyName: 'Sysco LABS Sri Lanka',
    companyType: 'MNC subsidiary',
    companyAge: 'Established (5-15 yrs)',
    companySize: '1000+ employees',
    isAiEstimate: false,
    title: 'Associate quality assurance engineer',
    level: 'ASSOCIATE',
    discipline: 'Quality assurance',
    location: 'Colombo 02 / Hybrid',
    salaryBandLKR: 'LKR 150,000 - 200,000',
    closingDate: '25 Oct 2026',
    status: 'verified',
    seenCount: 9,
    description: 'Work on enterprise foodservice inventory testing, test automation frameworks, and CI/CD quality gates.',
    requirements: [
      { skill: 'Test automation', normalizedSkill: 'test automation', type: 'MUST', category: 'TECH' },
      { skill: 'Java', normalizedSkill: 'java', type: 'MUST', category: 'TECH' },
      { skill: 'Selenium WebDriver', normalizedSkill: 'selenium', type: 'MUST', category: 'TOOL' },
      { skill: 'SQL', normalizedSkill: 'sql', type: 'MUST', category: 'TECH' },
      { skill: 'Git', normalizedSkill: 'git', type: 'MUST', category: 'TOOL' },
      { skill: 'Playwright', normalizedSkill: 'playwright', type: 'NICE', category: 'TOOL' },
      { skill: 'Postman', normalizedSkill: 'postman', type: 'NICE', category: 'TOOL' },
      { skill: 'CI/CD Pipelines', normalizedSkill: 'ci/cd', type: 'NICE', category: 'TOOL' },
    ],
  },
  {
    id: 'ifs-se-intern-2026',
    companyId: 'c-ifs',
    companyName: 'IFS Sri Lanka',
    companyType: 'MNC subsidiary',
    companyAge: 'Long-standing (15+ yrs)',
    companySize: '1000+ employees',
    isAiEstimate: false,
    title: 'Software engineer intern',
    level: 'INTERN',
    discipline: 'Software engineering',
    location: 'Colombo 03 / On-site',
    salaryBandLKR: 'LKR 60,000 - 85,000 (Stipend)',
    closingDate: '15 Nov 2026',
    status: 'verified',
    seenCount: 18,
    description: 'Enterprise ERP cloud development internship for 6-months. Opportunity to convert to full-time Associate.',
    requirements: [
      { skill: 'OOP concepts', normalizedSkill: 'oop', type: 'MUST', category: 'TECH' },
      { skill: 'Java or C#', normalizedSkill: 'java', type: 'MUST', category: 'TECH' },
      { skill: 'SQL', normalizedSkill: 'sql', type: 'MUST', category: 'TECH' },
      { skill: 'Problem solving', normalizedSkill: 'problem solving', type: 'MUST', category: 'SOFT' },
      { skill: 'React', normalizedSkill: 'react', type: 'NICE', category: 'TECH' },
      { skill: 'TypeScript', normalizedSkill: 'typescript', type: 'NICE', category: 'TECH' },
    ],
  },
  {
    id: 'lseg-data-2026',
    companyId: 'c-lseg',
    companyName: 'London Stock Exchange Group (LSEG)',
    companyType: 'MNC subsidiary',
    companyAge: 'Long-standing (15+ yrs)',
    companySize: '1000+ employees',
    isAiEstimate: false,
    title: 'Junior data platform engineer',
    level: 'JUNIOR',
    discipline: 'Data engineering',
    location: 'Colombo 01 / Hybrid',
    salaryBandLKR: 'LKR 180,000 - 240,000',
    closingDate: '28 Oct 2026',
    status: 'verified',
    seenCount: 7,
    description: 'Design real-time capital market data feeds, ingestion pipelines, and time-series analytics.',
    requirements: [
      { skill: 'Python', normalizedSkill: 'python', type: 'MUST', category: 'TECH' },
      { skill: 'SQL', normalizedSkill: 'sql', type: 'MUST', category: 'TECH' },
      { skill: 'Data modeling', normalizedSkill: 'data modeling', type: 'MUST', category: 'TECH' },
      { skill: 'Linux', normalizedSkill: 'linux', type: 'MUST', category: 'TOOL' },
      { skill: 'Git', normalizedSkill: 'git', type: 'MUST', category: 'TOOL' },
      { skill: 'Apache Spark', normalizedSkill: 'spark', type: 'NICE', category: 'TECH' },
      { skill: 'AWS basics', normalizedSkill: 'aws', type: 'NICE', category: 'TOOL' },
    ],
  },
  {
    id: 'cloudpulse-devops-2026',
    companyId: 'c-cloudpulse',
    companyName: 'CloudPulse Labs',
    companyType: 'Startup',
    companyAge: 'New (< 5 yrs)',
    companySize: '20-50 employees',
    isAiEstimate: true,
    title: 'Junior devops engineer',
    level: 'JUNIOR',
    discipline: 'DevOps',
    location: 'Remote (Sri Lanka)',
    salaryBandLKR: 'LKR 140,000 - 190,000',
    closingDate: '12 Nov 2026',
    status: 'unverified',
    seenCount: 2,
    description: 'Manage automated cloud infrastructure, container registries, and monitoring dashboards.',
    requirements: [
      { skill: 'Linux', normalizedSkill: 'linux', type: 'MUST', category: 'TOOL' },
      { skill: 'Docker', normalizedSkill: 'docker', type: 'MUST', category: 'TOOL' },
      { skill: 'Bash scripting', normalizedSkill: 'bash', type: 'MUST', category: 'TECH' },
      { skill: 'Git', normalizedSkill: 'git', type: 'MUST', category: 'TOOL' },
      { skill: 'CI/CD Pipelines', normalizedSkill: 'ci/cd', type: 'MUST', category: 'TOOL' },
      { skill: 'Terraform', normalizedSkill: 'terraform', type: 'NICE', category: 'TOOL' },
      { skill: 'Kubernetes', normalizedSkill: 'kubernetes', type: 'NICE', category: 'TOOL' },
    ],
  },
];

export interface MatchAnalysisResult {
  score: number;
  matchedSkills: string[];
  missingMustSkills: string[];
  missingNiceSkills: string[];
  learningPlan: {
    skill: string;
    weeks: string;
    steps: { day: string; task: string }[];
    freeResources: { name: string; urlDescription: string }[];
    projectIdea: string;
    cvTip: string;
  };
}

export function computeRoleMatch(candidate: CandidateProfile, role: JobRole): MatchAnalysisResult {
  const allCandidateSkills = [
    ...candidate.skills.languages,
    ...candidate.skills.frameworks,
    ...candidate.skills.databases,
    ...candidate.skills.tools,
  ].map((s) => s.toLowerCase());

  const matchedSkills: string[] = [];
  const missingMustSkills: string[] = [];
  const missingNiceSkills: string[] = [];

  let mustTotal = 0;
  let mustMatched = 0;
  let niceTotal = 0;
  let niceMatched = 0;

  for (const req of role.requirements) {
    const isMatched = allCandidateSkills.some(
      (cs) => cs.includes(req.normalizedSkill) || req.normalizedSkill.includes(cs)
    );

    if (req.type === 'MUST') {
      mustTotal++;
      if (isMatched) {
        mustMatched++;
        matchedSkills.push(req.skill);
      } else {
        missingMustSkills.push(req.skill);
      }
    } else {
      niceTotal++;
      if (isMatched) {
        niceMatched++;
        matchedSkills.push(req.skill);
      } else {
        missingNiceSkills.push(req.skill);
      }
    }
  }

  // Deterministic scoring (MUST skills weighted 80%, NICE skills weighted 20%)
  const mustScore = mustTotal > 0 ? (mustMatched / mustTotal) * 80 : 80;
  const niceScore = niceTotal > 0 ? (niceMatched / niceTotal) * 20 : 20;
  const finalScore = Math.round(mustScore + niceScore);

  // Generate learning plan for top missing skill
  const targetSkill = missingMustSkills[0] || missingNiceSkills[0] || 'CI/CD Pipelines';

  return {
    score: finalScore,
    matchedSkills,
    missingMustSkills,
    missingNiceSkills,
    learningPlan: {
      skill: targetSkill,
      weeks: '2-week self-study roadmap',
      steps: [
        { day: 'Days 1-3', task: `Understand ${targetSkill} core concepts and CLI tools via official documentation.` },
        { day: 'Days 4-7', task: `Set up a local sandbox environment and replicate common engineering workflows.` },
        { day: 'Days 8-11', task: `Integrate ${targetSkill} into your existing university FYP or portfolio repository.` },
        { day: 'Days 12-14', task: `Draft 2 impactful STAR bullet points for your CV highlighting metrics and outcomes.` },
      ],
      freeResources: [
        { name: `${targetSkill} Official Documentation`, urlDescription: 'Free guide and interactive tutorial' },
        { name: 'freeCodeCamp YouTube Crash Course', urlDescription: 'Comprehensive 4-hour hands-on video' },
        { name: 'roadmap.sh Developer Guide', urlDescription: 'Visual learning path with practical checkpoints' },
      ],
      projectIdea: `Containerize your final year project and write automated GitHub Actions workflows with test badges.`,
      cvTip: `Phrasing tip: "Architected CI/CD pipeline using ${targetSkill}, reducing deployment build turnaround by 40%."`,
    },
  };
}
