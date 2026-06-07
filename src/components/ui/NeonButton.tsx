'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface NeonButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

interface NeonButtonAsButton extends NeonButtonBaseProps {
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

interface NeonButtonAsLink extends NeonButtonBaseProps {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  type?: never;
}

type NeonButtonProps = NeonButtonAsButton | NeonButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-xs gap-1.5',
  md: 'px-6 py-2.5 text-sm gap-2',
  lg: 'px-8 py-3.5 text-base gap-2.5',
};

const variantConfig: Record<
  ButtonVariant,
  {
    base: string;
    glow: string;
    glowColor: string;
    hoverBg: string;
  }
> = {
  primary: {
    base: 'text-[#030712] font-semibold',
    glow: '0 0 20px rgba(0, 240, 255, 0.4), 0 0 60px rgba(0, 240, 255, 0.15)',
    glowColor: 'rgba(0, 240, 255, 0.6)',
    hoverBg: '',
  },
  secondary: {
    base: 'text-white font-medium',
    glow: '0 0 20px rgba(0, 112, 243, 0.4), 0 0 60px rgba(0, 112, 243, 0.15)',
    glowColor: 'rgba(0, 112, 243, 0.6)',
    hoverBg: '',
  },
  ghost: {
    base: 'font-medium',
    glow: 'none',
    glowColor: 'rgba(0, 240, 255, 0.3)',
    hoverBg: 'rgba(0, 240, 255, 0.05)',
  },
};

const NeonButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  NeonButtonProps
>(function NeonButton(props, ref) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className,
    ...rest
  } = props;

  const config = variantConfig[variant];
  const isDisabled = disabled || loading;

  const getBackgroundStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          background:
            'linear-gradient(135deg, var(--color-cyan-glow) 0%, var(--color-cyan-dim) 100%)',
        };
      case 'secondary':
        return {
          background:
            'linear-gradient(135deg, var(--color-neon-blue) 0%, #0050c8 100%)',
        };
      case 'ghost':
        return {
          background: 'transparent',
          border: '1px solid var(--color-hud-border)',
          color: 'var(--color-cyan-glow)',
        };
    }
  };

  const sharedClasses = clsx(
    'relative inline-flex items-center justify-center rounded-md font-heading tracking-wider uppercase',
    'transition-all duration-200',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    sizeClasses[size],
    config.base,
    isDisabled && 'pointer-events-none opacity-50',
    className
  );

  const content = (
    <>
      {/* Hover glow layer */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-md"
        style={{ boxShadow: config.glow }}
        initial={false}
        whileHover={{ boxShadow: config.glow.replace(/0\.\d+/g, (m) => String(Math.min(parseFloat(m) * 1.8, 1))) }}
      />

      {/* Content */}
      <span className="relative z-[1] flex items-center gap-2">
        {loading && (
          <Loader2
            className="animate-spin"
            size={size === 'sm' ? 14 : size === 'md' ? 16 : 18}
          />
        )}
        {children}
      </span>
    </>
  );

  if ('href' in rest && rest.href) {
    const { href, onClick, ...linkRest } = rest as NeonButtonAsLink;
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={sharedClasses}
          style={getBackgroundStyle()}
          whileHover={
            !isDisabled
              ? {
                  scale: 1.03,
                  boxShadow: `0 0 24px ${config.glowColor}`,
                }
              : undefined
          }
          whileTap={!isDisabled ? { scale: 0.97 } : undefined}
          onClick={onClick}
          aria-disabled={isDisabled || undefined}
          {...linkRest}
        >
          {content}
        </motion.a>
      </Link>
    );
  }

  const { onClick, type, ...buttonRest } = rest as NeonButtonAsButton;

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type ?? 'button'}
      className={sharedClasses}
      style={getBackgroundStyle()}
      whileHover={
        !isDisabled
          ? {
              scale: 1.03,
              boxShadow: `0 0 24px ${config.glowColor}`,
            }
          : undefined
      }
      whileTap={!isDisabled ? { scale: 0.97 } : undefined}
      onClick={onClick}
      disabled={isDisabled}
      {...buttonRest}
    >
      {content}
    </motion.button>
  );
});

export default NeonButton;
