// ---------- escenas: la canción que le paga millones ----------
END = 55.5;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
const wt = i => WORDS[i].s;

// fondo de cuarto acogedor de noche con ventana nevada
function cozyRoom(c, t, lt) {
  c.fillStyle = vgrad(c, -300, 1500, [[0, '#3a1e22'], [1, '#5a2e2a']]); c.fillRect(-400, -400, W + 800, H + 800);
  for (let x = -300; x < W + 300; x += 120) { c.fillStyle = 'rgba(255,200,160,.04)'; c.fillRect(x, -300, 60, 1900); c.fillStyle = 'rgba(0,0,0,.06)'; c.fillRect(x + 60, -300, 3, 1900); }
  // ventana
  c.fillStyle = '#2a1712'; rrect(c, 520, 380, 520, 640, 18); c.fill();
  c.save(); rrect(c, 545, 405, 470, 590, 10); c.clip();
  c.fillStyle = vgrad(c, 405, 995, [[0, '#0b1a3a'], [1, '#2b4a7a']]); c.fillRect(545, 405, 470, 590);
  glow(c, 640, 640, 120, '220,230,255', .6); c.fillStyle = '#eef2ff'; c.beginPath(); c.arc(640, 640, 34, 0, TAU); c.fill();
  c.fillStyle = '#1a2e50'; for (let i = 0; i < 6; i++) { const x = 560 + i * 85, h = 120 + hash(i) * 90; c.beginPath(); c.moveTo(x, 995); c.lineTo(x + 40, 995 - h); c.lineTo(x + 80, 995); c.fill(); }
  c.fillStyle = '#dfe8f5'; c.beginPath(); c.moveTo(545, 995); c.quadraticCurveTo(780, 900, 1015, 960); c.lineTo(1015, 995); c.fill();
  for (let i = 0; i < 40; i++) { const x = 545 + hash(i) * 470, y = 405 + ((hash(i * 2) * 590 + t * 60 * (.5 + hash(i * 3))) % 590); c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.arc(x + Math.sin(t + i) * 8, y, 2 + hash(i * 5) * 3, 0, TAU); c.fill(); }
  c.restore();
  c.fillStyle = '#2a1712'; c.fillRect(772, 405, 16, 590); c.fillRect(545, 692, 470, 16);
  c.fillStyle = 'rgba(255,255,255,.75)'; c.beginPath(); c.moveTo(545, 995); c.quadraticCurveTo(600, 960, 660, 985); c.quadraticCurveTo(720, 960, 790, 990); c.lineTo(790, 995); c.fill();
}

// 1. Gancho: el vinil girando
scene(0, (c, t, lt) => {
  cam(c, lt, 6, [1.0, 540, 1000], [1.18, 540, 1180], false);
  cozyRoom(c, t, lt);
  stringLights(c, t, -60, 1140, 250, 90, 16, 0);
  bokeh(c, t, 14, 3, .35);
  c.drawImage(B.wood, -160, 1250, 1400, 800);
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-160, 1250, 1400, 14);
  // tocadiscos
  c.save(); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 50; c.shadowOffsetY = 20;
  c.fillStyle = vgrad(c, 1150, 1720, [[0, '#7a4a28'], [1, '#4a2a14']]); rrect(c, 110, 1140, 860, 560, 40); c.fill(); c.restore();
  c.fillStyle = 'rgba(255,220,170,.25)'; rrect(c, 110, 1140, 860, 14, 8); c.fill();
  c.fillStyle = '#1a1a1e'; c.beginPath(); c.ellipse(500, 1420, 360, 250, 0, 0, TAU); c.fill();
  c.save(); c.translate(500, 1410); c.scale(1, .68); c.rotate(lt * 3.5); c.drawImage(B.vinyl, -340, -340, 680, 680); c.restore();
  c.save(); c.translate(500, 1410); c.scale(1, .68); vinylSheen(c, 0, 0, 340, .2); c.restore();
  // brazo
  c.save(); c.translate(880, 1220); c.fillStyle = '#c9ced6'; c.beginPath(); c.arc(0, 0, 40, 0, TAU); c.fill(); c.fillStyle = '#6a707a'; c.beginPath(); c.arc(0, 0, 18, 0, TAU); c.fill();
  c.rotate(2.25 + Math.sin(lt * 6) * .004); c.strokeStyle = '#d9dde3'; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 0); c.lineTo(300, 0); c.lineTo(330, 30); c.stroke(); c.fillStyle = '#2a2d34'; c.fillRect(310, 20, 50, 30); c.restore();
  c.fillStyle = '#c9ced6'; [[220, 1640], [300, 1640]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 18, 0, TAU); c.fill(); });
  // notas musicales que salen del disco
  for (let i = 0; i < 6; i++) { const ft = ((lt * .6 + i / 6) % 1); musicNote(c, 380 + i * 50 + Math.sin(ft * 6 + i) * 40, 1300 - ft * 520, .9, `rgba(255,236,190,${Math.sin(ft * Math.PI) * .9})`); }
  // monedas al decir "millones"
  for (let i = 0; i < 10; i++) { const ft = t - wt(7) - i * .05; if (ft < 0 || ft > 1.6) continue; const a = -Math.PI / 2 + (hash(i) - .5) * 2.2, v = 700 + hash(i * 3) * 400;
    const x = 500 + Math.cos(a) * v * ft, y = 1300 + Math.sin(a) * v * ft + 900 * ft * ft; c.save(); c.translate(x, y); c.scale(Math.abs(Math.cos(ft * 8 + i)) + .1, 1); c.drawImage(A.coin, -50, -50, 100, 100); c.restore(); }
  snow(c, t, 50, 1, { size: 7, a: .6 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(14), 5.9, '15', 'min');
});

