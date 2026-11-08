// ---------- overlays: subtítulos karaoke, badges, partículas, grano ----------
let WORDS = [], CHUNKS = [];
let END = 57.0;
function buildChunks() {
  CHUNKS = []; let cur = [];
  WORDS.forEach((w, i) => { cur.push(i); const nx = WORDS[i + 1]; const end = /[.,?…:!]$/.test(w.w);
    if (cur.length >= 3 || end || !nx || nx.s - w.e > .35) { CHUNKS.push(cur); cur = []; } });
}
function caption(c, t) {
  let ci = -1; for (let i = 0; i < CHUNKS.length; i++) if (WORDS[CHUNKS[i][0]].s <= t + .03) ci = i; if (ci < 0) return;
  const ch = CHUNKS[ci], last = WORDS[ch[ch.length - 1]]; if (t > last.e + .6) return;
  c.save(); c.font = '800 70px Nunito'; c.textBaseline = 'middle';
  const parts = ch.map(i => WORDS[i].w), sp = c.measureText(' ').width, ws = parts.map(p => c.measureText(p).width);
  let x = W / 2 - (ws.reduce((a, b) => a + b, 0) + sp * (parts.length - 1)) / 2; const y = 352;
  let curI = -1; ch.forEach((wi, k) => { if (WORDS[wi].s <= t + .03) curI = k; });
  ch.forEach((wi, k) => {
    const w = WORDS[wi]; if (k > curI) { x += ws[k] + sp; return; }
    const isCur = k === curI, p = eBack((t - w.s) / .16), s = isCur ? .88 + .12 * p : 1;
    c.save(); c.translate(x + ws[k] / 2, y); c.scale(s, s);
    c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 18; c.shadowOffsetY = 4;
    c.textAlign = 'center'; if (!isCur) { c.lineWidth = 5; c.strokeStyle = 'rgba(20,20,30,.28)'; c.strokeText(w.w, 0, 0); } c.fillStyle = isCur ? '#ffffff' : 'rgba(178,182,190,.95)'; c.fillText(w.w, 0, 0); c.restore();
    x += ws[k] + sp;
  });
  c.restore();
}
function badge(c, t, t0, t1, num, unit, y = 650, x = W / 2) {
  if (t < t0 || t > t1 + .3) return; const a = eBack((t - t0) / .4), out = t > t1 ? 1 - clamp((t - t1) / .25) : 1;
  c.save(); c.translate(x, y + Math.sin((t - t0) * 2.2) * 5); const s = (.55 + .45 * a) * (out < 1 ? .85 + .15 * out : 1); c.scale(s, s); c.globalAlpha = clamp(a * 1.6) * out;
  c.textAlign = 'left'; c.font = '900 150px Nunito'; const nw = c.measureText(num).width; c.font = '800 70px Nunito'; const uw = unit ? c.measureText(unit).width + 16 : 0;
  const w = nw + uw + 96, h = 196; const fit = Math.min(1, 1000 / w); c.scale(fit, fit);
  c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 30; c.shadowOffsetY = 8; rrect(c, -w / 2, -h / 2, w, h, 44); c.fillStyle = 'rgba(14,13,18,.8)'; c.fill();
  c.shadowColor = 'transparent'; c.strokeStyle = 'rgba(255,255,255,.10)'; c.lineWidth = 3; c.stroke();
  const g = c.createLinearGradient(0, -60, 0, 60); g.addColorStop(0, '#fff7dc'); g.addColorStop(.55, '#ffd57e'); g.addColorStop(1, '#e8a33c');
  c.fillStyle = g; c.shadowColor = 'rgba(255,190,90,.45)'; c.shadowBlur = 26; c.textBaseline = 'alphabetic';
  c.font = '900 150px Nunito'; c.fillText(num, -w / 2 + 48, 54);
  if (unit) { c.font = '800 70px Nunito'; c.fillText(unit, -w / 2 + 48 + nw + 16, 54); }
  c.restore();
}
function iconPill(c, t, t0, t1, x, y, r, draw) {
  if (t < t0 || t > t1 + .3) return; const a = eBack((t - t0) / .4), out = t > t1 ? 1 - clamp((t - t1) / .25) : 1;
  c.save(); c.translate(x, y + Math.sin((t - t0) * 2.2) * 5); c.scale((.55 + .45 * a) * out, (.55 + .45 * a) * out); c.globalAlpha = clamp(a * 1.6) * out;
  c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 30; rrect(c, -r, -r, r * 2, r * 2, r * .32); c.fillStyle = 'rgba(14,13,18,.8)'; c.fill(); c.shadowColor = 'transparent';
  c.strokeStyle = 'rgba(255,255,255,.10)'; c.lineWidth = 3; c.stroke(); draw(c, t - t0); c.restore();
}
function motes(c, t, o) {
  const spr = o.spr || A.dotWarm; c.save(); c.globalCompositeOperation = 'lighter';
  for (let i = 0; i < o.n; i++) { const sx = hash(i + o.seed), sy = hash(i * 3.1 + o.seed), sp = .3 + hash(i * 7.7) * .7;
    const x = ((sx * W + t * 18 * sp + Math.sin(t * .7 + i) * 30) % (W + 100) + W + 100) % (W + 100) - 50;
    const y = ((sy * H - t * 30 * sp * (o.rise ?? 1)) % H + H) % H; const sz = (o.size || 14) * (.4 + hash(i * 1.3) * .9);
    c.globalAlpha = (o.a || .5) * (.4 + .6 * Math.abs(Math.sin(t * 1.3 + i * 2.1))); c.drawImage(spr, x - sz, y - sz, sz * 2, sz * 2); }
  c.restore();
}
function droplets(c, t, t0, x, y, n, seed, sc = 1) {
  const lt = t - t0; if (lt < 0 || lt > 1.4) return; c.save();
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (hash(i + seed) - .5) * 2.6, v = (350 + hash(i * 2 + seed) * 650) * sc;
    const px = x + Math.cos(a) * v * lt, py = y + Math.sin(a) * v * lt + 1400 * sc * lt * lt; const r = (7 + hash(i * 5 + seed) * 11) * sc;
    c.globalAlpha = 1 - clamp((lt - .8) / .6); c.fillStyle = '#c4161f'; c.beginPath(); c.ellipse(px, py, r, r * 1.15, 0, 0, TAU); c.fill();
    c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.arc(px - r * .35, py - r * .35, r * .3, 0, TAU); c.fill(); }
  c.restore();
}
function sparks(c, t, t0, x, y, n, seed, col = '255,255,255') {
  const lt = t - t0; if (lt < 0 || lt > .5) return; c.save(); c.lineCap = 'round';
  for (let i = 0; i < n; i++) { const a = hash(i + seed) * TAU, d0 = 30 + lt * (500 + hash(i * 3 + seed) * 500), L = 40 + hash(i) * 60;
    c.strokeStyle = `rgba(${col},${1 - lt / .5})`; c.lineWidth = 5; c.beginPath(); c.moveTo(x + Math.cos(a) * d0, y + Math.sin(a) * d0); c.lineTo(x + Math.cos(a) * (d0 + L), y + Math.sin(a) * (d0 + L)); c.stroke(); }
  c.restore();
}
function stars(c, t, n, seed, h = 900, a = .8) { c.save(); for (let i = 0; i < n; i++) { const x = hash(i + seed) * W, y = hash(i * 1.7 + seed) * h, s = 1 + hash(i * 3.3) * 2.5; c.globalAlpha = a * (.3 + .7 * Math.abs(Math.sin(t * (.5 + hash(i)) + i))); c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y, s, 0, TAU); c.fill(); } c.restore(); }
function hills(c, y, amp, col, seed, x0 = -300, x1 = W + 300) { c.beginPath(); c.moveTo(x0, H + 200); for (let x = x0; x <= x1; x += 20) c.lineTo(x, y + Math.sin(x * .004 + seed) * amp + Math.sin(x * .011 + seed * 2) * amp * .35); c.lineTo(x1, H + 200); c.closePath(); c.fillStyle = col; c.fill(); }
function fence(c, y, s, col = '#6b4a30', x0 = -200, x1 = W + 200) {
  c.save(); c.fillStyle = col; for (let x = x0; x < x1; x += 130 * s) { rrect(c, x, y - 120 * s, 20 * s, 140 * s, 4 * s); c.fill(); }
  c.fillRect(x0, y - 100 * s, x1 - x0, 14 * s); c.fillRect(x0, y - 55 * s, x1 - x0, 14 * s);
  c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(x0, y - 100 * s, x1 - x0, 4 * s); c.fillRect(x0, y - 55 * s, x1 - x0, 4 * s); c.restore();
}
function sky(c, stops, y0 = -300, y1 = 1300) { c.fillStyle = vgrad(c, y0, y1, stops); c.fillRect(-400, -400, W + 800, H + 800); }
function cam(c, lt, dur, a, b, punch = true) {
  const p = eInOut(lt / dur), z = lerp(a[0], b[0], p) * (punch ? 1 + .07 * (1 - eOut(lt / .4)) : 1), x = lerp(a[1], b[1], p), y = lerp(a[2], b[2], p);
  c.translate(W / 2, H / 2); c.scale(z, z); c.translate(-x, -y);
}
function shake(c, t, t0, amt = 22, dur = .35) { const k = 1 - clamp((t - t0) / dur); if (t < t0 || k <= 0) return; c.translate((hash(t * 91) - .5) * amt * k, (hash(t * 57) - .5) * amt * k); }
function flash(c, t, t0, dur = .25, col = '255,255,255') { const lt = t - t0; if (lt < 0 || lt > dur) return; c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = `rgba(${col},${(1 - lt / dur) * .9})`; c.fillRect(0, 0, W, H); c.restore(); }
function grassLayer(c, img, y, ox = 0) { c.drawImage(img, -210 + ox, y, 1500, 1100); }
function wordT(i) { return WORDS[i].s; }

// ---------- render ----------
function render(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  let si = 0; for (let i = 0; i < SC.length; i++) if (t >= SC[i].t0) si = i;
  ctx.save(); SC[si].draw(ctx, t, t - SC[si].t0); ctx.restore();
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
  ctx.drawImage(A.vig, 0, 0);
  ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .09; ctx.drawImage(A.grain[Math.floor(t * 24) % 4], 0, 0, W, H); ctx.restore();
  if (t < END - .7) caption(ctx, t);
}
async function init(words) { WORDS = words; buildChunks(); await buildAssets(); if (window.buildExtra) await buildExtra(); return true; }
