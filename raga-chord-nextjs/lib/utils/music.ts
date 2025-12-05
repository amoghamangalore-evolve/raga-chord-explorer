import { Chord, ChordTemplate, Raga } from '@/lib/types';
import { NOTE_NAMES, PC_TO_SARGAM, CHORD_TEMPLATES } from '@/lib/data/ragas';

/**
 * Convert pitch class and octave to frequency (Hz)
 * Using A4 = 440Hz as reference
 */
export function pcToFrequency(pc: number, octave: number): number {
  const midiNote = octave * 12 + pc + 12; // C0 = MIDI 12
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

/**
 * Get note name from pitch class
 */
export function pcToNoteName(pc: number, octave?: number): string {
  const noteName = NOTE_NAMES[pc % 12];
  return octave !== undefined ? `${noteName}${octave}` : noteName;
}

/**
 * Get Sargam name from pitch class (relative to Sa)
 */
export function pcToSargam(pc: number, sa: number = 0): string {
  const relativePc = (pc - sa + 12) % 12;
  return PC_TO_SARGAM[relativePc] || '';
}

/**
 * Generate all possible chords from a raga's notes
 */
export function generateChordsFromRaga(
  raga: Raga,
  sa: number,
  fusionMode: boolean,
  mustIncludeSa: boolean
): Chord[] {
  const chords: Chord[] = [];

  // Get unique pitch classes from aroha (ascending scale)
  const scalePCs = Array.from(new Set(raga.arohaPCs.map(pc => pc % 12)));

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
          template,
          notes: absolutePCs,
          name: chordName,
        });
      }
    }
  }

  return chords;
}

/**
 * Check if a chord is a "color" chord (sus, add9, etc.)
 */
export function isColorChord(chord: Chord): boolean {
  return chord.template.tags.includes('color');
}

/**
 * Check if a chord is a "fusion" chord (7th chords)
 */
export function isFusionChord(chord: Chord): boolean {
  return chord.template.tags.includes('fusion');
}

/**
 * Get scale degree name (for display)
 */
export function getScaleDegree(pc: number, scalePCs: number[]): string {
  const index = scalePCs.indexOf(pc);
  if (index === -1) return '';

  const degrees = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  return degrees[index] || '';
}

/**
 * Filter chords based on user preferences
 */
export function filterChords(
  chords: Chord[],
  showColorChords: boolean,
  showFusionChords: boolean
): Chord[] {
  return chords.filter(chord => {
    if (!showColorChords && isColorChord(chord)) return false;
    if (!showFusionChords && isFusionChord(chord)) return false;
    return true;
  });
}

/**
 * Sort chords by root note (chromatic order from Sa)
 */
export function sortChordsByRoot(chords: Chord[], sa: number = 0): Chord[] {
  return [...chords].sort((a, b) => {
    const aRelative = (a.root - sa + 12) % 12;
    const bRelative = (b.root - sa + 12) % 12;
    return aRelative - bRelative;
  });
}
