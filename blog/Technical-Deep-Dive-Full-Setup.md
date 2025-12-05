# RagaMind AI: Complete Technical Setup Guide

## From Zero to Production - A Full Application Breakdown

---

**Published:** January 2025 | **Reading Time:** 25 minutes
**Audience:** Developers, Technical Architects, Engineers

---

## Introduction

This is the technical companion to "The One-Man Army" series. While that series focused on the PM perspective and AI collaboration, this post is pure technical deep-dive.

**What you'll learn:**
- Complete project architecture
- Every file and its purpose
- Setup from scratch (step-by-step)
- State management patterns
- Audio engine implementation
- Component structure
- Deployment process
- Best practices and patterns

**Prerequisites:**
- Basic React knowledge
- JavaScript/TypeScript fundamentals
- Command line comfort
- Node.js installed

Let's build RagaMind AI from the ground up.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Initial Setup](#initial-setup)
5. [Type System](#type-system)
6. [Data Layer](#data-layer)
7. [State Management](#state-management)
8. [Audio Engine](#audio-engine)
9. [Component Architecture](#component-architecture)
10. [Styling System](#styling-system)
11. [Custom Hooks](#custom-hooks)
12. [Utilities](#utilities)
13. [Configuration](#configuration)
14. [Deployment](#deployment)
15. [Performance Optimization](#performance-optimization)
16. [Testing Strategy](#testing-strategy)
17. [Troubleshooting](#troubleshooting)

---

## Project Overview

### What is RagaMind AI?

**Purpose:** Explore Western chord progressions based on Indian classical ragas

**Core Features:**
- Select from 12 ragas (Hindustani/Carnatic traditions)
- Generate chords that fit within raga notes
- Build 8-chord progressions
- Play with 2-octave virtual keyboard
- Practice with tanpura drone
- Keep time with metronome

### Technical Specifications

**Performance Targets:**
- Bundle size: <300 KB
- Load time: <1 second
- Lighthouse score: 90+
- Type coverage: 100%

**Browser Support:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Technology Stack

### Core Framework

**Next.js 14 (App Router)**
```json
"next": "^14.2.5"
```

**Why Next.js?**
- Server-side rendering capability
- Automatic code splitting
- Built-in routing
- Image optimization
- API routes (for future features)
- Easy deployment

### Language

**TypeScript 5.5+**
```json
"typescript": "^5.5.3"
```

**Why TypeScript?**
- Compile-time type checking
- Better IDE support
- Self-documenting code
- Prevents runtime errors
- Easier refactoring

### State Management

**Zustand 4.5**
```json
"zustand": "^4.5.2"
```

**Why Zustand?**
- Simple API (easier than Redux)
- Small bundle size (~1KB)
- No boilerplate
- TypeScript-friendly
- Excellent performance

### Styling

**Tailwind CSS 3.4**
```json
"tailwindcss": "^3.4.4"
```

**Why Tailwind?**
- Utility-first approach
- No CSS conflicts
- Responsive design system
- Customizable theme
- Tree-shaking (unused styles removed)

### UI Components

**Lucide React 0.395**
```json
"lucide-react": "^0.395.0"
```

**Why Lucide?**
- Beautiful, consistent icons
- Tree-shakeable
- TypeScript support
- Lightweight

### Audio

**Web Audio API (Native)**

**Why Web Audio API?**
- Native browser support
- Low latency
- Powerful synthesis capabilities
- No dependencies

---

## Project Structure

### Complete File Tree

```
raga-chord-nextjs/
├── 📁 app/                          # Next.js App Router
│   ├── favicon.ico
│   ├── globals.css                  # Global styles + Tailwind
│   ├── icon.tsx                     # Dynamic favicon
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Main application page
│
├── 📁 components/                   # React components
│   ├── 📁 layout/
│   │   ├── ControlsBar.tsx          # Main controls (tradition, raga, etc.)
│   │   ├── Navbar.tsx               # Top navigation
│   │   ├── RagaMindLogo.tsx         # Logo component
│   │   └── Sidebar.tsx              # Left sidebar navigation
│   │
│   ├── 📁 panels/
│   │   ├── ChordCardsGrid.tsx       # All chords grid with filters
│   │   ├── ChordProgressions.tsx    # 8-slot progression builder
│   │   ├── ColorChords.tsx          # Color/fusion chord showcase
│   │   ├── ScaleExplorer.tsx        # Raga info + scale display
│   │   └── VirtualKeyboard.tsx      # 2-octave piano keyboard
│   │
│   ├── 📁 audio/
│   │   └── Metronome.tsx            # Metronome component
│   │
│   └── 📁 modals/
│       └── ChatModal.tsx            # Chat modal (placeholder)
│
├── 📁 lib/                          # Business logic
│   ├── 📁 audio/
│   │   ├── audioEngine.ts           # Main audio synthesis
│   │   └── metronomeEngine.ts       # Metronome timing
│   │
│   ├── 📁 data/
│   │   └── ragas.ts                 # Raga data + chord templates
│   │
│   ├── 📁 hooks/
│   │   ├── useAudioInit.ts          # Initialize audio on mount
│   │   └── useChordGeneration.ts    # Auto-generate chords
│   │
│   ├── 📁 store/
│   │   ├── audioStore.ts            # Audio state (volume, drone)
│   │   ├── chordStore.ts            # Chord state (generated, progression)
│   │   ├── metronomeStore.ts        # Metronome state (BPM, playing)
│   │   ├── ragaStore.ts             # Raga state (tradition, selection)
│   │   └── uiStore.ts               # UI state (sidebar, modals)
│   │
│   ├── 📁 types/
│   │   └── index.ts                 # TypeScript interfaces
│   │
│   └── 📁 utils/
│       ├── cn.ts                    # className utility
│       └── music.ts                 # Music theory utilities
│
├── 📁 public/                       # Static assets
│   └── (images, fonts, etc.)
│
├── 📁 docs/                         # Documentation
│   └── (specification files)
│
├── .gitignore
├── next.config.js                   # Next.js configuration
├── package.json                     # Dependencies
├── postcss.config.js                # PostCSS config
├── tailwind.config.ts               # Tailwind configuration
├── tsconfig.json                    # TypeScript config
└── README.md
```

**Total:** 34 files, ~5,150 lines of code

---

## Initial Setup

### Step 1: Create Next.js Project

```bash
# Create new Next.js app with TypeScript and Tailwind
npx create-next-app@latest raga-chord-nextjs --typescript --tailwind --app --no-src-dir

# Navigate to project
cd raga-chord-nextjs
```

**Options explained:**
- `--typescript`: Enable TypeScript
- `--tailwind`: Include Tailwind CSS
- `--app`: Use App Router (not Pages Router)
- `--no-src-dir`: Keep structure flat

### Step 2: Install Dependencies

```bash
# State management
npm install zustand

# Icons
npm install lucide-react

# Utilities
npm install clsx
```

### Step 3: Create Folder Structure

```bash
# Create all necessary folders
mkdir -p components/layout components/panels components/audio components/modals
mkdir -p lib/audio lib/data lib/hooks lib/store lib/types lib/utils
```

### Step 4: Configure TypeScript

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "ES2020"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Key settings:**
- `strict: true` - Enable all strict type checking
- `paths: { "@/*": ["./*"] }` - Enable @ imports
- `target: "ES2020"` - Modern JavaScript features

### Step 5: Configure Tailwind

**tailwind.config.ts:**
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        purple: {
          50: '#faf5ff',
          // ... (full palette)
          900: '#581c87',
        },
        indigo: {
          // ... (full palette)
        },
        sky: {
          // ... (full palette)
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Type System

### Core Interfaces

**lib/types/index.ts:**

```typescript
// ============================================
// RAGA TYPES
// ============================================

export interface Raga {
  id: string;                          // Unique identifier (e.g., 'yaman')
  name: string;                        // Display name (e.g., 'Yaman')
  tradition: 'hindustani' | 'carnatic'; // Musical tradition
  parent: string;                      // Parent scale/melakarta
  arohaPCs: number[];                  // Ascending scale (pitch classes 0-11)
  avarohaPCs: number[];                // Descending scale
  vadiPC: number | null;               // Most important note
  samvadiPC: number | null;            // Second most important note
  typicalDrone: 'Sa-Pa' | 'Sa-Ma' | 'Sa'; // Drone type
  notes: string;                       // Description
  pakadPCs: number[][];                // Characteristic phrases
}

// ============================================
// CHORD TYPES
// ============================================

export interface Chord {
  id: string;                          // Unique identifier
  name: string;                        // Display name (e.g., 'Cmaj7')
  notes: number[];                     // Pitch classes (0-11)
  type: string;                        // Chord type category
  category: 'strong' | 'color' | 'fusion'; // Classification
  intervals: number[];                 // Intervals from root
}

export interface ChordTemplate {
  name: string;                        // Suffix (e.g., 'm', '7', 'maj7')
  intervals: number[];                 // Intervals from root
  tags: string[];                      // Tags (e.g., ['fusion'], ['color'])
}

// ============================================
// STATE TYPES
// ============================================

export interface UIState {
  sidebarOpen: boolean;
  chatModalOpen: boolean;
  currentSection: 'chords' | 'find-scale' | 'about';

  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setChatModalOpen: (open: boolean) => void;
  setCurrentSection: (section: 'chords' | 'find-scale' | 'about') => void;
}

export interface RagaState {
  selectedTradition: 'hindustani' | 'carnatic';
  selectedRagaId: string | null;
  selectedRaga: Raga | null;
  rootNote: string;
  fusion: boolean;
  mustIncludeSa: boolean;

  setTradition: (tradition: 'hindustani' | 'carnatic') => void;
  setRaga: (ragaId: string | null) => void;
  setRootNote: (note: string) => void;
  toggleFusion: () => void;
  toggleMustIncludeSa: () => void;
}

export interface ChordState {
  generatedChords: Chord[];
  progression: (Chord | null)[];
  selectedChordId: string | null;
  searchQuery: string;
  showColorChords: boolean;
  showFusionChords: boolean;

  setGeneratedChords: (chords: Chord[]) => void;
  addToProgression: (chord: Chord, index: number) => void;
  removeFromProgression: (index: number) => void;
  clearProgression: () => void;
  setSelectedChord: (chordId: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleColorChords: () => void;
  toggleFusionChords: () => void;
}

export interface AudioState {
  masterVolume: number;
  droneVolume: number;
  droneType: 'Sa-Pa' | 'Sa-Ma' | 'Sa' | 'None';
  droneEnabled: boolean;
  audioEngine: AudioEngine | null;

  setMasterVolume: (volume: number) => void;
  setDroneVolume: (volume: number) => void;
  setDroneType: (type: 'Sa-Pa' | 'Sa-Ma' | 'Sa' | 'None') => void;
  setDroneEnabled: (enabled: boolean) => void;
  setAudioEngine: (engine: AudioEngine | null) => void;
  startDrone: () => void;
  stopDrone: () => void;
}

export interface MetronomeState {
  bpm: number;
  playing: boolean;
  currentBeat: number;
  metronomeEngine: MetronomeEngine | null;

  setBpm: (bpm: number) => void;
  setPlaying: (playing: boolean) => void;
  setCurrentBeat: (beat: number) => void;
  setMetronomeEngine: (engine: MetronomeEngine | null) => void;
  start: () => void;
  stop: () => void;
}

// ============================================
// AUDIO ENGINE TYPES
// ============================================

export class AudioEngine {
  private audioContext: AudioContext;
  private masterGain: GainNode;
  private droneGain: GainNode;
  private droneOscillators: Map<string, OscillatorNode>;

  constructor();
  playNote(pc: number, octave: number, duration?: number): void;
  playChord(notes: number[], duration?: number): void;
  startDrone(type: 'Sa-Pa' | 'Sa-Ma' | 'Sa', rootNote: string): void;
  stopDrone(): void;
  setMasterVolume(volume: number): void;
  setDroneVolume(volume: number): void;
}

export class MetronomeEngine {
  private audioContext: AudioContext;
  private intervalId: number | null;
  private bpm: number;
  private onBeat: (beat: number) => void;

  constructor(audioContext: AudioContext, onBeat: (beat: number) => void);
  start(bpm: number): void;
  stop(): void;
  setBpm(bpm: number): void;
}

// ============================================
// UTILITY TYPES
// ============================================

export type NotePC = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface Note {
  pc: NotePC;
  name: string;
  sargam: string;
}
```

---

## Data Layer

### Raga Data

**lib/data/ragas.ts:**

```typescript
import { Raga, ChordTemplate } from '@/lib/types';

// ============================================
// CONSTANTS
// ============================================

export const NOTE_NAMES = [
  "C", "C#", "D", "D#", "E", "F",
  "F#", "G", "G#", "A", "A#", "B"
];

export const PC_TO_SARGAM: Record<number, string> = {
  0: 'Sa',   // Shadja
  1: 're',   // Komal Rishabh
  2: 'Re',   // Shuddha Rishabh
  3: 'ga',   // Komal Gandhar
  4: 'Ga',   // Shuddha Gandhar
  5: 'Ma',   // Shuddha Madhyam
  6: 'Ma^',  // Tivra Madhyam
  7: 'Pa',   // Pancham
  8: 'dha',  // Komal Dhaivat
  9: 'Dha',  // Shuddha Dhaivat
  10: 'ni',  // Komal Nishad
  11: 'Ni'   // Shuddha Nishad
};

// ============================================
// CHORD TEMPLATES
// ============================================

export const CHORD_TEMPLATES: ChordTemplate[] = [
  // Triads
  { name: '', intervals: [0, 4, 7], tags: [] },              // Major
  { name: 'm', intervals: [0, 3, 7], tags: [] },             // Minor
  { name: 'dim', intervals: [0, 3, 6], tags: ['color'] },    // Diminished
  { name: 'aug', intervals: [0, 4, 8], tags: ['color'] },    // Augmented

  // Suspended chords
  { name: 'sus2', intervals: [0, 2, 7], tags: ['color'] },
  { name: 'sus4', intervals: [0, 5, 7], tags: ['color'] },

  // Sixth chords
  { name: '6', intervals: [0, 4, 7, 9], tags: [] },
  { name: 'm6', intervals: [0, 3, 7, 9], tags: [] },

  // Added tone chords
  { name: 'add9', intervals: [0, 4, 7, 14], tags: ['color'] },
  { name: 'm(add9)', intervals: [0, 3, 7, 14], tags: ['color'] },

  // Power chord
  { name: '5', intervals: [0, 7], tags: [] },

  // Seventh chords (fusion)
  { name: '7', intervals: [0, 4, 7, 10], tags: ['fusion'] },
  { name: 'm7', intervals: [0, 3, 7, 10], tags: ['fusion'] },
  { name: 'maj7', intervals: [0, 4, 7, 11], tags: ['fusion', 'color'] },
  { name: 'm7b5', intervals: [0, 3, 6, 10], tags: ['fusion', 'color'] },
  { name: 'dim7', intervals: [0, 3, 6, 9], tags: ['fusion', 'color'] },

  // Ninth chords (fusion)
  { name: '9', intervals: [0, 4, 7, 10, 14], tags: ['fusion', 'color'] },
  { name: 'm9', intervals: [0, 3, 7, 10, 14], tags: ['fusion', 'color'] },
  { name: 'maj9', intervals: [0, 4, 7, 11, 14], tags: ['fusion', 'color'] },
];

// ============================================
// RAGA DATA
// ============================================

export const RAGAS: Raga[] = [
  // HINDUSTANI RAGAS
  {
    id: 'yaman',
    name: 'Yaman',
    tradition: 'hindustani',
    parent: 'Kalyan Thaat',
    arohaPCs: [0, 2, 4, 6, 7, 9, 11, 12],
    avarohaPCs: [12, 11, 9, 7, 6, 4, 2, 0],
    vadiPC: 11, // Ni
    samvadiPC: 4, // Ga
    typicalDrone: 'Sa-Pa',
    notes: 'All shuddha notes except tivra Ma (Ma^). Evening raga, peaceful and devotional mood.',
    pakadPCs: [[0, 2, 4, 6, 7, 6, 4, 2, 0]]
  },
  {
    id: 'bhupali',
    name: 'Bhupali',
    tradition: 'hindustani',
    parent: 'Kalyan Thaat',
    arohaPCs: [0, 2, 4, 7, 9, 12],
    avarohaPCs: [12, 9, 7, 4, 2, 0],
    vadiPC: 4, // Ga
    samvadiPC: 9, // Dha
    typicalDrone: 'Sa-Pa',
    notes: 'Pentatonic raga with no Ma or Ni. Light and joyful mood, evening raga.',
    pakadPCs: [[0, 2, 4, 7, 9, 7, 4, 2, 0]]
  },
  {
    id: 'bageshree',
    name: 'Bageshree',
    tradition: 'hindustani',
    parent: 'Kafi Thaat',
    arohaPCs: [0, 2, 3, 5, 7, 9, 10, 12],
    avarohaPCs: [12, 10, 9, 7, 5, 3, 2, 0],
    vadiPC: 7, // Pa
    samvadiPC: 2, // Re
    typicalDrone: 'Sa-Ma',
    notes: 'Komal Ga and Ni. Late night raga, romantic and longing mood.',
    pakadPCs: [[0, 2, 3, 5, 7, 5, 3, 2, 0]]
  },
  {
    id: 'kafi',
    name: 'Kafi',
    tradition: 'hindustani',
    parent: 'Kafi Thaat',
    arohaPCs: [0, 2, 3, 5, 7, 9, 10, 12],
    avarohaPCs: [12, 10, 9, 7, 5, 3, 2, 0],
    vadiPC: 2, // Re
    samvadiPC: 7, // Pa
    typicalDrone: 'Sa-Pa',
    notes: 'Komal Ga and Ni. Spring season raga, pleasant and cheerful.',
    pakadPCs: [[0, 2, 3, 5, 7, 9, 10, 9, 7, 5, 3, 2, 0]]
  },
  {
    id: 'bhairav',
    name: 'Bhairav',
    tradition: 'hindustani',
    parent: 'Bhairav Thaat',
    arohaPCs: [0, 1, 4, 5, 7, 8, 11, 12],
    avarohaPCs: [12, 11, 8, 7, 5, 4, 1, 0],
    vadiPC: 4, // Ga
    samvadiPC: 11, // Ni
    typicalDrone: 'Sa-Pa',
    notes: 'Komal Re and Dha. Early morning raga, serious and devotional mood.',
    pakadPCs: [[0, 1, 4, 5, 7, 5, 4, 1, 0]]
  },
  {
    id: 'khamaj',
    name: 'Khamaj',
    tradition: 'hindustani',
    parent: 'Khamaj Thaat',
    arohaPCs: [0, 2, 4, 5, 7, 9, 11, 12],
    avarohaPCs: [12, 10, 9, 7, 5, 4, 2, 0],
    vadiPC: 4, // Ga
    samvadiPC: 0, // Sa
    typicalDrone: 'Sa-Pa',
    notes: 'Komal Ni in descent. Evening raga, romantic and playful.',
    pakadPCs: [[0, 2, 4, 5, 7, 9, 11, 10, 9, 7, 5, 4, 2, 0]]
  },
  {
    id: 'todi',
    name: 'Todi',
    tradition: 'hindustani',
    parent: 'Todi Thaat',
    arohaPCs: [0, 1, 3, 6, 7, 8, 11, 12],
    avarohaPCs: [12, 11, 8, 7, 6, 3, 1, 0],
    vadiPC: 6, // Ma^
    samvadiPC: 1, // re
    typicalDrone: 'Sa-Ma',
    notes: 'Komal Re, Ga, Dha and tivra Ma. Midday raga, serious and contemplative.',
    pakadPCs: [[0, 1, 3, 6, 7, 6, 3, 1, 0]]
  },
  {
    id: 'durga',
    name: 'Durga',
    tradition: 'hindustani',
    parent: 'Bilawal Thaat',
    arohaPCs: [0, 2, 5, 7, 9, 12],
    avarohaPCs: [12, 9, 7, 5, 2, 0],
    vadiPC: 2, // Re
    samvadiPC: 7, // Pa
    typicalDrone: 'Sa-Pa',
    notes: 'Pentatonic with no Ga or Ni. Evening raga, devotional mood.',
    pakadPCs: [[0, 2, 5, 7, 9, 7, 5, 2, 0]]
  },

  // CARNATIC RAGAS
  {
    id: 'mohanam',
    name: 'Mohanam',
    tradition: 'carnatic',
    parent: 'Harikambhoji (28th Melakarta)',
    arohaPCs: [0, 2, 4, 7, 9, 12],
    avarohaPCs: [12, 9, 7, 4, 2, 0],
    vadiPC: 4, // Ga
    samvadiPC: 9, // Dha
    typicalDrone: 'Sa-Pa',
    notes: 'Same as Bhupali. Pentatonic raga, joyful and uplifting.',
    pakadPCs: [[0, 2, 4, 7, 9, 7, 4, 2, 0]]
  },
  {
    id: 'kalyani',
    name: 'Kalyani',
    tradition: 'carnatic',
    parent: 'Kalyani (65th Melakarta)',
    arohaPCs: [0, 2, 4, 6, 7, 9, 11, 12],
    avarohaPCs: [12, 11, 9, 7, 6, 4, 2, 0],
    vadiPC: 11, // Ni
    samvadiPC: 4, // Ga
    typicalDrone: 'Sa-Pa',
    notes: 'Equivalent to Yaman. All shuddha notes with tivra Ma.',
    pakadPCs: [[0, 2, 4, 6, 7, 6, 4, 2, 0]]
  },
  {
    id: 'hindolam',
    name: 'Hindolam',
    tradition: 'carnatic',
    parent: 'Natabhairavi (20th Melakarta)',
    arohaPCs: [0, 3, 5, 8, 10, 12],
    avarohaPCs: [12, 10, 8, 5, 3, 0],
    vadiPC: 3, // ga
    samvadiPC: 8, // dha
    typicalDrone: 'Sa-Ma',
    notes: 'Pentatonic with Sa ga Ma dha ni. Spring season raga.',
    pakadPCs: [[0, 3, 5, 8, 10, 8, 5, 3, 0]]
  },
  {
    id: 'charukesi',
    name: 'Charukesi',
    tradition: 'carnatic',
    parent: 'Charukesi (26th Melakarta)',
    arohaPCs: [0, 2, 4, 5, 7, 8, 11, 12],
    avarohaPCs: [12, 11, 8, 7, 5, 4, 2, 0],
    vadiPC: 4, // Ga
    samvadiPC: 11, // Ni
    typicalDrone: 'Sa-Pa',
    notes: 'Like Western melodic minor with b6. Versatile raga.',
    pakadPCs: [[0, 2, 4, 5, 7, 8, 11, 8, 7, 5, 4, 2, 0]]
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getRagasByTradition(tradition: 'hindustani' | 'carnatic'): Raga[] {
  return RAGAS.filter(r => r.tradition === tradition);
}

export function getRagaById(id: string): Raga | undefined {
  return RAGAS.find(r => r.id === id);
}

export function getNoteName(pc: number): string {
  return NOTE_NAMES[pc % 12];
}

export function getSargamName(pc: number, sa: number): string {
  const relativePc = (pc - sa + 12) % 12;
  return PC_TO_SARGAM[relativePc] || '';
}
```

---

## State Management

### Zustand Stores

#### 1. Raga Store

**lib/store/ragaStore.ts:**

```typescript
import { create } from 'zustand';
import { Raga } from '@/lib/types';
import { RAGAS } from '@/lib/data/ragas';

interface RagaState {
  selectedTradition: 'hindustani' | 'carnatic';
  selectedRagaId: string | null;
  selectedRaga: Raga | null;
  rootNote: string;
  fusion: boolean;
  mustIncludeSa: boolean;

  setTradition: (tradition: 'hindustani' | 'carnatic') => void;
  setRaga: (ragaId: string | null) => void;
  setRootNote: (note: string) => void;
  toggleFusion: () => void;
  toggleMustIncludeSa: () => void;
}

export const useRagaStore = create<RagaState>((set, get) => ({
  // Initial state
  selectedTradition: 'hindustani',
  selectedRagaId: null,
  selectedRaga: null,
  rootNote: 'C',
  fusion: false,
  mustIncludeSa: false,

  // Actions
  setTradition: (tradition) => set({
    selectedTradition: tradition,
    selectedRagaId: null,
    selectedRaga: null
  }),

  setRaga: (ragaId) => {
    const raga = RAGAS.find(r => r.id === ragaId) || null;
    set({ selectedRagaId: ragaId, selectedRaga: raga });
  },

  setRootNote: (note) => set({ rootNote: note }),

  toggleFusion: () => set({ fusion: !get().fusion }),

  toggleMustIncludeSa: () => set({ mustIncludeSa: !get().mustIncludeSa }),
}));
```

#### 2. Chord Store

**lib/store/chordStore.ts:**

```typescript
import { create } from 'zustand';
import { Chord } from '@/lib/types';

interface ChordState {
  generatedChords: Chord[];
  progression: (Chord | null)[];
  selectedChordId: string | null;
  searchQuery: string;
  showColorChords: boolean;
  showFusionChords: boolean;

  setGeneratedChords: (chords: Chord[]) => void;
  addToProgression: (chord: Chord, index: number) => void;
  removeFromProgression: (index: number) => void;
  clearProgression: () => void;
  setSelectedChord: (chordId: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleColorChords: () => void;
  toggleFusionChords: () => void;
}

export const useChordStore = create<ChordState>((set, get) => ({
  generatedChords: [],
  progression: Array(8).fill(null),
  selectedChordId: null,
  searchQuery: '',
  showColorChords: true,
  showFusionChords: true,

  setGeneratedChords: (chords) => set({ generatedChords: chords }),

  addToProgression: (chord, index) => {
    const newProgression = [...get().progression];
    newProgression[index] = chord;
    set({ progression: newProgression });
  },

  removeFromProgression: (index) => {
    const newProgression = [...get().progression];
    newProgression[index] = null;
    set({ progression: newProgression });
  },

  clearProgression: () => set({ progression: Array(8).fill(null) }),

  setSelectedChord: (chordId) => set({ selectedChordId: chordId }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleColorChords: () => set({ showColorChords: !get().showColorChords }),

  toggleFusionChords: () => set({ showFusionChords: !get().showFusionChords }),
}));
```

#### 3. Audio Store

**lib/store/audioStore.ts:**

```typescript
import { create } from 'zustand';
import { AudioEngine } from '@/lib/audio/audioEngine';
import { useRagaStore } from './ragaStore';

interface AudioState {
  masterVolume: number;
  droneVolume: number;
  droneType: 'Sa-Pa' | 'Sa-Ma' | 'Sa' | 'None';
  droneEnabled: boolean;
  audioEngine: AudioEngine | null;

  setMasterVolume: (volume: number) => void;
  setDroneVolume: (volume: number) => void;
  setDroneType: (type: 'Sa-Pa' | 'Sa-Ma' | 'Sa' | 'None') => void;
  setDroneEnabled: (enabled: boolean) => void;
  setAudioEngine: (engine: AudioEngine | null) => void;
  startDrone: () => void;
  stopDrone: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  masterVolume: 50,
  droneVolume: 30,
  droneType: 'Sa-Pa',
  droneEnabled: false,
  audioEngine: null,

  setMasterVolume: (volume) => {
    set({ masterVolume: volume });
    get().audioEngine?.setMasterVolume(volume / 100);
  },

  setDroneVolume: (volume) => {
    set({ droneVolume: volume });
    get().audioEngine?.setDroneVolume(volume / 100);
  },

  setDroneType: (type) => set({ droneType: type }),

  setDroneEnabled: (enabled) => {
    set({ droneEnabled: enabled });
    if (!enabled) {
      get().stopDrone();
    }
  },

  setAudioEngine: (engine) => set({ audioEngine: engine }),

  startDrone: () => {
    const { audioEngine, droneType, droneEnabled } = get();
    const rootNote = useRagaStore.getState().rootNote;

    if (audioEngine && droneEnabled && droneType !== 'None') {
      audioEngine.startDrone(droneType, rootNote);
    }
  },

  stopDrone: () => {
    get().audioEngine?.stopDrone();
  },
}));
```

#### 4. Metronome Store

**lib/store/metronomeStore.ts:**

```typescript
import { create } from 'zustand';
import { MetronomeEngine } from '@/lib/audio/metronomeEngine';

interface MetronomeState {
  bpm: number;
  playing: boolean;
  currentBeat: number;
  metronomeEngine: MetronomeEngine | null;

  setBpm: (bpm: number) => void;
  setPlaying: (playing: boolean) => void;
  setCurrentBeat: (beat: number) => void;
  setMetronomeEngine: (engine: MetronomeEngine | null) => void;
  start: () => void;
  stop: () => void;
}

export const useMetronomeStore = create<MetronomeState>((set, get) => ({
  bpm: 120,
  playing: false,
  currentBeat: 0,
  metronomeEngine: null,

  setBpm: (bpm) => {
    set({ bpm });
    const { metronomeEngine, playing } = get();
    if (metronomeEngine && playing) {
      metronomeEngine.setBpm(bpm);
    }
  },

  setPlaying: (playing) => set({ playing }),

  setCurrentBeat: (beat) => set({ currentBeat: beat }),

  setMetronomeEngine: (engine) => set({ metronomeEngine: engine }),

  start: () => {
    const { metronomeEngine, bpm } = get();
    if (metronomeEngine) {
      metronomeEngine.start(bpm);
      set({ playing: true });
    }
  },

  stop: () => {
    const { metronomeEngine } = get();
    if (metronomeEngine) {
      metronomeEngine.stop();
      set({ playing: false, currentBeat: 0 });
    }
  },
}));
```

#### 5. UI Store

**lib/store/uiStore.ts:**

```typescript
import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  chatModalOpen: boolean;
  currentSection: 'chords' | 'find-scale' | 'about';

  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setChatModalOpen: (open: boolean) => void;
  setCurrentSection: (section: 'chords' | 'find-scale' | 'about') => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarOpen: false,
  chatModalOpen: false,
  currentSection: 'chords',

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),

  setChatModalOpen: (open) => set({ chatModalOpen: open }),

  setCurrentSection: (section) => set({ currentSection: section }),
}));
```

---

## Audio Engine

### Main Audio Engine

**lib/audio/audioEngine.ts:**

```typescript
import { NOTE_NAMES } from '@/lib/data/ragas';

export class AudioEngine {
  private audioContext: AudioContext;
  private masterGain: GainNode;
  private droneGain: GainNode;
  private droneOscillators: Map<string, OscillatorNode> = new Map();

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Create master gain
    this.masterGain = this.audioContext.createGain();
    this.masterGain.connect(this.audioContext.destination);
    this.masterGain.gain.value = 0.5;

    // Create drone gain
    this.droneGain = this.audioContext.createGain();
    this.droneGain.connect(this.masterGain);
    this.droneGain.gain.value = 0.3;
  }

  /**
   * Play a single note
   */
  playNote(pc: number, octave: number, duration: number = 1000): void {
    const frequency = this.getFrequency(pc, octave);
    const now = this.audioContext.currentTime;

    // Create oscillator
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;

    // Create gain node for ADSR envelope
    const gainNode = this.audioContext.createGain();

    // ADSR Envelope
    const attack = 0.01;   // 10ms attack
    const decay = 0.1;     // 100ms decay
    const sustain = 0.7;   // 70% sustain level
    const release = 0.3;   // 300ms release

    // Attack: 0 -> 1
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + attack);

    // Decay: 1 -> sustain
    gainNode.gain.linearRampToValueAtTime(sustain, now + attack + decay);

    // Release
    const releaseTime = now + (duration / 1000);
    gainNode.gain.setValueAtTime(sustain, releaseTime);
    gainNode.gain.linearRampToValueAtTime(0, releaseTime + release);

    // Connect: oscillator -> gain -> master -> destination
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Start and stop
    oscillator.start(now);
    oscillator.stop(releaseTime + release);
  }

  /**
   * Play a chord (multiple notes simultaneously)
   */
  playChord(notes: number[], duration: number = 1000): void {
    notes.forEach(pc => this.playNote(pc, 4, duration));
  }

  /**
   * Start continuous drone
   */
  startDrone(type: 'Sa-Pa' | 'Sa-Ma' | 'Sa', rootNote: string): void {
    // Stop existing drone first
    this.stopDrone();

    const saPC = NOTE_NAMES.indexOf(rootNote);
    const frequencies = this.getDroneFrequencies(type, saPC);

    const now = this.audioContext.currentTime;

    // Clear any scheduled parameter changes
    this.droneGain.gain.cancelScheduledValues(now);

    // Fade in
    this.droneGain.gain.setValueAtTime(0, now);
    this.droneGain.gain.linearRampToValueAtTime(0.3, now + 1);

    // Create oscillators for each drone note
    frequencies.forEach((freq, idx) => {
      const osc = this.audioContext.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.connect(this.droneGain);
      osc.start();
      this.droneOscillators.set(`drone-${idx}`, osc);
    });
  }

  /**
   * Stop the drone
   */
  stopDrone(): void {
    const now = this.audioContext.currentTime;

    if (this.droneOscillators.size > 0) {
      // Fade out
      this.droneGain.gain.cancelScheduledValues(now);
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
      this.droneGain.gain.linearRampToValueAtTime(0, now + 0.5);

      // Stop oscillators after fade out
      setTimeout(() => {
        this.droneOscillators.forEach(osc => osc.stop());
        this.droneOscillators.clear();
      }, 600);
    }
  }

  /**
   * Set master volume (0-1)
   */
  setMasterVolume(volume: number): void {
    this.masterGain.gain.value = volume;
  }

  /**
   * Set drone volume (0-1)
   */
  setDroneVolume(volume: number): void {
    this.droneGain.gain.value = volume;
  }

  /**
   * Calculate frequency from pitch class and octave
   */
  private getFrequency(pc: number, octave: number): number {
    const A4 = 440; // A4 frequency
    const stepsFromA4 = (octave - 4) * 12 + (pc - 9); // 9 is A
    return A4 * Math.pow(2, stepsFromA4 / 12);
  }

  /**
   * Get drone frequencies based on type
   */
  private getDroneFrequencies(type: string, saPC: number): number[] {
    const saFreq = this.getFrequency(saPC, 3);

    switch (type) {
      case 'Sa-Pa':
        return [saFreq, this.getFrequency((saPC + 7) % 12, 3)];
      case 'Sa-Ma':
        return [saFreq, this.getFrequency((saPC + 5) % 12, 3)];
      case 'Sa':
        return [saFreq];
      default:
        return [saFreq];
    }
  }
}
```

### Metronome Engine

**lib/audio/metronomeEngine.ts:**

```typescript
export class MetronomeEngine {
  private audioContext: AudioContext;
  private intervalId: number | null = null;
  private bpm: number = 120;
  private currentBeat: number = 0;
  private onBeat: (beat: number) => void;

  constructor(audioContext: AudioContext, onBeat: (beat: number) => void) {
    this.audioContext = audioContext;
    this.onBeat = onBeat;
  }

  /**
   * Start the metronome
   */
  start(bpm: number): void {
    this.stop(); // Stop any existing metronome
    this.bpm = bpm;
    this.currentBeat = 0;

    const interval = (60 / bpm) * 1000; // Convert BPM to milliseconds

    this.intervalId = window.setInterval(() => {
      this.tick();
    }, interval);

    // Immediate first tick
    this.tick();
  }

  /**
   * Stop the metronome
   */
  stop(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
      this.currentBeat = 0;
    }
  }

  /**
   * Change BPM while running
   */
  setBpm(bpm: number): void {
    const wasPlaying = this.intervalId !== null;
    if (wasPlaying) {
      this.start(bpm);
    }
  }

  /**
   * Execute a metronome tick
   */
  private tick(): void {
    this.currentBeat = (this.currentBeat % 4) + 1; // 1, 2, 3, 4, 1, ...

    // Play click sound
    this.playClick(this.currentBeat === 1);

    // Notify listeners
    this.onBeat(this.currentBeat);
  }

  /**
   * Play metronome click sound
   */
  private playClick(isAccent: boolean): void {
    const now = this.audioContext.currentTime;

    // Create oscillator for click
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    // Accent (beat 1) vs regular beat
    osc.frequency.value = isAccent ? 1200 : 800;
    gain.gain.value = isAccent ? 0.5 : 0.3;

    // Short click sound
    osc.start(now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    osc.stop(now + 0.05);
  }
}
```

---

## Component Architecture

### Main Page

**app/page.tsx:**

```typescript
'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { ControlsBar } from '@/components/layout/ControlsBar';
import { ScaleExplorer } from '@/components/panels/ScaleExplorer';
import { ChordProgressions } from '@/components/panels/ChordProgressions';
import { ColorChords } from '@/components/panels/ColorChords';
import { ChordCardsGrid } from '@/components/panels/ChordCardsGrid';
import { Metronome } from '@/components/audio/Metronome';
import { ChatModal } from '@/components/modals/ChatModal';
import { useAudioInit } from '@/lib/hooks/useAudioInit';
import { useChordGeneration } from '@/lib/hooks/useChordGeneration';

export default function Home() {
  // Initialize audio engine on mount
  useAudioInit();

  // Auto-generate chords when raga/settings change
  useChordGeneration();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Sidebar />

      <main className="pt-16">
        <ControlsBar />

        <div className="container mx-auto px-4 py-6 space-y-6">
          <ScaleExplorer />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChordProgressions />
            <ColorChords />
          </div>

          <ChordCardsGrid />
        </div>
      </main>

      <Metronome />
      <ChatModal />
    </div>
  );
}
```

Due to length, I'll continue with key component examples...

Would you like me to:
1. **Continue with the full technical deep dive** (component examples, hooks, utilities, deployment, etc.)?
2. **Make this a multi-part technical series** (like the main blog series)?
3. **Focus on specific sections** you're most interested in?

This technical guide is shaping up to be comprehensive - let me know how you'd like me to proceed!