// ---------- Escenarios de invierno pintados ----------
const WX = {};
function paintPine(w, h, seed, pal = ['#3a6a5a', '#1e3e3a', '#0e2420'], snowCol = ['#ffffff', '#c8d8ec']) {
  const v = mk(w, h), c = v.getContext('2d'), r = mulberry(seed), cx = w / 2;
  c.fillStyle = '#3a2416'; c.fillRect(cx - 10, h * .82, 20, h * .18);
  const tiers = 5; for (let i = 0; i < tiers; i++) { const u = i / (tiers - 1), top = h * (.04 + u * .17), bot = h * (.3 + u * .17), hw = w * (.16 + u * .3);
    const pts = [[cx, top]]; const n = 7; for (let k = 0; k <= n; k++) { const q = k / n, x = cx + hw - q * hw * 2, y = bot + (k % 2 ? -h * .03 : 0) + (r() - .5) * 6; pts.push([x, y]); }
    c.beginPath(); pts.forEach((p, j) => j ? c.lineTo(...p) : c.moveTo(...p)); c.closePath();
    const g = c.createLinearGradient(cx - hw, 0, cx + hw, 0); g.addColorStop(0, pal[0]); g.addColorStop(.55, pal[1]); g.addColorStop(1, pal[2]); c.fillStyle = g; c.fill();
    c.save(); c.clip(); c.strokeStyle = 'rgba(255,255,255,.08)'; c.lineWidth = 2; for (let k = 0; k < 18; k++) { const x = cx + (r() - .5) * hw * 1.6; c.beginPath(); c.moveTo(x, top + (bot - top) * .3); c.lineTo(x + (x - cx) * .3, bot); c.stroke(); } c.restore();
    // nieve en cada nivel
    c.fillStyle = vgrad(c, top, bot, [[0, snowCol[0]], [1, snowCol[1]]]); c.beginPath(); c.moveTo(cx, top + 2); for (let k = 0; k <= 10; k++) { const q = k / 10, x = cx - hw * .85 + q * hw * 1.7; c.lineTo(x, lerp(top, bot, .55 + Math.abs(q - .5) * .7) - 8 + Math.sin(k * 2.3 + seed) * 8); } c.closePath(); c.globalAlpha = .9; c.fill(); c.globalAlpha = 1;
    for (let k = 0; k < 5; k++) { const x = cx - hw * .8 + r() * hw * 1.6; c.fillStyle = snowCol[0]; c.beginPath(); c.ellipse(x, bot - 6, 18 + r() * 14, 8, 0, 0, TAU); c.fill(); } }
  return v;
}
function paintForestBand(w, h, pal, snow, seed, n = 26, smin = .5, smax = 1) { const v = mk(w, h), c = v.getContext('2d'), r = mulberry(seed); const pine = paintPine(200, 360, seed + 1, pal, snow);
  const list = []; for (let i = 0; i < n; i++) list.push([r() * w, smin + r() * (smax - smin)]); list.sort((a, b) => a[1] - b[1]);
  list.forEach(([x, s]) => c.drawImage(pine, x - 100 * s, h - 360 * s - (1 - s) * 40, 200 * s, 360 * s)); return v; }
function paintSnowField(w, h, pal, seed) { const v = mk(w, h), c = v.getContext('2d'), r = mulberry(seed);
  c.fillStyle = vgrad(c, 0, h, [[0, pal[0]], [1, pal[1]]]); c.fillRect(0, 0, w, h);
  for (let i = 0; i < 26; i++) { const x = r() * w, y = r() * h, rx = 120 + r() * 260, ry = 20 + r() * 40, d = y / h; const g = c.createRadialGradient(x - rx * .2, y - ry * .5, 5, x, y, rx); g.addColorStop(0, 'rgba(255,255,255,.55)'); g.addColorStop(.6, 'rgba(255,255,255,0)'); c.fillStyle = g; c.save(); c.scale(1, ry / rx); c.beginPath(); c.arc(x, y * rx / ry, rx, 0, TAU); c.restore(); c.fill();
    c.fillStyle = pal[2]; c.save(); c.globalAlpha = .14; c.beginPath(); c.ellipse(x + rx * .3, y + ry * .6, rx * .6, ry * .35, 0, 0, TAU); c.fill(); c.restore(); }
  for (let i = 0; i < 700; i++) { const x = r() * w, y = r() * h, s = .8 + r() * 2 * (y / h); c.fillStyle = `rgba(255,255,255,${.4 + r() * .6})`; c.fillRect(x, y, s, s); }
  return v; }
