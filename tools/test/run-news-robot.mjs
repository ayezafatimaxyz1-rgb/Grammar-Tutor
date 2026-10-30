// Checks the news robot (tools/fetch-news.mjs) on sample feeds: no network needed.
// Usage: node tools/test/run-news-robot.mjs
import { parseFeed, collect, clean } from "../fetch-news.mjs";

const results = [];
const check = (name, ok, info) => { results.push(ok); console.log((ok ? "PASS " : "FAIL ") + name + (info && !ok ? " · " + info : "")); };
const now = new Date(), hoursAgo = (h) => new Date(now - h * 3600000).toUTCString();

const rss = `<?xml version="1.0"?><rss><channel><title>Dawn</title>
<item><title><![CDATA[Floods hit Sindh &amp; Punjab]]></title><link>https://www.dawn.com/news/1</link>
<description><![CDATA[<p>Heavy rain caused <b>floods</b> in many districts.</p><img src="x.jpg">]]></description><pubDate>${hoursAgo(1)}</pubDate></item>
<item><title>Budget &#8216;passed&#8217; by assembly</title><link>https://www.dawn.com/news/2</link>
<description>&lt;p&gt;The National Assembly passed the budget.&lt;/p&gt;</description><pubDate>${hoursAgo(3)}</pubDate></item>
<item><title>No link here</title><description>skip me</description></item>
<item><title>Old story</title><link>https://www.dawn.com/news/3</link><pubDate>${hoursAgo(24 * 9)}</pubDate></item>
</channel></rss>`;
const atom = `<feed><entry><title>World leaders meet</title><link href="https://example.com/world"/><summary>${"Long summary words ".repeat(40)}</summary><updated>${new Date(now - 7200000).toISOString()}</updated></entry>
<entry><title>Floods hit Sindh and Punjab</title><link href="https://example.com/dup"/><updated>${new Date(now - 600000).toISOString()}</updated></entry></feed>`;

const a = parseFeed(rss, { src: "Dawn", w: "Pakistan" });
check("reads RSS items with a title and a link", a.length === 3 && a[0].t === "Floods hit Sindh & Punjab" && a[0].u === "https://www.dawn.com/news/1", JSON.stringify(a.map((x) => x.t)));
check("summaries lose their HTML and entities", a[0].s === "Heavy rain caused floods in many districts." && a[1].s === "The National Assembly passed the budget." && a[1].t === "Budget ‘passed’ by assembly", JSON.stringify(a.map((x) => x.s)));
check("each headline keeps its source, place and time", a[0].src === "Dawn" && a[0].w === "Pakistan" && a[0].at > 0);
const b = parseFeed(atom, { src: "World", w: "World" });
check("reads Atom entries too", b.length === 2 && b[0].u === "https://example.com/world");
check("long summaries are cut short (the full article stays on the newspaper's site)", b[0].s.length <= 301 && b[0].s.endsWith("…"));

const news = await collect([{ src: "Dawn", w: "Pakistan", url: "a" }, { src: "World", w: "World", url: "b" }, { src: "Broken", w: "World", url: "c" }],
  async (u) => { if (u === "c") throw new Error("HTTP 403"); return u === "a" ? rss : atom; });
check("newest first, old stories dropped", news.items[0].u === "https://example.com/dup" && !news.items.some((x) => x.t === "Old story"), JSON.stringify(news.items.map((x) => x.t)));
check("the same story from two papers appears once", news.items.filter((x) => /Floods hit Sindh/.test(x.t)).length === 1);
check("a broken feed is skipped, the others still count", news.sources.join() === "Dawn,World" && news.items.length === 3, JSON.stringify(news.sources));
check("clean() handles plain text", clean("  A  &amp; B ") === "A & B");

const failed = results.filter((x) => !x).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
