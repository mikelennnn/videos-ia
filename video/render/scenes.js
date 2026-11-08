// ---------- overlays: subtítulos karaoke, badges, partículas, grano ----------
let WORDS = [], CHUNKS = [];
const END = 57.0;
function buildChunks() {
  CHUNKS = []; let cur = [];
  WORDS.forEach((w, i) => { cur.push(i); const nx = WORDS[i + 1]; const end = /[.,?…:!]$/.test(w.w);
    if (cur.length >= 3 || end || !nx || nx.s - w.e > .35) { CHUNKS.push(cur); cur = []; } });
}
function caption(c, t) {
  let ci = -1; for (let i = 0; i < CHUNKS.length; i++) if (WORDS[CHUNKS[i][0]].s <= t + .03) ci = i; if (ci < 0) return;
  const ch = CHUNKS[ci], last = WORDS[ch[ch.length - 1]]; if (t > last.e + .6) return;
  c.save(); c.font = '800 70px Nunito'; c.textBaseline = 'middle';
  const parts = ch.map(i => WORDS[i].w), sp = c.measureText(' ').width, ws = parts.map(p => c.measureText(p).width);
  let x = W / 2 - (ws.reduce((a, b) => a + b, 0) + sp * (parts.length - 1)) / 2; const y = 352;
  let curI = -1; ch.forEach((wi, k) => { if (WORDS[wi].s <= t + .03) curI = k; });
  ch.forEach((wi, k) => {
    const w = WORDS[wi]; if (k > curI) { x += ws[k] + sp; return; }
    const isCur = k === curI, p = eBack((t - w.s) / .16), s = isCur ? .88 + .12 * p : 1;
    c.save(); c.translate(x + ws[k] / 2, y); c.scale(s, s);
    c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 18; c.shadowOffsetY = 4;
    c.textAlign = 'center'; if (!isCur) { c.lineWidth = 5; c.strokeStyle = 'rgba(20,20,30,.28)'; c.strokeText(w.w, 0, 0); } c.fillStyle = isCur ? '#ffffff' : 'rgba(178,182,190,.95)'; c.fillText(w.w, 0, 0); c.restore();
    x += ws[k] + sp;
  });
  c.restore();
}
function badge(c, t, t0, t1, num, unit, y = 650, x = W / 2) {
  if (t < t0 || t > t1 + .3) return; const a = eBack((t - t0) / .4), out = t > t1 ? 1 - clamp((t - t1) / .25) : 1;
  c.save(); c.translate(x, y + Math.sin((t - t0) * 2.2) * 5); const s = (.55 + .45 * a) * (out < 1 ? .85 + .15 * out : 1); c.scale(s, s); c.globalAlpha = clamp(a * 1.6) * out;
  c.font = '900 150px Nunito'; const nw = c.measureText(num).width; c.font = '800 70px Nunito'; const uw = unit ? c.measureText(unit).width + 16 : 0;
  const w = nw + uw + 96, h = 196;
  c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 30; c.shadowOffsetY = 8; rrect(c, -w / 2, -h / 2, w, h, 44); c.fillStyle = 'rgba(14,13,18,.8)'; c.fill();
  c.shadowColor = 'transparent'; c.strokeStyle = 'rgba(255,255,255,.10)'; c.lineWidth = 3; c.stroke();
  const g = c.createLinearGradient(0, -60, 0, 60); g.addColorStop(0, '#fff7dc'); g.addColorStop(.55, '#ffd57e'); g.addColorStop(1, '#e8a33c');
  c.fillStyle = g; c.shadowColor = 'rgba(255,190,90,.45)'; c.shadowBlur = 26; c.textBaseline = 'alphabetic';
  c.font = '900 150px Nunito'; c.fillText(num, -w / 2 + 48, 54);
  if (unit) { c.font = '800 70px Nunito'; c.fillText(unit, -w / 2 + 48 + nw + 16, 54); }
  c.restore();
}
function iconPill(c, t, t0, t1, x, y, r, draw) {
  if (t < t0 || t > t1 + .3) return; const a = eBack((t - t0) / .4), out = t > t1 ? 1 - clamp((t - t1) / .25) : 1;
  c.save(); c.translate(x, y + Math.sin((t - t0) * 2.2) * 5); c.scale((.55 + .45 * a) * out, (.55 + .45 * a) * out); c.globalAlpha = clamp(a * 1.6) * out;
  c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 30; rrect(c, -r, -r, r * 2, r * 2, r * .32); c.fillStyle = 'rgba(14,13,18,.8)'; c.fill(); c.shadowColor = 'transparent';
  c.strokeStyle = 'rgba(255,255,255,.10)'; c.lineWidth = 3; c.stroke(); draw(c, t - t0); c.restore();
}
function motes(c, t, o) {
  const spr = o.spr || A.dotWarm; c.save(); c.globalCompositeOperation = 'lighter';
  for (let i = 0; i < o.n; i++) { const sx = hash(i + o.seed), sy = hash(i * 3.1 + o.seed), sp = .3 + hash(i * 7.7) * .7;
    const x = ((sx * W + t * 18 * sp + Math.sin(t * .7 + i) * 30) % (W + 100) + W + 100) % (W + 100) - 50;
    const y = ((sy * H - t * 30 * sp * (o.rise ?? 1)) % H + H) % H; const sz = (o.size || 14) * (.4 + hash(i * 1.3) * .9);
    c.globalAlpha = (o.a || .5) * (.4 + .6 * Math.abs(Math.sin(t * 1.3 + i * 2.1))); c.drawImage(spr, x - sz, y - sz, sz * 2, sz * 2); }
  c.restore();
}
function droplets(c, t, t0, x, y, n, seed, sc = 1) {
  const lt = t - t0; if (lt < 0 || lt > 1.4) return; c.save();
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (hash(i + seed) - .5) * 2.6, v = (350 + hash(i * 2 + seed) * 650) * sc;
    const px = x + Math.cos(a) * v * lt, py = y + Math.sin(a) * v * lt + 1400 * sc * lt * lt; const r = (7 + hash(i * 5 + seed) * 11) * sc;
    c.globalAlpha = 1 - clamp((lt - .8) / .6); c.fillStyle = '#c4161f'; c.beginPath(); c.ellipse(px, py, r, r * 1.15, 0, 0, TAU); c.fill();
    c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.arc(px - r * .35, py - r * .35, r * .3, 0, TAU); c.fill(); }
  c.restore();
}
function sparks(c, t, t0, x, y, n, seed, col = '255,255,255') {
  const lt = t - t0; if (lt < 0 || lt > .5) return; c.save(); c.lineCap = 'round';
  for (let i = 0; i < n; i++) { const a = hash(i + seed) * TAU, d0 = 30 + lt * (500 + hash(i * 3 + seed) * 500), L = 40 + hash(i) * 60;
    c.strokeStyle = `rgba(${col},${1 - lt / .5})`; c.lineWidth = 5; c.beginPath(); c.moveTo(x + Math.cos(a) * d0, y + Math.sin(a) * d0); c.lineTo(x + Math.cos(a) * (d0 + L), y + Math.sin(a) * (d0 + L)); c.stroke(); }
  c.restore();
}
function stars(c, t, n, seed, h = 900, a = .8) { c.save(); for (let i = 0; i < n; i++) { const x = hash(i + seed) * W, y = hash(i * 1.7 + seed) * h, s = 1 + hash(i * 3.3) * 2.5; c.globalAlpha = a * (.3 + .7 * Math.abs(Math.sin(t * (.5 + hash(i)) + i))); c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y, s, 0, TAU); c.fill(); } c.restore(); }
function hills(c, y, amp, col, seed, x0 = -300, x1 = W + 300) { c.beginPath(); c.moveTo(x0, H + 200); for (let x = x0; x <= x1; x += 20) c.lineTo(x, y + Math.sin(x * .004 + seed) * amp + Math.sin(x * .011 + seed * 2) * amp * .35); c.lineTo(x1, H + 200); c.closePath(); c.fillStyle = col; c.fill(); }
function fence(c, y, s, col = '#6b4a30', x0 = -200, x1 = W + 200) {
  c.save(); c.fillStyle = col; for (let x = x0; x < x1; x += 130 * s) { rrect(c, x, y - 120 * s, 20 * s, 140 * s, 4 * s); c.fill(); }
  c.fillRect(x0, y - 100 * s, x1 - x0, 14 * s); c.fillRect(x0, y - 55 * s, x1 - x0, 14 * s);
  c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(x0, y - 100 * s, x1 - x0, 4 * s); c.fillRect(x0, y - 55 * s, x1 - x0, 4 * s); c.restore();
}
function sky(c, stops, y0 = -300, y1 = 1300) { c.fillStyle = vgrad(c, y0, y1, stops); c.fillRect(-400, -400, W + 800, H + 800); }
function cam(c, lt, dur, a, b, punch = true) {
  const p = eInOut(lt / dur), z = lerp(a[0], b[0], p) * (punch ? 1 + .07 * (1 - eOut(lt / .4)) : 1), x = lerp(a[1], b[1], p), y = lerp(a[2], b[2], p);
  c.translate(W / 2, H / 2); c.scale(z, z); c.translate(-x, -y);
}
function shake(c, t, t0, amt = 22, dur = .35) { const k = 1 - clamp((t - t0) / dur); if (t < t0 || k <= 0) return; c.translate((hash(t * 91) - .5) * amt * k, (hash(t * 57) - .5) * amt * k); }
function flash(c, t, t0, dur = .25, col = '255,255,255') { const lt = t - t0; if (lt < 0 || lt > dur) return; c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = `rgba(${col},${(1 - lt / dur) * .9})`; c.fillRect(0, 0, W, H); c.restore(); }
function grassLayer(c, img, y, ox = 0) { c.drawImage(img, -210 + ox, y, 1500, 1100); }
function wordT(i) { return WORDS[i].s; }

