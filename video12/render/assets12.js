// ---------- La cucaracha que vive sin cabeza: personaje y fondos (estilo clásico) ----------
const R = {};
const SHELL = (seed, o = {}) => ({ grad: [[0, '#b0642c'], [1, '#5a2a10']], cols: ['#d08a4a', '#3a1a08', '#9a5224', '#e8a868'], alpha: [.18, .5], len: [10, 26], density: 16, angle: 0, spread: .25, seed, shade: .32, light: [.35, .1, .28], rim: 'rgba(255,210,150,.55)', rimW: 5, rimA: .55, ...o });

function buildRoachBody() {
  const v = mk(860, 420), c = v.getContext('2d'); c.translate(430, 330);
  // abdomen (parte de abajo, con segmentos claros)
  furFill(c, ellipsePts(-60, -112, 245, 100, 30, 0, .02, 3), SHELL(3, { grad: [[0, '#a8562a'], [1, '#4a1e08']] }));
  c.save(); c.beginPath(); ellipsePts(-60, -112, 245, 92, 30).forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.clip();
  c.strokeStyle = 'rgba(60,24,6,.45)'; c.lineWidth = 6; for (let k = 0; k < 7; k++) { const x = -260 + k * 62; c.beginPath(); c.moveTo(x, -60); c.quadraticCurveTo(x + 14, -30, x + 4, -10); c.stroke(); }
  c.fillStyle = 'rgba(255,200,140,.18)'; c.fillRect(-320, -60, 520, 60); c.restore();
  // alas (encima, brillosas)
  const wing = [[170, -150], [60, -196], [-100, -210], [-250, -184], [-322, -128], [-300, -96], [-160, -112], [0, -118], [150, -120]];
  furFill(c, wing, SHELL(5, { grad: [[0, '#b0602c'], [1, '#4a1a06']], angle: .05, spread: .12, len: [30, 70], density: 10 }));
  c.strokeStyle = 'rgba(50,20,6,.55)'; c.lineWidth = 4; c.beginPath(); c.moveTo(160, -140); c.quadraticCurveTo(-60, -150, -300, -112); c.stroke();
  c.strokeStyle = 'rgba(255,230,190,.7)'; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(80, -186); c.quadraticCurveTo(-60, -204, -200, -186); c.stroke();
  c.strokeStyle = 'rgba(255,240,210,.5)'; c.lineWidth = 6; c.beginPath(); c.moveTo(-230, -176); c.lineTo(-262, -166); c.stroke();
  // escudo (pronoto)
  furFill(c, ellipsePts(196, -138, 92, 66, 24, -.15, .03, 7), SHELL(7, { grad: [[0, '#e0a060'], [1, '#8a4a1c']] }));
  c.fillStyle = 'rgba(70,28,8,.55)'; c.beginPath(); c.ellipse(196, -140, 52, 30, -.15, 0, TAU); c.fill();
  c.fillStyle = 'rgba(255,240,210,.55)'; c.beginPath(); c.ellipse(170, -178, 40, 10, -.2, 0, TAU); c.fill();
  // cercos traseros
  c.strokeStyle = '#5a2a10'; c.lineWidth = 9; c.beginPath(); c.moveTo(-300, -110); c.quadraticCurveTo(-350, -120, -372, -150); c.moveTo(-296, -98); c.quadraticCurveTo(-350, -96, -380, -110); c.stroke();
  return v; }

function buildRoachHead() {
  const v = mk(300, 300), c = v.getContext('2d'); c.translate(150, 160);
  furFill(c, ellipsePts(0, 0, 66, 76, 24, .2, .03, 9), SHELL(9, { grad: [[0, '#d89458'], [1, '#7a3c16']], len: [6, 14], density: 22 }));
  // boquita (palpos)
  c.strokeStyle = '#5a2a10'; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(10, 66); c.quadraticCurveTo(26, 96, 14, 116); c.moveTo(30, 58); c.quadraticCurveTo(52, 86, 44, 108); c.stroke();
  c.fillStyle = 'rgba(255,140,120,.35)'; c.beginPath(); c.ellipse(36, 28, 16, 10, 0, 0, TAU); c.fill();
  return v; }

