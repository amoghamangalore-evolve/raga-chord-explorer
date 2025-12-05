'use client';

import { Play, Trash2, X } from 'lucide-react';
import { useChordStore } from '@/lib/store/chordStore';
import { useAudioStore } from '@/lib/store/audioStore';
import { cn } from '@/lib/utils/cn';

export function ChordProgressions() {
  const { selectedChords, removeChordFromProgression, clearProgression } = useChordStore();
  const { playChord } = useAudioStore();

  const handlePlayChord = (index: number) => {
    const chord = selectedChords[index];
    playChord(chord, 1.0);
  };

  const handlePlayAll = async () => {
    for (let i = 0; i < selectedChords.length; i++) {
      playChord(selectedChords[i], 1.0);
      // Wait 1 second between chords
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  return (
    <div className="bg-brown-800/30 border-2 border-brown-600 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-brown-100">
          Chord Progression Builder
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handlePlayAll}
            disabled={selectedChords.length === 0}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              selectedChords.length === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            )}
          >
            <Play className="w-4 h-4" />
            Play All
          </button>
          <button
            onClick={clearProgression}
            disabled={selectedChords.length === 0}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              selectedChords.length === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            )}
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Progression slots */}
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, index) => {
          const chord = selectedChords[index];

          return (
            <div
              key={index}
              className={cn(
                'relative h-20 rounded-lg border-2 transition-all',
                chord
                  ? 'bg-brown-700 border-brown-500 hover:border-brown-400'
                  : 'bg-brown-900/50 border-brown-700 border-dashed'
              )}
            >
              {chord ? (
                <>
                  {/* Chord info */}
                  <div className="p-3 flex flex-col items-center justify-center h-full">
                    <div className="text-lg font-bold text-brown-100">
                      {chord.name}
                    </div>
                    <div className="text-xs text-brown-300">
                      {chord.notes.length} notes
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeChordFromProgression(index)}
                    className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  {/* Play button */}
                  <button
                    onClick={() => handlePlayChord(index)}
                    className="absolute bottom-1 right-1 p-1 bg-green-600 hover:bg-green-700 rounded text-white transition-colors"
                  >
                    <Play className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-brown-500 text-sm">
                  Empty
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info text */}
      <p className="mt-4 text-xs text-brown-400">
        Click on chord cards below to add them to your progression (max 8 chords)
      </p>
    </div>
  );
}
