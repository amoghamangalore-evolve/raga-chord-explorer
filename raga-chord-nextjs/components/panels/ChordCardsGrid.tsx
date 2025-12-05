'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { useChordStore } from '@/lib/store/chordStore';
import { useAudioStore } from '@/lib/store/audioStore';
import { isColorChord, isFusionChord, pcToNoteName } from '@/lib/utils/music';
import { Chord } from '@/lib/types';
import { cn } from '@/lib/utils/cn';

export function ChordCardsGrid() {
  const {
    availableChords,
    showColorChords,
    showFusionChords,
    highlightedNote,
    setHighlightedChord,
  } = useChordStore();

  const { playChord } = useAudioStore();

  const [showTriadsOnly, setShowTriadsOnly] = useState(false);

  // Filter chords based on toggles
  const filteredChords = availableChords.filter(chord => {
    // Triad filter (only 3-note chords)
    if (showTriadsOnly && chord.notes.length !== 3) {
      return false;
    }

    // Color/Fusion filter
    if (!showColorChords && isColorChord(chord)) return false;
    if (!showFusionChords && isFusionChord(chord)) return false;

    return true;
  });

  const handlePlayChord = (chord: Chord, e: React.MouseEvent) => {
    e.stopPropagation();
    playChord(chord, 1.0);
    // Highlight chord notes on keyboard
    setHighlightedChord(chord);
    // Clear highlight after 3 seconds
    setTimeout(() => setHighlightedChord(null), 3000);
  };

  const handleChordClick = (chord: Chord) => {
    // Highlight chord notes on keyboard
    setHighlightedChord(chord);
    // Clear highlight after 3 seconds
    setTimeout(() => setHighlightedChord(null), 3000);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6" data-tour="chord-cards">
      {/* Header with filters */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-gray-100">
              All Available Chords ({filteredChords.length})
            </h3>
            {highlightedNote !== null && (
              <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium animate-pulse">
                Chord Mode: {pcToNoteName(highlightedNote)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showTriadsOnly}
                onChange={(e) => setShowTriadsOnly(e.target.checked)}
                className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-300">Triads Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Chords grid */}
      {filteredChords.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">No chords found</p>
          <p className="text-sm">
            {availableChords.length === 0
              ? 'Select a raga to generate chords'
              : 'Try adjusting the filters'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredChords.map((chord, index) => {
            const isFusion = isFusionChord(chord);
            const isColor = isColorChord(chord);

            // Get individual note names for this chord
            const noteNames = chord.notes.map(pc => pcToNoteName(pc)).join(', ');

            // Check if this chord contains the highlighted note (chord mode)
            const containsHighlightedNote = highlightedNote !== null && chord.notes.includes(highlightedNote);

            return (
              <button
                key={`${chord.root}-${chord.template.name}-${index}`}
                onClick={() => handleChordClick(chord)}
                className={cn(
                  'relative p-4 rounded-lg border-2 transition-all group',
                  'hover:scale-105 hover:shadow-lg',
                  containsHighlightedNote && 'ring-4 ring-green-400 scale-105 shadow-xl shadow-green-500/50',
                  containsHighlightedNote
                    ? 'bg-green-700 border-green-500'
                    : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                )}
              >
                {/* Chord name */}
                <div className="text-lg font-bold text-white mb-1">
                  {chord.name}
                </div>

                {/* Individual notes */}
                <div className="text-xs text-gray-300 mb-1">
                  {noteNames}
                </div>

                {/* Note count */}
                <div className="text-[10px] text-gray-400">
                  {chord.notes.length} notes
                </div>

                {/* Tags */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {isFusion && (
                    <span className="px-1.5 py-0.5 bg-orange-600 text-white text-xs rounded font-medium">
                      F
                    </span>
                  )}
                  {isColor && !isFusion && (
                    <span className="px-1.5 py-0.5 bg-yellow-600 text-white text-xs rounded font-medium">
                      C
                    </span>
                  )}
                </div>

                {/* Action buttons on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                  <button
                    onClick={(e) => handlePlayChord(chord, e)}
                    className="p-2 bg-green-600 hover:bg-green-700 rounded-full text-white transition-colors"
                    title="Play chord"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
