# Setup Guide - Raga Chord Explorer (Next.js)

## Quick Start

Your Next.js application is ready to run! Follow these steps:

### 1. Install Dependencies

```bash
cd raga-chord-nextjs
npm install
```

This will install all required packages:
- Next.js 14.2.5
- React 18.3.1
- TypeScript 5.5.3
- Tailwind CSS 3.4.4
- Zustand 4.5.2
- Lucide React (icons)

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## What's Included

### ✅ Complete Feature Set

All features from your original application, plus improvements:

1. **Raga Selection**
   - Hindustani and Carnatic traditions
   - 12 ragas to start (8 Hindustani, 4 Carnatic)
   - Easy to add more ragas in `lib/data/ragas.ts`

2. **Chord Generation**
   - Intelligent chord generation based on raga scale
   - Fusion mode for 7th chords
   - Must Include Sa option
   - Color chords (sus2, sus4, add9)

3. **Virtual Keyboard**
   - 2 octaves (C1 to C3)
   - Visual scale highlighting (purple for in-scale notes)
   - Click to play notes
   - Shows both Western and Sargam notation

4. **Chord Progression Builder**
   - Build progressions up to 8 chords
   - Play individual chords or entire progression
   - Easy add/remove functionality

5. **Metronome**
   - 60-200 BPM range
   - Visual beat indicator (1-4)
   - Accent on beat 1
   - Start/Stop functionality

6. **Audio Engine**
   - Web Audio API implementation
   - Smooth ADSR envelope
   - Master volume control
   - Drone support (Sa-Pa, Sa-Ma, Sa only)

### ✅ Modern Architecture

- **Type Safety**: Full TypeScript coverage
- **State Management**: Zustand stores (performant, simple)
- **Component Structure**: Modular, reusable components
- **Styling**: Tailwind CSS (utility-first, responsive)
- **Code Splitting**: Automatic with Next.js
- **SEO Ready**: Server-side rendering support

## Project Structure

```
raga-chord-nextjs/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles + custom CSS
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Top navigation bar
│   │   ├── Sidebar.tsx     # Left sidebar navigation
│   │   └── ControlsBar.tsx # Controls (tradition, raga, sa, modes)
│   │
│   ├── panels/
│   │   ├── ScaleExplorer.tsx      # Raga info + scale notes
│   │   ├── VirtualKeyboard.tsx    # 2-octave piano keyboard
│   │   ├── ChordProgressions.tsx  # Progression builder (8 slots)
│   │   ├── ColorChords.tsx        # Color/Fusion chord showcase
│   │   └── ChordCardsGrid.tsx     # All available chords grid
│   │
│   ├── audio/
│   │   └── Metronome.tsx   # Floating metronome panel
│   │
│   └── modals/
│       └── ChatModal.tsx   # Chat placeholder (future feature)
│
├── lib/
│   ├── types/
│   │   └── index.ts        # All TypeScript interfaces
│   │
│   ├── data/
│   │   └── ragas.ts        # Ragas, chords, constants
│   │
│   ├── store/
│   │   ├── uiStore.ts      # UI state (sidebar, modals)
│   │   ├── ragaStore.ts    # Raga selection & settings
│   │   ├── chordStore.ts   # Chord generation & selection
│   │   ├── audioStore.ts   # Audio engine state
│   │   └── metronomeStore.ts # Metronome state
│   │
│   ├── audio/
│   │   ├── audioEngine.ts      # Web Audio API implementation
│   │   └── metronomeEngine.ts  # Metronome click generation
│   │
│   ├── utils/
│   │   ├── music.ts        # Music theory utilities
│   │   └── cn.ts           # Class name utility
│   │
│   └── hooks/
│       ├── useChordGeneration.ts  # Auto-generate chords
│       └── useAudioInit.ts        # Initialize audio context
│
└── public/                 # Static assets (future: sounds, images)
```

## Key Files to Customize

### Add More Ragas
Edit `lib/data/ragas.ts`:
```typescript
{
  id: 'new-raga',
  name: 'New Raga Name',
  tradition: 'hindustani', // or 'carnatic'
  parent: 'Thaat Name',
  arohaPCs: [0, 2, 4, 5, 7, 9, 11, 12], // Ascending scale
  avarohaPCs: [12, 11, 9, 7, 5, 4, 2, 0], // Descending scale
  vadiPC: 4, // Most important note
  samvadiPC: 11, // Second most important
  typicalDrone: 'Sa-Pa',
  notes: 'Description of the raga',
  pakadPCs: [[0, 2, 4, 5]] // Characteristic phrases
}
```

### Customize Colors
Edit `tailwind.config.ts` to change the color scheme.

### Modify Chord Templates
Edit the `CHORD_TEMPLATES` array in `lib/data/ragas.ts` to add new chord types.

## Troubleshooting

### Audio Not Playing
- Click anywhere on the page first (browser security requires user interaction)
- Check browser console for errors
- Ensure your browser supports Web Audio API (all modern browsers do)

### Chords Not Generating
- Make sure you've selected both a tradition AND a raga
- Check the controls bar to ensure settings are correct
- Open browser console to see any errors

### Styling Issues
- Clear your browser cache
- Run `npm run build` to rebuild
- Check that Tailwind CSS is compiling correctly

## Next Steps

### Easy Enhancements

1. **Add More Ragas**: Expand the library in `lib/data/ragas.ts`
2. **Custom Themes**: Create dark/light mode toggle
3. **Save Progressions**: Add localStorage to save user's progressions
4. **Export MIDI**: Export chord progressions as MIDI files
5. **Keyboard Shortcuts**: Add hotkeys for common actions

### Advanced Features

1. **AI Chat Assistant**: Implement the chat modal with OpenAI API
2. **User Accounts**: Add authentication with NextAuth.js
3. **Community**: Share progressions with other users
4. **Learning Mode**: Add interactive tutorials
5. **Advanced Audio**: Better instrument sounds (use Tone.js or samples)

## Performance

The app is optimized for performance:
- Code splitting (automatic with Next.js)
- Memoization (useMemo, useCallback)
- Zustand (lightweight state management)
- Lazy loading (audio engines load on demand)

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support (responsive design)

## Need Help?

- Check the main [README.md](README.md) for usage instructions
- Review the code - it's well-commented
- All TypeScript types are in `lib/types/index.ts`

## Migration from Old Version

Your original files are still in the parent directory:
- `index.html` - Original HTML
- `app.js` - Original JavaScript
- `ragas.js` - Original data (migrated to TypeScript)

The new Next.js version has ALL the functionality, plus:
- Better architecture (no more breaking changes!)
- Type safety (TypeScript catches errors before runtime)
- Modern React patterns (hooks, components)
- Scalable structure (easy to add features)
- Production-ready (deploy to Vercel in 1 click)

---

**Ready to explore? Run `npm install && npm run dev`** 🎵
