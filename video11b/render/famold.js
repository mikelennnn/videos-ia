// ---------- Famosos en el estilo clásico (texturas de pelo/tela como Beto y el trabajador) ----------
function buildHeadV(skin, hair, style, seed) {
  const h = mk(420, 560), c = h.getContext('2d'); c.translate(210, 230);
  const sb = [[0, skin[0]], [1, skin[1]]], line = skin[2];
  const hairFur = { grad: [[0, hair[0]], [1, hair[1]]], cols: [hair[2], hair[1], hair[0]], alpha: [.35, .8], len: [10, 24], density: 30, angle: 1.45, spread: .6, seed, fringe: [hair[0], hair[1], hair[2]], fringeLen: 13, light: [.4, .1, .25] };
  // cabello de atrás (largo / chongo)
  if (style === 'long') furFill(c, [[-128, -60], [-150, 60], [-150, 200], [-110, 260], [-60, 230], [60, 230], [110, 260], [150, 200], [150, 60], [128, -60], [0, -150]], { ...hairFur, seed: seed + 1, angle: 1.57, spread: .3, len: [16, 34] });
  if (style === 'bun') furFill(c, ellipsePts(0, -150, 62, 52, 20, 0, .1, seed + 2), { ...hairFur, seed: seed + 2, spread: 2 });
  if (style === 'curly') furFill(c, ellipsePts(0, -40, 160, 150, 26, 0, .25, seed + 3), { ...hairFur, seed: seed + 3, spread: 3, len: [6, 14], fringeLen: 18 });
  [[-108, 10], [108, 10]].forEach(([x, y]) => { texFill(c, ellipsePts(x, y, 28, 34, 16), sb, { outline: line }); c.fillStyle = 'rgba(160,90,60,.35)'; c.beginPath(); c.ellipse(x * .98, y, 12, 18, 0, 0, TAU); c.fill(); });
  texFill(c, ellipsePts(0, 0, 110, 120, 30, 0, .02, 4), sb, { outline: line, light: [.4, .25, .35], shade: .12 });
  // cabello de enfrente
  if (style === 'short' || style === 'bun') furFill(c, [[-122, 10], [-128, -60], [-100, -118], [-40, -150], [30, -152], [95, -125], [126, -70], [124, 0], [104, -40], [80, -72], [50, -58], [30, -80], [0, -64], [-30, -86], [-55, -60], [-85, -70], [-104, -30]], hairFur);
  if (style === 'long') furFill(c, [[-130, 40], [-132, -60], [-100, -122], [-30, -152], [40, -152], [100, -122], [132, -60], [130, 40], [112, -20], [90, -70], [30, -96], [-20, -86], [-70, -60], [-104, -20]], { ...hairFur, seed: seed + 4 });
  if (style === 'buzz') furFill(c, [[-112, -30], [-108, -100], [-60, -138], [0, -146], [60, -138], [108, -100], [112, -30], [90, -72], [0, -96], [-90, -72]], { ...hairFur, len: [5, 10], fringeLen: 6 });
  if (style === 'curly') furFill(c, [[-120, 0], [-130, -80], [-80, -150], [0, -170], [80, -150], [130, -80], [120, 0], [100, -60], [40, -90], [-40, -90], [-100, -60]], { ...hairFur, seed: seed + 5, spread: 3, len: [6, 14], fringeLen: 16 });
  return h;
}
function buildTorsoV(col, colD, seed, deco) {
  const t = mk(400, 380), d = t.getContext('2d'); d.translate(200, 600);
  const shirt = [[-140, -560], [-60, -575], [0, -560], [60, -575], [140, -560], [150, -500], [128, -400], [122, -262], [0, -252], [-122, -262], [-128, -400], [-150, -500]];
  texFill(d, shirt, [[0, col], [1, colD]], { outline: colD, alpha: [.06, .16], len: [12, 30], density: 10, shade: .3, seed });
  d.strokeStyle = colD; d.lineWidth = 8; d.lineCap = 'round'; d.beginPath(); d.moveTo(-34, -566); d.quadraticCurveTo(0, -530, 34, -566); d.stroke();
  d.strokeStyle = 'rgba(0,0,0,.18)'; d.lineWidth = 3; [[-60, -420, -40, -330], [50, -470, 70, -360]].forEach(([a, b, e, f]) => { d.beginPath(); d.moveTo(a, b); d.quadraticCurveTo((a + e) / 2 + 10, (b + f) / 2, e, f); d.stroke(); });
  if (deco === 'star') drawStar(d, 0, -440, 40, '#ffe08a');
  if (deco === 'heart') { d.fillStyle = '#fff'; d.beginPath(); d.moveTo(0, -400); d.bezierCurveTo(-50, -440, -30, -480, 0, -460); d.bezierCurveTo(30, -480, 50, -440, 0, -400); d.fill(); }
  if (deco === 'chain') { d.strokeStyle = '#ffd84a'; d.lineWidth = 7; d.beginPath(); d.arc(0, -560, 70, .5, Math.PI - .5); d.stroke(); d.fillStyle = '#ffd84a'; d.beginPath(); d.arc(0, -494, 14, 0, TAU); d.fill(); }
  if (deco === 'stripes') { d.save(); d.beginPath(); shirt.forEach((p, i) => i ? d.lineTo(...p) : d.moveTo(...p)); d.clip(); d.fillStyle = 'rgba(255,255,255,.35)'; for (let y = -560; y < -250; y += 44) d.fillRect(-160, y, 320, 18); d.restore(); }
  if (deco === 'sparkle') for (let k = 0; k < 14; k++) { d.fillStyle = 'rgba(255,255,255,.75)'; drawStar(d, -100 + hash(k + seed) * 200, -540 + hash(k * 3 + seed) * 260, 6 + hash(k) * 6, 'rgba(255,255,255,.8)', 4); }
  return t;
}
const SK = { a: ['#ffe0c8', '#e8ae88', '#a86c48'], b: ['#f6cfa0', '#dba274', '#9a6440'], c: ['#dca478', '#b0764c', '#7a4a2a'], d: ['#b88058', '#8a5634', '#5a321a'] };
const HR = { black: ['#3a2a20', '#140c08', '#5a4030'], brown: ['#6a4428', '#3a2414', '#8a6040'], blonde: ['#f2d68a', '#c89a4a', '#fff0c0'], platinum: ['#f8f0e0', '#d0c4a8', '#ffffff'], red: ['#a83a3a', '#5a1414', '#d86a5a'], gray: ['#e8dcc8', '#b8a88a', '#ffffff'] };
const FAMOLD = {
  'Doña Alegría': { skin: SK.a, hair: HR.gray, style: 'curly', shirt: ['#ff7aa8', '#c83a6a'], deco: 'heart', glasses: true },
  'Karely Ruiz': { skin: SK.b, hair: HR.black, style: 'long', shirt: ['#ff4a6a', '#a81a3a'], deco: 'sparkle', lashes: true },
  'Paolita Suárez': { skin: SK.b, hair: HR.blonde, style: 'long', shirt: ['#ffd84a', '#c8902a'], deco: 'sparkle', lashes: true },
  'Rod Contreras': { skin: SK.b, hair: HR.black, style: 'short', shirt: ['#3a3a48', '#16161e'], deco: 'chain', beard: true },
  'Abel Robles': { skin: SK.c, hair: HR.black, style: 'buzz', shirt: ['#4a8ad8', '#1e4a90'], deco: 'stripes', beard: true },
  'Dani Flow': { skin: SK.c, hair: HR.black, style: 'buzz', shirt: ['#2a2a30', '#0a0a10'], deco: 'chain', shades: true },
  'Edwin Mendoza': { skin: SK.b, hair: HR.brown, style: 'short', shirt: ['#2ab07a', '#14603e'], deco: 'star' },
  'Odette Orlena': { skin: SK.a, hair: HR.red, style: 'long', shirt: ['#b05ad8', '#6a2a98'], deco: 'sparkle', lashes: true },
  'Bellakath': { skin: SK.b, hair: HR.platinum, style: 'long', shirt: ['#ff5ab0', '#b0206a'], deco: 'sparkle', lashes: true },
  'Cintia Cossio': { skin: SK.b, hair: HR.brown, style: 'long', shirt: ['#f4f2ee', '#b8b0a8'], deco: 'heart', lashes: true },
  'Itatí López': { skin: SK.a, hair: HR.brown, style: 'bun', shirt: ['#3ac8c8', '#1a7a80'], deco: 'stripes', lashes: true },
  'JLexis': { skin: SK.c, hair: HR.black, style: 'short', shirt: ['#ff8a2a', '#b0500a'], deco: 'star' },
  'Jorjais': { skin: SK.d, hair: HR.black, style: 'curly', shirt: ['#ffd84a', '#c89a2a'], deco: 'stripes' },
  'João Ferreira': { skin: SK.a, hair: HR.brown, style: 'short', shirt: ['#e8e8f0', '#9aa0b0'], deco: 'chain', beard: true },
  'La Cukis': { skin: SK.b, hair: HR.black, style: 'long', shirt: ['#8a5ae8', '#4a2a98'], deco: 'heart', lashes: true },
  'Tony Aguirre': { skin: SK.b, hair: HR.brown, style: 'short', shirt: ['#c8302e', '#7a1414'], deco: 'star', glasses: true },
};
const FAM_NAMES = Object.keys(FAMOLD);
function buildFamOld() { FAM_NAMES.forEach((n, i) => { const f = FAMOLD[n]; f.headImg = buildHeadV(f.skin, f.hair, f.style, 30 + i * 7); f.torsoImg = buildTorsoV(f.shirt[0], f.shirt[1], 50 + i, f.deco); }); }
function famOld(c, name, x, y, s, o = {}) { const f = FAMOLD[name];
  drawBeto(c, x, y, s, { ...o, headImg: f.headImg, torsoImg: f.torsoImg, skinCol: f.skin[0], sleeve: f.shirt[0], sleeveD: f.shirt[1], prop: (c, P) => { const hy = -700;
    if (f.glasses) { c.strokeStyle = '#2a2a30'; c.lineWidth = 6; [-42, 42].forEach(ex => { c.beginPath(); c.arc(ex, hy - 5, 30, 0, TAU); c.stroke(); }); c.beginPath(); c.moveTo(-12, hy - 8); c.lineTo(12, hy - 8); c.stroke(); c.fillStyle = 'rgba(200,230,255,.18)'; [-42, 42].forEach(ex => { c.beginPath(); c.arc(ex, hy - 5, 28, 0, TAU); c.fill(); }); }
    if (f.shades) { c.fillStyle = '#121216'; [-42, 42].forEach(ex => { rrect(c, ex - 32, hy - 30, 64, 44, 14); c.fill(); }); c.fillRect(-14, hy - 16, 28, 8); c.fillStyle = 'rgba(255,255,255,.3)'; [-42, 42].forEach(ex => { c.fillRect(ex - 20, hy - 24, 14, 6); }); }
    if (f.beard) { c.fillStyle = 'rgba(40,24,14,.35)'; c.beginPath(); c.moveTo(-90, hy + 20); c.quadraticCurveTo(0, hy + 160, 90, hy + 20); c.quadraticCurveTo(0, hy + 110, -90, hy + 20); c.fill(); }
    if (f.lashes && !(o.expr === 'bliss' || o.expr === 'sleep')) { c.strokeStyle = '#1a0e08'; c.lineWidth = 4; c.lineCap = 'round'; [-1, 1].forEach(sd => { for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(sd * (42 + 14 + k * 4), hy - 26 + k * 7); c.lineTo(sd * (42 + 26 + k * 5), hy - 34 + k * 7); c.stroke(); } }); c.fillStyle = 'rgba(220,60,90,.55)'; c.beginPath(); c.ellipse(0, hy + 64, 20, 6, 0, 0, TAU); c.fill(); }
    if (o.prop2) o.prop2(c, P); } });
  if (o.tag !== false) nameTag(c, name, x, y - (1010 + (f.style === 'curly' ? 60 : 30)) * s - (o.tagUp || 0), o.tagS || Math.max(.42, s * 1.1), o.tagCol);
}
function nameTag(c, name, x, y, s = 1, col) { c.save(); c.translate(x, y); c.scale(s, s); c.font = '800 40px Nunito'; const w = c.measureText(name).width + 40; c.shadowColor = 'rgba(0,0,0,.35)'; c.shadowBlur = 12; rrect(c, -w / 2, -28, w, 56, 28); c.fillStyle = '#ffffff'; c.fill(); c.shadowBlur = 0; c.strokeStyle = col || '#2a2a34'; c.lineWidth = 3; c.stroke(); c.fillStyle = '#1a1a22'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(name, 0, 2); c.restore(); }
