// ---------- assets: el frío y las ganas de hacer pipí ----------
const BETO2 = { skin: ['#f6d0ae', '#d09068'], hair: ['#5a3a24', '#2e1c10'], hairStyle: 'short', coat: ['#3ab07a', '#1a6a44'], scarf: ['#ff9a3a', '#f4f2ee'], hat: 'beanie', hatCol: ['#ff9a3a', '#f4f2ee', '#d8602a'], iris: ['#b8844a', '#5a3818'], glove: '#ff8a2a', gloveD: '#c85a14', pants: ['#4a5a7a', '#2a3450'] };
function booth(c, x, y, s, doorOpen = 0) { c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(30,40,80,.3)'; c.beginPath(); c.ellipse(0, 6, 260, 30, 0, 0, TAU); c.fill();
  c.fillStyle = vgrad(c, -700, 0, [[0, '#a87446'], [1, '#6a4422']]); c.fillRect(-200, -700, 400, 700);
  c.strokeStyle = 'rgba(40,20,5,.4)'; c.lineWidth = 4; for (let k = -160; k < 200; k += 50) { c.beginPath(); c.moveTo(k, -690); c.lineTo(k, 0); c.stroke(); }
  c.fillStyle = vgrad(c, -800, -700, [[0, '#ffffff'], [1, '#c8d8ec']]); c.beginPath(); c.moveTo(-250, -690); c.lineTo(250, -690); c.lineTo(200, -790); c.lineTo(-200, -790); c.fill(); c.beginPath(); c.ellipse(0, -790, 210, 40, 0, Math.PI, TAU); c.fill();
  c.fillStyle = 'rgba(215,235,255,.95)'; for (let k = 0; k < 9; k++) { const xx = -230 + k * 58; c.beginPath(); c.moveTo(xx - 8, -690); c.lineTo(xx + 8, -690); c.lineTo(xx, -690 + 18 + hash(k) * 28); c.fill(); }
  // puerta
  c.fillStyle = '#2a1608'; c.fillRect(-140, -600, 280, 600);
  c.save(); c.translate(-140, -600); c.scale(1 - doorOpen * .8, 1); c.fillStyle = vgrad(c, 0, 600, [[0, '#c48a52'], [1, '#8a5a30']]); c.fillRect(0, 0, 280, 600); c.strokeStyle = 'rgba(60,30,10,.4)'; c.lineWidth = 4; c.strokeRect(24, 30, 232, 240); c.strokeRect(24, 310, 232, 260);
  c.fillStyle = '#2a1608'; c.beginPath(); c.arc(140, 110, 40, .5, 2 * Math.PI - .5); c.arc(160, 100, 34, 2 * Math.PI - .7, .7, true); c.fill(); c.fillStyle = '#e8c070'; c.beginPath(); c.arc(240, 320, 14, 0, TAU); c.fill(); c.restore();
  c.fillStyle = '#2a6ad8'; rrect(c, -90, -680, 180, 70, 16); c.fill(); c.fillStyle = '#fff'; c.font = '900 52px Nunito'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('WC', 0, -642);
  c.restore(); }
