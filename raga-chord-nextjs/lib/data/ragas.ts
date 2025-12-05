import { Raga, ChordTemplate } from '@/lib/types';

// Western note names (12-TET)
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Sargam mapping for pitch classes relative to Sa (0 = Sa)
export const PC_TO_SARGAM: Record<number, string> = {
  0: 'Sa',
  1: 're',  // komal Re
  2: 'Re',  // shuddha Re
  3: 'ga',  // komal Ga
  4: 'Ga',  // shuddha Ga
  5: 'Ma',  // shuddha Ma
  6: 'Ma^', // tivra Ma
  7: 'Pa',
  8: 'dha', // komal Dha
  9: 'Dha', // shuddha Dha
  10: 'ni', // komal Ni
  11: 'Ni'  // shuddha Ni
};

// Chord templates: intervals in semitones from root (mod 12)
export const CHORD_TEMPLATES: ChordTemplate[] = [
  { name: '', intervals: [0, 4, 7], tags: [] },            // Major triad
  { name: 'm', intervals: [0, 3, 7], tags: [] },           // Minor triad
  { name: 'dim', intervals: [0, 3, 6], tags: [] },         // Diminished triad
  { name: 'sus2', intervals: [0, 2, 7], tags: ['color'] },
  { name: 'sus4', intervals: [0, 5, 7], tags: ['color'] },
  { name: 'add9', intervals: [0, 4, 7, 14], tags: ['color'] }, // 14 -> 2 mod 12, add9 color
  { name: 'm(add9)', intervals: [0, 3, 7, 14], tags: ['color'] },
  { name: '6', intervals: [0, 4, 7, 9], tags: [] },
  { name: 'm6', intervals: [0, 3, 7, 9], tags: [] },
  { name: '5', intervals: [0, 7], tags: [] },
  // Fusion extensions (only when fusion mode is on)
  { name: '7', intervals: [0, 4, 7, 10], tags: ['fusion'] },
  { name: 'm7', intervals: [0, 3, 7, 10], tags: ['fusion'] },
  { name: 'maj7', intervals: [0, 4, 7, 11], tags: ['fusion', 'color'] }
];

