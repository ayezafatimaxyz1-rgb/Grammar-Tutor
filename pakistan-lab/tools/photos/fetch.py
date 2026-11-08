"""Fetch lead photos from Wikipedia with their licence, slowly and politely (python3 tools/photos/fetch.py, from pakistan-lab/).
Phase 1: the lead image of each page. Phase 2: licences, in batches. Phase 3: download only free-licensed photos.
Writes photos/<key>.jpg, tools/photos/state.json and content/photos.js."""
import json, os, re, time, urllib.parse, urllib.request, urllib.error, io
from PIL import Image
UA = {"User-Agent": "PakistanStoryStudyApp/1.0 (personal study app, a few hundred requests in total; github.com/ayezafatimaxyz1-rgb/grammar-tutor)"}
PAUSE = 3.0
def get(url, binary=False):
    wait = 20
    for i in range(6):
        try:
            time.sleep(PAUSE)
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
                d = r.read()
                return d if binary else json.loads(d)
        except urllib.error.HTTPError as e:
            if e.code == 429:
                ra = e.headers.get("Retry-After"); w = int(ra) if ra and ra.isdigit() else wait
                print("rate limited, waiting", w, flush=True); time.sleep(w); wait = min(wait * 2, 240); continue
            if e.code == 404: return None
            raise
        except Exception:
            time.sleep(5)
    raise RuntimeError("gave up on " + url)
FREE = re.compile(r"(public domain|^pd|cc[ -]by|cc0|cc[ -]zero|gfdl|free art|attribution|open government|ogl|government work)", re.I)
tag = lambda s: re.sub(r"<[^>]+>", "", s or "").strip()
ST = "tools/photos/state.json"
st = json.load(open(ST)) if os.path.exists(ST) else {"img": {}, "lic": {}, "done": {}}
def save(): json.dump(st, open(ST, "w"), indent=1)
pairs = [l.split() for l in open("tools/photos/titles.txt") if l.strip()]
# phase 1: one batched request for the lead image of up to 40 pages
todo1 = [(k, t) for k, t in pairs if k not in st["img"]]
for i in range(0, len(todo1), 40):
    chunk = todo1[i:i + 40]
    q = get("https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=pageimages&piprop=original|name&titles=" + urllib.parse.quote("|".join(t.replace("_", " ") for _, t in chunk)))
    pages = (q or {}).get("query", {})
    alias = {}
    for x in pages.get("normalized", []) + pages.get("redirects", []): alias[x["from"]] = x["to"]
    byname = {p.get("title"): p for p in pages.get("pages", {}).values()}
    for k, t in chunk:
        name = t.replace("_", " ")
        for _ in range(3): name = alias.get(name, name)
        pg = byname.get(name) or {}
        img = ((pg.get("original") or {}).get("source") or "").split("?")[0] or None
        st["img"][k] = {"title": t, "url": img}
        print("img", k, bool(img), flush=True)
    save()
# phase 2
names = {}
for k, v in st["img"].items():
    if v["url"]: names[k] = urllib.parse.unquote(v["url"].split("/")[-1])
todo = [n for n in set(names.values()) if n not in st["lic"]]
for i in range(0, len(todo), 20):
    batch = todo[i:i + 20]
    m = get("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=extmetadata&titles=" + urllib.parse.quote("|".join("File:" + n for n in batch)))
    for p in (m or {}).get("query", {}).get("pages", {}).values():
        n = p.get("title", "")[5:].replace(" ", "_")
        em = (p.get("imageinfo") or [{}])[0].get("extmetadata", {})
        st["lic"][n] = {"license": tag(em.get("LicenseShortName", {}).get("value", "")), "author": tag(em.get("Artist", {}).get("value", ""))[:90]}
    for n in batch: st["lic"].setdefault(n, {"license": "", "author": ""})
    save(); print("licences", i, flush=True)
# phase 3
os.makedirs("photos", exist_ok=True)
for key, v in st["img"].items():
    if key in st["done"] or not v["url"]: continue
    n = names[key]; L = st["lic"].get(n.replace(" ", "_")) or st["lic"].get(n) or {"license": ""}
    if not FREE.search(L["license"]): st["done"][key] = {"skip": L["license"] or "unknown licence"}; save(); print("skip", key, L["license"], flush=True); continue
    m = re.match(r"(https://upload.wikimedia.org/wikipedia/commons)/([0-9a-f]/[0-9a-f]{2})/(.+)", v["url"])
    url = f"{m.group(1)}/thumb/{m.group(2)}/{m.group(3)}/330px-{m.group(3)}" if m and not n.lower().endswith((".svg", ".tif", ".tiff")) else v["url"]
    try: data = get(url, True)
    except Exception: data = None
    data = data or get(v["url"], True)
    im = Image.open(io.BytesIO(data)).convert("RGB"); w, h = im.size
    side = min(w, h); left = (w - side) // 2; top = 0 if h > w else (h - side) // 2
    im.crop((left, top, left + side, top + side)).resize((220, 220), Image.LANCZOS).save(f"photos/{key}.jpg", quality=82, optimize=True)
    st["done"][key] = {"file": n, "license": L["license"], "author": L["author"], "title": v["title"], "page": "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(n)}
    save(); print("saved", key, L["license"], flush=True)
ok = {k: v for k, v in st["done"].items() if "file" in v}
open("content/photos.js", "w").write("/* Photos from Wikipedia/Wikimedia Commons with their licences. Generated by tools/photos/fetch.py */\nPAK = window.PAK || {};\nPAK.photos = " + json.dumps(ok, indent=0) + ";\n")
print("DONE", len(ok), "photos kept of", len(pairs))
