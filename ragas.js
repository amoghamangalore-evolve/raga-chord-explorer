
// Music theory data and raga library

// Western note names (12-TET)
const NOTE_NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

// Sargam mapping for pitch classes relative to Sa (0 = Sa)
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

// Chord templates: intervals in semitones from root (mod 12)
const CHORD_TEMPLATES = [
  { name: '', intervals: [0,4,7], tags: [] },            // Major triad
  { name: 'm', intervals: [0,3,7], tags: [] },           // Minor triad
  { name: 'sus2', intervals: [0,2,7], tags: ['color'] },
  { name: 'sus4', intervals: [0,5,7], tags: ['color'] },
  { name: 'add9', intervals: [0,4,7,14], tags: ['color'] }, // 14 -> 2 mod 12, add9 color
  { name: 'm(add9)', intervals: [0,3,7,14], tags: ['color'] },
  { name: '6', intervals: [0,4,7,9], tags: [] },
  { name: 'm6', intervals: [0,3,7,9], tags: [] },
  { name: '5', intervals: [0,7], tags: [] },
  // Fusion extensions (only when fusion mode is on)
  { name: '7', intervals: [0,4,7,10], tags: ['fusion'] },
  { name: 'm7', intervals: [0,3,7,10], tags: ['fusion'] },
  { name: 'maj7', intervals: [0,4,7,11], tags: ['fusion','color'] }
];

// Helper to define raga object
function raga({id, name, tradition, parent, aroha, avaroha, vadi, samvadi, drone, notes, pakad}){
  const toPC = n => n; // already given as pitch classes 0-11
  return {
    id,
    name,
    tradition,
    parent,
    arohaPCs: aroha.map(toPC),
    avarohaPCs: avaroha.map(toPC),
    vadiPC: (vadi === null ? null : vadi),
    samvadiPC: (samvadi === null ? null : samvadi),
    typicalDrone: drone || 'Sa-Pa',
    notes: notes || '',
    pakadPCs: pakad || []
  };
}

// Library: a compact but useful starter set (can be expanded)
const RAGAS = [
  // Hindustani
  raga({ id:'yaman', name:'Yaman', tradition:'hindustani', parent:'Kalyan', aroha:[0,2,4,6,7,9,11,12], avaroha:[12,11,9,7,6,4,2,0], vadi:11, samvadi:4, drone:'Sa-Pa', notes:'All shuddha notes except tivra Ma (Ma^). Evening raga.', pakad:[[0,2,4,6,7,6,4,2,0]] }),
  raga({ id:'bhupali', name:'Bhupali', tradition:'hindustani', parent:'Kalyan', aroha:[0,2,4,7,9,12], avaroha:[12,9,7,4,2,0], vadi:4, samvadi:9, drone:'Sa-Pa', notes:'Pentatonic: no Ma or Ni.', pakad:[[0,2,4,7,9,7,4,2,0]] }),
  raga({ id:'bageshree', name:'Bageshree', tradition:'hindustani', parent:'Kafi', aroha:[0,2,3,5,7,9,10,12], avaroha:[12,10,9,7,5,3,2,0], vadi:7, samvadi:2, drone:'Sa-Ma', notes:'Komal Ga & Ni; late night mood.', pakad:[[0,2,3,5,7,5,3,2,0]] }),
  raga({ id:'kafi', name:'Kafi', tradition:'hindustani', parent:'Kafi', aroha:[0,2,3,5,7,9,10,12], avaroha:[12,10,9,7,5,3,2,0], vadi:2, samvadi:7, drone:'Sa-Pa', notes:'Komal Ga & Ni.', pakad:[[0,2,3,5,7,9,10,9,7,5,3,2,0]] }),
  raga({ id:'bhairav', name:'Bhairav', tradition:'hindustani', parent:'Bhairav', aroha:[0,1,4,5,7,8,11,12], avaroha:[12,11,8,7,5,4,1,0], vadi:4, samvadi:11, drone:'Sa-Pa', notes:'Komal Re & Dha; serious dawn raga.', pakad:[[0,1,4,5,7,5,4,1,0]] }),
  raga({ id:'khamaj', name:'Khamaj', tradition:'hindustani', parent:'Khamaj', aroha:[0,2,4,5,7,9,11,12], avaroha:[12,10,9,7,5,4,2,0], vadi:4, samvadi:0, drone:'Sa-Pa', notes:'Komal Ni in descent.', pakad:[[0,2,4,5,7,9,11,10,9,7,5,4,2,0]] }),
  raga({ id:'todi', name:'Todi', tradition:'hindustani', parent:'Todi', aroha:[0,1,3,6,7,8,11,12], avaroha:[12,11,8,7,6,3,1,0], vadi:6, samvadi:1, drone:'Sa-Ma', notes:'Komal Re, Ga, Dha; tivra Ma.', pakad:[[0,1,3,6,7,6,3,1,0]] }),
  raga({ id:'durga', name:'Durga', tradition:'hindustani', parent:'Bilawal', aroha:[0,2,5,7,9,12], avaroha:[12,9,7,5,2,0], vadi:2, samvadi:7, drone:'Sa-Pa', notes:'Pentatonic: no Ga, Ni.', pakad:[[0,2,5,7,9,7,5,2,0]] }),

  // Carnatic
  raga({ id:'mohanam', name:'Mohanam', tradition:'carnatic', parent:'Harikambhoji (28)', aroha:[0,2,4,7,9,12], avaroha:[12,9,7,4,2,0], vadi:4, samvadi:9, drone:'Sa-Pa', notes:'Same as Bhupali (pentatonic).', pakad:[[0,2,4,7,9,7,4,2,0]] }),
  raga({ id:'kalyani', name:'Kalyani', tradition:'carnatic', parent:'Kalyani (65)', aroha:[0,2,4,6,7,9,11,12], avaroha:[12,11,9,7,6,4,2,0], vadi:11, samvadi:4, drone:'Sa-Pa', notes:'Equivalent to Yaman (tivra Ma).', pakad:[[0,2,4,6,7,6,4,2,0]] }),
  raga({ id:'hindolam', name:'Hindolam', tradition:'carnatic', parent:'Natabhairavi (20)', aroha:[0,3,5,8,10,12], avaroha:[12,10,8,5,3,0], vadi:3, samvadi:8, drone:'Sa-Ma', notes:'Pentatonic: Sa ga Ma dha ni.', pakad:[[0,3,5,8,10,8,5,3,0]] }),
  raga({ id:'charukesi', name:'Charukesi', tradition:'carnatic', parent:'Charukesi (26)', aroha:[0,2,4,5,7,8,11,12], avaroha:[12,11,8,7,5,4,2,0], vadi:4, samvadi:11, drone:'Sa-Pa', notes:'Like western melodic minor b6.', pakad:[[0,2,4,5,7,8,11,8,7,5,4,2,0]] }),
];
