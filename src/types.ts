export type ViewType = 
  | 'landing' 
  | 'dashboard' 
  | 'resume-analyzer' 
  | 'analysis-results' 
  | 'job-matcher' 
  | 'skill-gap-analysis' 
  | 'analysis-history' 
  | 'sign-in' 
  | 'sign-up';

export interface SkillItem {
  name: string;
  level?: string;
  category: 'frontend' | 'backend' | 'systems' | 'leadership';
  isVerified: boolean;
  priority?: 'critical' | 'high' | 'medium';
  note?: string;
}

export interface WeakBullet {
  id: string;
  role: string;
  company: string;
  period: string;
  roleImpactScore: number;
  weakText: string;
  weakImpact: number;
  optimizedText: string;
  optimizedImpact: number;
  keyHighlights: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  headline: string;
  college: string;
  branch: string;
  yearOfStudy: string;
  studentId: string;
  graduationYear?: string;
  avatarUrl?: string;
  plan: string;
  cgpa?: string;
  targetRole?: string;
}

export interface ResumeReport {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  targetRole: string;
  status: 'Optimized' | 'Review Suggested' | 'Needs Improvement';
  overallScore: number;
  atsParsingScore: number;
  skillsMatchScore: number;
  quantImpactScore: number;
  formattingScore: number;
  atsSafePercentage: number;
  totalSkillsCount: number;
  missingSkillsCount: number;
  quantifiedBulletsCount: number;
  summaryTitle: string;
  summaryCalibratedFor: string;
  summaryParagraph1: string;
  summaryParagraph2: string;
  strongestAsset: string;
  primaryLeverage: string;
  missingSignal: string;
  skills: SkillItem[];
  missingSkills: { name: string; priority: 'Critical' | 'High' | 'Medium'; reason: string }[];
  weakBullets: WeakBullet[];
  atsChecklist: {
    title: string;
    description: string;
    status: 'pass' | 'warning' | 'fail';
  }[];
}
