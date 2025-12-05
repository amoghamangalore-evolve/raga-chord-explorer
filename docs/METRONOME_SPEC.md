# METRONOME COMPONENT SPECIFICATION
## Full Functional Metronome - Start/Stop Controls

**Added:** October 14, 2024
**Priority:** MUST HAVE (Phase 1)

---

## PLACEMENT OPTIONS

### Option 1: Floating Panel (RECOMMENDED)
**Position:** Bottom-right corner, above chord library

```
┌─────────────────────────────┐
│  🎵 METRONOME               │
│  ───────────────────────────│
│                             │
│  Tempo: 120 BPM             │
│  ┌─────────────────────┐   │
│  │░░░░░░░█████░░░░░░░░ │   │ ← Slider
│  └─────────────────────┘   │
│  60        120         200  │
│                             │
│  ┌─────────┐  ┌─────────┐  │
│  │  ▶️ Start│  │  ⏹️ Stop │  │
│  └─────────┘  └─────────┘  │
│                             │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐  │
│  │ ● │ │ ○ │ │ ○ │ │ ○ │  │ ← Beat indicator
│  └───┘ └───┘ └───┘ └───┘  │
│   1     2     3     4      │
│                             │
└─────────────────────────────┘
```

**Specifications:**
- **Width:** 320px
- **Height:** 280px (auto when collapsed)
- **Position:** Fixed, bottom: 40px, right: 40px
- **Z-index:** 900
- **Collapsible:** Yes (click header to collapse)
- **Background:** `linear-gradient(135deg, #4338CA 0%, #312E81 100%)`
- **Border-radius:** 20px
- **Shadow:** `0 8px 32px rgba(0,0,0,0.4)`
- **Border:** `1px solid rgba(255,255,255,0.1)`

---

### Option 2: In Controls Bar (ALTERNATIVE)
**Replace simple tempo input with dropdown button**

```
Controls Bar:
[Tradition▼] [Raga▼] [Scale▼] [Sound▼] [Drone☑] [🎵 Metronome ▼]
                                                   └─> Opens dropdown
Dropdown Panel (300px × 240px):
┌──────────────────────────┐
│ Tempo: 120 BPM           │
│ [Slider: 60-200]         │
│ [▶️ Start] [⏹️ Stop]      │
│ Beat: [●][○][○][○]       │
└──────────────────────────┘
```

---

## RECOMMENDED: Option 1 (Floating Panel)

### Full Component Specification

#### Header
```
┌─────────────────────────────┐
│  🎵 METRONOME         [─] [✕]│
└─────────────────────────────┘
```

**Specifications:**
- Height: 48px
- Padding: 12px 20px
- Display: Flex, justify space-between, align center
- Border-bottom: `1px solid rgba(255,255,255,0.1)`
- Cursor: Pointer (for collapse)

**Title:**
- Text: "🎵 METRONOME"
- Font: 16px, bold (700)
- Color: White
- Icon: 20px

**Controls (Right):**
- Collapse button: `[─]` - Minimizes panel
- Close button: `[✕]` - Hides panel
- Size: 28px × 28px each
- Border-radius: 6px
- Background: `rgba(255,255,255,0.1)`
- Hover: `rgba(255,255,255,0.2)`

---

#### Tempo Display

```
┌─────────────────────────────┐
│  Tempo: 120 BPM             │
└─────────────────────────────┘
```

**Specifications:**
- Padding: 16px 20px 8px
- Text-align: Center

**Label:**
- Text: "Tempo:"
- Font: 12px, semi-bold (600)
- Color: `rgba(255,255,255,0.7)`

**Value:**
- Text: "{tempo} BPM"
- Font: 32px, extra-bold (800)
- Color: White
- Letter-spacing: -0.02em

---

#### Tempo Slider

```
┌─────────────────────────────┐
│  ┌─────────────────────┐   │
│  │░░░░░░░█████░░░░░░░░ │   │
│  └─────────────────────┘   │
│  60        120         200  │
└─────────────────────────────┘
```

**Specifications:**
- Padding: 8px 20px
- Margin-bottom: 16px

**Slider:**
- Width: 100%
- Height: 8px
- Border-radius: 999px
- Background: `rgba(255,255,255,0.15)`
- Accent-color: White

