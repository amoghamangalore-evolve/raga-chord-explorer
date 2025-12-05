import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useMetronomeStore } from '../metronomeStore';

// Mock the audioStore module
vi.mock('../audioStore', () => {
  // Create a factory function for oscillators so each call gets a new object
  const createMockOscillator = () => ({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    disconnect: vi.fn(),
    frequency: { value: 0 },
    type: 'sine',
  });

  // Create a factory function for gain nodes
  const createMockGain = () => ({
    connect: vi.fn(),
    gain: {
      value: 1,
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
      linearRampToValueAtTime: vi.fn(),
      cancelScheduledValues: vi.fn(),
    },
  });

  const mockAudioContext = {
    createOscillator: vi.fn(createMockOscillator),
    createGain: vi.fn(createMockGain),
    destination: {},
    currentTime: 0,
  };

  const mockMasterGain = {
    connect: vi.fn(),
    gain: { value: 0.6 },
  };

  const mockAudioEngineInstance = {
    getAudioContext: () => mockAudioContext,
    getMasterGain: () => mockMasterGain,
  };

  return {
    getAudioEngineInstance: () => mockAudioEngineInstance,
  };
});

describe('metronomeStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useMetronomeStore.setState({
      isPlaying: false,
      tempo: 120,
      currentBeat: 1,
    });
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = useMetronomeStore.getState();
      expect(state.isPlaying).toBe(false);
      expect(state.tempo).toBe(120);
      expect(state.currentBeat).toBe(1);
    });
  });

  describe('setTempo', () => {
    it('should update tempo in state', () => {
      const { setTempo } = useMetronomeStore.getState();
      setTempo(140);

      const state = useMetronomeStore.getState();
      expect(state.tempo).toBe(140);
    });

    it('should accept tempo values in valid range', () => {
      const { setTempo } = useMetronomeStore.getState();

      // Test minimum tempo
      setTempo(60);
      expect(useMetronomeStore.getState().tempo).toBe(60);

      // Test maximum tempo
      setTempo(200);
      expect(useMetronomeStore.getState().tempo).toBe(200);

      // Test mid-range tempo
      setTempo(120);
      expect(useMetronomeStore.getState().tempo).toBe(120);
    });

    it('should update tempo while playing', async () => {
      global.window = {} as any;
      const { start, setTempo } = useMetronomeStore.getState();

      await start();
      expect(useMetronomeStore.getState().isPlaying).toBe(true);

      setTempo(100);
      expect(useMetronomeStore.getState().tempo).toBe(100);
      expect(useMetronomeStore.getState().isPlaying).toBe(true);
    });
  });

  describe('start', () => {
    it('should set isPlaying to true', async () => {
      global.window = {} as any;
      const { start } = useMetronomeStore.getState();

      await start();

      const state = useMetronomeStore.getState();
      expect(state.isPlaying).toBe(true);
    });

    it('should not start if already playing', async () => {
      global.window = {} as any;
      const { start } = useMetronomeStore.getState();

      await start();
      const stateAfterFirst = useMetronomeStore.getState();

      await start();
      const stateAfterSecond = useMetronomeStore.getState();

      expect(stateAfterFirst.isPlaying).toBe(true);
      expect(stateAfterSecond.isPlaying).toBe(true);
    });

    it('should use current tempo when starting', async () => {
      global.window = {} as any;
      const { setTempo, start } = useMetronomeStore.getState();

      setTempo(180);
      await start();

      const state = useMetronomeStore.getState();
      expect(state.isPlaying).toBe(true);
      expect(state.tempo).toBe(180);
    });
  });

  describe('stop', () => {
    it('should set isPlaying to false', async () => {
      global.window = {} as any;
      const { start, stop } = useMetronomeStore.getState();

      await start();
      expect(useMetronomeStore.getState().isPlaying).toBe(true);

      stop();
      expect(useMetronomeStore.getState().isPlaying).toBe(false);
    });

    it('should reset currentBeat to 1', async () => {
      global.window = {} as any;
      const { start, stop } = useMetronomeStore.getState();

      await start();
      // Simulate beat change
      useMetronomeStore.setState({ currentBeat: 3 });
      expect(useMetronomeStore.getState().currentBeat).toBe(3);

      stop();
      expect(useMetronomeStore.getState().currentBeat).toBe(1);
    });

    it('should be safe to call stop when not playing', () => {
      const { stop } = useMetronomeStore.getState();

      expect(useMetronomeStore.getState().isPlaying).toBe(false);
      stop();
      expect(useMetronomeStore.getState().isPlaying).toBe(false);
    });
  });

  describe('currentBeat', () => {
    it('should track beat changes from 1 to 4', () => {
      useMetronomeStore.setState({ currentBeat: 1 });
      expect(useMetronomeStore.getState().currentBeat).toBe(1);

      useMetronomeStore.setState({ currentBeat: 2 });
      expect(useMetronomeStore.getState().currentBeat).toBe(2);

      useMetronomeStore.setState({ currentBeat: 3 });
      expect(useMetronomeStore.getState().currentBeat).toBe(3);

      useMetronomeStore.setState({ currentBeat: 4 });
      expect(useMetronomeStore.getState().currentBeat).toBe(4);
    });

    it('should reset to 1 when stopped', async () => {
      global.window = {} as any;
      const { start, stop } = useMetronomeStore.getState();

      await start();
      useMetronomeStore.setState({ currentBeat: 4 });

      stop();
      expect(useMetronomeStore.getState().currentBeat).toBe(1);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete start-stop-start cycle', async () => {
      global.window = {} as any;
      const { start, stop, setTempo } = useMetronomeStore.getState();

      // First cycle
      setTempo(100);
      await start();
      expect(useMetronomeStore.getState().isPlaying).toBe(true);
      expect(useMetronomeStore.getState().tempo).toBe(100);

      stop();
      expect(useMetronomeStore.getState().isPlaying).toBe(false);
      expect(useMetronomeStore.getState().currentBeat).toBe(1);

      // Second cycle with different tempo
      setTempo(150);
      await start();
      expect(useMetronomeStore.getState().isPlaying).toBe(true);
      expect(useMetronomeStore.getState().tempo).toBe(150);

      stop();
      expect(useMetronomeStore.getState().isPlaying).toBe(false);
    });

    it('should maintain tempo through stop-start cycle', async () => {
      global.window = {} as any;
      const { start, stop, setTempo } = useMetronomeStore.getState();

      setTempo(175);
      await start();
      stop();

      expect(useMetronomeStore.getState().tempo).toBe(175);

      await start();
      expect(useMetronomeStore.getState().tempo).toBe(175);
      expect(useMetronomeStore.getState().isPlaying).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid tempo changes', () => {
      const { setTempo } = useMetronomeStore.getState();

      setTempo(60);
      setTempo(200);
      setTempo(120);
      setTempo(180);

      expect(useMetronomeStore.getState().tempo).toBe(180);
    });

    it('should handle rapid start-stop calls', async () => {
      global.window = {} as any;
      const { start, stop } = useMetronomeStore.getState();

      await start();
      stop();
      await start();
      stop();
      await start();

      expect(useMetronomeStore.getState().isPlaying).toBe(true);
    });
  });
});
