// ---------- assets del video: ¿por qué los gatos tiran cosas? ----------
const D = {};
function rectPts(x, y, w, h, r = 18) { const p = []; const k = 4; [[x + w - r, y + r, -Math.PI / 2], [x + w - r, y + h - r, 0], [x + r, y + h - r, Math.PI / 2], [x + r, y + r, Math.PI]].forEach(([cx, cy, a0]) => { for (let i = 0; i <= k; i++) { const a = a0 + i / k * Math.PI / 2; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } }); return p; }
function woodFill(c, pts, light = ['#a8703f', '#6e4322'], seed = 3) {
  furFill(c, pts, { grad: [[0, light[0]], [1, light[1]]], cols: ['#c48a52', '#5a361b', '#8a5a30', '#d9a46c'], alpha: [.15, .45], len: [30, 90], density: 6, angle: 0, spread: .04, seed, lw: 1.4, shade: .25, light: [.4, .1, .25], rim: 'rgba(255,220,170,.5)', rimW: 4, rimA: .5 });
}
function makeWood(w, h, cols, seed) { const v = mk(w, h); woodFill(v.getContext('2d'), rectPts(0, 0, w, h, 4), cols, seed); return v; }
// mesa vista de frente: cubierta + borde
function cloth(c, x0, x1, y, h = 380) {
  c.save(); c.beginPath(); c.moveTo(x0 - 10, y); c.lineTo(x1 + 10, y); c.lineTo(x1 + 10, y + h); for (let x = x1 + 10; x >= x0 - 10; x -= 20) c.lineTo(x, y + h + Math.sin(x * .05) * 14); c.closePath();
  c.fillStyle = '#f4ece0'; c.fill(); c.clip();
  c.fillStyle = 'rgba(214,58,70,.55)'; for (let x = x0 - 10; x < x1 + 10; x += 70) c.fillRect(x, y, 35, h + 20); for (let yy = y; yy < y + h + 20; yy += 70) c.fillRect(x0 - 10, yy, x1 - x0 + 20, 35);
  c.strokeStyle = 'rgba(120,40,40,.18)'; c.lineWidth = 8; for (let x = x0 + 60; x < x1; x += 140) { c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 20, y + h * .6, x - 10, y + h); c.stroke(); }
  c.fillStyle = vgrad(c, y, y + h, [[0, 'rgba(0,0,0,.25)'], [.2, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.15)']]); c.fillRect(x0 - 10, y, x1 - x0 + 20, h + 20); c.restore();
}
function table(c, x0, x1, y, depth = 60, withCloth = true) {
  c.drawImage(D.wood, x0, y - depth, x1 - x0, depth + 40);
  c.fillStyle = 'rgba(255,230,190,.35)'; c.fillRect(x0, y - depth, x1 - x0, 5);
  c.fillStyle = vgrad(c, y + 40, y + 120, [[0, '#5a361b'], [1, '#3a220f']]); c.fillRect(x0, y + 30, x1 - x0, 70);
  c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(x0, y + 30, x1 - x0, 8);
  c.fillStyle = '#4a2c14'; c.fillRect(x0 + 40, y + 100, 46, 900); c.fillRect(x1 - 86, y + 100, 46, 900);
  if (withCloth) cloth(c, x0, x1, y + 30);
}
function drawGlass(c, x, y, s = 1, rot = 0, water = 1) { // (x,y) = base
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  c.fillStyle = 'rgba(200,230,255,.25)'; c.beginPath(); c.moveTo(-55, -230); c.lineTo(55, -230); c.lineTo(45, 0); c.lineTo(-45, 0); c.closePath(); c.fill();
  if (water > 0) { c.save(); c.clip(); c.fillStyle = 'rgba(90,170,240,.55)'; c.fillRect(-60, -230 + 230 * (1 - .75 * water), 120, 230); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(-60, -230 + 230 * (1 - .75 * water), 120, 6); c.restore(); }
  c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 5; c.beginPath(); c.moveTo(-55, -230); c.lineTo(-45, 0); c.lineTo(45, 0); c.lineTo(55, -230); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(-38, -200, 10, 170); c.beginPath(); c.ellipse(0, -230, 55, 10, 0, 0, TAU); c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 3; c.stroke();
  c.restore();
}
function drawMug(c, x, y, s = 1, rot = 0, t = 0, steam = true) {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  c.strokeStyle = '#d94a5a'; c.lineWidth = 22; c.beginPath(); c.arc(70, -90, 44, -1.2, 1.2); c.stroke();
  c.fillStyle = vgrad(c, -180, 0, [[0, '#ff6b7a'], [1, '#c83a4a']]); rrect(c, -70, -180, 140, 180, 22); c.fill();
  c.fillStyle = 'rgba(255,255,255,.3)'; rrect(c, -52, -160, 20, 130, 10); c.fill();
  c.fillStyle = '#fff'; c.beginPath(); c.moveTo(0, -70); c.bezierCurveTo(-40, -110, -20, -140, 0, -115); c.bezierCurveTo(20, -140, 40, -110, 0, -70); c.fill();
  c.fillStyle = '#5a2a14'; c.beginPath(); c.ellipse(0, -178, 66, 14, 0, 0, TAU); c.fill();
  if (steam) { c.strokeStyle = 'rgba(255,255,255,.45)'; c.lineWidth = 7; c.lineCap = 'round'; for (let k = -1; k <= 1; k++) { c.beginPath(); for (let i = 0; i < 12; i++) c.lineTo(k * 30 + Math.sin(i * .6 + t * 3 + k) * 10, -200 - i * 12); c.stroke(); } }
  c.restore();
}
function drawPen(c, x, y, rot = 0) { c.save(); c.translate(x, y); c.rotate(rot); c.fillStyle = '#4c7bf0'; rrect(c, -110, -12, 200, 24, 10); c.fill(); c.fillStyle = '#f2f4f8'; c.beginPath(); c.moveTo(90, -12); c.lineTo(130, 0); c.lineTo(90, 12); c.fill(); c.fillStyle = '#2a2d34'; c.beginPath(); c.moveTo(118, -4); c.lineTo(130, 0); c.lineTo(118, 4); c.fill(); c.fillStyle = '#2a4ab0'; c.fillRect(-90, -16, 60, 8); c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(-100, -8, 180, 5); c.restore(); }
function drawPhone(c, x, y, rot = 0, s = 1, t = 0) {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  c.fillStyle = '#1a1c22'; rrect(c, -60, -115, 120, 230, 22); c.fill();
  c.fillStyle = vgrad(c, -100, 100, [[0, '#5a7bff'], [1, '#c45aff']]); rrect(c, -52, -104, 104, 208, 14); c.fill();
  c.fillStyle = 'rgba(255,255,255,.85)'; for (let k = 0; k < 4; k++) { rrect(c, -40, -80 + k * 44 - ((t * 60) % 44), 80, 30, 8); c.fill(); }
  c.fillStyle = '#1a1c22'; rrect(c, -18, -100, 36, 8, 4); c.fill(); c.fillStyle = 'rgba(255,255,255,.25)'; c.beginPath(); c.moveTo(-52, -104); c.lineTo(10, -104); c.lineTo(-52, 0); c.fill();
  c.restore();
}
function shards(c, t, t0, x, y, col = 'rgba(210,235,255,.9)', n = 18, seed = 1) {
  const lt = t - t0; if (lt < 0 || lt > 1.2) return; c.save();
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (hash(i + seed) - .5) * 2.8, v = 400 + hash(i * 2 + seed) * 700, px = x + Math.cos(a) * v * lt, py = y + Math.sin(a) * v * lt + 1600 * lt * lt, s = 10 + hash(i * 3) * 22;
    c.save(); c.translate(px, py); c.rotate(lt * 10 * (hash(i) - .5)); c.globalAlpha = 1 - clamp((lt - .8) / .4); c.fillStyle = col; c.beginPath(); c.moveTo(0, -s); c.lineTo(s * .8, s * .5); c.lineTo(-s * .6, s * .6); c.fill(); c.restore(); }
  c.restore();
}
function crashText(c, t, t0, x, y, txt = '¡CRASH!') { const lt = t - t0; if (lt < 0 || lt > 1.1) return; const a = eBack(lt / .25); c.save(); c.globalAlpha = 1 - clamp((lt - .8) / .3); c.translate(x, y); c.rotate(-.12); c.scale(a, a);
  c.fillStyle = '#ffd166'; c.beginPath(); for (let k = 0; k < 24; k++) { const r = k % 2 ? 110 : 170, an = k / 24 * TAU; c.lineTo(Math.cos(an) * r * 1.3, Math.sin(an) * r * .75); } c.fill();
  c.font = '900 86px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 12; c.strokeStyle = '#7a1a1a'; c.strokeText(txt, 0, 4); c.fillStyle = '#ff4d5e'; c.fillText(txt, 0, 4); c.restore(); }
// sala / cocina acogedora
function room(c, t, o = {}) {
  c.fillStyle = vgrad(c, -300, 1500, [[0, o.wall0 || '#f3dcc0'], [1, o.wall1 || '#e2bf98']]); c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalAlpha = .12; for (let y = -300; y < 1500; y += 90) for (let x = -300; x < W + 300; x += 90) { c.fillStyle = '#c47a4a'; c.beginPath(); c.arc(x + ((y / 90) % 2) * 45, y, 7, 0, TAU); c.fill(); } c.restore();
  // ventana
  const wx = o.wx ?? 620, wy = o.wy ?? 380;
  c.fillStyle = '#7a4a28'; rrect(c, wx - 20, wy - 20, 420, 480, 14); c.fill();
  c.fillStyle = vgrad(c, wy, wy + 440, o.sky || [[0, '#6cb8f0'], [1, '#cdeafc']]); c.fillRect(wx, wy, 380, 440);
  if (o.sun !== false) { glow(c, wx + 280, wy + 120, 120, '255,240,190', .8); }
  c.drawImage(A.cloud[0], wx + 20, wy + 200, 220, 101);
  c.fillStyle = '#7a4a28'; c.fillRect(wx + 182, wy, 16, 440); c.fillRect(wx, wy + 212, 380, 16);
  c.fillStyle = 'rgba(255,255,255,.2)'; c.beginPath(); c.moveTo(wx, wy); c.lineTo(wx + 140, wy); c.lineTo(wx, wy + 200); c.fill();
  // repisa con plantas
  c.fillStyle = '#8a5a30'; c.fillRect(60, 560, 420, 22);
  [[120, '#4cd97b'], [250, '#3aa860'], [380, '#5ae08a']].forEach(([x, col], i) => { c.fillStyle = '#d9784a'; c.beginPath(); c.moveTo(x - 40, 480); c.lineTo(x + 40, 480); c.lineTo(x + 30, 560); c.lineTo(x - 30, 560); c.fill();
    c.fillStyle = col; for (let k = 0; k < 5; k++) { c.save(); c.translate(x, 480); c.rotate(-1.2 + k * .6 + Math.sin(t + i) * .03); c.beginPath(); c.ellipse(0, -50, 16, 50, 0, 0, TAU); c.fill(); c.restore(); } });
  // cuadro
  c.fillStyle = '#5a3a24'; rrect(c, 120, 700, 260, 200, 10); c.fill(); c.fillStyle = '#ffd9a8'; c.fillRect(138, 718, 224, 164); c.fillStyle = '#f2763a'; c.beginPath(); c.arc(250, 800, 46, 0, TAU); c.fill(); c.fillStyle = '#4cc9f0'; c.beginPath(); c.moveTo(138, 882); c.lineTo(220, 790); c.lineTo(300, 882); c.fill();
  if (o.sunbeam !== false) { c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = .18; c.fillStyle = '#fff3c8'; c.beginPath(); c.moveTo(wx, wy); c.lineTo(wx + 380, wy); c.lineTo(wx - 100, 1700); c.lineTo(wx - 520, 1700); c.fill(); c.restore(); }
  c.fillStyle = vgrad(c, 1500, 2000, [[0, '#b07a4a'], [1, '#7a5030']]); c.fillRect(-300, 1500, W + 600, 900);
  c.strokeStyle = 'rgba(60,30,10,.25)'; c.lineWidth = 3; for (let x = -600; x < 1700; x += 140) { c.beginPath(); c.moveTo(540 + (x - 540) * .8, 1500); c.lineTo(540 + (x - 540) * 1.5, 2000); c.stroke(); }
  c.fillStyle = '#c8956a'; c.fillRect(-300, 1490, W + 600, 14);
}
function buildPaw() {
  const v = mk(900, 1100), c = v.getContext('2d'); c.translate(450, 1100);
  furFill(c, tubePts([[0, 0], [0, -400], [-10, -760]], 420, 470), { ...CAT, alpha: [.3, .7], len: [10, 20], density: 22, angle: 1.57, spread: .4, fringeLen: 16, seed: 3, light: [.4, .2, .35], shade: .2, pre: (c, b) => { c.strokeStyle = 'rgba(150,70,20,.5)'; c.lineWidth = 30; for (let y = b[1] + 120; y < b[3]; y += 130) { c.beginPath(); c.moveTo(b[0], y); c.quadraticCurveTo((b[0] + b[2]) / 2, y + 30, b[2], y - 10); c.stroke(); } } });
  furFill(c, ellipsePts(-10, -840, 260, 200, 30, 0, .04, 5), { ...CAT, alpha: [.3, .7], len: [8, 16], density: 26, spread: 1.2, fringeLen: 14, seed: 7, light: [.5, .3, .4] });
  const bean = (x, y, rx, ry) => { c.fillStyle = '#c45a6a'; c.beginPath(); c.ellipse(x, y + 4, rx + 4, ry + 4, 0, 0, TAU); c.fill(); const g = c.createRadialGradient(x - rx * .3, y - ry * .3, 2, x, y, rx * 1.2); g.addColorStop(0, '#ffc4cc'); g.addColorStop(1, '#e8808e'); c.fillStyle = g; c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, TAU); c.fill(); };
  bean(-10, -790, 110, 80); bean(-170, -930, 50, 60); bean(-60, -990, 50, 62); bean(60, -990, 50, 62); bean(165, -930, 50, 60);
  D.pawBeans = [[-10, -790], [-170, -930], [-60, -990], [60, -990], [165, -930]];
  return v;
}
function stoneHouse(c, t) {
  sky(c, [[0, '#2a1846'], [.5, '#b0506a'], [.8, '#f4a060'], [.95, '#ffd08a']], -300, 1300);
  glow(c, 760, 1150, 500, '255,190,110', .7); c.fillStyle = '#ffe0a0'; c.beginPath(); c.arc(760, 1150, 110, 0, TAU); c.fill();
  hills(c, 1200, 30, '#6a3a4a', 7);
  // casa de adobe
  const hx = 60, hy = 700;
  furFill(c, rectPts(hx, hy, 700, 640, 10), { grad: [[0, '#d8a06a'], [1, '#a8703f']], cols: ['#e8b880', '#8a5a30', '#c48a52'], alpha: [.12, .35], len: [8, 22], density: 10, spread: 3, seed: 4, shade: .3, light: [.6, .3, .3] });
  c.strokeStyle = 'rgba(110,60,30,.35)'; c.lineWidth = 3; for (let y = hy + 60; y < hy + 640; y += 70) { c.beginPath(); c.moveTo(hx, y); c.lineTo(hx + 700, y + 4); c.stroke(); for (let x = hx + ((y / 70) % 2) * 60; x < hx + 700; x += 120) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 70); c.stroke(); } }
  c.fillStyle = '#4a2c18'; for (let k = 0; k < 6; k++) { rrect(c, hx - 30 + k * 140, hy - 30, 36, 60, 10); c.fill(); }
  c.fillStyle = '#7a5a3a'; c.fillRect(hx - 40, hy - 20, 790, 34);
  c.fillStyle = '#2a1408'; c.beginPath(); c.moveTo(hx + 420, hy + 640); c.lineTo(hx + 420, hy + 360); c.quadraticCurveTo(hx + 500, hy + 290, hx + 580, hy + 360); c.lineTo(hx + 580, hy + 640); c.fill();
  glow(c, hx + 500, hy + 500, 160, '255,170,90', .5);
  // repisa de piedra
  c.fillStyle = vgrad(c, 1320, 1420, [[0, '#b8a090'], [1, '#7a6a5a']]); rrect(c, 20, 1320, 820, 90, 14); c.fill(); c.fillStyle = 'rgba(255,240,220,.3)'; c.fillRect(30, 1322, 800, 8);
  c.fillStyle = vgrad(c, 1410, 2100, [[0, '#c8a070'], [1, '#8a6a40']]); c.fillRect(-300, 1410, W + 600, 900);
}
function drawPot(c, x, y, rot = 0) { c.save(); c.translate(x, y); c.rotate(rot);
  c.fillStyle = vgrad(c, -260, 0, [[0, '#d9784a'], [1, '#8a3a1e']]); c.beginPath(); c.moveTo(-40, -260); c.lineTo(40, -260); c.quadraticCurveTo(40, -220, 90, -170); c.quadraticCurveTo(130, -80, 60, 0); c.lineTo(-60, 0); c.quadraticCurveTo(-130, -80, -90, -170); c.quadraticCurveTo(-40, -220, -40, -260); c.fill();
  c.strokeStyle = '#3a1608'; c.lineWidth = 6; c.beginPath(); c.moveTo(-95, -140); c.lineTo(95, -140); c.moveTo(-100, -110); c.lineTo(100, -110); c.stroke();
  c.fillStyle = '#3a1608'; for (let k = -3; k <= 3; k++) { c.beginPath(); c.moveTo(k * 26 - 10, -110); c.lineTo(k * 26, -90); c.lineTo(k * 26 + 10, -110); c.fill(); }
  c.fillStyle = 'rgba(255,220,180,.3)'; c.beginPath(); c.ellipse(-50, -150, 14, 50, .2, 0, TAU); c.fill(); c.restore(); }