**Thumb:**
- Width: 24px
- Height: 24px
- Border-radius: 50%
- Background: White
- Border: `4px solid #4338CA`
- Shadow: `0 2px 8px rgba(0,0,0,0.3)`
- Cursor: Grab
- Active: Cursor: Grabbing

**Range:**
- Min: 60
- Max: 200
- Default: 120
- Step: 1

**Labels:**
- Display: Flex, justify space-between
- Font: 11px, regular
- Color: `rgba(255,255,255,0.6)`
- Margin-top: 4px

---

#### Control Buttons

```
┌─────────────────────────────┐
│  ┌─────────┐  ┌─────────┐  │
│  │  ▶️ Start│  │  ⏹️ Stop │  │
│  └─────────┘  └─────────┘  │
└─────────────────────────────┘
```

**Specifications:**
- Layout: Flex, gap 12px
- Padding: 0 20px 16px
- Justify-content: Space-between

**Button (Both):**
- Flex: 1 (equal width)
- Padding: 14px 20px
- Border-radius: 12px
- Font: 15px, bold (700)
- Cursor: Pointer
- Transition: 200ms ease
- Display: Flex, align center, justify center, gap 8px

**Start Button:**
- Background: `linear-gradient(135deg, #10B981, #059669)`
- Border: None
- Color: White
- Icon: ▶️ (16px)
- Hover:
  - Transform: translateY(-2px)
  - Shadow: `0 6px 16px rgba(16,185,129,0.4)`
- Disabled state (when running):
  - Opacity: 0.5
  - Cursor: Not-allowed
  - Hover effects: None

**Stop Button:**
- Background: `rgba(255,255,255,0.15)`
- Border: `1px solid rgba(255,255,255,0.2)`
- Color: White
- Icon: ⏹️ (16px)
- Hover:
  - Background: `rgba(255,255,255,0.25)`
  - Border-color: `rgba(255,255,255,0.3)`
- Disabled state (when not running):
  - Opacity: 0.5
  - Cursor: Not-allowed

---

#### Beat Indicator

```
┌─────────────────────────────┐
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐  │
│  │ ● │ │ ○ │ │ ○ │ │ ○ │  │
│  └───┘ └───┘ └───┘ └───┘  │
│   1     2     3     4      │
└─────────────────────────────┘
```

**Specifications:**
- Padding: 16px 20px
- Border-top: `1px solid rgba(255,255,255,0.1)`

**Label:**
- Text: "Beat Indicator"
- Font: 11px, semi-bold
- Color: `rgba(255,255,255,0.6)`
- Margin-bottom: 12px
- Text-align: Center

**Beat Dots Container:**
- Display: Flex
- Gap: 12px
- Justify-content: Center

**Beat Dot (4 total):**
- Width: 48px
- Height: 48px
- Border-radius: 12px
- Background: `rgba(255,255,255,0.1)`
- Border: `1px solid rgba(255,255,255,0.15)`
- Display: Flex, align center, justify center
- Transition: 300ms ease

**Dot Circle:**
- Width: 20px
- Height: 20px
- Border-radius: 50%
- Background: `rgba(255,255,255,0.3)`
- Transition: 300ms ease

**Active State (Current Beat):**
- Background: White
- Border-color: White
- Shadow: `0 0 20px rgba(255,255,255,0.6)`
- Dot Circle:
  - Background: `#4338CA`
  - Transform: scale(1.2)
  - Shadow: `0 0 12px #4338CA`

**Accent Beat (Beat 1):**
- When active:
  - Background: `#F59E0B` (amber)
  - Border-color: `#F59E0B`
  - Dot Circle background: `#78350F`

**Beat Numbers:**
- Font: 11px, bold
- Color: `rgba(255,255,255,0.6)`
- Text-align: Center
- Margin-top: 4px

---

## COMPONENT BEHAVIOR

### States

**1. Stopped (Initial)**
- Start button: Enabled
- Stop button: Disabled
- Beat dots: All inactive
- Tempo slider: Enabled

