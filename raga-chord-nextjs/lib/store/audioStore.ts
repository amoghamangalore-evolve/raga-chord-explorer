import { create } from 'zustand';
import { AudioState } from '@/lib/types';

// This will be implemented by the AudioEngine
let audioEngine: any = null;

// Export getter for audioEngine instance (for use by metronome)
export const getAudioEngineInstance = () => audioEngine;

export const useAudioStore = create<AudioState>((set, get) => ({
  // Initial state
  initialized: false,
  masterVolume: 0.6,
  droneEnabled: false,

  // Actions
  initialize: async () => {
    if (get().initialized) return;

    // Import audio engine dynamically (client-side only)
    if (typeof window !== 'undefined') {
      const { AudioEngine } = await import('@/lib/audio/audioEngine');
      audioEngine = new AudioEngine();
      await audioEngine.initialize();

      // Apply current master volume after initialization
      const { masterVolume } = get();
      audioEngine.setMasterVolume(masterVolume);

      set({ initialized: true });
    }
  },

  setMasterVolume: (volume) => {
    set({ masterVolume: volume });
    if (audioEngine) {
      audioEngine.setMasterVolume(volume);
    }
  },

  playNote: (pc, octave, duration = 0.6) => {
    if (audioEngine) {
      audioEngine.playNote(pc, octave, duration);
    }
  },

  playChord: (chord, duration = 1.0) => {
    if (audioEngine) {
      audioEngine.playChord(chord, duration);
    }
  },

  stopAll: () => {
    if (audioEngine) {
      audioEngine.stopAll();
    }
  },

  startDrone: (sa: number, droneType: 'Sa-Pa' | 'Sa-Ma' | 'Sa' | 'None') => {
    if (audioEngine && droneType !== 'None') {
      audioEngine.startDrone(sa, droneType);
      set({ droneEnabled: true });
    }
  },

  stopDrone: () => {
    if (audioEngine) {
      audioEngine.stopDrone();
      set({ droneEnabled: false });
    }
  },

  setDroneVolume: (volume: number) => {
    if (audioEngine) {
      audioEngine.setDroneVolume(volume);
    }
  },
}));
