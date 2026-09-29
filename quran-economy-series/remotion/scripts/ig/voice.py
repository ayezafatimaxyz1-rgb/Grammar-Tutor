"""Build the narration for one Instagram episode with the local Kokoro-82M model.

Usage: python3 scripts/ig/voice.py epi01

Reads  src/ig/episodes/<id>.json
Writes public/ig/<id>/sNN.wav          one clip per scene (24 kHz mono)
       src/ig/episodes/<id>.timing.json scene durations + sentence and word timings

Narrator: a 70/30 blend of Kokoro's am_michael and am_onyx voices, chosen to match the pitch
(≈100 Hz median, ≈39 Hz range) of the Zafar reference clips used in the Urdu pilot.
"""
import json, re, sys, pathlib
import numpy as np, soundfile as sf

sys.path.insert(0, '/opt/kokoro')
import tts  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parents[2]
SR = 24000
SPEED = 0.95
LEAD, GAP, TAIL = 0.30, 0.38, 0.55   # seconds: before first sentence, between sentences, after last

# Spoken respellings for Arabic names and terms; captions keep the proper spelling.
SAY = {
    r"\bQur'an\b": 'Kuraan', r'\bQuran\b': 'Kuraan', r"\bQuran's\b": "Kuraan's", r"\bQur'anic\b": 'Kuraanic',
    r"\bAl-Jumu'ah\b": 'al Joomooah', r"\bJumu'ah\b": 'Joomooah', r'\bSurah\b': 'Soorah',
    r'\btafsir\b': 'tafseer', r'\bBukhari\b': 'Bukhaari', r'\bHira\b': 'Heeraa', r'\bdunya\b': 'doonyaa',
    r'\bdeen\b': 'deen', r'\bNouman\b': 'Noamaan', r'\bSahih\b': 'Saheeh', r'\bAl-A\'raf\b': 'al Araaf',
}

def spoken(text):
    for pat, rep in SAY.items():
        text = re.sub(pat, rep, text)
    return text

blend = np.load('/opt/kokoro/voices/blend_70.npy')
tts.voice = lambda _name: blend

def trim(a, thr=0.01):
    idx = np.where(np.abs(a) > thr)[0]
    return a[max(idx[0] - 240, 0): idx[-1] + 480] if len(idx) else a

def word_times(text, start, end):
    """Spread words over [start, end] in proportion to their letter count (a proxy for phonemes),
    with a little extra weight after punctuation for the pause the voice makes there."""
    words = text.split()
    weights = []
    for w in words:
        core = re.sub(r"[^\w']", '', w)
        weights.append(max(len(core), 2) + (3 if re.search(r'[,;:.?!]$', w) else 0))
    total = sum(weights)
    t, out = start, []
    for w, wt in zip(words, weights):
        d = (end - start) * wt / total
        out.append({'w': w, 'start': round(t, 3), 'end': round(t + d, 3)})
        t += d
    return out

def main(ep_id):
    ep = json.loads((ROOT / f'src/ig/episodes/{ep_id}.json').read_text())
    out_dir = ROOT / f'public/ig/{ep_id}'
    out_dir.mkdir(parents=True, exist_ok=True)
    timing = {'id': ep_id, 'fps': 30, 'scenes': []}
    for i, scene in enumerate(ep['scenes']):
        pieces, sentences, t = [np.zeros(int(LEAD * SR), np.float32)], [], LEAD
        for j, text in enumerate(scene['narration']):
            a, _ = tts.speak(spoken(text), 'blend', speed=SPEED)
            a = trim(a.astype(np.float32))
            rms = np.sqrt(np.mean(a ** 2)) + 1e-9
            a = a * (10 ** (-19 / 20) / rms)                 # speech RMS at -19 dBFS
            a = np.tanh(a * 1.1) / np.tanh(1.1)              # soft limiter for peaks
            dur = len(a) / SR
            sentences.append({'text': text, 'start': round(t, 3), 'end': round(t + dur, 3),
                              'words': word_times(text, t + 0.05, t + dur - 0.05)})
            pieces.append(a)
            t += dur
            gap = GAP if j < len(scene['narration']) - 1 else TAIL
            pieces.append(np.zeros(int(gap * SR), np.float32))
            t += gap
        audio = np.concatenate(pieces)
        path = out_dir / f's{i + 1:02d}.wav'
        sf.write(path, audio, SR, subtype='PCM_16')
        timing['scenes'].append({'voice': f'ig/{ep_id}/s{i + 1:02d}.wav', 'duration': round(len(audio) / SR, 3), 'sentences': sentences})
        print(f'scene {i + 1:2d} {scene["template"]:10s} {len(audio) / SR:6.2f}s')
    (ROOT / f'src/ig/episodes/{ep_id}.timing.json').write_text(json.dumps(timing, ensure_ascii=False, indent=1))
    print('total', round(sum(s['duration'] for s in timing['scenes']), 1), 's')

if __name__ == '__main__':
    main(sys.argv[1])
