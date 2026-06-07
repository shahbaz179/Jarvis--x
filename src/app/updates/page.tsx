import { PageHero, UpdatesExperience } from '@/components/pages/CinematicPage';

export default function UpdatesPage() {
  return (
    <>
      <PageHero eyebrow="Changelog" title="SYSTEM UPDATES FROM THE FUTURE" copy="Track the evolution of the JARVIS X runtime, agent stack, and desktop intelligence layer." />
      <UpdatesExperience />
    </>
  );
}