// 2. 1994: la grabadora noventera
scene(5.95, (c, t, lt) => {
  cam(c, lt, 5.5, [1.0, 540, 1000], [1.08, 540, 1040]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#2b1055'], [.6, '#7b2f8f'], [1, '#d84f8a']]); c.fillRect(-400, -400, W + 800, H + 800);
  for (let i = 0; i < 26; i++) { const x = hash(i + 4) * W, y = hash(i * 2.2) * H + Math.sin(t + i) * 20, k = i % 4, col = ['#ffd166', '#4cc9f0', '#ff4fa3', '#4cd97b'][i % 4]; c.save(); c.globalAlpha = .55; c.translate(x, y); c.rotate(t * .4 + i);
    if (k === 0) { c.fillStyle = col; c.beginPath(); c.moveTo(0, -26); c.lineTo(24, 18); c.lineTo(-24, 18); c.fill(); }
    if (k === 1) { c.strokeStyle = col; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); for (let j = 0; j < 5; j++) c.lineTo(-40 + j * 20, j % 2 ? 14 : -14); c.stroke(); }
    if (k === 2) { c.fillStyle = col; c.beginPath(); c.arc(0, 0, 14, 0, TAU); c.fill(); }
    if (k === 3) { c.strokeStyle = col; c.lineWidth = 7; c.strokeRect(-18, -18, 36, 36); }
    c.restore(); }
  // grabadora con "bombeo" al ritmo
  const beat = Math.pow(Math.max(0, Math.sin(lt * Math.PI * 100 / 60 * 2)), 8);
  c.save(); c.translate(540, 1300); c.rotate(Math.sin(lt * 2) * .02); c.scale(1 + beat * .015, 1 + beat * .015);
  c.shadowColor = 'rgba(20,0,40,.6)'; c.shadowBlur = 60; c.shadowOffsetY = 30; c.drawImage(B.boom, -490, -320); c.shadowColor = 'transparent';
  B.boomSpk.forEach(([x, y]) => { const s = 1 + beat * .08; c.save(); c.translate(x - 490, y - 320); c.scale(s, s);
    for (let k = 5; k >= 1; k--) { c.fillStyle = k % 2 ? '#2a2d34' : '#3a3e48'; c.beginPath(); c.arc(0, 0, k * 22, 0, TAU); c.fill(); }
    c.fillStyle = vgrad(c, -25, 25, [[0, '#9aa0aa'], [1, '#3a3e48']]); c.beginPath(); c.arc(0, 0, 25, 0, TAU); c.fill(); c.restore(); });
  [[450 - 490 + 15, 388 - 320], [530 - 490 - 15, 388 - 320]].forEach(([x, y]) => { c.save(); c.translate(x, y); c.rotate(lt * 6); c.fillStyle = '#f2e6cc'; c.beginPath(); c.arc(0, 0, 11, 0, TAU); c.fill(); c.fillStyle = '#3a3a40'; for (let k = 0; k < 6; k++) { c.rotate(TAU / 6); c.fillRect(-2, 4, 4, 6); } c.restore(); });
  c.restore();
  for (let i = 0; i < 8; i++) { const ft = ((lt * .5 + i / 8) % 1), side = i % 2 ? 1 : -1; musicNote(c, 540 + side * (300 + ft * 200), 1150 - ft * 600, .8 + hash(i) * .5, `rgba(255,255,255,${Math.sin(ft * Math.PI) * .85})`); }
  motes(c, t, { n: 24, seed: 3, size: 12, a: .4, spr: A.dotPink });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(25), 11.4, '1994', '');
});

