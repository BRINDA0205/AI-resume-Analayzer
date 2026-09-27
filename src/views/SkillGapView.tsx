import React, { useState } from 'react';
import { ViewType } from '../types';
import { BulletGeneratorModal } from '../components/Modals';

interface SkillGapViewProps {
  onNavigate: (view: ViewType) => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({ onNavigate }) => {
  const [activeBand, setActiveBand] = useState<'senior' | 'staff' | 'principal'>('senior');
  const [bulletModalOpen, setBulletModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('Apache Kafka');

  const gapData = {
    senior: {
      readiness: 94,
      missingCount: 2,
      skills: [
        { name: 'Apache Kafka', priority: 'Critical', impact: '+6% ATS Score', category: 'Backend' },
        { name: 'OpenTelemetry', priority: 'Medium', impact: '+3% ATS Score', category: 'Observability' },
      ],
      certified: [
        'React & Next.js Architecture',
        'TypeScript Strict Typing',
        'Distributed Microservices',
        'PostgreSQL & Redis Caching',
        'CI/CD GitHub Actions',
      ],
    },
    staff: {
      readiness: 76,
      missingCount: 4,
      skills: [
        { name: 'Kubernetes Multi-Cluster', priority: 'Critical', impact: '+12% ATS Score', category: 'Infrastructure' },
        { name: 'Terraform IaC Frameworks', priority: 'High', impact: '+8% ATS Score', category: 'Cloud DevOps' },
        { name: 'Cross-Org Architecture Strategy', priority: 'High', impact: '+6% ATS Score', category: 'Leadership' },
        { name: 'Capacity Planning & Budgeting', priority: 'Medium', impact: '+4% ATS Score', category: 'Systems' },
      ],
      certified: [
        'High Throughput Backend Systems',
        'Staff-Level Component Libraries',
        'P99 Latency Optimization',
      ],
    },
    principal: {
      readiness: 58,
      missingCount: 6,
      skills: [
        { name: 'Enterprise Multi-Year Roadmaps', priority: 'Critical', impact: '+15% ATS Score', category: 'Strategy' },
        { name: 'Disaster Recovery RTO/RPO Topologies', priority: 'Critical', impact: '+10% ATS Score', category: 'Resilience' },
        { name: 'Zero-Trust Security Architectures', priority: 'High', impact: '+7% ATS Score', category: 'Security' },
      ],
      certified: [
        'Event-Driven Microservices',
        'Multi-Cloud AWS Services',
      ],
    },
  }[activeBand];

  return (
    <div className="flex flex-col w-full space-y-space-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div className="space-y-space-xs">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <button
              onClick={() => onNavigate('dashboard')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Skill Gap Analysis</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
            Seniority &amp; Skill Gap Matrix
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Audit your resume competencies across seniority milestones. Uncover the exact high-value requirements separating your current draft from target levels.
          </p>
        </div>

        {/* Level Switcher */}
        <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl border border-surface-container-high self-start md:self-auto">
          <button
            onClick={() => setActiveBand('senior')}
            className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
              activeBand === 'senior'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Senior SWE
          </button>
          <button
            onClick={() => setActiveBand('staff')}
            className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
              activeBand === 'staff'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Staff Architect
          </button>
          <button
            onClick={() => setActiveBand('principal')}
            className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
              activeBand === 'principal'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Principal Engineer
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column (8 cols): Gap Analysis & Injections */}
        <div className="lg:col-span-8 space-y-space-md">
          {/* Missing Skills Table */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container space-y-space-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Recommended Skill Injections
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Skills missing from your resume that appear in &gt;70% of {activeBand} requisitions
                </p>
              </div>
              <span className="bg-error/10 text-error px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold">
                {gapData.missingCount} Missing
              </span>
            </div>

            <div className="space-y-space-sm">
              {gapData.skills.map((item, idx) => (
                <div
                  key={idx}
                  className="p-space-md rounded-xl bg-surface-container-low border border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-title-sm text-title-sm text-on-surface font-bold">
                        {item.name}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          item.priority === 'Critical'
                            ? 'bg-error-container text-on-error-container'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {item.priority}
                      </span>
                      <span className="text-tertiary-container font-label-sm text-label-sm font-semibold">
                        {item.impact}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Category: {item.category} • Required for automated parsing filters
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSkill(item.name);
                      setBulletModalOpen(true);
                    }}
                    className="bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary transition-all font-label-md text-label-md px-space-md py-space-xs rounded-lg font-semibold border border-surface-container shadow-xs cursor-pointer shrink-0"
                  >
                    Generate Bullet Point
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Skills Benchmarked */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container space-y-space-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Verified Strengths for {activeBand.toUpperCase()}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Competencies already detected and scored at industry benchmark
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {gapData.certified.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tertiary-fixed/30 text-tertiary-container font-label-md text-label-md font-semibold border border-tertiary-fixed"
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Seniority Readiness Meter */}
        <div className="lg:col-span-4 space-y-space-md">
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container space-y-space-md text-center">
            <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
              Level Readiness Score
            </h3>
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <svg className="w-32 h-32 -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  className="text-surface-container-high"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  className="text-primary-container"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="40"
                  stroke="currentColor"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * gapData.readiness) / 100}
                  strokeLinecap="round"
                  strokeWidth="8"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-metric-score text-metric-score text-on-surface font-bold">
                  {gapData.readiness}%
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Target Fit</span>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Addressing {gapData.missingCount} missing keywords will position your resume in the top 5% of candidate screenings for this band.
            </p>

            <button
              onClick={() => onNavigate('analysis-results')}
              className="w-full py-2.5 bg-gradient-to-r from-primary-container to-secondary text-on-primary font-label-md text-label-md font-semibold rounded-lg shadow-sm hover:opacity-95 transition-all cursor-pointer"
            >
              Export Optimized Draft
            </button>
          </div>
        </div>
      </div>

      <BulletGeneratorModal
        isOpen={bulletModalOpen}
        onClose={() => setBulletModalOpen(false)}
        targetSkill={selectedSkill}
      />
    </div>
  );
};
