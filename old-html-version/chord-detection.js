// YouTube Chord Detection Module
// This module handles chord detection from YouTube audio

class ChordDetector {
    constructor() {
        this.apiKey = null; // Will need user to provide API key or use demo
        this.init();
    }

    init() {
        // Setup event listeners
        document.getElementById('analyze-btn')?.addEventListener('click', () => {
            this.analyzeYouTubeLink();
        });

        // Setup sidebar navigation for Find Scale
        document.querySelectorAll('.sidebar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                if (tab) {
                    this.switchToTab(tab);
                }
            });
        });
    }

    switchToTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Show selected tab
        const targetTab = document.getElementById(`${tabName}-tab`);
        if (targetTab) {
            targetTab.classList.add('active');
        }

        // Update sidebar active state
        document.querySelectorAll('.sidebar-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });
    }

    async analyzeYouTubeLink() {
        const urlInput = document.getElementById('youtube-url');
        const url = urlInput.value.trim();

        if (!url) {
            alert('Please enter a YouTube URL');
            return;
        }

        if (!this.isValidYouTubeUrl(url)) {
            alert('Please enter a valid YouTube URL');
            return;
        }

        // Show loading state
        this.showAnalysisStatus();

        try {
            // Extract video ID
            const videoId = this.extractVideoId(url);

            // Simulate chord detection (in production, this would call an API)
            // Options: Use Spotify API, Essentia.js, or Chordify API
            await this.performChordDetection(videoId);

        } catch (error) {
            console.error('Chord detection error:', error);
            alert('Error analyzing audio. Please try again.');
            this.hideAnalysisStatus();
        }
    }

    isValidYouTubeUrl(url) {
        const patterns = [
            /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
            /^https?:\/\/youtu\.be\/[\w-]+/
        ];
        return patterns.some(pattern => pattern.test(url));
    }

    extractVideoId(url) {
        let videoId = null;

        // Standard URL
        const match1 = url.match(/[?&]v=([^&]+)/);
        if (match1) {
            videoId = match1[1];
        }

        // Short URL
        const match2 = url.match(/youtu\.be\/([^?]+)/);
        if (match2) {
            videoId = match2[1];
        }

        return videoId;
    }

    async performChordDetection(videoId) {
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Demo detected chords (in production, this comes from API)
        const demoChords = this.generateDemoChords();

        this.displayResults(demoChords);
    }

    generateDemoChords() {
        // Generate demo data for demonstration
        const commonChords = ['C', 'Am', 'F', 'G', 'Dm', 'Em', 'A', 'D'];
        const detectedChords = [];

        // Generate 8-12 random chords
        const numChords = 8 + Math.floor(Math.random() * 5);
        for (let i = 0; i < numChords; i++) {
            const chord = commonChords[Math.floor(Math.random() * commonChords.length)];
            const timestamp = this.formatTime(i * 15); // Every 15 seconds
            detectedChords.push({ chord, timestamp });
        }

        return {
            chords: detectedChords,
            progression: this.generateProgression(detectedChords),
            suggestedRagas: this.suggestRagas(detectedChords)
        };
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    generateProgression(detectedChords) {
        // Extract unique chords and create a common progression
        const uniqueChords = [...new Set(detectedChords.map(c => c.chord))];
        return uniqueChords.slice(0, 4).join(' - ');
    }

    suggestRagas(detectedChords) {
        // Basic raga suggestion based on detected chords
        const chordNames = detectedChords.map(c => c.chord);
        const suggestions = [];

        // Simple logic for demo - in production, use sophisticated mapping
        if (chordNames.includes('Am') || chordNames.includes('Em')) {
            suggestions.push({
                name: 'Bhairav',
                reason: 'Minor tonality matches Bhairav\'s serious mood',
                tradition: 'Hindustani'
            });
        }

        if (chordNames.includes('C') || chordNames.includes('G')) {
            suggestions.push({
                name: 'Yaman',
                reason: 'Major tonality aligns with Yaman\'s bright character',
                tradition: 'Hindustani'
            });
        }

        if (chordNames.includes('D') || chordNames.includes('A')) {
            suggestions.push({
                name: 'Kalyani',
                reason: 'Chord structure matches Kalyani\'s melodic framework',
                tradition: 'Carnatic'
            });
        }

        // Default suggestion if none matched
        if (suggestions.length === 0) {
            suggestions.push({
                name: 'Bilawal',
                reason: 'Natural major scale - versatile for various chord progressions',
                tradition: 'Hindustani'
            });
        }

        return suggestions;
    }

    displayResults(results) {
        this.hideAnalysisStatus();

        // Display detected chords
        const chordsList = document.getElementById('detected-chords-list');
        chordsList.innerHTML = results.chords.map(item => `
            <div class="chord-badge" title="${item.timestamp}">
                ${item.chord}
                <small style="display:block;font-size:0.75rem;opacity:0.7;margin-top:4px;">${item.timestamp}</small>
            </div>
        `).join('');

        // Display chord progression
        const progression = document.getElementById('chord-progression');
        progression.textContent = `Common Progression: ${results.progression}`;

        // Display suggested ragas
        const ragasContainer = document.getElementById('suggested-ragas');
        ragasContainer.innerHTML = results.suggestedRagas.map(raga => `
            <div class="raga-suggestion" onclick="selectRaga('${raga.name}')">
                <h4>${raga.name}</h4>
                <p><strong>${raga.tradition}</strong></p>
                <p>${raga.reason}</p>
            </div>
        `).join('');

        // Show results
        document.getElementById('chord-results').classList.remove('hidden');

        // Scroll to results
        document.getElementById('chord-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    showAnalysisStatus() {
        document.getElementById('analysis-status').classList.remove('hidden');
        document.getElementById('chord-results').classList.add('hidden');
    }

    hideAnalysisStatus() {
        document.getElementById('analysis-status').classList.add('hidden');
    }
}

// Helper function to select a suggested raga
function selectRaga(ragaName) {
    // Switch back to chord explorer tab
    const chordDetector = window.chordDetector;
    if (chordDetector) {
        chordDetector.switchToTab('chords');
    }

    // Find and select the raga
    const ragaSelect = document.getElementById('raga-select');
    const option = Array.from(ragaSelect.options).find(opt => opt.text === ragaName);

    if (option) {
        ragaSelect.value = option.value;
        ragaSelect.dispatchEvent(new Event('change'));
        alert(`Selected raga: ${ragaName}`);
    } else {
        alert(`Raga "${ragaName}" not found in the current tradition. Try switching traditions.`);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.chordDetector = new ChordDetector();
    console.log('🎵 Chord Detector initialized!');
});
