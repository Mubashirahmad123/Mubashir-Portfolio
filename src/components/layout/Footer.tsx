import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface FooterProps {
  onOpenResumeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResumeModal }) => {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-[#06080F] text-zinc-400 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-800/60">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">{PERSONAL_INFO.name}</span>
              <span className="text-xs text-zinc-500 font-mono">· {PERSONAL_INFO.title}</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              Specialized in scalable full-stack web platforms, distributed AI agent architectures with CrewAI, and high-performance backend microservices.
            </p>
            <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono pt-1">
              <span>{PERSONAL_INFO.location}</span>
              <span>·</span>
              <span>Open to Full Stack & Backend Roles</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2 text-xs">
            <div className="font-semibold text-zinc-200 uppercase tracking-wider text-[11px] font-mono">Quick Links</div>
            <ul className="space-y-1.5">
              <li>
                <a href="#projects" className="hover:text-emerald-400 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-emerald-400 transition-colors">
                  Work Experience
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-emerald-400 transition-colors">
                  Achievements & Milestones
                </a>
              </li>
              <li>
                <a href="#freelance" className="hover:text-emerald-400 transition-colors">
                  Freelance Services
                </a>
              </li>
              <li>
                <button 
                  onClick={onOpenResumeModal}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Curriculum Vitae (PDF)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-2 text-xs">
            <div className="font-semibold text-zinc-200 uppercase tracking-wider text-[11px] font-mono">Connect</div>
            <div className="flex flex-col space-y-1.5">
              <a 
                href={PERSONAL_INFO.socials.github} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-zinc-400" />
                <span>github.com/{PERSONAL_INFO.socials.githubUsername}</span>
              </a>
              <a 
                href={PERSONAL_INFO.socials.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
                <span>LinkedIn Profile</span>
              </a>
              <a 
                href={PERSONAL_INFO.socials.email} 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>© {new Date().getFullYear()} Mubashir Nazir</span>
            <span>·</span>
            <span>Built with React 19, TypeScript & Tailwind CSS</span>
          </div>
          <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
            <span>Free-tier Jamstack deployment</span>
            <span>·</span>
            <span className="text-emerald-400">Zero Ongoing Hosting Cost</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
