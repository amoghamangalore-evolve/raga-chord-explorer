// Main application logic

let currentTradition = "hindustani";
let currentRaga = null;
let currentTonic = "C";
let currentChords = [];
let currentFilter = "all";
let fusionMode = false;
let mustIncludeSa = true;
let droneEnabled = true;

// Tag labels with icons
const TAG_LABELS = {
    strong: '✅ Strong',
    drone: '🎶 Drone',
    color: '✨ Color',
    fusion: '🎸 Fusion'
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    populateRagaSelect();
    audioEngine.init();
});

function setupEventListeners() {
    // Tradition toggle
    document.querySelectorAll('[data-tradition]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-tradition]').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentTradition = e.target.dataset.tradition;
            populateRagaSelect();
            // Clear current raga when switching traditions
            document.getElementById('raga-select').value = '';
            document.getElementById('raga-info').style.display = 'none';
            document.getElementById('chords-grid').innerHTML = '<div class="empty-state"><p>Select a raga to see available chords</p></div>';
        });
    });

    // Raga select
    document.getElementById('raga-select').addEventListener('change', (e) => {
        const ragaId = e.target.value;
        if (ragaId) {
            currentRaga = RAGAS.find(r => r.id === ragaId);
            displayRagaInfo();
            generateChords();
            displayPhrases();
            if (droneEnabled) {
                audioEngine.startDrone(currentRaga.typicalDrone);
            }
        } else {
            document.getElementById('raga-info').style.display = 'none';
            document.getElementById('chords-grid').innerHTML = '<div class="empty-state"><p>Select a raga to see available chords</p></div>';
        }
    });

    // Tonic select
    document.getElementById('tonic-select').addEventListener('change', (e) => {
        currentTonic = e.target.value;
        audioEngine.setTonic(currentTonic);
        if (currentRaga) {
            generateChords();
        }
    });

    // Options
    document.getElementById('fusion-mode').addEventListener('change', (e) => {
        fusionMode = e.target.checked;
        if (currentRaga) generateChords();
    });

    document.getElementById('must-include-sa').addEventListener('change', (e) => {
        mustIncludeSa = e.target.checked;
        if (currentRaga) generateChords();
    });

    document.getElementById('drone-enabled').addEventListener('change', (e) => {
        droneEnabled = e.target.checked;
        audioEngine.setDroneEnabled(droneEnabled);
    });

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });

    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            displayChords();
        });
    });

    // Metronome controls
    const tempoSlider = document.getElementById('tempo-slider');
    const tempoDisplay = document.getElementById('tempo-display');
    const startBtn = document.getElementById('metronome-start');
    const stopBtn = document.getElementById('metronome-stop');
    const beatIndicator = document.getElementById('beat-indicator');

    tempoSlider.addEventListener('input', (e) => {
        tempoDisplay.textContent = e.target.value;
    });

    startBtn.addEventListener('click', () => {
        const tempo = parseInt(tempoSlider.value);
        audioEngine.startMetronome(tempo);
        startBtn.disabled = true;
        stopBtn.disabled = false;
        beatIndicator.classList.add('active');
    });

    stopBtn.addEventListener('click', () => {
        audioEngine.stopMetronome();
        startBtn.disabled = false;
        stopBtn.disabled = true;
        beatIndicator.classList.remove('active');
        beatIndicator.classList.remove('accent');
    });

    // Listen for beat events
    window.addEventListener('metronomeBeat', (e) => {
        if (e.detail.accent) {
            beatIndicator.classList.add('accent');
        } else {
            beatIndicator.classList.remove('accent');
        }

        // Flash animation
        beatIndicator.classList.remove('beat-flash');
        void beatIndicator.offsetWidth; // Force reflow
        beatIndicator.classList.add('beat-flash');
    });
}

function populateRagaSelect() {
    const select = document.getElementById('raga-select');
    select.innerHTML = '<option value="">Choose a raga...</option>';

    const filteredRagas = RAGAS.filter(r => r.tradition === currentTradition);

    filteredRagas.forEach(raga => {
        const option = document.createElement('option');
        option.value = raga.id;
        option.textContent = raga.name;
        select.appendChild(option);
    });
}

