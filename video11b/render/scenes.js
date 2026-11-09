// ---------- La Mansión VIP: el dinero detrás del voto (estilo clásico) ----------
END = 44.5;
const SC = [];
function scene(t0, draw) { SC.push({ t0, draw }); }
function wf(word, n = 0) { let k = 0; for (const w of WORDS) { if (w.w.toLowerCase().replace(/[^a-záéíóúñü0-9]/g, '') === word) { if (k === n) return w.s; k++; } } throw new Error('no ' + word); }
function lab(c, t, t0, txt, x, y, col = '#ffd166', t1 = 1e9, size = 46) { if (t < t0 || t > t1 + .3) return; const a = eBack((t - t0) / .4) * (t > t1 ? 1 - clamp((t - t1) / .3) : 1); c.save(); c.translate(x, y); c.scale(a, a); c.font = `800 ${size}px Nunito`; const w = c.measureText(txt).width + 54; rrect(c, -w / 2, -size * .76, w, size * 1.52, size * .76); c.fillStyle = 'rgba(14,13,18,.88)'; c.fill(); c.strokeStyle = col; c.lineWidth = 4; c.stroke(); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 2); c.restore(); }
function coinRain(c, t, t0, n = 30, seed = 1) { const lt = t - t0; if (lt < 0) return; for (let i = 0; i < n; i++) { const st = hash(i * 1.9 + seed) * 2, ft = lt - st; if (ft < 0) continue; const x = hash(i * 4.1 + seed) * W, y = -100 + ft * (900 + hash(i) * 500); if (y > H + 100) continue; c.save(); c.translate(x, y); c.rotate(ft * 2 * (hash(i) - .5)); c.scale(Math.max(.15, Math.abs(Math.cos(ft * 7 + i))), 1); c.drawImage(A.coin, -50, -50, 100, 100); c.restore(); } }
function balance(c, x, y, s, k, t) { c.save(); c.translate(x, y); c.scale(s, s); const tilt = lerp(0, .32, k) + Math.sin(t * 3) * .02 * (1 - k);
  c.fillStyle = vgrad(c, -40, 300, [[0, '#ffe08a'], [1, '#a8781e']]); c.fillRect(-14, -20, 28, 320); rrect(c, -120, 290, 240, 30, 12); c.fill();
  c.save(); c.rotate(tilt); c.fillStyle = '#e8b440'; rrect(c, -360, -30, 720, 22, 10); c.fill();
  [[-330, -1], [330, 1]].forEach(([px, sd]) => { c.save(); c.translate(px, -20); c.rotate(-tilt); c.strokeStyle = '#c8902a'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.lineTo(-90, 160); c.moveTo(0, 0); c.lineTo(90, 160); c.stroke(); c.fillStyle = vgrad(c, 150, 190, [[0, '#ffe08a'], [1, '#a8781e']]); c.beginPath(); c.ellipse(0, 165, 120, 26, 0, 0, Math.PI); c.fill();
    if (sd < 0) { c.fillStyle = '#ff3b5c'; c.beginPath(); c.moveTo(0, 150); c.bezierCurveTo(-80, 100, -40, 40, 0, 80); c.bezierCurveTo(40, 40, 80, 100, 0, 150); c.fill(); }
    else for (let q = 0; q < 9; q++) c.drawImage(A.coin, -100 + (q % 4) * 50, 120 - Math.floor(q / 4) * 40, 70, 70);
    c.restore(); });
  c.restore(); c.restore(); }

// 1. Gancho: la balanza
scene(0, (c, t, lt) => {
  const tk = wf('gana', 1) - .1, k = ss(tk, tk + .7, t);
  shake(c, t, tk + .5, 14, .3); cam(c, lt, 4.8, [1.05, 540, 1100], [1.12, 540, 1120], false);
  mansionDusk(c, t);
  c.fillStyle = 'rgba(10,5,30,.35)'; c.fillRect(-400, -400, W + 800, H + 800);
  balance(c, 540, 1100, 1.1, k, t);
  if (k > .5) { coinRain(c, t, tk + .5, 18, 3); sparks(c, t, tk + .6, 900, 1180, 14, 2, '255,220,120'); }
  c.setTransform(1, 0, 0, 1, 0, 0);
  lab(c, t, wf('querido') - .2, 'el más querido', 300, 600, '#ff5a7a', tk + .4);
  if (t > tk + .3) { const a = eBack((t - tk - .3) / .35); c.save(); c.translate(W / 2, 600); c.scale(a, a); c.rotate(-.05); c.font = '900 76px Nunito'; const w = c.measureText('GANA EL DINERO').width + 70; rrect(c, -w / 2, -60, w, 120, 40); c.fillStyle = '#ffd166'; c.fill(); c.fillStyle = '#4a2a00'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('GANA EL DINERO', 0, 6); c.restore(); }
});

