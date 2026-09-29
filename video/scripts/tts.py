#!/usr/bin/env python3
"""Generate every narration clip locally with Kokoro (free, offline text-to-speech).

    pip install kokoro-onnx soundfile
    python3 scripts/tts.py            # all clips
    python3 scripts/tts.py m04 s2b    # only these ids

The model (about 350 MB) is downloaded once into video/.tts/. Voice and speed are set in
src/script.json under "voice". Run scripts/prepare.py afterwards to rebuild timings.
"""
import json, os, subprocess, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(ROOT, ".tts")
BASE = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/"
FILES = ["kokoro-v1.0.onnx", "voices-v1.0.bin"]


def ensure_model():
    os.makedirs(MODEL_DIR, exist_ok=True)
    for f in FILES:
        path = os.path.join(MODEL_DIR, f)
        if not os.path.exists(path):
            print(f"downloading {f}…")
            urllib.request.urlretrieve(BASE + f, path)


def speakable(text):
    # quotation marks are for the eye; apostrophes stay so contractions read naturally
    return text.replace("‘", "").replace("’ ", " ").replace("’:", ":").replace("’,", ",").replace("’.", ".") \
               .replace("’", "'").replace("“", "").replace("”", "")


def audio_name(seg_id):
    return f"main_{seg_id[1:]}" if seg_id.startswith("m") else seg_id


def main():
    import soundfile as sf
    from kokoro_onnx import Kokoro

    script = json.load(open(os.path.join(ROOT, "src/script.json")))
    voice = script["voice"]
    ensure_model()
    k = Kokoro(os.path.join(MODEL_DIR, FILES[0]), os.path.join(MODEL_DIR, FILES[1]))
    segs = [b for v in script["videos"] for b in v["beats"]]
    only = set(sys.argv[1:])
    out_dir = os.path.join(ROOT, "public/audio")
    os.makedirs(out_dir, exist_ok=True)
    for seg in segs:
        if only and seg["id"] not in only:
            continue
        samples, sr = k.create(speakable(seg["text"]), voice=voice["voice_id"], speed=voice.get("speed", 1.0), lang=voice.get("lang", "en-gb"))
        wav = os.path.join(out_dir, audio_name(seg["id"]) + ".wav")
        mp3 = wav[:-4] + ".mp3"
        sf.write(wav, samples, sr)
        subprocess.run(["npx", "remotion", "ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-ac", "1", "-b:a", "128k", mp3], cwd=ROOT, check=True)
        os.remove(wav)
        print(f"{seg['id']}: {len(samples) / sr:.1f}s")


if __name__ == "__main__":
    main()
