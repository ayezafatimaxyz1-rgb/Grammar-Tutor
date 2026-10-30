"""Speak every segment of a video script with the free Kokoro voice (runs offline).

Usage: python narrate.py script.json audio_dir --model kokoro-q8.onnx --voices voices.npz [--voice af_heart]
Writes audio_dir/<lesson>-<index>.wav for each segment and audio_dir/durations.json.
Already-spoken segments are skipped, so the job can be resumed.
"""
import argparse, json, os, re
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

SR = 24000
KEEP_CAPS = {"CSS", "FPSC", "UN", "AmE", "BrE"}

def speakable(t):
    t = t.replace("✗", "").replace("✓", "").replace("→", " becomes ").replace("⟷", " and ")
    t = t.replace("≠", " is not the same as ").replace("·", ",").replace("…", "...")
    t = re.sub(r"\bBrE\b", "British English", t)
    t = re.sub(r"\bAmE\b", "American English", t)
    t = re.sub(r"\bRs\s?([\d,]+)", r"\1 rupees", t)
    t = re.sub(r"(\d)\s?%", r"\1 per cent", t)
    t = re.sub(r"(\d)\s?km/h", r"\1 kilometres per hour", t)
    t = re.sub(r"(\d)\s?°C", r"\1 degrees Celsius", t)
    t = re.sub(r"\bkm\b", "kilometres", t)
    t = re.sub(r"\s=\s", " means ", t)
    t = re.sub(r"(\w)/(\w)", r"\1 or \2", t)
    t = re.sub(r"\be\.g\.", "for example", t)
    # Words written in capitals for emphasis (IN, ON, AT) are read as words, not letters.
    t = re.sub(r"\b[A-Z]{2,}\b", lambda m: m.group(0) if m.group(0) in KEEP_CAPS else m.group(0).lower(), t)
    t = re.sub(r"\s+", " ", t).strip()
    return t

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("script"); ap.add_argument("out")
    ap.add_argument("--model", required=True); ap.add_argument("--voices", required=True)
    ap.add_argument("--voice", default="af_heart"); ap.add_argument("--speed", type=float, default=0.95)
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    script = json.load(open(a.script))
    dpath = os.path.join(a.out, "durations.json")
    durations = json.load(open(dpath)) if os.path.exists(dpath) else {}
    tts = Kokoro(a.model, a.voices)
    lang = "en-us" if a.voice.startswith("a") else "en-gb"
    for unit in script["units"]:
        for lesson in unit["lessons"]:
            for i, seg in enumerate(lesson["segs"]):
                key = f'{lesson["id"]}-{i:03d}'
                wav = os.path.join(a.out, key + ".wav")
                if key in durations and os.path.exists(wav):
                    continue
                if seg["text"]:
                    audio, _ = tts.create(speakable(seg["text"]), voice=a.voice, speed=a.speed, lang=lang)
                else:
                    audio = np.zeros(int(SR * seg.get("seconds", 1)), dtype=np.float32)
                sf.write(wav, audio, SR)
                durations[key] = len(audio) / SR
            json.dump(durations, open(dpath, "w"))
            print("spoke", lesson["id"], flush=True)

if __name__ == "__main__":
    main()