// 2. La Mansión VIP y los 16 famosos
scene(4.8, (c, t, lt) => {
  const spot = [['Doña Alegría', wf('doña')], ['Karely Ruiz', wf('karely')], ['Bellakath', wf('bellakath')], ['Dani Flow', wf('dani')]];
  let cur = null; spot.forEach(([n, ts]) => { if (t > ts - .1) cur = n; }); if (t > wf('encerrados') - .1) cur = null;
  const rowBack = ['Odette Orlena', 'Abel Robles', 'Edwin Mendoza', 'Rod Contreras', 'Cintia Cossio', 'JLexis', 'João Ferreira', 'La Cukis'];
  const rowFront = ['Paolita Suárez', 'Doña Alegría', 'Karely Ruiz', 'Tony Aguirre', 'Bellakath', 'Dani Flow', 'Itatí López', 'Jorjais'];
  const pos = {}; rowBack.forEach((n, i) => pos[n] = [90 + i * 128, 1560, .3]); rowFront.forEach((n, i) => pos[n] = [80 + i * 132, 1800, .36]);
  const focus = cur ? pos[cur] : null, zf = cur ? ss(0, .4, t - (spot.find(s => s[0] === cur)[1] - .1)) : 0;
  c.translate(W / 2, H / 2); const z = (1 + .07 * (1 - eOut(lt / .4))) * (cur ? 2.2 : 1.05); c.scale(z, z); c.translate(-(focus ? focus[0] : 540), -(focus ? focus[1] - 230 : 1250));
  mansionDusk(c, t, { deck: true });
  rowBack.forEach((n, i) => { const [x, y, s] = pos[n]; famOld(c, n, x, y, s, { t, expr: 'smile', mouthOpen: .3, blink: ((t + x * .01) % 3) - 1.5, pose: 'side', shadow: true, tagS: .4, tagUp: i % 2 ? 34 : 0 }); });
  rowFront.forEach(n => { const [x, y, s] = pos[n]; const me = n === cur; famOld(c, n, x, y, s, { t, expr: 'smile', mouthOpen: me ? .8 : .3, pose: me ? 'wave' : 'side', blink: ((t + x * .01) % 3) - 1.5, tagCol: me ? '#ff4fd8' : null, tagS: .44, tagUp: rowFront.indexOf(n) % 2 ? 36 : 0 }); });
  if (cur) { const [x, y, s] = pos[cur]; c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createLinearGradient(x, y - 900, x, y); g.addColorStop(0, 'rgba(255,240,200,0)'); g.addColorStop(1, 'rgba(255,240,200,.25)'); c.fillStyle = g; c.beginPath(); c.moveTo(x - 40, y - 900); c.lineTo(x + 40, y - 900); c.lineTo(x + 120, y); c.lineTo(x - 120, y); c.fill(); c.restore(); }
  // cámaras 24/7
  if (t > wf('cámaras') - .2) [[120, 1000], [960, 1000]].forEach(([x, y], i) => { const a = eBack((t - wf('cámaras') + .2) / .3); c.save(); c.translate(x, y); c.scale(a, a); c.rotate(i ? -.4 : .4); c.fillStyle = '#e8e8f0'; rrect(c, -60, -28, 120, 56, 12); c.fill(); c.fillStyle = '#1a1a22'; c.beginPath(); c.arc(i ? -64 : 64, 0, 24, 0, TAU); c.fill(); c.restore(); c.fillStyle = Math.sin(t * 5) > 0 ? '#ff2a3a' : '#5a1a1a'; c.beginPath(); c.arc(x, y - 50, 10, 0, TAU); c.fill(); });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wf('dieciséis'), wf('doña') - .2, '16', 'famosos'); badge(c, t, wf('treinta'), wf('horas'), '30', 'días'); badge(c, t, wf('horas'), 15.5, '24/7', '');
});

