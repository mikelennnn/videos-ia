// ---------- assets: sentir que te caes al dormir ----------
const E = {};
function buildBrain() {
  const v = mk(620, 520), c = v.getContext('2d'); c.translate(310, 270);
  const pts = []; for (let i = 0; i < 40; i++) { const a = i / 40 * TAU, r = 1 + .06 * Math.sin(a * 7) + .03 * Math.sin(a * 13); pts.push([Math.cos(a) * 250 * r, Math.sin(a) * 190 * r * (Math.sin(a) > 0 ? .9 : 1)]); }
  texFill(c, ellipsePts(140, 150, 90, 60, 20), [[0, '#f29ab0'], [1, '#c45a78']], { outline: '#8a2a48', shade: .2 });
  texFill(c, pts, [[0, '#ffc0d0'], [1, '#e07a98']], { outline: '#9a3a5a', light: [.35, .2, .45], shade: .2 });
  c.save(); smoothPath(c, pts); c.clip(); c.strokeStyle = 'rgba(160,50,90,.55)'; c.lineWidth = 9; c.lineCap = 'round';
  const r = mulberry(4); for (let k = 0; k < 16; k++) { let x = -230 + r() * 460, y = -170 + r() * 340; c.beginPath(); c.moveTo(x, y); for (let s = 0; s < 6; s++) { x += (r() - .5) * 90; y += (r() - .5) * 70; c.quadraticCurveTo(x + (r() - .5) * 60, y + (r() - .5) * 60, x, y); } c.stroke(); }
  c.strokeStyle = 'rgba(140,40,80,.7)'; c.lineWidth = 12; c.beginPath(); c.moveTo(0, -185); c.quadraticCurveTo(-20, -60, 0, 20); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(-120, -110, 70, 30, -.4, 0, TAU); c.fill(); c.restore();
  E.brain = v;
}
// mood: calm | confused | panic | wink | happy | sleep
function drawBrain(c, x, y, s, o = {}) {
  const t = o.t || 0, m = o.mood || 'calm';
  c.save(); c.translate(x + (m === 'panic' ? (hash(t * 77) - .5) * 14 : 0), y + Math.sin(t * 3) * 8); c.scale(s, s * (1 + Math.sin(t * 3) * .015)); c.rotate(o.rot || 0);
  c.drawImage(E.brain, -310, -270);
  const eye = (ex, closed, wink) => { if (closed || wink) { c.strokeStyle = '#3a1020'; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); wink ? (c.moveTo(ex - 26, 10), c.quadraticCurveTo(ex, -8, ex + 26, 10)) : c.arc(ex, 0, 24, .2, Math.PI - .2); c.stroke(); return; }
    const big = m === 'panic' ? 1.35 : 1; c.fillStyle = '#fff'; c.beginPath(); c.ellipse(ex, 0, 34 * big, 40 * big, 0, 0, TAU); c.fill(); c.strokeStyle = '#7a2040'; c.lineWidth = 4; c.stroke();
    const lk = o.look || [0, 0]; if (m === 'confused') { c.strokeStyle = '#2a0a14'; c.lineWidth = 5; c.beginPath(); for (let a = 0; a < 12; a += .3) c.lineTo(ex + Math.cos(a + t * 6) * a * 1.8, Math.sin(a + t * 6) * a * 1.8); c.stroke(); return; }
    c.fillStyle = '#2a0a14'; c.beginPath(); c.arc(ex + lk[0] * 10, lk[1] * 10, m === 'panic' ? 12 : 18, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(ex + lk[0] * 10 + 6, lk[1] * 10 - 7, 6, 0, TAU); c.fill(); };
  eye(-75, m === 'sleep', false); eye(75, m === 'sleep', m === 'wink');
  c.fillStyle = 'rgba(255,100,140,.5)'; [[-130, 50], [130, 50]].forEach(([bx, by]) => { c.beginPath(); c.ellipse(bx, by, 26, 14, 0, 0, TAU); c.fill(); });
  c.save(); c.translate(0, 80);
  if (m === 'panic') { c.fillStyle = '#5a0a20'; c.beginPath(); c.ellipse(0, 6, 34, 40, 0, 0, TAU); c.fill(); c.fillStyle = '#ff7a9a'; c.beginPath(); c.ellipse(0, 26, 20, 12, 0, 0, TAU); c.fill(); }
  else if (m === 'confused') { c.strokeStyle = '#5a0a20'; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); for (let k = 0; k <= 8; k++) c.lineTo(-40 + k * 10, (k % 2 ? 8 : -6)); c.stroke(); }
  else if (m === 'sleep') { c.fillStyle = '#5a0a20'; c.beginPath(); c.ellipse(0, 4, 12, 9, 0, 0, TAU); c.fill(); }
  else { c.fillStyle = '#5a0a20'; c.beginPath(); c.moveTo(-50, -4); c.quadraticCurveTo(0, 60, 50, -4); c.closePath(); c.fill(); c.fillStyle = '#ff7a9a'; c.beginPath(); c.ellipse(0, 24, 22, 10, 0, 0, TAU); c.fill(); }
  c.restore(); c.restore();
}
// carita pequeña (para "7 de 10")
const FACES = [['#f6cfa0', '#3a2414'], ['#c98a5c', '#1a0e08'], ['#ffe0c4', '#c8902a'], ['#8a5a3a', '#1a0e08'], ['#e9b88c', '#7a3a1a']];
function face(c, x, y, r, k, lit, t) {
  const [sk, hr] = FACES[k % 5]; c.save(); c.translate(x, y);
  if (lit > 0) glow(c, 0, 0, r * 2, '255,210,110', .6 * lit);
  c.globalAlpha = .45 + .55 * lit; c.fillStyle = sk; c.beginPath(); c.arc(0, 0, r, 0, TAU); c.fill(); c.strokeStyle = 'rgba(80,40,20,.5)'; c.lineWidth = 4; c.stroke();
  c.fillStyle = hr; c.beginPath(); c.arc(0, -r * .25, r * 1.02, Math.PI * 1.05, Math.PI * 1.95); c.quadraticCurveTo(0, -r * .55, -r * .98, -r * .4); c.fill();
  const sh = lit > .5; c.fillStyle = '#fff'; [-.38, .38].forEach(ex => { c.beginPath(); c.ellipse(ex * r, r * .05, r * (sh ? .2 : .14), r * (sh ? .24 : .05), 0, 0, TAU); c.fill(); if (sh) { c.fillStyle = '#2a1a10'; c.beginPath(); c.arc(ex * r, r * .06, r * .1, 0, TAU); c.fill(); c.fillStyle = '#fff'; } });
  if (sh) { c.fillStyle = '#5a1a1a'; c.beginPath(); c.ellipse(0, r * .5, r * .16, r * .2, 0, 0, TAU); c.fill(); } else { c.strokeStyle = '#5a2a1a'; c.lineWidth = 4; c.beginPath(); c.arc(0, r * .35, r * .2, .3, Math.PI - .3); c.stroke(); }
  c.restore();
}
// Beto acostado en la cama. jerk = 0..1 (brinco)
function bedBeto(c, t, o = {}) {
  const j = o.jerk || 0;
  c.fillStyle = '#4a3a5a'; rrect(c, -80, 1150, 160, 540, 20); c.fill();
  c.fillStyle = '#4a3a5a'; rrect(c, 700, 1200, 70, 520, 20); c.fill(); c.fillStyle = '#5a4a6a'; rrect(c, 690, 1190, 90, 40, 14); c.fill();
  c.fillStyle = '#f4f2ee'; c.beginPath(); c.ellipse(600, 1440 - j * 30, 150, 60, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(0,0,0,.1)'; c.beginPath(); c.ellipse(600, 1460 - j * 30, 140, 30, 0, 0, TAU); c.fill();
  c.save(); c.translate(-40, 1470 - j * 80); c.rotate(lerp(1.5, 1.15, j));
  drawBeto(c, 0, 0, .8, { t, pose: j > .3 ? 'arms' : 'side', expr: o.expr || (j > .3 ? 'shock' : 'sleep') }); c.restore();
  c.fillStyle = vgrad(c, 1400, 1700, [[0, '#6a8ae8'], [1, '#3a5ab8']]); c.beginPath(); c.moveTo(-300, 1430 - j * 60); c.quadraticCurveTo(200, 1360 - j * 90, 470, 1420 - j * 40); c.lineTo(520, 1700); c.lineTo(-300, 1700); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 8; c.beginPath(); c.moveTo(-200, 1470 - j * 50); c.quadraticCurveTo(200, 1410 - j * 70, 450, 1460); c.stroke();
  c.fillStyle = '#2a2040'; c.fillRect(-300, 1700, 900, 60);
  c.fillStyle = 'rgba(200,120,170,.35)'; c.beginPath(); c.ellipse(420, 1900, 420, 70, 0, 0, TAU); c.fill(); c.strokeStyle = 'rgba(255,200,230,.3)'; c.lineWidth = 6; c.beginPath(); c.ellipse(420, 1900, 380, 56, 0, 0, TAU); c.stroke();
  [[300, 1880], [400, 1895]].forEach(([x, y], i) => { c.fillStyle = '#ff7aa8'; c.beginPath(); c.ellipse(x, y, 52, 22, i ? .1 : -.1, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.ellipse(x + 14, y - 8, 22, 12, 0, 0, TAU); c.fill(); });
}
function zzz(c, t, x, y, a = 1) { c.save(); c.font = '900 60px Nunito'; c.fillStyle = 'rgba(255,255,255,.9)'; c.strokeStyle = '#1a1c3a'; c.lineWidth = 8; ['z', 'z', 'Z'].forEach((z, i) => { const ph = ((t * .7) + i / 3) % 1; c.globalAlpha = Math.sin(ph * Math.PI) * a; c.strokeText(z, x + ph * 70 + i * 8, y - ph * 170); c.fillText(z, x + ph * 70 + i * 8, y - ph * 170); }); c.restore(); }
function pumText(c, t, t0, x, y, s = 1, dur = 1.2) { const lt = t - t0; if (lt < 0 || lt > dur) return; const a = eBack(lt / .22); c.save(); c.globalAlpha = 1 - clamp((lt - dur + .3) / .3); c.translate(x, y); c.rotate(-.1 + Math.sin(lt * 20) * .03 * (1 - clamp(lt / .5))); c.scale(a * s, a * s);
  c.fillStyle = '#ffd166'; c.beginPath(); for (let k = 0; k < 28; k++) { const r = k % 2 ? 120 : 190, an = k / 28 * TAU; c.lineTo(Math.cos(an) * r * 1.35, Math.sin(an) * r * .8); } c.fill(); c.strokeStyle = '#c87a1a'; c.lineWidth = 6; c.stroke();
  c.font = '900 120px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 16; c.strokeStyle = '#6a1020'; c.strokeText('¡PUM!', 0, 6); c.fillStyle = '#ff4d5e'; c.fillText('¡PUM!', 0, 6); c.restore(); }
function bolt(c, x0, y0, x1, y1, seed, w = 10, col = '255,240,120') { const r = mulberry(seed); c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = `rgba(${col},1)`; c.shadowColor = `rgba(${col},1)`; c.shadowBlur = 30; c.lineWidth = w; c.lineJoin = 'round'; c.beginPath(); c.moveTo(x0, y0); const n = 9; for (let i = 1; i < n; i++) { const u = i / n; c.lineTo(lerp(x0, x1, u) + (r() - .5) * 90, lerp(y0, y1, u) + (r() - .5) * 30); } c.lineTo(x1, y1); c.stroke(); c.lineWidth = w * .4; c.strokeStyle = '#fff'; c.stroke(); c.restore(); }
function jungle(c, t) {
  sky(c, [[0, '#040e1a'], [.6, '#0c2a36'], [.95, '#14404a']], -600, 2600); stars(c, t, 60, 21, 900, .7);
  glow(c, 820, 360, 260, '210,240,230', .5); c.fillStyle = '#eef8f2'; c.beginPath(); c.arc(820, 360, 64, 0, TAU); c.fill();
  for (let k = 0; k < 3; k++) { c.fillStyle = ['#0a2228', '#0c2a30', '#0e3238'][k]; for (let i = 0; i < 6; i++) { const x = -100 + i * 230 + k * 90, y = 900 + k * 260; c.beginPath(); c.arc(x, y, 180 + k * 30, 0, TAU); c.arc(x + 120, y + 60, 150, 0, TAU); c.fill(); c.fillRect(x - 20, y, 40, 2400); } }
  // tronco + rama
  furFill2(c);
  c.drawImage(E.tree, -120, 200);
  c.strokeStyle = 'rgba(40,90,50,.9)'; c.lineWidth = 7; for (let i = 0; i < 5; i++) { const x = 380 + i * 130; c.beginPath(); c.moveTo(x, 1130); c.quadraticCurveTo(x + Math.sin(t + i) * 20, 1400 + i * 40, x + 10, 1600 + i * 60); c.stroke(); c.fillStyle = '#3a8a4a'; for (let k = 1; k < 5; k++) { c.beginPath(); c.ellipse(x + 8 + Math.sin(t + i) * 10 * k / 5, 1130 + k * (100 + i * 12), 14, 8, .5, 0, TAU); c.fill(); } }
  c.save(); c.globalCompositeOperation = 'lighter'; for (let i = 0; i < 30; i++) { const x = (hash(i) * W + Math.sin(t * .7 + i) * 50), y = 600 + hash(i * 2) * 1800 + Math.cos(t * .5 + i) * 40; c.globalAlpha = .5 + .5 * Math.sin(t * 3 + i * 2); c.drawImage(C.dots[2], x - 16, y - 16, 32, 32); } c.restore();
}
function furFill2() { }
function buildTree() {
  const v = mk(1300, 2400), c = v.getContext('2d');
  furFill(c, tubePts([[260, 2400], [250, 1400], [270, 0]], 280, 230), { grad: [[0, '#5a3a24'], [1, '#2a180c']], cols: ['#7a5232', '#1a0e06', '#8a6a4a'], alpha: [.2, .5], len: [30, 80], density: 6, angle: 1.57, spread: .1, seed: 3, shade: .3, light: [.3, .2, .2] });
  furFill(c, tubePts([[300, 930], [700, 900], [1250, 950]], 90, 60), { grad: [[0, '#6a4a2c'], [1, '#2e1c0e']], cols: ['#8a6a4a', '#1a0e06'], alpha: [.2, .5], len: [30, 80], density: 7, angle: 0, spread: .1, seed: 5, shade: .3 });
  [[140, 300], [420, 180], [700, 280], [1000, 820], [1180, 860], [330, 560], [900, 600]].forEach(([x, y], i) => furFill(c, ellipsePts(x, y, 230, 150, 20, 0, .25, 30 + i), { grad: [[0, '#2a7a4a'], [1, '#0e3a24']], cols: ['#3a9a5a', '#0a2a18', '#5aba7a'], alpha: [.3, .7], len: [10, 22], density: 18, spread: 3, seed: 30 + i, fringe: ['#2a7a4a', '#0e3a24'], fringeLen: 16, light: [.4, .2, .25], shade: .35 }));
  E.tree = v;
}
const _be4 = buildExtra; buildExtra = async () => { await _be4(); buildBrain(); buildTree();
  const v = mk(700, 1100), c = v.getContext('2d'); drawBeto(c, 350, 1050, 1.0, { t: 0, pose: 'side', expr: 'smile' }); E.betoSil = tinted(v, 'rgba(150,210,255,.25)'); };
