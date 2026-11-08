// ---------- escenas: ¿por qué sientes que te caes al dormirte? ----------
END = 57.6;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
const wt = i => WORDS[i].s;
const jerkAt = (t, t0) => t < t0 ? 0 : (t < t0 + .12 ? eOut((t - t0) / .12) : Math.max(0, 1 - (t - t0 - .12) / .5) * .9 + .1 * (t - t0 < 1.6 ? 1 : 0));

// 1. Gancho: ¡PUM!
scene(0, (c, t, lt) => {
  const tp = wt(8); shake(c, t, tp, 30, .45); cam(c, lt, 5.3, [1.15, 420, 1330], [1.25, 420, 1330], false);
  bedroom(c, t);
  const j = t < tp ? 0 : jerkAt(t, tp);
  bedBeto(c, t, { jerk: j, expr: t < tp ? (t < .8 ? 'smile' : 'sleep') : (t < tp + 1.8 ? 'shock' : 'worry') });
  if (t < tp) zzz(c, t, 640, 1260, ss(.8, 1.4, t));
  c.setTransform(1, 0, 0, 1, 0, 0);
  pumText(c, t, tp, W / 2, 760, 1.15, 1.6);
  flash(c, t, tp, .15);
});

// 2. 7 de cada 10: espasmo hípnico
scene(5.3, (c, t, lt) => {
  cam(c, lt, 5.8, [1.0, 540, 1100], [1.05, 540, 1100]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#1a1c3a'], [.6, '#2a2a5a'], [1, '#3a2a6a']]); c.fillRect(-400, -400, W + 800, H + 800);
  bokeh(c, t, 14, 7, .3);
  for (let i = 0; i < 10; i++) { const col = i % 5, row = Math.floor(i / 5), x = 150 + col * 195, y = 1000 + row * 240; const ti = wt(17) + i * .1; const lit = i < 7 ? clamp((t - ti) / .2) : 0;
    const b = lit > 0 && lit < 1 ? 1 + .2 * Math.sin(lit * Math.PI) : 1; c.save(); c.translate(x, y); c.scale(b, b); face(c, 0, 0, 78, i, lit, t); c.restore(); }
  if (t > wt(25)) { const a = eBack((t - wt(25)) / .4); c.save(); c.translate(W / 2, 1560); c.scale(a, a); c.font = '900 76px Nunito'; const w = c.measureText('ESPASMO HÍPNICO').width + 90; rrect(c, -w / 2, -64, w, 128, 40); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = '#c77dff'; c.lineWidth = 5; c.stroke(); c.fillStyle = '#f2dcff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('ESPASMO HÍPNICO', 0, 4); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(17), 11.0, '7', 'de 10');
});

// 3. Los músculos se relajan de golpe
scene(11.1, (c, t, lt) => {
  c.translate(W / 2, H / 2); const z = 1 + .07 * (1 - eOut(lt / .4)); c.scale(z, z); c.translate(-W / 2, -H / 2);
  const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1300); g.addColorStop(0, '#1b3b5e'); g.addColorStop(1, '#0a1626'); c.fillStyle = g; c.fillRect(-100, -100, W + 200, H + 200);
  c.strokeStyle = 'rgba(140,200,255,.07)'; c.lineWidth = 2; for (let x = 0; x < W; x += 60) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let y = 0; y < H; y += 60) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  const rx = ss(wt(35), wt(37) + .3, t), sg = rx > .5 ? (rx - .5) * 30 : 0;
  c.save(); c.shadowColor = 'rgba(120,200,255,.9)'; c.shadowBlur = 30; c.translate(540, 1850 + sg); c.drawImage(E.betoSil, -350 * 1.15, -1050 * 1.15, 700 * 1.15, 1100 * 1.15); c.restore();
  const col = (k) => { const r = lerp(255, 90, rx), gg = lerp(80, 170, rx), b = lerp(100, 255, rx); return `rgba(${r | 0},${gg | 0},${b | 0},${.75 + .2 * Math.sin(t * 8 + k) * (1 - rx)})`; };
  const S = 1.15, ox = 540, oy = 1850 + sg, M = [[-160, -340, 36, 90, .1], [160, -340, 36, 90, -.1], [-60, -470, 70, 60, 0], [60, -470, 70, 60, 0], [0, -330, 60, 70, 0], [-58, -200, 46, 100, 0], [58, -200, 46, 100, 0], [-58, -80, 36, 60, 0], [58, -80, 36, 60, 0]];
  M.forEach(([mx, my, a, b, r], k) => { const pul = 1 + (1 - rx) * .06 * Math.sin(t * 10 + k); c.save(); c.translate(ox + mx * S, oy + my * S); c.rotate(r); c.scale(pul, pul); c.fillStyle = col(k); c.beginPath(); c.ellipse(0, 0, a * S * .7, b * S * .7, 0, 0, TAU); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 3; for (let q = -1; q <= 1; q++) { c.beginPath(); c.moveTo(q * a * .25 * S, -b * .55 * S); c.lineTo(q * a * .25 * S, b * .55 * S); c.stroke(); } c.restore(); });
  const lab = (txt, x, y, col2, a) => { if (a <= 0) return; c.save(); c.globalAlpha = a; c.translate(x, y); c.font = '800 46px Nunito'; const w = c.measureText(txt).width + 50; rrect(c, -w / 2, -34, w, 68, 34); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = col2; c.lineWidth = 4; c.stroke(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 2); c.restore(); };
  lab('TENSO', 540, 640, '#ff5a72', 1 - rx); lab('RELAJADO', 540, 640, '#5ab8ff', rx);
  motes(c, t, { n: 20, seed: 4, size: 10, a: .3, spr: A.dotBlue });
});

