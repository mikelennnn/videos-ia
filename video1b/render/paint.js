// ---------- Kit de pintura de alta calidad ----------
const P2 = {};
// nube pintada con volumen
function paintCloud(w, h, seed, lit = ['#ffffff', '#fff6f0'], shade = ['#dfe6f2', '#b8c4dc']) {
  const v = mk(w, h), c = v.getContext('2d'), r = mulberry(seed);
  const blobs = []; const n = 9 + (r() * 5 | 0);
  for (let i = 0; i < n; i++) { const u = i / (n - 1); blobs.push([w * (.12 + u * .76) + (r() - .5) * 30, h * .62 - Math.sin(u * Math.PI) * h * (.18 + r() * .2), h * (.16 + Math.sin(u * Math.PI) * .2 + r() * .08)]); }
  const shape = () => { c.beginPath(); blobs.forEach(([x, y, rr]) => { c.moveTo(x + rr, y); c.arc(x, y, rr, 0, TAU); }); c.rect(w * .1, h * .62, w * .8, h * .14); };
  c.save(); c.filter = 'blur(2px)'; shape(); c.fillStyle = vgrad(c, h * .15, h * .78, [[0, lit[0]], [.55, lit[1]], [1, shade[0]]]); c.fill(); c.restore();
  c.save(); shape(); c.clip();
  blobs.forEach(([x, y, rr]) => { const g = c.createRadialGradient(x - rr * .35, y - rr * .45, rr * .1, x, y, rr * 1.1); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(.6, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(x - rr * 1.2, y - rr * 1.2, rr * 2.4, rr * 2.4);
    const g2 = c.createRadialGradient(x + rr * .2, y + rr * .5, rr * .2, x, y + rr * .4, rr); g2.addColorStop(0, `rgba(150,165,200,.22)`); g2.addColorStop(1, 'rgba(120,135,175,0)'); c.fillStyle = g2; c.fillRect(x - rr * 1.2, y - rr, rr * 2.4, rr * 2.4); });
  c.fillStyle = vgrad(c, h * .5, h * .78, [[0, 'rgba(0,0,0,0)'], [1, shade[1] + '99']]); c.fillRect(0, h * .5, w, h * .3);
  c.restore(); return v;
}
// capa de cerros con neblina atmosférica
function hillLayer(w, h, base, top, amp, seed, blur = 0, treeCol = null) {
  const v = mk(w, h), c = v.getContext('2d'), r = mulberry(seed);
  c.save(); if (blur) c.filter = `blur(${blur}px)`;
  const pts = []; for (let x = -20; x <= w + 20; x += 16) pts.push([x, h * .35 + Math.sin(x * .004 + seed) * amp + Math.sin(x * .011 + seed * 2.3) * amp * .4 + Math.sin(x * .03 + seed) * amp * .08]);
  c.beginPath(); c.moveTo(-20, h); pts.forEach(p => c.lineTo(...p)); c.lineTo(w + 20, h); c.closePath(); c.fillStyle = vgrad(c, h * .2, h, [[0, top], [1, base]]); c.fill();
  if (treeCol) for (let i = 0; i < 70; i++) { const x = r() * w, p = pts[Math.min(pts.length - 1, Math.max(0, Math.round((x + 20) / 16)))]; const s = 6 + r() * 12; c.fillStyle = treeCol; c.beginPath(); c.arc(x, p[1] + s * .4, s, 0, TAU); c.arc(x + s * .7, p[1] + s * .6, s * .8, 0, TAU); c.fill(); }
  c.restore(); return v;
}
// árbol frondoso: miles de hojas iluminadas desde arriba a la izquierda
function paintTree(w, h, seed, pal = ['#b8e070', '#7ab448', '#3f7a2c', '#1d4018']) {
  const v = mk(w, h), c = v.getContext('2d'), r = mulberry(seed); const tx = w / 2;
  c.fillStyle = vgrad(c, h * .5, h, [[0, '#6a4a30'], [1, '#3a2616']]); c.beginPath(); c.moveTo(tx - 24, h); c.quadraticCurveTo(tx - 10, h * .72, tx - 8, h * .5); c.lineTo(tx + 10, h * .5); c.quadraticCurveTo(tx + 14, h * .74, tx + 28, h); c.fill();
  c.strokeStyle = 'rgba(30,15,5,.4)'; c.lineWidth = 2; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(tx - 12 + k * 5, h); c.lineTo(tx - 6 + k * 3, h * .55); c.stroke(); }
  const cx = tx, cy = h * .36, rx = w * .44, ry = h * .32;
  const lobes = []; for (let i = 0; i < 9; i++) { const a = i / 9 * TAU + r() * .4; lobes.push([cx + Math.cos(a) * rx * .55, cy + Math.sin(a) * ry * .55, rx * (.45 + r() * .15)]); }
  const inside = (x, y) => lobes.some(([lx, ly, lr]) => (x - lx) ** 2 + ((y - ly) * 1.15) ** 2 < lr * lr);
  c.fillStyle = pal[3]; lobes.forEach(([x, y, rr]) => { c.beginPath(); c.ellipse(x, y + 6, rr, rr * .87, 0, 0, TAU); c.fill(); });
  for (let i = 0; i < 4200; i++) { const x = cx + (r() - .5) * rx * 2.2, y = cy + (r() - .5) * ry * 2.2; if (!inside(x, y)) continue;
    const lit = clamp(.55 - ((x - cx) / rx) * .35 - ((y - cy) / ry) * .45 + (r() - .5) * .35);
    const col = lit > .78 ? pal[0] : lit > .5 ? pal[1] : lit > .25 ? pal[2] : pal[3];
    c.fillStyle = col; c.beginPath(); c.ellipse(x, y, 6 + r() * 5, 3.5 + r() * 2.5, r() * TAU, 0, TAU); c.fill(); }
  const g = c.createRadialGradient(cx - rx * .35, cy - ry * .45, 5, cx - rx * .3, cy - ry * .4, rx); g.addColorStop(0, 'rgba(255,255,200,.25)'); g.addColorStop(1, 'rgba(255,255,200,0)'); c.globalCompositeOperation = 'source-atop'; c.fillStyle = g; c.fillRect(0, 0, w, h); c.globalCompositeOperation = 'source-over';
  return v;
}
// granero en perspectiva 3/4
function paintBarn(s = 1) {
  const v = mk(900 * s, 760 * s), c = v.getContext('2d'); c.scale(s, s); const r = mulberry(5);
  const planks = (pts, cols, dir) => { c.save(); c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.closePath(); c.fillStyle = vgrad(c, 120, 740, cols); c.fill(); c.clip();
    for (let x = 0; x < 900; x += 22) { c.strokeStyle = 'rgba(60,10,10,.35)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, 0); c.lineTo(x + dir * 40, 760); c.stroke(); }
    for (let i = 0; i < 900; i++) { c.fillStyle = r() > .5 ? 'rgba(255,170,150,.08)' : 'rgba(40,0,0,.1)'; c.fillRect(r() * 900, r() * 760, 1.5, 6 + r() * 14); } c.restore(); };
  // pared lateral (sombra)
  planks([[430, 300], [850, 260], [850, 700], [430, 740]], [[0, '#8a2a24'], [1, '#5a1814']], 0);
  // frente (luz)
  planks([[60, 300], [140, 170], [245, 90], [350, 170], [430, 300], [430, 740], [60, 740]], [[0, '#d24a3c'], [1, '#9a2a22']], 0);
  // techo lateral
  c.fillStyle = vgrad(c, 60, 320, [[0, '#4a3a3a'], [1, '#2a1e1e']]); c.beginPath(); c.moveTo(245, 80); c.lineTo(640, 50); c.lineTo(870, 250); c.lineTo(440, 300); c.lineTo(350, 160); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.08)'; c.lineWidth = 3; for (let k = 1; k < 9; k++) { const u = k / 9; c.beginPath(); c.moveTo(lerp(245, 440, u), lerp(80, 300, u)); c.lineTo(lerp(640, 870, u), lerp(50, 250, u)); c.stroke(); }
  // molduras blancas
  c.strokeStyle = '#f4ece0'; c.lineWidth = 14; c.lineJoin = 'round'; c.beginPath(); c.moveTo(50, 306); c.lineTo(140, 166); c.lineTo(245, 84); c.lineTo(350, 166); c.lineTo(440, 306); c.stroke();
  c.lineWidth = 10; c.strokeRect(150, 440, 190, 300); c.beginPath(); c.moveTo(150, 440); c.lineTo(340, 740); c.moveTo(340, 440); c.lineTo(150, 740); c.stroke();
  c.fillStyle = '#2a1410'; c.fillRect(205, 220, 80, 90); c.strokeRect(205, 220, 80, 90); c.fillStyle = 'rgba(255,220,150,.5)'; c.fillRect(212, 228, 66, 74);
  c.strokeStyle = '#d8ccc0'; c.lineWidth = 8; c.strokeRect(560, 420, 160, 140); c.fillStyle = '#3a1a14'; c.fillRect(564, 424, 152, 132);
  // sombra de contacto
  c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(60, 728, 790, 12);
  return v;
}
function paintSilo() { const v = mk(220, 760), c = v.getContext('2d');
  const g = c.createLinearGradient(20, 0, 200, 0); g.addColorStop(0, '#d8d4cc'); g.addColorStop(.35, '#f4f0e8'); g.addColorStop(1, '#8a8680'); c.fillStyle = g; c.fillRect(20, 140, 180, 620);
  c.strokeStyle = 'rgba(90,80,70,.35)'; c.lineWidth = 3; for (let y = 180; y < 760; y += 40) { c.beginPath(); c.ellipse(110, y, 90, 10, 0, 0, Math.PI); c.stroke(); }
  c.fillStyle = vgrad(c, 40, 150, [[0, '#c8c4bc'], [1, '#7a7670']]); c.beginPath(); c.ellipse(110, 140, 92, 100, 0, Math.PI, TAU); c.fill(); return v; }
