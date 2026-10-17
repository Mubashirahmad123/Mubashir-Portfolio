import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { ProjectBento } from './components/projects/ProjectBento';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { SkillsConsole } from './components/skills/SkillsConsole';
import { AchievementsSection } from './components/achievements/AchievementsSection';
import { FreelanceSection } from './components/freelance/FreelanceSection';
import { GithubActivity } from './components/github/GithubActivity';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { LiveDemoModal } from './components/modals/LiveDemoModal';
import { CodeInspectModal } from './components/modals/CodeInspectModal';
import { ResumeModal } from './components/modals/ResumeModal';
import { CommandPalette } from './components/modals/CommandPalette';
import { ImageLightboxModal } from './components/modals/ImageLightboxModal';
import { Interactive3DCanvas } from './components/common/Interactive3DCanvas';
import { recordVisitorView } from './lib/supabase';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return true;
    } catch {
      return true;
    }
  });

  const [activeSimulatorId, setActiveSimulatorId] = useState<string | null>(null);
  const [activeCodeInspectId, setActiveCodeInspectId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Synchronize Dark Mode Class on Root
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Record visitor view on mount
  useEffect(() => {
    recordVisitorView();
  }, []);

  // Global ⌘K Keyboard Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToFreelance = () => {
    const el = document.getElementById('freelance');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-200 ${
      isDark 
        ? 'bg-[#090D16] text-[#E2E8F0]' 
        : 'bg-[#F8FAFC] text-[#0F172A]'
    }`}>
      {/* Interactive 3D Perspective Constellation Canvas */}
      <Interactive3DCanvas isDark={isDark} />

      {/* Sticky Navigation Bar */}
      <Navbar
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenResumeModal={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onOpenResumeModal={() => setIsResumeOpen(true)}
          onOpenFreelance={handleScrollToFreelance}
        />

        {/* Featured Projects & Simulators */}
        <ProjectBento
          onOpenSimulator={(id) => setActiveSimulatorId(id)}
          onOpenCodeInspect={(id) => setActiveCodeInspectId(id)}
          onPreviewImage={(url, title) => setPreviewImage({ url, title })}
        />

        {/* Experience & Career Timeline */}
        <ExperienceTimeline />

        {/* Skills Console */}
        <SkillsConsole />

        {/* Achievements & Metrics */}
        <AchievementsSection />

        {/* Freelance Software Engineer Consulting Services */}
        <FreelanceSection
          onOpenContact={handleScrollToContact}
        />

        {/* GitHub Live Feed */}
        <GithubActivity />

        {/* Supabase Free-Tier Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenResumeModal={() => setIsResumeOpen(true)}
      />

      {/* Interactive Simulator Modal */}
      <LiveDemoModal
        projectId={activeSimulatorId}
        onClose={() => setActiveSimulatorId(null)}
        onOpenCodeInspect={(id) => {
          setActiveSimulatorId(null);
          setActiveCodeInspectId(id);
        }}
      />

      {/* Architecture & Code Inspector Modal */}
      <CodeInspectModal
        projectId={activeCodeInspectId}
        onClose={() => setActiveCodeInspectId(null)}
        onOpenSimulator={(id) => {
          setActiveCodeInspectId(null);
          setActiveSimulatorId(id);
        }}
      />

      {/* Image Fullscreen Lightbox Modal */}
      <ImageLightboxModal
        imageUrl={previewImage?.url || null}
        title={previewImage?.title || null}
        onClose={() => setPreviewImage(null)}
      />

      {/* Curriculum Vitae Preview Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* ⌘K Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProjectSimulator={(id) => setActiveSimulatorId(id)}
        onOpenResumeModal={() => setIsResumeOpen(true)}
        onToggleTheme={handleToggleTheme}
        isDark={isDark}
      />
    </div>
  );
}
