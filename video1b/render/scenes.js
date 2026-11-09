// ---------- El pollo sin cabeza — versión HD ----------
END = 57.0;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
const wt = i => WORDS[i].s;

const PALS = {
  day: { sky: [[0, '#3a7ad8'], [.5, '#8ec4f0'], [.8, '#dff0fa']], far: ['#7a8aa8', '#a8b4cc'], mid: ['#4a7a4a', '#7aa86a'], near: ['#4a8a3a', '#7ab45a'], haze: '230,240,250', sun: '255,245,210',
    grass: { far: '#8ab84a', mid: '#5f9a32', near: '#3a7a22', blades: ['#9ccf5a', '#6aa838', '#4a8a2a', '#b8dc78', '#3a6a1a'], flowers: ['#ffffff', '#ffe27a', '#f4a0c8'] }, filter: 'none' },
  golden: { sky: [[0, '#5a7ac8'], [.45, '#e8b08a'], [.8, '#ffe0a8']], far: ['#a08090', '#d0a8a8'], mid: ['#7a7a4a', '#b0a060'], near: ['#7a8a3a', '#b8a858'], haze: '255,225,180', sun: '255,220,160',
    grass: { far: '#b0b050', mid: '#88982e', near: '#5a6a20', blades: ['#d8cc6a', '#a0a838', '#6a7a24', '#e8dc8a', '#4a5a18'], flowers: ['#ffffff', '#ffd84a', '#ff9a6a'] }, filter: 'sepia(.35) saturate(1.2) brightness(.95)' },
  sunset: { sky: [[0, '#241640'], [.42, '#7a3468'], [.68, '#ef7a5c'], [.85, '#ffc07a']], far: ['#5a3a62', '#8a4a72'], mid: ['#3a344a', '#6a4a62'], near: ['#4a4a3a', '#7a6248'], haze: '255,170,140', sun: '255,190,140',
    grass: { far: '#8a7a48', mid: '#5a5a2e', near: '#34381c', blades: ['#a89858', '#6a6a30', '#4a4a20', '#c8a870', '#2a2a14'], flowers: ['#ffe0c8', '#ffb06a'] }, filter: 'sepia(.4) hue-rotate(-20deg) saturate(1.1) brightness(.75)' },
};
async function buildExtra() {
  buildHen('white'); buildHen('gold');
  P2.cloud = [paintCloud(560, 300, 3), paintCloud(480, 260, 7), paintCloud(640, 320, 11)];
  P2.cloudW = P2.cloud.map(cl => tintCopy(cl, 'sepia(.6) hue-rotate(-30deg) saturate(2) brightness(.95)'));
  P2.cloudG = P2.cloud.map(cl => tintCopy(cl, 'sepia(.4) saturate(1.5)'));
  P2.barnBase = paintBarn(1); P2.silo = paintSilo(); P2.treeBase = paintTree(420, 520, 4); P2.tree2Base = paintTree(340, 440, 9);
  for (const [k, p] of Object.entries(PALS)) {
    p.L = { far: hillLayer(1500, 500, p.far[0], p.far[1], 50, 1, 2), mid: hillLayer(1500, 500, p.mid[0], p.mid[1], 34, 4, 1, 'rgba(0,0,0,.25)'), near: hillLayer(1500, 420, p.near[0], p.near[1], 22, 9, 0),
      grass: paintGrass(1500, 900, p.grass, 3), fore: paintForeGrass(1500, 500, p.grass.blades.slice(1, 4), 5),
      barn: tintCopy(P2.barnBase, p.filter), silo: tintCopy(P2.silo, p.filter), tree: tintCopy(P2.treeBase, p.filter), tree2: tintCopy(P2.tree2Base, p.filter) };
  }
  P2.coin = A.coin;
}
function farm(c, t, pal, o = {}) {
  const P = PALS[pal], L = P.L;
  sky(c, P.sky, -300, 1250);
  const sx = o.sunX ?? 820, sy = o.sunY ?? 640; glow(c, sx, sy, 760, P.sun, .55); glow(c, sx, sy, 220, '255,250,235', .9); c.fillStyle = '#fffbe8'; c.beginPath(); c.arc(sx, sy, o.sunR ?? 70, 0, TAU); c.fill();
  godRays(c, sx, sy, t, P.sun, .08);
  if (o.stars) stars(c, t, 40, 3, 500, .5);
  const cl = pal === 'sunset' ? P2.cloudW : pal === 'golden' ? P2.cloudG : P2.cloud;
  [[60, 420, 0, 1.0], [560, 300, 1, .8], [-140, 640, 2, .7]].forEach(([x, y, k, s]) => c.drawImage(cl[k], x + t * 6 * s, y, cl[k].width * s, cl[k].height * s));
  c.drawImage(L.far, -210, 830, 1500, 500); c.drawImage(L.mid, -210, 960, 1500, 500);
  if (o.windmill) { c.save(); c.translate(o.windmill, 870); c.strokeStyle = '#5a4a3e'; c.lineWidth = 6; c.beginPath(); c.moveTo(-40, 330); c.lineTo(0, 0); c.lineTo(40, 330); c.moveTo(-28, 230); c.lineTo(28, 230); c.moveTo(-16, 120); c.lineTo(16, 120); c.stroke(); c.rotate(t * 1.4); for (let i = 0; i < 18; i++) { c.rotate(TAU / 18); c.fillStyle = i % 2 ? '#e8e2d4' : '#bcb4a4'; c.beginPath(); c.moveTo(10, -4); c.lineTo(88, -12); c.lineTo(88, 12); c.lineTo(10, 4); c.fill(); } c.fillStyle = '#5a4a3e'; c.beginPath(); c.arc(0, 0, 12, 0, TAU); c.fill(); c.restore(); }
  if (o.barn !== false) { c.drawImage(L.silo, (o.barnX ?? 420) + 340, 640, 160, 552); c.drawImage(L.barn, o.barnX ?? 420, 690, 560, 473); }
  c.drawImage(L.tree, o.treeX ?? -60, 760, 360, 446); if (o.tree2) c.drawImage(L.tree2, o.tree2, 860, 260, 336);
  c.drawImage(L.near, -210, 1080, 1500, 420);
  const hz = c.createLinearGradient(0, 1000, 0, 1260); hz.addColorStop(0, `rgba(${P.haze},0)`); hz.addColorStop(.6, `rgba(${P.haze},.38)`); hz.addColorStop(1, `rgba(${P.haze},0)`); c.fillStyle = hz; c.fillRect(-300, 1000, W + 600, 260);
  c.drawImage(L.grass, -210, 1190, 1500, 900);
  if (o.fence !== false) paintFence(c, 1330, .85, -300, W + 300, pal === 'sunset' ? '#7a5a40' : '#a07a50', pal === 'sunset' ? '#3a2a1e' : '#5a3e26');
}
function fore(c, pal, y = 1640) { c.drawImage(PALS[pal].L.fore, -210, y, 1500, 500); }
function room(c, t, wall = ['#f6e2c4', '#e2c49c'], o = {}) {
  c.fillStyle = vgrad(c, -300, 1500, [[0, wall[0]], [1, wall[1]]]); c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalAlpha = .1; for (let x = -300; x < W + 300; x += 60) { c.fillStyle = (x / 60) % 2 ? '#b07a4a' : '#fff'; c.fillRect(x, -300, 30, 1800); } c.restore();
  // ventana con luz
  c.fillStyle = '#7a4a28'; rrect(c, 90, 460, 400, 470, 16); c.fill(); c.fillStyle = vgrad(c, 480, 910, [[0, '#7cc6f0'], [1, '#d8f0fa']]); c.fillRect(110, 480, 360, 430);
  c.drawImage(P2.cloud[1], 130, 560, 240, 130); c.drawImage(PALS.day.L.tree2, 330, 700, 160, 207); c.fillStyle = '#7a4a28'; c.fillRect(282, 480, 16, 430); c.fillRect(110, 688, 360, 16);
  c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.moveTo(110, 480); c.lineTo(250, 480); c.lineTo(110, 700); c.fill();
  c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = .16; c.fillStyle = '#fff3c8'; c.beginPath(); c.moveTo(110, 480); c.lineTo(470, 480); c.lineTo(1000, 1700); c.lineTo(500, 1700); c.fill(); c.restore();
  // repisa con macetas y ollas
  c.fillStyle = '#8a5a30'; c.fillRect(600, 520, 420, 24); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(600, 544, 420, 8);
  [[660, '#3aa860'], [800, '#4cd97b'], [940, '#2a8a50']].forEach(([x, col], i) => { c.fillStyle = vgrad(c, 440, 520, [[0, '#e8845a'], [1, '#a8502a']]); c.beginPath(); c.moveTo(x - 40, 440); c.lineTo(x + 40, 440); c.lineTo(x + 30, 520); c.lineTo(x - 30, 520); c.fill();
    for (let k = 0; k < 7; k++) { c.save(); c.translate(x, 440); c.rotate(-1.3 + k * .43 + Math.sin(t + i + k) * .03); c.fillStyle = k % 2 ? col : '#5ac87a'; c.beginPath(); c.ellipse(0, -55, 15, 55, 0, 0, TAU); c.fill(); c.restore(); } });
  [[700, 700, 46], [830, 690, 58], [960, 705, 40]].forEach(([x, y, r]) => { c.strokeStyle = '#3a3a40'; c.lineWidth = 4; c.beginPath(); c.moveTo(x, y - r - 30); c.lineTo(x, y - r); c.stroke(); c.fillStyle = vgrad(c, y - r, y + r, [[0, '#d8a060'], [1, '#8a5420']]); c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.ellipse(x - r * .3, y - r * .3, r * .3, r * .15, -.5, 0, TAU); c.fill(); });
  c.fillStyle = vgrad(c, 1500, 2000, [[0, '#a0703e'], [1, '#6a4422']]); c.fillRect(-300, 1500, W + 600, 900);
}

