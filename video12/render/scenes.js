// ---------- escenas: la cucaracha que vive sin cabeza (~40 s) ----------
END = 40.2;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
function wf(word, n = 0) { let k = 0; for (const w of WORDS) { if (w.w.toLowerCase().replace(/[^a-záéíóúñü0-9]/g, '') === word) { if (k === n) return w.s; k++; } } throw new Error('no ' + word); }
function lab(c, t, t0, txt, x, y, col = '#ffd166', t1 = 1e9, size = 46) { if (t < t0 || t > t1 + .3) return; const a = eBack((t - t0) / .4) * (t > t1 ? 1 - clamp((t - t1) / .3) : 1); c.save(); c.translate(x, y); c.scale(a, a); c.font = `800 ${size}px Nunito`; const w = c.measureText(txt).width + 54; rrect(c, -w / 2, -size * .76, w, size * 1.52, size * .76); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = col; c.lineWidth = 4; c.stroke(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 2); c.restore(); }
function popText(c, t, t0, x, y, txt, size = 130, col = '#ffd166', dur = 1.3) { const lt = t - t0; if (lt < 0 || lt > dur) return; const a = eBack(lt / .25); c.save(); c.globalAlpha = 1 - clamp((lt - dur + .3) / .3); c.translate(x, y); c.scale(a, a); c.rotate(-.06); c.font = `900 ${size}px Nunito`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = size * .16; c.strokeStyle = '#2a1206'; c.strokeText(txt, 0, 0); c.fillStyle = col; c.fillText(txt, 0, 0); c.restore(); }
function chanclaProp(c, P, rot = -.4) { const h = P[3]; c.save(); c.translate(h[0] + 10, h[1] - 60); c.rotate(rot); c.drawImage(R.chancla, -80, -180, 160, 360); c.restore(); }
function walkX(t, t0, sp) { return Math.max(0, t - t0) * sp; }

// 1. Gancho: le quitas la cabeza… y sigue caminando (0–5.2)
scene(0, (c, t, lt) => {
  const tc = wf('cabeza') + .15, tm = wf('muere') - .2, tw = wf('sigue') - .1;
  const z = t < tw ? lerp(1.25, 1.4, ss(0, tw, t)) : lerp(1.4, 1.1, ss(tw, tw + .8, t));
  c.translate(W / 2, H / 2); c.scale(z, z); c.translate(-lerp(560, 640, ss(tw, 5.2, t)), -lerp(1450, 1480, ss(tw, tw + .8, t)));
  shake(c, t, tc, 18, .3);
  kitchen(c, t);
  // Beto con la chancla
  const shock = t > tm; drawBeto(c, 190, 1900, .8, { t, pose: 'high', expr: shock ? 'shock' : 'smile', mouthOpen: .3, look: [1, .6], blink: (lt % 2.6) - 1.3, prop: (c, P) => chanclaProp(c, P, shock ? -.1 + Math.sin(t * 30) * .03 : -.4) });
  // cabeza saliendo disparada
  const rx = 520 + walkX(t, tw, 70), ry = 1760;
  if (t < tc) drawRoach(c, rx, ry, .72, { t, walk: t * 5, expr: 'smile', look: [0, .5] });
  else { const ht = t - tc, u = clamp(ht / .6), land = ht > .6, x0 = 520 + 220, x1 = 520 + 420, hx = lerp(x0, x1, u), hy = lerp(ry - 100, ry - 40, u) - 300 * Math.sin(Math.PI * u);
    drawRoach(c, rx, ry, .72, { t, walk: t > tw ? t * 6 : null, head: false });
    looseHead(c, hx, hy, .72, land ? Math.sin(t * 2) * .1 : ht * 12, t, shock ? 'shock' : 'smile');
    sparks(c, t, tc, rx + 200, ry - 90, 12, 3, '255,230,150');
    if (land) for (let k = 0; k < 3; k++) { const a = t * 4 + k * 2.1; drawStar(c, x1 + Math.cos(a) * 80, ry - 150 + Math.sin(a) * 18, 12, '#ffe27a'); } }
  c.setTransform(1, 0, 0, 1, 0, 0);
  popText(c, t, tc, W / 2, 700, '¡POP!', 140, '#ffd166', 1.0);
  popText(c, t, tm + .1, W / 2, 700, '¿¡QUÉ!?', 140, '#ff6b6b', 1.4);
  lab(c, t, tw + .1, 'sigue caminando 🚶', W / 2, 700, '#4cd97b', 5.0, 50);
});