function paintCabin() { const v = mk(760, 680), c = v.getContext('2d'); c.translate(380, 660);
  // troncos
  for (let k = 0; k < 9; k++) { const y = -40 - k * 44; c.fillStyle = vgrad(c, y - 22, y + 22, [[0, '#9a6a40'], [.5, '#7a4e2c'], [1, '#4a2c16']]); rrect(c, -300, y - 22, 600, 44, 20); c.fill(); c.fillStyle = 'rgba(255,220,170,.15)'; c.fillRect(-290, y - 18, 580, 6);
    [-310, 296].forEach(ex => { c.fillStyle = '#b8844e'; c.beginPath(); c.ellipse(ex + 7, y, 14, 20, 0, 0, TAU); c.fill(); c.strokeStyle = 'rgba(80,40,10,.5)'; c.lineWidth = 2; c.beginPath(); c.ellipse(ex + 7, y, 7, 11, 0, 0, TAU); c.stroke(); }); }
  // techo nevado
  c.fillStyle = '#3a2418'; c.beginPath(); c.moveTo(-360, -420); c.lineTo(0, -640); c.lineTo(360, -420); c.fill();
  c.fillStyle = vgrad(c, -660, -400, [[0, '#ffffff'], [1, '#c8d8ec']]); c.beginPath(); c.moveTo(-385, -415); c.lineTo(0, -660); c.lineTo(385, -415); c.quadraticCurveTo(340, -390, 300, -405); c.quadraticCurveTo(200, -380, 120, -400); c.quadraticCurveTo(0, -385, -120, -402); c.quadraticCurveTo(-240, -380, -340, -400); c.closePath(); c.fill();
  c.fillStyle = 'rgba(210,235,255,.95)'; for (let k = 0; k < 12; k++) { const x = -330 + k * 58; c.beginPath(); c.moveTo(x - 8, -402); c.lineTo(x + 8, -402); c.lineTo(x, -402 + 20 + hash(k) * 40); c.fill(); }
  // chimenea
  c.fillStyle = vgrad(c, -640, -460, [[0, '#8a7a70'], [1, '#5a4a40']]); c.fillRect(160, -640, 70, 190); c.fillStyle = '#fff'; rrect(c, 150, -660, 90, 30, 14); c.fill();
  // ventanas cálidas
  [[-200, -260], [80, -260]].forEach(([x, y]) => { c.fillStyle = '#2a1810'; c.fillRect(x - 8, y - 8, 136, 126); const g = c.createRadialGradient(x + 60, y + 55, 5, x + 60, y + 55, 90); g.addColorStop(0, '#fff2c0'); g.addColorStop(1, '#f2a040'); c.fillStyle = g; c.fillRect(x, y, 120, 110); c.fillStyle = '#2a1810'; c.fillRect(x + 56, y, 8, 110); c.fillRect(x, y + 51, 120, 8); c.fillStyle = '#fff'; rrect(c, x - 14, y + 108, 148, 18, 8); c.fill(); });
  c.fillStyle = vgrad(c, -230, -40, [[0, '#5a3420'], [1, '#3a2010']]); c.fillRect(-60, -230, 0, 0);
  return v; }
