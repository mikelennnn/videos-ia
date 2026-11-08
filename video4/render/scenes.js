// ---------- escenas: ¿por qué los gatos tiran cosas de la mesa? ----------
END = 50.6;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
const wt = i => WORDS[i].s;
const tap = (t, t0, t1, n) => { if (t < t0 || t > t1) return 0; const p = (t - t0) / (t1 - t0) * n; return Math.sin((p % 1) * Math.PI) ** 2; };

// 1. Gancho: el vaso que avanza hacia la orilla
scene(0, (c, t, lt) => {
  cam(c, lt, 4.5, [1.0, 540, 1100], [1.14, 600, 1120], false);
  room(c, t);
  table(c, -200, 960, 1380);
  const steps = clamp((t - .7) / 2.8), gx = lerp(700, 930, Math.floor(steps * 5) / 5 + eOut((steps * 5) % 1) / 5);
  const ft = t - 3.55; const gr = ft > 0 ? Math.min(1.6, ft * 6) : 0, gy = ft > .25 ? 1330 + (ft - .25) ** 2 * 3000 : 1330;
  drawGlass(c, ft > 0 ? gx + ft * 120 : gx, gy, .9, gr);
  drawCat(c, Math.min(gx, 930) - 330, 1350, .95, { t, kind: 'normal', reach: t < 3.5 ? tap(t, .7, 3.5, 5) * .8 : 0, look: [0, .3], wide: t < wt(10), eyes: t > wt(10) ? 'smug' : null, blink: t < 1 ? (lt - .5) : null });
  motes(c, t, { n: 18, seed: 3, size: 10, a: .4 });
  c.setTransform(1, 0, 0, 1, 0, 0);
});

// 2a. La pluma: toquecitos para ver si "está viva"
scene(4.5, (c, t, lt) => {
  cam(c, lt, 2.6, [1.25, 560, 1150], [1.35, 600, 1170]);
  room(c, t); table(c, -200, 1200, 1380);
  const tp = tap(t, 5.0, 7.0, 4), jig = Math.sin(t * 30) * tp * .15;
  drawPen(c, 780 + tp * 20, 1335, jig);
  drawCat(c, 440, 1350, .95, { t, kind: 'normal', crouch: .6, reach: tp * .75, look: [.6, .4], wide: true });
  c.setTransform(1, 0, 0, 1, 0, 0);
});

// 2b. En el pasto: la presa
scene(7.05, (c, t, lt) => {
  cam(c, lt, 4.4, [1.0, 540, 1250], [1.12, 600, 1300]);
  sky(c, [[0, '#4a90d8'], [.6, '#9fd0f0'], [.85, '#e2f2f8']], -300, 1200);
  glow(c, 820, 500, 240, '255,240,190', .8); A.cloud.forEach((cl, i) => c.drawImage(cl, ((i * 470 + lt * 14) % 1500) - 300, 420 + i * 140, 420, 194));
  hills(c, 1150, 26, '#6f9e78', 4); grassLayer(c, A.grassDay, 1180);
  const hit = wt(25), run = wt(30) - .1;
  const mx = t < run ? 780 : 780 + (t - run) * 1400, my = 1660 - (t > hit && t < hit + .35 ? Math.sin((t - hit) / .35 * Math.PI) * 90 : 0);
  if (t > run) { c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 6; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(mx - 260 - k * 40, my - 60 + k * 22); c.lineTo(mx - 120 - k * 40, my - 60 + k * 22); c.stroke(); } }
  c.save(); c.translate(mx, my); c.scale(.8, .8 * (t > hit && t < hit + .15 ? .85 : 1)); c.drawImage(C.mouse[0], -330, -320); c.restore();
  const reach = t < hit ? ss(hit - .5, hit, t) * .8 : (t < hit + .3 ? .8 : .8 * (1 - ss(hit + .3, hit + .8, t)));
  drawCat(c, 380, 1700, 1.0, { t, kind: t > run ? 'fluffy' : 'normal', crouch: t < run ? .7 : 0, reach, look: [1, .3], wide: true });
  if (t > hit) sparks(c, t, hit, 680, 1600, 10, 4, '255,255,255');
  motes(c, t, { n: 16, seed: 5, size: 9, a: .3 });
});

