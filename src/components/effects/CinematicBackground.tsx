'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const particles = Array.from({ length: 54 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 61) % 100}%`,
  size: 1 + (i % 4),
  duration: 8 + (i % 9),
  delay: (i % 11) * 0.24,
}));

export default function CinematicBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (!ref.current) return;
      ref.current.style.setProperty('--mx', `${event.clientX}px`);
      ref.current.style.setProperty('--my', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <>
      <div ref={ref} className="cinematic-bg">
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute rounded-full bg-cyan-200"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                boxShadow: '0 0 18px rgba(0,246,255,0.85)',
              }}
              animate={{ y: [-20, 20, -20], opacity: [0.15, 0.9, 0.15] }}
              transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
        <div className="absolute left-[-12%] top-[8%] h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-[24%] h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-[130px]" />
      </div>
      <div className="scanline" />
      <div className="noise" />
    </>
  );
}
