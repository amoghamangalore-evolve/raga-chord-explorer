// Web Audio playback and drone
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx, masterGain;
function ensureAudio(){
  if(!audioCtx){
    audioCtx = new AudioCtx();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.2;
    masterGain.connect(audioCtx.destination);
  }
}
function freqFromNote(note){
  const A4=440; const map={C:0,'C#':1,Db:1,D:2,'D#':3,Eb:3,E:4,F:5,'F#':6,Gb:6,G:7,'G#':8,Ab:8,A:9,'A#':10,Bb:10,B:11};
  const m = note.match(/^([A-G](?:#|b)?)(\d)$/); if(!m) return A4;
  const semis = map[m[1]] + (int(m[2])-4)*12 - 9; // C4 as 261.63 approx
  return 440*Math.pow(2,(semis-3)/12);
}
function playChord(notes){ ensureAudio(); const now=audioCtx.currentTime; const dur=1.5; notes.forEach((hz,i)=>{const o=audioCtx.createOscillator(); const g=audioCtx.createGain(); o.type='sine'; o.frequency.value=hz; o.connect(g); g.connect(masterGain); g.gain.setValueAtTime(0,now); g.gain.linearRampToValueAtTime(0.2, now+0.02); g.gain.exponentialRampToValueAtTime(0.0001, now+dur); o.start(now+0.02*i); o.stop(now+dur+0.1);});}
