import { create } from 'zustand';
import { ChordState } from '@/lib/types';

export const useChordStore = create<ChordState>((set, get) => ({
  // Initial state
  availableChords: [],
  showColorChords: true,
  showFusionChords: false,
  selectedChords: [],
  highlightedChord: null,
  highlightedNote: null,

  // Actions
  setAvailableChords: (chords) => set({ availableChords: chords }),
  setShowColorChords: (show) => set({ showColorChords: show }),
  setShowFusionChords: (show) => set({ showFusionChords: show }),

  addChordToProgression: (chord) => {
    const { selectedChords } = get();
    if (selectedChords.length < 8) {
      set({ selectedChords: [...selectedChords, chord] });
    }
  },

  removeChordFromProgression: (index) => {
    const { selectedChords } = get();
    set({ selectedChords: selectedChords.filter((_, i) => i !== index) });
  },

  clearProgression: () => set({ selectedChords: [] }),
  setHighlightedChord: (chord) => set({ highlightedChord: chord }),
  setHighlightedNote: (pc) => set({ highlightedNote: pc }),
}));