// 3. Grabada en pleno verano: estudio con sol afuera y Navidad adentro
scene(11.45, (c, t, lt) => {
  cam(c, lt, 8, [1.05, 540, 1060], [1.12, 560, 1080]);
  const lightsOn = ss(wt(44), wt(44) + .6, t), treeOn = ss(wt(47), wt(47) + .4, t);
  c.fillStyle = vgrad(c, -300, 1500, [[0, '#2b2a33'], [1, '#3c3a44']]); c.fillRect(-400, -400, W + 800, H + 800);
  // paneles acústicos
  for (let y = -200; y < 1500; y += 110) for (let x = -300; x < W + 300; x += 110) { const flip = ((x + y) / 110) % 2 === 0; c.fillStyle = '#34323c'; c.fillRect(x + 4, y + 4, 102, 102);
    for (let k = 0; k < 5; k++) { c.fillStyle = k % 2 ? 'rgba(0,0,0,.18)' : 'rgba(255,255,255,.04)'; if (flip) c.fillRect(x + 4 + k * 20, y + 4, 20, 102); else c.fillRect(x + 4, y + 4 + k * 20, 102, 20); } }
  // ventana de verano
  c.fillStyle = '#1e1d24'; rrect(c, 40, 520, 460, 560, 16); c.fill();
  c.save(); c.translate(-20, 160); rrect(c, 80, 380, 420, 520, 8); c.clip();
  c.fillStyle = vgrad(c, 380, 900, [[0, '#2f8fe0'], [1, '#bfe6ff']]); c.fillRect(80, 380, 420, 520);
  const sp = 1 + Math.sin(t * 3) * .05 + (t > wt(37) && t < wt(37) + .6 ? .25 * Math.sin((t - wt(37)) / .6 * Math.PI) : 0);
  c.save(); c.globalCompositeOperation = 'lighter'; c.translate(380, 500); c.rotate(t * .3); for (let k = 0; k < 12; k++) { c.rotate(TAU / 12); c.fillStyle = 'rgba(255,230,120,.18)'; c.beginPath(); c.moveTo(0, 0); c.lineTo(400, -30); c.lineTo(400, 30); c.fill(); } c.restore();
  glow(c, 380, 500, 200 * sp, '255,220,100', .9); c.fillStyle = '#fff3a0'; c.beginPath(); c.arc(380, 500, 60 * sp, 0, TAU); c.fill();
  c.fillStyle = '#4a8a3a'; c.beginPath(); c.moveTo(80, 900); c.quadraticCurveTo(300, 780, 500, 860); c.lineTo(500, 900); c.fill();
  c.strokeStyle = '#6a4a2a'; c.lineWidth = 12; c.beginPath(); c.moveTo(170, 900); c.quadraticCurveTo(160, 760, 190, 690); c.stroke();
  c.fillStyle = '#3f9a4a'; for (let k = 0; k < 6; k++) { c.save(); c.translate(190, 690); c.rotate(-2.6 + k * .55); c.beginPath(); c.ellipse(60, 0, 70, 16, 0, 0, TAU); c.fill(); c.restore(); }
  // calor ondulante
  c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 3; for (let k = 0; k < 4; k++) { c.beginPath(); for (let x = 90; x < 500; x += 10) c.lineTo(x, 820 - k * 40 + Math.sin(x * .05 + t * 6 + k) * 6); c.stroke(); }
  c.restore(); c.fillStyle = '#1e1d24'; c.fillRect(262, 540, 16, 520);
  // termómetro
  c.save(); c.translate(560, 900); c.fillStyle = '#eee'; rrect(c, -16, -120, 32, 220, 16); c.fill(); c.fillStyle = '#e8343f'; const lev = 60 + 120 * ss(wt(37), wt(38) + .3, t); c.fillRect(-7, 80 - lev, 14, lev); c.beginPath(); c.arc(0, 92, 24, 0, TAU); c.fill(); c.restore();
  // piso
  c.drawImage(B.wood, -200, 1480, 1500, 700); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-200, 1480, 1500, 12);
  // árbol
  c.save(); c.globalAlpha = .45 + .55 * treeOn; c.translate(820, 1530); const tb = treeOn ? eBack(clamp((t - wt(47)) / .45)) : 1; c.scale(.95 * (.9 + .1 * tb), .95 * (.9 + .1 * tb)); c.drawImage(B.tree, -350, -980);
  B.treeBalls.forEach(([x, y, col], i) => { const on = treeOn * (.5 + .5 * Math.sin(t * 5 + i * 1.3)); if (on < .05) return; c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = on * .8; c.drawImage(B.dots[i % 6], x - 350 - 34, y - 980 - 34, 68, 68); c.restore(); });
  if (treeOn > 0) { c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = treeOn; glow(c, 0, -880, 120, '255,220,90', .9); c.restore(); }
  drawStar(c, 0, -870, 56, treeOn > .5 ? '#ffd84a' : '#8a7a40'); c.restore();
  // micrófono con pie y filtro
  c.save(); c.translate(430, 1500); c.strokeStyle = '#1a1a1e'; c.lineWidth = 16; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -520); c.moveTo(-110, 0); c.lineTo(0, -60); c.lineTo(110, 0); c.stroke();
  c.drawImage(B.mic, -105, -930, 210, 532);
  c.strokeStyle = '#1a1a1e'; c.lineWidth = 8; c.beginPath(); c.moveTo(60, -760); c.lineTo(150, -760); c.stroke(); c.fillStyle = 'rgba(30,30,40,.55)'; c.beginPath(); c.ellipse(180, -760, 22, 95, 0, 0, TAU); c.fill(); c.strokeStyle = '#111'; c.lineWidth = 6; c.stroke(); c.restore();
  // ventilador
  c.save(); c.translate(150, 1440); c.fillStyle = '#d6dbe2'; c.fillRect(-10, 0, 20, 120); c.fillRect(-70, 110, 140, 20); c.translate(0, -60);
  c.strokeStyle = '#d6dbe2'; c.lineWidth = 4; c.beginPath(); c.arc(0, 0, 85, 0, TAU); c.stroke(); c.rotate(t * 22); c.fillStyle = 'rgba(160,200,230,.7)'; for (let k = 0; k < 3; k++) { c.rotate(TAU / 3); c.beginPath(); c.ellipse(42, 0, 40, 18, 0, 0, TAU); c.fill(); } c.restore();
  // series de luces que se prenden
  stringLights(c, t, -60, 1140, 230, 110, 18, 2, lightsOn);
  stringLights(c, t, 520, 1140, 1000, 60, 9, 4, lightsOn);
  c.save(); c.globalAlpha = .35 * lightsOn; bokeh(c, t, 12, 9, .8); c.restore();
  c.setTransform(1, 0, 0, 1, 0, 0);
  iconPill(c, t, wt(37) - .05, 15.0, W / 2, 640, 100, (c, lt) => { const s = 1 + Math.sin(lt * 6) * .05; c.scale(s, s); glow(c, 0, 0, 80, '255,210,90', .8); c.fillStyle = '#ffd84a'; c.beginPath(); c.arc(0, 0, 34, 0, TAU); c.fill(); c.strokeStyle = '#ffd84a'; c.lineWidth = 8; c.lineCap = 'round'; for (let k = 0; k < 8; k++) { const a = k / 8 * TAU + lt; c.beginPath(); c.moveTo(Math.cos(a) * 48, Math.sin(a) * 48); c.lineTo(Math.cos(a) * 66, Math.sin(a) * 66); c.stroke(); } });
});