function bedroom(c, t, dark = 1) {
  c.fillStyle = vgrad(c, -300, 1500, [[0, '#1a1c3a'], [1, '#2a2a4a']]); c.fillRect(-400, -400, W + 800, H + 800);
  c.fillStyle = '#12142a'; rrect(c, 600, 380, 380, 440, 12); c.fill(); c.fillStyle = vgrad(c, 400, 800, [[0, '#0a1430'], [1, '#2a3a6a']]); c.fillRect(620, 400, 340, 400);
  c.fillStyle = '#eef2ff'; c.beginPath(); c.arc(860, 500, 40, 0, TAU); c.fill(); glow(c, 860, 500, 140, '200,215,255', .5); stars(c, t, 0, 1);
  for (let i = 0; i < 12; i++) { c.fillStyle = 'rgba(255,255,255,.8)'; c.beginPath(); c.arc(630 + hash(i) * 320, 410 + hash(i * 2) * 380, 2, 0, TAU); c.fill(); }
  c.fillStyle = '#12142a'; c.fillRect(782, 400, 16, 400); c.fillRect(620, 594, 340, 14);
  c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = .12; c.fillStyle = '#9fb8ff'; c.beginPath(); c.moveTo(620, 400); c.lineTo(960, 400); c.lineTo(700, 1700); c.lineTo(200, 1700); c.fill(); c.restore();
  c.fillStyle = vgrad(c, 1450, 2000, [[0, '#3a2a3a'], [1, '#1a1220']]); c.fillRect(-300, 1450, W + 600, 900);
}
async function buildExtra4() {
  D.wood = makeWood(1400, 160, ['#b07a46', '#7a4a24'], 5);
  D.paw = buildPaw();
}
const _be3 = buildExtra; buildExtra = async () => { await _be3(); await buildExtra4(); };
