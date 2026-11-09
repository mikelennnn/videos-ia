// ---------- escenas: la mujer que se congeló (≈39 s) ----------
END = 39.4;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
function wf(word, n = 0) { let k = 0; for (const w of WORDS) { if (w.w.toLowerCase().replace(/[^a-záéíóúñü0-9]/g, '') === word) { if (k === n) return w.s; k++; } } throw new Error('no ' + word); }
function lab(c, t, t0, txt, x, y, col = '#ffd166', t1 = 1e9, size = 46) { if (t < t0 || t > t1 + .3) return; const a = eBack((t - t0) / .4) * (t > t1 ? 1 - clamp((t - t1) / .3) : 1); c.save(); c.translate(x, y); c.scale(a, a); c.font = `800 ${size}px Nunito`; const w = c.measureText(txt).width + 54; rrect(c, -w / 2, -size * .76, w, size * 1.52, size * .76); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = col; c.lineWidth = 4; c.stroke(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 2); c.restore(); }
function pow(c, t, t0, x, y, txt, s = 1, col = '#9fe8ff', ink = '#0a2a4a') { const lt = t - t0; if (lt < 0 || lt > 1) return; const a = eBack(lt / .2); c.save(); c.globalAlpha = 1 - clamp((lt - .7) / .3); c.translate(x, y); c.rotate(-.1); c.scale(a * s, a * s); c.fillStyle = col; c.beginPath(); for (let k = 0; k < 24; k++) { const r = k % 2 ? 90 : 150, an = k / 24 * TAU; c.lineTo(Math.cos(an) * r * 1.4, Math.sin(an) * r * .8); } c.fill(); c.font = '900 96px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 14; c.strokeStyle = ink; c.strokeText(txt, 0, 6); c.fillStyle = '#fff'; c.fillText(txt, 0, 6); c.restore(); }
const nightSky = c => { sky(c, [[0, '#060c1e'], [.6, '#16264a'], [.95, '#3a4a6a']], -300, 1300); };

// 1. Gancho: congelada… y despertó
scene(0, (c, t, lt) => {
  const tw = wf('despertó') - .15, close = t > tw;
  shake(c, t, wf('tabla') - .1, 10, .3);
  if (!close) { cam(c, lt, tw, [1.15, 540, 1400], [1.3, 540, 1450], false);
    nightSky(c); stars(c, t, 40, 3, 800, .6); snowGround(c, 1250);
    lying(c, 900, 1540, .72, -Math.PI / 2, drawGirl, { t, frost: 1, expr: 'sleep', pose: 'side' });
    snow(c, t, 60, 2, { size: 7, a: .7 }); }
  else { const k = eOut((t - tw) / .4); c.translate(W / 2, H / 2); c.scale(2.4 - k * .2, 2.4 - k * .2); c.translate(-540, -(1800 - 700 * 1.0));
    c.fillStyle = vgrad(c, 0, H, [[0, '#ffd8a0'], [1, '#f2a65a']]); c.fillRect(-400, -400, W + 800, H + 800); glow(c, 540, 1100, 400, '255,240,200', .5);
    drawGirl(c, 540, 1800, 1.0, { t, frost: 1 - k, expr: 'shock', pose: 'side', look: [0, -.2] }); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  pow(c, t, wf('tabla') - .1, W / 2, 1000, 'TOC TOC', .8);
  if (close) { const a = eBack((t - tw) / .25); if (a > 0 && t < tw + .8) { c.save(); c.translate(W / 2 + 330, 560); c.scale(a, a); c.font = '900 140px Nunito'; c.textAlign = 'center'; c.lineWidth = 16; c.strokeStyle = '#5a1a1a'; c.strokeText('!!', 0, 0); c.fillStyle = '#ffd166'; c.fillText('!!', 0, 0); c.restore(); } flash(c, t, tw, .2); }
});

// 2. El coche atorado, la caminata en la tormenta, la caída
scene(4.9, (c, t, lt) => {
  const tw = wf('caminó') - .1, tc = wf('cayó') - .1;
  const ph = t < tw ? 0 : t < tc ? 1 : 2;
  const camX = ph === 0 ? 420 : ph === 1 ? lerp(420, 700, (t - tw) / (tc - tw)) : 760;
  cam(c, lt, 8, [1.1, camX, 1250], [1.1, camX, 1250], ph !== 0 && false);
  c.translate(0, 0);
  nightSky(c); glow(c, 1050, 1050, 300, '255,200,110', .4);
  snowGround(c, 1300);
  // árboles nevados
  for (let i = 0; i < 6; i++) { const x = -100 + i * 260, y = 1290; c.fillStyle = '#1a2a3a'; c.beginPath(); c.moveTo(x - 90, y); c.lineTo(x, y - 380); c.lineTo(x + 90, y); c.fill(); c.fillStyle = '#e8f0fa'; c.beginPath(); c.moveTo(x - 40, y - 200); c.lineTo(x, y - 380); c.lineTo(x + 40, y - 200); c.fill(); }
  car80(c, 250, 1500, .75, .22);
  cabin(c, 1180, 1420, .85, 1);
  const gx = ph === 0 ? 420 : ph === 1 ? lerp(420, 980, (t - tw) / (tc - tw)) : 980;
  if (ph < 2) drawGirl(c, gx, 1640, .62, { t, pose: Math.floor(t * 3.5) % 2 ? 'runA' : 'runB', expr: ph === 0 ? 'worry' : 'cold', cold: ph === 1 ? (t - tw) / (tc - tw) : 0, frost: ph === 1 ? (t - tw) / (tc - tw) * .6 : 0, shiver: ph === 1 ? 1 : 0, breath: 1 });
  else { const f = eOut((t - tc) / .35); lying(c, 980, 1640, .62, -f * Math.PI / 2, drawGirl, { t, frost: .7, expr: 'sleep', pose: 'side' }); }
  // huellas
  if (ph >= 1) for (let k = 0; k < 14; k++) { const x = 440 + k * 40; if (x > gx - 20) break; c.fillStyle = 'rgba(120,140,180,.5)'; c.beginPath(); c.ellipse(x, 1650 + (k % 2) * 16, 12, 6, 0, 0, TAU); c.fill(); }
  blizzard(c, t, 180, .75);
  c.setTransform(1, 0, 0, 1, 0, 0);
  pow(c, t, tc + .2, W / 2, 1050, 'PUF', .6, '#e8f2ff');
  badge(c, t, wf('kilómetros'), wf('treinta') - .05, '3', 'km'); badge(c, t, wf('treinta'), 12.8, '−30', '°C');
});

// 3. Seis horas… el amigo la encuentra y la arrastra
scene(12.85, (c, t, lt) => {
  const tm = wf('mañana') - .3, tf = wf('encontró') - .2, td = wf('arrastró') - .1;
  const day = ss(tm - .4, tm + .5, t);
  cam(c, lt, 7.2, [1.05, 560, 1300], [1.12, 600, 1300]);
  nightSky(c); c.save(); c.globalAlpha = day; sky(c, [[0, '#5a8ad8'], [.6, '#f0b8a0'], [.95, '#ffe0b0']], -300, 1300); c.restore();
  glow(c, 200, lerp(1400, 1000, day), 400, '255,220,160', .7 * day);
  snowGround(c, 1300);
  cabin(c, 860, 1460, .95, 1 - day * .6);
  const drag = t > td ? eInOut(clamp((t - td) / 1.8)) : 0, gx = lerp(560, 720, drag);
  const snowCover = clamp((t - 12.9) / 2.5) * (1 - clamp((t - tf) / .4));
  lying(c, gx, 1660, .62, -Math.PI / 2, drawGirl, { t, frost: 1, expr: 'sleep', pose: 'side' });
  if (snowCover > 0) { c.fillStyle = `rgba(245,250,255,${.85 * snowCover})`; c.beginPath(); c.ellipse(gx - 220, 1600, 300, 70 * snowCover, 0, 0, TAU); c.fill(); }
  if (t > tf) { const fx = t < td ? lerp(1300, 820, eOut((t - tf) / .6)) : 820 + drag * 160; drawFriend(c, fx, 1700, .62, { t, pose: t > td ? 'type' : 'arms', expr: t > wf('creyó') - .2 ? 'shock' : 'worry', look: [-1, .4], flip: true }); }
  // reloj de 6 horas
  if (t < tm + .3) { const a = eBack((t - 13.0) / .4) * (1 - clamp((t - tm) / .3)); if (a > 0) { c.save(); c.translate(260, 900); c.scale(a, a); c.fillStyle = '#fff'; c.beginPath(); c.arc(0, 0, 110, 0, TAU); c.fill(); c.strokeStyle = '#2a2a30'; c.lineWidth = 10; c.stroke(); c.lineCap = 'round'; c.lineWidth = 8; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(t * 10) * 80, Math.sin(t * 10) * 80); c.stroke(); c.lineWidth = 12; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(t * 1.2) * 50, Math.sin(t * 1.2) * 50); c.stroke(); c.restore(); } }
  snow(c, t, 40, 6, { size: 6, a: .7 * (1 - day * .5) });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wf('seis'), tm, '6', 'horas'); lab(c, t, tm, 'Minnesota · 1980', W / 2, 650, '#9fd4ff', 20.0, 50);
});

