// ClassBridge demo layer. The Stitch screens are untouched: this file only adds behaviour on top of them.
// Presenter keys: Right/Left = next/previous screen, Alt+1..7 = jump, Alt+A = auto eye-control demo, Alt+C = calibration, Esc = stop.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const P = new URLSearchParams(location.search);
const SPEED = Math.max(1, +P.get('speed') || 1); // test hook only
const FIX_STITCH_DEFECTS = P.get('fix') === '1';   // flip to true to fix the two Stitch defects (see README)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms / SPEED));
const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const words = (t) => t.replace(/[^\w\s']/g, ' ').split(/\s+/).filter(Boolean).length;
const estSec = (t) => Math.max(1.4, words(t) * 0.42);
const clean = (t) => t.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}]/gu, '').replace(/[“”"]/g, '').replace(/\s+/g, ' ').trim();

/* ------------------------------------------------ speech + sound */
const SS = 'speechSynthesis' in window ? window.speechSynthesis : null;
let VOICES = [];
const loadVoices = () => { try { VOICES = SS ? SS.getVoices() : []; } catch { VOICES = []; } };
loadVoices(); if (SS && SS.addEventListener) SS.addEventListener('voiceschanged', loadVoices);
function voiceFor(kind) {
  const en = VOICES.filter((v) => /^en/i.test(v.lang));
  const pick = (re) => en.find((v) => re.test(v.name));
  if (kind === 'teacher') return pick(/samantha|zira|jenny|aria|karen|moira|female|google us english/i) || en[0];
  if (kind === 'student') return pick(/david|guy|mark|daniel|alex|male|google uk english male/i) || en[1] || en[0];
  return en[0];
}
function say(text, { kind = 'teacher', rate = 0.9, wait = false } = {}) {
  return new Promise((res) => {
    const est = (estSec(text) * 1000) / SPEED;
    if (!SS) { wait ? setTimeout(res, est) : res(); return; }
    try {
      const u = new SpeechSynthesisUtterance(clean(text)); const v = voiceFor(kind); if (v) u.voice = v;
      u.rate = rate; u.pitch = kind === 'teacher' ? 1.05 : kind === 'student' ? 1.2 : 1;
      let done = false; const fin = () => { if (!done) { done = true; res(); } };
      u.onend = fin; u.onerror = fin; SS.speak(u);
      if (wait) setTimeout(fin, VOICES.length ? est * 3 + 1500 : est); else res();
    } catch { res(); }
  });
}
const stopSpeech = () => { try { SS && SS.cancel(); } catch { /* ignore */ } };
let AC; const ac = () => AC || (AC = new (window.AudioContext || window.webkitAudioContext)());
function tone(f = 880, d = 0.09, type = 'sine', g = 0.14, at = 0) {
  try { const c = ac(), o = c.createOscillator(), n = c.createGain(), t = c.currentTime + at; o.type = type; o.frequency.value = f;
    n.gain.setValueAtTime(g, t); n.gain.exponentialRampToValueAtTime(0.001, t + d); o.connect(n); n.connect(c.destination); o.start(t); o.stop(t + d); } catch { /* audio blocked */ }
}
function siren(ms = 3000) {
  try { const c = ac(), o = c.createOscillator(), n = c.createGain(); o.type = 'sawtooth'; n.gain.value = 0.07; o.connect(n); n.connect(c.destination);
    const t0 = c.currentTime; for (let i = 0; i < ms / 600; i++) { o.frequency.setValueAtTime(620, t0 + i * 0.6); o.frequency.linearRampToValueAtTime(980, t0 + i * 0.6 + 0.3); o.frequency.linearRampToValueAtTime(620, t0 + i * 0.6 + 0.6); }
    o.start(); o.stop(t0 + ms / 1000); } catch { /* audio blocked */ }
}
const knock = () => [0, 0.28, 0.56].forEach((at) => tone(150, 0.16, 'sine', 0.35, at));
const chime = () => { tone(1046, 0.5, 'sine', 0.16); tone(1318, 0.7, 'sine', 0.12, 0.18); };

/* ------------------------------------------------ screens + presenter navigation */
const ORDER = ['deaf', 'question', 'copilot', 'blind', 'eye', 'keyboard', 'voicebank'];
const SCREEN = Object.fromEntries(ORDER.map((k) => [k, $(`#screen-${k}`)]));
const TABS = { 'talk-space': 'deaf', 'stories-and-play': 'question', 'my-feelings': 'eye', 'together-time': 'keyboard', 'learning-tools': 'copilot' };
let current = 'deaf', autoRunning = false, abortDemo = false;
function show(name) {
  if (!SCREEN[name]) return;
  const leaving = current; current = name;
  for (const k of ORDER) SCREEN[k].hidden = k !== name;
  if (leaving !== name) stopSpeech();
  window.scrollTo(0, 0); gazeVisibility();
  if (name === 'question') runQuestion();
  if (name === 'copilot') runCopilot();
  if (name === 'blind') runBlind();
  if (name === 'voicebank') runVoiceBank();
}
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('nav a[data-path]');
  if (a) { e.preventDefault(); if (!autoRunning) show(TABS[a.dataset.path] || current); }
});
addEventListener('keydown', (e) => {
  const typing = /input|textarea/i.test(e.target.tagName);
  if (e.key === 'Escape') { abortDemo = true; closeAlert(); return; }
  if (typing || autoRunning) return;
  if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); show(ORDER[Math.min(ORDER.length - 1, ORDER.indexOf(current) + 1)]); }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); show(ORDER[Math.max(0, ORDER.indexOf(current) - 1)]); }
  if (!e.altKey) return;
  const k = e.key.toLowerCase();
  if (k >= '1' && k <= '7') { e.preventDefault(); show(ORDER[+k - 1]); }
  if (k === 'a') { e.preventDefault(); autoDemo(false); }
  if (k === 'c') { e.preventDefault(); show('eye'); calibrate(); }
});
const btnText = (root, t) => $$('button', root).find((b) => b.textContent.replace(/\s+/g, ' ').includes(t));

