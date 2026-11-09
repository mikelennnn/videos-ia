// ---------- ¿Por qué no puedes hacerte cosquillas? utilidades y props (estilo clásico) ----------
function lab(c, t, t0, txt, x, y, col = '#ffd166', t1 = 1e9, size = 46) { if (t < t0 || t > t1 + .3) return; const a = eBack((t - t0) / .4) * (t > t1 ? 1 - clamp((t - t1) / .3) : 1); c.save(); c.translate(x, y); c.scale(a, a); c.font = `800 ${size}px Nunito`; const w = c.measureText(txt).width + 54; rrect(c, -w / 2, -size * .76, w, size * 1.52, size * .76); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = col; c.lineWidth = 4; c.stroke(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 2); c.restore(); }
function popText(c, t, t0, x, y, txt, size = 130, col = '#ffd166', dur = 1.3) { const lt = t - t0; if (lt < 0 || lt > dur) return; const a = eBack(lt / .25); c.save(); c.globalAlpha = 1 - clamp((lt - dur + .3) / .3); c.translate(x, y); c.scale(a, a); c.rotate(-.06); c.font = `900 ${size}px Nunito`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = size * .16; c.strokeStyle = '#2a1206'; c.strokeText(txt, 0, 0); c.fillStyle = col; c.fillText(txt, 0, 0); c.restore(); }
function boardBg(c, t, col = ['#2a4a5a', '#122028']) { const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1300); g.addColorStop(0, col[0]); g.addColorStop(1, col[1]); c.fillStyle = g; c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalAlpha = .06; for (let i = 0; i < 400; i++) { c.fillStyle = hash(i) > .5 ? '#fff' : '#000'; c.fillRect(hash(i * 2) * W, hash(i * 3) * H, 2 + hash(i) * 30, 2); } c.restore();
  c.strokeStyle = 'rgba(255,255,255,.06)'; c.lineWidth = 2; for (let x = -300; x < W + 300; x += 80) { c.beginPath(); c.moveTo(x, -300); c.lineTo(x, H + 300); c.stroke(); } for (let y = -300; y < H + 300; y += 80) { c.beginPath(); c.moveTo(-300, y); c.lineTo(W + 300, y); c.stroke(); }
  motes(c, t, { n: 16, seed: 2, size: 8, a: .25 }); }

// dedos que hacen cosquillas (4 deditos que se mueven) en (x,y), apuntando en dirección ang
function tickleFingers(c, x, y, t, s = 1, ang = 0, skin = SKIN.col, line = SKIN.line, speed = 26) {
  c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s); c.lineCap = 'round';
  for (let k = 0; k < 4; k++) { const off = (k - 1.5) * 15, wig = Math.sin(t * speed + k * 1.7) * 14;
    const tip = [34 + Math.abs(wig) * .4, off + wig];
    c.strokeStyle = line; c.lineWidth = 17; c.beginPath(); c.moveTo(0, off * .6); c.quadraticCurveTo(22, off + wig * .5, tip[0], tip[1]); c.stroke();
    c.strokeStyle = skin; c.lineWidth = 12; c.beginPath(); c.moveTo(0, off * .6); c.quadraticCurveTo(22, off + wig * .5, tip[0], tip[1]); c.stroke(); }
  c.restore();
}
// rayitas de "cosquilla" alrededor de un punto (intensidad k)
function tickleLines(c, t, x, y, k, col = '255,220,120') { if (k <= 0) return; c.save(); c.lineCap = 'round';
  for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + t * 1.5, r0 = 60 + 10 * Math.sin(t * 12 + i), L = 26 * k + 10 * Math.sin(t * 18 + i * 2);
    c.strokeStyle = `rgba(${col},${.85 * k})`; c.lineWidth = 6; c.beginPath(); c.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); c.lineTo(x + Math.cos(a) * (r0 + L), y + Math.sin(a) * (r0 + L)); c.stroke(); }
  c.restore(); }
// brazo de "otra persona" que entra desde un lado (manga azul)
function otherArm(c, sh, hd, t, o = {}) {
  const el = [lerp(sh[0], hd[0], .5), lerp(sh[1], hd[1], .5) + 40], sk = o.skin || '#c98a5c', ln = '#7a4a2a';
  c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
  c.strokeStyle = ln; c.lineWidth = 62; c.beginPath(); c.moveTo(...sh); c.lineTo(...el); c.lineTo(...hd); c.stroke();
  c.strokeStyle = sk; c.lineWidth = 54; c.stroke();
  const se = [lerp(el[0], hd[0], .6), lerp(el[1], hd[1], .6)];
  c.strokeStyle = '#1e4a8a'; c.lineWidth = 92; c.beginPath(); c.moveTo(...sh); c.lineTo(...el); c.lineTo(...se); c.stroke(); c.strokeStyle = '#3a7ad0'; c.lineWidth = 84; c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 14; c.beginPath(); c.moveTo(sh[0], sh[1] - 22); c.lineTo(el[0], el[1] - 22); c.stroke();
  c.fillStyle = ln; c.beginPath(); c.arc(hd[0], hd[1], 36, 0, TAU); c.fill(); c.fillStyle = sk; c.beginPath(); c.arc(hd[0], hd[1], 32, 0, TAU); c.fill();
  tickleFingers(c, hd[0] - 10, hd[1], t, 1.3, Math.atan2(hd[1] - el[1], hd[0] - el[0]), sk, ln);
  c.restore(); }