// 4. El cerebro se confunde y entra en pánico
scene(15.2, (c, t, lt) => {
  const tp = wt(58);
  cam(c, lt, 7.3, [1.0, 540, 1050], [1.08, 540, 1050]);
  const alarm = t > tp - .2;
  c.fillStyle = vgrad(c, -300, 2200, alarm ? [[0, '#3a0a1a'], [1, '#6a1a2a']] : [[0, '#2a1a4a'], [1, '#4a2a6a']]); c.fillRect(-400, -400, W + 800, H + 800);
  if (alarm) { c.save(); c.globalCompositeOperation = 'lighter'; c.translate(540, 520); c.rotate(t * 7); for (let k = 0; k < 2; k++) { c.rotate(Math.PI); const g2 = c.createLinearGradient(0, 0, 1400, 0); g2.addColorStop(0, 'rgba(255,60,60,.45)'); g2.addColorStop(1, 'rgba(255,60,60,0)'); c.fillStyle = g2; c.beginPath(); c.moveTo(0, 0); c.lineTo(1400, -260); c.lineTo(1400, 260); c.fill(); } c.restore();
    c.fillStyle = '#c81f2a'; c.beginPath(); c.arc(540, 520, 60, Math.PI, TAU); c.fill(); c.fillRect(470, 520, 140, 30); glow(c, 540, 500, 160, '255,80,80', .8 + .2 * Math.sin(t * 20)); }
  bokeh(c, t, 12, 9, .25);
  const mood = alarm ? 'panic' : t > wt(46) ? 'confused' : 'calm';
  drawBrain(c, 540, 1000, 1.25, { t, mood, look: t > wt(50) && !alarm ? [0, 1] : [0, 0] });
  // ? signos
  if (mood === 'confused') ['?', '?', '?'].forEach((q, i) => { const a = eBack((t - wt(46) - i * .15) / .3); if (a <= 0) return; c.save(); c.translate(320 + i * 220, 640 + Math.sin(t * 4 + i) * 10); c.scale(a, a); c.font = '900 110px Nunito'; c.textAlign = 'center'; c.lineWidth = 12; c.strokeStyle = '#2a1a4a'; c.strokeText(q, 0, 0); c.fillStyle = '#fff'; c.fillText(q, 0, 0); c.restore(); });
  // cuerpecito que se afloja
  const fl = ss(wt(52) - .3, wt(52) + .5, t);
  c.save(); c.translate(540, 1820); c.scale(.55, .55 * (1 - fl * .12)); c.rotate(fl * .08); drawBeto(c, 0, 0, 1, { t, pose: fl > .5 ? 'side' : 'side', expr: fl > .5 ? 'sleep' : 'smile' }); c.restore();
  if (fl > 0) { c.save(); c.globalAlpha = fl; c.font = '900 50px Nunito'; c.textAlign = 'center'; c.fillStyle = '#9fd4ff'; c.fillText('~ flojito ~', 540, 1290 + Math.sin(t * 3) * 6); c.restore(); }
  // conexión cerebro–cuerpo
  c.save(); c.setLineDash([12, 12]); c.lineDashOffset = -t * 60; c.strokeStyle = alarm ? 'rgba(255,120,120,.8)' : 'rgba(200,180,255,.5)'; c.lineWidth = 5; c.beginPath(); c.moveTo(540, 1240); c.lineTo(540, 1380); c.stroke(); c.restore();
  if (alarm) { const a = eBack((t - tp) / .3); c.save(); c.translate(W / 2, 760); c.rotate(-.05 + Math.sin(t * 25) * .02); c.scale(a, a); c.fillStyle = '#ffd166'; rrect(c, -330, -70, 660, 140, 30); c.fill(); c.strokeStyle = '#1a1a1a'; c.lineWidth = 8; c.stroke();
    c.font = '900 82px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#c81f2a'; c.fillText('¡NOS CAEMOS!', 0, 6); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
});

// 5. La sacudida
scene(22.5, (c, t, lt) => {
  const tb = wt(62); shake(c, t, tb, 30, .4); cam(c, lt, 3.3, [1.0, 420, 1250], [1.08, 420, 1250]);
  bedroom(c, t);
  bedBeto(c, t, { jerk: jerkAt(t, tb + .1), expr: t > tb + .1 ? 'shock' : 'sleep' });
  // burbuja con el cerebro
  c.save(); c.fillStyle = 'rgba(255,255,255,.92)'; [[560, 1180, 18], [520, 1080, 28]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); }); c.beginPath(); c.ellipse(420, 780, 330, 230, 0, 0, TAU); c.fill(); c.restore();
  drawBrain(c, 420, 790, .65, { t, mood: t > tb ? 'panic' : 'panic' });
  if (t > tb - .05 && t < tb + .9) { bolt(c, 420, 980, 300, 1430, Math.floor(t * 20), 14); bolt(c, 420, 980, 120, 1480, Math.floor(t * 20) + 7, 10); }
  c.setTransform(1, 0, 0, 1, 0, 0); flash(c, t, tb, .2, '255,250,200');
  pumText(c, t, tb + .1, 760, 1450, .6, 1.0);
});

