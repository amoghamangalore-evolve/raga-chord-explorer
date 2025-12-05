// Chord Explorer Interactive Module
// Handles notes display, chord progressions, color chords, and virtual keyboard

class ChordExplorer {
    constructor() {
        this.currentRaga = null;
        this.currentTonic = 'C';
        this.selectedNote = null;
        this.init();
    }

    init() {
        // Listen for raga changes
        const ragaSelect = document.getElementById('raga-select');
        if (ragaSelect) {
            ragaSelect.addEventListener('change', () => {
                this.onRagaChange();
            });
        }

        // Listen for tonic changes
        const tonicSelect = document.getElementById('tonic-select');
        if (tonicSelect) {
            tonicSelect.addEventListener('change', (e) => {
                this.currentTonic = e.target.value;
                this.updateKeyboard();
            });
        }

        // Initialize virtual keyboard
        this.createVirtualKeyboard();
    }

    onRagaChange() {
        const ragaSelect = document.getElementById('raga-select');
        const ragaId = ragaSelect.value;

        if (!ragaId || !window.RAGAS) return;

        this.currentRaga = window.RAGAS.find(r => r.id === ragaId);
        if (!this.currentRaga) return;

        // Update all panels
        this.displayRagaNotes();
        this.generateChordProgressions();
        this.generateColorChords();
        this.updateKeyboard();
    }

    displayRagaNotes() {
        const notesGrid = document.getElementById('notes-grid');
        if (!this.currentRaga || !notesGrid) return;

        const PC_TO_SARGAM = window.PC_TO_SARGAM || {
            0: 'Sa', 1: 'Re♭', 2: 'Re', 3: 'Ga♭', 4: 'Ga',
            5: 'Ma', 6: 'Ma#', 7: 'Pa', 8: 'Dha♭', 9: 'Dha',
            10: 'Ni♭', 11: 'Ni'
        };

        // Get unique notes from aroha and avaroha
        const allNotes = [...new Set([...this.currentRaga.arohaPCs, ...this.currentRaga.avarohaPCs])];
        allNotes.sort((a, b) => a - b);

        notesGrid.innerHTML = allNotes.map(pc => {
            const sargam = PC_TO_SARGAM[pc] || pc;
            return `
                <div class="note-badge" data-pc="${pc}" onclick="chordExplorer.onNoteClick(${pc})">
                    ${sargam}
                </div>
            `;
        }).join('');
    }

    onNoteClick(pc) {
        // Toggle active state
        document.querySelectorAll('.note-badge').forEach(badge => {
            badge.classList.remove('active');
        });

        const clickedBadge = document.querySelector(`[data-pc="${pc}"]`);
        if (clickedBadge) {
            clickedBadge.classList.add('active');
        }

        this.selectedNote = pc;

        // Highlight chords containing this note
        this.highlightChordsWithNote(pc);

        // Highlight on keyboard
        this.highlightNoteOnKeyboard(pc);
    }

    generateChordProgressions() {
        const panel = document.getElementById('chord-progression-panel');
        if (!this.currentRaga || !panel) return;

        // Generate common progressions based on raga notes
        const progressions = this.createProgressions();

        panel.innerHTML = progressions.map((chord, idx) => `
            <div class="progression-chord" onclick="chordExplorer.playChord('${chord}')">
                ${chord}
            </div>
        `).join('');
    }

