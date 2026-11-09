// ---------- assets: la mujer que se congeló ----------
function drawGirl(c, x, y, s, o = {}) {
  const fr = o.frost || 0;
  drawBeto(c, x, y, s, { ...o, cold: Math.max(o.cold || 0, fr), longSleeve: true, sleeve: fr > .5 ? '#b86a8a' : '#c83a3a', sleeveD: '#7a1a1a', prop: (c, P) => {
    const hy = -700;
    // cabello largo (fuera de la cara)
    c.save(); c.beginPath(); c.rect(-400, -1200, 800, 1300); c.ellipse(0, hy, 108, 118, 0, 0, TAU); c.clip('evenodd');
    c.fillStyle = fr > .5 ? '#c8c0b0' : '#c8964a'; c.beginPath(); c.moveTo(-120, hy - 60); c.quadraticCurveTo(-170, hy + 120, -150, hy + 230); c.lineTo(-90, hy + 220); c.quadraticCurveTo(-100, hy + 80, -90, hy - 20); c.fill();
    c.beginPath(); c.moveTo(120, hy - 60); c.quadraticCurveTo(170, hy + 120, 150, hy + 230); c.lineTo(90, hy + 220); c.quadraticCurveTo(100, hy + 80, 90, hy - 20); c.fill();
    c.strokeStyle = 'rgba(120,70,20,.35)'; c.lineWidth = 3; [-140, -120, 120, 140].forEach(hx => { c.beginPath(); c.moveTo(hx, hy); c.quadraticCurveTo(hx * 1.15, hy + 120, hx * 1.05, hy + 220); c.stroke(); }); c.restore();
    // abrigo
    c.fillStyle = fr > .5 ? '#b86a8a' : '#c83a3a'; c.beginPath(); c.moveTo(-150, -565); c.lineTo(150, -565); c.lineTo(185, -150); c.lineTo(-185, -150); c.closePath(); c.fill();
    c.strokeStyle = '#7a1a1a'; c.lineWidth = 6; c.beginPath(); c.moveTo(0, -540); c.lineTo(0, -160); c.stroke(); c.fillStyle = '#f2d27a'; [-470, -390, -310, -230].forEach(yy => { c.beginPath(); c.arc(16, yy, 8, 0, TAU); c.fill(); });
    c.fillStyle = '#e8e2d6'; rrect(c, -185, -175, 370, 30, 10); c.fill();
    // bufanda a rayas
    c.save(); c.beginPath(); c.moveTo(-110, -600); c.lineTo(110, -600); c.lineTo(110, -540); c.lineTo(-110, -540); c.closePath(); c.moveTo(40, -560); c.lineTo(100, -560); c.lineTo(90, -400); c.lineTo(40, -400); c.closePath(); c.clip();
    for (let yy = -620; yy < -380; yy += 24) { c.fillStyle = ((yy / 24) | 0) % 2 ? '#f4f2ee' : '#2a7ad8'; c.fillRect(-120, yy, 240, 24); } c.restore();
    // gorro tejido con pompón
    c.save(); c.translate(0, hy - 70); c.fillStyle = '#f4f2ee'; c.beginPath(); c.ellipse(0, 10, 125, 90, 0, Math.PI, TAU); c.fill(); c.fillStyle = '#c83a3a'; for (let k = -4; k <= 4; k++) { c.fillRect(k * 28 - 6, -70, 12, 80); }
    c.fillStyle = '#2a7ad8'; rrect(c, -128, -6, 256, 40, 14); c.fill(); c.fillStyle = '#f4f2ee'; c.beginPath(); c.arc(0, -96, 34, 0, TAU); c.fill(); c.restore();
    // pestañas
    if (!o.eyesClosed && o.expr !== 'sleep') { c.strokeStyle = '#2a1a10'; c.lineWidth = 4; c.lineCap = 'round'; [-1, 1].forEach(sd => { for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(sd * (42 + 14 + k * 4), hy - 22 + k * 6); c.lineTo(sd * (42 + 28 + k * 4), hy - 30 + k * 6); c.stroke(); } }); }
    // escarcha
    if (fr > 0) { c.save(); c.globalAlpha = fr; c.fillStyle = 'rgba(230,245,255,.9)'; for (let k = 0; k < 70; k++) { c.beginPath(); c.arc((hash(k) - .5) * 360, -900 + hash(k * 2) * 880, 3 + hash(k * 3) * 6, 0, TAU); c.fill(); }
      c.fillStyle = 'rgba(220,240,255,.95)'; for (let k = 0; k < 9; k++) { const xx = -120 + k * 30; c.beginPath(); c.moveTo(xx - 8, hy - 36); c.lineTo(xx + 8, hy - 36); c.lineTo(xx, hy - 36 + 20 + hash(k) * 30); c.fill(); }
      c.restore(); }
    if (o.prop2) o.prop2(c, P);
  } });
}
function drawFriend(c, x, y, s, o = {}) {
  drawBeto(c, x, y, s, { ...o, longSleeve: true, sleeve: '#b8322e', sleeveD: '#5a1010', prop: (c, P) => {
    c.save(); c.beginPath(); c.moveTo(-150, -565); c.lineTo(150, -565); c.lineTo(160, -250); c.lineTo(-160, -250); c.closePath(); c.clip();
    c.fillStyle = '#b8322e'; c.fillRect(-200, -600, 400, 400); c.fillStyle = 'rgba(20,10,10,.55)'; for (let k = -200; k < 200; k += 56) { c.fillRect(k, -600, 22, 400); } for (let k = -600; k < -200; k += 56) { c.fillRect(-200, k, 400, 22); } c.restore();
    c.fillStyle = '#5a3a24'; c.fillRect(-150, -265, 300, 20);
    const hy = -700; c.fillStyle = '#6a4a2c'; c.beginPath(); c.ellipse(0, hy - 70, 128, 80, 0, Math.PI, TAU); c.fill(); c.fillRect(-128, hy - 74, 256, 20);
    c.fillStyle = '#e8dcc8'; [-1, 1].forEach(sd => { c.beginPath(); c.ellipse(sd * 112, hy + 10, 30, 70, 0, 0, TAU); c.fill(); }); c.fillRect(-130, hy - 60, 260, 22);
    c.fillStyle = '#3a2414'; c.beginPath(); c.ellipse(0, hy + 90, 60, 40, 0, 0, Math.PI); c.fill();
    if (o.prop2) o.prop2(c, P);
  } });
}
function drawDoc80(c, x, y, s, o = {}) {
  drawBeto(c, x, y, s, { ...o, longSleeve: true, sleeve: '#f4f6f8', sleeveD: '#aab4c0', prop: (c, P) => {
    c.fillStyle = '#9ac8e8'; c.beginPath(); c.moveTo(-120, -560); c.lineTo(120, -560); c.lineTo(120, -270); c.lineTo(-120, -270); c.fill();
    c.fillStyle = '#f4f6f8'; c.beginPath(); c.moveTo(-150, -565); c.lineTo(-30, -565); c.lineTo(-10, -400); c.lineTo(-30, -60); c.lineTo(-170, -60); c.closePath(); c.fill(); c.beginPath(); c.moveTo(150, -565); c.lineTo(30, -565); c.lineTo(10, -400); c.lineTo(30, -60); c.lineTo(170, -60); c.closePath(); c.fill();
    c.strokeStyle = '#2a2a30'; c.lineWidth = 7; c.beginPath(); c.moveTo(-50, -560); c.quadraticCurveTo(-70, -430, -10, -400); c.moveTo(50, -560); c.quadraticCurveTo(70, -430, 10, -400); c.stroke(); c.fillStyle = '#9aa4b0'; c.beginPath(); c.arc(0, -390, 18, 0, TAU); c.fill();
    const hy = -700; c.fillStyle = '#3a2414'; c.beginPath(); c.moveTo(-46, hy + 46); c.quadraticCurveTo(0, hy + 26, 46, hy + 46); c.quadraticCurveTo(0, hy + 60, -46, hy + 46); c.fill();
    if (o.prop2) o.prop2(c, P);
  } });
}
// figura acostada: dibuja la función con rotación alrededor del suelo
function lying(c, x, y, s, rot, fn, o) { c.save(); c.translate(x, y); c.rotate(rot); fn(c, 0, 0, s, o); c.restore(); }
function car80(c, x, y, s, tilt = 0) { c.save(); c.translate(x, y); c.rotate(tilt); c.scale(s, s);
  c.fillStyle = '#3a6ab8'; rrect(c, -300, -150, 600, 130, 30); c.fill(); c.fillStyle = '#4a7ac8'; c.beginPath(); c.moveTo(-180, -150); c.lineTo(-120, -270); c.lineTo(140, -270); c.lineTo(210, -150); c.fill();
  c.fillStyle = '#9fd0f0'; c.beginPath(); c.moveTo(-150, -155); c.lineTo(-105, -250); c.lineTo(0, -250); c.lineTo(0, -155); c.fill(); c.beginPath(); c.moveTo(20, -155); c.lineTo(20, -250); c.lineTo(125, -250); c.lineTo(180, -155); c.fill();
  c.fillStyle = '#c8ccd4'; c.fillRect(-310, -60, 620, 22); c.fillStyle = '#ffe9a0'; rrect(c, 260, -120, 40, 30, 8); c.fill(); glow(c, 300, -105, 160, '255,240,170', .5); c.fillStyle = '#e8343f'; rrect(c, -300, -120, 30, 30, 6); c.fill();
  [[-190, -20], [190, -20]].forEach(([wx, wy]) => { c.fillStyle = '#1a1a1e'; c.beginPath(); c.arc(wx, wy, 58, 0, TAU); c.fill(); c.fillStyle = '#8a8f98'; c.beginPath(); c.arc(wx, wy, 24, 0, TAU); c.fill(); });
  c.fillStyle = '#f4f8fc'; c.beginPath(); c.ellipse(10, -272, 150, 22, 0, Math.PI, TAU); c.fill(); c.beginPath(); c.ellipse(-230, -152, 80, 14, 0, Math.PI, TAU); c.fill(); c.restore(); }