function paintCar() { const v = mk(760, 400), c = v.getContext('2d'); c.translate(380, 300);
  c.fillStyle = vgrad(c, -180, 0, [[0, '#5a8ad8'], [.5, '#2a5aa8'], [1, '#163a78']]); rrect(c, -330, -170, 660, 150, 40); c.fill();
  c.fillStyle = vgrad(c, -300, -160, [[0, '#6a9ae8'], [1, '#2a5aa8']]); c.beginPath(); c.moveTo(-200, -168); c.lineTo(-140, -290); c.lineTo(150, -290); c.lineTo(230, -168); c.fill();
  [[-180, -290, -10, -175], [10, -290, 160, -175]].forEach(([a, b, d, e], i) => { const g = c.createLinearGradient(a, b, d, e); g.addColorStop(0, '#a8d8f8'); g.addColorStop(1, '#3a5a8a'); c.fillStyle = g; c.beginPath(); i ? (c.moveTo(10, -175), c.lineTo(10, -278), c.lineTo(140, -278), c.lineTo(200, -175)) : (c.moveTo(-170, -175), c.lineTo(-130, -278), c.lineTo(-10, -278), c.lineTo(-10, -175)); c.fill(); c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); i ? (c.moveTo(30, -270), c.lineTo(70, -270), c.lineTo(40, -185), c.lineTo(20, -185)) : (c.moveTo(-120, -270), c.lineTo(-90, -270), c.lineTo(-130, -185), c.lineTo(-155, -185)); c.fill(); });
  c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(-320, -150, 640, 10);
  c.fillStyle = vgrad(c, -70, -40, [[0, '#f4f6f8'], [1, '#9aa4b0']]); rrect(c, -345, -70, 690, 34, 14); c.fill();
  c.fillStyle = '#fff6c0'; rrect(c, 290, -150, 44, 36, 10); c.fill(); c.fillStyle = '#e8343f'; rrect(c, -336, -150, 30, 36, 8); c.fill();
  [[-200, -20], [200, -20]].forEach(([wx, wy]) => { c.fillStyle = '#121216'; c.beginPath(); c.arc(wx, wy, 64, 0, TAU); c.fill(); c.fillStyle = vgrad(c, wy - 30, wy + 30, [[0, '#d8dce4'], [1, '#6a707a']]); c.beginPath(); c.arc(wx, wy, 30, 0, TAU); c.fill(); });
  c.fillStyle = vgrad(c, -310, -280, [[0, '#ffffff'], [1, '#d8e4f4']]); c.beginPath(); c.ellipse(5, -292, 160, 26, 0, Math.PI, TAU); c.fill(); c.beginPath(); c.ellipse(-250, -172, 90, 18, 0, Math.PI, TAU); c.fill(); c.beginPath(); c.ellipse(270, -172, 80, 16, 0, Math.PI, TAU); c.fill();
  return v; }
function aurora(c, t, a = .5) { c.save(); c.globalCompositeOperation = 'lighter'; for (let k = 0; k < 3; k++) { const col = ['80,255,180', '80,200,255', '180,120,255'][k]; c.globalAlpha = a * (.6 - k * .15);
  for (let x = -200; x < W + 200; x += 14) { const y = 260 + k * 70 + Math.sin(x * .004 + t * .4 + k) * 90 + Math.sin(x * .011 + t * .3) * 30; const g = c.createLinearGradient(0, y - 220, 0, y + 40); g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(.75, `rgba(${col},.18)`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(x, y - 220, 16, 260); } } c.restore(); }
function bigFlakes(c, t, n = 14, seed = 5, a = .7) { c.save(); for (let i = 0; i < n; i++) { const sp = .6 + hash(i * 3 + seed) * .8, x = (hash(i + seed) * (W + 300) + Math.sin(t * .6 + i) * 60) % (W + 300) - 150, y = (hash(i * 2 + seed) * (H + 300) + t * 220 * sp) % (H + 300) - 150, s = 18 + hash(i * 5) * 26;
  c.globalAlpha = a; c.filter = 'blur(6px)'; c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y, s, 0, TAU); c.fill(); } c.restore(); }
