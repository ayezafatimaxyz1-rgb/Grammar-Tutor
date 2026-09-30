// Style sample A: "your notes come alive". The ERROR 1 page from the notes is written live by a pen,
// the camera follows the logic down the page, then pulls back to show the whole chain.
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Fx, Karaoke } from "../v2/kit";
import timings from "../timings.json";
import { Drawing, Full, Ink, Pt, TrackAudio, dense, drawState, ellipse, useTrackCue, wobble } from "./common";

const NAVY = "#1F3A5F", RED = "#C0392B", GREEN = "#1E7B4B", GOLD = "#C9A227", ORANGE = "#D9730D", BLUE = "#2F5DA8", GREY = "#6B6B6B";
const PAGE_W = 1000, PAGE_X = 40;

type Cue = { start: number; end: number; text: string; words: { w: string; t: number }[] };
const CAPS = (timings as unknown as { captions: Record<string, Cue[]> }).captions;

type T = { key: string; x: number; y: number; w: number; size: number; color: string; weight?: number; italic?: boolean; at: number; dur: number; align?: "left" | "center"; node: React.ReactNode; font?: string };

export const NotesSample: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cue = useTrackCue("sm");
  const tStart = cue("why is");
  const tWrong = cue("wrong");
  const tMany = cue("contains many things");
  const tItems = [cue("a chair"), cue("a table"), cue("a sofa"), cue("a bed")];
  const tGroup = cue("groups them together");
  const tUnit = cue("one unit");
  const tMeans = cue("unit means one");
  const tSing = cue("always singular");
  const tAdd = cue("we cant add");
  const tSo = cue("so the furniture is");
  const tZoom = tSo + 40;

  const dots = [{ n: "chair", x: 170, y: 760 }, { n: "table", x: 390, y: 730 }, { n: "sofa", x: 610, y: 760 }, { n: "bed", x: 830, y: 730 }];
  const inCircle: Pt[] = [[455, 1160], [545, 1150], [470, 1235], [555, 1230]];

  const texts: T[] = [
    { key: "err", x: 0, y: 40, w: PAGE_W, size: 64, color: NAVY, weight: 800, at: 0, dur: 1, align: "center", node: "ERROR 1" },
    { key: "wrong", x: 60, y: 150, w: 560, size: 40, color: RED, at: tStart, dur: 24, node: "✗ Furniture are expensive." },
    { key: "unit", x: 40, y: 300, w: 300, size: 40, color: NAVY, weight: 800, at: tMany - 12, dur: 10, node: "UNIT / MASS" },
    { key: "noun", x: 50, y: 395, w: 150, size: 44, color: "#222", weight: 800, at: tMany - 6, dur: 8, node: "NOUN" },
    { key: "unitbox", x: 300, y: 395, w: 230, size: 44, color: "#222", weight: 800, at: tMany, dur: 6, align: "center", node: "UNIT" },
    { key: "contains", x: 655, y: 380, w: 320, size: 38, color: GOLD, weight: 800, italic: true, at: tMany + 6, dur: 14, node: <>contains<br />many things</> },
    ...dots.map((d, i) => ({ key: d.n, x: d.x - 80, y: d.y + 40, w: 160, size: 32, color: BLUE, italic: true, at: tItems[i] + 4, dur: 6, align: "center" as const, node: d.n })),
    { key: "many", x: 0, y: 860, w: PAGE_W, size: 38, color: "#222", weight: 800, at: tItems[3] + 12, dur: 12, align: "center", node: "many individual things" },
    { key: "grouped", x: 0, y: 1010, w: PAGE_W, size: 40, color: NAVY, weight: 800, at: tGroup, dur: 12, align: "center", node: "grouped together" },
    { key: "oneunit", x: 0, y: 1330, w: PAGE_W, size: 50, color: NAVY, weight: 900, at: tUnit, dur: 10, align: "center", node: "ONE UNIT" },
    { key: "whole", x: 0, y: 1395, w: PAGE_W, size: 30, color: GREY, italic: true, at: tUnit + 10, dur: 12, align: "center", node: "(treated as one whole: ‘furniture’)" },
    { key: "means", x: 0, y: 1540, w: PAGE_W, size: 40, color: ORANGE, weight: 800, at: tMeans, dur: 10, align: "center", node: "‘unit’ means" },
    { key: "one", x: 0, y: 1590, w: PAGE_W, size: 190, color: ORANGE, weight: 900, at: tMeans + 12, dur: 4, align: "center", node: "1" },
    { key: "plus", x: 610, y: 1620, w: 200, size: 120, color: RED, weight: 700, at: tAdd, dur: 10, font: "Caveat", node: "+s" },
    { key: "single", x: 0, y: 1930, w: PAGE_W, size: 44, color: GREEN, weight: 900, at: tSing, dur: 14, align: "center", node: "1 is always SINGULAR" },
    { key: "final", x: 40, y: 2190, w: 940, size: 70, color: "#1F5FD1", weight: 700, at: tSo, dur: 26, font: "Caveat", node: <>→ The furniture <span style={{ background: "rgba(255,224,70,0.7)", padding: "0 8px" }}>IS</span> expensive ✓</> },
    { key: "right", x: 60, y: 208, w: 560, size: 40, color: GREEN, weight: 800, at: tSo, dur: 22, node: "✓ Furniture is expensive." },
  ];

  const drawings: Drawing[] = [
    { strokes: [wobble(dense(ellipse(345, 176, 60, 34), 6), 1.5, 2)], at: tWrong, dur: 12, color: RED, width: 5 },
    { strokes: [dense([[205, 425], [270, 425]]), dense([[255, 413], [272, 425], [255, 437]])], at: tMany - 2, dur: 5, color: NAVY, width: 5 },
    { strokes: [dense([[300, 385], [530, 385], [530, 465], [300, 465], [300, 385]])], at: tMany, dur: 8, color: NAVY, width: 5 },
    { strokes: [dense([[555, 425], [630, 425]]), dense([[615, 413], [632, 425], [615, 437]])], at: tMany + 4, dur: 5, color: GOLD, width: 5 },
    { strokes: [dense([[500, 915], [500, 990]]), dense([[486, 975], [500, 992], [514, 975]])], at: tGroup - 6, dur: 6, color: NAVY, width: 5 },
    { strokes: [wobble(dense(ellipse(505, 1195, 120, 115, 1.02), 6), 1, 4)], at: tGroup + 10, dur: 20, color: NAVY, width: 7 },
    { strokes: [dense([[500, 1450], [500, 1525]]), dense([[486, 1510], [500, 1527], [514, 1510]])], at: tMeans - 8, dur: 6, color: ORANGE, width: 5 },
    { strokes: [dense([[500, 1830], [500, 1905]]), dense([[486, 1890], [500, 1907], [514, 1890]])], at: tSing - 8, dur: 6, color: GREEN, width: 5 },
    // pen gag: "+s" scribbled beside the 1, then crossed out
    { strokes: [dense([[620, 1640], [790, 1750]]), dense([[790, 1640], [620, 1750]])], at: tAdd + 22, dur: 8, color: RED, width: 9 },
  ];

  // camera: follow the logic down the page, then pull back to show the whole chain
  const keys: [number, number][] = [[0, 330], [tMany - 10, 470], [tItems[0], 700], [tGroup, 1000], [tUnit, 1250], [tMeans, 1560], [tSing, 1800], [tAdd, 1850], [tSo, 2150]];
  let focus = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (f < keys[i][0] - 6) break;
    const s = spring({ frame: f - (keys[i][0] - 6), fps, config: { damping: 20, stiffness: 90 } });
    focus = interpolate(s, [0, 1], [focus, keys[i][1]]);
  }
  const zoomOut = f < tZoom ? 0 : spring({ frame: f - tZoom, fps, config: { damping: 20, stiffness: 70 } });
  const scale = interpolate(zoomOut, [0, 1], [1.08, 0.64]);
  focus = interpolate(zoomOut, [0, 1], [focus, 1180]);
  const pageTop = Math.min(interpolate(zoomOut, [0, 1], [0, 70]), 820 - focus * scale);

  // pen tip
  let tip: Pt | null = null;
  for (const d of drawings) { const s = drawState(d, f); if (s.tip) tip = s.tip; }
  for (const t of texts) {
    const p = (f - t.at) / t.dur;
    if (p > 0 && p < 1 && t.dur > 2) {
      const w = t.align === "center" ? Math.min(t.w, 22 * t.size * 0.55) : t.w;
      const x0 = t.align === "center" ? t.x + (t.w - w) / 2 : t.x;
      tip = [x0 + p * w, t.y + t.size * 0.8 + Math.sin(f * 2) * 4];
    }
  }

  const hl = (at: number) => Math.min(1, Math.max(0, (f - at) / 8));

  return (
    <Full bg="#D9D4CB">
      <div style={{ position: "absolute", left: PAGE_X * scale + (1080 - 1080 * scale) / 2, top: pageTop, width: PAGE_W, height: 2330, transformOrigin: "0 0", transform: `scale(${scale})`, background: "#FFFFFF", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", fontFamily: "Inter, 'Noto Color Emoji', sans-serif" }}>
        {/* highlighter swipes behind key ideas */}
        {[[300, 392, 230, 70, tMany + 10], [330, 1330, 340, 64, tUnit + 6], [440, 1610, 120, 190, tMeans + 20], [560, 1928, 260, 58, tSing + 12]].map(([x, y, w, h, at], i) => (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: w * hl(at), height: h, background: "rgba(255, 224, 70, 0.55)", borderRadius: 8 }} />
        ))}
        {texts.map((t) => {
          const p = Math.min(1, Math.max(0, (f - t.at) / t.dur));
          return (
            <div key={t.key} style={{
              position: "absolute", left: t.x, top: t.y, width: t.w, fontSize: t.size, color: t.color, fontWeight: t.weight ?? 500,
              fontStyle: t.italic ? "italic" : "normal", textAlign: t.align ?? "left", lineHeight: 1.15, fontFamily: t.font, whiteSpace: t.key === "final" ? "nowrap" : undefined,
              clipPath: `inset(-20px ${(1 - p) * 100}% -20px -20px)`,
            }}>{t.node}</div>
          );
        })}
        {/* "we can't add -s to 1" box */}
        <div style={{ position: "absolute", left: 130, top: 2020, width: 740, border: `4px solid ${GOLD}`, background: "#FFF8E6", borderRadius: 14, padding: "20px 26px", textAlign: "center", fontSize: 36, fontWeight: 800, color: "#222", opacity: Math.min(1, Math.max(0, (f - tAdd - 26) / 10)) }}>
          We can’t add ‘-s’ to 1.<br />So the word stays singular.
        </div>
        <svg width={PAGE_W} height={2300} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          {/* dots in the row, and copies flying into the ONE UNIT circle */}
          {dots.map((d, i) => {
            const s = f < tItems[i] ? 0 : Math.min(1, (f - tItems[i]) / 6);
            const g = Math.min(1, Math.max(0, (f - tGroup - i * 3) / 22));
            const e = 1 - Math.pow(1 - g, 3);
            const cx = d.x + (inCircle[i][0] - d.x) * e, cy = d.y + (inCircle[i][1] - d.y) * e - Math.sin(e * Math.PI) * 120;
            return (
              <g key={d.n}>
                <circle cx={d.x} cy={d.y} r={16 * s} fill={BLUE} opacity={g > 0 ? 0.35 : 1} />
                {g > 0 && <circle cx={cx} cy={cy} r={16} fill={BLUE} />}
              </g>
            );
          })}
          {drawings.map((d, i) => <Ink key={i} d={d} f={f} />)}
          {tip && <Pen x={tip[0]} y={tip[1]} />}
        </svg>
      </div>
      {/* caption band */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1650, bottom: 0, background: "linear-gradient(rgba(20,24,36,0), rgba(20,24,36,0.9) 30%)" }} />
      <Karaoke cues={CAPS.sm} top={1720} />
      <TrackAudio id="sm" />
      {[tStart, tMany - 12, tItems[0], tGroup, tUnit, tMeans, tSing, tAdd, tSo].map((a, i) => <Fx key={i} at={a} name="scratch" volume={0.12} />)}
      <Fx at={tGroup + 4} name="whoosh" volume={0.2} />
      <Fx at={tAdd + 22} name="buzzer" volume={0.14} />
      <Fx at={tSo} name="correct" volume={0.2} />
      <Fx at={tZoom} name="whoosh" volume={0.2} />
    </Full>
  );
};

/** Ballpoint pen, tip at (x, y). */
const Pen: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y}) rotate(-38)`}>
    <ellipse cx={150} cy={40} rx={150} ry={16} fill="rgba(0,0,0,0.12)" transform="rotate(38 150 40)" />
    <path d="M0 0 L26 -9 L26 9 Z" fill="#333" />
    <path d="M24 -12 L60 -16 L60 16 L24 12 Z" fill="#C8CCD2" />
    <rect x={58} y={-17} width={250} height={34} rx={10} fill="#1F3A5F" />
    <rect x={230} y={-22} width={70} height={10} rx={4} fill="#C8CCD2" />
  </g>
);
