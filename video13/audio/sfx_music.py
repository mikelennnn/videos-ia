# Genera música de fondo y efectos sincronizados (sin dependencias externas salvo numpy)
import numpy as np, wave, json
SR = 44100; DUR = 40.2; N = int(SR * DUR)
rng = np.random.default_rng(7)
words = json.load(open('audio/words.json'))
ws = lambda i: words[i]['s']
def write(name, x):
    x = np.clip(x, -1, 1); d = (x * 32767).astype(np.int16)
    with wave.open(name, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(np.repeat(d[:, None], 2, 1).tobytes())
def env(n, a=.005, r=.3):
    t = np.arange(n) / SR; return np.minimum(1, t / a) * np.exp(-t / r)
def add(buf, t0, x, g=1.0):
    i = int(t0 * SR)
    if i >= N: return
    j = min(N, i + len(x)); buf[i:j] += x[:j - i] * g
def lp(x, a):  # filtro pasa-bajos de un polo
    y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)): acc += a * (x[i] - acc); y[i] = acc
    return y
def lpf(x, a):  # vectorizado aproximado (scipy no disponible): media móvil
    k = max(1, int(1 / a)); return np.convolve(x, np.ones(k) / k, 'same')
def noise(d): return rng.standard_normal(int(SR * d))
def tone(f, d, wav='sin'):
    t = np.arange(int(SR * d)) / SR; ph = 2 * np.pi * np.cumsum(np.broadcast_to(f, t.shape)) / SR if np.ndim(f) else 2 * np.pi * f * t
    return np.sin(ph) if wav == 'sin' else (2 / np.pi) * np.arcsin(np.sin(ph))











mus = np.zeros(N); bpm = 104; beat = 60 / bpm; bar = beat * 4
nt = lambda m: 440 * 2 ** ((m - 69) / 12)
prog = [(48, [60, 64, 67]), (45, [57, 60, 64]), (41, [53, 57, 60]), (43, [55, 59, 62])]
t = 0.0; b = 0
while t < DUR:
    root, ch = prog[b % 4]
    for k in range(4):  # bombo
        d = .25; f = np.linspace(110, 45, int(SR * d)); add(mus, t + k * beat, tone(f, d) * env(int(SR * d), .002, .09), .35)
    for off in [.75, 1.5, 2.75, 3.5]:  # caja dembow
        n = np.diff(noise(.12), prepend=0); add(mus, t + off * beat, n * env(len(n), .001, .04), .09)
    for k in range(8): add(mus, t + k * beat / 2, np.diff(noise(.03), prepend=0) * env(int(SR * .03), .001, .008), .035)
    for k in range(4): add(mus, t + k * beat, tone(nt(root - 12), beat * .9) * env(int(SR * beat * .9), .01, .3), .18)
    pd = np.zeros(int(SR * bar))
    for m in ch: pd += tone(nt(m), bar, 'tri') * .3 + tone(nt(m) * 1.006, bar) * .25
    e = np.minimum(1, np.arange(len(pd)) / (SR * .3)) * np.minimum(1, (len(pd) - np.arange(len(pd))) / (SR * .3)); add(mus, t, pd * e, .035)
    for k in [0, 3, 6]: m = ch[k % 3] + 24; add(mus, t + k * beat / 2, (tone(nt(m), .4) + .3 * tone(nt(m) * 2, .4)) * env(int(SR * .4), .001, .12), .05)
    t += bar; b += 1
tt = np.arange(N) / SR
mus *= np.minimum(1, tt / .3) * np.clip((DUR - tt) / 1.0, 0, 1)

fx = np.zeros(N)
def whoosh(t0, d=.45, g=.35):
    n = noise(d); s = np.sin(np.linspace(0, np.pi, len(n))) ** 2; x = lpf(n, .08) * s; add(fx, t0 - d * .6, x / (np.abs(x).max() + 1e-9), g)
def pop(t0, g=.35, f0=900):
    d = .12; f = np.linspace(f0, f0 * .45, int(SR * d)); add(fx, t0, tone(f, d) * env(int(SR * d), .002, .04), g)
