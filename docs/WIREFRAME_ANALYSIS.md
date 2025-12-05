# Wireframe Analysis - Raga Chord Explorer

## Layout Structure

### Top Navigation Bar (Purple)
- **Left:** Logo
- **Right:**
  - Dark/Light toggle button
  - FAQ button
  - Chat assist button
  - Settings button

### Left Sidebar (Blue gradient)
**Main navigation buttons (stacked vertically):**
1. **Chord explorer** (primary feature)
2. **Find scale**
3. **About**

**Middle section:**
- "Main Menu" label

**Bottom:**
- Profile - logged in (status indicator)

### Main Content Area (Right side - Purple/Brown panels)

#### Control Panel (Top - Purple bar)
Horizontal row of controls:
1. **Tradition** - Hindustani, Carnatic (dropdown)
2. **Select Raga** - Dropdown
3. **Scale** - dropdown (C, D..)
4. **Piano/Pad** - sound dropdown select
5. **Drone** - enable (checkbox/toggle)
6. **Metronome** - tempo selector

#### Content Panels (Stacked vertically)

**Panel 1: Raga Notes Display (Purple)**
- Shows: "Display all the notes of the selected Raga, where I can still clic each note and get an idea as which chord I can plan, it can highlight in the below panels"
- **Purpose:** Interactive note badges (Sa, Re, Ga, etc.)
- **Interaction:** Click note → highlights related chords below

**Panel 2: Chord Progression (Brown)**
- Title: "Chord Progression"
- **Purpose:** "Based on the scale and notes, show the chord progressions here"
- Shows suggested chord progressions based on selected raga

**Panel 3: Colors - Additional Suggested Chords (Brown)**
- Title: "Colors additional suggested chords"
- **Purpose:** "Show additional chords which could add more grace and colors to the scale selected"
- Extended/color chords (sus2, sus4, add9, etc.)

**Panel 4: Virtual Keyboard (Brown)**
- Title: "Keyboard which shows the keys pressed when the chord is played"
- **Purpose:** "A virtual keyboard highlights the notes used for the scale, and when an individual note is selected it suggests a related chords. or when the individual chords are selected from about it lits the related keys from the keyboard"
- Interactive piano keyboard showing:
  - Scale notes highlighted
  - When chord plays → show keys
  - When note clicked → show related chords

---

## Key Missing from Wireframe (Need Clarification)

### Chord Cards Grid
The wireframe shows **panels for chord progressions** but doesn't clearly show the **individual chord cards grid** with:
- Filter buttons (All, Strong, Drone, Color)
- Grid of chord cards
- Each card showing: chord name, notes, sargam, tags, play button, MIDI download

**Question:** Should the chord cards grid be:
1. Below all the panels shown in wireframe?
2. Replace/overlay one of the brown panels?
3. In a separate section/tab?

---

## User Flow (Based on Wireframe)

1. User selects **Tradition** (Hindustani/Carnatic)
2. User selects **Raga** from dropdown
3. User selects **Scale/Tonic** (C, D, E, etc.)
4. **Raga Notes panel** displays clickable note badges (Sa, Re, Ga...)
5. **Chord Progression panel** shows suggested progressions (C, Dm, Em, etc.)
6. **Color Chords panel** shows additional extended chords
7. **Virtual Keyboard** highlights scale notes
8. User clicks a **note badge** → related chords highlight in panels below
9. User clicks **chord** → keyboard shows which keys are pressed
10. **Drone** plays in background if enabled
11. **Metronome** can be started with tempo control

---

## Component Breakdown for Next.js

### Layout Components
```
├── Navbar (top purple bar)
│   ├── Logo
│   ├── ThemeToggle
│   ├── FAQButton
│   ├── ChatButton
│   └── SettingsButton
├── Sidebar (left blue)
│   ├── ChordExplorerButton (active)
│   ├── FindScaleButton
│   ├── AboutButton
│   ├── MainMenuLabel
│   └── ProfileStatus
└── MainContent (right area)
```

### Control Panel Components
```
ControlsBar
├── TraditionSelect
├── RagaSelect
├── ScaleSelect
├── SoundSelect (Piano/Pad)
├── DroneToggle
└── MetronomeSelector
```

### Content Panel Components
```
ContentPanels
├── RagaNotesPanel (purple)
│   └── NoteBadge[] (clickable)
├── ChordProgressionPanel (brown)
│   └── ChordButton[] (playable)
├── ColorChordsPanel (brown)
│   └── ChordButton[] (playable)
└── VirtualKeyboardPanel (brown)
    └── PianoKey[] (highlightable)
```

### Missing from Wireframe (Need to Add)
```
ChordCardsSection???
├── FilterButtons (All, Strong, Drone, Color)
└── ChordGrid
    └── ChordCard[]
        ├── ChordName
        ├── Notes
        ├── Sargam
        ├── Tags
        ├── PlayButton
        └── DownloadMIDI
```

---

## Color Scheme (From Wireframe)

- **Primary Purple:** `#7C5CFF` (navbar, raga notes panel)
- **Blue Gradient:** Sidebar (light blue to darker blue)
- **Brown Panels:** `#A67C52` (chord progression, colors, keyboard)
- **Background:** Light blue/cyan gradient

---

## Questions for Tomorrow's Session

1. **Where should the chord cards grid appear?**
   - Below the keyboard panel?
   - Separate tab/view?
   - Overlays one of the panels?

2. **Should "Find scale" feature be kept?**
   - We're removing YouTube detection
   - Keep the "Find scale" sidebar button or remove it?

3. **Phrases/Pakad display:**
   - Not shown in wireframe
   - Should we keep it? Where?

4. **Metronome:**
   - Wireframe shows "tempo selector" in controls
   - Should full metronome UI be in a modal or separate panel?

5. **Chat assist:**
   - Just a button or actual chat interface?
   - Placeholder or real implementation?

---

## Tomorrow's Checklist

- [x] Analyze wireframe thoroughly ✓
- [ ] Clarify missing elements with user
- [ ] Build exact layout from wireframe
- [ ] Match color scheme precisely
- [ ] Implement all interactions shown
- [ ] Add chord cards section (with user guidance on placement)
- [ ] Test all user flows from wireframe

**Ready to build this EXACTLY as designed!** 🎯
