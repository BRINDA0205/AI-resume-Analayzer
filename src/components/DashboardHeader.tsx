import React, { useState } from 'react';
import { ViewType, UserProfile } from '../types';
import { BRAND_LOGO_URL, DEFAULT_USER_PROFILE } from '../data/mockData';

interface DashboardHeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onToggleMobileSidebar: () => void;
  breadcrumbChild?: string;
  onSearch?: (query: string) => void;
  currentUser?: UserProfile;
  onOpenProfileModal?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  currentView,
  onNavigate,
  onToggleMobileSidebar,
  breadcrumbChild = 'Console',
  onSearch,
  currentUser = DEFAULT_USER_PROFILE,
  onOpenProfileModal,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const notifications = [
    {
      id: '1',
      title: 'ATS Scan Completed',
      text: `${currentUser.name}'s Final Year CS Resume scored 92/100 (+14% increase).`,
      time: '15m ago',
      unread: true,
    },
    {
      id: '2',
      title: 'Campus Placement SDE Drive',
      text: 'Google & Microsoft 2025 New Grad Software Engineer applications active.',
      time: '1h ago',
      unread: true,
    },
    {
      id: '3',
      title: 'Skill Gap Recommendation',
      text: 'Add Docker & Redis basics to reach 99% placement ATS match.',
      time: '1d ago',
      unread: false,
    },
  ];

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface/85 backdrop-blur-xl z-40 flex items-center justify-between px-space-md sm:px-space-lg border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-space-sm sm:gap-space-md min-w-0">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 rounded-lg text-on-surface hover:bg-surface-container transition-colors"
          aria-label="Open sidebar"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <img
          alt="ResumeAI Brand Logo"
          className="h-7 w-auto object-contain hidden xl:block"
          src={BRAND_LOGO_URL}
        />

        <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant truncate">
          <button
            onClick={() => onNavigate('dashboard')}
            className="hover:text-on-surface transition-colors cursor-pointer"
          >
            App
          </button>
          <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
          <span className="text-on-surface font-semibold truncate">{breadcrumbChild}</span>
        </div>
      </div>

      {/* Right: Search, Notifications, Upload CTA, Profile */}
      <div className="flex items-center gap-space-sm sm:gap-space-md">
        {/* Search Input */}
        <div className="relative hidden md:block w-52 lg:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              if (onSearch) onSearch(e.target.value);
            }}
            placeholder="Search resumes, skills, SDE roles..."
            className="w-full h-10 pl-9 pr-4 bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
          />
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
            type="button"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container p-space-sm z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-space-xs pb-space-xs border-b border-surface-container">
                <span className="font-title-sm text-title-sm text-on-surface font-semibold flex items-center gap-1.5">
                  <span>🔔</span> Notifications
                </span>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                  2 NEW
                </span>
              </div>
              <div className="space-y-space-xs mt-space-xs">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-space-xs rounded-lg transition-colors cursor-pointer ${
                      n.unread ? 'bg-surface-container-low' : 'hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center justify-between text-label-sm font-semibold">
                      <span className="text-on-surface">{n.title}</span>
                      <span className="text-on-surface-variant text-[10px]">{n.time}</span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">
                      {n.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upload Resume Button */}
        <button
          onClick={() => onNavigate('resume-analyzer')}
          className="bg-gradient-to-r from-primary-container to-secondary text-on-primary font-label-md text-label-md px-space-md py-space-sm rounded-lg shadow-sm hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)] transition-all flex items-center gap-space-xs cursor-pointer font-semibold"
        >
          <span className="material-symbols-outlined text-[18px]">upload_file</span>
          <span className="hidden sm:inline">Upload Resume</span>
        </button>

        {/* User Avatar Capsule */}
        <button
          onClick={onOpenProfileModal}
          className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-surface-container-low hover:bg-surface-container border border-surface-container transition-all cursor-pointer"
          title={`Logged in as ${currentUser.name} (Click to view profile)`}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-secondary text-on-primary flex items-center justify-center font-bold text-xs shadow-xs">
            BU
          </div>
          <span className="font-label-sm text-label-sm font-bold text-on-surface hidden xl:inline">
            {currentUser.name.split(' ')[0]}
          </span>
        </button>
      </div>
    </header>
  );
};
