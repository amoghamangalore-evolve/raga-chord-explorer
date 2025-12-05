# Final Requirements for Next.js Migration
## Confirmed by User - Ready for Tomorrow's Build

---

## Page Layout (Exact Structure)

### 1. Top Navigation Bar (Purple)
- Logo (left)
- Dark/Light toggle button
- FAQ button → Opens FAQ modal
- Chat assist button → Opens placeholder chat modal
- Settings button → Opens settings modal

### 2. Left Sidebar (Blue gradient)
**Buttons (stacked):**
- ✅ **Chord explorer** (default active)
- ❌ **Find scale** - REMOVED
- ✅ **About**
- **Main Menu** label (center)
- **Profile - logged in** (bottom)

### 3. Main Content Area

#### Controls Bar (Purple - horizontal)
1. Tradition dropdown (Hindustani/Carnatic)
2. Select Raga dropdown
3. Scale dropdown (C, D, E, F, G, A, B + sharps)
4. Piano/Pad sound selector dropdown
5. Drone enable checkbox/toggle
6. Metronome tempo selector

#### Content Panels (stacked vertically)

**Panel 1: Raga Notes (Purple background)**
- Display all notes of selected raga (Sa, Re, Ga, Ma, Pa, Dha, Ni)
- Each note is a clickable badge
- When clicked → highlights related chords in panels below
- Shows Western notation too

**Panel 2: Chord Progression (Brown background)**
- Based on selected raga and scale
- Shows suggested chord progressions
- Clickable chord buttons that play when clicked
- Example: C - Dm - Em - Am - G

**Panel 3: Colors - Additional Suggested Chords (Brown background)**
- Extended/color chords (sus2, sus4, add9, maj7, etc.)
- Adds grace and color to the scale
- Clickable chord buttons that play when clicked

**Panel 4: Virtual Keyboard (Brown background)**
- Piano keyboard visual
- Highlights notes used in the selected scale
- When chord is played → shows keys being pressed
- When note is clicked → suggests related chords
- Interactive - click keys to hear notes

**Panel 5: Chord Cards Grid (NEW - below keyboard)**
- **Filter buttons:** All, Strong (✅), Drone (🎶), Color (✨)
- **Grid of chord cards:**
  - Each card shows:
    - Chord name (e.g., "Cmaj7")
    - Western notes (C E G B)
    - Sargam notation (Sa Ga Pa Ni)
    - Tags (Strong, Drone, Color, Fusion)
    - Click card → plays chord with audio
    - Download MIDI button (↓ icon)
  - Responsive grid layout
  - Cards have hover effects
  - Playing card has special highlight

---

## Features to Include

### ✅ Core Features
1. **Raga Selection System**
   - Tradition filter (Hindustani/Carnatic)
   - Raga dropdown with ~12 ragas
   - Tonic/Scale selector (12 notes)

2. **Chord Generation**
   - Generate chords from raga notes
   - Score and rank chords
   - Tag system: Strong, Drone, Color, Fusion
   - Filter by tags

3. **Audio Engine**
   - Play individual chords (Web Audio API)
   - Drone generation (Sa-Pa or Sa-Ma)
   - Drone enable/disable
   - Volume controls in settings
   - Play notes from keyboard

4. **Interactive Elements**
   - Clickable raga note badges
   - Chord highlighting when note clicked
   - Virtual keyboard with highlighting
   - Chord progression suggestions
   - Color chord suggestions

5. **MIDI Export**
   - Download any chord as MIDI file
   - Proper note timing and velocity

6. **Metronome - FULL FUNCTIONAL**
   - Tempo control (60-200 BPM)
   - Start/Stop buttons
   - Visual beat indicator
   - Accent on first beat
   - Audio click sounds

7. **UI/UX**
   - Dark/Light theme toggle
   - Settings modal (volume, preferences)
   - FAQ modal
   - Chat modal (placeholder)
   - Responsive design
   - Smooth animations

8. **Raga Information Display**
   - Parent thaat/melakarta
   - Aroha (ascending scale)
   - Avaroha (descending scale)
   - Vadi (principal note)
   - Samvadi (secondary note)
   - Typical drone notes
   - Raga description/notes

### ❌ Features to REMOVE
1. ❌ YouTube chord detection (entire feature)
2. ❌ Find scale functionality
3. ❌ Phrases/Pakad display (for now - can add later)
4. ❌ Actual AI chat (just placeholder modal)

---

## Data to Preserve

### Ragas (from ragas.js)
**Hindustani:**
- Yaman, Bhupali, Bageshree, Kafi, Bhairav, Khamaj, Todi, Durga

**Carnatic:**
- Mohanam, Kalyani, Hindolam, Charukesi

### Chord Templates
- Major, Minor, sus2, sus4, add9, m(add9), 6, m6, 5
- Fusion: 7, m7, maj7