    createProgressions() {
        if (!this.currentRaga) return [];

        const NOTE_NAMES = window.NOTE_NAMES || ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const tonicIndex = NOTE_NAMES.indexOf(this.currentTonic);

        // Get unique notes
        const ragaNotes = [...new Set([...this.currentRaga.arohaPCs, ...this.currentRaga.avarohaPCs])];

        // Create basic triads from raga notes
        const chords = [];

        // Root chord (Sa major/minor)
        const rootNote = NOTE_NAMES[(tonicIndex + 0) % 12];
        const hasThird = ragaNotes.includes(4) || ragaNotes.includes(3);
        chords.push(hasThird ? (ragaNotes.includes(4) ? `${rootNote}` : `${rootNote}m`) : `${rootNote}5`);

        // Find other important chords
        ragaNotes.forEach(pc => {
            if (pc === 0) return; // Skip root
            const noteName = NOTE_NAMES[(tonicIndex + pc) % 12];

            // Check if we can form a triad
            const thirdPC = (pc + 4) % 12;
            const minorThirdPC = (pc + 3) % 12;
            const fifthPC = (pc + 7) % 12;

            if (ragaNotes.includes(fifthPC)) {
                if (ragaNotes.includes(thirdPC)) {
                    chords.push(`${noteName}`);
                } else if (ragaNotes.includes(minorThirdPC)) {
                    chords.push(`${noteName}m`);
                }
            }
        });

        // Return first 6-8 chords
        return chords.slice(0, 8);
    }

    generateColorChords() {
        const panel = document.getElementById('color-chords-panel');
        if (!this.currentRaga || !panel) return;

        // Generate extended/color chords
        const colorChords = this.createColorChords();

        panel.innerHTML = colorChords.map(chord => `
            <div class="progression-chord" onclick="chordExplorer.playChord('${chord}')">
                ${chord}
            </div>
        `).join('');
    }

    createColorChords() {
        if (!this.currentRaga) return [];

        const NOTE_NAMES = window.NOTE_NAMES || ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const tonicIndex = NOTE_NAMES.indexOf(this.currentTonic);
        const ragaNotes = [...new Set([...this.currentRaga.arohaPCs, ...this.currentRaga.avarohaPCs])];

        const colorChords = [];

        // Create suspended chords, add9, 7th chords
        ragaNotes.forEach(pc => {
            const noteName = NOTE_NAMES[(tonicIndex + pc) % 12];

            // Sus2 and Sus4
            if (ragaNotes.includes((pc + 2) % 12) && ragaNotes.includes((pc + 7) % 12)) {
                colorChords.push(`${noteName}sus2`);
            }
            if (ragaNotes.includes((pc + 5) % 12) && ragaNotes.includes((pc + 7) % 12)) {
                colorChords.push(`${noteName}sus4`);
            }

            // Add9 chords
            if (ragaNotes.includes((pc + 4) % 12) && ragaNotes.includes((pc + 7) % 12) && ragaNotes.includes((pc + 2) % 12)) {
                colorChords.push(`${noteName}add9`);
            }

            // 7th chords
            if (ragaNotes.includes((pc + 4) % 12) && ragaNotes.includes((pc + 7) % 12) && ragaNotes.includes((pc + 11) % 12)) {
                colorChords.push(`${noteName}maj7`);
            }
        });

        // Remove duplicates and return first 8-10
        return [...new Set(colorChords)].slice(0, 10);
    }

    createVirtualKeyboard() {
        const keyboard = document.getElementById('virtual-keyboard');
        if (!keyboard) return;

        const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const blackKeys = {
            'C#': { position: 0, offset: 35 },
            'D#': { position: 1, offset: 35 },
            'F#': { position: 3, offset: 35 },
            'G#': { position: 4, offset: 35 },
            'A#': { position: 5, offset: 35 }
        };

        let html = '';

        // Create white keys
        whiteKeys.forEach((note, idx) => {
            html += `
                <div class="piano-key white" data-note="${note}" data-pc="${NOTE_NAMES.indexOf(note)}" onclick="chordExplorer.onKeyClick('${note}', ${NOTE_NAMES.indexOf(note)})">
                    <span class="key-label">${note}</span>
                </div>
            `;
        });

        // Create black keys with absolute positioning
        Object.keys(blackKeys).forEach(note => {
            const info = blackKeys[note];
            const pc = NOTE_NAMES.indexOf(note);
            html += `
                <div class="piano-key black" data-note="${note}" data-pc="${pc}"
                     style="left: ${info.position * 52 + info.offset}px;"
                     onclick="chordExplorer.onKeyClick('${note}', ${pc})">
                    <span class="key-label">${note}</span>
                </div>
            `;
        });

        keyboard.innerHTML = html;
    }

