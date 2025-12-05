import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test case
afterEach(() => {
  cleanup();
  // Restore timers after each test
  vi.restoreAllMocks();
});

// Mock Web Audio API
global.AudioContext = vi.fn().mockImplementation(() => ({
  createOscillator: vi.fn().mockReturnValue({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    frequency: { value: 0 },
    type: 'sine',
  }),
  createGain: vi.fn().mockReturnValue({
    connect: vi.fn(),
    gain: {
      value: 1,
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
      linearRampToValueAtTime: vi.fn(),
      cancelScheduledValues: vi.fn(),
    },
  }),
  destination: {},
  currentTime: 0,
  resume: vi.fn().mockResolvedValue(undefined),
  close: vi.fn().mockResolvedValue(undefined),
  state: 'running',
}));

// Mock setInterval and clearInterval for both global and window
const mockSetInterval = vi.fn(() => {
  return 1 as any; // Return a fake interval ID
}) as any;

const mockClearInterval = vi.fn() as any;

// Set on global
global.setInterval = mockSetInterval;
global.clearInterval = mockClearInterval;

// Set on window object for browser-like behavior (jsdom)
Object.defineProperty(window, 'setInterval', {
  writable: true,
  configurable: true,
  value: mockSetInterval,
});

Object.defineProperty(window, 'clearInterval', {
  writable: true,
  configurable: true,
  value: mockClearInterval,
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
