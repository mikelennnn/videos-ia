// ---------- ¿Por qué el frío te da ganas de hacer pipí? (HD) ----------
END = 31.0;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
function wf(word, n = 0) { let k = 0; for (const w of WORDS) { if (w.w.toLowerCase().replace(/[^a-záéíóúñü0-9]/g, '') === word) { if (k === n) return w.s; k++; } } throw new Error('no ' + word); }
function lab(c, t, t0, txt, x, y, col = '#ffd166', t1 = 1e9, size = 46) { if (t < t0 || t > t1 + .3) return; const a = eBack((t - t0) / .4) * (t > t1 ? 1 - clamp((t - t1) / .3) : 1); c.save(); c.translate(x, y); c.scale(a, a); c.font = `800 ${size}px Nunito`; const w = c.measureText(txt).width + 54; rrect(c, -w / 2, -size * .76, w, size * 1.52, size * .76); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = col; c.lineWidth = 4; c.stroke(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 2); c.restore(); }
function bubble(c, t, t0, x, y, txt, t1 = 1e9) { if (t < t0 || t > t1) return; const a = eBack((t - t0) / .35); c.save(); c.translate(x, y); c.scale(a, a); c.font = '900 50px Nunito'; const w = c.measureText(txt).width + 70; c.fillStyle = '#fff'; rrect(c, -w / 2, -60, w, 110, 40); c.fill(); c.beginPath(); c.moveTo(-20, 46); c.lineTo(24, 46); c.lineTo(-10, 100); c.fill(); c.fillStyle = '#2a1a10'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, -6); c.restore(); }
async function buildExtra() { buildWinter(); }
// red de vasos (coords de persona, pose 'side'): primero extremidades, luego el tronco central
const VEINS = () => [
  [[-120, -735], [-165, -560], [-162, -370]], [[120, -735], [165, -560], [162, -370]],
  [[-48, -430], [-54, -250], [-56, -100]], [[48, -430], [54, -250], [56, -100]],
  [[-165, -600], [-140, -520]], [[165, -600], [140, -520]], [[-162, -460], [-180, -400]], [[162, -460], [180, -400]], [[-54, -300], [-30, -230]], [[54, -300], [30, -230]],
  [[0, -770], [0, -600], [0, -440]], [[0, -720], [-120, -735]], [[0, -720], [120, -735]], [[0, -450], [-48, -430]], [[0, -450], [48, -430]]];
const LIMBS = 10;
// 1. Gancho: Beto con frío corre al baño
scene(0, (c, t, lt) => {
  const tr = wf('baño') - .1;
  cam(c, lt, 5.6, [1.12, 520, 1300], [1.18, 600, 1300], false);
  winterScene(c, t, 'day', { cabinX: 960, cabinY: 1290, cabinS: .5, moonX: 200, moonY: 380 });
  booth(c, 860, 1720, .62, 0);
  drawPerson(c, 760, 1760, .5, { t, ...GIRL, pose: 'hug', expr: 'cold', cold: .6, shiver: .5, breath: 1, look: [-.5, 0] });
  drawPerson(c, 640, 1780, .52, { t, ...FRIEND, pose: 'hug', expr: 'worry', cold: .5, shiver: .4, breath: 1, look: [.5, 0] });
  const run = t > tr ? eInOut(clamp((t - tr) / 1.6)) : 0, bx = lerp(260, 500, run);
  drawPerson(c, bx, 1820, .6, { t, ...BETO2, walk: t > tr && run < 1 ? t * 9 : null, pose: t > tr && run < 1 ? (Math.floor(t * 6) % 2 ? 'walkA' : 'walkB') : 'hug', expr: t < tr ? 'cold' : run < 1 ? 'shock' : 'worry', cold: .7, shiver: t < tr ? 1 : .5, breath: 1, look: [1, 0] });
  if (t > tr && run < 1) { c.strokeStyle = 'rgba(80,110,170,.5)'; c.lineWidth = 8; c.lineCap = 'round'; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(bx - 200 - k * 30, 1500 + k * 70); c.lineTo(bx - 110 - k * 30, 1500 + k * 70); c.stroke(); } }
  snow(c, t, 50, 2, { size: 6, a: .7 }); bigFlakes(c, t, 8, 3, .45);
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t > wf('propósito') - .1) { const a = eBack((t - wf('propósito') + .1) / .35); c.save(); c.translate(W / 2, 760); c.scale(a, a); c.font = '900 72px Nunito'; const w = c.measureText('¡A PROPÓSITO!').width + 80; rrect(c, -w / 2, -60, w, 120, 40); c.fillStyle = '#ffd166'; c.fill(); c.fillStyle = '#5a1a10'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('¡A PROPÓSITO!', 0, 6); c.restore(); }
});