/* ------------------------------------------------ CHAPTER 1: deaf view (smart captions + sound alerts) */
// [spoken by the teacher, simplified caption shown on screen (**key words** highlighted)]
const LECTURE = [
  ['Good morning, class! Today we are going to discover how plants make their very own food.', 'Today: how **plants** make **food**.'],
  ['Plants drink water through their roots, deep down in the soil.', '**Roots** drink **water** from the soil.'],
  ['That water travels up from the deep roots into the tall stem.', 'The **water** climbs up the **stem**.'],
  ['Leaves take in fresh carbon dioxide directly from the gentle air.', 'Leaves breathe in **carbon dioxide**.'],
  ['Chlorophyll in the leaves traps sunlight energy to make sweet food!', '**Chlorophyll** catches **sunlight** to make **food**!'],
  ['This special food-making job has a big name: photosynthesis.', 'Big word: **photosynthesis** = making food from light.'],
  ['Then the plant releases cool oxygen for all of us to breathe!', 'The plant gives us **oxygen** to breathe.'],
  ['Remember, without sunlight, the plant cannot make its food.', 'No **sunlight** = no food.'],
  ['Even on cloudy days, a little daylight still does the job, just more slowly.', 'Cloudy day? A little **daylight** still works.'],
  ['For homework, watch a plant on your windowsill this week and tell me what you see.', '**Homework**: watch a plant this week.'],
];
const PERIOD = 6.2, LEADIN = 1.0, TOTAL = LEADIN + PERIOD * LECTURE.length + 1;
const START = LECTURE.map((_, i) => LEADIN + i * PERIOD);
// sound -> visual alerts, fired on the lecture clock. The room makes the sound, the screen makes it visible.
const ALERTS = [{ t: 20.5, type: 'knock' }, { t: 33.5, type: 'name' }, { t: 46.5, type: 'alarm' }];
const S = { started: false, ended: false, finished: false, t: 0, spoken: -1, paused: false, shown: [], queue: [], cur: -1, catchup: 0, alerted: new Set() };
const stream = $('#caption-stream', SCREEN.deaf);
const pill = $$('span', SCREEN.deaf).find((s) => s.textContent.trim() === 'Sync Active');
const timerEl = $$('span', SCREEN.deaf).find((s) => /^\d+:\d+ \/ \d+:\d+$/.test(s.textContent.trim()));
const barEl = $('.h-5 > div', SCREEN.deaf);
const P_OLD1 = 'font-body-lg text-body-lg text-outline transition-opacity duration-300 select-none';
const P_OLD2 = 'font-body-xl text-body-xl text-on-surface-variant transition-opacity duration-300 select-none';
const P_NEXT = 'font-body-xl text-body-xl text-outline-variant select-none';
const CARD = 'p-space-md rounded-lg bg-secondary-container text-on-secondary-container shadow-md transform transition-transform';
const cap = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, '<span class="bg-surface-container-lowest/80 rounded-md px-2 text-primary font-black">$1</span>');
const plain = (t) => t.replace(/\*\*/g, '');
const EMO = ['🌿', '💧', '💧', '🍃', '☀️', '🌱', '🍃', '☀️', '⛅', '📝'];
const cardLabel = () => (stream.dataset.label || 'Currently being signed on screen'); // Stitch's own label text is kept as designed
if (!stream.dataset.label) stream.dataset.label = $$('span', stream).map((s) => s.textContent.trim()).find((t) => /signed on screen/i.test(t)) || 'Currently being signed on screen';
function renderCaptions() {
  const cur = S.cur, prior = S.shown.filter((i) => i !== cur).slice(-2);
  let html = '';
  prior.forEach((i, k) => { html += `<p class="${prior.length === 2 && k === 0 ? P_OLD1 : P_OLD2}">${esc(plain(LECTURE[i][1]))}</p>`; });
  if (cur < 0) html += `<div class="${CARD}"><div class="flex items-start gap-space-xs"><span class="text-3xl leading-none select-none">🌱</span><p class="font-headline-md text-headline-md font-extrabold leading-snug">${S.started ? 'Listening to Ms. Sarah…' : 'Press “Play lesson” to begin.'}</p></div></div>`;
  else html += `<div class="${CARD}"><div class="flex items-start gap-space-xs"><span class="text-3xl leading-none select-none">${EMO[cur]}</span><p class="font-headline-md text-headline-md font-extrabold leading-snug">${cap(LECTURE[cur][1])}</p></div><div class="mt-space-xs flex items-center gap-2 text-on-secondary-container/80 font-label-md text-label-md"><span class="material-symbols-outlined text-[18px]">translate</span><span>${esc(cardLabel())}</span></div></div>`;
  S.queue.slice(0, 3).forEach((i) => { html += `<p class="${P_NEXT}">Next: ${esc(plain(LECTURE[i][1]))}</p>`; });
  if (S.queue.length > 3) html += `<p class="${P_NEXT}">+ ${S.queue.length - 3} more waiting</p>`;
  stream.innerHTML = html;
}
function setPill(text, tone) {
  if (!pill) return;
  const map = { live: 'bg-tertiary-fixed text-on-tertiary-fixed', paused: 'bg-secondary-container text-on-secondary-container', done: 'bg-primary-fixed text-on-primary-fixed' };
  for (const k in map) pill.classList.remove(...map[k].split(' ')); pill.classList.add(...map[tone].split(' '));
  pill.lastChild.textContent = ` ${text} `; const dot = pill.firstElementChild; if (dot) dot.style.animation = tone === 'live' ? '' : 'none';
}
function renderStatus() {
  if (S.finished) setPill('Lecture saved', 'done');
  else if (S.paused) setPill(S.queue.length ? `Captions paused · ${S.queue.length} waiting` : 'Captions paused', 'paused');
  else if (S.queue.length) setPill('Catching up', 'live');
  else setPill('Sync Active', 'live');
  if (S.started) {
    if (timerEl) timerEl.textContent = `${fmt(Math.min(S.t, TOTAL))} / ${fmt(TOTAL)}`;
    if (barEl) barEl.style.width = `${Math.min(100, (S.t / TOTAL) * 100)}%`;
  }
}
function resetLesson() { Object.assign(S, { started: false, ended: false, finished: false, t: 0, spoken: -1, paused: false, shown: [], queue: [], cur: -1, catchup: 0, alerted: new Set() }); stopSpeech(); closeAlert(); }
btnText(SCREEN.deaf, 'Play lesson').addEventListener('click', () => { if (S.started && !S.finished) return; resetLesson(); S.started = true; renderCaptions(); renderStatus(); });
btnText(SCREEN.deaf, 'Wait').addEventListener('click', () => { if (S.started && !S.finished && !S.paused) { S.paused = true; renderStatus(); } });
btnText(SCREEN.deaf, 'Continue').addEventListener('click', () => { if (S.paused) { S.paused = false; S.catchup = 0; renderStatus(); } });
btnText(SCREEN.deaf, 'I have a question').addEventListener('click', () => show('question'));

