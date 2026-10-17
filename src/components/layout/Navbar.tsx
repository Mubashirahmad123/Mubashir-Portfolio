import React, { useState, useEffect } from 'react';
import { Sun, Moon, Terminal, Command, FileText, Sparkles } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenCommandPalette,
  onOpenResumeModal,
}) => {
  const [activeSection, setActiveSection] = useState('projects');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['projects', 'experience', 'skills', 'achievements', 'freelance', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090D16]/80 dark:bg-[#090D16]/80 border-b border-zinc-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Identity */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-slate-100 font-semibold tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 via-zinc-900 to-zinc-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/60 transition-colors shadow-sm shadow-emerald-500/10">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              Mubashir Nazir
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">
              Full Stack Developer
            </span>
          </div>
        </a>

        {/* Clean Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md text-xs font-medium text-zinc-300 shadow-inner">
          {[
            { id: 'projects', label: 'Projects' },
            { id: 'experience', label: 'Experience' },
            { id: 'skills', label: 'Skills' },
            { id: 'achievements', label: 'Achievements' },
            { id: 'freelance', label: 'Freelance' },
            { id: 'contact', label: 'Contact' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-zinc-800 text-emerald-400 font-semibold shadow-sm'
                    : 'hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* ⌘K Trigger Button */}
          <button
            onClick={onOpenCommandPalette}
            type="button"
            aria-label="Open command palette"
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-400 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 rounded-lg transition-colors cursor-pointer"
          >
            <Command className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[11px] font-mono">⌘K</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            type="button"
            aria-label="Toggle visual theme"
            className="p-2 text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 rounded-lg transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Resume Modal Action */}
          <button
            onClick={onOpenResumeModal}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-emerald-500/20 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
};
