// Shared kit for 9:16 "exam question solved by logic" reels: a builder for board items and a
// shell that draws the header, the exam card (with punch-in zoom), countdown, board panels,
// the hand, captions and sound.
import React from "react";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { Fx } from "../v2/kit";
import { Karaoke } from "../v2/kit";
import { Pt, TrackAudio } from "../samples/common";
import { Anchor, C, Draw, Font, Hand, Item, tipOf, tw, writeDur } from "./engine";
import SIZES from "./sizes.json";
import TIM from "../timings.json";

const SZ = SIZES as unknown as Record<string, [number, number]>;
export const RW = 1080, RH = 1920;
export const CARD = { x: 60, y: 175, w: 960 };
type Cue = { start: number; end: number; text: string; words: { w: string; t: number }[] };
type Sound = Parameters<typeof Fx>[0]["name"];

export const makeReel = () => {
  const items: Item[] = [];
  const panels: number[] = [];
  let P = -1; // -1 = drawn on the exam card (never erased)
  const api = {
    items, panels,
    card: () => { P = -1; },
    panel: (at: number) => { panels.push(at); P = panels.length - 1; },
    text: (t: string, x: number, y: number, size: number, color: string, at: number, o: { font?: Font; anchor?: Anchor; dur?: number; hand?: boolean } = {}) => {
      const font = o.font ?? "hand", hand = o.hand ?? (font === "hand" || font === "script");
      const dur = o.dur ?? (hand ? writeDur(t) : 10);
      items.push({ k: "text", b: P, text: t, x, y, size, color, font, at, dur, anchor: o.anchor ?? "start", hand });
      const w = tw(t, size, font), x0 = o.anchor === "middle" ? x - w / 2 : x;
      return { x0, x1: x0 + w, end: at + dur };
    },
    line: (parts: [string, string][], x: number, y: number, size: number, at: number, anchor: Anchor = "middle") => {
      const total = parts.reduce((a, [t]) => a + tw(t, size), 0);
      let cx = anchor === "middle" ? x - total / 2 : x, t0 = at;
      const x0 = cx;
      for (const [t, c] of parts) { const r = api.text(t, cx, y, size, c, t0); cx = r.x1; t0 = r.end; }
      return { end: t0, x0, x1: x0 + total };
    },
    ink: (strokes: Pt[][], at: number, dur: number, color: string, width = 7) => { items.push({ k: "ink", b: P, strokes, at, dur, color, width }); },
    photo: (src: string, cx: number, cy: number, bw: number, bh: number, at: number, dur = 12) => {
      const path = src.startsWith("ik:") ? `wb/${src.slice(3)}.png` : `wb/fx/${src}.png`;
      const [nw, nh] = SZ[path] ?? [256, 256], s = Math.min(bw / nw, bh / nh);
      items.push({ k: "photo", b: P, src: path, x: cx - (nw * s) / 2, y: cy - (nh * s) / 2, w: nw * s, h: nh * s, at, dur });
    },
    rect: (x: number, y: number, w: number, h: number, fill: string, at: number, o: { stroke?: string; sw?: number; r?: number; mode?: "pop" | "grow" } = {}) => {
      items.push({ k: "rect", b: P, x, y, w, h, fill, stroke: o.stroke, sw: o.sw, r: o.r, at, dur: 10, mode: o.mode ?? "pop" });
    },
    badge: (n: string, x: number, y: number, color: string, at: number) => {
      api.rect(x - 30, y - 30, 60, 60, color, at, { r: 30 });
      api.text(n, x, y + 14, 38, "#FFFFFF", at + 2, { font: "f800", anchor: "middle", hand: false });
    },
    /** the corrected sentence in a green box; `hl` = [line, word] to highlight */
    answerBox: (lines: string[], y: number, at: number, hl?: [number, string]) => {
      const size = 50, h = lines.length * 78 + 56;
      api.rect(70, y, 940, h, "#ECF8F0", at - 4, { stroke: C.green, sw: 4, r: 22 });
      if (hl) {
        const [li, w] = hl, i = lines[li].indexOf(w);
        api.rect(110 + tw(lines[li].slice(0, i), size, "f800") - 8, y + 34 + li * 78, tw(w, size, "f800") + 16, 60, C.yellow, at + 4, { mode: "grow", r: 8 });
      }
      lines.forEach((l, i) => api.text(l, 110, y + 80 + i * 78, size, C.ink, at + i * 4, { font: "f800", hand: false }));
      return y + h;
    },
  };
  return api;
};

