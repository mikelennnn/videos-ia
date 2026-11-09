// ---------- escenas: ¿por qué no puedes hacerte cosquillas? (~40 s) ----------
END = 40.0;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
function wf(word, n = 0) { let k = 0; for (const w of WORDS) { if (w.w.toLowerCase().replace(/[^a-záéíóúñü0-9]/g, '') === word) { if (k === n) return w.s; k++; } } throw new Error('no ' + word); }
const BX = 540, BY = 1830, BS = 1.05; // Beto en el centro
const selfTickle = t => (c, P) => { tickleFingers(c, P[1][0] + 4, P[1][1] + 6, t, 1, 0); tickleFingers(c, P[3][0] - 4, P[3][1] + 6, t + .3, 1, Math.PI); };
const laughOpts = (t, k) => ({ expr: 'smile', mouthOpen: 1, eyesClosed: true, shiver: .5 * k, headTilt: Math.sin(t * 9) * .08 * k });
function bellyW(x, y, s) { return [x, y - 400 * s]; }

// 1. Gancho: intenta hacerte cosquillas… no puedes (0–3.5)
scene(0, (c, t, lt) => {
  const tn = wf('no') - .05;
  cam(c, lt, 3.5, [1.25, 540, 1380], [1.1, 540, 1300]);
  room(c, t);
  const flat = t > tn;
  drawBeto(c, BX, BY, BS, { t, pose: 'type', expr: flat ? 'flat' : 'smile', mouthOpen: .5, look: [0, .7], blink: (lt % 2.6) - 1.3, prop: selfTickle(t) });
  const [bx, by] = bellyW(BX, BY, BS); tickleLines(c, t, bx, by, flat ? 0 : .35, '255,255,255');
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, .2, 'hazte cosquillas 👉', W / 2, 700, '#ffd166', tn - .1, 50);
  popText(c, t, tn, W / 2, 700, '😐 NADA', 130, '#ffd166', 1.2);
});

// 2. ¿Por qué? Tu cerebro te está espía (3.5–7.5)
scene(3.5, (c, t, lt) => {
  const tq = wf('por') - .05, tc = wf('cerebro') - .15, te = wf('espiando') - .1, br = ss(tc, tc + .5, t);
  cam(c, lt, 4.2, [1.05, 540, 1200], [1.0, 540, 1150]);
  room(c, t);
  drawBeto(c, 360, BY, .95, { t, pose: 'type', expr: 'flat', look: [.6, -.6], blink: (lt % 2.4) - 1.2, prop: selfTickle(t) });
  if (br > 0) { c.save(); c.globalAlpha = br; const y = lerp(700, 900, eBack(br));
    drawBrain(c, 780, y, .62, { t, mood: 'calm', look: [-.7, .8] });
    magnifier(c, 640 - 40 * Math.sin(t * 2), y + 330, .9 * eBack(clamp((t - te + .3) / .4)), -.7); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  popText(c, t, tq, W / 2, 620, '¿POR QUÉ?', 130, '#ffd166', tc - tq + .2);
  lab(c, t, te, 'te está espiando 🕵️', W / 2, 560, '#7ad0ff', 1e9, 48);
});

// 3. El cerebelo predice y baja el volumen (7.5–14.5)
scene(7.5, (c, t, lt) => {
  const tm = wf('mano') - .1, tcb = wf('cerebelo') - .1, tp = wf('predice') - .1, tb = wf('baja') - .1, vol = lerp(.95, .12, ss(tb, tb + 1.0, t));
  cam(c, lt, 7.0, [1.0, 540, 1100], [1.06, 540, 1080]);
  boardBg(c, t);
  const bx = 600, by = 1000;
  // mano (cosquillas) abajo a la izquierda
  c.save(); c.translate(250, 1470); c.fillStyle = SKIN.line; c.beginPath(); c.arc(0, 0, 66, 0, TAU); c.fill(); c.fillStyle = SKIN.col; c.beginPath(); c.arc(0, 0, 60, 0, TAU); c.fill(); c.restore();
  tickleFingers(c, 290, 1460, t, 2.2, -.5);
  lab(c, t, tm, 'tu mano', 250, 1620, '#ffd166', 1e9, 42);
  // señal real hacia el cerebro
  if (t > tm) signalWave(c, t, [330, 1380], [bx - 120, by + 170], vol * ss(tm, tm + .4, t));
  drawBrain(c, bx, by, .8, { t, mood: t > tb ? 'wink' : 'calm', look: [-.6, .7] });
  // cerebelo resaltado
  const ck = ss(tcb, tcb + .4, t); if (ck > 0) { c.save(); c.globalCompositeOperation = 'lighter'; glow(c, bx + 112, by + 120, 120, '255,210,90', ck * (.6 + .3 * Math.sin(t * 6))); c.restore(); lab(c, t, tcb, 'cerebelo', bx + 220, by + 280, '#ffd166', 1e9, 42); }
  // predicción: burbuja con la misma onda punteada
  const pk = ss(tp, tp + .4, t); if (pk > 0) { c.save(); c.globalAlpha = pk; c.translate(bx + 40, by - 380); c.fillStyle = 'rgba(255,255,255,.12)'; rrect(c, -300, -110, 600, 220, 110); c.fill(); c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 4; c.setLineDash([14, 10]); c.stroke(); c.setLineDash([]);
    [[-60, 150, 26], [-100, 200, 16]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, TAU); c.fillStyle = 'rgba(255,255,255,.2)'; c.fill(); c.stroke(); });
    c.restore(); c.save(); c.globalAlpha = pk; c.setLineDash([10, 12]); signalWave(c, t, [bx - 220, by - 380], [bx + 300, by - 380], .7, '122,208,255', 6); c.restore();
    lab(c, t, tp + .2, 'ya sé lo que vas a sentir', W / 2, by - 262, '#7ad0ff', 1e9, 40); }
  volumeKnob(c, 820, 1480, vol, .82 * eBack(clamp((t - tb + .4) / .4)));
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, tb, 'le baja el volumen 🔉', W / 2, 1760, '#ff6b6b', 1e9, 46);
});

