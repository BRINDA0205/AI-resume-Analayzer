import React, { useState } from 'react';
import { BRAND_LOGO_URL } from '../data/mockData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-surface-container-low pt-space-xl pb-space-lg border-t border-surface-container">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-gutter mb-space-xl">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <img
                alt="ResumeAI Brand Logo"
                className="h-7 w-auto object-contain"
                src={BRAND_LOGO_URL}
              />
              <span className="font-headline-md text-headline-md text-on-surface font-bold">
                ResumeAI
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm leading-relaxed">
              Empowering talent with precision AI analysis, ATS optimization, and actionable intelligence to accelerate career trajectories.
            </p>
            <div className="space-y-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold">
                Stay Updated
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-xs gap-space-xs">
                <input
                  className="h-10 px-space-sm bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full shadow-[0_1px_3px_rgba(15,23,42,0.04)] border border-surface-container-high"
                  placeholder="Enter your work email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="h-10 px-space-md bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container transition-colors shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
              {subscribed && (
                <p className="text-tertiary-container font-label-sm text-label-sm flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Thank you! You're subscribed to hiring trends.
                </p>
              )}
            </div>
          </div>

          {/* Links 1: Product */}
          <div className="space-y-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold">
              Product
            </span>
            <ul className="space-y-space-xs">
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#demo-analyzer">
                  Resume Scorer
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#demo-analyzer">
                  ATS Parser
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#features">
                  Skill Matching
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#features">
                  Cover Letters
                </a>
              </li>
            </ul>
          </div>

          {/* Links 2: Solutions */}
          <div className="space-y-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold">
              Solutions
            </span>
            <ul className="space-y-space-xs">
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                  Software Engineers
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                  Product Managers
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                  Executives
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                  Early Career
                </a>
              </li>
            </ul>
          </div>

          {/* Links 3: Resources */}
          <div className="space-y-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold">
              Resources
            </span>
            <ul className="space-y-space-xs">
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                  ATS Benchmarks
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                  Resume Library
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                  Career Blog
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Links 4: Company & Legal */}
          <div className="space-y-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold">
              Company & Legal
            </span>
            <ul className="space-y-space-xs">
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-space-md border-t border-surface-container flex flex-col md:flex-row items-center justify-between text-on-surface-variant font-body-sm text-body-sm gap-space-sm">
          <span>© 2026 ResumeAI Technologies Inc. All rights reserved.</span>
          <div className="flex items-center gap-space-md">
            <a className="hover:text-on-surface transition-colors" href="#">
              Security
            </a>
            <a className="hover:text-on-surface transition-colors" href="#">
              System Status
            </a>
            <a className="hover:text-on-surface transition-colors" href="#">
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
