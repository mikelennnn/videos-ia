// ---------- assets pre-renderizados ----------
const A = {};
const PAL = {
  white: {
    grad: [[0, '#fffdf8'], [.55, '#f2ece1'], [1, '#cdc2ae']], cols: ['#ffffff', '#ebe4d6', '#d5cab6', '#fbf6ec', '#c9bda6'],
    alpha: [.3, .75], len: [9, 19], fringe: ['#ffffff', '#ece5d7', '#d3c8b4'], rim: '#fffaf0', outline: 'rgba(110,85,60,.35)', shade: .28,
    wing: [[0, '#f6f0e4'], [1, '#d9cfbd']], comb: ['#ff6a55', '#c81f26'], beak: ['#ffd65e', '#e48c26'], leg: '#f2a53a', legD: '#a9621b'
  },
  gold: {
    grad: [[0, '#fff3c0'], [.5, '#f0c04a'], [1, '#9c6a18']], cols: ['#fff6cf', '#e8b440', '#c08a26', '#ffe08a', '#a8761e'],
    alpha: [.3, .7], len: [9, 19], fringe: ['#ffeeb0', '#d9a23a', '#b07a20'], rim: '#fff3c4', outline: 'rgba(90,60,10,.5)', shade: .35,
    wing: [[0, '#f7d470'], [1, '#b8862a']], comb: ['#ffe28a', '#c8902a'], beak: ['#ffe9a0', '#c8902a'], leg: '#e0b048', legD: '#8a6014'
  }
};

function bodyFlow(x, y) { return y < -90 ? 1.65 + (x - 165) * .004 : 2.85 + y * .0012; }

function buildBody(p) {
  const c0 = mk(900, 900), c = c0.getContext('2d'); c.translate(430, 470);
  const tail = [-1.95, -2.25, -2.55, -2.85];
  tail.forEach((a, i) => { const L = 200 - i * 14; const cx = -175 + Math.cos(a) * L * .5, cy = -15 + Math.sin(a) * L * .5;
    furFill(c, ellipsePts(cx, cy, L * .56, 46, 24, a, .05, 11 + i), { ...p, grad: p.wing, seed: 30 + i, density: 26, angle: a, spread: .25, fringeLen: 13, light: [.5, .3, .25] }); });
  const body = [[-205, -25], [-120, -75], [0, -85], [88, -115], [108, -205], [122, -258], [205, -262], [218, -185], [232, -70], [255, 40], [236, 150], [155, 232], [20, 262], [-120, 232], [-212, 152], [-255, 45]];
  furFill(c, body, { ...p, seed: 3, density: 30, flow: bodyFlow, spread: .45, fringeLen: 14, light: [.62, .2, .45] });
  const wing = [[145, 40], [120, -2], [40, -28], [-60, -22], [-165, 18], [-225, 82], [-160, 122], [-40, 145], [80, 125], [140, 92]];
  furFill(c, wing, { ...p, grad: p.wing, seed: 9, density: 30, angle: 3.0, spread: .3, fringeLen: 11, light: [.65, .25, .3], shade: .2, outline: p.outline });
  c.save(); c.strokeStyle = p.outline; c.lineWidth = 2.2; c.lineCap = 'round';
  for (let row = 0; row < 3; row++) for (let k = 0; k < 4; k++) { const x = 40 - row * 70 - k * 8, y = 20 + k * 28; c.beginPath(); c.arc(x - 30, y, 34, -.2, 1.2); c.stroke(); }
  for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(-90, 60 + k * 18); c.quadraticCurveTo(-160, 75 + k * 14, -215 + k * 10, 85 + k * 6); c.stroke(); }
  c.restore();
  return c0;
}
function buildHead(p) {
  const c0 = mk(360, 360), c = c0.getContext('2d'); c.translate(180, 190);
  const comb = [[-50, -40], [-58, -78], [-30, -96], [-10, -78], [5, -112], [30, -86], [52, -100], [62, -66], [76, -58], [60, -30]];
  flatFill(c, comb, [[0, p.comb[0]], [1, p.comb[1]]], 'rgba(110,10,10,.45)');
  c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(-28, -78, 10, 5, -.5, 0, TAU); c.fill();
  furFill(c, ellipsePts(0, 0, 74, 68, 26, 0, .04, 5), { ...p, seed: 5, density: 34, angle: 2.4, spread: .9, len: [6, 12], fringeLen: 9, light: [.65, .25, .5], shade: .15 });
  c.beginPath(); c.moveTo(56, -14); c.quadraticCurveTo(100, -10, 124, 6); c.quadraticCurveTo(96, 16, 56, 24); c.closePath();
  c.fillStyle = vgrad(c, -14, 24, [[0, p.beak[0]], [1, p.beak[1]]]); c.fill(); c.strokeStyle = 'rgba(120,60,10,.6)'; c.lineWidth = 2.5; c.stroke();
  c.beginPath(); c.moveTo(60, 6); c.lineTo(112, 7); c.stroke();
  flatFill(c, [[44, 26], [72, 26], [80, 58], [66, 92], [46, 76], [40, 46]], [[0, p.comb[0]], [1, p.comb[1]]], 'rgba(110,10,10,.45)');
  c.fillStyle = 'rgba(230,80,80,.55)'; c.beginPath(); c.ellipse(-14, 16, 14, 11, 0, 0, TAU); c.fill();
  return c0;
}
function tinted(src, col) { const c0 = mk(src.width, src.height), c = c0.getContext('2d'); c.drawImage(src, 0, 0); c.globalCompositeOperation = 'source-in'; c.fillStyle = col; c.fillRect(0, 0, c0.width, c0.height); return c0; }

