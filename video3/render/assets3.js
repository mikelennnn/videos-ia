// ---------- personajes y assets: piel chinita ----------
const C = {};
const SKIN = { base: [[0, '#f6cfa0'], [1, '#dba274']], line: '#9a6440', col: '#ecb98a', dark: '#c98a5c' };
const SHIRT = '#f2763a', SHIRT_D = '#b84e1e';

function texFill(c, pts, grad, o = {}) { // relleno con grano sutil (para piel, tela)
  furFill(c, pts, { grad, cols: o.cols || ['rgba(255,255,255,.9)', 'rgba(0,0,0,.6)'], alpha: o.alpha || [.04, .12], len: o.len || [4, 10], density: o.density || 14, spread: 3, seed: o.seed || 3, lw: 1.2, light: o.light || [.35, .2, .3], shade: o.shade ?? .2, rim: o.rim, rimW: o.rimW, outline: o.outline, pre: o.pre });
}
// ---------- Beto ----------
function buildBeto() {
  // cabeza (sin ojos/boca: se dibujan en vivo)
  const h = mk(420, 440), c = h.getContext('2d'); c.translate(210, 230); // centro de la cabeza
  [[-108, 10], [108, 10]].forEach(([x, y]) => { texFill(c, ellipsePts(x, y, 28, 34, 16), SKIN.base, { outline: SKIN.line }); c.fillStyle = 'rgba(160,90,60,.35)'; c.beginPath(); c.ellipse(x * .98, y, 12, 18, 0, 0, TAU); c.fill(); });
  texFill(c, ellipsePts(0, 0, 110, 120, 30, 0, .02, 4), SKIN.base, { outline: SKIN.line, light: [.4, .25, .35], shade: .12 });
  const hair = [[-122, 10], [-128, -60], [-100, -118], [-40, -150], [30, -152], [95, -125], [126, -70], [124, 0], [104, -40], [80, -72], [50, -58], [30, -80], [0, -64], [-30, -86], [-55, -60], [-85, -70], [-104, -30]];
  furFill(c, hair, { grad: [[0, '#5a3a24'], [1, '#2e1c10']], cols: ['#7a5236', '#22150c', '#94684a'], alpha: [.35, .8], len: [10, 22], density: 30, angle: 1.4, spread: .6, seed: 12, fringe: ['#5a3a24', '#3a2414', '#7a5236'], fringeLen: 13, light: [.4, .1, .25] });
  C.head = h;
  // torso (playera)
  const t = mk(400, 380), d = t.getContext('2d'); d.translate(200, 600); // coordenadas de Beto
  texFill(d, [[-30, -605], [30, -605], [32, -540], [-32, -540]], SKIN.base, { outline: SKIN.line });
  const shirt = [[-140, -560], [-60, -575], [0, -560], [60, -575], [140, -560], [150, -500], [128, -400], [122, -262], [0, -252], [-122, -262], [-128, -400], [-150, -500]];
  texFill(d, shirt, [[0, '#ff8f52'], [1, '#d85a24']], { outline: SHIRT_D, alpha: [.06, .16], len: [12, 30], density: 10, shade: .3 });
  d.strokeStyle = SHIRT_D; d.lineWidth = 8; d.lineCap = 'round'; d.beginPath(); d.moveTo(-34, -566); d.quadraticCurveTo(0, -530, 34, -566); d.stroke();
  d.strokeStyle = 'rgba(120,40,10,.35)'; d.lineWidth = 3; [[-60, -420, -40, -330], [50, -470, 70, -360], [-90, -330, -60, -290]].forEach(([a, b, e, f]) => { d.beginPath(); d.moveTo(a, b); d.quadraticCurveTo((a + e) / 2 + 10, (b + f) / 2, e, f); d.stroke(); });
  d.fillStyle = '#fff3e0'; d.font = '900 54px Nunito'; d.textAlign = 'center'; d.globalAlpha = .9; drawStar(d, 0, -440, 40, '#ffe08a'); d.globalAlpha = 1;
  C.torso = t;
  // piernas (jeans + tenis)
  const l = mk(320, 320), e = l.getContext('2d'); e.translate(160, 300);
  [[-58, 1], [58, -1]].forEach(([x, sg]) => {
    texFill(e, [[x - 52, -290], [x + 52, -290], [x + 48, -40], [x - 46, -40]], [[0, '#4a72b0'], [1, '#2c4a7c']], { outline: '#1e3354', alpha: [.08, .2], len: [8, 22], density: 16, seed: 7 + sg });
    e.strokeStyle = 'rgba(200,220,255,.35)'; e.setLineDash([6, 6]); e.lineWidth = 2; e.beginPath(); e.moveTo(x + sg * 30, -280); e.lineTo(x + sg * 28, -50); e.stroke(); e.setLineDash([]);
    e.fillStyle = '#f4f4f4'; e.beginPath(); e.ellipse(x + sg * -4, -22, 66, 30, 0, 0, TAU); e.fill(); e.strokeStyle = '#8a8a8a'; e.lineWidth = 3; e.stroke();
    e.fillStyle = '#e8343f'; e.beginPath(); e.ellipse(x + sg * -4, -30, 46, 14, 0, Math.PI, TAU); e.fill(); e.fillStyle = '#d0d0d0'; e.fillRect(x - 64, -6, 128, 8);
  });
  e.fillStyle = '#2c4a7c'; e.fillRect(-110, -300, 220, 30); e.fillStyle = '#5a3a24'; e.fillRect(-110, -298, 220, 14);
  C.legs = l;
  // "bola de pelo" para el gancho
  const f = mk(760, 1100), g = f.getContext('2d'); g.translate(380, 1040);
  furFill(g, ellipsePts(0, -470, 300, 470, 40, 0, .08, 9), { grad: [[0, 'rgba(160,110,70,.95)'], [1, 'rgba(110,70,40,.95)']], cols: ['#c48a5a', '#6a4426', '#e0b080'], alpha: [.3, .7], len: [16, 34], density: 18, spread: 3, seed: 21, fringe: ['#a8744a', '#6a4426', '#d9a878'], fringeLen: 46, fringeW: 2.4, light: [.4, .2, .3] });
  C.furball = f;
}
const POSES = {
  side: [[-160, -385], [-170, -245], [160, -385], [170, -245]],
  hug: [[-150, -405], [80, -470], [150, -390], [-80, -448]],
  phones: [[-215, -600], [-122, -700], [215, -600], [122, -700]],
  shrug: [[-210, -430], [-262, -520], [210, -430], [262, -520]],
  wave: [[-160, -385], [-170, -245], [225, -640], [262, -805]],
  look: [[-160, -385], [-170, -245], [155, -420], [60, -575]],
};
function poseMix(a, b, k) { const A = POSES[a], B2 = POSES[b || a]; return A.map((p, i) => [lerp(p[0], B2[i][0], k), lerp(p[1], B2[i][1], k)]); }
function drawArm(c, sh, el, hd, o) {
  const seg = (p, q, w, col) => { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(...p); c.lineTo(...q); c.stroke(); };
  const cold = o.cold || 0; const sk = cold > .3 ? '#e9bea0' : SKIN.col;
  c.strokeStyle = SKIN.line; c.lineWidth = 58; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(...sh); c.lineTo(...el); c.lineTo(...hd); c.stroke();
  c.strokeStyle = sk; c.lineWidth = 50; c.beginPath(); c.moveTo(...sh); c.lineTo(...el); c.lineTo(...hd); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = 10; c.beginPath(); c.moveTo(lerp(el[0], hd[0], .15) - 8, lerp(el[1], hd[1], .15) - 8); c.lineTo(lerp(el[0], hd[0], .75) - 8, lerp(el[1], hd[1], .75) - 8); c.stroke();
  // piel chinita: bolitas + vellitos parados
  const gb = o.gb || 0; if (gb > 0) { for (let k = 0; k < 14; k++) { const u = .08 + k / 14 * .85, px = lerp(el[0], hd[0], u) + (hash(k) - .5) * 26, py = lerp(el[1], hd[1], u) + (hash(k * 3) - .5) * 26;
    c.globalAlpha = gb; c.fillStyle = 'rgba(140,80,50,.45)'; c.beginPath(); c.arc(px + 1, py + 2, 4, 0, TAU); c.fill(); c.fillStyle = '#ffe2c8'; c.beginPath(); c.arc(px, py, 3.6, 0, TAU); c.fill();
    c.strokeStyle = '#5a3a24'; c.lineWidth = 2; c.beginPath(); c.moveTo(px, py); c.lineTo(px + (hash(k * 7) - .5) * 6, py - 12 * gb); c.stroke(); } c.globalAlpha = 1; }
  // manga
  const sl = [lerp(sh[0], el[0], .55), lerp(sh[1], el[1], .55)];
  seg(sh, sl, 80, SHIRT_D); seg(sh, sl, 72, SHIRT);
  c.fillStyle = SKIN.line; c.beginPath(); c.arc(hd[0], hd[1], 33, 0, TAU); c.fill(); c.fillStyle = sk; c.beginPath(); c.arc(hd[0], hd[1], 29, 0, TAU); c.fill();
  c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.arc(hd[0] - 8, hd[1] - 10, 9, 0, TAU); c.fill();
}
// (x,y) = suelo bajo Beto
function drawBeto(c, x, y, s, o = {}) {
  const t = o.t || 0, sv = o.shiver || 0;
  c.save(); c.translate(x + (hash(t * 97) - .5) * 8 * sv, y); c.scale(s, s); c.globalAlpha = o.alpha ?? 1;
  const g = c.createRadialGradient(0, 0, 0, 0, 0, 200); g.addColorStop(0, 'rgba(10,10,30,.35)'); g.addColorStop(1, 'rgba(10,10,30,0)'); c.save(); c.scale(1, .16); c.fillStyle = g; c.fillRect(-220, -220, 440, 440); c.restore();
  c.drawImage(C.legs, -160, -300);
  const br = Math.sin(t * 2.4) * 3; c.translate(0, br * .3);
  const P = poseMix(o.pose || 'side', o.pose2, o.pk || 0);
  const SH = [[-128, -538], [128, -538]];
  const back = o.pose === 'hug' || o.pose2 === 'hug';
  if (!back) { /* brazos laterales: detrás del cuerpo no hace falta */ }
  c.drawImage(C.torso, -200, -600);
  // cabeza
  const hy = -700 + br, tilt = o.headTilt || 0;
  c.save(); c.translate(0, hy); c.rotate(tilt);
  c.drawImage(C.head, -210, -230);
  // frío: nariz y cachetes rojos, tinte azul
  const cold = o.cold || 0; c.save(); c.beginPath(); c.ellipse(0, 0, 110, 120, 0, 0, TAU); c.clip(); c.fillStyle = `rgba(120,170,255,${.14 * cold})`; c.fillRect(-120, -130, 240, 260); c.restore();
  c.fillStyle = `rgba(255,110,120,${.3 + .3 * cold})`; [[-64, 34], [64, 34]].forEach(([ex, ey]) => { c.beginPath(); c.ellipse(ex, ey, 22, 14, 0, 0, TAU); c.fill(); });
  c.fillStyle = cold > .3 ? '#f08a8a' : SKIN.dark; c.beginPath(); c.ellipse(0, 22, 15, 12, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.arc(-5, 18, 4, 0, TAU); c.fill();
  // ojos
  const ex = o.expr || 'smile', lk = o.look || [0, 0];
  const bl = o.blink != null ? clamp(Math.abs(o.blink) * 8) : 1;
  [-42, 42].forEach(dx => {
    if (o.eyesClosed || ex === 'bliss') { c.strokeStyle = '#2a1a10'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.arc(dx, -2, 16, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); return; }
    const big = ex === 'shock' ? 1.25 : 1; c.fillStyle = '#ffffff'; c.beginPath(); c.ellipse(dx, -5, 21 * big, 26 * big * Math.max(.1, bl), 0, 0, TAU); c.fill(); c.strokeStyle = 'rgba(80,50,30,.5)'; c.lineWidth = 2.5; c.stroke();
    if (bl > .3) { c.fillStyle = '#2a1a10'; c.beginPath(); c.arc(dx + lk[0] * 7, -2 + lk[1] * 7, 12 * (ex === 'shock' ? .8 : 1), 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(dx + lk[0] * 7 + 4, -7 + lk[1] * 7, 4.5, 0, TAU); c.fill(); }
    if (ex === 'flat') { c.fillStyle = SKIN.col; c.fillRect(dx - 24, -34, 48, 22); c.strokeStyle = SKIN.line; c.lineWidth = 4; c.beginPath(); c.moveTo(dx - 22, -12); c.lineTo(dx + 22, -12); c.stroke(); }
  });
  // cejas
  c.strokeStyle = '#3a2414'; c.lineWidth = 9; c.lineCap = 'round';
  const bro = { cold: [10, -6], flat: [0, 0], smile: [-4, -4], bliss: [-4, -6], shock: [-6, -18] }[ex] || [0, 0];
  [-1, 1].forEach(sd => { c.beginPath(); c.moveTo(sd * 22, -42 + bro[1] - bro[0] * .5); c.lineTo(sd * 60, -42 + bro[1] + bro[0] * .5); c.stroke(); });
  // boca
  c.save(); c.translate(0, 60);
  if (ex === 'cold') { const op = 6 + Math.abs(Math.sin(t * 38)) * 6; c.fillStyle = '#5a1a1a'; rrect(c, -30, -op, 60, op * 2, 8); c.fill(); c.fillStyle = '#fff'; c.fillRect(-26, -op + 1, 52, op - 1); c.fillRect(-26, 1, 52, op - 2); c.strokeStyle = 'rgba(120,120,120,.6)'; c.lineWidth = 2; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(k * 10, -op); c.lineTo(k * 10, op); c.stroke(); } }
  else if (ex === 'flat') { c.strokeStyle = '#5a2a1a'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(-26, 0); c.lineTo(26, 4); c.stroke(); }
  else if (ex === 'shock') { c.fillStyle = '#5a1a1a'; c.beginPath(); c.ellipse(0, 4, 16, 22, 0, 0, TAU); c.fill(); }
  else { const op = o.mouthOpen ?? 1; c.fillStyle = '#6a1e1e'; c.beginPath(); c.moveTo(-34, -4); c.quadraticCurveTo(0, 6 + 34 * op, 34, -4); c.closePath(); c.fill(); c.fillStyle = '#fff'; c.fillRect(-26, -4, 52, 8 * op); c.fillStyle = '#e86a6a'; c.beginPath(); c.ellipse(0, 10 + 14 * op, 16, 8 * op, 0, 0, TAU); c.fill(); }
  c.restore();
  // audífonos
  if (o.headphones) { c.strokeStyle = '#2a2d34'; c.lineWidth = 20; c.beginPath(); c.arc(0, -10, 138, Math.PI * 1.05, Math.PI * 1.95); c.stroke(); c.strokeStyle = 'rgba(255,255,255,.2)'; c.lineWidth = 5; c.beginPath(); c.arc(0, -14, 138, Math.PI * 1.2, Math.PI * 1.5); c.stroke();
    [-1, 1].forEach(sd => { c.fillStyle = '#2a2d34'; rrect(c, sd * 128 - 30, -50, 60, 100, 26); c.fill(); c.fillStyle = sd < 0 ? '#ff4fa3' : '#4cc9f0'; rrect(c, sd * 128 - 20, -40, 40, 80, 18); c.fill(); }); }
  c.restore();
  // brazos
  drawArm(c, SH[0], P[0], P[1], o); drawArm(c, SH[1], P[2], P[3], o);
  // vaho
  if (o.breath) for (let k = 0; k < 3; k++) { const ph = (t * .7 + k / 3) % 1; c.globalAlpha = (1 - ph) * .55 * o.breath; c.drawImage(A.dot, 30 + ph * 120 - 40 - ph * 40, hy + 50 - ph * 90 - 40 - ph * 40, 80 + ph * 80, 80 + ph * 80); } c.globalAlpha = 1;
  c.restore();
}

// ---------- gato atigrado ----------
const CAT = { grad: [[0, '#f9be74'], [1, '#c96f2c']], cols: ['#ffd9a6', '#b8622a', '#e89a50', '#8a4418'], fringe: ['#f7b76a', '#d98a40', '#fff0d8'] };
function catStripes(c, b) { c.save(); c.strokeStyle = 'rgba(150,70,20,.55)'; c.lineWidth = 16; c.lineCap = 'round'; for (let x = b[0] + 30; x < b[2] - 20; x += 46) { c.beginPath(); c.moveTo(x, b[1] - 10); c.quadraticCurveTo(x + 20, (b[1] + b[3]) / 2, x - 6, b[1] + (b[3] - b[1]) * .7); c.stroke(); } c.restore(); }
function buildCat(kind) { // kind: normal | fluffy | scared
  const S = 900, cv0 = mk(S, 800), c = cv0.getContext('2d'); c.translate(420, 700);
  const fl = kind === 'normal' ? 10 : kind === 'fluffy' ? 22 : 36;
  const base = { ...CAT, alpha: [.3, .7], len: [8, 16], density: 26, angle: 3.0, spread: .5, fringeLen: fl, fringeW: kind === 'scared' ? 2.4 : 1.8, light: [.5, .2, .35], shade: .25, pre: catStripes };
  let tail, body;
  if (kind === 'scared') { tail = tubePts(bez([-150, -330], [-230, -520], [-150, -640], 14), 90, 70); body = []; for (let i = 0; i <= 16; i++) { const u = i / 16; body.push([lerp(-180, 170, u), -330 - 150 * Math.sin(Math.PI * u)]); } for (let i = 16; i >= 0; i--) { const u = i / 16; body.push([lerp(-170, 160, u), -200 - 60 * Math.sin(Math.PI * u)]); } }
  else { tail = tubePts(bez([-150, -190], [-280, -260], [-220, -420], 14), 34 + fl, 24 + fl * .8); body = ellipsePts(0, -165, 175, 88, 26, 0, .03, 5); }
  furFill(c, tail, { ...base, seed: 4, pre: null, angle: -1.2 });
  furFill(c, body, { ...base, seed: 6 });
  return cv0;
}
function buildCatHead(fluff) {
  const cv0 = mk(420, 420), c = cv0.getContext('2d'); c.translate(210, 230);
  [[-62, -60, -1], [52, -66, 1]].forEach(([x, y, sd]) => { const pts = [[x - 40, y + 30], [x + sd * 10, y - 70], [x + 40, y + 20]]; furFill(c, pts, { ...CAT, alpha: [.3, .6], len: [6, 12], density: 20, spread: 2, fringeLen: 8, seed: 3 }); c.fillStyle = '#f2a0a0'; c.beginPath(); c.moveTo(x - 20, y + 18); c.lineTo(x + sd * 8, y - 40); c.lineTo(x + 22, y + 12); c.fill(); });
  furFill(c, ellipsePts(0, 0, 96, 84, 26, 0, .05, 8), { ...CAT, alpha: [.3, .7], len: [6, 13], density: 30, angle: 2.8, spread: 1.2, fringeLen: fluff, seed: 9, light: [.5, .25, .35], pre: (c, b) => { c.strokeStyle = 'rgba(150,70,20,.5)'; c.lineWidth = 9; c.lineCap = 'round'; [-24, 0, 24].forEach(x => { c.beginPath(); c.moveTo(x, -84); c.lineTo(x * .6, -46); c.stroke(); }); } });
  texFill(c, ellipsePts(30, 34, 52, 36, 18), [[0, '#fff6ea'], [1, '#f2dcc4']], { shade: 0 });
  return cv0;
}
function drawCat(c, x, y, s, o = {}) {
  const kind = o.kind || 'normal', t = o.t || 0;
  c.save(); c.translate(x, y); c.scale(s * (o.flip ? -1 : 1), s);
  const g = c.createRadialGradient(0, 0, 0, 0, 0, 220); g.addColorStop(0, 'rgba(10,10,30,.35)'); g.addColorStop(1, 'rgba(10,10,30,0)'); c.save(); c.scale(1, .14); c.fillStyle = g; c.fillRect(-240, -240, 480, 480); c.restore();
  const scared = kind === 'scared', legTop = scared ? -230 : -110;
  [[-120, 0], [-80, 1], [90, 0], [130, 1]].forEach(([lx, k]) => { const sw = o.walk != null ? Math.sin(o.walk + k * Math.PI) * 14 : 0;
    c.strokeStyle = '#b8622a'; c.lineWidth = 46; c.lineCap = 'round'; c.beginPath(); c.moveTo(lx, legTop); c.lineTo(lx + sw, -18); c.stroke(); c.strokeStyle = k ? '#e89a50' : '#f2a65a'; c.lineWidth = 38; c.stroke();
    c.fillStyle = '#fff2e2'; c.beginPath(); c.ellipse(lx + sw + 6, -14, 26, 15, 0, 0, TAU); c.fill(); });
  c.drawImage(C['cat_' + kind], -420, -700);
  const hx = scared ? 190 : 175, hy = scared ? -330 : -250, hs = scared ? 1.12 : 1;
  c.save(); c.translate(hx, hy + Math.sin(t * 2) * 3); c.scale(hs, hs); c.rotate(o.headRot || 0); c.drawImage(scared || kind === 'fluffy' ? C.catHeadF : C.catHead, -210, -230);
  // ojos
  const bl = o.blink != null ? clamp(Math.abs(o.blink) * 8) : 1;
  [[-26, -8], [44, -10]].forEach(([ex, ey]) => { c.fillStyle = '#9be36b'; c.beginPath(); c.ellipse(ex, ey, scared ? 22 : 17, (scared ? 24 : 19) * Math.max(.1, bl), 0, 0, TAU); c.fill(); c.strokeStyle = '#3a2410'; c.lineWidth = 3; c.stroke();
    if (bl > .3) { c.fillStyle = '#111'; c.beginPath(); scared ? c.arc(ex + 3, ey, 15, 0, TAU) : c.ellipse(ex + 3, ey, 5, 16, 0, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(ex + 8, ey - 7, 5, 0, TAU); c.fill(); } });
  c.fillStyle = '#e87a8a'; c.beginPath(); c.moveTo(50, 22); c.lineTo(76, 22); c.lineTo(63, 36); c.fill();
  c.strokeStyle = '#5a2a1a'; c.lineWidth = 3.5; c.beginPath(); c.moveTo(63, 36); c.lineTo(63, 46); c.moveTo(63, 46); c.quadraticCurveTo(50, 56, 42, 46); c.moveTo(63, 46); c.quadraticCurveTo(76, 56, 84, 46); c.stroke();
  if (scared) { c.fillStyle = '#5a1a1a'; c.beginPath(); c.ellipse(63, 64, 18, 14, 0, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.moveTo(50, 56); c.lineTo(55, 70); c.lineTo(60, 56); c.moveTo(66, 56); c.lineTo(71, 70); c.lineTo(76, 56); c.fill(); }
  c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 2.5; [[-6, 30], [0, 40], [6, 50]].forEach(([d, l], i) => { c.beginPath(); c.moveTo(80, 34 + i * 6); c.lineTo(80 + l * 2.6, 26 + i * 10 + d); c.stroke(); c.beginPath(); c.moveTo(40, 34 + i * 6); c.lineTo(40 - l * 2.2, 26 + i * 10 + d); c.stroke(); });
  c.restore(); c.restore();
}
// ---------- ancestro peludo ----------
const APE = { grad: [[0, '#7a5232'], [1, '#3e2614']], cols: ['#9a6a42', '#2e1c0e', '#b88458', '#4e3018'], alpha: [.3, .75], len: [12, 26], density: 24, spread: .5, fringe: ['#7a5232', '#4e3018', '#a8784a'], fringeLen: 26, fringeW: 2.2, light: [.5, .15, .3], shade: .3 };
function buildApe() {
  const cv0 = mk(700, 900), c = cv0.getContext('2d'); c.translate(330, 860);
  furFill(c, [[-80, -300], [-110, -420], [-60, -540], [40, -590], [110, -540], [120, -440], [90, -330], [10, -280]], { ...APE, angle: 1.7, seed: 3 });
  furFill(c, ellipsePts(110, -640, 72, 70, 24, 0, .04, 6), { ...APE, angle: 2.4, seed: 5, fringeLen: 18 });
  texFill(c, ellipsePts(140, -625, 46, 46, 18), [[0, '#d8a07a'], [1, '#b07852']], { outline: '#6a4426' });
  c.fillStyle = '#4e3018'; c.beginPath(); c.ellipse(140, -662, 46, 14, -.1, 0, TAU); c.fill();
  c.fillStyle = '#1a0e08'; c.beginPath(); c.arc(152, -644, 7, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(154, -646, 2.5, 0, TAU); c.fill();
  c.fillStyle = '#8a5434'; c.beginPath(); c.ellipse(178, -622, 10, 8, 0, 0, TAU); c.fill(); c.strokeStyle = '#5a2a1a'; c.lineWidth = 4; c.beginPath(); c.moveTo(146, -596); c.quadraticCurveTo(162, -588, 176, -598); c.stroke();
  C.ape = cv0;
  const limb = (len, w, seed) => { const v = mk(160, len + 80), d = v.getContext('2d'); d.translate(80, 30); furFill(d, tubePts([[0, 0], [0, len * .5], [0, len]], w, w * .8), { ...APE, angle: 1.57, seed, fringeLen: 18 }); return v; };
  C.apeLeg = limb(300, 70, 8); C.apeArm = limb(300, 52, 9);
}
function drawApe(c, x, y, s, o = {}) {
  const w = o.walk || 0; c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = o.alpha ?? 1;
  const bob = -Math.abs(Math.cos(w)) * 12;
  const limb = (img, px, py, a, len) => { c.save(); c.translate(px, py); c.rotate(a); c.drawImage(img, -80, -30); c.fillStyle = '#b07852'; c.beginPath(); c.ellipse(16, len + 6, 40, 16, 0, 0, TAU); c.fill(); c.restore(); };
  limb(C.apeLeg, -10, -300 + bob, Math.sin(w) * .45, 290); limb(C.apeArm, 60, -520 + bob, -Math.sin(w) * .4 + .1, 300);
  c.drawImage(C.ape, -330, -860 + bob);
  limb(C.apeLeg, 20, -300 + bob, -Math.sin(w) * .45, 290); limb(C.apeArm, 80, -520 + bob, Math.sin(w) * .4 + .1, 300);
  c.restore();
}
// ---------- ratón ----------
function buildMouse(fl) {
  const cv0 = mk(700, 360), c = cv0.getContext('2d'); c.translate(330, 320);
  c.strokeStyle = '#e8a0a8'; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(-100, -50); c.bezierCurveTo(-200, -10, -230, -80, -300, -40); c.stroke();
  const M = { grad: [[0, '#ffffff'], [1, '#d8d4dc']], cols: ['#ffffff', '#cfcad6', '#eeeaf2'], alpha: [.35, .75], len: [6, 12], density: 30, angle: 3.0, spread: .6, fringe: ['#ffffff', '#e2dee8', '#c8c2d0'], fringeLen: fl, fringeW: 1.8, light: [.5, .2, .4], shade: .25 };
  furFill(c, ellipsePts(0, -80, 115 + fl * .6, 70 + fl * .5, 26, 0, .03, 3), { ...M, seed: 3 });
  c.fillStyle = '#f2b0b8'; c.beginPath(); c.arc(70, -150, 36, 0, TAU); c.fill(); c.fillStyle = '#e88a98'; c.beginPath(); c.arc(72, -148, 22, 0, TAU); c.fill();
  furFill(c, [[60, -140], [130, -120], [180, -88], [130, -60], [70, -55], [50, -95]], { ...M, seed: 5, fringeLen: Math.min(fl, 10) });
  c.fillStyle = '#1a1a1a'; c.beginPath(); c.arc(126, -104, 8, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(129, -107, 3, 0, TAU); c.fill();
  c.fillStyle = '#ff8a9a'; c.beginPath(); c.arc(180, -88, 9, 0, TAU); c.fill();
  c.strokeStyle = 'rgba(120,120,130,.7)'; c.lineWidth = 2; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(170, -84); c.lineTo(230, -96 + k * 12); c.stroke(); }
  c.fillStyle = '#f2b0b8'; [[-40, 0], [50, 0]].forEach(([fx]) => { c.beginPath(); c.ellipse(fx, -8, 22, 10, 0, 0, TAU); c.fill(); });
  return cv0;
}
function buildCucumber() {
  const cv0 = mk(560, 200), c = cv0.getContext('2d');
  const pts = tubePts(bez([60, 110], [280, 70], [500, 100], 16), 110, 96);
  texFill(c, pts, [[0, '#6fbf4a'], [1, '#2f6a22']], { outline: '#1e4a16', alpha: [.1, .25], len: [10, 30], density: 10, light: [.4, .2, .4] });
  c.fillStyle = 'rgba(220,255,180,.6)'; for (let i = 0; i < 26; i++) { c.beginPath(); c.arc(90 + hash(i) * 380, 70 + hash(i * 2) * 60, 4, 0, TAU); c.fill(); }
  c.strokeStyle = 'rgba(200,255,170,.4)'; c.lineWidth = 8; c.beginPath(); c.moveTo(100, 78); c.quadraticCurveTo(280, 48, 470, 74); c.stroke();
  return cv0;
}
function puff(c, t, t0, x, y, s = 1) { const lt = t - t0; if (lt < 0 || lt > .9) return; c.save(); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU, d = (60 + eOut(lt / .6) * 220) * s, r = (70 + hash(i) * 50) * s * (1 - lt / .9 * .6);
  c.globalAlpha = (1 - lt / .9) * .9; c.fillStyle = '#ffffff'; c.beginPath(); c.arc(x + Math.cos(a) * d, y + Math.sin(a) * d * .8, r, 0, TAU); c.fill(); } c.restore(); }

async function buildExtra() {
  buildBeto(); buildApe();
  C.cat_normal = buildCat('normal'); C.cat_fluffy = buildCat('fluffy'); C.cat_scared = buildCat('scared');
  C.catHead = buildCatHead(8); C.catHeadF = buildCatHead(22);
  C.mouse = [buildMouse(5), buildMouse(14), buildMouse(28)];
  C.cuke = buildCucumber(); C.dots = XCOLS.map(col => tinted(A.dot, col));
}

// ---------- utilidades compartidas con el video 2 ----------
const XCOLS = ['#ff4d5e', '#ffd166', '#4cd97b', '#4cc9f0', '#ff9f43', '#c77dff'];
function drawStar(c, x, y, R, col = '#ffd84a', pts = 5) { c.beginPath(); for (let k = 0; k < pts * 2; k++) { const rr = k % 2 ? R * .45 : R, a = -Math.PI / 2 + k * Math.PI / pts; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); c.fillStyle = col; c.fill(); }
function snow(c, t, n, seed, o = {}) { c.save(); for (let i = 0; i < n; i++) { const sp = .4 + hash(i * 3.7 + seed) * .8, sz = (o.size || 6) * (.4 + hash(i * 1.3 + seed) * 1.2);
  const x = (hash(i + seed) * (W + 200) + Math.sin(t * .8 + i) * 40 + t * (o.wind || 15)) % (W + 200) - 100, y = (hash(i * 2.1 + seed) * (H + 200) + t * 140 * sp) % (H + 200) - 100;
  c.globalAlpha = (o.a || .8) * (.5 + .5 * sp); c.drawImage(A.dot, x - sz * 1.8, y - sz * 1.8, sz * 3.6, sz * 3.6); } c.restore(); }
function bokeh(c, t, n, seed, a = .5) { c.save(); c.globalCompositeOperation = 'lighter'; for (let i = 0; i < n; i++) { const x = hash(i + seed) * W, y = hash(i * 1.9 + seed) * H, s = 30 + hash(i * 4.1) * 70; c.globalAlpha = a * (.35 + .4 * Math.sin(t * .8 + i)); c.drawImage(C.dots[i % C.dots.length], x - s, y - s + Math.sin(t * .5 + i) * 15, s * 2, s * 2); } c.restore(); }
function musicNote(c, x, y, s, col = '#fff') { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.beginPath(); c.ellipse(0, 0, 22, 16, -.4, 0, TAU); c.fill(); c.fillRect(16, -90, 8, 90); c.beginPath(); c.moveTo(24, -90); c.quadraticCurveTo(60, -70, 50, -30); c.quadraticCurveTo(50, -60, 24, -62); c.fill(); c.restore(); }
