'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Bot, Brain, Code2, Download, Eye, Globe2, Mic2, MonitorCog, Network, Play, Radar, Search, Sparkles } from 'lucide-react';
import JarvisOrb from '@/components/three/JarvisOrb';

const hud = ['Voice AI active', 'Memory system online', 'Desktop control', 'Live web search', 'Multi-agent active'];
const stats = [
  ['18.7M+', 'Commands executed'],
  ['4.2M+', 'Tasks automated'],
  ['312%', 'Productivity increase'],
  ['99.99%', 'System uptime'],
];

const features = [
  { icon: Mic2, title: 'Voice AI', copy: 'Speak in natural language and trigger deep workflows with low-latency command recognition.', feed: ['Wake phrase verified', 'Intent confidence 98.7%', 'Voiceprint encrypted'] },
  { icon: MonitorCog, title: 'Desktop Automation', copy: 'Control apps, files, system settings, and repeatable routines across your desktop.', feed: ['Window graph mapped', 'Workflow compiled', 'Execution sandbox ready'] },
  { icon: Search, title: 'Real-time Internet Search', copy: 'Research live sources, synthesize answers, and bring current context into every decision.', feed: ['8 sources scanned', 'Signal quality ranked', 'Briefing generated'] },
  { icon: Globe2, title: 'Browser Automation', copy: 'Navigate tabs, fill forms, extract data, and complete browser tasks hands-free.', feed: ['DOM target locked', 'Form fields parsed', 'Action chain validated'] },
  { icon: Eye, title: 'Screen Understanding', copy: 'Read visual context, detect UI elements, and reason over what is currently on screen.', feed: ['OCR stream active', 'UI affordances detected', 'Visual memory cached'] },
  { icon: Code2, title: 'Coding Assistant', copy: 'Inspect repositories, debug errors, refactor code, and generate production-ready changes.', feed: ['Repo context indexed', 'Patch plan stable', 'Test matrix queued'] },
  { icon: Brain, title: 'Memory AI', copy: 'Remember preferences, decisions, files, and recurring workflows so the assistant evolves with you.', feed: ['Preference vector updated', 'Project memory linked', 'Recall latency 42ms'] },
  { icon: Network, title: 'Multi-Agent Intelligence', copy: 'Deploy specialist agents that research, plan, code, verify, and report in parallel.', feed: ['5 agents synchronized', 'Role graph balanced', 'Consensus reached'] },
];

