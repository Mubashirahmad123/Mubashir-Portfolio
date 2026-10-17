import React, { useState, useEffect } from 'react';
import { Search, Terminal, Layers, Briefcase, Wrench, Github, Mail, FileText, Sun, Moon, ArrowRight, Trophy, Zap } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProjectSimulator: (projectId: string) => void;
  onOpenResumeModal: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProjectSimulator,
  onOpenResumeModal,
  onToggleTheme,
  isDark,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'sim-crewai',
      title: 'Run Simulator: Remote Job Agent (CrewAI + Gemini 2.5 Flash)',
      category: 'Simulators',
      icon: Terminal,
      action: () => { onClose(); onSelectProjectSimulator('remote-job-agent'); },
    },
    {
      id: 'sim-pinzone',
      title: 'Run Simulator: FastBeetle Bulk PinZone & PhonePe Gateway',
      category: 'Simulators',
      icon: Terminal,
      action: () => { onClose(); onSelectProjectSimulator('fastbeetle-logistics'); },
    },
    {
      id: 'sim-ordersnap',
      title: 'Run Simulator: OrderSnap Dropshipping State Machine',
      category: 'Simulators',
      icon: Terminal,
      action: () => { onClose(); onSelectProjectSimulator('ordersnap-platform'); },
    },
    {
      id: 'nav-projects',
      title: 'Scroll to Featured Projects',
      category: 'Navigation',
      icon: Layers,
      action: () => { onClose(); window.location.hash = '#projects'; },
    },
    {
      id: 'nav-experience',
      title: 'Scroll to FastBeetle & Career Experience',
      category: 'Navigation',
      icon: Briefcase,
      action: () => { onClose(); window.location.hash = '#experience'; },
    },
    {
      id: 'nav-skills',
      title: 'Scroll to Technical Skills & Stack',
      category: 'Navigation',
      icon: Wrench,
      action: () => { onClose(); window.location.hash = '#skills'; },
    },
    {
      id: 'nav-achievements',
      title: 'Scroll to Achievements & Production Metrics',
      category: 'Navigation',
      icon: Trophy,
      action: () => { onClose(); window.location.hash = '#achievements'; },
    },
    {
      id: 'nav-freelance',
      title: 'Scroll to Freelance Consulting Services',
      category: 'Navigation',
      icon: Zap,
      action: () => { onClose(); window.location.hash = '#freelance'; },
    },
    {
      id: 'nav-github',
      title: 'Scroll to GitHub Activity & Repositories',
      category: 'Navigation',
      icon: Github,
      action: () => { onClose(); window.location.hash = '#github'; },
    },
    {
      id: 'nav-contact',
      title: 'Scroll to Contact Form',
      category: 'Navigation',
      icon: Mail,
      action: () => { onClose(); window.location.hash = '#contact'; },
    },
    {
      id: 'view-resume',
      title: 'Preview Curriculum Vitae & Download PDF',
      category: 'Actions',
      icon: FileText,
      action: () => { onClose(); onOpenResumeModal(); },
    },
    {
      id: 'toggle-theme',
      title: `Switch Theme to ${isDark ? 'Light Mode' : 'Dark Mode'}`,
      category: 'Preferences',
      icon: isDark ? Sun : Moon,
      action: () => { onToggleTheme(); onClose(); },
    },
  ];

  const filtered = actions.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-[#0E131F] border border-zinc-700/80 rounded-xl shadow-2xl overflow-hidden font-mono text-xs text-zinc-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3 border-b border-zinc-800 flex items-center gap-2.5 bg-zinc-950">
          <Search className="w-4 h-4 text-emerald-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, project, or section..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-white placeholder-zinc-500 focus:outline-none text-xs"
          />
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 border border-zinc-700">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-zinc-500 italic">No matching commands found.</div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  type="button"
                  className="w-full p-2.5 rounded-lg flex items-center justify-between text-left hover:bg-zinc-800/80 hover:text-white transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors shrink-0" />
                    <div>
                      <div className="text-zinc-200 group-hover:text-white font-medium">{item.title}</div>
                      <div className="text-[10px] text-zinc-500">{item.category}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                </button>
              );
            })
          )}
        </div>

        <div className="p-2 border-t border-zinc-800 bg-zinc-950 text-[10px] text-zinc-500 flex items-center justify-between">
          <span>Command Palette</span>
          <span>Press ⌘K anytime to open</span>
        </div>
      </div>
    </div>
  );
};