// 4. Cada diciembre regresa: calendario + gráfica
scene(19.45, (c, t, lt) => {
  cam(c, lt, 6.4, [1.0, 540, 1000], [1.06, 540, 1020]);
  const g = c.createRadialGradient(540, 900, 50, 540, 900, 1300); g.addColorStop(0, '#173a2e'); g.addColorStop(1, '#07140f'); c.fillStyle = g; c.fillRect(-400, -400, W + 800, H + 800);
  c.strokeStyle = 'rgba(150,255,200,.06)'; c.lineWidth = 2; for (let x = -300; x < W + 300; x += 60) { c.beginPath(); c.moveTo(x, -300); c.lineTo(x, H + 300); c.stroke(); } for (let y = -300; y < H + 300; y += 60) { c.beginPath(); c.moveTo(-300, y); c.lineTo(W + 300, y); c.stroke(); }
  // calendario
  const fs = t > wt(60) ? clamp((t - wt(60)) / 3.2) : 0; const yr = Math.floor(1995 + fs * 23), fl = (fs * 23) % 1;
  c.save(); c.translate(540, 760); c.rotate(-.04);
  c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 40; c.shadowOffsetY = 18; c.fillStyle = '#f7f2e8'; rrect(c, -230, -170, 460, 400, 26); c.fill(); c.shadowColor = 'transparent';
  c.fillStyle = '#c8202a'; rrect(c, -230, -170, 460, 110, 26); c.fill(); c.fillRect(-230, -90, 460, 30);
  c.fillStyle = '#fff'; c.font = '900 64px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('DIC', 0, -110);
  c.fillStyle = '#2a2a30'; c.font = '900 150px Nunito'; c.fillText(String(fs > 0 ? yr : 1994), 0, 70);
  c.fillStyle = '#c8202a'; c.font = '800 34px Nunito'; c.fillText('★ 25 ★', 0, 185);
  for (let k = 0; k < 6; k++) { c.fillStyle = '#9aa0aa'; rrect(c, -180 + k * 70, -195, 16, 50, 8); c.fill(); }
  if (fs > 0 && fs < 1) { c.save(); c.translate(0, -60); c.scale(1, Math.cos(fl * Math.PI)); c.fillStyle = 'rgba(240,232,215,.95)'; c.fillRect(-230, 0, 460, 290); c.restore(); }
  c.restore();
  // gráfica de popularidad: picos cada diciembre
  const gx0 = 90, gx1 = 990, gy = 1640, gh = 420; c.strokeStyle = 'rgba(200,255,220,.5)'; c.lineWidth = 4; c.beginPath(); c.moveTo(gx0, gy - gh); c.lineTo(gx0, gy); c.lineTo(gx1, gy); c.stroke();
  const prog = clamp((t - wt(55)) / 4.5); const N = 240;
  c.save(); c.shadowColor = 'rgba(80,255,150,.8)'; c.shadowBlur = 20; c.strokeStyle = '#5cff9a'; c.lineWidth = 7; c.lineJoin = 'round'; c.beginPath();
  for (let i = 0; i <= N * prog; i++) { const u = i / N, yrs = u * 10, ph = yrs % 1; const peak = Math.exp(-Math.pow((ph - .95) / .04, 2)) + Math.exp(-Math.pow((ph + .05) / .04, 2)); const h = .08 + peak * (.35 + yrs * .065); c.lineTo(lerp(gx0, gx1, u), gy - h * gh); } c.stroke(); c.restore();
  for (let k = 0; k < 10; k++) { const u = (k + .95) / 10; if (u > prog) continue; const x = lerp(gx0, gx1, u), h = (.43 + (k + .95) * .065) * gh; const a = eBack((prog - u) * 8);
    c.save(); c.translate(x, gy - h - 40); c.scale(a, a); drawStar(c, 0, 0, 22, '#ffd84a'); c.restore(); }
  c.fillStyle = 'rgba(200,255,220,.7)'; c.font = '800 30px Nunito'; c.textAlign = 'center'; c.fillText('DIC', gx1 - 40, gy + 40); c.fillText('DIC', gx0 + 90, gy + 40);
  snow(c, t, 30, 4, { size: 6, a: .4 });
  c.setTransform(1, 0, 0, 1, 0, 0);
});

