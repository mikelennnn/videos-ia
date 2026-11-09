// ---------- assets: La Mansión VIP ----------
// Caricaturas genéricas y respetuosas: solo rasgos generales + etiqueta con su nombre.
const S1 = ['#ffdcc4', '#e0a682'], S2 = ['#f0c098', '#c48458'], S3 = ['#d8a07a', '#a06a44'], S4 = ['#b8805a', '#7a4a2c'];
const FAM = {
  'Doña Alegría': { skin: S1, hair: ['#e8d0a8', '#b8946a'], hairStyle: 'short', coat: ['#ff7aa8', '#c83a6a'], glasses: true, room: 'Barullo' },
  'Karely Ruiz': { skin: S2, hair: ['#3a2416', '#1a0e08'], hairStyle: 'long', coat: ['#ff4a6a', '#a81a3a'], lashes: true, room: 'Barullo' },
  'Paolita Suárez': { skin: S2, hair: ['#f2d08a', '#b88a3a'], hairStyle: 'long', coat: ['#ffd84a', '#c8902a'], lashes: true, room: 'Barullo' },
  'Rod Contreras': { skin: S2, hair: ['#2a1a10', '#120a04'], hairStyle: 'short', coat: ['#3a3a48', '#16161e'], stubble: true, room: 'Barullo' },
  'Abel Robles': { skin: S3, hair: ['#2a1a10', '#120a04'], hairStyle: 'short', coat: ['#4a8ad8', '#1e4a90'], stubble: true, room: 'Barullo' },
  'Dani Flow': { skin: S3, hair: ['#1a1008', '#0a0604'], hairStyle: 'short', coat: ['#1a1a20', '#000000'], glasses: true, room: 'Barullo' },
  'Edwin Mendoza': { skin: S2, hair: ['#4a2c18', '#2a160a'], hairStyle: 'short', coat: ['#2ab07a', '#14603e'], room: 'Barullo' },
  'Odette Orlena': { skin: S1, hair: ['#8a2a3a', '#4a0a18'], hairStyle: 'long', coat: ['#b05ad8', '#6a2a98'], lashes: true, room: 'Barullo' },
  'Bellakath': { skin: S2, hair: ['#f4e6c8', '#c8b088'], hairStyle: 'long', coat: ['#ff5ab0', '#b0206a'], lashes: true, room: 'Ruletix' },
  'Cintia Cossio': { skin: S2, hair: ['#5a3420', '#2a160a'], hairStyle: 'long', coat: ['#f4f2ee', '#b8b0a8'], lashes: true, room: 'Ruletix' },
  'Itatí López': { skin: S1, hair: ['#6a4428', '#3a2414'], hairStyle: 'long', coat: ['#3ac8c8', '#1a7a80'], lashes: true, room: 'Ruletix' },
  'JLexis': { skin: S3, hair: ['#1a1008', '#0a0604'], hairStyle: 'short', coat: ['#ff8a2a', '#b0500a'], room: 'Ruletix' },
  'Jorjais': { skin: S4, hair: ['#1a1008', '#0a0604'], hairStyle: 'short', coat: ['#ffd84a', '#c89a2a'], room: 'Ruletix' },
  'João Ferreira': { skin: S1, hair: ['#2a1a10', '#120a04'], hairStyle: 'short', coat: ['#e8e8f0', '#9aa0b0'], stubble: true, room: 'Ruletix' },
  'La Cukis': { skin: S2, hair: ['#2a1a10', '#120a04'], hairStyle: 'long', coat: ['#8a5ae8', '#4a2a98'], lashes: true, room: 'Ruletix' },
  'Tony Aguirre': { skin: S2, hair: ['#3a2416', '#1a0e08'], hairStyle: 'short', coat: ['#c8302e', '#7a1414'], glasses: true, room: 'Ruletix' },
};
const FAM_NAMES = Object.keys(FAM);
function famoso(c, name, x, y, s, o = {}) { const f = FAM[name]; drawPerson(c, x, y, s, { ...f, iris: f.iris || ['#a8784a', '#4a2a10'], glove: f.skin[0], gloveD: f.skin[1], cuff: f.coat[0], pants: o.pants || ['#2a2a38', '#14141c'], boots: ['#2a2a30', '#0a0a10'], ...o });
  if (o.tag !== false) nameTag(c, name, x, y - (1180 + 60) * s - (o.tagUp || 0), o.tagS || Math.max(.42, s * 1.1), o.tagCol); }