// 3. Para votar: Super Chat mínimo $50
scene(15.5, (c, t, lt) => {
  const ts = wf('super') - .1;
  cam(c, lt, 5.2, [1.0, 540, 1100], [1.06, 540, 1100]);
  interior(c, t);
  drawBeto(c, 250, 1900, .78, { t, pose: 'phone', expr: t > ts ? 'shock' : 'smile', look: [.8, -.2], mouthOpen: .6, blink: (lt % 2.6) - 1.3, prop: (c) => { c.save(); c.translate(0, -470); c.fillStyle = '#2a2a34'; rrect(c, -40, -70, 80, 140, 14); c.fill(); c.fillStyle = '#9fd4ff'; rrect(c, -32, -60, 64, 120, 10); c.fill(); c.restore(); } });
  phoneChat(c, 700, 1050, 1.0, t, 15.5, [{ at: 0, user: 'fan_mx', text: '¡vamos equipo!' }, { at: .5, user: 'lupita22', text: '¿quién sale? 👀' }, { at: 1.0, user: 'beto', text: 'jajaja' },
    { at: ts - 15.5 + .2, paid: true, user: 'beto', amount: '$50 MXN', text: '#DoñaAlegría 💖', col: '#ffca28' }, { at: ts - 15.5 + 1.4, user: 'karla_99', text: '🔥🔥🔥' }, { at: ts - 15.5 + 2.2, paid: true, user: 'mari.lu', amount: '$100 MXN', text: '#Bellakath ✨', col: '#ff8a65' }]);
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wf('cincuenta') - .1, 20.6, '$50', 'mínimo');
});

// 4. Cada 10 pesos = 1 punto: barras de votos
scene(20.6, (c, t, lt) => {
  const tp = wf('punto') - .3;
  cam(c, lt, 5.9, [1.0, 540, 1150], [1.05, 540, 1150]);
  interior(c, t);
  // billetes que se vuelven puntos
  for (let i = 0; i < 6; i++) { const ft = t - (wf('diez') - .2) - i * .25; if (ft < 0 || ft > 1.4) continue; const x = 140 + i * 160, y = 780 - ft * 120; c.save(); c.translate(x, y); c.rotate(Math.sin(ft * 5 + i) * .2); c.globalAlpha = 1 - clamp((ft - 1) / .4);
    if (ft < .7) { c.fillStyle = '#6ac8a0'; rrect(c, -60, -32, 120, 64, 8); c.fill(); c.fillStyle = '#2a7a5a'; c.font = '900 34px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('$10', 0, 2); } else { c.fillStyle = '#ffd166'; c.beginPath(); c.arc(0, 0, 40, 0, TAU); c.fill(); c.fillStyle = '#5a3a00'; c.font = '900 34px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('+1', 0, 2); } c.restore(); }
  const names = ['Doña Alegría', 'Karely Ruiz', 'Bellakath', 'Dani Flow'], gr = ss(tp, 26.4, t);
  names.forEach((n, i) => { const x = 170 + i * 250, base = 1700, hgt = [0.55, .8, .95, .65][i] * 520 * gr + 30;
    c.fillStyle = 'rgba(0,0,0,.3)'; rrect(c, x - 70, base - 560, 140, 560, 20); c.fill(); c.fillStyle = vgrad(c, base - hgt, base, [[0, XC[i]], [1, '#2a1a3a']]); rrect(c, x - 60, base - hgt, 120, hgt, 18); c.fill();
    c.save(); c.globalCompositeOperation = 'lighter'; glow(c, x, base - hgt, 80, '255,240,200', .4); c.restore();
    famOld(c, n, x, base - hgt - 6, .2, { t, expr: 'smile', mouthOpen: .5, pose: 'arms', shadow: false, tag: false });
    nameTag(c, n, x, base + 50, .62); });
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wf('diez') - .1, 26.4, '$10', '= 1 punto');
});

// 5. YouTube ~30% / canal ~70%
scene(26.4, (c, t, lt) => {
  const tsplit = wf('treinta') - .3, k = ss(tsplit, tsplit + .6, t);
  cam(c, lt, 5.9, [1.0, 540, 1100], [1.05, 540, 1100]);
  const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1300); g.addColorStop(0, '#3a1a5a'); g.addColorStop(1, '#0e0620'); c.fillStyle = g; c.fillRect(-400, -400, W + 800, H + 800);
  c.save(); c.globalCompositeOperation = 'lighter'; c.translate(540, 1100); c.rotate(lt * .2); for (let i = 0; i < 12; i++) { c.rotate(TAU / 12); c.fillStyle = 'rgba(255,200,255,.05)'; c.beginPath(); c.moveTo(0, 0); c.lineTo(1500, -130); c.lineTo(1500, 130); c.fill(); } c.restore();
  // moneda que se parte
  const R = 300; c.save(); c.translate(540, 1100);
  [[0, Math.PI * 2 * .3, -1, '#ff4d5e'], [Math.PI * 2 * .3, Math.PI * 2, 1, '#ffd166']].forEach(([a0, a1, sd, col]) => { const mid = (a0 + a1) / 2 - Math.PI / 2, off = k * 70; c.save(); c.translate(Math.cos(mid) * off, Math.sin(mid) * off);
    c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, R, a0 - Math.PI / 2, a1 - Math.PI / 2); c.closePath(); const cg = c.createRadialGradient(-80, -80, 20, 0, 0, R); cg.addColorStop(0, '#fff2b0'); cg.addColorStop(.6, '#f2c04a'); cg.addColorStop(1, '#a8741e'); c.fillStyle = cg; c.fill(); c.strokeStyle = '#8a5a10'; c.lineWidth = 6; c.stroke();
    c.fillStyle = col; c.globalAlpha = .35 * k; c.fill(); c.globalAlpha = 1; c.restore(); });
  c.fillStyle = '#b07a1a'; c.font = '900 260px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.globalAlpha = 1 - k; c.fillText('$', 0, 10); c.restore();
  if (k > .3) { c.save(); c.globalAlpha = clamp((k - .3) / .4); c.font = '900 64px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 12; c.strokeStyle = '#1a0a2a';
    c.strokeText('YouTube ≈30 %', 330, 760); c.fillStyle = '#ff8a9a'; c.fillText('YouTube ≈30 %', 330, 760); c.strokeText('Canal ≈70 %', 620, 1520); c.fillStyle = '#ffd57e'; c.fillText('Canal ≈70 %', 620, 1520); c.restore(); }
  c.setTransform(1, 0, 0, 1, 0, 0);
});

