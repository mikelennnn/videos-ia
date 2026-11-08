// ---------- escenas: ¿por qué se te pone la piel chinita? ----------
END = 57.8;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
const wt = i => WORDS[i].s;

// calle nevada de noche
function street(c, t, lt) {
  sky(c, [[0, '#0a1430'], [.6, '#1d3566'], [.9, '#3a5a8a']], -300, 1250); stars(c, t, 40, 3, 700, .6);
  glow(c, 820, 330, 200, '220,230,255', .5); c.fillStyle = '#eef2ff'; c.beginPath(); c.arc(820, 330, 50, 0, TAU); c.fill();
  const bl = [[-120, 420, '#3a4f7a'], [140, 520, '#4a3f6e'], [420, 360, '#2e4a6a'], [660, 480, '#463a62'], [900, 400, '#34507a']];
  bl.forEach(([x, h, col], i) => { c.fillStyle = col; c.fillRect(x, 1250 - h, 250, h + 20); c.fillStyle = '#eef3fa'; rrect(c, x - 10, 1250 - h - 18, 270, 30, 12); c.fill();
    for (let r = 0; r < Math.floor(h / 110); r++) for (let k = 0; k < 3; k++) { const on = hash(i * 31 + r * 7 + k) > .35; c.fillStyle = on ? '#ffd27a' : '#1c2a44'; c.fillRect(x + 30 + k * 72, 1250 - h + 40 + r * 110, 44, 60); if (on) glow(c, x + 52 + k * 72, 1250 - h + 70 + r * 110, 60, '255,200,110', .25); } });
  // faroles
  [[150, 1330], [930, 1330]].forEach(([x, y]) => { c.fillStyle = '#1e2433'; c.fillRect(x - 8, y - 420, 16, 420); c.fillRect(x - 40, y - 430, 80, 16); glow(c, x, y - 400, 260, '255,214,140', .55); c.fillStyle = '#ffe2a0'; c.beginPath(); c.arc(x, y - 405, 22, 0, TAU); c.fill(); });
  c.fillStyle = vgrad(c, 1250, 2000, [[0, '#dfe8f5'], [1, '#aebfd8']]); c.fillRect(-300, 1250, W + 600, 900);
  c.fillStyle = 'rgba(140,160,200,.35)'; for (let i = 0; i < 14; i++) { c.beginPath(); c.ellipse(hash(i) * W, 1300 + hash(i * 2) * 600, 60 + hash(i * 3) * 90, 10, 0, 0, TAU); c.fill(); }
}

