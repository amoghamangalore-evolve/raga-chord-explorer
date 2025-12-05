'use client';

import { useState, useEffect } from 'react';
import { useRagaStore } from '@/lib/store/ragaStore';
import { useAudioStore } from '@/lib/store/audioStore';
import { pcToSargam, pcToNoteName } from '@/lib/utils/music';
import { VirtualKeyboard } from './VirtualKeyboard';

export function ScaleExplorer() {
  const { selectedRaga, sa } = useRagaStore();
  const { playNote } = useAudioStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNote, setActiveNote] = useState<{ pc: number; octave: number } | null>(null);
  const [cancelToken, setCancelToken] = useState<{ cancelled: boolean } | null>(null);

  // Cancel playback when raga or Sa changes
  useEffect(() => {
    if (cancelToken) {
      cancelToken.cancelled = true;
      setIsPlaying(false);
      setActiveNote(null);
    }
  }, [selectedRaga?.id, sa]);

  const playRagaScale = async () => {
    if (!selectedRaga || isPlaying) return;

    // Cancel any previous playback
    if (cancelToken) {
      cancelToken.cancelled = true;
    }

    // Create new cancel token for this playback
    const newCancelToken = { cancelled: false };
    setCancelToken(newCancelToken);

    setIsPlaying(true);
    const baseOctave = 4; // Use same octave as virtual keyboard
    const noteDuration = 0.6; // Duration of each note
    const noteDelay = 400; // Time between notes in ms (slightly overlapping)

    // Capture current Sa value to avoid stale closure
    const currentSa = sa;

    // Play aroha (ascending scale)
    for (let i = 0; i < selectedRaga.arohaPCs.length; i++) {
      // Check if playback was cancelled
      if (newCancelToken.cancelled) {
        setIsPlaying(false);
        setActiveNote(null);
        return;
      }

      const ragaPC = selectedRaga.arohaPCs[i];

      // Calculate absolute pitch: add Sa offset to raga PC, then determine octave
      const absolutePitch = ragaPC + currentSa;
      const octave = baseOctave + Math.floor(absolutePitch / 12);
      const pc = absolutePitch % 12;

      // Set active note for visual feedback
      setActiveNote({ pc, octave });
      playNote(pc, octave, noteDuration);

      // Wait before playing next note
      await new Promise(resolve => setTimeout(resolve, noteDelay));
    }

    // Small pause between aroha and avaroha
    if (!newCancelToken.cancelled) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Play avaroha (descending scale)
    for (let i = 0; i < selectedRaga.avarohaPCs.length; i++) {
      // Check if playback was cancelled
      if (newCancelToken.cancelled) {
        setIsPlaying(false);
        setActiveNote(null);
        return;
      }

      const ragaPC = selectedRaga.avarohaPCs[i];

      // Calculate absolute pitch: add Sa offset to raga PC, then determine octave
      const absolutePitch = ragaPC + currentSa;
      const octave = baseOctave + Math.floor(absolutePitch / 12);
      const pc = absolutePitch % 12;

      // Set active note for visual feedback
      setActiveNote({ pc, octave });
      playNote(pc, octave, noteDuration);

      // Wait before playing next note (unless it's the last note)
      if (i < selectedRaga.avarohaPCs.length - 1) {
        await new Promise(resolve => setTimeout(resolve, noteDelay));
      }
    }

    // Wait for the last note to finish before resetting state
    setTimeout(() => {
      if (!newCancelToken.cancelled) {
        setIsPlaying(false);
        setActiveNote(null);
      }
    }, noteDuration * 1000);
  };

  if (!selectedRaga) {
    return (
      <div className="bg-purple-900/30 border-2 border-purple-700 rounded-lg p-8">
        <div className="text-center text-purple-300">
          <p className="text-lg font-medium mb-2">No Raga Selected</p>
          <p className="text-sm">Select a raga from the controls above to explore its scale</p>
        </div>
      </div>
    );
  }

  // Get unique pitch classes from aroha
  const scalePCs = Array.from(new Set(selectedRaga.arohaPCs.map(pc => pc % 12)));

  return (
    <div className="bg-purple-900/30 border-2 border-purple-700 rounded-lg p-3" data-tour="scale-explorer">
      {/* Main Grid: Left (Raga Info + Scale) | Right (Keyboard) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-3">
        {/* Left Column: Raga Info + Scale Notes + Aroha/Avaroha */}
        <div className="space-y-2">
          {/* Raga Info - Compact horizontal layout */}
          <div className="flex items-baseline gap-3 flex-wrap">
            <h2 className="text-lg font-bold text-purple-100">
              {selectedRaga.name}
            </h2>
            <span className="text-xs text-purple-300">
              {selectedRaga.tradition === 'hindustani' ? 'Hindustani' : 'Carnatic'} | {selectedRaga.parent}
            </span>
          </div>
          {selectedRaga.notes && (
            <p className="text-xs text-purple-200">{selectedRaga.notes}</p>
          )}

          {/* Scale Notes - Larger badges */}
          <div>
            <h3 className="text-xs font-semibold text-purple-200 mb-1.5">Scale Notes</h3>
            <div className="flex flex-wrap gap-2">
              {scalePCs.map((pc) => {
                const absolutePc = (pc + sa) % 12;
                const noteName = pcToNoteName(absolutePc);
                const sargam = pcToSargam(pc, 0);
                const isVadi = selectedRaga.vadiPC === pc;
                const isSamvadi = selectedRaga.samvadiPC === pc;

                return (
                  <div
                    key={pc}
                    className={`
                      px-4 py-2 rounded-md border text-center transition-all
                      ${isVadi ? 'bg-purple-600 border-purple-400 text-white font-bold' : ''}
                      ${isSamvadi ? 'bg-purple-700 border-purple-500 text-white font-semibold' : ''}
                      ${!isVadi && !isSamvadi ? 'bg-purple-800/50 border-purple-600 text-purple-100' : ''}
                    `}
                  >
                    <div className="text-base font-bold leading-tight">{sargam}</div>
                    <div className="text-xs leading-tight mt-0.5">{noteName}</div>
                    {isVadi && <div className="text-[9px] leading-tight mt-0.5">Vadi</div>}
                    {isSamvadi && <div className="text-[9px] leading-tight mt-0.5">Samvadi</div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Aroha / Avaroha - Compact side by side */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <h4 className="font-semibold text-purple-200 mb-0.5">Aroha</h4>
              <div className="text-purple-200 text-xs leading-relaxed">
                {selectedRaga.arohaPCs.map((pc, index) => (
                  <span key={index}>
                    {pcToSargam(pc % 12, 0)}
                    {index < selectedRaga.arohaPCs.length - 1 && ' - '}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-purple-200 mb-0.5">Avaroha</h4>
              <div className="text-purple-200 text-xs leading-relaxed">
                {selectedRaga.avarohaPCs.map((pc, index) => (
                  <span key={index}>
                    {pcToSargam(pc % 12, 0)}
                    {index < selectedRaga.avarohaPCs.length - 1 && ' - '}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Virtual Keyboard */}
        <div className="lg:border-l lg:border-purple-700 lg:pl-3" data-tour="virtual-keyboard">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-xs font-semibold text-purple-200">
              Virtual Keyboard
            </h3>
            <button
              onClick={playRagaScale}
              disabled={isPlaying}
              className={`
                px-3 py-1 rounded-md text-xs font-medium transition-all
                ${isPlaying
                  ? 'bg-purple-600/50 text-purple-300 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-500 active:scale-95'
                }
              `}
              title="Play the aroha (ascending) and avaroha (descending) of the selected raga"
            >
              {isPlaying ? '▶ Playing...' : '▶ Play Scale'}
            </button>
          </div>
          <VirtualKeyboard startOctave={4} octaveCount={2} activeNote={activeNote} />
        </div>
      </div>
    </div>
  );
}
