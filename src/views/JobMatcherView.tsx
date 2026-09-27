import React, { useState } from 'react';
import { ViewType } from '../types';
import { sampleJobDescriptions } from '../data/mockData';
import { BulletGeneratorModal } from '../components/Modals';

interface JobMatcherViewProps {
  onNavigate: (view: ViewType) => void;
}

export const JobMatcherView: React.FC<JobMatcherViewProps> = ({ onNavigate }) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(sampleJobDescriptions[0].id);
  const [customRoleTitle, setCustomRoleTitle] = useState('');
  const [customJobText, setCustomJobText] = useState('');
  const [bulletModalOpen, setBulletModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('Apache Kafka');

  const activeJob =
    sampleJobDescriptions.find((j) => j.id === selectedJobId) || sampleJobDescriptions[0];

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
            <span className="text-on-surface font-semibold">Job Matcher</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
            Live Job Posting Matcher
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Simulate how your resume performs against specific live corporate requisitions. Detect missing keyword requirements and semantic match vectors.
          </p>
        </div>

        <button
          onClick={() => onNavigate('resume-analyzer')}
          className="bg-primary text-on-primary font-label-md text-label-md px-space-md py-space-sm rounded-lg hover:bg-primary-container transition-all flex items-center gap-space-xs self-start md:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">upload_file</span>
          <span>Upload Different Resume</span>
        </button>
      </div>

      {/* Main Grid: Job Selector & Match Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column: Preset Roles & Custom Input */}
        <div className="lg:col-span-5 space-y-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container space-y-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Select Live Role Benchmark
            </span>
            <div className="space-y-space-xs">
              {sampleJobDescriptions.map((job) => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`w-full text-left p-space-sm rounded-lg transition-all border cursor-pointer ${
                    selectedJobId === job.id
                      ? 'bg-surface-container-high/60 border-primary shadow-xs'
                      : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm text-on-surface font-bold">
                      {job.company}
                    </span>
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant">
                      {job.matchPercentage}% Match
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 truncate">
                    {job.title}
                  </p>
                  <p className="font-body-sm text-body-sm text-outline mt-1">{job.location}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Job Paste Box */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container space-y-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Or Benchmark Custom Job Description
            </span>
            <input
              type="text"
              placeholder="e.g. Staff Infrastructure Engineer @ Uber"
              value={customRoleTitle}
              onChange={(e) => setCustomRoleTitle(e.target.value)}
              className="w-full h-10 px-3 bg-surface-container-low border border-surface-container rounded-lg font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder="Paste raw job description text with requirements..."
              rows={4}
              value={customJobText}
              onChange={(e) => setCustomJobText(e.target.value)}
              className="w-full p-3 bg-surface-container-low border border-surface-container rounded-lg font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() => {
                if (customJobText) {
                  alert('Custom job description indexed! Real-time vector similarity: 83%.');
                } else {
                  alert('Please paste a job description first.');
                }
              }}
              className="w-full py-2 bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary transition-colors font-label-md text-label-md rounded-lg font-semibold cursor-pointer border border-surface-container"
            >
              Calculate Match Vector
            </button>
          </div>
        </div>

        {/* Right Column: Comparative Audit Breakdown */}
        <div className="lg:col-span-7 space-y-space-md">
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container space-y-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm border-b border-surface-container gap-2">
              <div>
                <span className="text-primary font-bold text-label-sm uppercase tracking-wider">
                  Target Company: {activeJob.company}
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  {activeJob.title}
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Compensation: <span className="font-medium text-on-surface">{activeJob.salary}</span>
                </p>
              </div>
              <div className="text-right sm:self-center">
                <span className="font-metric-score text-metric-score text-tertiary-container font-bold">
                  {activeJob.matchPercentage}%
                </span>
                <p className="font-label-sm text-label-sm text-on-surface-variant">ATS Overlap</p>
              </div>
            </div>

            {/* Description quote */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container">
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed italic">
                "{activeJob.description}"
              </p>
            </div>

            {/* Matched Skills */}
            <div className="space-y-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Keywords Matched on Your Resume ({activeJob.requiredSkills.length - activeJob.missingSkills.length})
              </span>
              <div className="flex flex-wrap gap-2">
                {activeJob.requiredSkills
                  .filter((s) => !activeJob.missingSkills.includes(s))
                  .map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-tertiary-fixed/30 text-tertiary-container font-label-md text-label-md font-medium border border-tertiary-fixed"
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                      {skill}
                    </span>
                  ))}
              </div>
            </div>

            {/* Missing Critical Skills */}
            <div className="space-y-space-xs pt-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-error font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                Missing Mandatory Qualifications ({activeJob.missingSkills.length})
              </span>
              <div className="space-y-2">
                {activeJob.missingSkills.map((skill) => (
                  <div
                    key={skill}
                    className="p-space-sm rounded-lg bg-error-container/20 border border-error-container flex items-center justify-between"
                  >
                    <div>
                      <p className="font-label-md text-label-md text-error font-bold">{skill}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Explicitly specified in {activeJob.company}'s core job requirement rubric.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSkill(skill);
                        setBulletModalOpen(true);
                      }}
                      className="bg-surface-container-lowest text-primary hover:bg-surface-container px-3 py-1 rounded text-label-sm font-semibold border border-surface-container shadow-xs cursor-pointer"
                    >
                      Inject Bullet Point
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom action */}
            <div className="pt-space-sm border-t border-surface-container flex justify-end">
              <button
                onClick={() => onNavigate('analysis-results')}
                className="bg-gradient-to-r from-primary-container to-secondary text-on-primary font-label-md text-label-md px-space-md py-space-sm rounded-lg shadow-sm hover:opacity-95 transition-all flex items-center gap-space-xs cursor-pointer font-semibold"
              >
                <span>Generate Tailored Resume for {activeJob.company}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
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
