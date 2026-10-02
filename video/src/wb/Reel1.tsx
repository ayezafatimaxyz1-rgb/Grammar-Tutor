// Instagram reel (9:16): a CSS past-paper question already on screen, solved by logic on a whiteboard.
// "Each furniture in this display is on sale for half price."
import React from "react";
import { AbsoluteFill, interpolate, Easing, useCurrentFrame } from "remotion";
import { Fx, Karaoke } from "../v2/kit";
import { Pt, TrackAudio } from "../samples/common";
import { Anchor, C, Draw, Font, Hand, Item, W, arrow, check, cross, loop, tipOf, tw, under, useBeatCue, writeDur } from "./engine";
import SIZES from "./sizes.json";
import TIM from "../timings.json";

const SZ = SIZES as unknown as Record<string, [number, number]>;
const RW = 1080, RH = 1920, V = "rl1";
type Cue = { start: number; end: number; text: string; words: { w: string; t: number }[] };
const CAPS = (TIM as unknown as { captions: Record<string, Cue[]> }).captions[V];

// exam card layout
const CX = 60, CY = 175, CWd = 960, CHt = 540;
const SX = 100, SS = 56; // sentence x and size
const LINES = ["Each furniture in this", "display is on sale for", "half price."];
const LY = [405, 487, 569];
const wordBox = (li: number, word: string) => {
  const t = LINES[li], i = (" " + t + " ").indexOf(` ${word} `);
  const x0 = SX + tw(t.slice(0, i), SS, "f700");
  return { x0, x1: x0 + tw(word, SS, "f700"), y: LY[li] };
};

