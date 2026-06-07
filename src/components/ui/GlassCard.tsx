'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import HUDCorners from './HUDCorners';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: string;
}

export default function GlassCard({
  children,
  className,
  hoverEffect = true,
  glowColor = 'var(--color-cyan-glow)',
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hoverEffect || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Tilt range: ±6 degrees
      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = ((centerY - y) / centerY) * 6;

      setTilt({ rotateX, rotateY });
    },
    [hoverEffect]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={clsx('relative overflow-hidden rounded-lg', className)}
      style={{
        background: 'var(--color-glass-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid var(--color-glass-border)`,
        perspective: 1000,
        transformStyle: 'preserve-3d',
        transform: hoverEffect
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
          : undefined,
        transition: 'transform 0.15s ease-out',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Neon border glow on hover */}
      {hoverEffect && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-lg"
          style={{
            boxShadow: `inset 0 0 0 1px ${glowColor}`,
            filter: `drop-shadow(0 0 12px ${glowColor})`,
          }}
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Subtle gradient shimmer on hover */}
      {hoverEffect && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(135deg, transparent 30%, ${glowColor}08 50%, transparent 70%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* HUD corners on hover */}
      {hoverEffect && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <HUDCorners size="sm" color={glowColor} animated={false} />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}
