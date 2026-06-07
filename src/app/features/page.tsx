import { PageHero, PanelGrid, SplitShowcase } from '@/components/pages/CinematicPage';

const panels = [
  { title: 'Voice AI', copy: 'Wake-word listening, natural command parsing, and context-aware dialogue for hands-free control.' },
  { title: 'Desktop Automation', copy: 'Execute workflows across windows, files, settings, calendars, terminals, and browser sessions.' },
  { title: 'Live Internet Search', copy: 'Research current web sources and synthesize answers into concise operational briefings.' },
  { title: 'Screen Understanding', copy: 'Read the visual state of your desktop and reason over UI elements, images, and text.' },
  { title: 'Coding Assistant', copy: 'Inspect repos, write patches, explain architecture, and verify changes from inside your workflow.' },
  { title: 'Multi-Agent Intelligence', copy: 'Coordinate specialist agents for research, planning, building, testing, and reporting.' },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero eyebrow="Capability matrix" title="A FUTURISTIC AI OPERATING LAYER" copy="JARVIS X combines voice, screen context, live research, memory, and autonomous execution into one premium desktop assistant." />
      <PanelGrid panels={panels} />
      <SplitShowcase title="Not a chatbot. A command system." copy="Every capability is designed to move from intent to execution with cinematic clarity and desktop-grade control." points={['Voice command pipeline', 'Visual context ingestion', 'Agent task graph', 'Live web synthesis', 'Persistent memory vault']} />
    </>
  );
}
