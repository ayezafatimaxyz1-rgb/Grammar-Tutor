// The news robot: collects the latest headlines from newspaper RSS feeds into news.json.
// A GitHub Action runs it every 3 hours on the gh-pages branch (see .github/workflows/bolo-news.yml on main).
// Only the headline, a short summary and the link are kept: the full articles stay on the newspapers' own sites.
// Usage: node fetch-news.mjs [out-file]   (Node 18 or newer; no packages needed)
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const FEEDS = [
  { src: "Dawn", w: "Pakistan", url: "https://www.dawn.com/feeds/home" },
  { src: "The Express Tribune", w: "Pakistan", url: "https://tribune.com.pk/feed/home" },
  { src: "The News", w: "Pakistan", url: "https://www.thenews.com.pk/rss/1/1" },
  { src: "Business Recorder", w: "Pakistan", url: "https://www.brecorder.com/feeds/latest-news" },
  { src: "BBC News", w: "World", url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
  { src: "Al Jazeera", w: "World", url: "https://www.aljazeera.com/xml/rss/all.xml" },
];
const PER_FEED = 10, MAX_SUMMARY = 300;

const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", ndash: "–", mdash: "—", hellip: "…" };
const entities = (s) => s.replace(/&(#\d+|#x[\da-f]+|[a-z]+);/gi, (m, e) => {
  if (e[0] === "#") { const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); return Number.isFinite(n) ? String.fromCodePoint(n) : m; }
  return NAMED[e.toLowerCase()] ?? m;
});
// Text of an RSS field: CDATA unwrapped, entities decoded, HTML tags removed, spaces tidied.
export const clean = (s) => entities(entities(String(s || "").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")).replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const field = (xml, name) => { const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i")); return m ? m[1] : ""; };
const short = (s) => (s.length <= MAX_SUMMARY ? s : s.slice(0, MAX_SUMMARY).replace(/\s+\S*$/, "") + "…");

export function parseFeed(xml, feed) {
  const items = [];
  for (const m of String(xml).matchAll(/<(item|entry)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi)) {
    const it = m[2];
    const t = clean(field(it, "title"));
    let u = clean(field(it, "link"));
    if (!u) u = (it.match(/<link[^>]*href="([^"]+)"/i) || [])[1] || "";
    if (!t || !/^https?:\/\//.test(u)) continue;
    let s = clean(field(it, "description") || field(it, "summary") || field(it, "content"));
    if (s.toLowerCase() === t.toLowerCase()) s = "";
    const at = Date.parse(clean(field(it, "pubDate") || field(it, "dc:date") || field(it, "updated") || field(it, "published"))) || 0;
    items.push({ t, s: short(s), u, src: feed.src, w: feed.w, at });
  }
  return items.slice(0, PER_FEED);
}

// Two papers often word the same headline a little differently: compare without small words.
const SMALL = new Set(["a", "an", "the", "and", "of", "in", "on", "to", "for", "at", "by", "with"]);
const storyKey = (t) => t.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").split(" ").filter((w) => w && !SMALL.has(w)).join(" ");
// Newest first, the same story only once, at most a few days old.
export async function collect(feeds = FEEDS, get = fetchText) {
  const all = [], ok = [];
  for (const f of feeds) {
    try { const items = parseFeed(await get(f.url), f); if (items.length) { all.push(...items); ok.push(f.src); } else console.log("No items:", f.src); }
    catch (e) { console.log("Failed:", f.src, String(e?.message || e)); }
  }
  const seen = new Set(), now = Date.now();
  const items = all
    .filter((x) => !x.at || now - x.at < 4 * 86400000)
    .sort((a, b) => b.at - a.at)
    .filter((x) => { const k = storyKey(x.t); if (seen.has(k)) return false; seen.add(k); return true; });
  return { updated: now, sources: [...new Set(ok)], items };
}
async function fetchText(url) {
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 20000);
  try {
    const r = await fetch(url, { signal: ctl.signal, headers: { "user-agent": "BoloEnglishNewsBot/1.0 (+https://ayezafatimaxyz1-rgb.github.io/Grammar-Tutor/)", accept: "application/rss+xml, application/xml, text/xml, */*" } });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return await r.text();
  } finally { clearTimeout(timer); }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = process.argv[2] || "news.json";
  const news = await collect();
  console.log(`${news.items.length} headlines from ${news.sources.join(", ") || "no source"}`);
  if (!news.items.length) { console.log("Nothing collected; the old file is kept."); process.exit(1); }
  writeFileSync(out, JSON.stringify(news) + "\n");
}