function kidney(c, x, y, s, t, mood = 'calm', flip = false) { c.save(); c.translate(x, y); c.scale(s * (flip ? -1 : 1), s);
  const sh = mood === 'panic' ? (hash(t * 70) - .5) * 8 : 0; c.translate(sh, 0);
  c.beginPath(); c.moveTo(0, -120); c.bezierCurveTo(110, -130, 120, 120, 0, 120); c.bezierCurveTo(-60, 120, -70, 60, -30, 30); c.bezierCurveTo(-10, 10, -10, -10, -30, -30); c.bezierCurveTo(-70, -60, -60, -120, 0, -120); c.closePath();
  const g = c.createRadialGradient(30, -50, 10, 20, 0, 150); g.addColorStop(0, '#ff9a8a'); g.addColorStop(.6, '#d84a4a'); g.addColorStop(1, '#8a1a24'); c.fillStyle = g; c.fill(); c.strokeStyle = 'rgba(90,10,20,.6)'; c.lineWidth = 4; c.stroke();
  c.fillStyle = 'rgba(255,255,255,.4)'; c.beginPath(); c.ellipse(40, -70, 22, 12, -.5, 0, TAU); c.fill();
  // carita
  [20, 64].forEach(ex => { c.fillStyle = '#fff'; c.beginPath(); c.ellipse(ex, -10, mood === 'panic' ? 17 : 14, mood === 'panic' ? 20 : 16, 0, 0, TAU); c.fill(); c.fillStyle = '#1a0a0a'; c.beginPath(); c.arc(ex + 2, -8, mood === 'panic' ? 6 : 8, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(ex + 5, -12, 3, 0, TAU); c.fill(); });
  c.fillStyle = '#5a0a14'; if (mood === 'panic') { c.beginPath(); c.ellipse(42, 40, 16, 20, 0, 0, TAU); c.fill(); } else { c.beginPath(); c.moveTo(22, 30); c.quadraticCurveTo(42, 52, 62, 30); c.fill(); }
  if (mood === 'panic') { c.fillStyle = '#9fd4ff'; c.beginPath(); c.ellipse(96, -60, 9, 14, 0, 0, TAU); c.fill(); }
  c.restore(); }
function guardDrop(c, x, y, s, t, on = 1) { c.save(); c.translate(x, y); c.scale(s, s);
  c.beginPath(); c.moveTo(0, -140); c.bezierCurveTo(70, -40, 110, 30, 0, 110); c.bezierCurveTo(-110, 30, -70, -40, 0, -140); c.closePath();
  const g = c.createRadialGradient(-20, -10, 10, 0, 20, 130); g.addColorStop(0, '#d8f2ff'); g.addColorStop(.6, '#6ab8f0'); g.addColorStop(1, '#2a6ab8'); c.fillStyle = g; c.fill(); c.strokeStyle = 'rgba(20,60,120,.6)'; c.lineWidth = 4; c.stroke();
  c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.ellipse(-30, -40, 12, 26, -.3, 0, TAU); c.fill();
  // casco
  c.fillStyle = vgrad(c, -120, -60, [[0, '#ffd84a'], [1, '#c8902a']]); c.beginPath(); c.ellipse(0, -70, 62, 44, 0, Math.PI, TAU); c.fill(); c.fillRect(-70, -74, 140, 14); c.fillStyle = '#fff'; c.beginPath(); c.arc(0, -96, 10, 0, TAU); c.fill();
  // cara
  if (on > .5) { [-24, 24].forEach(ex => { c.fillStyle = '#fff'; c.beginPath(); c.ellipse(ex, 0, 14, 16, 0, 0, TAU); c.fill(); c.fillStyle = '#0a1a2a'; c.beginPath(); c.arc(ex + 2, 2, 7, 0, TAU); c.fill(); }); c.strokeStyle = '#0a1a2a'; c.lineWidth = 5; c.beginPath(); c.moveTo(-20, 40); c.lineTo(20, 40); c.stroke(); c.lineWidth = 6; c.beginPath(); c.moveTo(-40, -26); c.lineTo(-10, -18); c.moveTo(40, -26); c.lineTo(10, -18); c.stroke(); }
  else { c.strokeStyle = '#0a1a2a'; c.lineWidth = 5; [-24, 24].forEach(ex => { c.beginPath(); c.arc(ex, 0, 12, .3, Math.PI - .3); c.stroke(); }); c.fillStyle = '#0a1a2a'; c.beginPath(); c.ellipse(0, 40, 8, 6, 0, 0, TAU); c.fill(); }
  // bracitos con escudo
  c.strokeStyle = '#2a6ab8'; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(-70, 30); c.lineTo(-110, on > .5 ? 0 : 60); c.moveTo(70, 30); c.lineTo(110, on > .5 ? 10 : 70); c.stroke();
  c.restore(); }
function pipe(c, pts, w, col = '#c8d0d8') { c.save(); c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = '#6a7480'; c.lineWidth = w + 10; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.stroke(); c.strokeStyle = col; c.lineWidth = w; c.stroke(); c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = w * .2; c.stroke(); c.restore(); }
function bodyDiagramBG(c, t) { const g = c.createRadialGradient(540, 1000, 50, 540, 1000, 1300); g.addColorStop(0, '#1d4068'); g.addColorStop(1, '#081424'); c.fillStyle = g; c.fillRect(-400, -400, W + 800, H + 800);
  c.strokeStyle = 'rgba(140,200,255,.08)'; c.lineWidth = 2; for (let x = -300; x < W + 300; x += 60) { c.beginPath(); c.moveTo(x, -300); c.lineTo(x, H + 300); c.stroke(); } for (let y = -300; y < H + 300; y += 60) { c.beginPath(); c.moveTo(-300, y); c.lineTo(W + 300, y); c.stroke(); } }
