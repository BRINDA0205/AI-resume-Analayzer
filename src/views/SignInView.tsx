import React, { useState } from 'react';
import { ViewType, UserProfile } from '../types';
import { BRAND_LOGO_URL, BRAND_LOGO_AUTH_URL, DEFAULT_USER_PROFILE } from '../data/mockData';

interface SignInViewProps {
  onNavigate: (view: ViewType) => void;
  onLoginSuccess: (user?: UserProfile) => void;
}

export const SignInView: React.FC<SignInViewProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('stud.2301201089@kpgu.ac.in');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userToLogin: UserProfile = {
      ...DEFAULT_USER_PROFILE,
      email: email || DEFAULT_USER_PROFILE.email,
    };
    onLoginSuccess(userToLogin);
    onNavigate('dashboard');
  };

  const handleQuickLogin = () => {
    onLoginSuccess(DEFAULT_USER_PROFILE);
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

      {/* Main Container */}
      <main className="w-full max-w-7xl mx-auto px-margin py-space-lg flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* Left Column: Social Proof & Metrics Canvas */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col justify-between p-space-xl rounded-xl bg-surface-container relative overflow-hidden shadow-xs border border-surface-container-high/60">
            {/* Ambient Glowing Aura */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Badging & Overline */}
            <div className="relative z-10 space-y-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-lowest rounded-full shadow-xs text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold border border-surface-container">
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                Engineering Student &amp; Career Intelligence
              </div>
              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight max-w-lg font-bold">
                Over <span className="text-primary font-metric-score text-display-lg">120,000+</span> engineers &amp; graduates land interviews faster.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                Engineered for final-year students and software engineers targeting Tier-1 tech, campus placement drives, and high-growth product teams.
              </p>
            </div>

            {/* Visual Proof Centerpiece */}
            <div className="relative z-10 my-space-lg space-y-space-md">
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-md space-y-space-md max-w-md border border-surface-container">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[24px]">description</span>
                    </div>
                    <div>
                      <div className="font-title-sm text-title-sm text-on-surface font-bold truncate max-w-[220px]">
                        Brinda_Ukani_FinalYear_CS.pdf
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">
                        Calibrated for SDE-1 Campus Placement
                      </div>
                    </div>
                  </div>
                  <span className="px-space-xs py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[14px]">check</span> Ready
                  </span>
                </div>

                {/* Score Wheel & Progress Row */}
                <div className="flex items-center gap-space-lg pt-space-xs">
                  <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                      <path
                        className="text-surface-container-high"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      <path
                        className="text-tertiary-container"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="92, 100"
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="font-headline-md text-headline-md text-on-surface font-bold">
                        92%
                      </span>
                      <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider font-semibold">
                        Score
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-space-xs">
                    <div className="flex justify-between items-center text-label-sm font-label-md">
                      <span className="text-on-surface font-medium">ATS Placement Safe</span>
                      <span className="text-tertiary-container font-title-sm font-bold">
                        Top 3% Candidate
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-container to-tertiary-container w-[92%] rounded-full" />
                    </div>
                    <div className="flex items-center gap-space-xs text-body-sm text-on-surface-variant font-medium">
                      <span className="material-symbols-outlined text-[14px] text-tertiary-container">
                        check_circle
                      </span>
                      <span>16 Core CS Keywords • 0 Parse Traps</span>
                    </div>
                  </div>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-space-xs pt-space-xs">
                  <span className="px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[13px] text-primary">auto_awesome</span> Data Structures &amp; Algorithms
                  </span>
                  <span className="px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[13px] text-primary">auto_awesome</span> Full-Stack React &amp; Node.js
                  </span>
                  <span className="px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[13px] text-primary">auto_awesome</span> PostgreSQL &amp; APIs
                  </span>
                </div>
              </div>
            </div>

            {/* Social Proof Testimonial Card */}
            <div className="relative z-10 bg-surface-container-lowest/80 backdrop-blur-md p-space-md rounded-xl space-y-space-sm shadow-xs border border-surface-container">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center font-title-sm text-primary font-bold">
                  BU
                </div>
                <div>
                  <div className="font-title-sm text-title-sm text-on-surface font-bold">
                    Brinda Ukani
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Computer Science Engineering • Final Year Student @ KPGU
                  </div>
                </div>
                <div className="ml-auto flex text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant italic">
                “ResumeAI helped me transform my college capstone project bullets into quantifiable metrics. It pinpointed exact keywords missing from SDE-1 campus placement job descriptions and pushed my ATS score from 74% to 92%!”
              </p>
            </div>

            {/* Bottom Logos Showcase */}
            <div className="relative z-10 pt-space-lg flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest opacity-70">
              <span>Google</span>
              <span>•</span>
              <span>Microsoft</span>
              <span>•</span>
              <span>Amazon</span>
              <span>•</span>
              <span>Stripe</span>
              <span>•</span>
              <span>Atlassian</span>
            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="col-span-1 lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            <div className="bg-surface-container-lowest p-space-lg sm:p-space-xl rounded-xl shadow-xl space-y-space-lg border border-surface-container">
              {/* Top Row: Logo & Sign Up Link */}
              <div className="flex items-center justify-between">
                <img
                  alt="ResumeAI Logo"
                  className="h-8 w-auto object-contain"
                  src={BRAND_LOGO_AUTH_URL}
                />
                <div className="text-right">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">New student? </span>
                  <button
                    onClick={() => onNavigate('sign-up')}
                    className="font-label-md text-label-md text-primary hover:text-primary-container font-semibold transition-colors cursor-pointer"
                  >
                    Sign up free
                  </button>
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-space-xs">
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                  Student &amp; Pro Login
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Sign in to access your resumes, campus ATS reports, and tailored placement tools.
                </p>
              </div>

              {/* Dedicated One-Click Instant Student Login Card */}
              <div className="p-4 bg-surface-container-low rounded-xl border border-primary/25 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="text-base">🎓</span> Instant Student Login
                  </span>
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                    KPGU CS Student
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-title-sm text-title-sm text-on-surface font-bold truncate">
                      Brinda Ukani
                    </p>
                    <p className="font-body-sm text-[12px] text-on-surface-variant truncate">
                      stud.2301201089@kpgu.ac.in
                    </p>
                    <p className="text-[11px] text-primary font-medium mt-0.5">
                      Computer Science Engineering • Final Year
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickLogin}
                    className="px-4 py-2.5 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>Sign In</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Single-Click Social Authentication Stack */}
              <div className="space-y-space-sm">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-space-sm h-11 px-space-md bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg transition duration-150 border border-surface-container cursor-pointer font-medium"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Continue with College Google Account</span>
                </button>
                <div className="grid grid-cols-2 gap-space-sm">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center justify-center gap-space-xs h-11 px-space-sm bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg transition duration-150 border border-surface-container cursor-pointer font-medium"
                  >
                    <svg className="w-4 h-4 fill-current text-on-surface" viewBox="0 0 24 24">
                      <path
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        fillRule="evenodd"
                      />
                    </svg>
                    <span>GitHub</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center justify-center gap-space-xs h-11 px-space-sm bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg transition duration-150 border border-surface-container cursor-pointer font-medium"
                  >
                    <svg className="w-4 h-4 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="w-full h-px bg-surface-container-high" />
                <span className="absolute bg-surface-container-lowest px-space-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  or sign in with email
                </span>
              </div>

              {/* Credentials Form */}
              <form className="space-y-space-md" onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="space-y-1">
                  <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="email">
                    Institutional Email Address
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-on-surface-variant pointer-events-none">
                      mail
                    </span>
                    <input
                      className="w-full h-11 pl-10 pr-space-md rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary font-body-md text-body-md transition border border-surface-container"
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="stud.2301201089@kpgu.ac.in"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-on-surface-variant pointer-events-none">
                      lock
                    </span>
                    <input
                      className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary font-body-md text-body-md transition border border-surface-container"
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 text-on-surface-variant hover:text-on-surface transition flex items-center justify-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Meta Row: Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-space-xs cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-0 focus:ring-offset-0 bg-surface-container-low accent-primary cursor-pointer"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface">Remember ID</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {}}
                    className="font-label-md text-label-md text-primary hover:text-primary-container font-semibold transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Primary CTA */}
                <button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-space-xs cursor-pointer"
                >
                  <span>Sign In as {email === 'stud.2301201089@kpgu.ac.in' ? 'Brinda Ukani' : 'Student'}</span>
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
