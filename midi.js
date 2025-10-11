// MIDI file generation utility
// Generates simple MIDI files for chord downloads

const midiGenerator = (() => {
  // Convert pitch class to MIDI note number (C4 = 60)
  function pcToMidiNote(pc, tonic, octave = 4) {
    const NOTE_TO_INDEX = { 'C':0,'C#':1,'D':2,'D#':3,'E':4,'F':5,'F#':6,'G':7,'G#':8,'A':9,'A#':10,'B':11 };
    const tonicIndex = NOTE_TO_INDEX[tonic];

    // Calculate the actual MIDI note
    const baseC = 60 + (octave - 4) * 12; // C at the specified octave
    const midiNote = baseC + tonicIndex + pc;

    return midiNote;
  }

  // Create a simple MIDI file buffer
  function createMidiFile(pcs, tonic, chordName) {
    // Convert PCs to MIDI notes
    const midiNotes = pcs.map(pc => pcToMidiNote(pc, tonic, 4));

    // MIDI file structure (format 0, 1 track)
    const tempo = 500000; // 120 BPM (microseconds per quarter note)
    const ticksPerBeat = 480;

    // Build MIDI track
    const track = [];

    // Track name event
    const trackName = `${chordName} - Raga Chord Explorer`;
    track.push(...createMetaEvent(0x03, stringToBytes(trackName)));

    // Set tempo
    track.push(...createMetaEvent(0x51, [
      (tempo >> 16) & 0xFF,
      (tempo >> 8) & 0xFF,
      tempo & 0xFF
    ]));

    // Note on events (all notes at once)
    midiNotes.forEach(note => {
      track.push(...createDeltaTime(0)); // No delay
      track.push(0x90, note, 80); // Note on, channel 0, velocity 80
    });

    // Wait 2 beats
    track.push(...createDeltaTime(ticksPerBeat * 2));

    // Note off events
    midiNotes.forEach(note => {
      track.push(...createDeltaTime(0)); // No delay
      track.push(0x80, note, 0); // Note off, channel 0
    });

    // End of track
    track.push(...createMetaEvent(0x2F, []));

    // Build complete MIDI file
    const header = createMidiHeader(1, ticksPerBeat);
    const trackChunk = createTrackChunk(track);

    const midiFile = new Uint8Array([...header, ...trackChunk]);
    return midiFile;
  }

  function createMidiHeader(numTracks, ticksPerBeat) {
    return [
      0x4D, 0x54, 0x68, 0x64, // "MThd"
      0x00, 0x00, 0x00, 0x06, // Header length (6 bytes)
      0x00, 0x00,             // Format 0
      0x00, numTracks,        // Number of tracks
      (ticksPerBeat >> 8) & 0xFF, ticksPerBeat & 0xFF // Ticks per beat
    ];
  }

  function createTrackChunk(trackData) {
    const length = trackData.length;
    return [
      0x4D, 0x54, 0x72, 0x6B, // "MTrk"
      (length >> 24) & 0xFF,
      (length >> 16) & 0xFF,
      (length >> 8) & 0xFF,
      length & 0xFF,
      ...trackData
    ];
  }

  function createMetaEvent(type, data) {
    return [
      ...createDeltaTime(0),
      0xFF,
      type,
      ...writeVarLen(data.length),
      ...data
    ];
  }

  function createDeltaTime(time) {
    return writeVarLen(time);
  }

  function writeVarLen(value) {
    const buffer = [];
    buffer.push(value & 0x7F);

    value >>= 7;
    while (value > 0) {
      buffer.push((value & 0x7F) | 0x80);
      value >>= 7;
    }

    return buffer.reverse();
  }

  function stringToBytes(str) {
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
      bytes.push(str.charCodeAt(i));
    }
    return bytes;
  }

  function downloadMidi(pcs, tonic, chordName) {
    try {
      const midiData = createMidiFile(pcs, tonic, chordName);
      const blob = new Blob([midiData], { type: 'audio/midi' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${chordName.replace(/[^a-zA-Z0-9]/g, '_')}_${tonic}.mid`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error('Error generating MIDI:', error);
      return false;
    }
  }

  return {
    downloadMidi
  };
})();