// 1. Gancho: Beto congelándose, su cuerpo "intenta" inflar el pelaje
scene(0, (c, t, lt) => {
  cam(c, lt, 5.4, [1.0, 540, 1150], [1.12, 540, 1120], false);
  street(c, t, lt);
  const fb = t > wt(13) - .05 ? (t < 5.0 ? eBack((t - wt(13) + .05) / .35) : 1 - eIn((t - 5.0) / .3)) : 0;
  if (fb > 0) { c.save(); c.globalAlpha = clamp(fb); const s = .75 + .25 * fb; c.translate(540, 1800); c.scale(s * .92, s * .88); c.drawImage(C.furball, -380, -1040); c.restore(); }
  if (fb > 0) { c.save(); c.globalAlpha = .5; puff(c, t, wt(13) - .05, 540, 1250, 1.0); c.restore(); }
  drawBeto(c, 540, 1800, 1.0, { t, pose: 'hug', expr: fb > .3 ? 'shock' : 'cold', cold: 1, shiver: fb > .3 ? .3 : 1, breath: 1, gb: ss(wt(4), wt(6), t), blink: (lt % 2.3) - 1.2 });
  c.save(); c.globalAlpha = .55; puff(c, t, 5.0, 540, 1250, 1.0); c.restore();
  snow(c, t, 70, 1, { size: 7, a: .8 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(3), 3.6, '-5', '°C');
});

// 2. Lupa: corte de la piel, el músculo levanta el vello
scene(5.4, (c, t, lt) => {
  c.translate(W / 2, H / 2); c.scale(1 + .07 * (1 - eOut(lt / .4)), 1 + .07 * (1 - eOut(lt / .4))); c.translate(-W / 2, -H / 2);
  const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1300); g.addColorStop(0, '#1b3b5e'); g.addColorStop(1, '#0a1626'); c.fillStyle = g; c.fillRect(-100, -100, W + 200, H + 200);
  c.strokeStyle = 'rgba(140,200,255,.07)'; c.lineWidth = 2; for (let x = 0; x < W; x += 60) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let y = 0; y < H; y += 60) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  const cx = 540, cy = 1150, R = 470, k = ss(wt(22), wt(22) + .6, t) * (1 + .04 * Math.sin(t * 8));
  // mango de la lupa
  c.save(); c.translate(cx, cy); c.rotate(.75); c.fillStyle = '#2a2d34'; rrect(c, R - 10, -40, 360, 80, 30); c.fill(); c.fillStyle = '#c8202a'; rrect(c, R + 90, -36, 250, 72, 28); c.fill(); c.restore();
  c.save(); c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.clip();
  const sy = 1030, P = [560, sy];
  const bumpY = x => sy - 46 * k * Math.exp(-Math.pow((x - 600) / 120, 2));
  // grasa
  c.fillStyle = '#f6d98a'; c.fillRect(0, 1450, W, 300); c.fillStyle = 'rgba(255,240,190,.7)'; for (let i = 0; i < 18; i++) { c.beginPath(); c.arc(80 + (i % 6) * 170 + (i > 5 ? 80 : 0), 1500 + Math.floor(i / 6) * 80, 50, 0, TAU); c.fill(); }
  // dermis
  c.fillStyle = vgrad(c, sy, 1460, [[0, '#f7c4b0'], [1, '#eaa592']]); c.beginPath(); c.moveTo(0, 1460); for (let x = 0; x <= W; x += 10) c.lineTo(x, bumpY(x)); c.lineTo(W, 1460); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(200,110,100,.25)'; c.lineWidth = 3; for (let i = 0; i < 16; i++) { c.beginPath(); const y0 = 1130 + i * 20; for (let x = 0; x <= W; x += 30) c.lineTo(x, y0 + Math.sin(x * .02 + i) * 8); c.stroke(); }
  // epidermis
  c.fillStyle = vgrad(c, sy - 40, sy + 70, [[0, '#f9d4b8'], [1, '#e9a88a']]); c.beginPath(); for (let x = 0; x <= W; x += 10) c.lineTo(x, bumpY(x)); for (let x = W; x >= 0; x -= 10) c.lineTo(x, bumpY(x) + 70); c.closePath(); c.fill();
  c.strokeStyle = '#b8705a'; c.lineWidth = 5; c.beginPath(); for (let x = 0; x <= W; x += 10) c.lineTo(x, bumpY(x)); c.stroke();
  // vello + folículo
  const th = lerp(.55, 1.32, k), bx = -Math.cos(th), by = Math.sin(th);
  const top = [P[0] - bx * 330, bumpY(P[0]) - by * 330 + 30], bulb = [P[0] + bx * 360, sy + by * 360];
  c.strokeStyle = '#d98a78'; c.lineWidth = 46; c.lineCap = 'round'; c.beginPath(); c.moveTo(P[0], bumpY(P[0]) + 20); c.lineTo(...bulb); c.stroke();
  c.fillStyle = '#c86a5a'; c.beginPath(); c.arc(bulb[0], bulb[1], 38, 0, TAU); c.fill();
  c.strokeStyle = '#3a2414'; c.lineWidth = 11; c.beginPath(); c.moveTo(...bulb); c.lineTo(...top); c.stroke();
  // músculo erector
  const F = [P[0] + bx * 220, sy + by * 220], Aa = [P[0] + 250, sy + 70];
  c.strokeStyle = '#e8344a'; c.lineWidth = lerp(26, 40, k); c.beginPath(); c.moveTo(...F); c.quadraticCurveTo((F[0] + Aa[0]) / 2, (F[1] + Aa[1]) / 2 + lerp(40, 5, k), ...Aa); c.stroke();
  c.strokeStyle = 'rgba(255,190,200,.6)'; c.lineWidth = 4; for (let j = -1; j <= 1; j++) { c.beginPath(); c.moveTo(F[0], F[1] + j * 8); c.quadraticCurveTo((F[0] + Aa[0]) / 2, (F[1] + Aa[1]) / 2 + lerp(40, 5, k) + j * 8, Aa[0], Aa[1] + j * 8); c.stroke(); }
  if (k > .1) glow(c, (F[0] + Aa[0]) / 2, (F[1] + Aa[1]) / 2, 120, '255,80,110', .4 * k);
  // otros vellos al fondo
  for (let i = 0; i < 4; i++) { const x = 140 + i * 260 + (i > 1 ? 160 : 0); if (Math.abs(x - 560) < 150) continue; const a = lerp(.6, 1.3, k * .9); c.strokeStyle = 'rgba(58,36,20,.7)'; c.lineWidth = 7; c.beginPath(); c.moveTo(x, bumpY(x) + 120); c.lineTo(x - Math.cos(a) * 200, bumpY(x) - Math.sin(a) * 180); c.stroke(); }
  c.fillStyle = vgrad(c, 0, sy, [[0, 'rgba(140,190,255,.15)'], [1, 'rgba(140,190,255,.05)']]); c.fillRect(0, 0, W, sy - 50);
  c.restore();
  c.strokeStyle = '#d6dbe2'; c.lineWidth = 26; c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.stroke(); c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 6; c.beginPath(); c.arc(cx, cy, R - 10, Math.PI * 1.1, Math.PI * 1.5); c.stroke();
  // etiquetas
  const lab = (txt, x, y, t0, col) => { if (t < t0) return; const a = eBack((t - t0) / .4); c.save(); c.translate(x, y); c.scale(a, a); c.font = '800 44px Nunito'; const w = c.measureText(txt).width + 50; rrect(c, -w / 2, -33, w, 66, 33); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = col; c.lineWidth = 3; c.stroke(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 2); c.restore(); };
  lab('vello', 330, 760, wt(26), '#ffd166'); lab('músculo erector', 700, 1480, wt(22), '#ff5a72');
  c.setTransform(1, 0, 0, 1, 0, 0);
});