// 2. Las venas de la piel se cierran
scene(5.5, (c, t, lt) => {
  const tc = wf('cierran') - .2, k = ss(tc, tc + .9, t);
  c.translate(W / 2, H / 2); const z = 1 + .07 * (1 - eOut(lt / .4)); c.scale(z, z); c.translate(-W / 2, -H / 2);
  bodyDiagramBG(c, t);
  const px = 540, py = 1820, s = 1.02;
  c.save(); c.globalAlpha = .4; c.filter = 'grayscale(1) sepia(1) hue-rotate(170deg) saturate(2.5) brightness(1.1)'; drawPerson(c, px, py, s, { t, ...BETO2, pose: 'side', expr: 'cold', shadow: false }); c.restore();
  c.save(); c.translate(px, py); c.scale(s, s); c.lineCap = 'round'; c.lineJoin = 'round';
  VEINS().forEach((v, i) => { const limb = i < LIMBS; const w = limb ? lerp(14, 6, k) : 16; const col = limb ? `rgb(${lerp(255, 90, k) | 0},${lerp(70, 150, k) | 0},${lerp(90, 255, k) | 0})` : '#ff4a5a';
    c.shadowColor = col; c.shadowBlur = 20; c.strokeStyle = col; c.lineWidth = w; c.beginPath(); v.forEach((p, j) => j ? c.lineTo(...p) : c.moveTo(...p)); c.stroke(); }); c.restore();
  // calor que no sale
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU, d = 360 + Math.sin(t * 3 + i) * 20; c.save(); c.translate(px + Math.cos(a) * d * .9, py - 640 * s + Math.sin(a) * d); c.rotate(a + Math.PI); c.fillStyle = k > .5 ? 'rgba(255,140,90,.9)' : 'rgba(255,140,90,.4)'; c.beginPath(); c.moveTo(-30, -16); c.lineTo(20, 0); c.lineTo(-30, 16); c.fill(); if (k > .5) { c.strokeStyle = '#ff4a5a'; c.lineWidth = 6; c.beginPath(); c.moveTo(-10, -26); c.lineTo(-10, 26); c.stroke(); } c.restore(); }
  for (let i = 0; i < 6; i++) { const x = 120 + i * 170, y = 520 + Math.sin(t * 2 + i) * 20; c.save(); c.translate(x, y); c.rotate(t * .5 + i); c.strokeStyle = 'rgba(190,230,255,.8)'; c.lineWidth = 5; for (let q = 0; q < 6; q++) { c.rotate(TAU / 6); c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 30); c.stroke(); } c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, wf('venas') - .1, 'venas de la piel', W / 2, 650, '#ff8a9a', 9.5, 50);
});