// full-screen visual alerts: pulses, flashes, strobe. Icons only, no text.
const layer = document.createElement('div'); layer.style.cssText = 'position:fixed;inset:0;z-index:95;pointer-events:none;display:none'; document.body.appendChild(layer);
let alertAnims = [];
function closeAlert() { alertAnims.forEach((a) => { try { a.cancel(); } catch { /* ignore */ } }); alertAnims = []; layer.style.display = 'none'; layer.innerHTML = ''; }
function fireAlert(type) {
  closeAlert(); layer.style.display = 'block';
  const cfg = { knock: { icon: '🚪', color: 'rgba(0,97,148,', ms: 2800, pulses: 3 }, name: { icon: '📣', color: 'rgba(0,133,91,', ms: 2600, pulses: 2 }, alarm: { icon: '🚨', color: 'rgba(186,26,26,', ms: 3600, pulses: 8 } }[type];
  const frame = document.createElement('div'); frame.style.cssText = 'position:absolute;inset:0';
  const icon = document.createElement('div'); icon.textContent = cfg.icon; icon.style.cssText = 'position:absolute;left:50%;top:50%;font-size:min(34vw,300px);line-height:1;transform:translate(-50%,-50%);filter:drop-shadow(0 12px 30px rgba(0,0,0,.35))';
  layer.append(frame, icon);
  const dur = cfg.ms / SPEED / cfg.pulses;
  alertAnims.push(frame.animate([{ boxShadow: `inset 0 0 0 0 ${cfg.color}0)`, background: `${cfg.color}0)` }, { boxShadow: `inset 0 0 0 38px ${cfg.color}.85)`, background: `${cfg.color}.28)` }, { boxShadow: `inset 0 0 0 0 ${cfg.color}0)`, background: `${cfg.color}0)` }], { duration: dur, iterations: cfg.pulses }));
  alertAnims.push(icon.animate([{ transform: 'translate(-50%,-50%) scale(.6)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1.05)', opacity: 1 }, { transform: 'translate(-50%,-50%) scale(.85)', opacity: 0.15 }], { duration: dur, iterations: cfg.pulses }));
  try { navigator.vibrate && navigator.vibrate(type === 'alarm' ? [300, 120, 300, 120, 300] : [220, 90, 220]); } catch { /* ignore */ }
  if (type === 'knock') knock(); if (type === 'name') say('Leo?', { kind: 'teacher', rate: 0.85 }); if (type === 'alarm') siren(3400);
  setTimeout(closeAlert, cfg.ms / SPEED + 200);
}
function deafTick(dt) {
  if (!S.started) return;
  let dirty = false;
  if (!S.ended) {
    S.t += dt;
    while (S.spoken + 1 < LECTURE.length && S.t >= START[S.spoken + 1]) { S.spoken++; say(LECTURE[S.spoken][0], { kind: 'teacher', rate: 0.88 }); S.queue.push(S.spoken); dirty = true; }
    for (const a of ALERTS) if (S.t >= a.t && !S.alerted.has(a.t)) { S.alerted.add(a.t); fireAlert(a.type); }
    if (S.t >= TOTAL) S.ended = true;
  }
  if (!S.paused) {
    S.catchup -= dt;
    // normal: a caption appears a moment after the voice starts; after Continue: catch up quickly, one line at a time
    const wait = S.queue.length > 1 ? 1.1 : 0.9;
    if (S.queue.length && S.catchup <= 0 && (S.t >= START[S.queue[0]] + 0.9 || S.queue.length > 1 || S.ended)) {
      if (S.cur >= 0) S.shown.push(S.cur); S.cur = S.queue.shift(); S.catchup = wait; dirty = true;
    }
    if (S.ended && !S.queue.length && !S.finished) { S.finished = true; dirty = true; }
  }
  if (dirty) renderCaptions();
  renderStatus();
}

