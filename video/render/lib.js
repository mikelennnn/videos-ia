// ---------- utilidades base ----------
const W = 1080, H = 1920, TAU = Math.PI * 2;
const cv = document.getElementById('c');
const ctx = cv.getContext('2d');

function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const ss = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const eOut = t => 1 - Math.pow(1 - clamp(t), 3);
const eIn = t => Math.pow(clamp(t), 3);
const eInOut = t => { t = clamp(t); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
const eBack = t => { t = clamp(t); const c1 = 2.2, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
function mk(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function spring(t, f = 9, d = 4) { if (t <= 0) return 0; return 1 - Math.exp(-d * t) * Math.cos(f * t); }

// ---------- formas suaves ----------
function smoothPath(c, pts) {
  const n = pts.length; const m = i => { const a = pts[(i + n) % n], b = pts[(i + 1 + n) % n]; return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; };
  c.beginPath(); const s = m(-1); c.moveTo(s[0], s[1]);
  for (let i = 0; i < n; i++) { const p = pts[i], e = m(i); c.quadraticCurveTo(p[0], p[1], e[0], e[1]); }
  c.closePath();
}
function sampleSmooth(pts, per = 10) {
  const n = pts.length, out = []; const m = i => { const a = pts[(i + n) % n], b = pts[(i + 1 + n) % n]; return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; };
  for (let i = 0; i < n; i++) { const s = m(i - 1), p = pts[i], e = m(i); for (let k = 0; k < per; k++) { const t = k / per; out.push([(1 - t) * (1 - t) * s[0] + 2 * (1 - t) * t * p[0] + t * t * e[0], (1 - t) * (1 - t) * s[1] + 2 * (1 - t) * t * p[1] + t * t * e[1]]); } }
  return out;
}
function ellipsePts(cx, cy, rx, ry, n = 24, rot = 0, wob = 0, seed = 1) {
  const r = mulberry(seed), out = [], cr = Math.cos(rot), sr = Math.sin(rot);
  for (let i = 0; i < n; i++) { const a = i / n * TAU, k = 1 + (r() - .5) * wob; const x = Math.cos(a) * rx * k, y = Math.sin(a) * ry * k; out.push([cx + x * cr - y * sr, cy + x * sr + y * cr]); }
  return out;
}
function bbox(pts) { let a = 1e9, b = 1e9, c = -1e9, d = -1e9; for (const p of pts) { a = Math.min(a, p[0]); b = Math.min(b, p[1]); c = Math.max(c, p[0]); d = Math.max(d, p[1]); } return [a, b, c, d]; }
function area(pts) { let s = 0; for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; s += a[0] * b[1] - b[0] * a[1]; } return s; }

// Relleno con textura de pelo/plumas (trazos finos) + flecos en el borde
function furFill(c, pts, o) {
  const r = mulberry(o.seed || 7); const [x0, y0, x1, y1] = bbox(pts);
  c.save(); smoothPath(c, pts);
  const g = c.createLinearGradient(0, y0, 0, y1); o.grad.forEach(s => g.addColorStop(s[0], s[1]));
  c.fillStyle = g; c.fill(); c.clip();
  if (o.light) { const lx = lerp(x0, x1, o.light[0]), ly = lerp(y0, y1, o.light[1]); const rg = c.createRadialGradient(lx, ly, 0, lx, ly, (x1 - x0) * .8); rg.addColorStop(0, `rgba(255,255,255,${o.light[2]})`); rg.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = rg; c.fillRect(x0, y0, x1 - x0, y1 - y0); }
  const N = (o.density || 20) * (x1 - x0) * (y1 - y0) / 1000; c.lineCap = 'round';
  for (let i = 0; i < N; i++) {
    const x = lerp(x0, x1, r()), y = lerp(y0, y1, r());
    const ang = (o.flow ? o.flow(x, y) : (o.angle || 0)) + (r() - .5) * (o.spread || .5);
    const L = o.len[0] + r() * (o.len[1] - o.len[0]);
    c.strokeStyle = o.cols[(r() * o.cols.length) | 0]; c.globalAlpha = o.alpha[0] + r() * (o.alpha[1] - o.alpha[0]); c.lineWidth = o.lw || 1.5;
    c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(ang) * L, y + Math.sin(ang) * L); c.stroke();
  }
  c.globalAlpha = 1;
  if (o.shade) { const g2 = c.createLinearGradient(0, y0, 0, y1); g2.addColorStop(0, 'rgba(0,0,0,0)'); g2.addColorStop(.55, 'rgba(0,0,0,0)'); g2.addColorStop(1, `rgba(40,20,10,${o.shade})`); c.fillStyle = g2; c.fillRect(x0, y0, x1 - x0, y1 - y0); }
  if (o.rim) { c.strokeStyle = o.rim; c.lineWidth = o.rimW || 7; c.globalAlpha = o.rimA || .55; smoothPath(c, pts); c.stroke(); c.globalAlpha = 1; }
  c.restore();
  if (o.outline) { c.save(); smoothPath(c, pts); c.strokeStyle = o.outline; c.lineWidth = 2.5; c.stroke(); c.restore(); }
  if (o.fringe) {
    const sp = sampleSmooth(pts, 14), sg = area(pts) > 0 ? 1 : -1, fl = o.fringeLen || 12; c.save(); c.lineCap = 'round';
    for (let i = 0; i < sp.length; i++) {
      const a = sp[(i - 1 + sp.length) % sp.length], b = sp[(i + 1) % sp.length]; let tx = b[0] - a[0], ty = b[1] - a[1]; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
      const nx = ty * sg, ny = -tx * sg;
      for (let k = 0; k < 2; k++) {
        const p = sp[i], j = (r() - .5) * 6; const bx = p[0] + tx * j - nx * fl * .35, by = p[1] + ty * j - ny * fl * .35;
        const an = Math.atan2(ny, nx) + (r() - .5) * .9 + (o.fringeBias || 0); const L = fl * (.6 + r() * .8);
        c.strokeStyle = o.fringe[(r() * o.fringe.length) | 0]; c.globalAlpha = .55 + r() * .45; c.lineWidth = o.fringeW || 1.7;
        c.beginPath(); c.moveTo(bx, by); c.lineTo(bx + Math.cos(an) * L, by + Math.sin(an) * L); c.stroke();
      }
    }
    c.restore();
  }
}
function flatFill(c, pts, grad, outline) {
  const [x0, y0, x1, y1] = bbox(pts); smoothPath(c, pts); const g = c.createLinearGradient(0, y0, 0, y1); grad.forEach(s => g.addColorStop(s[0], s[1])); c.fillStyle = g; c.fill();
  if (outline) { c.strokeStyle = outline; c.lineWidth = 3; c.stroke(); }
}
function rrect(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
function vgrad(c, y0, y1, stops) { const g = c.createLinearGradient(0, y0, 0, y1); stops.forEach(s => g.addColorStop(s[0], s[1])); return g; }
// col = "r,g,b"
function glow(c, x, y, r, col, a = 1) { const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${col},1)`); g.addColorStop(.35, `rgba(${col},.45)`); g.addColorStop(1, `rgba(${col},0)`); c.save(); c.globalAlpha = a; c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); c.restore(); }