// 3. La sangre al centro… los riñones se asustan
scene(9.5, (c, t, lt) => {
  const tr = wf('riñones') - .4, zk = ss(tr, tr + .8, t);
  const px = 540, py = 1820, s = 1.02;
  c.translate(W / 2, H / 2); const z = (1 + .07 * (1 - eOut(lt / .4))) * lerp(1, 2.1, zk); c.scale(z, z); c.translate(-px, -lerp(1100, py - 590 * s, zk));
  bodyDiagramBG(c, t);
  c.save(); c.globalAlpha = .4; c.filter = 'grayscale(1) sepia(1) hue-rotate(170deg) saturate(2.5) brightness(1.1)'; drawPerson(c, px, py, s, { t, ...BETO2, pose: 'side', expr: 'cold', shadow: false }); c.restore();
  c.save(); c.translate(px, py); c.scale(s, s); c.lineCap = 'round';
  VEINS().forEach((v, i) => { const limb = i < LIMBS; c.strokeStyle = limb ? 'rgb(90,150,255)' : '#ff4a5a'; c.shadowColor = c.strokeStyle; c.shadowBlur = 20; c.lineWidth = limb ? 6 : 18; c.beginPath(); v.forEach((p, j) => j ? c.lineTo(...p) : c.moveTo(...p)); c.stroke();
    if (!limb && v.length === 3) for (let q = 0; q < 6; q++) { const u = ((t * .8 + q / 6) % 1), a = v[0], b = v[2]; const x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u); c.shadowBlur = 0; c.fillStyle = '#ffb0b8'; c.beginPath(); c.arc(x, y, 9, 0, TAU); c.fill(); } });
  c.shadowBlur = 0; const pool = ss(wf('sangre'), wf('cuerpo') + .3, t); const gl = c.createRadialGradient(0, -560, 10, 0, -560, 200); gl.addColorStop(0, `rgba(255,80,100,${.7 * pool})`); gl.addColorStop(1, 'rgba(255,80,100,0)'); c.fillStyle = gl; c.fillRect(-220, -780, 440, 440);
  if (zk > .05) { const pan = t > wf('sobra') - .2; kidney(c, -72, -560, .55 * zk, t, pan ? 'panic' : 'calm', true); kidney(c, 72, -560, .55 * zk, t, pan ? 'panic' : 'calm', false);
    const lev = ss(wf('sobra') - .3, wf('líquido') + .5, t); c.fillStyle = 'rgba(120,200,255,.45)'; c.fillRect(-200, -470 - lev * 120, 400, lev * 120); }
  c.restore();
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, wf('sangre'), 'la sangre va al centro', W / 2, 650, '#ff8a9a', tr + .2, 48);
  lab(c, t, tr + .3, 'riñones', W / 2, 650, '#ff8a9a', 14.8, 48);
  bubble(c, t, wf('sobra') - .1, W / 2, 1500, '¡Sobra agua!', 14.8);
});

