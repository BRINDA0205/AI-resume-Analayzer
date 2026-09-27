import React from 'react';
import { ViewType, UserProfile } from '../types';
import { BRAND_LOGO_URL, DEFAULT_USER_PROFILE } from '../data/mockData';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  currentUser?: UserProfile;
  onOpenProfileModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpenMobile = false,
  onCloseMobile,
  currentUser = DEFAULT_USER_PROFILE,
  onOpenProfileModal,
}) => {
  const navItems: { view: ViewType; label: string; icon: string }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: 'home' },
    { view: 'resume-analyzer', label: 'Resume Analyzer', icon: 'auto_fix_high' },
    { view: 'job-matcher', label: 'Job Matcher', icon: 'work' },
    { view: 'skill-gap-analysis', label: 'Skill Gap Analysis', icon: 'pie_chart' },
    { view: 'analysis-history', label: 'Analysis History', icon: 'history' },
  ];

  const handleNav = (view: ViewType) => {
    onNavigate(view);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-surface-container-high/60 transition-transform duration-200 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo Header */}
          <div className="h-16 px-space-md flex items-center justify-between border-b border-surface-container/60">
            <button
              onClick={() => handleNav('landing')}
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
            {isOpenMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>

          {/* Section Overline */}
          <div className="px-space-md pt-space-md pb-space-xs flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Workspace
            </span>
            <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              KPGU Student
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-space-sm space-y-space-xs overflow-y-auto">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={`w-full flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-all text-left font-label-md text-label-md cursor-pointer ${
                    isActive
                      ? 'bg-surface-container-lowest text-primary font-bold shadow-[0_1px_3px_rgba(15,23,42,0.04)]'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'text-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Student Placement Tier & User Info */}
        <div className="p-space-sm space-y-space-sm border-t border-surface-container/60">
          {/* Student Campus Placement Tier Card */}
          <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-space-xs border border-surface-container">
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-on-surface font-semibold flex items-center gap-1">
                <span>🎓</span> Campus Pro
              </span>
              <span className="text-tertiary-container font-bold text-[11px]">Verified Active</span>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-primary-container h-full rounded-full transition-all duration-300"
                style={{ width: '92%' }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
              <span>ATS Score: 92/100</span>
              <button
                onClick={onOpenProfileModal}
                className="text-primary hover:text-primary-container font-semibold transition-colors cursor-pointer"
              >
                ID: {currentUser.studentId}
              </button>
            </div>
          </div>

          {/* User Profile Capsule */}
          <div className="flex items-center justify-between p-space-xs bg-surface-container rounded-lg">
            <button
              onClick={onOpenProfileModal}
              className="flex items-center gap-space-xs overflow-hidden text-left flex-1 cursor-pointer hover:opacity-85 transition-opacity"
              title="Click to view & edit student profile"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary text-on-primary flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ring-1 ring-primary/20">
                BU
              </div>
              <div className="truncate">
                <p className="font-label-md text-label-md text-on-surface truncate font-semibold">
                  {currentUser.name}
                </p>
                <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                  Final Year CS • KPGU
                </p>
              </div>
            </button>
            <div className="flex items-center gap-space-xs">
              <button
                onClick={onOpenProfileModal}
                className="text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded hover:bg-surface-container-high cursor-pointer"
                title="View & Edit Student Profile"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
              </button>
              <button
                onClick={() => handleNav('sign-in')}
                className="text-on-surface-variant hover:text-error transition-colors p-1 rounded hover:bg-surface-container-high cursor-pointer"
                title="Sign Out"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