def thump(t0, g=.8):
    d = .5; f = np.linspace(120, 40, int(SR * d)); add(fx, t0, tone(f, d) * env(int(SR * d), .002, .14), g)
    add(fx, t0, lpf(noise(.25), .25) * env(int(SR * .25), .001, .05), g * .9)
def slash(t0, g=.5):
    d = .3; n = noise(d); x = np.diff(n, prepend=0) * np.sin(np.linspace(0, np.pi, len(n))) ** 3; add(fx, t0 - d, x / np.abs(x).max(), g)
def ding(t0, f=1320, g=.25):
    d = 1.2; add(fx, t0, (tone(f, d) + .4 * tone(f * 2.76, d)) * env(int(SR * d), .002, .35), g)
def coin(t0, g=.12):
    d = .35; f = 2000 + rng.random() * 1500; add(fx, t0, (tone(f, d) + .6 * tone(f * 1.5, d)) * env(int(SR * d), .001, .07), g)
def drip(t0, g=.25):
    d = .09; f = np.linspace(700, 1600, int(SR * d)); add(fx, t0, tone(f, d) * env(int(SR * d), .002, .03), g)
def boing(t0, g=.3):
    d = .6; tt = np.arange(int(SR * d)) / SR; f = 180 + 120 * np.sin(2 * np.pi * 9 * tt) * np.exp(-tt * 5) + tt * 200; add(fx, t0, tone(f, d) * env(int(SR * d), .005, .25), g)
def firework(t0, g=.4):
    thump(t0, g * .5); n = noise(1.0) * (rng.random(int(SR * 1.0)) > .985); add(fx, t0 + .05, n * env(len(n), .01, .4), g * .6)



def chatter(t0, t1, g=.12):
    t = t0
    while t < t1: add(fx, t, np.diff(noise(.012), prepend=0) * env(int(SR * .012), .0005, .003), g); t += .045 + rng.random() * .01
def wind(t0, d, g=.1):
    n = lpf(noise(d), .02); n *= (1 + .5 * np.sin(np.linspace(0, 6, len(n)))); n *= np.minimum(1, np.arange(len(n)) / (SR * .5)) * np.minimum(1, (len(n) - np.arange(len(n))) / (SR * .5)); add(fx, t0, n / np.abs(n).max(), g)
def poof(t0, g=.35):
    n = lpf(noise(.5), .12); add(fx, t0, n / np.abs(n).max() * env(len(n), .01, .12), g)
def slide_down(t0, g=.25):
    d = .5; f = np.linspace(900, 200, int(SR * d)); add(fx, t0, tone(f, d) * env(int(SR * d), .01, .3), g)
def hiss(t0, g=.3):
    n = np.diff(noise(.7), prepend=0); n *= np.minimum(1, np.arange(len(n)) / (SR * .03)) * np.exp(-np.arange(len(n)) / (SR * .35)); add(fx, t0, n / np.abs(n).max(), g)
def shimmer(t0, n=10, g=.08, f0=1200):
    for k in range(n): ding(t0 + k * .05, f0 * 2 ** (k / 8), g)
def zap(t0, g=.25):
    d = .35; tt = np.arange(int(SR * d)) / SR; f = 300 + 1500 * np.abs(np.sin(2 * np.pi * 30 * tt)); add(fx, t0, np.sign(tone(f, d)) * env(int(SR * d), .002, .1), g * .4)

def tick(t0, g=.25, f=1800): add(fx, t0, tone(f, .03) * env(int(SR * .03), .0005, .008), g)
def glass_crash(t0, g=.5):
    n = np.diff(np.diff(noise(.9), prepend=0), prepend=0); add(fx, t0, n / np.abs(n).max() * env(len(n), .001, .15), g); thump(t0, .4)
    for k in range(10): ding(t0 + .05 + rng.random() * .5, 2500 + rng.random() * 2500, .05)
def ceramic(t0, g=.5):
    n = np.diff(noise(.6), prepend=0); add(fx, t0, n / np.abs(n).max() * env(len(n), .001, .1), g); thump(t0, .5)
    for k in range(6): tick(t0 + .05 + rng.random() * .3, .2, 900 + rng.random() * 1200)