// 4. La aguja que no entra
scene(20.1, (c, t, lt) => {
  const tn = wf('aguja') - .1, tb = wf('entrar') - .2;
  shake(c, t, tb, 16, .3); cam(c, lt, 4.1, [1.0, 540, 1100], [1.1, 540, 1100]);
  hospitalBG(c, t);
  drawDoc80(c, 220, 1960, .68, { t, pose: 'arms', expr: t > tb ? 'shock' : 'worry', look: [1, .6] });
  // brazo congelado
  c.save(); c.fillStyle = vgrad(c, 1050, 1350, [[0, '#d8e8f8'], [1, '#a8c0e0']]); rrect(c, -200, 1080, 1000, 260, 120); c.fill(); c.fillStyle = 'rgba(255,255,255,.6)'; for (let i = 0; i < 60; i++) { c.beginPath(); c.arc(-150 + hash(i) * 900, 1100 + hash(i * 2) * 220, 3 + hash(i * 3) * 6, 0, TAU); c.fill(); } c.restore();
  c.fillStyle = '#c83a3a'; rrect(c, -260, 1050, 200, 320, 40); c.fill();
  // jeringa
  const push = t < tn ? 0 : clamp((t - tn) / (tb - tn)), bend = t > tb ? eOut((t - tb) / .25) : 0;
  c.save(); c.translate(760 - push * 90, 820 + push * 160); c.rotate(.9);
  c.fillStyle = 'rgba(220,240,255,.85)'; rrect(c, -40, -320, 80, 280, 12); c.fill(); c.strokeStyle = '#8aa0b8'; c.lineWidth = 4; c.stroke(); c.fillStyle = '#4cd97b'; c.fillRect(-32, -200, 64, 150); c.fillStyle = '#c8ccd4'; c.fillRect(-12, -420, 24, 110); c.fillRect(-50, -430, 100, 20);
  c.strokeStyle = '#9aa4b0'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, -40); c.quadraticCurveTo(0, 30, bend * 60, 60 - bend * 10); c.stroke(); c.restore();
  if (t > tb) sparks(c, t, tb, 650, 1090, 12, 5, '220,240,255');
  c.setTransform(1, 0, 0, 1, 0, 0);
  pow(c, t, tb, 800, 1500, '¡TOC!', .9, '#ffd166', '#5a3a10');
});