// 3. La pata: terminaciones nerviosas
scene(11.4, (c, t, lt) => {
  c.translate(W / 2, H / 2); const z = 1 + .07 * (1 - eOut(lt / .4)); c.scale(z, z); c.translate(-W / 2, -H / 2);
  const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1300); g.addColorStop(0, '#1b3b5e'); g.addColorStop(1, '#0a1626'); c.fillStyle = g; c.fillRect(-100, -100, W + 200, H + 200);
  c.strokeStyle = 'rgba(140,200,255,.07)'; c.lineWidth = 2; for (let x = 0; x < W; x += 60) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let y = 0; y < H; y += 60) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  const split = ss(wt(42), wt(44), t), px = lerp(540, 330, split), ps = lerp(.9, .62, split), py = 1900;
  c.save(); c.translate(px, py); c.scale(ps, ps); c.rotate(Math.sin(t * 1.5) * .02); c.drawImage(D.paw, -450, -1100);
  const nk = clamp((t - wt(36)) / 1.2);
  if (nk > 0) { c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = 'rgba(255,220,120,.9)'; c.lineWidth = 7; c.lineCap = 'round'; c.shadowColor = '#ffb84a'; c.shadowBlur = 20;
    D.pawBeans.forEach(([bx, by], i) => { c.beginPath(); const pts = bez([0, -60], [(bx) * .4 + (hash(i) - .5) * 120, -500], [bx, by], 20); const n = Math.floor(pts.length * nk); for (let k = 0; k < n; k++) c.lineTo(pts[k][0], pts[k][1]); c.stroke();
      if (nk > .95) { c.globalAlpha = .6 + .4 * Math.sin(t * 6 + i); c.drawImage(A.dotWarm, bx - 90, by - 90, 180, 180); c.globalAlpha = 1; } });
    c.restore(); }
  c.restore();
  // mano humana para comparar
  if (split > 0) { c.save(); c.globalAlpha = split; c.translate(lerp(1200, 790, split), 1450); c.scale(.95, .95);
    c.fillStyle = SKIN.line; c.beginPath(); c.ellipse(0, 0, 150, 175, 0, 0, TAU); c.fill(); c.fillStyle = '#efbb8c'; c.beginPath(); c.ellipse(0, 0, 144, 169, 0, 0, TAU); c.fill();
    [[-110, -150, -.35], [-48, -210, -.1], [18, -220, .05], [82, -195, .2], [150, -20, 1.0]].forEach(([fx, fy, a], i) => { c.save(); c.translate(fx, fy); c.rotate(a); c.fillStyle = SKIN.line; rrect(c, -34, -150 + (i === 4 ? 70 : 0), 68, 190 - (i === 4 ? 70 : 0), 34); c.fill(); c.fillStyle = '#efbb8c'; rrect(c, -30, -146 + (i === 4 ? 70 : 0), 60, 182 - (i === 4 ? 70 : 0), 30); c.fill(); c.restore(); });
    c.fillRect(-90, 120, 180, 300);
    c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = 'rgba(255,220,120,.85)'; c.lineWidth = 6; c.shadowColor = '#ffb84a'; c.shadowBlur = 18; [[-130, -280], [-55, -370], [25, -380], [100, -330], [230, -90]].forEach(([ex, ey]) => { c.beginPath(); c.moveTo(0, 300); c.quadraticCurveTo(ex * .4, 0, ex, ey); c.stroke(); }); c.restore();
    c.restore(); }
  const lab = (txt, x, y, t0, col) => { if (t < t0) return; const a = eBack((t - t0) / .4); c.save(); c.translate(x, y); c.scale(a, a); c.font = '800 44px Nunito'; const w = c.measureText(txt).width + 50; rrect(c, -w / 2, -33, w, 66, 33); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = col; c.lineWidth = 3; c.stroke(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 2); c.restore(); };
  lab('nervios', lerp(540, 330, split), 620, wt(36), '#ffd166');
  motes(c, t, { n: 24, seed: 11, size: 10, a: .35, spr: A.dotBlue });
});