// brazo robot con plumita en la punta
function robotArm(c, base, tip, t, o = {}) {
  const el = [lerp(base[0], tip[0], .45), Math.min(base[1], tip[1]) - 160];
  c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
  // base
  c.fillStyle = '#4a5060'; rrect(c, base[0] - 110, base[1] - 20, 220, 90, 18); c.fill(); c.fillStyle = '#6a7284'; rrect(c, base[0] - 90, base[1] - 40, 180, 40, 14); c.fill();
  const seg = (p, q) => { c.strokeStyle = '#3a404c'; c.lineWidth = 52; c.beginPath(); c.moveTo(...p); c.lineTo(...q); c.stroke(); c.strokeStyle = '#a8b0c0'; c.lineWidth = 42; c.stroke(); c.strokeStyle = 'rgba(255,255,255,.45)'; c.lineWidth = 8; c.beginPath(); c.moveTo(p[0], p[1] - 12); c.lineTo(q[0], q[1] - 12); c.stroke(); };
  seg(base, el); seg(el, tip);
  [base, el].forEach(p => { c.fillStyle = '#ffd166'; c.beginPath(); c.arc(p[0], p[1], 30, 0, TAU); c.fill(); c.strokeStyle = '#8a5a10'; c.lineWidth = 5; c.stroke(); c.fillStyle = '#5a3a00'; c.beginPath(); c.arc(p[0], p[1], 9, 0, TAU); c.fill(); });
  // luz
  const on = o.light ?? 0; c.save(); c.globalCompositeOperation = 'lighter'; glow(c, el[0], el[1] - 50, 50, '255,80,80', .5 + .5 * on); c.restore(); c.fillStyle = on > .5 ? '#ff6b6b' : '#8a3030'; c.beginPath(); c.arc(el[0], el[1] - 50, 12, 0, TAU); c.fill();
  // plumita
  const a = Math.atan2(tip[1] - el[1], tip[0] - el[0]) + Math.sin(t * 22) * .25 * (o.wiggle ?? 1);
  c.save(); c.translate(...tip); c.rotate(a); c.fillStyle = '#ff8fc0'; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(60, -40, 150, -6); c.quadraticCurveTo(60, 34, 0, 0); c.fill();
  c.strokeStyle = '#c04a80'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.lineTo(150, -6); c.stroke();
  c.strokeStyle = 'rgba(255,220,240,.9)'; c.lineWidth = 3; for (let k = 1; k < 8; k++) { const x = k * 18; c.beginPath(); c.moveTo(x, -1); c.lineTo(x + 12, -24 + k * 1.5); c.moveTo(x, 1); c.lineTo(x + 12, 22 - k * 1.5); c.stroke(); }
  c.restore(); c.restore(); }
// perilla de volumen (v 0..1)
function volumeKnob(c, x, y, v, s = 1) {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(14,13,18,.85)'; rrect(c, -170, -190, 340, 380, 40); c.fill(); c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 3; c.stroke();
  for (let k = 0; k < 11; k++) { const a = Math.PI * .75 + k / 10 * Math.PI * 1.5, lit = k / 10 <= v + .001; c.strokeStyle = lit ? (k > 7 ? '#ff6b6b' : k > 4 ? '#ffd166' : '#4cd97b') : 'rgba(255,255,255,.15)'; c.lineWidth = 14; c.lineCap = 'round'; c.beginPath(); c.moveTo(Math.cos(a) * 112, Math.sin(a) * 112); c.lineTo(Math.cos(a) * 140, Math.sin(a) * 140); c.stroke(); }
  const g = c.createRadialGradient(-20, -30, 10, 0, 0, 95); g.addColorStop(0, '#e8ecf4'); g.addColorStop(1, '#7a8294'); c.fillStyle = g; c.beginPath(); c.arc(0, 0, 90, 0, TAU); c.fill(); c.strokeStyle = '#3a404c'; c.lineWidth = 6; c.stroke();
  const a = Math.PI * .75 + v * Math.PI * 1.5; c.strokeStyle = '#2a2d34'; c.lineWidth = 14; c.beginPath(); c.moveTo(Math.cos(a) * 30, Math.sin(a) * 30); c.lineTo(Math.cos(a) * 78, Math.sin(a) * 78); c.stroke();
  c.fillStyle = '#fff'; c.font = '900 40px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('VOLUMEN', 0, 158);
  c.restore(); }