function displayRagaInfo() {
    if (!currentRaga) return;

    document.getElementById('raga-info').style.display = 'block';
    document.getElementById('raga-name').textContent = currentRaga.name;
    document.getElementById('raga-parent').textContent = currentRaga.parent || 'N/A';

    // Display aroha and avaroha
    const arohaNames = currentRaga.arohaPCs.map(pc => PC_TO_SARGAM[pc]).join(' ');
    const avarohaNames = currentRaga.avarohaPCs.map(pc => PC_TO_SARGAM[pc]).join(' ');
    document.getElementById('raga-aroha').textContent = arohaNames;
    document.getElementById('raga-avaroha').textContent = avarohaNames;

    document.getElementById('raga-vadi').textContent = currentRaga.vadiPC !== null ? PC_TO_SARGAM[currentRaga.vadiPC] : 'N/A';
    document.getElementById('raga-samvadi').textContent = currentRaga.samvadiPC !== null ? PC_TO_SARGAM[currentRaga.samvadiPC] : 'N/A';
    document.getElementById('raga-drone').textContent = currentRaga.typicalDrone;
    document.getElementById('raga-notes').textContent = currentRaga.notes;
}

function generateChords() {
    if (!currentRaga) return;

    const allowedPCs = new Set([...currentRaga.arohaPCs, ...currentRaga.avarohaPCs]);
    const roots = Array.from(allowedPCs);

    currentChords = [];

    roots.forEach(root => {
        CHORD_TEMPLATES.forEach(template => {
            // Skip fusion chords if fusion mode is off
            if (template.tags.includes('fusion') && !fusionMode) return;

            // Check if all chord tones are in allowed set
            const chordTones = template.intervals.map(iv => (root + iv) % 12);
            const isValid = chordTones.every(tone => allowedPCs.has(tone));

            if (isValid) {
                // Skip if must include Sa and doesn't
                if (mustIncludeSa && !chordTones.includes(0)) return;

                const score = scoreChord(chordTones);
                const tags = getChordTags(chordTones, template.tags);

                currentChords.push({
                    root,
                    rootName: getNoteName(root),
                    name: template.name,
                    fullName: `${getNoteName(root)}${template.name}`,
                    tones: chordTones,
                    score,
                    tags
                });
            }
        });
    });

    // Sort by score
    currentChords.sort((a, b) => b.score - a.score);

    displayChords();
}

function scoreChord(tones) {
    let score = 1;
    const toneSet = new Set(tones);

    // Includes Sa
    if (toneSet.has(0)) {
        score += 2;
    } else {
        score -= 1;
    }

    // Includes Vadi
    if (currentRaga.vadiPC !== null && toneSet.has(currentRaga.vadiPC)) {
        score += 1;
    }

    // Includes Samvadi
    if (currentRaga.samvadiPC !== null && toneSet.has(currentRaga.samvadiPC)) {
        score += 1;
    }

    // Both Vadi and Samvadi
    if (currentRaga.vadiPC !== null && currentRaga.samvadiPC !== null &&
        toneSet.has(currentRaga.vadiPC) && toneSet.has(currentRaga.samvadiPC)) {
        score += 1;
    }

    // Drone compatibility
    if (currentRaga.typicalDrone === "Sa-Pa") {
        if (toneSet.has(0) || toneSet.has(7)) score += 1;
    } else if (currentRaga.typicalDrone === "Sa-Ma") {
        if (toneSet.has(0) || toneSet.has(5) || toneSet.has(6)) score += 1;
    }

    return score;
}