/* ------------------------------------------------ question moment */
let qTok = 0;
const grid = $('.grid.grid-cols-1.gap-space-lg', SCREEN.question), thankBtn = $('#thank-you-btn');
const setVis = (el, on) => { el.style.transition = 'opacity .55s ease, transform .55s ease'; el.style.opacity = on ? '1' : '0'; el.style.transform = on ? 'none' : 'translateY(18px)'; };
async function runQuestion() {
  const tok = ++qTok, ok = () => tok === qTok && current === 'question';
  const [b1, conn, b2] = grid.children;
  [b1, conn, b2].forEach((el) => setVis(el, false)); thankBtn.style.opacity = '.4'; thankBtn.style.pointerEvents = 'none'; thankBtn.classList.remove('animate-pulse');
  await sleep(700); if (!ok()) return;
  await say('Question to the teacher.', { kind: 'system', wait: true }); if (!ok()) return;
  await sleep(500); if (!ok()) return;
  setVis(b1, true); await say(clean($('p.font-body-xl', b1).textContent), { kind: 'student', wait: true }); if (!ok()) return;
  await sleep(900); if (!ok()) return;
  setVis(conn, true); await sleep(450); setVis(b2, true); await say(clean($('p.font-body-xl', b2).textContent), { kind: 'teacher', wait: true }); if (!ok()) return;
  thankBtn.style.opacity = '1'; thankBtn.style.pointerEvents = 'auto'; thankBtn.classList.add('animate-pulse');
}
thankBtn.addEventListener('click', () => { thankBtn.classList.remove('animate-pulse'); say('Thank you, Ms. Sarah.', { kind: 'student' }); });

