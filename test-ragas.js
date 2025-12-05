// Test script to verify all raga scales in sargam notation

const PC_TO_SARGAM = {
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

const RAGAS = [
  {
    id: 'yaman',
    name: 'Yaman',
    tradition: 'hindustani',
    arohaPCs: [0, 2, 4, 6, 7, 9, 11, 12],
    avarohaPCs: [12, 11, 9, 7, 6, 4, 2, 0],
  },
  {
    id: 'bhupali',
    name: 'Bhupali',
    tradition: 'hindustani',
    arohaPCs: [0, 2, 4, 7, 9, 12],
    avarohaPCs: [12, 9, 7, 4, 2, 0],
  },
  {
    id: 'bageshree',
    name: 'Bageshree',
    tradition: 'hindustani',
    arohaPCs: [0, 2, 3, 5, 7, 9, 10, 12],
    avarohaPCs: [12, 10, 9, 7, 5, 3, 2, 0],
  },
  {
    id: 'kafi',
    name: 'Kafi',
    tradition: 'hindustani',
    arohaPCs: [0, 2, 3, 5, 7, 9, 10, 12],
    avarohaPCs: [12, 10, 9, 7, 5, 3, 2, 0],
  },
  {
    id: 'bhairav',
    name: 'Bhairav',
    tradition: 'hindustani',
    arohaPCs: [0, 1, 4, 5, 7, 8, 11, 12],
    avarohaPCs: [12, 11, 8, 7, 5, 4, 1, 0],
  },
  {
    id: 'khamaj',
    name: 'Khamaj',
    tradition: 'hindustani',
    arohaPCs: [0, 2, 4, 5, 7, 9, 11, 12],
    avarohaPCs: [12, 10, 9, 7, 5, 4, 2, 0],
  },
  {
    id: 'todi',
    name: 'Todi',
    tradition: 'hindustani',
    arohaPCs: [0, 1, 3, 6, 7, 8, 11, 12],
    avarohaPCs: [12, 11, 8, 7, 6, 3, 1, 0],
  },
  {
    id: 'durga',
    name: 'Durga',
    tradition: 'hindustani',
    arohaPCs: [0, 2, 5, 7, 9, 12],
    avarohaPCs: [12, 9, 7, 5, 2, 0],
  },
  {
    id: 'mohanam',
    name: 'Mohanam',
    tradition: 'carnatic',
    arohaPCs: [0, 2, 4, 7, 9, 12],
    avarohaPCs: [12, 9, 7, 4, 2, 0],
  },
  {
    id: 'kalyani',
    name: 'Kalyani',
    tradition: 'carnatic',
    arohaPCs: [0, 2, 4, 6, 7, 9, 11, 12],
    avarohaPCs: [12, 11, 9, 7, 6, 4, 2, 0],
  },
  {
    id: 'hindolam',
    name: 'Hindolam',
    tradition: 'carnatic',
    arohaPCs: [0, 3, 5, 8, 10, 12],
    avarohaPCs: [12, 10, 8, 5, 3, 0],
  },
  {
    id: 'charukesi',
    name: 'Charukesi',
    tradition: 'carnatic',
    arohaPCs: [0, 2, 4, 5, 7, 8, 11, 12],
    avarohaPCs: [12, 11, 8, 7, 5, 4, 2, 0],
  },
];

function pcToSargam(pc) {
  return PC_TO_SARGAM[pc % 12] || '?';
}

console.log('='.repeat(80));
console.log('RAGA SCALE VERIFICATION');
console.log('='.repeat(80));
console.log();

RAGAS.forEach(raga => {
  console.log(`${raga.name} (${raga.tradition})`);
  console.log('-'.repeat(80));

  // Aroha
  const arohaNames = raga.arohaPCs.map(pc => pcToSargam(pc));
  console.log(`Aroha:   ${arohaNames.join(' - ')}`);
  console.log(`         [${raga.arohaPCs.join(', ')}]`);

  // Avaroha
  const avarohaNames = raga.avarohaPCs.map(pc => pcToSargam(pc));
  console.log(`Avaroha: ${avarohaNames.join(' - ')}`);
  console.log(`         [${raga.avarohaPCs.join(', ')}]`);

  console.log();
});

console.log('='.repeat(80));
console.log('PITCH CLASS MAPPING REFERENCE');
console.log('='.repeat(80));
Object.entries(PC_TO_SARGAM).forEach(([pc, sargam]) => {
  console.log(`${pc.padStart(2)}: ${sargam}`);
});