function winterScene(c, t, mode, o = {}) { // mode: night | dawn | day
  const W2 = WX[mode];
  sky(c, W2.sky, -300, 1300);
  if (mode !== 'day') { stars(c, t, 90, 3, 900, mode === 'night' ? .85 : .35); aurora(c, t, mode === 'night' ? .55 : .2); }
  const mx = o.moonX ?? 830, my = o.moonY ?? 330;
  if (mode === 'day') { glow(c, mx, my, 600, '255,250,220', .6); glow(c, mx, my, 160, '255,255,240', 1); c.fillStyle = '#fffef4'; c.beginPath(); c.arc(mx, my, 70, 0, TAU); c.fill(); godRays(c, mx, my, t, '255,250,220', .08); }
  else { glow(c, mx, my, 340, mode === 'dawn' ? '255,210,170' : '200,220,255', .45); c.fillStyle = mode === 'dawn' ? '#fff0d8' : '#eef2ff'; c.beginPath(); c.arc(mx, my, 54, 0, TAU); c.fill(); c.fillStyle = 'rgba(160,170,200,.35)'; c.beginPath(); c.arc(mx - 16, my - 10, 12, 0, TAU); c.arc(mx + 18, my + 14, 8, 0, TAU); c.fill(); }
  c.drawImage(W2.mount, -210, 760, 1500, 520); c.drawImage(W2.forestFar, -210, 860, 1500, 420);
  const hz = c.createLinearGradient(0, 1000, 0, 1300); hz.addColorStop(0, `rgba(${W2.haze},0)`); hz.addColorStop(.6, `rgba(${W2.haze},.4)`); hz.addColorStop(1, `rgba(${W2.haze},0)`); c.fillStyle = hz; c.fillRect(-300, 1000, W + 600, 300);
  if (o.cabin !== false) { const cx = o.cabinX ?? 820, cy = o.cabinY ?? 1290, cs = o.cabinS ?? .62; glow(c, cx, cy - 120, 360, '255,190,110', .35 * (o.lit ?? 1)); c.drawImage(W2.cabin, cx - 380 * cs, cy - 660 * cs, 760 * cs, 680 * cs);
    c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = .25 * (o.lit ?? 1); c.fillStyle = '#ffc070'; c.beginPath(); c.moveTo(cx - 200 * cs, cy); c.lineTo(cx + 200 * cs, cy); c.lineTo(cx + 360 * cs, cy + 160); c.lineTo(cx - 360 * cs, cy + 160); c.fill(); c.restore();
    for (let k = 0; k < 4; k++) { const ph = (t * .25 + k / 4) % 1; c.save(); c.globalAlpha = (1 - ph) * .4; c.drawImage(A.dot, cx + 120 * cs + ph * 60 - 40 - ph * 40, cy - 660 * cs - ph * 260 - 40 - ph * 40, 80 + ph * 80, 80 + ph * 80); c.restore(); } }
  c.drawImage(W2.forestNear, -210, 990, 1500, 360);
  c.drawImage(W2.snow, -210, 1270, 1500, 900);
  if (o.posts !== false) for (let k = 0; k < 7; k++) { const x = -60 + k * 190, y = 1360; c.fillStyle = vgrad(c, y - 130, y, [[0, W2.post[0]], [1, W2.post[1]]]); rrect(c, x, y - 130, 22, 136, 6); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.ellipse(x + 11, y - 132, 18, 9, 0, 0, TAU); c.fill(); }
}
function buildWinter() {
  const P = {
    night: { sky: [[0, '#040a1e'], [.55, '#10285a'], [.9, '#2a5a8a']], mount: ['#2a3e6a', '#5a7aa8'], pine: ['#1e3a52', '#10223a', '#081422'], snowTree: ['#c8daf0', '#6a8ab8'], snow: ['#9ab4dc', '#4a6a9a', '#2a4a7a'], haze: '120,160,220', post: ['#3a3040', '#1a1420'], filter: 'brightness(.55) saturate(.8) hue-rotate(10deg)' },
    dawn: { sky: [[0, '#2a3a7a'], [.5, '#c88aa8'], [.85, '#ffd0a8']], mount: ['#7a6a9a', '#c8a8c8'], pine: ['#3a5a5a', '#24403e', '#122826'], snowTree: ['#fff4ec', '#c8b0c8'], snow: ['#fff0ec', '#c8b8d8', '#a090c0'], haze: '255,210,200', post: ['#6a4a40', '#3a2420'], filter: 'sepia(.2) brightness(.95)' },
    day: { sky: [[0, '#3a8ae0'], [.55, '#9ad0f4'], [.9, '#eaf6fc']], mount: ['#8aa8d0', '#d8e8f8'], pine: ['#3a7a5a', '#245a40', '#123a28'], snowTree: ['#ffffff', '#c8daf0'], snow: ['#ffffff', '#c8daf0', '#9ab8e0'], haze: '230,242,255', post: ['#8a6a50', '#4a3424'], filter: 'none' },
  };
  const cabin = paintCabin();
  for (const [k, p] of Object.entries(P)) {
    const mt = mk(1500, 520), m = mt.getContext('2d'); m.fillStyle = vgrad(m, 0, 520, [[0, p.mount[1]], [1, p.mount[0]]]); m.beginPath(); m.moveTo(0, 520); [[0, 300], [180, 120], [330, 260], [520, 60], [700, 240], [900, 100], [1100, 280], [1300, 150], [1500, 260]].forEach(q => m.lineTo(...q)); m.lineTo(1500, 520); m.fill();
    m.fillStyle = 'rgba(255,255,255,.75)'; [[180, 120], [520, 60], [900, 100], [1300, 150]].forEach(([x, y]) => { m.beginPath(); m.moveTo(x, y); m.lineTo(x - 60, y + 70); m.lineTo(x - 20, y + 60); m.lineTo(x, y + 80); m.lineTo(x + 25, y + 58); m.lineTo(x + 60, y + 70); m.fill(); });
    WX[k] = { ...p, mount: mt, forestFar: paintForestBand(1500, 420, p.pine.map(cc => cc), p.snowTree, 11, 40, .35, .6), forestNear: paintForestBand(1500, 360, p.pine, p.snowTree, 21, 14, .7, 1.0), snow: paintSnowField(1500, 900, p.snow, 3), cabin: tintCopy(cabin, p.filter) };
    if (k === 'night') { const ctx2 = WX[k].forestFar.getContext('2d'); ctx2.globalCompositeOperation = 'source-atop'; ctx2.fillStyle = 'rgba(40,70,130,.45)'; ctx2.fillRect(0, 0, 1500, 420); }
  }
  WX.car = paintCar(); WX.carNight = tintCopy(WX.car, 'brightness(.6) saturate(.8)');
}
function hospital(c, t, o = {}) {
  c.fillStyle = vgrad(c, -300, 1500, [[0, '#d8eeea'], [1, '#a8d0cc']]); c.fillRect(-400, -400, W + 800, H + 800);
  c.fillStyle = vgrad(c, 1100, 1500, [[0, '#9ac4c0'], [1, '#7aa8a4']]); c.fillRect(-300, 1100, W + 600, 400); c.fillStyle = '#e8f4f2'; c.fillRect(-300, 1090, W + 600, 16);
  // ventana con nieve afuera
  c.fillStyle = '#eef6f6'; rrect(c, 60, 360, 380, 520, 16); c.fill(); c.save(); c.beginPath(); c.rect(80, 380, 340, 480); c.clip(); c.drawImage(WX.day.forestFar, -100, 520, 800, 224); c.fillStyle = vgrad(c, 380, 640, [[0, '#9ad0f4'], [1, '#eaf6fc']]); c.globalCompositeOperation = 'destination-over'; c.fillRect(80, 380, 340, 480); c.globalCompositeOperation = 'source-over'; c.fillStyle = '#fff'; c.fillRect(80, 720, 340, 140);
    for (let i = 0; i < 30; i++) { c.fillStyle = 'rgba(255,255,255,.9)'; c.beginPath(); c.arc(80 + hash(i) * 340, 380 + ((hash(i * 2) * 480 + t * 60) % 480), 3, 0, TAU); c.fill(); } c.restore();
  c.fillStyle = '#eef6f6'; c.fillRect(242, 380, 14, 480); c.fillStyle = vgrad(c, 340, 900, [[0, '#f0a8b0'], [1, '#c87888']]); c.beginPath(); c.moveTo(40, 340); c.quadraticCurveTo(110, 600, 60, 900); c.lineTo(20, 900); c.lineTo(20, 340); c.fill();
  glow(c, 250, 620, 380, '255,250,230', .3);
  // monitor + suero
  c.fillStyle = '#1a1c22'; rrect(c, 760, 560, 260, 190, 18); c.fill(); c.strokeStyle = '#4cd97b'; c.lineWidth = 5; c.beginPath(); for (let x = 0; x < 230; x += 4) { const ph = (x / 230 * 3 + t * 1.2) % 1; c.lineTo(775 + x, 660 - (ph > .45 && ph < .5 ? 55 : ph > .5 && ph < .55 ? -32 : 0)); } c.stroke(); c.fillStyle = '#4cd97b'; c.font = '900 30px Nunito'; c.fillText('♥ ' + (o.bpm || 62), 780, 600);
  c.strokeStyle = '#9aa4b0'; c.lineWidth = 8; c.beginPath(); c.moveTo(1000, 1500); c.lineTo(1000, 380); c.lineTo(940, 380); c.stroke(); c.fillStyle = 'rgba(220,240,255,.8)'; rrect(c, 905, 390, 70, 110, 16); c.fill(); c.strokeStyle = 'rgba(150,190,220,.8)'; c.lineWidth = 3; c.stroke(); c.fillStyle = 'rgba(140,200,240,.6)'; c.fillRect(912, 440, 56, 54);
  c.fillStyle = vgrad(c, 1500, 2100, [[0, '#8ab4b0'], [1, '#5a8480']]); c.fillRect(-300, 1500, W + 600, 700);
}

