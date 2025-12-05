import { useEffect } from 'react';
import { useAudioStore } from '@/lib/store/audioStore';

/**
 * Custom hook to initialize audio on user interaction
 */
export function useAudioInit() {
  const { initialized, initialize } = useAudioStore();

  useEffect(() => {
    if (initialized) return;

    // Initialize audio context on first user interaction
    const initAudio = () => {
      if (!initialized) {
        initialize();
      }
    };

    // Listen for user interactions
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('keydown', initAudio, { once: true });

    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
  }, [initialized, initialize]);
}