### Music Theory
- NOTE_NAMES array (C, C#, D, etc.)
- PC_TO_SARGAM mapping
- Chord scoring algorithm
- Chord tagging logic

---

## Technical Stack

### Framework
- **Next.js 14** (App Router)
- **TypeScript**
- **React 18**

### Styling
- **Tailwind CSS** (utility-first)
- Match wireframe colors:
  - Purple: `#7C5CFF` or similar
  - Brown panels: `#A67C52` or similar
  - Blue sidebar: gradient from light to dark blue
  - Light/Dark theme support

### Audio
- **Web Audio API** (native)
- Custom hook: `useAudio`
- Custom hook: `useDrone`

### State Management
- **React Context** for global state
- **useState/useReducer** for local state
- Custom hooks for business logic

### Components
- Modular, reusable components
- Proper TypeScript types
- Clear separation of concerns

---

## Folder Structure

```
raga-chord-explorer-nextjs/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Chord Explorer - main page)
│   ├── about/page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── ThemeToggle.tsx
│   ├── controls/
│   │   ├── ControlsBar.tsx
│   │   ├── TraditionSelect.tsx
│   │   ├── RagaSelect.tsx
│   │   ├── TonicSelect.tsx
│   │   ├── SoundSelect.tsx
│   │   ├── DroneToggle.tsx
│   │   └── MetronomeControl.tsx
│   ├── panels/
│   │   ├── RagaNotesPanel.tsx
│   │   ├── ChordProgressionPanel.tsx
│   │   ├── ColorChordsPanel.tsx
│   │   ├── VirtualKeyboardPanel.tsx
│   │   └── ChordCardsPanel.tsx
│   ├── chords/
│   │   ├── ChordCard.tsx
│   │   ├── ChordFilters.tsx
│   │   └── ChordGrid.tsx
│   ├── keyboard/
│   │   ├── VirtualKeyboard.tsx
│   │   └── PianoKey.tsx
│   ├── modals/
│   │   ├── SettingsModal.tsx
│   │   ├── FAQModal.tsx
│   │   └── ChatModal.tsx
│   └── metronome/
│       └── Metronome.tsx
├── lib/
│   ├── data/
│   │   ├── ragas.ts
│   │   └── chordTemplates.ts
│   ├── audio/
│   │   ├── audioEngine.ts
│   │   └── midiGenerator.ts
│   ├── music/
│   │   ├── chordGenerator.ts
│   │   ├── chordScorer.ts
│   │   └── musicTheory.ts
│   └── utils/
│       └── helpers.ts
├── hooks/
│   ├── useAudio.ts
│   ├── useDrone.ts
│   ├── useChordGenerator.ts
│   ├── useMetronome.ts
│   └── useTheme.ts
├── types/
│   ├── raga.ts
│   ├── chord.ts
│   └── audio.ts
└── contexts/
    ├── ThemeContext.tsx
    └── AudioContext.tsx
```

---

## Color Palette (From Wireframe)

### Dark Theme (Default)
- **Background:** `#0f1419` or dark blue-gray
- **Surface:** `#1a1f2e` or dark purple-blue
- **Primary Purple:** `#7C5CFF` (navbar, raga notes panel)
- **Brown Panels:** `#A67C52` (chord sections)
- **Sidebar:** Blue gradient (`#4A90E2` to `#2E5C8A`)
- **Text:** White/light gray
- **Borders:** Subtle light borders

### Light Theme
- **Background:** Light gray/white
- **Surface:** White
- **Primary Purple:** Same or adjusted for contrast
- **Brown Panels:** Lighter brown
- **Sidebar:** Light blue gradient
- **Text:** Dark gray/black

---

## User Flow

1. Page loads → Chord Explorer view (default)
2. User selects Tradition → Ragas filter
3. User selects Raga → All panels populate:
   - Raga notes appear
   - Chord progressions generate
   - Color chords generate
   - Keyboard highlights scale notes
   - Chord cards grid populates
4. User clicks note badge → Related chords highlight
5. User clicks chord → Plays audio + keyboard shows keys
6. User filters chords → Grid updates
7. User downloads MIDI → File downloads
8. Drone plays in background if enabled
9. Metronome can be started/stopped
10. Theme/settings can be adjusted anytime

---

## Tomorrow's Build Plan

### Phase 1: Setup (15k tokens)
- Initialize Next.js + TypeScript + Tailwind
- Create folder structure
- Set up layout components

### Phase 2: Data & Logic (20k tokens)
- Port ragas data to TypeScript
- Create chord generation logic
- Create music theory utilities

### Phase 3: Audio System (25k tokens)
- Audio engine with Web Audio API
- Drone generator
- MIDI file generator
- Metronome with audio

### Phase 4: Core UI (50k tokens)
- Navbar + Sidebar
- Controls bar
- All 5 panels (notes, progressions, colors, keyboard, chord cards)
- Modal system

### Phase 5: Interactions (40k tokens)
- Click handlers
- Audio playback
- Highlighting logic
- Filter system
- Theme toggle

### Phase 6: Polish & Test (35k tokens)
- Responsive design
- Animations
- Bug fixes
- Final testing

**Total: ~185k tokens**

---

## Ready to Build Tomorrow at 7pm! 🎵

All requirements documented and confirmed.
No ambiguity, no guesswork.
Build exactly what's in the wireframe + clarifications.