// 4. Hace 9,500 años: el instinto sigue
scene(17.7, (c, t, lt) => {
  cam(c, lt, 6, [1.0, 540, 1150], [1.1, 500, 1200]);
  stoneHouse(c, t);
  for (let i = 0; i < 9; i++) { const x = hash(i) * W, y = 1520 + hash(i * 2) * 380; c.fillStyle = vgrad(c, y - 60, y + 30, [[0, '#9a8a7a'], [1, '#5a4a3a']]); c.beginPath(); c.ellipse(x, y, 50 + hash(i * 3) * 70, 30 + hash(i * 4) * 30, 0, 0, TAU); c.fill(); }
  c.lineCap = 'round'; for (let i = 0; i < 40; i++) { const x = hash(i * 5) * W, y = 1500 + hash(i * 6) * 450, h = 40 + hash(i * 7) * 80; c.strokeStyle = i % 2 ? '#a8904a' : '#7a6a30'; c.lineWidth = 5; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + k * 8, y - h * .6, x + k * 18 + Math.sin(t * 2 + i) * 4, y - h); c.stroke(); } }
  const tp = t > wt(60) ? tap(t, wt(60), wt(63) + .3, 3) : 0, wob = Math.sin(t * 14) * .08 * clamp((t - wt(61)) / .2) * (1 - clamp((t - 23.4) / .3));
  drawPot(c, 650, 1330, wob);
  drawCat(c, 330, 1340, .7, { t, kind: 'normal', reach: tp * .8, look: [.6, .2], blink: (lt % 2.8) - 1.4, crouch: .2 });
  motes(c, t, { n: 26, seed: 8, size: 12, a: .45 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(55), 23.6, '9,500', 'años');
});

// 5. Te está llamando: la taza
scene(23.75, (c, t, lt) => {
  const tf = wt(72), tc = tf + .55, tr = wt(75) + .1;
  shake(c, t, tc, 22, .35); cam(c, lt, 6.7, [1.0, 540, 1180], [1.06, 600, 1180]);
  room(c, t);
  table(c, 600, 1300, 1330, 60, false);
  const mf = t - tf, mx = 960 + (mf > 0 ? Math.min(mf, .55) * 160 : 0), my = mf > .12 ? 1290 + (mf - .12) ** 2 * 2600 : 1290;
  if (t < tc) drawMug(c, mx, Math.min(my, 1840), .8, mf > 0 ? Math.min(1.7, mf * 5) : 0, t, mf < 0);
  else { c.fillStyle = 'rgba(90,50,20,.55)'; c.beginPath(); c.ellipse(1080, 1850, 150 * eOut((t - tc) / .4), 26, 0, 0, TAU); c.fill(); [[-60, -.4], [10, .3], [70, 1.2]].forEach(([dx, r], i) => { c.save(); c.translate(1060 + dx, 1840); c.rotate(r); c.fillStyle = '#d94a5a'; c.beginPath(); c.moveTo(-30, 0); c.lineTo(30, -10); c.lineTo(20, 20); c.fill(); c.restore(); }); }
  shards(c, t, tc, 1060, 1820, '#e85a6a', 14, 3);
  const smug = t > wt(80);
  drawCat(c, 640, 1310, .85, { t, kind: 'normal', reach: tf - .4 < t && t < tf + .3 ? ss(tf - .4, tf, t) * .8 : 0, look: t > tc ? [-.8, .2] : [.5, .3], eyes: smug ? 'smug' : null, blink: smug ? null : (lt % 2.5) - 1.2 });
  // Beto: del celular a correr
  const running = t > tr, bx = running ? lerp(260, 470, eInOut((t - tr) / 1.0)) : 260, ph = Math.floor(t * 8) % 2;
  drawBeto(c, bx, 1880 - (running && t < tr + 1 ? Math.abs(Math.sin(t * 16)) * 20 : 0), .85, { t, pose: running && t < tr + 1 ? (ph ? 'runA' : 'runB') : (t > tr + 1 ? 'arms' : 'phone'), expr: t > tc - .1 ? (t > tr + 1.2 ? 'worry' : 'shock') : 'smile', mouthOpen: .4, look: t < tc ? [0, .8] : [1, 0], headTilt: t < tc ? .1 : 0,
    prop: (c, P) => { if (!(running && t < tr + 1) && t < tr + .1) { drawPhone(c, 0, -505, 0, .55, t); } } });
  if (running && t < tr + 1) { c.strokeStyle = 'rgba(80,50,30,.4)'; c.lineWidth = 8; c.lineCap = 'round'; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(bx - 200 - k * 30, 1500 + k * 70); c.lineTo(bx - 120 - k * 30, 1500 + k * 70); c.stroke(); } }
  crashText(c, t, tc, 900, 1560);
  c.setTransform(1, 0, 0, 1, 0, 0);
  iconPill(c, t, wt(80), 30.4, W / 2, 650, 100, (c, lt) => { glow(c, 0, -10, 90, '255,220,100', .7 + .3 * Math.sin(lt * 8)); c.fillStyle = '#ffe27a'; c.beginPath(); c.arc(0, -14, 42, 0, TAU); c.fill(); c.fillStyle = '#c8ccd4'; rrect(c, -22, 24, 44, 30, 6); c.fill(); c.strokeStyle = '#8a8f98'; c.lineWidth = 4; c.beginPath(); c.moveTo(-20, 34); c.lineTo(20, 34); c.moveTo(-20, 44); c.lineTo(20, 44); c.stroke(); c.strokeStyle = '#c8902a'; c.lineWidth = 4; c.beginPath(); c.moveTo(-10, 10); c.lineTo(-4, -16); c.lineTo(4, -4); c.lineTo(10, -16); c.lineTo(10, 10); c.stroke(); });
});

