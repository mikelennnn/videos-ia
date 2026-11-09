// ---------- assets: la barra en la cabeza ----------
// Trabajador de 1848 (base de Beto + chaleco, tirantes, sombrero, bigote). rod: 0 = sin barra, 1 = barra atravesada
function drawWorker(c, x, y, s, o = {}) {
  drawBeto(c, x, y, s, { ...o, longSleeve: true, sleeve: '#efe4cc', sleeveD: '#b8a888', prop: (c, P) => {
    c.fillStyle = '#efe4cc'; c.beginPath(); c.moveTo(-140, -560); c.lineTo(140, -560); c.lineTo(125, -265); c.lineTo(-125, -265); c.closePath(); c.fill();
    c.fillStyle = '#6a4a2c'; c.beginPath(); c.moveTo(-140, -560); c.lineTo(-40, -560); c.lineTo(-10, -420); c.lineTo(-30, -265); c.lineTo(-125, -265); c.closePath(); c.fill(); c.beginPath(); c.moveTo(140, -560); c.lineTo(40, -560); c.lineTo(10, -420); c.lineTo(30, -265); c.lineTo(125, -265); c.closePath(); c.fill();
    c.fillStyle = '#c8a050'; [-380, -330].forEach(yy => { c.beginPath(); c.arc(-22, yy, 6, 0, TAU); c.fill(); });
    c.fillStyle = '#4a3a2a'; c.fillRect(-90, -560, 16, 300); c.fillRect(74, -560, 16, 300);
    c.fillStyle = '#c84a2a'; c.beginPath(); c.moveTo(-30, -575); c.lineTo(30, -575); c.lineTo(0, -540); c.fill();
    const hy = -700 + Math.sin((o.t || 0) * 2.4) * 3 * .3;
    // bigote y patillas
    c.fillStyle = '#3a2414'; c.beginPath(); c.moveTo(-50, hy + 48); c.quadraticCurveTo(-25, hy + 30, 0, hy + 44); c.quadraticCurveTo(25, hy + 30, 50, hy + 48); c.quadraticCurveTo(25, hy + 58, 0, hy + 50); c.quadraticCurveTo(-25, hy + 58, -50, hy + 48); c.fill();
    c.fillRect(-112, hy - 20, 16, 60); c.fillRect(96, hy - 20, 16, 60);
    // sombrero
    if (!o.noHat) { c.save(); c.translate(0, hy - 105); c.rotate(o.hatRot || 0); c.fillStyle = '#5a4430'; c.beginPath(); c.ellipse(0, 10, 165, 26, 0, 0, TAU); c.fill(); c.fillStyle = '#6a5038'; rrect(c, -95, -80, 190, 95, 30); c.fill(); c.fillStyle = '#3a2a1a'; c.fillRect(-95, -10, 190, 18); c.restore(); }
    // venda
    if (o.bandage) { c.fillStyle = '#f4f2ee'; c.save(); c.translate(0, hy - 30); c.rotate(-.2); rrect(c, -125, -30, 250, 50, 20); c.fill(); c.strokeStyle = 'rgba(200,60,60,.6)'; c.lineWidth = 6; c.beginPath(); c.arc(30, -6, 12, 0, TAU); c.stroke(); c.restore(); c.fillStyle = '#f4f2ee'; c.save(); c.translate(-62, hy + 40); c.rotate(.3); rrect(c, -28, -18, 56, 36, 10); c.fill(); c.restore(); }
    // barra atravesada (solo se dibuja fuera de la cara)
    if (o.rod) { const p0 = [-70, hy + 220], p1 = [75, hy - 330]; const k = o.rod;
      const tip = [lerp(p0[0], p1[0], k), lerp(p0[1], p1[1], k)];
      c.save(); c.beginPath(); c.rect(-400, -1400, 800, 1600); c.ellipse(0, hy, 112, 122, 0, 0, TAU); c.clip('evenodd');
      c.strokeStyle = '#2a2a30'; c.lineWidth = 30; c.lineCap = 'round'; c.beginPath(); c.moveTo(...p0); c.lineTo(...tip); c.stroke(); c.strokeStyle = '#6a6e78'; c.lineWidth = 18; c.stroke(); c.strokeStyle = 'rgba(255,255,255,.45)'; c.lineWidth = 5; c.beginPath(); c.moveTo(p0[0] - 4, p0[1]); c.lineTo(tip[0] - 4, tip[1]); c.stroke(); c.restore();
      c.fillStyle = '#b8161f'; [[-40, hy + 45], [40, hy - 118]].forEach(([dx, dy], i) => { if (i === 1 && k < .7) return; c.beginPath(); c.ellipse(dx, dy, 16, 8, -1.2, 0, TAU); c.fill(); }); }
    if (o.prop2) o.prop2(c, P);
  } });
}
// Doctor de 1848: levita negra, sombrero de copa, barba canosa, lentes
function drawDoctor(c, x, y, s, o = {}) {
  drawBeto(c, x, y, s, { ...o, longSleeve: true, sleeve: '#2a2a34', sleeveD: '#14141a', prop: (c, P) => {
    c.fillStyle = '#2a2a34'; c.beginPath(); c.moveTo(-150, -565); c.lineTo(150, -565); c.lineTo(175, -120); c.lineTo(-175, -120); c.closePath(); c.fill();
    c.fillStyle = '#f4f2ee'; c.beginPath(); c.moveTo(-40, -565); c.lineTo(40, -565); c.lineTo(0, -420); c.fill(); c.fillStyle = '#14141a'; c.beginPath(); c.moveTo(-30, -560); c.lineTo(30, -560); c.lineTo(0, -530); c.fill();
    const hy = -700; c.fillStyle = '#c8c4c0'; c.beginPath(); c.moveTo(-100, hy + 10); c.quadraticCurveTo(-110, hy + 150, 0, hy + 175); c.quadraticCurveTo(110, hy + 150, 100, hy + 10); c.quadraticCurveTo(60, hy + 80, 0, hy + 80); c.quadraticCurveTo(-60, hy + 80, -100, hy + 10); c.fill();
    c.fillStyle = '#5a1a1a'; c.beginPath(); c.ellipse(0, hy + 66, o.talk ? 18 : 22, o.talk ? 14 + Math.abs(Math.sin((o.t || 0) * 12)) * 8 : 6, 0, 0, TAU); c.fill();
    c.strokeStyle = '#c8a050'; c.lineWidth = 5; [-42, 42].forEach(ex => { c.beginPath(); c.arc(ex, hy - 5, 28, 0, TAU); c.stroke(); }); c.beginPath(); c.moveTo(-14, hy - 8); c.lineTo(14, hy - 8); c.stroke();
    c.fillStyle = '#14141a'; c.beginPath(); c.ellipse(0, hy - 100, 150, 24, 0, 0, TAU); c.fill(); c.fillRect(-90, hy - 300, 180, 200); c.fillStyle = '#7a1a1a'; c.fillRect(-90, hy - 150, 180, 26);
    if (o.prop2) o.prop2(c, P);
  } });
}
function railroad(c, t) {
  sky(c, [[0, '#2a1a3a'], [.45, '#9a4a5a'], [.75, '#f29a5a'], [.9, '#ffd08a']], -300, 1300);
  glow(c, 760, 1150, 520, '255,180,100', .7); c.fillStyle = '#ffe0a0'; c.beginPath(); c.arc(760, 1150, 120, 0, TAU); c.fill();
  c.fillStyle = '#6a3a4a'; c.beginPath(); c.moveTo(-300, 1250); c.lineTo(100, 850); c.lineTo(380, 1100); c.lineTo(640, 820); c.lineTo(1000, 1150); c.lineTo(1380, 900); c.lineTo(1380, 1300); c.lineTo(-300, 1300); c.fill();
  c.fillStyle = '#4a2a3a'; c.beginPath(); c.moveTo(-300, 1300); c.lineTo(200, 1050); c.lineTo(520, 1250); c.lineTo(900, 1000); c.lineTo(1380, 1250); c.lineTo(1380, 1350); c.lineTo(-300, 1350); c.fill();
  c.fillStyle = vgrad(c, 1240, 2200, [[0, '#a8805a'], [1, '#5a3e28']]); c.fillRect(-300, 1240, W + 600, 1000);
  for (let i = 0; i < 160; i++) { c.fillStyle = `rgba(${hash(i) > .5 ? '90,60,40' : '200,170,130'},.4)`; c.beginPath(); c.ellipse(hash(i * 2) * 1400 - 160, 1260 + hash(i * 3) * 900, 4 + hash(i) * 10, 3 + hash(i) * 5, 0, 0, TAU); c.fill(); }
  // vías
  for (let k = 0; k < 14; k++) { const u = k / 13, y = lerp(1260, 2100, u * u), w = lerp(120, 1200, u * u); c.fillStyle = '#5a3a22'; c.fillRect(540 - w / 2 + 300 - u * 300, y, w, lerp(8, 40, u)); }
  c.strokeStyle = '#8a8f98'; c.lineWidth = 10; [-1, 1].forEach(sd => { c.beginPath(); c.moveTo(840 + sd * 40, 1260); c.lineTo(540 + sd * 460, 2200); c.stroke(); });
  // piedras
  [[160, 1420, 140], [300, 1380, 90], [90, 1340, 80]].forEach(([x, y, r], i) => furFill(c, ellipsePts(x, y, r, r * .7, 14, 0, .2, 60 + i), { grad: [[0, '#9a8a7a'], [1, '#5a4a3a']], cols: ['#b8a898', '#3a2a1a'], alpha: [.2, .5], len: [6, 14], density: 8, spread: 3, seed: 60 + i, shade: .3 }));
}
function skull(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = vgrad(c, -160, 120, [[0, '#fbf3e0'], [1, '#d8c8a8']]); c.beginPath(); c.ellipse(0, -40, 140, 150, 0, 0, TAU); c.fill(); rrect(c, -80, 40, 160, 100, 30); c.fill();
  c.fillStyle = '#2a2018'; c.beginPath(); c.ellipse(-50, 0, 36, 42, 0, 0, TAU); c.ellipse(50, 0, 36, 42, 0, 0, TAU); c.fill(); c.beginPath(); c.moveTo(0, 40); c.lineTo(-16, 72); c.lineTo(16, 72); c.fill();
  c.fillStyle = '#fbf3e0'; for (let k = -3; k <= 3; k++) { rrect(c, k * 20 - 8, 96, 16, 28, 4); c.fill(); } c.strokeStyle = 'rgba(120,100,80,.5)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-70, 110); c.lineTo(70, 110); c.stroke();
  c.fillStyle = '#2a2018'; c.beginPath(); c.ellipse(30, -170, 30, 18, -.3, 0, TAU); c.fill(); c.beginPath(); c.ellipse(-40, 50, 16, 10, -.6, 0, TAU); c.fill();
  c.strokeStyle = 'rgba(120,100,80,.4)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-40, -150); c.quadraticCurveTo(0, -120, 60, -140); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.4)'; c.beginPath(); c.ellipse(-60, -110, 30, 14, -.5, 0, TAU); c.fill(); c.restore(); }
