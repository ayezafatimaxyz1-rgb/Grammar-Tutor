"""Synthesize the series' sound effects (no samples, no music). Writes public/ig/sfx/*.wav at 44.1 kHz."""
import pathlib
import numpy as np, soundfile as sf

SR = 44100
OUT = pathlib.Path(__file__).resolve().parents[2] / 'public/ig/sfx'
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(7)

def t(sec): return np.arange(int(sec * SR)) / SR

def lowpass(x, cutoff):
    """One-pole low-pass; cutoff may be an array (time-varying)."""
    cutoff = np.broadcast_to(cutoff, x.shape)
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)):
        acc = (1 - a[i]) * x[i] + a[i] * acc; y[i] = acc
    return y

def bandpass(x, lo, hi): return lowpass(x, hi) - lowpass(x, lo)

def env(n, attack, release, curve=3.0):
    e = np.ones(n); a = int(attack * SR); r = int(release * SR)
    if a: e[:a] = np.linspace(0, 1, a) ** 2
    if r: e[-r:] *= np.linspace(1, 0, r) ** curve
    return e

def norm(x, peak_db):
    return x / (np.max(np.abs(x)) + 1e-9) * 10 ** (peak_db / 20)

def save(name, x, peak_db=-6, stereo_width=0.0):
    x = norm(x, peak_db).astype(np.float32)
    if stereo_width:
        d = int(0.012 * SR)
        r = np.concatenate([np.zeros(d, np.float32), x[:-d]])
        x = np.stack([x, (1 - stereo_width) * x + stereo_width * r], 1)
    sf.write(OUT / f'{name}.wav', x, SR, subtype='PCM_16')
    print(name, round(len(x) / SR, 2), 's')

# Whoosh: band-passed noise sweeping up then down, for scene transitions.
n = t(0.9); noise = rng.standard_normal(len(n))
sweep = 300 + 4200 * np.sin(np.pi * np.clip(n / 0.9, 0, 1)) ** 2
save('whoosh', lowpass(noise, sweep) * env(len(n), 0.35, 0.5), -9, 0.5)

# Soft whoosh for small moves.
n = t(0.5); noise = rng.standard_normal(len(n))
save('swish', lowpass(noise, 900 + 2500 * np.sin(np.pi * n / 0.5)) * env(len(n), 0.18, 0.3), -14, 0.4)

# Title hit: a low sine thump with a pitch drop and a breath of noise.
n = t(2.2); f = 58 + 40 * np.exp(-n * 9)
thump = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-n * 2.2)
air = lowpass(rng.standard_normal(len(n)), 1800) * np.exp(-n * 6) * 0.25
save('hit', thump + air, -4, 0.3)

# Riser into the title: filtered noise swelling up.
n = t(1.6); noise = rng.standard_normal(len(n))
save('riser', lowpass(noise, 200 + 5000 * (n / 1.6) ** 2) * (n / 1.6) ** 2.5 * env(len(n), 0.0, 0.05), -12, 0.6)

# Verse chime: a single soft bell tone (inharmonic partials, long decay), for Qur'anic text reveals.
n = t(3.0); f0 = 523.25
bell = sum(a * np.sin(2 * np.pi * f0 * r * n) * np.exp(-n * d)
           for r, a, d in [(1, 1.0, 1.6), (2.0, 0.35, 2.4), (2.76, 0.22, 3.2), (4.07, 0.12, 4.5), (5.4, 0.06, 6)])
save('chime', bell * env(len(n), 0.004, 0.3), -15, 0.5)

# UI tick: a very short click for badges and list items.
n = t(0.08)
save('tick', np.sin(2 * np.pi * 1800 * n) * np.exp(-n * 90) + 0.3 * rng.standard_normal(len(n)) * np.exp(-n * 200), -16)

# Pop: a rounded blip for icons appearing.
n = t(0.18); f = 420 + 380 * np.exp(-n * 30)
save('pop', np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-n * 22), -15)

# Correction swipe: a quick marker-like scrape, for strike-throughs.
n = t(0.35); noise = rng.standard_normal(len(n))
save('strike', bandpass(noise, 1200, 5000) * env(len(n), 0.02, 0.2), -13)

# Map ping: gentle sonar blip for points on a map.
n = t(0.9)
save('ping', np.sin(2 * np.pi * 880 * n) * np.exp(-n * 7) * (1 + 0.3 * np.sin(2 * np.pi * 6 * n)), -18, 0.5)

# Paper: short crinkle of filtered noise bursts, for paper-world scenes.
n = t(0.6); x = np.zeros(len(n))
for s in rng.uniform(0, 0.45, 26):
    i = int(s * SR); L = int(rng.uniform(0.005, 0.03) * SR)
    x[i:i + L] += rng.standard_normal(L) * rng.uniform(0.3, 1.0) * np.hanning(L)
save('paper', bandpass(x, 700, 7000), -18, 0.3)

# Ambience: 30 s of soft wind/room tone, loopable (crossfaded ends), sits under the voice.
n = t(30); noise = rng.standard_normal(len(n))
slow = 0.6 + 0.4 * np.sin(2 * np.pi * n / 11) * np.sin(2 * np.pi * n / 7.3)
amb = lowpass(noise, 380) * slow
fade = int(2 * SR); amb[:fade] = amb[:fade] * np.linspace(0, 1, fade) + amb[-fade:] * np.linspace(1, 0, fade)
save('ambience', amb[:-fade], -20, 0.7)