function getChordTags(tones, templateTags) {
    const tags = [...templateTags];
    const toneSet = new Set(tones);

    // Strong: contains Sa + (Vadi or Samvadi)
    if (toneSet.has(0) && (
        (currentRaga.vadiPC !== null && toneSet.has(currentRaga.vadiPC)) ||
        (currentRaga.samvadiPC !== null && toneSet.has(currentRaga.samvadiPC))
    )) {
        tags.push('strong');
    }

    // Drone-compatible
    if (currentRaga.typicalDrone === "Sa-Pa" && (toneSet.has(0) || toneSet.has(7))) {
        tags.push('drone');
    } else if (currentRaga.typicalDrone === "Sa-Ma" && (toneSet.has(0) || toneSet.has(5) || toneSet.has(6))) {
        tags.push('drone');
    }

    return tags;
}

function displayChords() {
    const grid = document.getElementById('chords-grid');

    // Filter chords
    let filteredChords = currentChords;
    if (currentFilter !== 'all') {
        filteredChords = currentChords.filter(chord => chord.tags.includes(currentFilter));
    }

    if (filteredChords.length === 0) {
        grid.innerHTML = '<div class="empty-state"><p>No chords match the current filter</p></div>';
        return;
    }

    grid.innerHTML = '';

    filteredChords.forEach(chord => {
        const card = document.createElement('div');
        card.className = 'chord-card';

        const notesStr = chord.tones.map(pc => getNoteName(pc)).join(' ');
        const sargamStr = chord.tones.map(pc => PC_TO_SARGAM[pc]).join(' ');

        const tagsHTML = chord.tags.map(tag => 
            `<span class="tag ${tag}">${TAG_LABELS[tag] || tag}</span>`
        ).join('');

        card.innerHTML = `
            <div class="pulse"></div>
            <div class="chord-header">
                <div class="chord-name">${chord.fullName}</div>
                <button class="btn-download-midi" title="Download MIDI">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 12L3 7h3V1h4v6h3L8 12z"/>
                        <path d="M1 14h14v2H1v-2z"/>
                    </svg>
                </button>
            </div>
            <div class="chord-notes">${notesStr}</div>
            <div class="chord-sargam">${sargamStr}</div>
            <div class="chord-tags">${tagsHTML}</div>
        `;

        // Download MIDI button
        const downloadBtn = card.querySelector('.btn-download-midi');
        downloadBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click
            midiGenerator.downloadMidi(chord.tones, currentTonic, chord.fullName);

            // Visual feedback
            downloadBtn.classList.add('downloading');
            setTimeout(() => {
                downloadBtn.classList.remove('downloading');
            }, 600);
        });

        card.addEventListener('click', async () => {
            // Remove playing class from all cards
            document.querySelectorAll('.chord-card').forEach(c => c.classList.remove('playing'));

            card.classList.add('playing');
            await audioEngine.playChord(chord.tones);

            // Keep the playing state for a bit longer
            setTimeout(() => {
                card.classList.remove('playing');
            }, 300);
        });

        grid.appendChild(card);
    });
}

function displayPhrases() {
    const content = document.getElementById('phrases-content');

    if (!currentRaga || !currentRaga.pakadPCs || currentRaga.pakadPCs.length === 0) {
        content.innerHTML = '<div class="empty-state"><p>No characteristic phrases available for this raga</p></div>';
        return;
    }

    content.innerHTML = '';

    currentRaga.pakadPCs.forEach((phrase, index) => {
        const phraseDiv = document.createElement('div');
        phraseDiv.className = 'phrase-item';

        const sargamStr = phrase.map(pc => PC_TO_SARGAM[pc]).join(' ');
        const notesStr = phrase.map(pc => getNoteName(pc)).join(' ');

        phraseDiv.innerHTML = `
            <div class="phrase-label">Pakad/Chalan ${index + 1}</div>
            <div class="phrase-notes">${sargamStr}</div>
            <div class="chord-notes" style="margin-top: 8px;">${notesStr}</div>
        `;

        content.appendChild(phraseDiv);
    });
}

function getNoteName(pc) {
    const tonicIndex = NOTE_NAMES.indexOf(currentTonic);
    const noteIndex = (tonicIndex + pc) % 12;
    return NOTE_NAMES[noteIndex];
}
