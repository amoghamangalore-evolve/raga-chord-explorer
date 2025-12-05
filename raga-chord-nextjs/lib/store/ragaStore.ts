import { create } from 'zustand';
import { RagaState } from '@/lib/types';
import { RAGAS } from '@/lib/data/ragas';

export const useRagaStore = create<RagaState>((set, get) => ({
  // Initial state
  selectedTradition: 'carnatic',
  selectedRagaId: null,
  selectedRaga: null,
  sa: 0, // C
  fusionMode: false,
  mustIncludeSa: false, // Changed to false to show all chords by default
  droneType: 'Sa-Pa',
  droneVolume: 0.3,
  droneActive: false,

  // Actions
  setTradition: (tradition) => {
    set({ selectedTradition: tradition, selectedRagaId: null, selectedRaga: null });
  },

  setRaga: (ragaId) => {
    const raga = RAGAS.find((r) => r.id === ragaId) || null;
    if (raga) {
      set({
        selectedRagaId: ragaId,
        selectedRaga: raga,
        droneType: raga.typicalDrone,
      });
    }
  },

  setSa: (sa) => set({ sa }),
  setFusionMode: (fusion) => set({ fusionMode: fusion }),
  setMustIncludeSa: (include) => set({ mustIncludeSa: include }),
  setDroneType: (type) => set({ droneType: type }),
  setDroneVolume: (volume) => set({ droneVolume: volume }),
  setDroneActive: (active) => set({ droneActive: active }),
}));
