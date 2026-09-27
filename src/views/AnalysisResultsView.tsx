import React, { useState } from 'react';
import { ViewType, ResumeReport, SkillItem } from '../types';
import { defaultResumeReport } from '../data/mockData';
import { ScoreGauge } from '../components/ScoreGauge';
import { BulletGeneratorModal } from '../components/Modals';

interface AnalysisResultsViewProps {
  onNavigate: (view: ViewType) => void;
  report?: ResumeReport;
}

export const AnalysisResultsView: React.FC<AnalysisResultsViewProps> = ({
  onNavigate,
  report = defaultResumeReport,
}) => {
  const [activeTab, setActiveTab] = useState<
    'summary' | 'skills' | 'experience' | 'ats' | 'recommendations'
  >('summary');

  const [copiedBulletId, setCopiedBulletId] = useState<string | null>(null);
  const [appliedFixes, setAppliedFixes] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [skillsList, setSkillsList] = useState<SkillItem[]>(report.skills);
  const [bulletModalOpen, setBulletModalOpen] = useState(false);
  const [bulletSkill, setBulletSkill] = useState('Apache Kafka');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletId(id);
    setTimeout(() => setCopiedBulletId(null), 2500);
  };

  const handleAddSkill = (skillName: string, category: 'frontend' | 'backend' | 'systems') => {
    if (!skillsList.some((s) => s.name === skillName)) {
      const newSkill: SkillItem = {
        name: skillName,
        category,
        isVerified: true,
        level: 'Added via AI',
      };
      setSkillsList([...skillsList, newSkill]);
    }
  };

  const handleApplyAllFixes = () => {
    setAppliedFixes(true);
    // Add all missing skills
    const newAdditions: SkillItem[] = [
      { name: 'Docker & Containers', category: 'systems', isVerified: true, level: 'Integrated' },
      { name: 'Redis Caching', category: 'backend', isVerified: true, level: 'Integrated' },
      { name: 'CI/CD Pipelines (GitHub Actions)', category: 'systems', isVerified: true, level: 'Integrated' },
    ];
    setSkillsList([...skillsList, ...newAdditions]);
    setSuccessNotice('Success! All weak metrics rewritten with STAR impact and 3 core placement skills injected into your resume draft.');
    setTimeout(() => {
      setSuccessNotice(null);
    }, 4500);
  };

  return (
    <div className="flex flex-col w-full">
      {successNotice && (
        <div className="mb-4 p-4 rounded-xl bg-tertiary-container/15 text-tertiary font-label-md text-label-md flex items-center justify-between border border-tertiary-container/30 shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>{successNotice}</span>
          </div>
          <button
            onClick={() => setSuccessNotice(null)}
            className="p-1 rounded hover:bg-surface-container cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
      {/* Top Action & Meta Header */}
      <div className="flex flex-col gap-space-md mb-space-lg">
        {/* Breadcrumb & Status */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
            <button
              onClick={() => onNavigate('dashboard')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            <button
              onClick={() => onNavigate('resume-analyzer')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Resume Analyzer
            </button>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            <span className="text-on-surface font-semibold">Analysis Results</span>
          </div>

          <div className="flex items-center gap-space-xs bg-surface-container-high px-space-sm py-1 rounded-full text-on-surface-variant font-label-sm text-label-sm border border-surface-container">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
            <span>Evaluated by ResumeAI Engine v4.2 • Just now</span>
          </div>
        </div>

        {/* Title Banner & Actions Card */}
        <div className="bg-surface-container-lowest p-space-md lg:p-space-lg rounded-xl shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-space-md border border-surface-container">
          <div className="flex items-start sm:items-center gap-space-md min-w-0">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <span
                className="material-symbols-outlined text-[28px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                description
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-space-xs mb-1">
                <h1 className="font-headline-md text-headline-md text-on-surface truncate font-bold">
                  {report.fileName}
                </h1>
                <span className="bg-surface-container text-on-surface-variant px-space-xs py-0.5 rounded font-label-sm text-label-sm font-medium">
                  {report.fileSize}
                </span>
                {appliedFixes && (
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">check</span> AI Fixes Applied
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Target Role Alignment:
                </span>
                <span className="inline-flex items-center gap-1 bg-surface-container-high text-primary font-label-md text-label-md px-2.5 py-0.5 rounded-full font-semibold border border-surface-container">
                  <span className="material-symbols-outlined text-[14px]">target</span>
                  {report.targetRole}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm">
            <button
              onClick={() => setExportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low font-label-md text-label-md rounded-lg shadow-xs transition-all hover:-translate-y-0.5 border border-surface-container cursor-pointer font-medium"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Export PDF Report</span>
            </button>
            <button
              onClick={() => onNavigate('resume-analyzer')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low font-label-md text-label-md rounded-lg shadow-xs transition-all hover:-translate-y-0.5 border border-surface-container cursor-pointer font-medium"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              <span>Re-run Analysis</span>
            </button>
            <button
              onClick={() => onNavigate('job-matcher')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:shadow-[0_4px_16px_rgba(79,70,229,0.35)] transition-all hover:-translate-y-0.5 cursor-pointer font-semibold"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
              <span>Match with Another Job</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Hero Scorecard Dashboard (5 Visual Gauges) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md mb-space-lg">
        {/* 1. Composite Overall Score */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs relative overflow-hidden flex flex-col justify-between border border-surface-container">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Overall Score
            </span>
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold">
              Top 10%
            </span>
          </div>
          <div className="flex items-center gap-space-md my-1">
            <ScoreGauge
              score={appliedFixes ? 96 : report.overallScore}
              maxScore={100}
              size="md"
              colorScheme="gradient"
            />
            <div className="min-w-0">
              <p className="font-headline-md text-headline-md text-primary font-bold leading-tight">
                {appliedFixes ? 'Exceptional' : 'Excellent'}
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                Strong match for targeted fintech roles
              </p>
            </div>
          </div>
          <div className="pt-space-xs mt-space-xs border-t border-surface-container">
            <span className="font-label-sm text-label-sm text-tertiary-container flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +14 pts vs generic profiles
            </span>
          </div>
        </div>

        {/* 2. ATS Compatibility */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs flex flex-col justify-between border border-surface-container">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              ATS Parsing
            </span>
            <span className="bg-tertiary/10 text-tertiary-container px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold">
              Passed
            </span>
          </div>
          <div className="flex items-center gap-space-md my-1">
            <ScoreGauge
              score={appliedFixes ? 99 : report.atsParsingScore}
              maxScore={100}
              size="md"
              colorScheme="tertiary"
            />
            <div className="min-w-0">
              <p className="font-title-sm text-title-sm text-on-surface font-bold">ATS Safe</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Passes 98% of corporate tracking filters
              </p>
            </div>
          </div>
          <div className="pt-space-xs mt-space-xs border-t border-surface-container">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-tertiary-container">
                check_circle
              </span>{' '}
              0 critical parsing errors
            </span>
          </div>
        </div>

        {/* 3. Skills Match */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs flex flex-col justify-between border border-surface-container">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Skills Match
            </span>
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold">
              Solid
            </span>
          </div>
          <div className="flex items-center gap-space-md my-1">
            <ScoreGauge
              score={appliedFixes ? 95 : report.skillsMatchScore}
              maxScore={100}
              size="md"
              colorScheme="primary"
            />
            <div className="min-w-0">
              <p className="font-title-sm text-title-sm text-on-surface font-bold">
                {skillsList.length} Skills
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Aligned with current market keywords
              </p>
            </div>
          </div>
          <div className="pt-space-xs mt-space-xs border-t border-surface-container">
            <span className="font-label-sm text-label-sm text-error flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px]">warning</span>{' '}
              {appliedFixes ? '0 gaps remaining' : '3 key gaps identified'}
            </span>
          </div>
        </div>

        {/* 4. Experience & Impact */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs flex flex-col justify-between border border-surface-container">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Quant Impact
            </span>
            <span className="bg-secondary-container/10 text-secondary-container px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold">
              High
            </span>
          </div>
          <div className="flex items-center gap-space-md my-1">
            <ScoreGauge
              score={appliedFixes ? 94 : report.quantImpactScore}
              maxScore={100}
              size="md"
              colorScheme="secondary"
            />
            <div className="min-w-0">
              <p className="font-title-sm text-title-sm text-on-surface font-bold">Measurable</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Active verbs &amp; concrete metric stats
              </p>
            </div>
          </div>
          <div className="pt-space-xs mt-space-xs border-t border-surface-container">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-secondary">
                insights
              </span>{' '}
              {report.quantifiedBulletsCount} metric bullets found
            </span>
          </div>
        </div>

        {/* 5. Formatting & Clarity */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs flex flex-col justify-between border border-surface-container">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Formatting
            </span>
            <span className="bg-tertiary/10 text-tertiary-container px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold">
              Clean
            </span>
          </div>
          <div className="flex items-center gap-space-md my-1">
            <ScoreGauge
              score={report.formattingScore}
              maxScore={100}
              size="md"
              colorScheme="tertiary"
            />
            <div className="min-w-0">
              <p className="font-title-sm text-title-sm text-on-surface font-bold">Optimal</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Clean hierarchy, font-pairing &amp; density
              </p>
            </div>
          </div>
          <div className="pt-space-xs mt-space-xs border-t border-surface-container">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-tertiary-container">
                check_circle
              </span>{' '}
              Industry standard layout
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Section Tabs */}
      <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs mb-space-md bg-surface-container-low p-1.5 rounded-xl border border-surface-container">
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
            activeTab === 'summary'
              ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">overview</span>
          <span>Executive Summary</span>
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
            activeTab === 'skills'
              ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">psychology</span>
          <span>Extracted Skills ({skillsList.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
            activeTab === 'experience'
              ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">timeline</span>
          <span>Experience &amp; Impact</span>
        </button>
        <button
          onClick={() => setActiveTab('ats')}
          className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
            activeTab === 'ats'
              ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>ATS Compatibility</span>
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
            activeTab === 'recommendations'
              ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">auto_fix</span>
          <span>Recommendations (6)</span>
        </button>
      </div>

      {/* Main Grid (8 Col Left, 4 Col Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          {/* TAB CONTENT 1: Summary or All */}
          {(activeTab === 'summary' || activeTab === 'recommendations') && (
            <div className="bg-surface-container-lowest p-space-md lg:p-space-lg rounded-xl shadow-xs relative overflow-hidden border border-surface-container">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">psychology_alt</span>
                    {report.summaryTitle}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    {report.summaryCalibratedFor}
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Evaluation link copied to clipboard!');
                  }}
                  className="text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer"
                  title="Share evaluation"
                >
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
              </div>

              <div className="space-y-space-sm text-on-surface font-body-lg text-body-lg leading-relaxed">
                <p>
                  Candidate demonstrates an <strong className="font-semibold text-primary">exceptional technical core</strong> with proven senior-tier velocity across enterprise React architectures, distributed Node.js/Go backends, and low-latency financial checkout services.
                </p>
                <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed">
                  Strong leadership signals emerge from cross-functional delivery records and quantifiable high-concurrency microservices optimizations. However, while cloud architecture fundamentals with AWS are well articulated, the profile underindexes on modern container orchestration (Kubernetes) and cloud-agnostic Infrastructure as Code (Terraform), which limits alignment with senior cloud-native role benchmarks.
                </p>
              </div>

              <div className="mt-space-md pt-space-md grid grid-cols-1 md:grid-cols-3 gap-space-sm bg-surface-container-low p-space-md rounded-xl border border-surface-container">
                <div className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-tertiary-container text-[20px] shrink-0 mt-0.5">
                    task_alt
                  </span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-bold">
                      Strongest Asset
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {report.strongestAsset}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                    bolt
                  </span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-bold">
                      Primary Leverage
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {report.primaryLeverage}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">
                    pending_actions
                  </span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-bold">
                      Missing Signal
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {report.missingSignal}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 2: Extracted Skills Taxonomy */}
          {(activeTab === 'summary' || activeTab === 'skills') && (
            <div className="bg-surface-container-lowest p-space-md lg:p-space-lg rounded-xl shadow-xs border border-surface-container">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-md">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Extracted Skills Taxonomy
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Weighted matching against 1,240+ Senior Full Stack listings
                  </p>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary-container bg-tertiary-container/10 px-2.5 py-1 rounded font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container" /> Verified Skills ({skillsList.length})
                  </span>
                  <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary bg-primary/10 px-2.5 py-1 rounded font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Suggested Additions (7)
                  </span>
                </div>
              </div>

              <div className="space-y-space-md">
                {/* Category 1: Frontend */}
                <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container">
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[18px]">layers</span>{' '}
                      Frontend Engineering
                    </span>
                    <span className="font-label-sm text-label-sm text-tertiary-container font-semibold">
                      96% Competency
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsList
                      .filter((s) => s.category === 'frontend')
                      .map((skill) => (
                        <span
                          key={skill.name}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-xs border border-surface-container"
                        >
                          <span className="material-symbols-outlined text-tertiary-container text-[16px]">
                            check_circle
                          </span>
                          {skill.name}{' '}
                          {skill.level && (
                            <span className="text-on-surface-variant font-label-sm text-label-sm font-normal">
                              ({skill.level})
                            </span>
                          )}
                        </span>
                      ))}
                    <button
                      onClick={() => handleAddSkill('WebSockets', 'frontend')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container/10 text-primary font-label-md text-label-md hover:bg-primary-container/20 transition-all cursor-pointer font-medium"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span> + WebSockets
                    </button>
                  </div>
                </div>

                {/* Category 2: Backend & Cloud */}
                <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container">
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[18px]">dns</span>{' '}
                      Backend &amp; Cloud Architecture
                    </span>
                    <span className="font-label-sm text-label-sm text-tertiary-container font-semibold">
                      88% Competency
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsList
                      .filter((s) => s.category === 'backend')
                      .map((skill) => (
                        <span
                          key={skill.name}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-xs border border-surface-container"
                        >
                          <span className="material-symbols-outlined text-tertiary-container text-[16px]">
                            check_circle
                          </span>
                          {skill.name}{' '}
                          {skill.level && (
                            <span className="text-on-surface-variant font-label-sm text-label-sm font-normal">
                              ({skill.level})
                            </span>
                          )}
                        </span>
                      ))}
                    <button
                      onClick={() => handleAddSkill('Apache Kafka', 'backend')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary-container/10 text-secondary font-label-md text-label-md hover:bg-secondary-container/20 transition-all cursor-pointer font-medium"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span> + Apache Kafka
                    </button>
                    <button
                      onClick={() => handleAddSkill('Kubernetes', 'backend')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary-container/10 text-secondary font-label-md text-label-md hover:bg-secondary-container/20 transition-all cursor-pointer font-medium"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span> + Kubernetes
                    </button>
                    <button
                      onClick={() => handleAddSkill('Terraform', 'backend')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary-container/10 text-secondary font-label-md text-label-md hover:bg-secondary-container/20 transition-all cursor-pointer font-medium"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span> + Terraform
                    </button>
                  </div>
                </div>

                {/* Category 3: Methodologies */}
                <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container">
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-tertiary text-[18px]">schema</span>{' '}
                      Systems &amp; Methodologies
                    </span>
                    <span className="font-label-sm text-label-sm text-tertiary-container font-semibold">
                      91% Competency
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsList
                      .filter((s) => s.category === 'systems')
                      .map((skill) => (
                        <span
                          key={skill.name}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-xs border border-surface-container"
                        >
                          <span className="material-symbols-outlined text-tertiary-container text-[16px]">
                            check_circle
                          </span>
                          {skill.name}
                        </span>
                      ))}
                    <button
                      onClick={() => handleAddSkill('OpenTelemetry', 'systems')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container/10 text-primary font-label-md text-label-md hover:bg-primary-container/20 transition-all cursor-pointer font-medium"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span> + OpenTelemetry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 3: Experience & Quantifiable Impact Audit */}
          {(activeTab === 'summary' || activeTab === 'experience' || activeTab === 'recommendations') && (
            <div className="bg-surface-container-lowest p-space-md lg:p-space-lg rounded-xl shadow-xs border border-surface-container">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-md">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Experience &amp; Quantifiable Impact Audit
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Target role requires strong proof of scaling, throughput, and business outcomes
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 bg-secondary-container/10 text-secondary-container font-label-md text-label-md px-3 py-1 rounded-full font-bold">
                  <span className="material-symbols-outlined text-[16px]">speed</span> High Impact (82/100)
                </span>
              </div>

              <div className="space-y-space-md">
                {report.weakBullets.map((bullet) => (
                  <div
                    key={bullet.id}
                    className="bg-surface-container-low p-space-md rounded-xl space-y-space-sm border border-surface-container"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-space-xs">
                      <div>
                        <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
                          {bullet.role}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {bullet.company} • {bullet.period}
                        </p>
                      </div>
                      <span className="bg-surface-container-lowest text-tertiary-container px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold shadow-xs border border-surface-container">
                        Impact Score: {bullet.roleImpactScore}%
                      </span>
                    </div>

                    {/* Bullet Rewrite Showcase */}
                    <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-xs space-y-space-sm border border-surface-container">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-error uppercase font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">close</span> Detected Weak Bullet
                        </span>
                        <span className="bg-error/10 text-error px-2 py-0.5 rounded font-label-sm text-label-sm font-bold">
                          Impact: {bullet.weakImpact}%
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant line-through opacity-80 pl-2">
                        "{bullet.weakText}"
                      </p>

                      {/* AI Optimized Alternative */}
                      <div className="bg-surface-container-high/60 p-space-md rounded-lg space-y-space-xs mt-space-sm border border-surface-container">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-primary uppercase font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">auto_awesome</span> AI Optimized Revision
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="bg-tertiary-container/10 text-tertiary-container px-2 py-0.5 rounded font-label-sm text-label-sm font-bold">
                              Impact: {bullet.optimizedImpact}%
                            </span>
                            <button
                              onClick={() => handleCopy(bullet.optimizedText, bullet.id)}
                              className="inline-flex items-center gap-1 bg-surface-container-lowest text-primary hover:bg-surface-container text-label-sm font-label-sm px-2.5 py-1 rounded shadow-xs transition-all border border-surface-container cursor-pointer font-medium"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                {copiedBulletId === bullet.id ? 'check' : 'content_copy'}
                              </span>
                              <span>{copiedBulletId === bullet.id ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface font-medium">
                          "{bullet.optimizedText}"
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Includes:{' '}
                            <strong className="text-on-surface font-semibold">
                              {bullet.keyHighlights.join(', ')}
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT 4: ATS Scanner Simulation Details */}
          {activeTab === 'ats' && (
            <div className="bg-surface-container-lowest p-space-md lg:p-space-lg rounded-xl shadow-xs border border-surface-container space-y-space-md">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                Enterprise ATS Scanner Simulation
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Tests your document against proprietary parsing logic from top Fortune 500 ATS platforms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">Workday v12</span>
                    <span className="text-tertiary-container font-bold text-label-md">98% Pass</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">
                    All dates (2022 - Present), company identifiers, and contact details properly parsed into standardized employee schema.
                  </p>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">Greenhouse Engine</span>
                    <span className="text-tertiary-container font-bold text-label-md">95% Pass</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">
                    Found 38/42 relevant job keywords without any column table flow collision.
                  </p>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">Taleo Enterprise</span>
                    <span className="text-tertiary-container font-bold text-label-md">94% Pass</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">
                    Single-column flow verified. Recommended compressing PDF size under 2MB for legacy Oracle setups.
                  </p>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">Lever Keyword Index</span>
                    <span className="text-tertiary-container font-bold text-label-md">92% Pass</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">
                    Skill tags dynamically extracted and matched against contemporary engineering seniority bands.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* 1. One-Click AI Action Box */}
          <div className="bg-gradient-to-br from-primary-container via-primary to-secondary text-on-primary p-space-md lg:p-space-lg rounded-xl shadow-md relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-on-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-space-sm">
              <span className="material-symbols-outlined text-[24px]">auto_fix_high</span>
              <span className="font-title-sm text-title-sm font-bold">ResumeAI Copilot</span>
            </div>
            <p className="font-body-md text-body-md opacity-90 mb-space-md leading-relaxed">
              Ready to instantly convert these audit findings into a high-converting, ATS-tailored resume?
            </p>
            <div className="space-y-space-xs mb-space-md">
              <div className="flex items-center gap-2 font-label-sm text-label-sm opacity-90">
                <span className="material-symbols-outlined text-[16px]">done_all</span> All 6 weak metrics rewritten
              </div>
              <div className="flex items-center gap-2 font-label-sm text-label-sm opacity-90">
                <span className="material-symbols-outlined text-[16px]">done_all</span> 3 missing core skills injected naturally
              </div>
              <div className="flex items-center gap-2 font-label-sm text-label-sm opacity-90">
                <span className="material-symbols-outlined text-[16px]">done_all</span> Optimized to 1.8MB for legacy portals
              </div>
            </div>
            <button
              onClick={handleApplyAllFixes}
              className="w-full py-3 px-space-md bg-surface-container-lowest text-primary hover:bg-surface-container-low font-title-sm text-title-sm font-bold rounded-lg shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              type="button"
            >
              <span>{appliedFixes ? 'Fixes Successfully Applied' : 'Apply All AI Fixes'}</span>
              <span className="material-symbols-outlined text-[20px]">
                {appliedFixes ? 'check' : 'arrow_forward'}
              </span>
            </button>
          </div>

          {/* 2. ATS Compliance Breakdown Checklist */}
          <div className="bg-surface-container-lowest p-space-md lg:p-space-lg rounded-xl shadow-xs border border-surface-container">
            <div className="flex items-center justify-between mb-space-md">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  ATS Audit Checklist
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Machine readability validation
                </p>
              </div>
              <span className="font-headline-md text-headline-md text-tertiary-container font-bold">
                94%
              </span>
            </div>

            <div className="space-y-space-sm">
              {report.atsChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-space-xs p-space-xs rounded-lg hover:bg-surface-container-low transition-colors"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
                      item.status === 'pass'
                        ? 'text-tertiary-container'
                        : 'text-outline'
                    }`}
                  >
                    {item.status === 'pass' ? 'check_circle' : 'warning'}
                  </span>
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md text-on-surface font-semibold">
                      {item.title}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Critical Missing Skills Card */}
          <div className="bg-surface-container-lowest p-space-md lg:p-space-lg rounded-xl shadow-xs border border-surface-container">
            <div className="flex items-center justify-between mb-space-sm">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Target Skill Gaps
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Frequently requested by top hiring teams
                </p>
              </div>
              <span className="bg-error/10 text-error px-2 py-0.5 rounded font-label-sm text-label-sm font-bold">
                {report.missingSkills.length} Priority
              </span>
            </div>

            <div className="space-y-space-sm mt-space-sm">
              {report.missingSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        {skill.name}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${
                          skill.priority === 'Critical'
                            ? 'bg-error-container/40 text-error'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {skill.priority}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {skill.reason}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setBulletSkill(skill.name);
                      setBulletModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-container shadow-xs transition-all border border-surface-container cursor-pointer shrink-0 ml-2"
                    title="Generate bullet points for this skill"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Export Report Preview Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-margin">
          <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-space-lg shadow-xl border border-surface-container">
            <h3 className="font-title-sm text-title-sm text-on-surface font-bold mb-2">
              Export ATS-Compliant PDF Report
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              Your report includes full multi-page ATS scoring, keyword match breakdown, and rewritten impact bullets.
            </p>
            <div className="p-4 bg-surface-container-low rounded-lg mb-4 text-xs font-mono space-y-1">
              <p className="font-semibold text-primary">ResumeAI Evaluation Document #RAI-2026-9812</p>
              <p>Candidate: Alex Rivera (Senior Full Stack)</p>
              <p>ATS Match: 94% (Workday, Taleo, Greenhouse Certified)</p>
              <p>Verified Skills: {skillsList.length} Technical &amp; Systems Markers</p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setExportModalOpen(false)}
                className="px-4 py-2 text-on-surface-variant text-label-md"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                  setExportModalOpen(false);
                }}
                className="px-4 py-2 bg-primary text-on-primary font-semibold rounded-lg text-label-md flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bullet Generator Modal */}
      <BulletGeneratorModal
        isOpen={bulletModalOpen}
        onClose={() => setBulletModalOpen(false)}
        targetSkill={bulletSkill}
      />
    </div>
  );
};
