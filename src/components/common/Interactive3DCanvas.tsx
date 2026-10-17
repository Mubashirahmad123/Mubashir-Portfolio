import React, { useEffect, useRef } from 'react';

interface Interactive3DCanvasProps {
  isDark: boolean;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  vx: number;
  vy: number;
  vz: number;
  colorType: 'emerald' | 'cyan' | 'indigo' | 'amber';
  pulseSpeed: number;
  pulsePhase: number;
  dispX: number;
  dispY: number;
}

export const Interactive3DCanvas: React.FC<Interactive3DCanvasProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse coordinates and velocity tracking
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      prevX: width / 2,
      prevY: height / 2,
      vx: 0,
      vy: 0,
      speed: 0,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // 3D Perspective settings
    const fov = 450;
    const maxZ = 900;
    const minZ = 40;

    // Responsive particle count (balanced between visual density and 60fps)
    const particleCount = Math.max(50, Math.min(110, Math.floor((width * height) / 16000)));

    const colors = isDark
      ? {
          emerald: { r: 52, g: 211, b: 153 },  // #34D399
          cyan: { r: 56, g: 189, b: 248 },     // #38BDF8
          indigo: { r: 167, g: 139, b: 250 },  // #A78BFA
          amber: { r: 251, g: 191, b: 36 },    // #FBBF24
        }
      : {
          emerald: { r: 16, g: 185, b: 129 },
          cyan: { r: 14, g: 165, b: 233 },
          indigo: { r: 99, g: 102, b: 241 },
          amber: { r: 245, g: 158, b: 11 },
        };

    const colorKeys: ('emerald' | 'cyan' | 'indigo' | 'amber')[] = [
      'emerald', 'emerald', 'cyan', 'cyan', 'indigo', 'amber'
    ];

    // Seed 3D floating particles
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const z = Math.random() * (maxZ - minZ) + minZ;
      return {
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z,
        baseRadius: Math.random() < 0.25 ? Math.random() * 2.2 + 2.0 : Math.random() * 1.4 + 0.8,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.1, // Organic upward ambient drift
        vz: (Math.random() - 0.5) * 0.25,
        colorType: colorKeys[Math.floor(Math.random() * colorKeys.length)],
        pulseSpeed: Math.random() * 0.025 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
        dispX: 0,
        dispY: 0,
      };
    });

    let time = 0;

    const render = () => {
      time += 0.016;

      // Mouse smoothing with organic easing
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      mouse.vx = mouse.x - mouse.prevX;
      mouse.vy = mouse.y - mouse.prevY;
      mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

      // Camera tilt parallax offset
      const camOffsetX = (mouse.x - width / 2) * 0.18;
      const camOffsetY = (mouse.y - height / 2) * 0.18;

      ctx.clearRect(0, 0, width, height);

      // Subtle ambient cursor light glow
      if (mouse.active) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          240
        );
        const glowRgb = isDark ? '52, 211, 153' : '16, 185, 129';
        cursorGlow.addColorStop(0, `rgba(${glowRgb}, ${isDark ? '0.07' : '0.04'})`);
        cursorGlow.addColorStop(0.5, `rgba(${glowRgb}, ${isDark ? '0.02' : '0.01'})`);
        cursorGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, width, height);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient autonomous motion
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Boundary wrap in 3D coordinate space
        if (p.z < minZ) p.z = maxZ;
        if (p.z > maxZ) p.z = minZ;

        const boundX = width * 0.9;
        const boundY = height * 0.9;
        if (p.x < -boundX) p.x = boundX;
        if (p.x > boundX) p.x = -boundX;
        if (p.y < -boundY) p.y = boundY;
        if (p.y > boundY) p.y = -boundY;

        // 3D Perspective Projection
        const scale = fov / (fov + p.z);
        const screenX = (p.x - camOffsetX) * scale + width / 2 + p.dispX;
        const screenY = (p.y - camOffsetY) * scale + height / 2 + p.dispY;

        // Mouse Proximity & Kinetic Interactive Force Field
        const dx = screenX - mouse.x;
        const dy = screenY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 175;

        let illuminationBoost = 1;

        if (dist < interactionRadius && dist > 1) {
          const force = (1 - dist / interactionRadius);
          const angle = Math.atan2(dy, dx);

          // Gentle outward dispersion + subtle swirl based on mouse movement speed
          const pushAmount = force * 6.5;
          const swirlFactor = mouse.speed * 0.15;

          p.dispX += Math.cos(angle) * pushAmount + -Math.sin(angle) * swirlFactor * force;
          p.dispY += Math.sin(angle) * pushAmount + Math.cos(angle) * swirlFactor * force;

          // Illumination bloom when close to cursor
          illuminationBoost = 1 + force * 1.8;
        }

        // Spring dampening of displacement back to 0
        p.dispX *= 0.88;
        p.dispY *= 0.88;

        // Don't render out of screen view
        if (screenX < -50 || screenX > width + 50 || screenY < -50 || screenY > height + 50) {
          continue;
        }

        // Depth and twinkling calculation
        const depthAlpha = Math.max(0.12, Math.min(0.9, (1 - p.z / maxZ) * 0.95));
        const pulse = Math.sin(time * p.pulseSpeed * 60 + p.pulsePhase);
        const finalAlpha = Math.min(1, depthAlpha * (0.75 + pulse * 0.25) * illuminationBoost);

        const radius = Math.max(0.7, p.baseRadius * scale * (1 + (illuminationBoost - 1) * 0.4));
        const color = colors[p.colorType];

        // Draw soft radiant glow for larger or illuminated particles
        if (radius > 1.4 || illuminationBoost > 1.2) {
          const glowRadius = radius * 3.5;
          const radialGlow = ctx.createRadialGradient(
            screenX,
            screenY,
            0,
            screenX,
            screenY,
            glowRadius
          );
          radialGlow.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${finalAlpha * 0.45})`);
          radialGlow.addColorStop(0.4, `rgba(${color.r}, ${color.g}, ${color.b}, ${finalAlpha * 0.15})`);
          radialGlow.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.arc(screenX, screenY, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = radialGlow;
          ctx.fill();
        }

        // Draw the core glowing light particle
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${finalAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 opacity-85 dark:opacity-80"
      aria-hidden="true"
    />
  );
};
