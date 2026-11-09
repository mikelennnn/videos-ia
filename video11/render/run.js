// Uso: node run.js preview t1 t2 ...   |  node run.js frames <inicio> <fin> <salida_dir>
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const FPS = 30;
(async () => {
  const [mode, ...args] = process.argv.slice(2);
  const words = JSON.parse(fs.readFileSync(path.join(__dirname, '../audio/words.json'), 'utf8'));
  const browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  page.on('console', m => console.log('[page]', m.text())); page.on('pageerror', e => console.log('[err]', e.message));
  await page.goto('file://' + path.join(__dirname, 'index.html'));
  await page.evaluate(w => init(w), words);
  const grab = async t => Buffer.from((await page.evaluate(t => { render(t); return cv.toDataURL('image/jpeg', .94); }, t)).split(',')[1], 'base64');
  if (mode === 'preview') { const out = args.shift(); fs.mkdirSync(out, { recursive: true }); for (const a of args) fs.writeFileSync(path.join(out, `t${(+a).toFixed(2)}.jpg`), await grab(+a)); }
  else { const [f0, f1, out] = [+args[0], +args[1], args[2]]; fs.mkdirSync(out, { recursive: true }); const st = Date.now();
    for (let f = f0; f < f1; f++) { fs.writeFileSync(path.join(out, `f${String(f).padStart(5, '0')}.jpg`), await grab(f / FPS)); if (f % 150 === 0) console.log('frame', f, ((Date.now() - st) / 1000).toFixed(1) + 's'); } }
  await browser.close();
})();