def squeak(t0, g=.2):
    d = .18; f = np.linspace(2600, 3800, int(SR * d)) + 300 * np.sin(np.linspace(0, 40, int(SR * d))); add(fx, t0, tone(f, d) * env(int(SR * d), .005, .07), g)
def snore(t0, d, g=.1):
    n = lpf(noise(d), .05); tt2 = np.arange(len(n)) / SR; n *= (.5 + .5 * np.sin(2 * np.pi * .7 * tt2)) ** 2; add(fx, t0, n / np.abs(n).max(), g)
def whistle(t0, d=.7, g=.18):
    tt2 = np.arange(int(SR * d)) / SR; f = 2600 + 120 * np.sign(np.sin(2 * np.pi * 22 * tt2)); add(fx, t0, tone(f, d) * np.minimum(1, tt2 / .02) * np.minimum(1, (d - tt2) / .05), g)
def clap(t0, g=.45):
    n = np.diff(noise(.15), prepend=0); add(fx, t0, n / np.abs(n).max() * env(len(n), .001, .03), g)
def scratch(t0, g=.4):
    d = .45; tt2 = np.arange(int(SR * d)) / SR; f = 900 * np.exp(-tt2 * 6) + 80; n = tone(f, d, 'tri') * .6 + np.diff(noise(d), prepend=0)[:int(SR * d)] * .3; add(fx, t0, n * np.minimum(1, (d - tt2) / .1), g)

def siren(t0, d=1.1, g=.2):
    tt2 = np.arange(int(SR * d)) / SR; f = 700 + 400 * np.sin(2 * np.pi * 2.5 * tt2); add(fx, t0, tone(f, d, 'tri') * np.minimum(1, tt2 / .03) * np.minimum(1, (d - tt2) / .1), g)
def crickets(t0, d, g=.05):
    k = t0
    while k < t0 + d:
        for q in range(3): add(fx, k + q * .045, tone(4300 + rng.random() * 300, .03) * env(int(SR * .03), .002, .01), g)
        k += .35 + rng.random() * .4
def bigpum(t0, g=.8): thump(t0, g); boing(t0 + .02, .35); n = np.diff(noise(1.0), prepend=0); add(fx, t0, n / np.abs(n).max() * env(len(n), .002, .25), .15)

words = json.load(open('audio/words.json'))
def wf(w, n=0):
    import re
    k = 0
    for x in words:
        if re.sub(r'[^a-záéíóúñü0-9]', '', x['w'].lower()) == w:
            if k == n: return x['s']
            k += 1
    raise SystemExit('no ' + w)
def sizzle(t0, d, g=.06):
    n = np.diff(noise(d), prepend=0) * (rng.random(int(SR * d)) > .97); add(fx, t0, n, g * 6)
def crunch(t0, g=.6):
    for k in range(8): add(fx, t0 + k * .025, np.diff(noise(.04), prepend=0) * env(int(SR * .04), .001, .015), g * .6)
    thump(t0, g * .7)
def plip(t0, g=.15): d = .08; f = np.linspace(500, 1400, int(SR * d)); add(fx, t0, tone(f, d) * env(int(SR * d), .002, .03), g)
def bubble(t0, g=.08): d = .06; f = np.linspace(200, 600, int(SR * d)); add(fx, t0, tone(f, d) * env(int(SR * d), .002, .02), g)
def fire(t0, d, g=.12):
    n = lpf(noise(d), .1) + np.diff(noise(d), prepend=0) * (rng.random(int(SR * d)) > .985) * 3; n *= np.minimum(1, np.arange(len(n)) / (SR * .2)) * np.minimum(1, (len(n) - np.arange(len(n))) / (SR * .3)); add(fx, t0, n / np.abs(n).max(), g)
def slide_up(t0, g=.2): d = .6; f = np.linspace(300, 1300, int(SR * d)); add(fx, t0, tone(f, d) * env(int(SR * d), .01, .4), g)
def flush(t0, g=.35):
    d = 1.6; n = lpf(noise(d), .05); tt2 = np.arange(len(n)) / SR; n *= (1 + .6 * np.sin(2 * np.pi * (6 - tt2 * 3) * tt2)) * np.minimum(1, tt2 / .1) * np.exp(-tt2 * 1.2); add(fx, t0, n / np.abs(n).max(), g)