function nameTag(c, name, x, y, s = 1, col) { c.save(); c.translate(x, y); c.scale(s, s); c.font = '800 40px Nunito'; const w = c.measureText(name).width + 40; c.shadowColor = 'rgba(0,0,0,.35)'; c.shadowBlur = 12; rrect(c, -w / 2, -28, w, 56, 28); c.fillStyle = '#ffffff'; c.fill(); c.shadowBlur = 0; c.strokeStyle = col || '#2a2a34'; c.lineWidth = 3; c.stroke(); c.fillStyle = '#1a1a22'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(name, 0, 2); c.restore(); }
// mansión de noche
function buildMansion() {
  const v = mk(1600, 1100), c = v.getContext('2d'); c.translate(800, 1000);
  const box = (x, y, w, h, light) => { c.fillStyle = vgrad(c, y, y + h, [[0, '#f4f0ea'], [1, '#c8c0b8']]); c.fillRect(x, y, w, h); c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(x + w - 30, y, 30, h); c.fillStyle = '#2a2430'; c.fillRect(x - 10, y - 18, w + 20, 22); };
  box(-700, -560, 600, 560); box(-120, -820, 700, 820); box(560, -460, 420, 460);
  [[-660, -500, 520, 200], [-80, -760, 620, 260], [-80, -460, 620, 300], [600, -400, 340, 220]].forEach(([x, y, w, h]) => { const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#ffe0a0'); g.addColorStop(1, '#ff9a5a'); c.fillStyle = g; c.fillRect(x, y, w, h); c.fillStyle = 'rgba(60,30,20,.5)'; for (let k = 1; k < 4; k++) c.fillRect(x + w * k / 4 - 3, y, 6, h);
    c.fillStyle = 'rgba(80,40,60,.45)'; for (let k = 0; k < 3; k++) { const px = x + 60 + k * (w / 3), py = y + h - 10; c.beginPath(); c.arc(px, py - 70, 18, 0, TAU); c.fill(); rrect(c, px - 22, py - 52, 44, 52, 16); c.fill(); } });
  c.fillStyle = '#f4f0ea'; c.fillRect(-760, -10, 1720, 30);
  return v; }
function palm(c, x, y, s, t) { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = '#3a2a1e'; c.lineWidth = 26; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(30, -260, -10, -520); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.08)'; c.lineWidth = 6; for (let k = 1; k < 12; k++) { const y = -k * 43; c.beginPath(); c.moveTo(-12 + k, y); c.lineTo(12 + k, y - 6); c.stroke(); }
  c.translate(-10, -520); for (let k = 0; k < 9; k++) { const a = -Math.PI + k / 8 * Math.PI + Math.sin(t * 1.2 + k) * .04; c.save(); c.rotate(a); c.fillStyle = k % 2 ? '#1a3a2a' : '#24503a'; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(140, -40, 260, 40); c.quadraticCurveTo(140, 10, 0, 14); c.fill(); c.restore(); } c.restore(); }