async function buildExtra12() {
  R.body = buildRoachBody(); R.head = buildRoachHead();
  R.wall = makeWood(1500, 300, ['#c89060', '#8a5a34'], 12);
  R.chancla = (() => { const v = mk(160, 360), c = v.getContext('2d'); c.translate(80, 180);
    furFill(c, rectPts(-58, -160, 116, 320, 56), { grad: [[0, '#4cc9f0'], [1, '#1a6aa8']], cols: ['#9fe0ff', '#0a4a80'], alpha: [.1, .3], len: [6, 14], density: 20, spread: 3, seed: 4, shade: .3, rim: 'rgba(255,255,255,.5)', rimW: 4, rimA: .5 });
    c.strokeStyle = '#ffd166'; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(-50, -40); c.quadraticCurveTo(0, -110, 50, -40); c.stroke(); return v; })();
}
const _beR = buildExtra; buildExtra = async () => { await _beR(); await buildExtra12(); };

// pata articulada: cadera -> rodilla -> pie
function roachLeg(c, hip, footX, lift, near, xray) {
  const foot = [footX, -lift], knee = [hip[0] + (footX - hip[0]) * .45 + (footX > hip[0] ? 40 : -40), hip[1] + 18 - lift * .6];
  const col = xray ? (near ? 'rgba(150,90,50,.9)' : 'rgba(90,50,30,.7)') : near ? '#5a2810' : '#2a1206';
  c.strokeStyle = col; c.lineCap = 'round'; c.lineJoin = 'round';
  c.lineWidth = near ? 26 : 20; c.beginPath(); c.moveTo(...hip); c.lineTo(...knee); c.stroke();
  c.lineWidth = near ? 15 : 12; c.beginPath(); c.moveTo(...knee); c.lineTo(...foot); c.stroke();
  c.lineWidth = 4; for (let k = 1; k < 4; k++) { const u = k / 4, px = lerp(knee[0], foot[0], u), py = lerp(knee[1], foot[1], u); c.beginPath(); c.moveTo(px, py); c.lineTo(px + (footX > hip[0] ? 12 : -12), py - 14); c.stroke(); }
  if (near && !xray) { c.strokeStyle = 'rgba(255,210,160,.35)'; c.lineWidth = 5; c.beginPath(); c.moveTo(hip[0], hip[1] - 4); c.lineTo(knee[0], knee[1] - 4); c.stroke(); }
}
// antena ondulante
function antenna(c, x, y, t, ph, len = 380, col = '#4a200a') { c.strokeStyle = col; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y);
  for (let k = 1; k <= 14; k++) { const u = k / 14, a = -1.15 + u * (.9 + .35 * Math.sin(t * 3 + ph + u * 2)); c.lineTo(x + Math.cos(a) * len * u * 1.05 + 40 * u * u, y + Math.sin(a) * len * u * .8 + 60 * u * u); } c.stroke(); }

