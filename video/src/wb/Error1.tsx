// Grammar Logic Series, Error 1 (16:9): a digital whiteboard where a hand writes the notes' logic
// live, placing real photos of the things, circling them and naming the unit.
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { Fx } from "../v2/kit";
import { Pt, TrackAudio, dense, drawState, ellipse, toD, track, useTrackCue, wobble } from "../samples/common";
import METRICS from "./patrick-metrics.json";

const VW = 1920, VH = 1080;
const INK = "#1D1F24", BLUE = "#1F5FD1", RED = "#D7263D", GREEN = "#15924A", ORANGE = "#E07A10", GREY = "#5B6573";
const FONT = "'Patrick Hand'";
const M = METRICS as { upm: number; w: Record<string, number>; fallback: number };

/** Exact rendered width of a string in Patrick Hand, so the marker tip follows the letters. */
const tw = (t: string, size: number) => ([...t].reduce((a, c) => a + (M.w[c] ?? M.fallback), 0) * size) / M.upm;

const W = (pts: Pt[], seed: number, amp = 2) => wobble(dense(pts, 7), amp, seed);
const arrowDown = (x: number, y1: number, y2: number, s: number): Pt[][] => [W([[x, y1], [x, y2]], s), W([[x - 18, y2 - 22], [x, y2], [x + 18, y2 - 22]], s + 1)];
const arrowRight = (x1: number, x2: number, y: number, s: number): Pt[][] => [W([[x1, y], [x2, y]], s), W([[x2 - 22, y - 16], [x2, y], [x2 - 22, y + 16]], s + 1)];
const check = (x: number, y: number, k: number, s: number): Pt[][] => [W([[x - k, y], [x - k * 0.35, y + k * 0.7], [x + k, y - k * 0.95]], s, 1.2)];
const cross = (x: number, y: number, k: number, s: number): Pt[][] => [W([[x - k, y - k], [x + k, y + k]], s, 1.2), W([[x + k, y - k], [x - k, y + k]], s + 1, 1.2)];
const under = (x1: number, x2: number, y: number, s: number): Pt[][] => [W([[x1, y], [x2, y + 4]], s, 1.5)];
const loop = (cx: number, cy: number, rx: number, ry: number, s: number): Pt[][] => [W(ellipse(cx, cy, rx, ry, 1.1, -2.2), s, 3)];

type Text = { k: "text"; b: number; text: string; x: number; y: number; size: number; color: string; at: number; dur: number; anchor: "start" | "middle" };
type Ink = { k: "ink"; b: number; strokes: Pt[][]; at: number; dur: number; color: string; width: number };
type Photo = { k: "photo"; b: number; src: string; x: number; y: number; w: number; h: number; at: number; dur: number };
type Item = Text | Ink | Photo;

// natural sizes of the cut-out photos (public/wb), used to fit them in their slots
const PH: Record<string, [number, number]> = {
  chair: [255, 449], sofa: [448, 211], table: [452, 315], bed: [446, 283], plate: [446, 173], bowl: [448, 228], mug: [446, 429], fork: [51, 410], knife: [54, 449], spoon: [88, 413],
};

