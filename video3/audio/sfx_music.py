# Genera música de fondo y efectos sincronizados (sin dependencias externas salvo numpy)
import numpy as np, wave, json
SR = 44100; DUR = 58.0; N = int(SR * DUR)
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
prog = [(50, [62, 65, 69]), (46, [58, 62, 65]), (48, [60, 64, 67]), (45, [57, 61, 64])]  # Dm Bb C A
arp = [0, 2, 1, 2, 0, 2, 1, 2]
t = 0.0; b = 0
while t < DUR:
    root, ch = prog[b % 4]
    pd = np.zeros(int(SR * bar))
    for m in ch: pd += tone(nt(m), bar) * .45 + tone(nt(m) * 1.004, bar, 'tri') * .3
    e = np.minimum(1, np.arange(len(pd)) / (SR * .3)) * np.minimum(1, (len(pd) - np.arange(len(pd))) / (SR * .3))
    add(mus, t, pd * e, .035)
    for k in range(4): add(mus, t + k * beat, tone(nt(root - 12), beat * .5) * env(int(SR * beat * .5), .003, .09), .22)
    for k in range(8):  # pizzicato
        m = ch[arp[k]] + 12; d = .35; x = (tone(nt(m), d) + .3 * tone(nt(m) * 2, d)) * env(int(SR * d), .001, .08); add(mus, t + k * beat / 2, x, .1)
    for k in range(4):
        if k % 2: add(mus, t + k * beat, np.diff(noise(.04), prepend=0) * env(int(SR * .04), .001, .012), .06)
    t += bar; b += 1
mus *= np.minimum(1, np.arange(N) / (SR * .3)) * np.clip((DUR - np.arange(N) / SR) / 1.2, 0, 1)

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
for tc in [5.4, 9.7, 14.6, 20.5, 26.8, 34.1, 38.9, 43.9, 53.2]: whoosh(tc)
wind(0, 5.4, .12); wind(34.1, 4.8, .12); chatter(.3, 3.8); chatter(34.2, 37.8)
poof(ws(13) - .05); boing(ws(13)); slide_down(5.0); poof(5.0, .25)
for tb in [ws(3), ws(31), ws(60), ws(96), ws(117), ws(122), ws(53) - .1, ws(71), ws(111)]: pop(tb)
boing(ws(22), .2); shimmer(ws(31), 14, .05, 900)
poof(ws(47), .2); whoosh(ws(56) + .4, .4, .3); hiss(ws(57) + .35); boing(ws(57) + .35, .3); hiss(ws(66), .15)
poof(ws(75) - .1, .45); shimmer(ws(75), 8, .06, 1400); shimmer(ws(81), 6, .05, 1800)
shimmer(ws(106), 12, .05, 1000); zap(ws(111))
ding(ws(122), 1568, .2); shimmer(ws(127), 12, .05, 900)
ding(53.4, 1319, .15); ding(53.55, 1760, .15)
write('audio/music.wav', mus * .9); write('audio/fx.wav', fx * .8)
print('ok')
