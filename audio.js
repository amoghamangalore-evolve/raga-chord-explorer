// Web Audio utilities: tanpura-like drone + chord playback
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx, masterGain, droneNodes = [];

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new AudioCtx();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.18;
    masterGain.connect(audioCtx.destination);
  }
}

function noteToFreq(noteName) {
  const map = {C:0,'C#':1,Db:1,D:2,'D#':3,Eb:3,E:4,F:5,'F#':6,Gb:6,G:7,'G#':8,Ab:8,A:9,'A#':10,Bb:10,B:11};
  const base = 261.63; // C4
  const m = noteName.toUpperCase();
  const semi = map[m] ?? 0;
  return base * Math.pow(2, semi / 12);
}

function playChordFreqs(freqs, seconds = 1.6) {
  ensureAudio();
  const now = audioCtx.currentTime;
  freqs.forEach((f, i) => {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'sine';
    o.frequency.value = f;
    o.connect(g); g.connect(masterGain);
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.22, now + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
    o.start(now + 0.01 * i);
    o.stop(now + seconds + 0.05);
  });
}

function toggleDrone(tonic = 'C') {
  ensureAudio();
  if (droneNodes.length) {
    droneNodes.forEach(n => { try { n.stop(); } catch {} });
    droneNodes = [];
    return false;
  }
  const base = noteToFreq(tonic); // Sa
  const p = base * Math.pow(2, 7 / 12); // Pa
  const sa2 = base * 2;                 // upper Sa

  [base, p, sa2].forEach(f => {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'sine';
    o.frequency.value = f;
    o.connect(g); g.connect(masterGain);
    g.gain.value = 0.08;
    o.start();
    droneNodes.push(o);
  });
  return true;
}