// 6. El sueño del escalón
scene(25.8, (c, t, lt) => {
  const tt = wt(73), tf = wt(77), tj = 29.95;
  shake(c, t, tj, 26, .35); cam(c, lt, 4.6, [1.0, 420, 1200], [1.05, 420, 1200]);
  bedroom(c, t);
  bedBeto(c, t, { jerk: jerkAt(t, tj), expr: t > tj ? 'shock' : 'sleep' });
  // burbuja de sueño
  c.save(); c.fillStyle = 'rgba(255,255,255,.95)'; [[580, 1250, 20], [540, 1140, 32]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); });
  const bp = []; for (let i = 0; i < 18; i++) { const a = i / 18 * TAU; bp.push([480 + Math.cos(a) * 420 * (1 + .06 * Math.sin(i * 3)), 760 + Math.sin(a) * 300 * (1 + .06 * Math.cos(i * 3))]); } smoothPath(c, bp); c.fill(); c.clip();
  c.fillStyle = vgrad(c, 460, 1060, [[0, '#9fd4ff'], [1, '#e6f4ff']]); c.fillRect(0, 400, W, 800);
  // escalones
  c.fillStyle = '#b8a8c8'; for (let k = 0; k < 4; k++) { c.fillRect(120 + k * 160, 700 + k * 80, 700, 80); } c.fillStyle = 'rgba(0,0,0,.15)'; for (let k = 0; k < 4; k++) c.fillRect(120 + k * 160, 700 + k * 80, 700, 10);
  const wx = lerp(160, 360, clamp((t - 26.0) / (tt - 26.0))), fall = t > tt ? clamp((t - tt) / 1.2) : 0;
  c.save(); c.translate(wx + fall * 260, 700 - 6 + fall * 300 + Math.abs(Math.sin(t * 10)) * (fall ? 0 : 8)); c.rotate(fall * 1.3); drawBeto(c, 0, 0, .3, { t, pose: fall > 0 ? 'arms' : (Math.floor(t * 6) % 2 ? 'runA' : 'runB'), expr: fall > 0 ? 'shock' : 'smile', mouthOpen: .3 }); c.restore();
  c.restore();
  c.save(); c.strokeStyle = 'rgba(200,200,230,.6)'; c.lineWidth = 6; smoothPath(c, bp); c.stroke(); c.restore();
  c.setTransform(1, 0, 0, 1, 0, 0);
  pumText(c, t, tj, 760, 1500, .55, 1.0);
});