// cucaracha de perfil mirando a la derecha. (x,y) = suelo bajo el cuerpo
// o: t, walk (fase), head (true/false), headOff {x,y,r}, xray (0..1), expr ('smile','shock','happy'), plug (0..1), ooze (0..1), glowLegs, ganglia (0..1), spiracles (0..1), droop
function drawRoach(c, x, y, s, o = {}) {
  const t = o.t || 0, w = o.walk ?? null, xr = o.xray || 0, dr = o.droop || 0;
  c.save(); c.translate(x, y); c.scale(s * (o.flip ? -1 : 1), s);
  const bob = w != null ? Math.abs(Math.sin(w * 2)) * 8 : Math.sin(t * 2) * 2;
  // sombra
  c.fillStyle = 'rgba(20,10,5,.28)'; c.beginPath(); c.ellipse(-20, 4, 330, 26, 0, 0, TAU); c.fill();
  const hips = [[150, -92], [30, -88], [-110, -90]], base = [[340, 1], [60, -1], [-310, -1]];
  const legPos = (i, far) => { const ph = w == null ? 0 : w + i * Math.PI * .66 + (far ? Math.PI : 0); const stride = w == null ? 0 : 50; return [base[i][0] + Math.sin(ph) * stride + (far ? -20 : 0), w == null ? 0 : Math.max(0, Math.cos(ph)) * 34]; };
  // patas lejanas
  for (let i = 0; i < 3; i++) { const [fx, lf] = legPos(i, true); roachLeg(c, [hips[i][0] - 10, hips[i][1] - 6 - bob + dr * 24], fx, lf, false, xr > .5); }
  c.save(); c.translate(0, -30 - bob + dr * 24); c.rotate(dr * .06);
  // antena lejana + cabeza
  const hx = 300, hy = -118;
  const drawHead = () => { const ho = o.headOff || { x: 0, y: 0, r: 0 }; c.save(); c.translate(hx + ho.x, hy + ho.y); c.rotate(.35 + ho.r);
    antenna(c, 10, -50, t, 1.3, 400, xr > .5 ? 'rgba(255,220,180,.6)' : '#3a1808');
    c.globalAlpha = 1 - xr * .55; c.drawImage(R.head, -150, -160); c.globalAlpha = 1;
    // ojo de caricatura
    const ex = o.expr || 'smile', bl = clamp(Math.abs(((t * .7 + .3) % 3) - 1.5) * 10);
    c.fillStyle = '#fff'; c.beginPath(); c.ellipse(-4, -20, 30, (ex === 'shock' ? 38 : 32) * Math.max(.1, bl), -.2, 0, TAU); c.fill(); c.strokeStyle = 'rgba(70,30,10,.6)'; c.lineWidth = 3; c.stroke();
    if (bl > .3) { c.fillStyle = '#1a0a04'; c.beginPath(); c.arc(4 + (o.look ? o.look[0] * 8 : 0), -16 + (o.look ? o.look[1] * 8 : 0), ex === 'shock' ? 11 : 15, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(9, -22, 5, 0, TAU); c.fill(); }
    c.strokeStyle = '#3a1808'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); ex === 'shock' ? (c.moveTo(-34, -70), c.lineTo(20, -74)) : (c.moveTo(-30, -62), c.lineTo(22, -70)); c.stroke();
    // sonrisa
    c.strokeStyle = '#3a1808'; c.lineWidth = 6; c.beginPath(); if (ex === 'shock') { c.fillStyle = '#4a1010'; c.ellipse(26, 36, 10, 14, 0, 0, TAU); c.fill(); } else c.arc(16, 22, 22, .3, 1.9); c.stroke();
    antenna(c, 26, -56, t, 0, 420, xr > .5 ? 'rgba(255,220,180,.8)' : '#4a200a');
    c.restore(); };
  if (o.head !== false && o.headBehind !== false) drawHead();
  // cuerpo
  if (xr > 0) { c.save(); c.globalAlpha = 1 - xr * .62; c.drawImage(R.body, -430, -330); c.restore(); c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = xr * .35; c.drawImage(R.body, -430, -330); c.restore(); }
  else c.drawImage(R.body, -430, -330);
  // cuello sin cabeza
  if (o.head === false) { c.fillStyle = '#e8c89a'; c.beginPath(); c.ellipse(272, -128, 22, 40, .1, 0, TAU); c.fill(); c.fillStyle = 'rgba(160,110,60,.5)'; c.beginPath(); c.ellipse(276, -128, 12, 26, .1, 0, TAU); c.fill();
    if (o.ooze) { const k = o.ooze; c.fillStyle = 'rgba(190,230,140,.95)'; c.beginPath(); c.ellipse(296, -110 + k * 50, 22 * k + 6, 30 * k + 6, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.arc(288, -118 + k * 40, 4, 0, TAU); c.fill(); }
    if (o.plug) { c.save(); c.globalAlpha = o.plug; furFill(c, ellipsePts(280, -128, 30, 46, 16, .1, .2, 14), { grad: [[0, '#8a5a2a'], [1, '#4a2a10']], cols: ['#b07a40', '#2a1404'], alpha: [.3, .6], len: [4, 10], density: 22, spread: 3, seed: 14, shade: .3 }); c.restore(); }
  }
  // espiráculos (respiración)
  if (o.spiracles) { const sp = o.spiracles; for (let k = 0; k < 9; k++) { const sx = 170 - k * 52, sy = -94 + Math.abs(k - 4) * 1.5, br = (Math.sin(t * 4 - k * .5) + 1) / 2;
    c.save(); c.globalCompositeOperation = 'lighter'; glow(c, sx, sy, 34 + br * 20, '120,200,255', .55 * sp); c.restore(); c.fillStyle = `rgba(20,40,70,${sp})`; c.beginPath(); c.ellipse(sx, sy, 8, 6, 0, 0, TAU); c.fill(); c.strokeStyle = `rgba(160,220,255,${sp})`; c.lineWidth = 3; c.stroke();
    c.save(); c.globalAlpha = sp * (1 - br * .5); c.strokeStyle = '#7ad0ff'; c.lineWidth = 5; c.lineCap = 'round'; const d = 30 + br * 26; c.beginPath(); c.moveTo(sx, sy + d + 18); c.lineTo(sx, sy + d - 4); c.moveTo(sx - 8, sy + d + 4); c.lineTo(sx, sy + d - 6); c.lineTo(sx + 8, sy + d + 4); c.stroke(); c.restore(); } }
  // cerebritos (ganglios)
  if (o.ganglia != null) { const gk = o.ganglia; c.strokeStyle = `rgba(255,220,120,${.35 + .4 * xr})`; c.lineWidth = 5; c.beginPath(); c.moveTo(250, -112); for (let k = 0; k < 9; k++) c.lineTo(200 - k * 54, -84 + Math.sin(k) * 3); c.stroke();
    for (let k = 0; k < 9; k++) { const gx = 200 - k * 54, gy = -84 + Math.sin(k) * 3, on = clamp(gk * 10 - k); if (on <= 0) continue; const pul = .7 + .3 * Math.sin(t * 6 + k);
      c.save(); c.globalCompositeOperation = 'lighter'; glow(c, gx, gy, 46 * on, '255,210,90', .8 * pul); c.restore(); c.fillStyle = '#ffe08a'; c.beginPath(); c.arc(gx, gy, 11 * on, 0, TAU); c.fill(); c.strokeStyle = '#b07a1a'; c.lineWidth = 3; c.stroke(); } }
  if (o.head !== false && o.headBehind === false) drawHead();
  c.restore();
  // patas cercanas
  for (let i = 0; i < 3; i++) { const [fx, lf] = legPos(i, false); const hp = [hips[i][0], hips[i][1] - bob + dr * 24]; if (o.glowLegs) { c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = o.glowLegs; c.shadowColor = '#ffd166'; c.shadowBlur = 30; roachLeg(c, hp, fx, lf, true, true); c.restore(); } roachLeg(c, hp, fx, lf, true, xr > .5); }
  c.restore();
}

// cabeza suelta (rodando, sonriendo)
function looseHead(c, x, y, s, rot, t, expr = 'smile') { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(rot); c.translate(-300, 118); drawRoachHeadOnly(c, t, expr); c.restore(); }
function drawRoachHeadOnly(c, t, expr) { c.save(); c.translate(300, -118); c.rotate(.35); antenna(c, 10, -50, t, 1.3, 260, '#3a1808'); c.drawImage(R.head, -150, -160);
  c.fillStyle = '#fff'; c.beginPath(); c.ellipse(-4, -20, 30, expr === 'shock' ? 38 : 32, -.2, 0, TAU); c.fill(); c.fillStyle = '#1a0a04'; c.beginPath(); c.arc(4, -16, expr === 'shock' ? 11 : 15, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(9, -22, 5, 0, TAU); c.fill();
  c.strokeStyle = '#3a1808'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); if (expr === 'shock') { c.fillStyle = '#4a1010'; c.ellipse(26, 36, 10, 14, 0, 0, TAU); c.fill(); } else c.arc(16, 22, 22, .3, 1.9); c.stroke(); antenna(c, 26, -56, t, 0, 280, '#4a200a'); c.restore(); }

// cocina de noche
function kitchen(c, t, o = {}) {
  room(c, t, { wall0: '#6a7aa8', wall1: '#4a5a88', sky: [[0, '#0e1430'], [1, '#2a3a6a']], sun: false, sunbeam: false, wx: o.wx ?? 640, wy: o.wy ?? 300 });
  // luna en la ventana
  const wx = o.wx ?? 640, wy = o.wy ?? 300; glow(c, wx + 270, wy + 110, 110, '220,230,255', .5); c.fillStyle = '#f2f4ff'; c.beginPath(); c.arc(wx + 270, wy + 110, 34, 0, TAU); c.fill();
  // azulejo de cocina
  c.save(); c.globalAlpha = .18; c.strokeStyle = '#fff'; c.lineWidth = 3; for (let y = 1000; y < 1490; y += 70) { c.beginPath(); c.moveTo(-300, y); c.lineTo(W + 300, y); c.stroke(); } for (let x = -300; x < W + 300; x += 70) { c.beginPath(); c.moveTo(x, 1000); c.lineTo(x, 1490); c.stroke(); } c.restore();
  // barra de cocina
  c.drawImage(R.wall, -200, 900, 1500, 120); c.fillStyle = '#e8e0d4'; c.fillRect(-200, 880, 1500, 30);
  // luz de lámpara
  c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(540, 1500, 50, 540, 1500, 900); g.addColorStop(0, 'rgba(255,210,140,.35)'); g.addColorStop(1, 'rgba(255,210,140,0)'); c.fillStyle = g; c.fillRect(-300, 300, W + 600, 1800); c.restore();
  // piso de cuadros
  c.save(); c.beginPath(); c.rect(-300, 1500, W + 600, 900); c.clip(); for (let r = 0; r < 10; r++) for (let q = -6; q < 16; q++) { const y0 = 1500 + r * r * 9 + r * 40, y1 = 1500 + (r + 1) * (r + 1) * 9 + (r + 1) * 40, sc0 = 1 + r * .18, sc1 = 1 + (r + 1) * .18, x0 = 540 + (q * 120 - 540) * sc0, x1 = 540 + ((q + 1) * 120 - 540) * sc0, x2 = 540 + ((q + 1) * 120 - 540) * sc1, x3 = 540 + (q * 120 - 540) * sc1;
    c.fillStyle = (r + q) % 2 ? '#e8dcc8' : '#b89878'; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y0); c.lineTo(x2, y1); c.lineTo(x3, y1); c.fill(); } c.restore();
  c.fillStyle = 'rgba(40,20,40,.25)'; c.fillRect(-300, 1500, W + 600, 900);
  motes(c, t, { n: 12, seed: 5, size: 7, a: .25 });
}
// fondo de diagrama cálido (pizarra)
function boardBg(c, t, col = ['#2a4a5a', '#122028']) { const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1300); g.addColorStop(0, col[0]); g.addColorStop(1, col[1]); c.fillStyle = g; c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalAlpha = .06; for (let i = 0; i < 400; i++) { c.fillStyle = hash(i) > .5 ? '#fff' : '#000'; c.fillRect(hash(i * 2) * W, hash(i * 3) * H, 2 + hash(i) * 30, 2); } c.restore();
  c.strokeStyle = 'rgba(255,255,255,.06)'; c.lineWidth = 2; for (let x = -300; x < W + 300; x += 80) { c.beginPath(); c.moveTo(x, -300); c.lineTo(x, H + 300); c.stroke(); } for (let y = -300; y < H + 300; y += 80) { c.beginPath(); c.moveTo(-300, y); c.lineTo(W + 300, y); c.stroke(); }
  motes(c, t, { n: 16, seed: 2, size: 8, a: .25 }); }
function numPill(c, t, t0, t1, n, x = 160, y = 600) { if (t < t0 || t > t1) return; const a = eBack((t - t0) / .35) * (1 - clamp((t - t1 + .3) / .3)); c.save(); c.translate(x, y); c.scale(a, a); c.fillStyle = '#ffd166'; c.beginPath(); c.arc(0, 0, 70, 0, TAU); c.fill(); c.strokeStyle = '#8a5a10'; c.lineWidth = 6; c.stroke(); c.fillStyle = '#4a2a00'; c.font = '900 92px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(n, 0, 6); c.restore(); }
