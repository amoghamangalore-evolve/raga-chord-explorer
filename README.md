# 🎵 Raga Chord Explorer

A modern web application for exploring chord progressions based on Indian classical ragas.

## 📁 Project Structure

```
raga-chord-explorer/
├── raga-chord-nextjs/          # ✅ MAIN APPLICATION (Next.js + TypeScript)
│   ├── app/                    # Next.js pages
│   ├── components/             # React components
│   ├── lib/                    # Business logic, stores, utilities
│   └── public/                 # Static assets
│
├── docs/                       # 📋 Specifications & Architecture Docs
│   ├── FINAL_WIREFRAME_SPEC.md
│   ├── FINAL_REQUIREMENTS.md
│   ├── NEXTJS_ARCHITECTURE.md
│   ├── SOLUTION_DESIGN.md
│   └── ... (other planning docs)
│
├── old-html-version/           # 🗑️ Legacy HTML/JS Version (archived)
│   ├── index.html
│   ├── app.js
│   └── ... (old files)
│
├── CURRENT_STATUS.md           # 📊 Session tracking & conversation log
└── README.md                   # 📖 This file
```

## 🚀 Quick Start

### Run the Application

```bash
# Navigate to the Next.js app
cd raga-chord-nextjs

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Open in browser
# Safari: http://localhost:3000
```

### Access in Safari

**Important**: Safari needs these settings enabled:
1. Safari → Settings → Advanced
2. Check "Show features for web developers"
3. Develop menu → Disable Local File Restrictions
4. Develop menu → Disable Cross-Origin Restrictions

Then open: `http://localhost:3000`

## ✨ Features

- 🎼 **Raga Selection**: Choose from Hindustani or Carnatic ragas
- 🎹 **Virtual Keyboard**: 2-octave interactive keyboard
- 🎵 **Chord Generation**: Automatically generate chords from raga notes
- 🎶 **Chord Progressions**: Build and play 8-chord progressions
- 🎨 **Color Chords**: Extended and fusion chord options
- 🥁 **Metronome**: Adjustable tempo (60-200 BPM)
- 🔊 **Drone**: Sa-Pa or Sa-Ma tanpura drone
- 🔍 **Search & Filter**: Find specific chords easily

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Audio**: Web Audio API

## 📚 Documentation

All specifications and architecture documents are in the [`docs/`](docs/) folder:

- **[FINAL_WIREFRAME_SPEC.md](docs/FINAL_WIREFRAME_SPEC.md)** - Complete UI/UX specifications
- **[FINAL_REQUIREMENTS.md](docs/FINAL_REQUIREMENTS.md)** - Feature requirements
- **[NEXTJS_ARCHITECTURE.md](docs/NEXTJS_ARCHITECTURE.md)** - Technical architecture
- **[SOLUTION_DESIGN.md](docs/SOLUTION_DESIGN.md)** - System design document
- **[METRONOME_SPEC.md](docs/METRONOME_SPEC.md)** - Metronome specifications

See also:
- **[CURRENT_STATUS.md](CURRENT_STATUS.md)** - Current development status and conversation log
- **[raga-chord-nextjs/README.md](raga-chord-nextjs/README.md)** - App-specific documentation

## 📝 Development Notes

### Starting the Server

The app runs on port 3000. If you see errors:

```bash
# Kill any existing processes on port 3000
lsof -ti:3000 | xargs kill -9

# Then restart
cd raga-chord-nextjs && npm run dev
```

### Common Issues

**Safari WebKit Error 305**:
- Make sure you type `http://localhost:3000` (not `https://`)
- Enable "Disable Local File Restrictions" in Safari's Develop menu

**Chord cards not showing**:
- Make sure you've selected a tradition first
- Then select a raga
- Scroll down to see the chord grid

## 🗂️ Old Version

The original HTML/JavaScript version is archived in [`old-html-version/`](old-html-version/) for reference. The Next.js version is the active, maintained application.

## 📊 Project Status

✅ **Production Ready** - All core features implemented and working

See [CURRENT_STATUS.md](CURRENT_STATUS.md) for the latest development updates.

## 🎯 Main Application

**The main application you want to use is:** `raga-chord-nextjs/`

Everything else is documentation or archived legacy code.

---

**Last Updated**: 2025-01-11
**Version**: 2.0 (Next.js Migration Complete)
