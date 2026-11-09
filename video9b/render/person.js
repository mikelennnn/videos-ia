// ---------- Personaje humano en alta calidad (vista frontal) ----------
// origen = suelo entre los pies. Escala 1 ≈ 1100 px de alto.
const PPOSE = { // [codoIzq, manoIzq, codoDer, manoDer] relativo a hombros
  side: [[-40, 190], [-30, 380], [40, 190], [30, 380]],
  hug: [[40, 190], [190, 150], [-40, 200], [-190, 170]],
  wave: [[-40, 190], [-30, 380], [150, -60], [170, -260]],
  walkA: [[-70, 170], [-20, 340], [60, 180], [90, 350]],
  walkB: [[-60, 180], [-90, 350], [70, 170], [20, 340]],
  reach: [[-40, 190], [-30, 380], [120, 120], [260, 140]],
  pull: [[-90, 160], [-200, 260], [90, 160], [200, 260]],
  arms: [[-150, 120], [-220, -20], [150, 120], [220, -20]],
  shrug: [[-150, 150], [-210, 40], [150, 150], [210, 40]],
};
function lerpPose(a, b, k) { const A = PPOSE[a], B = PPOSE[b || a]; return A.map((p, i) => [lerp(p[0], B[i][0], k), lerp(p[1], B[i][1], k)]); }
function tube(c, a, b, w0, w1, colA, colB, outline) { // brazo/pierna afilado con degradado
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  c.beginPath(); c.moveTo(a[0] + nx * w0, a[1] + ny * w0); c.lineTo(b[0] + nx * w1, b[1] + ny * w1); c.arc(b[0], b[1], w1, Math.atan2(ny, nx), Math.atan2(-ny, -nx)); c.lineTo(a[0] - nx * w0, a[1] - ny * w0); c.arc(a[0], a[1], w0, Math.atan2(-ny, -nx), Math.atan2(ny, nx)); c.closePath();
  const g = c.createLinearGradient(a[0] + nx * w0, a[1] + ny * w0, a[0] - nx * w0, a[1] - ny * w0); g.addColorStop(0, colA); g.addColorStop(1, colB); c.fillStyle = g; c.fill(); if (outline) { c.strokeStyle = outline; c.lineWidth = 3; c.stroke(); }
}
function mitten(c, at, dir, col, colD) { c.save(); c.translate(...at); c.rotate(dir - Math.PI / 2); const g = c.createLinearGradient(-40, 0, 40, 0); g.addColorStop(0, col); g.addColorStop(1, colD); c.fillStyle = g;
  c.beginPath(); c.ellipse(0, 26, 34, 44, 0, 0, TAU); c.fill(); c.beginPath(); c.ellipse(-30, 10, 13, 22, -.6, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(-32, -8, 64, 12); c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.ellipse(-12, 20, 8, 18, 0, 0, TAU); c.fill(); c.restore(); }
function drawPerson(c, x, y, s, o = {}) {
  const t = o.t || 0, sk = o.skin || ['#ffdcc0', '#e8a882'], cold = Math.max(o.cold || 0, o.frost || 0), fr = o.frost || 0;
  const coat = o.coat || ['#e0464a', '#9a1e26'], pants = o.pants || ['#4a6ea8', '#2a4472'], boots = o.boots || ['#6a4630', '#3a2414'];
  c.save(); c.translate(x + (hash(t * 97) - .5) * 10 * (o.shiver || 0), y); c.scale(s, s); c.globalAlpha = o.alpha ?? 1;
  if (o.shadow !== false) { const g = c.createRadialGradient(0, 0, 10, 0, 0, 230); g.addColorStop(0, 'rgba(20,30,60,.4)'); g.addColorStop(1, 'rgba(20,30,60,0)'); c.save(); c.scale(1, .16); c.fillStyle = g; c.fillRect(-260, -260, 520, 520); c.restore(); }
  const br = Math.sin(t * 2.2) * 4, walk = o.walk ?? null;
  // piernas + botas
  [[-1, walk === null ? 0 : Math.sin(walk) * 26], [1, walk === null ? 0 : -Math.sin(walk) * 26]].forEach(([sd, sw]) => {
    tube(c, [sd * 52, -420], [sd * 56 + sw, -90], 50, 42, pants[0], pants[1]);
    c.strokeStyle = 'rgba(0,0,0,.15)'; c.lineWidth = 3; c.beginPath(); c.moveTo(sd * 52 - 10, -380); c.quadraticCurveTo(sd * 60, -250, sd * 56 + sw - 8, -110); c.stroke();
    c.save(); c.translate(sd * 58 + sw, -40); c.fillStyle = vgrad(c, -70, 40, [[0, boots[0]], [1, boots[1]]]); c.beginPath(); c.moveTo(-46, -70); c.lineTo(46, -70); c.lineTo(50, 0); c.quadraticCurveTo(sd * 70 + 10, 10, sd * 60 + 6, 38); c.lineTo(-50 * sd * 0 - 50, 38); c.quadraticCurveTo(-56, 20, -46, -70); c.fill();
    c.fillStyle = '#efe6d6'; rrect(c, -50, -78, 100, 24, 10); c.fill(); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-52, 30, 110, 10); c.restore(); });
  c.translate(0, br * .3);
  const SH = [[-130, -740], [130, -740]]; const P = o.poseRaw || lerpPose(o.pose || 'side', o.pose2, o.pk || 0);
  const arm = (i) => { const sh = SH[i], el = [sh[0] + P[i * 2][0], sh[1] + P[i * 2][1]], hd = [sh[0] + P[i * 2 + 1][0], sh[1] + P[i * 2 + 1][1]];
    tube(c, sh, el, 56, 48, coat[0], coat[1]); tube(c, el, hd, 48, 40, coat[0], coat[1]);
    c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.arc(el[0], el[1], 30, 0, TAU); c.fill();
    c.fillStyle = o.cuff || '#efe6d6'; const dx = hd[0] - el[0], dy = hd[1] - el[1], L = Math.hypot(dx, dy); c.save(); c.translate(hd[0] - dx / L * 10, hd[1] - dy / L * 10); c.rotate(Math.atan2(dy, dx)); rrect(c, -14, -38, 28, 76, 10); c.fill(); c.restore();
    mitten(c, [hd[0] + dx / L * 22, hd[1] + dy / L * 22], Math.atan2(dy, dx), o.glove || '#2a7ad8', o.gloveD || '#164a90'); };
  const front = o.pose === 'hug' || o.pose2 === 'hug';
  if (!front) { arm(0); arm(1); }
  // abrigo
  c.save(); c.beginPath(); c.moveTo(-158, -760); c.quadraticCurveTo(-196, -540, -212, -330); c.quadraticCurveTo(0, -296, 212, -330); c.quadraticCurveTo(196, -540, 158, -760); c.quadraticCurveTo(0, -805, -158, -760); c.closePath();
  const cg = c.createLinearGradient(-190, 0, 190, 0); cg.addColorStop(0, coat[1]); cg.addColorStop(.35, coat[0]); cg.addColorStop(.75, coat[0]); cg.addColorStop(1, coat[1]); c.fillStyle = cg; c.fill(); c.clip();
  if (o.plaid) { c.fillStyle = 'rgba(20,10,10,.45)'; for (let k = -200; k < 200; k += 60) c.fillRect(k, -800, 24, 520); for (let k = -800; k < -300; k += 60) c.fillRect(-200, k, 400, 24); c.fillStyle = 'rgba(255,220,120,.12)'; for (let k = -200; k < 200; k += 60) c.fillRect(k + 34, -800, 4, 520); }
  if (o.labcoat) { c.fillStyle = vgrad(c, -760, -330, [[0, '#8ac0e0'], [1, '#5a90b8']]); c.beginPath(); c.moveTo(-50, -770); c.lineTo(50, -770); c.lineTo(30, -330); c.lineTo(-30, -330); c.fill(); }
  c.strokeStyle = 'rgba(0,0,0,.18)'; c.lineWidth = 4; [[-80, -640, -110, -380], [90, -620, 120, -380], [-30, -500, -50, -340]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.quadraticCurveTo((a + d) / 2 + 12, (b + e) / 2, d, e); c.stroke(); });
  const rim = c.createLinearGradient(110, 0, 190, 0); rim.addColorStop(0, 'rgba(255,240,220,0)'); rim.addColorStop(1, o.rim || 'rgba(255,230,200,.35)'); c.fillStyle = rim; c.fillRect(110, -800, 90, 500);
  c.restore();
  if (!o.labcoat && !o.plaid) { c.strokeStyle = coat[1]; c.lineWidth = 6; c.beginPath(); c.moveTo(6, -720); c.lineTo(6, -320); c.stroke(); c.fillStyle = '#f2d27a'; [-640, -560, -480, -400].forEach(yy => { c.beginPath(); c.arc(30, yy, 9, 0, TAU); c.fill(); c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.arc(32, yy + 3, 9, 0, Math.PI); c.fill(); c.fillStyle = '#f2d27a'; });
    [[-110, -440], [110, -440]].forEach(([px, py]) => { c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 4; c.beginPath(); c.moveTo(px - 40, py); c.lineTo(px + 40, py); c.stroke(); }); }
  if (o.labcoat) { c.strokeStyle = '#2a2a30'; c.lineWidth = 8; c.beginPath(); c.moveTo(-60, -760); c.quadraticCurveTo(-80, -600, -10, -560); c.moveTo(60, -760); c.quadraticCurveTo(80, -600, 10, -560); c.stroke(); c.fillStyle = '#b8c0c8'; c.beginPath(); c.arc(0, -548, 20, 0, TAU); c.fill(); }
  // cuello y bufanda
  c.fillStyle = sk[1]; c.fillRect(-36, -810, 72, 70);
  if (o.scarf) { c.save(); c.beginPath(); c.ellipse(0, -770, 120, 46, 0, 0, TAU); c.moveTo(40, -760); c.rect(30, -760, 74, 230); c.clip(); for (let yy = -830; yy < -520; yy += 26) { c.fillStyle = ((yy / 26) | 0) % 2 ? o.scarf[0] : o.scarf[1]; c.fillRect(-140, yy, 280, 26); } c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(-140, -760, 280, 30); c.restore();
    c.strokeStyle = o.scarf[1]; c.lineWidth = 6; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(36 + k * 12, -530); c.lineTo(36 + k * 12, -505); c.stroke(); } }
  // cabello de atrás
  const hy = -960 + br, hair = o.hair || ['#c8964a', '#8a5a24'];
  if (o.hairStyle === 'long') { c.fillStyle = vgrad(c, hy - 160, hy + 260, [[0, hair[0]], [1, hair[1]]]); c.beginPath(); c.moveTo(-170, hy - 60); c.quadraticCurveTo(-225, hy + 140, -195, hy + 260); c.quadraticCurveTo(-140, hy + 290, -100, hy + 240); c.lineTo(100, hy + 240); c.quadraticCurveTo(140, hy + 290, 195, hy + 260); c.quadraticCurveTo(225, hy + 140, 170, hy - 60); c.closePath(); c.fill(); }
  // cabeza
  c.save(); c.translate(0, hy); c.rotate(o.headTilt || 0); c.scale(1.16, 1.16); c.translate(0, -20);
  [[-140, 10], [140, 10]].forEach(([ex, ey]) => { c.fillStyle = sk[1]; c.beginPath(); c.ellipse(ex, ey, 26, 34, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(180,90,70,.35)'; c.beginPath(); c.ellipse(ex * .97, ey, 11, 18, 0, 0, TAU); c.fill(); });
  c.beginPath(); c.moveTo(-138, -30); c.quadraticCurveTo(-140, -160, 0, -168); c.quadraticCurveTo(140, -160, 138, -30); c.quadraticCurveTo(130, 110, 0, 150); c.quadraticCurveTo(-130, 110, -138, -30); c.closePath();
  const hg = c.createRadialGradient(-40, -60, 20, 0, 0, 190); hg.addColorStop(0, sk[0]); hg.addColorStop(1, sk[1]); c.fillStyle = hg; c.fill();
  if (cold > 0) { c.save(); c.clip(); c.fillStyle = `rgba(120,170,255,${.32 * cold})`; c.fillRect(-160, -180, 320, 340); c.restore(); }
  // mejillas, nariz
  c.fillStyle = `rgba(255,${120 - cold * 30 | 0},130,${.32 + cold * .25})`; [-78, 78].forEach(bx => { c.beginPath(); c.ellipse(bx, 52, 30, 18, 0, 0, TAU); c.fill(); });
  c.strokeStyle = 'rgba(160,90,60,.6)'; c.lineWidth = 5; c.lineCap = 'round'; c.beginPath(); c.moveTo(-8, 30); c.quadraticCurveTo(4, 46, 14, 34); c.stroke(); if (cold > .3) { c.fillStyle = 'rgba(255,110,120,.6)'; c.beginPath(); c.ellipse(2, 36, 16, 11, 0, 0, TAU); c.fill(); }
  if (o.hat) { c.save(); c.beginPath(); c.moveTo(-138, -30); c.quadraticCurveTo(-140, -160, 0, -168); c.quadraticCurveTo(140, -160, 138, -30); c.quadraticCurveTo(130, 110, 0, 150); c.quadraticCurveTo(-130, 110, -138, -30); c.clip(); c.fillStyle = vgrad(c, -110, -40, [[0, 'rgba(80,40,30,.28)'], [1, 'rgba(80,40,30,0)']]); c.fillRect(-160, -110, 320, 70); c.restore(); }
  // ojos
  const ex = o.expr || 'smile', lk = o.look || [0, 0], bl = o.blink != null ? clamp(Math.abs(o.blink) * 8) : 1;
  [-1, 1].forEach(sd => { const X = sd * 54, Y = -12;
    if (ex === 'sleep' || ex === 'bliss') { c.strokeStyle = '#3a2418'; c.lineWidth = 6; c.beginPath(); c.arc(X, Y, 24, .25, Math.PI - .25); c.stroke(); if (o.lashes) for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(X + sd * (14 + k * 6), Y + 18); c.lineTo(X + sd * (20 + k * 7), Y + 28); c.stroke(); } return; }
    const big = ex === 'shock' ? 1.18 : 1;
    c.save(); c.beginPath(); c.ellipse(X, Y, 30 * big, 34 * big * Math.max(.06, bl), 0, 0, TAU); c.fillStyle = '#fff'; c.fill(); c.clip();
    const ig = c.createRadialGradient(X + lk[0] * 10, Y + lk[1] * 10 - 6, 2, X + lk[0] * 10, Y + lk[1] * 10, 22); ig.addColorStop(0, o.iris ? o.iris[0] : '#7ab8e8'); ig.addColorStop(1, o.iris ? o.iris[1] : '#2a5a9a'); c.fillStyle = ig; c.beginPath(); c.arc(X + lk[0] * 10, Y + lk[1] * 10, ex === 'shock' ? 17 : 22, 0, TAU); c.fill();
    c.fillStyle = '#120a08'; c.beginPath(); c.arc(X + lk[0] * 11, Y + lk[1] * 11, ex === 'shock' ? 7 : 11, 0, TAU); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(X + lk[0] * 10 + 8, Y + lk[1] * 10 - 9, 6.5, 0, TAU); c.fill(); c.beginPath(); c.arc(X + lk[0] * 10 - 7, Y + lk[1] * 10 + 8, 3, 0, TAU); c.fill(); c.restore();
    c.strokeStyle = '#2a1810'; c.lineWidth = 6; c.beginPath(); c.ellipse(X, Y, 30 * big, 34 * big * Math.max(.06, bl), 0, Math.PI * 1.08, Math.PI * 1.92); c.stroke();
    if (o.lashes) { c.lineWidth = 4; for (let k = 0; k < 3; k++) { const a = Math.PI * (sd > 0 ? 1.75 + k * .07 : 1.25 - k * .07); c.beginPath(); c.moveTo(X + Math.cos(a) * 30, Y + Math.sin(a) * 34); c.lineTo(X + Math.cos(a) * 42, Y + Math.sin(a) * 44); c.stroke(); } } });
  const bro = { cold: [12, -4], shock: [-6, -20], worry: [14, -6], smile: [-4, -2], flat: [0, 0] }[ex] || [0, 0];
  c.strokeStyle = o.browCol || hair[1]; c.lineWidth = 9; c.lineCap = 'round'; [-1, 1].forEach(sd => { c.beginPath(); c.moveTo(sd * 28, -62 + bro[1] - bro[0] * .5); c.quadraticCurveTo(sd * 54, -72 + bro[1], sd * 80, -62 + bro[1] + bro[0] * .5); c.stroke(); });
  // boca
  c.save(); c.translate(0, 88);
  if (ex === 'cold') { const op = 6 + Math.abs(Math.sin(t * 38)) * 7; c.fillStyle = '#6a1a24'; rrect(c, -32, -op, 64, op * 2, 10); c.fill(); c.fillStyle = '#fff'; c.fillRect(-28, -op + 2, 56, op - 2); c.fillRect(-28, 1, 56, op - 3); }
  else if (ex === 'shock') { c.fillStyle = '#6a1a24'; c.beginPath(); c.ellipse(0, 6, 22, 28, 0, 0, TAU); c.fill(); c.fillStyle = '#ff8a9a'; c.beginPath(); c.ellipse(0, 22, 13, 8, 0, 0, TAU); c.fill(); }
  else if (ex === 'sleep') { c.strokeStyle = '#8a4a3a'; c.lineWidth = 6; c.beginPath(); c.moveTo(-16, 4); c.quadraticCurveTo(0, 10, 16, 4); c.stroke(); }
  else if (ex === 'worry') { c.strokeStyle = '#8a3a3a'; c.lineWidth = 7; c.beginPath(); c.arc(0, 26, 24, Math.PI * 1.15, Math.PI * 1.85); c.stroke(); }
  else { const op = o.mouthOpen ?? .6; c.fillStyle = '#7a1e2a'; c.beginPath(); c.moveTo(-40, -6); c.quadraticCurveTo(0, 8 + 40 * op, 40, -6); c.quadraticCurveTo(0, 4, -40, -6); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-32, -2); c.quadraticCurveTo(0, 8, 32, -2); c.lineTo(30, 6); c.quadraticCurveTo(0, 14, -30, 6); c.fill(); if (op > .3) { c.fillStyle = '#ff8a9a'; c.beginPath(); c.ellipse(0, 14 + 18 * op, 16, 7 * op, 0, 0, TAU); c.fill(); } }
  c.restore();
  // cabello de enfrente / gorros
  if (o.hairStyle === 'long') { c.fillStyle = vgrad(c, -180, -20, [[0, hair[0]], [1, hair[1]]]); c.beginPath(); c.moveTo(-150, -20); c.quadraticCurveTo(-150, -170, 0, -175); c.quadraticCurveTo(150, -170, 150, -20); c.quadraticCurveTo(120, -100, 40, -110); c.quadraticCurveTo(-60, -100, -120, -60); c.quadraticCurveTo(-140, -40, -150, -20); c.fill();
    c.strokeStyle = 'rgba(255,240,200,.35)'; c.lineWidth = 4; [[-90, -150, -130, -50], [-40, -165, -70, -110], [60, -160, 100, -90]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.quadraticCurveTo((a + d) / 2, b + 20, d, e); c.stroke(); }); }
  if (o.hairStyle === 'short') { c.fillStyle = vgrad(c, -180, -60, [[0, hair[0]], [1, hair[1]]]); c.beginPath(); c.moveTo(-142, -40); c.quadraticCurveTo(-150, -175, 0, -180); c.quadraticCurveTo(150, -175, 142, -40); c.quadraticCurveTo(120, -110, 60, -112); c.lineTo(20, -95); c.lineTo(-10, -115); c.quadraticCurveTo(-110, -110, -142, -40); c.fill(); }
  if (o.stubble) { c.fillStyle = 'rgba(80,50,30,.18)'; c.beginPath(); c.moveTo(-120, 40); c.quadraticCurveTo(0, 190, 120, 40); c.quadraticCurveTo(0, 130, -120, 40); c.fill(); }
  if (o.glasses) { c.strokeStyle = '#2a2a30'; c.lineWidth = 6; [-54, 54].forEach(gx => { c.beginPath(); c.arc(gx, -12, 42, 0, TAU); c.stroke(); }); c.beginPath(); c.moveTo(-14, -14); c.lineTo(14, -14); c.stroke(); c.fillStyle = 'rgba(200,230,255,.15)'; [-54, 54].forEach(gx => { c.beginPath(); c.arc(gx, -12, 40, 0, TAU); c.fill(); }); }
  if (o.mustache) { c.fillStyle = '#4a2c18'; c.beginPath(); c.moveTo(-50, 66); c.quadraticCurveTo(-24, 46, 0, 62); c.quadraticCurveTo(24, 46, 50, 66); c.quadraticCurveTo(24, 78, 0, 70); c.quadraticCurveTo(-24, 78, -50, 66); c.fill(); }
  if (o.hat === 'beanie') { const hc = o.hatCol || ['#f4f2ee', '#c83a3a', '#2a7ad8']; c.save(); c.beginPath(); c.moveTo(-150, -50); c.quadraticCurveTo(-158, -250, 0, -258); c.quadraticCurveTo(158, -250, 150, -50); c.closePath(); c.clip();
      c.fillStyle = hc[0]; c.fillRect(-170, -270, 340, 230); c.fillStyle = hc[1]; for (let k = -6; k <= 6; k++) c.fillRect(k * 26 - 7, -270, 14, 230); c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(70, -270, 100, 230); c.restore();
    c.fillStyle = vgrad(c, -90, -30, [[0, hc[2]], [1, '#164a90']]); rrect(c, -158, -95, 316, 62, 26); c.fill(); c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = 3; for (let k = -6; k <= 6; k++) { c.beginPath(); c.moveTo(k * 24, -90); c.lineTo(k * 24, -38); c.stroke(); }
    const pg = c.createRadialGradient(-12, -298, 4, 0, -285, 44); pg.addColorStop(0, '#fff'); pg.addColorStop(1, hc[0] === '#f4f2ee' ? '#c8c4bc' : hc[0]); c.fillStyle = pg; c.beginPath(); c.arc(0, -282, 42, 0, TAU); c.fill(); }
  if (o.hat === 'trapper') { c.fillStyle = vgrad(c, -260, -60, [[0, '#7a5434'], [1, '#4a2c18']]); c.beginPath(); c.moveTo(-150, -60); c.quadraticCurveTo(-155, -250, 0, -255); c.quadraticCurveTo(155, -250, 150, -60); c.closePath(); c.fill();
    c.fillStyle = '#efe4d0'; rrect(c, -160, -100, 320, 54, 24); c.fill(); [-1, 1].forEach(sd => { c.beginPath(); c.ellipse(sd * 150, 20, 40, 92, 0, 0, TAU); c.fill(); }); c.fillStyle = 'rgba(180,160,130,.5)'; for (let k = 0; k < 30; k++) { c.beginPath(); c.arc(-150 + hash(k) * 300, -90 + hash(k * 2) * 40, 4, 0, TAU); c.fill(); } }
  // escarcha
  if (fr > 0) { c.save(); c.globalAlpha = fr; c.fillStyle = 'rgba(235,248,255,.95)'; for (let k = 0; k < 40; k++) { c.beginPath(); c.arc((hash(k) - .5) * 300, -170 + hash(k * 2) * 320, 2 + hash(k * 3) * 5, 0, TAU); c.fill(); } c.restore(); }
  c.restore();
  if (front) { arm(0); arm(1); }
  if (fr > 0) { c.save(); c.globalAlpha = fr; c.fillStyle = 'rgba(235,248,255,.9)'; for (let k = 0; k < 90; k++) { c.beginPath(); c.arc((hash(k + 50) - .5) * 380, -820 + hash(k * 2 + 7) * 800, 2 + hash(k * 3) * 6, 0, TAU); c.fill(); }
    c.fillStyle = 'rgba(210,235,255,.95)'; for (let k = 0; k < 8; k++) { const xx = -170 + k * 48; c.beginPath(); c.moveTo(xx - 10, -335); c.lineTo(xx + 10, -335); c.lineTo(xx, -300 + hash(k) * 30); c.fill(); } c.restore(); }
  if (o.breath) for (let k = 0; k < 3; k++) { const ph = (t * .7 + k / 3) % 1; c.globalAlpha = (1 - ph) * .55 * o.breath; c.drawImage(A.dot, 30 + ph * 140 - 50 - ph * 50, hy + 80 - ph * 110 - 50 - ph * 50, 100 + ph * 100, 100 + ph * 100); }
  c.restore();
}
const GIRL = { skin: ['#ffdcc4', '#eaa884'], hair: ['#d8a458', '#9a6424'], hairStyle: 'long', coat: ['#e0464a', '#9a1e26'], scarf: ['#f4f2ee', '#2a7ad8'], hat: 'beanie', lashes: true, iris: ['#9ad0f0', '#2a6aa8'], glove: '#2a7ad8', gloveD: '#164a90', pants: ['#3a4a6a', '#20283e'] };
const FRIEND = { skin: ['#f4c8a4', '#c88a64'], hair: ['#6a4428', '#3a2414'], hairStyle: 'short', coat: ['#c8302e', '#7a1414'], plaid: true, hat: 'trapper', stubble: true, iris: ['#a8784a', '#5a3818'], glove: '#5a3a24', gloveD: '#3a2414', pants: ['#4a6ea8', '#2a4472'] };
const DOC = { skin: ['#f0c8a8', '#c68a68'], hair: ['#4a3a30', '#2a201a'], hairStyle: 'short', coat: ['#f6f8fa', '#b8c4d0'], labcoat: true, glasses: true, mustache: true, cuff: '#f6f8fa', glove: '#f0c8a8', gloveD: '#c68a68', pants: ['#5a8ab8', '#3a6a98'], boots: ['#3a3a40', '#1a1a20'] };
