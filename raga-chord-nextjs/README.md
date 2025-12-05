# Raga Chord Explorer

A modern web application for exploring harmony in Indian classical music. Discover chords that work with different ragas from both Hindustani and Carnatic traditions.

## Features

- **Raga Library**: Browse and select from a curated collection of Hindustani and Carnatic ragas
- **Intelligent Chord Generation**: Automatically generates chords that fit within the selected raga's scale
- **Virtual Keyboard**: Interactive 2-octave keyboard (C1-C3) with visual scale highlighting
- **Chord Progression Builder**: Create and play custom chord progressions (up to 8 chords)
- **Color & Fusion Chords**: Explore extended harmony with suspended and 7th chords
- **Audio Playback**: Built-in audio engine using Web Audio API for realistic sound
- **Metronome**: Full-featured metronome with adjustable tempo (60-200 BPM)
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand
- **Audio**: Web Audio API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
raga-chord-nextjs/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components (Navbar, Sidebar, Controls)
│   ├── panels/           # Main panels (Scale Explorer, Chords, etc.)
│   ├── modals/           # Modal dialogs
│   └── audio/            # Audio components (Metronome)
├── lib/                   # Core library code
│   ├── store/            # Zustand stores
│   ├── audio/            # Audio engine implementations
│   ├── utils/            # Utility functions
│   ├── data/             # Static data (ragas, chords)
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript type definitions
└── public/               # Static assets

```

## How to Use

1. **Select a Tradition**: Choose between Hindustani or Carnatic
2. **Pick a Raga**: Select from the dropdown menu
3. **Set Your Sa**: Choose your root note (default: C)
4. **Explore**:
   - Play notes on the virtual keyboard
   - Click chord cards to hear them
   - Build progressions by clicking chord cards
   - Use the metronome for rhythm practice

## Music Theory

### What is a Raga?
A raga is a melodic framework in Indian classical music, defined by its scale, characteristic phrases (pakad), and emotional mood.

### Chord Generation
The app analyzes the selected raga's notes and generates all possible chords where:
- All chord notes belong to the raga's scale
- Optionally includes Sa (root note) based on settings
- Respects fusion mode settings for extended harmony

### Modes
- **Fusion Mode**: Enables 7th chords (maj7, 7, m7)
- **Must Include Sa**: Filters chords to only show those containing the root note

## Development

### Key Files
- `lib/types/index.ts` - TypeScript interfaces
- `lib/data/ragas.ts` - Raga definitions
- `lib/audio/audioEngine.ts` - Audio playback engine
- `lib/utils/music.ts` - Music theory utilities

### State Management
The app uses Zustand for state management with separate stores:
- `uiStore` - UI state (sidebar, modals)
- `ragaStore` - Raga selection and settings
- `chordStore` - Chord generation and selection
- `audioStore` - Audio engine state
- `metronomeStore` - Metronome state

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Acknowledgments

- Raga data curated from traditional Indian classical music sources
- Built with love for musicians exploring the intersection of Indian classical music and Western harmony

---

**Built with Next.js 14 • TypeScript • Tailwind CSS**