// pasto pintado con profundidad
function paintGrass(w, h, pal, seed) {
  const v = mk(w, h), c = v.getContext('2d'), r = mulberry(seed);
  c.fillStyle = vgrad(c, 0, h, [[0, pal.far], [.5, pal.mid], [1, pal.near]]); c.fillRect(0, 0, w, h);
  for (let i = 0; i < 300; i++) { const x = r() * w, y = r() * h, rr = 40 + r() * 140; const g = c.createRadialGradient(x, y, 0, x, y, rr); g.addColorStop(0, r() > .5 ? 'rgba(255,255,200,.08)' : 'rgba(0,40,0,.08)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
  const tufts = []; for (let i = 0; i < 2600; i++) tufts.push([r() * w, Math.pow(r(), .7) * h, r()]); tufts.sort((a, b) => a[1] - b[1]);
  for (const [x, y, q] of tufts) { const d = y / h, L = 6 + d * d * 70, n = 3 + (q * 4 | 0);
    for (let k = 0; k < n; k++) { const ang = -Math.PI / 2 + (k - n / 2) * .18 + (r() - .5) * .3, wd = 1 + d * 3.2; const col = pal.blades[(r() * pal.blades.length) | 0];
      c.fillStyle = col; c.beginPath(); c.moveTo(x - wd, y); c.quadraticCurveTo(x + Math.cos(ang) * L * .5, y + Math.sin(ang) * L * .5, x + Math.cos(ang) * L + (r() - .5) * 6, y + Math.sin(ang) * L); c.lineTo(x + wd, y); c.fill(); } }
  for (let i = 0; i < 160; i++) { const x = r() * w, y = h * .3 + r() * h * .7, d = y / h, s = 2 + d * 7; c.fillStyle = pal.flowers[(r() * pal.flowers.length) | 0]; for (let k = 0; k < 5; k++) { const a = k / 5 * TAU; c.beginPath(); c.arc(x + Math.cos(a) * s, y + Math.sin(a) * s, s * .7, 0, TAU); c.fill(); } c.fillStyle = '#ffd84a'; c.beginPath(); c.arc(x, y, s * .6, 0, TAU); c.fill(); }
  return v;
}
// briznas grandes en primer plano (desenfocadas)
function paintForeGrass(w, h, pal, seed) { const v = mk(w, h), c = v.getContext('2d'), r = mulberry(seed); c.filter = 'blur(5px)';
  for (let i = 0; i < 90; i++) { const x = r() * w, L = h * (.4 + r() * .6), ang = -Math.PI / 2 + (r() - .5) * .5, wd = 8 + r() * 10; c.fillStyle = pal[(r() * pal.length) | 0]; c.beginPath(); c.moveTo(x - wd, h); c.quadraticCurveTo(x + Math.cos(ang) * L * .4, h + Math.sin(ang) * L * .5, x + Math.cos(ang) * L, h + Math.sin(ang) * L); c.lineTo(x + wd, h); c.fill(); } return v; }
function godRays(c, x, y, t, col = '255,230,170', a = .12, n = 9) { c.save(); c.globalCompositeOperation = 'lighter'; c.translate(x, y); c.rotate(Math.sin(t * .2) * .05); for (let k = 0; k < n; k++) { const an = Math.PI * .55 + (k / (n - 1)) * Math.PI * .9 + Math.sin(k * 7.3) * .05, wd = .03 + hash(k) * .05; const g = c.createLinearGradient(0, 0, Math.cos(an) * 1800, Math.sin(an) * 1800); g.addColorStop(0, `rgba(${col},${a * (.6 + .4 * Math.sin(t * .7 + k))})`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(an - wd) * 2000, Math.sin(an - wd) * 2000); c.lineTo(Math.cos(an + wd) * 2000, Math.sin(an + wd) * 2000); c.fill(); } c.restore(); }
// cerca con sombras
function paintFence(c, y, s, x0 = -300, x1 = W + 300, light = '#a07a50', dark = '#5a3e26') {
  for (let x = x0; x < x1; x += 150 * s) { c.fillStyle = 'rgba(0,0,0,.18)'; c.beginPath(); c.ellipse(x + 30 * s, y + 6, 40 * s, 8 * s, 0, 0, TAU); c.fill();
    const g = c.createLinearGradient(x, 0, x + 26 * s, 0); g.addColorStop(0, light); g.addColorStop(1, dark); c.fillStyle = g; rrect(c, x, y - 150 * s, 26 * s, 156 * s, 5 * s); c.fill(); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(x + 3 * s, y - 146 * s, 5 * s, 140 * s); }
  [y - 120 * s, y - 64 * s].forEach(ry => { c.fillStyle = vgrad(c, ry, ry + 18 * s, [[0, light], [1, dark]]); c.fillRect(x0, ry, x1 - x0, 18 * s); c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(x0, ry + 18 * s, x1 - x0, 5 * s); });
}
// post-proceso: bloom + gradación de color
let bloomCv = null;
function postFX(o = {}) {
  if (!bloomCv) bloomCv = mk(W / 4, H / 4);
  const b = bloomCv.getContext('2d'); b.clearRect(0, 0, W / 4, H / 4); b.filter = 'brightness(1.3) contrast(1.4) blur(6px)'; b.drawImage(cv, 0, 0, W / 4, H / 4); b.filter = 'none';
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = o.bloom ?? .28; ctx.drawImage(bloomCv, 0, 0, W, H);
  if (o.grade) { ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = o.gradeA ?? .35; ctx.fillStyle = vgrad(ctx, 0, H, o.grade); ctx.fillRect(0, 0, W, H); }
  ctx.restore();
}

function tintCopy(src, filter) { const v = mk(src.width, src.height), c = v.getContext('2d'); c.filter = filter; c.drawImage(src, 0, 0); return v; }
