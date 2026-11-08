// ---------- assets: el perro de dos cabezas ----------
const G = {};
const DOG = { grad: [[0, '#d8a060'], [1, '#9a6430']], cols: ['#f0c088', '#7a4a20', '#c48a4a', '#5a3414'], alpha: [.3, .7], len: [9, 18], density: 26, spread: .5, fringe: ['#d8a060', '#9a6430', '#f0d0a0'], fringeLen: 14, light: [.5, .2, .35], shade: .3 };
const PUP = { grad: [[0, '#fff2dc'], [1, '#e2c49a']], cols: ['#ffffff', '#d8b88a', '#f2dcc0'], alpha: [.3, .7], len: [6, 12], density: 30, spread: .9, fringe: ['#fff2dc', '#e2c49a', '#ffffff'], fringeLen: 12, light: [.5, .25, .4], shade: .2 };
const saddle = (c, b) => { c.save(); c.fillStyle = 'rgba(40,24,10,.75)'; c.beginPath(); c.ellipse((b[0] + b[2]) / 2 - 20, b[1] + 10, (b[2] - b[0]) * .42, (b[3] - b[1]) * .45, 0, 0, TAU); c.fill(); c.restore(); };
function buildDog() {
  const v = mk(1000, 800), c = v.getContext('2d'); c.translate(480, 720);
  furFill(c, tubePts(bez([-210, -300], [-330, -300], [-340, -150], 14), 70, 40), { ...DOG, angle: 1.9, seed: 3, fringeLen: 20 });
  furFill(c, ellipsePts(-10, -270, 240, 115, 30, 0, .03, 4), { ...DOG, angle: 3.0, seed: 5, pre: saddle });
  furFill(c, tubePts(bez([140, -300], [210, -380], [250, -450], 10), 150, 120), { ...DOG, angle: 1.4, seed: 7 });
  G.dogBody = v;
  const h = mk(420, 360), d = h.getContext('2d'); d.translate(190, 200);
  [[-50, -100, -.25], [20, -110, .15]].forEach(([x, y, a], i) => { d.save(); d.translate(x, y); d.rotate(a); furFill(d, [[-30, 50], [0, -60], [34, 50]], { ...DOG, density: 20, fringeLen: 8, seed: 11 + i }); d.fillStyle = '#5a3414'; d.beginPath(); d.moveTo(-14, 40); d.lineTo(0, -30); d.lineTo(16, 40); d.fill(); d.restore(); });
  furFill(d, ellipsePts(-10, 0, 100, 88, 26, 0, .04, 9), { ...DOG, angle: 2.6, spread: 1, seed: 9, pre: (c, b) => { c.fillStyle = 'rgba(40,24,10,.6)'; c.beginPath(); c.ellipse(-30, -50, 80, 40, -.2, 0, TAU); c.fill(); } });
  furFill(d, [[40, -30], [150, -10], [170, 30], [140, 60], [50, 60], [20, 20]], { ...DOG, grad: [[0, '#e8b878'], [1, '#b07a40']], seed: 13, fringeLen: 8 });
  d.fillStyle = '#1a1210'; d.beginPath(); d.ellipse(162, 10, 20, 16, 0, 0, TAU); d.fill(); d.fillStyle = 'rgba(255,255,255,.5)'; d.beginPath(); d.arc(156, 4, 5, 0, TAU); d.fill();
  d.strokeStyle = '#3a2410'; d.lineWidth = 5; d.lineCap = 'round'; d.beginPath(); d.moveTo(160, 28); d.lineTo(158, 48); d.quadraticCurveTo(130, 62, 100, 50); d.stroke();
  G.dogHead = h;
  // cachorro: cabeza + hombros + patitas
  const p = mk(400, 460), e = p.getContext('2d'); e.translate(200, 300);
  [[-40, 40, .3], [40, 40, -.2]].forEach(([x, y, a], i) => { e.save(); e.translate(x, y); e.rotate(a); furFill(e, tubePts([[0, 0], [0, 60], [0, 120]], 46, 40), { ...PUP, seed: 21 + i, fringeLen: 8 }); e.fillStyle = '#f2b0a8'; e.beginPath(); e.ellipse(0, 122, 20, 12, 0, 0, TAU); e.fill(); e.restore(); });
  furFill(e, ellipsePts(0, 30, 95, 70, 22, 0, .05, 23), { ...PUP, seed: 23 });
  [[-72, -70, .4], [72, -70, -.4]].forEach(([x, y, a], i) => { e.save(); e.translate(x, y); e.rotate(a); furFill(e, ellipsePts(0, 30, 30, 62, 16, 0, .05, 30 + i), { ...PUP, grad: [[0, '#d8a870'], [1, '#a87840']], seed: 30 + i, fringeLen: 8 }); e.restore(); });
  furFill(e, ellipsePts(0, -80, 88, 80, 26, 0, .04, 25), { ...PUP, seed: 25 });
  furFill(e, ellipsePts(0, -45, 44, 32, 16), { ...PUP, grad: [[0, '#ffffff'], [1, '#f2e2cc']], seed: 26, fringeLen: 4 });
  e.fillStyle = '#2a1a14'; e.beginPath(); e.ellipse(0, -60, 15, 11, 0, 0, TAU); e.fill(); e.fillStyle = 'rgba(255,255,255,.5)'; e.beginPath(); e.arc(-5, -64, 4, 0, TAU); e.fill();
  G.pup = p;
}
// (x,y) suelo bajo el perro. o: { pup: bool, t, blink, pupBlink, look, pupLook, lick, eat, walk, stitches }
function drawDog(c, x, y, s, o = {}) {
  const t = o.t || 0; c.save(); c.translate(x, y); c.scale(s * (o.flip ? -1 : 1), s); c.globalAlpha = o.alpha ?? 1;
  const g = c.createRadialGradient(0, 0, 0, 0, 0, 300); g.addColorStop(0, 'rgba(20,10,0,.3)'); g.addColorStop(1, 'rgba(20,10,0,0)'); c.save(); c.scale(1, .14); c.fillStyle = g; c.fillRect(-320, -320, 640, 640); c.restore();
  [[-170, 0], [-120, 1], [110, 0], [160, 1]].forEach(([lx, k]) => { const sw = o.walk != null ? Math.sin(o.walk + k * Math.PI) * 16 : 0; c.strokeStyle = '#7a4a20'; c.lineWidth = 50; c.lineCap = 'round'; c.beginPath(); c.moveTo(lx, -200); c.lineTo(lx + sw, -20); c.stroke(); c.strokeStyle = k ? '#c48a4a' : '#d8a060'; c.lineWidth = 42; c.stroke(); c.strokeStyle = 'rgba(90,50,20,.45)'; c.lineWidth = 3; for (let q = 0; q < 12; q++) { const yy = -190 + q * 14, xx = lx + sw * (yy + 200) / 180; c.beginPath(); c.moveTo(xx - 18 + (q % 3) * 12, yy); c.lineTo(xx - 14 + (q % 3) * 12, yy + 12); c.stroke(); } c.fillStyle = '#e8c090'; c.beginPath(); c.ellipse(lx + sw + 8, -14, 30, 16, 0, 0, TAU); c.fill(); });
  c.drawImage(G.dogBody, -480, -720);
  // cabeza del perro grande
  const eat = o.eat ? Math.max(0, Math.sin(t * 6)) * .25 : 0;
  c.save(); c.translate(275, -470); c.rotate(eat + (o.headRot || 0)); c.drawImage(G.dogHead, -190, -200);
  eyeDot(c, 70, -12, 13, o.blink, o.look); c.restore();
  if (o.pup) { const pe = o.pupEat ? Math.max(0, Math.sin(t * 6 + 1)) * .2 : 0; c.save(); c.translate(130, -470); c.rotate(-.15 + pe + (o.pupRot || 0)); c.scale(.85, .85);
    c.drawImage(G.pup, -200, -300);
    [-30, 30].forEach(ex => eyeDot(c, ex, -100, 14, o.pupBlink, o.pupLook));
    c.fillStyle = '#5a1a1a'; c.beginPath(); c.ellipse(0, -28, 14, o.lick ? 12 : 6, 0, 0, TAU); c.fill();
    if (o.lick) { const lk = Math.max(0, Math.sin(t * 10)); c.fillStyle = '#ff7a8a'; c.beginPath(); c.ellipse(0, -14 + lk * 18, 14, 18 + lk * 10, 0, 0, TAU); c.fill(); }
    c.restore();
    if (o.stitches !== false) { c.strokeStyle = '#3a1a10'; c.lineWidth = 4; for (let k = 0; k < 7; k++) { const a = -.4 + k * .17, px = 130 + Math.cos(a) * 80, py = -420 + Math.sin(a) * 26; c.beginPath(); c.moveTo(px - 8, py - 10); c.lineTo(px + 8, py + 10); c.stroke(); } c.strokeStyle = 'rgba(200,40,40,.5)'; c.lineWidth = 3; c.beginPath(); c.ellipse(130, -420, 80, 26, 0, -.6, .9); c.stroke(); }
  }
  c.restore();
}
function eyeDot(c, x, y, r, blink, look) { const bl = blink != null ? clamp(Math.abs(blink) * 8) : 1, lk = look || [0, 0]; c.fillStyle = '#fff'; c.beginPath(); c.ellipse(x, y, r * 1.3, r * 1.4 * Math.max(.08, bl), 0, 0, TAU); c.fill(); if (bl > .3) { c.fillStyle = '#2a1608'; c.beginPath(); c.arc(x + lk[0] * r * .5, y + lk[1] * r * .5, r * .85, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(x + lk[0] * r * .5 + r * .3, y + lk[1] * r * .5 - r * .35, r * .3, 0, TAU); c.fill(); } }
// cirujano (base de Beto + bata, gorro, cubrebocas y lentes)
function drawSurgeon(c, x, y, s, o = {}) {
  drawBeto(c, x, y, s, { ...o, expr: o.expr || 'smile', longSleeve: true, sleeve: '#f4f6f8', sleeveD: '#aab4c0', prop: (c, P) => {
    c.fillStyle = '#f4f6f8'; c.strokeStyle = '#aab4c0'; c.lineWidth = 6; c.beginPath(); c.moveTo(-150, -560); c.lineTo(150, -560); c.lineTo(165, -40); c.lineTo(-165, -40); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = '#c8d0d8'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, -540); c.lineTo(0, -60); c.stroke(); c.fillStyle = '#9aa4b0'; [-460, -360, -260].forEach(yy => { c.beginPath(); c.arc(16, yy, 7, 0, TAU); c.fill(); });
    c.fillStyle = '#e8343f'; rrect(c, 60, -470, 50, 12, 4); c.fill(); c.fillStyle = '#4c7bf0'; rrect(c, 80, -480, 12, 70, 4); c.fill();
    // gorro, cubrebocas, lentes
    const hy = -700; c.fillStyle = '#5ab8a8'; c.beginPath(); c.ellipse(0, hy - 80, 130, 75, 0, Math.PI, TAU); c.fill(); c.fillRect(-130, hy - 82, 260, 28); c.fillStyle = 'rgba(255,255,255,.2)'; c.fillRect(-120, hy - 80, 240, 6);
    c.fillStyle = '#cfe8f0'; c.beginPath(); c.moveTo(-90, hy + 20); c.quadraticCurveTo(0, hy + 10, 90, hy + 20); c.lineTo(80, hy + 100); c.quadraticCurveTo(0, hy + 130, -80, hy + 100); c.closePath(); c.fill(); c.strokeStyle = '#8ab0c0'; c.lineWidth = 3; c.stroke();
    c.strokeStyle = 'rgba(120,150,170,.6)'; c.lineWidth = 3; [hy + 50, hy + 75].forEach(yy => { c.beginPath(); c.moveTo(-70, yy); c.lineTo(70, yy); c.stroke(); }); c.strokeStyle = '#cfe8f0'; c.lineWidth = 4; c.beginPath(); c.moveTo(-90, hy + 30); c.lineTo(-110, hy); c.moveTo(90, hy + 30); c.lineTo(110, hy); c.stroke();
    c.strokeStyle = '#2a2a30'; c.lineWidth = 7; [-42, 42].forEach(ex => { c.beginPath(); c.arc(ex, hy - 5, 32, 0, TAU); c.stroke(); }); c.beginPath(); c.moveTo(-10, hy - 8); c.lineTo(10, hy - 8); c.stroke();
    c.fillStyle = 'rgba(200,230,255,.18)'; [-42, 42].forEach(ex => { c.beginPath(); c.arc(ex, hy - 5, 30, 0, TAU); c.fill(); });
    if (o.prop2) o.prop2(c, P);
  } });
}
function oldLab(c, t) {
  c.fillStyle = vgrad(c, -300, 1500, [[0, '#4a3e34'], [1, '#6a5a48']]); c.fillRect(-400, -400, W + 800, H + 800);
  for (let x = -300; x < W + 300; x += 140) { c.fillStyle = 'rgba(255,230,190,.04)'; c.fillRect(x, -300, 70, 1800); }
  // repisas con frascos
  [520, 780].forEach((y, r) => { c.fillStyle = '#3a2a1c'; c.fillRect(-100, y, W + 200, 20); for (let i = 0; i < 8; i++) { const x = 40 + i * 130 + r * 60, h = 90 + hash(i + r * 9) * 70, col = ['120,200,140', '240,200,120', '160,190,240', '230,140,120'][(i + r) % 4];
    c.fillStyle = 'rgba(220,235,240,.35)'; rrect(c, x, y - h, 70, h, 12); c.fill(); c.fillStyle = `rgba(${col},.7)`; rrect(c, x + 6, y - h * .6, 58, h * .6 - 4, 8); c.fill(); c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 3; rrect(c, x, y - h, 70, h, 12); c.stroke(); c.fillStyle = '#5a4030'; c.fillRect(x + 16, y - h - 16, 38, 18); } });
  // lámpara colgante
  c.strokeStyle = '#1a1410'; c.lineWidth = 6; c.beginPath(); c.moveTo(540, -300); c.lineTo(540, 560); c.stroke(); c.fillStyle = '#2a4a3a'; c.beginPath(); c.moveTo(440, 640); c.lineTo(640, 640); c.lineTo(580, 560); c.lineTo(500, 560); c.fill(); c.fillStyle = '#ffe8b0'; c.beginPath(); c.ellipse(540, 640, 90, 14, 0, 0, TAU); c.fill();
  glow(c, 540, 900, 650, '255,220,150', .55); c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = .14; c.fillStyle = '#ffe8b0'; c.beginPath(); c.moveTo(450, 640); c.lineTo(630, 640); c.lineTo(980, 1800); c.lineTo(100, 1800); c.fill(); c.restore();
  // piso de mosaico viejo (sepia)
  c.fillStyle = vgrad(c, 1500, 2200, [[0, '#7a6a58'], [1, '#4a3e32']]); c.fillRect(-300, 1500, W + 600, 900); c.strokeStyle = 'rgba(30,20,10,.25)'; c.lineWidth = 3; for (let x = -600; x < 1700; x += 120) { c.beginPath(); c.moveTo(540 + (x - 540) * .8, 1500); c.lineTo(540 + (x - 540) * 1.6, 2000); c.stroke(); } for (let y = 1540; y < 2000; y += 60 + (y - 1500) * .2) { c.beginPath(); c.moveTo(-300, y); c.lineTo(W + 300, y); c.stroke(); }
}
function diagramBG(c, t) { const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1300); g.addColorStop(0, '#1b3b5e'); g.addColorStop(1, '#0a1626'); c.fillStyle = g; c.fillRect(-300, -300, W + 600, H + 600);
  c.strokeStyle = 'rgba(140,200,255,.07)'; c.lineWidth = 2; for (let x = -300; x < W + 300; x += 60) { c.beginPath(); c.moveTo(x, -300); c.lineTo(x, H + 300); c.stroke(); } for (let y = -300; y < H + 300; y += 60) { c.beginPath(); c.moveTo(-300, y); c.lineTo(W + 300, y); c.stroke(); } }