// Library: 9 sampurna (7-note) ragas - 5 Carnatic + 4 Hindustani
export const RAGAS: Raga[] = [
  // ===== CARNATIC RAGAS (5 Melakarta) =====

  {
    id: 'shankarabharanam',
    name: 'Shankarabharanam',
    tradition: 'carnatic',
    parent: 'Shankarabharanam (29)',
    arohaPCs: [0, 2, 4, 5, 7, 9, 11, 12],
    avarohaPCs: [12, 11, 9, 7, 5, 4, 2, 0],
    vadiPC: 9,
    samvadiPC: 2,
    typicalDrone: 'Sa-Pa',
    notes: 'S R2 G3 M1 P D2 N3. Major scale.',
    pakadPCs: [[0, 2, 4, 5, 7, 9, 11, 9, 7, 5, 4, 2, 0]]
  },
  {
    id: 'kalyani',
    name: 'Kalyani',
    tradition: 'carnatic',
    parent: 'Kalyani (65)',
    arohaPCs: [0, 2, 4, 6, 7, 9, 11, 12],
    avarohaPCs: [12, 11, 9, 7, 6, 4, 2, 0],
    vadiPC: 11,
    samvadiPC: 4,
    typicalDrone: 'Sa-Pa',
    notes: 'S R2 G3 M2 P D2 N3. Lydian mode.',
    pakadPCs: [[0, 2, 4, 6, 7, 9, 11, 9, 7, 6, 4, 2, 0]]
  },
  {
    id: 'kamavardhini',
    name: 'Kamavardhini',
    tradition: 'carnatic',
    parent: 'Kamavardhini (51)',
    arohaPCs: [0, 1, 4, 6, 7, 8, 11, 12],
    avarohaPCs: [12, 11, 8, 7, 6, 4, 1, 0],
    vadiPC: 6,
    samvadiPC: 1,
    typicalDrone: 'Sa-Pa',
    notes: 'S R1 G3 M2 P D1 N3. Also known as Pantuvarali.',
    pakadPCs: [[0, 1, 4, 6, 7, 8, 11, 8, 7, 6, 4, 1, 0]]
  },
  {
    id: 'kharaharapriya',
    name: 'Kharaharapriya',
    tradition: 'carnatic',
    parent: 'Kharaharapriya (22)',
    arohaPCs: [0, 2, 3, 5, 7, 9, 10, 12],
    avarohaPCs: [12, 10, 9, 7, 5, 3, 2, 0],
    vadiPC: 7,
    samvadiPC: 2,
    typicalDrone: 'Sa-Pa',
    notes: 'S R2 G2 M1 P D2 N2. Dorian mode.',
    pakadPCs: [[0, 2, 3, 5, 7, 9, 10, 9, 7, 5, 3, 2, 0]]
  },
  {
    id: 'mayamalavagowla',
    name: 'Mayamalavagowla',
    tradition: 'carnatic',
    parent: 'Mayamalavagowla (15)',
    arohaPCs: [0, 1, 4, 5, 7, 8, 11, 12],
    avarohaPCs: [12, 11, 8, 7, 5, 4, 1, 0],
    vadiPC: 8,
    samvadiPC: 1,
    typicalDrone: 'Sa-Pa',
    notes: 'S R1 G3 M1 P D1 N3. Double harmonic scale.',
    pakadPCs: [[0, 1, 4, 5, 7, 8, 11, 8, 7, 5, 4, 1, 0]]
  },

  // ===== HINDUSTANI RAGAS (4) =====

  {
    id: 'bilawal',
    name: 'Bilawal',
    tradition: 'hindustani',
    parent: 'Bilawal',
    arohaPCs: [0, 2, 4, 5, 7, 9, 11, 12],
    avarohaPCs: [12, 11, 9, 7, 5, 4, 2, 0],
    vadiPC: 9,
    samvadiPC: 2,
    typicalDrone: 'Sa-Pa',
    notes: 'All shuddha notes (S R G m P D N). Like C major scale.',
    pakadPCs: [[0, 2, 4, 5, 7, 9, 11, 9, 7, 5, 4, 2, 0]]
  },
  {
    id: 'kalyan',
    name: 'Kalyan',
    tradition: 'hindustani',
    parent: 'Kalyan',
    arohaPCs: [0, 2, 4, 6, 7, 9, 11, 12],
    avarohaPCs: [12, 11, 9, 7, 6, 4, 2, 0],
    vadiPC: 11,
    samvadiPC: 4,
    typicalDrone: 'Sa-Pa',
    notes: 'Tivra Ma (S R G M^ P D N). Evening raga. Like Lydian mode.',
    pakadPCs: [[0, 2, 4, 6, 7, 9, 11, 9, 7, 6, 4, 2, 0]]
  },
  {
    id: 'kafi',
    name: 'Kafi',
    tradition: 'hindustani',
    parent: 'Kafi',
    arohaPCs: [0, 2, 3, 5, 7, 9, 10, 12],
    avarohaPCs: [12, 10, 9, 7, 5, 3, 2, 0],
    vadiPC: 7,
    samvadiPC: 2,
    typicalDrone: 'Sa-Pa',
    notes: 'Komal Ga & Ni (S R g m P D n). Like Dorian mode.',
    pakadPCs: [[0, 2, 3, 5, 7, 9, 10, 9, 7, 5, 3, 2, 0]]
  },
  {
    id: 'bhairav',
    name: 'Bhairav',
    tradition: 'hindustani',
    parent: 'Bhairav',
    arohaPCs: [0, 1, 4, 5, 7, 8, 11, 12],
    avarohaPCs: [12, 11, 8, 7, 5, 4, 1, 0],
    vadiPC: 8,
    samvadiPC: 1,
    typicalDrone: 'Sa-Pa',
    notes: 'Komal Re & Dha (S r G m P d N). Morning raga.',
    pakadPCs: [[0, 1, 4, 5, 7, 8, 11, 8, 7, 5, 4, 1, 0]]
  },
];
