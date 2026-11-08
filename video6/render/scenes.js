// ---------- escenas: POV eres un taco ----------
END = 61.0;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
// tiempo de inicio de la n-ésima aparición de una palabra
function wf(word, n = 0) { let k = 0; for (const w of WORDS) { if (w.w.toLowerCase().replace(/[^a-záéíóúñü0-9]/g, '') === word) { if (k === n) return w.s; k++; } } throw new Error('no ' + word); }
function lab(c, t, t0, txt, x, y, col = '#ffd166', t1 = 1e9) { if (t < t0 || t > t1 + .3) return; const a = eBack((t - t0) / .4) * (t > t1 ? 1 - clamp((t - t1) / .3) : 1); c.save(); c.translate(x, y); c.scale(a, a); c.font = '800 46px Nunito'; const w = c.measureText(txt).width + 54; rrect(c, -w / 2, -35, w, 70, 35); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = col; c.lineWidth = 4; c.stroke(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 2); c.restore(); }

// 1. La taquería y la primera mordida
scene(0, (c, t, lt) => {
  const tb = wf('mordida') + .15;
  shake(c, t, tb, 26, .3); cam(c, lt, 5, [1.0, 540, 1150], [1.18, 540, 1250], false);
  sky(c, [[0, '#0e0a24'], [.6, '#2a1440'], [1, '#4a2050']], -300, 1500); stars(c, t, 40, 5, 700, .6);
  // puesto de tacos
  c.fillStyle = '#c8202a'; rrect(c, -60, 380, 1200, 120, 10); c.fill(); for (let i = 0; i < 12; i++) { c.fillStyle = i % 2 ? '#fff3e0' : '#c8202a'; c.beginPath(); c.moveTo(-60 + i * 100, 500); c.lineTo(40 + i * 100, 500); c.quadraticCurveTo(-10 + i * 100, 580, -60 + i * 100, 500); c.fill(); }
  c.font = '900 84px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#ffd166'; c.shadowColor = '#ff9a3a'; c.shadowBlur = 20; c.fillText('TACOS', 540, 444); c.shadowBlur = 0;
  for (let k = 0; k < 14; k++) { const x = -40 + k * 85, y = 600 + Math.sin(k * .45) * 20, on = .6 + .4 * Math.sin(t * 4 + k); c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = on; c.drawImage(C.dots[k % 6], x - 40, y - 40, 80, 80); c.restore(); c.fillStyle = XCOLS[k % 6]; c.beginPath(); c.arc(x, y, 9, 0, TAU); c.fill(); }
  // trompo
  c.save(); c.translate(230, 1000); glow(c, 0, 0, 320, '255,140,60', .5 + .1 * Math.sin(t * 9)); c.fillStyle = '#8a8f98'; c.fillRect(-8, -300, 16, 560);
  const tr = []; for (let i = 0; i <= 20; i++) { const u = i / 20; tr.push([lerp(110, 160, Math.sin(u * Math.PI) * .6 + u * .4) * (1), lerp(-240, 220, u)]); } const tp2 = tr.concat(tr.slice().reverse().map(([x, y]) => [-x, y]));
  furFill(c, tp2, { grad: [[0, '#e8642a'], [1, '#8a2a10']], cols: ['#ff8a4a', '#5a1a08', '#c8401a'], alpha: [.3, .7], len: [10, 20], density: 20, angle: (t * 2) % 3, spread: .4, seed: 7, light: [.6, .3, .3], shade: .3 });
  c.fillStyle = vgrad(c, -330, -250, [[0, '#ffe56a'], [1, '#f2a020']]); c.beginPath(); c.moveTo(-60, -250); c.lineTo(60, -250); c.lineTo(40, -330); c.lineTo(-40, -330); c.fill();
  c.restore();
  c.drawImage(A.grain[0], 0, 0, 0, 0);
  // mostrador y plato
  c.fillStyle = vgrad(c, 1500, 2200, [[0, '#8a5a32'], [1, '#4a2c14']]); c.fillRect(-300, 1500, W + 600, 900); c.fillStyle = '#b07a46'; c.fillRect(-300, 1490, W + 600, 20);
  c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(560, 1560, 330, 50, 0, 0, TAU); c.fill();
  c.fillStyle = '#f4f2ee'; c.beginPath(); c.ellipse(560, 1540, 340, 60, 0, 0, TAU); c.fill(); c.strokeStyle = '#3a8ad8'; c.lineWidth = 8; c.beginPath(); c.ellipse(560, 1540, 300, 48, 0, 0, TAU); c.stroke();
  c.fillStyle = '#7ad84a'; c.beginPath(); c.ellipse(820, 1520, 50, 22, .2, 0, TAU); c.fill(); c.fillStyle = '#e8f8d0'; c.beginPath(); c.ellipse(820, 1520, 36, 14, .2, 0, TAU); c.fill();
  const bitten = t > tb + .1;
  drawTaco(c, 540, 1370, .85, { t, mood: t > tb - .9 ? (bitten ? 'scared' : 'wow') : 'happy', wave: t < 2.2, bitten, look: t > tb - 1.2 ? [0, -1] : [0, 0], blink: (lt % 2.6) - 1.3 });
  // boca gigante
  const mo = t < tb - 1.2 ? 0 : ss(tb - 1.2, tb - .5, t), cl = ss(tb - .15, tb, t), op = mo * (1 - cl);
  if (mo > 0) { c.save(); c.translate(560 + 60, lerp(-200, 900, mo)); const h = 260 * op + 30;
    c.fillStyle = '#c8405a'; c.beginPath(); c.ellipse(0, 0, 520, h + 120, 0, 0, TAU); c.fill();
    c.fillStyle = '#3a0a14'; c.beginPath(); c.ellipse(0, 0, 440, h, 0, 0, TAU); c.fill();
    c.fillStyle = '#fff'; for (let i = -4; i <= 4; i++) { rrect(c, i * 90 - 38, -h - 10, 76, 80, 18); c.fill(); rrect(c, i * 90 - 38, h - 70, 76, 80, 18); c.fill(); }
    c.fillStyle = '#ff7a8a'; c.beginPath(); c.ellipse(0, h * .55, 220, h * .35, 0, 0, TAU); c.fill(); c.restore(); }
  if (t > tb) { c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = `rgba(0,0,0,${clamp((t - tb) / .35)})`; c.fillRect(0, 0, W, H); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t > tb && t < tb + .9) { const a = eBack((t - tb) / .2); c.save(); c.translate(W / 2, 900); c.scale(a, a); c.rotate(-.08); c.font = '900 150px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 18; c.strokeStyle = '#5a1020'; c.strokeText('¡ÑAM!', 0, 0); c.fillStyle = '#ffd166'; c.fillText('¡ÑAM!', 0, 0); c.restore(); }
});

// 2. Dentro de la boca: saliva y enzimas
scene(5.0, (c, t, lt) => {
  cam(c, lt, 6.5, [1.0, 540, 1000], [1.08, 540, 1050]);
  mouthCave(c, t); tongue(c, t);
  // cascadas de saliva
  c.save(); c.globalCompositeOperation = 'lighter'; [[160, 0], [920, 1]].forEach(([x, k]) => { for (let q = 0; q < 6; q++) { const g = c.createLinearGradient(0, 300, 0, 1500); g.addColorStop(0, 'rgba(170,220,255,.4)'); g.addColorStop(1, 'rgba(170,220,255,0)'); c.strokeStyle = g; c.lineWidth = 14; c.beginPath(); for (let y = 300; y < 1500; y += 30) c.lineTo(x + q * 16 + Math.sin(y * .02 + t * 6 + q) * 10, y); c.stroke(); } }); c.restore();
  for (let i = 0; i < 30; i++) { const x = hash(i) * W, y = ((hash(i * 2) * 1400 + t * 160) % 1400) + 300; c.fillStyle = 'rgba(200,235,255,.55)'; c.beginPath(); c.arc(x, y, 6 + hash(i * 3) * 10, 0, TAU); c.fill(); c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 2; c.stroke(); }
  const te = wf('enzima');
  drawTaco(c, 540, 1300 + Math.sin(t * 2) * 10, .95, { t, bitten: true, mood: t > te ? 'worry' : 'wow', look: t > te ? [.6, .3] : [0, 0], blink: (lt % 2.4) - 1.2 });
  if (t > te - .2) { const n = 5; for (let i = 0; i < n; i++) { const a = i / n * TAU + t * .5, k = ss(te - .2, te + .6, t), r = lerp(700, 250, k); const x = 540 + Math.cos(a) * r, y = 1300 + Math.sin(a) * r * .7;
    c.save(); c.translate(x, y); c.scale(Math.cos(a) > 0 ? -1 : 1, 1); enzyme(c, 0, 0, .9, t, i % 2 ? '#ffd84a' : '#7ae86a', i); c.restore(); }
    for (let i = 0; i < 16; i++) { const ft = (t * 1.3 + hash(i)) % 1; const a = hash(i * 3) * TAU; c.fillStyle = '#f2c460'; c.beginPath(); c.arc(540 + Math.cos(a) * (180 + ft * 220), 1300 + Math.sin(a) * (120 + ft * 160), 7 * (1 - ft), 0, TAU); c.fill(); } }
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, wf('saliva'), 'saliva', 260, 640, '#9fd4ff', 11.4); lab(c, t, te, 'enzima', 820, 640, '#ffd84a', 11.4);
});