// 1. Gancho: atardecer, el pollo pierde la cabeza
scene(0, (c, t, lt) => {
  const tc = wt(6) + .05;
  shake(c, t, tc, 22, .35); cam(c, lt, 4.4, [1.0, 540, 1180], [1.1, 540, 1150], false);
  farm(c, t, 'sunset', { sunX: 600, sunY: 1000, sunR: 110, stars: true });
  const head = t < tc;
  drawHen(c, 540, 1660, 1.0, { t, head, bob: Math.sin(t * 5) * 3, blink: lt - .9, look: [.2, 0], tilt: head ? 0 : Math.sin((t - tc) * 9) * .03 * clamp(1 - (t - tc)) });
  if (!head) { const ht = t - tc, [nx, ny] = neckPosHen(540, 1660, 1.0, { head: false });
    c.save(); c.translate(nx + 30 + ht * 420, ny - 60 - ht * 900 + ht * ht * 1600); c.rotate(ht * 9); c.drawImage(HEN.white.head, -200, -230, 420, 420); c.restore();
    droplets(c, t, tc, nx, ny, 16, 3, 1.1); }
  fore(c, 'sunset', 1660);
  motes(c, t, { n: 30, seed: 4, size: 12, a: .55 });
  c.setTransform(1, 0, 0, 1, 0, 0); flash(c, t, tc, .22);
  badge(c, t, wt(8), 4.3, '18', 'meses');
});

