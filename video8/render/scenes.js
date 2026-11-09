// ---------- escenas: la barra de hierro (35 s) ----------
END = 35.0;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
function wf(word, n = 0) { let k = 0; for (const w of WORDS) { if (w.w.toLowerCase().replace(/[^a-záéíóúñü0-9]/g, '') === word) { if (k === n) return w.s; k++; } } throw new Error('no ' + word); }
function lab(c, t, t0, txt, x, y, col = '#ffd166', t1 = 1e9, size = 46) { if (t < t0 || t > t1 + .3) return; const a = eBack((t - t0) / .4) * (t > t1 ? 1 - clamp((t - t1) / .3) : 1); c.save(); c.translate(x, y); c.scale(a, a); c.font = `800 ${size}px Nunito`; const w = c.measureText(txt).width + 54; rrect(c, -w / 2, -size * .76, w, size * 1.52, size * .76); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = col; c.lineWidth = 4; c.stroke(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 2); c.restore(); }

// 1. ¡BOOM! la barra le atraviesa la cabeza (gancho, 0–5.2 s)
scene(0, (c, t, lt) => {
  const tb = .25, tu = wf('levantó') - .2;
  shake(c, t, tb, 40, .5);
  const z = t < tu ? lerp(1.35, 1.25, lt / tu) : lerp(1.25, 1.05, ss(tu, tu + .8, t)); c.translate(W / 2, H / 2); c.scale(z, z); c.translate(-lerp(520, 560, ss(tu, 5, t)), -lerp(1010, 1150, ss(tu, tu + .8, t)));
  railroad(c, t);
  const rodK = t < tb ? 0 : eOut((t - tb) / .12);
  const up = t > tu ? eOut((t - tu) / .5) : 0, walk = t > tu + .4 ? (t - tu - .4) : 0;
  const wx = 480 + walk * 110, crouch = 1 - up;
  smoke(c, t, tb - .05, 220, 1640, .8);
  c.save(); c.translate(wx, 1700); c.scale(1, 1 - crouch * .12);
  drawWorker(c, 0, 0, 1.0, { t, pose: up > .5 ? (Math.floor(t * 4) % 2 ? 'runA' : 'runB') : 'arms', expr: t < tb ? 'smile' : up > .5 ? 'smile' : 'shock', mouthOpen: .5, rod: rodK, look: up > .5 ? [1, 0] : [0, -.6], shiver: t > tb && t < tu ? .4 : 0, hatRot: t > tb ? -.5 : 0 });
  c.restore();
  if (t > tu + .5) { for (let k = 0; k < 3; k++) { const a = t * 4 + k * 2.1; c.save(); c.translate(wx + 40 + Math.cos(a) * 150, 1700 - 1040 + Math.sin(a) * 40); drawStar(c, 0, 0, 24, '#ffe27a'); c.restore(); } }
  if (t > tb) droplets(c, t, tb, wx - 40, 1700 - 650, 10, 3, .8);
  c.setTransform(1, 0, 0, 1, 0, 0); flash(c, t, tb, .25, '255,240,200');
  boomText(c, t, tb, W / 2, 900, '¡BOOM!', 1.0);
  badge(c, t, wf('seis'), 3.2, '6', 'kg', 650);
});

