'use client';

import { Play } from 'lucide-react';
import { useChordStore } from '@/lib/store/chordStore';
import { useAudioStore } from '@/lib/store/audioStore';
import { isColorChord, isFusionChord } from '@/lib/utils/music';
import { Chord } from '@/lib/types';

export function ColorChords() {
  const { availableChords } = useChordStore();
  const { playChord } = useAudioStore();

  // Filter only color and fusion chords
  const colorChords = availableChords.filter(chord =>
    isColorChord(chord) || isFusionChord(chord)
  );

  const handlePlayChord = (chord: Chord) => {
    playChord(chord, 1.0);
  };

  return (
    <div className="bg-brown-800/30 border-2 border-brown-600 rounded-lg p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-brown-100">Color & Fusion Chords</h3>
        <p className="text-sm text-brown-300">
          Extended and suspended chords for harmonic exploration
        </p>
      </div>

      {/* Color chords grid */}
      {colorChords.length === 0 ? (
        <div className="text-center py-8 text-brown-400">
          <p>No color chords available</p>
          <p className="text-xs mt-2">
            Enable Fusion Mode or select a different raga to see more options
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {colorChords.map((chord, index) => {
            const isFusion = isFusionChord(chord);
            const isColor = isColorChord(chord);

            return (
              <button
                key={`${chord.root}-${chord.template.name}-${index}`}
                onClick={() => handlePlayChord(chord)}
                className={`
                  relative p-4 rounded-lg border-2 transition-all
                  hover:scale-105 hover:shadow-lg group
                  ${isFusion ? 'bg-orange-700 border-orange-500' : ''}
                  ${isColor && !isFusion ? 'bg-yellow-700 border-yellow-500' : ''}
                `}
              >
                {/* Chord name */}
                <div className="text-lg font-bold text-white mb-1">
                  {chord.name}
                </div>

                {/* Note count */}
                <div className="text-xs text-white/80">
                  {chord.notes.length} notes
                </div>

                {/* Tag */}
                <div className="absolute top-2 right-2">
                  {isFusion && (
                    <span className="px-2 py-0.5 bg-orange-900 text-orange-100 text-xs rounded font-medium">
                      Fusion
                    </span>
                  )}
                  {isColor && !isFusion && (
                    <span className="px-2 py-0.5 bg-yellow-900 text-yellow-100 text-xs rounded font-medium">
                      Color
                    </span>
                  )}
                </div>

                {/* Play icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