// 3. Ola de vellitos en el brazo: 5 millones
scene(9.7, (c, t, lt) => {
  cam(c, lt, 4.9, [1.0, 540, 1050], [1.08, 600, 1050]);
  const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1300); g.addColorStop(0, '#2a3f6a'); g.addColorStop(1, '#0c1630'); c.fillStyle = g; c.fillRect(-300, -300, W + 600, H + 600);
  bokeh(c, t, 14, 5, .3);
  // brazo grande
  const y0 = 900, y1 = 1420;
  c.save(); c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 40; c.shadowOffsetY = 20;
  c.fillStyle = vgrad(c, y0, y1, [[0, '#f9d4b0'], [.5, '#efbb8c'], [1, '#d99a6c']]); c.beginPath(); c.moveTo(-300, y0 - 30); c.quadraticCurveTo(500, y0 - 10, 900, y0 + 30); c.lineTo(900, y1 - 20); c.quadraticCurveTo(500, y1 + 10, -300, y1 + 30); c.closePath(); c.fill(); c.restore();
  // mano
  c.fillStyle = '#efbb8c'; c.beginPath(); c.ellipse(1000, 1150, 190, 250, 0, 0, TAU); c.fill(); c.strokeStyle = SKIN.line; c.lineWidth = 5; c.stroke();
  c.strokeStyle = '#d99a6c'; c.lineWidth = 50; c.lineCap = 'round'; [[1040, 950, 1180, 880], [1080, 1080, 1250, 1060], [1080, 1220, 1240, 1250]].forEach(([a, b, e, f]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(e, f); c.stroke(); });
  c.fillStyle = 'rgba(255,255,255,.25)'; c.beginPath(); c.ellipse(400, y0 + 90, 600, 40, 0, 0, TAU); c.fill();
  // vellitos
  const xw = lerp(-200, 1100, clamp((t - wt(31)) / 1.4));
  for (let i = 0; i < 420; i++) { const x = -250 + hash(i) * 1120, y = y0 + 40 + hash(i * 2.3) * (y1 - y0 - 80); const k = clamp((xw - x) / 160);
    if (k > 0) { c.fillStyle = `rgba(170,100,70,${.4 * k})`; c.beginPath(); c.arc(x + 2, y + 4, 9 * k, 0, TAU); c.fill(); c.fillStyle = `rgba(255,230,210,${.9 * k})`; c.beginPath(); c.arc(x, y, 8 * k, 0, TAU); c.fill(); }
    const a = lerp(-.25, -1.35, k) + (hash(i * 5) - .5) * .3, L = 26 + hash(i * 7) * 16; c.strokeStyle = 'rgba(70,45,25,.75)'; c.lineWidth = 2.6; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); c.stroke(); }
  if (t > wt(31)) sparks(c, t, wt(31) + .9, 600, 1150, 12, 3, '255,240,200');
  // "cada uno con su propio músculo": mini músculos rojos
  if (t > wt(39)) { const a = clamp((t - wt(39)) / .4); for (let i = 0; i < 9; i++) { const x = 60 + i * 95, y = 1500 + (i % 2) * 70; c.save(); c.globalAlpha = a; c.translate(x, y); c.scale(a, a);
    c.strokeStyle = '#3a2414'; c.lineWidth = 6; c.beginPath(); c.moveTo(0, 40); c.lineTo(Math.cos(-1.2) * 60, 40 + Math.sin(-1.2) * 60); c.stroke(); c.strokeStyle = '#e8344a'; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(8, 20); c.lineTo(36, 46); c.stroke(); c.restore(); } }
  snow(c, t, 30, 7, { size: 6, a: .4 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(31), 14.5, '5', 'millones');
});

