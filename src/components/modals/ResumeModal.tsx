import React, { useEffect } from 'react';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, CheckCircle2, FileText } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const textContent = `MUBASHIR NAZIR — FULL STACK DEVELOPER
Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.socials.linkedin}
GitHub: ${PERSONAL_INFO.socials.github}

EDUCATION:
${PERSONAL_INFO.education.institution} — ${PERSONAL_INFO.education.degree} (${PERSONAL_INFO.education.period})

TECHNICAL SKILLS:
- Languages: JavaScript (ES6+), TypeScript, Python, HTML5, CSS3
- Backend: Node.js, Express.js, Django, REST APIs, JWT, Passport.js, Microservices
- Frontend: React.js, Redux Toolkit, RTK Query, Next.js, MUI v6, Zod, React Hook Form, ApexCharts, Tailwind CSS
- Databases: PostgreSQL, MySQL, MongoDB, Sequelize ORM
- Tools: Git, GitHub, Postman, Figma, Azure Static Web Apps, ESLint, Prettier, Vitest

EXPERIENCE:
1. FastBeetle (Logistics Startup) — Software Engineer (Aug 2024 - Apr 2026)
- Architected backend services for Rider, Merchant, and Customer apps using Node.js & Express.js with PhonePe integration.
- Optimized 5 dashboards reducing average page load time by 70% through query optimization and caching.
- Engineered Bulk Edit PinZone module cutting manual effort by 90%.
- Built OrderSnap.in full-stack dropshipping platform using Node.js, Express, React, Redux Toolkit, PostgreSQL & Sequelize.

2. ElySpace (Software Agency) — Full Stack Developer (Aug 2023 - Jul 2024)
- Delivered multiple client SaaS and e-commerce projects using React, Django, and JavaScript with REST API integration.
- Resolved backend bottlenecks and maintained high availability across concurrent production environments.

3. Yarikul Infotech — Full Stack Intern (Mar 2023 - May 2023)
- Built real-time matrimonial platform using Django & Python with live chat, increasing user engagement by 20%.

FLAGSHIP PROJECTS:
- Remote Job Agent (CrewAI 0.5.0, Gemini 2.0 Flash, APScheduler, Google Sheets API): End-to-end 3-agent AI automation system.
- FastBeetle PinZone Manager (Node.js, PostgreSQL, Redis): High-throughput logistics route assignment.
- Music Controller (React, Django, Spotify API): Collaborative real-time playlist voting.`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mubashir_Nazir_Full_Stack_Developer_Resume.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[92vh] bg-[#0E131F] border border-zinc-700/80 rounded-xl shadow-2xl flex flex-col overflow-hidden text-zinc-200 font-sans"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">Curriculum Vitae Preview — Mubashir Nazir</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-800 rounded border border-zinc-700 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              type="button"
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-zinc-950 font-bold bg-emerald-400 hover:bg-emerald-300 rounded transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close modal"
              className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable CV Sheet */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-zinc-300 leading-relaxed font-sans bg-zinc-950/40">
          {/* Candidate Name & Header */}
          <div className="text-center pb-4 border-b border-zinc-800 space-y-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">{PERSONAL_INFO.name}</h1>
            <div className="text-sm font-semibold text-emerald-400">{PERSONAL_INFO.title}</div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-zinc-400 font-mono text-[11px] pt-1">
              <span>{PERSONAL_INFO.phone}</span>
              <span>·</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-400 hover:underline">{PERSONAL_INFO.email}</a>
              <span>·</span>
              <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="text-zinc-300 hover:underline">LinkedIn Profile</a>
              <span>·</span>
              <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noreferrer" className="text-zinc-300 hover:underline">GitHub</a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-1">
              Education
            </h2>
            <div className="flex justify-between items-baseline font-mono text-[11px]">
              <div>
                <strong className="text-zinc-200">{PERSONAL_INFO.education.institution}</strong> — {PERSONAL_INFO.education.degree}
              </div>
              <div className="text-zinc-400">{PERSONAL_INFO.education.period}</div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-1">
              Technical Skills
            </h2>
            <div className="space-y-1 font-mono text-[11px] text-zinc-300">
              <div><strong className="text-zinc-200">Languages:</strong> JavaScript (ES6+), TypeScript, Python, HTML5, CSS3</div>
              <div><strong className="text-zinc-200">Backend:</strong> Node.js, Express.js, Django, REST APIs, JWT, Passport.js, Microservices</div>
              <div><strong className="text-zinc-200">Frontend:</strong> React.js, Redux Toolkit, RTK Query, Next.js, MUI v6, Zod, React Hook Form, ApexCharts, Tailwind CSS</div>
              <div><strong className="text-zinc-200">Databases:</strong> PostgreSQL, MySQL, MongoDB, Sequelize ORM</div>
              <div><strong className="text-zinc-200">Tools:</strong> Git, GitHub, Postman, Figma, Azure Static Web Apps, ESLint, Prettier, Vitest</div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-1">
              Professional Experience
            </h2>
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="space-y-1.5 text-left">
                <div className="flex justify-between items-baseline font-mono text-[11px]">
                  <div>
                    <strong className="text-white">{exp.role}</strong> — <span className="text-emerald-400">{exp.company}</span>
                  </div>
                  <div className="text-zinc-400">{exp.period}</div>
                </div>
                <ul className="space-y-1 pl-4 list-disc text-zinc-300">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-1">
              Key Engineering Projects
            </h2>
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-1 text-left">
                <div className="flex justify-between items-baseline font-mono text-[11px]">
                  <strong className="text-white">{proj.title}</strong>
                  <span className="text-zinc-400">{proj.tags.slice(0, 4).join(' · ')}</span>
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
