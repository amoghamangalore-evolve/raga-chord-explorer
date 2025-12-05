/**
 * Chord Generation Validation Test
 * Tests chord generation for the 9 ragas
 */

// Chord templates
const CHORD_TEMPLATES = [
  { name: '', intervals: [0, 4, 7], tags: [] },            // Major triad
  { name: 'm', intervals: [0, 3, 7], tags: [] },           // Minor triad
  { name: 'sus2', intervals: [0, 2, 7], tags: ['color'] },
  { name: 'sus4', intervals: [0, 5, 7], tags: ['color'] },
  { name: 'add9', intervals: [0, 4, 7, 14], tags: ['color'] },
  { name: 'm(add9)', intervals: [0, 3, 7, 14], tags: ['color'] },
  { name: '6', intervals: [0, 4, 7, 9], tags: [] },
  { name: 'm6', intervals: [0, 3, 7, 9], tags: [] },
  { name: '5', intervals: [0, 7], tags: [] },
  { name: '7', intervals: [0, 4, 7, 10], tags: ['fusion'] },
  { name: 'm7', intervals: [0, 3, 7, 10], tags: ['fusion'] },
  { name: 'maj7', intervals: [0, 4, 7, 11], tags: ['fusion', 'color'] }
];

// Note names
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Test ragas
const RAGAS = [
  {
    name: 'Shankarabharanam',
    tradition: 'carnatic',
    arohaPCs: [0, 2, 4, 5, 7, 9, 11, 12],
    notes: 'S R2 G3 M1 P D2 N3. Major scale.'
  },
  {
    name: 'Kalyani',
    tradition: 'carnatic',
    arohaPCs: [0, 2, 4, 6, 7, 9, 11, 12],
    notes: 'S R2 G3 M2 P D2 N3. Lydian mode.'
  },
  {
    name: 'Kamavardhini',
    tradition: 'carnatic',
    arohaPCs: [0, 1, 4, 6, 7, 8, 11, 12],
    notes: 'S R1 G3 M2 P D1 N3.'
  },
  {
    name: 'Kharaharapriya',
    tradition: 'carnatic',
    arohaPCs: [0, 2, 3, 5, 7, 9, 10, 12],
    notes: 'S R2 G2 M1 P D2 N2. Dorian mode.'
  },
  {
    name: 'Mayamalavagowla',
    tradition: 'carnatic',
    arohaPCs: [0, 1, 4, 5, 7, 8, 11, 12],
    notes: 'S R1 G3 M1 P D1 N3. Double harmonic.'
  },
  {
    name: 'Bilawal',
    tradition: 'hindustani',
    arohaPCs: [0, 2, 4, 5, 7, 9, 11, 12],
    notes: 'S R G m P D N. C major scale.'
  },
  {
    name: 'Kalyan',
    tradition: 'hindustani',
    arohaPCs: [0, 2, 4, 6, 7, 9, 11, 12],
    notes: 'S R G M^ P D N. Lydian mode.'
  },
  {
    name: 'Kafi',
    tradition: 'hindustani',
    arohaPCs: [0, 2, 3, 5, 7, 9, 10, 12],
    notes: 'S R g m P D n. Dorian mode.'
  },
  {
    name: 'Bhairav',
    tradition: 'hindustani',
    arohaPCs: [0, 1, 4, 5, 7, 8, 11, 12],
    notes: 'S r G m P d N. Morning raga.'
  }
];

function generateChordsFromRaga(raga, sa = 0, fusionMode = false, mustIncludeSa = false) {
  const chords = [];

  // Get unique pitch classes from aroha
  const scalePCs = Array.from(new Set(raga.arohaPCs.map(pc => pc % 12)));

  console.log(`\nScale PCs for ${raga.name}: [${scalePCs.join(', ')}]`);

  // Get available chord templates based on fusion mode
  const templates = fusionMode
    ? CHORD_TEMPLATES
    : CHORD_TEMPLATES.filter(t => !t.tags.includes('fusion'));

  // Try building each template from each scale note as root
  for (const root of scalePCs) {
    for (const template of templates) {
      const chordPCs = template.intervals.map(interval => (root + interval) % 12);

      // Check if all chord notes are in the scale
      const allNotesInScale = chordPCs.every(pc => scalePCs.includes(pc));

      if (allNotesInScale) {
        // If mustIncludeSa is enabled, check if Sa is in the chord
        if (mustIncludeSa && !chordPCs.includes(0)) {
          continue;
        }

        const absoluteRoot = (root + sa) % 12;
        const absolutePCs = chordPCs.map(pc => (pc + sa) % 12);
        const chordName = `${NOTE_NAMES[absoluteRoot]}${template.name}`;

        chords.push({
          root: absoluteRoot,
          template: template.name,
          notes: absolutePCs,
          name: chordName,
        });
      }
    }
  }

  return chords;
}

// Test each raga
console.log('='.repeat(80));
console.log('CHORD GENERATION VALIDATION TEST');
console.log('='.repeat(80));

for (const raga of RAGAS) {
  console.log('\n' + '='.repeat(80));
  console.log(`RAGA: ${raga.name} (${raga.tradition})`);
  console.log(`Notes: ${raga.notes}`);
  console.log('='.repeat(80));

  // Test with Sa = 0 (C), no fusion mode, mustIncludeSa = false
  const chords = generateChordsFromRaga(raga, 0, false, false);

  console.log(`\nTotal chords generated: ${chords.length}`);

  // Group by chord type
  const byType = {};
  chords.forEach(chord => {
    const type = chord.template || 'Major';
    if (!byType[type]) byType[type] = [];
    byType[type].push(chord);
  });

  console.log('\nChords by type:');
  for (const [type, typeChords] of Object.entries(byType)) {
    console.log(`  ${type || 'Major'}: ${typeChords.length} chords`);
    typeChords.forEach(c => {
      const noteNames = c.notes.map(pc => NOTE_NAMES[pc]).join(', ');
      console.log(`    - ${c.name}: [${noteNames}]`);
    });
  }

  // Validate specific expected chords for major scales
  if (raga.name === 'Shankarabharanam' || raga.name === 'Bilawal') {
    console.log('\n  VALIDATION (Major Scale):');
    const expectedChords = [
      { name: 'C', notes: [0, 4, 7] },      // I
      { name: 'Dm', notes: [2, 5, 9] },     // ii
      { name: 'Em', notes: [4, 7, 11] },    // iii
      { name: 'F', notes: [5, 9, 0] },      // IV
      { name: 'G', notes: [7, 11, 2] },     // V
      { name: 'Am', notes: [9, 0, 4] },     // vi
    ];

    for (const expected of expectedChords) {
      const found = chords.find(c => c.name === expected.name);
      if (found) {
        const notesMatch = expected.notes.every(n => found.notes.includes(n));
        console.log(`    ✓ ${expected.name}: FOUND ${notesMatch ? '(notes correct)' : '(NOTES WRONG!)'}`);
      } else {
        console.log(`    ✗ ${expected.name}: MISSING`);
      }
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log('TEST COMPLETE');
console.log('='.repeat(80));