// 4. Ya sabe que viene: sin sorpresa no hay cosquillas (14.5–20.2)
scene(14.5, (c, t, lt) => {
  const tv = wf('viene') - .1, ts = wf('sorpresa') - .1, tc = wf('cosquillas', 1) - .1;
  cam(c, lt, 5.7, [1.0, 540, 1200], [1.12, 540, 1250]);
  room(c, t);
  drawBeto(c, BX, BY, BS, { t, pose: 'type', expr: 'flat', look: [0, .6], blink: (lt % 2.2) - 1.1, prop: selfTickle(t) });
  drawBrain(c, 790, 820, .5, { t, mood: t > tv ? 'sleep' : 'calm' });
  if (t > tv) zzz(c, t, 900, 690, ss(tv, tv + .5, t));
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, wf('ya') - .1, 'ya sabe que viene 🥱', W / 2, 560, '#7ad0ff', ts - .1, 48);
  popText(c, t, ts, W / 2, 600, 'SORPRESA ❌', 120, '#ff6b6b', tc - ts + .2);
  lab(c, t, tc, 'no hay cosquillas', W / 2, 600, '#ff6b6b', 1e9, 52);
});

// 5. Si alguien más te toca: ¡ataque de risa! (20.2–27.2)
scene(20.2, (c, t, lt) => {
  const ta = wf('alguien') - .1, tt = wf('toca') - .05, tad = wf('adivinar') - .1, tr = wf('ataque') - .05, lk = ss(tr, tr + .3, t);
  cam(c, lt, 7.0, [1.1, 540, 1300], [1.0, 540, 1200]);
  shake(c, t, tr, 22, .4);
  room(c, t);
  const [bx, by] = bellyW(BX, BY, BS), arm = eOut(clamp((t - ta) / .7));
  const lo = lk > 0 ? laughOpts(t, lk) : { expr: t > tt ? 'shock' : 'smile', mouthOpen: .3, look: [.8, .4], blink: (lt % 2.6) - 1.3 };
  drawBeto(c, BX, BY, BS, { t, pose: 'side', pose2: 'shrug', pk: ss(tr, tr + .3, t), ...lo });
  if (arm > 0) otherArm(c, [1350, 1250], [lerp(1300, bx + 110, arm), lerp(1200, by + 20, arm) + Math.sin(t * 14) * 10 * (t > tt ? 1 : 0)], t);
  tickleLines(c, t, bx, by, t > tt ? (.5 + lk * .5) : 0);
  laughTears(c, BX, BY - 700 * BS, t, lk);
  // cerebro confundido
  const bk = ss(tad - .3, tad + .2, t) * (1 - ss(tr, tr + .3, t)); if (bk > 0) { c.save(); c.globalAlpha = bk; drawBrain(c, 260, 820, .5, { t, mood: 'confused' }); c.font = '900 90px Nunito'; c.fillStyle = '#ffd166'; c.textAlign = 'center'; ['?', '?', '?'].forEach((q, i) => c.fillText(q, 160 + i * 100, 640 - Math.abs(Math.sin(t * 4 + i)) * 30)); c.restore(); }
  jaText(c, t, tr, BX, 1000, 7, 3);
  c.setTransform(1, 0, 0, 1, 0, 0);
  flash(c, t, tr, .25);
  lab(c, t, ta, 'alguien más 👋', W / 2, 560, '#4cd97b', tad - .2, 48);
  lab(c, t, tad, '¿dónde? ¿cuándo?', W / 2, 560, '#ffd166', tr - .1, 48);
  popText(c, t, tr, W / 2, 600, '¡JAJAJA!', 140, '#ff8fc0', 2.0);
});

