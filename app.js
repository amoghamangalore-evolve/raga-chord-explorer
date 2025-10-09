// Basic app glue: populate raga list, generate chord candidates, wire UI.
// This keeps things simple and focuses on integrating auth cleanly.

const NOTE_CLASSES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
function rotate(arr, n) { return arr.slice(n).concat(arr.slice(0, n)); }
function pcIndex(n) { return NOTE_CLASSES.indexOf(n); }

function getRagasByTradition(trad) {
  if (trad === 'Both') return RAGAS;
  return RAGAS.filter(r => r.tradition === trad);
}

function populateRagaSelect() {
  const tradition = document.getElementById('tradition').value;
  const sel = document.getElementById('ragaSelect');
  sel.innerHTML = '';
  getRagasByTradition(tradition).forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.id; opt.textContent = r.name + ' (' + r.tradition + ')';
    sel.appendChild(opt);
  });
}

function showRagaInfo(raga) {
  const meta = document.getElementById('ragaMeta');
  const pkd = document.getElementById('pakad');
  meta.innerHTML = `
    <div class="badge">Tradition: ${raga.tradition}</div>
    <div class="badge">Vadi: ${raga.vadi || '-'}</div>
    <div class="badge">Samvadi: ${raga.samvadi || '-'}</div>
    <div class="badge">Pitch classes (C as Sa): ${raga.pitchClassesC.join(', ')}</div>
  `;
  pkd.innerHTML = `<div class="badge">Pakad/Prayog: ${Array.isArray(raga.pakad) ? raga.pakad.join(' • ') : (raga.pakad || '-')}</div>`;
}

function simpleChordCandidates(pitchClasses) {
  // naive triads from available pitch classes
  const pcs = pitchClasses;
  const triads = [];
  for (let i = 0; i < pcs.length; i++) {
    const root = pcs[i];
    const m3 = NOTE_CLASSES[(pcIndex(root) + 3) % 12];
    const M3 = NOTE_CLASSES[(pcIndex(root) + 4) % 12];
    const p5 = NOTE_CLASSES[(pcIndex(root) + 7) % 12];
    if (pcs.includes(M3) && pcs.includes(p5)) triads.push({ name: `${root} maj`, tones: [root, M3, p5] });
    if (pcs.includes(m3) && pcs.includes(p5)) triads.push({ name: `${root} min`, tones: [root, m3, p5] });
  }
  return triads.slice(0, 18);
}

function renderChords(chords) {
  const grid = document.getElementById('chordsGrid');
  grid.innerHTML = '';
  chords.forEach(ch => {
    const card = document.createElement('div');
    card.className = 'chord-card';
    card.innerHTML = `<strong>${ch.name}</strong><div class="badge">${ch.tones.join(' - ')}</div>`;
    card.addEventListener('click', () => {
      // play chord at comfortable register around C4
      const freqs = ch.tones.map(t => {
        // map to frequency close to C4
        const idx = NOTE_CLASSES.indexOf(t);
        const c4 = 261.63;
        const semis = (idx - NOTE_CLASSES.indexOf('C'));
        return c4 * Math.pow(2, semis / 12);
      });
      if (typeof playChordFreqs === 'function') playChordFreqs(freqs);
    });
    grid.appendChild(card);
  });
}