function mansionNight(c, t, o = {}) {
  sky(c, [[0, '#0a0620'], [.5, '#2a1450'], [.85, '#6a2a6a']], -300, 1300); stars(c, t, 80, 5, 800, .8);
  glow(c, 820, 360, 260, '220,200,255', .5); c.fillStyle = '#f2eefc'; c.beginPath(); c.arc(820, 360, 50, 0, TAU); c.fill();
  c.save(); c.globalCompositeOperation = 'lighter'; [[-80, .35], [1160, -.35]].forEach(([bx, ph], i) => { const a = -Math.PI / 2 + Math.sin(t * .8 + i * 2) * .4 + ph; c.save(); c.translate(bx, 1300); c.rotate(a); const g = c.createLinearGradient(0, 0, 1500, 0); g.addColorStop(0, 'rgba(255,220,255,.22)'); g.addColorStop(1, 'rgba(255,220,255,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(0, 0); c.lineTo(1600, -160); c.lineTo(1600, 160); c.fill(); c.restore(); }); c.restore();
  c.drawImage(MV.mansion, -260, 420, 1600, 1100);
  glow(c, 540, 1150, 600, '255,170,110', .35);
  // letrero
  c.save(); c.translate(540, 930); c.font = '900 84px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.shadowColor = '#ff4fd8'; c.shadowBlur = 30; c.fillStyle = '#ffd0f4'; c.fillText(o.title ?? 'MANSIÓN VIP', 0, 0); c.restore();
  // alberca
  c.fillStyle = '#e8e0d8'; c.fillRect(-300, 1420, W + 600, 80); const pg = c.createLinearGradient(0, 1500, 0, 1800); pg.addColorStop(0, '#3ad8f0'); pg.addColorStop(1, '#0a6ab0'); c.fillStyle = pg; c.fillRect(-300, 1500, W + 600, 320);
  c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = 'rgba(200,255,255,.35)'; c.lineWidth = 3; for (let k = 0; k < 26; k++) { c.beginPath(); const y0 = 1520 + (k % 6) * 50; const x0 = (k * 97) % 1300 - 100; for (let q = 0; q < 8; q++) c.lineTo(x0 + q * 18, y0 + Math.sin(q + t * 2 + k) * 8); c.stroke(); } c.restore();
  glow(c, 540, 1650, 500, '120,230,255', .3);
  c.fillStyle = vgrad(c, 1820, 2200, [[0, '#d8d0c8'], [1, '#8a8078']]); c.fillRect(-300, 1820, W + 600, 500);
  palm(c, 40, 1460, 1.0, t); palm(c, 1060, 1480, .9, t + 1);
  // foquitos
  for (let i = 0; i <= 16; i++) { const u = i / 16, x = lerp(-60, 1140, u), y = 760 + Math.sin(u * Math.PI) * 120, on = .6 + .4 * Math.sin(t * 5 + i); c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = on; c.drawImage(A.dotWarm, x - 34, y - 26, 68, 68); c.restore(); c.fillStyle = '#ffe0a0'; c.beginPath(); c.arc(x, y + 8, 7, 0, TAU); c.fill(); }
}
function livingRoom(c, t) {
  c.fillStyle = vgrad(c, -300, 1500, [[0, '#2a1a3a'], [1, '#4a2a5a']]); c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createLinearGradient(0, 300, 0, 460); g.addColorStop(0, 'rgba(255,80,220,0)'); g.addColorStop(.5, 'rgba(255,80,220,.6)'); g.addColorStop(1, 'rgba(255,80,220,0)'); c.fillStyle = g; c.fillRect(-300, 300, W + 600, 160); c.restore();
  for (let x = -300; x < W + 300; x += 180) { c.fillStyle = 'rgba(255,255,255,.04)'; c.fillRect(x, -300, 90, 1800); }
  // cuadro y planta
  c.fillStyle = '#c8a050'; rrect(c, 380, 520, 320, 220, 10); c.fill(); c.fillStyle = vgrad(c, 530, 730, [[0, '#ff7ab0'], [1, '#5a3aa8']]); c.fillRect(395, 535, 290, 190);
  // cámaras
  [[60, 120], [1020, 120]].forEach(([x, y], i) => { c.save(); c.translate(x, y); c.rotate(i ? -.5 : .5); c.fillStyle = '#e8e8f0'; rrect(c, -50, -24, 100, 48, 10); c.fill(); c.fillStyle = '#1a1a22'; c.beginPath(); c.arc(i ? -54 : 54, 0, 20, 0, TAU); c.fill(); c.restore(); c.fillStyle = Math.sin(t * 4) > 0 ? '#ff2a3a' : '#5a1a1a'; c.beginPath(); c.arc(x + (i ? 30 : -30), y - 30, 9, 0, TAU); c.fill(); if (Math.sin(t * 4) > 0) glow(c, x + (i ? 30 : -30), y - 30, 40, '255,40,60', .8); });
  // sofá
  c.fillStyle = vgrad(c, 1200, 1520, [[0, '#8a4ad8'], [1, '#4a1a8a']]); rrect(c, 40, 1180, 1000, 260, 60); c.fill(); c.fillStyle = vgrad(c, 1380, 1560, [[0, '#a05ae8'], [1, '#5a2a9a']]); rrect(c, 0, 1380, 1080, 180, 50); c.fill(); c.fillStyle = 'rgba(255,255,255,.12)'; rrect(c, 60, 1394, 960, 20, 10); c.fill();
  c.fillStyle = vgrad(c, 1560, 2200, [[0, '#8a5a3a'], [1, '#4a2a18']]); c.fillRect(-300, 1560, W + 600, 700); c.strokeStyle = 'rgba(0,0,0,.18)'; c.lineWidth = 3; for (let x = -600; x < 1700; x += 120) { c.beginPath(); c.moveTo(540 + (x - 540) * .8, 1560); c.lineTo(540 + (x - 540) * 1.6, 2100); c.stroke(); }
  c.fillStyle = 'rgba(255,120,220,.25)'; c.beginPath(); c.ellipse(540, 1780, 420, 70, 0, 0, TAU); c.fill();
}
// celular con chat en vivo
function phoneChat(c, x, y, s, t, t0, msgs) { c.save(); c.translate(x, y); c.scale(s, s);
  c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 40; c.fillStyle = '#121218'; rrect(c, -230, -440, 460, 880, 60); c.fill(); c.shadowBlur = 0;
  c.fillStyle = vgrad(c, -410, 410, [[0, '#1e1e2a'], [1, '#14141c']]); rrect(c, -210, -415, 420, 830, 44); c.fill();
  c.fillStyle = '#e8344a'; rrect(c, -180, -380, 120, 40, 10); c.fill(); c.fillStyle = '#fff'; c.font = '900 26px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('EN VIVO', -120, -359);
  c.fillStyle = 'rgba(255,255,255,.6)'; c.font = '800 24px Nunito'; c.textAlign = 'left'; c.fillText('Chat en vivo', -40, -359);
  c.save(); c.beginPath(); c.rect(-200, -320, 400, 720); c.clip();
  const shown = msgs.filter(m => t > t0 + m.at); const lineH = 104; let yy = 380 - shown.length * lineH;
  shown.forEach((m, i) => { const a = eOut((t - t0 - m.at) / .3); c.save(); c.globalAlpha = a; c.translate(0, yy + i * lineH + (1 - a) * 40);
    if (m.paid) { c.fillStyle = m.col || '#ffb020'; rrect(c, -190, -8, 380, 92, 20); c.fill(); c.fillStyle = 'rgba(0,0,0,.18)'; rrect(c, -190, -8, 380, 40, 20); c.fill(); c.fillStyle = '#1a1a1a'; c.font = '900 26px Nunito'; c.fillText(m.user + '  ' + m.amount, -170, 14); c.font = '800 26px Nunito'; c.fillText(m.text, -170, 58); }
    else { c.fillStyle = XC[i % 6]; c.beginPath(); c.arc(-170, 24, 20, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.55)'; c.font = '800 24px Nunito'; c.fillText(m.user, -140, 12); c.fillStyle = '#fff'; c.font = '800 26px Nunito'; c.fillText(m.text, -140, 46); }
    c.restore(); });
  c.restore(); c.restore(); }
const XC = ['#ff4d5e', '#ffd166', '#4cd97b', '#4cc9f0', '#ff9f43', '#c77dff'];
const MV = {};
function drawStar(c, x, y, R, col = '#ffd84a', pts = 5) { c.beginPath(); for (let k = 0; k < pts * 2; k++) { const rr = k % 2 ? R * .45 : R, a = -Math.PI / 2 + k * Math.PI / pts; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); c.fillStyle = col; c.fill(); }