// ---------- escenas ----------
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }

// 1. Gancho: atardecer en la granja, el pollo pierde la cabeza
scene(0, (c, t, lt) => {
  const tc = wordT(6) + .05;
  shake(c, t, tc); cam(c, lt, 4.4, [1.0, 540, 1180], [1.1, 540, 1150], false);
  sky(c, [[0, '#24163a'], [.4, '#5e3460'], [.7, '#d97a6a'], [.85, '#f7b47c']], -300, 1180);
  stars(c, t, 40, 1, 600, .6); glow(c, 540, 1150, 650, '255,170,110', .55);
  c.drawImage(A.cloudW[0], -60 + lt * 8, 520, 420, 194); c.drawImage(A.cloudW[1], 700 - lt * 6, 650, 380, 175);
  hills(c, 1085, 30, '#6a4060', 1); hills(c, 1130, 22, '#4c3352', 3);
  c.drawImage(A.barn, 90, 960, 190, 190); c.drawImage(A.tree2, 780, 930, 170, 226);
  c.fillStyle = 'rgba(255,230,190,.55)'; c.fillRect(-300, 1150, W + 600, 3);
  grassLayer(c, A.grassSun, 1150); fence(c, 1300, .9, '#4a3428');
  const head = t < tc; const bob = Math.sin(t * 5) * 4;
  drawChicken(c, 540, 1640, 1.18, { head, bob, blink: lt - .9, tilt: head ? 0 : Math.sin((t - tc) * 9) * .03 * clamp(1 - (t - tc)) });
  if (!head) {
    const ht = t - tc, [nx, ny] = neckPos(540, 1640, 1.18);
    c.save(); c.translate(nx + 30 + ht * 420, ny - 60 - ht * 900 + ht * ht * 1600); c.rotate(ht * 9); c.scale(1.18, 1.18); c.drawImage(A.ch.head, -180, -190); c.restore();
    droplets(c, t, tc, nx, ny - 10, 16, 3, 1.1);
  }
  motes(c, t, { n: 26, seed: 4, size: 12, a: .5 });
  c.setTransform(1, 0, 0, 1, 0, 0); flash(c, t, tc, .22);
  badge(c, t, wordT(8), 4.3, '18', 'meses');
});

