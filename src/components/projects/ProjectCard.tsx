import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Play, Code2, Heart, Github, Maximize2, Sparkles } from 'lucide-react';
import { Project } from '../../types';
import { getProjectLikes, toggleProjectLike } from '../../lib/supabase';

interface ProjectCardProps {
  project: Project;
  onOpenSimulator: (projectId: string) => void;
  onOpenCodeInspect: (projectId: string) => void;
  onPreviewImage?: (imageUrl: string, title: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenSimulator,
  onOpenCodeInspect,
  onPreviewImage,
}) => {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  // Raw cursor coordinates relative to card top-left
  const rawPixelX = useMotionValue(200);
  const rawPixelY = useMotionValue(200);

  // Normalized coordinates from card center (-1 to 1)
  const normCenterX = useMotionValue(0);
  const normCenterY = useMotionValue(0);

  // High-performance spring configurations for organic tactile feel
  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const springSpotlight = { stiffness: 350, damping: 28 };

  const springNormX = useSpring(normCenterX, springConfig);
  const springNormY = useSpring(normCenterY, springConfig);
  const springRawX = useSpring(rawPixelX, springSpotlight);
  const springRawY = useSpring(rawPixelY, springSpotlight);

  // Magnetic Pull Displacement (whole card gently follows cursor toward mouse)
  const magneticPullX = useTransform(springNormX, [-1, 1], [-14, 14]);
  const magneticPullY = useTransform(springNormY, [-1, 1], [-14, 14]);

  // 3D Tilt Rotations (card leans dynamically into or away from the cursor)
  const rotateX = useTransform(springNormY, [-1, 1], ['8.5deg', '-8.5deg']);
  const rotateY = useTransform(springNormX, [-1, 1], ['-8.5deg', '8.5deg']);

  // Multi-tier layered parallax: inner elements float at distinct virtual Z planes
  const layer1X = useTransform(springNormX, [-1, 1], [-6, 6]);
  const layer1Y = useTransform(springNormY, [-1, 1], [-6, 6]);

  const layer2X = useTransform(springNormX, [-1, 1], [-11, 11]);
  const layer2Y = useTransform(springNormY, [-1, 1], [-11, 11]);

  const layer3X = useTransform(springNormX, [-1, 1], [-16, 16]);
  const layer3Y = useTransform(springNormY, [-1, 1], [-16, 16]);

  // Image viewport depth parallax (counter-motion creates holographic window illusion)
  const imgParallaxX = useTransform(springNormX, [-1, 1], [10, -10]);
  const imgParallaxY = useTransform(springNormY, [-1, 1], [10, -10]);
  const imgScale = useTransform(springNormX, [-1, 0, 1], [1.06, 1.03, 1.06]);

  // Dynamic 60fps Specular Spotlight Glare via useMotionTemplate
  const spotlightBg = useMotionTemplate`radial-gradient(550px circle at ${springRawX}px ${springRawY}px, rgba(255, 255, 255, 0.12), rgba(16, 185, 129, 0.05) 40%, transparent 75%)`;

  useEffect(() => {
    let mounted = true;
    getProjectLikes(project.id).then(count => {
      if (mounted) setLikes(count);
    });
    const liked = localStorage.getItem(`user_liked_${project.id}`) === 'true';
    setIsLiked(liked);
    return () => { mounted = false; };
  }, [project.id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Center point of the card
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;

    // Normalized relative offset [-1, 1]
    const relativeX = (mouseX - halfWidth) / halfWidth;
    const relativeY = (mouseY - halfHeight) / halfHeight;

    normCenterX.set(Math.max(-1, Math.min(1, relativeX)));
    normCenterY.set(Math.max(-1, Math.min(1, relativeY)));

    rawPixelX.set(mouseX);
    rawPixelY.set(mouseY);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      rawPixelX.set(e.clientX - rect.left);
      rawPixelY.set(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smooth organic magnetic return to equilibrium
    normCenterX.set(0);
    normCenterY.set(0);
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiking) return;
    setIsLiking(true);

    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikes(prev => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));

    try {
      const res = await toggleProjectLike(project.id);
      setLikes(res.count);
      setIsLiked(res.liked);
    } catch {
      // ignore
    } finally {
      setIsLiking(false);
    }
  };

  const getCategoryTheme = () => {
    switch (project.category) {
      case 'ai':
        return {
          badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30 shadow-emerald-500/10',
          gradientBorder: 'group-hover:from-emerald-400/60 group-hover:via-teal-400/40 group-hover:to-cyan-500/20',
          glowHover: 'hover:shadow-emerald-500/20',
        };
      case 'fullstack':
        return {
          badge: 'text-blue-400 bg-blue-500/10 border-blue-500/30 shadow-blue-500/10',
          gradientBorder: 'group-hover:from-blue-400/60 group-hover:via-indigo-400/40 group-hover:to-purple-500/20',
          glowHover: 'hover:shadow-blue-500/20',
        };
      case 'backend':
        return {
          badge: 'text-amber-400 bg-amber-500/10 border-amber-500/30 shadow-amber-500/10',
          gradientBorder: 'group-hover:from-amber-400/60 group-hover:via-orange-400/40 group-hover:to-emerald-500/20',
          glowHover: 'hover:shadow-amber-500/20',
        };
      default:
        return {
          badge: 'text-zinc-300 bg-zinc-800 border-zinc-700',
          gradientBorder: 'group-hover:from-zinc-400/50 group-hover:via-zinc-600/30 group-hover:to-transparent',
          glowHover: 'hover:shadow-zinc-500/10',
        };
    }
  };

  const theme = getCategoryTheme();

  return (
    <div 
      className="relative group select-none py-2"
      style={{ perspective: 1300 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          x: magneticPullX,
          y: magneticPullY,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 350, damping: 24 }}
        className={`relative rounded-2xl p-[1px] transition-shadow duration-500 shadow-xl shadow-black/50 ${theme.glowHover}`}
      >
        {/* Subtle Ambient Border */}
        <div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/15 via-zinc-800/60 to-white/5 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
        />

        {/* Dynamic Glowing Border Gradient on Hover */}
        <div 
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/40 via-cyan-500/20 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-[0.5px] ${theme.gradientBorder}`}
        />

        {/* Real-time Hardware-Accelerated Specular Spotlight Glare */}
        <motion.div 
          className="absolute inset-0 rounded-2xl pointer-events-none z-30 transition-opacity duration-300"
          style={{
            background: spotlightBg,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Glassmorphic 3D Card Shell */}
        <div 
          style={{ transformStyle: 'preserve-3d' }}
          className="relative rounded-2xl bg-[#0B0F19]/95 dark:bg-[#0A0E17]/95 backdrop-blur-2xl flex flex-col justify-between h-full shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12),inset_0_-1px_1px_0_rgba(0,0,0,0.6)]"
        >
          {/* Top Browser Frame Mockup with Inner Parallax Viewport */}
          {project.imageUrl && (
            <div className="bg-[#070A11] border-b border-zinc-800/80 relative z-10 overflow-hidden rounded-t-2xl">
              {/* Browser Window Bar */}
              <motion.div 
                style={{ 
                  x: layer1X, 
                  y: layer1Y,
                  transform: 'translateZ(20px)',
                  transformStyle: 'preserve-3d',
                }}
                className="px-4 py-2.5 flex items-center justify-between border-b border-zinc-800/60 bg-[#090D16]/95 backdrop-blur-md"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block shadow-sm shadow-rose-500/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block shadow-sm shadow-amber-500/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shadow-sm shadow-emerald-500/30" />
                </div>

                <div className="px-3 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-800/80 text-[11px] font-mono text-zinc-400 truncate max-w-[200px] sm:max-w-[280px] shadow-inner flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  <span>https://{project.id}.app</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {onPreviewImage && (
                    <button
                      type="button"
                      onClick={() => onPreviewImage(project.imageUrl!, project.title)}
                      className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
                      title="Enlarge preview"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Project Screenshot / Mockup Image with counter-parallax window depth */}
              <div 
                className="relative aspect-[16/9] w-full overflow-hidden bg-[#070A11] cursor-pointer group/img"
                onClick={() => onPreviewImage && onPreviewImage(project.imageUrl!, project.title)}
              >
                <motion.img
                  style={{ 
                    x: imgParallaxX, 
                    y: imgParallaxY,
                    scale: imgScale,
                  }}
                  src={project.imageUrl}
                  alt={`${project.title} screenshot`}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = `/images/${project.id}.jpg`;
                    }
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent pointer-events-none opacity-90" />
                
                {/* Subtle 3D parallax depth badge on image */}
                <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Interactive Parallax</span>
                </div>
              </div>
            </div>
          )}

          {/* Card Body with Multi-Depth Floating Parallax */}
          <div 
            style={{ transformStyle: 'preserve-3d' }}
            className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5 relative z-10"
          >
            <div>
              {/* Foreground Layer 1: Category Badge & Upvote button */}
              <motion.div 
                style={{ 
                  x: layer1X, 
                  y: layer1Y,
                  transform: 'translateZ(38px)',
                  transformStyle: 'preserve-3d',
                }}
                className="flex items-center justify-between gap-2 mb-3"
              >
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold border backdrop-blur-md shadow-sm ${theme.badge}`}>
                  {project.categoryLabel}
                </span>

                <button
                  onClick={handleLike}
                  type="button"
                  aria-label={`Like ${project.title}`}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer backdrop-blur-md ${
                    isLiked 
                      ? 'bg-rose-500/15 text-rose-400 border border-rose-500/40 shadow-sm shadow-rose-500/20' 
                      : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-zinc-700/60 hover:bg-zinc-800/90'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                  <span className="tabular-nums font-semibold">{likes}</span>
                </button>
              </motion.div>

              {/* Foreground Layer 2: Title & Description */}
              <motion.div 
                style={{ 
                  x: layer2X, 
                  y: layer2Y,
                  transform: 'translateZ(30px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-zinc-400 font-mono mt-1 mb-3">
                  {project.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
                  {project.description}
                </p>
              </motion.div>

              {/* Foreground Layer 2: Metrics Strip with 3D elevation */}
              <motion.div 
                style={{ 
                  x: layer2X, 
                  y: layer2Y,
                  transform: 'translateZ(34px)',
                  transformStyle: 'preserve-3d',
                }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3.5 rounded-xl bg-[#070A11]/85 backdrop-blur-md border border-zinc-800/90 mb-5 font-mono text-center shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.6)]"
              >
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="p-1">
                    <div className="text-[10px] uppercase text-zinc-500 font-semibold tracking-wider">{metric.label}</div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-400 tabular-nums mt-0.5">{metric.value}</div>
                  </div>
                ))}
              </motion.div>

              {/* Tech Stack Pills */}
              <motion.div 
                style={{ 
                  x: layer1X, 
                  y: layer1Y,
                  transform: 'translateZ(26px)',
                  transformStyle: 'preserve-3d',
                }}
                className="flex flex-wrap items-center gap-1.5 mb-2"
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 text-[11px] font-mono border border-zinc-700/50 backdrop-blur-md transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Foreground Layer 3: Interactive Action Buttons floating highest */}
            <motion.div 
              style={{ 
                x: layer3X, 
                y: layer3Y,
                transform: 'translateZ(46px)',
                transformStyle: 'preserve-3d',
              }}
              className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                {project.hasSimulator && (
                  <button
                    onClick={() => onOpenSimulator(project.id)}
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 transition-all cursor-pointer shadow-lg shadow-emerald-500/25 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-zinc-950" />
                    <span>Live Simulator</span>
                  </button>
                )}

                <button
                  onClick={() => onOpenCodeInspect(project.id)}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl bg-zinc-800/80 hover:bg-zinc-700/90 text-zinc-200 border border-zinc-700/80 backdrop-blur-md transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Architecture</span>
                </button>
              </div>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="View source repository on GitHub"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800/70 hover:bg-zinc-700/90 text-zinc-300 hover:text-white border border-zinc-700/70 backdrop-blur-md transition-all text-xs font-mono cursor-pointer"
                title="Open GitHub source"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">Source</span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
