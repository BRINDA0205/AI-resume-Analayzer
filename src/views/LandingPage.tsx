import React, { useState } from 'react';
import { ViewType } from '../types';
import { ScoreGauge } from '../components/ScoreGauge';
import { DemoModal } from '../components/Modals';
import { USER_AVATAR_URL, ALEX_RIVERA_AVATAR } from '../data/mockData';

interface LandingPageProps {
  onNavigate: (view: ViewType) => void;
  onSelectFile?: (file: File) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onSelectFile }) => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [copiedVerb, setCopiedVerb] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (onSelectFile) {
        onSelectFile(e.target.files[0]);
      }
      onNavigate('resume-analyzer');
    }
  };

  const handleCopyVerb = () => {
    navigator.clipboard.writeText(
      'Architected event-driven microservices reducing p99 latency by 38%'
    );
    setCopiedVerb(true);
    setTimeout(() => setCopiedVerb(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Decorative Ambient Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary-fixed/40 via-secondary-fixed/20 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-margin pt-space-xl pb-space-xl flex flex-col items-center text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high shadow-xs hover:shadow-md transition-shadow cursor-default mb-space-md border border-surface-container">
            <span
              className="material-symbols-outlined text-primary text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="font-label-md text-label-md text-on-surface">
              Powered by GPT-4o &amp; Claude 3.5 Sonnet • ATS Engine v3.2
            </span>
          </div>

          {/* Main Headline with Electric Gradient */}
          <h1 className="font-display-lg text-display-lg text-on-surface max-w-4xl tracking-tight mb-space-md">
            Analyze Your Resume with AI.<br />
            <span className="bg-gradient-to-r from-primary via-primary-container to-secondary bg-clip-text text-transparent">
              Get Hired 3x Faster.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-space-lg leading-relaxed">
            Upload your resume in seconds. Our deep neural parser extracts your real-world skills,
            calculates precise ATS compatibility, benchmarks against live job postings, and provides
            pinpoint bullet-by-bullet improvements.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-space-md mb-space-xl">
            <button
              onClick={() => onNavigate('resume-analyzer')}
              className="bg-gradient-to-r from-primary-container to-secondary text-on-primary font-label-md text-label-md px-space-lg py-space-sm rounded-lg shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 transition-all flex items-center gap-space-xs cursor-pointer"
            >
              <span>Analyze My Resume Free</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              onClick={() => setDemoModalOpen(true)}
              className="bg-surface-container-lowest text-on-surface hover:bg-surface-container-low font-label-md text-label-md px-space-lg py-space-sm rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-space-xs border border-surface-container cursor-pointer"
            >
              <span
                className="material-symbols-outlined text-primary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_circle
              </span>
              <span>Watch 1-Min Demo</span>
            </button>
          </div>

          {/* Trust Proof Bar */}
          <div className="w-full max-w-4xl pt-space-md pb-space-lg">
            <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-space-md">
              Trusted by 120,000+ candidates hired at top tech companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-space-xl gap-y-space-md opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
              <span className="font-headline-md text-headline-md tracking-tighter font-bold text-on-surface">
                Google
              </span>
              <span className="font-headline-md text-headline-md tracking-tight font-extrabold text-on-surface italic">
                stripe
              </span>
              <span className="font-headline-md text-headline-md tracking-tight font-bold text-on-surface">
                ∞ Meta
              </span>
              <span className="font-headline-md text-headline-md tracking-tight font-bold text-on-surface">
                amazon
              </span>
              <span className="font-headline-md text-headline-md tracking-tight font-semibold text-on-surface">
                Microsoft
              </span>
              <span className="font-headline-md text-headline-md tracking-tight font-bold text-on-surface">
                airbnb
              </span>
            </div>
          </div>

          {/* INTERACTIVE HERO MOCKUP CARD (Bento Analytical Card) */}
          <div
            id="demo-analyzer"
            className="w-full max-w-4xl text-left bg-surface-container-lowest rounded-xl shadow-md p-space-md sm:p-space-lg transition-all hover:shadow-xl mt-space-md border border-surface-container"
          >
            {/* Mockup Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md mb-space-md bg-surface-container-low -mx-space-md -mt-space-md sm:-mx-space-lg sm:-mt-space-lg px-space-md sm:px-space-lg py-space-sm rounded-t-xl border-b border-surface-container">
              <div className="flex items-center gap-space-sm">
                <span className="w-3 h-3 rounded-full bg-error" />
                <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim" />
                <span className="w-3 h-3 rounded-full bg-on-tertiary-container" />
                <span className="font-label-sm text-label-sm text-on-surface-variant ml-space-xs font-mono">
                  candidate_audit_sarah_chen.v3.json
                </span>
              </div>
              <div className="flex items-center gap-space-xs text-on-tertiary-fixed-variant bg-tertiary-fixed/30 px-space-sm py-0.5 rounded-full font-label-sm text-label-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
                <span>Live Analysis Verified</span>
              </div>
            </div>

            {/* Candidate Profile & Score Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
              {/* Left: Candidate Details & Skills */}
              <div className="md:col-span-7 space-y-space-md">
                <div className="flex items-start gap-space-md">
                  <img
                    alt="Sarah Chen"
                    className="w-12 h-12 rounded-full object-cover shadow-sm ring-1 ring-surface-container-high"
                    src={USER_AVATAR_URL}
                  />
                  <div>
                    <div className="flex items-center gap-space-xs">
                      <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                        Sarah Chen
                      </h2>
                      <span
                        className="material-symbols-outlined text-primary text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Senior Full Stack Engineer • 7+ Yrs Exp • Target: Staff Architect
                    </p>
                  </div>
                </div>

                {/* Skills Detected Badges */}
                <div className="space-y-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                      Detected Competencies (18 Total)
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      94% Target Match
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-space-xs">
                    <span className="bg-tertiary-fixed/30 text-tertiary-container px-space-sm py-0.5 rounded font-label-sm text-label-sm flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">check</span> TypeScript
                    </span>
                    <span className="bg-tertiary-fixed/30 text-tertiary-container px-space-sm py-0.5 rounded font-label-sm text-label-sm flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">check</span> React &amp; Next.js
                    </span>
                    <span className="bg-tertiary-fixed/30 text-tertiary-container px-space-sm py-0.5 rounded font-label-sm text-label-sm flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">check</span> Distributed Systems
                    </span>
                    <span className="bg-tertiary-fixed/30 text-tertiary-container px-space-sm py-0.5 rounded font-label-sm text-label-sm flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">check</span> PostgreSQL
                    </span>
                    <span className="bg-error-container/40 text-error px-space-sm py-0.5 rounded font-label-sm text-label-sm flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">warning</span> Kubernetes (Missing)
                    </span>
                    <span className="bg-primary-fixed text-on-primary-fixed-variant px-space-sm py-0.5 rounded font-label-sm text-label-sm flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">auto_fix_high</span> GraphQL (Recommended)
                    </span>
                  </div>
                </div>

                {/* Live AI Suggestions */}
                <div className="space-y-space-xs pt-space-xs">
                  <div className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                    Actionable Fixes (High Impact)
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs border border-surface-container">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                      bolt
                    </span>
                    <div className="flex-1">
                      <p className="font-body-sm text-body-sm text-on-surface">
                        <strong className="font-semibold text-primary">Strengthen impact verbs:</strong>{' '}
                        Replace <span className="line-through text-on-surface-variant font-mono">"Managed backend refactor"</span>{' '}
                        with{' '}
                        <span className="text-tertiary-container font-mono font-medium">
                          "Architected event-driven microservices reducing p99 latency by 38%"
                        </span>
                        .
                      </p>
                      <button
                        onClick={handleCopyVerb}
                        className="mt-1 text-primary hover:text-primary-container text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {copiedVerb ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedVerb ? 'Copied to clipboard!' : 'Copy recommended bullet'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: ATS Gauge Ring & Scorecard */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-space-md bg-surface-container rounded-xl border border-surface-container-high/60">
                <ScoreGauge
                  score={91}
                  maxScore={100}
                  size="lg"
                  label="/100 ATS"
                  colorScheme="gradient"
                />
                <div className="mt-space-sm text-center">
                  <span className="inline-block px-space-sm py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-md text-label-md font-semibold">
                    Tier 1 Candidate: Highly Interviewable
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                    Top 4% of 14,200+ Software Engineer profiles scanned this month.
                  </p>
                  <button
                    onClick={() => onNavigate('analysis-results')}
                    className="mt-2 text-primary hover:underline text-label-sm font-semibold flex items-center justify-center gap-0.5 mx-auto"
                  >
                    <span>View full analysis sample</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FEATURE GRID PILLARS (4 bespoke cards) */}
      <section id="features" className="w-full py-space-xl bg-surface-container-low border-y border-surface-container">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
              Analytical Intelligence
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs font-bold">
              Built for precision. Engineering the modern resume.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs leading-relaxed">
              Generic resume checkers look for basic formatting. ResumeAI leverages semantic LLM
              embedding spaces to ensure you bypass recruiter screening bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Feature 1 */}
            <div
              onClick={() => onNavigate('resume-analyzer')}
              className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between border border-surface-container cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center mb-space-md text-primary">
                  <span className="material-symbols-outlined text-[24px]">document_scanner</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface mb-space-xs font-bold">
                  Deep Resume Analysis
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Multimodal OCR and natural language parsing extract complex multi-column layouts,
                  work histories, quantifiable achievements, and verified education credits.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm text-primary font-label-sm text-label-sm flex items-center gap-space-xs font-semibold">
                <span>OCR accuracy 99.8%</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              onClick={() => onNavigate('skill-gap-analysis')}
              className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between border border-surface-container cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center mb-space-md text-secondary">
                  <span className="material-symbols-outlined text-[24px]">psychology</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface mb-space-xs font-bold">
                  Intelligent Skill Extraction
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Categorizes hard technical proficiencies, soft leadership competencies, and deep
                  domain knowledge with weighted seniority scores matched to industry trends.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm text-secondary font-label-sm text-label-sm flex items-center gap-space-xs font-semibold">
                <span>Dynamic clustering</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              onClick={() => onNavigate('job-matcher')}
              className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between border border-surface-container cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center mb-space-md text-primary">
                  <span className="material-symbols-outlined text-[24px]">target</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface mb-space-xs font-bold">
                  Live Job Matching
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Drop any live job posting URL or raw description. Get immediate semantic
                  compatibility ratings, missing mandatory qualification warnings, and keyword
                  density audits.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm text-primary font-label-sm text-label-sm flex items-center gap-space-xs font-semibold">
                <span>Real-time vector sim</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div
              onClick={() => onNavigate('skill-gap-analysis')}
              className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between border border-surface-container cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center mb-space-md text-tertiary">
                  <span className="material-symbols-outlined text-[24px]">upgrade</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface mb-space-xs font-bold">
                  Actionable Skill Gap Analysis
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Highlights overlooked requirements with bullet-by-bullet revisions, quantifiable
                  metric injections (X-Y-Z framework), and focused career upskilling paths.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm text-tertiary font-label-sm text-label-sm flex items-center gap-space-xs font-semibold">
                <span>Targeted remediation</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3-Step Interactive Process) */}
      <section id="how-it-works" className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                Workflow Simplicity
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs font-bold">
                Turn your draft into an interview magnet in 3 steps
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md leading-relaxed">
              Zero complex setups. Directly test against proprietary ATS rulebooks used by Fortune
              500 talent acquisition teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Step 1 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden border border-surface-container flex flex-col justify-between">
              <div>
                <div className="font-metric-score text-metric-score text-surface-container-highest/60 select-none mb-space-sm leading-none font-bold">
                  01
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface mb-space-xs font-bold">
                  Upload Resume
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md leading-relaxed">
                  Drag &amp; drop PDF or DOCX format, or import directly from LinkedIn in under 15
                  seconds. High fidelity preservation guaranteed.
                </p>
              </div>
              {/* Upload Drag-Drop Visual Box */}
              <div
                onClick={() => onNavigate('resume-analyzer')}
                className="p-space-md rounded-lg bg-surface-container-low text-center flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container transition-colors border border-dashed border-outline-variant"
              >
                <span className="material-symbols-outlined text-primary text-[28px] mb-space-xs">
                  cloud_upload
                </span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Drop candidate CV here
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  PDF, DOCX up to 10MB
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden border border-surface-container flex flex-col justify-between">
              <div>
                <div className="font-metric-score text-metric-score text-surface-container-highest/60 select-none mb-space-sm leading-none font-bold">
                  02
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface mb-space-xs font-bold">
                  AI Multi-Pass Parsing
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md leading-relaxed">
                  Our multi-model engine simulates enterprise scanners including Workday,
                  Greenhouse, Taleo, and Lever to pinpoint hidden filters.
                </p>
              </div>
              {/* ATS Engine Verification List */}
              <div className="p-space-sm rounded-lg bg-surface-container-low space-y-space-xs border border-surface-container">
                <div className="flex items-center justify-between text-on-surface font-body-sm text-body-sm">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Workday Engine v12
                  </span>
                  <span className="text-tertiary-container font-label-sm text-label-sm font-semibold">
                    98% Pass
                  </span>
                </div>
                <div className="flex items-center justify-between text-on-surface font-body-sm text-body-sm">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Greenhouse Parser
                  </span>
                  <span className="text-tertiary-container font-label-sm text-label-sm font-semibold">
                    95% Pass
                  </span>
                </div>
                <div className="flex items-center justify-between text-on-surface font-body-sm text-body-sm">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Lever Keyword Index
                  </span>
                  <span className="text-tertiary-container font-label-sm text-label-sm font-semibold">
                    92% Pass
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden border border-surface-container flex flex-col justify-between">
              <div>
                <div className="font-metric-score text-metric-score text-surface-container-highest/60 select-none mb-space-sm leading-none font-bold">
                  03
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface mb-space-xs font-bold">
                  Get Actionable Insights
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md leading-relaxed">
                  Receive instant scorecards, ATS compliance fixes, and job-tailored bullet points
                  with one-click export into polished templates.
                </p>
              </div>
              {/* Actionable Output Sample */}
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-tertiary-container text-[22px]">
                    download_for_offline
                  </span>
                  <div className="leading-tight">
                    <span className="font-label-md text-label-md text-on-surface block font-semibold">
                      Export Ready
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Clean ATS-Compliant PDF
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('analysis-results')}
                  className="bg-primary text-on-primary px-space-sm py-1 rounded font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors cursor-pointer"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL HIGHLIGHT */}
      <section id="testimonials" className="w-full py-space-xl bg-surface-container-low border-y border-surface-container">
        <div className="max-w-4xl mx-auto px-margin">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-md relative border border-surface-container">
            <span className="material-symbols-outlined text-primary-fixed-dim text-[54px] absolute top-space-md right-space-md select-none pointer-events-none">
              format_quote
            </span>
            <div className="flex items-center gap-1 text-secondary mb-space-sm">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <blockquote className="font-headline-md text-headline-md text-on-surface italic font-medium leading-relaxed mb-space-lg">
              “ResumeAI spotted 4 critical missing keywords and helped me rewrite my impact metrics
              using the Google XYZ framework. My interview callback rate jumped from 8% to 42% in
              just two weeks — I ended up signing an offer at Stripe.”
            </blockquote>
            <div className="flex items-center gap-space-md">
              <img
                alt="Alex Rivera"
                className="w-12 h-12 rounded-full object-cover shadow-sm ring-1 ring-surface-container-high"
                src={ALEX_RIVERA_AVATAR}
              />
              <div>
                <div className="font-title-sm text-title-sm text-on-surface font-bold">
                  Alex Rivera
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  Senior Software Engineer at Stripe (formerly at Series B FinTech)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGH-IMPACT FINAL CTA BANNER & UPLOAD ZONE */}
      <section id="pricing" className="w-full py-space-xl bg-surface">
        <div className="max-w-5xl mx-auto px-margin">
          <div className="bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary rounded-xl p-space-lg sm:p-space-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-xl">
            <div className="max-w-md space-y-space-sm text-center md:text-left">
              <span className="inline-block bg-on-primary-container text-on-primary-fixed font-label-sm text-label-sm uppercase px-space-sm py-0.5 rounded-full font-bold">
                Free 60-Second Scan
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-primary font-bold">
                Ready to accelerate your job hunt?
              </h2>
              <p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
                Scan your resume now — no credit card required. Uncover blind spots that are costing
                you six-figure interviews.
              </p>
            </div>

            {/* Instant File Drop Trigger */}
            <label
              htmlFor="landing-file-input"
              className="w-full md:w-auto min-w-[280px] bg-surface-container-lowest text-on-surface p-space-md rounded-xl shadow-md text-center flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-low transition-all border border-surface-container"
            >
              <input
                id="landing-file-input"
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                className="hidden"
                onChange={handleFileUpload}
              />
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-space-xs">
                <span className="material-symbols-outlined text-[24px]">upload_file</span>
              </div>
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                Choose Resume File
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                or drop file here (PDF/Word)
              </span>
              <div className="mt-space-sm w-full py-space-xs bg-primary text-on-primary rounded font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors">
                Start Free Diagnostic
              </div>
            </label>
          </div>
        </div>
      </section>

      {/* Video Demo Modal */}
      <DemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </div>
  );
};