// 2. Colorado 1945: la granja dorada
scene(4.45, (c, t, lt) => {
  cam(c, lt, 6.5, [1.05, 470, 1180], [1.12, 610, 1200]);
  farm(c, t, 'golden', { sunX: 900, sunY: 900, windmill: 980, barnX: 330, tree2: 40 });
  const px = lerp(300, 720, lt / 6.5), peck = Math.max(0, Math.sin(lt * 4.2)) ** 6;
  drawHen(c, px, 1680, .82, { t, walk: peck > .2 ? null : lt * 7, tilt: peck * .5, blink: (lt % 2.7) - 1.3, look: [.5, peck] });
  for (let i = 0; i < 12; i++) { const x = 200 + hash(i) * 700, y = 1690 + hash(i * 2) * 40; c.fillStyle = '#f2d27a'; c.beginPath(); c.ellipse(x, y, 6, 4, hash(i) * 3, 0, TAU); c.fill(); }
  fore(c, 'golden', 1700);
  motes(c, t, { n: 26, seed: 9, size: 10, a: .5 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(18), 8.25, '1945', '');
  iconPill(c, t, wt(31) - .05, 10.9, W / 2, 650, 105, (c, lt) => { c.fillStyle = '#f4f1ea'; c.beginPath(); c.arc(0, 0, 62, 0, TAU); c.fill(); c.strokeStyle = '#cfc8ba'; c.lineWidth = 5; c.beginPath(); c.arc(0, 0, 44, 0, TAU); c.stroke(); c.fillStyle = '#c9cdd4'; c.fillRect(-88, -45, 9, 90); c.fillRect(-96, -45, 3, 30); c.fillRect(-84, -45, 3, 30); c.fillRect(-74, -45, 3, 30); rrect(c, 80, -45, 12, 90, 6); c.fill(); c.font = '900 52px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#d98a3a'; c.fillText('?', 0, 4); });
});

// 3. El hachazo: interior del granero
scene(10.9, (c, t, lt) => {
  const ti = 11.98; shake(c, t, ti, 34, .4); cam(c, lt, 2.3, [1.12, 540, 1050], [1.02, 540, 1080]);
  c.fillStyle = '#2a1a10'; c.fillRect(-400, -400, W + 800, H + 800);
  const r = mulberry(12); for (let x = -300; x < W + 300; x += 70) { c.fillStyle = vgrad(c, -300, 1600, [[0, r() > .5 ? '#5a3a24' : '#4e321e'], [1, '#2a1a10']]); c.fillRect(x, -300, 66, 1900); c.fillStyle = 'rgba(0,0,0,.4)'; c.fillRect(x + 66, -300, 4, 1900);
    for (let k = 0; k < 6; k++) { c.strokeStyle = 'rgba(0,0,0,.18)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x + 10 + k * 9, -300); c.quadraticCurveTo(x + 20 + k * 8, 600, x + 8 + k * 9, 1600); c.stroke(); } }
  // rayos de luz entre tablas
  c.save(); c.globalCompositeOperation = 'lighter'; for (let k = 0; k < 5; k++) { const x = 60 + k * 230; const g = c.createLinearGradient(x, 200, x + 300, 1500); g.addColorStop(0, 'rgba(255,220,150,.22)'); g.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(x, 150); c.lineTo(x + 18, 150); c.lineTo(x + 380, 1600); c.lineTo(x + 300, 1600); c.fill(); } c.restore();
  for (let i = 0; i < 30; i++) { const x = (hash(i) * W + t * 10) % W, y = 300 + hash(i * 2) * 1200 + Math.sin(t + i) * 20; c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = .5; c.drawImage(A.dotWarm, x - 8, y - 8, 16, 16); c.restore(); }
  // pacas de paja
  [[40, 1260, 260, 200], [850, 1300, 240, 180]].forEach(([x, y, w, h]) => { c.fillStyle = vgrad(c, y, y + h, [[0, '#e8c070'], [1, '#a8803a']]); rrect(c, x, y, w, h, 20); c.fill(); c.strokeStyle = 'rgba(120,80,20,.5)'; c.lineWidth = 2; for (let k = 0; k < 40; k++) { const sx = x + hash(k + x) * w; c.beginPath(); c.moveTo(sx, y + 10); c.lineTo(sx + (hash(k) - .5) * 30, y + h - 10); c.stroke(); } c.strokeStyle = '#7a5020'; c.lineWidth = 6; c.beginPath(); c.moveTo(x + w * .3, y); c.lineTo(x + w * .3, y + h); c.moveTo(x + w * .7, y); c.lineTo(x + w * .7, y + h); c.stroke(); });
  c.fillStyle = vgrad(c, 1450, 1920, [[0, '#5a3a22'], [1, '#2a1a0e']]); c.fillRect(-300, 1460, W + 600, 800);
  // tronco
  c.fillStyle = vgrad(c, 1470, 1820, [[0, '#7a4e2c'], [1, '#4a2c14']]); c.fillRect(250, 1470, 580, 340); c.strokeStyle = 'rgba(30,15,5,.4)'; c.lineWidth = 3; for (let k = 0; k < 12; k++) { c.beginPath(); c.moveTo(270 + k * 48, 1480); c.lineTo(266 + k * 48, 1800); c.stroke(); }
  c.fillStyle = vgrad(c, 1400, 1540, [[0, '#e0b478'], [1, '#b8844a']]); c.beginPath(); c.ellipse(540, 1470, 290, 70, 0, 0, TAU); c.fill();
  c.strokeStyle = 'rgba(120,70,30,.55)'; c.lineWidth = 3; for (let k = 1; k < 7; k++) { c.beginPath(); c.ellipse(540, 1470, 290 * k / 7, 70 * k / 7, 0, 0, TAU); c.stroke(); }
  const head = t < ti;
  drawHen(c, 470, 1490, .92, { t, head, bob: Math.sin(t * 6) * 3, blink: lt - .4, look: [-.3, -.6], mood: 'scared', shadow: false });
  const [nx, ny] = neckPosHen(470, 1490, .92, { head });
  if (!head) { const ht = t - ti; c.save(); c.translate(nx + 40 + ht * 520, ny - 40 - ht * 700 + ht * ht * 1500); c.rotate(ht * 10); c.scale(.92, .92); c.drawImage(HEN.white.head, -200, -230, 420, 420); c.restore(); }
  const pv = [1300, 380], a1 = Math.atan2(ny - pv[1] + 10, nx + 60 - pv[0]), a0 = a1 + 1.75;
  const sw = t < 11.5 ? 0 : eIn((t - 11.5) / (ti - 11.5)); const ang = t < ti ? lerp(a0, a1, sw) - Math.sin(lt * 3) * .04 * (1 - sw) : a1 + .03;
  const L = Math.hypot(nx + 60 - pv[0], ny - pv[1]);
  const drawAxe = (a, al) => { c.save(); c.globalAlpha = al; c.translate(...pv); c.rotate(a);
    c.fillStyle = vgrad(c, -14, 14, [[0, '#b8844e'], [.5, '#8a5a30'], [1, '#5a3a1e']]); rrect(c, 0, -14, L + 40, 28, 13); c.fill(); c.strokeStyle = 'rgba(40,20,5,.4)'; c.lineWidth = 2; for (let k = 0; k < 8; k++) { c.beginPath(); c.moveTo(k * L / 8, -6); c.lineTo(k * L / 8 + 60, -2); c.stroke(); }
    c.translate(L, 0); c.beginPath(); c.moveTo(-50, 22); c.lineTo(40, 22); c.lineTo(55, -40); c.quadraticCurveTo(10, -125, -72, -128); c.quadraticCurveTo(-40, -60, -50, 22); c.closePath();
    c.fillStyle = vgrad(c, -128, 22, [[0, '#fafcff'], [.3, '#c4cad4'], [1, '#5a606a']]); c.fill(); c.strokeStyle = 'rgba(30,30,40,.6)'; c.lineWidth = 3; c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 5; c.beginPath(); c.moveTo(-64, -120); c.quadraticCurveTo(5, -114, 46, -42); c.stroke(); c.restore(); };
  if (t >= 11.5 && t < ti + .05) for (let k = 3; k >= 1; k--) drawAxe(ang + k * .12, .12);
  drawAxe(ang, 1);
  if (!head) { droplets(c, t, ti, nx, ny, 20, 7, 1.1); sparks(c, t, ti, nx + 40, ny, 14, 5); }
  c.setTransform(1, 0, 0, 1, 0, 0); flash(c, t, ti, .2);
});

// 4. Diagrama: tronco cerebral
scene(13.2, (c, t, lt) => {
  const zIn = ss(0, 1.6, lt) * (1 - ss(2.4, 3.2, lt));
  c.translate(W / 2, H / 2); const z = 1 + .5 * zIn; c.scale(z * (1 + .07 * (1 - eOut(lt / .4))), z); c.translate(-lerp(540, 640, zIn), -lerp(1060, 820, zIn));
  const g = c.createRadialGradient(540, 900, 50, 540, 900, 1300); g.addColorStop(0, '#1d4068'); g.addColorStop(1, '#081424'); c.fillStyle = g; c.fillRect(-400, -400, W + 800, H + 800);
  c.strokeStyle = 'rgba(140,200,255,.08)'; c.lineWidth = 2; for (let x = -300; x < W + 300; x += 60) { c.beginPath(); c.moveTo(x, -300); c.lineTo(x, H + 300); c.stroke(); } for (let y = -300; y < H + 300; y += 60) { c.beginPath(); c.moveTo(-300, y); c.lineTo(W + 300, y); c.stroke(); }
  c.save(); c.globalAlpha = .45; c.shadowColor = 'rgba(120,200,255,.9)'; c.shadowBlur = 30; c.filter = 'grayscale(1) brightness(.9) sepia(1) hue-rotate(170deg) saturate(3)'; drawHen(c, 470, 1600, 1.1, { t, head: false, shadow: false, bob: Math.sin(t * 4) * 3 }); c.restore();
  const [nx, ny] = neckPosHen(470, 1600, 1.1, { head: false });
  c.save(); c.setLineDash([14, 12]); c.strokeStyle = 'rgba(220,240,255,.7)'; c.lineWidth = 6; c.beginPath(); c.moveTo(nx, ny + 30); c.quadraticCurveTo(nx - 20, ny + 260, nx - 170, ny + 380); c.quadraticCurveTo(nx - 340, ny + 460, nx - 450, ny + 420); c.stroke(); c.restore();
  const pulse = 1 + Math.sin(t * 8) * .08; glow(c, nx, ny + 40, 120 * pulse, '255,120,170', .9);
  c.fillStyle = '#ff7fb0'; c.beginPath(); c.ellipse(nx, ny + 40, 24 * pulse, 36 * pulse, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.ellipse(nx - 7, ny + 28, 7, 10, 0, 0, TAU); c.fill();
  c.fillStyle = '#c81f2a'; c.beginPath(); c.ellipse(nx, ny, 50, 16, 0, 0, TAU); c.fill();
  const la = eBack((t - wt(41)) / .4); if (t > wt(41)) { c.save(); c.globalAlpha = clamp(la); c.font = '800 44px Nunito'; const lw0 = c.measureText('tronco cerebral').width + 50; const lx = nx - lw0 / 2 - 60, ly = ny - 230;
    c.strokeStyle = 'rgba(255,170,210,.9)'; c.lineWidth = 4; c.beginPath(); c.moveTo(nx, ny - 10); c.lineTo(lx + lw0 / 2, ly + 66); c.stroke();
    c.translate(lx, ly); rrect(c, 0, 0, lw0, 66, 33); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = 'rgba(255,140,190,.8)'; c.lineWidth = 3; c.stroke(); c.fillStyle = '#ffd0e4'; c.textBaseline = 'middle'; c.fillText('tronco cerebral', 25, 35); c.restore(); }
  motes(c, t, { n: 30, seed: 11, size: 10, a: .35, spr: A.dotBlue });
  c.setTransform(1, 0, 0, 1, 0, 0);
  const ix = 880; [[wt(47), 1050, 'lung'], [wt(49), 1270, 'heart'], [wt(51), 1490, 'foot']].forEach(([ti, y, k]) => {
    iconPill(c, t, ti, 19.6, ix, y, 92, (c, lt) => {
      if (k === 'lung') { const b = 1 + Math.sin(lt * 5) * .08; c.scale(b, b); c.fillStyle = '#8fd0ff'; c.beginPath(); c.ellipse(-26, 8, 24, 42, .15, 0, TAU); c.ellipse(26, 8, 24, 42, -.15, 0, TAU); c.fill(); c.strokeStyle = '#dff2ff'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, -48); c.lineTo(0, -10); c.lineTo(-14, 6); c.moveTo(0, -10); c.lineTo(14, 6); c.stroke(); }
      if (k === 'heart') { const b = 1 + Math.max(0, Math.sin(lt * 9)) ** 4 * .18; c.scale(b, b); c.fillStyle = '#ff4d5e'; c.beginPath(); c.moveTo(0, 40); c.bezierCurveTo(-70, -5, -35, -60, 0, -25); c.bezierCurveTo(35, -60, 70, -5, 0, 40); c.fill(); }
      if (k === 'foot') { c.scale(1.5, 1.5); c.strokeStyle = '#f2a53a'; c.lineWidth = 8; c.lineCap = 'round'; const st = Math.floor(lt * 3) % 2; [[-22, 20, 0], [22, -16, 1]].forEach(([fx, fy, j]) => { c.globalAlpha = j === st ? 1 : .35; c.beginPath(); c.moveTo(fx, fy + 22); c.lineTo(fx, fy); c.lineTo(fx - 16, fy - 20); c.moveTo(fx, fy); c.lineTo(fx, fy - 26); c.moveTo(fx, fy); c.lineTo(fx + 16, fy - 20); c.stroke(); }); } }); });
});

// 5. Al otro día: amanecer
scene(19.7, (c, t, lt) => {
  cam(c, lt, 5.5, [1.0, 540, 1150], [1.1, 560, 1180]);
  const day = ss(0, 1.2, lt);
  farm(c, t, 'day', { sunX: 850, sunY: lerp(1150, 650, day), barnX: 560, treeX: 20 });
  c.fillStyle = `rgba(20,30,70,${.6 * (1 - day)})`; c.fillRect(-400, -400, W + 800, H + 800);
  const pk = t > wt(60) - .1 ? Math.max(0, Math.sin(lt * 7)) ** 3 : 0, px = 540 + Math.sin(lt * .9) * 170, fl = Math.cos(lt * .9) < 0;
  drawHen(c, px, 1690, .95, { t, head: false, walk: pk > .1 ? null : lt * 7, tilt: pk * .38, flip: fl });
  const [nx, ny] = neckPosHen(px, 1690, .95, { head: false, flip: fl });
  [[-90, -150, 0], [0, -210, .2], [95, -150, .4]].forEach(([dx, dy, d], i) => { const qt = t - wt(60) - d; if (qt < 0) return; const a = eBack(qt / .35);
    c.save(); c.translate(nx + dx, ny + dy + Math.sin(t * 4 + i) * 8); c.scale(a, a); c.rotate((i - 1) * .2); c.font = '900 110px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 12; c.strokeStyle = '#1d2a44'; c.strokeText('?', 0, 0); c.fillStyle = '#ffffff'; c.fillText('?', 0, 0); c.restore(); });
  fore(c, 'day', 1700);
  motes(c, t, { n: 18, seed: 2, size: 10, a: .3 });
});

// 6. Mike y el gotero (cocina)
scene(25.2, (c, t, lt) => {
  cam(c, lt, 5.4, [1.0, 540, 1100], [1.12, 600, 1050]);
  room(c, t);
  // mesa con mantel
  c.fillStyle = vgrad(c, 1480, 1540, [[0, '#c48a52'], [1, '#8a5a30']]); c.fillRect(-300, 1480, W + 600, 50);
  c.save(); c.beginPath(); c.rect(-300, 1525, W + 600, 500); c.clip(); c.fillStyle = '#f4ece0'; c.fillRect(-300, 1525, W + 600, 500); c.fillStyle = 'rgba(214,58,70,.55)'; for (let x = -300; x < W + 300; x += 70) c.fillRect(x, 1525, 35, 500); for (let y = 1525; y < 2100; y += 70) c.fillRect(-300, y, W + 600, 35); c.restore();
  drawHen(c, 520, 1500, 1.0, { t, head: false, bob: Math.sin(t * 5) * 4 });
  const [nx, ny] = neckPosHen(520, 1500, 1.0, { head: false });
  const st = wt(65) - .05, out = 27.9;
  if (t > st && t < out + .6) { const sw = spring(t - st, 8, 3.2), up = eIn((t - out) / .5);
    c.save(); c.translate(W / 2 + 60, lerp(-200, 640, sw) - up * 900); c.rotate(Math.sin((t - st) * 6) * .12 * Math.exp(-(t - st) * 1.5));
    c.strokeStyle = '#8a6a44'; c.lineWidth = 6; c.beginPath(); c.moveTo(-150, -70); c.lineTo(-170, -700); c.moveTo(150, -70); c.lineTo(170, -700); c.stroke();
    c.fillStyle = vgrad(c, -80, 80, [[0, '#c48a52'], [1, '#7a4a24']]); rrect(c, -240, -80, 480, 160, 16); c.fill(); c.strokeStyle = 'rgba(60,30,10,.4)'; c.lineWidth = 3; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(-230, k * 30); c.lineTo(230, k * 30 + 6); c.stroke(); }
    c.font = '900 120px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#3a2210'; c.fillText('MIKE', 3, 8); c.fillStyle = '#fff2d8'; c.fillText('MIKE', 0, 4); c.restore(); }
  const dt0 = wt(73) - .25; if (t > dt0) { const dy = eOut((t - dt0) / .5), tx = nx, ty = lerp(-300, ny - 90, dy); const sq = Math.max(0, Math.sin((t - dt0) * 9)) ** 8;
    for (let k = 0; k < 6; k++) { const ft = ((t - dt0 - .5) * 2.6 - k); if (ft < 0 || ft > 1) continue; c.fillStyle = 'rgba(240,248,255,.95)'; c.beginPath(); c.ellipse(tx, ty + 40 + ft * 70, 9, 13, 0, 0, TAU); c.fill(); }
    c.save(); c.translate(tx, ty); c.fillStyle = 'rgba(210,235,255,.55)'; c.beginPath(); c.moveTo(-26, -320); c.lineTo(26, -320); c.lineTo(26, -60); c.lineTo(5, 30); c.lineTo(-5, 30); c.lineTo(-26, -60); c.closePath(); c.fill(); c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 4; c.stroke();
    c.fillStyle = 'rgba(250,245,230,.85)'; c.fillRect(-22, -180, 44, 110); c.fillStyle = vgrad(c, -460, -320, [[0, '#ff6a5a'], [1, '#b81e26']]); c.beginPath(); c.ellipse(0, -390, 52 * (1 - sq * .25), 80 * (1 - sq * .15), 0, 0, TAU); c.fill(); c.fillRect(-36, -340, 72, 30); c.fillStyle = 'rgba(255,255,255,.4)'; c.beginPath(); c.ellipse(-18, -410, 10, 26, 0, 0, TAU); c.fill(); c.restore(); }
  motes(c, t, { n: 16, seed: 5, size: 9, a: .35 });
});

// 7. La feria nocturna
scene(30.6, (c, t, lt) => {
  cam(c, lt, 4.9, [1.0, 540, 1100], [1.08, 540, 1120]);
  sky(c, [[0, '#0e0820'], [.55, '#341a46'], [.85, '#7a3454']], -300, 1300); stars(c, t, 70, 7, 900, .8);
  glow(c, 540, 1250, 700, '255,140,120', .25);
  c.save(); c.globalCompositeOperation = 'lighter'; [[-100, .4], [1180, -.4]].forEach(([bx, ph]) => { const a = -Math.PI / 2 + Math.sin(t * .9 + ph * 5) * .5 + ph; c.save(); c.translate(bx, 1500); c.rotate(a); const g = c.createLinearGradient(0, 0, 1400, 0); g.addColorStop(0, 'rgba(255,240,200,.25)'); g.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(0, 0); c.lineTo(1500, -170); c.lineTo(1500, 170); c.fill(); c.restore(); }); c.restore();
  c.drawImage(A.tent, 90, 560, 900, 800); c.fillStyle = vgrad(c, 560, 1360, [[0, 'rgba(255,200,150,.1)'], [1, 'rgba(20,0,20,.35)']]); c.fillRect(90, 560, 900, 800);
  for (let k = 0; k < 2; k++) { c.strokeStyle = '#2a1a2a'; c.lineWidth = 3; const y0 = 520 + k * 120; c.beginPath(); c.moveTo(-50, y0); c.quadraticCurveTo(540, y0 + 220, 1130, y0); c.stroke();
    for (let i = 0; i <= 14; i++) { const u = i / 14, x = lerp(-50, 1130, u), y = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * (y0 + 220) + u * u * y0; const on = .55 + .45 * Math.sin(t * 6 + i * 1.7 + k); c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = on; c.drawImage(A.dotWarm, x - 40, y - 30, 80, 80); c.restore(); c.fillStyle = `rgba(255,${200 + 40 * on | 0},120,1)`; c.beginPath(); c.arc(x, y + 8, 8, 0, TAU); c.fill(); } }
  c.fillStyle = vgrad(c, 1350, 2000, [[0, '#2a1626'], [1, '#120810']]); c.fillRect(-300, 1350, W + 600, 700);
  c.fillStyle = vgrad(c, 1360, 1480, [[0, '#c8323a'], [1, '#7a1a22']]); c.beginPath(); c.ellipse(540, 1420, 260, 60, 0, 0, TAU); c.fill(); c.fillRect(280, 1360, 520, 60);
  c.fillStyle = '#f2c94c'; c.beginPath(); c.ellipse(540, 1360, 260, 60, 0, 0, TAU); c.fill(); c.fillStyle = '#d63a44'; c.beginPath(); c.ellipse(540, 1360, 240, 50, 0, 0, TAU); c.fill();
  glow(c, 540, 1100, 380, '255,230,170', .4);
  drawHen(c, 540, 1370, .9, { t, head: false, bob: Math.sin(t * 5) * 4, shadow: false });
  for (let i = 0; i < 7; i++) { const tt = t - wt(81) - i * .08; if (tt < 0) continue; const a = hash(i + 3) * TAU, d = 230 + hash(i) * 130, s = Math.sin(clamp(tt / 1.6) * Math.PI) * (22 + hash(i * 2) * 18);
    c.save(); c.translate(540 + Math.cos(a) * d, 1000 + Math.sin(a) * d * .8); c.rotate(tt * 2); c.fillStyle = '#ffe9a0'; c.beginPath(); for (let k = 0; k < 8; k++) { const r = k % 2 ? s * .35 : s; c.lineTo(Math.cos(k * Math.PI / 4) * r, Math.sin(k * Math.PI / 4) * r); } c.fill(); c.restore(); }
  for (let i = 0; i < 9; i++) { const x = -40 + i * 145, y = 1800 + hash(i) * 60 + Math.sin(t * 4 + i * 1.3) * 10; c.fillStyle = '#0c0610'; c.beginPath(); c.arc(x, y - 120, 62, 0, TAU); c.fill(); rrect(c, x - 105, y - 70, 210, 300, 80); c.fill(); c.strokeStyle = 'rgba(255,200,150,.25)'; c.lineWidth = 4; c.beginPath(); c.arc(x, y - 120, 62, -2.6, -1.0); c.stroke(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(85), 35.45, '25', '¢');
});

// 8. Lluvia de monedas
scene(35.5, (c, t, lt) => {
  cam(c, lt, 3.7, [1.0, 540, 1050], [1.08, 540, 1050]);
  const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1300); g.addColorStop(0, '#3aa07a'); g.addColorStop(.5, '#14604a'); g.addColorStop(1, '#04201a'); c.fillStyle = g; c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalCompositeOperation = 'lighter'; c.translate(540, 1000); c.rotate(lt * .25); for (let i = 0; i < 14; i++) { c.rotate(TAU / 14); c.fillStyle = 'rgba(255,230,150,.07)'; c.beginPath(); c.moveTo(0, 0); c.lineTo(1600, -140); c.lineTo(1600, 140); c.fill(); } c.restore();
  const pile = 40 + ss(0, 3.5, lt) * 140;
  for (let i = 0; i < 90; i++) { const x = 140 + hash(i) * 800, y = 1580 - hash(i * 2) * pile * (1 - Math.abs(x - 540) / 500); c.drawImage(A.coin, x - 45, y - 45, 90, 90); }
  drawHen(c, 540, 1580 - pile * .8, 1.0, { t, head: false, bob: Math.sin(t * 6) * 5 });
  for (let i = 0; i < 46; i++) { const st = hash(i * 1.9) * 3.4, ft = lt - st; if (ft < 0) continue; const x = hash(i * 4.1) * W, y = -100 + ft * (900 + hash(i) * 500); if (y > H + 100) continue;
    const sp = Math.cos(ft * (6 + hash(i) * 6)); c.save(); c.translate(x, y); c.rotate(ft * 2 * (hash(i) - .5)); c.scale(Math.max(.15, Math.abs(sp)), 1); c.drawImage(A.coin, -55, -55, 110, 110); c.restore(); }
  motes(c, t, { n: 30, seed: 8, size: 14, a: .55 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(94), 39.1, '$4,500', '/mes');
});

// 9. La báscula
scene(39.15, (c, t, lt) => {
  cam(c, lt, 3.95, [1.0, 540, 1150], [1.1, 540, 1150]);
  room(c, t, ['#dfeee8', '#a8d0c4']);
  const inf = 0.42 * spring(t - wt(107), 9, 3.5);
  c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(540, 1600, 300, 40, 0, 0, TAU); c.fill();
  c.fillStyle = vgrad(c, 1480, 1600, [[0, '#e8c070'], [1, '#a8781e']]); rrect(c, 290, 1470, 500, 120, 24); c.fill(); c.fillStyle = vgrad(c, 1450, 1490, [[0, '#f2f4f8'], [1, '#b8c0c8']]); rrect(c, 280, 1450, 520, 40, 18); c.fill();
  c.fillStyle = vgrad(c, 1580, 1820, [[0, '#f0c860'], [1, '#a8781e']]); c.beginPath(); c.arc(540, 1700, 125, 0, TAU); c.fill(); c.fillStyle = '#fffbf0'; c.beginPath(); c.arc(540, 1700, 105, 0, TAU); c.fill();
  for (let k = 0; k < 9; k++) { const a = Math.PI * (.8 + k * .175); c.strokeStyle = '#5a4a3a'; c.lineWidth = 4; c.beginPath(); c.moveTo(540 + Math.cos(a) * 80, 1700 + Math.sin(a) * 80); c.lineTo(540 + Math.cos(a) * 96, 1700 + Math.sin(a) * 96); c.stroke(); }
  const kg = t < wt(105) ? 0 : 1 + 3 * (inf / .42); const na = Math.PI * (.8 + kg * .3 + Math.sin(t * 20) * .004);
  c.strokeStyle = '#e8343f'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(540, 1700); c.lineTo(540 + Math.cos(na) * 88, 1700 + Math.sin(na) * 88); c.stroke(); c.fillStyle = '#333'; c.beginPath(); c.arc(540, 1700, 12, 0, TAU); c.fill();
  c.fillStyle = 'rgba(255,255,255,.4)'; c.beginPath(); c.ellipse(500, 1650, 50, 20, -.5, 0, TAU); c.fill();
  drawHen(c, 540, 1460, .9, { t, head: false, inflate: inf, bob: Math.sin(t * 5) * 3, shadow: false });
  motes(c, t, { n: 14, seed: 6, size: 9, a: .3 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t < wt(108)) badge(c, t, wt(105), 43.5, '1', 'kg'); else badge(c, t, wt(108), 43.0, '4', 'kg');
});

// 10. El motel bajo la lluvia
scene(43.1, (c, t, lt) => {
  const z = lerp(1.0, 1.3, eInOut(lt / 7.4)); c.translate(W / 2, H / 2); c.scale(z * (1 + .07 * (1 - eOut(lt / .4))), z); c.translate(-lerp(540, 630, eInOut(lt / 7.4)), -lerp(1100, 1150, eInOut(lt / 7.4)));
  sky(c, [[0, '#040a18'], [.6, '#10204a'], [.9, '#1e3a62']], -300, 1300); stars(c, t, 70, 13, 900, .7);
  glow(c, 820, 420, 300, '200,220,255', .55); c.fillStyle = '#f2f4ea'; c.beginPath(); c.arc(820, 420, 62, 0, TAU); c.fill(); c.fillStyle = 'rgba(160,170,190,.35)'; c.beginPath(); c.arc(800, 405, 14, 0, TAU); c.arc(840, 440, 9, 0, TAU); c.fill();
  c.drawImage(P2.cloud[0], 520, 480, 500, 268); c.fillStyle = 'rgba(10,20,50,.65)'; c.fillRect(500, 470, 540, 290);
  c.drawImage(PALS.day.L.far, -210, 900, 1500, 500); c.fillStyle = 'rgba(4,10,30,.8)'; c.fillRect(-300, 880, W + 600, 520);
  c.drawImage(A.motel, -110, 820, 1300, 560);
  const lit = t < wt(129) + .4 ? 1 : 1 - clamp((t - wt(129) - .4) / .5); const flk = t > wt(119) && t < wt(119) + 1.2 ? (hash(Math.floor(t * 14)) > .4 ? 1 : .35) : 1;
  const wx = 580, wy = 1080, L2 = lit * flk;
  c.fillStyle = `rgba(255,${190 + 20 * L2 | 0},110,${.15 + .85 * L2})`; c.fillRect(wx, wy, 80, 110); glow(c, wx + 40, wy + 55, 240, '255,190,110', .55 * L2);
  if (L2 > .05) { c.save(); c.beginPath(); c.rect(wx, wy, 80, 110); c.clip(); c.globalAlpha = .85 * L2; c.filter = 'brightness(0)'; drawHen(c, wx + 38, wy + 112, .14, { t, head: false, shadow: false }); c.restore(); }
  c.fillStyle = '#4a5d78'; c.fillRect(wx - 4, wy + 52, 88, 6); c.fillRect(wx + 37, wy, 6, 110);
  c.fillStyle = '#2a2f3a'; c.fillRect(840, 700, 16, 230); c.fillStyle = '#1a1e28'; rrect(c, 700, 570, 300, 140, 20); c.fill();
  c.font = '900 92px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle';
  'MOTEL'.split('').forEach((ch, i) => { let on = 1; if (i === 2 && t > wt(129)) on = hash(Math.floor(t * 10)) > .7 ? 1 : .12; const x = 742 + i * 54; c.save(); c.shadowColor = '#ff4fa3'; c.shadowBlur = 34 * on; c.fillStyle = on > .5 ? '#ffd0ea' : '#5a2a44'; c.fillText(ch, x, 642); c.restore(); });
  glow(c, 850, 640, 300, '255,80,170', .3);
  c.fillStyle = vgrad(c, 1380, 1920, [[0, '#121a28'], [1, '#06090f']]); c.fillRect(-300, 1380, W + 600, 700);
  c.save(); c.globalAlpha = .45 * L2; c.filter = 'blur(6px)'; c.fillStyle = 'rgba(255,190,110,.8)'; c.fillRect(wx, 1400, 80, 160); c.restore();
  c.save(); c.globalAlpha = .35; c.filter = 'blur(8px)'; c.fillStyle = '#ff4fa3'; c.fillRect(710, 1400, 280, 70); c.restore();
  for (let i = 0; i < 18; i++) { const x = hash(i) * W, y = 1450 + hash(i * 2) * 450, ph = (t * 1.5 + hash(i * 3)) % 1; c.strokeStyle = `rgba(200,220,255,${(1 - ph) * .5})`; c.lineWidth = 2; c.beginPath(); c.ellipse(x, y, ph * 40, ph * 10, 0, 0, TAU); c.stroke(); }
  c.strokeStyle = 'rgba(180,200,230,.38)'; c.lineWidth = 2.5; for (let i = 0; i < 170; i++) { const x = (hash(i) * 1400 + t * 120) % 1400 - 160, y = (hash(i * 2.3) * 2200 + t * 1700) % 2200 - 200; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 10, y + 50); c.stroke(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  iconPill(c, t, wt(126) - .05, 50.4, W / 2, 650, 100, (c, lt) => { c.rotate(-.7); c.fillStyle = 'rgba(220,240,255,.85)'; rrect(c, -60, -18, 100, 36, 8); c.fill(); c.fillStyle = '#c8202a'; c.fillRect(-55, -12, 60, 24); c.fillStyle = '#dfe6ee'; c.fillRect(40, -6, 30, 12); c.fillRect(-78, -26, 18, 52); c.fillStyle = '#cfd6de'; c.fillRect(70, -2, 28, 4); c.rotate(.7); const k = clamp((lt - .5) / .3); c.strokeStyle = '#ff3b4a'; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(-60, -60); c.lineTo(-60 + 120 * k, -60 + 120 * k); c.stroke(); });
  c.fillStyle = `rgba(0,10,30,${.25 * (1 - L2)})`; c.fillRect(0, 0, W, H);
});

// 11. El festival
scene(50.5, (c, t, lt) => {
  cam(c, lt, 6.5, [1.12, 540, 1000], [1.0, 540, 1080]);
  farm(c, t, 'sunset', { sunX: 540, sunY: 1050, sunR: 100, barn: false, fence: false, treeX: -80, tree2: 860 });
  c.save(); c.globalCompositeOperation = 'lighter';
  [[.3, 300, 420, '255,200,90'], [1.4, 800, 340, '255,110,180'], [2.5, 520, 260, '140,220,255'], [3.4, 220, 520, '255,240,140'], [4.3, 860, 520, '190,140,255'], [5.1, 480, 380, '255,160,90']].forEach(([st, fx, fy, col]) => { const ft = lt - st; if (ft < 0 || ft > 1.8) return;
    if (ft < .3) glow(c, fx, fy, 200, col, (1 - ft / .3) * .7);
    for (let i = 0; i < 40; i++) { const a = i / 40 * TAU, d = eOut(ft) * 220, x = fx + Math.cos(a) * d, y = fy + Math.sin(a) * d + ft * ft * 70; c.globalAlpha = 1 - clamp((ft - .6) / 1.2); c.drawImage(A.dot, x - 18, y - 18, 36, 36); c.fillStyle = `rgba(${col},1)`; c.beginPath(); c.arc(x, y, 5, 0, TAU); c.fill();
      c.strokeStyle = `rgba(${col},.4)`; c.lineWidth = 3; c.beginPath(); c.moveTo(fx + Math.cos(a) * d * .7, fy + Math.sin(a) * d * .7); c.lineTo(x, y); c.stroke(); } });
  c.restore();
  // pedestal + estatua dorada
  c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(540, 1670, 300, 40, 0, 0, TAU); c.fill();
  c.fillStyle = vgrad(c, 1250, 1650, [[0, '#c8c0b8'], [1, '#7a7270']]); c.fillRect(330, 1300, 420, 330); c.fillStyle = vgrad(c, 1270, 1320, [[0, '#e8e2da'], [1, '#b8b0a8']]); c.fillRect(300, 1270, 480, 50); c.fillRect(300, 1610, 480, 50);
  c.fillStyle = vgrad(c, 1400, 1510, [[0, '#c8a050'], [1, '#8a6820']]); rrect(c, 410, 1400, 260, 110, 14); c.fill(); c.font = '900 64px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#3a2810'; c.fillText('MIKE', 540, 1458);
  glow(c, 540, 1000, 380, '255,220,140', .4);
  drawHen(c, 540, 1280, .85, { t, head: false, gold: true, shadow: false, bob: 0 });
  c.save(); c.globalCompositeOperation = 'lighter'; const sh = (lt * .6) % 1.6; c.globalAlpha = .5; c.drawImage(A.dot, 380 + sh * 320 - 60, 900 - 60, 120, 120); c.restore();
  // papel picado
  const cols = ['#ff5a5f', '#ffd166', '#06d6a0', '#4cc9f0', '#f78c6b', '#b388eb'];
  for (let k = 0; k < 2; k++) { const y0 = 560 + k * 150; c.strokeStyle = '#2a1a2a'; c.lineWidth = 3; c.beginPath(); for (let i = 0; i <= 24; i++) { const u = i / 24; c.lineTo(lerp(-60, 1140, u), y0 + Math.sin(u * Math.PI) * 110); } c.stroke();
    for (let i = 0; i < 10; i++) { const u = (i + .5) / 10, x = lerp(-60, 1140, u), y = y0 + Math.sin(u * Math.PI) * 110 + Math.sin(t * 3 + i) * 4; c.save(); c.translate(x, y); c.rotate(Math.sin(t * 2 + i) * .06);
      c.fillStyle = cols[(i + k * 3) % 6]; c.fillRect(-45, 0, 90, 110); c.globalCompositeOperation = 'destination-out'; for (let q = 0; q < 6; q++) { c.beginPath(); c.arc(-25 + (q % 3) * 25, 30 + Math.floor(q / 3) * 40, 9, 0, TAU); c.fill(); } c.restore(); } }
  for (let i = 0; i < 80; i++) { const x = (hash(i) * W + Math.sin(t + i) * 40), y = ((hash(i * 3.3) * H + lt * (180 + hash(i) * 120)) % (H + 100)) - 50; c.save(); c.translate(x, y); c.rotate(t * 3 + i); c.scale(1, Math.cos(t * 5 + i)); c.fillStyle = cols[i % 6]; c.fillRect(-9, -5, 18, 10); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  const fo = clamp((t - (END - .7)) / .7); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});

const _r = render; render = function (t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  let si = 0; for (let i = 0; i < SC.length; i++) if (t >= SC[i].t0) si = i;
  ctx.save(); SC[si].draw(ctx, t, t - SC[si].t0); ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none';
  const grades = [[[0, '#ffd0a8'], [1, '#5a3a8a']], [[0, '#ffe8c0'], [1, '#8a6a3a']], [[0, '#ffd8a0'], [1, '#3a2010']], [[0, '#a8d8ff'], [1, '#0a1a3a']], [[0, '#fff4d8'], [1, '#6a9ac8']], [[0, '#fff0d8'], [1, '#8a6a4a']], [[0, '#ffb0d0'], [1, '#2a0a3a']], [[0, '#d8ffd0'], [1, '#0a3a2a']], [[0, '#f0fff8'], [1, '#4a8a7a']], [[0, '#a8b8ff'], [1, '#0a0a2a']], [[0, '#ffd0a8'], [1, '#4a2a6a']]];
  postFX({ bloom: .3, grade: grades[si], gradeA: .3 });
  ctx.drawImage(A.vig, 0, 0);
  ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .07; ctx.drawImage(A.grain[Math.floor(t * 24) % 4], 0, 0, W, H); ctx.restore();
  if (t < END - .7) caption(ctx, t);
};
