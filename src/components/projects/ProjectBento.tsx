import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCategory } from '../../types';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { FolderGit2 } from 'lucide-react';

interface ProjectBentoProps {
  onOpenSimulator: (projectId: string) => void;
  onOpenCodeInspect: (projectId: string) => void;
  onPreviewImage: (imageUrl: string, title: string) => void;
}

export const ProjectBento: React.FC<ProjectBentoProps> = ({
  onOpenSimulator,
  onOpenCodeInspect,
  onPreviewImage,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return PROJECTS;
    return PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    return {
      all: PROJECTS.length,
      ai: PROJECTS.filter(p => p.category === 'ai').length,
      fullstack: PROJECTS.filter(p => p.category === 'fullstack').length,
      backend: PROJECTS.filter(p => p.category === 'backend').length,
    };
  }, []);

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-zinc-800/80 relative z-10 overflow-hidden">
      {/* Background soft ambient radial light */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider font-semibold">
              <FolderGit2 className="w-4 h-4" />
              <span>Production Work & Open Source</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Projects
            </h2>
            <p className="text-sm text-zinc-400 mt-1.5 max-w-2xl leading-relaxed">
              Production-grade applications and systems built with TypeScript, Python, Node.js, and autonomous AI agents. Test interactive live pipelines or inspect the architecture.
            </p>
          </div>

          {/* Interactive filter tabs with glassmorphic pill background */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-xl text-xs font-medium self-start md:self-auto shadow-inner">
            <button
              onClick={() => setActiveCategory('all')}
              type="button"
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All Projects ({categoryCounts.all})
            </button>
            <button
              onClick={() => setActiveCategory('ai')}
              type="button"
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'ai'
                  ? 'bg-zinc-800 text-emerald-400 shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              AI & Agents ({categoryCounts.ai})
            </button>
            <button
              onClick={() => setActiveCategory('fullstack')}
              type="button"
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'fullstack'
                  ? 'bg-zinc-800 text-blue-400 shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Full Stack ({categoryCounts.fullstack})
            </button>
            <button
              onClick={() => setActiveCategory('backend')}
              type="button"
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'backend'
                  ? 'bg-zinc-800 text-amber-400 shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Backend Systems ({categoryCounts.backend})
            </button>
          </div>
        </div>

        {/* Project Grid with Framer Motion AnimatePresence */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <ProjectCard
                  project={project}
                  onOpenSimulator={onOpenSimulator}
                  onOpenCodeInspect={onOpenCodeInspect}
                  onPreviewImage={onPreviewImage}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub repository counter banner */}
        <div className="mt-12 p-5 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400 shadow-lg">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>All project repositories, commit histories, and architecture files are public on GitHub.</span>
          </div>
          <a
            href="https://github.com/Mubashirahmad123"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400 hover:underline flex items-center gap-1.5 font-bold shrink-0"
          >
            <span>Explore all Repositories on GitHub</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