// 6. Justo cuando estás ocupado: el teclado
scene(30.45, (c, t, lt) => {
  cam(c, lt, 2.6, [1.0, 540, 1150], [1.08, 540, 1150]);
  room(c, t, { wall0: '#cfe6e8', wall1: '#a8cfd4' });
  drawBeto(c, 540, 1720, .95, { t, pose: 'type', expr: t > 31.9 ? 'shock' : 'worry', look: t > 31.0 ? [.8, .4] : [0, .6] });
  // escritorio + laptop
  c.fillStyle = '#2a2d34'; rrect(c, 330, 1250, 420, 230, 16); c.fill(); c.fillStyle = vgrad(c, 1265, 1465, [[0, '#4cc9f0'], [1, '#5a7bff']]); rrect(c, 348, 1266, 384, 196, 10); c.fill();
  c.fillStyle = 'rgba(255,255,255,.75)'; for (let k = 0; k < 4; k++) c.fillRect(380, 1290 + k * 40, 200 + hash(k) * 120 * Math.min(1, (t - 30.45) * 2), 14);
  table(c, -200, 1300, 1530, 80, true);
  c.fillStyle = '#c8ccd4'; c.beginPath(); c.moveTo(310, 1450); c.lineTo(770, 1450); c.lineTo(800, 1500); c.lineTo(280, 1500); c.fill(); c.fillStyle = '#9aa0aa'; for (let r = 0; r < 2; r++) for (let k = 0; k < 10; k++) c.fillRect(320 + k * 46 + r * 10, 1458 + r * 20, 34, 12);
  // vaso de lápices
  const cf = t - 31.9; c.save(); c.translate(860 + (cf > 0 ? cf * 200 : 0), cf > .1 ? 1460 + (cf - .1) ** 2 * 2600 : 1460); c.rotate(cf > 0 ? Math.min(1.8, cf * 6) : 0);
  ['#ff4d5e', '#ffd166', '#4cd97b'].forEach((col, i) => { c.save(); c.rotate((i - 1) * .2); c.fillStyle = col; c.fillRect(-8, -150, 16, 110); c.restore(); }); c.fillStyle = '#4c7bf0'; rrect(c, -40, -90, 80, 90, 10); c.fill(); c.restore();
  const cx = lerp(1250, 300, clamp((t - 30.5) / 2.3));
  drawCat(c, cx, 1490, .75, { t, kind: 'normal', flip: true, walk: t * 9, look: [-.5, .2], reach: tap(t, 31.6, 32.1, 1) * .7, eyes: 'smug' });
  c.setTransform(1, 0, 0, 1, 0, 0);
});

