'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface VoiceWaveformProps {
  active?: boolean;
  barCount?: number;
  color?: string;
  className?: string;
}

export default function VoiceWaveform({
  active = true,
  barCount = 24,
  color = 'var(--color-cyan-glow)',
  className,
}: VoiceWaveformProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center gap-[3px]',
        className
      )}
      role="img"
      aria-label={active ? 'Audio waveform active' : 'Audio waveform inactive'}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        // Create a natural wave-like pattern with varying max heights
        const centerOffset = Math.abs(i - barCount / 2) / (barCount / 2);
        const maxScale = 1 - centerOffset * 0.5;
        const delay = i * 0.06;

        return (
          <motion.span
            key={i}
            style={{
              display: 'inline-block',
              width: 3,
              minHeight: 4,
              borderRadius: '3px 3px 1px 1px',
              backgroundColor: color,
              transformOrigin: 'bottom',
            }}
            animate={
              active
                ? {
                    scaleY: [
                      0.3,
                      maxScale,
                      0.5 * maxScale,
                      maxScale * 0.8,
                      0.3,
                    ],
                    opacity: [0.6, 1, 0.8, 1, 0.6],
                  }
                : { scaleY: 0.15, opacity: 0.3 }
            }
            transition={
              active
                ? {
                    duration: 1.2,
                    repeat: Infinity,
                    delay,
                    ease: 'easeInOut',
                  }
                : { duration: 0.4, ease: 'easeOut' }
            }
            className="h-8"
          />
        );
      })}
    </div>
  );
}
