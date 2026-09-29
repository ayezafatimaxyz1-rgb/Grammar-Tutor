#!/usr/bin/env python3
"""Build timing data, subtitles, transcript and sound effects from src/script.json.

Reads each narration clip's duration, estimates word start times inside it
(proportional to characters, with extra weight for punctuation pauses), and writes:
  src/timings.json            scene starts, durations and word times used by the Remotion scenes
  out/subtitles/*.srt, *.vtt  caption files for every video
  out/transcripts/*.txt       narration transcripts
  public/sfx/*.wav            subtle synthesised sound effects
Re-run after replacing any narration clip: `python3 scripts/prepare.py`.
"""
import json, math, os, re, struct, subprocess, wave

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FPS = 30
LEAD = 0.35  # seconds of visual before narration starts in each scene

script = json.load(open(os.path.join(ROOT, "src/script.json")))


def duration(path):
    out = subprocess.run(
        ["npx", "remotion", "ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
        cwd=ROOT, capture_output=True, text=True, check=True).stdout.strip()
    return float(out)


def audio_path(seg_id):
    name = f"main_{seg_id[1:]}" if seg_id.startswith("m") else seg_id
    return f"audio/{name}.mp3"


PAUSE = {",": 4, ";": 6, ":": 6, ".": 9, "?": 9, "!": 9}


def word_times(text, dur):
    words = text.split()
    weights = []
    for w in words:
        core = re.sub(r"[^\w’']", "", w)
        trail = w.rstrip("’'")[-1:] if w else ""
        weights.append(len(core) + 1.5 + PAUSE.get(trail, 0))
    total = sum(weights)
    # ElevenLabs clips carry ~0.15 s of leading and trailing air
    usable, start = max(dur - 0.35, 0.5), 0.15
    out, acc = [], 0.0
    for w, wt in zip(words, weights):
        out.append({"w": w, "t": round(start + usable * acc / total, 3)})
        acc += wt
    return out


def silences(path):
    err = subprocess.run(
        ["npx", "remotion", "ffmpeg", "-hide_banner", "-i", path, "-af", "silencedetect=noise=-38dB:d=0.12", "-f", "null", "-"],
        cwd=ROOT, capture_output=True, text=True).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    return list(zip(starts, ends))


def refine(words, sil, dur):
    """Snap estimated times to real pauses: after punctuation, speech resumes at a silence end."""
    anchors = [(words[0]["t"], 0.02 if not sil or sil[0][0] > 0.05 else sil[0][1])]
    used = set()
    for i in range(1, len(words)):
        if not re.search(r"[.,?!:;][’']?$", words[i - 1]["w"]):
            continue
        est = words[i]["t"]
        best = None
        for k, (s, e) in enumerate(sil):
            if k in used or e <= anchors[-1][1] + 0.1:
                continue
            d = abs(e - est)
            if d < 0.9 and (best is None or d < best[0]):
                best = (d, k, e)
        if best:
            used.add(best[1])
            anchors.append((est, best[2]))
    anchors.append((dur, dur))
    out = []
    for w in words:
        t = w["t"]
        for (a0, b0), (a1, b1) in zip(anchors, anchors[1:]):
            if a0 <= t <= a1:
                t = b0 + (b1 - b0) * ((t - a0) / (a1 - a0) if a1 > a0 else 0)
                break
        out.append({"w": w["w"], "t": round(t, 3)})
    return out


def apply_gaps(words, gaps, sil):
    """Insert thinking pauses before given phrases; returns shifted words and audio parts."""
    parts, cuts = [], []
    for g in gaps:
        first = g["before"].split()[0]
        k = next(i for i, w in enumerate(words) if w["w"] == first)
        t = words[k]["t"]
        pause = min(sil, key=lambda se: abs(se[1] - t)) if sil else (t, t)
        cuts.append((k, (pause[0] + pause[1]) / 2, g["sec"]))
    shifted, offset, prev = [dict(w) for w in words], 0.0, 0.0
    for k, cut, sec in cuts:
        parts.append({"from": round(prev, 3), "to": round(cut, 3), "offset": round(offset, 3)})
        offset += sec
        for w in shifted[k:]:
            w["t"] = round(w["t"] + sec, 3)
        prev = cut
    parts.append({"from": round(prev, 3), "to": None, "offset": round(offset, 3)})
    return shifted, parts, offset


def build_track(segments):
    track, t = [], 0.0
    for seg in segments:
        path = os.path.join(ROOT, "public", audio_path(seg["id"]))
        dur = duration(path)
        sil = silences(path)
        words = refine(word_times(seg["text"], dur), sil, dur)
        words, parts, extra = apply_gaps(words, seg.get("gaps", []), sil)
        length = LEAD + dur + extra + seg.get("pad", 0.6)
        frames = math.ceil(length * FPS)
        track.append({
            "id": seg["id"], "scene": seg["scene"], "audio": audio_path(seg["id"]),
            "start": round(t, 3), "startFrame": round(t * FPS), "frames": frames,
            "lead": LEAD, "audioDur": round(dur + extra, 3), "parts": parts,
            "words": words, "text": seg["text"],
        })
        t += frames / FPS
    return track


WEAK = {"a", "an", "the", "of", "to", "as", "and", "or", "but", "in", "on", "is", "are", "i", "so", "not"}


def chunk_words(words, max_chars):
    """Split a word list into caption cues, preferring punctuation and avoiding dangling small words."""
    cues, cur = [], []
    for i, w in enumerate(words):
        cur.append(w)
        text = " ".join(x["w"] for x in cur)
        nxt = words[i + 1]["w"] if i + 1 < len(words) else None
        strong = re.search(r"[.?!:;][’']?$", w["w"])
        soft = re.search(r",[’']?$", w["w"])
        too_long = nxt is not None and len(text) + 1 + len(nxt) > max_chars
        # let a short sentence-final word join the cue instead of dangling on its own
        if too_long and re.search(r"[.?!][’']?$", nxt) and len(text) + 1 + len(nxt) <= max_chars + 8:
            too_long = False
        if nxt is None or strong or (soft and len(text) > max_chars * 0.55):
            cues.append(cur); cur = []
        elif too_long:
            # break after the last comma if it leaves a reasonable first part
            j = max((k for k, x in enumerate(cur[:-1]) if re.search(r",[’']?$", x["w"])), default=-1)
            if j >= 0 and len(" ".join(x["w"] for x in cur[: j + 1])) >= max_chars * 0.35:
                cues.append(cur[: j + 1]); cur = cur[j + 1:]
            else:
                carry = []
                while len(cur) > 2 and re.sub(r"[^\w]", "", cur[-1]["w"]).lower() in WEAK:
                    carry.insert(0, cur.pop())
                cues.append(cur); cur = carry
    if cur:
        cues.append(cur)
    # merge very short cues (e.g. "First:") into the following one when it fits
    merged = []
    for c in cues:
        if merged and len(" ".join(x["w"] for x in merged[-1])) < 12 and \
                len(" ".join(x["w"] for x in merged[-1] + c)) <= max_chars:
            merged[-1] = merged[-1] + c
        else:
            merged.append(c)
    return merged


def wrap_two_lines(text, max_line):
    if len(text) <= max_line:
        return text
    words, best = text.split(), None
    for i in range(1, len(words)):
        a, b = " ".join(words[:i]), " ".join(words[i:])
        score = max(len(a), len(b))
        if re.sub(r"[^\w]", "", words[i - 1]).lower() in WEAK:
            score += 10
        if re.search(r"[,:;.][’']?$", words[i - 1]):
            score -= 6
        if best is None or score < best[0]:
            best = (score, a + "\n" + b)
    return best[1]


def fmt(t, sep):
    ms = int(round(t * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02}{sep}{ms:03}"


def captions(track, max_chars, max_line):
    cues = []
    for seg in track:
        base = seg["start"] + seg["lead"]
        groups = chunk_words(seg["words"], max_chars)
        for gi, g in enumerate(groups):
            start = base + g[0]["t"]
            if gi + 1 < len(groups):
                end = base + groups[gi + 1][0]["t"] - 0.04
            else:
                end = base + seg["audioDur"] + 0.25
            text = " ".join(x["w"] for x in g)
            cues.append({"start": round(start, 3), "end": round(end, 3), "text": wrap_two_lines(text, max_line)})
    return cues


def write_subs(name, cues):
    os.makedirs(os.path.join(ROOT, "out/subtitles"), exist_ok=True)
    with open(os.path.join(ROOT, f"out/subtitles/{name}.srt"), "w") as f:
        for i, c in enumerate(cues, 1):
            f.write(f"{i}\n{fmt(c['start'], ',')} --> {fmt(c['end'], ',')}\n{c['text']}\n\n")
    with open(os.path.join(ROOT, f"out/subtitles/{name}.vtt"), "w") as f:
        f.write("WEBVTT\n\n")
        for c in cues:
            f.write(f"{fmt(c['start'], '.')} --> {fmt(c['end'], '.')}\n{c['text']}\n\n")


def write_transcript(name, title, track):
    os.makedirs(os.path.join(ROOT, "out/transcripts"), exist_ok=True)
    with open(os.path.join(ROOT, f"out/transcripts/{name}.txt"), "w") as f:
        f.write(f"{title}\nNarration: {script['voice']['voice']}\n\n")
        for seg in track:
            m, s = divmod(seg["start"] + seg["lead"], 60)
            f.write(f"[{int(m)}:{s:05.2f}] {seg['text']}\n\n")


# ---------- sound effects (pure-python synthesis, kept quiet in the mix) ----------
def synth(name, dur, fn, rate=44100):
    os.makedirs(os.path.join(ROOT, "public/sfx"), exist_ok=True)
    n = int(dur * rate)
    with wave.open(os.path.join(ROOT, f"public/sfx/{name}.wav"), "w") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate)
        w.writeframes(b"".join(struct.pack("<h", int(max(-1, min(1, fn(i / rate))) * 32767 * 0.8)) for i in range(n)))


def env(t, a, d):
    return (t / a if t < a else math.exp(-(t - a) / d))


def make_sfx():
    synth("pop", 0.18, lambda t: env(t, 0.004, 0.035) * math.sin(2 * math.pi * (880 - 1600 * t) * t))
    synth("tick", 0.08, lambda t: env(t, 0.001, 0.012) * math.sin(2 * math.pi * 2200 * t))
    synth("correct", 0.7, lambda t: env(t, 0.01, 0.18) * 0.5 * (math.sin(2 * math.pi * 660 * t) +
                                                                  (math.sin(2 * math.pi * 990 * t) if t > 0.09 else 0)))
    synth("wrong", 0.35, lambda t: env(t, 0.005, 0.08) * 0.8 * math.sin(2 * math.pi * 196 * t) * (1 + 0.3 * math.sin(2 * math.pi * 30 * t)))
    import random
    random.seed(4)
    synth("whoosh", 0.45, lambda t: math.sin(math.pi * t / 0.45) ** 2 * 0.35 * (random.random() * 2 - 1))


def main():
    make_sfx()
    data = {"fps": FPS, "main": build_track(script["main"]), "shorts": {}}
    data["captions"] = {"main": captions(data["main"], 64, 42)}
    write_subs("main_16x9", data["captions"]["main"])
    write_transcript("main_16x9", "Grammar Detective: Why these nouns are uncountable (main video)", data["main"])
    for sh in script["shorts"]:
        have = all(os.path.exists(os.path.join(ROOT, "public", audio_path(b["id"]))) for b in sh["beats"])
        if not have:
            print(f"skip {sh['id']}: narration missing")
            continue
        tr = build_track(sh["beats"])
        data["shorts"][sh["id"]] = tr
        name = f"short{sh['id'][1:]}_{sh['accent']}_9x16"
        data["captions"][sh["id"]] = captions(tr, 34, 20)
        write_subs(name, data["captions"][sh["id"]])
        write_transcript(name, f"Grammar Detective Short: {sh['title']}", tr)
    json.dump(data, open(os.path.join(ROOT, "src/timings.json"), "w"), indent=1, ensure_ascii=False)
    total = sum(s["frames"] for s in data["main"]) / FPS
    print(f"main: {total:.1f}s")
    for k, v in data["shorts"].items():
        print(f"{k}: {sum(s['frames'] for s in v) / FPS:.1f}s")


if __name__ == "__main__":
    main()
