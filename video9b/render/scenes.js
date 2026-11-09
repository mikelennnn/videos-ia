// ---------- La mujer que se congeló — versión HD ----------
END = 39.4;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
function wf(word, n = 0) { let k = 0; for (const w of WORDS) { if (w.w.toLowerCase().replace(/[^a-záéíóúñü0-9]/g, '') === word) { if (k === n) return w.s; k++; } } throw new Error('no ' + word); }
function lab(c, t, t0, txt, x, y, col = '#ffd166', t1 = 1e9, size = 46) { if (t < t0 || t > t1 + .3) return; const a = eBack((t - t0) / .4) * (t > t1 ? 1 - clamp((t - t1) / .3) : 1); c.save(); c.translate(x, y); c.scale(a, a); c.font = `800 ${size}px Nunito`; const w = c.measureText(txt).width + 54; rrect(c, -w / 2, -size * .76, w, size * 1.52, size * .76); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = col; c.lineWidth = 4; c.stroke(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 2); c.restore(); }
function pow(c, t, t0, x, y, txt, s = 1, col = '#9fe8ff', ink = '#0a2a4a') { const lt = t - t0; if (lt < 0 || lt > 1) return; const a = eBack(lt / .2); c.save(); c.globalAlpha = 1 - clamp((lt - .7) / .3); c.translate(x, y); c.rotate(-.1); c.scale(a * s, a * s); c.fillStyle = col; c.beginPath(); for (let k = 0; k < 24; k++) { const r = k % 2 ? 90 : 150, an = k / 24 * TAU; c.lineTo(Math.cos(an) * r * 1.4, Math.sin(an) * r * .8); } c.fill(); c.font = '900 96px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 14; c.strokeStyle = ink; c.strokeText(txt, 0, 6); c.fillStyle = '#fff'; c.fillText(txt, 0, 6); c.restore(); }
const lie = (c, x, y, s, rot, o) => { c.save(); c.translate(x, y); c.rotate(rot); drawPerson(c, 0, 0, s, o); c.restore(); };
async function buildExtra() { buildWinter(); }

// 1. Gancho: congelada… y despertó
scene(0, (c, t, lt) => {
  const tw = wf('despertó') - .15, close = t > tw;
  shake(c, t, wf('tabla') - .1, 10, .3);
  if (!close) { cam(c, lt, tw, [1.15, 620, 1380], [1.26, 620, 1420], false);
    winterScene(c, t, 'night', { cabinX: 980, cabinS: .45 });
    c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.ellipse(560, 1580, 420, 60, 0, 0, TAU); c.fill();
    lie(c, 1000, 1560, .55, -Math.PI / 2, { t, ...GIRL, frost: 1, expr: 'sleep', shadow: false });
    c.fillStyle = 'rgba(245,250,255,.75)'; c.beginPath(); c.ellipse(800, 1600, 330, 40, 0, Math.PI, TAU); c.fill();
    snow(c, t, 60, 2, { size: 7, a: .7 }); bigFlakes(c, t, 10, 3, .5); }
  else { const k = eOut((t - tw) / .4); c.translate(W / 2, H / 2); c.scale(1 + .06 * (1 - k), 1 + .06 * (1 - k)); c.translate(-W / 2, -H / 2);
    const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1200); g.addColorStop(0, '#ffe8c0'); g.addColorStop(1, '#e08a5a'); c.fillStyle = g; c.fillRect(0, 0, W, H); godRays(c, 540, 600, t, '255,240,200', .12);
    drawPerson(c, 540, 2560, 1.6, { t, ...GIRL, frost: 1 - k, expr: 'shock', look: [0, -.1], shadow: false });
    for (let i = 0; i < 20; i++) { const a = hash(i) * TAU, d = (t - tw) * 900; c.fillStyle = 'rgba(220,240,255,.9)'; c.beginPath(); c.arc(540 + Math.cos(a) * d, 1000 + Math.sin(a) * d, 8, 0, TAU); c.fill(); } }
  c.setTransform(1, 0, 0, 1, 0, 0);
  pow(c, t, wf('tabla') - .1, W / 2, 1050, 'TOC TOC', .8);
  if (close && t < tw + .8) { const a = eBack((t - tw) / .25); c.save(); c.translate(W / 2 + 330, 560); c.scale(a, a); c.font = '900 140px Nunito'; c.textAlign = 'center'; c.lineWidth = 16; c.strokeStyle = '#5a1a1a'; c.strokeText('!!', 0, 0); c.fillStyle = '#ffd166'; c.fillText('!!', 0, 0); c.restore(); }
  if (close) flash(c, t, tw, .2);
});

