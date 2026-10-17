export type ProjectCategory = 'all' | 'ai' | 'fullstack' | 'backend';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface CodeSnippet {
  filename: string;
  language: string;
  description: string;
  code: string;
}

export interface ProjectArchitecture {
  overview: string;
  diagram: string;
  keyDecisions: string[];
  techStack: { category: string; items: string[] }[];
  codeSnippets: CodeSnippet[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai' | 'fullstack' | 'backend';
  categoryLabel: string;
  description: string;
  imageUrl?: string;
  metrics: ProjectMetric[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  hasSimulator: boolean;
  simulatorType?: 'crewai' | 'pinzone' | 'ordersnap' | 'spotify';
  architecture: ProjectArchitecture;
}

export interface CaseStudyStep {
  id: number;
  title: string;
  badge: string;
  summary: string;
  whyItMatters: string;
  keyInsights: string[];
  promptOrCode?: {
    title: string;
    type: 'prompt' | 'code' | 'diff' | 'diagram';
    content: string;
    explanation: string;
  };
  beforeVsAfter?: {
    beforeTitle: string;
    beforeText: string;
    afterTitle: string;
    afterText: string;
    impact: string;
  };
  keyTakeaways: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  summary: string;
  bullets: string[];
  techStack: string[];
  highlightMetric: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  company?: string;
  message: string;
  timestamp?: string;
}

export interface FreelanceService {
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
  timeline: string;
}
