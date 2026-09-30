"""Energetic narration for the style sample: slightly faster, tighter gaps, per-line clips."""
import json, pathlib, re, sys
import numpy as np, soundfile as sf
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import voice as V  # reuses the blended narrator, respellings and word timing

ROOT = V.ROOT
data = json.loads((ROOT / 'src/ig2/sample.json').read_text())
SR, GAP = 24000, 0.16
pieces, t, lines = [np.zeros(int(0.12 * SR), np.float32)], 0.12, []
for i, ln in enumerate(data['lines']):
    speed = 1.12 if ln['beat'] not in ('hook', 'punch', 'loop') else 1.0
    a, _ = V.tts.speak(V.spoken(ln['text']), 'blend', speed=speed)
    a = V.trim(a.astype(np.float32))
    a = a * (10 ** (-18 / 20) / (np.sqrt(np.mean(a ** 2)) + 1e-9))
    a = np.tanh(a * 1.15) / np.tanh(1.15)
    d = len(a) / SR
    lines.append({**ln, 'start': round(t, 3), 'end': round(t + d, 3), 'words': V.word_times(ln['text'], t + 0.03, t + d - 0.03)})
    pieces += [a, np.zeros(int((0.32 if ln['beat'] in ('hook', 'tease', 'punch') else GAP) * SR), np.float32)]
    t += d + (0.32 if ln['beat'] in ('hook', 'tease', 'punch') else GAP)
audio = np.concatenate(pieces + [np.zeros(int(0.8 * SR), np.float32)])
sf.write(ROOT / 'public/ig2/sample/voice.wav', audio, SR, subtype='PCM_16')
(ROOT / 'src/ig2/sample.timing.json').write_text(json.dumps({'duration': round(len(audio) / SR, 3), 'lines': lines}, ensure_ascii=False, indent=1))
print('duration', round(len(audio) / SR, 2))
for l in lines: print(f"{l['start']:6.2f} {l['end']:6.2f} {l['beat']:6s} {l['text']}")
