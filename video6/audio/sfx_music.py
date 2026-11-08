# Genera música de fondo y efectos sincronizados (sin dependencias externas salvo numpy)
import numpy as np, wave, json
SR = 44100; DUR = 61.2; N = int(SR * DUR)
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






mus = np.zeros(N); bpm = 98; beat = 60 / bpm; bar = beat * 4
nt = lambda m: 440 * 2 ** ((m - 69) / 12)
prog = [(45, [57, 60, 64]), (50, [62, 65, 69]), (52, [64, 68, 71]), (45, [57, 60, 64])]  # Am Dm E Am
t = 0.0; b = 0
while t < DUR:
    root, ch = prog[b % 4]
    for k in range(4):  # bajo de cumbia: raíz y quinta
        m = root - 12 + (7 if k % 2 else 0); add(mus, t + k * beat, (tone(nt(m), beat * .6) + .3 * tone(nt(m) * 2, beat * .6, 'tri')) * env(int(SR * beat * .6), .005, .18), .22)
    for k in range(4):  # acordeón en contratiempo
        d = beat * .4; x = np.zeros(int(SR * d))
        for m in ch: x += tone(nt(m) * 1.003, d, 'tri') + tone(nt(m) * .997, d, 'tri')
        add(mus, t + k * beat + beat / 2, x * env(int(SR * d), .01, .12) / 3, .07)
    for k in range(8):  # güiro
        d = beat * .35; n = np.diff(noise(d), prepend=0); n *= (np.sin(np.linspace(0, 60, len(n))) > 0) * np.linspace(.3, 1, len(n)) * np.exp(-np.linspace(0, 3, len(n))); add(mus, t + k * beat / 2, n, .03)
    t += bar; b += 1
tt = np.arange(N) / SR
mus *= np.minimum(1, tt / .3) * np.clip((DUR - tt) / 1.2, 0, 1)

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
tb = wf('mordida') + .15
for tc in [5.0, 11.55, 16.2, 24.8, 32.6, 35.5, 44.2, 51.15, 53.95]: whoosh(tc, .4, .22)
sizzle(0, tb); crunch(tb); bigpum(tb, .4)
for k in range(14): plip(5.2 + rng.random() * 6.0)
for k in range(14): tick(wf('enzima') + k * .11, .15, 700 + (k % 3) * 200)
pop(wf('saliva')); pop(wf('enzima'))
fire(11.6, 4.5); slide_down(wf('engaña'), .25); thump(wf('engaña') + .2, .5); pop(wf('calor') - .2)
for k in range(8): thump(16.6 + k * 1.05, .25)
pop(wf('músculos')); pop(wf('cabeza') - .25)
add(fx, 24.9, lpf(noise(.6), .2) * env(int(SR * .6), .01, .2), .35)
for k in range(60): bubble(24.9 + rng.random() * 10.5)
pop(wf('ácido')); shimmer(wf('renueva'), 10, .05, 1200)
for k in range(5): whoosh(32.9 + k * .55, .4, .15)
pop(wf('cuatro'))
slide_up(35.8); slide_down(37.5, .15); slide_up(40.2, .15); slide_down(42.5, .15)
for w in ['carne', 'piña']: shimmer(wf(w), 6, .05, 1300); pop(wf(w))
shimmer(wf('tortilla', 1), 6, .05, 1300); pop(wf('tortilla', 1)); pop(wf('seis'))
for k in range(12): thump(44.4 + k * .6, .15)
pop(wf('billones'))
for k in range(14): tick(wf('comen') + k * .09, .15, 900)
for k in range(3): tick(wf('uno') + k * .33, .3, 600)
for k in range(10): tick(51.3 + k * .25, .12, 2500)
pop(wf('uno'))
thump(wf('termina'), .6); flush(wf('termina') + .05); shimmer(wf('termina') + .3, 12, .05, 1500)
pop(57.9)
write('audio/music.wav', mus * .9); write('audio/fx.wav', fx * .8)
print('ok')