// 2. Colorado 1945: la granja de día
scene(4.45, (c, t, lt) => {
  cam(c, lt, 6.5, [1.05, 470, 1180], [1.12, 610, 1200]);
  sky(c, [[0, '#4b6fa8'], [.5, '#c9a08e'], [.75, '#f2c48a']], -300, 1180);
  glow(c, 860, 1020, 520, '255,210,140', .7);
  A.cloud.forEach((cl, i) => c.drawImage(cl, ((i * 420 + lt * (10 + i * 4)) % 1500) - 300, 420 + i * 120, 420, 194));
  hills(c, 1080, 28, '#7d8f78', 2); hills(c, 1130, 20, '#64805a', 5);
  c.drawImage(A.tree1, -80, 820, 300, 400); c.drawImage(A.barn, 100, 700, 480, 480);
  // molino
  c.save(); c.strokeStyle = '#5b4a3e'; c.lineWidth = 6; c.beginPath(); c.moveTo(850, 1180); c.lineTo(900, 760); c.lineTo(950, 1180); c.moveTo(865, 1050); c.lineTo(935, 1050); c.moveTo(880, 920); c.lineTo(920, 920); c.stroke();
  c.translate(900, 750); c.rotate(lt * 1.6); for (let i = 0; i < 16; i++) { c.rotate(TAU / 16); c.fillStyle = i % 2 ? '#d8d2c4' : '#b9b2a2'; c.beginPath(); c.moveTo(12, -5); c.lineTo(95, -14); c.lineTo(95, 14); c.lineTo(12, 5); c.fill(); }
  c.fillStyle = '#5b4a3e'; c.beginPath(); c.arc(0, 0, 14, 0, TAU); c.fill(); c.restore();
  c.fillStyle = 'rgba(255,240,200,.5)'; c.fillRect(-300, 1150, W + 600, 3);
  grassLayer(c, A.grassSun, 1150); fence(c, 1330, .85, '#6b4a30');
  const px = lerp(330, 720, lt / 6.5), peck = Math.max(0, Math.sin(lt * 4.2)) ** 6;
  drawChicken(c, px, 1650, .78, { walk: peck > .2 ? null : lt * 7, tilt: peck * .55, blink: (lt % 2.7) - 1.3 });
  motes(c, t, { n: 22, seed: 9, size: 10, a: .45 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wordT(18), 8.25, '1945', '');
  iconPill(c, t, wordT(31) - .05, 10.9, W / 2, 650, 105, (c, lt) => {
    c.fillStyle = '#f4f1ea'; c.beginPath(); c.arc(0, 0, 62, 0, TAU); c.fill(); c.strokeStyle = '#cfc8ba'; c.lineWidth = 5; c.beginPath(); c.arc(0, 0, 44, 0, TAU); c.stroke();
    c.fillStyle = '#c9cdd4'; c.fillRect(-88, -45, 9, 90); c.fillRect(-96, -45, 3, 30); c.fillRect(-84, -45, 3, 30); c.fillRect(-74, -45, 3, 30);
    rrect(c, 80, -45, 12, 90, 6); c.fill();
    c.font = '900 52px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#d98a3a'; c.fillText('?', 0, 4);
  });
});

// 3. El hachazo
scene(10.9, (c, t, lt) => {
  const ti = 11.98; shake(c, t, ti, 34, .4); cam(c, lt, 2.3, [1.12, 540, 1000], [1.02, 540, 1040]);
  c.fillStyle = '#3c2619'; c.fillRect(-300, -300, W + 600, H + 600);
  const r = mulberry(12); for (let x = -300; x < W + 300; x += 90) { c.fillStyle = r() > .5 ? '#4a2f20' : '#432a1c'; c.fillRect(x, -300, 86, H + 600); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + 86, -300, 4, H + 600); }
  glow(c, 220, 380, 700, '255,190,110', .45);
  c.fillStyle = vgrad(c, 1450, 1920, [[0, '#5a3a24'], [1, '#2a1a10']]); c.fillRect(-300, 1480, W + 600, 800);
  // tronco
  c.fillStyle = '#6b4428'; c.fillRect(250, 1470, 580, 330); c.fillStyle = '#c99a62'; c.beginPath(); c.ellipse(540, 1470, 290, 70, 0, 0, TAU); c.fill();
  c.strokeStyle = 'rgba(110,70,30,.6)'; c.lineWidth = 3; for (let k = 1; k < 6; k++) { c.beginPath(); c.ellipse(540, 1470, 290 * k / 6, 70 * k / 6, 0, 0, TAU); c.stroke(); }
  const head = t < ti;
  drawChicken(c, 470, 1480, 1.0, { head, bob: Math.sin(t * 6) * 3, blink: lt - .4, shadow: false });
  const [nx, ny] = neckPos(470, 1480, 1.0);
  if (!head) { const ht = t - ti; c.save(); c.translate(nx + 40 + ht * 520, ny - 40 - ht * 700 + ht * ht * 1500); c.rotate(ht * 10); c.drawImage(A.ch.head, -180, -190); c.restore(); }
  // hacha
  const pv = [1300, 380], a1 = Math.atan2(ny - pv[1] + 10, nx + 60 - pv[0]), a0 = a1 + 1.75;
  const sw = t < 11.5 ? 0 : eIn((t - 11.5) / (ti - 11.5)); const ang = t < ti ? lerp(a0, a1, sw) - Math.sin(lt * 3) * .04 * (1 - sw) : a1 + .03;
  const L = Math.hypot(nx + 60 - pv[0], ny - pv[1]);
  const drawAxe = (a, al) => { c.save(); c.globalAlpha = al; c.translate(...pv); c.rotate(a);
    c.fillStyle = vgrad(c, -12, 12, [[0, '#a8754a'], [1, '#6b4426']]); rrect(c, 0, -13, L + 40, 26, 12); c.fill();
    c.translate(L, 0); c.beginPath(); c.moveTo(-50, 22); c.lineTo(40, 22); c.lineTo(55, -40); c.quadraticCurveTo(10, -120, -70, -125); c.quadraticCurveTo(-40, -60, -50, 22); c.closePath();
    c.fillStyle = vgrad(c, -125, 22, [[0, '#f2f4f7'], [.4, '#b9bec6'], [1, '#6c727c']]); c.fill(); c.strokeStyle = 'rgba(30,30,40,.5)'; c.lineWidth = 3; c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 5; c.beginPath(); c.moveTo(-62, -118); c.quadraticCurveTo(5, -112, 46, -42); c.stroke(); c.restore(); };
  if (t >= 11.5 && t < ti + .05) for (let k = 3; k >= 1; k--) drawAxe(ang + k * .12, .12);
  drawAxe(ang, 1);
  if (!head) { droplets(c, t, ti, nx, ny, 20, 7, 1.1); sparks(c, t, ti, nx + 40, ny, 14, 5); }
  c.setTransform(1, 0, 0, 1, 0, 0); flash(c, t, ti, .2);
});