/* ------------------------------------------------ copilot: notes write themselves, questions are tappable (Stitch script handles answers) */
let cTok = 0;
async function runCopilot() {
  const tok = ++cTok, ok = () => tok === cTok && current === 'copilot';
  const list = $('div.flex.flex-col.gap-space-md.mt-space-xs', SCREEN.copilot), notes = list ? [...list.children] : [];
  const foot = $('#readNotesBtn').closest('div.flex.items-center.justify-between');
  notes.forEach((n) => { n.style.transition = 'none'; n.style.opacity = '0'; n.style.transform = 'translateY(14px)'; });
  if (foot) { foot.style.transition = 'none'; foot.style.opacity = '0'; }
  const bubble = $('#privateBubble'); bubble.style.transition = 'opacity .5s'; bubble.style.opacity = '0';
  await sleep(500); if (!ok()) return;
  for (const n of notes) { n.style.transition = 'opacity .6s ease, transform .6s ease'; n.style.opacity = '1'; n.style.transform = 'none'; await sleep(1500); if (!ok()) return; }
  if (foot) { foot.style.transition = 'opacity .6s'; foot.style.opacity = '1'; }
}
$$('.question-btn').forEach((b) => b.addEventListener('click', () => { const bub = $('#privateBubble'); bub.style.transition = 'opacity .5s'; bub.style.opacity = '1'; setTimeout(() => say($('#privateText').innerText, { kind: 'teacher', rate: 0.92 }), 60); }));
$('#voiceBankBtn').addEventListener('click', () => show('voicebank'), true);

/* ------------------------------------------------ blind view extras (Stitch script already speaks each button) */
const announcer = $('#audio-announcer');
const heard = $$('p, h2, div', SCREEN.blind).find((e) => /Ms\. Sarah says/i.test(e.textContent) && e.children.length < 4);
async function runBlind() {
  let ok = true; const c = current; await sleep(700); if (current !== c) return;
  const replay = $('#voice-replay-btn'); if (replay) replay.click(); void ok;
}
const wave = $$('div', SCREEN.blind).find((d) => d.children.length >= 5 && [...d.children].every((k) => k.classList.contains('rounded-full') && /w-1|w-1\.5|w-2/.test(k.className)));
if (wave) [...wave.children].forEach((bar, i) => bar.animate([{ transform: 'scaleY(.5)' }, { transform: 'scaleY(1.35)' }, { transform: 'scaleY(.6)' }], { duration: 900 + i * 130, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }));
const setAnn = (t) => { if (announcer) announcer.textContent = t; };
$('#btn-action-ask')?.addEventListener('click', async () => {   // scripted voice question -> spoken answer
  await sleep(3800); if (current !== 'blind') return;
  const q = 'How many slices are colored gold?', a = 'Two of the four slices are gold. That is exactly one half.';
  setAnn(`You asked: ${q}`); await say(q, { kind: 'student', wait: true }); await sleep(500); if (current !== 'blind') return;
  setAnn(`Answer: ${a}`); await say(a, { kind: 'teacher', wait: true });
});
$('#btn-action-alerts, #btn-action-sound')?.addEventListener('click', chime);
$$('button', SCREEN.blind).filter((b) => /SOUND ALERTS/i.test(b.textContent)).forEach((b) => b.addEventListener('click', async () => { chime(); await sleep(1500); if (current === 'blind') say('Name called: Leo. Please look at the board.', { kind: 'teacher', wait: false }); }));
SCREEN.blind.addEventListener('click', (e) => {   // "tap anything and it reads back"
  if (e.target.closest('button, a')) return;
  const el = e.target.closest('p, h1, h2, h3, span, div'); const t = el && clean(el.textContent);
  if (t && t.length > 2 && t.length < 260) { stopSpeech(); say(t, { kind: 'teacher', rate: 0.95 }); }
});

