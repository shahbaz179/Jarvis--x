import { DownloadExperience, PageHero, UpdatesExperience } from '@/components/pages/CinematicPage';

export default function DownloadPage() {
  return (
    <>
      <PageHero eyebrow="Installer ready" title="DOWNLOAD THE JARVIS X COMMAND CORE" copy="Install the AI desktop assistant built for voice, automation, live research, and cinematic control." action={{ label: 'Start Download', href: '#download' }} />
      <div id="download"><DownloadExperience /></div>
      <UpdatesExperience />
    </>
  );
}