function cabin(c, x, y, s, lit = 1) { c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#6a4428'; c.fillRect(-260, -300, 520, 300); c.strokeStyle = 'rgba(40,20,10,.5)'; c.lineWidth = 5; for (let yy = -280; yy < 0; yy += 34) { c.beginPath(); c.moveTo(-260, yy); c.lineTo(260, yy); c.stroke(); }
  c.fillStyle = '#3a2418'; c.beginPath(); c.moveTo(-310, -290); c.lineTo(0, -480); c.lineTo(310, -290); c.fill(); c.fillStyle = '#f4f8fc'; c.beginPath(); c.moveTo(-320, -290); c.lineTo(0, -490); c.lineTo(320, -290); c.lineTo(290, -275); c.lineTo(0, -455); c.lineTo(-290, -275); c.fill();
  c.fillStyle = `rgba(255,${180 + 40 * lit | 0},100,${.3 + .7 * lit})`; c.fillRect(-200, -220, 120, 100); glow(c, -140, -170, 220, '255,200,110', .6 * lit); c.strokeStyle = '#3a2418'; c.lineWidth = 8; c.strokeRect(-200, -220, 120, 100);
  c.fillStyle = '#4a2c18'; c.fillRect(60, -200, 110, 200); c.fillStyle = '#e8c070'; c.beginPath(); c.arc(150, -100, 9, 0, TAU); c.fill(); c.fillStyle = '#5a3a22'; c.fillRect(-280, -20, 560, 20); c.restore(); }