// ---------- dibujar el pollo ----------
// (x,y) = punto en el suelo bajo el pollo
function drawChicken(c, x, y, s, o = {}) {
  const P = o.gold ? PAL.gold : PAL.white, K = o.gold ? A.chG : A.ch;
  c.save(); c.translate(x, y); c.scale(s * (o.flip ? -1 : 1), s); c.globalAlpha = o.alpha ?? 1;
  if (o.shadow !== false) { const g = c.createRadialGradient(0, 0, 0, 0, 0, 240); g.addColorStop(0, 'rgba(20,10,0,.35)'); g.addColorStop(1, 'rgba(20,10,0,0)'); c.save(); c.scale(1, .14); c.fillStyle = g; c.fillRect(-260, -260, 520, 520); c.restore(); }
  c.translate(-30, -378);
  // patas
  const ph = o.walk ?? null; const la = ph === null ? [0, 0] : [Math.sin(ph) * .42, -Math.sin(ph) * .42];
  const bob = (o.bob || 0) + (ph === null ? 0 : -Math.abs(Math.cos(ph)) * 10);
  if (!o.noLegs) [[5, 225, la[0]], [80, 225, la[1]]].forEach(([hx, hy, a]) => {
    const L = 150, ax = hx + Math.sin(-a) * L, ay = hy + Math.cos(a) * L + bob * .3;
    const lift = ph === null ? 0 : Math.max(0, Math.sin(a * 3)) * 8;
    for (const [col, lw] of [[o.sil || P.legD, 17], [o.sil || P.leg, 11]]) {
      c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.lineJoin = 'round';
      c.beginPath(); c.moveTo(hx, hy + bob); c.lineTo(ax, ay - lift); c.stroke();
      for (const [ta, tl] of [[.12, 48], [.5, 40], [-.3, 40], [Math.PI - .25, 24]]) { c.beginPath(); c.moveTo(ax, ay - lift); c.lineTo(ax + Math.cos(ta) * tl, ay - lift + Math.sin(ta) * tl * .35 + 4); c.stroke(); }
    }
  });
  c.translate(0, bob);
  c.translate(40, 220); c.rotate(o.tilt || 0); c.translate(-40, -220);
  const inf = o.inflate || 0; c.translate(0, 80); c.scale(1 + inf, 1 + inf * .75); c.translate(0, -80);
  c.drawImage(o.sil ? A.chSil : (o.glass ? A.chGlass : K.body), -430, -470);
  if (o.head !== false) {
    c.save(); c.translate(170 + inf * 20, -305 - inf * 30); c.rotate(o.headRot || 0);
    c.drawImage(o.sil ? A.headSil : K.head, -180, -190);
    if (!o.sil) { const bl = o.blink ? 1 - clamp(1 - Math.abs(o.blink) * 8) : 1; c.fillStyle = '#1a1210'; c.beginPath(); c.ellipse(24, -14, 11, 11 * Math.max(.08, bl), 0, 0, TAU); c.fill(); if (bl > .5) { c.fillStyle = '#fff'; c.beginPath(); c.arc(28, -18, 4, 0, TAU); c.fill(); } }
    c.restore();
  } else if (!o.sil && !o.glass) {
    c.save(); c.translate(164, -253);
    c.fillStyle = '#6e0c12'; c.beginPath(); c.ellipse(0, 0, 44, 15, -.05, 0, TAU); c.fill();
    c.fillStyle = '#c81f2a'; c.beginPath(); c.ellipse(0, 1, 37, 11, -.05, 0, TAU); c.fill();
    c.fillStyle = '#f4e9dc'; c.beginPath(); c.ellipse(4, 1, 8, 4, 0, 0, TAU); c.fill();
    c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.ellipse(-16, -3, 12, 3, -.1, 0, TAU); c.fill();
    c.restore();
  }
  if (o.extra) o.extra(c);
  c.restore();
}
// coordenadas de pantalla del cuello del pollo
function neckPos(x, y, s, o = {}) { const inf = o.inflate || 0; return [x + (164 - 30) * s * (o.flip ? -1 : 1), y + (-378 - 253 - inf * 40 + (o.bob || 0)) * s]; }