// 5. Cobijas eléctricas: vuelve a hablar
scene(24.2, (c, t, lt) => {
  const th = wf('hablando') - .2;
  cam(c, lt, 5, [1.05, 540, 1150], [1.12, 540, 1180]);
  hospitalBG(c, t);
  const warm = ss(24.4, th, t);
  hospitalBed(c, 520, 1560, 1.0);
  const sit = t > th ? eOut((t - th) / .5) : 0;
  c.fillStyle = '#f4f6f8'; c.beginPath(); c.ellipse(720, 1470, 130, 50, 0, 0, TAU); c.fill();
  c.save(); c.translate(200, 1490); c.rotate(Math.PI / 2 - sit * 1.0); drawGirl(c, 0, 0, .7, { t, frost: 1 - warm, expr: t > th ? 'smile' : 'sleep', pose: 'side', mouthOpen: .5 + .5 * Math.abs(Math.sin(t * 10)) }); c.restore();
  // cobija eléctrica
  c.save(); c.fillStyle = vgrad(c, 1380, 1560, [[0, '#ff9a5a'], [1, '#d85a2a']]); c.beginPath(); c.moveTo(130, 1440); c.quadraticCurveTo(350, 1380, 570, 1420); c.lineTo(590, 1560); c.lineTo(130, 1560); c.fill();
  c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = `rgba(255,220,120,${.4 + .4 * Math.sin(t * 8)})`; c.lineWidth = 6; for (let k = 0; k < 3; k++) { c.beginPath(); for (let x = 160; x < 570; x += 30) c.lineTo(x, 1460 + k * 30 + ((x / 30) % 2 ? -10 : 10)); c.stroke(); } c.restore();
  c.strokeStyle = '#2a2a30'; c.lineWidth = 8; c.beginPath(); c.moveTo(150, 1520); c.quadraticCurveTo(60, 1640, 20, 1400); c.stroke(); c.restore();
  for (let k = 0; k < 8; k++) { if (warm > .9) break; const ph = (t * 1.2 + k / 8) % 1; c.fillStyle = 'rgba(160,210,255,.8)'; c.beginPath(); c.ellipse(260 + k * 80, 1560 + ph * 120, 7, 11, 0, 0, TAU); c.fill(); }
  // termómetro
  c.save(); c.translate(920, 900); c.fillStyle = '#eef2f8'; rrect(c, -26, -230, 52, 300, 26); c.fill(); c.strokeStyle = '#8a98b0'; c.lineWidth = 4; c.stroke(); const lev = lerp(80, 250, warm); c.fillStyle = warm > .6 ? '#ff5a3a' : '#4cc9f0'; c.fillRect(-10, 60 - lev, 20, lev); c.beginPath(); c.arc(0, 70, 36, 0, TAU); c.fill(); c.restore();
  if (t > th) { const a = eBack((t - th) / .35); c.save(); c.translate(400, 1120); c.scale(a, a); c.fillStyle = '#fff'; rrect(c, -170, -60, 340, 110, 40); c.fill(); c.beginPath(); c.moveTo(-30, 46); c.lineTo(20, 46); c.lineTo(-20, 100); c.fill(); c.font = '900 50px Nunito'; c.fillStyle = '#2a1a10'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('¿Qué pasó?', 0, -6); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (warm < .99) badge(c, t, wf('calentaron'), 26.6, '31', '°C'); badge(c, t, 26.7, 29.2, '37', '°C');
});

// 6. Recuperada + la frase de los médicos + pregunta
scene(29.25, (c, t, lt) => {
  const tq = wf('nadie') - .3, tp = wf('tú') > 36 ? wf('tú') : 36.26;
  cam(c, lt, 10, [1.05, 540, 1150], [1.0, 540, 1100]);
  sky(c, [[0, '#4a90d8'], [.6, '#9fd0f0'], [.95, '#e8f4fa']], -300, 1300); glow(c, 850, 500, 300, '255,250,220', .9); c.fillStyle = '#fffbe8'; c.beginPath(); c.arc(850, 500, 80, 0, TAU); c.fill();
  snowGround(c, 1300);
  for (let i = 0; i < 6; i++) { const x = -100 + i * 260, y = 1290; c.fillStyle = '#2a5a4a'; c.beginPath(); c.moveTo(x - 90, y); c.lineTo(x, y - 380); c.lineTo(x + 90, y); c.fill(); c.fillStyle = '#f4f8fc'; c.beginPath(); c.moveTo(x - 40, y - 200); c.lineTo(x, y - 380); c.lineTo(x + 40, y - 200); c.fill(); }
  drawGirl(c, 540, 1860, 1.0, { t, pose: 'side', pose2: 'wave', pk: ss(29.4, 29.8, t), expr: 'smile', mouthOpen: .7, blink: (lt % 2.6) - 1.2, look: [0, .1] });
  for (let k = 0; k < 5; k++) { const ph = (t * .5 + k / 5) % 1; c.save(); c.globalAlpha = Math.sin(ph * Math.PI); drawStar(c, 220 + k * 160, 1300 - ph * 300, 18, '#ffe27a'); c.restore(); }
  snow(c, t, 30, 9, { size: 6, a: .5 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t > wf('médicos') - .2 && t < tp - .1) { const a = eBack((t - wf('médicos') + .2) / .4); const l2 = t > tq + .9; c.save(); c.translate(W / 2, 720); c.scale(a, a); c.font = '900 58px Nunito'; const L1 = '"Nadie está muerto…', L2 = 'hasta que está caliente y muerto"'; const w = c.measureText(L2).width + 80;
    rrect(c, -w / 2, -110, w, 220, 40); c.fillStyle = 'rgba(14,13,18,.9)'; c.fill(); c.strokeStyle = '#9fd4ff'; c.lineWidth = 5; c.stroke(); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#fff'; if (t > tq) c.fillText(L1, 0, -40); if (l2) { c.fillStyle = '#ffd57e'; c.fillText(L2, 0, 34); } c.font = '800 34px Nunito'; c.fillStyle = '#9fd4ff'; c.fillText('— frase de los médicos', 0, 150); c.restore(); }
  if (t > tp) { const a = eBack((t - tp) / .4); c.save(); c.translate(W / 2, 700); c.scale(a, a); c.font = '900 60px Nunito'; const txt = '¿Tú cuánto frío has aguantado? 🥶'.replace(' 🥶', ''); const w = c.measureText(txt).width + 90; rrect(c, -w / 2, -60, w, 120, 40); c.fillStyle = 'rgba(14,13,18,.9)'; c.fill(); c.strokeStyle = '#ffd166'; c.lineWidth = 4; c.stroke(); c.fillStyle = '#ffd57e'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 4); c.restore(); }
  const fo = clamp((t - (END - .6)) / .6); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});
