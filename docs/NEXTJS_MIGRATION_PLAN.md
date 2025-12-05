# Next.js Migration Plan - Raga Chord Explorer

## Session Info
- **Start Time:** Tomorrow 7pm (when credits reset)
- **Budget:** 200k tokens
- **Goal:** Complete, working Next.js app with all features EXCEPT YouTube chord detection

---

## Features to Migrate (Priority Order)

### ✅ Core Features (MUST HAVE)
1. **Raga Selection**
   - Tradition selector (Hindustani/Carnatic)
   - Raga dropdown with filtering
   - Tonic/Scale selector (C, D, E, etc.)

2. **Chord Generation & Display**
   - Generate chords from raga notes
   - Chord cards with play functionality
   - Filters: All, Strong, Drone, Color
   - Chord tags display
   - MIDI download for each chord

3. **Audio Engine**
   - Web Audio API for playing chords
   - Drone generation (Sa-Pa, Sa-Ma)
   - Drone enable/disable toggle
   - Volume controls

4. **Interactive Panels**
   - Raga notes display (clickable badges)
   - Chord progression suggestions
   - Color/additional chords panel
   - Virtual keyboard with highlighting
   - Raga info display (Aroha, Avaroha, Vadi, Samvadi, etc.)

5. **UI/UX Features**
   - Dark/Light theme toggle
   - Responsive design
   - Settings modal (volume, preferences)
   - FAQ modal
   - Sidebar navigation

6. **Additional Features**
   - Characteristic phrases (Pakad) display
   - Metronome with tempo control
   - About section

### ❌ Features to SKIP
- YouTube chord detection (entire feature removed)
- Chat assistant (placeholder only, no implementation)

---

## Tech Stack

### Framework & Core
- **Next.js 14** (App Router)
- **TypeScript** (for type safety)
- **React 18**

### Styling
- **Tailwind CSS** (modern utility-first)
- **shadcn/ui** components (optional, for modals/selects)
- Or reuse existing CSS with minimal modifications

### Audio
- **Web Audio API** (native, no external library)
- **MIDI.js or custom** for MIDI file generation

### State Management
- **React Context** for global state (theme, settings)
- **useState/useReducer** for component state
- **Custom hooks** for audio, chord generation, etc.

---

## Project Structure

```
raga-chord-explorer-nextjs/
├── app/
│   ├── layout.tsx              # Root layout with theme provider
│   ├── page.tsx                # Home page (chord explorer)
│   ├── about/page.tsx          # About page
│   └── globals.css             # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── ThemeToggle.tsx
│   ├── raga/
│   │   ├── RagaSelector.tsx
│   │   ├── TraditionSelector.tsx
│   │   ├── TonicSelector.tsx
│   │   ├── RagaInfo.tsx
│   │   └── RagaNotes.tsx
│   ├── chords/
│   │   ├── ChordGrid.tsx
│   │   ├── ChordCard.tsx
│   │   ├── ChordFilters.tsx
│   │   ├── ChordProgression.tsx
│   │   └── ColorChords.tsx
│   ├── keyboard/
│   │   ├── VirtualKeyboard.tsx
│   │   └── KeyboardKey.tsx
│   ├── audio/
│   │   └── DroneControl.tsx
│   ├── modals/
│   │   ├── SettingsModal.tsx
│   │   └── FAQModal.tsx
│   └── metronome/
│       └── Metronome.tsx
├── lib/
│   ├── ragas.ts                # Raga data (from ragas.js)
│   ├── chordGenerator.ts       # Chord generation logic
│   ├── audioEngine.ts          # Web Audio wrapper
│   ├── midiGenerator.ts        # MIDI file generation
│   └── musicTheory.ts          # Helper functions
├── hooks/
│   ├── useAudio.ts             # Audio playback hook
│   ├── useDrone.ts             # Drone control hook
│   ├── useChordGenerator.ts    # Chord generation hook
│   └── useTheme.ts             # Theme management hook
├── types/
│   ├── raga.ts
│   ├── chord.ts
│   └── audio.ts
└── public/
    └── (assets if needed)
```

---

## Migration Steps (Estimated Tokens)

### Step 1: Project Setup (10k tokens)
- [ ] Create Next.js app with TypeScript
- [ ] Set up Tailwind CSS
- [ ] Configure project structure
- [ ] Set up basic layout (Navbar, Sidebar)

### Step 2: Data Layer (15k tokens)
- [ ] Convert ragas.js to TypeScript
- [ ] Create types for Raga, Chord, etc.
- [ ] Create chord generation logic
- [ ] Create music theory utilities

### Step 3: Audio System (20k tokens)
- [ ] Create audio engine class/hook
- [ ] Implement chord playback
- [ ] Implement drone generation
- [ ] Create MIDI generator

### Step 4: Core Components (40k tokens)
- [ ] RagaSelector with tradition/tonic controls
- [ ] ChordGrid with filtering
- [ ] ChordCard with audio playback
- [ ] RagaInfo display
- [ ] RagaNotes interactive panel

### Step 5: Interactive Features (35k tokens)
- [ ] VirtualKeyboard with highlighting
- [ ] ChordProgression generator
- [ ] ColorChords panel
- [ ] Phrases display
- [ ] Metronome component

### Step 6: UI Polish (25k tokens)
- [ ] Theme toggle (dark/light)
- [ ] Settings modal
- [ ] FAQ modal
- [ ] Responsive design
- [ ] Animations and transitions

### Step 7: Testing & Bug Fixes (30k tokens)
- [ ] Test all raga selections
- [ ] Test audio playback
- [ ] Test filters
- [ ] Test MIDI download
- [ ] Fix any issues
- [ ] Final polish

### Step 8: Deployment Setup (10k tokens)
- [ ] Build optimization
- [ ] Deployment configuration (Vercel)
- [ ] README documentation

**Total: ~185k tokens** (with 15k buffer)

---

## Key Improvements Over Current Version

1. **Type Safety**: TypeScript catches errors at compile time
2. **Component Isolation**: Each feature in its own component
3. **Better State Management**: React Context for global state
4. **No Tab Conflicts**: Proper routing with Next.js
5. **Performance**: React optimizations (useMemo, useCallback)
6. **Maintainability**: Clear structure, easy to extend
7. **Modern Stack**: Built on latest best practices

---

## What You Need to Do Before Tomorrow

1. **Decide on styling approach:**
   - Option A: Use Tailwind CSS (modern, utility-first)
   - Option B: Port existing CSS (faster, familiar look)

2. **Any additional features you want?**
   - User authentication?
   - Save favorite ragas/chords?
   - Share chord progressions?

3. **Deployment preference:**
   - Vercel (recommended, free)
   - Netlify
   - Self-hosted

---

## Quick Start Command for Tomorrow

```bash
npx create-next-app@latest raga-chord-explorer-nextjs --typescript --tailwind --app --no-src-dir
cd raga-chord-explorer-nextjs
npm install
```

---

## Notes
- All existing ragas data will be preserved
- All chord generation logic will be preserved
- Audio engine will be improved with better error handling
- UI will be cleaner and more maintainable
- No YouTube detection feature
- Focus on core chord exploration functionality

---

**Ready to build tomorrow at 7pm!** 🎵