// 6. 1,000 fans × $50 = $50,000
scene(32.3, (c, t, lt) => {
  const tc = wf('son') - .2, cnt = Math.round(ss(tc, tc + 1.6, t) * 50000);
  cam(c, lt, 5.9, [1.05, 540, 1100], [1.0, 540, 1100]);
  interior(c, t); c.fillStyle = 'rgba(10,5,30,.45)'; c.fillRect(-400, -400, W + 800, H + 800);
  // muchos fans con celular (siluetas)
  for (let i = 0; i < 30; i++) { const x = 40 + (i % 10) * 112, y = 1500 + Math.floor(i / 10) * 170, b = Math.sin(t * 5 + i) * 6; c.fillStyle = `rgba(${20 + i % 3 * 10},10,40,1)`; c.beginPath(); c.arc(x, y - 110 + b, 40, 0, TAU); c.fill(); rrect(c, x - 60, y - 70 + b, 120, 200, 50); c.fill(); c.fillStyle = '#9fd4ff'; rrect(c, x + 20, y - 80 + b, 26, 44, 6); c.fill(); glow(c, x + 33, y - 58 + b, 50, '160,220,255', .5); }
  // mensajes pagados volando
  for (let i = 0; i < 16; i++) { const st = hash(i) * 3, ft = lt - st; if (ft < 0 || ft > 2.5) continue; const x = 100 + hash(i * 3) * 880, y = 1450 - ft * 500; c.save(); c.globalAlpha = 1 - clamp((ft - 1.8) / .7); c.translate(x, y); c.fillStyle = XC[i % 6]; rrect(c, -90, -28, 180, 56, 18); c.fill(); c.fillStyle = '#1a1a1a'; c.font = '900 30px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('$50', 0, 2); c.restore(); }
  // contador
  c.save(); c.translate(540, 1050); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 30; rrect(c, -380, -110, 760, 220, 40); c.fillStyle = 'rgba(14,13,18,.9)'; c.fill(); c.shadowBlur = 0; c.strokeStyle = '#ffd166'; c.lineWidth = 5; c.stroke();
  c.font = '900 140px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; const gg = c.createLinearGradient(0, -60, 0, 60); gg.addColorStop(0, '#fff7dc'); gg.addColorStop(1, '#e8a33c'); c.fillStyle = gg; c.fillText('$' + cnt.toLocaleString('en-US'), 0, 10); c.restore();
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, wf('mil') - .1, tc, '1,000', 'fans');
  lab(c, t, wf('sola') - .1, 'en una sola votación', W / 2, 1320, '#ffd166', 38.0, 48);
});