// 4. La hormona guardiana se apaga: ¡al baño!
scene(14.8, (c, t, lt) => {
  const toff = wf('apagan') - .1, tb = wf('directo') - .2;
  cam(c, lt, 4.4, [1.0, 540, 1100], [1.06, 540, 1100]);
  const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1300); g.addColorStop(0, '#ff9ab0'); g.addColorStop(1, '#8a2a4a'); c.fillStyle = g; c.fillRect(-400, -400, W + 800, H + 800);
  c.strokeStyle = 'rgba(255,220,230,.18)'; c.lineWidth = 16; for (let k = 0; k < 12; k++) { c.beginPath(); const y0 = -100 + k * 180; for (let x = -300; x <= W + 300; x += 30) c.lineTo(x, y0 + Math.sin(x * .012 + k + t * .8) * 40); c.stroke(); }
  // tanque de agua, compuerta y tubería al baño
  c.fillStyle = 'rgba(255,255,255,.25)'; rrect(c, 140, 820, 420, 520, 40); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 8; c.stroke();
  const open = ss(toff + .4, toff + 1.0, t), lev = 1 - open * .6; c.fillStyle = vgrad(c, 820, 1340, [[0, '#9fdcff'], [1, '#2a8ad8']]); c.fillRect(150, 1330 - 500 * lev, 400, 500 * lev);
  c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 4; c.beginPath(); for (let x = 150; x < 550; x += 10) c.lineTo(x, 1330 - 500 * lev + Math.sin(x * .05 + t * 6) * 6); c.stroke();
  pipe(c, [[550, 1300], [700, 1300], [700, 1640], [880, 1640]], 50);
  if (open > 0) for (let k = 0; k < 14; k++) { const u = (t * 1.6 + k / 14) % 1; const pts = [[550, 1300], [700, 1300], [700, 1640], [880, 1640]], seg = u * 3, si = Math.floor(seg), f = seg - si; c.fillStyle = 'rgba(160,220,255,.95)'; c.beginPath(); c.arc(lerp(pts[si][0], pts[si + 1][0], f), lerp(pts[si][1], pts[si + 1][1], f), 13, 0, TAU); c.fill(); }
  c.save(); c.translate(560, 1300); c.rotate(-open * 1.4); c.fillStyle = '#8a8f98'; c.fillRect(-12, -70, 24, 140); c.restore();
  // inodoro
  c.save(); c.translate(940, 1660); c.fillStyle = vgrad(c, -160, 120, [[0, '#ffffff'], [1, '#c8d0d8']]); rrect(c, -50, -200, 120, 120, 16); c.fill(); c.beginPath(); c.ellipse(0, -60, 110, 44, 0, 0, TAU); c.fill(); c.fillRect(-70, -60, 140, 120); c.fillStyle = '#9fdcff'; c.beginPath(); c.ellipse(0, -62, 80, 26, 0, 0, TAU); c.fill(); c.restore();
  // interruptor y la gotita guardia
  c.save(); c.translate(780, 980); c.fillStyle = '#2a2a34'; rrect(c, -90, -130, 180, 260, 24); c.fill(); c.fillStyle = '#4a4a58'; rrect(c, -40, -90, 80, 180, 16); c.fill(); const sw = t > toff ? 1 : 0; c.fillStyle = sw ? '#ff4a5a' : '#4cd97b'; rrect(c, -34, sw ? 0 : -84, 68, 84, 12); c.fill();
  c.fillStyle = '#fff'; c.font = '900 34px Nunito'; c.textAlign = 'center'; c.fillText(sw ? 'OFF' : 'ON', 0, 120); c.restore();
  guardDrop(c, 330, 690, 1.35, t, t > toff ? 0 : 1); if (t > toff) zzz(c, t, 500, 760);
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, wf('hormona'), 'hormona que guarda el agua', W / 2, 1830, '#9fdcff', 19.1, 42);
  if (t > tb) { const a = eBack((t - tb) / .3); c.save(); c.translate(W / 2, 760); c.scale(a, a); c.rotate(-.06); c.font = '900 76px Nunito'; const w = c.measureText('¡AL BAÑO!').width + 80; rrect(c, -w / 2, -60, w, 120, 40); c.fillStyle = '#ffd166'; c.fill(); c.fillStyle = '#5a1a10'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('¡AL BAÑO!', 0, 6); c.restore(); }
});
function zzz(c, t, x, y, a = 1) { c.save(); c.font = '900 60px Nunito'; c.fillStyle = 'rgba(255,255,255,.95)'; c.strokeStyle = '#2a1a3a'; c.lineWidth = 8; ['z', 'z', 'Z'].forEach((z, i) => { const ph = ((t * .7) + i / 3) % 1; c.globalAlpha = Math.sin(ph * Math.PI) * a; c.strokeText(z, x + ph * 70 + i * 8, y - ph * 170); c.fillText(z, x + ph * 70 + i * 8, y - ph * 170); }); c.restore(); }

