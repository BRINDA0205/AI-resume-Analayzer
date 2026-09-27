import React, { useState } from 'react';
import { ViewType, ResumeReport, UserProfile } from '../types';
import { sampleRecentResumes, DEFAULT_USER_PROFILE } from '../data/mockData';
import { InterviewQuestionsModal, BulletGeneratorModal } from '../components/Modals';

interface DashboardViewProps {
  onNavigate: (view: ViewType) => void;
  onSelectResumeReport: (reportId: string) => void;
  currentUser?: UserProfile;
  onOpenProfileModal?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onSelectResumeReport,
  currentUser = DEFAULT_USER_PROFILE,
  onOpenProfileModal,
}) => {
  const [benchmarkMode, setBenchmarkMode] = useState<'current' | 'peer'>('current');
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [bulletModalOpen, setBulletModalOpen] = useState(false);
  const [selectedSkillForBullet, setSelectedSkillForBullet] = useState('Docker & Containers');

  const metrics = benchmarkMode === 'current'
    ? {
        ats: 92,
        keywords: 89,
        impact: 88,
        brevity: 95,
        keywordNote: '+14% vs campus cohort',
      }
    : {
        ats: 81,
        keywords: 72,
        impact: 74,
        brevity: 82,
        keywordNote: 'Peer benchmark baseline',
      };

  return (
    <div className="flex flex-col w-full space-y-space-lg">
      {/* Top Banner Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
        <div className="space-y-space-xs">
          <div className="flex items-center gap-space-xs flex-wrap">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Welcome back, {currentUser.name}! 🎓
            </h1>
            <span className="bg-surface-container-high text-primary font-label-sm text-label-sm px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold border border-surface-container">
              Final Year CS • KPGU
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            You have <span className="text-on-surface font-semibold">3 active campus job applications</span> and your latest resume ATS score improved by{' '}
            <span className="text-tertiary-container font-semibold">+14%</span> this semester. Placement ready!
          </p>
        </div>

        <div className="flex items-center gap-space-sm flex-wrap">
          {onOpenProfileModal && (
            <button
              onClick={onOpenProfileModal}
              className="bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all shadow-xs font-label-md text-label-md px-space-md py-space-sm rounded-lg flex items-center gap-space-xs border border-surface-container cursor-pointer font-medium"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">badge</span>
              <span>Student ID: {currentUser.studentId}</span>
            </button>
          )}
          <button
            onClick={() => onNavigate('job-matcher')}
            className="bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all shadow-xs font-label-md text-label-md px-space-md py-space-sm rounded-lg flex items-center gap-space-xs border border-surface-container cursor-pointer font-medium"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">balance</span>
            <span>Compare with Job</span>
          </button>
          <button
            onClick={() => onNavigate('resume-analyzer')}
            className="bg-gradient-to-r from-primary-container to-secondary text-on-primary font-label-md text-label-md px-space-md py-space-sm rounded-lg shadow-sm hover:shadow-[0_4px_16px_rgba(79,70,229,0.35)] hover:-translate-y-0.5 transition-all flex items-center gap-space-xs cursor-pointer font-semibold"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span>Analyze New Resume</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-surface-container">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Resumes Analyzed
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">description</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-metric-score text-metric-score text-on-surface font-bold">14</span>
            <span className="inline-flex items-center gap-0.5 bg-surface-container-low text-tertiary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +3 this month
            </span>
          </div>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '70%' }} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-surface-container">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Avg Resume Score
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary-container">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-metric-score text-metric-score text-on-surface font-bold">84</span>
                <span className="font-title-sm text-title-sm text-on-surface-variant">/100</span>
              </div>
              <p className="font-label-sm text-label-sm text-tertiary font-semibold mt-0.5">
                +6 pts vs tech peers
              </p>
            </div>
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 48 48">
                <circle
                  className="text-surface-container-high"
                  cx="24"
                  cy="24"
                  fill="none"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <circle
                  className="text-tertiary-container"
                  cx="24"
                  cy="24"
                  fill="none"
                  r="18"
                  stroke="currentColor"
                  strokeDasharray="113.1"
                  strokeDashoffset="18.1"
                  strokeLinecap="round"
                  strokeWidth="4"
                />
              </svg>
              <span className="material-symbols-outlined absolute text-[16px] text-tertiary-container">
                done_all
              </span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-surface-container">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Target Jobs Analyzed
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">work</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-metric-score text-metric-score text-on-surface font-bold">28</span>
            <span className="inline-flex items-center bg-surface-container-low text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold">
              78% avg match
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-secondary-container" />
            Top fit: Distributed Systems
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-surface-container">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Skills Identified
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-metric-score text-metric-score text-on-surface font-bold">64</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Validated</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-surface-container-high text-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded-md font-semibold">
              42 Tech
            </span>
            <span className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded-md font-medium">
              22 Core
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: 8 Col Left, 4 Col Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-space-lg">
          {/* Card 1: Resume Performance & ATS Readiness */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md gap-space-sm border-b border-surface-container">
              <div>
                <div className="flex items-center gap-space-xs">
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Resume Performance &amp; ATS Readiness
                  </h2>
                  <span
                    className="material-symbols-outlined text-[18px] text-primary"
                    title="AI Benchmark Verified"
                  >
                    verified
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Benchmark against Software Engineering industry standards (Stripe, Datadog cohort)
                </p>
              </div>
              <div className="flex items-center gap-space-xs bg-surface-container p-1 rounded-lg">
                <button
                  onClick={() => setBenchmarkMode('current')}
                  className={`px-space-sm py-1 rounded font-label-sm text-label-sm transition-all cursor-pointer ${
                    benchmarkMode === 'current'
                      ? 'bg-surface-container-lowest text-on-surface font-bold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  Current Resume
                </button>
                <button
                  onClick={() => setBenchmarkMode('peer')}
                  className={`px-space-sm py-1 rounded font-label-sm text-label-sm transition-all cursor-pointer ${
                    benchmarkMode === 'peer'
                      ? 'bg-surface-container-lowest text-on-surface font-bold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  Target Job Peer Avg
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-md">
              {/* Stat 1 */}
              <div className="bg-surface-container-low rounded-xl p-space-md space-y-space-sm border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    ATS Compatibility
                  </span>
                  <span className="font-title-sm text-title-sm text-tertiary-container font-bold">
                    {metrics.ats}%
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-tertiary-container h-full rounded-full transition-all duration-500"
                    style={{ width: `${metrics.ats}%` }}
                  />
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Standard schema score</span>
                  <span className="text-tertiary-container font-semibold">Top 5%</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-surface-container-low rounded-xl p-space-md space-y-space-sm border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Keywords Match
                  </span>
                  <span className="font-title-sm text-title-sm text-primary font-bold">
                    {metrics.keywords}%
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${metrics.keywords}%` }}
                  />
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Job description overlap</span>
                  <span className="text-primary font-semibold">{metrics.keywordNote}</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-surface-container-low rounded-xl p-space-md space-y-space-sm border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Impact Metrics
                  </span>
                  <span className="font-title-sm text-title-sm text-secondary font-bold">
                    {metrics.impact}%
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-secondary-container h-full rounded-full transition-all duration-500"
                    style={{ width: `${metrics.impact}%` }}
                  />
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Quantified achievements</span>
                  <span className="text-on-surface font-medium">18 quantified bullets</span>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="bg-surface-container-low rounded-xl p-space-md space-y-space-sm border border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Brevity &amp; Structure
                  </span>
                  <span className="font-title-sm text-title-sm text-tertiary font-bold">
                    {metrics.brevity}%
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-tertiary-fixed-dim h-full rounded-full transition-all duration-500"
                    style={{ width: `${metrics.brevity}%` }}
                  />
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Readability &amp; length</span>
                  <span className="text-on-surface font-medium">Single page tight</span>
                </div>
              </div>
            </div>

            {/* Quick recommendation pill box */}
            <div className="mt-space-md p-space-md rounded-xl bg-surface-container flex flex-col md:flex-row md:items-center justify-between gap-space-sm border border-surface-container-high">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">insights</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-semibold">
                    AI Recommendation summary
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Adding 2 system scalability indicators will push your composite index above 90%.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedSkillForBullet('Distributed Scalability');
                  setBulletModalOpen(true);
                }}
                className="bg-surface-container-lowest text-primary font-label-sm text-label-sm px-space-md py-space-xs rounded-lg font-semibold shadow-xs hover:bg-surface-bright transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer border border-surface-container"
                type="button"
              >
                Apply Quick Tweaks →
              </button>
            </div>
          </div>

          {/* Card 2: Recent Analyses & Resumes */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container">
            <div className="flex items-center justify-between pb-space-md border-b border-surface-container">
              <div className="space-y-0.5">
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Recent Analyses &amp; Resumes
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Detailed diagnostic records from your target role submissions
                </p>
              </div>
              <button
                onClick={() => onNavigate('analysis-history')}
                className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>View All</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            <div className="space-y-space-sm mt-space-md">
              {sampleRecentResumes.map((resume) => (
                <div
                  key={resume.id}
                  className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-surface-container"
                >
                  <div className="flex items-start gap-space-sm min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[22px]">picture_as_pdf</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-space-xs flex-wrap">
                        <h3 className="font-label-md text-label-md text-on-surface font-bold truncate">
                          {resume.fileName}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs ${
                            resume.status === 'Optimized'
                              ? 'bg-surface-container-lowest text-tertiary-container'
                              : resume.status === 'Review Suggested'
                              ? 'bg-surface-container-lowest text-secondary'
                              : 'bg-error-container text-on-error-container'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              resume.status === 'Optimized'
                                ? 'bg-tertiary-container'
                                : resume.status === 'Review Suggested'
                                ? 'bg-secondary'
                                : 'bg-error'
                            }`}
                          />
                          {resume.status}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-0.5">
                        Target: <span className="text-on-surface font-medium">{resume.target}</span> • Analyzed {resume.analyzedAgo}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-space-md shrink-0">
                    <div className="flex items-center gap-space-md text-right">
                      <div>
                        <span className="font-title-sm text-title-sm text-on-surface font-bold">
                          {resume.score}
                        </span>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">Score</p>
                      </div>
                      <div>
                        <span className="font-title-sm text-title-sm text-tertiary-container font-bold">
                          {resume.atsMatch}
                        </span>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">ATS Match</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectResumeReport(resume.id);
                        onNavigate('analysis-results');
                      }}
                      className="bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary transition-all font-label-md text-label-md px-space-md py-space-sm rounded-lg shadow-xs flex items-center gap-1 font-semibold border border-surface-container cursor-pointer"
                      type="button"
                    >
                      <span>View Report</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-space-lg">
          {/* Skill Gap Spotlight */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs space-y-space-md border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[22px]">radar</span>
                <h2 className="font-title-sm text-title-sm text-on-surface font-bold">
                  Skill Gap Spotlight
                </h2>
              </div>
              <span className="bg-surface-container text-secondary font-label-sm text-label-sm px-2 py-0.5 rounded-md font-semibold">
                High Priority
              </span>
            </div>

            <div className="p-space-sm bg-surface-container rounded-lg space-y-1">
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Target Role Benchmark
              </p>
              <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
                Senior Distributed Systems Engineer
              </p>
            </div>

            <div className="space-y-space-xs">
              <p className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                Missing Target Skills
              </p>
              <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-[18px]">error</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Apache Kafka
                  </span>
                </div>
                <span className="bg-error-container text-on-error-container font-label-sm text-label-sm px-2 py-0.5 rounded font-medium">
                  Critical
                </span>
              </div>
              <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">warning</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    System Design at Scale
                  </span>
                </div>
                <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded font-medium">
                  Medium
                </span>
              </div>
              <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">warning</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    gRPC &amp; Protobuf
                  </span>
                </div>
                <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded font-medium">
                  Medium
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedSkillForBullet('Apache Kafka');
                setBulletModalOpen(true);
              }}
              className="w-full bg-gradient-to-r from-primary-container to-secondary text-on-primary font-label-md text-label-md py-space-sm rounded-lg shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-space-xs font-semibold cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">auto_fix_normal</span>
              <span>Generate Tailored Bullet Points →</span>
            </button>
          </div>

          {/* ATS Quick Health Check */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs space-y-space-md border border-surface-container">
            <div className="flex items-center justify-between">
              <h2 className="font-title-sm text-title-sm text-on-surface font-bold">
                ATS Quick Health Check
              </h2>
              <span className="font-label-sm text-label-sm text-tertiary-container font-bold bg-surface-container px-2 py-0.5 rounded-full">
                3/4 Passed
              </span>
            </div>
            <div className="space-y-space-sm">
              <div className="flex items-start gap-space-sm">
                <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-tertiary-container shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-semibold">
                    Standard PDF formatting verified
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    No multi-column tabular parsing traps detected
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-space-sm">
                <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-tertiary-container shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-semibold">
                    Contact &amp; LinkedIn detected
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Validated live GitHub + LinkedIn hyperlinks
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-space-sm">
                <div className="w-6 h-6 rounded-full bg-error-container flex items-center justify-center text-on-error-container shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">priority_high</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-semibold">
                    2 bullets lack quantifiable metrics
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Experience at Fintech Startup needs % impact figures
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-space-sm">
                <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-tertiary-container shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-semibold">
                    Clean single-column layout
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Machine readability score at 99.4%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Interview Card */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs space-y-space-sm border border-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Upcoming Interview
              </span>
              <span className="font-label-sm text-label-sm text-primary font-semibold bg-surface-container px-2 py-0.5 rounded-full">
                In 2 days
              </span>
            </div>
            <div className="flex items-center gap-space-sm mt-2">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary font-headline-md font-bold">
                G
              </div>
              <div className="min-w-0">
                <h3 className="font-title-sm text-title-sm text-on-surface font-bold truncate">
                  Campus SDE Technical Screen
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Tier-1 Campus Drive • Round 1: DSA & System Foundations
                </p>
              </div>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-low space-y-1 border border-surface-container">
              <p className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                  lightbulb
                </span>
                Tailored Resume Strength to Highlight:
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Leverage your PostgreSQL indexing pipeline and full-stack capstone project from Brinda_Ukani_ComputerScience_FinalYear_2025.pdf where you reduced query latency by 42%.
              </p>
            </div>
            <button
              onClick={() => setInterviewModalOpen(true)}
              className="w-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md py-space-sm rounded-lg font-semibold flex items-center justify-center gap-space-xs mt-2 cursor-pointer border border-surface-container-high"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">quiz</span>
              <span>Generate Campus Interview Questions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <InterviewQuestionsModal
        isOpen={interviewModalOpen}
        onClose={() => setInterviewModalOpen(false)}
        targetRole="Campus SDE (Tier-1 Product & Tech)"
      />
      <BulletGeneratorModal
        isOpen={bulletModalOpen}
        onClose={() => setBulletModalOpen(false)}
        targetSkill={selectedSkillForBullet}
      />
    </div>
  );
};
