'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import clsx from 'clsx';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      className={clsx(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        className
      )}
    >
      {/* Title with HUD accent lines */}
      <motion.div
        className={clsx(
          'flex items-center gap-4',
          align === 'center' && 'justify-center'
        )}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Left accent line */}
        <motion.span
          className="hidden h-px sm:block"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--color-cyan-glow))',
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: 60 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        />

        {/* Diamond accent */}
        <motion.span
          className="hidden sm:block"
          initial={{ opacity: 0, rotate: 0 }}
          animate={
            isInView
              ? { opacity: 1, rotate: 45 }
              : { opacity: 0, rotate: 0 }
          }
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <span
            className="block h-2 w-2"
            style={{ backgroundColor: 'var(--color-cyan-glow)' }}
          />
        </motion.span>

        {/* Title */}
        <h2
          className="font-heading text-3xl font-bold tracking-wider uppercase md:text-4xl lg:text-5xl"
          style={{
            background:
              'linear-gradient(135deg, var(--color-cyan-glow) 0%, #ffffff 40%, var(--color-cyan-glow) 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </h2>

        {/* Diamond accent */}
        <motion.span
          className="hidden sm:block"
          initial={{ opacity: 0, rotate: 0 }}
          animate={
            isInView
              ? { opacity: 1, rotate: 45 }
              : { opacity: 0, rotate: 0 }
          }
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <span
            className="block h-2 w-2"
            style={{ backgroundColor: 'var(--color-cyan-glow)' }}
          />
        </motion.span>

        {/* Right accent line */}
        <motion.span
          className="hidden h-px sm:block"
          style={{
            background:
              'linear-gradient(90deg, var(--color-cyan-glow), transparent)',
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: 60 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className={clsx(
            'mt-4 max-w-2xl text-base md:text-lg',
            align === 'center' && 'mx-auto'
          )}
          style={{ color: 'var(--color-text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Underline glow */}
      <motion.div
        className={clsx(
          'mt-4 h-px',
          align === 'center' && 'mx-auto'
        )}
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-cyan-glow), transparent)',
          maxWidth: 300,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isInView
            ? { scaleX: 1, opacity: 0.5 }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      />
    </div>
  );
}
