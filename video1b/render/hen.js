// ---------- Gallina en alta calidad ----------
const HEN = {};
function featherShape(c, len, wid, col1, col2, edge) { // pluma alargada apuntando a +x, base en (0,0)
  c.beginPath(); c.moveTo(0, -wid * .35); c.bezierCurveTo(len * .35, -wid, len * .85, -wid * .7, len, 0); c.bezierCurveTo(len * .85, wid * .7, len * .35, wid, 0, wid * .35); c.closePath();
  const g = c.createLinearGradient(0, 0, len, 0); g.addColorStop(0, col1); g.addColorStop(1, col2); c.fillStyle = g; c.fill();
  c.strokeStyle = edge; c.lineWidth = 2.2; c.stroke();
  c.strokeStyle = 'rgba(150,140,125,.45)'; c.lineWidth = 2; c.beginPath(); c.moveTo(4, 0); c.quadraticCurveTo(len * .5, -wid * .08, len * .93, 0); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 1.2; for (let k = 1; k < 7; k++) { const x = len * k / 7.5; c.beginPath(); c.moveTo(x, -2); c.lineTo(x + len * .06, -wid * .45 * Math.sin(k / 7.5 * Math.PI)); c.stroke(); }
}
function scallops(c, x0, y0, x1, y1, size, col, a, seed = 1) { const r = mulberry(seed); c.save(); c.strokeStyle = col; c.globalAlpha = a; c.lineWidth = 2; c.lineCap = 'round';
  for (let y = y0, row = 0; y < y1; y += size * .62, row++) for (let x = x0 + (row % 2) * size * .5; x < x1; x += size) { const jx = (r() - .5) * 4, jy = (r() - .5) * 4; c.beginPath(); c.arc(x + jx, y + jy, size * .5, .15 * Math.PI, .85 * Math.PI); c.stroke(); }
  c.restore(); }
