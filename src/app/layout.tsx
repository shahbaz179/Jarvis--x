import type { Metadata } from 'next';
import { inter, orbitron, jetbrainsMono } from '@/lib/fonts';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CinematicBackground from '@/components/effects/CinematicBackground';
import LenisProvider from '@/components/effects/LenisProvider';

export const metadata: Metadata = {
  title: 'JARVIS X | Iron-Man Level AI Desktop Assistant',

  description:
    'A cinematic AI desktop assistant for voice, automation, research, memory, coding, and multi-agent execution.',

  verification: {
    google: 'cnqSWO5iYUov_1xnpdy0lkauaozPmRzeoDpcIYnKzac',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} antialiased min-h-screen relative`}>
        <LenisProvider />
        <CinematicBackground />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
