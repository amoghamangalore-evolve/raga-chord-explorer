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
    // Tradition toggle - using SELECT element
    const traditionSelect = document.querySelector('[data-tradition]');
    if (traditionSelect) {
        traditionSelect.addEventListener('change', (e) => {
            currentTradition = e.target.value;
            populateRagaSelect();
            // Clear current raga when switching traditions
            document.getElementById('raga-select').value = '';
            document.getElementById('raga-info').style.display = 'none';
            document.getElementById('chords-grid').innerHTML = '<div class="empty-state"><p>Select a raga to see available chords</p></div>';
        });
    }

    // Raga select
    const ragaSelect = document.getElementById('raga-select');
    if (ragaSelect) {
        ragaSelect.addEventListener('change', (e) => {
            const ragaId = e.target.value;
            console.log('Raga selected:', ragaId);
            if (ragaId) {
                currentRaga = RAGAS.find(r => r.id === ragaId);
                console.log('Current raga:', currentRaga);
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
    } else {
        console.error('Raga select element not found!');
    }

    // Tonic select
    document.getElementById('tonic-select').addEventListener('change', (e) => {
        currentTonic = e.target.value;
        audioEngine.setTonic(currentTonic);
        if (currentRaga) {
            generateChords();
        }
    });

    // Options (only if elements exist)
    const fusionModeCheckbox = document.getElementById('fusion-mode');
    if (fusionModeCheckbox) {
        fusionModeCheckbox.addEventListener('change', (e) => {
            fusionMode = e.target.checked;
            if (currentRaga) generateChords();
        });
    }

    const mustIncludeSaCheckbox = document.getElementById('must-include-sa');
    if (mustIncludeSaCheckbox) {
        mustIncludeSaCheckbox.addEventListener('change', (e) => {
            mustIncludeSa = e.target.checked;
            if (currentRaga) generateChords();
        });
    }

    document.getElementById('drone-enabled').addEventListener('change', (e) => {
        droneEnabled = e.target.checked;
        audioEngine.setDroneEnabled(droneEnabled);
    });

    // Sidebar navigation tabs
    document.querySelectorAll('.sidebar-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.currentTarget.dataset.tab;
            document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const targetTab = document.getElementById(`${tabName}-tab`);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // Bottom tabs (if they exist)
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
    if (!currentRaga) {
        console.warn('generateChords called but no currentRaga');
        return;
    }

    console.log('Generating chords for raga:', currentRaga.name);
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

    console.log(`Generated ${currentChords.length} chords`);
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

    if (!grid) {
        console.error('chords-grid element not found!');
        return;
    }

    console.log(`Displaying chords. Total: ${currentChords.length}, Filter: ${currentFilter}`);

    // Filter chords
    let filteredChords = currentChords;
    if (currentFilter !== 'all') {
        filteredChords = currentChords.filter(chord => chord.tags.includes(currentFilter));
    }

    console.log(`Filtered chords: ${filteredChords.length}`);

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

            try {
                await audioEngine.playChord(chord.tones);
            } catch(e) {
                console.error('Error playing chord:', e);
            }

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

// ========== FRESH UI FEATURES ==========

// Theme Toggle - Simple and Effective
document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const body = document.body;
    const isLight = body.classList.toggle('light-theme');

    // Save preference
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    // Visual feedback
    const btn = document.getElementById('theme-toggle');
    btn.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 300);
});

// Load saved theme preference on page load
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
}

// Modal Management - Smooth and Intuitive
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animate in
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Animate out
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }, 200);
    }
}

// Close all modals helper
function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        closeModal(modal.id);
    });
}

// FAQ Modal
document.getElementById('faq-btn')?.addEventListener('click', () => {
    openModal('faq-modal');
});

// Chat Modal
document.getElementById('chat-assist-btn')?.addEventListener('click', () => {
    openModal('chat-modal');
});

// Settings Modal
document.getElementById('settings-btn')?.addEventListener('click', () => {
    openModal('settings-modal');
});

// Close buttons
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const modalId = e.currentTarget.dataset.modal;
        closeModal(modalId);
    });
});

// Close on backdrop click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// ESC key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Chat functionality (placeholder)
document.getElementById('chat-send-btn')?.addEventListener('click', () => {
    sendChatMessage();
});

