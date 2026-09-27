import React, { useState } from 'react';
import { sampleInterviewQuestions } from '../data/mockData';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-margin animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-xl max-w-2xl w-full p-space-lg shadow-xl relative border border-surface-container">
        <button
          onClick={onClose}
          className="absolute top-space-md right-space-md text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="flex items-center gap-space-xs mb-space-md">
          <span className="material-symbols-outlined text-primary text-[24px]">play_circle</span>
          <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
            ResumeAI Engine In Action (1-Min Overview)
          </h3>
        </div>

        <div className="w-full aspect-video bg-surface-container-high rounded-xl flex items-center justify-center relative overflow-hidden border border-surface-container">
          {!isPlaying ? (
            <div className="flex flex-col items-center justify-center p-space-md text-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg mb-space-sm cursor-pointer hover:scale-105 transition-transform"
              >
                <span
                  className="material-symbols-outlined text-[32px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </button>
              <p className="font-title-sm text-title-sm text-on-surface font-semibold">
                Watch ATS Parsing &amp; LLM Metric Expansion
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                See how ResumeAI reverse-engineers Workday, Taleo, and Greenhouse filters in 15 seconds.
              </p>
            </div>
          ) : (
            <div className="w-full h-full bg-[#0a0f1d] text-white p-6 flex flex-col justify-between font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Multi-Pass Neural Simulator Active
                </span>
                <span className="text-white/60">Taleo / Greenhouse Engine v3.2</span>
              </div>
              <div className="space-y-2 py-4 text-slate-300">
                <p className="text-emerald-300 font-semibold">&gt; INGESTING candidate_audit_sarah_chen.v3.json...</p>
                <p>&gt; OCR Multi-Column Preserving Pipeline: [SUCCESS]</p>
                <p>&gt; Extracting 18 Competencies: TypeScript (100%), React &amp; Next.js (98%), PostgreSQL (95%)</p>
                <p className="text-amber-400">&gt; IDENTIFIED CRITICAL GAP: Apache Kafka, Kubernetes</p>
                <p className="text-indigo-300">&gt; REWRITING IMPACT METRIC using Google XYZ Framework...</p>
                <p className="text-emerald-400 font-bold">&gt; ATS SCORE OPTIMIZED: 91 / 100 [Tier 1 Candidate]</p>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => setIsPlaying(false)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-white text-xs font-sans"
                >
                  Replay
                </button>
                <button
                  onClick={onClose}
                  className="px-3 py-1 bg-primary text-white rounded text-xs font-sans font-semibold"
                >
                  Try It Yourself
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface InterviewQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetRole?: string;
}

export const InterviewQuestionsModal: React.FC<InterviewQuestionsModalProps> = ({
  isOpen,
  onClose,
  targetRole = 'Stripe Senior Backend Engineer',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-margin animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-xl max-w-2xl w-full p-space-lg shadow-xl relative border border-surface-container max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-space-md right-space-md text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="flex items-center gap-space-xs mb-space-xs">
          <span className="material-symbols-outlined text-primary text-[24px]">quiz</span>
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
            Tailored Interview Preparation
          </h3>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
          Curated questions specifically calibrated for your upcoming {targetRole} technical screen.
        </p>

        <div className="space-y-space-md">
          {sampleInterviewQuestions.map((item, idx) => (
            <div key={idx} className="p-space-md rounded-xl bg-surface-container-low border border-surface-container space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Question 0{idx + 1} • {item.focus}
                </span>
                <span className="material-symbols-outlined text-[18px] text-tertiary">psychology</span>
              </div>
              <p className="font-title-sm text-title-sm text-on-surface font-semibold">
                "{item.question}"
              </p>
              <div className="p-space-xs rounded bg-surface-container-lowest border border-surface-container mt-2">
                <p className="font-body-sm text-body-sm text-tertiary-container flex items-start gap-1 font-medium">
                  <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">tips_and_updates</span>
                  <span><strong>AI Strategy:</strong> {item.tip}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-space-md pt-space-sm border-t border-surface-container flex justify-end gap-space-xs">
          <button
            onClick={onClose}
            className="px-space-md py-space-xs bg-primary text-on-primary rounded-lg font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors"
          >
            Done Practicing
          </button>
        </div>
      </div>
    </div>
  );
};

interface BulletGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetSkill?: string;
}

export const BulletGeneratorModal: React.FC<BulletGeneratorModalProps> = ({
  isOpen,
  onClose,
  targetSkill = 'Apache Kafka',
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const generatedBullets = [
    {
      bullet:
        'Architected high-throughput Apache Kafka event-streaming pipeline processing 45,000 events/sec with zero message drop across 12 distributed consumer partitions.',
      metrics: '45,000 events/sec, 0 drop, 12 partitions',
    },
    {
      bullet:
        'Decoupled monolithic payment webhook processors into event-driven Kafka topics, reducing inter-service latency by 44% and eliminating database lock contention.',
      metrics: '44% latency reduction, 0 deadlocks',
    },
    {
      bullet:
        'Implemented Kafka MirrorMaker 2.0 active-passive disaster recovery topology across AWS multi-region infrastructure, achieving 99.999% replication reliability.',
      metrics: '99.999% reliability, multi-region replication',
    },
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-margin animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-xl max-w-2xl w-full p-space-lg shadow-xl relative border border-surface-container max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-space-md right-space-md text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="flex items-center gap-space-xs mb-space-xs">
          <span className="material-symbols-outlined text-secondary text-[24px]">auto_fix_normal</span>
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
            Tailored Bullet Generator
          </h3>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
          Generated senior-caliber bullet points addressing your missing skill:{' '}
          <strong className="text-secondary">{targetSkill}</strong> using the Google X-Y-Z framework.
        </p>

        <div className="space-y-space-md">
          {generatedBullets.map((item, idx) => (
            <div key={idx} className="p-space-md rounded-xl bg-surface-container-low border border-surface-container space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                  Option 0{idx + 1} • High Impact
                </span>
                <button
                  onClick={() => handleCopy(item.bullet, idx)}
                  className="inline-flex items-center gap-1 bg-surface-container-lowest text-primary hover:bg-surface-container text-label-sm font-label-sm px-2.5 py-1 rounded shadow-xs transition-all border border-surface-container cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedIndex === idx ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedIndex === idx ? 'Copied!' : 'Copy to Resume'}</span>
                </button>
              </div>
              <p className="font-body-md text-body-md text-on-surface font-medium">
                "{item.bullet}"
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                <strong>Signals injected:</strong> {item.metrics}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-space-md pt-space-sm border-t border-surface-container flex justify-end">
          <button
            onClick={onClose}
            className="px-space-md py-space-xs bg-primary text-on-primary rounded-lg font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
