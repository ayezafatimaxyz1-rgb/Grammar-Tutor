# Assembles the "real-life mini film" sample inside the Higgsfield sandbox:
# George narration (Kokoro), AI clips cut to the script, text cards, captions, sound, final MP4 upload.
import os, json, math, subprocess, glob, urllib.request
os.chdir(os.environ.get("WORKDIR", "/home/user"))
D = json.load(open("data.json"))
FPS, OFPS, LEAD, W, H = 30, 15, 0.35, 1080, 1920

if not os.environ.get("WORKDIR"): subprocess.run("pip -q install kokoro-onnx soundfile >/dev/null 2>&1", shell=True, check=True)
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
from PIL import Image, ImageDraw, ImageFont, ImageFilter
base = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/"
for fn in ["kokoro-v1.0.onnx", "voices-v1.0.bin"]:
    if not os.path.exists(fn):
        urllib.request.urlretrieve(base + fn, fn)
print("model ready", flush=True)

# ---------- clips (download in background while TTS runs)
os.makedirs("clips", exist_ok=True)
dl = subprocess.Popen("".join(f"curl -sSfL --retry 3 -o clips/{k}.mp4 '{u}' & " for k, u in D["clips"].items() if not os.path.exists(f"clips/{k}.mp4")) + "wait", shell=True)

# ---------- narration
k = Kokoro("kokoro-v1.0.onnx", "voices-v1.0.bin")
starts, auds, t, SR = [], [], 0.0, 24000
for b in D["beats"]:
    s, SR = k.create(b["text"], voice="bm_george", speed=0.95, lang="en-gb")
    auds.append(s); starts.append(t)
    t += math.ceil((LEAD + len(s) / SR + b["pad"]) * FPS) / FPS
TOTAL = t
ends = starts[1:] + [TOTAL]
mix = np.zeros(int((TOTAL + 1) * SR), dtype=np.float32)
for st, a in zip(starts, auds):
    i = int((st + LEAD) * SR); mix[i:i + len(a)] += a
print("narration", round(TOTAL, 2), flush=True)

def ab(b, rel):
    return ends[b] if rel == "end" else starts[b] + rel

# soft UI sounds at each card and a whoosh at each shot change
def sfx(kind):
    n = int(0.25 * SR); tt = np.arange(n) / SR
    if kind == "pop":
        return (np.exp(-tt / 0.03) * np.sin(2 * np.pi * (900 - 1500 * tt) * tt) * 0.18).astype(np.float32)
    rng = np.random.default_rng(3)
    return (np.sin(np.pi * tt / tt[-1]) ** 2 * rng.uniform(-1, 1, n) * 0.06).astype(np.float32)
def put(sig, at):
    i = int(at * SR); mix[i:i + len(sig)] += sig[: max(0, len(mix) - i)]
for e in D["els"]:
    if not e.get("always"):
        put(sfx("pop"), ab(e["b"], e["t0"]))
for c in D["plan"]:
    put(sfx("whoosh"), ab(c[1], c[2]))
sf.write("audio.wav", np.clip(mix, -1, 1), SR)

# ---------- background video from the clips
dl.wait()
print("clips", sorted(os.listdir("clips")), flush=True)
parts = []
for n, (clip, b, r0, r1, src, *rest) in enumerate(D["plan"]):
    d = ab(b, r1) - ab(b, r0)
    sp = rest[0] if rest else 1  # >1 speeds the clip up so an arrival lands inside the beat
    out = f"seg{n:02d}.mp4"
    subprocess.run(f"ffmpeg -loglevel error -y -ss {src} -i clips/{clip}.mp4 -vf \"setpts=PTS/{sp},scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS},tpad=stop_mode=clone:stop_duration=8,setsar=1\" -t {d:.3f} -an -c:v libx264 -preset veryfast -crf 18 {out}", shell=True, check=True)
    parts.append(out)
open("list.txt", "w").write("".join(f"file '{p}'\n" for p in parts))
subprocess.run("ffmpeg -loglevel error -y -f concat -safe 0 -i list.txt -c copy bg.mp4", shell=True, check=True)