def heartbeat(t0, d, bpm=70, g=.35):
    k = t0
    while k < t0 + d: thump(k, g); thump(k + .18, g * .7); k += 60 / bpm
def paper(t0, g=.25):
    n = np.diff(noise(.35), prepend=0) * (rng.random(int(SR * .35)) > .7); add(fx, t0, n * env(len(n), .01, .1) / 2, g)
def lap(t0, d, g=.12):
    k = t0
    while k < t0 + d: plip(k, g); k += .22

def explosion(t0, g=.9):
    n = lpf(noise(1.6), .06); n = n / np.abs(n).max(); add(fx, t0, n * env(len(n), .002, .45), g); thump(t0, g)
    n2 = np.diff(noise(.4), prepend=0); add(fx, t0, n2 / np.abs(n2).max() * env(len(n2), .001, .06), g * .6)
def clang(t0, g=.3):
    for f, a in [(820, 1), (1370, .6), (2240, .4), (3100, .25)]: add(fx, t0, tone(f, 1.2) * env(int(SR * 1.2), .001, .35) * a, g)
def ring(t0, d, g=.06):
    tt2 = np.arange(int(SR * d)) / SR; add(fx, t0, tone(3200, d) * np.exp(-tt2 / d * 2) * np.minimum(1, tt2 / .05), g)
def growl(t0, g=.25):
    d = .7; n = lpf(noise(d), .08); tt2 = np.arange(len(n)) / SR; n *= (1 + np.sin(2 * np.pi * 30 * tt2)) * np.minimum(1, tt2 / .05) * np.minimum(1, (d - tt2) / .2); add(fx, t0, n / np.abs(n).max(), g)
def creak(t0, g=.15):
    d = .5; tt2 = np.arange(int(SR * d)) / SR; f = 300 + 80 * np.sin(2 * np.pi * 3 * tt2); add(fx, t0, np.sign(tone(f, d)) * (rng.random(int(SR * d)) > .6) * np.sin(np.pi * tt2 / d), g * .5)

def windhowl(t0, d, g=.12):
    n = lpf(noise(d), .03); tt2 = np.arange(len(n)) / SR; n *= (1 + .7 * np.sin(2 * np.pi * .4 * tt2) + .3 * np.sin(2 * np.pi * 1.3 * tt2)); n *= np.minimum(1, tt2 / .5) * np.minimum(1, (d - tt2) / .5); add(fx, t0, n / np.abs(n).max(), g)
    tw = np.arange(int(SR * d)) / SR; f = 500 + 200 * np.sin(2 * np.pi * .3 * tw); add(fx, t0, tone(f, d) * .15 * np.minimum(1, tw / .5) * np.minimum(1, (d - tw) / .5), g)
def knock(t0, g=.45): add(fx, t0, tone(np.linspace(260, 160, int(SR * .1)), .1) * env(int(SR * .1), .001, .03), g); add(fx, t0, lpf(noise(.05), .3) * env(int(SR * .05), .001, .01), g * .6)
def crunch_step(t0, g=.15): n = np.diff(noise(.09), prepend=0) * (rng.random(int(SR * .09)) > .5); add(fx, t0, n * env(len(n), .003, .03), g)
def chirp(t0, g=.1): d = .12; f = np.linspace(3000, 4200, int(SR * d)); add(fx, t0, tone(f, d) * env(int(SR * d), .005, .04), g)
def beep(t0, g=.12): add(fx, t0, tone(1000, .12) * env(int(SR * .12), .002, .1), g)
def hum(t0, d, g=.06): tt2 = np.arange(int(SR * d)) / SR; add(fx, t0, (tone(60, d) + .5 * tone(120, d) + .3 * tone(180, d)) * np.minimum(1, tt2 / .2) * np.minimum(1, (d - tt2) / .3), g)

def chatter(t0, t1, g=.12):
    t = t0
    while t < t1: add(fx, t, np.diff(noise(.012), prepend=0) * env(int(SR * .012), .0005, .003), g); t += .045 + rng.random() * .01
