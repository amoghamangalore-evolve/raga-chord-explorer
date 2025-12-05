/**
 * MetronomeEngine - Handles metronome click generation
 */
export class MetronomeEngine {
  private audioContext: AudioContext | null = null;
  private intervalId: number | null = null;
  private currentBeat: number = 1;
  private masterGain: GainNode | null = null;
  public onBeatChange: ((beat: number) => void) | null = null;

  constructor(audioContext?: AudioContext, masterGain?: GainNode) {
    if (typeof window !== 'undefined') {
      // Use provided audio context or create new one
      this.audioContext = audioContext || new AudioContext();
      this.masterGain = masterGain || null;
    }
  }

  /**
   * Start metronome at specified tempo
   */
  start(tempo: number): void {
    if (!this.audioContext) return;

    this.stop(); // Stop any existing metronome
    this.currentBeat = 1;

    const intervalMs = (60 / tempo) * 1000;

    // Play first beat immediately
    this.playClick(this.currentBeat);
    if (this.onBeatChange) {
      this.onBeatChange(this.currentBeat);
    }

    // Schedule subsequent beats
    this.intervalId = window.setInterval(() => {
      this.currentBeat = (this.currentBeat % 4) + 1;
      this.playClick(this.currentBeat);
      if (this.onBeatChange) {
        this.onBeatChange(this.currentBeat);
      }
    }, intervalMs);
  }

  /**
   * Stop metronome
   */
  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.currentBeat = 1;
  }

  /**
   * Change tempo (if playing, restart with new tempo)
   */
  setTempo(tempo: number): void {
    if (this.intervalId !== null) {
      const wasPlaying = true;
      this.stop();
      if (wasPlaying) {
        this.start(tempo);
      }
    }
  }

  /**
   * Play click sound (accent on beat 1)
   */
  private playClick(beat: number): void {
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    const isAccent = beat === 1;

    // Create click using oscillator
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = isAccent ? 1200 : 800; // Higher pitch for accent
    oscillator.connect(gainNode);

    // Connect to master gain if available, otherwise to destination
    if (this.masterGain) {
      gainNode.connect(this.masterGain);
    } else {
      gainNode.connect(this.audioContext.destination);
    }

    // Very short envelope for "click" sound
    gainNode.gain.setValueAtTime(isAccent ? 0.4 : 0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    oscillator.start(now);
    oscillator.stop(now + 0.05);
  }
}