# ---------- overlay cards
def font(size, kind="b"):
    cands = {"b": glob.glob("/usr/share/fonts/**/Montserrat*ExtraBold*.ttf", recursive=True) + glob.glob("/usr/share/fonts/**/Metropolis-ExtraBold.ttf", recursive=True),
             "s": ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"]}[kind]
    return ImageFont.truetype(cands[0] if cands else "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
SYM = set("✓✗→≠↓")
COL = {"D": "#1E2233", "W": "#FFFFFF", "R": "#FF4D4D", "G": "#2ECC71", "O": "#FFA62B", "B": "#4DA3FF", "Y": "#FFD166"}

def rich(lines, size, style, bg):
    """lines: list of lines, each a list of [text, colourKey]. style: card | pill | big."""
    runs = []
    for ln in lines:
        row = []
        for txt, ck in ln:
            for ch in txt:  # split into font runs so symbols use DejaVu
                kind = "s" if ch in SYM else "b"
                if row and row[-1][2] == kind and row[-1][1] == ck:
                    row[-1][0] += ch
                else:
                    row.append([ch, ck, kind])
        runs.append(row)
    fb, fs = font(size), font(size, "s")
    lw = [sum((fs if r[2] == "s" else fb).getlength(r[0]) for r in row) for row in runs]
    lh = int(size * 1.25)
    pad = (0, 0) if style == "big" else (int(size * 0.7), int(size * 0.4))
    w, h = int(max(lw)) + 2 * pad[0] + 20, lh * len(runs) + 2 * pad[1] + 20
    im = Image.new("RGBA", (w + 40, h + 40), (0, 0, 0, 0))
    dr = ImageDraw.Draw(im)
    if style != "big":
        sh = Image.new("RGBA", im.size, (0, 0, 0, 0))
        ImageDraw.Draw(sh).rounded_rectangle([24, 30, w + 16, h + 22], radius=min(h // 2, 40) if style == "pill" else 28, fill=(0, 0, 0, 110))
        im = Image.alpha_composite(im, sh.filter(ImageFilter.GaussianBlur(10))); dr = ImageDraw.Draw(im)
        dr.rounded_rectangle([20, 20, w + 20, h + 20], radius=min(h // 2, 40) if style == "pill" else 28, fill=COL.get(bg, bg))
    for li, row in enumerate(runs):
        x = 20 + pad[0] + 10 + (max(lw) - lw[li]) / 2
        y = 20 + pad[1] + 10 + li * lh
        for txt, ck, kind in row:
            f = fs if kind == "s" else fb
            dr.text((x, y), txt, font=f, fill=COL[ck], stroke_width=max(4, size // 14) if style == "big" else 0, stroke_fill="#000000")
            x += f.getlength(txt)
    return im

els = []
for e in D["els"]:
    im = rich(e["lines"], e["size"], e["style"], e.get("bg", "W"))
    els.append((0 if e.get("always") else ab(e["b"], e["t0"]), TOTAL if e.get("always") else ab(e.get("b1", e["b"]), e["t1"]), e.get("x", 540), e["y"], im, e.get("always")))
caps = []
for c in D["caps"]:
    words, lines, cur = c[3].split(), [], ""
    for wd in words:
        if len(cur + " " + wd) > 30 and cur:
            lines.append(cur); cur = wd
        else:
            cur = (cur + " " + wd).strip()
    lines.append(cur)
    caps.append((ab(c[0], c[1]), ab(c[0], c[2]), rich([[[l, "W"]] for l in lines], 52, "big", None)))

grad = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(grad)
for yy in range(1450, H):
    gd.line([(0, yy), (W, yy)], fill=(0, 0, 0, int(200 * (yy - 1450) / (H - 1450))))
for yy in range(0, 260):
    gd.line([(0, yy), (W, yy)], fill=(0, 0, 0, int(120 * (1 - yy / 260))))

os.makedirs("ov", exist_ok=True)
nf = int(math.ceil(TOTAL * OFPS))
for i in range(nf):
    tt = i / OFPS
    fr = grad.copy()
    for (s, e, x, y, im, always) in els + [(a, b, 540, 1700, im, False) for a, b, im in caps]:
        if tt < s or tt >= e:
            continue
        p = 1 if always else min(1, (tt - s) / 0.22)
        a = min(p, 1 if always else max(0, (e - tt) / 0.18))
        sc = 0.75 + 0.25 * (1 - (1 - p) ** 3) + (0.06 * math.sin(p * math.pi) if p < 1 else 0)
        img = im if abs(sc - 1) < 0.01 else im.resize((max(1, int(im.width * sc)), max(1, int(im.height * sc))))
        if a < 1:
            img = img.copy(); img.putalpha(img.getchannel("A").point(lambda v: int(v * a)))
        fr.alpha_composite(img, (int(x - img.width / 2), int(y - img.height / 2)))
    fr.save(f"ov/{i:05d}.png", compress_level=1)
print("overlays", nf, flush=True)

subprocess.run(f"ffmpeg -loglevel error -y -i bg.mp4 -framerate {OFPS} -i ov/%05d.png -i audio.wav -filter_complex \"[1:v]fps={FPS}[o];[0:v][o]overlay=0:0:format=auto[v]\" -map \"[v]\" -map 2:a -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -c:a aac -b:a 160k -t {TOTAL:.3f} out.mp4", shell=True, check=True)
print("rendered", flush=True)
if D["upload"].startswith("http"):
  r = subprocess.run(f"curl -sSf -X PUT -H 'Content-Type: video/mp4' -H 'If-None-Match: *' --data-binary @out.mp4 '{D['upload']}' && echo UPLOAD_OK", shell=True, capture_output=True, text=True)
  print(r.stdout, r.stderr, flush=True)