// 2. El coche atorado, la caminata en la tormenta, la caída
scene(4.9, (c, t, lt) => {
  const tw = wf('caminó') - .1, tc = wf('cayó') - .1, ph = t < tw ? 0 : t < tc ? 1 : 2, u = ph === 1 ? (t - tw) / (tc - tw) : ph === 2 ? 1 : 0;
  cam(c, lt, 8, [1.12, lerp(420, 640, u), 1220], [1.12, lerp(420, 640, u), 1220]);
  winterScene(c, t, 'night', { cabinX: 1080, cabinY: 1300, cabinS: .7 });
  // coche en la zanja con faros
  c.save(); c.translate(250, 1560); c.rotate(.2); c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createLinearGradient(300, -130, 900, -60); g.addColorStop(0, 'rgba(255,240,180,.4)'); g.addColorStop(1, 'rgba(255,240,180,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(300, -140); c.lineTo(900, -260); c.lineTo(900, 60); c.lineTo(300, -110); c.fill(); c.restore();
  c.drawImage(WX.carNight, -380 * .65, -300 * .65, 760 * .65, 400 * .65); c.restore();
  c.fillStyle = 'rgba(240,246,255,.85)'; c.beginPath(); c.ellipse(240, 1620, 300, 50, 0, 0, TAU); c.fill();
  const gx = lerp(420, 900, u);
  for (let k = 0; k < 16; k++) { const x = 440 + k * 32; if (x > gx - 30 || ph === 0) break; c.fillStyle = 'rgba(80,110,170,.45)'; c.beginPath(); c.ellipse(x, 1700 + (k % 2) * 16, 13, 6, 0, 0, TAU); c.fill(); }
  if (ph < 2) drawPerson(c, gx, 1700, .55, { t, ...GIRL, walk: ph === 1 ? t * 7 : null, pose: ph === 1 ? (Math.floor(t * 3.5) % 2 ? 'walkA' : 'walkB') : 'hug', expr: ph === 0 ? 'worry' : 'cold', cold: u, frost: u * .6, shiver: ph === 1 ? .6 : 0, breath: 1 });
  else { const f = eOut((t - tc) / .35); lie(c, gx, 1700, .55, -f * Math.PI / 2, { t, ...GIRL, frost: .7, expr: 'sleep', shadow: false }); }
  blizzard(c, t, 200, .7); bigFlakes(c, t, 12, 7, .55);
  c.setTransform(1, 0, 0, 1, 0, 0);
  pow(c, t, tc + .2, W / 2, 1050, 'PUF', .6, '#e8f2ff');
  badge(c, t, wf('kilómetros'), wf('treinta') - .05, '3', 'km'); badge(c, t, wf('treinta'), 12.8, '−30', '°C');
});

// 3. Seis horas… el amigo la encuentra y la arrastra
scene(12.85, (c, t, lt) => {
  const tm = wf('mañana') - .3, tf = wf('encontró') - .2, td = wf('arrastró') - .1, day = ss(tm - .4, tm + .5, t);
  cam(c, lt, 7.2, [1.08, 640, 1300], [1.14, 680, 1300]);
  winterScene(c, t, 'night', { cabinX: 980, cabinY: 1300, cabinS: .75 });
  if (day > 0) { c.save(); c.globalAlpha = day; winterScene(c, t, 'dawn', { cabinX: 980, cabinY: 1300, cabinS: .75, moonX: 180, moonY: lerp(1100, 700, day), lit: .4 }); c.restore(); }
  const drag = t > td ? eInOut(clamp((t - td) / 1.8)) : 0, gx = lerp(760, 900, drag);
  const cover = clamp((t - 12.9) / 2.5) * (1 - clamp((t - tf) / .4));
  lie(c, gx, 1700, .55, -Math.PI / 2, { t, ...GIRL, frost: 1, expr: 'sleep', shadow: false });
  if (cover > 0) { c.fillStyle = `rgba(245,250,255,${.9 * cover})`; c.beginPath(); c.ellipse(gx - 320, 1650, 360, 80 * cover, 0, 0, TAU); c.fill(); }
  if (t > tf) { const fx = t < td ? lerp(1400, 1010, eOut((t - tf) / .6)) : 1010 + drag * 140; drawPerson(c, fx, 1760, .58, { t, ...FRIEND, walk: t < td + .1 ? t * 6 : null, pose: t > td ? 'pull' : 'arms', expr: t > wf('creyó') - .2 ? 'shock' : 'worry', look: [-1, .5], breath: 1 }); }
  if (t < tm + .3) { const a = eBack((t - 13.0) / .4) * (1 - clamp((t - tm) / .3)); if (a > 0) { c.save(); c.translate(260, 950); c.scale(a, a); c.fillStyle = vgrad(c, -120, 120, [[0, '#ffffff'], [1, '#d8dce4']]); c.beginPath(); c.arc(0, 0, 115, 0, TAU); c.fill(); c.strokeStyle = '#3a3e48'; c.lineWidth = 12; c.stroke(); c.lineCap = 'round'; c.lineWidth = 8; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(t * 10) * 82, Math.sin(t * 10) * 82); c.stroke(); c.lineWidth = 12; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(t * 1.2) * 52, Math.sin(t * 1.2) * 52); c.stroke(); c.restore(); } }
  snow(c, t, 40, 6, { size: 6, a: .7 * (1 - day * .6) });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wf('seis'), tm, '6', 'horas'); lab(c, t, tm, 'Minnesota · 1980', W / 2, 650, '#9fd4ff', 20.0, 50);
});