// 2. Hasta una semana (5.2–7.5)
scene(5.2, (c, t, lt) => {
  const ts = wf('semana') - .1;
  cam(c, lt, 2.4, [1.08, 540, 1150], [1.0, 540, 1150]);
  kitchen(c, t, { wx: 700, wy: 260 });
  // calendario
  const day = Math.min(7, 1 + Math.floor(ss(5.3, ts + .2, t) * 6.99)); c.save(); c.translate(540, 1160); c.rotate(-.04);
  c.fillStyle = 'rgba(0,0,0,.25)'; rrect(c, -150, -170, 320, 360, 20); c.fill(); c.fillStyle = '#fff8ee'; rrect(c, -160, -180, 320, 360, 20); c.fill(); c.fillStyle = '#e8344a'; rrect(c, -160, -180, 320, 90, 20); c.fill(); c.fillRect(-160, -120, 320, 30);
  c.fillStyle = '#fff'; c.font = '900 44px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('DÍA', 0, -132); c.fillStyle = '#2a1a1a'; c.font = '900 190px Nunito'; c.fillText(day, 0, 50);
  const fl = (ss(5.3, ts + .2, t) * 6.99) % 1; if (day < 7) { c.save(); c.transform(1, 0, 0, 1 - fl, 0, -90 * fl); c.globalAlpha = 1 - fl; c.fillStyle = '#f2e8da'; c.fillRect(-160, -90, 320, 270); c.restore(); }
  c.fillStyle = '#5a5a60'; [-80, 80].forEach(x => { c.beginPath(); c.arc(x, -180, 12, 0, TAU); c.fill(); }); c.restore();
  // cucaracha sin cabeza dando vueltas
  const ang = lt * 1.6, rx = 540 + Math.cos(ang) * 220, ry = 1720 + Math.sin(ang) * 60;
  drawRoach(c, rx, ry, .6, { t, walk: t * 6, head: false, flip: Math.sin(ang) > 0 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, ts, 7.6, '7', 'días');
});

// 3. ¿Cómo? Primero: respira por agujeritos (7.5–15.3)
scene(7.5, (c, t, lt) => {
  const tq = wf('cómo') - .1, tp = wf('primero') - .1, tb = wf('boca') - .1, tr = wf('respira', 1) - .1, sp = ss(tr, tr + .6, t);
  cam(c, lt, 7.8, [1.0, 540, 1150], [1.08, 540, 1120]);
  boardBg(c, t);
  drawRoach(c, 560, 1360, 1.15, { t, xray: ss(tp, tp + .6, t) * .8, expr: t > tb && t < tr ? 'shock' : 'smile', spiracles: sp, look: [-.4, .3], headBehind: false });
  // boca con X
  if (t > tb && t < tr + .4) { const a = eBack((t - tb) / .3) * (1 - clamp((t - tr) / .4)); c.save(); c.translate(560 + 1.15 * 330, 1360 - 1.15 * 70); c.scale(a, a); c.strokeStyle = '#ff4d5e'; c.lineWidth = 18; c.lineCap = 'round'; c.beginPath(); c.moveTo(-50, -50); c.lineTo(50, 50); c.moveTo(50, -50); c.lineTo(-50, 50); c.stroke(); c.restore(); }
  if (sp > 0) { c.save(); c.globalAlpha = sp; c.strokeStyle = 'rgba(160,220,255,.9)'; c.lineWidth = 4; c.setLineDash([10, 10]); c.beginPath(); c.moveTo(560, 1360 - 1.15 * 94 + 80); c.lineTo(420, 1620); c.stroke(); c.setLineDash([]); c.restore(); lab(c, t, tr + .3, 'espiráculos', 420, 1660, '#7ad0ff', 1e9, 44); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t < tp) popText(c, t, tq, W / 2, 700, '¿CÓMO?', 140, '#ffd166', 1.4);
  numPill(c, t, tp, 15.3, '1', 150, 640);
  lab(c, t, tb, 'no respira por la boca', 600, 640, '#ff6b6b', tr - .1, 44);
  lab(c, t, wf('lados') - .1, 'respira por el cuerpo', 600, 640, '#7ad0ff', 1e9, 44);
});

// 4. Segundo: no se desangra (15.3–22.6)
scene(15.3, (c, t, lt) => {
  const td = wf('desangra') - .1, tpr = wf('presión') - .2, ttp = wf('tapa') - .1, plug = ss(ttp, ttp + 1.0, t);
  c.translate(W / 2, H / 2); const z = 1.0 + .12 * ss(15.3, 18, t); c.scale(z, z); c.translate(-W / 2, -H / 2);
  kitchen(c, t);
  drawRoach(c, 420, 1640, 1.2, { t, head: false, ooze: plug > 0 ? 1 - plug : ss(td, td + 1.5, t), plug, look: [0, 0] });
  // manómetro de presión
  if (t > tpr) { const a = eBack((t - tpr) / .35); c.save(); c.translate(800, 960); c.scale(a, a); c.fillStyle = '#2a2a34'; c.beginPath(); c.arc(0, 0, 150, 0, TAU); c.fill(); c.fillStyle = '#fff8ee'; c.beginPath(); c.arc(0, 0, 130, 0, TAU); c.fill();
    [[Math.PI * .75, Math.PI * 1.25, '#4cd97b'], [Math.PI * 1.25, Math.PI * 1.75, '#ffd166'], [Math.PI * 1.75, Math.PI * 2.25, '#ff4d5e']].forEach(([a0, a1, col]) => { c.strokeStyle = col; c.lineWidth = 22; c.beginPath(); c.arc(0, 0, 100, a0, a1); c.stroke(); });
    const nd = Math.PI * .8 + Math.sin(t * 5) * .04; c.strokeStyle = '#1a1a22'; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(nd) * 100, Math.sin(nd) * 100); c.stroke(); c.fillStyle = '#1a1a22'; c.beginPath(); c.arc(0, 0, 16, 0, TAU); c.fill();
    c.fillStyle = '#2a1a1a'; c.font = '900 34px Nunito'; c.textAlign = 'center'; c.fillText('PRESIÓN', 0, 70); c.restore(); lab(c, t, tpr + .4, 'casi nada', 800, 1170, '#4cd97b', 1e9, 40); }
  if (plug > .7) { const a = eBack((t - ttp - .7) / .3); c.save(); c.translate(420 + 1.2 * 290, 1640 - 1.2 * 260); c.scale(a, a); c.fillStyle = '#4cd97b'; c.beginPath(); c.arc(0, 0, 50, 0, TAU); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 14; c.lineCap = 'round'; c.beginPath(); c.moveTo(-22, 2); c.lineTo(-6, 20); c.lineTo(24, -18); c.stroke(); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  numPill(c, t, 15.35, 22.6, '2', 150, 640);
  lab(c, t, td, 'no se desangra', 560, 640, '#ffd166', ttp - .1, 46);
  lab(c, t, ttp, 'se tapa solito', 560, 640, '#4cd97b', 1e9, 46);
});

// 5. Tercero: cerebritos por todo el cuerpo (22.6–30.2)
scene(22.6, (c, t, lt) => {
  const tcb = wf('cerebritos') - .1, tpt = wf('patas') - .2;
  cam(c, lt, 7.6, [1.05, 540, 1150], [1.0, 540, 1150]);
  boardBg(c, t, ['#3a2a5a', '#160e28']);
  drawRoach(c, 520, 1380, 1.15, { t, walk: t > wf('moverse') ? t * 4 : null, head: false, xray: ss(22.8, 23.6, t) * .85, ganglia: ss(tcb, tcb + 1.2, t), glowLegs: ss(tpt, tpt + .4, t) * (.6 + .4 * Math.sin(t * 8)) });
  // cabeza a un lado con un "no la necesito"
  looseHead(c, 880, 900, .55, Math.sin(t * 1.5) * .1, t, 'smile');
  c.setTransform(1, 0, 0, 1, 0, 0);
  numPill(c, t, 22.65, 30.2, '3', 150, 640);
  lab(c, t, wf('necesita') - .1, 'no necesita la cabeza', 600, 640, '#ffd166', tcb - .1, 44);
  lab(c, t, tcb, '"cerebritos" 🧠', 600, 640, '#ffd166', 1e9, 46);
  lab(c, t, tpt, 'mueven las patas', W / 2, 1620, '#ffd166', 1e9, 44);
});

// 6. ¿De qué se muere? De sed (30.2–36.0)
scene(30.2, (c, t, lt) => {
  const tsd = wf('sed') - .1, ta = wf('agua') - .2, dry = ss(tsd, 36, t);
  cam(c, lt, 5.8, [1.1, 540, 1250], [1.0, 540, 1200]);
  kitchen(c, t);
  c.fillStyle = `rgba(255,150,60,${dry * .25})`; c.fillRect(-300, -300, W + 600, H + 600);
  // gota de agua gigante
  c.save(); c.translate(820, 1560); const wb = 1 + Math.sin(t * 3) * .03; c.scale(wb, 1 / wb); const g = c.createRadialGradient(-40, -120, 10, 0, -60, 220); g.addColorStop(0, '#e8fbff'); g.addColorStop(.5, '#6ad0f0'); g.addColorStop(1, '#1a7ab0'); c.fillStyle = g; c.beginPath(); c.moveTo(0, -300); c.bezierCurveTo(60, -200, 170, -110, 170, 0); c.arc(0, 0, 170, 0, Math.PI); c.bezierCurveTo(-170, -110, -60, -200, 0, -300); c.fill(); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.ellipse(-70, -60, 26, 50, .4, 0, TAU); c.fill(); c.restore();
  drawRoach(c, 330, 1680, .8, { t, walk: t < tsd ? t * 3 : null, head: false, droop: dry });
  // reloj de arena
  c.save(); c.translate(200, 900); c.rotate(Math.sin(t * 2) * .05); c.fillStyle = '#8a5a30'; c.fillRect(-90, -150, 180, 22); c.fillRect(-90, 128, 180, 22); c.fillStyle = 'rgba(220,240,255,.35)'; c.beginPath(); c.moveTo(-70, -128); c.lineTo(70, -128); c.lineTo(10, 0); c.lineTo(70, 128); c.lineTo(-70, 128); c.lineTo(-10, 0); c.fill();
  const sand = ss(30.4, 36, t); c.fillStyle = '#f2c04a'; c.beginPath(); c.moveTo(-60 * (1 - sand), -128 + 128 * sand); c.lineTo(60 * (1 - sand), -128 + 128 * sand); c.lineTo(0, 0); c.fill(); c.beginPath(); c.moveTo(-70, 128); c.lineTo(70, 128); c.lineTo(0, 128 - 110 * sand); c.fill(); c.fillRect(-3, 0, 6, 128); c.restore();
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t < tsd) popText(c, t, 30.3, W / 2, 700, '¿De qué se muere?', 92, '#ffd166', tsd - 30.3);
  popText(c, t, tsd, W / 2, 700, 'DE SED 💧', 130, '#7ad0ff', 2.6);
  lab(c, t, ta, 'sin boca no puede tomar agua', W / 2, 700, '#7ad0ff', 1e9, 42);
});

