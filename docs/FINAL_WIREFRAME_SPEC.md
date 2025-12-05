# FINAL WIREFRAME & SPECIFICATIONS
## Single Source of Truth for Next.js Build

**Date:** October 14, 2024
**Status:** APPROVED - Ready for Development
**Estimated Tokens:** 185k

---

## TABLE OF CONTENTS
1. [Page Layout Overview](#page-layout-overview)
2. [Component Specifications](#component-specifications)
3. [Data Flow & Interactions](#data-flow--interactions)
4. [Technical Specifications](#technical-specifications)
5. [Features Checklist](#features-checklist)

---

## PAGE LAYOUT OVERVIEW

### Desktop View (1200px+)

```
┌────────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                    HEIGHT: 64px │
│  ──────────────────────────────────────────────────────────────── │
│  [Logo: Raga Chord Explorer]     [🌓Theme] [❓FAQ] [💬Chat] [⚙️Settings] │
└────────────────────────────────────────────────────────────────────┘

┌──────────────┬─────────────────────────────────────────────────────┐
│  SIDEBAR     │  MAIN CONTENT                                       │
│  WIDTH:      │                                                     │
│  220px       │  ┌───────────────────────────────────────────────┐ │
│              │  │  CONTROLS BAR              HEIGHT: 80px        │ │
│  ┌────────┐  │  │  ───────────────────────────────────────────  │ │
│  │ Chord  │  │  │  [Tradition▼][Raga▼][Scale▼][Sound▼][Drone☑][🎵]│ │
│  │Explorer│← │  └───────────────────────────────────────────────┘ │
│  └────────┘  │                                                     │
│              │  ┌───────────────────────────────────────────────┐ │
│  ┌────────┐  │  │  SCALE EXPLORER & KEYBOARD   HEIGHT: 400px    │ │
│  │ About  │  │  │  ═════════════════════════════════════════════│ │
│  └────────┘  │  │  🎹 Yaman in C                                │ │
│              │  │  ─────────────────────────────────────────────│ │
│  ─────────   │  │  Note Badges (clickable):                     │ │
│  Main Menu   │  │  [Sa C1][Re D1][Ga E1][Ma^ F#1][Pa G1][Dha A1][Ni B1]│
│              │  │                                                 │ │
│  ┌────────┐  │  │  Keyboard (C1-C3, 25 keys):                   │ │
│  │Profile │  │  │  ┌─────────────────────────────────────────┐  │ │
│  │Logged  │  │  │  │ Octave 1 (C1-B1): [Keys layout]        │  │ │
│  │  In    │  │  │  │ Octave 2 (C2-B2): [Keys layout]        │  │ │
│  └────────┘  │  │  │ C3: [Final key]                        │  │ │
│              │  │  │ Legend: 🟦Scale 🟨Vadi 🟧Samvadi       │  │ │
└──────────────┤  │  └─────────────────────────────────────────┘  │ │
               │  └───────────────────────────────────────────────┘ │
               │                                                     │
               │  ┌───────────────────────────────────────────────┐ │
               │  │  ℹ️ RAGA INFO (Collapsible)  HEIGHT: 0-120px   │ │
               │  │  [▼Show Details] Yaman - Kalyan                │ │
               │  └───────────────────────────────────────────────┘ │
               │                                                     │
               │  ┌─────────────────────┬─────────────────────────┐ │
               │  │ CHORD PROGRESSIONS  │  COLOR CHORDS           │ │
               │  │ HEIGHT: 250px       │  HEIGHT: 250px          │ │
               │  │ ─────────────────── │  ───────────────────── │ │
               │  │ 🎼 Foundation       │  ✨ Add Flavor          │ │
               │  │ [C][Dm][Em]→        │  [Csus2][Cadd9]        │ │
               │  │ [G][Am][Bm]         │  [Cmaj7][Dsus4]        │ │
               │  │                     │  [Em7][Gmaj7]          │ │
               │  └─────────────────────┴─────────────────────────┘ │
               │                                                     │
               │  ┌───────────────────────────────────────────────┐ │
               │  │  COMPLETE CHORD LIBRARY (Scrollable)          │ │
               │  │  ═════════════════════════════════════════════│ │
               │  │  📚 All Generated Chords                       │ │
               │  │  Filters: [All][✅Strong][🎶Drone][✨Color]    │ │
               │  │  ─────────────────────────────────────────────│ │
               │  │  ┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐        │ │
               │  │  │Card││Card││Card││Card││Card││Card│        │ │
               │  │  └────┘└────┘└────┘└────┘└────┘└────┘        │ │
               │  │  Grid: 6 columns, gap: 16px                   │ │
               │  └───────────────────────────────────────────────┘ │
               │                                                     │
               └─────────────────────────────────────────────────────┘
```

### Mobile View (< 768px)

```
┌──────────────────────────┐
│  NAVBAR (Compact)        │
│  [☰][Logo][Theme][⚙️]    │
└──────────────────────────┘
│                          │
│  CONTROLS (Stacked)      │
│  [Tradition▼]            │
│  [Raga▼]                 │
│  [Scale▼]                │
└──────────────────────────┘
│                          │
│  SCALE EXPLORER          │
│  (Full width)            │
│  Note badges (wrap)      │
│  Keyboard (scrollable)   │
└──────────────────────────┘
│                          │
│  RAGA INFO               │
│  (Collapsed by default)  │
└──────────────────────────┘
│                          │
│  PROGRESSIONS            │
│  (Full width)            │
└──────────────────────────┘
│                          │
│  COLOR CHORDS            │
│  (Full width)            │
└──────────────────────────┘
│                          │
│  CHORD LIBRARY           │
│  (2 columns)             │
│                          │
└──────────────────────────┘
```

---

## COMPONENT SPECIFICATIONS

### 1. NAVBAR
**Component:** `Navbar.tsx`

#### Layout
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]                    [Theme] [FAQ] [Chat] [Settings]  │
└─────────────────────────────────────────────────────────────┘
```

#### Specifications
- **Height:** 64px
- **Background:** `linear-gradient(135deg, #7C5CFF 0%, #5B3FD4 100%)`
- **Position:** Sticky top
- **Shadow:** `0 2px 8px rgba(0,0,0,0.15)`
- **Z-index:** 1000

#### Elements

**Logo (Left)**
- Text: "Raga Chord Explorer"
- Font: Inter, 20px, bold (700)
- Color: White
- Padding: 0 24px

**Nav Buttons (Right)**
- 4 buttons: Theme, FAQ, Chat, Settings
- Layout: Flex, gap 12px, padding-right 24px
- Style per button:
  - Size: 40px × 40px
  - Border-radius: 10px
  - Background: `rgba(255,255,255,0.1)`
  - Border: `1px solid rgba(255,255,255,0.2)`
  - Icon size: 20px
  - Hover: `background: rgba(255,255,255,0.2)`, scale 1.05
  - Transition: 200ms ease

#### Interactions
- Theme button → Toggles dark/light theme
- FAQ button → Opens FAQ modal
- Chat button → Opens chat modal
- Settings button → Opens settings modal

---

### 2. SIDEBAR
**Component:** `Sidebar.tsx`

#### Layout
```
┌──────────────┐
│  ┌────────┐  │
│  │ Chord  │  │ ← Active
│  │Explorer│  │
│  └────────┘  │
│              │
│  ┌────────┐  │
│  │ About  │  │
│  └────────┘  │
│              │
│  ─────────   │
│  Main Menu   │
│              │
│  ┌────────┐  │
│  │Profile │  │
│  │Logged  │  │
│  │  In    │  │
│  └────────┘  │
└──────────────┘
```

#### Specifications
- **Width:** 220px
- **Background:** `linear-gradient(180deg, #4A90E2 0%, #2E5C8A 100%)`
- **Padding:** 24px 16px
- **Height:** calc(100vh - 64px) - Full height minus navbar
- **Position:** Fixed left

#### Elements

**Navigation Buttons (Top)**
- Count: 2 (Chord Explorer, About)
- Layout: Vertical stack, gap 16px
- Style per button:
  - Padding: 16px 20px
  - Border-radius: 12px
  - Background: `rgba(255,255,255,0.1)`
  - Border: `1px solid rgba(255,255,255,0.15)`
  - Font: 14px, semi-bold (600)
  - Color: White
  - Text-align: Center
  - Active state:
    - Background: `linear-gradient(135deg, #7C5CFF, #5B3FD4)`
    - Border-color: `rgba(255,255,255,0.3)`
    - Shadow: `0 4px 12px rgba(124,92,255,0.4)`

**Main Menu Label (Middle)**
- Text: "Main Menu"
- Font: 18px, extra-bold (800)
- Color: `rgba(0,0,0,0.6)`
- Text-align: Center
- Padding: 32px 0

**Profile Status (Bottom)**
- Text: "Profile - logged in"
- Style: Same as nav buttons
- Background: `rgba(255,255,255,0.15)`
- Border-color: Cyan accent

---

### 3. CONTROLS BAR
**Component:** `ControlsBar.tsx`

#### Layout
```
┌───────────────────────────────────────────────────────────┐
│ [Tradition▼] [Raga▼] [Scale▼] [Sound▼] [Drone☑] [🎵 120]│
└───────────────────────────────────────────────────────────┘
```

#### Specifications
- **Height:** 80px
- **Background:** `linear-gradient(135deg, #7C5CFF 0%, #6366F1 100%)`
- **Border-radius:** 16px
- **Padding:** 16px 24px
- **Margin-bottom:** 24px
- **Shadow:** `0 4px 12px rgba(124,92,255,0.3)`

#### Elements Layout
- Display: Flex
- Justify-content: Space-between
- Align-items: Center
- Gap: 16px
- Flex-wrap: Wrap (mobile)

#### Control Items (6 total)

**Structure per item:**
```
┌─────────────┐
│ Label       │ ← 10px, bold, rgba(255,255,255,0.8)
│ Subtitle    │ ← 9px, regular, rgba(255,255,255,0.6)
│ [Control]   │ ← Select/Checkbox/Input
└─────────────┘
```

**1. Tradition Select**
- Label: "Tradition"
- Subtitle: "Hindustani/Carnatic"
- Control: Dropdown
- Options: ["Hindustani", "Carnatic"]
- Default: "Hindustani"

**2. Raga Select**
- Label: "Select Raga"
- Subtitle: "Dropdown"
- Control: Dropdown
- Options: Populated from RAGAS data
- Placeholder: "Choose a raga..."
- Filters by: Current tradition

**3. Scale Select**
- Label: "Scale"
- Subtitle: "dropdown (C,D..)"
- Control: Dropdown
- Options: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
- Default: "C"

**4. Sound Select**
- Label: "Piano/Pad"
- Subtitle: "sound dropdown select"
- Control: Dropdown
- Options: ["Piano", "Pad"]
- Default: "Piano"

**5. Drone Toggle**
- Label: "Drone"
- Subtitle: "enable"
- Control: Checkbox
- Default: Checked

**6. Metronome Control**
- Label: "Metronome"
- Subtitle: "tempo selector"
- Control: Number input
- Range: 60-200
- Default: 120
- Step: 1

**Control Styling (Select/Input):**
- Padding: 10px 14px
- Border-radius: 10px
- Background: `rgba(255,255,255,0.15)`
- Border: `1px solid rgba(255,255,255,0.2)`
- Color: White
- Font: 14px, semi-bold
- Width: 140px (selects), 80px (number input)
- Focus: Border-color `rgba(255,255,255,0.4)`, shadow `0 0 0 3px rgba(255,255,255,0.1)`

---

### 4. SCALE EXPLORER & KEYBOARD
**Component:** `ScaleExplorer.tsx`

#### Layout
```
╔════════════════════════════════════════════════════════╗
║  🎹 Yaman in C                                         ║
║  ──────────────────────────────────────────────────────║
║  Note Badges:                                          ║
║  [Sa C1] [Re D1] [Ga E1] [Ma^ F#1] [Pa G1] [Dha A1] [Ni B1]║
║                                                        ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │  VIRTUAL KEYBOARD (C1 - C3)                      │ ║
║  │  ──────────────────────────────────────────────  │ ║
║  │  Octave 1: [C1][D1][E1][F1][G1][A1][B1]         │ ║
║  │             [C#][D#]  [F#][G#][A#]               │ ║
║  │                                                   │ ║
║  │  Octave 2: [C2][D2][E2][F2][G2][A2][B2]         │ ║
║  │             [C#][D#]  [F#][G#][A#]               │ ║
║  │                                                   │ ║
║  │  [C3]                                            │ ║
║  │                                                   │ ║
║  │  🟦 Scale  🟨 Vadi  🟧 Samvadi  🟢 Playing       │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  💡 Click any note to see related chords ↓            ║
╚════════════════════════════════════════════════════════╝
```

#### Specifications
- **Height:** 400px (desktop), auto (mobile)
- **Background:** `linear-gradient(135deg, #7C5CFF 0%, #6D4FDB 100%)`
- **Border-radius:** 16px
- **Padding:** 32px
- **Margin-bottom:** 24px
- **Shadow:** `0 8px 24px rgba(124,92,255,0.4)`
- **Border:** `1px solid rgba(255,255,255,0.1)`

#### Elements

**Title**
- Text: "🎹 {ragaName} in {scale}"
- Font: 24px, bold (700)
- Color: White
- Margin-bottom: 16px

**Note Badges Section**
- Label: "Scale Notes (clickable):"
- Font: 12px, semi-bold
- Color: `rgba(255,255,255,0.8)`
- Margin-bottom: 16px

**Note Badges**
- Layout: Flex, gap 12px, wrap
- Badge specs:
  - Min-width: 70px
  - Padding: 14px 20px
  - Border-radius: 12px
  - Background: `rgba(255,255,255,0.15)`
  - Border: `2px solid rgba(255,255,255,0.2)`
  - Text: Two lines
    - Line 1: Sargam (Sa, Re, etc.) - 18px, bold
    - Line 2: Western (C1, D1, etc.) - 14px, regular
  - Color: White
  - Text-align: Center
  - Cursor: Pointer
  - Transition: 200ms ease
  - Hover:
    - Background: `rgba(255,255,255,0.25)`
    - Scale: 1.05
    - Shadow: `0 4px 12px rgba(255,255,255,0.3)`
  - Active state:
    - Background: `#06B6D4` (cyan)
    - Border-color: `#22D3EE`
    - Shadow: `0 0 20px rgba(6,182,212,0.6)`
    - Animation: Pulse 600ms

**Virtual Keyboard Container**
- Background: `rgba(0,0,0,0.2)`
- Border-radius: 12px
- Padding: 24px
- Margin: 24px 0
- Height: 220px

**Piano Keys (25 keys total)**

**White Keys (15 keys):**
- Width: 50px
- Height: 180px
- Background: `linear-gradient(180deg, #ffffff, #f0f0f0)`
- Border: `2px solid #000`
- Border-radius: `0 0 6px 6px`
- Position: Relative
- Display: Flex
- Align-items: Flex-end
- Justify-content: Center
- Padding-bottom: 12px
- Box-shadow: `0 4px 8px rgba(0,0,0,0.3)`
- Transition: 150ms ease
- Hover:
  - Background: `linear-gradient(180deg, #f8f8f8, #e8e8e8)`
  - Transform: translateY(2px)
- Active:
  - Transform: translateY(4px)
  - Box-shadow: `0 2px 4px rgba(0,0,0,0.3)`

**Black Keys (10 keys):**
- Width: 32px
- Height: 110px
- Background: `linear-gradient(180deg, #2a2a2a, #000000)`
- Border: `1px solid #000`
- Border-radius: `0 0 4px 4px`
- Position: Absolute
- Z-index: 2
- Box-shadow: `0 4px 8px rgba(0,0,0,0.5)`
- Transition: 150ms ease
- Positioning:
  - C#/D#: left offset from C/D
  - F#/G#/A#: left offset from F/G/A
- Hover:
  - Background: `linear-gradient(180deg, #3a3a3a, #1a1a1a)`
  - Transform: translateY(2px)

**Key Labels**
- Font: 11px, bold
- Color: #666 (white keys), #ccc (black keys)
- Positioned: Bottom of key
- Pointer-events: None

**Highlight States:**
- **Scale note (🟦):**
  - Box-shadow: `0 0 12px #06B6D4, inset 0 0 12px rgba(6,182,212,0.3)`
  - Border-color: `#06B6D4`
- **Vadi (🟨):**
  - Box-shadow: `0 0 16px #F59E0B, inset 0 0 16px rgba(245,158,11,0.4)`
  - Border-color: `#F59E0B`
  - Z-index: 3
- **Samvadi (🟧):**
  - Box-shadow: `0 0 16px #F97316, inset 0 0 16px rgba(249,115,22,0.4)`
  - Border-color: `#F97316`
  - Z-index: 3
- **Playing (🟢):**
  - Background: `#10B981` (white) or `#059669` (black)
  - Animation: Pulse 400ms
  - Box-shadow: `0 0 20px #10B981`
  - Z-index: 4

**Legend**
- Layout: Flex, gap 16px, justify center
- Font: 12px, regular
- Color: White
- Margin-top: 16px
- Each item: Icon (16px) + Text

**Helper Text**
- Text: "💡 Click any note to see related chords ↓"
- Font: 14px, regular
- Color: `rgba(255,255,255,0.9)`
- Text-align: Center
- Margin-top: 16px

---

### 5. RAGA INFORMATION PANEL
**Component:** `RagaInfo.tsx`

#### Layout (Collapsed)
```
┌────────────────────────────────────────────┐
│  ℹ️ Raga Yaman  [▼ Show Details]          │
└────────────────────────────────────────────┘
```

#### Layout (Expanded)
```
┌────────────────────────────────────────────┐
│  ℹ️ Raga Yaman  [▲ Hide Details]          │
├────────────────────────────────────────────┤
│  Parent: Kalyan                            │
│  Aroha: Sa Re Ga Ma^ Pa Dha Ni Sa         │
│  Avaroha: Sa Ni Dha Pa Ma^ Ga Re Sa       │
│  Vadi: Ni (7th)    Samvadi: Ga (3rd)     │
│  Drone: Sa-Pa      Time: Evening          │
│                                            │
│  📝 All shuddha notes except tivra Ma.     │
│     Evening raga.                          │
└────────────────────────────────────────────┘
```

#### Specifications
- **Height:** 60px (collapsed), 180px (expanded)
- **Background:** `linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)` (light theme)
- **Background:** `linear-gradient(135deg, #312E81 0%, #4338CA 100%)` (dark theme)
- **Border-radius:** 12px
- **Padding:** 16px 24px
- **Margin-bottom:** 24px
- **Border:** `1px solid rgba(0,0,0,0.1)`
- **Transition:** height 300ms ease, all 200ms ease

#### Elements

**Header (Always Visible)**
- Layout: Flex, justify space-between, align center
- Title:
  - Text: "ℹ️ Raga {name}"
  - Font: 18px, bold (700)
  - Color: Dark theme: White, Light theme: #1E293B
- Toggle Button:
  - Text: "[▼ Show Details]" or "[▲ Hide Details]"
  - Font: 14px, semi-bold
  - Color: Blue accent
  - Cursor: Pointer
  - Hover: Underline

**Content (Expanded Only)**
- Padding-top: 16px
- Grid: 2 columns (desktop), 1 column (mobile)
- Gap: 12px

**Info Items:**
- **Parent:** Text + value
- **Aroha:** Text + note sequence
- **Avaroha:** Text + note sequence
- **Vadi:** Text + note + degree
- **Samvadi:** Text + note + degree
- **Drone:** Text + mode (Sa-Pa/Sa-Ma)
- **Time:** Text + time of day

**Styling per item:**
- Font: 14px, regular
- Color: Dark theme: `rgba(255,255,255,0.9)`, Light theme: `#475569`
- Label: Semi-bold

**Description (Bottom)**
- Text: Raga notes/description
- Font: 14px, italic
- Color: Dark theme: `rgba(255,255,255,0.8)`, Light theme: `#64748B`
- Padding-top: 12px
- Border-top: `1px solid rgba(0,0,0,0.1)`

---

### 6. CHORD PROGRESSIONS PANEL
**Component:** `ChordProgressions.tsx`

#### Layout
```
┌─────────────────────────────────┐
│  🎼 CHORD PROGRESSIONS          │
│  ─────────────────────────────  │
│                                 │
│  Foundation chords:             │
│                                 │
│  ┌────┐  ┌────┐  ┌────┐        │
│  │ C  │→ │ Dm │→ │ Em │→       │
│  └────┘  └────┘  └────┘        │
│  ┌────┐  ┌────┐  ┌────┐        │
│  │ G  │→ │ Am │→ │ Bm │        │
│  └────┘  └────┘  └────┘        │
│                                 │
│  Click to play →                │
│  Lights up on keyboard above ↑  │
└─────────────────────────────────┘
```

#### Specifications
- **Width:** 48% (desktop, side-by-side)
- **Width:** 100% (mobile, stacked)
- **Height:** 250px
- **Background:** `linear-gradient(135deg, #B8956A 0%, #8B6F47 100%)`
- **Border-radius:** 16px
- **Padding:** 24px
- **Shadow:** `0 4px 12px rgba(139,111,71,0.3)`
- **Border:** `1px solid rgba(255,255,255,0.1)`

#### Elements

**Title**
- Text: "🎼 CHORD PROGRESSIONS"
- Font: 20px, bold (700)
- Color: White
- Margin-bottom: 8px

**Subtitle**
- Text: "Foundation chords:"
- Font: 12px, regular
- Color: `rgba(255,255,255,0.8)`
- Margin-bottom: 16px

**Chord Buttons Container**
- Layout: Flex, flex-wrap, gap 12px
- Align-items: Center

**Chord Button Specs:**
- Min-width: 80px
- Padding: 16px 24px
- Border-radius: 12px
- Background: `rgba(255,255,255,0.15)`
- Backdrop-filter: `blur(10px)`
- Border: `2px solid rgba(255,255,255,0.2)`
- Font: 20px, bold (700)
- Color: White
- Text-align: Center
- Cursor: Pointer
- Transition: 200ms ease
- Hover:
  - Background: `rgba(255,255,255,0.25)`
  - Transform: translateY(-3px)
  - Shadow: `0 8px 20px rgba(0,0,0,0.3)`
- Active/Playing:
  - Background: `#10B981` (green)
  - Border-color: `#059669`
  - Animation: Pulse 600ms
  - Shadow: `0 0 20px #10B981`

**Arrow Indicators**
- Between some chord buttons
- Symbol: "→"
- Font: 24px
- Color: `rgba(255,255,255,0.6)`
- Purpose: Show progression flow

**Helper Text**
- Text: "Click to play → Lights up on keyboard above ↑"
- Font: 11px, regular
- Color: `rgba(255,255,255,0.7)`
- Margin-top: 16px
- Text-align: Center

---

### 7. COLOR CHORDS PANEL
**Component:** `ColorChords.tsx`

#### Layout
```
┌─────────────────────────────────┐
│  ✨ COLOR CHORDS                │
│  ─────────────────────────────  │
│                                 │
│  Add flavor:                    │
│                                 │
│  ┌──────┐  ┌──────┐            │
│  │Csus2 │  │Cadd9 │            │
│  └──────┘  └──────┘            │
│  ┌──────┐  ┌──────┐            │
│  │Cmaj7 │  │Dsus4 │            │
│  └──────┘  └──────┘            │
│  ┌──────┐  ┌──────┐            │
│  │ Em7  │  │Gmaj7 │            │
│  └──────┘  └──────┘            │
│                                 │
│  Extended & sophisticated ✨    │
└─────────────────────────────────┘
```

#### Specifications
- **Width:** 48% (desktop, side-by-side with progressions)
- **Width:** 100% (mobile, stacked)
- **Height:** 250px
- **Background:** `linear-gradient(135deg, #D4B88A 0%, #B8956A 100%)`
- **Border-radius:** 16px
- **Padding:** 24px
- **Shadow:** `0 4px 12px rgba(184,149,106,0.3)`
- **Border:** `1px solid rgba(255,255,255,0.1)`

#### Elements

**Title**
- Text: "✨ COLOR CHORDS"
- Font: 20px, bold (700)
- Color: White
- Margin-bottom: 8px

**Subtitle**
- Text: "Add flavor:"
- Font: 12px, regular
- Color: `rgba(255,255,255,0.8)`
- Margin-bottom: 16px

**Chord Buttons Container**
- Layout: Flex, flex-wrap, gap 12px

**Chord Button Specs:**
- Same as Chord Progressions panel
- Only difference: Slightly different hover color
- Hover background: `rgba(255,255,255,0.3)`

**Helper Text**
- Text: "Extended & sophisticated ✨"
- Font: 11px, regular
- Color: `rgba(255,255,255,0.7)`
- Margin-top: 16px
- Text-align: Center

---

### 8. COMPLETE CHORD LIBRARY
**Component:** `ChordLibrary.tsx`

#### Layout
```
╔═════════════════════════════════════════════════════════╗
║  📚 COMPLETE CHORD LIBRARY                              ║
║  ───────────────────────────────────────────────────────║
║                                                         ║
║  Filters: [ All ] [ ✅ Strong ] [ 🎶 Drone ] [ ✨ Color ]║
║  ───────────────────────────────────────────────────────║
║                                                         ║
║  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     ║
║  │ Cmaj7   │ │  Dm7    │ │ Em(add9)│ │  Fmaj   │     ║
║  │─────────│ │─────────│ │─────────│ │─────────│     ║
║  │ C E G B │ │ D F A C │ │ E G B D │ │ F A C   │     ║
║  │Sa Ga Pa │ │Re Ma Pa │ │Ga Pa Ni │ │Ma Dha Sa│     ║
║  │─────────│ │─────────│ │─────────│ │─────────│     ║
║  │ ✅ 🎶   │ │  ✅     │ │  ✨     │ │ ✅ 🎶   │     ║
║  │─────────│ │─────────│ │─────────│ │─────────│     ║
║  │ ▶️  💾   │ │ ▶️  💾   │ │ ▶️  💾   │ │ ▶️  💾   │     ║
║  └─────────┘ └─────────┘ └─────────┘ └─────────┘     ║
║                                                         ║
║  (More cards... scrollable)                            ║
╚═════════════════════════════════════════════════════════╝
```

#### Specifications
- **Width:** 100%
- **Min-height:** 600px
- **Background:** `var(--surface)` (theme-dependent)
- **Border-radius:** 16px
- **Padding:** 32px
- **Margin-bottom:** 40px
- **Shadow:** `0 4px 12px rgba(0,0,0,0.1)`
- **Border:** `1px solid var(--border)`

#### Elements

**Title**
- Text: "📚 COMPLETE CHORD LIBRARY"
- Font: 24px, bold (700)
- Color: `var(--text)`
- Margin-bottom: 16px

**Filters Section**
- Layout: Flex, gap 12px, wrap
- Margin-bottom: 24px

**Filter Button Specs:**
- Padding: 10px 20px
- Border-radius: 20px
- Border: `1px solid var(--border)`
- Background: `var(--surface-2)`
- Font: 14px, semi-bold (600)
- Color: `var(--text)`
- Cursor: Pointer
- Transition: 200ms ease
- Hover:
  - Background: `var(--surface-3)`
  - Transform: translateY(-1px)
- Active state:
  - Background: Depends on filter
    - All: `var(--primary)`
    - Strong: `#10B981` (green)
    - Drone: `#06B6D4` (cyan)
    - Color: `#F59E0B` (amber)
  - Color: White
  - Border-color: Same as background
  - Shadow: `0 4px 12px rgba([color], 0.3)`

**Chord Grid**
- Display: Grid
- Grid-template-columns:
  - Desktop (1200px+): `repeat(6, 1fr)`
  - Tablet (768-1199px): `repeat(3, 1fr)`
  - Mobile (<768px): `repeat(2, 1fr)`
- Gap: 16px

**Chord Card Specs:**

```
┌─────────────┐
│ Chord Name  │ ← Header
├─────────────┤
│ Western     │ ← Notes section
│ Sargam      │
├─────────────┤
│ Tags        │ ← Tags section
├─────────────┤
│ Actions     │ ← Play + Download
└─────────────┘
```

**Card Container:**
- Background: `var(--surface-2)`
- Border: `1px solid var(--border)`
- Border-radius: 14px
- Padding: 20px
- Transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Cursor: Pointer
- Hover:
  - Transform: translateY(-4px)
  - Shadow: `0 12px 24px rgba(0,0,0,0.15)`
  - Border-color: `var(--primary)`
- Playing state:
  - Border-color: `#10B981`
  - Shadow: `0 0 20px rgba(16,185,129,0.4)`
  - Animation: Pulse 600ms

**Card Header:**
- Font: 20px, extra-bold (800)
- Color: `var(--text)`
- Margin-bottom: 12px
- Letter-spacing: -0.01em

**Notes Section:**
- Western notes:
  - Font: 14px, semi-bold (600)
  - Color: `var(--text-dim)`
  - Margin-bottom: 4px
- Sargam notes:
  - Font: 14px, medium (500)
  - Color: `#06B6D4` (cyan)
  - Font-style: Italic
- Margin-bottom: 12px

**Tags Section:**
- Layout: Flex, gap 6px, wrap
- Margin-bottom: 12px

**Tag Specs:**
- Padding: 4px 10px
- Border-radius: 12px
- Font: 11px, bold (700)
- Letter-spacing: 0.02em
- Border: `1px solid`
- Styles per tag:
  - Strong (✅):
    - Color: `#10B981`
    - Background: `rgba(16,185,129,0.1)`
    - Border-color: `rgba(16,185,129,0.3)`
  - Drone (🎶):
    - Color: `#06B6D4`
    - Background: `rgba(6,182,212,0.1)`
    - Border-color: `rgba(6,182,212,0.3)`
  - Color (✨):
    - Color: `#F59E0B`
    - Background: `rgba(245,158,11,0.1)`
    - Border-color: `rgba(245,158,11,0.3)`
  - Fusion (🎸):
    - Color: `#EC4899`
    - Background: `rgba(236,72,153,0.1)`
    - Border-color: `rgba(236,72,153,0.3)`

**Actions Section:**
- Layout: Flex, justify space-between, align center
- Gap: 8px

**Play Button:**
- Size: 36px × 36px
- Border-radius: 8px
- Background: `linear-gradient(135deg, var(--primary), var(--primary-hover))`
- Border: None
- Cursor: Pointer
- Display: Flex, align center, justify center
- Icon: ▶️ (16px)
- Color: White
- Transition: 200ms ease
- Hover:
  - Transform: scale(1.1)
  - Shadow: `0 4px 12px rgba(var(--primary), 0.4)`

**Download MIDI Button:**
- Size: 36px × 36px
- Border-radius: 8px
- Background: `var(--surface-3)`
- Border: `1px solid var(--border)`
- Cursor: Pointer
- Display: Flex, align center, justify center
- Icon: 💾 or ↓ (16px)
- Color: `var(--text-dim)`
- Transition: 200ms ease
- Hover:
  - Background: `var(--primary)`
  - Color: White
  - Border-color: `var(--primary)`
  - Transform: translateY(-2px)
- Downloading state:
  - Background: `#10B981`
  - Animation: Pulse 600ms

---

### 9. MODALS

#### 9.1 FAQ Modal
**Component:** `FAQModal.tsx`

**Trigger:** FAQ button in navbar

**Layout:**
```
┌─────────────────────────────────────────┐
│  ❓ Frequently Asked Questions    [✕]  │
├─────────────────────────────────────────┤
│                                         │
│  Q: What is a raga?                     │
│  A: A raga is a melodic framework...    │
│                                         │
│  Q: Can I use these in traditional...  │
│  A: No. Traditional music is purely...  │
│                                         │
│  Q: What's the difference between...   │
│  A: Hindustani is North Indian...      │
│                                         │
│  ... (more Q&A pairs)                   │
│                                         │
└─────────────────────────────────────────┘
```

**Specifications:**
- Width: 600px max
- Max-height: 80vh
- Background: `var(--surface)`
- Border-radius: 20px
- Shadow: `0 20px 60px rgba(0,0,0,0.5)`
- Padding: 0 (header/body have own padding)
- Backdrop: `rgba(0,0,0,0.75)` with blur(8px)
- Animation: slideUp 300ms ease

**Header:**
- Padding: 24px 28px
- Border-bottom: `1px solid var(--border)`
- Display: Flex, justify space-between, align center
- Title: "❓ Frequently Asked Questions"
- Font: 24px, extra-bold (800)
- Close button: 40px × 40px, icon ✕

**Body:**
- Padding: 28px
- Overflow-y: Auto
- Max-height: calc(80vh - 80px)

**FAQ Items:**
- Margin-bottom: 24px
- Padding: 20px
- Border-radius: 14px
- Background: `var(--surface-2)`
- Border: `1px solid var(--border)`
- Hover: Border-color: `var(--primary)`

**Question:**
- Font: 18px, bold (700)
- Color: `var(--text)`
- Margin-bottom: 12px
- Prefix: "Q:" in `var(--primary)` color

**Answer:**
- Font: 15px, regular (400)
- Color: `var(--text-dim)`
- Line-height: 1.6

**Content (5 Q&A pairs):**
1. What is a raga?
2. Can I use these chords in traditional raga performance?
3. What's the difference between Hindustani and Carnatic?
4. How do I download MIDI files?
5. What is Vadi and Samvadi?

---

#### 9.2 Chat Modal
**Component:** `ChatModal.tsx`

**Trigger:** Chat button in navbar

**Layout:**
```
┌─────────────────────────────────────────┐
│  💬 AI Chat Assistant             [✕]  │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐ │
│  │  🤖 Hello! I can help with...    │ │
│  │     • Understanding ragas         │ │
│  │     • Chord progressions          │ │
│  │     • Theory questions            │ │
│  └───────────────────────────────────┘ │
│                                         │
│  (Chat messages area)                   │
│                                         │
├─────────────────────────────────────────┤
│  [Type your message...] [Send ➤]       │
├─────────────────────────────────────────┤
│  ℹ️ Placeholder UI - No AI connected    │
└─────────────────────────────────────────┘
```

**Specifications:**
- Width: 800px max
- Height: 600px
- Background: `var(--surface)`
- Border-radius: 20px
- Shadow: `0 20px 60px rgba(0,0,0,0.5)`
- Layout: Flex column
- Backdrop: `rgba(0,0,0,0.75)` with blur(8px)

**Header:**
- Same as FAQ modal
- Title: "💬 AI Chat Assistant"

**Messages Container:**
- Flex: 1
- Padding: 20px
- Overflow-y: Auto
- Background: `var(--surface-2)`

**Message Bubble (Assistant):**
- Display: Flex, gap 12px
- Margin-bottom: 16px
- Icon: 🤖 (24px)
- Content:
  - Background: `var(--surface-3)`
  - Padding: 16px 20px
  - Border-radius: 12px
  - Border: `1px solid var(--border)`
  - Font: 15px, regular
  - Color: `var(--text-dim)`
  - Line-height: 1.6

**Input Area:**
- Padding: 20px
- Border-top: `1px solid var(--border)`
- Display: Flex, gap 12px

**Input Field:**
- Flex: 1
- Padding: 14px 18px
- Border-radius: 12px
- Border: `1px solid var(--border)`
- Background: `var(--surface-2)`
- Font: 15px, semi-bold (600)
- Color: `var(--text)`
- Focus:
  - Border-color: `var(--primary)`
  - Shadow: `0 0 0 3px rgba(var(--primary), 0.1)`

**Send Button:**
- Padding: 14px 24px
- Border-radius: 12px
- Background: `linear-gradient(135deg, var(--primary), var(--primary-hover))`
- Border: None
- Color: White
- Font: 15px, bold (700)
- Cursor: Pointer
- Icon: ➤
- Hover:
  - Transform: translateY(-2px)
  - Shadow: `0 4px 12px rgba(var(--primary), 0.4)`

**Disclaimer:**
- Padding: 12px 20px
- Border-top: `1px solid var(--border)`
- Font: 13px, italic
- Color: `var(--text-dim)`
- Text-align: Center

---

#### 9.3 Settings Modal
**Component:** `SettingsModal.tsx`

**Trigger:** Settings button in navbar

**Layout:**
```
┌─────────────────────────────────────────┐
│  ⚙️ Settings                      [✕]  │
├─────────────────────────────────────────┤
│                                         │
│  🔊 Audio Settings                      │
│  ─────────────────────────────────────  │
│  Master Volume:  [████████░░] 70%       │
│  Drone Volume:   [█████░░░░░] 50%       │
│                                         │
│  🎨 Display Preferences                 │
│  ─────────────────────────────────────  │
│  ☑ Show Sargam notation                 │
│  ☑ Show Western note names              │
│  ☑ Enable animations                    │
│                                         │
│  🎵 Advanced                            │
│  ─────────────────────────────────────  │
│  Chord Duration: [2 seconds ▼]          │
│                                         │
│  [Reset to Defaults] [Save Settings]    │
│                                         │
└─────────────────────────────────────────┘
```

**Specifications:**
- Width: 600px max
- Background: `var(--surface)`
- Border-radius: 20px
- Shadow: `0 20px 60px rgba(0,0,0,0.5)`
- Padding: 0
- Backdrop: `rgba(0,0,0,0.75)` with blur(8px)

**Header:** Same as other modals

**Body:**
- Padding: 28px

**Sections (3 total):**
- Margin-bottom: 28px
- Padding: 20px
- Border-radius: 14px
- Background: `var(--surface-2)`
- Border: `1px solid var(--border)`

**Section Title:**
- Font: 18px, bold (700)
- Color: `var(--text)`
- Margin-bottom: 16px
- Icon: 20px

**Setting Item:**
- Display: Flex, justify space-between, align center
- Padding: 12px
- Border-radius: 10px
- Background: `var(--surface-3)`
- Border: `1px solid var(--border)`
- Margin-bottom: 12px

**Setting Label:**
- Font: 14px, semi-bold (600)
- Color: `var(--text-dim)`

**Slider:**
- Width: 200px
- Height: 6px
- Border-radius: 999px
- Background: `var(--surface-2)`
- Border: `1px solid var(--border)`
- Thumb:
  - Width: 18px, height: 18px
  - Border-radius: 50%
  - Background: `linear-gradient(135deg, var(--primary), var(--primary-hover))`
  - Border: `2px solid var(--border)`
  - Shadow: `0 2px 8px rgba(var(--primary), 0.3)`

**Checkbox:**
- Width: 20px, height: 20px
- Border-radius: 4px
- Border: `2px solid var(--border)`
- Background: `var(--surface-2)`
- Checked:
  - Background: `var(--primary)`
  - Border-color: `var(--primary)`
  - Checkmark: White

**Select:**
- Padding: 10px 14px
- Border-radius: 10px
- Background: `var(--surface-2)`
- Border: `1px solid var(--border)`
- Font: 14px, semi-bold
- Width: 200px

**Actions:**
- Display: Flex, justify flex-end, gap 12px
- Margin-top: 24px

**Buttons:**
- Padding: 12px 24px
- Border-radius: 12px
- Font: 14px, bold (700)
- Cursor: Pointer
- Transition: 200ms ease
- Reset button:
  - Background: `var(--surface-2)`
  - Border: `1px solid var(--border)`
  - Color: `var(--text-dim)`
  - Hover: Border-color: `var(--text-dim)`, color: `var(--text)`
- Save button:
  - Background: `linear-gradient(135deg, var(--primary), var(--primary-hover))`
  - Border: None
  - Color: White
  - Hover: Transform translateY(-2px), shadow

---

## DATA FLOW & INTERACTIONS

### User Journey Flow

```
1. Page Load
   ↓
2. Select Tradition (Hindustani/Carnatic)
   ↓
3. Ragas filter by tradition
   ↓
4. Select Raga (e.g., Yaman)
   ↓
5. ALL PANELS UPDATE SIMULTANEOUSLY:
   • Scale Explorer shows notes + keyboard highlights
   • Raga Info expands (optional)
   • Chord Progressions generate
   • Color Chords generate
   • Chord Library populates
   ↓
6. User Interactions:

   A. Click Note Badge:
      → Note highlights
      → Keyboard key highlights
      → Related chords highlight in all panels

   B. Click Keyboard Key:
      → Key highlights
      → Note plays
      → Related chords highlight

   C. Click Chord (Progressions/Colors):
      → Chord plays
      → Keyboard shows all notes in chord
      → Visual animation

   D. Click Chord Card:
      → Chord plays
      → Keyboard shows notes
      → Card pulses

   E. Filter Chords:
      → Library updates
      → Only matching chords show

   F. Download MIDI:
      → MIDI file downloads
      → Button animates
```

### State Management

**Global State (Context):**
```typescript
{
  // User selections
  tradition: 'hindustani' | 'carnatic'
  ragaId: string | null
  tonic: string // 'C', 'D', etc.
  sound: 'piano' | 'pad'
  droneEnabled: boolean
  metronome: { enabled: boolean, tempo: number }

  // UI state
  theme: 'dark' | 'light'
  activeNote: number | null // PC (0-11)
  playingChord: string | null
  chordFilter: 'all' | 'strong' | 'drone' | 'color'

  // Settings
  masterVolume: number // 0-1
  droneVolume: number // 0-1
  showSargam: boolean
  showWestern: boolean
  animationsEnabled: boolean
  chordDuration: number // 1-4 seconds
}
```

**Component State:**
- RagaInfo: `expanded: boolean`
- Modals: `isOpen: boolean`
- ChordCard: `isPlaying: boolean`, `isDownloading: boolean`

### Event Handling

**Click Note Badge:**
```typescript
1. Set activeNote in global state
2. Highlight note badge (cyan glow)
3. Highlight keyboard key
4. Find all chords containing note
5. Highlight chord buttons in progressions/colors
6. Highlight chord cards in library (subtle border)
7. Optional: Play note sound
```

**Click Keyboard Key:**
```typescript
1. Set activeNote in global state
2. Play note (Web Audio API)
3. Highlight key (green glow + animation)
4. Trigger same highlighting as note badge
```

**Click Chord (Button or Card):**
```typescript
1. Set playingChord in global state
2. Get chord's note PCs
3. Play chord (Web Audio API, staggered notes)
4. Highlight all keyboard keys in chord (green glow)
5. Animate chord button/card (pulse)
6. After 600ms, remove playing state
```

**Download MIDI:**
```typescript
1. Set isDownloading on card
2. Generate MIDI file (lib/midiGenerator.ts)
3. Create blob and download link
4. Trigger download
5. After 600ms, remove downloading state
```

**Filter Chords:**
```typescript
1. Set chordFilter in global state
2. Re-render ChordLibrary
3. Filter currentChords array by tag
4. Update grid with filtered chords
5. Animate transition (fade in)
```

---

## TECHNICAL SPECIFICATIONS

### Tech Stack

```
Framework: Next.js 14.2+
Language: TypeScript 5.x
Styling: Tailwind CSS 3.4+
State: React Context API
Audio: Web Audio API (native)
MIDI: Custom generator (lib/midiGenerator.ts)
Icons: Font Awesome 6.4 or Lucide React
Fonts: Inter (Google Fonts)
```

### Project Structure

```
raga-chord-explorer-nextjs/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Main page (Chord Explorer)
│   ├── about/
│   │   └── page.tsx            # About page
│   └── globals.css             # Global styles + Tailwind
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx (if needed)
│   ├── controls/
│   │   ├── ControlsBar.tsx     # Main controls container
│   │   ├── TraditionSelect.tsx
│   │   ├── RagaSelect.tsx
│   │   ├── TonicSelect.tsx
│   │   └── DroneToggle.tsx
│   ├── panels/
│   │   ├── ScaleExplorer.tsx   # Includes keyboard
│   │   ├── RagaInfo.tsx
│   │   ├── ChordProgressions.tsx
│   │   ├── ColorChords.tsx
│   │   └── ChordLibrary.tsx
│   ├── keyboard/
│   │   ├── VirtualKeyboard.tsx
│   │   ├── PianoKey.tsx
│   │   └── NoteBadge.tsx
│   ├── chords/
│   │   ├── ChordCard.tsx
│   │   ├── ChordButton.tsx
│   │   └── ChordFilters.tsx
│   ├── modals/
│   │   ├── Modal.tsx           # Base modal component
│   │   ├── FAQModal.tsx
│   │   ├── ChatModal.tsx
│   │   └── SettingsModal.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Select.tsx
│       ├── Checkbox.tsx
│       └── Slider.tsx
├── lib/
│   ├── data/
│   │   ├── ragas.ts            # Raga definitions
│   │   └── chordTemplates.ts   # Chord templates
│   ├── audio/
│   │   ├── audioEngine.ts      # Web Audio wrapper
│   │   └── midiGenerator.ts    # MIDI file creation
│   ├── music/
│   │   ├── chordGenerator.ts   # Generate chords from raga
│   │   ├── chordScorer.ts      # Score/rank chords
│   │   └── musicTheory.ts      # Helper functions
│   └── utils/
│       ├── helpers.ts
│       └── constants.ts
├── hooks/
│   ├── useAudio.ts             # Audio playback hook
│   ├── useDrone.ts             # Drone control
│   ├── useChordGenerator.ts    # Chord generation
│   ├── useMetronome.ts         # Metronome
│   ├── useKeyboard.ts          # Keyboard interaction
│   └── useTheme.ts             # Theme management
├── contexts/
│   ├── AppContext.tsx          # Global app state
│   └── AudioContext.tsx        # Audio state
├── types/
│   ├── raga.ts
│   ├── chord.ts
│   ├── audio.ts
│   └── index.ts
└── public/
    └── (assets if needed)
```

### Data Types

```typescript
// types/raga.ts
export interface Raga {
  id: string
  name: string
  tradition: 'hindustani' | 'carnatic'
  parent: string
  arohaPCs: number[]      // Ascending scale (pitch classes)
  avarohaPCs: number[]    // Descending scale
  vadiPC: number | null   // Principal note (0-11)
  samvadiPC: number | null // Secondary note
  typicalDrone: 'Sa-Pa' | 'Sa-Ma'
  notes: string           // Description
  pakadPCs?: number[][]   // Characteristic phrases
}

// types/chord.ts
export interface ChordTemplate {
  name: string              // '', 'm', 'sus2', etc.
  intervals: number[]       // [0,4,7] for major
  tags: ChordTag[]
}

export type ChordTag = 'strong' | 'drone' | 'color' | 'fusion'

export interface Chord {
  root: number              // Root pitch class (0-11)
  rootName: string          // 'C', 'D', etc.
  name: string              // 'sus2', 'm7', etc.
  fullName: string          // 'Csus2', 'Dm7', etc.
  tones: number[]           // Pitch classes in chord
  score: number             // Ranking score
  tags: ChordTag[]
}

// types/audio.ts
export interface AudioEngineState {
  initialized: boolean
  playing: boolean
  volume: number
  droneEnabled: boolean
  droneMode: 'Sa-Pa' | 'Sa-Ma'
}

export interface MetronomeState {
  running: boolean
  tempo: number
  currentBeat: number
}
```

### Key Algorithms

**Chord Generation:**
```typescript
function generateChords(raga: Raga, tonic: string): Chord[] {
  // 1. Get allowed pitch classes from raga
  const allowedPCs = new Set([...raga.arohaPCs, ...raga.avarohaPCs])

  // 2. For each note in scale, try each chord template
  const chords: Chord[] = []
  allowedPCs.forEach(root => {
    CHORD_TEMPLATES.forEach(template => {
      // Skip fusion if fusion mode off
      if (template.tags.includes('fusion') && !fusionMode) return

      // Check if all chord tones are in allowed set
      const chordTones = template.intervals.map(iv => (root + iv) % 12)
      const isValid = chordTones.every(tone => allowedPCs.has(tone))

      if (isValid) {
        const score = scoreChord(chordTones, raga)
        const tags = getChordTags(chordTones, template.tags, raga)
        chords.push({ /* chord object */ })
      }
    })
  })

  // 3. Sort by score
  return chords.sort((a, b) => b.score - a.score)
}
```

**Chord Scoring:**
```typescript
function scoreChord(tones: number[], raga: Raga): number {
  let score = 1
  const toneSet = new Set(tones)

  // +2 for including Sa
  if (toneSet.has(0)) score += 2

  // +1 for including Vadi
  if (raga.vadiPC !== null && toneSet.has(raga.vadiPC)) score += 1

  // +1 for including Samvadi
  if (raga.samvadiPC !== null && toneSet.has(raga.samvadiPC)) score += 1

  // +1 for both Vadi and Samvadi
  if (raga.vadiPC !== null && raga.samvadiPC !== null &&
      toneSet.has(raga.vadiPC) && toneSet.has(raga.samvadiPC)) score += 1

  // +1 for drone compatibility
  if (raga.typicalDrone === "Sa-Pa" && (toneSet.has(0) || toneSet.has(7))) score += 1
  if (raga.typicalDrone === "Sa-Ma" && (toneSet.has(0) || toneSet.has(5) || toneSet.has(6))) score += 1

  return score
}
```

**Audio Playback:**
```typescript
async function playChord(pcs: number[], tonic: string) {
  const ctx = getAudioContext()
  const baseGain = 0.22

  // Play each note with slight stagger
  pcs.forEach((pc, i) => {
    setTimeout(() => {
      playTone(pc, tonic, 0.6, baseGain)
    }, i * 15) // 15ms stagger
  })

  // Wait for chord to finish
  await new Promise(r => setTimeout(r, 650))
}

function playTone(pc: number, tonic: string, duration: number, gain: number) {
  const freq = midiFreqFromPC(pc, tonic, 4) // Octave 4
  const osc = ctx.createOscillator()
  const g = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.value = freq
  g.gain.value = 0

  osc.connect(g)
  g.connect(masterGain)

  // ADSR envelope
  const now = ctx.currentTime
  g.gain.setValueAtTime(0, now)
  g.gain.linearRampToValueAtTime(gain, now + 0.01) // Attack
  g.gain.setValueAtTime(gain, now + duration - 0.2)
  g.gain.linearRampToValueAtTime(0, now + duration) // Release

  osc.start(now)
  osc.stop(now + duration + 0.05)
}
```

### Performance Optimizations

```typescript
// 1. Memoize expensive computations
const chords = useMemo(() =>
  generateChords(currentRaga, currentTonic),
  [currentRaga, currentTonic, fusionMode]
)

// 2. Debounce rapid interactions
const debouncedPlayNote = useMemo(
  () => debounce((pc: number) => audioEngine.playNote(pc), 50),
  []
)

// 3. Virtual scrolling for chord library (if >100 chords)
// Use react-window or similar

// 4. Lazy load modals
const FAQModal = lazy(() => import('./components/modals/FAQModal'))

// 5. Optimize re-renders
const ChordCard = memo(({ chord }: { chord: Chord }) => {
  // Component implementation
}, (prev, next) => prev.chord.fullName === next.chord.fullName)
```

### Responsive Breakpoints

```typescript
// tailwind.config.ts
export default {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet portrait
      'lg': '1024px',  // Tablet landscape
      'xl': '1200px',  // Desktop
      '2xl': '1440px', // Large desktop
    }
  }
}
```

**Responsive Changes:**

**< 640px (Mobile Portrait):**
- Sidebar: Hidden, use hamburger menu
- Controls: Stack vertically
- Keyboard: Horizontal scroll
- Panels: Full width stack
- Chord cards: 1 column
- Modals: Full screen

**640-767px (Mobile Landscape):**
- Sidebar: Collapsible
- Controls: 2 per row
- Chord cards: 2 columns

**768-1023px (Tablet):**
- Sidebar: Collapsible or overlay
- Controls: 3 per row
- Chord cards: 3 columns
- Progressions/Colors: Stack vertically

**1024-1199px (Large Tablet/Small Desktop):**
- Sidebar: Fixed
- Controls: 6 in row
- Chord cards: 4 columns
- Progressions/Colors: Side by side

**1200px+ (Desktop):**
- Full layout as designed
- Chord cards: 6 columns
- All features visible

---

## FEATURES CHECKLIST

### ✅ MUST HAVE (Phase 1 - Core)
- [ ] Next.js 14 setup with TypeScript
- [ ] Tailwind CSS configured
- [ ] Navbar with theme toggle
- [ ] Sidebar navigation
- [ ] Controls bar (all 6 controls)
- [ ] Scale Explorer with note badges
- [ ] 2-octave virtual keyboard (C1-C3)
- [ ] Keyboard highlighting system
- [ ] Raga data ported to TypeScript
- [ ] Chord generation algorithm
- [ ] Chord scoring and tagging
- [ ] Chord Progressions panel
- [ ] Color Chords panel
- [ ] Complete Chord Library with grid
- [ ] Chord filtering (All, Strong, Drone, Color)
- [ ] Audio engine with Web Audio API
- [ ] Play chords on click
- [ ] Play notes from keyboard
- [ ] Drone generation (Sa-Pa, Sa-Ma)
- [ ] Drone enable/disable
- [ ] MIDI file generation
- [ ] Download MIDI from chord cards
- [ ] Highlighting connections (note → keyboard → chords)
- [ ] Dark/Light theme toggle
- [ ] Responsive design (mobile, tablet, desktop)

### ✅ SHOULD HAVE (Phase 2 - Enhanced UX)
- [ ] Raga Info collapsible panel
- [ ] FAQ Modal
- [ ] Settings Modal with volume controls
- [ ] Chat Modal (placeholder)
- [ ] Smooth animations and transitions
- [ ] Hover effects on all interactive elements
- [ ] Loading states
- [ ] Error handling
- [ ] Empty states
- [ ] Keyboard shortcuts (optional)
- [ ] Toast notifications
- [ ] About page content

### ✅ NICE TO HAVE (Phase 3 - Polish)
- [ ] Metronome (full UI + functionality)
- [ ] Sound selection (Piano vs Pad)
- [ ] Visual beat indicator
- [ ] Keyboard navigation support
- [ ] Accessibility (ARIA labels, focus management)
- [ ] SEO optimization
- [ ] Performance monitoring
- [ ] Analytics integration
- [ ] Local storage for preferences
- [ ] Shareable links for raga+scale combinations

### ❌ EXPLICITLY EXCLUDED
- ❌ YouTube chord detection
- ❌ Find Scale feature/button
- ❌ Phrases/Pakad display (for now)
- ❌ User authentication
- ❌ Favorites/bookmarks
- ❌ Actual AI chat implementation
- ❌ Backend/database
- ❌ User-generated content

---

## DEVELOPMENT TIMELINE

### Tomorrow's Build (7pm - with 200k tokens)

**Phase 1: Setup & Foundation (30k tokens, ~1 hour)**
- Initialize Next.js project
- Set up Tailwind + TypeScript
- Create folder structure
- Set up contexts and providers
- Port raga data to TypeScript

**Phase 2: Layout Components (40k tokens, ~1.5 hours)**
- Build Navbar
- Build Sidebar
- Build ControlsBar
- Build About page
- Test navigation

**Phase 3: Core Panels (50k tokens, ~2 hours)**
- Build ScaleExplorer component
- Build 2-octave VirtualKeyboard
- Build NoteBadges
- Implement highlighting logic
- Build RagaInfo panel

**Phase 4: Chord Panels (40k tokens, ~1.5 hours)**
- Build ChordProgressions panel
- Build ColorChords panel
- Build ChordLibrary with filters
- Build ChordCard component
- Wire up filtering

**Phase 5: Audio & Interactions (50k tokens, ~2 hours)**
- Build audioEngine
- Implement chord playback
- Implement note playback
- Build drone generator
- Build MIDI generator
- Wire up all click handlers
- Test audio thoroughly

**Phase 6: Modals & Polish (40k tokens, ~1.5 hours)**
- Build Modal base component
- Build FAQModal
- Build ChatModal
- Build SettingsModal
- Implement theme toggle
- Add animations
- Final responsive testing

**Phase 7: Testing & Bug Fixes (35k tokens, ~1 hour)**
- Test all ragas
- Test all interactions
- Fix any bugs
- Performance optimization
- Final polish

**Total: ~185k tokens, ~10-11 hours of focused work**

---

## SUCCESS CRITERIA

At the end of tomorrow's session, the app MUST:

✅ **Functional:**
1. Load and display all ragas
2. Generate chords correctly for any raga+tonic
3. Play chords with audio
4. Highlight notes/chords correctly
5. Filter chords by tags
6. Download MIDI files
7. Toggle theme (dark/light)
8. Work on desktop and mobile

✅ **Visual:**
1. Match wireframe layout exactly
2. Follow color scheme
3. Have smooth animations
4. Responsive across screen sizes
5. Professional appearance

✅ **Code Quality:**
1. TypeScript with proper types
2. Clean component structure
3. No console errors
4. Performant (< 3s initial load)
5. Well-documented code

---

## FINAL NOTES

**This document is the SINGLE SOURCE OF TRUTH.**

- No assumptions beyond this spec
- No "improvements" unless discussed
- Build exactly what's specified
- If unclear, refer back to this document
- If something is missing, ASK before implementing

**Tomorrow at 7pm:**
1. Read this document
2. Follow it step by step
3. Build precisely as specified
4. Test thoroughly
5. Deliver working app

**NO DEVIATIONS. NO SURPRISES. JUST EXECUTION.** 🎯

---

*Document Version: 1.0*
*Last Updated: October 14, 2024*
*Ready for Build: ✅ YES*