// 2. Diagrama: la trayectoria de la barra
scene(5.2, (c, t, lt) => {
  const te = wf('entró') - .1, tp = wf('pasó'), ts = wf('salió');
  c.translate(W / 2, H / 2); const z = 1 + .07 * (1 - eOut(lt / .4)); c.scale(z, z); c.translate(-W / 2, -H / 2);
  const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1300); g.addColorStop(0, '#1b3b5e'); g.addColorStop(1, '#0a1626'); c.fillStyle = g; c.fillRect(-100, -100, W + 200, H + 200);
  c.strokeStyle = 'rgba(140,200,255,.07)'; c.lineWidth = 2; for (let x = 0; x < W; x += 60) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let y = 0; y < H; y += 60) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  // perfil de cabeza (silueta de cristal)
  const hx = 500, hy = 1150;
  c.save(); c.translate(hx, hy); c.shadowColor = 'rgba(120,200,255,.9)'; c.shadowBlur = 30; c.fillStyle = 'rgba(150,210,255,.18)'; c.strokeStyle = 'rgba(190,230,255,.9)'; c.lineWidth = 6;
  c.beginPath(); c.moveTo(-60, 330); c.lineTo(-40, 200); c.quadraticCurveTo(-230, 160, -240, -40); c.quadraticCurveTo(-250, -300, 0, -320); c.quadraticCurveTo(230, -320, 250, -120); c.lineTo(260, -40); c.lineTo(300, 40); c.lineTo(250, 60); c.lineTo(250, 120); c.quadraticCurveTo(250, 200, 160, 200); c.lineTo(120, 210); c.lineTo(110, 330); c.closePath(); c.fill(); c.stroke(); c.shadowBlur = 0;
  c.fillStyle = 'rgba(255,170,200,.35)'; c.beginPath(); c.ellipse(-20, -130, 200, 160, 0, 0, TAU); c.fill(); c.strokeStyle = 'rgba(255,170,200,.6)'; c.lineWidth = 3; for (let k = 0; k < 8; k++) { c.beginPath(); c.arc(-20 + Math.cos(k) * 80, -130 + Math.sin(k * 1.7) * 60, 40, 0, 3); c.stroke(); }
  const eyeOn = t > tp - .1 && t < ts; c.fillStyle = eyeOn ? '#ffd166' : '#fff'; c.beginPath(); c.ellipse(170, -40, 34, 26, 0, 0, TAU); c.fill(); c.fillStyle = '#1a2a3a'; c.beginPath(); c.arc(185, -40, 13, 0, TAU); c.fill();
  if (eyeOn) glow(c, 170, -40, 90, '255,210,100', .6);
  c.restore();
  // trayectoria: mejilla (abajo) -> detrás del ojo -> sale arriba
  const P0 = [hx + 140, hy + 470], P1 = [hx + 110, hy + 90], P2 = [hx + 120, hy - 60], P3 = [hx - 20, hy - 330], P4 = [hx - 120, hy - 650];
  const path = [P0, P1, P2, P3, P4]; const k = clamp((t - te) / (ts + .5 - te)); const seg = k * 4, si = Math.min(3, Math.floor(seg)), sf = seg - si; const tip = [lerp(path[si][0], path[si + 1][0], sf), lerp(path[si][1], path[si + 1][1], sf)];
  c.save(); c.setLineDash([16, 12]); c.strokeStyle = 'rgba(255,220,120,.9)'; c.lineWidth = 6; c.beginPath(); c.moveTo(...P0); for (let i = 1; i <= si; i++) c.lineTo(...path[i]); c.lineTo(...tip); c.stroke(); c.restore();
  // la barra
  const ang = Math.atan2(P0[1] - P4[1], P0[0] - P4[0]); const fly = t > ts + .5 ? (t - ts - .5) : 0;
  c.save(); c.translate(tip[0] - fly * 300, tip[1] - fly * 900 + fly * fly * 900); c.rotate(ang + fly * 6); c.fillStyle = '#4a4e58'; rrect(c, -10, -14, 560, 28, 14); c.fill(); c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(0, -9, 540, 5); c.fillStyle = '#2a2a30'; c.beginPath(); c.moveTo(-40, 0); c.lineTo(0, -14); c.lineTo(0, 14); c.fill(); c.restore();
  if (k > 0 && k < 1) sparks(c, t, te + .1, tip[0], tip[1], 8, Math.floor(t * 3), '255,220,150');
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, wf('mejilla') - .1, 'mejilla', 860, 1660, '#ff8aa0', 10.9); lab(c, t, tp, 'detrás del ojo', 830, 1070, '#ffd166', 10.9); lab(c, t, ts, 'sale por arriba', 300, 900, '#9fd4ff', 10.9);
  badge(c, t, te, wf('cráneo') - .2, '1.1', 'm', 650); badge(c, t, wf('cráneo'), 10.85, '25', 'm de lejos', 650);
});

// 3. Minutos después: platicando con el doctor
scene(10.9, (c, t, lt) => {
  cam(c, lt, 3.9, [1.0, 540, 1250], [1.08, 540, 1250]);
  railroad(c, t);
  cart(c, 380, 1600, 1.0);
  drawWorker(c, 380, 1520, .78, { t, pose: 'side', pose2: 'wave', pk: .5 + .5 * Math.sin(t * 3), expr: 'smile', mouthOpen: .4 + .4 * Math.abs(Math.sin(t * 9)), bandage: true, noHat: true, look: [.8, 0] });
  drawDoctor(c, 840, 1880, .82, { t, pose: 'arms', expr: 'shock', look: [-.8, 0] });
  c.save(); c.font = '900 110px Nunito'; c.textAlign = 'center'; c.lineWidth = 12; c.strokeStyle = '#2a1a10'; const a = eBack((t - 11.3) / .3); if (a > 0) { c.translate(900, 980); c.scale(a, a); c.strokeText('!!', 0, 0); c.fillStyle = '#ffd166'; c.fillText('!!', 0, 0); } c.restore();
  if (t > wf('platicando') - .2) { const a2 = eBack((t - wf('platicando') + .2) / .35); c.save(); c.translate(360, 830); c.scale(a2, a2); c.fillStyle = '#fff'; rrect(c, -190, -70, 380, 120, 40); c.fill(); c.beginPath(); c.moveTo(-20, 48); c.lineTo(30, 48); c.lineTo(0, 100); c.fill(); c.font = '900 52px Nunito'; c.fillStyle = '#2a1a10'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('¡Qué tal, doc!', 0, -10); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, 11.0, 'Phineas Gage · 1848', W / 2, 1800, '#ffd166', 14.7, 50);
});