/* ------------------------------------------------ eye control: gaze cursor, dwell, calibration, auto demo */
const G = { x: innerWidth / 2, y: innerHeight / 2, bx: innerWidth / 2, by: innerHeight / 2, vis: false, auto: false, dwell: 850, el: null, t: 0, fired: new WeakSet(), calibrating: false, moving: false };
const gaze = document.createElement('div');
gaze.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;z-index:80;pointer-events:none;display:none';
gaze.innerHTML = '<svg width="84" height="84" viewBox="0 0 84 84" style="position:absolute;left:-42px;top:-42px;transform:rotate(-90deg)"><circle cx="42" cy="42" r="34" fill="rgba(0,97,148,.10)" stroke="rgba(0,97,148,.28)" stroke-width="6"/><circle id="gaze-arc" cx="42" cy="42" r="34" fill="none" stroke="#fea619" stroke-width="7" stroke-linecap="round" stroke-dasharray="213.6" stroke-dashoffset="213.6"/></svg><div style="position:absolute;left:-7px;top:-7px;width:14px;height:14px;border-radius:50%;background:#006194;box-shadow:0 0 0 3px #fff"></div>';
document.body.appendChild(gaze);
const arc = $('#gaze-arc'); const setRing = (p) => { arc.style.strokeDashoffset = String(213.6 * (1 - Math.max(0, Math.min(1, p)))); };
for (const b of [...$$('button', SCREEN.eye), ...$$('button', SCREEN.keyboard)]) b.setAttribute('data-gaze', '');
function gazeVisibility() { gaze.style.display = (current === 'eye' || current === 'keyboard') && G.vis ? 'block' : 'none'; }
addEventListener('pointermove', (e) => { if (G.auto || G.calibrating) return; G.x = e.clientX; G.y = e.clientY; G.vis = true; gazeVisibility(); });
function gazeTick(dt) {
  if (G.auto) { G.x = G.bx + Math.sin(performance.now() / 95) * 1.6; G.y = G.by + Math.cos(performance.now() / 110) * 1.6; }
  if (gaze.style.display === 'none') return;
  gaze.style.transform = `translate(${G.x}px,${G.y}px)`; if (G.calibrating) return;
  if (G.moving) { G.t = 0; setRing(0); return; }
  const hit = document.elementFromPoint(G.x, G.y), el = hit && hit.closest ? hit.closest('[data-gaze]') : null;
  if (el !== G.el) { if (G.el) G.fired.delete(G.el); G.el = el; G.t = 0; setRing(0); return; }
  if (el && !G.fired.has(el)) { G.t += dt * 1000; setRing(G.t / G.dwell); if (G.t >= G.dwell) { G.fired.add(el); setRing(1); tone(880, 0.1); el.click(); } }
}
// KEYBOARD tile -> typing screen, Back -> phrase grid, EMERGENCY -> alarm (captured before Stitch's own handlers)
SCREEN.eye.addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return; const label = b.textContent.replace(/\s+/g, ' ');
  if (/KEYBOARD/.test(label)) { e.stopPropagation(); show('keyboard'); }
  if (/EMERGENCY/.test(label)) { siren(3000); flashRed(); }
}, true);
SCREEN.keyboard.addEventListener('click', (e) => { if (e.target.closest('#btn-back')) { e.stopPropagation(); tone(660, 0.08); show('eye'); } }, true);
const flashEl = document.createElement('div'); flashEl.style.cssText = 'position:fixed;inset:0;z-index:90;pointer-events:none;background:rgba(186,26,26,.38);opacity:0;transition:opacity .25s'; document.body.appendChild(flashEl);
let flashT = null;
function flashRed() { let on = true; clearInterval(flashT); const t0 = performance.now(); flashT = setInterval(() => { flashEl.style.opacity = on ? '1' : '0'; on = !on; if (performance.now() - t0 > 3000) { clearInterval(flashT); flashEl.style.opacity = '0'; } }, 300 / SPEED); }
const calib = document.createElement('div'); calib.style.cssText = 'position:fixed;inset:0;z-index:75;background:rgba(250,248,255,.97);display:none';
calib.innerHTML = '<div class="font-headline-lg text-headline-lg text-primary font-extrabold" style="position:absolute;left:0;right:0;top:19%;text-align:center" id="calib-title"></div><div class="font-body-xl text-body-xl text-on-surface-variant" style="position:absolute;left:0;right:0;top:calc(19% + 62px);text-align:center" id="calib-sub"></div><div id="calib-dot" style="position:absolute;width:54px;height:54px;border-radius:50%;background:#fea619;box-shadow:0 0 0 10px rgba(254,166,25,.3);transform:translate(-50%,-50%);display:none"></div>';
document.body.appendChild(calib);
const POINTS = [[0.12, 0.14], [0.88, 0.14], [0.5, 0.5], [0.12, 0.86], [0.88, 0.86]];
function moveTo(x, y, ms) {
  const x0 = G.bx, y0 = G.by, t0 = performance.now(); G.moving = true;
  return new Promise((res) => { const step = () => { if (abortDemo) { G.moving = false; return res(); } const t = Math.min(1, (performance.now() - t0) / (ms / SPEED)), e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; G.bx = x0 + (x - x0) * e; G.by = y0 + (y - y0) * e; if (t < 1) requestAnimationFrame(step); else { G.moving = false; res(); } }; step(); });
}
async function calibrate() {
  G.calibrating = true; G.auto = true; G.vis = true; calib.style.display = 'block'; gazeVisibility();
  const title = $('#calib-title'), sub = $('#calib-sub'), dot = $('#calib-dot');
  title.textContent = 'Let’s set up eye control'; sub.textContent = 'Look at each glowing dot'; await sleep(1500);
  for (let i = 0; i < POINTS.length && !abortDemo; i++) {
    const x = POINTS[i][0] * innerWidth, y = POINTS[i][1] * innerHeight; dot.style.left = x + 'px'; dot.style.top = y + 'px'; dot.style.display = 'block'; sub.textContent = `Dot ${i + 1} of 5`;
    await moveTo(x, y, 650); for (let k = 0; k <= 20 && !abortDemo; k++) { setRing(k / 20); await sleep(45); } tone(660 + i * 90, 0.09);
  }
  dot.style.display = 'none'; setRing(0); title.textContent = 'All set! ✅'; sub.textContent = 'Eye control is ready'; await sleep(1200); calib.style.display = 'none'; G.calibrating = false;
}
// Stitch defect (invisible fix): the key labelled "S" carried data-key="B", so tapping it typed B. Make every key type what it shows.
for (const k of $$('.key-btn', SCREEN.keyboard)) { const t = k.textContent.trim(); if (t.length === 1 && k.dataset.key !== t) k.dataset.key = t; }
const tile = (txt) => $$('button', SCREEN.eye).find((b) => b.textContent.replace(/\s+/g, ' ').includes(txt));
const keyBtn = (ch) => (ch === ' ' ? $('#btn-space') : $$('.key-btn', SCREEN.keyboard).find((b) => b.dataset.key === ch));
async function look(el, ms = 900, dwell = 850) {
  if (!el || abortDemo) return; G.dwell = dwell; el.scrollIntoView({ block: 'center' }); G.fired.delete(el); if (G.el === el) G.t = 0;
  const r = el.getBoundingClientRect(); await moveTo(r.left + r.width / 2, r.top + r.height / 2, ms);
  await new Promise((res) => { const t0 = performance.now(); const chk = () => { if (abortDemo || G.fired.has(el) || performance.now() - t0 > (dwell + 1500) / SPEED) return res(); requestAnimationFrame(chk); }; chk(); });
}
async function autoDemo(skipCal = false) {
  if (autoRunning) return; autoRunning = true; abortDemo = false; document.body.style.cursor = 'none';
  try {
    show('eye'); G.auto = true; G.vis = true; G.bx = innerWidth * 0.5; G.by = innerHeight * 0.5; gazeVisibility(); await sleep(700);
    if (!skipCal) await calibrate();
    await look(tile('UNDERSTAND')); await sleep(2000); await look(tile('REPEAT')); await sleep(1800);
    await look(tile('KEYBOARD'), 900); await sleep(900); $('#btn-clear-all').click(); await sleep(500);
    for (const ch of 'HELLO MS SARAH') { await look(keyBtn(ch), 520, 500); if (abortDemo) break; }
    await sleep(500); await look($('#btn-speak')); await sleep(3000); await look($('#btn-back')); await sleep(900); await look(tile('EMERGENCY'), 1000); await sleep(3400);
  } finally { G.auto = false; G.calibrating = false; calib.style.display = 'none'; document.body.style.cursor = ''; G.vis = false; gazeVisibility(); autoRunning = false; setRing(0); }
}

