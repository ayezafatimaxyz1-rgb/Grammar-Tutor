"""Extra sounds for the high-retention style: a soft heartbeat-style pulse bed and a deep impact."""
import pathlib, numpy as np, soundfile as sf
SR = 44100
OUT = pathlib.Path(__file__).resolve().parents[2] / 'public/ig/sfx'
t = lambda s: np.arange(int(s * SR)) / SR
def kick(freq=55, dur=0.35, drop=60, decay=11):
    n = t(dur); f = freq + drop * np.exp(-n * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-n * decay)
# 96 bpm pulse: "lub-dub" every beat, 20 s loop
bpm = 96; beat = 60 / bpm; L = int(20 * SR); bed = np.zeros(L)
for k in range(int(20 / beat)):
    i = int(k * beat * SR)
    for off, amp in [(0, 1.0), (0.16, 0.55)]:
        j = i + int(off * SR); s = kick() * amp
        bed[j:j + len(s)] += s[:max(0, L - j)]
rng = np.random.default_rng(3)
air = rng.standard_normal(L); a = np.exp(-2 * np.pi * 250 / SR); y = np.zeros(L); acc = 0
for i in range(L): acc = (1 - a) * air[i] + a * acc; y[i] = acc
bed += y * 0.6
bed = bed / np.abs(bed).max() * 10 ** (-8 / 20)
sf.write(OUT / 'pulse.wav', np.stack([bed, bed], 1).astype(np.float32), SR, subtype='PCM_16')
# impact: deep boom + noise burst tail
n = t(2.5); boom = kick(48, 2.5, 90, 2.0)
noise = rng.standard_normal(len(n)) * np.exp(-n * 5)
imp = boom + 0.25 * noise
imp = imp / np.abs(imp).max() * 10 ** (-3 / 20)
sf.write(OUT / 'impact.wav', imp.astype(np.float32), SR, subtype='PCM_16')
print('ok')
