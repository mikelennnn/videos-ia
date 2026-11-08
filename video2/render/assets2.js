// ---------- assets del video navideño ----------
const B = {};
const XCOLS = ['#ff4d5e', '#ffd166', '#4cd97b', '#4cc9f0', '#ff9f43', '#c77dff'];

function woodFill(c, pts, light = ['#a8703f', '#6e4322'], seed = 3) {
  furFill(c, pts, { grad: [[0, light[0]], [1, light[1]]], cols: ['#c48a52', '#5a361b', '#8a5a30', '#d9a46c'], alpha: [.15, .45], len: [30, 90], density: 6, angle: 0, spread: .04, seed, lw: 1.4, shade: .25, light: [.4, .1, .25], rim: 'rgba(255,220,170,.5)', rimW: 4, rimA: .5 });
}
function rectPts(x, y, w, h, r = 18) { // rectángulo redondeado como puntos (para furFill)
  const p = []; const k = 4; const cr = [[x + w - r, y + r, -Math.PI / 2], [x + w - r, y + h - r, 0], [x + r, y + h - r, Math.PI / 2], [x + r, y + r, Math.PI]];
  cr.forEach(([cx, cy, a0]) => { for (let i = 0; i <= k; i++) { const a = a0 + i / k * Math.PI / 2; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } }); return p;
}
function makeVinyl() {
  const S = 760, c0 = mk(S, S), c = c0.getContext('2d'), R = 370, r = mulberry(5); c.translate(S / 2, S / 2);
  c.fillStyle = '#0d0d10'; c.beginPath(); c.arc(0, 0, R, 0, TAU); c.fill();
  for (let k = 120; k < R - 6; k += 2.2) { c.strokeStyle = `rgba(${r() > .5 ? '255,255,255' : '0,0,0'},${.05 + r() * .07})`; c.lineWidth = 1; c.beginPath(); c.arc(0, 0, k, 0, TAU); c.stroke(); }
  [180, 245, 305].forEach(k => { c.strokeStyle = 'rgba(0,0,0,.8)'; c.lineWidth = 5; c.beginPath(); c.arc(0, 0, k, 0, TAU); c.stroke(); });
  c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 4; c.beginPath(); c.arc(0, 0, R - 2, 0, TAU); c.stroke();
  const g = c.createRadialGradient(-30, -30, 10, 0, 0, 115); g.addColorStop(0, '#ff5a5a'); g.addColorStop(1, '#a8141c'); c.fillStyle = g; c.beginPath(); c.arc(0, 0, 112, 0, TAU); c.fill();
  c.strokeStyle = '#ffd98a'; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 96, 0, TAU); c.stroke();
  c.fillStyle = '#ffe9b0'; c.font = '900 34px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('XMAS', 0, -42); c.font = '800 26px Nunito'; c.fillText("· 1994 ·", 0, 46);
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; c.save(); c.translate(Math.cos(a) * 70, Math.sin(a) * 70); c.rotate(a); c.fillStyle = 'rgba(255,233,176,.8)'; c.beginPath(); for (let k = 0; k < 10; k++) { const rr = k % 2 ? 4 : 10; c.lineTo(Math.cos(k * Math.PI / 5) * rr, Math.sin(k * Math.PI / 5) * rr); } c.fill(); c.restore(); }
  c.fillStyle = '#e8e8ea'; c.beginPath(); c.arc(0, 0, 12, 0, TAU); c.fill(); return c0;
}
function vinylSheen(c, x, y, R, a = .22) { // brillo estático sobre el disco que gira
  c.save(); c.translate(x, y); c.beginPath(); c.arc(0, 0, R, 0, TAU); c.clip();
  for (const [ang, w] of [[-.8, .35], [2.35, .3]]) { const g = c.createConicGradient ? c.createConicGradient(ang - w, 0, 0) : null; if (!g) break;
    g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(w / TAU, `rgba(255,255,255,${a})`); g.addColorStop(2 * w / TAU, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(-R, -R, R * 2, R * 2); }
  c.restore();
}
function makeTree() {
  const c0 = mk(700, 1000), c = c0.getContext('2d'), r = mulberry(17);
  c.fillStyle = vgrad(c, 860, 980, [[0, '#6b4428'], [1, '#3e2614']]); c.fillRect(310, 840, 80, 120);
  c.fillStyle = '#b8322e'; rrect(c, 230, 930, 240, 70, 14); c.fill(); c.fillStyle = '#e9c46a'; c.fillRect(230, 950, 240, 12);
  const tiers = [[350, 140, 180, 330], [350, 300, 250, 520], [350, 480, 320, 720], [350, 650, 330, 880]];
  tiers.forEach(([cx, top, hw, bot], i) => {
    const pts = [[cx, top]]; const n = 9; for (let k = 0; k <= n; k++) { const u = k / n, x = cx + hw - u * hw * 2, y = bot + Math.sin(u * Math.PI * n) * 22 - 10; pts.push([x, y]); }
    pts.splice(1, 0, [cx + hw * .5, (top + bot) / 2]); pts.push([cx - hw * .5, (top + bot) / 2]);
    furFill(c, pts, { grad: [[0, '#3f9a5a'], [1, '#1d5a32']], cols: ['#5cc27a', '#2a7a44', '#1a4a2a', '#7ad89a'], alpha: [.35, .8], len: [10, 22], density: 26, angle: 1.9 + (i % 2) * .2, spread: 1.1, seed: 40 + i, fringe: ['#5cc27a', '#2a7a44', '#1d5a32'], fringeLen: 14, fringeBias: .3, light: [.35, .2, .3], shade: .35 });
  });
  c.strokeStyle = 'rgba(255,215,120,.85)'; c.lineWidth = 6; for (let k = 0; k < 4; k++) { const y0 = 330 + k * 150; c.beginPath(); c.moveTo(350 - 90 - k * 55, y0); c.quadraticCurveTo(350, y0 + 80, 350 + 95 + k * 55, y0 - 25); c.stroke(); }
  B.treeBalls = []; for (let i = 0; i < 26; i++) { const y = 250 + r() * 600, hw = (y - 140) / 760 * 300, x = 350 + (r() - .5) * hw * 1.6; B.treeBalls.push([x, y, XCOLS[i % 6]]);
    const g = c.createRadialGradient(x - 6, y - 6, 2, x, y, 18); g.addColorStop(0, '#ffffff'); g.addColorStop(.3, XCOLS[i % 6]); g.addColorStop(1, 'rgba(0,0,0,.6)'); c.fillStyle = g; c.beginPath(); c.arc(x, y, 16, 0, TAU); c.fill(); }
  return c0;
}
function drawStar(c, x, y, R, col = '#ffd84a', pts = 5) { c.beginPath(); for (let k = 0; k < pts * 2; k++) { const rr = k % 2 ? R * .45 : R, a = -Math.PI / 2 + k * Math.PI / pts; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); c.fillStyle = col; c.fill(); }
function makeMic() {
  const c0 = mk(300, 760), c = c0.getContext('2d'); c.translate(150, 170);
  c.fillStyle = vgrad(c, 120, 560, [[0, '#2a2a30'], [1, '#0e0e12']]); rrect(c, -44, 110, 88, 420, 30); c.fill();
  c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(-30, 130, 10, 380);
  c.fillStyle = vgrad(c, 90, 140, [[0, '#d9dde3'], [1, '#7a808a']]); rrect(c, -58, 88, 116, 46, 14); c.fill();
  const g = c.createRadialGradient(-35, -45, 10, 0, 0, 130); g.addColorStop(0, '#ffffff'); g.addColorStop(.35, '#c9ced6'); g.addColorStop(1, '#4a505a'); c.fillStyle = g; c.beginPath(); c.ellipse(0, 0, 112, 120, 0, 0, TAU); c.fill();
  c.save(); c.beginPath(); c.ellipse(0, 0, 112, 120, 0, 0, TAU); c.clip(); c.strokeStyle = 'rgba(40,44,52,.45)'; c.lineWidth = 2;
  for (let k = -130; k < 130; k += 11) { c.beginPath(); c.moveTo(k, -130); c.lineTo(k + 130, 130); c.stroke(); c.beginPath(); c.moveTo(k, 130); c.lineTo(k + 130, -130); c.stroke(); } c.restore();
  c.strokeStyle = '#9aa0aa'; c.lineWidth = 10; c.beginPath(); c.ellipse(0, 0, 114, 30, 0, 0, TAU); c.stroke();
  return c0;
}
function makeBoombox() {
  const c0 = mk(980, 640), c = c0.getContext('2d');
  c.strokeStyle = '#2b2d34'; c.lineWidth = 26; c.lineCap = 'round'; c.beginPath(); c.moveTo(220, 150); c.lineTo(260, 40); c.lineTo(720, 40); c.lineTo(760, 150); c.stroke();
  furFill(c, rectPts(40, 130, 900, 480, 60), { grad: [[0, '#d7dbe2'], [.5, '#a9afba'], [1, '#6e7480']], cols: ['#ffffff', '#8a909a', '#c3c8d0'], alpha: [.1, .3], len: [20, 60], density: 5, angle: 0, spread: .03, seed: 2, light: [.3, .1, .35], rim: 'rgba(255,255,255,.8)', rimW: 6, outline: 'rgba(30,30,40,.6)' });
  c.fillStyle = '#2d3038'; rrect(c, 80, 170, 820, 70, 20); c.fill();
  for (let i = 0; i < 18; i++) { c.fillStyle = i % 3 ? '#4cc9f0' : '#ff4fa3'; c.fillRect(110 + i * 22, 190, 14, 30); }
  c.fillStyle = '#ffd166'; c.font = '900 34px Nunito'; c.fillText('FM 94.0', 560, 218);
  B.boomSpk = [[230, 430], [750, 430]];
  B.boomSpk.forEach(([x, y]) => { c.fillStyle = '#1b1d22'; c.beginPath(); c.arc(x, y, 150, 0, TAU); c.fill(); c.strokeStyle = '#8a909a'; c.lineWidth = 8; c.stroke();
    c.fillStyle = 'rgba(255,255,255,.07)'; for (let a = 0; a < 400; a++) { const rr = Math.sqrt(a / 400) * 140, an = a * 2.4; c.fillRect(x + Math.cos(an) * rr, y + Math.sin(an) * rr, 3, 3); } });
  c.fillStyle = '#23262d'; rrect(c, 400, 300, 180, 250, 18); c.fill(); c.strokeStyle = '#8a909a'; c.lineWidth = 5; c.stroke();
  c.fillStyle = 'rgba(160,200,255,.18)'; rrect(c, 415, 320, 150, 110, 10); c.fill();
  c.fillStyle = '#f2e6cc'; rrect(c, 425, 335, 130, 82, 6); c.fill(); c.fillStyle = '#ff4fa3'; c.fillRect(425, 345, 130, 14); c.fillStyle = '#3a3a40'; rrect(c, 450, 372, 80, 32, 14); c.fill();
  for (let i = 0; i < 4; i++) { c.fillStyle = '#3c4048'; rrect(c, 418 + i * 38, 460, 30, 60, 6); c.fill(); c.fillStyle = 'rgba(255,255,255,.2)'; c.fillRect(420 + i * 38, 462, 26, 6); }
  return c0;
}
function makeIce() {
  const c0 = mk(640, 760), c = c0.getContext('2d');
  const pts = rectPts(40, 40, 560, 680, 50).map(([x, y], i) => [x + (hash(i) - .5) * 14, y + (hash(i * 3) - .5) * 14]);
  furFill(c, pts, { grad: [[0, 'rgba(225,245,255,.82)'], [.5, 'rgba(150,205,240,.7)'], [1, 'rgba(90,150,210,.78)']], cols: ['#ffffff', '#cfefff', '#9fd4f5'], alpha: [.12, .45], len: [10, 50], density: 7, spread: 3, seed: 9, rim: 'rgba(255,255,255,.95)', rimW: 10, rimA: .7, light: [.3, .15, .5] });
  c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(110, 120); c.lineTo(110, 330); c.moveTo(150, 100); c.lineTo(260, 100); c.stroke();
  return c0;
}
function makeGlobe() {
  const c0 = mk(800, 900), c = c0.getContext('2d');
  c.fillStyle = vgrad(c, 660, 860, [[0, '#c48a2a'], [1, '#6a4410']]); c.beginPath(); c.moveTo(150, 680); c.lineTo(650, 680); c.lineTo(700, 860); c.lineTo(100, 860); c.closePath(); c.fill();
  c.fillStyle = '#e9b949'; c.fillRect(140, 660, 520, 34); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(140, 662, 520, 6);
  c.fillStyle = '#3a2610'; rrect(c, 300, 740, 200, 60, 10); c.fill(); c.fillStyle = '#ffd98a'; c.font = '900 34px Nunito'; c.textAlign = 'center'; c.fillText('$ 1994 $', 400, 782);
  return c0;
}
function makeTrophy() {
  const c0 = mk(600, 860), c = c0.getContext('2d');
  const gold = (y0, y1) => { const g = c.createLinearGradient(100, 0, 500, 0); g.addColorStop(0, '#9a6a12'); g.addColorStop(.3, '#ffe9a0'); g.addColorStop(.5, '#f2c04a'); g.addColorStop(.8, '#c48a22'); g.addColorStop(1, '#7a520c'); return g; };
  c.fillStyle = '#2c1d14'; rrect(c, 130, 700, 340, 130, 16); c.fill(); c.fillStyle = '#4a3020'; rrect(c, 160, 660, 280, 60, 12); c.fill();
  c.fillStyle = '#e9c46a'; rrect(c, 200, 735, 200, 60, 8); c.fill(); c.fillStyle = '#5a3a10'; c.font = '900 34px Nunito'; c.textAlign = 'center'; c.fillText('2019', 300, 778);
  c.fillStyle = gold(); c.fillRect(260, 480, 80, 190); c.beginPath(); c.ellipse(300, 650, 110, 26, 0, 0, TAU); c.fill();
  c.lineWidth = 34; c.strokeStyle = gold(); c.beginPath(); c.arc(120, 250, 80, Math.PI * .5, Math.PI * 1.5); c.stroke(); c.beginPath(); c.arc(480, 250, 80, -Math.PI * .5, Math.PI * .5); c.stroke();
  c.fillStyle = gold(); c.beginPath(); c.moveTo(110, 120); c.lineTo(490, 120); c.quadraticCurveTo(490, 470, 300, 490); c.quadraticCurveTo(110, 470, 110, 120); c.fill();
  c.fillStyle = '#fff3c4'; c.beginPath(); c.ellipse(300, 120, 190, 30, 0, 0, TAU); c.fill(); c.fillStyle = '#b07a1a'; c.beginPath(); c.ellipse(300, 124, 170, 22, 0, 0, TAU); c.fill();
  c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.ellipse(190, 260, 22, 100, -.1, 0, TAU); c.fill();
  c.font = '900 190px Nunito'; c.fillStyle = '#8a5a0c'; c.fillText('1', 306, 390); c.fillStyle = '#fff6d0'; c.fillText('1', 300, 382);
  return c0;
}
function snow(c, t, n, seed, o = {}) {
  c.save(); for (let i = 0; i < n; i++) { const sp = .4 + hash(i * 3.7 + seed) * .8, sz = (o.size || 6) * (.4 + hash(i * 1.3 + seed) * 1.2);
    const x = (hash(i + seed) * (W + 200) + Math.sin(t * .8 + i) * 40 + t * (o.wind || 15)) % (W + 200) - 100, y = (hash(i * 2.1 + seed) * (H + 200) + t * 140 * sp) % (H + 200) - 100;
    c.globalAlpha = (o.a || .8) * (.5 + .5 * sp); c.drawImage(A.dot, x - sz * 1.8, y - sz * 1.8, sz * 3.6, sz * 3.6); } c.restore();
}
function bokeh(c, t, n, seed, a = .5) { c.save(); c.globalCompositeOperation = 'lighter'; for (let i = 0; i < n; i++) { const x = hash(i + seed) * W, y = hash(i * 1.9 + seed) * H, s = 30 + hash(i * 4.1) * 70; c.globalAlpha = a * (.35 + .4 * Math.sin(t * .8 + i)); c.drawImage(B.dots[i % B.dots.length], x - s, y - s + Math.sin(t * .5 + i) * 15, s * 2, s * 2); } c.restore(); }
function stringLights(c, t, x0, x1, y0, sag, n, seed = 0, on = 1) {
  c.strokeStyle = '#1e2a1e'; c.lineWidth = 4; c.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30; c.lineTo(lerp(x0, x1, u), y0 + Math.sin(u * Math.PI) * sag); } c.stroke();
  for (let i = 0; i < n; i++) { const u = (i + .5) / n, x = lerp(x0, x1, u), y = y0 + Math.sin(u * Math.PI) * sag + 6; const col = XCOLS[(i + seed) % 6];
    const tw = on * (.6 + .4 * Math.sin(t * 4 + i * 1.7 + seed)); c.fillStyle = '#2a2a2a'; c.fillRect(x - 5, y - 6, 10, 10);
    if (tw > .05) { c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = tw; c.drawImage(B.dots[(i + seed) % 6], x - 40, y - 26, 80, 80); c.restore(); }
    c.fillStyle = tw > .05 ? col : '#555'; c.beginPath(); c.ellipse(x, y + 14, 9, 14, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.arc(x - 3, y + 9, 3, 0, TAU); c.fill(); }
}
function musicNote(c, x, y, s, col = '#fff') { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.beginPath(); c.ellipse(0, 0, 22, 16, -.4, 0, TAU); c.fill(); c.fillRect(16, -90, 8, 90); c.beginPath(); c.moveTo(24, -90); c.quadraticCurveTo(60, -70, 50, -30); c.quadraticCurveTo(50, -60, 24, -62); c.fill(); c.restore(); }

async function buildExtra() {
  B.vinyl = makeVinyl(); B.tree = makeTree(); B.mic = makeMic(); B.boom = makeBoombox(); B.ice = makeIce(); B.globe = makeGlobe(); B.trophy = makeTrophy();
  B.dots = XCOLS.map(col => tinted(A.dot, col));
  B.wood = mk(1400, 500); woodFill(B.wood.getContext('2d'), rectPts(0, 0, 1400, 500, 4), ['#8a5a32', '#4e3018'], 8);
}
