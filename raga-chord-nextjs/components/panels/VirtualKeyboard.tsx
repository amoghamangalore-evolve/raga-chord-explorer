'use client';

import { useMemo } from 'react';
import { useRagaStore } from '@/lib/store/ragaStore';
import { useAudioStore } from '@/lib/store/audioStore';
import { useChordStore } from '@/lib/store/chordStore';
import { KeyboardKey } from '@/lib/types';
import { pcToNoteName, pcToSargam } from '@/lib/utils/music';
import { cn } from '@/lib/utils/cn';

interface VirtualKeyboardProps {
  startOctave?: number;
  octaveCount?: number;
  activeNote?: { pc: number; octave: number } | null;
}

export function VirtualKeyboard({ startOctave = 4, octaveCount = 2, activeNote = null }: VirtualKeyboardProps) {
  const { selectedRaga, sa } = useRagaStore();
  const { playNote } = useAudioStore();
  const { setHighlightedNote, highlightedChord } = useChordStore();

  // Generate keyboard keys (C1 to C3 = 2 octaves)
  const keys = useMemo((): KeyboardKey[] => {
    const result: KeyboardKey[] = [];
    const blackKeyPositions = [1, 3, 6, 8, 10]; // C#, D#, F#, G#, A#

    // Generate exactly octaveCount octaves starting from startOctave
    for (let octave = startOctave; octave < startOctave + octaveCount; octave++) {
      for (let pc = 0; pc < 12; pc++) {
        const isBlack = blackKeyPositions.includes(pc);
        const noteName = pcToNoteName(pc, octave);
        const sargam = pcToSargam(pc, sa);

        // Check if note is in selected raga scale
        // Raga PCs are relative to Sa, so we need to convert to absolute PC
        const inScale = selectedRaga
          ? selectedRaga.arohaPCs.some(ragaPC => {
              const absolutePC = (ragaPC + sa) % 12;
              return absolutePC === pc;
            })
          : false;

        result.push({
          pc,
          octave,
          isBlack,
          noteName,
          sargam,
          inScale,
        });
      }
    }

    return result;
  }, [startOctave, octaveCount, selectedRaga, sa]);

  const handleKeyPress = (key: KeyboardKey) => {
    playNote(key.pc, key.octave, 0.6);
    // Set highlighted note for chord suggestions
    setHighlightedNote(key.pc);
    // Clear highlight after 2 seconds
    setTimeout(() => setHighlightedNote(null), 2000);
  };

  // Group keys by octave for rendering
  const keysByOctave = useMemo(() => {
    const grouped: { [octave: number]: KeyboardKey[] } = {};
    keys.forEach(key => {
      if (!grouped[key.octave]) {
        grouped[key.octave] = [];
      }
      grouped[key.octave].push(key);
    });
    return grouped;
  }, [keys]);

  // Get chord notes in proper voicing order (from root note, ascending)
  const chordNotesToHighlight = useMemo(() => {
    if (!highlightedChord) return new Set<string>();

    const highlights = new Set<string>();
    const rootPC = highlightedChord.root;

    // Find the first occurrence of the root note
    const rootKey = keys.find(k => k.pc === rootPC);
    if (!rootKey) return new Set<string>();

    const startOctave = rootKey.octave;

    // For each note in the chord, find the first occurrence at or above the root's octave
    for (const notePC of highlightedChord.notes) {
      // Find this note at or above the root octave
      const noteKey = keys.find(k => {
        if (k.pc !== notePC) return false;
        // If it's the root or a note with PC >= root, same octave is fine
        // If it's a note with PC < root, it must be in the next octave
        if (notePC >= rootPC) {
          return k.octave === startOctave;
        } else {
          return k.octave === startOctave + 1;
        }
      });

      if (noteKey) {
        highlights.add(`${noteKey.octave}-${noteKey.pc}`);
      }
    }

    return highlights;
  }, [highlightedChord, keys]);

  return (
    <div className="relative bg-gray-700 p-6 rounded-lg overflow-x-auto">
      {/* Keyboard container - allow horizontal scroll if needed */}
      <div className="flex gap-1 min-w-max">
        {Object.entries(keysByOctave).map(([octave, octaveKeys]) => (
          <div key={octave} className="relative flex">
            {/* White keys */}
            <div className="flex">
              {octaveKeys
                .filter(key => !key.isBlack)
                .map((key) => {
                  const isActive = activeNote && activeNote.pc === key.pc && activeNote.octave === key.octave;
                  const isInChord = chordNotesToHighlight.has(`${key.octave}-${key.pc}`);
                  return (
                    <button
                      key={`${key.octave}-${key.pc}`}
                      onClick={() => handleKeyPress(key)}
                      className={cn(
                        'relative border-2 rounded-b-lg transition-all duration-150',
                        // Responsive widths: mobile -> tablet -> desktop
                        'w-8 h-28 sm:w-10 sm:h-32 md:w-11 md:h-36 lg:w-12 lg:h-40',
                        'hover:shadow-lg hover:scale-105 active:scale-95',
                        isActive && 'scale-95 shadow-2xl ring-4 ring-yellow-400',
                        isInChord && !isActive && 'ring-4 ring-blue-500 scale-105',
                        !isActive && !isInChord && key.inScale && 'bg-gradient-to-b from-purple-200 via-purple-100 to-white border-purple-500 shadow-purple-300/50',
                        !isActive && !isInChord && !key.inScale && 'bg-gradient-to-b from-gray-100 to-white border-gray-400 opacity-60',
                        isInChord && !isActive && 'bg-gradient-to-b from-blue-300 via-blue-200 to-blue-50 border-blue-600 shadow-xl shadow-blue-500/70',
                        isActive && key.inScale && 'bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-100 border-yellow-500',
                        isActive && !key.inScale && 'bg-gradient-to-b from-yellow-200 to-yellow-100 border-yellow-400'
                      )}
                      title={`${key.noteName} (${key.sargam})`}
                    >
                      <div className="absolute bottom-1 sm:bottom-2 left-0 right-0 text-center">
                        <div className="text-[10px] sm:text-xs font-medium text-gray-800">
                          {key.noteName.replace(/\d/, '')}
                        </div>
                        {key.inScale && (
                          <div className="text-[10px] sm:text-xs font-bold text-purple-700">
                            {key.sargam}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>

            {/* Black keys (overlay) */}
            <div className="absolute top-0 left-0 right-0 flex">
              {octaveKeys
                .filter(key => key.isBlack)
                .map((key) => {
                  // Position black keys correctly between white keys
                  // PC mapping: C#=1, D#=3, F#=6, G#=8, A#=10
                  // White key positions: C=0, D=1, E=2, F=3, G=4, A=5, B=6
                  let whiteKeyIndex = 0;
                  if (key.pc === 1) whiteKeyIndex = 0;       // C# goes after C (index 0)
                  else if (key.pc === 3) whiteKeyIndex = 1;  // D# goes after D (index 1)
                  else if (key.pc === 6) whiteKeyIndex = 3;  // F# goes after F (index 3)
                  else if (key.pc === 8) whiteKeyIndex = 4;  // G# goes after G (index 4)
                  else if (key.pc === 10) whiteKeyIndex = 5; // A# goes after A (index 5)

                  // Responsive positioning - scales with white key width
                  // Mobile: 32px, sm: 40px, md: 44px, lg: 48px per white key
                  const offsetRatio = whiteKeyIndex + 0.75; // Position between white keys
                  const isActive = activeNote && activeNote.pc === key.pc && activeNote.octave === key.octave;
                  const isInChord = chordNotesToHighlight.has(`${key.octave}-${key.pc}`);

                  return (
                    <button
                      key={`${key.octave}-${key.pc}`}
                      onClick={() => handleKeyPress(key)}
                      className={cn(
                        'absolute border-2 rounded-b-lg transition-all duration-150 z-10',
                        // Responsive widths for black keys
                        'w-6 h-20 sm:w-7 sm:h-22 md:w-7 md:h-26 lg:w-8 lg:h-24',
                        'hover:shadow-lg hover:scale-105 active:scale-95',
                        isActive && 'scale-95 shadow-2xl ring-4 ring-yellow-400',
                        isInChord && !isActive && 'ring-4 ring-blue-400 scale-105',
                        !isActive && !isInChord && key.inScale && 'bg-gradient-to-b from-purple-700 via-purple-800 to-purple-900 border-purple-600 shadow-purple-500/50',
                        !isActive && !isInChord && !key.inScale && 'bg-gradient-to-b from-gray-800 via-gray-900 to-black border-gray-700 opacity-40',
                        isInChord && !isActive && 'bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 border-blue-400 shadow-xl shadow-blue-400/80',
                        isActive && key.inScale && 'bg-gradient-to-b from-yellow-500 via-yellow-600 to-yellow-700 border-yellow-400',
                        isActive && !key.inScale && 'bg-gradient-to-b from-yellow-600 to-yellow-700 border-yellow-500'
                      )}
                      style={{
                        left: `calc(${offsetRatio} * (100% / 7))`
                      }}
                      title={`${key.noteName} (${key.sargam})`}
                    >
                      <div className="absolute bottom-1 left-0 right-0 text-center">
                        <div className="text-[10px] sm:text-xs font-medium text-white">
                          {key.noteName.replace(/\d/, '')}
                        </div>
                        {key.inScale && (
                          <div className="text-[10px] sm:text-xs font-bold text-white">
                            {key.sargam}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-6 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-b from-purple-200 to-purple-100 border-2 border-purple-500 rounded shadow-sm"></div>
          <span className="font-medium">In Raga Scale</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-b from-gray-100 to-white border-2 border-gray-400 rounded opacity-60 shadow-sm"></div>
          <span className="font-medium opacity-75">Out of Scale</span>
        </div>
      </div>
    </div>
  );
}