function cart(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s);
  woodBox(c, -260, -170, 520, 150); [[-170, 0], [170, 0]].forEach(([wx]) => { c.strokeStyle = '#3a2410'; c.lineWidth = 20; c.beginPath(); c.arc(wx, 20, 90, 0, TAU); c.stroke(); for (let k = 0; k < 8; k++) { const a = k / 8 * TAU; c.lineWidth = 8; c.beginPath(); c.moveTo(wx, 20); c.lineTo(wx + Math.cos(a) * 85, 20 + Math.sin(a) * 85); c.stroke(); } c.fillStyle = '#3a2410'; c.beginPath(); c.arc(wx, 20, 18, 0, TAU); c.fill(); });
  c.strokeStyle = '#6a4a2c'; c.lineWidth = 16; c.beginPath(); c.moveTo(260, -90); c.lineTo(460, -60); c.stroke(); c.restore(); }
function woodBox(c, x, y, w, h) { c.fillStyle = vgrad(c, y, y + h, [[0, '#a8743e'], [1, '#6a4422']]); c.fillRect(x, y, w, h); c.strokeStyle = 'rgba(50,25,10,.45)'; c.lineWidth = 4; for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(x, y + h * k / 4); c.lineTo(x + w, y + h * k / 4); c.stroke(); } c.strokeRect(x, y, w, h); }
function smoke(c, t, t0, x, y, s = 1) { const lt = t - t0; if (lt < 0 || lt > 2.4) return; c.save(); for (let i = 0; i < 14; i++) { const a = hash(i) * TAU, d = eOut(lt / 1.2) * (120 + hash(i * 2) * 200) * s, r = (60 + hash(i * 3) * 70) * s * (1 + lt * .4);
  c.globalAlpha = (1 - lt / 2.4) * .8; c.fillStyle = i % 2 ? '#d8d0c8' : '#a89c90'; c.beginPath(); c.arc(x + Math.cos(a) * d, y + Math.sin(a) * d * .7 - lt * 80 * s, r, 0, TAU); c.fill(); } c.restore(); }
function boomText(c, t, t0, x, y, txt, s = 1, col = '#ffd166', stroke = '#6a1020') { const lt = t - t0; if (lt < 0 || lt > 1.1) return; const a = eBack(lt / .2); c.save(); c.globalAlpha = 1 - clamp((lt - .8) / .3); c.translate(x, y); c.rotate(-.1); c.scale(a * s, a * s);
  c.fillStyle = col; c.beginPath(); for (let k = 0; k < 28; k++) { const r = k % 2 ? 120 : 190, an = k / 28 * TAU; c.lineTo(Math.cos(an) * r * 1.35, Math.sin(an) * r * .8); } c.fill(); c.font = '900 120px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 16; c.strokeStyle = stroke; c.strokeText(txt, 0, 6); c.fillStyle = '#ff4d5e'; c.fillText(txt, 0, 6); c.restore(); }