// 7. El premio: 2 millones
scene(38.0, (c, t, lt) => {
  const tm = wf('dos') - .2;
  cam(c, lt, 3.4, [1.1, 540, 1150], [1.0, 540, 1150]);
  interior(c, t);
  c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createLinearGradient(540, 200, 540, 1500); g.addColorStop(0, 'rgba(255,240,200,0)'); g.addColorStop(1, 'rgba(255,240,200,.3)'); c.fillStyle = g; c.beginPath(); c.moveTo(470, 200); c.lineTo(610, 200); c.lineTo(860, 1500); c.lineTo(220, 1500); c.fill(); c.restore();
  const open = ss(tm, tm + .5, t); c.save(); c.translate(540, 1320); c.fillStyle = vgrad(c, -200, 0, [[0, '#4a4a58'], [1, '#1a1a22']]); rrect(c, -260, -200, 520, 220, 20); c.fill(); c.fillStyle = '#c8a050'; c.fillRect(-60, -230, 120, 30);
  c.save(); c.translate(0, -200); c.rotate(-open * 1.2); c.fillStyle = vgrad(c, -200, 0, [[0, '#5a5a68'], [1, '#2a2a34']]); rrect(c, -260, -200, 520, 200, 20); c.fill(); c.restore();
  if (open > .2) for (let r = 0; r < 3; r++) for (let q = 0; q < 6; q++) { c.fillStyle = r % 2 ? '#5ab87a' : '#6ac88a'; rrect(c, -230 + q * 78, -190 + r * 26, 72, 40, 6); c.fill(); c.strokeStyle = '#2a7a4a'; c.lineWidth = 2; c.strokeRect(-226 + q * 78, -186 + r * 26, 64, 32); }
  c.restore(); if (open > .3) sparks(c, t, tm + .3, 540, 1200, 20, 4, '255,230,150');
  c.setTransform(1, 0, 0, 1, 0, 0);
  badge(c, t, tm, 41.4, '$2,000,000', '');
});

// 8. ¿Tú por quién pagarías?
scene(41.4, (c, t, lt) => {
  cam(c, lt, 3.1, [1.15, 540, 1350], [1.0, 540, 1300]);
  mansionDusk(c, t, { deck: true });
  const all = FAM_NAMES; all.forEach((n, i) => { const row = i < 8 ? 0 : 1, col = i % 8, x = 80 + col * 132 + (row ? 60 : 0), y = row ? 1830 : 1600, s = row ? .34 : .29;
    famOld(c, n, x, y, s, { t, expr: 'smile', mouthOpen: .4 + .3 * Math.abs(Math.sin(t * 6 + i)), pose: (i % 3 === 0) ? 'wave' : 'side', blink: ((t + i) % 3) - 1.5, tagS: .42, tagUp: col % 2 ? 34 : 0 }); });
  c.setTransform(1, 0, 0, 1, 0, 0);
  const a = eBack((t - wf('tú') + .1) / .4); if (a > 0) { c.save(); c.translate(W / 2, 720); c.scale(a, a); c.font = '900 66px Nunito'; const txt = '¿Tú por quién pagarías?'; const w = c.measureText(txt).width + 90; rrect(c, -w / 2, -64, w, 128, 40); c.fillStyle = 'rgba(14,13,18,.92)'; c.fill(); c.strokeStyle = '#ff4fd8'; c.lineWidth = 5; c.stroke(); c.fillStyle = '#ffd0f4'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 4); c.restore(); }
  const fo = clamp((t - (END - .6)) / .6); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
});

const _r = render; render = function (t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  let si = 0; for (let i = 0; i < SC.length; i++) if (t >= SC[i].t0) si = i;
  ctx.save(); SC[si].draw(ctx, t, t - SC[si].t0); ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none';
  ctx.drawImage(A.vig, 0, 0);
  ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .09; ctx.drawImage(A.grain[Math.floor(t * 24) % 4], 0, 0, W, H); ctx.restore();
  if (t < END - .7) caption(ctx, t);
};
