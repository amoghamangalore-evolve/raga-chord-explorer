// Core TypeScript types and interfaces for the application

export type Tradition = 'hindustani' | 'carnatic';

export type DroneType = 'Sa-Pa' | 'Sa-Ma' | 'Sa' | 'None';

export type ChordTag = 'color' | 'fusion';

export interface ChordTemplate {
  name: string;
  intervals: number[];
  tags: ChordTag[];
}

export interface Raga {
  id: string;
  name: string;
  tradition: Tradition;
  parent: string;
  arohaPCs: number[]; // Pitch classes for aroha (ascending)
  avarohaPCs: number[]; // Pitch classes for avaroha (descending)
  vadiPC: number | null; // Most important note
  samvadiPC: number | null; // Second most important note
  typicalDrone: DroneType;
  notes: string;
  pakadPCs: number[][]; // Characteristic phrases
}

export interface Chord {
  root: number; // Pitch class (0-11)
  template: ChordTemplate;
  notes: number[]; // Actual pitch classes in the chord
  name: string; // e.g., "C", "Dm7", "Esus4"
}

export interface ChordProgression {
  chords: Chord[];
  name?: string;
}

export interface Note {
  pc: number; // Pitch class (0-11)
  octave: number;
  frequency: number;
  noteName: string; // e.g., "C4", "D#5"
  sargam: string; // e.g., "Sa", "Re", "ga"
}

// UI State interfaces
export interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  activeSection: 'dashboard' | 'ragas' | 'chords' | 'theory' | 'help';

  // Modals
  chatModalOpen: boolean;

  // Metronome
  metronomeOpen: boolean;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  setActiveSection: (section: UIState['activeSection']) => void;
  setChatModalOpen: (open: boolean) => void;
  setMetronomeOpen: (open: boolean) => void;
}

export interface RagaState {
  // Selected raga
  selectedTradition: Tradition;
  selectedRagaId: string | null;
  selectedRaga: Raga | null;

  // Controls
  sa: number; // Root note (0-11)
  fusionMode: boolean;
  mustIncludeSa: boolean;

  // Drone
  droneType: DroneType;
  droneVolume: number; // 0-1
  droneActive: boolean;

  // Actions
  setTradition: (tradition: Tradition) => void;
  setRaga: (ragaId: string) => void;
  setSa: (sa: number) => void;
  setFusionMode: (fusion: boolean) => void;
  setMustIncludeSa: (include: boolean) => void;
  setDroneType: (type: DroneType) => void;
  setDroneVolume: (volume: number) => void;
  setDroneActive: (active: boolean) => void;
}

export interface ChordState {
  // Available chords
  availableChords: Chord[];

  // Filters
  showColorChords: boolean;
  showFusionChords: boolean;

  // Selections
  selectedChords: Chord[]; // For chord progression
  highlightedChord: Chord | null; // Currently playing
  highlightedNote: number | null; // Currently pressed note (PC) for chord suggestions

  // Actions
  setAvailableChords: (chords: Chord[]) => void;
  setShowColorChords: (show: boolean) => void;
  setShowFusionChords: (show: boolean) => void;
  addChordToProgression: (chord: Chord) => void;
  removeChordFromProgression: (index: number) => void;
  clearProgression: () => void;
  setHighlightedChord: (chord: Chord | null) => void;
  setHighlightedNote: (pc: number | null) => void;
}

export interface AudioState {
  // Audio context
  initialized: boolean;

  // Volumes
  masterVolume: number; // 0-1

  // Drone
  droneEnabled: boolean;

  // Actions
  initialize: () => Promise<void>;
  setMasterVolume: (volume: number) => void;
  playNote: (pc: number, octave: number, duration?: number) => void;
  playChord: (chord: Chord, duration?: number) => void;
  stopAll: () => void;
  startDrone: (sa: number, droneType: DroneType) => void;
  stopDrone: () => void;
  setDroneVolume: (volume: number) => void;
}

export interface MetronomeState {
  // State
  isPlaying: boolean;
  tempo: number; // BPM (60-200)
  currentBeat: number; // 1-4

  // Actions
  start: () => void;
  stop: () => void;
  setTempo: (tempo: number) => void;
}

// Utility types
export type PitchClass = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface KeyboardKey {
  pc: number;
  octave: number;
  isBlack: boolean;
  noteName: string;
  sargam: string;
  inScale: boolean;
}
