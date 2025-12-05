import { useEffect } from 'react';
import { useRagaStore } from '@/lib/store/ragaStore';
import { useChordStore } from '@/lib/store/chordStore';
import { generateChordsFromRaga, filterChords, sortChordsByRoot } from '@/lib/utils/music';

/**
 * Custom hook that automatically generates chords when raga or settings change
 */
export function useChordGeneration() {
  const { selectedRaga, sa, fusionMode, mustIncludeSa } = useRagaStore();
  const { setAvailableChords, showColorChords, showFusionChords } = useChordStore();

  useEffect(() => {
    if (!selectedRaga) {
      setAvailableChords([]);
      return;
    }

    // Generate all possible chords from the selected raga
    const allChords = generateChordsFromRaga(selectedRaga, sa, fusionMode, mustIncludeSa);

    // Filter based on user preferences
    const filtered = filterChords(allChords, showColorChords, showFusionChords);

    // Sort by root note
    const sorted = sortChordsByRoot(filtered, sa);

    setAvailableChords(sorted);
  }, [selectedRaga, sa, fusionMode, mustIncludeSa, showColorChords, showFusionChords, setAvailableChords]);
}
