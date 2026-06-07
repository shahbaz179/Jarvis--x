'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Download, LockKeyhole, Mail, Shield, Sparkles } from 'lucide-react';

export type Panel = {
  title: string;
  eyebrow?: string;
  copy: string;
  meta?: string;
};

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

export function PageHero({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: { label: string; href: string } }) {
  return (
    <section className="px-4 pb-14 pt-32 md:pt-40">
      <div className="section-shell">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
          <div className="font-mono-ui text-xs font-bold uppercase tracking-[0.34em] text-cyan-200">{eyebrow}</div>
          <h1 className="mt-5 font-heading text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] tracking-normal text-white glow-text text-balance">{title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">{copy}</p>
          {action && (
            <Link href={action.href} className="hud-button mt-9 px-7">
              {action.label}
              <ArrowRight size={18} />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export function PanelGrid({ panels }: { panels: Panel[] }) {
  return (
    <section className="section-shell py-14">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {panels.map((panel, index) => (
          <Reveal key={panel.title} className="holo-panel min-h-64 p-6">
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.28em] text-cyan-200">{panel.eyebrow ?? `Node 0${index + 1}`}</div>
            <h2 className="mt-5 font-heading text-2xl font-black text-white">{panel.title}</h2>
            <p className="mt-4 leading-7 text-slate-300">{panel.copy}</p>
            {panel.meta && <div className="mt-6 font-mono-ui text-xs uppercase tracking-[0.2em] text-slate-500">{panel.meta}</div>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function SplitShowcase({ title, copy, points }: { title: string; copy: string; points: string[] }) {
  return (
    <section className="section-shell py-20">
      <Reveal className="holo-panel overflow-hidden p-6 md:p-9">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="font-mono-ui text-xs uppercase tracking-[0.3em] text-cyan-200">Command surface</div>
            <h2 className="mt-4 font-heading text-4xl font-black text-white md:text-5xl">{title}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">{copy}</p>
          </div>
          <div className="grid gap-4">
            {points.map((point, index) => (
              <div key={point} className="flex items-center justify-between border border-cyan-200/10 bg-black/20 px-5 py-4">
                <span className="text-slate-200">{point}</span>
                <span className="font-mono-ui text-xs text-cyan-200">{String(index + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function PricingExperience() {
  const plans = [
    ['Free', '$0', 'Explore the command layer.', ['Voice basics', '50 daily commands', '1 agent', 'Community updates']],
    ['Pro', '$19', 'Unlock the full AI desktop.', ['Unlimited commands', 'Memory AI', 'Screen understanding', 'Browser automation']],
    ['Ultimate', '$49', 'For builders and operators.', ['Unlimited agents', 'Coding assistant', 'Local mode', 'Priority execution']],
  ];

  return (
    <section className="section-shell py-12">
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map(([name, price, copy, list], index) => (
          <Reveal key={name as string} className={`holo-panel p-7 ${index === 1 ? 'shadow-[0_0_80px_rgba(0,246,255,0.18)]' : ''}`}>
            <div className="font-mono-ui text-xs uppercase tracking-[0.28em] text-cyan-200">{index === 1 ? 'Most selected' : 'Access tier'}</div>
            <h2 className="mt-5 font-heading text-3xl font-black text-white">{name}</h2>
            <div className="mt-5 flex items-end gap-2">
              <span className="font-heading text-6xl font-black text-cyan-100">{price}</span>
              <span className="pb-2 text-slate-400">/ month</span>
            </div>
            <p className="mt-4 text-slate-300">{copy}</p>
            <div className="mt-7 grid gap-3">
              {(list as string[]).map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-200">
                  <Check className="text-cyan-200" size={17} />
                  {item}
                </div>
              ))}
            </div>
            <Link href={index === 0 ? '/auth/signup' : '/download'} className={`hud-button mt-8 w-full px-5 ${index === 0 ? 'secondary' : ''}`}>
              Activate {name}
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function DownloadExperience() {
  return (
    <section className="section-shell py-14">
      <Reveal className="holo-panel p-7 md:p-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Download className="text-cyan-200" size={42} />
            <h2 className="mt-6 font-heading text-4xl font-black text-white md:text-5xl">Windows command core v2.4.1</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">A lightweight installer with voice calibration, overlay permissions, local memory vault, and agent runtime setup.</p>
            <Link href={process.env.NEXT_PUBLIC_DOWNLOAD_URL || '#'} className="hud-button mt-8 px-7">
              Download for Windows
            </Link>
          </div>
          <div className="grid gap-4 font-mono-ui text-sm uppercase tracking-[0.16em] text-slate-300">
            {['Windows 10/11 64-bit', '85 MB installer', 'Local-first vault', 'Voice calibration included', 'Automatic updates'].map((item) => (
              <div key={item} className="border border-cyan-200/10 bg-black/20 p-4">{item}</div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function UpdatesExperience() {
  const updates = [
    ['v2.4.1', 'June 5, 2026', 'Wake-word latency pass, memory retrieval optimization, and HUD polish.'],
    ['v2.4.0', 'May 15, 2026', 'Multi-agent swarm runtime with parallel specialist execution.'],
    ['v2.3.5', 'April 22, 2026', 'Screen understanding upgrade with faster OCR and UI target detection.'],
    ['v2.3.0', 'March 10, 2026', 'Browser automation suite with form filling and extraction chains.'],
  ];

  return (
    <section className="section-shell py-14">
      <div className="relative grid gap-5">
        {updates.map(([version, date, copy]) => (
          <Reveal key={version} className="holo-panel p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-heading text-2xl font-black text-cyan-100">{version}</div>
                <div className="mt-1 font-mono-ui text-xs uppercase tracking-[0.22em] text-slate-500">{date}</div>
              </div>
              <p className="max-w-2xl leading-7 text-slate-300">{copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ContactExperience() {
  return (
    <section className="section-shell py-14">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="holo-panel p-7">
          <form className="grid gap-4">
            {['Name', 'Email'].map((label) => (
              <input key={label} className="border border-cyan-200/15 bg-black/25 px-4 py-4 text-white outline-none transition focus:border-cyan-200/60" placeholder={label} type={label === 'Email' ? 'email' : 'text'} />
            ))}
            <textarea className="min-h-40 resize-none border border-cyan-200/15 bg-black/25 px-4 py-4 text-white outline-none transition focus:border-cyan-200/60" placeholder="Tell us what you want JARVIS X to execute." />
            <button className="hud-button px-6" type="button"><Mail size={18} />Transmit Message</button>
          </form>
        </Reveal>
        <Reveal className="grid gap-5">
          {['support@jarvisx.ai', 'Priority operator support', 'Enterprise command demos'].map((item) => (
            <div key={item} className="holo-panel p-6 font-mono-ui text-sm uppercase tracking-[0.18em] text-slate-200">{item}</div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function AuthExperience({ mode }: { mode: 'login' | 'signup' }) {
  const isSignup = mode === 'signup';
  return (
    <section className="flex min-h-screen items-center justify-center px-4 pb-16 pt-32">
      <motion.div className="holo-panel w-full max-w-md p-7" initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
        <Shield className="mx-auto text-cyan-200" size={42} />
        <h1 className="mt-6 text-center font-heading text-3xl font-black text-white">{isSignup ? 'Create Operator Access' : 'Operator Login'}</h1>
        <p className="mt-3 text-center text-slate-400">{isSignup ? 'Initialize your JARVIS X identity.' : 'Enter the command center.'}</p>
        <form className="mt-7 grid gap-4">
          {isSignup && <input className="border border-cyan-200/15 bg-black/25 px-4 py-4 text-white outline-none focus:border-cyan-200/60" placeholder="Full name" />}
          <input className="border border-cyan-200/15 bg-black/25 px-4 py-4 text-white outline-none focus:border-cyan-200/60" placeholder="Email" type="email" />
          <input className="border border-cyan-200/15 bg-black/25 px-4 py-4 text-white outline-none focus:border-cyan-200/60" placeholder="Password" type="password" />
          {isSignup && <input className="border border-cyan-200/15 bg-black/25 px-4 py-4 text-white outline-none focus:border-cyan-200/60" placeholder="Confirm password" type="password" />}
          <button className="hud-button px-6" type="button"><LockKeyhole size={18} />{isSignup ? 'Create Account' : 'Login'}</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          {isSignup ? 'Already have access?' : 'Need access?'}{' '}
          <Link className="text-cyan-200" href={isSignup ? '/auth/login' : '/auth/signup'}>{isSignup ? 'Login' : 'Signup'}</Link>
        </p>
      </motion.div>
    </section>
  );
}

export function DashboardExperience() {
  const metrics = ['Commands today 284', 'Agents active 05', 'Memory nodes 18,402', 'Automation queue 12'];
  return (
    <section className="section-shell min-h-screen py-32">
      <Reveal>
        <div className="font-mono-ui text-xs uppercase tracking-[0.32em] text-cyan-200">Operator dashboard</div>
        <h1 className="mt-4 font-heading text-5xl font-black text-white glow-text">Command Center</h1>
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="holo-panel p-6">
          <div className="grid gap-4">
            {['Overview', 'Subscription', 'License Key', 'Downloads', 'Settings'].map((item, index) => (
              <button key={item} className={`border px-4 py-4 text-left font-mono-ui text-sm uppercase tracking-[0.18em] ${index === 0 ? 'border-cyan-200/50 bg-cyan-200/10 text-cyan-100' : 'border-cyan-200/10 bg-black/20 text-slate-400'}`}>
                {item}
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            {metrics.map((metric) => (
              <div key={metric} className="holo-panel p-6 font-heading text-2xl font-black text-white">{metric}</div>
            ))}
          </div>
          <div className="holo-panel p-6">
            <div className="flex items-center gap-3 text-cyan-200"><Sparkles /> Neural activity stream</div>
            <div className="mt-5 grid gap-3">
              {['Generated research briefing', 'Updated memory graph', 'Queued browser workflow', 'License status active'].map((item) => (
                <div key={item} className="flex justify-between border border-cyan-200/10 bg-black/20 p-4 text-slate-300">
                  <span>{item}</span><span className="font-mono-ui text-xs text-cyan-200">OK</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