export const ReelShell: React.FC<{
  f: number; video: string; reel: ReturnType<typeof makeReel>; end: number;
  chip: string; prompt: string; promptUntil: number; cardH: number; card: React.ReactNode;
  zoom?: { at: number; out: number; ox: number; oy: number; s?: number }[];
  countdown: [number, number]; stamp?: { at: number; text: string }; sfx?: { at: number; name: Sound; v: number }[];
}> = ({ f, video, reel, end, chip, prompt, promptUntil, cardH, card, zoom = [], countdown, stamp, sfx = [] }) => {
  const { items, panels } = reel;
  // hand follows whatever is being drawn
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

  let z = 1, ox = RW / 2, oy = 400;
  for (const k of zoom) {
    const v = interpolate(f, [k.at - 4, k.at + 8, k.out - 10, k.out + 4], [1, k.s ?? 1.3, k.s ?? 1.3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
    if (v > 1.001) { z = v; ox = k.ox; oy = k.oy; }
  }
  const [cdS, cdE] = countdown, cdP = (f - cdS) / (cdE - cdS);
  const cur = panels.findIndex((s, i) => f >= s && f < (panels[i + 1] ?? end));
  const wipe = (i: number) => (i + 1 < panels.length ? Math.max(0, Math.min(1, (f - (panels[i + 1] - 12)) / 12)) : 0);
  const pulse = 1 + 0.04 * Math.sin(f / 5);
  const top = CARD.y + cardH + 40;
  const caps = (TIM as unknown as { captions: Record<string, Cue[]> }).captions[video];

  return (
    <AbsoluteFill style={{ background: "#DCE0E6" }}>
      <div style={{ position: "absolute", left: 18, top: 18, right: 18, bottom: 18, borderRadius: 14, background: "linear-gradient(#EEF0F3, #C7CCD3)" }} />
      <div style={{ position: "absolute", left: 32, top: 32, right: 32, bottom: 32, background: "#FDFDFB", borderRadius: 6, boxShadow: "inset 0 0 50px rgba(0,0,0,0.06)" }} />
      <svg width={RW} height={RH} style={{ position: "absolute", inset: 0 }}>
        <defs><filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="10" stdDeviation="14" floodOpacity="0.18" /></filter></defs>
        <text x={60} y={118} fontFamily="Inter" fontWeight={800} fontSize={40} letterSpacing={1.5} fill={C.navy}>GRAMMAR LOGIC</text>
        <rect x={60} y={130} width={tw("GRAMMAR LOGIC", 40, "f800") + 22} height={5} fill={C.red} />
        <rect x={RW - 60 - tw(chip, 28, "f800") - 56} y={78} width={tw(chip, 28, "f800") + 56} height={58} rx={29} fill={C.red} />
        <text x={RW - 60 - (tw(chip, 28, "f800") + 56) / 2} y={117} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={28} fill="#fff">{chip}</text>

        <g transform={`translate(${ox} ${oy}) scale(${z}) translate(${-ox} ${-oy})`}>
          <rect x={CARD.x} y={CARD.y} width={CARD.w} height={cardH} rx={18} fill="#FFFFFF" filter="url(#sh)" />
          <line x1={CARD.x + 22} x2={CARD.x + 22} y1={CARD.y + 16} y2={CARD.y + cardH - 16} stroke="#F2B8B8" strokeWidth={3} />
          {card}
          {items.filter((it) => it.b === -1).map((it, i) => <Draw key={i} it={it} f={f} id={`c${i}`} />)}
          {f < promptUntil && (
            <g transform={`translate(${CARD.x + CARD.w - 30 - (tw(prompt, 26, "f800") + 50) / 2} ${CARD.y + cardH - 50}) scale(${pulse})`}>
              <rect x={-(tw(prompt, 26, "f800") + 50) / 2} y={-28} width={tw(prompt, 26, "f800") + 50} height={56} rx={28} fill={C.red} />
              <text x={0} y={10} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={26} fill="#fff">{prompt}</text>
            </g>
          )}
          {stamp && f >= stamp.at && (
            <g transform={`translate(${CARD.x + CARD.w - 160} ${CARD.y + 58}) rotate(-12) scale(${Math.min(1, 0.6 + (f - stamp.at) / 10)})`}>
              <rect x={-(tw(stamp.text, 36, "f800") + 50) / 2} y={-34} width={tw(stamp.text, 36, "f800") + 50} height={68} rx={10} fill="rgba(255,255,255,0.85)" stroke={C.green} strokeWidth={6} />
              <text x={0} y={13} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={36} fill={C.green}>{stamp.text}</text>
            </g>
          )}
        </g>

        {cdP > 0 && cdP < 1.05 && (
          <g transform={`translate(540 ${Math.max(top + 230, 1080)})`}>
            <circle r={150} fill="#FFFFFF" filter="url(#sh)" />
            <circle r={130} fill="none" stroke="#E5E7EB" strokeWidth={18} />
            <circle r={130} fill="none" stroke={C.red} strokeWidth={18} strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 130 * Math.max(0, 1 - cdP)} 999`} transform="rotate(-90)" />
            <text y={50} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={150} fill={C.navy}>{Math.max(1, 3 - Math.floor(cdP * 3))}</text>
            <text y={235} textAnchor="middle" fontFamily="'Patrick Hand'" fontSize={60} fill={C.grey}>can you solve it?</text>
          </g>
        )}

        {panels.map((_, i) => {
          if (i !== cur && !(i === cur - 1 && wipe(i) < 1)) return null;
          return (
            <g key={i}>
              <defs><clipPath id={`pn${i}`}><rect x={RW * wipe(i)} y={top - 20} width={RW} height={1700 - top} /></clipPath></defs>
              <g clipPath={`url(#pn${i})`}>{items.map((it, k) => (it.b === i ? <Draw key={k} it={it} f={f} id={`p${k}`} /> : null))}</g>
            </g>
          );
        })}
        <g transform="scale(0.85)"><Hand x={tip[0] / 0.85} y={tip[1] / 0.85} color={color} /></g>
      </svg>
      <div style={{ position: "absolute", left: 32, right: 32, bottom: 32, height: 210, background: "linear-gradient(rgba(20,30,52,0), rgba(20,30,52,0.92) 35%)", borderRadius: "0 0 6px 6px" }} />
      <Karaoke cues={caps} top={1730} />
      <TrackAudio id={video} />
      {[0, 1, 2].map((k) => <Fx key={`t${k}`} at={cdS + (k * (cdE - cdS)) / 3} name="tick" volume={0.22} />)}
      {zoom.map((k, i) => <Fx key={`z${i}`} at={k.at - 2} name="whoosh" volume={0.12} />)}
      {stamp && <Fx at={stamp.at} name="correct" volume={0.14} />}
      {panels.slice(1).map((s, i) => <Fx key={`w${i}`} at={s - 12} name="whoosh" volume={0.08} />)}
      {items.filter((it) => it.k === "photo").map((it, i) => <Fx key={`p${i}`} at={it.at} name="pop" volume={0.06} />)}
      {sfx.map((s, i) => <Fx key={`x${i}`} at={s.at} name={s.name} volume={s.v} />)}
    </AbsoluteFill>
  );
};

/** draws text lines on the exam card in the formal font */
export const CardText: React.FC<{ x: number; y: number; size: number; color: string; weight?: number; children: string }> = ({ x, y, size, color, weight = 700, children }) => (
  <text x={x} y={y} fontFamily="Inter" fontWeight={weight} fontSize={size} fill={color} style={{ whiteSpace: "pre" }}>{children}</text>
);