// 3. La salsa: llamas falsas
scene(11.55, (c, t, lt) => {
  const tf = wf('engaña');
  cam(c, lt, 4.7, [1.06, 540, 1150], [1.0, 540, 1100]);
  mouthCave(c, t); tongue(c, t, 1350);
  // salsa
  c.fillStyle = 'rgba(200,30,20,.85)'; for (let i = 0; i < 8; i++) { const x = 380 + i * 45; c.beginPath(); c.ellipse(x, 1180 + (i % 3) * 10, 30, 18, 0, 0, TAU); c.fill(); c.beginPath(); c.moveTo(x - 10, 1190); c.quadraticCurveTo(x, 1250 + hash(i) * 60 + lt * 20, x + 10, 1190); c.fill(); }
  const fake = t > tf;
  [[190, 1520, 1.7], [890, 1540, 1.6], [380, 1760, 1.4], [720, 1780, 1.45]].forEach(([x, y, s], k) => { flame(c, x, y, s * (1 + .1 * Math.sin(t * 7 + k)), t, k);
    if (fake) { const a = eBack((t - tf - k * .07) / .3); if (a > 0) { c.save(); c.translate(x, y - 10 * s); c.scale(s * a, s * a); c.fillStyle = '#1a1a1a'; c.beginPath(); c.arc(-18, -20, 15, 0, TAU); c.arc(18, -20, 15, 0, TAU); c.fill(); c.fillRect(-18, -24, 36, 6);
      c.fillStyle = '#3a2410'; c.beginPath(); c.moveTo(-30, 8); c.quadraticCurveTo(-15, -6, 0, 6); c.quadraticCurveTo(15, -6, 30, 8); c.quadraticCurveTo(15, 0, 0, 12); c.quadraticCurveTo(-15, 0, -30, 8); c.fill(); c.restore(); } } });
  drawTaco(c, 540, 1180, .85, { t, bitten: true, mood: fake ? 'laugh' : 'scared', armsUp: !fake, blink: null });
  if (!fake) { c.strokeStyle = 'rgba(120,200,255,.9)'; c.lineWidth = 5; for (let k = 0; k < 3; k++) { c.beginPath(); c.ellipse(760 + k * 20, 920 + ((t * 300 + k * 60) % 120), 8, 14, 0, 0, TAU); c.stroke(); } }
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (fake) { const a = eBack((t - tf - .2) / .3); c.save(); c.translate(W / 2, 1620); c.rotate(-.12); c.scale(a, a); rrect(c, -230, -70, 460, 140, 20); c.fillStyle = 'rgba(255,255,255,.92)'; c.fill(); c.strokeStyle = '#ff2a3a'; c.lineWidth = 12; c.stroke(); c.font = '900 100px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#ff2a3a'; c.fillText('FALSO', 0, 6); c.restore(); }
  iconPill(c, t, wf('calor') - .2, 16.1, W / 2, 650, 100, (c, lt) => { c.fillStyle = '#eef2f8'; rrect(c, -16, -70, 32, 110, 16); c.fill(); c.fillStyle = '#4cd97b'; c.fillRect(-7, -10, 14, 40); c.beginPath(); c.arc(0, 44, 24, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.font = '900 30px Nunito'; c.textAlign = 'left'; c.fillText('37°', 28, -10); });
});

// 4. El esófago: ondas que empujan
scene(16.2, (c, t, lt) => {
  const ty = lerp(500, 1550, clamp(lt / 8.4));
  c.translate(W / 2, H / 2); const z = 1 + .07 * (1 - eOut(lt / .4)); c.scale(z, z); c.translate(-540, -(ty * .55 + 960 * .45));
  gutWalls(c, t, ['#ff9ab0', '#a82a4a']);
  // tubo
  const wave = (y) => { const wy = ty - 220; return Math.exp(-Math.pow((y - wy) / 120, 2)); };
  c.fillStyle = 'rgba(255,200,215,.35)'; c.beginPath(); for (let y = -200; y <= 2600; y += 20) c.lineTo(540 - 330 + wave(y) * 140, y); for (let y = 2600; y >= -200; y -= 20) c.lineTo(540 + 330 - wave(y) * 140, y); c.fill();
  [[-1], [1]].forEach(([sd]) => { c.strokeStyle = '#8a1a3a'; c.lineWidth = 46; c.beginPath(); for (let y = -200; y <= 2600; y += 20) c.lineTo(540 + sd * (330 - wave(y) * 140), y); c.stroke(); c.strokeStyle = '#e85a7a'; c.lineWidth = 30; c.stroke(); });
  for (let y = -200; y < 2600; y += 90) { const w = 330 - wave(y) * 140; c.strokeStyle = `rgba(180,30,70,${.25 + wave(y) * .5})`; c.lineWidth = 10 + wave(y) * 10; c.beginPath(); c.ellipse(540, y, w, 26, 0, 0, Math.PI); c.stroke(); }
  // flechas de empuje
  for (let k = 0; k < 2; k++) { const y = ty - 260; c.save(); c.translate(540 + (k ? 1 : -1) * 260, y); c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.moveTo(-24, -20); c.lineTo(24, -20); c.lineTo(24, 10); c.lineTo(40, 10); c.lineTo(0, 50); c.lineTo(-40, 10); c.lineTo(-24, 10); c.fill(); c.restore(); }
  drawTaco(c, 540, ty, .7, { t, bitten: true, mood: t > wf('gravedad') ? 'wow' : 'scared', armsUp: true, rot: Math.sin(t * 3) * .1 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, wf('músculos'), 'músculos', W / 2, 1720, '#ff8aa0', 24.6);
  iconPill(c, t, wf('cabeza') - .25, 24.7, W / 2, 650, 110, (c, lt) => { c.save(); c.rotate(Math.PI); c.translate(0, -40); drawBeto(c, 0, 120, .19, { t: lt, pose: 'arms', expr: 'smile', mouthOpen: .6 }); c.restore(); });
});

// 5. Estómago: jacuzzi de ácido
scene(24.8, (c, t, lt) => {
  const tr = wf('renueva');
  cam(c, lt, 7.8, [1.0, 540, 1100], [1.08, 540, 1150]);
  gutWalls(c, t, ['#ff8a9a', '#b8304a']);
  // pliegues
  for (let k = 0; k < 6; k++) { c.strokeStyle = 'rgba(140,20,50,.35)'; c.lineWidth = 26; c.beginPath(); for (let x = -300; x <= W + 300; x += 30) c.lineTo(x, 300 + k * 150 + Math.sin(x * .01 + k * 2) * 60); c.stroke(); }
  if (t > tr) { const sw = ((t - tr) / 1.4) % 1.4; c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createLinearGradient(sw * 1600 - 400, 0, sw * 1600, 0); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.5, 'rgba(255,240,250,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(-300, -300, W + 600, 1500); c.restore(); }
  // ácido
  const ay = 1250; c.fillStyle = vgrad(c, ay, 2200, [[0, 'rgba(140,255,120,.9)'], [1, 'rgba(40,140,60,.95)']]); c.beginPath(); c.moveTo(-300, 2400); for (let x = -300; x <= W + 300; x += 20) c.lineTo(x, ay + Math.sin(x * .02 + t * 3) * 14); c.lineTo(W + 300, 2400); c.fill();
  c.strokeStyle = 'rgba(220,255,200,.8)'; c.lineWidth = 6; c.beginPath(); for (let x = -300; x <= W + 300; x += 20) c.lineTo(x, ay + Math.sin(x * .02 + t * 3) * 14); c.stroke();
  for (let i = 0; i < 40; i++) { const x = hash(i) * W, ph = (t * (.4 + hash(i * 2) * .5) + hash(i * 3)) % 1, y = 2100 - ph * (2100 - ay); c.strokeStyle = 'rgba(230,255,220,.8)'; c.lineWidth = 3; c.beginPath(); c.arc(x + Math.sin(t * 3 + i) * 10, y, 6 + hash(i * 5) * 14, 0, TAU); c.stroke(); }
  for (let k = 0; k < 4; k++) { const ph = (t * .5 + k / 4) % 1; c.save(); c.globalAlpha = (1 - ph) * .4; c.drawImage(A.dot, 200 + k * 220 - 60, ay - ph * 300 - 60, 120 + ph * 80, 120 + ph * 80); c.restore(); }
  // taco con flotador
  const bx = 540 + Math.sin(t * .8) * 120, by = ay - 20 + Math.sin(t * 2.5) * 12;
  drawTaco(c, bx, by - 235, .9, { t, bitten: true, mood: t > wf('ácido') + .5 ? 'worry' : 'happy', rot: Math.sin(t * 2) * .08 });
  c.save(); c.translate(bx, by); c.fillStyle = '#ff7a2a'; c.beginPath(); c.ellipse(0, 0, 230, 60, 0, 0, TAU); c.ellipse(0, -6, 150, 30, 0, 0, TAU, true); c.fill('evenodd');
  c.fillStyle = '#fff'; for (let k = 0; k < 4; k++) { c.save(); c.rotate(0); c.beginPath(); c.ellipse(-160 + k * 107, 0, 22, 50, 0, 0, TAU); c.fill(); c.restore(); } c.fillStyle = 'rgba(255,255,255,.4)'; c.beginPath(); c.ellipse(-60, -30, 90, 10, 0, 0, TAU); c.fill(); c.restore();
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wf('ácido'), 32.5, 'pH 2', '');
  lab(c, t, tr, 'capa nueva ✨', W / 2, 1640, '#ffc8e0', 32.5);
});

// 6. El remolino: 4 horas
scene(32.6, (c, t, lt) => {
  cam(c, lt, 2.9, [1.0, 540, 1150], [1.1, 540, 1150]);
  gutWalls(c, t, ['#ff8a9a', '#b8304a']);
  c.save(); c.translate(540, 1300); c.rotate(t * 2);
  for (let k = 0; k < 9; k++) { c.strokeStyle = `rgba(${k % 2 ? '160,255,140' : '80,190,90'},.75)`; c.lineWidth = 50; c.beginPath(); for (let a = 0; a < 7; a += .1) { const r = 60 + a * 70 + k * 12; c.lineTo(Math.cos(a + k * .7) * r, Math.sin(a + k * .7) * r * .6); } c.stroke(); }
  c.restore();
  const a = t * 3.2; drawTaco(c, 540 + Math.cos(a) * 280, 1300 + Math.sin(a) * 160 - 60, .6, { t, bitten: true, mood: 'dizzy', rot: a + Math.PI / 2 });
  for (let k = 0; k < 3; k++) { const aa = t * 4 + k * 2.1; c.save(); c.translate(540 + Math.cos(a) * 280 + Math.cos(aa) * 150, 1100 + Math.sin(a) * 160 + Math.sin(aa) * 50); drawStar(c, 0, 0, 22, '#ffe27a'); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wf('cuatro'), 35.45, '4', 'horas');
});

// 7. Intestino delgado: el tobogán de 6 metros
scene(35.5, (c, t, lt) => {
  cam(c, lt, 8.7, [1.0, 540, 1000], [1.04, 540, 1050]);
  gutWalls(c, t, ['#ffb0c0', '#d0506a']);
  const path = []; for (let i = 0; i <= 120; i++) { const u = i / 120; path.push([540 + Math.sin(u * Math.PI * 3.2) * 330, 380 + u * 1500]); }
  c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = '#8a1a3a'; c.lineWidth = 250; c.beginPath(); path.forEach(p => c.lineTo(...p)); c.stroke();
  c.strokeStyle = '#ffc8d4'; c.lineWidth = 210; c.stroke(); c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = 40; c.stroke();
  // vellosidades
  for (let i = 0; i < path.length - 1; i += 2) { const [x, y] = path[i], [x2, y2] = path[i + 1]; let tx = x2 - x, ty2 = y2 - y; const l = Math.hypot(tx, ty2); tx /= l; ty2 /= l; [-1, 1].forEach(sd => { const bx = x - ty2 * 100 * sd, by = y + tx * 100 * sd; c.strokeStyle = '#ff8aa0'; c.lineWidth = 16; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx + ty2 * 34 * sd + Math.sin(t * 5 + i) * 4, by - tx * 34 * sd); c.stroke(); c.fillStyle = '#ff9ab0'; c.beginPath(); c.arc(bx + ty2 * 36 * sd, by - tx * 36 * sd, 10, 0, TAU); c.fill(); }); }
  const u = clamp((t - 35.8) / 8.2), pi = Math.min(119, Math.floor(u * 120)), f = u * 120 - pi, [px, py] = [lerp(path[pi][0], path[pi + 1][0], f), lerp(path[pi][1], path[pi + 1][1], f)];
  const shrink = lerp(.55, .36, u);
  // nutrientes que salen y entran a las paredes
  [['carne', '255,110,60', 0], ['piña', '255,220,80', 1], ['tortilla', '242,196,96', 2]].forEach(([w, col, k]) => { const t0 = wf(w); for (let i = 0; i < 14; i++) { const ft = (t - t0 - i * .05); if (ft < 0 || ft > 1.6) continue; const a = hash(i + k * 20) * TAU, d = ft * 260; c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = 1 - clamp((ft - 1) / .6); c.drawImage(A.dot, px + Math.cos(a) * d - 22, py + Math.sin(a) * d - 22, 44, 44); c.fillStyle = `rgba(${col},1)`; c.beginPath(); c.arc(px + Math.cos(a) * d, py + Math.sin(a) * d, 8, 0, TAU); c.fill(); c.restore(); } });
  drawTaco(c, px, py, shrink, { t, bitten: true, mood: 'laugh', armsUp: true, rot: Math.cos(u * Math.PI * 3.2) * .5 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wf('seis'), 40.0, '6', 'metros');
  lab(c, t, wf('carne'), 'carne', 240, 650, '#ff8a5a', 44.1); lab(c, t, wf('piña'), 'piña', 540, 650, '#ffd84a', 44.1); lab(c, t, wf('tortilla', 1), 'tortilla', 840, 650, '#f2c460', 44.1);
});

// 8. Intestino grueso: fiesta de bacterias
scene(44.2, (c, t, lt) => {
  cam(c, lt, 7, [1.0, 540, 1150], [1.1, 540, 1200]);
  gutWalls(c, t, ['#7a3a8a', '#2a0a3a']);
  c.save(); c.globalCompositeOperation = 'lighter'; c.translate(540, 300); for (let k = 0; k < 6; k++) { const a = Math.PI / 2 + Math.sin(t * 1.5 + k) * .8; c.save(); c.rotate(a - Math.PI / 2); const g = c.createLinearGradient(0, 0, 0, 1700); g.addColorStop(0, `rgba(${['255,80,170', '80,200,255', '255,220,80'][k % 3]},.28)`); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(0, 0); c.lineTo(-150, 1700); c.lineTo(150, 1700); c.fill(); c.restore(); } c.restore();
  c.fillStyle = '#c0c4cc'; c.beginPath(); c.arc(540, 300, 60, 0, TAU); c.fill(); for (let k = 0; k < 20; k++) { c.fillStyle = k % 2 ? '#fff' : '#8a8f98'; c.fillRect(540 + Math.cos(k + t * 2) * 40 - 6, 300 + Math.sin(k * 1.7) * 40 - 6, 12, 12); }
  bokeh(c, t, 16, 61, .5);
  const tb = wf('billones'), n = 3 + Math.floor(clamp((t - 44.6) / (tb - 44.6)) * 13);
  for (let i = 0; i < n; i++) { const x = 120 + (i % 4) * 280 + (Math.floor(i / 4) % 2) * 140, y = 900 + Math.floor(i / 4) * 300; bacterium(c, x, y, .9, t, i); }
  const nib = t > wf('comen');
  drawTaco(c, 540, 1500, .32, { t, bitten: true, mood: nib ? 'scared' : 'wow', look: [Math.sin(t * 2), 0] });
  if (nib) for (let i = 0; i < 10; i++) { const ft = (t * 1.5 + hash(i)) % 1; c.fillStyle = '#f2c460'; c.beginPath(); c.arc(540 + (hash(i * 2) - .5) * 200, 1480 - ft * 120, 6 * (1 - ft), 0, TAU); c.fill(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, tb, 51.0, '38', 'billones');
});

// 9. De 1 a 3 días
scene(51.15, (c, t, lt) => {
  cam(c, lt, 2.8, [1.0, 540, 1100], [1.06, 540, 1100]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#1d2a5a'], [1, '#3a2a6a']]); c.fillRect(-400, -400, W + 800, H + 800); bokeh(c, t, 12, 71, .3);
  const days = ['DÍA 1', 'DÍA 2', 'DÍA 3'], k = Math.min(2, Math.floor(clamp((t - wf('uno')) / 1.0) * 3)), fl = ((t - wf('uno')) * 3) % 1;
  c.save(); c.translate(540, 1180); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 40; c.fillStyle = '#f7f2e8'; rrect(c, -260, -200, 520, 420, 30); c.fill(); c.shadowBlur = 0;
  c.fillStyle = '#c8202a'; rrect(c, -260, -200, 520, 120, 30); c.fill(); c.fillRect(-260, -110, 520, 30);
  c.fillStyle = '#fff'; c.font = '900 60px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('VIAJE', 0, -136);
  c.fillStyle = '#2a2a30'; c.font = '900 130px Nunito'; c.fillText(t < wf('uno') ? '?' : days[k], 0, 70);
  if (t > wf('uno') && t < wf('uno') + 1 && fl < .5) { c.save(); c.translate(0, -80); c.scale(1, Math.cos(fl * Math.PI)); c.fillStyle = 'rgba(240,232,215,.95)'; c.fillRect(-260, 0, 520, 300); c.restore(); }
  c.restore();
  c.save(); c.translate(860, 1550); c.fillStyle = '#fff'; c.beginPath(); c.arc(0, 0, 110, 0, TAU); c.fill(); c.strokeStyle = '#3a3e48'; c.lineWidth = 10; c.stroke(); c.lineCap = 'round'; c.lineWidth = 8; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(t * 12) * 80, Math.sin(t * 12) * 80); c.stroke(); c.lineWidth = 12; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(t * 1.5) * 50, Math.sin(t * 1.5) * 50); c.stroke(); c.restore();
  drawTaco(c, 300, 1720, .4, { t, bitten: true, mood: 'sleep' }); zzz(c, t, 380, 1640, .9);
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wf('uno'), 53.9, '1–3', 'días');
});

// 10. El final: la puerta del baño (y el taquito al cielo)
scene(53.95, (c, t, lt) => {
  const td = wf('termina'), tq = wf('qué', 0) > 56 ? wf('qué', 0) : 57.9;
  cam(c, lt, 7, [1.0, 540, 1100], [1.06, 540, 1080]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#d8e8f0'], [1, '#a8c4d4']]); c.fillRect(-400, -400, W + 800, H + 800);
  for (let x = -300; x < W + 300; x += 120) { c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(x, -300, 4, 2400); }
  c.fillStyle = vgrad(c, 1810, 2300, [[0, '#8a9aaa'], [1, '#5a6a7a']]); c.fillRect(-300, 1810, W + 600, 700);
  // marco y puerta
  c.save(); c.translate(0, 160);
  c.fillStyle = '#6a4a2c'; rrect(c, 250, 560, 580, 1110, 10); c.fill(); c.fillStyle = '#1a1a22'; c.fillRect(280, 590, 520, 1080);
  const close = ss(td - .3, td + .3, t), dw = lerp(120, 520, close);
  c.fillStyle = vgrad(c, 590, 1670, [[0, '#b07a46'], [1, '#8a5a30']]); c.fillRect(280, 590, dw, 1080); c.strokeStyle = 'rgba(60,30,10,.4)'; c.lineWidth = 5; c.strokeRect(310, 640, dw - 60, 420); c.strokeRect(310, 1110, dw - 60, 500);
  c.fillStyle = '#e8c070'; c.beginPath(); c.arc(280 + dw - 50, 1130, 18, 0, TAU); c.fill();
  // letrero WC
  c.save(); c.translate(540, 470); c.fillStyle = '#2a6ac4'; rrect(c, -140, -70, 280, 140, 20); c.fill(); c.fillStyle = '#fff'; c.font = '900 84px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('WC', 0, 6); c.restore(); c.restore();
  // taquito angelito que sube
  const up = ss(td + .2, td + 1.6, t); if (t > td + .1) { drawTaco(c, 540 + Math.sin(t * 2) * 40, lerp(1500, 1000, up), .5, { t, bitten: true, mood: 'laugh', halo: true, wave: true, alpha: .9 }); }
  // remolino de flush
  const fl = t - td - .05; if (fl > 0 && fl < 1.2) { c.save(); c.translate(540, 1400); c.rotate(fl * 8); c.globalAlpha = Math.sin(fl / 1.2 * Math.PI) * .7; for (let k = 0; k < 4; k++) { c.strokeStyle = '#6ab8ff'; c.lineWidth = 26; c.beginPath(); for (let a = 0; a < 5; a += .2) c.lineTo(Math.cos(a + k * 1.57) * a * 60, Math.sin(a + k * 1.57) * a * 60); c.stroke(); } c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t > tq) { const a = eBack((t - tq) / .4); c.save(); c.translate(W / 2, 1780); c.scale(a, a); c.font = '900 64px Nunito'; const w = c.measureText('¿Pastor, suadero o bistec?').width + 80; rrect(c, -w / 2, -56, w, 112, 40); c.fillStyle = 'rgba(14,13,18,.85)'; c.fill(); c.fillStyle = '#ffd57e'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('¿Pastor, suadero o bistec?', 0, 4); c.restore(); }
  const fo = clamp((t - (END - .7)) / .7); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});