/* ------------------------------------------------ voice bank (real mic recording) + EEG yes/no */
let rec = null, myVoice = null, recChunks = [], recStream = null;
async function startRec() {
  try { recStream = await navigator.mediaDevices.getUserMedia({ audio: true }); recChunks = []; rec = new MediaRecorder(recStream); rec.ondataavailable = (e) => recChunks.push(e.data);
    rec.onstop = () => { myVoice = URL.createObjectURL(new Blob(recChunks, { type: rec.mimeType || 'audio/webm' })); recStream.getTracks().forEach((t) => t.stop()); }; rec.start(); } catch { rec = null; }
}
$('#record-btn').addEventListener('click', () => { if (isRecording) startRec(); else if (rec && rec.state === 'recording') rec.stop(); });
$$('[onclick]', SCREEN.voicebank).forEach((el) => {
  const m = /playPhrase\('([^']+)'\)/.exec(el.getAttribute('onclick') || ''); if (m) el.addEventListener('click', () => say(m[1], { kind: 'teacher', rate: 0.9 }));
  if (/previewVoiceGreeting/.test(el.getAttribute('onclick') || '')) el.addEventListener('click', () => { if (myVoice) { try { new Audio(myVoice).play(); } catch { /* ignore */ } } else say('Hello friends, this is my ClassBridge voice!', { kind: 'student' }); });
});
let eegTok = 0;
async function runVoiceBank() {
  const tok = ++eegTok; const ok = () => tok === eegTok && current === 'voicebank'; const st = $('#thought-status');
  const yes = $('#btn-yes'); await new Promise((res) => { const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { io.disconnect(); res(); } }, { threshold: 0.7 }); io.observe(yes); setTimeout(() => { io.disconnect(); res(); }, 60000); });
  if (!ok()) return; await sleep(2200); if (!ok()) return;
  st.innerHTML = 'Current detected thought: <span class="text-primary">Reading your brain waves…</span>'; await sleep(2600); if (!ok()) return;
  st.innerHTML = 'Current detected thought: <span class="text-primary">Leaning towards YES…</span>'; await sleep(1800); if (!ok()) return;
  chime(); chooseThought('YES'); say('Yes.', { kind: 'student' });
}

/* ------------------------------------------------ optional Stitch defect fixes (off by default: the design stays exactly as Stitch made it) */
if (FIX_STITCH_DEFECTS) {
  const st = document.createElement('style'); st.textContent = 'nav a{white-space:nowrap}'; document.head.appendChild(st);
  for (const el of $$('*', SCREEN.blind)) for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.includes('&frac24')) n.textContent = n.textContent.replace('&frac24;', '2⁄4').replace('&frac24', '2⁄4');
}

/* ------------------------------------------------ main loop */
let last = performance.now();
function loop(now) { const dt = Math.min(0.1, (now - last) / 1000) * SPEED; last = now; if (current === 'deaf') deafTick(dt); gazeTick(dt); requestAnimationFrame(loop); }
show('deaf'); requestAnimationFrame(loop);
window.CB = { S, G, show, autoDemo, calibrate, fireAlert, LECTURE, ALERTS, TOTAL, get current() { return current; } };