function newspaper(c, x, y, s, rot, head, sub) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 30; c.fillStyle = '#efe6d2'; c.fillRect(-300, -380, 600, 760); c.shadowBlur = 0;
  c.fillStyle = '#2a2420'; c.font = '900 38px Nunito'; c.textAlign = 'center'; c.fillText('EL DIARIO · 1959', 0, -320); c.fillRect(-270, -300, 540, 4);
  c.font = '900 86px Nunito'; c.fillStyle = '#b81a1a'; c.fillText(head, 0, -200); c.font = '800 36px Nunito'; c.fillStyle = '#2a2420'; c.fillText(sub, 0, -140);
  c.fillStyle = '#8a8070'; c.fillRect(-270, -110, 300, 220); c.fillStyle = '#5a5248'; c.beginPath(); c.ellipse(-120, 20, 90, 50, 0, 0, TAU); c.fill(); c.beginPath(); c.arc(-60, -40, 30, 0, TAU); c.fill(); c.beginPath(); c.arc(-150, -50, 24, 0, TAU); c.fill();
  c.fillStyle = 'rgba(40,36,32,.45)'; for (let k = 0; k < 9; k++) c.fillRect(50, -100 + k * 24, 220, 10); for (let k = 0; k < 8; k++) c.fillRect(-270, 140 + k * 26, 540, 10);
  c.restore(); }
const _be3c = buildExtra; buildExtra = async () => { await _be3c(); buildDog(); };