// 7–8. Ancestros en los árboles
scene(30.4, (c, t, lt) => {
  const ts = wt(98) - .2, tg = wt(100);
  const tilt = ss(wt(92), wt(95) + .6, t) * (1 - ss(37.4, 38.2, t));
  shake(c, t, tg, 22, .35);
  c.translate(W / 2, H / 2); const z = (1.05 - tilt * .25) * (1 + .07 * (1 - eOut(lt / .4))); c.scale(z, z); c.translate(-540, -lerp(1150, 1700, tilt));
  jungle(c, t);
  // suelo muy abajo
  c.fillStyle = '#06161a'; c.fillRect(-400, 2500, W + 800, 600); for (let i = 0; i < 20; i++) { c.fillStyle = '#0e3a24'; c.beginPath(); c.ellipse(hash(i) * W, 2500, 90, 40, 0, 0, TAU); c.fill(); }
  const slip = ss(ts, ts + .35, t), hang = t > tg;
  if (!hang) { c.save(); c.translate(880 + slip * 60, 1105 + slip * 90); c.rotate(-1.57 + slip * .9); drawApe(c, 0, 0, .85, { walk: 0 }); c.restore();
    if (t < ts) zzz(c, t, 420, 960); }
  else { const sw = Math.sin((t - tg) * 3) * .12 * Math.exp(-(t - tg) * .8); c.save(); c.translate(900, 1130); c.rotate(sw);
    drawApe(c, -42, 574, .7, { walk: Math.sin((t - tg) * 4) * .3 });
    c.save(); c.scale(.7, .7); c.drawImage(C.apeArm, -80, -30); c.restore(); c.fillStyle = '#b07852'; c.beginPath(); c.ellipse(0, -4, 30, 22, 0, 0, TAU); c.fill(); c.restore(); }
  if (t > tg) sparks(c, t, tg, 900, 1140, 12, 3, '255,240,200');
  if (t > ts && t < tg + .8) { c.save(); c.globalAlpha = 1 - clamp((t - tg) / .8); c.font = '900 120px Nunito'; c.textAlign = 'center'; c.lineWidth = 14; c.strokeStyle = '#04121a'; c.strokeText('!', 900, 900); c.fillStyle = '#ffd166'; c.fillText('!', 900, 900); c.restore(); }
  // altura
  if (tilt > .05) { c.save(); c.globalAlpha = tilt; c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 5; c.setLineDash([16, 14]); c.beginPath(); c.moveTo(980, 1150); c.lineTo(980, 2480); c.stroke(); c.setLineDash([]);
    c.font = '900 64px Nunito'; c.textAlign = 'center'; c.fillStyle = '#fff'; c.save(); c.translate(1010, 1820); c.rotate(-Math.PI / 2); c.fillText('¡MUY ALTO!', 0, 0); c.restore(); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
});

// 9. Café, estrés y dormir poco
scene(40.6, (c, t, lt) => {
  cam(c, lt, 4.6, [1.0, 540, 1150], [1.06, 540, 1150]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#2a1a3a'], [.6, '#4a2a5a'], [1, '#6a3a5a']]); c.fillRect(-400, -400, W + 800, H + 800);
  bokeh(c, t, 16, 31, .35);
  const st = t > wt(113) - .1 ? 2 : t > wt(110) - .1 ? 1 : t > wt(108) - .1 ? 0 : -1;
  drawBeto(c, 540, 1860, 1.05, { t, pose: st === 0 ? 'phone' : st === 1 ? 'arms' : 'side', expr: st === 0 ? 'shock' : st === 1 ? 'worry' : st === 2 ? 'sleep' : 'smile', shiver: st === 0 ? 1 : st === 1 ? .4 : 0,
    prop: (c, P) => { if (st === 0) drawMug(c, 0, -430, .5, 0, t); } });
  if (st === 1) { c.save(); c.strokeStyle = '#ff5a72'; c.lineWidth = 8; c.lineCap = 'round'; [[300, 940], [780, 940]].forEach(([x, y], i) => { const s = 1 + .1 * Math.sin(t * 12 + i); c.save(); c.translate(x, y); c.scale(s, s); for (let k = 0; k < 4; k++) { c.rotate(Math.PI / 2); c.beginPath(); c.moveTo(10, 0); c.quadraticCurveTo(30, -10, 40, 0); c.stroke(); } c.restore(); }); c.restore(); }
  if (st === 2) zzz(c, t, 660, 1080);
  c.setTransform(1, 0, 0, 1, 0, 0);
  iconPill(c, t, wt(108) - .1, 45.1, W / 2 - 260, 650, 90, (c, lt) => { drawMug(c, 0, 50, .45, 0, lt); });
  iconPill(c, t, wt(110) - .1, 45.1, W / 2, 650, 90, (c, lt) => { c.fillStyle = '#ffd166'; c.beginPath(); c.arc(0, 0, 52, 0, TAU); c.fill(); c.fillStyle = '#2a1a10'; c.beginPath(); c.ellipse(-18, -8, 7, 10, 0, 0, TAU); c.ellipse(18, -8, 7, 10, 0, 0, TAU); c.fill(); c.strokeStyle = '#2a1a10'; c.lineWidth = 6; c.beginPath(); for (let k = 0; k <= 6; k++) c.lineTo(-24 + k * 8, 24 + (k % 2 ? -6 : 6)); c.stroke(); c.fillStyle = '#4cc9f0'; c.beginPath(); c.ellipse(40, -30, 9, 14, 0, 0, TAU); c.fill(); });
  iconPill(c, t, wt(112) - .1, 45.1, W / 2 + 260, 650, 90, (c, lt) => { c.strokeStyle = '#fff'; c.lineWidth = 6; rrect(c, -50, -28, 92, 56, 10); c.stroke(); c.fillStyle = '#fff'; c.fillRect(44, -12, 10, 24); c.fillStyle = Math.sin(lt * 10) > 0 ? '#ff4d5e' : '#7a1a1a'; c.fillRect(-42, -20, 18, 40); });
});

// 10. El giro: la cama se vuelve rama
scene(45.2, (c, t, lt) => {
  const tm = wt(131) - .4, back = 52.2;
  const k = ss(tm, tm + .5, t) * (1 - ss(back - .3, back, t));
  cam(c, lt, 7.2, [1.05, 420, 1250], [1.15, 440, 1220]);
  bedroom(c, t);
  if (k > 0) { c.save(); c.globalAlpha = k; jungle(c, t); c.restore(); }
  c.save(); c.globalAlpha = 1 - k; bedBeto(c, t, { expr: 'sleep' }); c.restore();
  if (k > 0) { c.save(); c.globalAlpha = k; c.translate(0, 1450 - 1130); c.drawImage(E.tree, -120, 200, 1300, 2400); c.restore(); c.save(); c.globalAlpha = k; c.translate(-40, 1440); c.rotate(1.5); drawBeto(c, 0, 0, .8, { t, pose: 'side', expr: 'sleep' }); c.restore(); }
  zzz(c, t, 640, 1240, .8);
  // cerebrito guardián
  c.save(); c.fillStyle = 'rgba(255,255,255,.92)'; [[600, 1180, 16], [640, 1080, 26]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); }); c.beginPath(); c.ellipse(700, 820, 260, 200, 0, 0, TAU); c.fill(); c.restore();
  const wink = t > wt(126) && t < wt(126) + 1.2;
  drawBrain(c, 700, 830, .55, { t, mood: wink ? 'wink' : t > wt(121) ? 'happy' : 'calm' });
  if (t > wt(126)) { c.save(); c.translate(860, 680); const a = eBack((t - wt(126)) / .4); c.scale(a, a); c.fillStyle = '#4cd97b'; c.beginPath(); c.moveTo(0, -40); c.bezierCurveTo(34, -40, 40, -10, 40, 10); c.lineTo(0, 46); c.lineTo(-40, 10); c.bezierCurveTo(-40, -10, -34, -40, 0, -40); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 8; c.beginPath(); c.moveTo(-16, 4); c.lineTo(-2, 18); c.lineTo(20, -10); c.stroke(); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
});

// 11. Comenta ¡PUM!
scene(52.4, (c, t, lt) => {
  cam(c, lt, 5.2, [1.08, 540, 1150], [1.0, 540, 1150]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#1d2a5a'], [.6, '#5a2a7a'], [1, '#c04a7a']]); c.fillRect(-400, -400, W + 800, H + 800);
  bokeh(c, t, 24, 41, .55);
  const tp = wt(137);
  drawBeto(c, 540, 1880, 1.05, { t, pose: 'side', pose2: 'wave', pk: ss(52.6, 53.0, t), expr: 'smile', mouthOpen: .8 + .2 * Math.sin(t * 12), blink: (lt % 2.4) - 1.0 });
  drawBrain(c, 850, 1250, .32, { t, mood: 'happy' });
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t > tp) { const k = t - tp, b = 1 + .08 * Math.sin(k * 9) * Math.exp(-k * 1.2); pumText(c, Math.min(t, tp + .5), tp, W / 2, 760, 1.2 * b, 99); sparks(c, t, tp, W / 2, 760, 20, 5, '255,220,120'); }
  const fo = clamp((t - (END - .7)) / .7); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});