export const Error1: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useTrackCue("wb");
  const segs = track("wb");
  const end = segs.reduce((a, s) => a + s.frames, 0);
  const boards = [0, segs[3].startFrame, segs[8].startFrame, segs[9].startFrame, segs[10].startFrame, end];
  const items: Item[] = [];

  const text = (b: number, t: string, x: number, y: number, size: number, color: string, at: number, anchor: "start" | "middle" = "start", dur?: number) => {
    items.push({ k: "text", b, text: t, x, y, size, color, at, anchor, dur: dur ?? Math.min(48, Math.max(8, Math.round(t.length * 1.7))) });
    const w = tw(t, size);
    return anchor === "middle" ? { x0: x - w / 2, x1: x + w / 2, w } : { x0: x, x1: x + w, w };
  };
  const ink = (b: number, strokes: Pt[][], at: number, dur: number, color: string, width = 7) => items.push({ k: "ink", b, strokes, at, dur, color, width });
  const photo = (b: number, src: string, cx: number, cy: number, bw: number, bh: number, at: number, dur = 16) => {
    const [nw, nh] = PH[src];
    const s = Math.min(bw / nw, bh / nh);
    items.push({ k: "photo", b, src, x: cx - (nw * s) / 2, y: cy - (nh * s) / 2, w: nw * s, h: nh * s, at, dur });
  };
  /** A run of coloured words written one after another on one line. */
  const line = (b: number, parts: [string, string][], x: number, y: number, size: number, at: number, anchor: "start" | "middle" = "start") => {
    const total = parts.reduce((a, [t]) => a + tw(t, size), 0);
    let cx = anchor === "middle" ? x - total / 2 : x, t0 = at;
    const spans: { x0: number; x1: number }[] = [];
    for (const [t, c] of parts) {
      const r = text(b, t, cx, y, size, c, t0);
      spans.push(r);
      t0 += Math.min(48, Math.max(8, Math.round(t.length * 1.7)));
      cx = r.x1;
    }
    return { spans, end: t0, x0: anchor === "middle" ? x - total / 2 : x, x1: (anchor === "middle" ? x - total / 2 : x) + total };
  };

  /* ---------------- board 0: series title, the error, NOUN = UNIT */
  {
    const t = text(0, "Grammar Logic Series", 960, 150, 104, BLUE, cue("grammar logic"), "middle", 34);
    ink(0, under(t.x0, t.x1, 175, 1), cue("grammar logic") + 34, 10, BLUE, 6);
    const e = text(0, "ERROR 1", 960, 285, 110, RED, cue("error one"), "middle", 16);
    ink(0, [W([[e.x0 - 30, 190], [e.x1 + 30, 190], [e.x1 + 30, 312], [e.x0 - 30, 312], [e.x0 - 30, 190]], 3, 2.5)], cue("error one") + 18, 14, RED, 6);
    const lbl = text(0, "Error 1:", 170, 450, 72, RED, cue("look at this"));
    const s = line(0, [["The furniture ", INK], ["are", INK], [" expensive.", INK]], lbl.x1 + 30, 450, 72, cue("the furniture are"));
    const are = s.spans[1];
    ink(0, loop((are.x0 + are.x1) / 2, 428, (are.x1 - are.x0) / 2 + 22, 42, 5), cue("wrong"), 14, RED, 6);
    ink(0, cross(s.x1 + 60, 425, 26, 6), cue("wrong") + 12, 8, RED, 8);
    const h = text(0, "Noun", 170, 615, 92, ORANGE, cue("here is the idea"));
    ink(0, arrowRight(h.x1 + 30, h.x1 + 150, 590, 7), cue("here is the idea") + 12, 8, ORANGE, 6);
    const u = text(0, "Unit", h.x1 + 180, 615, 92, ORANGE, cue("here is the idea") + 20);
    ink(0, under(170, u.x1, 640, 8), cue("here is the idea") + 36, 10, ORANGE, 6);
    text(0, "Some nouns don't name one single thing.", 170, 730, 60, INK, cue("some nouns"), "start", 42);
    line(0, [["They name a whole ", INK], ["GROUP", BLUE], [" of things,", INK]], 170, 820, 60, cue("they name"));
    const l3 = line(0, [["and the group acts as ", INK], ["ONE UNIT.", BLUE]], 170, 910, 60, cue("and the group"));
    ink(0, under(l3.spans[1].x0, l3.spans[1].x1, 928, 9), cue("one unit", 0, 0) + 10, 8, BLUE, 6);
  }

  /* ---------------- boards 1-3: things -> circle -> one name, with the logic chain on the right */
  const family = (b: number, things: { src: string; name: string; phrase: string; cx: number }[], box: [number, number], circle: [number, number, number, number], name: string, namePhrase: [string, number], circlePhrase: [string, number]) => {
    const [bw, bh] = box, [ccx, ccy, crx, cry] = circle;
    things.forEach((it, i) => {
      const at = cue(it.phrase);
      photo(b, it.src, it.cx, ccy - 15, bw, bh, at);
      text(b, it.name, it.cx, ccy + bh / 2 + 35, 50, INK, at + 16, "middle", 10);
      void i;
    });
    ink(b, loop(ccx, ccy + 20, crx, cry, 20 + b), cue(circlePhrase[0], 0, circlePhrase[1]), 32, BLUE, 9);
    ink(b, arrowDown(ccx, ccy + cry + 40, ccy + cry + 100, 30 + b), cue(namePhrase[0], 0, namePhrase[1]) - 2, 8, ORANGE, 7);
    const n = text(b, name, ccx, ccy + cry + 205, 120, ORANGE, cue(namePhrase[0], 0, namePhrase[1]) + 6, "middle", 22);
    ink(b, under(n.x0, n.x1, ccy + cry + 225, 40 + b), cue(namePhrase[0], 0, namePhrase[1]) + 28, 8, ORANGE, 6);
    ink(b, under(n.x0 + 20, n.x1 - 20, ccy + cry + 238, 41 + b), cue(namePhrase[0], 0, namePhrase[1]) + 34, 6, ORANGE, 5);
  };

  // board 1: furniture, following the notes step by step
  family(1, [
    { src: "chair", name: "chair", phrase: "a chair", cx: 250 },
    { src: "table", name: "table", phrase: "a table", cx: 520 },
    { src: "sofa", name: "sofa", phrase: "a sofa", cx: 800 },
    { src: "bed", name: "bed", phrase: "a bed", cx: 1070 },
  ], [240, 220], [660, 330, 590, 245], "FURNITURE", ["name furniture", 0], ["draws a circle", 0]);
  {
    const b = 1, X = 1590;
    const n1 = text(b, "not one object", X, 150, 58, RED, cue("not one object"), "middle", 20);
    ink(b, under(n1.x0, n1.x1, 168, 50), cue("not one object") + 22, 6, RED, 5);
    text(b, "= ONE UNIT", X, 270, 82, BLUE, cue("it is one unit"), "middle", 18);
    ink(b, arrowDown(X, 300, 355, 51), cue("a unit means") - 4, 6, INK, 6);
    const u = text(b, "unit = 1", X, 445, 100, ORANGE, cue("a unit means"), "middle", 18);
    ink(b, loop(u.x1 - 26, 412, 44, 50, 52), cue("means one") + 14, 12, ORANGE, 6);
    ink(b, arrowDown(X, 480, 530, 53), cue("always singular") - 8, 6, INK, 6);
    text(b, "1 = always singular", X, 600, 62, GREEN, cue("always singular"), "middle", 24);
    const s = text(b, "1 + s", X - 40, 720, 86, RED, cue("add s to one"), "middle", 12);
    ink(b, cross(s.x1 + 55, 690, 26, 54), cue("add s to one") + 14, 8, RED, 8);
    const fs = text(b, "furnitures", X, 830, 72, INK, cue("no furnitures"), "middle", 16);
    ink(b, [W([[fs.x0 - 10, 810], [fs.x1 + 10, 800]], 55, 1.5)], cue("no furnitures") + 18, 8, RED, 8);
    text(b, "verb: singular too", 660, 915, 54, GREEN, cue("the verb must"), "middle", 22);
    const c = line(b, [["The furniture ", INK], ["is", GREEN], [" expensive.", INK]], 960, 1010, 80, cue("the furniture is expensive"), "middle");
    ink(b, loop((c.spans[1].x0 + c.spans[1].x1) / 2, 988, 40, 40, 56), c.end, 10, GREEN, 6);
    ink(b, check(c.x1 + 55, 985, 30, 57), c.end + 10, 8, GREEN, 9);
  }

  // board 2: crockery
  family(2, [
    { src: "plate", name: "plate", phrase: "a plate", cx: 280 },
    { src: "bowl", name: "bowl", phrase: "a bowl", cx: 620 },
    { src: "mug", name: "mug", phrase: "a mug", cx: 960 },
  ], [280, 220], [620, 330, 530, 240], "CROCKERY", ["group crockery", 0], ["circle them", 0]);
  {
    const b = 2, X = 1590;
    text(b, "= ONE UNIT", X, 270, 82, BLUE, cue("one unit so", 0, 0), "middle", 18);
    ink(b, arrowDown(X, 300, 360, 60), cue("one unit so", 0, 0) + 20, 6, INK, 6);
    text(b, "singular verb", X, 440, 66, GREEN, cue("one unit so", 0, 0) + 28, "middle", 18);
    const cr = text(b, "crockeries", X, 620, 76, INK, cue("never crockeries"), "middle", 14);
    ink(b, [W([[cr.x0 - 10, 600], [cr.x1 + 10, 590]], 61, 1.5)], cue("never crockeries") + 12, 8, RED, 8);
    const c = line(b, [["The crockery ", INK], ["is", GREEN], [" clean.", INK]], 960, 1000, 80, cue("the crockery is clean"), "middle");
    ink(b, check(c.x1 + 55, 975, 30, 62), c.end + 4, 8, GREEN, 9);
  }

  // board 3: cutlery
  family(3, [
    { src: "fork", name: "fork", phrase: "a fork", cx: 420 },
    { src: "knife", name: "knife", phrase: "a knife", cx: 640 },
    { src: "spoon", name: "spoon", phrase: "a spoon", cx: 860 },
  ], [150, 300], [640, 330, 450, 250], "CUTLERY", ["them cutlery", 0], ["circle them", 1]);
  {
    const b = 3, X = 1590;
    text(b, "= ONE UNIT", X, 270, 82, BLUE, cue("one unit so", 0, 1), "middle", 18);
    ink(b, arrowDown(X, 300, 360, 70), cue("one unit so", 0, 1) + 20, 6, INK, 6);
    text(b, "singular verb", X, 440, 66, GREEN, cue("one unit so", 0, 1) + 26, "middle", 18);
    const c = line(b, [["The cutlery ", INK], ["is", GREEN], [" in the drawer.", INK]], 960, 1010, 80, cue("the cutlery is in"), "middle");
    ink(b, check(c.x1 + 55, 985, 30, 72), c.end + 4, 8, GREEN, 9);
  }

  // board 4: counting pieces, then the whole logic in one line
  {
    const b = 4;
    line(b, [["Need a number?  Count the ", INK], ["PIECES", ORANGE]], 960, 140, 72, cue("need a number"), "middle");
    photo(b, "chair", 250, 290, 110, 130, cue("two pieces"), 10);
    photo(b, "sofa", 420, 300, 190, 110, cue("two pieces") + 6, 10);
    const p1 = line(b, [["two ", INK], ["pieces", ORANGE], [" of furniture", INK]], 580, 318, 76, cue("two pieces"));
    ink(b, under(p1.spans[1].x0, p1.spans[1].x1, 338, 80), p1.end, 8, ORANGE, 6);
    photo(b, "fork", 330, 450, 60, 140, cue("a piece of cutlery"), 10);
    const p2 = line(b, [["a ", INK], ["piece", ORANGE], [" of cutlery", INK]], 580, 478, 76, cue("a piece of cutlery"));
    ink(b, under(p2.spans[1].x0, p2.spans[1].x1, 498, 81), p2.end, 8, ORANGE, 6);

    const steps: [string, string, string][] = [["many things", INK, "many things"], ["one circle", BLUE, "one circle"], ["one unit", BLUE, "one unit"], ["one name", ORANGE, "one name"], ["one singular verb", GREEN, "one singular verb"]];
    const size = 58, gap = 110;
    const widths = steps.map(([t]) => tw(t, size));
    let x = 960 - (widths.reduce((a, w) => a + w, 0) + gap * (steps.length - 1)) / 2;
    steps.forEach(([t, c, ph], i) => {
      const at = cue(ph, 0, ({ "one unit": 4, "one name": 1 } as Record<string, number>)[ph] ?? 0);
      text(b, t, x, 700, size, c, at, "start", 16);
      if (ph === "one circle") ink(b, loop(x + widths[i] / 2, 682, widths[i] / 2 + 22, 44, 82), at + 14, 12, BLUE, 5);
      if (i < steps.length - 1) ink(b, arrowRight(x + widths[i] + 18, x + widths[i] + gap - 18, 684, 83 + i), at + 16, 6, INK, 5);
      x += widths[i] + gap;
    });
    const e = text(b, "ERROR 1", 900, 900, 110, RED, cue("thats error one"), "middle", 14);
    ink(b, check(e.x1 + 80, 872, 44, 90), cue("thats error one") + 16, 10, GREEN, 11);
  }

  /* ---------------- marker/hand position: follow whatever is being drawn right now */
  const tipOf = (it: Item, p: number): Pt => {
    if (it.k === "text") {
      const w = tw(it.text, it.size), x0 = it.anchor === "middle" ? it.x - w / 2 : it.x;
      return [x0 + p * w, it.y - it.size * 0.28 + Math.sin(p * w * 0.09) * it.size * 0.16];
    }
    if (it.k === "photo") return [it.x + p * it.w, it.y + it.h * (0.5 + 0.38 * Math.sin(p * Math.PI * 7))];
    const st = drawState({ strokes: it.strokes, at: 0, dur: 1, color: "" }, Math.max(0.001, Math.min(0.999, p)));
    return st.tip ?? it.strokes[it.strokes.length - 1][it.strokes[it.strokes.length - 1].length - 1];
  };
  let tip: Pt | null = null, color = INK;
  let last: { it: Item; endF: number } | null = null;
  for (const it of items) {
    const p = (f - it.at) / it.dur;
    if (p > 0 && p < 1) { tip = tipOf(it, p); color = it.k === "ink" ? it.color : it.k === "text" ? it.color : INK; }
    if (f >= it.at + it.dur && (!last || it.at + it.dur > last.endF)) last = { it, endF: it.at + it.dur };
  }
  const REST: Pt = [VW + 260, VH + 200];
  if (!tip && last) {
    const idle = f - last.endF, from = tipOf(last.it, 1);
    const k = Math.max(0, Math.min(1, (idle - 12) / 16)), e = k * k * (3 - 2 * k);
    tip = [from[0] + (REST[0] - from[0]) * e, from[1] + (REST[1] - from[1]) * e];
    color = last.it.k === "photo" ? INK : (last.it as Text | Ink).color;
  }
  if (!tip) tip = REST;

  const boardOf = (fr: number) => boards.findIndex((s, i) => fr >= s && fr < boards[i + 1]);
  const cur = Math.max(0, boardOf(f));
  const wipe = (b: number) => (b + 1 < boards.length - 1 ? Math.max(0, Math.min(1, (f - (boards[b + 1] - 16)) / 16)) : 0);

  return (
    <AbsoluteFill style={{ background: "#D9DDE3" }}>
      {/* the board itself: aluminium frame, faint smudges and a marker tray */}
      <div style={{ position: "absolute", left: 14, top: 14, right: 14, bottom: 14, borderRadius: 10, background: "linear-gradient(#EEF0F3, #C7CCD3)", boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }} />
      <div style={{ position: "absolute", left: 30, top: 30, right: 30, bottom: 30, background: "#FDFDFB", borderRadius: 4, boxShadow: "inset 0 0 40px rgba(0,0,0,0.06)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 22% 30%, rgba(120,130,150,0.05), transparent 45%), radial-gradient(ellipse at 78% 72%, rgba(120,130,150,0.06), transparent 50%)" }} />
      </div>
      <svg width={VW} height={VH} style={{ position: "absolute", inset: 0 }}>
        {boards.slice(0, -1).map((_, b) => {
          if (b !== cur && !(b === cur - 1 && wipe(b) < 1)) return null;
          const er = wipe(b);
          return (
            <g key={b}>
              <defs><clipPath id={`bd${b}`}><rect x={VW * er} y={0} width={VW} height={VH} /></clipPath></defs>
              <g clipPath={`url(#bd${b})`}>
                {items.filter((it) => it.b === b).map((it, i) => <Draw key={i} it={it} f={f} id={`i${b}_${i}`} />)}
              </g>
            </g>
          );
        })}
        {/* series tag stays in the corner once the first board is gone */}
        {f >= boards[1] && (
          <g opacity={Math.min(1, (f - boards[1]) / 12)}>
            <text x={60} y={78} fontFamily={FONT} fontSize={36} fill={GREY}>Grammar Logic Series</text>
            <text x={60 + tw("Grammar Logic Series  ", 36)} y={78} fontFamily={FONT} fontSize={36} fill={RED}>Error 1</text>
          </g>
        )}
        {boards.slice(1, -1).map((bf, i) => {
          const p = wipe(i);
          return p > 0 && p < 1 ? <Eraser key={i} x={VW * p} /> : null;
        })}
        <Hand x={tip[0]} y={tip[1]} color={color} />
      </svg>
      <TrackAudio id="wb" />
      {items.filter((it) => it.k !== "photo").filter((it, i, arr) => arr.findIndex((o) => Math.abs(o.at - it.at) < 24) === i).map((it, i) => <Fx key={i} at={it.at} name="scratch" volume={0.05} />)}
      {items.filter((it) => it.k === "photo").map((it, i) => <Fx key={`p${i}`} at={it.at} name="pop" volume={0.06} />)}
      {boards.slice(1, -1).map((bf, i) => <Fx key={`e${i}`} at={bf - 16} name="whoosh" volume={0.07} />)}
    </AbsoluteFill>
  );
};

