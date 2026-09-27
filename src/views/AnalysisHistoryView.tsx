import React, { useState } from 'react';
import { ViewType } from '../types';
import { sampleRecentResumes } from '../data/mockData';

interface AnalysisHistoryViewProps {
  onNavigate: (view: ViewType) => void;
  onSelectResumeReport: (reportId: string) => void;
}

export const AnalysisHistoryView: React.FC<AnalysisHistoryViewProps> = ({
  onNavigate,
  onSelectResumeReport,
}) => {
  const [filterText, setFilterText] = useState('');

  const filtered = sampleRecentResumes.filter(
    (r) =>
      r.fileName.toLowerCase().includes(filterText.toLowerCase()) ||
      r.target.toLowerCase().includes(filterText.toLowerCase())
  );

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
            <span className="text-on-surface font-semibold">Analysis History</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
            Resume Analysis Archive
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Track your ATS score trajectory over time across iterations and job applications.
          </p>
        </div>

        <button
          onClick={() => onNavigate('resume-analyzer')}
          className="bg-gradient-to-r from-primary-container to-secondary text-on-primary font-label-md text-label-md px-space-md py-space-sm rounded-lg shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)] transition-all flex items-center gap-space-xs cursor-pointer font-semibold"
        >
          <span className="material-symbols-outlined text-[18px]">upload_file</span>
          <span>Upload New Version</span>
        </button>
      </div>

      {/* Filter and Stats Bar */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Filter by filename or target company..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full h-10 pl-9 pr-3 bg-surface-container-low border border-surface-container rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-space-md text-body-sm text-on-surface-variant">
          <span>Total Scans: <strong className="text-on-surface">14</strong></span>
          <span>Average Score: <strong className="text-tertiary-container">84/100</strong></span>
          <span>Score Delta: <strong className="text-primary font-semibold">+14 pts</strong></span>
        </div>
      </div>

      {/* History List */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container space-y-space-md">
        <h2 className="font-title-sm text-title-sm text-on-surface font-bold">
          Historical Diagnostic Reports ({filtered.length})
        </h2>

        <div className="space-y-space-sm">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-surface-container"
            >
              <div className="flex items-start gap-space-sm min-w-0">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">picture_as_pdf</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <h3 className="font-label-md text-label-md text-on-surface font-bold truncate">
                      {item.fileName}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs ${
                        item.status === 'Optimized'
                          ? 'bg-surface-container-lowest text-tertiary-container'
                          : item.status === 'Review Suggested'
                          ? 'bg-surface-container-lowest text-secondary'
                          : 'bg-error-container text-on-error-container'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === 'Optimized'
                            ? 'bg-tertiary-container'
                            : item.status === 'Review Suggested'
                            ? 'bg-secondary'
                            : 'bg-error'
                        }`}
                      />
                      {item.status}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-0.5">
                    Target: <span className="text-on-surface font-medium">{item.target}</span> • Analyzed {item.analyzedAgo}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-space-md shrink-0">
                <div className="flex items-center gap-space-md text-right">
                  <div>
                    <span className="font-title-sm text-title-sm text-on-surface font-bold">
                      {item.score}
                    </span>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Score</p>
                  </div>
                  <div>
                    <span className="font-title-sm text-title-sm text-tertiary-container font-bold">
                      {item.atsMatch}
                    </span>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">ATS Match</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onSelectResumeReport(item.id);
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
  );
};
