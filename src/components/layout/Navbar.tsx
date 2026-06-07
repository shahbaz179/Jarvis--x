'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, Power, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Download', href: '/download' },
  { label: 'Updates', href: '/updates' },
  { label: 'Contact', href: '/contact' },
];

function Mark() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center border border-cyan-300/40 bg-cyan-300/10 shadow-[0_0_26px_rgba(0,246,255,0.26)]">
      <span className="absolute h-5 w-5 rotate-45 border border-cyan-200/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(0,246,255,0.9)]" />
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="fixed left-0 right-0 top-4 z-50 px-4">
        <nav
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between border px-4 transition-all duration-500 md:px-5 ${
            scrolled ? 'border-cyan-200/18 bg-[#03101d]/78 shadow-[0_18px_70px_rgba(0,0,0,0.36)] backdrop-blur-2xl' : 'border-cyan-200/10 bg-[#03101d]/38 backdrop-blur-xl'
          }`}
        >
          <Link href="/" className="group flex items-center gap-3">
            <Mark />
            <span className="font-heading text-base font-black tracking-[0.24em] text-white glow-text md:text-lg">JARVIS X</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 transition hover:text-white">
                  {link.label}
                  {active && <motion.span layoutId="nav-line" className="absolute inset-x-3 bottom-0 h-px bg-cyan-200 shadow-[0_0_14px_rgba(0,246,255,0.8)]" />}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/auth/login" className="flex h-10 items-center gap-2 border border-cyan-200/20 px-4 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-200/8">
              <Power size={15} />
              Login
            </Link>
            <Link href="/download" className="hud-button h-10 min-h-0 px-4 text-xs">
              <Download size={15} />
              Download
            </Link>
          </div>

          <button className="flex h-10 w-10 items-center justify-center border border-cyan-200/25 text-cyan-100 lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
            <Menu size={20} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-xl lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="ml-auto flex h-full w-[86vw] max-w-sm flex-col border-l border-cyan-200/18 bg-[#03101d]/95 p-5" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 280 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mark />
                  <span className="font-heading font-black tracking-[0.2em]">JARVIS X</span>
                </div>
                <button className="flex h-10 w-10 items-center justify-center border border-cyan-200/25" onClick={() => setOpen(false)} aria-label="Close navigation">
                  <X size={19} />
                </button>
              </div>
              <div className="mt-10 grid gap-2">
                {links.map((link, index) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
                    <Link href={link.href} onClick={() => setOpen(false)} className="block border border-cyan-200/10 bg-white/[0.03] px-4 py-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-200">
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Link href="/download" onClick={() => setOpen(false)} className="hud-button mt-auto w-full px-5">
                <Download size={17} />
                Download JARVIS X
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
