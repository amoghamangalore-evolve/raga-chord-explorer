import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAudioStore, getAudioEngineInstance } from '../audioStore';

describe('audioStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAudioStore.setState({
      initialized: false,
      masterVolume: 0.6,
      droneEnabled: false,
    });
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = useAudioStore.getState();
      expect(state.initialized).toBe(false);
      expect(state.masterVolume).toBe(0.6);
      expect(state.droneEnabled).toBe(false);
    });
  });

  describe('setMasterVolume', () => {
    it('should update master volume in state', () => {
      const { setMasterVolume } = useAudioStore.getState();
      setMasterVolume(0.8);

      const state = useAudioStore.getState();
      expect(state.masterVolume).toBe(0.8);
    });

    it('should accept volume values between 0 and 1', () => {
      const { setMasterVolume } = useAudioStore.getState();

      setMasterVolume(0);
      expect(useAudioStore.getState().masterVolume).toBe(0);

      setMasterVolume(1);
      expect(useAudioStore.getState().masterVolume).toBe(1);

      setMasterVolume(0.5);
      expect(useAudioStore.getState().masterVolume).toBe(0.5);
    });
  });

  describe('initialize', () => {
    it('should set initialized to true after initialization', async () => {
      const { initialize } = useAudioStore.getState();

      // Mock browser environment
      global.window = {} as any;

      await initialize();

      const state = useAudioStore.getState();
      expect(state.initialized).toBe(true);
    });

    it('should not initialize twice', async () => {
      const { initialize } = useAudioStore.getState();
      global.window = {} as any;

      await initialize();
      const stateAfterFirst = useAudioStore.getState();

      await initialize();
      const stateAfterSecond = useAudioStore.getState();

      expect(stateAfterFirst.initialized).toBe(true);
      expect(stateAfterSecond.initialized).toBe(true);
    });

    it('should apply current master volume after initialization', async () => {
      const { setMasterVolume, initialize } = useAudioStore.getState();
      global.window = {} as any;

      // Set volume before initialization
      setMasterVolume(0.3);

      await initialize();

      const state = useAudioStore.getState();
      expect(state.masterVolume).toBe(0.3);
      expect(state.initialized).toBe(true);
    });
  });

  describe('Drone Controls', () => {
    it('should enable drone when startDrone is called with valid type', () => {
      const { startDrone } = useAudioStore.getState();

      startDrone(0, 'Sa-Pa');

      const state = useAudioStore.getState();
      expect(state.droneEnabled).toBe(true);
    });

    it('should not enable drone when type is None', () => {
      const { startDrone } = useAudioStore.getState();

      startDrone(0, 'None');

      const state = useAudioStore.getState();
      expect(state.droneEnabled).toBe(false);
    });

    it('should disable drone when stopDrone is called', () => {
      const { startDrone, stopDrone } = useAudioStore.getState();

      // First enable it
      startDrone(0, 'Sa-Pa');
      expect(useAudioStore.getState().droneEnabled).toBe(true);

      // Then disable it
      stopDrone();
      expect(useAudioStore.getState().droneEnabled).toBe(false);
    });

    it('should work with different drone types', () => {
      const { startDrone, stopDrone } = useAudioStore.getState();

      // Sa-Pa
      startDrone(0, 'Sa-Pa');
      expect(useAudioStore.getState().droneEnabled).toBe(true);
      stopDrone();

      // Sa-Ma
      startDrone(0, 'Sa-Ma');
      expect(useAudioStore.getState().droneEnabled).toBe(true);
      stopDrone();

      // Sa Only
      startDrone(0, 'Sa');
      expect(useAudioStore.getState().droneEnabled).toBe(true);
      stopDrone();
    });
  });

  describe('Audio Engine Instance', () => {
    it('should export getAudioEngineInstance function', () => {
      expect(typeof getAudioEngineInstance).toBe('function');
    });

    it('should return audio engine instance after initialization', async () => {
      const { initialize } = useAudioStore.getState();
      global.window = {} as any;

      await initialize();
      const instance = getAudioEngineInstance();

      expect(instance).toBeDefined();
      expect(instance).not.toBeNull();
    });
  });

  describe('Integration Tests', () => {
    it('should maintain correct state through multiple operations', async () => {
      const { setMasterVolume, startDrone, stopDrone, initialize } = useAudioStore.getState();
      global.window = {} as any;

      // Set initial volume
      setMasterVolume(0.7);
      expect(useAudioStore.getState().masterVolume).toBe(0.7);

      // Start drone
      startDrone(0, 'Sa-Pa');
      expect(useAudioStore.getState().droneEnabled).toBe(true);

      // Change volume while drone is playing
      setMasterVolume(0.4);
      expect(useAudioStore.getState().masterVolume).toBe(0.4);
      expect(useAudioStore.getState().droneEnabled).toBe(true);

      // Stop drone
      stopDrone();
      expect(useAudioStore.getState().droneEnabled).toBe(false);
      expect(useAudioStore.getState().masterVolume).toBe(0.4);

      // Initialize
      await initialize();
      expect(useAudioStore.getState().initialized).toBe(true);
      expect(useAudioStore.getState().masterVolume).toBe(0.4);
    });
  });
});