// 4. La aguja que no entra
scene(20.1, (c, t, lt) => {
  const tn = wf('aguja') - .1, tb = wf('entrar') - .2;
  shake(c, t, tb, 16, .3); cam(c, lt, 4.1, [1.0, 540, 1100], [1.1, 540, 1100]);
  hospital(c, t);
  drawPerson(c, 880, 2000, .55, { t, ...DOC, pose: 'arms', expr: t > tb ? 'shock' : 'worry', look: [-1, -.6] });
  // brazo congelado en primer plano
  c.save(); c.fillStyle = vgrad(c, 1050, 1350, [[0, '#dcecfc'], [.6, '#b8d0ee'], [1, '#8aa8d8']]); rrect(c, -200, 1080, 920, 270, 135); c.fill();
  c.save(); c.clip(); for (let i = 0; i < 80; i++) { c.fillStyle = `rgba(255,255,255,${.5 + hash(i) * .5})`; const x = -150 + hash(i) * 980, y = 1100 + hash(i * 2) * 230; c.beginPath(); for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; c.lineTo(x + Math.cos(a) * (4 + hash(i * 3) * 6), y + Math.sin(a) * (4 + hash(i * 3) * 6)); } c.fill(); }
  c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(-200, 1100, 1060, 40); c.restore(); c.restore();
  c.fillStyle = vgrad(c, 1050, 1370, [[0, '#e0464a'], [1, '#9a1e26']]); rrect(c, -260, 1040, 220, 340, 50); c.fill();
  const push = t < tn ? 0 : clamp((t - tn) / (tb - tn)), bend = t > tb ? eOut((t - tb) / .25) : 0;
  c.save(); c.translate(760 - push * 90, 820 + push * 160); c.rotate(.9);
  c.fillStyle = 'rgba(225,242,255,.85)'; rrect(c, -42, -320, 84, 280, 14); c.fill(); c.strokeStyle = '#8aa0b8'; c.lineWidth = 4; c.stroke(); c.fillStyle = vgrad(c, -200, -50, [[0, '#7ae8a0'], [1, '#2aa860']]); c.fillRect(-34, -200, 68, 150); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(-26, -300, 10, 240);
  c.fillStyle = '#c8ccd4'; c.fillRect(-12, -420, 24, 110); c.fillRect(-52, -432, 104, 22);
  c.strokeStyle = '#a8b0bc'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, -40); c.quadraticCurveTo(0, 30, bend * 60, 60 - bend * 10); c.stroke(); c.restore();
  if (t > tb) sparks(c, t, tb, 650, 1090, 14, 5, '220,240,255');
  c.setTransform(1, 0, 0, 1, 0, 0);
  pow(c, t, tb, 380, 1560, '¡TOC!', .9, '#ffd166', '#5a3a10');
});