const Draw: React.FC<{ it: Item; f: number; id: string }> = ({ it, f, id }) => {
  const p = Math.max(0, Math.min(1, (f - it.at) / it.dur));
  if (p <= 0) return null;
  if (it.k === "ink") {
    const st = drawState({ strokes: it.strokes, at: it.at, dur: it.dur, color: it.color }, f);
    return <g fill="none" stroke={it.color} strokeWidth={it.width} strokeLinecap="round" strokeLinejoin="round">{st.parts.map((pts, i) => <path key={i} d={toD(pts)} />)}</g>;
  }
  if (it.k === "photo") {
    return (
      <g>
        <defs><clipPath id={id}><rect x={it.x - 6} y={it.y - 6} width={(it.w + 12) * p} height={it.h + 12} /></clipPath></defs>
        <image href={staticFile(`wb/${it.src}.png`)} x={it.x} y={it.y} width={it.w} height={it.h} clipPath={`url(#${id})`} preserveAspectRatio="xMidYMid meet" />
      </g>
    );
  }
  const w = tw(it.text, it.size), x0 = it.anchor === "middle" ? it.x - w / 2 : it.x;
  return (
    <g>
      <defs><clipPath id={id}><rect x={x0 - 12} y={it.y - it.size * 1.1} width={(w + 24) * p} height={it.size * 1.6} /></clipPath></defs>
      <text x={x0} y={it.y} fontSize={it.size} fill={it.color} fontFamily={FONT} clipPath={`url(#${id})`} style={{ whiteSpace: "pre" }}>{it.text}</text>
    </g>
  );
};

