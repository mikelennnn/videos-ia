// ---------- escenas: el perro de dos cabezas ----------
END = 59.5;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
function wf(word, n = 0) { let k = 0; for (const w of WORDS) { if (w.w.toLowerCase().replace(/[^a-záéíóúñü0-9]/g, '') === word) { if (k === n) return w.s; k++; } } throw new Error('no ' + word); }
function lab(c, t, t0, txt, x, y, col = '#ffd166', t1 = 1e9) { if (t < t0 || t > t1 + .3) return; const a = eBack((t - t0) / .4) * (t > t1 ? 1 - clamp((t - t1) / .3) : 1); c.save(); c.translate(x, y); c.scale(a, a); c.font = '800 46px Nunito'; const w = c.measureText(txt).width + 54; rrect(c, -w / 2, -35, w, 70, 35); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = col; c.lineWidth = 4; c.stroke(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 2); c.restore(); }
function bowl(c, x, y, s = 1, milk = false) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#8a8f98'; c.beginPath(); c.ellipse(0, 0, 90, 26, 0, 0, TAU); c.fill(); c.fillStyle = milk ? '#f8f8f4' : '#7a4a24'; c.beginPath(); c.ellipse(0, -4, 74, 18, 0, 0, TAU); c.fill(); if (!milk) { c.fillStyle = '#9a6430'; for (let k = 0; k < 8; k++) { c.beginPath(); c.arc(-50 + k * 14, -8 + (k % 2) * 4, 8, 0, TAU); c.fill(); } } c.fillStyle = vgrad(c, 0, 40, [[0, '#c8ccd4'], [1, '#6a707a']]); c.beginPath(); c.moveTo(-90, 0); c.quadraticCurveTo(-80, 44, 0, 46); c.quadraticCurveTo(80, 44, 90, 0); c.fill(); c.restore(); }

