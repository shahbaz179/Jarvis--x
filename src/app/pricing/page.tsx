import { PageHero, PricingExperience, SplitShowcase } from '@/components/pages/CinematicPage';

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Access tiers" title="PRICING FOR THE NEXT COMPUTING ERA" copy="Choose the level of intelligence you want embedded into your desktop command center." />
      <PricingExperience />
      <SplitShowcase title="Every tier feels premium." copy="Start free, upgrade into autonomous execution, or unlock the ultimate operator stack for builders and power users." points={['Monthly and yearly access', 'Secure license activation', 'Agent runtime included', 'Future updates', 'Priority intelligence upgrades']} />
    </>
  );
}
