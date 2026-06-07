'use client';

import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface LoadingScreenProps {
  visible?: boolean;
  text?: string;
  className?: string;
}

export default function LoadingScreen({
  visible = true,
  text = 'Initializing JARVIS X...',
  className,
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={clsx(
            'fixed inset-0 z-[9999] flex flex-col items-center justify-center',
            className
          )}
          style={{ backgroundColor: 'var(--color-dark-bg)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* HUD Spinner */}
          <div className="relative flex h-32 w-32 items-center justify-center">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid transparent',
                borderTopColor: 'var(--color-cyan-glow)',
                borderRightColor: 'var(--color-cyan-glow)',
                filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Middle ring - counter-rotate */}
            <motion.div
              className="absolute rounded-full"
              style={{
                inset: 10,
                border: '1.5px solid transparent',
                borderBottomColor: 'var(--color-cyan-dim)',
                borderLeftColor: 'var(--color-cyan-dim)',
                filter: 'drop-shadow(0 0 6px rgba(0, 166, 179, 0.4))',
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Inner ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                inset: 22,
                border: '1px solid transparent',
                borderTopColor: 'var(--color-neon-blue)',
                filter: 'drop-shadow(0 0 4px rgba(0, 112, 243, 0.4))',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Pulsing core */}
            <motion.div
              className="relative z-10 rounded-full"
              style={{
                width: 16,
                height: 16,
                backgroundColor: 'var(--color-cyan-glow)',
                boxShadow:
                  '0 0 20px rgba(0, 240, 255, 0.6), 0 0 40px rgba(0, 240, 255, 0.3), 0 0 80px rgba(0, 240, 255, 0.1)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Tick marks around outer ring */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute"
                style={{
                  width: 1,
                  height: i % 3 === 0 ? 8 : 4,
                  backgroundColor: 'var(--color-cyan-glow)',
                  opacity: i % 3 === 0 ? 0.8 : 0.3,
                  top: 0,
                  left: '50%',
                  transformOrigin: `0 64px`,
                  transform: `rotate(${i * 30}deg)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: i % 3 === 0 ? 0.8 : 0.3 }}
                transition={{ delay: i * 0.05 }}
              />
            ))}
          </div>

          {/* Loading text with typewriter effect */}
          <motion.div
            className="mt-10 overflow-hidden font-mono text-sm tracking-widest"
            style={{ color: 'var(--color-cyan-glow)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span
              className="inline-block"
              initial={{ width: 0 }}
              animate={{ width: 'auto' }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {text}
            </motion.span>
            <motion.span
              className="ml-0.5 inline-block w-2"
              style={{
                borderRight: '2px solid var(--color-cyan-glow)',
                height: '1em',
              }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>

          {/* Status indicators */}
          <motion.div
            className="mt-6 flex items-center gap-6 font-mono text-xs"
            style={{ color: 'var(--color-text-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {['SYSTEMS', 'NEURAL NET', 'HUD'].map((label, i) => (
              <motion.div key={label} className="flex items-center gap-2">
                <motion.span
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-success)' }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
                <span className="tracking-wider uppercase">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