// 7. ¿La hubieras pisado o la dejabas ir? (36.0–40.2)
scene(36.0, (c, t, lt) => {
  cam(c, lt, 4.2, [1.15, 540, 1350], [1.0, 540, 1300]);
  kitchen(c, t);
  // puerta
  c.save(); c.translate(980, 1500); woodFill(c, rectPts(-130, -620, 260, 620, 10), ['#a8703f', '#6e4322'], 33); c.fillStyle = '#1a1220'; c.fillRect(-130, -30, 260, 30); c.fillStyle = '#ffd84a'; c.beginPath(); c.arc(-90, -300, 14, 0, TAU); c.fill(); c.restore();
  const hes = Math.sin(t * 5) * .2;
  drawBeto(c, 270, 1900, .9, { t, pose: 'high', expr: 'worry', look: [1, .6], blink: (lt % 2.4) - 1.2, prop: (c, P) => chanclaProp(c, P, -.4 + hes) });
  drawRoach(c, 560 + walkX(t, 36.6, 110), 1780, .55, { t, walk: t * 6, head: false });
  looseHead(c, 440 + walkX(t, 36.6, 110), 1730, .55, Math.sin(t * 3) * .2, t, 'smile');
  c.setTransform(1, 0, 0, 1, 0, 0);
  const a = eBack((t - wf('tú') + .1) / .4); if (a > 0) { c.save(); c.translate(W / 2, 700); c.scale(a, a); c.font = '900 60px Nunito'; const l1 = '¿La pisas 🩴', l2 = 'o la dejas ir? 🚪'; const w = Math.max(c.measureText(l1).width, c.measureText(l2).width) + 90; rrect(c, -w / 2, -90, w, 180, 44); c.fillStyle = 'rgba(14,13,18,.92)'; c.fill(); c.strokeStyle = '#ffd166'; c.lineWidth = 5; c.stroke(); c.fillStyle = '#ffd57e'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(l1, 0, -36); c.fillText(l2, 0, 40); c.restore(); }
  const fo = clamp((t - (END - .6)) / .6); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});
