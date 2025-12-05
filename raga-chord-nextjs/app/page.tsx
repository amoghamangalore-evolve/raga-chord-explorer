'use client';

import { useState } from 'react';
import { useChordGeneration } from '@/lib/hooks/useChordGeneration';
import { useAudioInit } from '@/lib/hooks/useAudioInit';

import { Navbar } from '@/components/layout/Navbar';
import { ControlsBar } from '@/components/layout/ControlsBar';
import { ScaleExplorer } from '@/components/panels/ScaleExplorer';
import { ChordCardsGrid } from '@/components/panels/ChordCardsGrid';
import { WelcomeTour } from '@/components/tour/WelcomeTour';

export default function HomePage() {
  const [startTour, setStartTour] = useState<(() => void) | null>(null);

  // Initialize chord generation
  useChordGeneration();

  // Initialize audio on user interaction
  useAudioInit();

  // Handle tour trigger from navbar
  const handleHelpClick = () => {
    if (startTour) {
      startTour();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Navigation */}
      <Navbar onHelpClick={handleHelpClick} />

      {/* Main Content */}
      <main className="pt-16">
        {/* Controls Bar */}
        <ControlsBar />

        {/* Content Area */}
        <div className="p-6 space-y-6 max-w-[1920px] mx-auto">
          {/* Scale Explorer with Keyboard */}
          <section>
            <ScaleExplorer />
          </section>

          {/* All Chords Grid */}
          <section>
            <ChordCardsGrid />
          </section>
        </div>
      </main>

      {/* Floating Components */}
      <WelcomeTour onTrigger={setStartTour} />
    </div>
  );
}