function initApp() {
  // Populate selectors
  populateRagaSelect();
  const ragaSel = document.getElementById('ragaSelect');
  const current = RAGAS.find(r => r.id === ragaSel.value) || getRagasByTradition('Both')[0];
  if (current) {
    showRagaInfo(current);
    renderChords(simpleChordCandidates(current.pitchClassesC));
    renderPhrases(current);
  }

  // Events
  document.getElementById('tradition').addEventListener('change', () => {
    populateRagaSelect();
    const r = RAGAS.find(x => x.id === document.getElementById('ragaSelect').value);
    if (r) {
      showRagaInfo(r);
      renderChords(simpleChordCandidates(r.pitchClassesC));
      renderPhrases(r);
    }
  });

  document.getElementById('ragaSelect').addEventListener('change', (e) => {
    const r = RAGAS.find(x => x.id === e.target.value);
    if (r) {
      showRagaInfo(r);
      renderChords(simpleChordCandidates(r.pitchClassesC));
      renderPhrases(r);
    }
  });

  document.getElementById('generateBtn').addEventListener('click', () => {
    const r = RAGAS.find(x => x.id === document.getElementById('ragaSelect').value);
    if (r) renderChords(simpleChordCandidates(r.pitchClassesC));
  });

  document.getElementById('playDroneBtn').addEventListener('click', () => {
    const isOn = toggleDrone('C');
    document.getElementById('playDroneBtn').textContent = isOn ? 'Stop Drone' : 'Play Drone';
  });
}

function renderPhrases(raga) {
  const container = document.getElementById('phrasesList');
  const items = Array.isArray(raga.pakad) ? raga.pakad : [raga.pakad || '-'];
  container.innerHTML = items.map(p => `<div class="badge">${p}</div>`).join('');
}

document.addEventListener('DOMContentLoaded', initApp);

/* === Google Identity Services: Auth-only integration (Non-breaking) === */
function decodeJwtPayload(jwt) {
  try {
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('JWT decode error', e);
    return null;
  }
}

function handleGoogleCredential(response) {
  const payload = decodeJwtPayload(response.credential);
  if (!payload) return;
  const user = { sub: payload.sub, name: payload.name, email: payload.email, picture: payload.picture };
  try { localStorage.setItem('rce_user', JSON.stringify(user)); } catch {}
  applyLoggedInUI(user);
}

function applyLoggedInUI(user) {
  const userInfo = document.getElementById('userInfo');
  const signInBtn = document.getElementById('googleSignInBtn');
  const avatar = document.getElementById('userAvatar');
  const nameEl = document.getElementById('userName');

  if (user) {
    if (avatar) avatar.src = user.picture || '';
    if (nameEl) nameEl.textContent = user.name || '';
    if (userInfo) userInfo.style.display = 'flex';
    if (signInBtn) signInBtn.style.display = 'none';
    document.body.classList.add('logged-in');
  } else {
    if (userInfo) userInfo.style.display = 'none';
    if (signInBtn) signInBtn.style.display = '';
    document.body.classList.remove('logged-in');
  }
}

function initGoogleAuth() {
  const meta = document.querySelector('meta[name="google-signin-client_id"]');
  const clientId = meta && meta.getAttribute('content');

  if (!clientId || !(window.google && google.accounts && google.accounts.id)) {
    setTimeout(initGoogleAuth, 300);
    return;
  }

  google.accounts.id.initialize({
    client_id: clientId,
    callback: handleGoogleCredential,
    auto_select: false,
    context: 'signin',
    ux_mode: 'popup'
  });

  const btn = document.getElementById('googleSignInBtn');
  if (btn) {
    google.accounts.id.renderButton(btn, {
      theme: 'outline', size: 'large', shape: 'pill', text: 'signin_with', logo_alignment: 'left'
    });
  }
  // Optional: google.accounts.id.prompt();
}

function signOut() {
  try { localStorage.removeItem('rce_user'); } catch {}
  if (window.google && google.accounts && google.accounts.id) {
    google.accounts.id.disableAutoSelect();
  }
  applyLoggedInUI(null);
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    const saved = localStorage.getItem('rce_user');
    if (saved) applyLoggedInUI(JSON.parse(saved)); else applyLoggedInUI(null);
  } catch { applyLoggedInUI(null); }
  const signOutBtn = document.getElementById('signOutBtn');
  if (signOutBtn) signOutBtn.addEventListener('click', signOut);
  initGoogleAuth();
});
/* === End GIS block === */