    updateKeyboard() {
        if (!this.currentRaga) return;

        const NOTE_NAMES = window.NOTE_NAMES || ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const tonicIndex = NOTE_NAMES.indexOf(this.currentTonic);
        const ragaNotes = [...new Set([...this.currentRaga.arohaPCs, ...this.currentRaga.avarohaPCs])];

        // Clear all highlights
        document.querySelectorAll('.piano-key').forEach(key => {
            key.classList.remove('highlighted');
        });

        // Highlight notes in the raga
        ragaNotes.forEach(pc => {
            const absolutePC = (tonicIndex + pc) % 12;
            const key = document.querySelector(`.piano-key[data-pc="${absolutePC}"]`);
            if (key) {
                key.classList.add('highlighted');
            }
        });
    }

    highlightNoteOnKeyboard(pc) {
        const NOTE_NAMES = window.NOTE_NAMES || ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const tonicIndex = NOTE_NAMES.indexOf(this.currentTonic);
        const absolutePC = (tonicIndex + pc) % 12;

        // Remove active from all keys
        document.querySelectorAll('.piano-key').forEach(key => {
            key.classList.remove('active');
        });

        // Add active to selected key
        const key = document.querySelector(`.piano-key[data-pc="${absolutePC}"]`);
        if (key) {
            key.classList.add('active');
            key.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    onKeyClick(noteName, pc) {
        // Show related chords for this note
        this.showRelatedChords(pc);

        // Highlight the key
        document.querySelectorAll('.piano-key').forEach(key => {
            key.classList.remove('active');
        });
        const clickedKey = document.querySelector(`.piano-key[data-pc="${pc}"]`);
        if (clickedKey) {
            clickedKey.classList.add('active');
        }

        // Play the note if audio engine is available
        if (window.audioEngine && typeof audioEngine.playNote === 'function') {
            audioEngine.playNote(pc);
        }
    }

    showRelatedChords(pc) {
        const NOTE_NAMES = window.NOTE_NAMES || ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const noteName = NOTE_NAMES[pc];

        // Generate chords that include this note
        const relatedChords = [
            noteName,
            `${noteName}m`,
            `${noteName}7`,
            `${noteName}maj7`,
            `${noteName}sus2`,
            `${noteName}sus4`
        ];

        const suggestionsDiv = document.getElementById('keyboard-chord-suggestions');
        const chordsList = document.getElementById('related-chords-list');

        if (suggestionsDiv && chordsList) {
            suggestionsDiv.classList.remove('hidden');
            chordsList.innerHTML = relatedChords.map(chord => `
                <div class="related-chord-badge" onclick="chordExplorer.playChord('${chord}')">
                    ${chord}
                </div>
            `).join('');
        }
    }

    highlightChordsWithNote(pc) {
        // Highlight chords in progression and color panels that contain this note
        const NOTE_NAMES = window.NOTE_NAMES || ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const noteName = NOTE_NAMES[(NOTE_NAMES.indexOf(this.currentTonic) + pc) % 12];

        // Remove all highlights
        document.querySelectorAll('.progression-chord').forEach(chord => {
            chord.classList.remove('highlighted');
        });

        // Highlight chords that start with this note
        document.querySelectorAll('.progression-chord').forEach(chord => {
            const chordText = chord.textContent.trim();
            if (chordText.startsWith(noteName)) {
                chord.classList.add('highlighted');
            }
        });
    }

    playChord(chordName) {
        console.log('Playing chord:', chordName);
        // If audio engine is available, play the chord
        if (window.audioEngine && typeof audioEngine.playChordByName === 'function') {
            audioEngine.playChordByName(chordName);
        }
        alert(`Playing chord: ${chordName}`);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.chordExplorer = new ChordExplorer();
    console.log('🎵 Chord Explorer initialized!');
});