// 4. Diagrama: tronco cerebral
scene(13.2, (c, t, lt) => {
  const zIn = ss(0, 1.6, lt) * (1 - ss(2.4, 3.2, lt));
  c.translate(W / 2, H / 2); const z = 1 + .55 * zIn * 1; c.scale(z * (1 + .07 * (1 - eOut(lt / .4))), z); c.translate(-lerp(540, 640, zIn), -lerp(1060, 820, zIn));
  const g = c.createRadialGradient(540, 900, 50, 540, 900, 1300); g.addColorStop(0, '#1b3b5e'); g.addColorStop(1, '#0a1626'); c.fillStyle = g; c.fillRect(-400, -400, W + 800, H + 800);
  c.strokeStyle = 'rgba(140,200,255,.07)'; c.lineWidth = 2; for (let x = -300; x < W + 300; x += 60) { c.beginPath(); c.moveTo(x, -300); c.lineTo(x, H + 300); c.stroke(); } for (let y = -300; y < H + 300; y += 60) { c.beginPath(); c.moveTo(-300, y); c.lineTo(W + 300, y); c.stroke(); }
  c.save(); c.shadowColor = 'rgba(120,200,255,.9)'; c.shadowBlur = 30; drawChicken(c, 470, 1560, 1.15, { glass: true, head: false, shadow: false, bob: Math.sin(t * 4) * 3, noLegs: false, sil: null }); c.restore();
  const [nx, ny] = neckPos(470, 1560, 1.15);
  // columna
  c.save(); c.setLineDash([14, 12]); c.strokeStyle = 'rgba(220,240,255,.6)'; c.lineWidth = 6; c.beginPath(); c.moveTo(nx, ny + 30); c.quadraticCurveTo(nx - 20, ny + 230, nx - 160, ny + 330); c.quadraticCurveTo(nx - 320, ny + 400, nx - 420, ny + 360); c.stroke(); c.restore();
  const pulse = 1 + Math.sin(t * 8) * .08; glow(c, nx, ny + 38, 110 * pulse, '255,120,170', .9);
  c.fillStyle = '#ff7fb0'; c.beginPath(); c.ellipse(nx, ny + 38, 24 * pulse, 36 * pulse, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.ellipse(nx - 7, ny + 26, 7, 10, 0, 0, TAU); c.fill();
  c.fillStyle = '#c81f2a'; c.beginPath(); c.ellipse(nx, ny, 50, 16, 0, 0, TAU); c.fill();
  // etiqueta
  const la = eBack((t - wordT(41)) / .4); if (t > wordT(41)) { c.save(); c.globalAlpha = clamp(la); c.font = '800 44px Nunito'; const lw0 = c.measureText('tronco cerebral').width + 50; const lx = nx - lw0 / 2 - 60, ly = ny - 230;
    c.strokeStyle = 'rgba(255,170,210,.9)'; c.lineWidth = 4; c.beginPath(); c.moveTo(nx, ny - 10); c.lineTo(lx + lw0 / 2, ly + 66); c.stroke();
    c.translate(lx, ly); c.scale(.6 + .4 * la, .6 + .4 * la); c.font = '800 44px Nunito'; const tw = c.measureText('tronco cerebral').width; rrect(c, 0, 0, tw + 50, 66, 33); c.fillStyle = 'rgba(14,13,18,.85)'; c.fill(); c.strokeStyle = 'rgba(255,140,190,.8)'; c.lineWidth = 3; c.stroke();
    c.fillStyle = '#ffd0e4'; c.textBaseline = 'middle'; c.fillText('tronco cerebral', 25, 35); c.restore(); }
  motes(c, t, { n: 30, seed: 11, size: 10, a: .35, spr: A.dotBlue });
  c.setTransform(1, 0, 0, 1, 0, 0);
  const ix = 880, icons = [[wordT(47), 1050, 'lung'], [wordT(49), 1270, 'heart'], [wordT(51), 1490, 'foot']];
  icons.forEach(([ti, y, k]) => {
    if (t > ti) { c.save(); c.globalAlpha = .5 * clamp((t - ti) / .3); c.setLineDash([8, 10]); c.strokeStyle = '#9fd4ff'; c.lineWidth = 3; c.beginPath(); c.moveTo(ix - 100, y); c.lineTo(ix - 100 - 140 * eOut((t - ti) / .4), y); c.stroke(); c.restore(); }
    iconPill(c, t, ti, 19.6, ix, y, 92, (c, lt) => {
      if (k === 'lung') { const b = 1 + Math.sin(lt * 5) * .08; c.scale(b, b); c.fillStyle = '#8fd0ff'; c.beginPath(); c.ellipse(-26, 8, 24, 42, .15, 0, TAU); c.ellipse(26, 8, 24, 42, -.15, 0, TAU); c.fill(); c.strokeStyle = '#dff2ff'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, -48); c.lineTo(0, -10); c.moveTo(0, -10); c.lineTo(-14, 6); c.moveTo(0, -10); c.lineTo(14, 6); c.stroke(); }
      if (k === 'heart') { const b = 1 + Math.max(0, Math.sin(lt * 9)) ** 4 * .18; c.scale(b, b); c.fillStyle = '#ff4d5e'; c.beginPath(); c.moveTo(0, 40); c.bezierCurveTo(-70, -5, -35, -60, 0, -25); c.bezierCurveTo(35, -60, 70, -5, 0, 40); c.fill(); c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.ellipse(-25, -20, 9, 6, -.6, 0, TAU); c.fill(); }
      if (k === 'foot') { c.scale(1.5, 1.5); c.translate(0, 4); c.strokeStyle = '#f2a53a'; c.lineWidth = 8; c.lineCap = 'round'; const st = Math.floor(lt * 3) % 2; [[-22, 20, 0], [22, -16, 1]].forEach(([fx, fy, j]) => { c.globalAlpha = j === st ? 1 : .35; c.beginPath(); c.moveTo(fx, fy + 22); c.lineTo(fx, fy); c.lineTo(fx - 16, fy - 20); c.moveTo(fx, fy); c.lineTo(fx, fy - 26); c.moveTo(fx, fy); c.lineTo(fx + 16, fy - 20); c.stroke(); }); }
    });
  });
});