// 7a. Aburrido: amanecer y atardecer = zoomies
scene(33.0, (c, t, lt) => {
  cam(c, lt, 5.75, [1.0, 540, 1150], [1.05, 540, 1150]);
  const sr = ss(wt(101) - .2, wt(101) + .3, t), sset = ss(wt(104) - .2, wt(104) + .3, t);
  const skyCols = sset > 0 ? [[0, '#3a2050'], [1, '#ff9a5a']] : sr > 0 ? [[0, '#5a8ad8'], [1, '#ffc48a']] : [[0, '#6cb8f0'], [1, '#cdeafc']];
  room(c, t, { sky: skyCols, sunbeam: true });
  // sofá
  c.fillStyle = '#5a7bd8'; rrect(c, 60, 1180, 960, 260, 60); c.fill(); c.fillStyle = '#4a68c0'; rrect(c, 40, 1380, 1000, 220, 50); c.fill(); c.fillStyle = '#6a8ae8'; rrect(c, 120, 1340, 840, 90, 40); c.fill();
  c.fillStyle = 'rgba(255,255,255,.15)'; rrect(c, 140, 1350, 800, 20, 10); c.fill();
  const zoom = t > wt(99);
  if (!zoom) { drawCat(c, 520, 1380, .85, { t, kind: 'normal', crouch: 1, eyes: 'sleepy', look: [0, .5] });
    if (t > wt(94)) { c.save(); c.font = '900 64px Nunito'; c.fillStyle = 'rgba(255,255,255,.9)'; c.strokeStyle = '#2a3a5a'; c.lineWidth = 8; ['z', 'z', 'Z'].forEach((z, i) => { const ph = ((t * .8) + i * .33) % 1; c.globalAlpha = Math.sin(ph * Math.PI); c.strokeText(z, 700 + ph * 80 + i * 10, 1100 - ph * 200); c.fillText(z, 700 + ph * 80 + i * 10, 1100 - ph * 200); }); c.restore(); } }
  else { const zt = t - wt(99), x = 540 + Math.sin(zt * 4.5) * 380, fl = Math.cos(zt * 4.5) < 0;
    for (let k = 1; k < 4; k++) { c.save(); c.globalAlpha = .15; drawCat(c, 540 + Math.sin((zt - k * .04) * 4.5) * 380, 1700, .8, { t, kind: 'fluffy', flip: fl, walk: t * 18 }); c.restore(); }
    drawCat(c, x, 1700 - Math.abs(Math.sin(zt * 9)) * 40, .8, { t, kind: 'fluffy', flip: fl, walk: t * 18, wide: true, look: [.8, 0] }); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  const sunIcon = (set) => (c, lt) => { c.save(); c.beginPath(); c.rect(-90, -90, 180, 110); c.clip(); glow(c, 0, 20, 90, set ? '255,140,80' : '255,210,110', .8); c.fillStyle = set ? '#ff8a4a' : '#ffd166'; c.beginPath(); c.arc(0, 20, 44, 0, TAU); c.fill(); c.restore(); c.strokeStyle = '#fff'; c.lineWidth = 6; c.beginPath(); c.moveTo(-70, 22); c.lineTo(70, 22); c.stroke(); c.fillStyle = '#fff'; c.beginPath(); set ? (c.moveTo(-14, 40), c.lineTo(14, 40), c.lineTo(0, 62)) : (c.moveTo(-14, 62), c.lineTo(14, 62), c.lineTo(0, 40)); c.fill(); };
  iconPill(c, t, wt(101), 38.7, W / 2 - 130, 650, 95, sunIcon(false)); iconPill(c, t, wt(104), 38.7, W / 2 + 130, 650, 95, sunIcon(true));
});

// 7b. Las 5 de la mañana
scene(38.75, (c, t, lt) => {
  const tc = wt(115) + .05; shake(c, t, tc, 26, .4); cam(c, lt, 2.7, [1.05, 540, 1250], [1.12, 540, 1250]);
  bedroom(c, t);
  // cama
  c.fillStyle = '#4a3a5a'; rrect(c, -60, 1180, 160, 500, 20); c.fill();
  c.fillStyle = '#f4f2ee'; c.beginPath(); c.ellipse(600, 1440, 150, 60, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(0,0,0,.1)'; c.beginPath(); c.ellipse(600, 1460, 140, 30, 0, 0, TAU); c.fill();
  const wake = t > tc; c.save(); c.translate(-40, 1470); c.rotate(wake ? lerp(1.5, 1.05, eOut((t - tc) / .3)) : 1.5);
  drawBeto(c, 0, 0, .8, { t, pose: wake ? 'arms' : 'side', expr: wake ? 'shock' : 'sleep' }); c.restore();
  c.fillStyle = vgrad(c, 1400, 1700, [[0, '#6a8ae8'], [1, '#3a5ab8']]); c.beginPath(); c.moveTo(-300, 1430); c.quadraticCurveTo(200, wake ? 1380 : 1360, 470, 1420); c.lineTo(500, 1700); c.lineTo(-300, 1700); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.15)'; c.lineWidth = 8; c.beginPath(); c.moveTo(0, 1470); c.quadraticCurveTo(350, 1430, 740, 1470); c.stroke();
  c.fillStyle = '#2a2040'; c.fillRect(-60, 1700, 820, 60);
  if (!wake) { c.save(); c.font = '900 56px Nunito'; c.fillStyle = 'rgba(255,255,255,.85)'; ['z', 'Z'].forEach((z, i) => { const ph = ((t * .7) + i * .5) % 1; c.globalAlpha = Math.sin(ph * Math.PI); c.fillText(z, 640 + ph * 60, 1200 - ph * 160 - i * 20); }); c.restore(); }
  // buró con reloj y lámpara
  c.fillStyle = '#5a4030'; rrect(c, 690, 1380, 330, 380, 14); c.fill(); c.fillStyle = '#6a4a38'; c.fillRect(690, 1380, 330, 26);
  c.fillStyle = '#111'; rrect(c, 900, 1290, 110, 80, 12); c.fill(); c.fillStyle = '#ff4d5e'; c.font = '900 40px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.shadowColor = '#ff4d5e'; c.shadowBlur = 14; c.fillText('5:00', 955, 1332); c.shadowBlur = 0;
  const lf = t - (tc - .45); c.save(); c.translate(1050 + (lf > 0 ? lf * 300 : 0), lf > .1 ? 1380 + (lf - .1) ** 2 * 2600 : 1380); c.rotate(lf > 0 ? Math.min(2, lf * 6) : 0);
  c.fillStyle = '#ffd166'; c.beginPath(); c.moveTo(-60, -200); c.lineTo(60, -200); c.lineTo(80, -110); c.lineTo(-80, -110); c.fill(); c.fillStyle = '#c8ccd4'; c.fillRect(-8, -110, 16, 90); c.fillRect(-40, -24, 80, 24); c.restore();
  if (lf < 0) glow(c, 1050, 1250, 200, '255,210,120', .35);
  drawCat(c, 790, 1385, .5, { t, kind: 'normal', reach: tap(t, tc - .9, tc - .4, 1) * .8, look: [.5, 0], eyes: wake ? 'smug' : null, wide: !wake });
  shards(c, t, tc, 1180, 1760, 'rgba(255,220,130,.95)', 14, 5);
  crashText(c, t, tc, 820, 1130);
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(109), 41.3, '5:00', 'AM');
});