// 4. ANTES / DESPUÉS
scene(14.7, (c, t, lt) => {
  const tg = wf('grosero') - .15, tq = wf('ya') - .2;
  const sp = eInOut(clamp(lt / .5)); c.translate(W / 2, H / 2); c.scale(1 + .05 * (1 - eOut(lt / .4)), 1 + .05 * (1 - eOut(lt / .4))); c.translate(-W / 2, -H / 2);
  // izquierda: antes
  c.save(); c.beginPath(); c.rect(0, 0, W / 2, H); c.clip();
  c.fillStyle = vgrad(c, 0, H, [[0, '#ffd8a0'], [1, '#f2a65a']]); c.fillRect(0, 0, W, H); bokeh(c, t, 8, 3, .3);
  drawWorker(c, 270, 1840, .8, { t, pose: 'wave', expr: 'smile', mouthOpen: .6, look: [.3, 0] });
  for (let k = 0; k < 4; k++) { const ph = (t * .6 + k / 4) % 1; c.save(); c.globalAlpha = Math.sin(ph * Math.PI); c.translate(150 + k * 80, 1100 - ph * 300); c.fillStyle = '#ff5a72'; c.beginPath(); c.moveTo(0, 20); c.bezierCurveTo(-34, 0, -18, -26, 0, -12); c.bezierCurveTo(18, -26, 34, 0, 0, 20); c.fill(); c.restore(); }
  c.restore();
  // derecha: después
  c.save(); c.beginPath(); c.rect(W / 2, 0, W / 2, H); c.clip();
  const ang = t > tg; c.fillStyle = vgrad(c, 0, H, [[0, '#5a1018'], [1, '#2a0810']]); c.fillRect(0, 0, W, H);
  if (ang) { c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = .3 + .2 * Math.sin(t * 20); c.fillStyle = '#ff3a2a'; c.fillRect(W / 2, 0, W / 2, H); c.restore(); }
  drawWorker(c, 810 + (ang ? (hash(t * 50) - .5) * 14 : 0), 1840, .8, { t, pose: ang ? 'shrug' : 'side', expr: ang ? 'shock' : 'flat', bandage: true, noHat: true, look: [-.3, 0], mouthOpen: 1 });
  if (ang) { [-1, 1].forEach(sd => { for (let k = 0; k < 3; k++) { const ph = (t * 2 + k / 3) % 1; c.save(); c.globalAlpha = 1 - ph; c.fillStyle = '#e8e8e8'; c.beginPath(); c.arc(810 + sd * (110 + ph * 60), 1240 - ph * 120, 20 + ph * 30, 0, TAU); c.fill(); c.restore(); } });
    c.save(); c.font = '900 70px Nunito'; c.textAlign = 'center'; c.fillStyle = '#ffd166'; c.strokeStyle = '#1a0808'; c.lineWidth = 10; ['#@!', '%&$!'].forEach((s2, i) => { const ph = (t * 1.5 + i * .5) % 1; c.globalAlpha = Math.sin(ph * Math.PI); c.strokeText(s2, 700 + i * 200, 1000 - ph * 120); c.fillText(s2, 700 + i * 200, 1000 - ph * 120); }); c.restore(); }
  c.restore();
  c.fillStyle = '#fff'; c.fillRect(W / 2 - 5, 0, 10, H);
  const hd = (txt, x, col) => { c.save(); c.font = '900 64px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; const w = c.measureText(txt).width + 60; rrect(c, x - w / 2, 560, w, 100, 30); c.fillStyle = col; c.fill(); c.fillStyle = '#fff'; c.fillText(txt, x, 612); c.restore(); };
  hd('ANTES', W / 4, '#2a9a5a'); hd('DESPUÉS', W * 3 / 4, '#c81f2a');
  if (t > tq) { const a = eBack((t - tq) / .35); c.save(); c.translate(W / 2, 840); c.scale(a, a); c.font = '900 52px Nunito'; const w = c.measureText('"Ya no es el mismo"').width + 70; rrect(c, -w / 2, -56, w, 112, 36); c.fillStyle = '#f7f2e8'; c.fill(); c.strokeStyle = '#2a1a10'; c.lineWidth = 5; c.stroke(); c.fillStyle = '#2a1a10'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('"Ya no es el mismo"', 0, 4); c.font = '800 34px Nunito'; c.fillStyle = '#ffd166'; c.fillText('— su médico', 0, 92); c.restore(); }
});

// 5. El lóbulo frontal controla la personalidad
scene(23.2, (c, t, lt) => {
  const tf = wf('frente') - .1;
  cam(c, lt, 3.9, [1.0, 540, 1100], [1.1, 540, 1100]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#2a1a4a'], [1, '#4a2a6a']]); c.fillRect(-400, -400, W + 800, H + 800); bokeh(c, t, 14, 9, .3);
  drawBrain(c, 540, 1120, 1.3, { t, mood: t > wf('personalidad') ? 'happy' : 'calm', look: [.5, -.2] });
  if (t > tf) { const p = .6 + .4 * Math.sin(t * 6); c.save(); c.globalCompositeOperation = 'lighter'; glow(c, 760, 1000, 260 * p, '255,210,90', .8); c.restore(); c.strokeStyle = '#ffd166'; c.lineWidth = 8; c.setLineDash([14, 10]); c.lineDashOffset = -t * 40; c.beginPath(); c.ellipse(740, 1000, 170, 150, -.2, 0, TAU); c.stroke(); c.setLineDash([]); }
  // máscaras de personalidad orbitando
  if (t > wf('personalidad') - .3) [['😊', '#ffd166'], ['😠', '#ff5a72'], ['😐', '#9fd4ff']].forEach(([e, col], i) => { const a = t * 1.5 + i * 2.1, x = 540 + Math.cos(a) * 380, y = 1120 + Math.sin(a) * 300; c.save(); c.translate(x, y); c.fillStyle = col; c.beginPath(); c.arc(0, 0, 60, 0, TAU); c.fill();
    c.fillStyle = '#2a1a10'; c.beginPath(); c.arc(-20, -12, 8, 0, TAU); c.arc(20, -12, 8, 0, TAU); c.fill(); c.strokeStyle = '#2a1a10'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); i === 0 ? c.arc(0, 8, 22, .2, Math.PI - .2) : i === 1 ? c.arc(0, 34, 22, Math.PI + .3, -0.3) : (c.moveTo(-20, 20), c.lineTo(20, 20)); c.stroke(); c.restore(); });
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, tf, 'lóbulo frontal', W / 2, 650, '#ffd166', 27.0, 52);
});