// 5. 2019: número uno, 25 años después
scene(25.8, (c, t, lt) => {
  cam(c, lt, 5.6, [1.0, 540, 1050], [1.1, 540, 1060]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#120822'], [.6, '#2a0f3a'], [1, '#4a1430']]); c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalCompositeOperation = 'lighter'; [[-50, .5], [1130, -.5], [540, 0]].forEach(([bx, ph], i) => { const a = -Math.PI / 2 + Math.sin(t * 1.1 + i * 2) * .35 + ph * .6; c.save(); c.translate(bx, 1750); c.rotate(a); const g = c.createLinearGradient(0, 0, 1700, 0); g.addColorStop(0, 'rgba(255,230,170,.3)'); g.addColorStop(1, 'rgba(255,230,170,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(0, 0); c.lineTo(1700, -200); c.lineTo(1700, 200); c.fill(); c.restore(); }); c.restore();
  bokeh(c, t, 16, 21, .4);
  // escenario
  c.fillStyle = '#1a0c18'; c.fillRect(-300, 1560, W + 600, 700); c.fillStyle = vgrad(c, 1500, 1600, [[0, '#8a1a2a'], [1, '#4a0c18']]); c.beginPath(); c.ellipse(540, 1560, 420, 70, 0, 0, TAU); c.fill();
  c.fillStyle = '#e9b949'; c.beginPath(); c.ellipse(540, 1540, 420, 70, 0, 0, TAU); c.fill(); c.fillStyle = '#c8202a'; c.beginPath(); c.ellipse(540, 1540, 395, 58, 0, 0, TAU); c.fill();
  // trofeo que sube
  const up = eOut((t - wt(66)) / .8); if (t > wt(66)) { c.save(); c.translate(540, lerp(1900, 1545, up)); const s = .9 + .04 * Math.sin(t * 3); c.scale(s, s);
    glow(c, 0, -480, 420, '255,210,110', .6 * up); c.drawImage(B.trophy, -300, -860); c.restore(); }
  // brillos
  if (t > wt(77)) for (let i = 0; i < 12; i++) { const tt = (t - wt(77) - i * .1) % 1.2; if (tt < 0) continue; const a = hash(i + 7) * TAU, d = 260 + hash(i) * 200, s = Math.sin(tt / 1.2 * Math.PI) * (24 + hash(i * 2) * 20);
    c.save(); c.translate(540 + Math.cos(a) * d, 1150 + Math.sin(a) * d * .9); c.rotate(t * 2 + i); drawStar(c, 0, 0, s, '#fff3c4', 4); c.restore(); }
  // confeti
  const cf = t - wt(76); if (cf > 0) for (let i = 0; i < 90; i++) { const a = -Math.PI / 2 + (hash(i) - .5) * 1.8, v = 900 + hash(i * 2) * 900, x = 540 + Math.cos(a) * v * cf * .8 + Math.sin(cf * 3 + i) * 30, y = 1500 + Math.sin(a) * v * cf + 700 * cf * cf;
    c.save(); c.translate(x, y); c.rotate(cf * 6 + i); c.scale(1, Math.cos(cf * 8 + i)); c.fillStyle = XCOLS[i % 6]; c.fillRect(-10, -6, 20, 12); c.restore(); }
  snow(c, t, 25, 8, { size: 6, a: .35 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(67), wt(70) - .15, '2019', '');
  badge(c, t, wt(70), 31.3, '25', 'años');
});

// 6. Mil millones de reproducciones
scene(31.4, (c, t, lt) => {
  cam(c, lt, 5.2, [1.0, 540, 1000], [1.07, 540, 1020]);
  const g = c.createRadialGradient(540, 1100, 50, 540, 1100, 1300); g.addColorStop(0, '#1d5a3c'); g.addColorStop(1, '#06120c'); c.fillStyle = g; c.fillRect(-400, -400, W + 800, H + 800);
  // ondas de sonido
  c.save(); c.globalCompositeOperation = 'lighter'; for (let k = 0; k < 6; k++) { const ph = (lt * .5 + k / 6) % 1; c.strokeStyle = `rgba(110,255,170,${(1 - ph) * .25})`; c.lineWidth = 6; c.beginPath(); c.arc(540, 1150, 150 + ph * 700, 0, TAU); c.stroke(); } c.restore();
  // audífonos alrededor de un botón de play
  c.save(); c.translate(540, 1150); const pul = 1 + Math.pow(Math.max(0, Math.sin(lt * 5.2)), 6) * .06; c.scale(pul, pul);
  c.strokeStyle = '#e8ecf2'; c.lineWidth = 34; c.lineCap = 'round'; c.beginPath(); c.arc(0, 0, 250, Math.PI * 1.08, Math.PI * 1.92); c.stroke();
  [[-1], [1]].forEach(([sd]) => { c.fillStyle = vgrad(c, -40, 160, [[0, '#ff4d5e'], [1, '#a8141c']]); rrect(c, sd * 250 - 60, -20, 120, 200, 50); c.fill(); c.fillStyle = 'rgba(255,255,255,.3)'; rrect(c, sd * 250 - 40, 0, 24, 140, 12); c.fill(); });
  c.fillStyle = '#2ecc71'; c.beginPath(); c.arc(0, 60, 130, 0, TAU); c.fill(); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-40, -5); c.lineTo(65, 60); c.lineTo(-40, 125); c.closePath(); c.fill(); c.restore();
  // contador tipo odómetro
  const p = eInOut(clamp((t - wt(81)) / (wt(88) + .4 - wt(81)))); const val = Math.floor(p * 1e9); const str = val.toLocaleString('en-US');
  c.save(); c.translate(540, 1560); c.font = '900 92px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; const tw = c.measureText('1,000,000,000').width + 80;
  rrect(c, -tw / 2, -80, tw, 160, 30); c.fillStyle = 'rgba(8,16,12,.85)'; c.fill(); c.strokeStyle = 'rgba(110,255,170,.4)'; c.lineWidth = 4; c.stroke();
  c.fillStyle = p >= 1 ? '#ffd57e' : '#e8fff0'; c.shadowColor = p >= 1 ? 'rgba(255,190,90,.7)' : 'rgba(110,255,170,.6)'; c.shadowBlur = 24; c.fillText(str, 0, 6); c.restore();
  c.fillStyle = 'rgba(220,255,235,.75)'; c.font = '800 40px Nunito'; c.textAlign = 'center'; c.fillText('reproducciones', 540, 1690);
  for (let i = 0; i < 10; i++) { const ft = ((lt * .45 + i / 10) % 1); musicNote(c, 120 + hash(i) * 840, 1500 - ft * 900, .7, `rgba(180,255,210,${Math.sin(ft * Math.PI) * .6})`); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(87), 36.5, '1,000', 'millones');
});

// 7. Esfera de nieve llena de monedas
scene(36.6, (c, t, lt) => {
  cam(c, lt, 4.6, [1.0, 540, 1000], [1.1, 540, 1060]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#0e1430'], [.6, '#2a2050'], [1, '#4a2a40']]); c.fillRect(-400, -400, W + 800, H + 800);
  bokeh(c, t, 18, 31, .45);
  c.drawImage(B.wood, -200, 1640, 1500, 600);
  const cx = 540, cy = 1170, R = 360;
  c.save(); c.translate(0, 0); c.drawImage(B.globe, cx - 400, cy - 310, 800, 900); c.restore();
  c.save(); c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.clip();
  c.fillStyle = vgrad(c, cy - R, cy + R, [[0, 'rgba(120,170,230,.35)'], [1, 'rgba(40,60,120,.55)']]); c.fillRect(cx - R, cy - R, R * 2, R * 2);
  c.fillStyle = '#eef3fa'; c.beginPath(); c.ellipse(cx, cy + 300, 330, 90, 0, 0, TAU); c.fill();
  // casita
  c.fillStyle = '#b8322e'; c.fillRect(cx - 120, cy + 120, 200, 150); c.fillStyle = '#5a2a24'; c.beginPath(); c.moveTo(cx - 145, cy + 125); c.lineTo(cx - 20, cy + 30); c.lineTo(cx + 105, cy + 125); c.fill();
  c.fillStyle = '#eef3fa'; c.beginPath(); c.moveTo(cx - 150, cy + 128); c.lineTo(cx - 20, cy + 25); c.lineTo(cx + 110, cy + 128); c.lineTo(cx + 90, cy + 112); c.lineTo(cx - 20, cy + 45); c.lineTo(cx - 130, cy + 112); c.fill();
  c.fillStyle = '#ffd98a'; c.fillRect(cx - 90, cy + 160, 50, 50); glow(c, cx - 65, cy + 185, 70, '255,210,120', .6); c.fillStyle = '#3a1612'; c.fillRect(cx + 10, cy + 180, 45, 90);
  c.save(); c.translate(cx + 190, cy + 300); c.scale(.32, .32); c.drawImage(B.tree, -350, -980); c.restore();
  // monedas girando como nieve
  for (let i = 0; i < 38; i++) { const a = hash(i) * TAU + lt * (.6 + hash(i * 2) * .8) * (i % 2 ? 1 : -1), rr = 60 + hash(i * 3) * 260; const x = cx + Math.cos(a) * rr, y = cy - 40 + Math.sin(a) * rr * .7 + Math.sin(lt * 2 + i) * 20;
    const sp = Math.cos(lt * 6 + i); c.save(); c.translate(x, y); c.scale(Math.max(.15, Math.abs(sp)) * .55, .55); c.drawImage(A.coin, -55, -55, 110, 110); c.restore(); }
  c.restore();
  c.save(); c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 6; c.stroke();
  c.fillStyle = 'rgba(255,255,255,.22)'; c.beginPath(); c.ellipse(cx - 170, cy - 170, 70, 150, -.7, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.ellipse(cx - 210, cy - 200, 16, 50, -.7, 0, TAU); c.fill(); c.restore();
  snow(c, t, 40, 12, { size: 6, a: .5 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wt(100), 41.1, '$2.5', 'millones/año');
});

// 8. "Se descongela": bloque de hielo con el micrófono
scene(41.15, (c, t, lt) => {
  shake(c, t, wt(120), 14, .6); cam(c, lt, 4.3, [1.0, 540, 1050], [1.14, 540, 1080]);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#06152c'], [.6, '#103a5c'], [1, '#2a6a8a']]); c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalCompositeOperation = 'lighter'; for (let i = 0; i < 5; i++) { c.strokeStyle = `rgba(${i % 2 ? '120,255,200' : '140,170,255'},.08)`; c.lineWidth = 60; c.beginPath(); for (let x = -300; x < W + 300; x += 30) c.lineTo(x, 300 + i * 60 + Math.sin(x * .004 + t * .6 + i) * 80); c.stroke(); } c.restore();
  stars(c, t, 50, 5, 900, .6);
  c.fillStyle = '#e8f2fb'; c.beginPath(); c.moveTo(-300, 1600); c.quadraticCurveTo(540, 1500, 1380, 1600); c.lineTo(1380, 2300); c.lineTo(-300, 2300); c.fill();
  glow(c, 540, 1150, 500, '150,210,255', .4);
  // micrófono dentro del hielo
  c.save(); c.translate(540, 1150); c.globalAlpha = .9; c.drawImage(B.mic, -105, -250, 210, 532); c.restore();
  c.save(); c.translate(540, 1150); const melt = ss(wt(118), wt(120) + .8, t); c.drawImage(B.ice, -320, -380 + melt * 10, 640, 760 - melt * 10);
  // grietas
  const ck = clamp((t - wt(119)) / 1.0); c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 5; c.lineJoin = 'round';
  for (let k = 0; k < 7; k++) { const a = k / 7 * TAU + .3; c.beginPath(); c.moveTo(0, -40); let x = 0, y = -40; const segs = Math.floor(6 * ck); for (let s = 0; s < segs; s++) { x += Math.cos(a + (hash(k * 10 + s) - .5)) * 45; y += Math.sin(a + (hash(k * 10 + s) - .5)) * 45; c.lineTo(x, y); } c.stroke(); }
  // gotas que caen
  for (let i = 0; i < 10; i++) { const ft = (lt * .9 + hash(i)) % 1; if (melt < .05) break; const x = -260 + hash(i * 3) * 520; c.fillStyle = `rgba(200,235,255,${.9 * melt})`; c.beginPath(); c.ellipse(x, 370 + ft * 120, 8, 12, 0, 0, TAU); c.fill(); }
  // carámbanos
  c.fillStyle = 'rgba(230,248,255,.9)'; for (let i = 0; i < 9; i++) { const x = -270 + i * 66, h = 40 + hash(i) * 60 - melt * 20; c.beginPath(); c.moveTo(x - 14, 370); c.lineTo(x + 14, 370); c.lineTo(x, 370 + h); c.fill(); }
  c.restore();
  // charco
  c.fillStyle = `rgba(160,210,250,${.5 * melt})`; c.beginPath(); c.ellipse(540, 1560, 380 * (.5 + melt * .6), 50, 0, 0, TAU); c.fill();
  snow(c, t, 50, 15, { size: 6, a: .6 });
  c.setTransform(1, 0, 0, 1, 0, 0);
  iconPill(c, t, wt(110), 45.3, W / 2, 640, 110, (c, lt) => { c.fillStyle = '#f7f2e8'; rrect(c, -70, -70, 140, 140, 18); c.fill(); c.fillStyle = '#c8202a'; rrect(c, -70, -70, 140, 42, 18); c.fill(); c.fillRect(-70, -40, 140, 12);
    c.fillStyle = '#fff'; c.font = '900 28px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('NOV', 0, -48); c.fillStyle = '#2a2a30'; c.font = '900 76px Nunito'; c.fillText('1', 0, 22); });
});

// 9. El hielo estalla: "Mariah empieza a cobrar"
scene(45.45, (c, t, lt) => {
  const tb = 45.6, tk = wt(140);
  shake(c, t, tb, 30, .5); shake(c, t, tk, 18, .4); cam(c, lt, 10, [1.08, 540, 1050], [1.0, 540, 1000]);
  const on = ss(tb, tb + .5, t);
  c.fillStyle = vgrad(c, -300, 2200, [[0, '#1a0a1e'], [.6, '#4a1430'], [1, '#7a2030']]); c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalAlpha = on; bokeh(c, t, 26, 41, .55); c.restore();
  for (let k = 0; k < 4; k++) stringLights(c, t, -80, 1160, 180 + k * 150, 70 + k * 10, 14, k * 2, on);
  c.fillStyle = '#e8f2fb'; c.beginPath(); c.moveTo(-300, 1600); c.quadraticCurveTo(540, 1500, 1380, 1600); c.lineTo(1380, 2300); c.lineTo(-300, 2300); c.fill();
  // árboles a los lados
  c.save(); c.translate(130, 1640); c.scale(.6, .6); c.drawImage(B.tree, -350, -980); c.restore(); c.save(); c.translate(950, 1640); c.scale(.6, .6); c.drawImage(B.tree, -350, -980); c.restore();
  // micrófono con luz
  c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = .6 * on; const g = c.createLinearGradient(540, 0, 540, 1500); g.addColorStop(0, 'rgba(255,240,200,.0)'); g.addColorStop(1, 'rgba(255,240,200,.35)'); c.fillStyle = g; c.beginPath(); c.moveTo(440, -300); c.lineTo(640, -300); c.lineTo(900, 1580); c.lineTo(180, 1580); c.fill(); c.restore();
  glow(c, 540, 1050, 420, '255,200,140', .5 * on);
  const fl = Math.sin(t * 2) * 12; c.save(); c.translate(540, 1080 + fl); c.rotate(Math.sin(t * 1.5) * .04); c.drawImage(B.mic, -105, -250, 210, 532); c.restore();
  // fragmentos de hielo
  const st = t - tb; if (st > -.05 && st < 1.6) for (let i = 0; i < 30; i++) { const a = hash(i) * TAU, v = 600 + hash(i * 2) * 900, x = 540 + Math.cos(a) * v * st, y = 1080 + Math.sin(a) * v * st + 1300 * st * st, s = 20 + hash(i * 3) * 50;
    c.save(); c.translate(x, y); c.rotate(st * 8 * (hash(i) - .5)); c.globalAlpha = 1 - clamp((st - 1) / .6); c.fillStyle = 'rgba(200,235,255,.85)'; c.beginPath(); c.moveTo(0, -s); c.lineTo(s * .7, s * .4); c.lineTo(-s * .6, s * .6); c.fill(); c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 2; c.stroke(); c.restore(); }
  sparks(c, t, tb, 540, 1080, 22, 3, '200,235,255');
  // "a cobrar": explosión de monedas
  const ct = t - tk; if (ct > 0) for (let i = 0; i < 40; i++) { const a = -Math.PI / 2 + (hash(i + 9) - .5) * 2.6, v = 900 + hash(i * 4) * 900; const x = 540 + Math.cos(a) * v * ct, y = 900 + Math.sin(a) * v * ct + 1500 * ct * ct; if (y > H + 200) continue;
    c.save(); c.translate(x, y); c.scale(Math.max(.15, Math.abs(Math.cos(ct * 9 + i))), 1); c.drawImage(A.coin, -50, -50, 100, 100); c.restore(); }
  sparks(c, t, tk, 540, 900, 18, 8, '255,220,120');
  snow(c, t, 60, 19, { size: 7, a: .7 });
  c.setTransform(1, 0, 0, 1, 0, 0); flash(c, t, tb, .25, '220,240,255'); flash(c, t, tk, .18, '255,230,160');
  badge(c, t, tk + .05, 52.9, '$$$', '');
  const fo = clamp((t - (END - .7)) / .7); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});