// 5. Cobijas eléctricas: vuelve a hablar
scene(24.2, (c, t, lt) => {
  const th = wf('hablando') - .2, warm = ss(24.4, th, t), sit = t > th ? eOut((t - th) / .5) : 0;
  cam(c, lt, 5, [1.05, 540, 1200], [1.1, 540, 1220]);
  hospital(c, t, { bpm: Math.round(lerp(38, 72, warm)) });
  // cama
  c.fillStyle = '#c8d0d8'; c.fillRect(80, 1500, 920, 40); c.fillRect(100, 1540, 24, 220); c.fillRect(956, 1540, 24, 220); c.fillStyle = vgrad(c, 1240, 1500, [[0, '#d8e0e8'], [1, '#9aa4b0']]); rrect(c, 940, 1240, 50, 300, 16); c.fill();
  c.fillStyle = vgrad(c, 1420, 1500, [[0, '#ffffff'], [1, '#d8e0e8']]); rrect(c, 100, 1440, 880, 80, 26); c.fill();
  c.fillStyle = vgrad(c, 1360, 1460, [[0, '#ffffff'], [1, '#dde4ec']]); c.beginPath(); c.ellipse(800, 1440, 150, 55, 0, 0, TAU); c.fill();
  c.save(); c.translate(180, 1470); c.rotate(Math.PI / 2 - sit * .42); drawPerson(c, 0, 0, .58, { t, ...GIRL, hat: null, frost: 1 - warm, cold: 1 - warm, expr: t > th ? 'smile' : 'sleep', mouthOpen: .4 + .4 * Math.abs(Math.sin(t * 10)), shadow: false }); c.restore();
  // cobija eléctrica
  c.fillStyle = vgrad(c, 1380, 1540, [[0, '#ffa86a'], [1, '#d8602a']]); c.beginPath(); c.moveTo(110, 1440); c.quadraticCurveTo(360, 1360 + sit * 30, 600, 1400); c.lineTo(620, 1540); c.lineTo(110, 1540); c.fill();
  c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = `rgba(255,220,120,${.45 + .4 * Math.sin(t * 8)})`; c.lineWidth = 6; for (let k = 0; k < 3; k++) { c.beginPath(); for (let x = 140; x < 600; x += 30) c.lineTo(x, 1450 + k * 30 + ((x / 30) % 2 ? -10 : 10)); c.stroke(); } c.restore();
  c.strokeStyle = '#2a2a30'; c.lineWidth = 8; c.beginPath(); c.moveTo(130, 1520); c.quadraticCurveTo(40, 1640, 20, 1400); c.stroke();
  for (let k = 0; k < 8; k++) { if (warm > .9) break; const ph = (t * 1.2 + k / 8) % 1; c.fillStyle = 'rgba(160,210,255,.8)'; c.beginPath(); c.ellipse(220 + k * 80, 1560 + ph * 120, 7, 11, 0, 0, TAU); c.fill(); }
  c.save(); c.translate(1000, 980); c.fillStyle = '#eef2f8'; rrect(c, -26, -230, 52, 300, 26); c.fill(); c.strokeStyle = '#8a98b0'; c.lineWidth = 4; c.stroke(); const lev = lerp(80, 250, warm); c.fillStyle = warm > .6 ? '#ff5a3a' : '#4cc9f0'; c.fillRect(-10, 60 - lev, 20, lev); c.beginPath(); c.arc(0, 70, 36, 0, TAU); c.fill(); c.restore();
  if (t > th) { const a = eBack((t - th) / .35); c.save(); c.translate(430, 1080); c.scale(a, a); c.fillStyle = '#fff'; rrect(c, -170, -60, 340, 110, 40); c.fill(); c.beginPath(); c.moveTo(-30, 46); c.lineTo(20, 46); c.lineTo(-20, 100); c.fill(); c.font = '900 50px Nunito'; c.fillStyle = '#2a1a10'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('¿Qué pasó?', 0, -6); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (warm < .99) badge(c, t, wf('calentaron'), 26.6, '31', '°C'); badge(c, t, 26.7, 29.2, '37', '°C');
});

// 6. Recuperada + la frase + pregunta
scene(29.25, (c, t, lt) => {
  const tq = wf('nadie') - .3, tp = wf('tú') > 36 ? wf('tú') : 36.26;
  cam(c, lt, 10, [1.08, 540, 1250], [1.0, 540, 1200]);
  winterScene(c, t, 'day', { cabinX: 860, cabinY: 1280, cabinS: .6, moonX: 820, moonY: 380 });
  drawPerson(c, 500, 1960, .7, { t, ...GIRL, pose: 'side', pose2: 'wave', pk: ss(29.4, 29.8, t), expr: 'smile', mouthOpen: .7, blink: (lt % 2.6) - 1.2, look: [0, .1], breath: .6 });
  for (let k = 0; k < 6; k++) { const ph = (t * .5 + k / 6) % 1; c.save(); c.globalAlpha = Math.sin(ph * Math.PI); drawStar(c, 180 + k * 150, 1300 - ph * 300, 16, '#fff6c0'); c.restore(); }
  snow(c, t, 26, 9, { size: 6, a: .5 }); bigFlakes(c, t, 6, 11, .4);
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t > wf('médicos') - .2 && t < tp - .1) { const a = eBack((t - wf('médicos') + .2) / .4), l2 = t > tq + .9; c.save(); c.translate(W / 2, 720); c.scale(a, a); c.font = '900 58px Nunito'; const L1 = '"Nadie está muerto…', L2 = 'hasta que está caliente y muerto"'; const w = c.measureText(L2).width + 80;
    rrect(c, -w / 2, -110, w, 220, 40); c.fillStyle = 'rgba(14,13,18,.9)'; c.fill(); c.strokeStyle = '#9fd4ff'; c.lineWidth = 5; c.stroke(); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#fff'; if (t > tq) c.fillText(L1, 0, -40); if (l2) { c.fillStyle = '#ffd57e'; c.fillText(L2, 0, 34); } c.font = '800 34px Nunito'; c.fillStyle = '#9fd4ff'; c.fillText('— frase de los médicos', 0, 150); c.restore(); }
  if (t > tp) { const a = eBack((t - tp) / .4); c.save(); c.translate(W / 2, 700); c.scale(a, a); c.font = '900 60px Nunito'; const txt = '¿Tú cuánto frío has aguantado?'; const w = c.measureText(txt).width + 90; rrect(c, -w / 2, -60, w, 120, 40); c.fillStyle = 'rgba(14,13,18,.9)'; c.fill(); c.strokeStyle = '#ffd166'; c.lineWidth = 4; c.stroke(); c.fillStyle = '#ffd57e'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 4); c.restore(); }
  const fo = clamp((t - (END - .6)) / .6); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});

const _r = render; render = function (t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  let si = 0; for (let i = 0; i < SC.length; i++) if (t >= SC[i].t0) si = i;
  ctx.save(); SC[si].draw(ctx, t, t - SC[si].t0); ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none';
  const grades = [[[0, '#a8c8ff'], [1, '#0a1a3a']], [[0, '#a8c8ff'], [1, '#0a1a3a']], [[0, '#ffd0c0'], [1, '#2a2a5a']], [[0, '#f0fff8'], [1, '#4a8a8a']], [[0, '#fff0d8'], [1, '#6a8a8a']], [[0, '#fffbe8'], [1, '#6a9ad8']]];
  postFX({ bloom: .3, grade: grades[si], gradeA: .28 });
  ctx.drawImage(A.vig, 0, 0);
  ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .07; ctx.drawImage(A.grain[Math.floor(t * 24) % 4], 0, 0, W, H); ctx.restore();
  if (t < END - .7) caption(ctx, t);
};
