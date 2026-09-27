import React, { useState } from 'react';
import { ViewType } from '../types';
import { BRAND_LOGO_URL, USER_AVATAR_URL } from '../data/mockData';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-7xl mx-auto px-margin flex items-center justify-between gap-gutter">
        {/* Brand */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-space-sm cursor-pointer text-left focus:outline-none"
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-space-lg">
          <a
            href="#features"
            className="font-body-md text-body-md text-on-surface hover:text-primary font-medium transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Testimonials
          </a>
          <button
            onClick={() => onNavigate('dashboard')}
            className="font-body-md text-body-md text-primary hover:text-primary-container font-semibold transition-colors flex items-center gap-1"
          >
            <span>Console</span>
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-space-md">
          <button
            onClick={() => onNavigate('sign-in')}
            className="hidden sm:inline-flex font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-space-sm py-space-xs transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => onNavigate('resume-analyzer')}
            className="bg-gradient-to-r from-primary-container to-secondary text-on-primary font-label-md text-label-md px-space-md py-space-sm rounded-lg shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 transition-all flex items-center gap-space-xs cursor-pointer"
          >
            <span>Analyze My Resume</span>
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            title="Open User Console"
            className="cursor-pointer focus:outline-none ring-2 ring-transparent hover:ring-primary rounded-full transition-all"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-xs"
              src={USER_AVATAR_URL}
            />
          </button>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-on-surface p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-b border-surface-container px-margin py-space-md space-y-space-sm">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-on-surface font-medium hover:text-primary"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-on-surface-variant hover:text-on-surface"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-on-surface-variant hover:text-on-surface"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-on-surface-variant hover:text-on-surface"
          >
            Testimonials
          </a>
          <div className="pt-2 border-t border-surface-container flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('dashboard');
              }}
              className="text-left py-2 font-medium text-primary flex items-center justify-between"
            >
              <span>App Dashboard</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('sign-in');
              }}
              className="text-left py-2 text-on-surface-variant"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
