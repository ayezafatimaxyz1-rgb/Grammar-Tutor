"""Narrate a note page line by line (exact translation), one continuous clip plus timings."""
import json, pathlib, sys
import numpy as np, soundfile as sf
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import voice as V
page = sys.argv[1]
ROOT = V.ROOT
data = json.loads((ROOT / f'src/notes/{page}.json').read_text())
SR = 24000
pieces, t, out = [np.zeros(int(0.5 * SR), np.float32)], 0.5, []
for i, ln in enumerate(data['lines']):
    a, _ = V.tts.speak(V.spoken(ln['text']), 'blend', speed=1.0)
    a = V.trim(a.astype(np.float32))
    a = a * (10 ** (-18 / 20) / (np.sqrt(np.mean(a ** 2)) + 1e-9)); a = np.tanh(a * 1.1) / np.tanh(1.1)
    d = len(a) / SR
    out.append({'start': round(t, 3), 'end': round(t + d, 3), 'words': V.word_times(ln['text'], t + 0.03, t + d - 0.03)})
    gap = 0.75 if i + 1 < len(data['lines']) and data['lines'][i + 1]['part'] != ln['part'] else 0.4
    pieces += [a, np.zeros(int(gap * SR), np.float32)]; t += d + gap
audio = np.concatenate(pieces + [np.zeros(int(1.6 * SR), np.float32)])
sf.write(ROOT / f'public/notes/{page}/voice.wav', audio, SR, subtype='PCM_16')
(ROOT / f'src/notes/{page}.timing.json').write_text(json.dumps({'duration': round(len(audio) / SR, 3), 'lines': out}, indent=1))
print('duration', round(len(audio) / SR, 1))