**2. Running**
- Start button: Disabled
- Stop button: Enabled
- Beat dots: Animating (1-2-3-4 cycle)
- Tempo slider: Disabled (or updates don't affect until restart)

**3. Collapsed**
- Only header visible
- All content hidden
- Height: 48px
- Click header to expand

**4. Hidden**
- Entire component hidden
- Can be shown via:
  - Settings toggle
  - Keyboard shortcut (M)
  - Navbar button

---

### Functionality

**Start Metronome:**
```typescript
function startMetronome(tempo: number) {
  1. Calculate interval: 60000 / tempo ms per beat
  2. Initialize beat counter: 0
  3. Play first click (accent)
  4. Set interval:
     - Increment beat counter
     - Play click (accent if beat % 4 === 0)
     - Update beat indicator visual
     - Dispatch custom event for other components
  5. Disable start button, enable stop button
  6. Disable tempo slider
}
```

**Stop Metronome:**
```typescript
function stopMetronome() {
  1. Clear interval
  2. Reset beat counter to 0
  3. Reset beat indicator to all inactive
  4. Enable start button, disable stop button
  5. Enable tempo slider
}
```

**Update Tempo:**
```typescript
function updateTempo(newTempo: number) {
  1. Update display value
  2. If running:
     - Stop current metronome
     - Start new metronome with new tempo
}
```

**Beat Click Sound:**
```typescript
function playMetronomeClick(accent: boolean) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.value = accent ? 1200 : 800 // Higher pitch for accent

  const now = ctx.currentTime
  gain.gain.setValueAtTime(accent ? 0.3 : 0.2, now)
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05)

  osc.connect(gain)
  gain.connect(masterGain)

  osc.start(now)
  osc.stop(now + 0.05)
}
```

---

## INTEGRATION

### Controls Bar Integration

In the controls bar, the 6th control becomes:

```
┌─────────────┐
│ Metronome   │ ← Label
│ - click to  │ ← Subtitle
│   open      │
│ [🎵 Open]   │ ← Button (not input)
└─────────────┘
```

**Button specs:**
- Same styling as other controls
- Background: `rgba(255,255,255,0.15)`
- Icon: 🎵
- Text: "Open" or "{tempo} BPM" if running
- Click: Toggles floating panel visibility

---

### Settings Modal Integration

Add metronome section:

```
🎵 Metronome Settings
─────────────────────
☑ Show metronome panel on startup
Default Tempo: [120] BPM
Metronome Volume: [████████░░] 70%
```

---

### Keyboard Shortcuts

- **M:** Toggle metronome panel
- **Space:** Start/Stop metronome (when panel focused)
- **Arrow Up/Down:** Increase/decrease tempo by 5

---

## STATE MANAGEMENT

### Context State

```typescript
interface MetronomeState {
  isVisible: boolean      // Panel shown/hidden
  isCollapsed: boolean    // Panel minimized
  isRunning: boolean      // Metronome active
  tempo: number          // Current BPM (60-200)
  currentBeat: number    // 0-3 (4/4 time)
  volume: number         // 0-1
}
```

### Custom Events

```typescript
// Dispatched on each beat
window.dispatchEvent(new CustomEvent('metronomeBeat', {
  detail: {
    beat: number,      // 1-4
    accent: boolean,   // true on beat 1
    tempo: number
  }
}))
```

---

## TYPESCRIPT TYPES

```typescript
// types/metronome.ts
export interface MetronomeConfig {
  minTempo: 60
  maxTempo: 200
  defaultTempo: 120
  beatsPerMeasure: 4
}

export interface MetronomeState {
  isVisible: boolean
  isCollapsed: boolean
  isRunning: boolean
  tempo: number
  currentBeat: number
  volume: number
}

export interface MetronomeControls {
  start: () => void
  stop: () => void
  toggle: () => void
  setTempo: (tempo: number) => void
  setVolume: (volume: number) => void
  show: () => void
  hide: () => void
  toggleCollapse: () => void
}
```

---

## RESPONSIVE BEHAVIOR

**Desktop (1200px+):**
- Floating panel in bottom-right
- Full size (320px × 280px)

**Tablet (768-1199px):**
- Floating panel in bottom-center
- Slightly smaller (280px × 260px)

**Mobile (< 768px):**
- Full-width panel at bottom
- Sticky position
- Can swipe down to dismiss
- Simplified: No collapse, just show/hide

---

## ACCESSIBILITY

**Keyboard Navigation:**
- Tab: Focus tempo slider
- Tab: Focus start button
- Tab: Focus stop button
- Enter/Space: Activate focused button
- Arrow keys: Adjust tempo slider

**ARIA Labels:**
```html
<div role="region" aria-label="Metronome Control Panel">
  <input
    type="range"
    aria-label="Tempo slider"
    aria-valuemin="60"
    aria-valuemax="200"
    aria-valuenow={tempo}
    aria-valuetext={`${tempo} beats per minute`}
  />
  <button
    aria-label="Start metronome"
    aria-disabled={isRunning}
  >
    Start
  </button>
  <div role="status" aria-live="polite" aria-label="Beat indicator">
    Current beat: {currentBeat + 1} of 4
  </div>
</div>
```

**Screen Reader Announcements:**
- "Metronome started at 120 BPM"
- "Metronome stopped"
- "Tempo changed to 140 BPM"
- "Beat 1 of 4" (on accent beat only)

---

## VISUAL EXAMPLES

### Stopped State
```
╔═══════════════════════════╗
║ 🎵 METRONOME        [─][✕]║
╟───────────────────────────╢
║    Tempo: 120 BPM         ║
║                           ║
║ ░░░░░░░░█████░░░░░░░░     ║
║ 60      120        200    ║
║                           ║
║ [  ▶️ Start  ] [⏹️ Stop  ]║
║  (enabled)    (disabled)  ║
║                           ║
║ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ║
║ │ ○ │ │ ○ │ │ ○ │ │ ○ │ ║
║ └───┘ └───┘ └───┘ └───┘ ║
║  1     2     3     4     ║
╚═══════════════════════════╝
```

### Running State (Beat 1 - Accent)
```
╔═══════════════════════════╗
║ 🎵 METRONOME        [─][✕]║
╟───────────────────────────╢
║    Tempo: 140 BPM         ║
║                           ║
║ ░░░░░░░░░░█████░░░░░░     ║
║ 60      140        200    ║
║  (disabled while running) ║
║                           ║
║ [  ▶️ Start  ] [  ⏹️ Stop ]║
║  (disabled)    (enabled)  ║
║                           ║
║ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ║
║ │ ● │ │ ○ │ │ ○ │ │ ○ │ ║ ← Beat 1 (amber glow)
║ └───┘ └───┘ └───┘ └───┘ ║
║  1     2     3     4     ║
╚═══════════════════════════╝
```

### Running State (Beat 3)
```
╔═══════════════════════════╗
║ 🎵 METRONOME        [─][✕]║
╟───────────────────────────╢
║    Tempo: 140 BPM         ║
║                           ║
║ ░░░░░░░░░░█████░░░░░░     ║
║                           ║
║ [  ▶️ Start  ] [  ⏹️ Stop ]║
║                           ║
║ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ║
║ │ ○ │ │ ○ │ │ ● │ │ ○ │ ║ ← Beat 3 (white glow)
║ └───┘ └───┘ └───┘ └───┘ ║
║  1     2     3     4     ║
╚═══════════════════════════╝
```

### Collapsed State
```
╔═══════════════════════════╗
║ 🎵 METRONOME (140 BPM) [▲]║
╚═══════════════════════════╝
```

---

## IMPLEMENTATION PRIORITY

**Phase 1 (Must Have):**
- [x] Floating panel structure
- [x] Tempo slider
- [x] Start/Stop buttons
- [x] Beat indicator (4 dots)
- [x] Audio click sounds
- [x] Basic functionality

**Phase 2 (Should Have):**
- [ ] Collapse/expand
- [ ] Show/hide toggle
- [ ] Settings integration
- [ ] Keyboard shortcuts

**Phase 3 (Nice to Have):**
- [ ] Time signature options (3/4, 6/8, etc.)
- [ ] Subdivisions (eighth notes, triplets)
- [ ] Visual waveform
- [ ] Tap tempo

---

## TESTING CHECKLIST

- [ ] Tempo slider changes value correctly (60-200)
- [ ] Start button enables metronome
- [ ] Stop button disables metronome
- [ ] Beat indicator animates correctly (1-2-3-4)
- [ ] Beat 1 has different visual (accent)
- [ ] Audio clicks play on each beat
- [ ] Accent click is higher pitch
- [ ] Tempo changes while stopped
- [ ] Start/Stop buttons disable appropriately
- [ ] Collapse/expand works
- [ ] Show/hide works
- [ ] Keyboard shortcuts work
- [ ] Responsive on mobile
- [ ] Accessible with screen reader
- [ ] No memory leaks (interval cleared)

---

**METRONOME IS NOW FULLY SPECIFIED!** 🎵✅

This will be built in Phase 1 (Must Have) tomorrow!
