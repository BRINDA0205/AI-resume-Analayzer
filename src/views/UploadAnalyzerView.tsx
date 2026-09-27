import React, { useState } from 'react';
import { ViewType } from '../types';

interface UploadAnalyzerViewProps {
  onNavigate: (view: ViewType) => void;
  stagedFile: File | null;
  onSelectFile: (file: File | null) => void;
  onRunAnalysis: () => void;
}

export const UploadAnalyzerView: React.FC<UploadAnalyzerViewProps> = ({
  onNavigate,
  stagedFile,
  onSelectFile,
  onRunAnalysis,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [pastedResumeText, setPastedResumeText] = useState('');
  const [targetJobRole, setTargetJobRole] = useState('Software Development Engineer (Campus & New Grad @ Tier-1 Tech)');

  // Default simulated file if none uploaded
  const fileName = stagedFile ? stagedFile.name : 'Brinda_Ukani_ComputerScience_FinalYear_2025.pdf';
  const fileSize = stagedFile
    ? `${(stagedFile.size / (1024 * 1024)).toFixed(1)} MB`
    : '1.9 MB';

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onSelectFile(e.target.files[0]);
    }
  };

  const handleStartAnalysis = () => {
    setIsScanning(true);
    setScanStep('Executing Multi-Pass Scanner...');

    setTimeout(() => {
      setScanStep('Simulating Taleo, Greenhouse, Workday & Campus Placement parsers...');
    }, 700);

    setTimeout(() => {
      setScanStep('Mapping technical skill taxonomy, DSA foundations & STAR metrics...');
    }, 1400);

    setTimeout(() => {
      setScanStep('Audit Complete! Preparing report...');
    }, 2000);

    setTimeout(() => {
      setIsScanning(false);
      onRunAnalysis();
      onNavigate('analysis-results');
    }, 2600);
  };

  const handleLinkedInImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkedInUrl) {
      // Simulate file creation from LinkedIn
      const fakeFile = new File(['LinkedIn Profile Ingestion'], 'LinkedIn_Import_Brinda_Ukani.pdf', {
        type: 'application/pdf',
      });
      onSelectFile(fakeFile);
      setShowLinkedInModal(false);
    }
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pastedResumeText) {
      const fakeFile = new File([pastedResumeText], 'Pasted_Text_Resume_Analysis.txt', {
        type: 'text/plain',
      });
      onSelectFile(fakeFile);
      setShowPasteModal(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1240px] w-full mx-auto pb-space-xl space-y-space-lg">
        {/* Header Context & Quick Meta */}
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
              <span className="text-on-surface font-semibold">Resume Analyzer</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              Upload &amp; Analyze Resume
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Upload your existing resume in PDF or DOCX format to execute multi-pass neural
              analysis, ATS compliance simulation, and deep skill taxonomy mapping.
            </p>
          </div>

          <div className="flex items-center gap-space-sm self-start md:self-auto bg-surface-container px-space-md py-space-xs rounded-xl shadow-xs border border-surface-container-high">
            <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-tertiary font-semibold">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              <span>4 Analysis Credits Available</span>
            </div>
            <span className="text-outline-variant">•</span>
            <button
              onClick={() => alert('Add Analysis Credits:\n- 10 Credits: $15\n- 50 Credits: $49\n- Unlimited Pro: $29/mo')}
              className="font-label-sm text-label-sm text-primary font-semibold hover:underline cursor-pointer"
            >
              Get more
            </button>
          </div>
        </div>

        {/* Main Workflow Layout (Grid: Upload & Active State) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left Column: Primary Ingestion Dropzone */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <label
              htmlFor="analyzer-file-input"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative group cursor-pointer bg-surface-container-lowest rounded-xl p-space-xl shadow-xs transition-all duration-300 hover:shadow-md hover:bg-surface-container-low text-center flex flex-col items-center justify-center min-h-[340px] border-2 ${
                isDragging
                  ? 'border-primary bg-surface-container-high ring-2 ring-primary'
                  : 'border-dashed border-surface-container-high'
              }`}
            >
              {/* Subtle corner accent dot */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant font-medium">
                <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
                <span>Engine v4.2 Ready</span>
              </div>

              {/* Upload Core Icon with Gradient Sparkle Badge */}
              <div className="relative mb-space-md">
                <div className="w-20 h-20 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-105 shadow-xs">
                  <span className="material-symbols-outlined text-[40px]">upload_file</span>
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-on-primary shadow-xs">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                </div>
              </div>

              {/* Typography / Instructions */}
              <h2 className="font-headline-md text-headline-md text-on-surface mb-1 font-bold">
                Drag and drop your resume here, or{' '}
                <span className="text-primary underline font-bold hover:text-primary-container">
                  browse files
                </span>
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                Supported file formats: PDF, DOCX (Max file size: 10MB)
              </p>

              <input
                id="analyzer-file-input"
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Alternate Input Modalities */}
              <div
                className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowLinkedInModal(true)}
                  className="inline-flex items-center gap-1.5 px-space-md py-space-xs bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md rounded-lg transition-colors cursor-pointer border border-surface-container"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">link</span>
                  <span>Import via LinkedIn URL</span>
                </button>
                <span className="text-outline-variant font-label-sm text-label-sm">or</span>
                <button
                  onClick={() => setShowPasteModal(true)}
                  className="inline-flex items-center gap-1.5 px-space-md py-space-xs bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md rounded-lg transition-colors cursor-pointer border border-surface-container"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    content_paste
                  </span>
                  <span>Paste Plain Text Resume</span>
                </button>
              </div>
            </label>

            {/* Privacy & Security Notice */}
            <div className="flex items-center justify-between px-space-md py-space-sm bg-surface-container-lowest rounded-xl shadow-xs text-on-surface-variant border border-surface-container">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[18px] text-tertiary-container">
                  lock
                </span>
                <span className="font-body-sm text-body-sm">
                  256-bit encrypted ATS parsing. Data never trained on public LLMs.
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-outline font-medium">
                SOC2 Compliant
              </span>
            </div>
          </div>

          {/* Right Column: Active Ingested Document State & Execution Controls */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            {/* Active File Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs space-y-space-md border border-surface-container">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container" />
                  <span>Staged Document</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span> Ready
                </span>
              </div>

              {/* Document Profile Row */}
              <div className="flex items-start gap-space-md p-space-md bg-surface-container-low rounded-xl border border-surface-container">
                <div className="w-12 h-14 bg-error-container text-on-error-container rounded-lg flex flex-col items-center justify-center shrink-0 shadow-xs">
                  <span className="font-label-sm text-label-sm font-bold leading-none">PDF</span>
                  <span className="material-symbols-outlined text-[20px] mt-0.5">description</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-space-xs">
                    <p className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                      {fileName}
                    </p>
                    <button
                      onClick={() => onSelectFile(null)}
                      className="text-on-surface-variant hover:text-error transition-colors p-0.5 cursor-pointer"
                      title="Remove Document"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {fileSize} • Staged just now
                  </p>
                  {/* Completion Indicator */}
                  <div className="mt-space-sm space-y-1">
                    <div className="flex justify-between font-label-sm text-label-sm">
                      <span className="text-tertiary-container font-semibold">100% Uploaded</span>
                      <span className="text-on-surface-variant">Validated</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                      <div className="bg-tertiary-container h-full w-full rounded-full transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pre-Analysis Configuration Matrix */}
              <div className="space-y-space-sm pt-space-xs">
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Analysis Parameters
                </p>

                {/* Toggle 1: Strict ATS Simulator */}
                <label className="flex items-start gap-space-sm p-space-sm rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors border border-transparent hover:border-surface-container">
                  <input
                    defaultChecked
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    type="checkbox"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">
                        Strict ATS Scanner Mode
                      </span>
                      <span className="font-label-sm text-label-sm bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface-variant font-medium">
                        Taleo/Greenhouse
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Simulate strict parser failures and reject non-standard glyphs or parsing traps.
                    </p>
                  </div>
                </label>

                {/* Toggle 2: Target Job Description Comparison */}
                <div className="p-space-sm rounded-lg hover:bg-surface-container-low transition-colors space-y-space-xs border border-transparent hover:border-surface-container">
                  <label className="flex items-start gap-space-sm cursor-pointer">
                    <input
                      defaultChecked
                      className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                      type="checkbox"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          Target Job Description Comparison
                        </span>
                        <span className="font-label-sm text-label-sm text-primary font-semibold">
                          Benchmarked
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Benchmark keywords against a specific live opportunity.
                      </p>
                    </div>
                  </label>
                  {/* Nested Job Dropdown Selector */}
                  <div className="pl-6 pt-1">
                    <div className="relative">
                      <select
                        value={targetJobRole}
                        onChange={(e) => setTargetJobRole(e.target.value)}
                        className="w-full h-10 pl-3 pr-8 bg-surface-container-lowest font-body-sm text-body-sm text-on-surface rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer border border-surface-container"
                      >
                        <option>Senior Software Engineer @ Stripe (Production Platform)</option>
                        <option>Staff Full Stack Architect @ Linear</option>
                        <option>Principal Distributed Systems Engineer @ Cloudflare</option>
                        <option>+ Paste new custom job description...</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Toggle 3: Bullet Rewrite Suggestions */}
                <label className="flex items-start gap-space-sm p-space-sm rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors border border-transparent hover:border-surface-container">
                  <input
                    defaultChecked
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    type="checkbox"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                      Include STAR Metric Bullet Rewrites
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Generate high-impact alternative lines for weakly quantified responsibilities.
                    </p>
                  </div>
                </label>
              </div>

              {/* Primary Execution CTA */}
              <div className="pt-space-sm space-y-space-xs">
                <button
                  onClick={handleStartAnalysis}
                  disabled={isScanning}
                  className={`w-full py-3 px-space-md text-on-primary font-label-md text-label-md font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-space-xs cursor-pointer ${
                    isScanning
                      ? 'bg-primary/80 cursor-wait'
                      : 'bg-gradient-to-r from-primary to-secondary hover:opacity-95'
                  }`}
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isScanning ? 'animate-spin' : ''
                    }`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {isScanning ? 'autorenew' : 'bolt'}
                  </span>
                  <span>{isScanning ? scanStep : 'Run Full AI Resume Analysis'}</span>
                  {!isScanning && (
                    <span className="font-label-sm text-label-sm opacity-80">(1 Credit)</span>
                  )}
                </button>

                <div className="flex items-center justify-center gap-space-md pt-1">
                  <label
                    htmlFor="analyzer-file-input"
                    className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  >
                    Replace Document
                  </label>
                  <span className="text-outline-variant">•</span>
                  <button
                    onClick={() => onSelectFile(null)}
                    className="font-label-sm text-label-sm text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                    type="button"
                  >
                    Discard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: "What We Scan For" Intelligence Grid */}
        <div className="space-y-space-md pt-space-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                What We Scan For
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Our deep inspection pipeline simulates commercial recruiters &amp; ATS systems across three analytical pillars.
              </p>
            </div>
            <span className="hidden md:inline-flex font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wider bg-surface-container px-3 py-1 rounded-full border border-surface-container-high">
              Multi-Pass Neural Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Column 1: ATS Compliance */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs space-y-space-sm flex flex-col justify-between border border-surface-container">
              <div className="space-y-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">policy</span>
                </div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">
                  1. ATS Parsing &amp; Formatting
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Validates that commercial applicant tracking systems can extract contact details,
                  dates, and role titles without garbling table layouts or multi-column text flows.
                </p>
              </div>
              <div className="space-y-1.5 pt-space-xs border-t border-surface-container mt-2">
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface font-medium">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                    check_circle
                  </span>
                  <span>Section heading detection standard</span>
                </div>
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface font-medium">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                    check_circle
                  </span>
                  <span>Embedded font &amp; unicode sanity check</span>
                </div>
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface font-medium">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                    check_circle
                  </span>
                  <span>Contact metadata parse reliability</span>
                </div>
              </div>
            </div>

            {/* Column 2: Content & Impact */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs space-y-space-sm flex flex-col justify-between border border-surface-container">
              <div className="space-y-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[22px]">trending_up</span>
                </div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">
                  2. Impact &amp; STAR Rigor
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Screens each bullet point against the Situation-Task-Action-Result format,
                  highlighting passive voice, missing KPI numbers, and generic responsibility
                  wording.
                </p>
              </div>
              <div className="space-y-1.5 pt-space-xs border-t border-surface-container mt-2">
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface font-medium">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                    check_circle
                  </span>
                  <span>Quantified metric detection (%, $, ms)</span>
                </div>
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface font-medium">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                    check_circle
                  </span>
                  <span>Executive action verb strength ranking</span>
                </div>
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface font-medium">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                    check_circle
                  </span>
                  <span>Brevity &amp; dense information density</span>
                </div>
              </div>
            </div>

            {/* Column 3: Skill & Keyword Taxonomy */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs space-y-space-sm flex flex-col justify-between border border-surface-container">
              <div className="space-y-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[22px]">hub</span>
                </div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">
                  3. Keyword &amp; Seniority Match
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Cross-references hard skills, domain architecture, infrastructure toolchains, and
                  scope markers against contemporary industry hiring matrices.
                </p>
              </div>
              <div className="space-y-1.5 pt-space-xs border-t border-surface-container mt-2">
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface font-medium">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                    check_circle
                  </span>
                  <span>Hard skill matrix &amp; tool parity</span>
                </div>
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface font-medium">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                    check_circle
                  </span>
                  <span>Seniority language grading (Staff/Lead)</span>
                </div>
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface font-medium">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                    check_circle
                  </span>
                  <span>Target job keyword gap coverage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LinkedIn Import Modal */}
      {showLinkedInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-margin">
          <div className="bg-surface-container-lowest rounded-xl max-w-md w-full p-space-lg shadow-xl border border-surface-container">
            <h3 className="font-title-sm text-title-sm text-on-surface font-bold mb-2">
              Import from LinkedIn Profile
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              Enter your public LinkedIn profile link to parse experience, headline, and skills directly into the ATS engine.
            </p>
            <form onSubmit={handleLinkedInImport} className="space-y-4">
              <input
                type="url"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                placeholder="https://linkedin.com/in/yourname"
                className="w-full h-10 px-3 bg-surface-container-low border border-surface-container rounded-lg text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLinkedInModal(false)}
                  className="px-4 py-2 text-on-surface-variant text-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary font-semibold rounded-lg text-label-md"
                >
                  Import Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Paste Plain Text Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-margin">
          <div className="bg-surface-container-lowest rounded-xl max-w-xl w-full p-space-lg shadow-xl border border-surface-container">
            <h3 className="font-title-sm text-title-sm text-on-surface font-bold mb-2">
              Paste Plain Text Resume
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              Copy and paste the plain text of your resume. Our parser will extract sections and structure automatically.
            </p>
            <form onSubmit={handlePasteSubmit} className="space-y-4">
              <textarea
                value={pastedResumeText}
                onChange={(e) => setPastedResumeText(e.target.value)}
                placeholder="Alex Rivera\nSenior Full Stack Engineer\nExperience:\n- Architected distributed microservices..."
                rows={8}
                className="w-full p-3 bg-surface-container-low border border-surface-container rounded-lg text-body-sm text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasteModal(false)}
                  className="px-4 py-2 text-on-surface-variant text-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary font-semibold rounded-lg text-label-md"
                >
                  Ingest Text
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
