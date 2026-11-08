// ---------- assets: POV eres un taco ----------
const T = {};
function buildTaco(bitten) {
  const v = mk(620, 520), c = v.getContext('2d'); c.translate(310, 270);
  const r = mulberry(9);
  // relleno (detrás del borde de la tortilla)
  const meat = (x, y, s, seed) => { const p = ellipsePts(x, y, 46 * s, 34 * s, 12, r() * 3, .35, seed); furFill(c, p, { grad: [[0, '#e8642a'], [1, '#9a2a10']], cols: ['#ff8a4a', '#6a1a08', '#c8401a'], alpha: [.3, .7], len: [4, 10], density: 30, spread: 3, seed, light: [.4, .3, .35], shade: .3, outline: 'rgba(90,20,5,.6)' });
    c.fillStyle = 'rgba(40,10,0,.55)'; for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(x + (r() - .5) * 50 * s, y + (r() - .5) * 30 * s, 4 + r() * 5, 0, TAU); c.fill(); } };
  [[-150, -10, 1.0], [-80, -40, 1.15], [0, -50, 1.2], [85, -38, 1.1], [150, -8, .95], [-30, -10, 1], [60, -12, 1]].forEach(([x, y, s], i) => meat(x, y, s, 40 + i));
  // cebolla
  for (let i = 0; i < 16; i++) { const x = -160 + r() * 320, y = -60 + r() * 50; c.save(); c.translate(x, y); c.rotate(r() * 3); c.fillStyle = 'rgba(255,255,255,.95)'; rrect(c, -9, -9, 18, 18, 4); c.fill(); c.strokeStyle = 'rgba(200,190,220,.8)'; c.lineWidth = 2; c.stroke(); c.restore(); }
  // cilantro
  for (let i = 0; i < 18; i++) { const x = -170 + r() * 340, y = -70 + r() * 50; c.save(); c.translate(x, y); c.rotate(r() * 6); c.fillStyle = r() > .5 ? '#3aa04a' : '#5ac86a'; for (let k = 0; k < 3; k++) { c.rotate(TAU / 3); c.beginPath(); c.ellipse(0, -9, 7, 10, 0, 0, TAU); c.fill(); } c.restore(); }
  // tortilla (semicírculo doblado)
  const tor = []; for (let i = 0; i <= 24; i++) { const a = i / 24 * Math.PI; tor.push([Math.cos(a) * 230, Math.sin(a) * 200 - 10]); } tor.push([-200, -30]); tor.push([0, -6]); tor.push([200, -30]);
  furFill(c, tor, { grad: [[0, '#ffe39a'], [.6, '#f2c460'], [1, '#c8902a']], cols: ['#fff0c0', '#d9a84a', '#b8802a'], alpha: [.15, .4], len: [6, 16], density: 14, spread: 3, seed: 5, light: [.4, .25, .4], shade: .25, outline: 'rgba(140,90,20,.7)',
    pre: (c) => { const q = mulberry(3); for (let k = 0; k < 40; k++) { c.fillStyle = `rgba(${120 + q() * 40},${70 + q() * 30},20,${.25 + q() * .35})`; c.beginPath(); c.ellipse(-200 + q() * 400, -10 + q() * 200, 4 + q() * 12, 3 + q() * 8, q() * 3, 0, TAU); c.fill(); } } });
  c.strokeStyle = 'rgba(255,240,200,.7)'; c.lineWidth = 6; c.beginPath(); c.arc(0, -10, 214, .25, Math.PI - .25); c.stroke();
  // piña arriba
  c.save(); c.translate(30, -100); c.rotate(-.15); c.fillStyle = vgrad(c, -40, 40, [[0, '#ffe56a'], [1, '#f2a020']]); c.beginPath(); c.moveTo(-50, 30); c.lineTo(-30, -30); c.lineTo(40, -36); c.lineTo(56, 26); c.closePath(); c.fill(); c.strokeStyle = '#c87a10'; c.lineWidth = 3; c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 3; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(k * 16 - 6, 28); c.lineTo(k * 14, -30); c.stroke(); } c.restore();
  if (bitten) { c.globalCompositeOperation = 'destination-out'; [[205, -60, 60], [250, 20, 55], [215, 90, 50]].forEach(([x, y, rr]) => { c.beginPath(); c.arc(x, y, rr, 0, TAU); c.fill(); }); c.globalCompositeOperation = 'source-over';
    c.strokeStyle = 'rgba(120,70,10,.6)'; c.lineWidth = 4; c.beginPath(); c.arc(205, -60, 60, 1.6, 3.4); c.stroke(); c.beginPath(); c.arc(250, 20, 55, 2.0, 3.6); c.stroke(); }
  return v;
}
// mood: happy | scared | dizzy | laugh | sleep | worry | wow
function drawTaco(c, x, y, s, o = {}) {
  const t = o.t || 0, m = o.mood || 'happy';
  c.save(); c.translate(x, y); c.rotate(o.rot || 0); c.scale(s, s * (1 + Math.sin(t * 4) * .015)); c.globalAlpha = o.alpha ?? 1;
  // bracitos
  const wv = o.wave ? Math.sin(t * 12) * .5 : 0;
  [[-1, -.5 + (o.armsUp ? -1.6 : 0)], [1, .5 + (o.armsUp ? 1.6 : 0) + wv]].forEach(([sd, a]) => { c.save(); c.translate(sd * 190, 60); c.rotate(a + sd * .3); c.strokeStyle = '#a8761e'; c.lineWidth = 22; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 0); c.lineTo(sd * 70, 40); c.stroke(); c.strokeStyle = '#f2c460'; c.lineWidth = 15; c.stroke(); c.fillStyle = '#f2c460'; c.beginPath(); c.arc(sd * 74, 42, 15, 0, TAU); c.fill(); c.restore(); });
  c.drawImage(o.bitten ? T.bitten : T.whole, -310, -270);
  // cara
  const bl = o.blink != null ? clamp(Math.abs(o.blink) * 8) : 1, lk = o.look || [0, 0];
  [-62, 62].forEach(ex => {
    if (m === 'laugh' || m === 'sleep') { c.strokeStyle = '#4a2a0a'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); m === 'sleep' ? c.arc(ex, 70, 18, .3, Math.PI - .3) : c.arc(ex, 80, 18, Math.PI * 1.15, Math.PI * 1.85); c.stroke(); return; }
    if (m === 'dizzy') { c.fillStyle = '#fff'; c.beginPath(); c.arc(ex, 75, 28, 0, TAU); c.fill(); c.strokeStyle = '#4a2a0a'; c.lineWidth = 4; c.beginPath(); for (let a = 0; a < 14; a += .3) c.lineTo(ex + Math.cos(a + t * 8) * a * 1.7, 75 + Math.sin(a + t * 8) * a * 1.7); c.stroke(); return; }
    const big = m === 'scared' || m === 'wow' ? 1.3 : 1; c.fillStyle = '#fff'; c.beginPath(); c.ellipse(ex, 75, 26 * big, 31 * big * Math.max(.1, bl), 0, 0, TAU); c.fill(); c.strokeStyle = 'rgba(90,50,10,.6)'; c.lineWidth = 3; c.stroke();
    if (bl > .3) { c.fillStyle = '#2a1608'; c.beginPath(); c.arc(ex + lk[0] * 9, 79 + lk[1] * 9, m === 'scared' ? 10 : 14, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(ex + lk[0] * 9 + 5, 73 + lk[1] * 9, 5, 0, TAU); c.fill(); }
    if (m === 'worry') { c.strokeStyle = '#4a2a0a'; c.lineWidth = 6; c.beginPath(); c.moveTo(ex - 24, 34 - (ex > 0 ? -8 : 8) * 0); c.lineTo(ex + 24, 34 + (ex > 0 ? 10 : -10)); c.stroke(); }
  });
  c.fillStyle = 'rgba(255,120,90,.45)'; [-110, 110].forEach(bx => { c.beginPath(); c.ellipse(bx, 112, 24, 13, 0, 0, TAU); c.fill(); });
  c.save(); c.translate(0, 130);
  if (m === 'scared' || m === 'wow') { c.fillStyle = '#5a1a0a'; c.beginPath(); c.ellipse(0, 6, 22, 28, 0, 0, TAU); c.fill(); }
  else if (m === 'dizzy' || m === 'worry') { c.strokeStyle = '#5a1a0a'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); for (let k = 0; k <= 6; k++) c.lineTo(-30 + k * 10, k % 2 ? 6 : -4); c.stroke(); }
  else if (m === 'sleep') { c.fillStyle = '#5a1a0a'; c.beginPath(); c.ellipse(0, 4, 9, 7, 0, 0, TAU); c.fill(); }
  else { c.fillStyle = '#5a1a0a'; c.beginPath(); c.moveTo(-40, -6); c.quadraticCurveTo(0, m === 'laugh' ? 60 : 44, 40, -6); c.closePath(); c.fill(); c.fillStyle = '#ff7a6a'; c.beginPath(); c.ellipse(0, 16, 18, 8, 0, 0, TAU); c.fill(); }
  c.restore();
  if (o.halo) { c.strokeStyle = '#ffe27a'; c.lineWidth = 12; c.shadowColor = '#ffd166'; c.shadowBlur = 20; c.beginPath(); c.ellipse(0, -170, 110, 26, 0, 0, TAU); c.stroke(); c.shadowBlur = 0;
    c.fillStyle = 'rgba(255,255,255,.95)'; [-1, 1].forEach(sd => { c.beginPath(); c.ellipse(sd * 250, -20, 90, 40, sd * -.5 + Math.sin(t * 8) * .2 * sd, 0, TAU); c.fill(); }); }
  c.restore();
}
function enzyme(c, x, y, s, t, col = '#ffd84a', ph = 0) { const mo = Math.abs(Math.sin(t * 9 + ph)) * .7; c.save(); c.translate(x, y); c.scale(s, s);
  glow(c, 0, 0, 90, '255,230,120', .3); c.fillStyle = col; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 50, mo / 2, TAU - mo / 2); c.closePath(); c.fill(); c.strokeStyle = 'rgba(120,80,0,.6)'; c.lineWidth = 3; c.stroke();
  c.fillStyle = '#2a1a08'; c.beginPath(); c.arc(-8, -24, 7, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(-6, -26, 2.5, 0, TAU); c.fill(); c.restore(); }
