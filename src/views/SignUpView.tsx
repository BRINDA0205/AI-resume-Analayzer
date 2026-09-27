import React, { useState } from 'react';
import { ViewType, UserProfile } from '../types';
import { BRAND_LOGO_URL, BRAND_LOGO_AUTH_URL, DEFAULT_USER_PROFILE } from '../data/mockData';

interface SignUpViewProps {
  onNavigate: (view: ViewType) => void;
  onSignUpSuccess: (user?: UserProfile) => void;
}

export const SignUpView: React.FC<SignUpViewProps> = ({ onNavigate, onSignUpSuccess }) => {
  const [fullName, setFullName] = useState('Brinda Ukani');
  const [email, setEmail] = useState('stud.2301201089@kpgu.ac.in');
  const [careerDomain, setCareerDomain] = useState('cs-student');
  const [password, setPassword] = useState('Password@2025');
  const [confirmPassword, setConfirmPassword] = useState('Password@2025');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [validationError, setValidationError] = useState('');

  // Live password strength
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength();
  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      setValidationError('Please agree to the Terms of Service to proceed.');
      return;
    }
    setValidationError('');
    const userToSave: UserProfile = {
      ...DEFAULT_USER_PROFILE,
      name: fullName || DEFAULT_USER_PROFILE.name,
      email: email || DEFAULT_USER_PROFILE.email,
    };
    onSignUpSuccess(userToSave);
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      {/* Header */}
      <header className="w-full h-16 bg-surface/90 backdrop-blur-md border-b border-surface-container flex items-center justify-between px-margin">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-space-sm cursor-pointer"
        >
          <img
            alt="ResumeAI Brand Logo"
            className="h-8 w-auto object-contain"
            src={BRAND_LOGO_URL}
          />
          <span className="font-title-sm text-title-sm text-on-surface font-bold">
            ResumeAI
          </span>
        </button>
        <button
          onClick={() => onNavigate('landing')}
          className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
        >
          Back to Home
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-margin py-space-lg lg:py-space-xl flex-1 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start w-full">
          {/* Left Column: Value Proposition & Social Proof */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-space-lg lg:sticky lg:top-24">
            <div className="space-y-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold border border-surface-container">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
                <span>CAMPUS &amp; ENGINEERING CAREER INTELLIGENCE</span>
              </div>
              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
                Accelerate your campus placement with AI.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Engineered for final-year engineering students &amp; graduates. Reverse-engineer hiring algorithms, pinpoint exact skill gaps, and land SDE-1 interviews at market-leading organizations.
              </p>

              {/* Core Benefits List */}
              <div className="space-y-space-sm pt-space-xs">
                <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low border border-surface-container">
                  <div className="h-6 w-6 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-base">check</span>
                  </div>
                  <div>
                    <p className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Instant ATS compliance score &amp; keyword matching
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Scan against 40+ ATS engines used by Google, Microsoft, Amazon, and top startups.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low border border-surface-container">
                  <div className="h-6 w-6 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-base">check</span>
                  </div>
                  <div>
                    <p className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Quantifiable STAR metric rewrites for academic projects
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Transform passive project statements into high-impact, outcome-focused engineering achievements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low border border-surface-container">
                  <div className="h-6 w-6 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-base">check</span>
                  </div>
                  <div>
                    <p className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Real-time SDE job description gap analysis
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Identify missing core keywords like Docker, Redis, and DSA frameworks before submitting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial & Placement Stat */}
            <div className="space-y-space-md pt-space-xs">
              <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container space-y-space-xs">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center font-title-sm text-primary font-bold">
                    BU
                  </div>
                  <div>
                    <div className="font-title-sm text-title-sm text-on-surface font-bold">
                      Brinda Ukani
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      Computer Science Engineering Student • KPGU
                    </div>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                  “The AI STAR rewrite feature helped me properly showcase my final year capstone project. My resume went straight through the placement portal filter to the technical interview round.”
                </p>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                <div>
                  <span className="font-headline-md text-headline-md text-primary font-bold">92.4%</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Average student ATS score boost</p>
                </div>
                <div className="text-right">
                  <span className="font-headline-md text-headline-md text-tertiary-container font-bold">3.2x</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">More campus interview calls</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sign Up Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest p-space-lg sm:p-space-xl rounded-2xl shadow-xl border border-surface-container space-y-space-md">
              <div className="flex items-center justify-between">
                <img
                  alt="ResumeAI Auth Brand Logo"
                  className="h-8 w-auto object-contain"
                  src={BRAND_LOGO_AUTH_URL}
                />
                <div className="text-right">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Already have an account? </span>
                  <button
                    onClick={() => onNavigate('sign-in')}
                    className="font-label-md text-label-md text-primary hover:text-primary-container font-semibold transition-colors cursor-pointer"
                  >
                    Sign in
                  </button>
                </div>
              </div>

              <div className="space-y-space-xs">
                <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">
                  Create your Student / Pro account
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Start optimizing your resume and accelerate your campus placement readiness today.
                </p>
              </div>

              {validationError && (
                <div className="p-3 bg-error-container/20 text-error font-label-md text-label-md rounded-lg flex items-center gap-2 border border-error-container">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{validationError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-space-md">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="full-name">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
                      person
                    </span>
                    <input
                      className="w-full pl-10 pr-3 py-2 text-body-md font-body-md bg-surface-container-lowest text-on-surface rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-low transition-all border border-surface-container"
                      id="full-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Brinda Ukani"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="email">
                    Institutional / Personal Email
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
                      mail
                    </span>
                    <input
                      className="w-full pl-10 pr-3 py-2 text-body-md font-body-md bg-surface-container-lowest text-on-surface rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-low transition-all border border-surface-container"
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="stud.2301201089@kpgu.ac.in"
                      required
                    />
                  </div>
                </div>

                {/* Target Job Role Dropdown */}
                <div className="space-y-1">
                  <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="role-select">
                    Current Status &amp; Domain
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
                      school
                    </span>
                    <select
                      className="w-full pl-10 pr-10 py-2 text-body-md font-body-md bg-surface-container-lowest text-on-surface rounded-lg shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-low transition-all border border-surface-container cursor-pointer"
                      id="role-select"
                      value={careerDomain}
                      onChange={(e) => setCareerDomain(e.target.value)}
                    >
                      <option value="cs-student">Computer Science Engineering Student (Final Year)</option>
                      <option value="swe-grad">Software Engineer / Graduate New Grad</option>
                      <option value="fullstack">Full-Stack &amp; Web Systems Development</option>
                      <option value="ai-ml">Data Science, AI &amp; Machine Learning</option>
                      <option value="other">Other Engineering Discipline</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 text-outline text-lg pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Password Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                  {/* Password */}
                  <div className="space-y-1">
                    <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">
                      Create Password
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
                        lock
                      </span>
                      <input
                        className="w-full pl-10 pr-10 py-2 text-body-md font-body-md bg-surface-container-lowest text-on-surface rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-low transition-all border border-surface-container"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-outline hover:text-on-surface transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1">
                    <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="confirm-password">
                      Confirm Password
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
                        lock_reset
                      </span>
                      <input
                        className="w-full pl-10 pr-10 py-2 text-body-md font-body-md bg-surface-container-lowest text-on-surface rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-low transition-all border border-surface-container"
                        id="confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                      />
                      {passwordsMatch && (
                        <span className="material-symbols-outlined absolute right-3 text-lg text-tertiary-container">
                          check_circle
                        </span>
                      )}
                      {passwordsMismatch && (
                        <span className="material-symbols-outlined absolute right-3 text-lg text-error">
                          cancel
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Password Strength Meter */}
                <div className="space-y-1 bg-surface-container-low p-space-sm rounded-lg border border-surface-container">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      Security Evaluation
                    </span>
                    <span
                      className={`font-label-sm text-label-sm ${
                        strength === 0
                          ? 'text-outline'
                          : strength <= 1
                          ? 'text-error'
                          : strength <= 2
                          ? 'text-secondary'
                          : 'text-tertiary-container'
                      }`}
                    >
                      {strength === 0
                        ? 'Enter minimum 8 characters'
                        : strength <= 1
                        ? 'Weak - add complexity'
                        : strength <= 2
                        ? 'Moderate - add numbers & symbols'
                        : 'Strong - 8+ chars, numbers & symbols'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 h-1.5 pt-0.5">
                    <div
                      className={`rounded-full transition-colors ${
                        strength >= 1 ? 'bg-primary' : 'bg-surface-container-high'
                      }`}
                    />
                    <div
                      className={`rounded-full transition-colors ${
                        strength >= 2 ? 'bg-primary' : 'bg-surface-container-high'
                      }`}
                    />
                    <div
                      className={`rounded-full transition-colors ${
                        strength >= 3 ? 'bg-tertiary-container' : 'bg-surface-container-high'
                      }`}
                    />
                    <div
                      className={`rounded-full transition-colors ${
                        strength >= 4 ? 'bg-tertiary-container' : 'bg-surface-container-high'
                      }`}
                    />
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-space-xs pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-0 focus:ring-offset-0 bg-surface-container-low accent-primary cursor-pointer mt-0.5"
                  />
                  <label htmlFor="terms" className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none">
                    I agree to the <button type="button" onClick={() => onNavigate('landing')} className="text-primary hover:underline">Terms of Service</button> and <button type="button" onClick={() => onNavigate('landing')} className="text-primary hover:underline">Campus Placement Privacy Policy</button>.
                  </label>
                </div>

                {/* Primary CTA */}
                <button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-space-xs cursor-pointer"
                >
                  <span>Create Account &amp; Open Placement Dashboard</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-space-md border-t border-surface-container bg-surface flex flex-col sm:flex-row items-center justify-between px-margin text-on-surface-variant font-label-sm text-label-sm">
        <p>© 2026 ResumeAI Intelligence Platform. Built for Computer Science Engineering students &amp; professionals.</p>
        <div className="flex items-center gap-space-md mt-2 sm:mt-0">
          <button onClick={() => onNavigate('landing')} className="hover:text-on-surface cursor-pointer">Terms</button>
          <button onClick={() => onNavigate('landing')} className="hover:text-on-surface cursor-pointer">Privacy</button>
          <button onClick={() => onNavigate('landing')} className="hover:text-on-surface cursor-pointer">Placement Support</button>
        </div>
      </footer>
    </div>
  );
};