// 5. Al otro día: sigue caminando
scene(19.7, (c, t, lt) => {
  cam(c, lt, 5.5, [1.0, 540, 1150], [1.1, 560, 1180]);
  const day = ss(0, 1.2, lt);
  sky(c, [[0, '#0e1a33'], [.6, '#2d3d66'], [.85, '#6e6a8a']], -300, 1180);
  c.save(); c.globalAlpha = day; sky(c, [[0, '#2f86d6'], [.55, '#7cc0ee'], [.85, '#d6eef8']], -300, 1180); c.restore();
  glow(c, 850, lerp(1200, 900, day), 420, '255,240,190', .9 * day); c.fillStyle = `rgba(255,248,220,${day})`; c.beginPath(); c.arc(850, lerp(1200, 900, day), 70, 0, TAU); c.fill();
  A.cloud.forEach((cl, i) => c.drawImage(cl, ((i * 470 + lt * (14 + i * 5)) % 1600) - 350, 380 + i * 150, 440, 203));
  hills(c, 1080, 30, '#6f9e78', 4); hills(c, 1130, 22, '#5a8f55', 7);
  c.drawImage(A.barn, 700, 900, 260, 260); c.drawImage(A.tree1, 40, 880, 230, 307);
  c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(-300, 1150, W + 600, 3);
  grassLayer(c, A.grassDay, 1150); fence(c, 1300, .85);
  const pk = t > wordT(60) - .1 ? Math.max(0, Math.sin(lt * 7)) ** 3 : 0;
  const px = 540 + Math.sin(lt * .9) * 160, fl = Math.cos(lt * .9) < 0;
  drawChicken(c, px, 1660, 1.0, { head: false, walk: pk > .1 ? null : lt * 7, tilt: pk * .38, flip: fl });
  const [nx, ny] = neckPos(px, 1660, 1.0, { flip: fl });
  [[-90, -150, 0], [0, -210, .2], [95, -150, .4]].forEach(([dx, dy, d], i) => { const qt = t - wordT(60) - d; if (qt < 0) return; const a = eBack(qt / .35);
    c.save(); c.translate(nx + dx, ny + dy + Math.sin(t * 4 + i) * 8); c.scale(a, a); c.rotate((i - 1) * .2); c.font = '900 110px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 12; c.strokeStyle = '#1d2a44'; c.strokeText('?', 0, 0); c.fillStyle = '#ffffff'; c.fillText('?', 0, 0); c.restore(); });
  motes(c, t, { n: 18, seed: 2, size: 10, a: .3 });
});

// 6. Mike y el gotero
scene(25.2, (c, t, lt) => {
  cam(c, lt, 5.4, [1.0, 540, 1100], [1.12, 600, 1050]);
  c.fillStyle = vgrad(c, -300, 1500, [[0, '#f0dcae'], [1, '#d9b980']]); c.fillRect(-300, -300, W + 600, H + 600);
  for (let x = -300; x < W + 300; x += 70) { c.fillStyle = 'rgba(160,110,50,.10)'; c.fillRect(x, -300, 30, 1800); }
  c.fillStyle = '#6a4a2c'; c.fillRect(110, 520, 360, 420); c.fillStyle = vgrad(c, 540, 920, [[0, '#7cc6f0'], [1, '#cfeefa']]); c.fillRect(130, 540, 320, 380);
  c.drawImage(A.cloud[0], 160, 640, 200, 92); c.fillStyle = '#6a4a2c'; c.fillRect(282, 540, 14, 380); c.fillRect(130, 722, 320, 14);
  glow(c, 290, 730, 420, '255,250,220', .35);
  c.fillStyle = vgrad(c, 1480, 1920, [[0, '#9a6638'], [1, '#5e3a1e']]); c.fillRect(-300, 1480, W + 600, 800);
  c.fillStyle = '#b37a44'; c.fillRect(-300, 1480, W + 600, 22); for (let x = -300; x < W + 300; x += 160) { c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(x, 1502, 4, 500); }
  drawChicken(c, 520, 1500, 1.05, { head: false, bob: Math.sin(t * 5) * 4 });
  const [nx, ny] = neckPos(520, 1500, 1.05);
  // letrero MIKE
  const st = wordT(65) - .05, out = 27.9;
  if (t > st && t < out + .6) { const sw = spring(t - st, 8, 3.2), up = eIn((t - out) / .5);
    c.save(); c.translate(W / 2 + 60, lerp(-200, 640, sw) - up * 900); c.rotate(Math.sin((t - st) * 6) * .12 * Math.exp(-(t - st) * 1.5));
    c.strokeStyle = '#8a6a44'; c.lineWidth = 6; c.beginPath(); c.moveTo(-150, -70); c.lineTo(-170, -700); c.moveTo(150, -70); c.lineTo(170, -700); c.stroke();
    furFill(c, [[-230, -80], [230, -80], [240, 80], [-240, 80]], { grad: [[0, '#c48a52'], [1, '#8a5a30']], cols: ['#d9a46c', '#7a4e28'], alpha: [.2, .5], len: [20, 60], density: 3, angle: 0, spread: .05, seed: 3 });
    c.font = '900 120px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#3a2210'; c.fillText('MIKE', 3, 8); c.fillStyle = '#fff2d8'; c.fillText('MIKE', 0, 4); c.restore(); }
  // gotero
  const dt0 = wordT(73) - .25; if (t > dt0) { const dy = eOut((t - dt0) / .5), tx = nx, ty = lerp(-300, ny - 90, dy);
    const sq = Math.max(0, Math.sin((t - dt0) * 9)) ** 8;
    for (let k = 0; k < 6; k++) { const ft = ((t - dt0 - .5) * 2.6 - k) ; if (ft < 0 || ft > 1) continue; const yy = ty + 40 + ft * 70; c.fillStyle = 'rgba(240,248,255,.95)'; c.beginPath(); c.ellipse(tx, yy, 9, 13, 0, 0, TAU); c.fill(); }
    c.save(); c.translate(tx, ty); c.fillStyle = 'rgba(210,235,255,.55)'; c.beginPath(); c.moveTo(-26, -320); c.lineTo(26, -320); c.lineTo(26, -60); c.lineTo(5, 30); c.lineTo(-5, 30); c.lineTo(-26, -60); c.closePath(); c.fill(); c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 4; c.stroke();
    c.fillStyle = 'rgba(255,255,255,.75)'; c.fillRect(-18, -230, 10, 160); c.fillStyle = 'rgba(250,245,230,.8)'; c.fillRect(-22, -180, 44, 110);
    c.fillStyle = vgrad(c, -460, -320, [[0, '#ff6a5a'], [1, '#b81e26']]); c.beginPath(); c.ellipse(0, -390, 52 * (1 - sq * .25), 80 * (1 - sq * .15), 0, 0, TAU); c.fill(); c.fillRect(-36, -340, 72, 30); c.restore(); }
  motes(c, t, { n: 16, seed: 5, size: 9, a: .35 });
});

// 7. La feria: Mike se hace famoso
scene(30.6, (c, t, lt) => {
  cam(c, lt, 4.9, [1.0, 540, 1100], [1.08, 540, 1120]);
  sky(c, [[0, '#120a26'], [.55, '#3b1d4a'], [.85, '#86405a']], -300, 1300); stars(c, t, 60, 7, 900, .8);
  c.save(); c.globalCompositeOperation = 'lighter'; [[-100, .4], [1180, -.4]].forEach(([bx, ph]) => { const a = -Math.PI / 2 + Math.sin(t * .9 + ph * 5) * .5 + ph; c.save(); c.translate(bx, 1500); c.rotate(a); const g = c.createLinearGradient(0, 0, 1400, 0); g.addColorStop(0, 'rgba(255,240,200,.22)'); g.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(0, 0); c.lineTo(1500, -170); c.lineTo(1500, 170); c.fill(); c.restore(); }); c.restore();
  c.drawImage(A.tent, 90, 560, 900, 800);
  for (let k = 0; k < 2; k++) { c.strokeStyle = '#2a1a2a'; c.lineWidth = 3; const y0 = 520 + k * 120; c.beginPath(); c.moveTo(-50, y0); c.quadraticCurveTo(540, y0 + 220, 1130, y0); c.stroke();
    for (let i = 0; i <= 14; i++) { const u = i / 14, x = lerp(-50, 1130, u), y = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * (y0 + 220) + u * u * y0; const on = .55 + .45 * Math.sin(t * 6 + i * 1.7 + k);
      c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = on; c.drawImage(A.dotWarm, x - 34, y - 26, 68, 68); c.restore(); c.fillStyle = `rgba(255,${200 + 40 * on | 0},120,1)`; c.beginPath(); c.arc(x, y + 8, 8, 0, TAU); c.fill(); } }
  c.fillStyle = '#2a1626'; c.fillRect(-300, 1350, W + 600, 700);
  c.fillStyle = vgrad(c, 1360, 1480, [[0, '#c8323a'], [1, '#7a1a22']]); c.beginPath(); c.ellipse(540, 1420, 260, 60, 0, 0, TAU); c.fill(); c.fillRect(280, 1360, 520, 60);
  c.fillStyle = '#f2c94c'; c.beginPath(); c.ellipse(540, 1360, 260, 60, 0, 0, TAU); c.fill(); c.fillStyle = '#d63a44'; c.beginPath(); c.ellipse(540, 1360, 240, 50, 0, 0, TAU); c.fill();
  glow(c, 540, 1100, 380, '255,230,170', .35);
  drawChicken(c, 540, 1370, .95, { head: false, bob: Math.sin(t * 5) * 4, shadow: false });
  for (let i = 0; i < 7; i++) { const tt = t - wordT(81) - i * .08; if (tt < 0) continue; const a = hash(i + 3) * TAU, d = 230 + hash(i) * 130, s = Math.sin(clamp(tt / 1.6) * Math.PI) * (22 + hash(i * 2) * 18);
    c.save(); c.translate(540 + Math.cos(a) * d, 1080 + Math.sin(a) * d * .8); c.rotate(tt * 2); c.fillStyle = '#ffe9a0'; c.beginPath(); for (let k = 0; k < 8; k++) { const r = k % 2 ? s * .35 : s; c.lineTo(Math.cos(k * Math.PI / 4) * r, Math.sin(k * Math.PI / 4) * r); } c.fill(); c.restore(); }
  for (let i = 0; i < 9; i++) { const x = -40 + i * 145, y = 1800 + hash(i) * 60 + Math.sin(t * 4 + i * 1.3) * 10; c.fillStyle = '#140a18'; c.beginPath(); c.arc(x, y - 120, 62, 0, TAU); c.fill(); rrect(c, x - 105, y - 70, 210, 300, 80); c.fill(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wordT(85), 35.45, '25', '¢');
});

// 8. Lluvia de monedas: $4,500 al mes
scene(35.5, (c, t, lt) => {
  cam(c, lt, 3.7, [1.0, 540, 1050], [1.08, 540, 1050]);
  const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1300); g.addColorStop(0, '#2a8a6a'); g.addColorStop(1, '#082a24'); c.fillStyle = g; c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalCompositeOperation = 'lighter'; c.translate(540, 1000); c.rotate(lt * .25); for (let i = 0; i < 12; i++) { c.rotate(TAU / 12); c.fillStyle = 'rgba(255,230,150,.06)'; c.beginPath(); c.moveTo(0, 0); c.lineTo(1600, -150); c.lineTo(1600, 150); c.fill(); } c.restore();
  const pile = 40 + ss(0, 3.5, lt) * 120;
  for (let i = 0; i < 70; i++) { const x = 160 + hash(i) * 760, y = 1560 - hash(i * 2) * pile * (1 - Math.abs(x - 540) / 480); c.drawImage(A.coin, x - 45, y - 45, 90, 90); }
  drawChicken(c, 540, 1560 - pile * .8, 1.0, { head: false, bob: Math.sin(t * 6) * 5 });
  for (let i = 0; i < 40; i++) { const st = hash(i * 1.9) * 3.4, ft = lt - st; if (ft < 0) continue; const x = hash(i * 4.1) * W, y = -100 + ft * (900 + hash(i) * 500); if (y > H + 100) continue;
    const sp = Math.cos(ft * (6 + hash(i) * 6)); c.save(); c.translate(x, y); c.rotate(ft * 2 * (hash(i) - .5)); c.scale(Math.max(.15, Math.abs(sp)), 1); c.drawImage(A.coin, -55, -55, 110, 110); c.restore(); }
  motes(c, t, { n: 26, seed: 8, size: 14, a: .5 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wordT(94), 39.1, '$4,500', '/mes');
});

// 9. Engordó: la báscula
scene(39.15, (c, t, lt) => {
  cam(c, lt, 3.95, [1.0, 540, 1150], [1.1, 540, 1150]);
  c.fillStyle = vgrad(c, -300, 1550, [[0, '#7cc3b8'], [1, '#a9dccf']]); c.fillRect(-300, -300, W + 600, H + 600);
  for (let y = 300; y < 1550; y += 220) { c.fillStyle = 'rgba(255,255,255,.07)'; c.fillRect(-300, y, W + 600, 110); }
  c.fillStyle = vgrad(c, 1550, 1920, [[0, '#e8d4b0'], [1, '#c9ae84']]); c.fillRect(-300, 1550, W + 600, 700);
  c.strokeStyle = 'rgba(120,90,50,.25)'; c.lineWidth = 3; for (let x = -600; x < 1700; x += 120) { c.beginPath(); c.moveTo(540 + (x - 540) * .7, 1550); c.lineTo(540 + (x - 540) * 1.6, 1950); c.stroke(); }
  const inf = 0.42 * spring(t - wordT(107), 9, 3.5);
  c.fillStyle = '#9aa3ad'; rrect(c, 300, 1500, 480, 90, 26); c.fill(); c.fillStyle = '#e9edf1'; rrect(c, 290, 1478, 500, 40, 18); c.fill();
  c.fillStyle = '#ffffff'; c.beginPath(); c.arc(540, 1700, 110, 0, TAU); c.fill(); c.strokeStyle = '#5a6470'; c.lineWidth = 12; c.stroke();
  for (let k = 0; k < 9; k++) { const a = Math.PI * (.8 + k * .175); c.strokeStyle = '#5a6470'; c.lineWidth = 4; c.beginPath(); c.moveTo(540 + Math.cos(a) * 80, 1700 + Math.sin(a) * 80); c.lineTo(540 + Math.cos(a) * 96, 1700 + Math.sin(a) * 96); c.stroke(); }
  const kg = t < wordT(105) ? 0 : 1 + 3 * (inf / .42); const na = Math.PI * (.8 + kg * .3 + Math.sin(t * 20) * .004);
  c.strokeStyle = '#e8343f'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(540, 1700); c.lineTo(540 + Math.cos(na) * 88, 1700 + Math.sin(na) * 88); c.stroke(); c.fillStyle = '#333'; c.beginPath(); c.arc(540, 1700, 12, 0, TAU); c.fill();
  drawChicken(c, 540, 1490, .95, { head: false, inflate: inf, bob: Math.sin(t * 5) * 3, shadow: false });
  motes(c, t, { n: 14, seed: 6, size: 9, a: .3 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t < wordT(108)) badge(c, t, wordT(105), 43.5, '1', 'kg'); else badge(c, t, wordT(108), 43.0, '4', 'kg');
});

// 10. El motel
scene(43.1, (c, t, lt) => {
  const z = lerp(1.0, 1.3, eInOut(lt / 7.4)); c.translate(W / 2, H / 2); c.scale(z * (1 + .07 * (1 - eOut(lt / .4))), z); c.translate(-lerp(540, 630, eInOut(lt / 7.4)), -lerp(1100, 1150, eInOut(lt / 7.4)));
  sky(c, [[0, '#050c1a'], [.6, '#12244a'], [.9, '#20406a']], -300, 1300); stars(c, t, 70, 13, 900, .7);
  glow(c, 820, 420, 260, '200,220,255', .5); c.fillStyle = '#f2f4ea'; c.beginPath(); c.arc(820, 420, 62, 0, TAU); c.fill(); c.fillStyle = 'rgba(160,170,190,.35)'; c.beginPath(); c.arc(800, 405, 14, 0, TAU); c.arc(840, 440, 9, 0, TAU); c.fill();
  hills(c, 1100, 26, '#0c1830', 9);
  c.drawImage(A.motel, -110, 820, 1300, 560);
  const lit = t < wordT(129) + .4 ? 1 : 1 - clamp((t - wordT(129) - .4) / .5); const flk = t > wordT(119) && t < wordT(119) + 1.2 ? (hash(Math.floor(t * 14)) > .4 ? 1 : .35) : 1;
  const wx = -110 + 690, wy = 820 + 260; const L = lit * flk;
  c.fillStyle = `rgba(255,${190 + 20 * L | 0},110,${.15 + .85 * L})`; c.fillRect(wx, wy, 80, 110); glow(c, wx + 40, wy + 55, 220, '255,190,110', .55 * L);
  if (L > .05) { c.save(); c.beginPath(); c.rect(wx, wy, 80, 110); c.clip(); c.globalAlpha = .8 * L; drawChicken(c, wx + 38, wy + 112, .2, { head: false, sil: '#3a2410', shadow: false }); c.restore(); }
  c.fillStyle = '#4a5d78'; c.fillRect(wx - 4, wy + 52, 88, 6); c.fillRect(wx + 37, wy, 6, 110);
  // letrero neón
  c.fillStyle = '#2a2f3a'; c.fillRect(840, 700, 16, 230); c.fillStyle = '#1a1e28'; rrect(c, 700, 570, 300, 140, 20); c.fill();
  const letters = 'MOTEL'.split(''); c.font = '900 92px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle';
  letters.forEach((ch, i) => { let on = 1; if (i === 2 && t > wordT(129)) on = hash(Math.floor(t * 10)) > .7 ? 1 : .12; const x = 742 + i * 54;
    c.save(); c.shadowColor = '#ff4fa3'; c.shadowBlur = 30 * on; c.fillStyle = on > .5 ? '#ffd0ea' : '#5a2a44'; c.fillText(ch, x, 642); c.restore(); });
  glow(c, 850, 640, 260, '255,80,170', .25);
  c.fillStyle = vgrad(c, 1380, 1920, [[0, '#141b28'], [1, '#0a0e16']]); c.fillRect(-300, 1380, W + 600, 700);
  c.save(); c.globalAlpha = .35 * L; c.translate(0, 2 * 1380 + 10); c.scale(1, -1); c.fillStyle = 'rgba(255,190,110,.6)'; c.fillRect(wx, wy + 40, 80, 70); c.restore();
  c.save(); c.globalAlpha = .3; c.fillStyle = '#ff4fa3'; c.fillRect(710, 1420, 280, 6); c.restore();
  // lluvia
  c.strokeStyle = 'rgba(180,200,230,.35)'; c.lineWidth = 2.5; for (let i = 0; i < 140; i++) { const x = (hash(i) * 1400 + t * 120) % 1400 - 160, y = (hash(i * 2.3) * 2200 + t * 1700) % 2200 - 200; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 10, y + 50); c.stroke(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  iconPill(c, t, wordT(126) - .05, 50.4, W / 2, 650, 100, (c, lt) => {
    c.rotate(-.7); c.fillStyle = 'rgba(220,240,255,.85)'; rrect(c, -60, -18, 100, 36, 8); c.fill(); c.fillStyle = '#c8202a'; c.fillRect(-55, -12, 60, 24); c.fillStyle = '#dfe6ee'; c.fillRect(40, -6, 30, 12); c.fillRect(-78, -26, 18, 52); c.fillRect(-92, -5, 14, 10); c.fillStyle = '#cfd6de'; c.fillRect(70, -2, 28, 4);
    c.rotate(.7); const k = clamp((lt - .5) / .3); c.strokeStyle = '#ff3b4a'; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(-60, -60); c.lineTo(-60 + 120 * k, -60 + 120 * k); c.stroke();
  });
  c.save(); c.fillStyle = `rgba(0,10,30,${.25 * (1 - L)})`; c.fillRect(0, 0, W, H); c.restore();
});

// 11. El festival
scene(50.5, (c, t, lt) => {
  cam(c, lt, 6.5, [1.12, 540, 1000], [1.0, 540, 1080]);
  sky(c, [[0, '#2a1846'], [.5, '#a2486e'], [.85, '#f4a46a']], -300, 1200); stars(c, t, 30, 17, 600, .6);
  c.save(); c.globalCompositeOperation = 'lighter';
  [[.3, 300, 420, '255,200,90'], [1.4, 800, 340, '255,110,180'], [2.5, 520, 260, '140,220,255'], [3.4, 220, 520, '255,240,140'], [4.3, 860, 520, '190,140,255'], [5.1, 480, 380, '255,160,90']].forEach(([st, fx, fy, col], j) => {
    const ft = lt - st; if (ft < 0 || ft > 1.8) return; for (let i = 0; i < 36; i++) { const a = i / 36 * TAU, d = eOut(ft / 1) * 210, x = fx + Math.cos(a) * d, y = fy + Math.sin(a) * d + ft * ft * 60;
      c.globalAlpha = 1 - clamp((ft - .6) / 1.2); c.drawImage(A.dot, x - 16, y - 16, 32, 32); c.fillStyle = `rgba(${col},1)`; c.beginPath(); c.arc(x, y, 5, 0, TAU); c.fill(); } });
  c.restore();
  c.fillStyle = '#4a2c52'; [[-60, 260], [180, 200], [380, 300], [640, 230], [860, 280]].forEach(([x, h]) => { c.fillRect(x, 1150 - h, 220, h + 10); c.fillStyle = 'rgba(255,210,140,.5)'; for (let k = 0; k < 3; k++) c.fillRect(x + 30 + k * 60, 1150 - h + 40, 26, 34); c.fillStyle = '#4a2c52'; });
  glow(c, 540, 1100, 520, '255,180,120', .45);
  grassLayer(c, A.grassDusk, 1150);
  // pedestal + estatua dorada
  c.fillStyle = vgrad(c, 1250, 1650, [[0, '#b8b0a8'], [1, '#7a7270']]); c.fillRect(330, 1300, 420, 330); c.fillStyle = '#d6cfc6'; c.fillRect(300, 1270, 480, 50); c.fillRect(300, 1610, 480, 50);
  c.fillStyle = '#5a4a3a'; rrect(c, 410, 1400, 260, 110, 14); c.fill(); c.font = '900 64px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#f2d27a'; c.fillText('MIKE', 540, 1458);
  drawChicken(c, 540, 1280, .9, { head: false, gold: true, shadow: false, bob: 0 });
  c.save(); c.globalCompositeOperation = 'lighter'; const sh = (lt * .6) % 1.6; c.globalAlpha = .5; c.drawImage(A.dot, 400 + sh * 300 - 60, 900 - 60, 120, 120); c.restore();
  // banderines
  const cols = ['#ff5a5f', '#ffd166', '#06d6a0', '#4cc9f0', '#f78c6b', '#b388eb'];
  for (let k = 0; k < 2; k++) { const y0 = 560 + k * 150; for (let i = 0; i < 12; i++) { const u = (i + .5) / 12, x = lerp(-60, 1140, u), y = y0 + Math.sin(u * Math.PI) * 110 + Math.sin(t * 3 + i) * 4;
    c.fillStyle = cols[(i + k * 3) % 6]; c.beginPath(); c.moveTo(x - 38, y); c.lineTo(x + 38, y); c.lineTo(x + Math.sin(t * 4 + i) * 6, y + 80); c.fill(); }
    c.strokeStyle = '#2a1a2a'; c.lineWidth = 3; c.beginPath(); for (let i = 0; i <= 24; i++) { const u = i / 24; c.lineTo(lerp(-60, 1140, u), y0 + Math.sin(u * Math.PI) * 110); } c.stroke(); }
  for (let i = 0; i < 70; i++) { const x = (hash(i) * W + Math.sin(t + i) * 40), y = ((hash(i * 3.3) * H + lt * (180 + hash(i) * 120)) % (H + 100)) - 50; c.save(); c.translate(x, y); c.rotate(t * 3 + i); c.scale(1, Math.cos(t * 5 + i)); c.fillStyle = cols[i % 6]; c.fillRect(-9, -5, 18, 10); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  const fo = clamp((t - (END - .7)) / .7); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});

// ---------- render ----------
function render(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  let si = 0; for (let i = 0; i < SC.length; i++) if (t >= SC[i].t0) si = i;
  ctx.save(); SC[si].draw(ctx, t, t - SC[si].t0); ctx.restore();
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
  ctx.drawImage(A.vig, 0, 0);
  ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .09; ctx.drawImage(A.grain[Math.floor(t * 24) % 4], 0, 0, W, H); ctx.restore();
  if (t < END - .7) caption(ctx, t);
}
async function init(words) { WORDS = words; buildChunks(); await buildAssets(); return true; }