// 5. Título: diuresis por frío
scene(19.2, (c, t, lt) => {
  cam(c, lt, 2.4, [1.1, 540, 1000], [1.0, 540, 1000]);
  winterScene(c, t, 'day', { cabin: false, posts: false, moonX: 860, moonY: 300 }); c.fillStyle = 'rgba(10,30,70,.35)'; c.fillRect(-400, -400, W + 800, H + 800);
  const a = eBack((t - wf('diuresis') + .15) / .45); if (a > 0) { c.save(); c.translate(540, 1000); c.scale(a, a); c.rotate(Math.sin(t * 2) * .02);
    c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 40; rrect(c, -440, -170, 880, 340, 60); c.fillStyle = 'rgba(14,13,18,.9)'; c.fill(); c.shadowBlur = 0; c.strokeStyle = '#9fdcff'; c.lineWidth = 6; c.stroke();
    c.font = '900 110px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; const gg = c.createLinearGradient(0, -100, 0, 100); gg.addColorStop(0, '#ffffff'); gg.addColorStop(1, '#9fdcff'); c.fillStyle = gg; c.fillText('DIURESIS', 0, -40); c.font = '900 80px Nunito'; c.fillStyle = '#ffd57e'; c.fillText('POR FRÍO', 0, 70); c.restore(); }
  guardDrop(c, 250, 1520, 1.0, t, 0); kidney(c, 840, 1520, 1.0, t, 'calm');
  snow(c, t, 40, 5, { size: 6, a: .7 });
});

// 6. El escalofrío… parte 2
scene(21.5, (c, t, lt) => {
  const te = wf('escalofrío') - .1, tp = wf('parte') - .1;
  cam(c, lt, 5, [1.15, 540, 1250], [1.22, 540, 1250]);
  winterScene(c, t, 'day', { cabinX: 220, cabinY: 1290, cabinS: .5, moonX: 160, moonY: 360 });
  booth(c, 700, 1800, .75, ss(te - .4, te, t));
  const sh = t > te && t < te + 1.4 ? 1 : 0;
  drawPerson(c, 420, 1850, .66, { t, ...BETO2, pose: sh ? 'hug' : 'side', expr: sh ? 'shock' : 'smile', shiver: sh * 1.5, look: [.6, 0], mouthOpen: .5 });
  if (sh) { c.strokeStyle = 'rgba(120,180,255,.9)'; c.lineWidth = 7; c.lineCap = 'round'; [-1, 1].forEach(sd => { for (let k = 0; k < 3; k++) { c.beginPath(); for (let y = 0; y < 90; y += 10) c.lineTo(420 + sd * (210 + k * 26) + Math.sin(y * .2 + t * 30) * 8, 1180 + k * 60 + y); c.stroke(); } }); }
  snow(c, t, 30, 8, { size: 6, a: .6 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t > tp) { const a = eBack((t - tp) / .4); c.save(); c.translate(W / 2, 760); c.rotate(-.06); c.scale(a, a); rrect(c, -230, -80, 460, 160, 30); c.fillStyle = '#ff4a5a'; c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 8; c.stroke(); c.font = '900 90px Nunito'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('PARTE 2', 0, 6); c.restore(); }
});

// 7. Mándaselo a…
scene(26.5, (c, t, lt) => {
  cam(c, lt, 4.5, [1.1, 540, 1200], [1.0, 540, 1200]);
  winterScene(c, t, 'day', { cabinX: 860, cabinY: 1290, cabinS: .55, moonX: 820, moonY: 360 });
  drawPerson(c, 480, 1900, .74, { t, ...BETO2, pose: 'reach', expr: 'smile', mouthOpen: .5 + .4 * Math.abs(Math.sin(t * 8)), look: [0, .1], blink: (lt % 2.4) - 1.2 });
  const a = eBack((t - wf('mándaselo')) / .4); if (a > 0) { c.save(); c.translate(860, 1080); c.scale(a, a); c.rotate(Math.sin(t * 3) * .05); c.fillStyle = '#fff'; c.beginPath(); c.arc(0, 0, 90, 0, TAU); c.fill(); c.fillStyle = '#ff3b5c'; c.beginPath(); c.moveTo(-40, 30); c.lineTo(-40, -10); c.quadraticCurveTo(-40, -30, -10, -30); c.lineTo(10, -30); c.lineTo(10, -60); c.lineTo(60, -10); c.lineTo(10, 40); c.lineTo(10, 10); c.lineTo(-10, 10); c.quadraticCurveTo(-20, 10, -20, 30); c.closePath(); c.fill(); c.restore(); }
  for (let k = 0; k < 6; k++) { const ph = (t * .5 + k / 6) % 1; c.save(); c.globalAlpha = Math.sin(ph * Math.PI); drawStar(c, 180 + k * 150, 1300 - ph * 300, 16, '#fff6c0'); c.restore(); }
  snow(c, t, 26, 9, { size: 6, a: .5 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  const fo = clamp((t - (END - .6)) / .6); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});

const _r = render; render = function (t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  let si = 0; for (let i = 0; i < SC.length; i++) if (t >= SC[i].t0) si = i;
  ctx.save(); SC[si].draw(ctx, t, t - SC[si].t0); ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none';
  const grades = [[[0, '#fffbe8'], [1, '#6a9ad8']], [[0, '#a8d8ff'], [1, '#0a1a3a']], [[0, '#a8d8ff'], [1, '#0a1a3a']], [[0, '#ffe0e8'], [1, '#6a1a3a']], [[0, '#e8f4ff'], [1, '#2a4a7a']], [[0, '#fffbe8'], [1, '#6a9ad8']], [[0, '#fffbe8'], [1, '#6a9ad8']]];
  postFX({ bloom: .3, grade: grades[si], gradeA: .28 });
  ctx.drawImage(A.vig, 0, 0);
  ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .07; ctx.drawImage(A.grain[Math.floor(t * 24) % 4], 0, 0, W, H); ctx.restore();
  if (t < END - .7) caption(ctx, t);
};
