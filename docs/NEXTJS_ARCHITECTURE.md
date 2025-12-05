# NEXT.JS ARCHITECTURE - PRODUCTION READY
## Robust, Scalable, Enterprise-Grade Implementation

**Version:** 1.0
**Target:** Next.js 14+ with App Router
**Status:** Production Blueprint ✅

---

## TABLE OF CONTENTS

1. [Technology Stack](#technology-stack)
2. [Project Structure](#project-structure)
3. [Architecture Patterns](#architecture-patterns)
4. [State Management](#state-management)
5. [Performance Optimization](#performance-optimization)
6. [Error Handling](#error-handling)
7. [Testing Strategy](#testing-strategy)
8. [Deployment & CI/CD](#deployment--cicd)
9. [Scalability Considerations](#scalability-considerations)

---

## TECHNOLOGY STACK

### Core Framework
```json
{
  "framework": "Next.js 14.2.x",
  "react": "18.3.x",
  "typescript": "5.4.x",
  "node": ">=18.x"
}
```

### Styling & UI
```json
{
  "styling": "Tailwind CSS 3.4.x",
  "components": "shadcn/ui (optional)",
  "icons": "lucide-react 0.index.x",
  "animations": "framer-motion 11.x"
}
```

### State Management
```json
{
  "global": "Zustand 4.5.x (lightweight, TypeScript-first)",
  "server": "React Server Components (RSC)",
  "forms": "React Hook Form 7.x",
  "validation": "Zod 3.x"
}
```

### Audio & MIDI
```json
{
  "audio": "Web Audio API (native)",
  "midi": "tonejs/midi (optional) or custom"
}
```

### Development Tools
```json
{
  "linter": "ESLint 8.x",
  "formatter": "Prettier 3.x",
  "typeChecking": "TypeScript strict mode",
  "preCommit": "Husky + lint-staged"
}
```

### Testing
```json
{
  "unit": "Vitest 1.x",
  "integration": "React Testing Library",
  "e2e": "Playwright 1.x",
  "coverage": "c8"
}
```

### Monitoring & Analytics
```json
{
  "errors": "Sentry (optional)",
  "analytics": "Vercel Analytics",
  "performance": "Web Vitals"
}
```

---

## PROJECT STRUCTURE

### Complete Folder Organization

```
raga-chord-explorer/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # CI/CD pipeline
│       └── deploy.yml                # Deployment automation
│
├── app/                              # Next.js 14 App Router
│   ├── (main)/                       # Route group
│   │   ├── layout.tsx                # Main layout with providers
│   │   ├── page.tsx                  # Home page (Chord Explorer)
│   │   ├── loading.tsx               # Loading UI
│   │   ├── error.tsx                 # Error boundary
│   │   └── about/
│   │       └── page.tsx              # About page
│   │
│   ├── api/                          # API routes (if needed)
│   │   └── health/
│   │       └── route.ts              # Health check endpoint
│   │
│   ├── layout.tsx                    # Root layout
│   ├── globals.css                   # Global styles + Tailwind
│   ├── not-found.tsx                 # 404 page
│   └── providers.tsx                 # Context providers wrapper
│
├── components/                       # React components
│   ├── layout/
│   │   ├── navbar/
│   │   │   ├── Navbar.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── NavButton.tsx
│   │   ├── sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   └── SidebarButton.tsx
│   │   └── footer/
│   │       └── Footer.tsx
│   │
│   ├── controls/
│   │   ├── ControlsBar.tsx           # Container
│   │   ├── TraditionSelect.tsx
│   │   ├── RagaSelect.tsx
│   │   ├── TonicSelect.tsx
│   │   ├── SoundSelect.tsx
│   │   ├── DroneToggle.tsx
│   │   └── MetronomeControl.tsx
│   │
│   ├── panels/
│   │   ├── ScaleExplorer/
│   │   │   ├── ScaleExplorer.tsx     # Main component
│   │   │   ├── NoteBadges.tsx
│   │   │   └── ScaleExplorer.module.css (if needed)
│   │   ├── RagaInfo/
│   │   │   ├── RagaInfo.tsx
│   │   │   └── RagaInfoDetails.tsx
│   │   ├── ChordProgressions/
│   │   │   ├── ChordProgressions.tsx
│   │   │   └── ChordButton.tsx
│   │   ├── ColorChords/
│   │   │   └── ColorChords.tsx
│   │   └── ChordLibrary/
│   │       ├── ChordLibrary.tsx
│   │       ├── ChordGrid.tsx
│   │       ├── ChordCard.tsx
│   │       └── ChordFilters.tsx
│   │
│   ├── keyboard/
│   │   ├── VirtualKeyboard.tsx       # Main keyboard component
│   │   ├── PianoKey.tsx              # Individual key
│   │   ├── WhiteKey.tsx
│   │   ├── BlackKey.tsx
│   │   └── KeyboardLegend.tsx
│   │
│   ├── metronome/
│   │   ├── Metronome.tsx             # Floating panel
│   │   ├── MetronomeControls.tsx
│   │   ├── BeatIndicator.tsx
│   │   └── TempoSlider.tsx
│   │
│   ├── modals/
│   │   ├── Modal.tsx                 # Base modal (reusable)
│   │   ├── FAQModal/
│   │   │   ├── FAQModal.tsx
│   │   │   └── FAQItem.tsx
│   │   ├── ChatModal/
│   │   │   ├── ChatModal.tsx
│   │   │   └── ChatMessage.tsx
│   │   └── SettingsModal/
│   │       ├── SettingsModal.tsx
│   │       ├── AudioSettings.tsx
│   │       ├── DisplaySettings.tsx
│   │       └── AdvancedSettings.tsx
│   │
│   └── ui/                           # Reusable UI primitives
│       ├── Button.tsx
│       ├── Select.tsx
│       ├── Checkbox.tsx
│       ├── Slider.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── Tooltip.tsx
│
├── lib/                              # Business logic & utilities
│   ├── data/
│   │   ├── ragas.ts                  # Raga definitions
│   │   ├── chordTemplates.ts         # Chord templates
│   │   └── constants.ts              # App constants
│   │
│   ├── audio/
│   │   ├── audioEngine.ts            # Web Audio wrapper
│   │   ├── audioContext.ts           # Audio context singleton
│   │   ├── droneGenerator.ts         # Drone synthesis
│   │   ├── notePlayer.ts             # Note playback
│   │   └── soundPresets.ts           # Piano/Pad presets
│   │
│   ├── midi/
│   │   ├── midiGenerator.ts          # MIDI file creation
│   │   └── midiUtils.ts              # MIDI helpers
│   │
│   ├── music/
│   │   ├── chordGenerator.ts         # Generate chords from raga
│   │   ├── chordScorer.ts            # Score/rank chords
│   │   ├── chordTagger.ts            # Tag chords (strong, drone, etc.)
│   │   ├── progressionGenerator.ts   # Chord progression logic
│   │   ├── colorChordGenerator.ts    # Extended chord logic
│   │   └── musicTheory.ts            # Theory utilities
│   │
│   ├── utils/
│   │   ├── cn.ts                     # ClassNames utility
│   │   ├── debounce.ts               # Debounce helper
│   │   ├── throttle.ts               # Throttle helper
│   │   ├── formatters.ts             # Format helpers
│   │   └── validators.ts             # Validation helpers
│   │
│   └── errors/
│       ├── AppError.ts               # Custom error classes
│       └── errorHandler.ts           # Error handling utilities
│
├── hooks/                            # Custom React hooks
│   ├── audio/
│   │   ├── useAudio.ts               # Audio playback hook
│   │   ├── useDrone.ts               # Drone control
│   │   ├── useMetronome.ts           # Metronome logic
│   │   └── useAudioContext.ts        # Audio context management
│   │
│   ├── music/
│   │   ├── useChordGenerator.ts      # Chord generation
│   │   ├── useRagaSelector.ts        # Raga selection logic
│   │   └── useKeyboardState.ts       # Keyboard highlighting
│   │
│   ├── ui/
│   │   ├── useModal.ts               # Modal state
│   │   ├── useTheme.ts               # Theme management
│   │   ├── useMediaQuery.ts          # Responsive hooks
│   │   └── useLocalStorage.ts        # LocalStorage hook
│   │
│   └── utils/
│       ├── useDebounce.ts            # Debounce hook
│       ├── useThrottle.ts            # Throttle hook
│       └── useEventListener.ts       # Event listener hook
│
├── store/                            # Zustand state management
│   ├── index.ts                      # Store exports
│   ├── appStore.ts                   # Main app store
│   ├── audioStore.ts                 # Audio state
│   ├── uiStore.ts                    # UI state (modals, theme)
│   └── settingsStore.ts              # User settings
│
├── types/                            # TypeScript definitions
│   ├── raga.ts                       # Raga types
│   ├── chord.ts                      # Chord types
│   ├── audio.ts                      # Audio types
│   ├── ui.ts                         # UI types
│   └── index.ts                      # Type exports
│
├── config/                           # Configuration files
│   ├── site.ts                       # Site metadata
│   ├── theme.ts                      # Theme config
│   └── audio.ts                      # Audio config
│
├── constants/                        # App constants
│   ├── routes.ts                     # Route definitions
│   ├── colors.ts                     # Color palette
│   └── animations.ts                 # Animation values
│
├── styles/                           # Additional styles
│   └── animations.css                # Custom animations
│
├── public/                           # Static assets
│   ├── fonts/                        # Custom fonts (if any)
│   ├── images/                       # Images
│   └── favicon.ico
│
├── tests/                            # Test files
│   ├── unit/
│   │   ├── lib/
│   │   │   └── chordGenerator.test.ts
│   │   └── components/
│   │       └── ChordCard.test.tsx
│   ├── integration/
│   │   └── chordExplorer.test.tsx
│   └── e2e/
│       └── userFlow.spec.ts
│
├── scripts/                          # Utility scripts
│   ├── generateRagaData.ts           # Data generation
│   └── validateData.ts               # Data validation
│
├── .env.local                        # Environment variables
├── .env.example                      # Env template
├── .eslintrc.json                    # ESLint config
├── .prettierrc                       # Prettier config
├── tsconfig.json                     # TypeScript config
├── next.config.js                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── postcss.config.js                 # PostCSS config
├── vitest.config.ts                  # Vitest config
├── playwright.config.ts              # Playwright config
├── package.json                      # Dependencies
└── README.md                         # Documentation
```

---

## ARCHITECTURE PATTERNS

### 1. Component Architecture

**Principle: Single Responsibility + Composition**

```typescript
// ❌ BAD: Monolithic component
function ChordExplorer() {
  // 500 lines of code doing everything
}

// ✅ GOOD: Composed components
function ChordExplorerPage() {
  return (
    <div className="chord-explorer">
      <ScaleExplorer />
      <RagaInfo />
      <ChordPanelsGroup />
      <ChordLibrary />
    </div>
  )
}

// Each component has ONE responsibility
```

**Component Types:**

1. **Page Components** (`app/` folder)
   - Route-level components
   - Data fetching (Server Components when possible)
   - Layout composition

2. **Feature Components** (`components/panels/`)
   - Business logic
   - Feature-specific state
   - Compose UI components

3. **UI Components** (`components/ui/`)
   - Reusable, presentational
   - No business logic
   - Props-driven

4. **Layout Components** (`components/layout/`)
   - Structure, not content
   - Shared across pages

---

### 2. State Management Strategy

**Using Zustand for Global State (Better than Redux)**

```typescript
// store/appStore.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AppState {
  // Selection state
  tradition: 'hindustani' | 'carnatic'
  ragaId: string | null
  tonic: string

  // UI state
  activeNote: number | null
  playingChord: string | null

  // Actions
  setTradition: (tradition: 'hindustani' | 'carnatic') => void
  setRaga: (ragaId: string) => void
  setTonic: (tonic: string) => void
  setActiveNote: (note: number | null) => void
  setPlayingChord: (chord: string | null) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        tradition: 'hindustani',
        ragaId: null,
        tonic: 'C',
        activeNote: null,
        playingChord: null,

        // Actions
        setTradition: (tradition) => set({ tradition, ragaId: null }),
        setRaga: (ragaId) => set({ ragaId }),
        setTonic: (tonic) => set({ tonic }),
        setActiveNote: (activeNote) => set({ activeNote }),
        setPlayingChord: (playingChord) => set({ playingChord }),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({
          tradition: state.tradition,
          tonic: state.tonic,
        }),
      }
    ),
    { name: 'AppStore' }
  )
)
```

**Store Separation:**

```typescript
// store/index.ts
export { useAppStore } from './appStore'
export { useAudioStore } from './audioStore'
export { useUIStore } from './uiStore'
export { useSettingsStore } from './settingsStore'

// Usage in components
import { useAppStore, useAudioStore } from '@/store'

function MyComponent() {
  const raga = useAppStore(state => state.ragaId)
  const playChord = useAudioStore(state => state.playChord)

  // Component logic
}
```

**Why Zustand over Context API:**
- ✅ Better performance (no unnecessary re-renders)
- ✅ Simpler API
- ✅ TypeScript-first
- ✅ DevTools support
- ✅ Persist middleware built-in
- ✅ Easier testing

---

### 3. Custom Hooks Pattern

**Encapsulate Logic in Hooks**

```typescript
// hooks/music/useChordGenerator.ts
import { useMemo } from 'react'
import { useAppStore } from '@/store'
import { generateChords } from '@/lib/music/chordGenerator'
import { RAGAS } from '@/lib/data/ragas'

export function useChordGenerator() {
  const { ragaId, tonic } = useAppStore(state => ({
    ragaId: state.ragaId,
    tonic: state.tonic,
  }))

  const currentRaga = useMemo(
    () => RAGAS.find(r => r.id === ragaId),
    [ragaId]
  )

  const chords = useMemo(() => {
    if (!currentRaga) return []
    return generateChords(currentRaga, tonic)
  }, [currentRaga, tonic])

  return {
    chords,
    currentRaga,
    isReady: !!currentRaga,
  }
}

// Usage in component
function ChordLibrary() {
  const { chords, isReady } = useChordGenerator()

  if (!isReady) return <EmptyState />

  return <ChordGrid chords={chords} />
}
```

**Hook Composition:**

```typescript
// hooks/audio/useAudio.ts
export function useAudio() {
  const audioContext = useAudioContext()
  const { volume, droneEnabled } = useAudioStore()

  const playChord = useCallback((pcs: number[]) => {
    // Audio logic
  }, [audioContext, volume])

  const playNote = useCallback((pc: number) => {
    // Audio logic
  }, [audioContext, volume])

  return { playChord, playNote }
}
```

---

### 4. Error Handling Pattern

**Graceful Error Boundaries**

```typescript
// app/error.tsx (Next.js error boundary)
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

// lib/errors/AppError.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class AudioError extends AppError {
  constructor(message: string) {
    super(message, 'AUDIO_ERROR', 500)
  }
}

// Usage
try {
  await audioEngine.playChord(chord)
} catch (error) {
  if (error instanceof AudioError) {
    toast.error('Audio playback failed')
  } else {
    throw error // Let error boundary handle it
  }
}
```

---

### 5. Performance Optimization Patterns

**Code Splitting**

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic'

const Metronome = dynamic(() => import('@/components/metronome/Metronome'), {
  loading: () => <MetronomeSkeleton />,
  ssr: false, // Don't render on server
})

const FAQModal = dynamic(() => import('@/components/modals/FAQModal'))
```

**Memoization**

```typescript
import { memo, useMemo, useCallback } from 'react'

// Memoize expensive computations
const chords = useMemo(() => {
  return generateChords(raga, tonic) // Expensive
}, [raga, tonic])

// Memoize callbacks
const handleChordClick = useCallback((chord: Chord) => {
  playChord(chord.tones)
}, [playChord])

// Memoize components
const ChordCard = memo(({ chord }: { chord: Chord }) => {
  return <div>{chord.fullName}</div>
}, (prev, next) => prev.chord.fullName === next.chord.fullName)
```

**Virtual Scrolling (if >100 chords)**

```typescript
import { useVirtualizer } from '@tanstack/react-virtual'

function ChordLibrary({ chords }: { chords: Chord[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: chords.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200, // Card height
    overscan: 5,
  })

  return (
    <div ref={parentRef} className="chord-library">
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <ChordCard
            key={virtualRow.index}
            chord={chords[virtualRow.index]}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
```

---

## STATE MANAGEMENT

### Zustand Store Structure

```typescript
// store/appStore.ts
interface AppStore {
  // ===== SELECTION STATE =====
  tradition: 'hindustani' | 'carnatic'
  ragaId: string | null
  tonic: string
  sound: 'piano' | 'pad'

  // ===== UI STATE =====
  activeNote: number | null
  playingChord: string | null
  chordFilter: 'all' | 'strong' | 'drone' | 'color'

  // ===== COMPUTED =====
  get currentRaga(): Raga | null
  get filteredChords(): Chord[]

  // ===== ACTIONS =====
  setTradition: (tradition) => void
  setRaga: (ragaId) => void
  setTonic: (tonic) => void
  setSound: (sound) => void
  setActiveNote: (note) => void
  setPlayingChord: (chord) => void
  setChordFilter: (filter) => void
  reset: () => void
}

// store/audioStore.ts
interface AudioStore {
  // ===== STATE =====
  masterVolume: number
  droneVolume: number
  droneEnabled: boolean
  droneMode: 'Sa-Pa' | 'Sa-Ma'

  // ===== ACTIONS =====
  setMasterVolume: (volume) => void
  setDroneVolume: (volume) => void
  setDroneEnabled: (enabled) => void
  setDroneMode: (mode) => void
  playChord: (pcs: number[]) => Promise<void>
  playNote: (pc: number) => void
  startDrone: (mode) => void
  stopDrone: () => void
}

// store/uiStore.ts
interface UIStore {
  // ===== MODAL STATE =====
  modals: {
    faq: boolean
    chat: boolean
    settings: boolean
  }

  // ===== THEME =====
  theme: 'dark' | 'light'

  // ===== METRONOME =====
  metronome: {
    visible: boolean
    collapsed: boolean
    running: boolean
    tempo: number
  }

  // ===== ACTIONS =====
  openModal: (name) => void
  closeModal: (name) => void
  toggleTheme: () => void
  showMetronome: () => void
  hideMetronome: () => void
  // ...
}

// store/settingsStore.ts
interface SettingsStore {
  showSargam: boolean
  showWestern: boolean
  animationsEnabled: boolean
  chordDuration: number

  // Actions
  updateSettings: (partial) => void
  resetSettings: () => void
}
```

---

## PERFORMANCE OPTIMIZATION

### 1. Bundle Size Optimization

**next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize production build
  productionBrowserSourceMaps: false,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  // Compression
  compress: true,

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1]
              return `vendor.${packageName?.replace('@', '')}`
            },
          },
        },
      }
    }

    return config
  },
}

module.exports = nextConfig
```

### 2. Image Optimization

```typescript
import Image from 'next/image'

// Use Next.js Image component
<Image
  src="/logo.png"
  alt="Raga Chord Explorer"
  width={200}
  height={50}
  priority // For above-the-fold images
  quality={90}
/>
```

### 3. Font Optimization

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

### 4. Route Prefetching

```typescript
import Link from 'next/link'

// Automatically prefetches on hover
<Link href="/about" prefetch={true}>
  About
</Link>
```

### 5. React Server Components (RSC)

```typescript
// app/page.tsx - Server Component (default)
import { RAGAS } from '@/lib/data/ragas'

export default function HomePage() {
  // This runs on the server, no JS sent to client
  const ragaCount = RAGAS.length

  return (
    <div>
      <h1>Explore {ragaCount} Ragas</h1>
      <ChordExplorerClient />
    </div>
  )
}

// components/ChordExplorerClient.tsx
'use client' // Client Component for interactivity

export function ChordExplorerClient() {
  // Interactive features
}
```

---

## ERROR HANDLING

### Comprehensive Error Strategy

```typescript
// lib/errors/errorHandler.ts
export class ErrorHandler {
  static handle(error: unknown): void {
    if (error instanceof AudioError) {
      this.handleAudioError(error)
    } else if (error instanceof ValidationError) {
      this.handleValidationError(error)
    } else {
      this.handleUnknownError(error)
    }
  }

  private static handleAudioError(error: AudioError): void {
    console.error('Audio error:', error)
    toast.error('Audio playback failed. Please check your browser settings.')

    // Log to monitoring service
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error)
    }
  }

  private static handleValidationError(error: ValidationError): void {
    toast.error(error.message)
  }

  private static handleUnknownError(error: unknown): void {
    console.error('Unknown error:', error)
    toast.error('An unexpected error occurred')

    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error)
    }
  }
}

// Usage in components
try {
  await playChord(chord.tones)
} catch (error) {
  ErrorHandler.handle(error)
}
```

---

## TESTING STRATEGY

### 1. Unit Tests (Vitest)

```typescript
// tests/unit/lib/chordGenerator.test.ts
import { describe, it, expect } from 'vitest'
import { generateChords } from '@/lib/music/chordGenerator'
import { RAGAS } from '@/lib/data/ragas'

describe('chordGenerator', () => {
  it('should generate chords for Yaman raga', () => {
    const yaman = RAGAS.find(r => r.id === 'yaman')!
    const chords = generateChords(yaman, 'C')

    expect(chords.length).toBeGreaterThan(0)
    expect(chords[0]).toHaveProperty('fullName')
    expect(chords[0]).toHaveProperty('tones')
  })

  it('should only use notes from raga scale', () => {
    const yaman = RAGAS.find(r => r.id === 'yaman')!
    const chords = generateChords(yaman, 'C')
    const allowedPCs = new Set([...yaman.arohaPCs, ...yaman.avarohaPCs])

    chords.forEach(chord => {
      chord.tones.forEach(tone => {
        expect(allowedPCs.has(tone)).toBe(true)
      })
    })
  })
})
```

### 2. Component Tests

```typescript
// tests/unit/components/ChordCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ChordCard from '@/components/panels/ChordLibrary/ChordCard'

describe('ChordCard', () => {
  const mockChord = {
    fullName: 'Cmaj7',
    tones: [0, 4, 7, 11],
    tags: ['strong', 'drone'],
  }

  it('renders chord name', () => {
    render(<ChordCard chord={mockChord} />)
    expect(screen.getByText('Cmaj7')).toBeInTheDocument()
  })

  it('calls playChord on click', () => {
    const playChord = vi.fn()
    render(<ChordCard chord={mockChord} onPlay={playChord} />)

    fireEvent.click(screen.getByRole('button', { name: /play/i }))
    expect(playChord).toHaveBeenCalledWith(mockChord.tones)
  })
})
```

### 3. E2E Tests (Playwright)

```typescript
// tests/e2e/userFlow.spec.ts
import { test, expect } from '@playwright/test'

test('user can select raga and play chords', async ({ page }) => {
  await page.goto('/')

  // Select tradition
  await page.selectOption('[data-testid="tradition-select"]', 'hindustani')

  // Select raga
  await page.selectOption('[data-testid="raga-select"]', 'yaman')

  // Verify chords appear
  await expect(page.locator('[data-testid="chord-card"]').first()).toBeVisible()

  // Click chord to play
  await page.click('[data-testid="chord-card"]:first-child')

  // Verify keyboard highlights
  await expect(page.locator('.piano-key.playing')).toHaveCount(3) // Triad
})
```

---

## DEPLOYMENT & CI/CD

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Run tests
        run: npm run test:ci

      - name: Build
        run: npm run build

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Vercel Deployment

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_APP_URL": "@app-url"
  }
}
```

---

## SCALABILITY CONSIDERATIONS

### 1. Database Integration (Future)

**If you want to add user features:**

```typescript
// Prisma schema (prisma/schema.prisma)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id             String    @id @default(cuid())
  email          String    @unique
  favoriteRagas  String[]  // Array of raga IDs
  settings       Json      // User preferences
  createdAt      DateTime  @default(now())
}

model ChordProgression {
  id          String   @id @default(cuid())
  userId      String
  name        String
  chords      String[] // Array of chord names
  ragaId      String
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
}
```

### 2. API Routes (for backend features)

```typescript
// app/api/favorites/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { userId, ragaId } = await req.json()

    await prisma.user.update({
      where: { id: userId },
      data: {
        favoriteRagas: {
          push: ragaId,
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add favorite' },
      { status: 500 }
    )
  }
}
```

### 3. Caching Strategy

```typescript
// lib/cache/ragaCache.ts
import { cache } from 'react'

export const getRagas = cache(async () => {
  // This will be cached across the server render
  return RAGAS
})

// Using with React Server Components
export default async function RagaList() {
  const ragas = await getRagas()
  return <div>{/* render ragas */}</div>
}
```

### 4. Content Delivery Network (CDN)

```javascript
// next.config.js
module.exports = {
  images: {
    loader: 'cloudinary', // or 'imgix', 'akamai'
    path: 'https://res.cloudinary.com/your-cloud/',
  },
}
```

### 5. Monitoring & Analytics

```typescript
// lib/analytics.ts
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

---

## COMPLETE MIGRATION CHECKLIST

```
Phase 1: Project Setup
  [ ] Initialize Next.js 14 with TypeScript
  [ ] Configure Tailwind CSS
  [ ] Set up ESLint + Prettier
  [ ] Configure Zustand stores
  [ ] Set up folder structure

Phase 2: Data Migration
  [ ] Port ragas.ts with proper types
  [ ] Port chordTemplates.ts
  [ ] Create TypeScript interfaces
  [ ] Add data validation (Zod)

Phase 3: Core Logic
  [ ] Migrate chordGenerator.ts
  [ ] Migrate chordScorer.ts
  [ ] Migrate audioEngine.ts
  [ ] Migrate midiGenerator.ts
  [ ] Create custom hooks

Phase 4: UI Components
  [ ] Build layout components (Navbar, Sidebar)
  [ ] Build control components
  [ ] Build panel components
  [ ] Build keyboard component
  [ ] Build modals

Phase 5: State & Interactions
  [ ] Set up Zustand stores
  [ ] Wire up event handlers
  [ ] Implement highlighting logic
  [ ] Add audio playback
  [ ] Add MIDI download

Phase 6: Polish
  [ ] Add animations (framer-motion)
  [ ] Implement theme toggle
  [ ] Add responsive design
  [ ] Optimize performance
  [ ] Add error boundaries

Phase 7: Testing
  [ ] Write unit tests
  [ ] Write component tests
  [ ] Write E2E tests
  [ ] Test on multiple browsers
  [ ] Test mobile responsiveness

Phase 8: Deployment
  [ ] Set up CI/CD
  [ ] Configure Vercel
  [ ] Add monitoring
  [ ] Add analytics
  [ ] Deploy to production
```

---

**THIS IS YOUR PRODUCTION-READY ARCHITECTURE!** 🏗️

**Ready to build tomorrow with full confidence!** 🚀