function snow(c, t, n, seed, o = {}) { c.save(); for (let i = 0; i < n; i++) { const sp = .4 + hash(i * 3.7 + seed) * .8, sz = (o.size || 6) * (.4 + hash(i * 1.3 + seed) * 1.2);
  const x = (hash(i + seed) * (W + 200) + Math.sin(t * .8 + i) * 40 + t * (o.wind || 15)) % (W + 200) - 100, y = (hash(i * 2.1 + seed) * (H + 200) + t * 140 * sp) % (H + 200) - 100;
  c.globalAlpha = (o.a || .8) * (.5 + .5 * sp); c.drawImage(A.dot, x - sz * 1.8, y - sz * 1.8, sz * 3.6, sz * 3.6); } c.restore(); }
function blizzard(c, t, n = 160, a = .8) { c.save(); c.strokeStyle = `rgba(255,255,255,${a})`; c.lineCap = 'round'; for (let i = 0; i < n; i++) { const sp = .5 + hash(i * 3) * .8, x = ((hash(i) * 1600 - t * 700 * sp) % 1600 + 1600) % 1600 - 260, y = ((hash(i * 2) * 2300 + t * 500 * sp) % 2300) - 200; c.lineWidth = 2 + hash(i * 5) * 4; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 26 * sp, y - 18 * sp); c.stroke(); } c.restore(); }
function drawStar(c, x, y, R, col = '#ffd84a', pts = 5) { c.beginPath(); for (let k = 0; k < pts * 2; k++) { const rr = k % 2 ? R * .45 : R, a = -Math.PI / 2 + k * Math.PI / pts; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); c.fillStyle = col; c.fill(); }
