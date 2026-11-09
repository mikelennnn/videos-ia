// ---------- La Mansión VIP en el estilo clásico (texturas pintadas, atardecer cálido) ----------
const MV = {};
const XC = ['#ff4d5e', '#ffd166', '#4cd97b', '#4cc9f0', '#ff9f43', '#c77dff'];
const FUR = (g0, g1, cols, seed, o = {}) => ({ grad: [[0, g0], [1, g1]], cols, alpha: [.2, .55], len: [10, 26], density: 14, angle: 1.57, spread: .5, seed, shade: .28, light: [.4, .12, .3], ...o });

function buildHouse() {
  const v = mk(1600, 1100), c = v.getContext('2d'); c.translate(800, 1000);
  const wall = (x, y, w, h, s) => { furFill(c, rectPts(x, y, w, h, 6), FUR('#fbe6cc', '#e2b994', ['#fff3e2', '#d8a880', '#f0cfac'], s, { alpha: [.08, .25], len: [20, 50], density: 8, angle: 0, spread: .1, rim: 'rgba(255,230,190,.6)', rimW: 4, rimA: .5 })); c.fillStyle = 'rgba(120,60,40,.12)'; c.fillRect(x + w - 34, y, 34, h); };
  const roof = (x, y, w, s) => { furFill(c, [[x - 40, y + 10], [x + w + 40, y + 10], [x + w - 20, y - 70], [x + 20, y - 70]], FUR('#d8664a', '#9a3a2a', ['#f08a6a', '#7a2a1a', '#c85a3a'], s, { angle: 0, spread: .05, len: [16, 30], density: 12 })); c.strokeStyle = 'rgba(90,30,20,.35)'; c.lineWidth = 3; for (let yy = y - 55; yy < y + 10; yy += 18) { c.beginPath(); c.moveTo(x - 20, yy); c.lineTo(x + w + 20, yy); c.stroke(); } };
  const win = (x, y, w, h) => { c.fillStyle = '#7a4a32'; rrect(c, x - 10, y - 10, w + 20, h + 20, 8); c.fill(); const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#fff2c0'); g.addColorStop(1, '#ffa45a'); c.fillStyle = g; c.fillRect(x, y, w, h); c.fillStyle = '#7a4a32'; c.fillRect(x + w / 2 - 4, y, 8, h); c.fillRect(x, y + h * .45, w, 8); c.fillStyle = 'rgba(255,255,255,.25)'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + w * .45, y); c.lineTo(x, y + h * .6); c.fill(); };
  wall(-720, -540, 600, 540, 11); wall(-140, -800, 720, 800, 12); wall(560, -440, 440, 440, 13);
  roof(-720, -540, 600, 21); roof(-140, -800, 720, 22); roof(560, -440, 440, 23);
  [[-680, -470], [-500, -470], [-320, -470], [-680, -250], [-320, -250]].forEach(([x, y]) => win(x, y, 120, 150));
  [[-90, -730], [90, -730], [270, -730], [450, -730], [-90, -470], [450, -470]].forEach(([x, y]) => win(x, y, 110, 170));
  [[610, -380], [800, -380]].forEach(([x, y]) => win(x, y, 140, 150));
  // puerta doble
  woodFill(c, rectPts(90, -330, 260, 330, 10), ['#a8703f', '#6e4322'], 31); c.strokeStyle = '#4a2a14'; c.lineWidth = 6; c.beginPath(); c.moveTo(220, -330); c.lineTo(220, 0); c.stroke(); c.fillStyle = '#ffd84a'; [200, 240].forEach(x => { c.beginPath(); c.arc(x, -160, 9, 0, TAU); c.fill(); });
  // balcón
  c.fillStyle = '#f6efe6'; c.fillRect(-120, -400, 680, 26); c.strokeStyle = '#e8dccc'; c.lineWidth = 8; for (let x = -100; x < 560; x += 40) { c.beginPath(); c.moveTo(x, -374); c.lineTo(x, -320); c.stroke(); } c.fillRect(-120, -326, 680, 12);
  c.fillStyle = '#e6d6c2'; c.fillRect(-780, -12, 1820, 26);
  return v; }

function buildPalm(seed) {
  const v = mk(760, 900), c = v.getContext('2d'); c.translate(380, 880);
  const trunk = tubePts(bez([0, 0], [40, -330], [-10, -620], 18), 34, 22);
  furFill(c, trunk, FUR('#a87a52', '#5a3a22', ['#c89a6a', '#3a2412', '#8a6040'], seed, { angle: 0, spread: .15, len: [14, 30], density: 12 }));
  c.strokeStyle = 'rgba(60,34,16,.5)'; c.lineWidth = 5; for (let k = 1; k < 18; k++) { const u = k / 18, y = -620 * u, x = 40 * Math.sin(u * 2.4) * (1 - u * .6) - 10 * u; c.beginPath(); c.moveTo(x - 24, y); c.quadraticCurveTo(x, y + 10, x + 24, y); c.stroke(); }
  c.translate(-10, -620);
  for (let k = 0; k < 9; k++) { const a = -Math.PI - .15 + k / 8 * (Math.PI + .3); c.save(); c.rotate(a); const L = 280 + (k % 3) * 30;
    furFill(c, [[0, -10], [L * .5, -40], [L, 30], [L * .55, 10], [0, 16]], FUR(k % 2 ? '#7ac85a' : '#5aa848', '#2a6a2a', ['#a8e07a', '#1e4a1e', '#6ab84a'], seed + k, { angle: .1, spread: .3, len: [10, 20], density: 20, fringe: ['#8ad06a', '#3a8a3a', '#c8f09a'], fringeLen: 14 }));
    c.restore(); }
  for (let k = 0; k < 3; k++) { c.fillStyle = '#6a4422'; c.beginPath(); c.arc(-20 + k * 22, 18, 16, 0, TAU); c.fill(); }
  return v; }

function buildBush(seed, w = 420, h = 220, cols = ['#6ab84a', '#2a6a2a']) {
  const v = mk(w + 80, h + 80), c = v.getContext('2d');
  furFill(c, ellipsePts(w / 2 + 40, h / 2 + 50, w / 2, h / 2, 26, 0, .18, seed), FUR(cols[0], cols[1], ['#a8e07a', '#1e4a1e', '#7ac85a'], seed, { spread: 3, len: [8, 18], density: 22, fringe: ['#8ad06a', '#3a8a3a', '#c8f09a'], fringeLen: 16 }));
  for (let k = 0; k < 7; k++) { c.fillStyle = ['#ff7ab0', '#ffd84a', '#ffffff'][k % 3]; c.beginPath(); c.arc(60 + hash(k + seed) * (w - 40), 60 + hash(k * 3 + seed) * h * .6, 9, 0, TAU); c.fill(); }
  return v; }

function buildSofa() {
  const v = mk(1100, 520), c = v.getContext('2d');
  const fab = s => FUR('#c87ae8', '#6a2a9a', ['#e0a8ff', '#4a1a7a', '#a85ad8'], s, { angle: 0, spread: 1.5, len: [6, 12], density: 30, rim: 'rgba(255,220,255,.5)', rimW: 4, rimA: .5 });
  furFill(c, rectPts(70, 30, 960, 280, 70), fab(41));
  furFill(c, rectPts(20, 230, 1060, 200, 60), fab(42));
  [[10, 150], [930, 150]].forEach(([x, y], i) => furFill(c, rectPts(x, y, 160, 300, 70), fab(43 + i)));
  c.strokeStyle = 'rgba(60,10,90,.35)'; c.lineWidth = 5; [380, 720].forEach(x => { c.beginPath(); c.moveTo(x, 60); c.lineTo(x, 290); c.stroke(); c.beginPath(); c.moveTo(x, 250); c.lineTo(x, 420); c.stroke(); });
  [[300, 100, '#ffd166'], [800, 100, '#4cc9f0']].forEach(([x, y, col], i) => furFill(c, ellipsePts(x, y + 60, 90, 70, 18, .2, .1, 50 + i), FUR(col, '#6a3a2a', ['#ffffff', col], 50 + i, { spread: 2, len: [5, 10], density: 24 })));
  c.fillStyle = '#4a2a14'; [[90, 430], [990, 430]].forEach(([x, y]) => c.fillRect(x - 14, y, 28, 50));
  return v; }

async function buildExtra11b() { buildFamOld(); MV.house = buildHouse(); MV.palm = [buildPalm(61), buildPalm(67)]; MV.bush = [buildBush(71), buildBush(73, 360, 200, ['#5aa848', '#24582a'])]; MV.sofa = buildSofa(); MV.deck = makeWood(1500, 640, ['#d8a066', '#8a5a32'], 91); }
const _be4 = buildExtra; buildExtra = async () => { await _be4(); await buildExtra11b(); };

function stringLights(c, t, y, x0 = -100, x1 = W + 100, sag = 90) { c.strokeStyle = '#3a2a2a'; c.lineWidth = 4; c.beginPath(); for (let x = x0; x <= x1; x += 20) { const u = (x - x0) / (x1 - x0); c.lineTo(x, y + Math.sin(u * Math.PI) * sag); } c.stroke();
  for (let k = 0; k <= 16; k++) { const u = k / 16, x = lerp(x0, x1, u), yy = y + Math.sin(u * Math.PI) * sag + 16, col = ['255,210,120', '255,140,200', '140,220,255'][k % 3], fl = .7 + .3 * Math.sin(t * 4 + k * 1.7);
    glow(c, x, yy, 40, col, .55 * fl); c.fillStyle = `rgb(${col})`; c.beginPath(); c.arc(x, yy, 10, 0, TAU); c.fill(); } }

function palmSway(c, img, x, y, s, t, ph) { c.save(); c.translate(x, y); c.rotate(Math.sin(t * 1.1 + ph) * .015); c.scale(s, s); c.drawImage(img, -380, -880); c.restore(); }

function mansionDusk(c, t, o = {}) {
  sky(c, [[0, '#2a1a4a'], [.4, '#7a3a6a'], [.72, '#e8745a'], [.9, '#ffc27a']], -300, 1300);
  stars(c, t, 40, 5, 520, .6);
  glow(c, 820, 900, 520, '255,180,110', .7); c.fillStyle = '#ffe0a0'; c.beginPath(); c.arc(820, 900, 110, 0, TAU); c.fill();
  c.drawImage(A.cloudW[0], -120, 300, 520, 240); c.drawImage(A.cloudW[1], 640, 520, 460, 210);
  hills(c, 1140, 50, '#7a3a5a', 3); hills(c, 1220, 40, '#5a2a4a', 7);
  c.drawImage(MV.house, -260, 300, 1600, 1100);
  // letrero
  c.save(); c.translate(540, 600); c.rotate(-.02); c.font = '900 82px Nunito'; const w = c.measureText('MANSIÓN VIP').width + 80; c.fillStyle = '#5a2a1a'; rrect(c, -w / 2 - 10, -66, w + 20, 132, 30); c.fill(); woodFill(c, rectPts(-w / 2, -56, w, 112, 26), ['#c8904a', '#8a5a2a'], 81);
  c.fillStyle = '#fff3d0'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 10; c.strokeStyle = '#5a2a1a'; c.strokeText(o.title ?? 'MANSIÓN VIP', 0, 6); c.fillText(o.title ?? 'MANSIÓN VIP', 0, 6); c.restore();
  palmSway(c, MV.palm[0], 40, 1460, 1.05, t, 0); palmSway(c, MV.palm[1], 1060, 1440, .95, t, 2);
  // pasto + alberca
  grassLayer(c, A.grassDusk, 1300);
  c.drawImage(MV.bush[0], -140, 1250, 460, 260); c.drawImage(MV.bush[1], 820, 1270, 400, 240);
  if (o.deck) { c.drawImage(MV.deck, -210, 1440); c.strokeStyle = 'rgba(70,35,15,.45)'; c.lineWidth = 4; for (let y = 1500; y < 2100; y += 70) { c.beginPath(); c.moveTo(-210, y); c.lineTo(1300, y); c.stroke(); } c.fillStyle = 'rgba(255,150,90,.18)'; c.fillRect(-210, 1440, 1500, 640); }
  else { c.fillStyle = '#f2e2cc'; rrect(c, 60, 1500, 960, 200, 40); c.fill(); const pg = c.createLinearGradient(0, 1520, 0, 1680); pg.addColorStop(0, '#5ae0f0'); pg.addColorStop(1, '#1a8ac8'); c.fillStyle = pg; rrect(c, 90, 1522, 900, 156, 30); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 4; for (let k = 0; k < 14; k++) { c.beginPath(); const y0 = 1540 + (k % 5) * 28, x0 = 110 + (k * 131) % 820; for (let q = 0; q < 6; q++) c.lineTo(x0 + q * 14, y0 + Math.sin(q + t * 2 + k) * 5); c.stroke(); } }
  stringLights(c, t, 1180);
  motes(c, t, { n: 24, seed: 9, size: 9, a: .35 });
}

function interior(c, t) {
  room(c, t, { wall0: '#f0c8d8', wall1: '#d89ab8', sky: [[0, '#4a2a6a'], [1, '#f08a6a']], sun: false, sunbeam: false });
  // cámara de seguridad
  [[70, 140], [1010, 140]].forEach(([x, y], i) => { c.save(); c.translate(x, y); c.rotate(i ? -.5 : .5); c.fillStyle = '#f2f0ec'; rrect(c, -54, -26, 108, 52, 12); c.fill(); c.strokeStyle = '#8a8a90'; c.lineWidth = 3; c.stroke(); c.fillStyle = '#1a1a22'; c.beginPath(); c.arc(i ? -58 : 58, 0, 20, 0, TAU); c.fill(); c.restore(); const on = Math.sin(t * 4) > 0; c.fillStyle = on ? '#ff2a3a' : '#5a1a1a'; c.beginPath(); c.arc(x + (i ? 30 : -30), y - 34, 9, 0, TAU); c.fill(); if (on) glow(c, x + (i ? 30 : -30), y - 34, 40, '255,40,60', .8); });
  c.drawImage(MV.sofa, -10, 1080, 1100, 520);
  c.fillStyle = 'rgba(255,170,210,.35)'; c.beginPath(); c.ellipse(540, 1760, 440, 70, 0, 0, TAU); c.fill();
  stringLights(c, t, 60, -100, W + 100, 70);
  motes(c, t, { n: 14, seed: 3, size: 8, a: .25 });
}

function phoneChat(c, x, y, s, t, t0, msgs) { c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(0,0,0,.25)'; rrect(c, -220, -420, 460, 880, 60); c.fill();
  c.fillStyle = '#2a2a34'; rrect(c, -230, -440, 460, 880, 60); c.fill(); c.strokeStyle = '#4a4a58'; c.lineWidth = 6; c.stroke();
  c.fillStyle = '#fff8f0'; rrect(c, -205, -412, 410, 824, 44); c.fill();
  c.fillStyle = '#e8344a'; rrect(c, -180, -380, 130, 42, 12); c.fill(); c.fillStyle = '#fff'; c.font = '900 26px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('EN VIVO', -115, -358);
  c.fillStyle = '#6a5a5a'; c.font = '800 24px Nunito'; c.textAlign = 'left'; c.fillText('Chat en vivo', -30, -358);
  c.save(); c.beginPath(); c.rect(-200, -320, 400, 720); c.clip();
  const shown = msgs.filter(m => t > t0 + m.at), lineH = 104; let yy = 380 - shown.length * lineH;
  shown.forEach((m, i) => { const a = eOut((t - t0 - m.at) / .3); c.save(); c.globalAlpha = a; c.translate(0, yy + i * lineH + (1 - a) * 40);
    if (m.paid) { c.fillStyle = m.col || '#ffb020'; rrect(c, -190, -8, 380, 92, 22); c.fill(); c.fillStyle = 'rgba(0,0,0,.14)'; rrect(c, -190, -8, 380, 40, 22); c.fill(); c.fillStyle = '#2a1a0a'; c.font = '900 26px Nunito'; c.fillText(m.user + '  ' + m.amount, -170, 14); c.font = '800 26px Nunito'; c.fillText(m.text, -170, 58); }
    else { c.fillStyle = XC[i % 6]; c.beginPath(); c.arc(-170, 24, 20, 0, TAU); c.fill(); c.fillStyle = '#8a7a7a'; c.font = '800 24px Nunito'; c.fillText(m.user, -140, 12); c.fillStyle = '#2a2026'; c.font = '800 26px Nunito'; c.fillText(m.text, -140, 46); }
    c.restore(); });
  c.restore(); c.restore(); }
