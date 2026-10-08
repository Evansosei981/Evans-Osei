import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkGallerySection } from './components/WorkGallerySection';
import { WhatICanDoSection } from './components/WhatICanDoSection';
import { AboutMeSection } from './components/AboutMeSection';
import { AwardsSection } from './components/AwardsSection';
import { TrainingsSection } from './components/TrainingsSection';
import { ContactSection } from './components/ContactSection';
import { SendMessageModal } from './components/SendMessageModal';
import { ArchiveModal } from './components/ArchiveModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { EvansCVModal } from './components/EvansCVModal';
import { LiveStudioModal } from './components/admin/LiveStudioModal';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { portfolioData } from './data/portfolioData';
import { GalleryProject, PortfolioData } from './types/portfolio';

const LIVE_DATA_STORAGE_KEY = 'evans_portfolio_live_data_v3';

function PortfolioApp() {
  const { isDarkMode } = useTheme();

  // Live state that Evans can update anytime
  const [liveData, setLiveData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(LIVE_DATA_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...portfolioData,
          ...parsed,
          profile: {
            ...portfolioData.profile,
            ...(parsed.profile || {})
          },
          galleryProjects: (parsed.galleryProjects && parsed.galleryProjects.length > 0)
            ? parsed.galleryProjects
            : portfolioData.galleryProjects,
          projects: (parsed.projects && parsed.projects.length > 0)
            ? parsed.projects
            : portfolioData.projects,
        };
      }
    } catch {
      // fallback
    }
    return portfolioData;
  });

  // Modals state
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isOwnerSignedIn, setIsOwnerSignedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('evans_owner_signed_in') === 'true';
    } catch {
      return false;
    }
  });
  const [selectedGalleryProject, setSelectedGalleryProject] = useState<GalleryProject | null>(null);

  // Check URL params for ?admin=true or ?edit=true or shortcut keys
  useEffect(() => {
    // 1. URL Parameter check: ?admin=true or ?edit=true
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true' || urlParams.get('edit') === 'true') {
      setIsOwnerSignedIn(true);
      try {
        localStorage.setItem('evans_owner_signed_in', 'true');
      } catch {
        // ignore
      }
      setIsStudioOpen(true);
    }

    // 2. Secret keyboard shortcut: Ctrl+Shift+E or Cmd+Shift+E opens admin login
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        if (isOwnerSignedIn) {
          setIsStudioOpen(true);
        } else {
          setIsAdminAuthOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOwnerSignedIn]);

  const handleOwnerSignOut = () => {
    setIsOwnerSignedIn(false);
    setIsStudioOpen(false);
    try {
      localStorage.removeItem('evans_owner_signed_in');
    } catch {
      // ignore
    }
  };

  const displayName = liveData.profile.name || 'Evans Osei';

  const handleSaveLiveData = (updated: PortfolioData) => {
    setLiveData(updated);
    try {
      localStorage.setItem(LIVE_DATA_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const handleResetLiveData = () => {
    localStorage.removeItem(LIVE_DATA_STORAGE_KEY);
    setLiveData(portfolioData);
  };

  const handleNewContactMessage = (msg: { name: string; email: string; message: string }) => {
    const newMsg = {
      id: 'msg-' + Date.now().toString(36),
      name: msg.name,
      email: msg.email,
      message: msg.message,
      createdAt: new Date().toISOString(),
      read: false,
    };
    const updated: PortfolioData = {
      ...liveData,
      messages: [newMsg, ...(liveData.messages || [])]
    };
    handleSaveLiveData(updated);
  };

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 selection:bg-neutral-800 selection:text-white ${
      isDarkMode ? 'bg-[#0C0C0C] text-[#EDEDED]' : 'bg-[#F8F9FA] text-[#111827]'
    }`}>
      {/* 1. TOP NAVBAR (Single Edit Portfolio button visible only when signed in as owner) */}
      <Navbar 
        onHireMeClick={() => setIsMessageModalOpen(true)}
        onOpenArchive={() => setIsArchiveModalOpen(true)}
        onOpenStudio={() => setIsStudioOpen(true)}
        isOwnerSignedIn={isOwnerSignedIn}
        onOwnerSignOut={handleOwnerSignOut}
      />

      <main className="w-full">
        {/* 2. HERO SECTION */}
        <HeroSection 
          onScrollToWork={scrollToWork}
          onHireMeClick={() => setIsMessageModalOpen(true)}
        />

        {/* 3. WORK GALLERY SECTION (3D coverflow stacked real projects: PulseCare, UG Campus Nav, NeuroGraph, ChronoForge, SikaTrack) */}
        <WorkGallerySection 
          projects={liveData.galleryProjects || []}
          onOpenProjectDetail={(proj) => setSelectedGalleryProject(proj)}
          onOpenArchive={() => setIsArchiveModalOpen(true)}
        />

        {/* 4. WHAT I CAN DO ("My Capabilities" 4x4 tech icons grid + 01 Full-Stack & Algorithms + 02 AI, Data & Operations) */}
        <WhatICanDoSection />

        {/* 5. ABOUT ME SECTION (Stats, bio, Currently block + Interactive Trait Deck) */}
        <AboutMeSection 
          profile={liveData.profile}
          traits={liveData.traits || []}
          onOpenCV={() => setIsCVModalOpen(true)}
        />

        {/* 6. AWARDS AND ACHIEVEMENTS (Photo collage bento + Dean's Honor Roll, Best Algorithm Capstone, UG Tech Innovation) */}
        <AwardsSection 
          awards={liveData.awards || []}
        />

        {/* 7. TRAININGS & HACKATHONS (GDSC University of Ghana, Hacklab Ghana, Applied AI Summit, Cybersecurity CTF) */}
        <TrainingsSection 
          trainings={liveData.trainings || []}
        />

        {/* 8. LET'S WORK TOGETHER (Contact cards 01 Email, 02 GitHub, 03 LinkedIn, Resume download, Send Message) */}
        <ContactSection 
          profile={liveData.profile}
          onOpenMessageModal={() => setIsMessageModalOpen(true)}
          onOpenCV={() => setIsCVModalOpen(true)}
        />
      </main>

      {/* 9. MINIMAL FOOTER (Clean public footer — no duplicate edit buttons) */}
      <footer className={`py-12 px-6 sm:px-10 border-t transition-colors ${
        isDarkMode ? 'border-neutral-800/80 bg-[#0C0C0C] text-neutral-500' : 'border-neutral-200 bg-white text-neutral-600'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {displayName} · University of Ghana, Legon. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsCVModalOpen(true)}
              className="hover:underline transition-colors cursor-pointer"
            >
              Curriculum Vitae
            </button>
            <button
              onClick={() => setIsArchiveModalOpen(true)}
              className="hover:underline transition-colors cursor-pointer"
            >
              All Projects Archive
            </button>
            <a 
              href="#hero" 
              className="hover:underline transition-colors"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* --- MODALS --- */}
      {/* 0. Admin Passcode Gatekeeper Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onAuthenticated={() => {
          setIsAdminAuthOpen(false);
          setIsOwnerSignedIn(true);
          try {
            localStorage.setItem('evans_owner_signed_in', 'true');
          } catch {
            // ignore
          }
          setIsStudioOpen(true);
        }}
      />

      {/* 1. Live Studio Modal (CMS to update the web app anytime) */}
      <LiveStudioModal 
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        data={liveData}
        onSaveData={handleSaveLiveData}
        onResetData={handleResetLiveData}
      />

      {/* 2. Send Message Form Modal */}
      <SendMessageModal 
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        onSubmitMessage={handleNewContactMessage}
      />

      {/* 3. Archive Modal (Technical & Digital tabs matching video) */}
      <ArchiveModal 
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        technicalProjects={liveData.technicalProjects || []}
        digitalProjects={liveData.digitalProjects || []}
        onHireMe={() => {
          setIsArchiveModalOpen(false);
          setIsMessageModalOpen(true);
        }}
      />

      {/* 4. Project Detail Case Study Modal */}
      <ProjectDetailModal 
        project={selectedGalleryProject}
        onClose={() => setSelectedGalleryProject(null)}
      />

      {/* 5. Printable Curriculum Vitae Modal */}
      <EvansCVModal 
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        profile={liveData.profile}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