function snowGround(c, y = 1300, col = ['#eef4fb', '#b8c8e0']) { c.fillStyle = vgrad(c, y, 2200, [[0, col[0]], [1, col[1]]]); c.beginPath(); c.moveTo(-300, 2400); for (let x = -300; x <= W + 300; x += 30) c.lineTo(x, y + Math.sin(x * .008) * 30 + Math.sin(x * .021) * 12); c.lineTo(W + 300, 2400); c.fill(); c.fillStyle = 'rgba(160,180,220,.35)'; for (let i = 0; i < 14; i++) { c.beginPath(); c.ellipse(hash(i) * W, y + 120 + hash(i * 2) * 600, 70 + hash(i * 3) * 90, 12, 0, 0, TAU); c.fill(); } }
function blizzard(c, t, n = 160, a = .8) { c.save(); c.strokeStyle = `rgba(255,255,255,${a})`; c.lineCap = 'round'; for (let i = 0; i < n; i++) { const sp = .5 + hash(i * 3) * .8, x = ((hash(i) * 1600 - t * 700 * sp) % 1600 + 1600) % 1600 - 260, y = ((hash(i * 2) * 2300 + t * 500 * sp) % 2300) - 200; c.lineWidth = 2 + hash(i * 5) * 4; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 26 * sp, y - 18 * sp); c.stroke(); } c.restore(); }
function hospitalBG(c, t) { c.fillStyle = vgrad(c, -300, 1500, [[0, '#d8ecec'], [1, '#b8d8d8']]); c.fillRect(-400, -400, W + 800, H + 800);
  c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(-300, 1050, W + 600, 30); c.fillStyle = vgrad(c, 1550, 2200, [[0, '#9ab8b8'], [1, '#6a8a8a']]); c.fillRect(-300, 1550, W + 600, 900);
  c.fillStyle = '#e8f2f2'; rrect(c, 80, 400, 300, 380, 14); c.fill(); c.fillStyle = vgrad(c, 420, 760, [[0, '#9fd4ff'], [1, '#e2f2ff']]); c.fillRect(100, 420, 260, 340); c.fillStyle = '#e8f2f2'; c.fillRect(224, 420, 12, 340);
  c.fillStyle = '#1a1c22'; rrect(c, 780, 600, 240, 180, 16); c.fill(); c.strokeStyle = '#4cd97b'; c.lineWidth = 4; c.beginPath(); for (let x = 0; x < 210; x += 4) { const ph = (x / 210 * 3 + t * 1.2) % 1; c.lineTo(795 + x, 700 - (ph > .45 && ph < .5 ? 50 : ph > .5 && ph < .55 ? -30 : 0)); } c.stroke(); }
function hospitalBed(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#c8d0d8'; c.fillRect(-460, -40, 920, 40); c.fillRect(-440, 0, 24, 200); c.fillRect(416, 0, 24, 200); c.fillStyle = '#9aa4b0'; c.fillRect(-470, -260, 30, 260); c.fillRect(440, -180, 30, 180); c.fillStyle = '#f4f6f8'; rrect(c, -440, -90, 880, 60, 20); c.fill(); c.restore(); }