// 6. El museo + la pregunta
scene(27.0, (c, t, lt) => {
  const tq = wf('te') > 30 ? wf('te') : 30.43;
  cam(c, lt, 8, [1.15, 540, 1150], [1.0, 540, 1150]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#14141c'], [1, '#2a2430']]); c.fillRect(-400, -400, W + 800, H + 800);
  for (let x = -300; x < W + 300; x += 200) { c.fillStyle = 'rgba(255,255,255,.03)'; c.fillRect(x, -300, 100, 2400); }
  c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createLinearGradient(540, 200, 540, 1500); g.addColorStop(0, 'rgba(255,240,200,.25)'); g.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(470, 200); c.lineTo(610, 200); c.lineTo(900, 1500); c.lineTo(180, 1500); c.fill(); c.restore();
  // pedestal y vitrina
  c.fillStyle = vgrad(c, 1420, 1900, [[0, '#3a3440'], [1, '#1a1620']]); c.fillRect(250, 1420, 580, 500); c.fillStyle = '#4a4450'; c.fillRect(230, 1400, 620, 40);
  skull(c, 470, 1250, 1.05);
  c.save(); c.translate(780, 1360); c.rotate(-1.35); c.fillStyle = '#4a4e58'; rrect(c, -10, -12, 560, 24, 12); c.fill(); c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(0, -8, 540, 5); c.restore();
  c.fillStyle = 'rgba(180,220,255,.08)'; c.fillRect(250, 760, 580, 640); c.strokeStyle = 'rgba(220,240,255,.6)'; c.lineWidth = 6; c.strokeRect(250, 760, 580, 640); c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.moveTo(270, 780); c.lineTo(400, 780); c.lineTo(270, 1100); c.fill();
  c.fillStyle = '#c8a050'; rrect(c, 380, 1540, 320, 90, 10); c.fill(); c.fillStyle = '#2a1a10'; c.font = '900 50px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('HARVARD', 540, 1588);
  motes(c, t, { n: 20, seed: 4, size: 8, a: .3 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (t > tq) { const a = eBack((t - tq) / .4); c.save(); c.translate(W / 2, 650); c.scale(a, a); c.font = '900 54px Nunito'; const l1 = '¿Te imaginas cambiar', l2 = 'de personalidad en un día?'; const w = Math.max(c.measureText(l1).width, c.measureText(l2).width) + 80; rrect(c, -w / 2, -80, w, 160, 40); c.fillStyle = 'rgba(14,13,18,.9)'; c.fill(); c.strokeStyle = '#ffd166'; c.lineWidth = 4; c.stroke(); c.fillStyle = '#ffd57e'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(l1, 0, -30); c.fillText(l2, 0, 34); c.restore(); }
  const fo = clamp((t - (END - .6)) / .6); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});
