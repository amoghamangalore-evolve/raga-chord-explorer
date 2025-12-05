import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RagaMind AI - AI-Powered Raga Chord Discovery',
  description: 'Discover harmony in Indian classical music with AI. Explore ragas, generate intelligent chord progressions, and unlock creative possibilities.',
  keywords: ['ragamind', 'ai', 'raga', 'Indian classical music', 'chords', 'harmony', 'Hindustani', 'Carnatic', 'music ai', 'chord generator'],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