// 8. "Tú lo entrenaste"
scene(41.45, (c, t, lt) => {
  const th = wt(126);
  cam(c, lt, 4.6, [1.0, 540, 1150], [1.1, 540, 1180]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#1d2a5a'], [.6, '#3a5ab8'], [1, '#6a8ae8']]); c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalCompositeOperation = 'lighter'; [[-50, .5], [1130, -.5]].forEach(([bx, ph], i) => { const a = -Math.PI / 2 + Math.sin(t * 1.1 + i * 2) * .3 + ph * .6; c.save(); c.translate(bx, 1800); c.rotate(a); const g = c.createLinearGradient(0, 0, 1700, 0); g.addColorStop(0, 'rgba(255,240,200,.28)'); g.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(0, 0); c.lineTo(1700, -200); c.lineTo(1700, 200); c.fill(); c.restore(); }); c.restore();
  c.fillStyle = '#2a3a6a'; c.fillRect(-300, 1650, W + 600, 700); c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 6; c.beginPath(); c.ellipse(540, 1760, 600, 80, 0, 0, TAU); c.stroke();
  const hi = t > th - .3;
  drawBeto(c, 380, 1780, .95, { t, pose: hi ? 'high' : 'whistle', expr: hi ? 'smile' : 'smile', mouthOpen: .6, look: [.6, 0],
    prop: (c, P) => { // medalla + silbato
      c.strokeStyle = '#4c7bf0'; c.lineWidth = 12; c.beginPath(); c.moveTo(-60, -560); c.lineTo(0, -430); c.lineTo(60, -560); c.stroke();
      c.fillStyle = '#f2c04a'; c.beginPath(); c.arc(0, -410, 40, 0, TAU); c.fill(); c.strokeStyle = '#a8761e'; c.lineWidth = 5; c.stroke(); drawStar(c, 0, -410, 22, '#fff3c4');
      if (!hi) { const [hx, hy] = P[3]; c.fillStyle = '#c8ccd4'; rrect(c, hx - 10, hy - 30, 70, 34, 14); c.fill(); c.fillStyle = '#8a8f98'; c.beginPath(); c.arc(hx + 40, hy - 13, 10, 0, TAU); c.fill(); } } });
  if (!hi && t > 42.0) { c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 6; c.lineCap = 'round'; for (let k = 0; k < 3; k++) { const ph = (t * 3 + k / 3) % 1; c.globalAlpha = 1 - ph; c.beginPath(); c.arc(480, 1180, 40 + ph * 90, -.6, .6); c.stroke(); } c.globalAlpha = 1; }
  // gato que salta a chocar la pata
  const jt = t - (th - .5), jump = jt > 0 ? Math.sin(clamp(jt / .9) * Math.PI) * 330 : 0;
  drawCat(c, 760, 1780 - jump, .85, { t, kind: 'normal', flip: true, reach: jt > 0 ? ss(0, .4, jt) : 0, look: [-.6, -.2], eyes: jt > .6 ? 'smug' : null });
  if (t > th) { sparks(c, t, th, 600, 1060, 16, 7, '255,230,150'); }
  // listón ENTRENADOR
  const rt = t - wt(123); if (rt > 0) { const a = eBack(rt / .4); c.save(); c.translate(540, 820); c.scale(a, a); c.rotate(-.04); c.fillStyle = '#c8202a'; c.beginPath(); c.moveTo(-330, -60); c.lineTo(330, -60); c.lineTo(300, 0); c.lineTo(330, 60); c.lineTo(-330, 60); c.lineTo(-300, 0); c.fill();
    c.font = '900 72px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#fff3c4'; c.fillText('ENTRENADOR', 0, 4); c.restore(); }
  if (t > th) for (let i = 0; i < 70; i++) { const ct = t - th, a = -Math.PI / 2 + (hash(i) - .5) * 2, v = 700 + hash(i * 2) * 800, x = 600 + Math.cos(a) * v * ct, y = 1060 + Math.sin(a) * v * ct + 700 * ct * ct; c.save(); c.translate(x, y); c.rotate(ct * 6 + i); c.scale(1, Math.cos(ct * 8 + i)); c.fillStyle = XCOLS[i % 6]; c.fillRect(-9, -5, 18, 10); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
});

// 9. La pregunta final: el celular (imagen congelada)
scene(46.0, (c, t, lt) => {
  const tz = 48.3, tt = Math.min(t, tz);
  cam(c, lt, 4.6, [1.15, 600, 1200], [1.35, 700, 1200], false);
  room(c, tt);
  table(c, -200, 960, 1380);
  const px = lerp(720, 905, eInOut(clamp((tt - 46.2) / 1.6))), tip = tt > 47.9 ? (tt - 47.9) * 2.2 : 0;
  c.save(); c.translate(px + 60, 1340); c.rotate(tip); c.translate(-60, 0); c.fillStyle = '#1a1c22'; rrect(c, -120, -34, 240, 34, 10); c.fill(); c.fillStyle = vgrad(c, -34, 0, [[0, '#7a9bff'], [1, '#c45aff']]); rrect(c, -110, -32, 220, 14, 6); c.fill(); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(-100, -30, 60, 4); c.restore();
  drawCat(c, px - 330, 1350, .95, { t: tt, kind: 'normal', reach: tt < 48 ? tap(tt, 46.2, 47.9, 4) * .8 : .8, look: [0, .3], eyes: 'smug' });
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t > tz) { const k = clamp((t - tz) / .25); c.fillStyle = `rgba(20,20,40,${.18 * k})`; c.fillRect(0, 0, W, H); c.save(); c.globalAlpha = k; c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 16; c.strokeRect(40, 40, W - 80, H - 80); c.restore();
    c.save(); c.globalAlpha = k; c.fillStyle = 'rgba(14,13,18,.8)'; rrect(c, W / 2 - 70, 560, 140, 140, 40); c.fill(); c.fillStyle = '#fff'; c.fillRect(W / 2 - 34, 594, 22, 72); c.fillRect(W / 2 + 12, 594, 22, 72); c.restore(); }
  flash(c, t, tz, .15);
  const fo = clamp((t - (END - .6)) / .6); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});
