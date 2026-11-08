# Genera música de fondo y efectos sincronizados (sin dependencias externas salvo numpy)
import numpy as np, wave, json
SR = 44100; DUR = 56.0; N = int(SR * DUR)
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


mus = np.zeros(N); bpm = 112; beat = 60 / bpm; bar = beat * 4
nt = lambda m: 440 * 2 ** ((m - 69) / 12)
prog = [(48, [60, 64, 67]), (45, [57, 60, 64]), (41, [53, 57, 60]), (43, [55, 59, 62])]  # C Am F G
mel = [0, 1, 2, 1, 2, 1, 0, 2]
t = 0.0; b = 0
while t < DUR:
    root, ch = prog[b % 4]
    pd = np.zeros(int(SR * bar))
    for m in ch: pd += tone(nt(m), bar) * .45 + tone(nt(m) * 1.004, bar, 'tri') * .3
    e = np.minimum(1, np.arange(len(pd)) / (SR * .3)) * np.minimum(1, (len(pd) - np.arange(len(pd))) / (SR * .3))
    add(mus, t, pd * e, .035)
    for k in range(4):  # bajo saltarín
        m = root - 12 + (7 if k % 2 else 0); add(mus, t + k * beat, tone(nt(m), beat) * env(int(SR * beat), .005, .18), .2)
    for k in range(8):  # glockenspiel
        m = ch[mel[k]] + 24; d = .6
        x = (tone(nt(m), d) + .5 * tone(nt(m) * 2.76, d) + .25 * tone(nt(m) * 5.4, d)) * env(int(SR * d), .001, .22)
        add(mus, t + k * beat / 2, x, .05)
    for k in range(8):  # cascabeles
        n = np.diff(np.diff(noise(.09), prepend=0), prepend=0); jing = n * env(len(n), .002, .03 if k % 2 else .05)
        add(mus, t + k * beat / 2 + (0.03 if k % 2 else 0), jing, .035 if k % 2 else .05)
    t += bar; b += 1
mus *= np.minimum(1, np.arange(N) / (SR * .3)) * np.clip((DUR - np.arange(N) / SR) / 1.2, 0, 1)
gap = (np.arange(N) / SR > 45.3) & (np.arange(N) / SR < 45.6); mus[gap] *= .15

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


for tc in [5.95, 11.45, 19.45, 25.8, 31.4, 36.6, 41.15, 45.45]: whoosh(tc)
for tb in [ws(14), ws(25), ws(37), ws(67), ws(70), ws(87), ws(100), ws(110), ws(140) + .05]: pop(tb)
for k in range(10): coin(ws(7) + k * .05 + rng.random() * .05, .1)
for k in range(6): ding(ws(44) + k * .08, 1800 + k * 220, .06)
ding(ws(47), 1568, .2); ding(ws(47) + .1, 2093, .15)
for k in range(23): add(fx, ws(60) + k * 3.2 / 23, lpf(noise(.04), .5) * env(int(SR * .04), .001, .01), .25)
whoosh(ws(66) + .4, .8, .3)
for k, f in enumerate([1047, 1319, 1568, 2093]): ding(ws(77) + k * .09, f, .16)
firework(ws(76), .3)
for k in range(40): add(fx, 31.7 + k * .08, tone(2400, .02) * env(int(SR * .02), .001, .005), .12)
ding(ws(88) + .4, 1760, .2)
for k in range(16): coin(36.8 + rng.random() * 4.0, .06)
for k in range(5): add(fx, ws(119) + k * .2, np.diff(noise(.06), prepend=0) * env(int(SR * .06), .001, .02), .35)
add(fx, 45.6, np.diff(noise(.8), prepend=0) * env(int(SR * .8), .001, .18), .5); thump(45.6, .6)
ding(ws(140), 2637, .3); ding(ws(140) + .06, 3136, .25)
for k in range(25): coin(ws(140) + rng.random() * 1.2, .12)
write('audio/music.wav', mus * .9); write('audio/fx.wav', fx * .8)
print('ok')