function bacterium(c, x, y, s, t, k) { const cols = [['#5ad98a', '#2a8a4a'], ['#ff7ab0', '#c43a7a'], ['#6ab8ff', '#2a6ac4'], ['#ffd166', '#c8902a'], ['#c77dff', '#7a3ac4']][k % 5];
  c.save(); c.translate(x, y + Math.abs(Math.sin(t * 6 + k)) * -18); c.rotate(Math.sin(t * 5 + k) * .15); c.scale(s, s);
  c.strokeStyle = cols[1]; c.lineWidth = 5; for (let f = 0; f < 3; f++) { c.beginPath(); for (let q = 0; q < 10; q++) c.lineTo(-60 - q * 8, (f - 1) * 14 + Math.sin(q + t * 12 + f) * 6); c.stroke(); }
  const rod = k % 2 === 0; c.fillStyle = vgrad(c, -40, 40, [[0, cols[0]], [1, cols[1]]]); rod ? rrect(c, -70, -38, 140, 76, 38) : (c.beginPath(), c.arc(0, 0, 48, 0, TAU)); c.fill();
  c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(-16, -18, 22, 9, -.3, 0, TAU); c.fill();
  c.fillStyle = '#fff'; [[-16, -4], [16, -4]].forEach(([ex, ey]) => { c.beginPath(); c.arc(ex, ey, 11, 0, TAU); c.fill(); }); c.fillStyle = '#1a1a1a'; [[-14, -2], [18, -2]].forEach(([ex, ey]) => { c.beginPath(); c.arc(ex, ey, 6, 0, TAU); c.fill(); });
  c.strokeStyle = '#1a1a1a'; c.lineWidth = 4; c.beginPath(); c.arc(0, 10, 14, .2, Math.PI - .2); c.stroke();
  if (k % 3 === 0) { c.fillStyle = XCOLS[k % 6]; c.beginPath(); c.moveTo(-18, -40); c.lineTo(18, -40); c.lineTo(0, -88); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(0, -90, 7, 0, TAU); c.fill(); }
  c.restore(); }
