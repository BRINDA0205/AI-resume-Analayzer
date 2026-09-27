/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewType, ResumeReport, UserProfile } from './types';
import { defaultResumeReport, sampleRecentResumes, DEFAULT_USER_PROFILE } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { DashboardHeader } from './components/DashboardHeader';
import { StudentProfileModal } from './components/StudentProfileModal';
import { LandingPage } from './views/LandingPage';
import { DashboardView } from './views/DashboardView';
import { UploadAnalyzerView } from './views/UploadAnalyzerView';
import { AnalysisResultsView } from './views/AnalysisResultsView';
import { JobMatcherView } from './views/JobMatcherView';
import { SkillGapView } from './views/SkillGapView';
import { AnalysisHistoryView } from './views/AnalysisHistoryView';
import { SignInView } from './views/SignInView';
import { SignUpView } from './views/SignUpView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [activeReport, setActiveReport] = useState<ResumeReport>(defaultResumeReport);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectResumeReport = (reportId: string) => {
    const found = sampleRecentResumes.find((r) => r.id === reportId);
    if (found) {
      setActiveReport({
        ...defaultResumeReport,
        id: found.id,
        fileName: found.fileName,
        targetRole: found.target,
        overallScore: found.score,
        atsParsingScore: parseInt(found.atsMatch, 10) || 92,
        status: found.status as ResumeReport['status'],
      });
    }
  };

  const handleRunAnalysis = () => {
    if (stagedFile) {
      setActiveReport({
        ...defaultResumeReport,
        fileName: stagedFile.name,
        fileSize: `${(stagedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: 'Just now',
      });
    }
  };

  // Standalone Auth Screens (No Sidebar/Dashboard Header)
  if (currentView === 'sign-in') {
    return (
      <SignInView
        onNavigate={navigateTo}
        onLoginSuccess={(user) => {
          if (user) setCurrentUser(user);
          setCurrentView('dashboard');
        }}
      />
    );
  }

  if (currentView === 'sign-up') {
    return (
      <SignUpView
        onNavigate={navigateTo}
        onSignUpSuccess={(user) => {
          if (user) setCurrentUser(user);
          setCurrentView('dashboard');
        }}
      />
    );
  }

  // Public Landing Page (with Navbar & Footer)
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-surface flex flex-col font-sans">
        <Navbar currentView={currentView} onNavigate={navigateTo} />
        <main className="w-full pt-16 flex-1">
          <LandingPage
            onNavigate={navigateTo}
            onSelectFile={(file) => setStagedFile(file)}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Authenticated Console Layout (Sidebar + Top Dashboard Header)
  const getBreadcrumb = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Console';
      case 'resume-analyzer':
        return 'Resume Analyzer';
      case 'analysis-results':
        return 'Analysis Results';
      case 'job-matcher':
        return 'Job Matcher';
      case 'skill-gap-analysis':
        return 'Skill Gap Analysis';
      case 'analysis-history':
        return 'Analysis History';
      default:
        return 'Console';
    }
  };

  return (
    <div className="min-h-screen bg-surface flex font-sans antialiased text-on-surface">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={navigateTo}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        currentUser={currentUser}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content Area (offset by left-64 on desktop) */}
      <div className="flex-1 flex flex-col min-h-screen w-full lg:pl-64">
        <DashboardHeader
          currentView={currentView}
          onNavigate={navigateTo}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          breadcrumbChild={getBreadcrumb()}
          currentUser={currentUser}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
        />

        <main className="flex-1 w-full pt-20 px-space-md sm:px-space-lg pb-space-xl">
          {currentView === 'dashboard' && (
            <DashboardView
              onNavigate={navigateTo}
              onSelectResumeReport={handleSelectResumeReport}
              currentUser={currentUser}
              onOpenProfileModal={() => setIsProfileModalOpen(true)}
            />
          )}

          {currentView === 'resume-analyzer' && (
            <UploadAnalyzerView
              onNavigate={navigateTo}
              stagedFile={stagedFile}
              onSelectFile={setStagedFile}
              onRunAnalysis={handleRunAnalysis}
            />
          )}

          {currentView === 'analysis-results' && (
            <AnalysisResultsView
              onNavigate={navigateTo}
              report={activeReport}
            />
          )}

          {currentView === 'job-matcher' && (
            <JobMatcherView onNavigate={navigateTo} />
          )}

          {currentView === 'skill-gap-analysis' && (
            <SkillGapView onNavigate={navigateTo} />
          )}

          {currentView === 'analysis-history' && (
            <AnalysisHistoryView
              onNavigate={navigateTo}
              onSelectResumeReport={handleSelectResumeReport}
            />
          )}
        </main>
      </div>

      {/* Student Profile & Placement Settings Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={currentUser}
        onUpdateUser={(updated) => setCurrentUser(updated)}
      />
    </div>
  );
}