/** A right hand holding a marker; (x, y) is the marker tip. */
const Hand: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => {
  const SK = "#F1C4A0", SKD = "#D89C74", SH = "rgba(0,0,0,0.13)";
  return (
    <g transform={`translate(${x} ${y}) rotate(-38)`}>
      {/* soft shadow on the board */}
      <ellipse cx={260} cy={120} rx={260} ry={70} fill={SH} transform="rotate(38 260 120)" />
      {/* forearm and sleeve */}
      <path d="M250 30 Q420 10 900 20 L900 190 Q420 200 250 150 Z" fill={SK} stroke={SKD} strokeWidth={3} />
      <path d="M430 8 L900 0 L900 210 L430 196 Q450 100 430 8 Z" fill="#2E4C8F" />
      <path d="M430 8 Q450 100 430 196" fill="none" stroke="#243C72" strokeWidth={8} />
      {/* palm */}
      <ellipse cx={265} cy={70} rx={120} ry={88} fill={SK} stroke={SKD} strokeWidth={3} />
      {/* curled ring and middle fingers under the pen */}
      <ellipse cx={205} cy={112} rx={58} ry={26} fill={SK} stroke={SKD} strokeWidth={3} />
      <ellipse cx={170} cy={72} rx={62} ry={25} fill={SK} stroke={SKD} strokeWidth={3} />
      {/* the marker */}
      <path d="M0 0 L24 -11 L24 11 Z" fill={color} />
      <rect x={22} y={-20} width={40} height={40} rx={6} fill="#2B2B2F" />
      <rect x={60} y={-24} width={260} height={48} rx={12} fill="#F3F3F3" stroke="#BDBDBD" strokeWidth={3} />
      <rect x={150} y={-24} width={70} height={48} fill={color} opacity={0.92} />
      <rect x={310} y={-24} width={34} height={48} rx={10} fill={color} />
      {/* index finger along the pen and thumb over it */}
      <path d="M78 22 Q70 42 96 46 L200 44 Q222 30 200 16 L96 14 Q80 12 78 22 Z" fill={SK} stroke={SKD} strokeWidth={3} />
      <path d="M92 -20 Q84 -40 110 -44 L215 -34 Q240 -20 222 -4 L110 -6 Q94 -8 92 -20 Z" fill={SK} stroke={SKD} strokeWidth={3} />
      <path d="M98 -30 Q104 -36 114 -34" fill="none" stroke={SKD} strokeWidth={3} />
    </g>
  );
};

const Eraser: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x - 40} 0)`}>
    <rect x={-60} y={30} width={130} height={1020} fill="rgba(253,253,251,0.92)" />
    <g transform="translate(0 540) rotate(90)">
      <rect x={-150} y={-55} width={300} height={110} rx={18} fill="#2F4A7A" />
      <rect x={-150} y={30} width={300} height={34} rx={8} fill="#E3E3E3" />
      <text x={0} y={-6} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={30} fill="#fff">ERASER</text>
    </g>
  </g>
);
