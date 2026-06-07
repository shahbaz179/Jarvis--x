'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface HUDCornersProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  animated?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const sizeMap = {
  sm: { corner: 12, thickness: 1.5 },
  md: { corner: 20, thickness: 2 },
  lg: { corner: 32, thickness: 2.5 },
} as const;

export default function HUDCorners({
  size = 'md',
  color = 'var(--color-cyan-glow)',
  animated = true,
  className,
  children,
}: HUDCornersProps) {
  const { corner, thickness } = sizeMap[size];

  const cornerStyle = (
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  ): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      width: corner,
      height: corner,
      pointerEvents: 'none',
      zIndex: 10,
    };

    switch (position) {
      case 'top-left':
        return {
          ...base,
          top: -1,
          left: -1,
          borderTop: `${thickness}px solid ${color}`,
          borderLeft: `${thickness}px solid ${color}`,
        };
      case 'top-right':
        return {
          ...base,
          top: -1,
          right: -1,
          borderTop: `${thickness}px solid ${color}`,
          borderRight: `${thickness}px solid ${color}`,
        };
      case 'bottom-left':
        return {
          ...base,
          bottom: -1,
          left: -1,
          borderBottom: `${thickness}px solid ${color}`,
          borderLeft: `${thickness}px solid ${color}`,
        };
      case 'bottom-right':
        return {
          ...base,
          bottom: -1,
          right: -1,
          borderBottom: `${thickness}px solid ${color}`,
          borderRight: `${thickness}px solid ${color}`,
        };
    }
  };

  return (
    <div className={clsx('relative', className)}>
      {/* Four corner brackets */}
      {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map(
        (pos) => (
          <motion.span
            key={pos}
            style={cornerStyle(pos)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />
        )
      )}

      {/* Scanning line animation */}
      {animated && (
        <motion.span
          style={{
            position: 'absolute',
            top: 0,
            left: corner,
            right: corner,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            pointerEvents: 'none',
            zIndex: 10,
          }}
          animate={{
            top: ['0%', '100%', '0%'],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {children}
    </div>
  );
}
