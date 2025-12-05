import { create } from 'zustand';
import { MetronomeState } from '@/lib/types';

// This will be implemented by the Metronome audio engine
let metronomeEngine: any = null;

export const useMetronomeStore = create<MetronomeState>((set, get) => ({
  // Initial state
  isPlaying: false,
  tempo: 120,
  currentBeat: 1,

  // Actions
  start: async () => {
    if (get().isPlaying) return;

    // Import metronome engine dynamically (client-side only)
    if (typeof window !== 'undefined' && !metronomeEngine) {
      const { MetronomeEngine } = await import('@/lib/audio/metronomeEngine');
      const { getAudioEngineInstance } = await import('@/lib/store/audioStore');

      // Get shared audio engine instance
      const audioEngineInstance = getAudioEngineInstance();

      // Pass shared audio context and master gain to metronome
      metronomeEngine = new MetronomeEngine(
        audioEngineInstance?.getAudioContext(),
        audioEngineInstance?.getMasterGain()
      );

      metronomeEngine.onBeatChange = (beat: number) => {
        set({ currentBeat: beat });
      };
    }

    if (metronomeEngine) {
      const { tempo } = get();
      metronomeEngine.start(tempo);
      set({ isPlaying: true });
    }
  },

  stop: () => {
    if (metronomeEngine) {
      metronomeEngine.stop();
    }
    set({ isPlaying: false, currentBeat: 1 });
  },

  setTempo: (tempo) => {
    set({ tempo });
    if (metronomeEngine && get().isPlaying) {
      metronomeEngine.setTempo(tempo);
    }
  },
}));