// onda de señal entre dos puntos (amp 0..1)
function signalWave(c, t, p0, p1, amp, col = '255,209,102', w = 8) {
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L; c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
  c.strokeStyle = `rgba(${col},.95)`; c.lineWidth = w; c.shadowColor = `rgba(${col},.8)`; c.shadowBlur = 20; c.beginPath();
  for (let k = 0; k <= 80; k++) { const u = k / 80, e = Math.sin(Math.PI * u), o = Math.sin(u * 26 - t * 14) * 55 * amp * e; const x = p0[0] + dx * u + nx * o, y = p0[1] + dy * u + ny * o; k ? c.lineTo(x, y) : c.moveTo(x, y); }
  c.stroke(); c.restore(); }
// lupa
function magnifier(c, x, y, s, rot = -.6) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  c.strokeStyle = '#5a3a24'; c.lineWidth = 34; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 90); c.lineTo(0, 260); c.stroke();
  c.fillStyle = 'rgba(200,235,255,.35)'; c.beginPath(); c.arc(0, 0, 92, 0, TAU); c.fill(); c.strokeStyle = '#2a2d34'; c.lineWidth = 20; c.stroke();
  c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.ellipse(-34, -34, 26, 12, -.7, 0, TAU); c.fill(); c.restore(); }
// "JA JA" flotando
function jaText(c, t, t0, x, y, n = 6, seed = 1) { if (t < t0) return; c.save(); c.textAlign = 'center'; c.textBaseline = 'middle';
  for (let i = 0; i < n; i++) { const lt = ((t - t0) * .9 + hash(i + seed)) % 1.6; if (lt > 1.4) continue; const a = eBack(lt / .25) * (1 - clamp((lt - 1.0) / .4)); const px = x + (hash(i * 3 + seed) - .5) * 520, py = y - lt * 220 + (hash(i * 5 + seed) - .5) * 80;
    c.save(); c.translate(px, py); c.rotate((hash(i * 7) - .5) * .5); c.scale(a, a); c.font = '900 74px Nunito'; c.lineWidth = 12; c.strokeStyle = '#2a1206'; c.strokeText('JA', 0, 0); c.fillStyle = ['#ffd166', '#ff8fc0', '#4cd97b', '#7ad0ff'][i % 4]; c.fillText('JA', 0, 0); c.restore(); }
  c.restore(); }
// lagrimitas de risa
function laughTears(c, x, y, t, k = 1) { if (k <= 0) return; c.save(); [-1, 1].forEach(sd => { for (let j = 0; j < 2; j++) { const ph = (t * 1.4 + j * .5) % 1; c.globalAlpha = k * (1 - ph); c.fillStyle = '#7ad0ff'; c.beginPath(); c.ellipse(x + sd * (70 + ph * 70), y + ph * 60 - 20 + ph * ph * 120, 10, 14, 0, 0, TAU); c.fill(); } }); c.restore(); }
// palanca/joystick
function lever(c, x, y, k, s = 1) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#2a2d34'; rrect(c, -90, -30, 180, 70, 16); c.fill(); c.fillStyle = '#4a5060'; rrect(c, -80, -24, 160, 20, 8); c.fill();
  const a = lerp(-.5, .5, k); c.strokeStyle = '#a8b0c0'; c.lineWidth = 18; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, -20); c.lineTo(Math.sin(a) * 150, -20 - Math.cos(a) * 150); c.stroke();
  c.fillStyle = '#ff4d5e'; c.beginPath(); c.arc(Math.sin(a) * 150, -20 - Math.cos(a) * 150, 34, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.arc(Math.sin(a) * 150 - 10, -30 - Math.cos(a) * 150, 10, 0, TAU); c.fill(); c.restore(); }
// cronómetro con texto
function stopwatch(c, x, y, s, txt, t) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#2a2d34'; c.fillRect(-22, -170, 44, 40); c.beginPath(); c.arc(0, -180, 26, 0, TAU); c.fill();
  c.fillStyle = '#fff8ee'; c.beginPath(); c.arc(0, 0, 140, 0, TAU); c.fill(); c.strokeStyle = '#2a2d34'; c.lineWidth = 18; c.stroke();
  for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; c.strokeStyle = '#2a2d34'; c.lineWidth = 6; c.beginPath(); c.moveTo(Math.cos(a) * 112, Math.sin(a) * 112); c.lineTo(Math.cos(a) * 126, Math.sin(a) * 126); c.stroke(); }
  const a = -Math.PI / 2 + t * 4; c.strokeStyle = '#ff4d5e'; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a) * 100, Math.sin(a) * 100); c.stroke();
  c.fillStyle = '#2a1a1a'; c.font = '900 64px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 54); c.restore(); }
