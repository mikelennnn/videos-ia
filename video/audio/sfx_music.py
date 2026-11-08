# Genera música de fondo y efectos sincronizados (sin dependencias externas salvo numpy)
import numpy as np, wave, json
SR = 44100; DUR = 57.5; N = int(SR * DUR)
rng = np.random.default_rng(7)
words = json.load(open('audio/words.json'))
ws = lambda i: words[i]['s']
def write(name, x):
    x = np.clip(x, -1, 1); d = (x * 32767).astype(np.int16)
    with wave.open(name, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(np.repeat(d[:, None], 2, 1).tobytes())
def env(n, a=.005, r=.3):
    t = np.arange(n) / SR; return np.minimum(1, t / a) * np.exp(-t / r)
def add(buf, t0, x, g=1.0):
    i = int(t0 * SR); j = min(N, i + len(x)); buf[i:j] += x[:j - i] * g
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

# ---------- música ----------
mus = np.zeros(N); bpm = 100; beat = 60 / bpm; bar = beat * 4
nt = lambda m: 440 * 2 ** ((m - 69) / 12)
prog = [(57, [57, 60, 64]), (53, [53, 57, 60]), (48, [48, 52, 55]), (55, [55, 59, 62])]  # Am F C G
sad = [(57, [57, 60, 64]), (50, [50, 53, 57])]
arp = [0, 1, 2, 1, 2, 0, 1, 2]
t = 0.0; b = 0
while t < DUR:
    motel = 43.1 <= t < 50.4
    root, ch = (sad if motel else prog)[b % (2 if motel else 4)]
    # pad
    pd = np.zeros(int(SR * bar))
    for m in ch: pd += tone(nt(m), bar) * .5 + tone(nt(m) * 1.003, bar, 'tri') * .3
    e = np.minimum(1, np.arange(len(pd)) / (SR * .4)) * np.minimum(1, (len(pd) - np.arange(len(pd))) / (SR * .4))
    add(mus, t, pd * e, .045 if not motel else .06)
    # bajo
    add(mus, t, tone(nt(root - 12), beat * 2) * env(int(SR * beat * 2), .01, .5), .22)
    add(mus, t + beat * 2, tone(nt(root - 12), beat * 2) * env(int(SR * beat * 2), .01, .5), .16)
    if not motel and t > 0.5:
        for k in range(8):  # pluck tipo marimba
            m = ch[arp[k]] + 12; d = .5
            x = (tone(nt(m), d) + .35 * tone(nt(m) * 4, d)) * env(int(SR * d), .002, .16)
            add(mus, t + k * beat / 2, x, .09)
        for k in range(8):  # hi-hat suave
            if k % 2: add(mus, t + k * beat / 2, np.diff(noise(.05), prepend=0) * env(int(SR * .05), .001, .015), .05)
    t += bar; b += 1
mus *= np.minimum(1, np.arange(N) / (SR * .3)) * np.clip((DUR - np.arange(N) / SR) / 1.2, 0, 1)

# ---------- efectos ----------
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

for tc in [4.45, 10.9, 13.2, 19.7, 25.2, 30.6, 35.5, 39.15, 43.1, 50.5]: whoosh(tc)
slash(ws(6) + .05); thump(ws(6) + .05, .7)
whoosh(11.9, .5, .45); thump(11.98, .9)
for tb in [ws(8), ws(18), ws(31), ws(41), ws(47), ws(49), ws(51), ws(85), ws(94), ws(105), ws(108), ws(126)]: pop(tb)
for k in range(3): pop(ws(60) + k * .2, .25, 1300)
ding(ws(65))
for k in range(6): drip(ws(73) - .25 + .5 + (k + 1) / 2.6)
for k in range(28): coin(35.6 + rng.random() * 3.4)
boing(ws(108))
rain = lpf(noise(7.4), .3) * .5; rain *= np.minimum(1, np.arange(len(rain)) / (SR * .5)) * np.minimum(1, (len(rain) - np.arange(len(rain))) / (SR * .4)); add(fx, 43.1, rain, .12)
for st in [.3, 1.4, 2.5, 3.4, 4.3, 5.1]: firework(50.5 + st)
write('audio/music.wav', mus * .9); write('audio/fx.wav', fx * .8)
print('ok')
