import { Chord } from '@/lib/types';
import { pcToFrequency } from '@/lib/utils/music';

/**
 * AudioEngine - Handles all audio playback using Web Audio API
 */
export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private droneOscillators: OscillatorNode[] = [];
  private droneGain: GainNode | null = null;

  async initialize(): Promise<void> {
    if (this.audioContext) return;

    try {
      this.audioContext = new AudioContext();
      await this.audioContext.resume();

      // Create master gain node
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.6;
      this.masterGain.connect(this.audioContext.destination);

      // Create drone gain node
      this.droneGain = this.audioContext.createGain();
      this.droneGain.gain.value = 0;
      this.droneGain.connect(this.masterGain);

      console.log('AudioEngine initialized');
    } catch (error) {
      console.error('Failed to initialize AudioEngine:', error);
    }
  }

  /**
   * Set master volume (0-1)
   */
  setMasterVolume(volume: number): void {
    if (this.masterGain) {
      const actualVolume = volume * 0.6;
      this.masterGain.gain.value = actualVolume;
      console.log(`Master volume set to: ${volume} (actual: ${actualVolume})`);
    } else {
      console.warn('Cannot set master volume: masterGain not initialized');
    }
  }

  /**
   * Get audio context (for external use like metronome)
   */
  getAudioContext(): AudioContext | null {
    return this.audioContext;
  }

  /**
   * Get master gain node (for external use like metronome)
   */
  getMasterGain(): GainNode | null {
    return this.masterGain;
  }

  /**
   * Play a single note with electric piano sound (Rhodes/Wurlitzer style)
   */
  playNote(pc: number, octave: number, duration: number = 0.6): void {
    if (!this.audioContext || !this.masterGain) return;

    const frequency = pcToFrequency(pc, octave);
    const now = this.audioContext.currentTime;

    // Electric piano harmonics for warm, bell-like tone
    // Rhodes/Wurlitzer characteristic: strong fundamental with bell-like overtones
    const harmonics = [
      { multiplier: 1, gain: 0.6, detune: 0 },       // Strong fundamental
      { multiplier: 2, gain: 0.4, detune: -2 },      // Slightly flat octave (Rhodes character)
      { multiplier: 3, gain: 0.25, detune: 3 },      // Fifth with slight sharp (bell-like)
      { multiplier: 4, gain: 0.15, detune: -1 },     // Double octave
      { multiplier: 5, gain: 0.08, detune: 2 },      // Major third above
      { multiplier: 7, gain: 0.05, detune: -3 },     // Minor seventh (Rhodes warmth)
    ];

    const oscillators: OscillatorNode[] = [];

    harmonics.forEach((harmonic, index) => {
      // Create oscillator for this harmonic
      const oscillator = this.audioContext!.createOscillator();

      // Mix sine and triangle for electric piano character
      // Fundamental is pure sine, higher harmonics have more triangle for brightness
      oscillator.type = index === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency * harmonic.multiplier;

      // Add characteristic detuning for that slightly out-of-tune Rhodes sound
      oscillator.detune.value = harmonic.detune;

      // Create gain node for this harmonic
      const harmonicGain = this.audioContext!.createGain();
      harmonicGain.gain.value = 0;

      // Add subtle tremolo (amplitude modulation) for electric piano character
      let tremolo: OscillatorNode | null = null;
      let tremoloGain: GainNode | null = null;

      if (index === 0) {
        // Add gentle tremolo only to fundamental for warmth
        tremolo = this.audioContext!.createOscillator();
        tremolo.frequency.value = 5.5; // 5.5 Hz tremolo (classic Rhodes speed)
        tremoloGain = this.audioContext!.createGain();
        tremoloGain.gain.value = 0.015; // Subtle depth (1.5% modulation)

        tremolo.connect(tremoloGain);
        tremoloGain.connect(harmonicGain.gain);
        tremolo.start(now);
        tremolo.stop(now + duration);
      }

      // Connect: oscillator -> harmonic gain -> master gain
      oscillator.connect(harmonicGain);
      harmonicGain.connect(this.masterGain!);

      // Electric piano envelope (ADSR)
      // Slightly slower attack than acoustic piano, longer sustain
      const attack = 0.008;   // 8ms attack for softer onset
      const decay = 0.25;     // Slower decay than acoustic
      const sustain = 0.35 * harmonic.gain;  // Higher sustain for singing quality
      const release = 0.5;    // Longer release for bell-like ring

      const peakGain = harmonic.gain * 0.45;  // Slightly lower peak for smoother sound

      harmonicGain.gain.setValueAtTime(0, now);
      harmonicGain.gain.linearRampToValueAtTime(peakGain, now + attack);
      harmonicGain.gain.exponentialRampToValueAtTime(
        Math.max(sustain, 0.001),
        now + attack + decay
      );
      harmonicGain.gain.setValueAtTime(
        Math.max(sustain, 0.001),
        now + duration - release
      );
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Start and stop
      oscillator.start(now);
      oscillator.stop(now + duration);

      oscillators.push(oscillator);

      // Clean up when done
      oscillator.onended = () => {
        harmonicGain.disconnect();
        oscillator.disconnect();
        if (tremolo) {
          tremolo.disconnect();
        }
        if (tremoloGain) {
          tremoloGain.disconnect();
        }
      };
    });

    // Track all oscillators for this note
    this.activeOscillators.push(...oscillators);

    // Clean up from tracking after the longest one ends
    setTimeout(() => {
      oscillators.forEach((osc) => {
        const index = this.activeOscillators.indexOf(osc);
        if (index > -1) {
          this.activeOscillators.splice(index, 1);
        }
      });
    }, duration * 1000 + 100);
  }

  /**
   * Play a chord (all notes simultaneously)
   */
  playChord(chord: Chord, duration: number = 1.0): void {
    const octave = 4;
    chord.notes.forEach((pc) => {
      this.playNote(pc, octave, duration);
    });
  }

  /**
   * Stop all currently playing notes
   */
  stopAll(): void {
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Already stopped
      }
    });
    this.activeOscillators = [];
  }

  /**
   * Start drone (tanpura simulation)
   */
  startDrone(sa: number, droneType: 'Sa-Pa' | 'Sa-Ma' | 'Sa' | 'None'): void {
    if (droneType === 'None' || !this.audioContext || !this.droneGain) return;

    // Stop any existing drone oscillators immediately
    this.droneOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Already stopped
      }
    });
    this.droneOscillators = [];

    const octave = 3;
    const baseFrequencies: number[] = [];

    // Determine drone notes based on type
    if (droneType === 'Sa-Pa') {
      baseFrequencies.push(pcToFrequency(sa, octave)); // Sa
      baseFrequencies.push(pcToFrequency((sa + 7) % 12, octave)); // Pa
    } else if (droneType === 'Sa-Ma') {
      baseFrequencies.push(pcToFrequency(sa, octave)); // Sa
      baseFrequencies.push(pcToFrequency((sa + 5) % 12, octave)); // Ma
    } else if (droneType === 'Sa') {
      baseFrequencies.push(pcToFrequency(sa, octave)); // Sa only
    }

    // Tanpura-like harmonics for rich, shimmering sound
    const harmonicMultipliers = [
      { ratio: 1, gain: 0.5 },     // Fundamental
      { ratio: 2, gain: 0.3 },     // Octave
      { ratio: 3, gain: 0.2 },     // Fifth above octave
      { ratio: 4, gain: 0.15 },    // Double octave
      { ratio: 5, gain: 0.1 },     // Major third above double octave
      { ratio: 6, gain: 0.08 },    // Fifth above double octave
    ];

    // Create oscillators for each drone note with harmonics
    baseFrequencies.forEach((baseFreq) => {
      harmonicMultipliers.forEach((harmonic, harmonicIndex) => {
        const oscillator = this.audioContext!.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = baseFreq * harmonic.ratio;

        // Create individual gain node for each harmonic to add subtle variations
        const harmonicGain = this.audioContext!.createGain();
        const baseGain = harmonic.gain * 0.15; // Lower overall volume

        // Add slight detuning for chorus effect (tanpura's characteristic shimmer)
        const detune = (Math.random() - 0.5) * 2; // ±1 cent random detune
        oscillator.detune.value = detune;

        harmonicGain.gain.value = baseGain;

        // Connect: oscillator -> harmonic gain -> drone gain
        oscillator.connect(harmonicGain);
        harmonicGain.connect(this.droneGain!);

        oscillator.start();
        this.droneOscillators.push(oscillator);

        // Add gentle LFO (Low Frequency Oscillator) for pulsing effect
        // This simulates the rhythmic strumming of tanpura strings
        const lfoFreq = 0.5 + (harmonicIndex * 0.1); // Different pulse rates for shimmer
        const lfoDepth = baseGain * 0.3; // 30% modulation depth
        const now = this.audioContext!.currentTime;

        // Create subtle pulsing with exponential curves for natural feel
        const pulseDuration = 2 / lfoFreq;
        const scheduleCount = 100; // Schedule 100 pulses ahead

        for (let i = 0; i < scheduleCount; i++) {
          const pulseStart = now + (i * pulseDuration);
          const pulsePeak = pulseStart + (pulseDuration * 0.1);
          const pulseEnd = pulseStart + pulseDuration;

          harmonicGain.gain.setValueAtTime(baseGain - lfoDepth, pulseStart);
          harmonicGain.gain.linearRampToValueAtTime(baseGain + lfoDepth, pulsePeak);
          harmonicGain.gain.exponentialRampToValueAtTime(
            Math.max(baseGain - lfoDepth, 0.001),
            pulseEnd
          );
        }
      });
    });

    // Fade in drone - cancel any scheduled changes first
    const now = this.audioContext.currentTime;
    this.droneGain.gain.cancelScheduledValues(now);
    this.droneGain.gain.setValueAtTime(0, now);
    this.droneGain.gain.linearRampToValueAtTime(0.35, now + 2); // Slower fade-in (2 seconds)
  }

  /**
   * Stop drone
   */
  stopDrone(): void {
    if (this.droneGain && this.audioContext) {
      // Fade out drone
      const now = this.audioContext.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0, now + 0.3);

      // Stop all drone oscillators after fade out
      setTimeout(() => {
        this.droneOscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {
            // Already stopped
          }
        });
        this.droneOscillators = [];
      }, 300);
    }
  }

  /**
   * Set drone volume (0-1)
   */
  setDroneVolume(volume: number): void {
    if (this.droneGain && this.audioContext) {
      const now = this.audioContext.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(volume, now + 0.1);
    }
  }
}