const timeline = ['Speak', 'Understand', 'Research', 'Execute', 'Learn'];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-120px' }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function Waveform() {
  return (
    <div className="wave flex h-16 items-end justify-center">
      {Array.from({ length: 28 }, (_, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.045}s` }} />
      ))}
    </div>
  );
}

function FeatureVisual({ feature, index }: { feature: (typeof features)[number]; index: number }) {
  const Icon = feature.icon;
  return (
    <div className="holo-panel overflow-hidden p-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center border border-cyan-200/30 bg-cyan-200/10 text-cyan-100">
            <Icon size={23} />
          </div>
          <div>
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.24em] text-cyan-200">Module 0{index + 1}</div>
            <div className="font-heading text-lg font-bold text-white">{feature.title}</div>
          </div>
        </div>
        <Radar className="text-cyan-100/70" />
      </div>
      <div className="mt-8 grid gap-3">
        {feature.feed.map((line, i) => (
          <motion.div key={line} className="flex items-center justify-between border border-cyan-200/10 bg-black/20 px-4 py-3 font-mono-ui text-xs text-slate-300" animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 2.4, delay: i * 0.22, repeat: Infinity }}>
            <span>{line}</span>
            <span className="text-cyan-200">ONLINE</span>
          </motion.div>
        ))}
      </div>
      {index % 2 === 0 ? <Waveform /> : <div className="mt-8 h-20 bg-[linear-gradient(90deg,transparent,rgba(0,246,255,.25),transparent)] [mask-image:repeating-linear-gradient(90deg,black_0_8px,transparent_8px_15px)]" />}
    </div>
  );
}

export default function HomeExperience() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, 160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen px-4 pb-20 pt-28 md:pt-32">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="section-shell grid min-h-[calc(100vh-9rem)] items-center gap-8 lg:grid-cols-[0.92fr_1.15fr_0.72fr]">
          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="font-mono-ui text-xs font-bold uppercase tracking-[0.32em] text-cyan-200">
              Next-generation desktop intelligence
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-6 font-heading text-[clamp(2.85rem,7.2vw,6.7rem)] font-black leading-[0.92] tracking-normal text-white glow-text text-balance">
              YOUR PERSONAL<br />IRON-MAN LEVEL<br />AI ASSISTANT
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              Voice. Automation. Intelligence. One futuristic AI system for your desktop.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link className="hud-button px-7" href="/download"><Download size={19} />Download JARVIS X</Link>
              <Link className="hud-button secondary px-7" href="/features"><Play size={18} />Watch Demo</Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 1 }} className="orb-stage relative z-0">
            <div className="absolute inset-10 rounded-full bg-cyan-400/10 blur-[90px]" />
            <JarvisOrb />
          </motion.div>

          <div className="relative z-10 grid gap-4">
            {hud.map((item, index) => (
              <motion.div key={item} className="holo-panel px-4 py-4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + index * 0.09 }}>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono-ui text-xs uppercase tracking-[0.2em] text-slate-200">{item}</span>
                  <span className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(0,246,255,1)]" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-px overflow-hidden border border-cyan-200/12 bg-cyan-200/12 md:grid-cols-4">
          {stats.map(([value, label], index) => (
            <Reveal key={label} className="bg-[#030b15]/85 p-7 text-center">
              <motion.div className="font-heading text-4xl font-black text-cyan-100 glow-text" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: index * 0.08 }}>
                {value}
              </motion.div>
              <div className="mt-2 font-mono-ui text-xs uppercase tracking-[0.2em] text-slate-400">{label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="section-shell">
          <Reveal>
            <div className="max-w-3xl">
              <div className="font-mono-ui text-xs uppercase tracking-[0.32em] text-cyan-200">AI feature experience</div>
              <h2 className="mt-4 font-heading text-4xl font-black leading-tight text-white md:text-6xl">Eight intelligence engines, one cinematic command layer.</h2>
            </div>
          </Reveal>
          <div className="mt-20 grid gap-24">
            {features.map((feature, index) => (
              <Reveal key={feature.title} className={`grid items-center gap-10 lg:grid-cols-2 ${index % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <FeatureVisual feature={feature} index={index} />
                <div>
                  <div className="font-mono-ui text-xs uppercase tracking-[0.28em] text-cyan-200">Capability / 0{index + 1}</div>
                  <h3 className="mt-4 font-heading text-3xl font-black text-white md:text-5xl">{feature.title}</h3>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">{feature.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-shell">
          <Reveal className="holo-panel overflow-hidden p-5 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="border border-cyan-200/12 bg-black/20 p-5">
                <div className="flex items-center justify-between border-b border-cyan-200/10 pb-4">
                  <span className="font-heading text-xl font-black tracking-[0.16em]">JARVIS DESKTOP</span>
                  <span className="font-mono-ui text-xs text-cyan-200">LIVE OVERLAY</span>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="flex min-h-72 items-center justify-center border border-cyan-200/10 bg-cyan-200/5">
                    <div className="relative h-40 w-40 rounded-full border border-cyan-200/50 bg-cyan-200/10 shadow-[0_0_80px_rgba(0,246,255,0.35)]">
                      <div className="absolute inset-8 rounded-full bg-cyan-200 shadow-[0_0_50px_rgba(0,246,255,0.85)]" />
                    </div>
                  </div>
                  <div className="grid gap-4">
                    {['Researching live market data', 'Automating browser workflow', 'Indexing desktop context', 'Synchronizing memory graph'].map((item) => (
                      <div key={item} className="border border-cyan-200/10 bg-[#061525]/80 p-4">
                        <div className="flex items-center justify-between font-mono-ui text-xs">
                          <span>{item}</span><span className="text-cyan-200">ACTIVE</span>
                        </div>
                      </div>
                    ))}
                    <Waveform />
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                {['CPU neural load 18%', 'Agents deployed 05', 'Memory recall 42ms', 'Search confidence 97%'].map((item) => (
                  <div key={item} className="holo-panel p-5 font-mono-ui text-sm uppercase tracking-[0.16em] text-slate-200">{item}</div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-24">
        <Reveal className="text-center">
          <div className="font-mono-ui text-xs uppercase tracking-[0.32em] text-cyan-200">How JARVIS works</div>
          <h2 className="mt-4 font-heading text-4xl font-black text-white md:text-6xl">Speak. Think. Execute. Evolve.</h2>
        </Reveal>
        <div className="mt-16 grid gap-4 md:grid-cols-5">
          {timeline.map((step, index) => (
            <Reveal key={step} className="holo-panel p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200/40 font-heading text-xl text-cyan-100">0{index + 1}</div>
              <div className="mt-5 font-heading text-xl font-bold">{step}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="section-shell overflow-hidden">
          <Reveal className="mb-12 flex items-end justify-between gap-6">
            <div>
              <div className="font-mono-ui text-xs uppercase tracking-[0.32em] text-cyan-200">Operator reports</div>
              <h2 className="mt-4 font-heading text-4xl font-black text-white">Loved by power users.</h2>
            </div>
          </Reveal>
          <motion.div className="flex gap-5" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
            {[...Array(2)].flatMap((_, loop) => ['JARVIS X feels like my OS grew a second brain.', 'The desktop automation is unreal. It saves hours every day.', 'The multi-agent research flow replaced half my manual work.', 'Voice control finally feels premium, not gimmicky.'].map((quote, i) => (
              <div key={`${loop}-${quote}`} className="holo-panel w-[330px] shrink-0 p-6">
                <Sparkles className="text-cyan-200" />
                <p className="mt-5 text-lg leading-7 text-white">{quote}</p>
                <div className="mt-6 font-mono-ui text-xs uppercase tracking-[0.2em] text-slate-400">Beta operator {i + 1}</div>
              </div>
            )))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-28">
        <Reveal className="mx-auto max-w-5xl text-center">
          <div className="holo-panel px-6 py-16 md:px-12 md:py-24">
            <Activity className="mx-auto text-cyan-200" size={44} />
            <h2 className="mt-8 font-heading text-4xl font-black leading-tight text-white md:text-7xl">THE FUTURE OF COMPUTING STARTS NOW</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">Install the command layer built for a future where your computer understands intent, context, and momentum.</p>
            <Link href="/download" className="hud-button mt-10 px-8"><Bot size={20} />Download JARVIS X</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