// 6. El experimento del robot (27.2–34.2)
scene(27.2, (c, t, lt) => {
  const tci = wf('científicos') - .1, tro = wf('robot') - .1, tto = wf('toque') - .1, td = wf('dos') - .1, tta = wf('tarde') - .1, ty = wf('ya', 1) - .05, lk = ss(ty, ty + .3, t);
  cam(c, lt, 7.0, [1.0, 540, 1200], [1.06, 560, 1250]);
  shake(c, t, ty, 18, .35);
  room(c, t);
  const bx0 = 360, bs = .95, [bx, by] = bellyW(bx0, BY, bs);
  const lo = lk > 0 ? laughOpts(t, lk) : { expr: 'flat', look: [.8, .3], blink: (lt % 2.4) - 1.2 };
  drawBeto(c, bx0, BY, bs, { t, pose: 'side', pose2: lk > 0 ? 'shrug' : 'side', pk: lk, ...lo });
  // palanca en la mano de Beto
  const lv = .45 + .1 * Math.sin(t * 6); if (lk <= 0) lever(c, bx0 + 165 * bs, BY - 60, lv, .9);
  // robot
  const rin = eOut(clamp((t - tro + .4) / .7)), base = [lerp(1300, 880, rin), 1720];
  const reach = t < tto ? 0 : 1, delay = t > td ? 1 : 0;
  const tip = [lerp(base[0] - 120, bx + 130, eOut(clamp((t - tto) / .5)) * reach || 0), lerp(1300, by + 10, eOut(clamp((t - tto) / .5)) * reach || 0)];
  if (rin > 0) robotArm(c, base, tip, t, { light: delay ? (Math.sin(t * 10) > 0 ? 1 : 0) : 0, wiggle: reach });
  tickleLines(c, t, bx, by, lk);
  laughTears(c, bx0, BY - 700 * bs, t, lk);
  if (t > tta) stopwatch(c, 820, 760, .8 * eBack(clamp((t - tta) / .4)), '0.2 s', t);
  jaText(c, t, ty, bx0 + 100, 1000, 6, 9);
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, tci, 'experimento 🔬', W / 2, 560, '#7ad0ff', td - .2, 48);
  lab(c, t, td, '2 décimas de segundo tarde', W / 2, 560, '#ffd166', ty - .1, 44);
  popText(c, t, ty, W / 2, 600, '¡COSQUILLAS!', 112, '#ff8fc0', 1.4);
});

// 7. ¿Pies o panza? (34.2–40)
scene(34.2, (c, t, lt) => {
  cam(c, lt, 5.8, [1.15, 540, 1350], [1.0, 540, 1250]);
  room(c, t);
  const [bx, by] = bellyW(BX, BY, BS);
  drawBeto(c, BX, BY, BS, { t, pose: 'shrug', ...laughOpts(t, .6) });
  otherArm(c, [1350, 1250], [bx + 110 + Math.sin(t * 3) * 20, by + 20 + Math.sin(t * 14) * 10], t);
  tickleLines(c, t, bx, by, .7); laughTears(c, BX, BY - 700 * BS, t, .7);
  jaText(c, t, 34.2, BX, 1050, 5, 17);
  c.setTransform(1, 0, 0, 1, 0, 0);
  const a = eBack((t - wf('dónde') + .1) / .4); if (a > 0) { c.save(); c.translate(W / 2, 640); c.scale(a, a); c.font = '900 64px Nunito'; const l1 = '¿Más cosquillas en', l2 = 'los pies 🦶 o la panza?'; const w = Math.max(c.measureText(l1).width, c.measureText(l2).width) + 90; rrect(c, -w / 2, -95, w, 190, 44); c.fillStyle = 'rgba(14,13,18,.92)'; c.fill(); c.strokeStyle = '#ffd166'; c.lineWidth = 5; c.stroke(); c.fillStyle = '#ffd57e'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(l1, 0, -38); c.fillText(l2, 0, 42); c.restore(); }
  const fo = clamp((t - (END - .6)) / .6); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});
