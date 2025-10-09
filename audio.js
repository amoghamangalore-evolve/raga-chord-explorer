
// Simple Web Audio engine for chords + drone

const audioEngine = (() => {
  let ctx = null;
  let masterGain = null;
  let tonic = 'C';
  let droneOn = true;
  let droneNodes = [];

  const A4 = 440;
  const NOTE_TO_INDEX = { 'C':0,'C#':1,'D':2,'D#':3,'E':4,'F':5,'F#':6,'G':7,'G#':8,'A':9,'A#':10,'B':11 };

  function init(){
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.6;
      masterGain.connect(ctx.destination);
      setTonic(tonic);
    }
    // resume on user gesture
    window.addEventListener('click', resume, { once: true });
    window.addEventListener('touchstart', resume, { once: true });
  }

  function resume(){
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }

  function setTonic(note){
    tonic = note;
    // restart drone to reflect new tonic
    if (droneOn && droneNodes.length) {
      stopDrone();
      // require app to call startDrone again with current raga's setting
    }
  }

  function setDroneEnabled(enabled){
    droneOn = enabled;
    if (!droneOn) stopDrone();
    else {
      // will start on next raga selection
    }
  }

  function midiFreqFromPC(pc, baseOctave = 4){
    // Compute frequency of tonic at octave, then add pc semitones
    const tonicIdx = NOTE_TO_INDEX[tonic];
    // C4 = 261.63 Hz, index 0 is C
    const C4 = 261.63;
    const tonicC4Offset = tonicIdx - 0; // semitones from C to tonic
    const tonicFreq = C4 * Math.pow(2, (tonicC4Offset + (baseOctave-4)*12)/12);
    const freq = tonicFreq * Math.pow(2, pc/12);
    return freq;
  }

  function playTone(pc, duration=0.6, gain=0.2){
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    g.gain.value = 0;
    g.connect(masterGain);
    osc.connect(g);

    osc.type = 'sine';
    osc.frequency.value = midiFreqFromPC(pc, 4);

    const now = ctx.currentTime;
    const attack = 0.01, release = 0.2;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(gain, now + attack);
    g.gain.setValueAtTime(gain, now + duration - release);
    g.gain.linearRampToValueAtTime(0, now + duration);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  async function playChord(pcs){
    if (!ctx) return;
    resume();
    // play slight stagger for clarity
    const baseGain = 0.22;
    pcs.forEach((pc, i) => {
      setTimeout(() => playTone(pc, 0.6, baseGain), i*15);
    });
    // return a small delay
    await new Promise(r => setTimeout(r, 650));
  }

  function startDrone(mode='Sa-Pa'){
    if (!ctx || !droneOn) return;
    stopDrone();

    const pcs = [];
    if (mode === 'Sa-Pa') pcs.push(0,7);
    else if (mode === 'Sa-Ma') pcs.push(0,5);
    else pcs.push(0,7);

    pcs.forEach((pc, idx) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      g.gain.value = idx === 0 ? 0.12 : 0.08; // Sa louder
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 1200;
      osc.connect(lp); lp.connect(g); g.connect(masterGain);
      osc.type = 'sine';
      osc.frequency.value = midiFreqFromPC(pc, 3);
      osc.start();
      droneNodes.push(osc);
    });
  }

  function stopDrone(){
    droneNodes.forEach(n => { try{ n.stop(); }catch(e){} });
    droneNodes = [];
  }

  return { init, setTonic, startDrone, setDroneEnabled, playChord };
})();
