import Link from 'next/link';

const groups = [
  { title: 'System', links: [['Features', '/features'], ['Pricing', '/pricing'], ['Download', '/download'], ['Updates', '/updates']] },
  { title: 'Access', links: [['Login', '/auth/login'], ['Signup', '/auth/signup'], ['Dashboard', '/dashboard'], ['Contact', '/contact']] },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-cyan-200/10 bg-[#02060d]/75">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="font-heading text-xl font-black tracking-[0.28em] glow-text">JARVIS X</div>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
            A cinematic AI desktop command layer for voice, automation, research, coding, memory, and multi-agent intelligence.
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="font-mono-ui text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">{group.title}</h3>
            <div className="mt-4 grid gap-3">
              {group.links.map(([label, href]) => (
                <Link key={href} href={href} className="text-sm text-slate-400 transition hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-cyan-200/10">
        <div className="section-shell flex flex-col gap-2 py-5 text-xs uppercase tracking-[0.18em] text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>Copyright {new Date().getFullYear()} JARVIS X</span>
          <span>Neural desktop interface online</span>
        </div>
      </div>
    </footer>
  );
}
