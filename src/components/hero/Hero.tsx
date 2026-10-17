import React from 'react';
import { ArrowRight, Terminal, CheckCircle2, Github, Linkedin, Mail, CreditCard, Cpu, Layers, Sparkles, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface HeroProps {
  onOpenResumeModal: () => void;
  onOpenFreelance: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal, onOpenFreelance }) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 border-b border-zinc-800/80 overflow-hidden bg-grid-pattern z-10">
      {/* Background radial spotlight glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/4 w-[650px] h-[550px] bg-emerald-500/12 rounded-full blur-[140px] opacity-75"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-20 right-10 w-[550px] h-[450px] bg-blue-500/10 rounded-full blur-[150px] opacity-60"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Availability Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-zinc-200 shadow-sm shadow-emerald-500/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">Available for Opportunities</span>
          </div>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <span className="text-zinc-300">Full Stack & AI Engineer</span>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <span className="text-zinc-400">Srinagar, J&K, India</span>
        </div>

        {/* Hero Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Headline & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-sm sm:text-base font-mono text-emerald-400 font-semibold tracking-wide">
                Hello world, I'm
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance">
                Mubashir Nazir.
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-400 leading-snug">
                I build scalable web apps & autonomous AI systems.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              Full Stack Software Engineer with deep hands-on expertise in <strong className="text-white font-semibold">Node.js, Express, React, Python, and PostgreSQL</strong>. Experienced in tuning logistics systems at FastBeetle (PhonePe payments, real-time routing, 70% latency cut) and engineering autonomous 3-agent scraping pipelines with CrewAI and Gemini.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/80 backdrop-blur-md transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                <span>Contact Me</span>
              </a>

              <button
                type="button"
                onClick={onOpenFreelance}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium rounded-xl bg-zinc-900/70 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 backdrop-blur-md transition-all cursor-pointer"
              >
                <span>Freelance Services</span>
              </button>
            </div>

            {/* Social verification links */}
            <div className="flex items-center gap-5 text-xs text-zinc-400 pt-3 font-mono">
              <a 
                href={PERSONAL_INFO.socials.github} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-zinc-400" />
                <span>@{PERSONAL_INFO.socials.githubUsername}</span>
              </a>
              <span className="text-zinc-700">|</span>
              <a 
                href={PERSONAL_INFO.socials.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-zinc-400" />
                <span>LinkedIn</span>
              </a>
              <span className="text-zinc-700">|</span>
              <a 
                href={PERSONAL_INFO.socials.email} 
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-zinc-400" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right: Modern Developer Profile Card */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl bg-zinc-900/90 dark:bg-[#0D111A] border border-zinc-800 p-6 font-mono text-xs shadow-2xl space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-[11px] text-zinc-400">
                <span className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Terminal className="w-4 h-4" />
                  <span>mubashir.developer.env</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px]">Verified Profile</span>
              </div>

              <div className="space-y-2 text-[11px] leading-relaxed">
                <div className="text-zinc-500">$ cat developer_profile.json</div>
                <div className="text-zinc-300">
                  <span className="text-emerald-400">ROLE:</span> Full Stack Developer & Freelancer
                </div>
                <div className="text-zinc-300">
                  <span className="text-emerald-400">PRIMARY_STACK:</span> React 19, TypeScript, Node.js, Python, Express
                </div>
                <div className="text-zinc-300">
                  <span className="text-emerald-400">AI_AUTOMATION:</span> CrewAI, Gemini 2.5 Flash, Playwright, FAISS
                </div>
                <div className="text-zinc-300">
                  <span className="text-emerald-400">SYSTEMS:</span> PhonePe Payments, PostgreSQL, Redis, REST APIs
                </div>
              </div>

              {/* Verified Achievements */}
              <div className="pt-3 border-t border-zinc-800 space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                  Verified Engineering Highlights
                </div>
                <div className="space-y-1.5 text-[11px] text-zinc-300">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-950/70 border border-zinc-800">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>PhonePe Real-Time Payment Gateway Integration</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-950/70 border border-zinc-800">
                    <Cpu className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>45+ Job Boards AI Scraper with 5-Tier Fallback</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-950/70 border border-zinc-800">
                    <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Optimized 5 Dashboards (-70% Average Latency)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>FastBeetle & Open Source</span>
                <button
                  onClick={onOpenResumeModal}
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <span>Preview Resume</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column KPI strip below hero */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {PERSONAL_INFO.keyStats.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all hover:scale-[1.01]"
            >
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-zinc-200 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