// patio nevado (escenas del gato)
function yard(c, t) {
  sky(c, [[0, '#0b1636'], [.6, '#22396e'], [.9, '#46629a']], -300, 1250); stars(c, t, 50, 9, 800, .7);
  glow(c, 260, 360, 220, '220,230,255', .5); c.fillStyle = '#eef2ff'; c.beginPath(); c.arc(260, 360, 56, 0, TAU); c.fill(); c.fillStyle = 'rgba(160,170,190,.3)'; c.beginPath(); c.arc(240, 345, 12, 0, TAU); c.arc(285, 380, 8, 0, TAU); c.fill();
  hills(c, 1150, 30, '#2a3f6e', 2); c.fillStyle = '#dfe8f5'; c.beginPath(); c.moveTo(-300, 1250); for (let x = -300; x <= W + 300; x += 20) c.lineTo(x, 1230 + Math.sin(x * .01) * 14); c.lineTo(W + 300, 2200); c.lineTo(-300, 2200); c.fill();
  fence(c, 1300, .9, '#4a3a4a'); c.fillStyle = '#eef3fa'; c.fillRect(-300, 1176, W + 600, 10); for (let x = -200; x < W + 200; x += 117) { c.beginPath(); c.ellipse(x + 9, 1190, 16, 8, 0, 0, TAU); c.fill(); }
  c.fillStyle = vgrad(c, 1300, 2000, [[0, '#e8eff8'], [1, '#b8c8e0']]); c.fillRect(-300, 1310, W + 600, 900);
}
// 4. El gato: el pelo levantado atrapa aire caliente
scene(14.6, (c, t, lt) => {
  cam(c, lt, 5.9, [1.0, 540, 1150], [1.12, 540, 1200]);
  yard(c, t);
  const fl = t > wt(47) ? 'fluffy' : 'normal';
  if (t > wt(47) && t < wt(47) + .5) puff(c, t, wt(47), 540, 1450, .7);
  drawCat(c, 520, 1700, 1.2, { t, kind: fl, blink: (lt % 2.6) - 1.3, walk: t < wt(45) ? lt * 6 : null });
  // burbujas de aire caliente
  if (t > wt(49)) { const a = clamp((t - wt(49)) / .5); c.save(); c.globalCompositeOperation = 'lighter'; for (let i = 0; i < 22; i++) { const x = 330 + hash(i) * 400, y = 1400 + hash(i * 2) * 170 + Math.sin(t * 3 + i) * 8, s = 22 + hash(i * 3) * 26; c.globalAlpha = a * (.5 + .4 * Math.sin(t * 4 + i)); c.drawImage(C.dots[4], x - s, y - s, s * 2, s * 2); } c.restore();
    c.save(); c.globalAlpha = .6 * a; c.strokeStyle = 'rgba(255,190,120,.8)'; c.lineWidth = 4; for (let k = 0; k < 3; k++) { c.beginPath(); for (let y = 1350; y > 1100; y -= 10) c.lineTo(420 + k * 90 + Math.sin(y * .05 + t * 6) * 10, y); c.stroke(); } c.restore(); }
  snow(c, t, 60, 4, { size: 7, a: .8 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  iconPill(c, t, wt(53) - .1, 20.5, W / 2, 650, 105, (c, lt) => { // chamarra
    c.fillStyle = '#4cc9f0'; c.beginPath(); c.moveTo(-60, -50); c.lineTo(-20, -60); c.lineTo(0, -40); c.lineTo(20, -60); c.lineTo(60, -50); c.lineTo(80, 10); c.lineTo(55, 15); c.lineTo(50, 60); c.lineTo(-50, 60); c.lineTo(-55, 15); c.lineTo(-80, 10); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(0,60,90,.6)'; c.lineWidth = 3; for (let y = -30; y < 60; y += 18) { c.beginPath(); c.moveTo(-50, y); c.lineTo(50, y); c.stroke(); } c.beginPath(); c.moveTo(0, -40); c.lineTo(0, 60); c.stroke(); });
});
// 5. El pepino: el gato se esponja al doble
scene(20.5, (c, t, lt) => {
  const ts = wt(57) + .35; shake(c, t, ts, 26, .4); shake(c, t, wt(66), 16, .3);
  cam(c, lt, 6.3, [1.06, 540, 1250], [1.0, 540, 1200]);
  yard(c, t);
  const cx = t < wt(56) ? 1300 : lerp(1300, 820, eOut((t - wt(56)) / .5));
  c.save(); c.translate(cx, 1700); c.rotate(-.05); c.drawImage(C.cuke, -280, -120, 560, 200); c.restore();
  const scared = t > ts; const jump = scared ? Math.max(0, Math.sin(clamp((t - ts) / .45) * Math.PI)) * 260 : 0;
  const s = scared ? lerp(1.0, 1.3, eBack((t - ts) / .4)) : 1.0;
  if (scared) puff(c, t, ts, 400, 1450 - jump, .8);
  drawCat(c, 400, 1700 - jump, s, { t, kind: scared ? 'scared' : 'normal', blink: scared ? null : (lt % 2.2) - 1.1, headRot: scared ? 0 : -.1 });
  if (scared) { const k = clamp((t - ts) / .3); c.save(); c.globalAlpha = k * (1 - clamp((t - ts - 1.2) / .4)); c.font = '900 120px Nunito'; c.textAlign = 'center'; c.lineWidth = 14; c.strokeStyle = '#1d2a44'; c.strokeText('!!', 610, 1060 - jump); c.fillStyle = '#ffd166'; c.fillText('!!', 610, 1060 - jump); c.restore(); }
  snow(c, t, 50, 6, { size: 7, a: .7 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(60), 26.7, 'x2', 'más grande');
});

// 6. El ancestro peludo pierde el pelo y se convierte en Beto
scene(26.8, (c, t, lt) => {
  const tp = wt(75);
  cam(c, lt, 7.3, [1.05, 520, 1150], [1.1, 540, 1150]);
  sky(c, [[0, '#3a1d4a'], [.45, '#c4566a'], [.75, '#f6a05a'], [.9, '#ffd28a']], -300, 1250);
  glow(c, 540, 1080, 600, '255,190,110', .7); c.fillStyle = '#ffe2a0'; c.beginPath(); c.arc(540, 1080, 170, 0, TAU); c.fill();
  hills(c, 1180, 26, '#7a3a4a', 3);
  // acacias
  [[150, 1200, .9], [900, 1180, .7]].forEach(([x, y, s]) => { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = '#2a1424'; c.lineWidth = 22; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -240); c.moveTo(0, -150); c.lineTo(-90, -270); c.moveTo(0, -170); c.lineTo(80, -280); c.stroke();
    c.fillStyle = '#2a1424'; c.beginPath(); c.ellipse(0, -300, 230, 50, 0, 0, TAU); c.fill(); c.restore(); });
  grassLayer(c, A.grassSun, 1220);
  const before = t < tp;
  if (before) { const x = lerp(160, 520, clamp(lt / (tp - 26.8))); drawApe(c, x, 1780, 1.0, { walk: lt * 5.5 }); }
  else { drawBeto(c, 540, 1780, 1.0, { t, pose: 'side', pose2: 'look', pk: ss(wt(80), wt(81), t), expr: t > wt(81) ? 'shock' : 'smile', mouthOpen: .4, look: t > wt(80) ? [.6, .6] : [0, 0], gb: ss(wt(81), wt(83), t), blink: (lt % 2.5) - 1.2 }); }
  // pelos cayendo
  const ft = t - tp; if (ft > -.4 && ft < 2.2) for (let i = 0; i < 60; i++) { const st = (hash(i) - .5) * .5, lt2 = ft - st; if (lt2 < 0) continue; const x = 380 + hash(i * 2) * 320 + Math.sin(lt2 * 4 + i) * 30, y = 1100 + hash(i * 3) * 600 + lt2 * 380;
    c.save(); c.globalAlpha = 1 - clamp((lt2 - 1.3) / .6); c.translate(x, y); c.rotate(lt2 * 3 + i); c.strokeStyle = i % 2 ? '#5a3a24' : '#7a5232'; c.lineWidth = 4; c.lineCap = 'round'; c.beginPath(); c.moveTo(-14, 0); c.quadraticCurveTo(0, 8, 14, 0); c.stroke(); c.restore(); }
  puff(c, t, tp - .1, 520, 1350, 1.3);
  motes(c, t, { n: 24, seed: 6, size: 12, a: .45 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  iconPill(c, t, wt(71), tp - .2, W / 2, 650, 100, (c, lt) => { c.font = '900 64px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#ffd57e'; c.fillText('?', 0, 4); });
});

// 7. "Y no te calienta nada": 0 % calor
scene(34.1, (c, t, lt) => {
  cam(c, lt, 4.8, [1.0, 540, 1150], [1.18, 540, 1050]);
  street(c, t, lt);
  const deadpan = t > wt(97);
  drawBeto(c, 540, 1830, 1.05, { t, pose: deadpan ? 'shrug' : 'hug', expr: deadpan ? 'flat' : 'cold', cold: 1, shiver: deadpan ? .2 : 1, breath: 1, gb: 1 });
  // termómetro
  c.save(); c.translate(900, 1250); c.fillStyle = '#eef2f8'; rrect(c, -26, -260, 52, 330, 26); c.fill(); c.strokeStyle = '#8a98b0'; c.lineWidth = 4; c.stroke();
  const lev = lerp(140, 30, ss(wt(95), wt(97), t)); c.fillStyle = '#4cc9f0'; c.fillRect(-10, 50 - lev, 20, lev); c.beginPath(); c.arc(0, 60, 36, 0, TAU); c.fill(); c.restore();
  snow(c, t, 70, 8, { size: 7, a: .8 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(96), 38.8, '0 %', 'calor');
});

// 8. La canción que te emociona: adrenalina
scene(38.9, (c, t, lt) => {
  cam(c, lt, 5.2, [1.0, 540, 1150], [1.12, 540, 1060]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#1a0a2e'], [.6, '#3a1458'], [1, '#5a1a5a']]); c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalCompositeOperation = 'lighter'; [[-50, '255,80,170'], [1130, '80,200,255']].forEach(([x, col], i) => { const g = c.createRadialGradient(x, 900, 0, x, 900, 900); g.addColorStop(0, `rgba(${col},.45)`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(-400, -400, W + 800, H + 800); }); c.restore();
  c.strokeStyle = '#ff4fa3'; c.lineWidth = 10; c.shadowColor = '#ff4fa3'; c.shadowBlur = 30; c.beginPath(); c.moveTo(-300, 520); c.lineTo(W + 300, 520); c.stroke(); c.shadowBlur = 0;
  bokeh(c, t, 18, 13, .5);
  // ondas de música
  c.save(); c.globalCompositeOperation = 'lighter'; for (let k = 0; k < 5; k++) { const ph = (lt * .6 + k / 5) % 1; c.strokeStyle = `rgba(255,150,230,${(1 - ph) * .3})`; c.lineWidth = 6; c.beginPath(); c.arc(540, 1050, 160 + ph * 650, 0, TAU); c.stroke(); } c.restore();
  const chill = ss(wt(106), wt(106) + 1.2, t);
  drawBeto(c, 540, 1880, 1.0, { t, pose: 'phones', expr: 'bliss', headphones: true, gb: chill, headTilt: Math.sin(t * 3.2) * .06 });
  // escalofrío que sube por los brazos
  if (t > wt(106)) { const ph = ((t - wt(106)) * 1.2) % 1; c.save(); c.globalCompositeOperation = 'lighter'; [-1, 1].forEach(sd => { const y = lerp(1560, 1100, ph), x = 540 + sd * lerp(200, 130, ph); c.globalAlpha = .8 * (1 - ph); c.drawImage(A.dotWarm, x - 70, y - 70, 140, 140); }); c.restore();
    sparks(c, t, wt(106), 540, 1050, 16, 9, '255,220,255'); }
  for (let i = 0; i < 9; i++) { const ft = ((lt * .5 + i / 9) % 1), sd = i % 2 ? 1 : -1; musicNote(c, 540 + sd * (330 + ft * 120), 1300 - ft * 700, .8, `rgba(255,220,250,${Math.sin(ft * Math.PI) * .9})`); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  iconPill(c, t, wt(111), 43.8, W / 2, 650, 100, (c, lt) => { const b = 1 + Math.sin(lt * 14) * .06; c.scale(b, b); c.fillStyle = '#ffd166'; c.beginPath(); c.moveTo(12, -62); c.lineTo(-34, 8); c.lineTo(-2, 8); c.lineTo(-14, 62); c.lineTo(36, -10); c.lineTo(4, -10); c.closePath(); c.fill(); });
  if (t > wt(111)) { const a = eBack((t - wt(111) - .1) / .4); c.save(); c.globalAlpha = clamp(a); c.translate(W / 2, 790); c.scale(a, a); c.font = '900 52px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 10; c.strokeStyle = '#1a0a2e'; c.strokeText('ADRENALINA', 0, 0); c.fillStyle = '#ffd166'; c.fillText('ADRENALINA', 0, 0); c.restore(); }
});

// 9. El giro: Harvard 2020, ratones con pelo que crece
scene(43.9, (c, t, lt) => {
  cam(c, lt, 9.3, [1.0, 540, 1100], [1.12, 540, 1180]);
  c.fillStyle = vgrad(c, -300, 1500, [[0, '#dfeaf2'], [1, '#bcd2e2']]); c.fillRect(-400, -400, W + 800, H + 800);
  for (let x = -300; x < W + 300; x += 180) { c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(x, -300, 6, 1800); }
  // repisa con frascos
  c.fillStyle = '#8a9aaa'; c.fillRect(-100, 560, W + 200, 18);
  [['#4cd97b', 80], ['#ff4fa3', 210], ['#4cc9f0', 760], ['#ffd166', 900]].forEach(([col, x], i) => { c.fillStyle = 'rgba(255,255,255,.6)'; rrect(c, x - 40, 420, 80, 140, 16); c.fill(); c.fillStyle = col; rrect(c, x - 34, 480 + Math.sin(t * 2 + i) * 4, 68, 74, 12); c.fill(); c.strokeStyle = 'rgba(80,100,120,.5)'; c.lineWidth = 3; rrect(c, x - 40, 420, 80, 140, 16); c.stroke(); });
  // mesa
  c.fillStyle = vgrad(c, 1560, 2000, [[0, '#9aa8b8'], [1, '#6a7888']]); c.fillRect(-300, 1560, W + 600, 700); c.fillStyle = '#c8d4e0'; c.fillRect(-300, 1550, W + 600, 24);
  // microscopio
  c.save(); c.translate(900, 1550); c.fillStyle = '#2a2d34'; rrect(c, -90, -30, 180, 30, 10); c.fill(); c.fillRect(-14, -330, 28, 300); c.save(); c.rotate(-.35); c.fillStyle = '#e8ecf2'; rrect(c, -30, -420, 60, 200, 20); c.fill(); c.restore(); c.fillStyle = '#4cc9f0'; c.fillRect(-60, -160, 120, 14); c.restore();
  // cámara de frío
  const bx = 120, by = 900, bw = 640, bh = 660;
  c.save(); c.fillStyle = 'rgba(170,215,255,.35)'; rrect(c, bx, by, bw, bh, 30); c.fill(); c.restore();
  glow(c, bx + bw / 2, by + 120, 300, '140,200,255', .5);
  const fs = ss(wt(127), wt(132) + .6, t); const mi = fs < .5 ? 0 : 1, mk2 = fs < .5 ? fs * 2 : (fs - .5) * 2;
  c.save(); c.translate(bx + bw / 2 - 20, by + bh - 40 + Math.sin(t * 5) * 2); c.scale(1.05, 1.05); c.drawImage(C.mouse[mi], -330, -320); c.globalAlpha = mk2; c.drawImage(C.mouse[mi + 1], -330, -320); c.restore();
  c.save(); rrect(c, bx, by, bw, bh, 30); c.clip(); snow(c, t, 0, 1); for (let i = 0; i < 26; i++) { const x = bx + hash(i) * bw, y = by + ((hash(i * 2) * bh + t * 90) % bh); c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.arc(x, y, 3 + hash(i * 3) * 3, 0, TAU); c.fill(); } c.restore();
  c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 10; rrect(c, bx, by, bw, bh, 30); c.stroke(); c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.moveTo(bx + 40, by + 40); c.lineTo(bx + 160, by + 40); c.lineTo(bx + 40, by + 300); c.fill();
  c.fillStyle = 'rgba(255,255,255,.95)'; for (let i = 0; i < 12; i++) { c.beginPath(); c.ellipse(bx + 30 + i * 52, by + 10, 30, 14, 0, 0, TAU); c.fill(); }
  // copo de nieve en la puerta
  c.save(); c.translate(bx + bw - 80, by + 80); c.strokeStyle = '#4cc9f0'; c.lineWidth = 7; c.lineCap = 'round'; for (let k = 0; k < 6; k++) { c.rotate(TAU / 6); c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 40); c.moveTo(0, 24); c.lineTo(10, 34); c.moveTo(0, 24); c.lineTo(-10, 34); c.stroke(); } c.restore();
  // flechas de crecimiento
  if (fs > .05) for (let k = 0; k < 3; k++) { const ph = (lt * .8 + k / 3) % 1; c.save(); c.globalAlpha = Math.sin(ph * Math.PI) * fs; c.translate(bx + 180 + k * 150, by + 450 - ph * 120); c.fillStyle = '#4cd97b'; c.beginPath(); c.moveTo(0, -30); c.lineTo(24, 0); c.lineTo(8, 0); c.lineTo(8, 30); c.lineTo(-8, 30); c.lineTo(-8, 0); c.lineTo(-24, 0); c.fill(); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(117), wt(122) - .1, '2020', '');
  if (t > wt(122)) { const a = eBack((t - wt(122)) / .4), out = 1 - clamp((t - 53.0) / .3); c.save(); c.globalAlpha = clamp(a) * out; c.translate(W / 2, 650); c.scale(a, a); c.font = '900 64px Nunito'; const w = c.measureText('HARVARD').width + 90; rrect(c, -w / 2, -60, w, 120, 30); c.fillStyle = 'rgba(14,13,18,.85)'; c.fill(); c.fillStyle = '#ffd57e'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('HARVARD', 0, 4); c.restore(); }
});

// 10. Cierre: Beto pregunta
scene(53.2, (c, t, lt) => {
  cam(c, lt, 4.6, [1.08, 540, 1100], [1.0, 540, 1100]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#1d2a5a'], [.6, '#5a2a7a'], [1, '#c04a7a']]); c.fillRect(-400, -400, W + 800, H + 800);
  bokeh(c, t, 24, 23, .55);
  for (let i = 0; i < 10; i++) { const ft = ((lt * .45 + i / 10) % 1); musicNote(c, 100 + hash(i) * 880, 1500 - ft * 900, .8, `rgba(255,230,250,${Math.sin(ft * Math.PI) * .7})`); }
  drawBeto(c, 540, 1800, 1.2, { t, pose: 'side', pose2: 'wave', pk: ss(53.4, 53.8, t), expr: 'smile', headphones: true, gb: .8, blink: (lt % 2.4) - 1.0, look: [0, .1] });
  c.setTransform(1, 0, 0, 1, 0, 0);
  const fo = clamp((t - (END - .7)) / .7); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});