def click(t0, g=.5): add(fx, t0, np.diff(noise(.02), prepend=0) * env(int(SR * .02), .0005, .004), g); add(fx, t0 + .03, tone(1800, .03) * env(int(SR * .03), .001, .01), g * .4)
def water(t0, d, g=.25): n = lpf(noise(d), .15); n *= np.minimum(1, np.arange(len(n)) / (SR * .2)) * np.minimum(1, (len(n) - np.arange(len(n))) / (SR * .4)); add(fx, t0, n / np.abs(n).max(), g)
def brrr(t0, d=1.2, g=.25): tt2 = np.arange(int(SR * d)) / SR; add(fx, t0, tone(90 + 10 * np.sin(2 * np.pi * 25 * tt2), d, 'tri') * np.sign(np.sin(2 * np.pi * 28 * tt2)) * .5 * np.minimum(1, tt2 / .05) * np.minimum(1, (d - tt2) / .2), g)

def kaching(t0, g=.3): ding(t0, 2637, g); ding(t0 + .05, 3520, g * .8); [coin(t0 + .08 + k * .04, .12) for k in range(5)]
def notif(t0, g=.15): ding(t0, 1760, g); ding(t0 + .07, 2349, g * .8)
def applause(t0, d=2.0, g=.15):
    n = np.zeros(int(SR * d))
    for k in range(400):
        i = int(rng.random() * (len(n) - 800)); n[i:i + 800] += np.diff(noise(800 / SR), prepend=0)[:800] * np.exp(-np.arange(800) / 120)
    n *= np.minimum(1, np.arange(len(n)) / (SR * .3)) * np.minimum(1, (len(n) - np.arange(len(n))) / (SR * .5)); add(fx, t0, n / np.abs(n).max(), g)


def scurry(t0, d, g=.1):
    k = t0
    while k < t0 + d: tick(k, g, 2200 + rng.random() * 800); k += .06 + rng.random() * .03
def giggle(t0, d, g=.12):
    k = t0
    while k < t0 + d:
        f = 520 + rng.random() * 220; dd = .09; ff = np.linspace(f * 1.25, f, int(SR * dd)); add(fx, k, tone(ff, dd, 'tri') * env(int(SR * dd), .005, .05), g); k += .13 + rng.random() * .05
def tickle(t0, d, g=.07):
    k = t0
    while k < t0 + d: squeak(k, g); k += .22 + rng.random() * .1
for tc in [3.5, 7.5, 14.5, 20.2, 27.2, 34.2]: whoosh(tc, .35, .22)
tickle(0.2, wf('no') - .4, .05)
slide_down(wf('no'), .2); pop(wf('no'), .3, 500)
pop(wf('por'), .3); ding(wf('cerebro'), 1320, .15); whistle(wf('espiando'), .5, .08)
zap(wf('mano'), .12); hum(wf('mano'), 5.5, .04); ding(wf('cerebelo'), 1760, .16); shimmer(wf('predice'), 8, .05)
for k in range(6): tick(wf('baja') + k * .12, .2, 1400 - k * 120)
slide_down(wf('baja') + .1, .15)
tickle(14.6, 5.0, .03); snore(wf('viene') + .2, 2.5, .06)
scratch(wf('sorpresa'), .25); pop(wf('cosquillas', 1), .25, 600)
whoosh(wf('alguien') + .3, .4, .25); tickle(wf('toca'), 6.0, .07); boing(wf('adivinar'), .15)
bigpum(wf('ataque'), .5); giggle(wf('ataque') + .1, 1.8, .12)
beep(wf('robot'), .1); hum(wf('robot'), 4.5, .05); tickle(wf('toque'), 1.0, .04)
for k in range(4): tick(wf('dos') + k * .25, .2)
ding(wf('tarde'), 2093, .18); pop(wf('ya', 1), .35, 900); giggle(wf('ya', 1) + .1, 1.2, .12)
tickle(34.3, 4.5, .06); giggle(34.6, 4.6, .08); pop(wf('dónde'), .3)
write('audio/music.wav', mus * .9); write('audio/fx.wav', fx)