document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (!message) return;

    const chatMessages = document.getElementById('chat-messages');

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user-message';
    userMsg.innerHTML = `
        <i class="fas fa-user"></i>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatMessages.appendChild(userMsg);

    // Clear input
    input.value = '';

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Placeholder response
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message assistant-message';
        botMsg.innerHTML = `
            <i class="fas fa-robot"></i>
            <div class="message-content">
                <p>This is a placeholder response. To enable full AI chat functionality, connect your preferred AI service (OpenAI, Claude, etc.) to this interface.</p>
            </div>
        `;
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
}

// Settings functionality - Fully Connected
document.getElementById('volume-slider')?.addEventListener('input', (e) => {
    const volume = e.target.value;
    document.getElementById('volume-value').textContent = volume + '%';

    // Connect to audio engine if available
    if (window.audioEngine && typeof audioEngine.setMasterVolume === 'function') {
        audioEngine.setMasterVolume(volume / 100);
    }
});

document.getElementById('drone-volume')?.addEventListener('input', (e) => {
    const volume = e.target.value;
    document.getElementById('drone-volume-value').textContent = volume + '%';

    // Connect to drone volume if available
    if (window.audioEngine && typeof audioEngine.setDroneVolume === 'function') {
        audioEngine.setDroneVolume(volume / 100);
    }
});

document.getElementById('save-settings')?.addEventListener('click', () => {
    // Save settings to localStorage
    const settings = {
        volume: document.getElementById('volume-slider').value,
        droneVolume: document.getElementById('drone-volume').value,
        showSargam: document.getElementById('show-sargam').checked,
        showWestern: document.getElementById('show-western').checked,
        animations: document.getElementById('animations').checked,
        chordDuration: document.getElementById('chord-duration').value
    };

    localStorage.setItem('ragaExplorerSettings', JSON.stringify(settings));

    // Visual feedback
    const btn = document.getElementById('save-settings');
    const originalText = btn.textContent;
    btn.textContent = '✓ Saved!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        closeModal('settings-modal');
    }, 1000);
});

document.getElementById('reset-settings')?.addEventListener('click', () => {
    if (confirm('Reset all settings to defaults?')) {
        document.getElementById('volume-slider').value = 70;
        document.getElementById('volume-value').textContent = '70%';
        document.getElementById('drone-volume').value = 50;
        document.getElementById('drone-volume-value').textContent = '50%';
        document.getElementById('show-sargam').checked = true;
        document.getElementById('show-western').checked = true;
        document.getElementById('animations').checked = true;
        document.getElementById('chord-duration').value = 2;

        localStorage.removeItem('ragaExplorerSettings');
    }
});

// Load saved settings
function loadSettings() {
    const saved = localStorage.getItem('ragaExplorerSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        document.getElementById('volume-slider').value = settings.volume || 70;
        document.getElementById('volume-value').textContent = (settings.volume || 70) + '%';
        document.getElementById('drone-volume').value = settings.droneVolume || 50;
        document.getElementById('drone-volume-value').textContent = (settings.droneVolume || 50) + '%';
        document.getElementById('show-sargam').checked = settings.showSargam !== false;
        document.getElementById('show-western').checked = settings.showWestern !== false;
        document.getElementById('animations').checked = settings.animations !== false;
        document.getElementById('chord-duration').value = settings.chordDuration || 2;
    }
}

// Load settings on page load
document.addEventListener('DOMContentLoaded', loadSettings);

// ========== ENHANCED UI INTERACTIONS ==========

// Add ripple effect to nav pills
document.querySelectorAll('.nav-pill').forEach(pill => {
    pill.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple-effect';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple effect dynamically
if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        .nav-pill {
            position: relative;
            overflow: hidden;
        }
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scroll for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add subtle parallax effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        const scrolled = window.pageYOffset;
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
        header.style.opacity = Math.max(0.5, 1 - scrolled / 500);
    }
});

// Enhanced chord card interactions
function enhanceChordCards() {
    document.querySelectorAll('.chord-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const cards = document.querySelectorAll('.chord-card');
            cards.forEach(c => {
                if (c !== this) {
                    c.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', function() {
            document.querySelectorAll('.chord-card').forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
}

// Call enhancement after chords are displayed
const originalDisplayChords = window.displayChords;
if (typeof displayChords === 'function') {
    window.displayChords = function() {
        originalDisplayChords.apply(this, arguments);
        setTimeout(enhanceChordCards, 100);
    };
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close modals (already implemented)
    // Space to toggle theme (when not in input)
    if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        document.getElementById('theme-toggle')?.click();
    }

    // 'f' for FAQ
    if (e.key === 'f' && e.ctrlKey) {
        e.preventDefault();
        document.getElementById('faq-btn')?.click();
    }

    // 'c' for Chat
    if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault();
        document.getElementById('chat-assist-btn')?.click();
    }

    // 's' for Settings
    if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        document.getElementById('settings-btn')?.click();
    }
});

// Add loading state management
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'global-loader';
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            background: var(--surface);
            padding: 32px;
            border-radius: 20px;
            border: 1px solid var(--border);
            box-shadow: var(--shadow-lg);
            text-align: center;
        ">
            <div style="
                width: 40px;
                height: 40px;
                border: 4px solid var(--border);
                border-top-color: var(--brand);
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                margin: 0 auto 16px;
            "></div>
            <div style="color: var(--text-dim); font-weight: 600;">Loading...</div>
        </div>
    `;
    document.body.appendChild(loader);

    if (!document.getElementById('loader-styles')) {
        const style = document.createElement('style');
        style.id = 'loader-styles';
        style.textContent = `
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function hideLoading() {
    const loader = document.getElementById('global-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
}

// Expose loading functions globally
window.showLoading = showLoading;
window.hideLoading = hideLoading;

console.log('%c🎵 Raga Chord Explorer', 'color: #5b7cff; font-size: 24px; font-weight: bold;');
console.log('%cFresh UI Loaded Successfully!', 'color: #22d3ee; font-size: 14px;');
console.log('%cKeyboard Shortcuts:', 'color: #10b981; font-weight: bold;');
console.log('Space - Toggle Theme');
console.log('Ctrl+F - Open FAQ');
console.log('Ctrl+C - Open Chat');
console.log('Ctrl+S - Open Settings');
console.log('ESC - Close Modals');