function flame(c, x, y, s, t, k) { c.save(); c.translate(x, y); c.scale(s, s * (1 + Math.sin(t * 14 + k) * .1));
  c.fillStyle = '#ff4a1a'; c.beginPath(); c.moveTo(0, -120); c.bezierCurveTo(50, -60, 60, -10, 40, 20); c.quadraticCurveTo(0, 50, -40, 20); c.bezierCurveTo(-60, -10, -30, -40, 0, -120); c.fill();
  c.fillStyle = '#ffb21a'; c.beginPath(); c.moveTo(0, -70); c.bezierCurveTo(30, -30, 34, 0, 22, 20); c.quadraticCurveTo(0, 34, -22, 20); c.bezierCurveTo(-34, 0, -16, -30, 0, -70); c.fill();
  c.fillStyle = '#fff3a0'; c.beginPath(); c.ellipse(0, 10, 12, 20, 0, 0, TAU); c.fill(); c.restore(); }
function mouthCave(c, t) {
  const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1200); g.addColorStop(0, '#5a0a1a'); g.addColorStop(.5, '#a82a44'); g.addColorStop(1, '#e8708a'); c.fillStyle = g; c.fillRect(-400, -400, W + 800, H + 800);
  c.strokeStyle = 'rgba(255,170,190,.25)'; c.lineWidth = 14; for (let k = 0; k < 7; k++) { c.beginPath(); c.ellipse(540, 980, 300 + k * 110, 220 + k * 90, 0, 0, TAU); c.stroke(); }
  // úvula
  c.save(); c.translate(540, 300); c.rotate(Math.sin(t * 2) * .1); c.fillStyle = vgrad(c, 0, 360, [[0, '#d84a64'], [1, '#ff8aa0']]); c.beginPath(); c.moveTo(-60, 0); c.quadraticCurveTo(-50, 250, 0, 330); c.quadraticCurveTo(50, 250, 60, 0); c.fill(); c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.ellipse(-14, 220, 10, 40, 0, 0, TAU); c.fill(); c.restore();
  // dientes de arriba
  for (let i = 0; i < 7; i++) { const x = -40 + i * 170, y = 120 + Math.abs(i - 3) * 30; c.fillStyle = vgrad(c, y - 160, y + 60, [[0, '#ffffff'], [1, '#e8e2d6']]); rrect(c, x - 70, y - 200, 140, 260, 40); c.fill(); c.strokeStyle = 'rgba(160,150,140,.6)'; c.lineWidth = 4; c.stroke(); c.fillStyle = 'rgba(255,255,255,.7)'; rrect(c, x - 44, y - 160, 22, 150, 10); c.fill(); }
  c.fillStyle = '#e8708a'; c.fillRect(-400, -400, W + 800, 330);
  c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(-400, -80, W + 800, 20);
}
function tongue(c, t, y = 1450) {
  c.fillStyle = vgrad(c, y - 200, y + 600, [[0, '#ff5a78'], [1, '#c42a4a']]); c.beginPath(); c.ellipse(540, y + 260, 760, 420, 0, Math.PI, TAU); c.lineTo(1300, 2400); c.lineTo(-220, 2400); c.fill();
  c.fillStyle = 'rgba(255,170,190,.45)'; for (let i = 0; i < 120; i++) { const x = hash(i) * 1400 - 160, yy = y - 120 + hash(i * 2) * 700; if (Math.pow((x - 540) / 760, 2) + Math.pow((yy - y - 260) / 420, 2) > 1 && yy < y + 260) continue; c.beginPath(); c.arc(x, yy, 5 + hash(i * 3) * 6, 0, TAU); c.fill(); }
  c.strokeStyle = 'rgba(150,20,50,.5)'; c.lineWidth = 8; c.beginPath(); c.moveTo(540, y - 150); c.quadraticCurveTo(560, y + 200, 540, y + 600); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.ellipse(300, y - 60, 200, 30, -.15, 0, TAU); c.fill();
}
function gutWalls(c, t, base = ['#ff8aa0', '#c43a5a']) { // fondo de cavidad orgánica genérica
  c.fillStyle = vgrad(c, -300, 2200, [[0, base[1]], [.5, base[0]], [1, base[1]]]); c.fillRect(-400, -400, W + 800, H + 800);
  c.strokeStyle = 'rgba(255,220,230,.22)'; c.lineWidth = 16; c.lineCap = 'round'; for (let k = 0; k < 14; k++) { c.beginPath(); const y0 = -100 + k * 160; for (let x = -300; x <= W + 300; x += 30) c.lineTo(x, y0 + Math.sin(x * .012 + k + t * .8) * 40); c.stroke(); }
  c.strokeStyle = 'rgba(120,10,40,.18)'; c.lineWidth = 8; for (let k = 0; k < 14; k++) { c.beginPath(); const y0 = -60 + k * 160; for (let x = -300; x <= W + 300; x += 30) c.lineTo(x, y0 + Math.sin(x * .012 + k + t * .8) * 40); c.stroke(); }
}
const _be3b = buildExtra; buildExtra = async () => { await _be3b(); T.whole = buildTaco(false); T.bitten = buildTaco(true); };
function zzz(c, t, x, y, a = 1) { c.save(); c.font = '900 60px Nunito'; c.fillStyle = 'rgba(255,255,255,.9)'; c.strokeStyle = '#1a1c3a'; c.lineWidth = 8; ['z', 'z', 'Z'].forEach((z, i) => { const ph = ((t * .7) + i / 3) % 1; c.globalAlpha = Math.sin(ph * Math.PI) * a; c.strokeText(z, x + ph * 70 + i * 8, y - ph * 170); c.fillText(z, x + ph * 70 + i * 8, y - ph * 170); }); c.restore(); }