export const Reel1: React.FC = () => {
  const f = useCurrentFrame();
  const { cue, start, segs } = useBeatCue(V);
  const END = segs.reduce((a, s) => a + s.frames, 0);
  const items: Item[] = [];
  const panels: number[] = [];
  let P = -1; // -1 = on the exam card (never erased)

  const panel = (beat: string) => { panels.push(start(beat)); P = panels.length - 1; };
  const text = (t: string, x: number, y: number, size: number, color: string, at: number, o: { font?: Font; anchor?: Anchor; dur?: number; hand?: boolean } = {}) => {
    const font = o.font ?? "hand", hand = o.hand ?? (font === "hand" || font === "script");
    const dur = o.dur ?? (hand ? writeDur(t) : 10);
    items.push({ k: "text", b: P, text: t, x, y, size, color, font, at, dur, anchor: o.anchor ?? "start", hand });
    const w = tw(t, size, font), x0 = o.anchor === "middle" ? x - w / 2 : x;
    return { x0, x1: x0 + w, end: at + dur };
  };
  const line = (parts: [string, string][], x: number, y: number, size: number, at: number, anchor: Anchor = "middle") => {
    const total = parts.reduce((a, [t]) => a + tw(t, size), 0);
    let cx = anchor === "middle" ? x - total / 2 : x, t0 = at;
    for (const [t, c] of parts) { const r = text(t, cx, y, size, c, t0); cx = r.x1; t0 = r.end; }
    return t0;
  };
  const ink = (strokes: Pt[][], at: number, dur: number, color: string, width = 7) => items.push({ k: "ink", b: P, strokes, at, dur, color, width });
  const photo = (src: string, cx: number, cy: number, bw: number, bh: number, at: number, dur = 12) => {
    const path = src.startsWith("ik:") ? `wb/${src.slice(3)}.png` : `wb/fx/${src}.png`;
    const [nw, nh] = SZ[path] ?? [256, 256], s = Math.min(bw / nw, bh / nh);
    items.push({ k: "photo", b: P, src: path, x: cx - (nw * s) / 2, y: cy - (nh * s) / 2, w: nw * s, h: nh * s, at, dur });
  };
  const rect = (x: number, y: number, w: number, h: number, fill: string, at: number, o: { stroke?: string; sw?: number; r?: number; mode?: "pop" | "grow" } = {}) =>
    items.push({ k: "rect", b: P, x, y, w, h, fill, stroke: o.stroke, sw: o.sw, r: o.r, at, dur: o.mode === "grow" ? 10 : 10, mode: o.mode ?? "pop" });
  const badge = (n: string, x: number, y: number, color: string, at: number) => {
    rect(x - 30, y - 30, 60, 60, color, at, { r: 30 });
    text(n, x, y + 14, 38, "#FFFFFF", at + 2, { font: "f800", anchor: "middle", hand: false });
  };

  /* ---------- marks on the exam card itself */
  const each = wordBox(0, "Each"), furn = wordBox(0, "furniture"), is = wordBox(1, "is");
  ink(loop((is.x0 + is.x1) / 2, is.y - 18, 34, 34, 1), cue("r2", "attack the verb"), 10, C.grey, 5);
  ink(check(is.x1 + 40, is.y - 30, 14, 2), cue("r2", "the verb is fine"), 6, C.green, 6);
  ink(loop((each.x0 + each.x1) / 2, each.y - 18, (each.x1 - each.x0) / 2 + 18, 40, 3), cue("r2", "the word each"), 12, C.red, 7);
  ink(under(furn.x0, furn.x1, furn.y + 14, 4), cue("r4", "but furniture"), 8, C.red, 6);
  // the correction, teacher style: a caret and "piece of" written above the line
  const gap = (each.x1 + furn.x0) / 2;
  ink([W([[gap - 14, each.y + 18], [gap, each.y - 4], [gap + 14, each.y + 18]], 5, 1)], cue("r5", "each piece of"), 6, C.green, 6);
  text("piece of", gap, each.y - 58, 40, C.green, cue("r5", "each piece of") + 4, { anchor: "middle" });

  /* ---------- panel 1: the usual guess */
  panel("r2");
  {
    text("most students:", 540, 880, 52, C.grey, cue("r2", "most students"), { anchor: "middle" });
    const g = line([["\"is\" should be ", C.ink], ["\"are\"", C.ink]], 540, 990, 72, cue("r2", "attack the verb"));
    ink(cross(900, 962, 30, 6), g + 2, 8, C.red, 10);
    line([["the verb is ", C.green], ["fine", C.green]], 540, 1120, 72, cue("r2", "but the verb"));
    line([["real problem: ", C.ink], ["EACH", C.red]], 540, 1300, 96, cue("r2", "the real problem"));
  }
  /* ---------- panel 2: EACH = one by one; furniture = one unit */
  panel("r3");
  {
    line([["EACH", C.orange], [" = pick one by one", C.navy]], 540, 860, 66, cue("r3", "each means"));
    const row: [string, string, number][] = [["ik:chair", "chair", 230], ["ik:table", "table", 540], ["ik:sofa", "sofa", 850]];
    row.forEach(([s, n, x], i) => {
      const at = cue("r3", `each ${n}`);
      photo(s, x, 1060, 230, 180, at);
      badge(`${i + 1}`, x + 105, 965, C.orange, at + 8);
      text(`each ${n}`, x, 1195, 44, C.orange, at + 6, { anchor: "middle" });
    });
    line([["EACH needs something you can ", C.ink], ["COUNT", C.green]], 540, 1320, 50, cue("r3", "needs something"));
    // r4: the same three things are one unit
    ink(loop(540, 1080, 505, 185, 9), cue("r4", "grouped together"), 26, C.blue, 9);
    line([["FURNITURE", C.blue], [" = 1 unit", C.navy]], 540, 1430, 64, cue("r4", "named as one"));
    const c = line([["EACH out of ", C.red], ["1", C.red], ["?", C.red]], 540, 1540, 66, cue("r4", "you cant pick"));
    ink(cross(830, 1515, 28, 12), c + 2, 8, C.red, 9);
  }
  /* ---------- panel 3: give EACH something countable */
  panel("r5");
  {
    line([["give EACH something ", C.navy], ["countable", C.green]], 540, 860, 58, cue("r5", "so we give"));
    photo("ik:chair", 330, 1050, 220, 220, cue("r5", "a piece"));
    ink(loop(330, 1050, 140, 135, 20), cue("r5", "a piece") + 10, 12, C.orange, 7);
    ink(arrow(500, 1050, 600, 1050, 21), cue("r5", "a piece") + 18, 6, C.orange, 6);
    text("a PIECE", 760, 1070, 72, C.orange, cue("r5", "a piece") + 18, { anchor: "middle" });
    // the corrected sentence, popped in a green box
    const at = cue("r6", "each piece");
    rect(70, 1250, 940, 330, "#ECF8F0", at - 4, { stroke: C.green, sw: 4, r: 22 });
    rect(110 + tw("Each ", 52, "f800") - 8, 1310, tw("piece of", 52, "f800") + 16, 62, C.yellow, at + 4, { mode: "grow", r: 8 });
    text("Each piece of furniture", 110, 1356, 52, C.ink, at, { font: "f800", hand: false });
    text("in this display is on sale", 110, 1436, 52, C.ink, at + 4, { font: "f800", hand: false });
    text("for half price.", 110, 1516, 52, C.ink, at + 8, { font: "f800", hand: false });
    ink(check(890, 1480, 40, 30), at + 26, 10, C.green, 12);
  }
  /* ---------- panel 4: call to action */
  panel("r7");
  {
    line([["Logic, ", C.navy], ["not rules.", C.red]], 540, 960, 96, cue("r7", "logic not"));
    rect(240, 1080, 600, 120, C.navy, cue("r7", "comment"), { r: 60 });
    text("Comment  LOGIC", 540, 1160, 54, "#FFFFFF", cue("r7", "comment") + 4, { font: "f800", anchor: "middle", hand: false });
    text("for the next one", 540, 1290, 50, C.grey, cue("r7", "for the next"), { anchor: "middle" });
  }

  /* ---------- hand */
  let tip: Pt | null = null, color = C.ink, last: { it: Item; e: number } | null = null;
  for (const it of items) {
    const p = (f - it.at) / it.dur, t = p > 0 && p < 1 ? tipOf(it, p) : null;
    if (t) { tip = t; color = it.k === "text" || it.k === "ink" ? it.color : C.ink; }
    if (tipOf(it, 1) && f >= it.at + it.dur && (!last || it.at + it.dur > last.e)) last = { it, e: it.at + it.dur };
  }
  const REST: Pt = [RW + 300, RH + 200];
  if (!tip && last) {
    const from = tipOf(last.it, 1) as Pt, k = Math.max(0, Math.min(1, (f - last.e - 12) / 16)), e = k * k * (3 - 2 * k);
    tip = [from[0] + (REST[0] - from[0]) * e, from[1] + (REST[1] - from[1]) * e];
    color = last.it.k === "text" || last.it.k === "ink" ? last.it.color : C.ink;
  }
  if (!tip) tip = REST;

  /* ---------- editing: punch-in on the exam card, countdown, panel wipes */
  const zIn = cue("r2", "the word each"), zOut = start("r3");
  const z = interpolate(f, [zIn - 4, zIn + 8, zOut - 10, zOut + 4], [1, 1.32, 1.32, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const ox = each.x0 + 40, oy = each.y - 20;
  const cdStart = cue("r1", "error") + 22, cdEnd = start("r2");
  const cdP = (f - cdStart) / (cdEnd - cdStart);
  const curPanel = panels.findIndex((s, i) => f >= s && f < (panels[i + 1] ?? END));
  const wipe = (i: number) => (i + 1 < panels.length ? Math.max(0, Math.min(1, (f - (panels[i + 1] - 12)) / 12)) : 0);
  const solved = f >= cue("r6", "each piece") + 30;
  const pulse = 1 + 0.04 * Math.sin(f / 5);

  return (
    <AbsoluteFill style={{ background: "#DCE0E6" }}>
      <div style={{ position: "absolute", left: 18, top: 18, right: 18, bottom: 18, borderRadius: 14, background: "linear-gradient(#EEF0F3, #C7CCD3)" }} />
      <div style={{ position: "absolute", left: 32, top: 32, right: 32, bottom: 32, background: "#FDFDFB", borderRadius: 6, boxShadow: "inset 0 0 50px rgba(0,0,0,0.06)" }} />
      <svg width={RW} height={RH} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="10" stdDeviation="14" floodOpacity="0.18" /></filter>
        </defs>
        {/* header */}
        <text x={60} y={118} fontFamily="Inter" fontWeight={800} fontSize={40} letterSpacing={1.5} fill={C.navy}>GRAMMAR LOGIC</text>
        <rect x={60} y={130} width={tw("GRAMMAR LOGIC", 40, "f800") + 22} height={5} fill={C.red} />
        <rect x={RW - 60 - 290} y={78} width={290} height={58} rx={29} fill={C.red} />
        <text x={RW - 60 - 145} y={117} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={28} fill="#fff">CSS PAST PAPER</text>

        {/* the exam card, with a punch-in on "Each" */}
        <g transform={`translate(${ox} ${oy}) scale(${z}) translate(${-ox} ${-oy})`}>
          <rect x={CX} y={CY} width={CWd} height={CHt} rx={18} fill="#FFFFFF" filter="url(#sh)" />
          {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={CX + 20} x2={CX + CWd - 20} y1={420 + i * 82} y2={420 + i * 82} stroke="#E6ECF5" strokeWidth={2} />)}
          <line x1={CX + 22} x2={CX + 22} y1={CY + 16} y2={CY + CHt - 16} stroke="#F2B8B8" strokeWidth={3} />
          <text x={SX} y={CY + 62} fontFamily="Inter" fontWeight={700} fontSize={25} fill={C.grey} letterSpacing={1}>CSS · ENGLISH (PRECIS &amp; COMPOSITION)</text>
          <text x={SX} y={CY + 122} fontFamily="Inter" fontWeight={800} fontSize={33} fill={C.navy}>Q. Correct the following sentence:</text>
          {LINES.map((l, i) => <text key={i} x={SX} y={LY[i]} fontFamily="Inter" fontWeight={700} fontSize={SS} fill={C.ink} style={{ whiteSpace: "pre" }}>{l}</text>)}
          {items.filter((it) => it.b === -1).map((it, i) => <Draw key={i} it={it} f={f} id={`c${i}`} />)}
          {f < start("r2") && (
            <g transform={`translate(${CX + CWd - 175} ${CY + CHt - 62}) scale(${pulse})`}>
              <rect x={-130} y={-30} width={260} height={60} rx={30} fill={C.red} />
              <text x={0} y={11} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={28} fill="#fff">FIND THE ERROR</text>
            </g>
          )}
          {solved && (
            <g transform={`translate(${CX + CWd - 150} ${CY + 60}) rotate(-12) scale(${Math.min(1, 0.6 + (f - cue("r6", "each piece") - 30) / 10)})`}>
              <rect x={-120} y={-34} width={240} height={68} rx={10} fill="none" stroke={C.green} strokeWidth={6} />
              <text x={0} y={14} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={38} fill={C.green}>CORRECT</text>
            </g>
          )}
        </g>

        {/* countdown */}
        {cdP > 0 && cdP < 1.05 && (
          <g transform="translate(540 1080)">
            <circle r={150} fill="#FFFFFF" filter="url(#sh)" />
            <circle r={130} fill="none" stroke="#E5E7EB" strokeWidth={18} />
            <circle r={130} fill="none" stroke={C.red} strokeWidth={18} strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 130 * Math.max(0, 1 - cdP)} 999`} transform="rotate(-90)" />
            <text y={50} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={150} fill={C.navy}>{Math.max(1, 3 - Math.floor(cdP * 3))}</text>
            <text y={235} textAnchor="middle" fontFamily="'Patrick Hand'" fontSize={60} fill={C.grey}>can you spot it?</text>
          </g>
        )}

        {/* board panels below the card */}
        {panels.map((_, i) => {
          if (i !== curPanel && !(i === curPanel - 1 && wipe(i) < 1)) return null;
          const er = wipe(i);
          return (
            <g key={i}>
              <defs><clipPath id={`pn${i}`}><rect x={RW * er} y={740} width={RW} height={1000} /></clipPath></defs>
              <g clipPath={`url(#pn${i})`}>{items.map((it, k) => (it.b === i ? <Draw key={k} it={it} f={f} id={`p${k}`} /> : null))}</g>
            </g>
          );
        })}
        <g transform="scale(0.85)"><Hand x={tip[0] / 0.85} y={tip[1] / 0.85} color={color} /></g>
      </svg>
      {/* caption band */}
      <div style={{ position: "absolute", left: 32, right: 32, bottom: 32, height: 210, background: "linear-gradient(rgba(20,30,52,0), rgba(20,30,52,0.92) 35%)", borderRadius: "0 0 6px 6px" }} />
      <Karaoke cues={CAPS} top={1730} />
      <TrackAudio id={V} />
      {[0, 1, 2].map((k) => <Fx key={`t${k}`} at={cdStart + (k * (cdEnd - cdStart)) / 3} name="tick" volume={0.22} />)}
      <Fx at={cue("r2", "the word each") - 2} name="whoosh" volume={0.12} />
      <Fx at={cue("r4", "you cant pick") + 10} name="wrong" volume={0.1} />
      <Fx at={cue("r6", "each piece") + 30} name="correct" volume={0.14} />
      {panels.slice(1).map((s, i) => <Fx key={`w${i}`} at={s - 12} name="whoosh" volume={0.08} />)}
      {items.filter((it) => it.k === "photo").map((it, i) => <Fx key={`p${i}`} at={it.at} name="pop" volume={0.06} />)}
    </AbsoluteFill>
  );
};