// variante: 'white' | 'gold'
function buildHen(kind = 'white') {
  const gold = kind === 'gold';
  const C1 = gold ? '#fff2b8' : '#ffffff', C2 = gold ? '#f0c04a' : '#f3eee6', C3 = gold ? '#b88420' : '#d6cfc2', EDGE = gold ? 'rgba(120,80,10,.55)' : 'rgba(150,140,125,.5)';
  const S = 2; // súper-muestreo
  const v = mk(900 * S, 900 * S), c = v.getContext('2d'); c.scale(S, S); c.translate(430, 820);
  // --- cola (detrás)
  const tail = [[-2.05, 250, 62], [-2.25, 270, 64], [-2.45, 262, 62], [-2.65, 240, 58], [-2.85, 210, 54], [-3.0, 175, 48]];
  tail.forEach(([a, L, wd], i) => { c.save(); c.translate(-175, -360); c.rotate(a); featherShape(c, L, wd, C2, i % 2 ? C1 : C2, EDGE); c.restore(); });
  // --- muslos esponjosos
  [[10, -185], [95, -180]].forEach(([x, y]) => { const g2 = c.createRadialGradient(x - 10, y - 15, 5, x, y, 60); g2.addColorStop(0, C1); g2.addColorStop(1, C3); c.fillStyle = g2; c.beginPath(); for (let k = 0; k < 14; k++) { const a = k / 14 * TAU, rr = 40 + (k % 2) * 6; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr * .7); } c.closePath(); c.fill(); });
  // --- cuerpo
  const body = [[-175, -390], [-60, -440], [40, -460], [85, -520], [100, -590], [135, -625], [195, -620], [225, -560], [222, -470], [246, -350], [236, -250], [150, -170], [0, -146], [-145, -172], [-225, -245], [-250, -330]];
  c.save(); smoothPath(c, body); const g = c.createLinearGradient(0, -520, 0, -150); g.addColorStop(0, C1); g.addColorStop(.55, C2); g.addColorStop(1, C3); c.fillStyle = g; c.fill(); c.clip();
  const hl = c.createRadialGradient(80, -420, 10, 80, -400, 260); hl.addColorStop(0, 'rgba(255,255,255,.75)'); hl.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = hl; c.fillRect(-300, -560, 600, 420);
  scallops(c, -240, -440, 250, -150, 34, gold ? '#9a6a10' : '#a8a090', .22, 3);
  const ao = c.createLinearGradient(0, -300, 0, -140); ao.addColorStop(0, 'rgba(90,70,40,0)'); ao.addColorStop(1, gold ? 'rgba(110,60,0,.35)' : 'rgba(110,90,60,.28)'); c.fillStyle = ao; c.fillRect(-300, -300, 600, 170);
  c.restore();
  c.save(); smoothPath(c, body); c.strokeStyle = EDGE; c.lineWidth = 2.5; c.stroke(); c.restore();
  // --- plumas del cuello (hackles)
  c.save(); c.globalAlpha = .55; for (let row = 0; row < 3; row++) for (let k = 0; k < 6; k++) { const u = k / 5, x = lerp(70, 215, u) - row * 6, y = -560 + row * 45 + Math.sin(u * Math.PI) * 10; c.save(); c.translate(x, y); c.rotate(lerp(2.1, 1.35, u)); featherShape(c, 58, 20, C1, C2, 'rgba(150,140,125,.18)'); c.restore(); } c.restore();
  // --- ala en capas
  c.save(); const wing = [[60, -380], [-40, -400], [-150, -350], [-205, -285], [-160, -235], [-40, -225], [60, -270], [95, -330]];
  smoothPath(c, wing); c.fillStyle = vgrad(c, -400, -225, [[0, C2], [1, C3]]); c.fill(); c.clip(); scallops(c, -60, -395, 100, -300, 26, gold ? '#8a5a10' : '#9a9282', .35, 7); c.restore();
  [[-10, -305, 3.05, 175, 30], [-25, -285, 3.0, 170, 30], [-40, -265, 2.95, 160, 28], [-50, -248, 2.9, 145, 26]].forEach(([x, y, a, L, wd]) => { c.save(); c.translate(x, y); c.rotate(a); featherShape(c, L, wd, C2, C3, EDGE); c.restore(); });
  c.save(); smoothPath(c, wing); c.strokeStyle = EDGE; c.lineWidth = 2.5; c.stroke(); c.restore();
  HEN[kind] = { body: v };
  // --- cabeza (aparte para animar)
  const hv = mk(420 * S, 420 * S), d = hv.getContext('2d'); d.scale(S, S); d.translate(200, 230);
  const red = gold ? ['#ffe08a', '#c8902a', '#8a5a10'] : ['#ff6a5a', '#e0222c', '#9a0a14'];
  const comb = [[-60, -40], [-62, -75], [-40, -95], [-22, -72], [-8, -112], [14, -80], [34, -108], [50, -74], [72, -86], [72, -48], [40, -30]];
  d.save(); smoothPath(d, comb); d.fillStyle = vgrad(d, -112, -30, [[0, red[0]], [.6, red[1]], [1, red[2]]]); d.fill(); d.clip(); d.fillStyle = 'rgba(255,255,255,.45)'; d.beginPath(); d.ellipse(-30, -80, 14, 7, -.5, 0, TAU); d.ellipse(14, -90, 10, 5, -.3, 0, TAU); d.fill(); d.restore();
  d.save(); smoothPath(d, comb); d.strokeStyle = 'rgba(110,0,10,.5)'; d.lineWidth = 2.5; d.stroke(); d.restore();
  // cabeza
  const hg = d.createRadialGradient(-15, -25, 5, 0, 0, 80); hg.addColorStop(0, C1); hg.addColorStop(.7, C2); hg.addColorStop(1, C3); d.fillStyle = hg; d.beginPath(); d.ellipse(0, 0, 68, 62, 0, 0, TAU); d.fill(); d.strokeStyle = EDGE; d.lineWidth = 2.5; d.stroke();
  d.save(); d.beginPath(); d.ellipse(0, 0, 68, 62, 0, 0, TAU); d.clip(); scallops(d, -70, -40, 70, 60, 18, gold ? '#9a6a10' : '#b0a898', .2, 9); d.restore();
  // carúnculas
  [[52, 42, 18, 30], [70, 46, 14, 26]].forEach(([x, y, rx, ry]) => { d.save(); d.beginPath(); d.ellipse(x, y, rx, ry, -.1, 0, TAU); d.fillStyle = vgrad(d, y - ry, y + ry, [[0, red[0]], [1, red[2]]]); d.fill(); d.fillStyle = 'rgba(255,255,255,.35)'; d.beginPath(); d.ellipse(x - 5, y - 10, 5, 8, 0, 0, TAU); d.fill(); d.restore(); });
  // oreja
  d.fillStyle = gold ? '#ffe9a0' : '#f4f0ea'; d.beginPath(); d.ellipse(-22, 18, 12, 9, 0, 0, TAU); d.fill(); d.fillStyle = gold ? '#e8b440' : '#e04a4a'; d.beginPath(); d.ellipse(-22, 8, 10, 7, 0, 0, TAU); d.fill();
  // pico
  d.save(); d.translate(58, -8); d.fillStyle = vgrad(d, -18, 22, [[0, gold ? '#ffeaa0' : '#ffd36a'], [1, gold ? '#c8902a' : '#e0942a']]); d.beginPath(); d.moveTo(0, -16); d.quadraticCurveTo(40, -12, 62, 6); d.quadraticCurveTo(36, 8, 0, 6); d.fill(); d.fillStyle = gold ? '#c8902a' : '#d9822a'; d.beginPath(); d.moveTo(0, 6); d.quadraticCurveTo(30, 10, 50, 12); d.quadraticCurveTo(24, 24, 0, 18); d.fill();
  d.fillStyle = 'rgba(80,40,0,.6)'; d.beginPath(); d.ellipse(16, -6, 4, 2, 0, 0, TAU); d.fill(); d.fillStyle = 'rgba(255,255,255,.5)'; d.beginPath(); d.ellipse(18, -10, 12, 3, .1, 0, TAU); d.fill(); d.restore();
  HEN[kind].head = hv;
}
// ojo vivo (en coords de la cabeza)
function henEye(c, blink, look, mood) { const bl = blink != null ? clamp(Math.abs(blink) * 8) : 1, lk = look || [0, 0];
  c.save(); c.translate(26, -14); c.fillStyle = '#fff'; c.beginPath(); c.ellipse(0, 0, 14, 14 * Math.max(.08, bl), 0, 0, TAU); c.fill();
  if (bl > .3) { const g = c.createRadialGradient(lk[0] * 3, lk[1] * 3, 1, lk[0] * 3, lk[1] * 3, 11); g.addColorStop(0, '#f8c040'); g.addColorStop(1, '#c87a10'); c.fillStyle = g; c.beginPath(); c.arc(lk[0] * 3, lk[1] * 3, 10.5, 0, TAU); c.fill(); c.fillStyle = '#120a04'; c.beginPath(); c.arc(lk[0] * 4, lk[1] * 4, mood === 'scared' ? 4 : 6, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(lk[0] * 3 + 4, lk[1] * 3 - 4, 3.2, 0, TAU); c.fill(); }
  c.strokeStyle = 'rgba(90,60,30,.8)'; c.lineWidth = 2.5; c.beginPath(); c.ellipse(0, 0, 14, 14 * Math.max(.08, bl), 0, Math.PI * 1.05, Math.PI * 1.95); c.stroke(); c.restore(); }
function henLegs(c, ph, gold) { const L = gold ? ['#e8c060', '#9a6a14'] : ['#f6b13e', '#b06a12'];
  const la = ph === null ? [0, 0] : [Math.sin(ph) * .4, -Math.sin(ph) * .4];
  [[15, -170, la[0]], [90, -168, la[1]]].forEach(([hx, hy, a]) => { const ax = hx + Math.sin(-a) * 150, ay = hy + Math.cos(a) * 150, lift = ph === null ? 0 : Math.max(0, Math.sin(a * 3)) * 10;
    c.lineCap = 'round'; c.lineJoin = 'round';
    for (const [col, w] of [[L[1], 18], [L[0], 12]]) { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(hx, hy); c.lineTo(ax, ay - lift); c.stroke(); }
    c.strokeStyle = 'rgba(120,60,0,.55)'; c.lineWidth = 2; for (let k = 1; k < 7; k++) { const u = k / 7; c.beginPath(); c.moveTo(lerp(hx, ax, u) - 6, lerp(hy, ay - lift, u)); c.lineTo(lerp(hx, ax, u) + 6, lerp(hy, ay - lift, u) - 2); c.stroke(); }
    [[.1, 54], [.5, 44], [-.32, 44], [Math.PI - .25, 26]].forEach(([ta, tl]) => { const ex = ax + Math.cos(ta) * tl, ey = ay - lift + Math.sin(ta) * tl * .32 + 4;
      for (const [col, w] of [[L[1], 13], [L[0], 8]]) { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(ax, ay - lift); c.lineTo(ex, ey); c.stroke(); }
      c.fillStyle = '#5a4a3a'; c.beginPath(); c.arc(ex + Math.cos(ta) * 6, ey, 4, 0, TAU); c.fill(); }); });
}
// (x,y) = suelo. o: { head, walk, tilt, bob, inflate, blink, look, mood, gold, rim, light, extra, headTurn }
function drawHen(c, x, y, s, o = {}) {
  const kind = o.gold ? 'gold' : 'white', K = HEN[kind], t = o.t || 0;
  c.save(); c.translate(x, y); c.scale(s * (o.flip ? -1 : 1), s); c.globalAlpha = o.alpha ?? 1;
  if (o.shadow !== false) { const g = c.createRadialGradient(20, 0, 10, 20, 0, 260); g.addColorStop(0, 'rgba(30,20,10,.45)'); g.addColorStop(1, 'rgba(30,20,10,0)'); c.save(); c.scale(1, .16); c.fillStyle = g; c.fillRect(-260, -280, 560, 560); c.restore(); }
  const ph = o.walk ?? null, bob = (o.bob || 0) + (ph === null ? 0 : -Math.abs(Math.cos(ph)) * 10);
  if (!o.noLegs) henLegs(c, ph, o.gold);
  c.translate(0, bob);
  c.translate(40, -200); c.rotate(o.tilt || 0); c.translate(-40, 200);
  const br = 1 + Math.sin(t * 3) * .012, inf = o.inflate || 0; c.translate(0, -300); c.scale((1 + inf) * br, (1 + inf * .75) * br); c.translate(0, 300);
  c.drawImage(K.body, -430, -820, 900, 900);
  // luz de borde (rim)
  if (o.rim) { c.save(); c.globalCompositeOperation = 'source-atop'; c.restore(); }
  const hx = 175 + inf * 25, hy = -655 - inf * 30;
  if (o.head !== false) { const peck = o.headTurn || 0; c.save(); c.translate(hx, hy + Math.sin(t * 6) * 1.5); c.rotate(peck); c.drawImage(K.head, -200, -230, 420, 420); henEye(c, o.blink, o.look, o.mood); c.restore(); }
  else { c.save(); c.translate(160, -615);
    // cuello cortado (caricatura)
    c.fillStyle = HEN[kind] && o.gold ? '#f0c04a' : '#f3eee6'; c.beginPath(); c.ellipse(0, 6, 52, 22, -.1, 0, TAU); c.fill();
    c.fillStyle = '#7a0c14'; c.beginPath(); c.ellipse(0, 0, 46, 16, -.1, 0, TAU); c.fill(); c.fillStyle = '#d0202c'; c.beginPath(); c.ellipse(0, 1, 38, 11, -.1, 0, TAU); c.fill();
    c.fillStyle = '#f6eadc'; c.beginPath(); c.ellipse(5, 1, 8, 4, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.ellipse(-17, -3, 12, 3, -.1, 0, TAU); c.fill(); c.restore(); }
  if (o.extra) o.extra(c, hx, hy);
  c.restore();
}
function neckPosHen(x, y, s, o = {}) { const inf = o.inflate || 0; return [x + (o.head === false ? 160 : 175) * s * (o.flip ? -1 : 1), y + ((o.head === false ? -615 : -655) - inf * 30 + (o.bob || 0)) * s]; }