// ---------- pasto ----------
function makeGrass(w, h, o) {
  const c0 = mk(w, h), g = c0.getContext('2d'), r = mulberry(o.seed || 3);
  g.fillStyle = vgrad(g, 0, h, [[0, o.far], [1, o.near]]); g.fillRect(0, 0, w, h);
  const bl = []; for (let i = 0; i < (o.n || 45000); i++) { bl.push([r() * w, Math.pow(r(), .75) * h, r(), r(), r()]); }
  bl.sort((a, b) => a[1] - b[1]); g.lineCap = 'round';
  for (const [x, y, a, b, cc] of bl) { const d = y / h, L = 3 + d * d * 70 + a * d * 40, lean = (b - .5) * .7;
    g.strokeStyle = o.cols[(cc * o.cols.length) | 0]; g.globalAlpha = .3 + a * .55; g.lineWidth = .7 + d * 2.4;
    g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + lean * L * .25, y - L * .6, x + lean * L, y - L); g.stroke(); }
  g.globalAlpha = 1; return c0;
}
// ---------- granero ----------
function makeBarn() {
  const c0 = mk(560, 560), c = c0.getContext('2d'), r = mulberry(4);
  const wall = [[40, 230], [120, 120], [280, 50], [440, 120], [520, 230], [520, 540], [40, 540]];
  c.beginPath(); wall.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.closePath();
  c.fillStyle = vgrad(c, 50, 540, [[0, '#c9443a'], [1, '#8e2a24']]); c.fill(); c.save(); c.clip();
  for (let x = 40; x < 520; x += 26) { c.strokeStyle = 'rgba(60,10,10,.35)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, 40); c.lineTo(x, 540); c.stroke(); }
  for (let i = 0; i < 2500; i++) { c.strokeStyle = r() > .5 ? 'rgba(255,160,140,.18)' : 'rgba(60,0,0,.2)'; c.lineWidth = 1.2; const x = 40 + r() * 480, y = 40 + r() * 500; c.beginPath(); c.moveTo(x, y); c.lineTo(x + (r() - .5) * 2, y + 8 + r() * 14); c.stroke(); }
  c.restore();
  c.strokeStyle = '#4a1d18'; c.lineWidth = 26; c.lineJoin = 'round'; c.beginPath(); c.moveTo(20, 245); c.lineTo(120, 112); c.lineTo(280, 38); c.lineTo(440, 112); c.lineTo(540, 245); c.stroke();
  c.strokeStyle = '#f4eadb'; c.lineWidth = 10; c.strokeRect(190, 330, 180, 210); c.beginPath(); c.moveTo(190, 330); c.lineTo(370, 540); c.moveTo(370, 330); c.lineTo(190, 540); c.stroke();
  c.fillStyle = '#3a1612'; c.fillRect(240, 170, 80, 80); c.strokeRect(240, 170, 80, 80);
  c.beginPath(); c.moveTo(240, 210); c.lineTo(320, 210); c.moveTo(280, 170); c.lineTo(280, 250); c.stroke();
  return c0;
}
function makeTree(seed, col = ['#6f9a48', '#3f6a2c']) {
  const c0 = mk(360, 480), c = c0.getContext('2d');
  c.fillStyle = '#5a3b26'; c.beginPath(); c.moveTo(165, 470); c.lineTo(172, 260); c.lineTo(190, 260); c.lineTo(198, 470); c.fill();
  furFill(c, ellipsePts(180, 190, 150, 160, 18, 0, .25, seed), { grad: [[0, col[0]], [1, col[1]]], cols: ['#8fbf5c', '#4c7a33', '#a6cf6e', '#365c25'], alpha: [.3, .7], len: [6, 14], density: 22, spread: 3, fringe: ['#8fbf5c', '#3f6a2c'], fringeLen: 10, seed, light: [.35, .2, .3], shade: .3 });
  return c0;
}
function makeCloud(seed, col = ['#ffffff', '#c9d6e6']) {
  const c0 = mk(520, 240), c = c0.getContext('2d'), r = mulberry(seed);
  c.fillStyle = vgrad(c, 40, 220, [[0, col[0]], [1, col[1]]]); c.beginPath();
  const n = 5; for (let i = 0; i < n; i++) { const x = 80 + i * 90 + (r() - .5) * 30, rr = 50 + r() * 50 + (i == 2 ? 30 : 0); c.moveTo(x + rr, 190 - rr * .6); c.arc(x, 190 - rr * .6, rr, 0, TAU); }
  c.rect(60, 150, 400, 50); c.fill(); return c0;
}
function makeCoin() {
  const c0 = mk(130, 130), c = c0.getContext('2d');
  c.fillStyle = '#9a6a12'; c.beginPath(); c.arc(65, 68, 58, 0, TAU); c.fill();
  const g = c.createRadialGradient(48, 45, 5, 65, 65, 60); g.addColorStop(0, '#fff2b0'); g.addColorStop(.5, '#f2c04a'); g.addColorStop(1, '#c48a22');
  c.fillStyle = g; c.beginPath(); c.arc(65, 63, 56, 0, TAU); c.fill();
  c.strokeStyle = 'rgba(150,100,20,.7)'; c.lineWidth = 4; c.beginPath(); c.arc(65, 63, 44, 0, TAU); c.stroke();
  c.fillStyle = '#b07a1a'; c.font = '900 64px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('$', 65, 66);
  c.fillStyle = '#ffe9a0'; c.fillText('$', 63, 62); return c0;
}
function makeTent() {
  const c0 = mk(900, 800), c = c0.getContext('2d');
  const body = [[110, 380], [790, 380], [820, 790], [80, 790]];
  c.save(); c.beginPath(); body.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.closePath(); c.clip();
  for (let i = 0; i < 18; i++) { c.fillStyle = i % 2 ? '#f1e3c6' : '#c8323a'; c.beginPath(); c.moveTo(80 + i * 42, 380); c.lineTo(122 + i * 42, 380); c.lineTo(122 + i * 46 - 20, 800); c.lineTo(80 + i * 46 - 20, 800); c.fill(); }
  c.fillStyle = vgrad(c, 380, 790, [[0, 'rgba(0,0,0,.35)'], [.3, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.4)']]); c.fillRect(0, 380, 900, 420); c.restore();
  c.save(); c.beginPath(); c.moveTo(450, 40); c.lineTo(860, 400); c.lineTo(40, 400); c.closePath(); c.clip();
  for (let i = 0; i < 14; i++) { c.fillStyle = i % 2 ? '#f1e3c6' : '#c8323a'; const a0 = 40 + i * 60; c.beginPath(); c.moveTo(450, 40); c.lineTo(a0, 400); c.lineTo(a0 + 60, 400); c.fill(); }
  c.fillStyle = vgrad(c, 40, 400, [[0, 'rgba(255,255,255,.15)'], [1, 'rgba(0,0,0,.35)']]); c.fillRect(0, 0, 900, 400); c.restore();
  c.fillStyle = '#f2c94c'; for (let i = 0; i < 15; i++) { c.beginPath(); c.moveTo(40 + i * 55, 395); c.lineTo(95 + i * 55, 395); c.lineTo(67 + i * 55, 440); c.fill(); }
  c.fillStyle = '#1a0c10'; c.beginPath(); c.moveTo(370, 790); c.lineTo(400, 520); c.quadraticCurveTo(450, 470, 500, 520); c.lineTo(530, 790); c.fill();
  c.strokeStyle = '#3a2a2a'; c.lineWidth = 6; c.beginPath(); c.moveTo(450, 40); c.lineTo(450, -10); c.stroke();
  c.fillStyle = '#f2c94c'; c.beginPath(); c.moveTo(450, -10); c.lineTo(520, 8); c.lineTo(450, 28); c.fill();
  return c0;
}
function makeMotel() {
  const c0 = mk(1300, 560), c = c0.getContext('2d'), r = mulberry(8);
  c.fillStyle = vgrad(c, 120, 560, [[0, '#33465f'], [1, '#1d2a3c']]); c.fillRect(40, 140, 1220, 420);
  for (let i = 0; i < 1800; i++) { c.fillStyle = r() > .5 ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.08)'; c.fillRect(40 + r() * 1220, 140 + r() * 420, 2 + r() * 6, 1.5); }
  c.fillStyle = '#18202e'; c.fillRect(0, 100, 1300, 50); c.fillStyle = '#4a5d78'; c.fillRect(0, 100, 1300, 6);
  for (let i = 0; i < 6; i++) { const x = 90 + i * 200; c.fillStyle = '#121a26'; c.fillRect(x, 300, 80, 260); c.fillStyle = '#0d1520'; c.fillRect(x + 100, 260, 80, 110); c.strokeStyle = '#4a5d78'; c.lineWidth = 4; c.strokeRect(x + 100, 260, 80, 110); c.fillStyle = '#b8c2d0'; c.font = '800 26px Nunito'; c.fillText(String(i + 1), x + 30, 290); }
  return c0;
}
function makeGrain() {
  const out = []; for (let k = 0; k < 4; k++) { const c0 = mk(540, 960), c = c0.getContext('2d'), id = c.createImageData(540, 960), r = mulberry(100 + k);
    for (let i = 0; i < id.data.length; i += 4) { const v = 128 + (r() - .5) * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; }
    c.putImageData(id, 0, 0); out.push(c0); } return out;
}
function makeVignette() { const c0 = mk(W, H), c = c0.getContext('2d'); const g = c.createRadialGradient(W / 2, H * .5, H * .25, W / 2, H * .5, H * .75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.45)'); c.fillStyle = g; c.fillRect(0, 0, W, H); return c0; }
function makeDot() { const c0 = mk(64, 64), c = c0.getContext('2d'); const g = c.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.25, 'rgba(255,255,255,.6)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(0, 0, 64, 64); return c0; }
function tintDot(col) { return tinted(A.dot, col); }

async function buildAssets() {
  await document.fonts.load('800 68px Nunito'); await document.fonts.load('900 150px Nunito');
  A.ch = { body: buildBody(PAL.white), head: buildHead(PAL.white) };
  A.chG = { body: buildBody(PAL.gold), head: buildHead(PAL.gold) };
  A.chGlass = tinted(A.ch.body, 'rgba(150,210,255,.22)');
  A.chSil = tinted(A.ch.body, '#1a1206'); A.headSil = tinted(A.ch.head, '#1a1206');
  A.grassSun = makeGrass(1500, 1100, { far: '#a39a42', near: '#56701f', cols: ['#c9c66a', '#88a034', '#e0d58a', '#4d6a1a', '#9fb048'], seed: 3 });
  A.grassDay = makeGrass(1500, 1100, { far: '#9cc25a', near: '#3f7a25', cols: ['#b5dc6e', '#5f9a35', '#d2ea8e', '#2f6420', '#86b84a'], seed: 5 });
  A.grassDusk = makeGrass(1500, 1100, { far: '#8a7a58', near: '#3c4a28', cols: ['#b0a070', '#6a7a3a', '#c8b48a', '#34421e'], seed: 6 });
  A.barn = makeBarn(); A.tree1 = makeTree(21); A.tree2 = makeTree(33);
  A.cloud = [makeCloud(1), makeCloud(2), makeCloud(3)]; A.cloudW = [makeCloud(4, ['#ffe3cf', '#d98f86']), makeCloud(5, ['#ffd9c2', '#c7808a'])];
  A.coin = makeCoin(); A.tent = makeTent(); A.motel = makeMotel();
  A.grain = makeGrain(); A.vig = makeVignette(); A.dot = makeDot();
  A.dotWarm = tintDot('rgb(255,214,140)'); A.dotBlue = tintDot('rgb(170,215,255)'); A.dotPink = tintDot('rgb(255,120,190)');
}