// 1. Gancho: el perro de dos cabezas comiendo
scene(0, (c, t, lt) => {
  cam(c, lt, 6.9, [1.0, 540, 1150], [1.18, 560, 1180], false);
  oldLab(c, t);
  const eat = t > wf('comían') - .3;
  c.fillStyle = '#5a3a22'; c.fillRect(720, 1230, 30, 380); c.fillRect(1010, 1230, 30, 380); c.fillStyle = vgrad(c, 1180, 1240, [[0, '#9a6a40'], [1, '#6a4428']]); rrect(c, 690, 1190, 380, 50, 10); c.fill();
  bowl(c, 900, 1185, 1.0);
  c.fillStyle = '#5a3a22'; c.fillRect(560, 1150, 24, 460); c.fillStyle = vgrad(c, 1110, 1160, [[0, '#9a6a40'], [1, '#6a4428']]); rrect(c, 520, 1110, 110, 40, 8); c.fill();
  bowl(c, 575, 1105, .6, true);
  drawDog(c, 470, 1600, 1.05, { t, pup: true, eat, pupEat: eat, lick: eat, pupRot: eat ? .2 : 0, blink: (lt % 2.7) - 1.3, pupBlink: (lt % 2.2) - 1.0, pupLook: [.4, .3], look: [.5, .5] });
  motes(c, t, { n: 22, seed: 3, size: 10, a: .35 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wf('mil'), 6.85, '1954', '');
});

// 2. El cirujano
scene(6.9, (c, t, lt) => {
  cam(c, lt, 4.6, [1.0, 540, 1150], [1.1, 540, 1150]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#5a0a10'], [.6, '#9a1a1e'], [1, '#c8302a']]); c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalCompositeOperation = 'lighter'; c.translate(540, 1000); c.rotate(t * .1); for (let k = 0; k < 16; k++) { c.rotate(TAU / 16); c.fillStyle = 'rgba(255,200,120,.05)'; c.beginPath(); c.moveTo(0, 0); c.lineTo(1500, -120); c.lineTo(1500, 120); c.fill(); } c.restore();
  const sa = eBack((t - wf('unión') + .2) / .5); if (sa > 0) { c.save(); c.translate(540, 900); c.scale(sa * 3.2, sa * 3.2); c.rotate(Math.sin(t) * .03); drawStar(c, 0, 0, 120, 'rgba(255,215,90,.35)'); c.restore(); }
  drawSurgeon(c, 540, 1880, 1.05, { t, pose: 'side', pose2: 'wave', pk: ss(7.2, 7.6, t) * (1 - ss(9.0, 9.4, t)), blink: (lt % 2.4) - 1.2 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, wf('vladímir'), 'Vladímir Demíjov', W / 2, 640, '#ffd166', 11.4);
});

// 3. Diagrama: cachorro + perro grande
scene(11.5, (c, t, lt) => {
  c.translate(W / 2, H / 2); const z = 1 + .07 * (1 - eOut(lt / .4)); c.scale(z, z); c.translate(-W / 2, -H / 2);
  diagramBG(c, t);
  const k = ss(wf('unió') - .3, wf('unió') + .7, t);
  c.save(); c.shadowColor = 'rgba(120,200,255,.6)'; c.shadowBlur = 20; drawDog(c, 470, 1650, 1.05, { t, pup: false, look: [-.3, -.4] }); c.restore();
  // cachorro flotando hacia el cuello
  const px = lerp(780, 470 + 130 * 1.05, k), py = lerp(820, 1650 - 470 * 1.05, k);
  c.save(); c.translate(px, py); c.rotate(lerp(.2, -.15, k) + Math.sin(t * 2) * .04 * (1 - k)); c.scale(.85 * 1.05, .85 * 1.05); c.drawImage(G.pup, -200, -300); [-30, 30].forEach(ex => eyeDot(c, ex, -100, 14, (lt % 2) - 1, [-.6, .4])); c.restore();
  if (k < 1) { c.save(); c.setLineDash([16, 14]); c.lineDashOffset = -t * 60; c.strokeStyle = 'rgba(255,220,120,.9)'; c.lineWidth = 6; c.beginPath(); c.moveTo(px, py + 100); c.quadraticCurveTo(700, 1250, 470 + 136, 1650 - 440); c.stroke(); c.restore(); }
  if (k >= 1) { c.save(); c.globalCompositeOperation = 'lighter'; glow(c, 470 + 136, 1650 - 440, 120, '255,220,120', .6 + .3 * Math.sin(t * 6)); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, wf('cachorro'), 'cachorro', 760, 700, '#fff2dc', 18.0); lab(c, t, wf('grande'), 'perro grande', 300, 1830, '#d8a060', 18.0);
  ['cabeza', 'hombros', 'patas'].forEach((w, i) => lab(c, t, wf(w, w === 'cabeza' ? 1 : 0), w, 200 + i * 340, 520, '#9fd4ff', wf('cachorro') - .1));
});

// 4. Venas y arterias: un corazón para dos cabezas
scene(18.1, (c, t, lt) => {
  cam(c, lt, 6.2, [1.05, 540, 1250], [1.12, 560, 1200]);
  diagramBG(c, t);
  c.save(); c.globalAlpha = .55; drawDog(c, 470, 1650, 1.05, { t, pup: true, stitches: false, pupBlink: (lt % 2) - 1 }); c.restore();
  const S = 1.05, hx = 470 + 120 * S, hy = 1650 - 250 * S, pupN = [470 + 130 * S, 1650 - 520 * S], dogN = [470 + 275 * S, 1650 - 470 * S];
  const beat = 1 + Math.pow(Math.max(0, Math.sin(t * 7)), 6) * .2;
  const k = ss(wf('venas') - .2, wf('venas') + 1.4, t);
  const vessel = (pts, col, w) => { const n = Math.floor(pts.length * k); if (n < 2) return; c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.shadowColor = col; c.shadowBlur = 20; c.beginPath(); for (let i = 0; i < n; i++) c.lineTo(...pts[i]); c.stroke(); c.restore();
    for (let q = 0; q < 6; q++) { const u = ((t * .7 + q / 6) % 1) * k, i = Math.floor(u * (pts.length - 1)); c.fillStyle = '#fff'; c.beginPath(); c.arc(pts[i][0], pts[i][1], 7, 0, TAU); c.fill(); } };
  vessel(bez([hx, hy], [hx + 40, hy - 200], pupN, 24), 'rgba(255,60,80,.95)', 14); vessel(bez([hx + 10, hy + 10], [hx + 90, hy - 160], [pupN[0] + 20, pupN[1] + 10], 24), 'rgba(90,140,255,.95)', 12);
  vessel(bez([hx, hy], [hx + 160, hy - 120], dogN, 24), 'rgba(255,60,80,.95)', 14); vessel(bez([hx + 10, hy + 10], [hx + 200, hy - 80], [dogN[0] + 10, dogN[1] + 20], 24), 'rgba(90,140,255,.95)', 12);
  c.save(); c.translate(hx, hy); c.scale(beat, beat); glow(c, 0, 0, 160, '255,80,100', .6); c.fillStyle = '#ff3a50'; c.beginPath(); c.moveTo(0, 50); c.bezierCurveTo(-90, -5, -45, -80, 0, -32); c.bezierCurveTo(45, -80, 90, -5, 0, 50); c.fill(); c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.ellipse(-30, -30, 12, 8, -.6, 0, TAU); c.fill(); c.restore();
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, wf('venas'), 'venas', 330, 650, '#6a9aff', 24.2); lab(c, t, wf('arterias'), 'arterias', 750, 650, '#ff5a72', 24.2);
  lab(c, t, wf('corazón'), '1 corazón = 2 cabezas', W / 2, 1830, '#ffd166', 24.2);
});

// 5. Funcionó: parpadeaba, seguía con la mirada, tomaba leche
scene(24.3, (c, t, lt) => {
  const tb = wf('parpadeaba'), tm = wf('mirada') - .6, tl = wf('leche') - .3;
  cam(c, lt, 6.6, [1.4, 620, 1050], [1.55, 620, 1080]);
  oldLab(c, t);
  const ballX = t > tm && t < tl ? 760 + Math.sin((t - tm) * 3.5) * 280 : 760;
  const pupLook = t > tm && t < tl ? [Math.sin((t - tm) * 3.5) * 1.1, .2] : (t > tl ? [.2, 1] : [0, 0]);
  if (t > tm && t < tl + .3) { c.strokeStyle = '#5a4a3a'; c.lineWidth = 4; c.beginPath(); c.moveTo(760, 600); c.lineTo(ballX, 860); c.stroke(); c.fillStyle = '#e8343f'; c.beginPath(); c.arc(ballX, 880, 34, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.fillRect(ballX - 34, 874, 68, 10); }
  if (t > tl) bowl(c, 640, 1340 - 30, .8, true);
  const blink = t > tb && t < tb + .9 ? ((t - tb) % .3) - .15 : (lt % 3.1) - 1.5;
  drawDog(c, 470, 1600, 1.05, { t, pup: true, pupBlink: blink, pupLook, lick: t > tl, pupRot: t > tl ? .25 : 0, look: [.3, .3], blink: (lt % 2.8) - 1.3 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, tb, 'parpadea ✓', 240, 650, '#4cd97b'); lab(c, t, wf('seguía'), 'sigue con la vista ✓', 540, 760, '#4cd97b'); lab(c, t, wf('leche'), 'toma leche ✓', 840, 650, '#4cd97b');
});

// 6. La leche se salía por un tubo
scene(30.9, (c, t, lt) => {
  const tt = wf('tubo') - .2;
  cam(c, lt, 6.1, [1.3, 560, 1150], [1.38, 560, 1180]);
  oldLab(c, t);
  bowl(c, 640, 1310, .8, true);
  drawDog(c, 470, 1600, 1.05, { t, pup: true, lick: t < tt + 1, pupRot: .25, pupLook: t > tt ? [0, 1] : [.2, 1], pupBlink: null, look: [-.5, -.2] });
  // tubo de goteo
  const tx = 470 + 100 * 1.05, ty0 = 1600 - 400 * 1.05;
  c.strokeStyle = 'rgba(220,235,245,.85)'; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(tx, ty0); c.quadraticCurveTo(tx - 60, ty0 + 160, tx - 30, 1560); c.stroke(); c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 6; c.stroke();
  for (let k = 0; k < 8; k++) { const ph = (t * 1.3 + k / 8) % 1; if (t < 31.4) break; c.fillStyle = '#ffffff'; c.beginPath(); c.ellipse(tx - 30, 1570 + ph * 140, 9, 13, 0, 0, TAU); c.fill(); }
  c.fillStyle = 'rgba(250,250,245,.9)'; c.beginPath(); c.ellipse(tx - 30, 1720, 40 + Math.min(1, lt / 5) * 110, 18, 0, 0, TAU); c.fill();
  if (t > tt) { const a = eBack((t - tt) / .3); c.save(); c.translate(tx + 140, 1000); c.scale(a, a); c.font = '900 110px Nunito'; c.textAlign = 'center'; c.lineWidth = 12; c.strokeStyle = '#2a1a10'; c.strokeText('?', 0, 0); c.fillStyle = '#fff'; c.fillText('?', 0, 0); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, wf('estómago') - .1, 'sin estómago', W / 2, 650, '#ff8a5a', 36.9);
});

// 7. 20 perros, el récord: 29 días
scene(37.0, (c, t, lt) => {
  const tr = wf('veintinueve');
  cam(c, lt, 5.4, [1.0, 540, 1150], [1.05, 540, 1150]);
  diagramBG(c, t);
  if (t < tr - .1) { for (let i = 0; i < 20; i++) { const col = i % 4, row = Math.floor(i / 4), x = 210 + col * 220, y = 1060 + row * 180, ti = wf('veinte') - .2 + i * .06, a = eBack((t - ti) / .3); if (a <= 0) continue;
      c.save(); c.translate(x, y); c.scale(a * .9, a * .9); c.fillStyle = 'rgba(14,13,18,.8)'; rrect(c, -90, -80, 180, 160, 30); c.fill(); c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 3; c.stroke(); c.scale(.32, .32); c.drawImage(G.pup, -200, -360); c.restore(); } }
  else { const d = Math.min(29, Math.floor(1 + (t - tr) * 30)); c.save(); c.translate(540, 1250); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 40; c.fillStyle = '#f7f2e8'; rrect(c, -260, -240, 520, 480, 30); c.fill(); c.shadowBlur = 0; c.fillStyle = '#c8202a'; rrect(c, -260, -240, 520, 120, 30); c.fill(); c.fillRect(-260, -150, 520, 30);
    c.fillStyle = '#fff'; c.font = '900 56px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('DÍAS', 0, -176); c.fillStyle = '#2a2a30'; c.font = '900 200px Nunito'; c.fillText(String(d), 0, 70); c.restore();
    c.save(); c.translate(540, 1650); c.scale(.45, .45); c.drawImage(G.pup, -200, -300); [-30, 30].forEach(ex => eyeDot(c, ex, -100, 14, (lt % 2.5) - 1.2, [0, 0])); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t < tr - .1) badge(c, t, wf('veinte'), tr - .15, '20', 'perros'); else badge(c, t, tr, 42.3, '29', 'días');
});

// 8. "Monstruoso"… pero buscaba aprender a trasplantar órganos
scene(42.4, (c, t, lt) => {
  const tm = wf('monstruoso') - .2, to = wf('trasplantar') - .2;
  shake(c, t, tm, 16, .3); cam(c, lt, 6.5, [1.0, 540, 1150], [1.06, 540, 1150]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#2a2420'], [1, '#4a3e34']]); c.fillRect(-400, -400, W + 800, H + 800);
  const out = ss(to - .2, to + .3, t);
  [[300, 1100, -.18, '¡MONSTRUO!', 'Experimento escandaliza al mundo', 0], [780, 1250, .14, '¿CIENCIA?', '¿O crueldad?', .25], [520, 1500, -.05, '¡INCREÍBLE!', 'Perro con dos cabezas', .5]].forEach(([x, y, r, h, s2, d]) => {
    const a = eBack((t - tm - d) / .35); if (a <= 0) return; newspaper(c, x - out * 1400 * (x < 540 ? 1 : -1), y + out * 200, .62 * a, r + (1 - a) * .6, h, s2); });
  if (out > 0) { c.save(); c.globalAlpha = out; const beat = 1 + Math.pow(Math.max(0, Math.sin(t * 7)), 6) * .15; c.translate(540, 1200); c.scale(beat * 2.2, beat * 2.2); glow(c, 0, 0, 160, '255,80,100', .7);
    c.fillStyle = '#ff3a50'; c.beginPath(); c.moveTo(0, 50); c.bezierCurveTo(-90, -5, -45, -80, 0, -32); c.bezierCurveTo(45, -80, 90, -5, 0, 50); c.fill(); c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.ellipse(-30, -30, 12, 8, -.6, 0, TAU); c.fill(); c.restore();
    [[220, 900, '#ff8aa0', 'pulmón'], [860, 900, '#c8643a', 'riñón'], [220, 1560, '#e8a04a', 'hígado'], [860, 1560, '#ff3a50', 'corazón']].forEach(([x, y, col], i) => { const a = eBack((t - to - .2 - i * .12) / .3); if (a <= 0) return; c.save(); c.translate(x, y + Math.sin(t * 2 + i) * 8); c.scale(a, a); c.fillStyle = 'rgba(14,13,18,.8)'; c.beginPath(); c.arc(0, 0, 90, 0, TAU); c.fill(); c.fillStyle = col; c.beginPath(); c.ellipse(0, 0, 40, 52, i * .4, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(-12, -18, 10, 16, 0, 0, TAU); c.fill(); c.restore(); }); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, to, 'trasplantes', W / 2, 650, '#4cd97b', 48.8);
});

// 9. El giro: el primer trasplante de corazón humano viajó a aprender de él
scene(48.9, (c, t, lt) => {
  const tv = wf('viajó') - .2, mapK = ss(tv - .3, tv + .3, t);
  cam(c, lt, 7, [1.0, 540, 1150], [1.08, 540, 1150]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#cfe6ee'], [1, '#8ab8c8']]); c.fillRect(-400, -400, W + 800, H + 800);
  // lámpara de quirófano
  c.fillStyle = '#e8ecf2'; c.beginPath(); c.ellipse(540, 620, 260, 90, 0, 0, TAU); c.fill(); for (let k = 0; k < 6; k++) { c.fillStyle = '#fffbe0'; c.beginPath(); c.arc(400 + k * 56, 630, 22, 0, TAU); c.fill(); } glow(c, 540, 700, 400, '255,250,220', .5); c.fillStyle = '#9aa4b0'; c.fillRect(530, 300, 20, 240);
  c.fillStyle = '#5ab8a8'; rrect(c, 140, 1420, 800, 120, 30); c.fill(); c.fillStyle = '#4a9a8a'; c.fillRect(200, 1540, 40, 400); c.fillRect(840, 1540, 40, 400);
  // monitor
  c.fillStyle = '#1a1c22'; rrect(c, 700, 900, 300, 220, 20); c.fill(); c.strokeStyle = '#4cd97b'; c.lineWidth = 5; c.beginPath(); for (let x = 0; x < 260; x += 4) { const ph = (x / 260 * 3 + t * 1.2) % 1; c.lineTo(720 + x, 1010 - (ph > .45 && ph < .5 ? 70 : ph > .5 && ph < .55 ? -40 : 0)); } c.stroke();
  c.fillStyle = '#4cd97b'; c.font = '900 36px Nunito'; c.fillText('♥ 72', 730, 950);
  const beat = 1 + Math.pow(Math.max(0, Math.sin(t * 7.5)), 6) * .18; c.save(); c.translate(400, 1250); c.scale(beat * 1.8, beat * 1.8); glow(c, 0, 0, 140, '255,80,100', .6); c.fillStyle = '#ff3a50'; c.beginPath(); c.moveTo(0, 50); c.bezierCurveTo(-90, -5, -45, -80, 0, -32); c.bezierCurveTo(45, -80, 90, -5, 0, 50); c.fill(); c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.ellipse(-30, -30, 12, 8, -.6, 0, TAU); c.fill(); c.restore();
  // mapa y avión a Moscú
  if (mapK > 0) { c.save(); c.globalAlpha = mapK; c.fillStyle = vgrad(c, -300, 2200, [[0, '#1d3a5a'], [1, '#0e2038']]); c.fillRect(-400, -400, W + 800, H + 800);
    c.fillStyle = '#3a6a4a'; c.beginPath(); c.ellipse(300, 1500, 300, 200, .3, 0, TAU); c.fill(); c.beginPath(); c.ellipse(760, 1000, 380, 260, -.2, 0, TAU); c.fill(); c.beginPath(); c.ellipse(560, 1250, 120, 90, 0, 0, TAU); c.fill();
    const ax = 300, ay = 1560, bx = 800, by = 920, u = clamp((t - tv) / 1.6); c.save(); c.setLineDash([14, 14]); c.strokeStyle = '#fff'; c.lineWidth = 5; c.beginPath(); for (let k = 0; k <= 30 * u; k++) { const q = k / 30; c.lineTo(lerp(ax, bx, q), lerp(ay, by, q) - Math.sin(q * Math.PI) * 220); } c.stroke(); c.restore();
    const qx = lerp(ax, bx, u), qy = lerp(ay, by, u) - Math.sin(u * Math.PI) * 220; c.save(); c.translate(qx, qy); c.rotate(Math.atan2((by - ay) - Math.cos(u * Math.PI) * 220 * Math.PI, bx - ax)); c.fillStyle = '#fff'; c.beginPath(); c.moveTo(50, 0); c.lineTo(-40, -12); c.lineTo(-40, 12); c.fill(); c.fillRect(-14, -46, 18, 92); c.fillRect(-46, -20, 10, 40); c.restore();
    // cúpulas de Moscú
    c.save(); c.translate(bx, by - 30); c.fillStyle = '#e8c070'; [[-50, 0, 30], [0, -20, 40], [50, 0, 30]].forEach(([x, y, r]) => { c.fillRect(x - r * .7, y, r * 1.4, 70); c.beginPath(); c.moveTo(x - r, y); c.quadraticCurveTo(x - r, y - r * 1.4, x, y - r * 2); c.quadraticCurveTo(x + r, y - r * 1.4, x + r, y); c.fill(); }); c.restore();
    c.fillStyle = '#fff'; c.font = '900 56px Nunito'; c.textAlign = 'center'; c.fillText('MOSCÚ', bx, by + 120); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wf('primer'), tv - .3, '1967', '');
});

// 10. ¿Valió la pena?
scene(55.9, (c, t, lt) => {
  cam(c, lt, 3.6, [1.2, 560, 1200], [1.1, 540, 1180]);
  oldLab(c, t);
  drawDog(c, 470, 1600, 1.05, { t, pup: true, look: [-.6, .2], pupLook: [.2, .4], blink: (lt % 2.5) - 1.2, pupBlink: (lt % 2.1) - .9 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t > wf('valió') - .3) { const a = eBack((t - wf('valió') + .3) / .4); c.save(); c.translate(W / 2, 680); c.scale(a, a); c.font = '900 66px Nunito'; const w = c.measureText('¿Valió la pena?').width + 90; rrect(c, -w / 2, -60, w, 120, 40); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = '#ffd166'; c.lineWidth = 4; c.stroke(); c.fillStyle = '#ffd57e'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('¿Valió la pena?', 0, 4); c.restore(); }
  const fo = clamp((t - (END - .7)) / .7); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});
