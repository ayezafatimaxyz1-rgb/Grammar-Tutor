// Style sample H: grammar-checker phone screen. A doc gets "The furniture are expensive" flagged,
// then the logic is typed, highlighted and inserted as notes, table and pictures, step by step.
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Bed, Chair, Sofa, Table } from "../art";
import { C } from "../theme";
import { Fx, Karaoke } from "../v2/kit";
import timings from "../timings.json";
import { Full, TrackAudio } from "./common";
import { ENDINGS, FAMILY, useLesson } from "./lesson";

type Cue = { start: number; end: number; text: string; words: { w: string; t: number }[] };
const CAPS = (timings as unknown as { captions: Record<string, Cue[]> }).captions;
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const FONT = "Inter, 'Noto Color Emoji', sans-serif";
const HL = "#FFE066";

type Seg = { t: string; hlAt?: number; boldAt?: number; color?: string; squiggle?: boolean; big?: boolean };
type Block = { at: number; h: number; kind: "p" | "img" | "table" | "callout"; segs?: Seg[]; size?: number; color?: string; render?: (f: number) => React.ReactNode };

/** Typed paragraph: reveals characters over time, then applies highlight / bold at their times. */
const Typed: React.FC<{ segs: Seg[]; at: number; f: number; size: number; color?: string; showCursor: boolean }> = ({ segs, at, f, size, color = "#202124", showCursor }) => {
  const total = segs.reduce((a, s) => a + [...s.t].length, 0);
  const shown = Math.floor((f - at) * 1.7);
  let left = shown;
  return (
    <div style={{ fontSize: size, lineHeight: 1.35, color, fontFamily: FONT }}>
      {segs.map((s, i) => {
        const chars = [...s.t];
        const n = Math.max(0, Math.min(chars.length, left));
        left -= chars.length;
        const hl = s.hlAt !== undefined && f >= s.hlAt ? clamp((f - s.hlAt) / 6) : 0;
        return (
          <span key={i} style={{
            background: hl > 0 ? `linear-gradient(90deg, ${HL} ${hl * 100}%, transparent ${hl * 100}%)` : undefined,
            fontWeight: s.boldAt !== undefined && f >= s.boldAt ? 800 : s.big ? 800 : 400, color: s.color,
            textDecoration: s.squiggle ? "underline wavy #E63946" : undefined, textDecorationThickness: s.squiggle ? 4 : undefined, textUnderlineOffset: 8,
            fontSize: s.big ? size * 1.6 : undefined,
          }}>{chars.slice(0, n).join("")}</span>
        );
      })}
      {showCursor && shown < total + 20 && (f % 20) < 12 && <span style={{ display: "inline-block", width: 4, height: size * 1.1, background: "#1A73E8", verticalAlign: "text-bottom", marginLeft: 2 }} />}
    </div>
  );
};

export const DocSample: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLesson();
  const pop = (at: number) => (f < at ? 0 : spring({ frame: f - at, fps, config: { damping: 11 } }));
  const furn = [<Chair c={C.unit} />, <Table c={C.unit} />, <Sofa c={C.unit} />, <Bed c={C.unit} />];

  const fixed = f >= L.so;
  const blocks: Block[] = [
    { at: -100, h: 110, kind: "p", size: 64, segs: [{ t: "Grammar notes ✏️", big: false, boldAt: -100 }] },
    { at: L.q, h: 90, kind: "p", size: 52, segs: [{ t: "The furniture " }, { t: fixed ? "is" : "are", squiggle: f >= L.wrong && !fixed, color: fixed ? "#1B9E55" : undefined, boldAt: fixed ? L.so : undefined }, { t: " expensive." }] },
    { at: L.look + 4, h: 80, kind: "p", size: 46, segs: [{ t: "Furniture contains:" }] },
    { at: L.items[0] - 2, h: 330, kind: "img", render: (fr) => (
      <svg width={900} height={310} viewBox="0 0 900 310">
        {furn.map((el, i) => (
          <g key={i} transform={`translate(${115 + i * 225} 130) scale(${0.72 * pop(L.items[i])})`}>{el}</g>
        ))}
        {["chair", "table", "sofa", "bed"].map((n, i) => <text key={n} x={115 + i * 225} y={280} textAnchor="middle" fontSize={36} fontWeight={700} fill="#333" fontFamily="Inter" opacity={clamp((fr - L.items[i]) / 6)}>{n}</text>)}
      </svg>
    ) },
    { at: L.doesnt, h: 150, kind: "p", size: 46, segs: [{ t: "English groups them together → " }, { t: "ONE unit", hlAt: L.unit, boldAt: L.unit }, { t: ": furniture" }] },
    { at: L.groups + 6, h: 300, kind: "img", render: (fr) => (
      <svg width={900} height={290} viewBox="0 0 900 290">
        <ellipse cx={450} cy={140} rx={330} ry={120} fill="none" stroke="#E07A10" strokeWidth={8} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - clamp((fr - L.groups - 6) / 18)} />
        {furn.map((el, i) => <g key={i} transform={`translate(${270 + i * 120} 140) scale(0.42)`}>{el}</g>)}
        <g transform={`translate(450 262) scale(${pop(L.unit)})`}><rect x={-120} y={-28} width={240} height={52} rx={26} fill="#E07A10" /><text y={10} textAnchor="middle" fontSize={30} fontWeight={900} fill="#fff" fontFamily="Inter">ONE UNIT</text></g>
      </svg>
    ) },
    { at: L.why, h: 150, kind: "p", size: 46, segs: [{ t: "WHY? ", boldAt: L.why, color: "#E07A10" }, { t: "furniture is not the name of one object." }] },
    { at: L.collection, h: 90, kind: "p", size: 46, segs: [{ t: "It names the " }, { t: "WHOLE collection", hlAt: L.collection + 22, boldAt: L.collection + 22 }, { t: "." }] },
    { at: L.furnish, h: 150, kind: "p", size: 46, segs: [{ t: "furnish ➜ furniture", boldAt: L.furnish + 14, color: "#E07A10" }, { t: " = everything you furnish a room with" }] },
    { at: L.unitMeans, h: 170, kind: "p", size: 46, segs: [{ t: "unit = " }, { t: "1", big: true, color: "#E07A10" }, { t: " → always " }, { t: "singular", hlAt: L.singular + 10, boldAt: L.singular + 10 }, { t: " → can’t add\u00a0\u2011s" }] },
    { at: L.so + 4, h: 90, kind: "p", size: 52, color: "#1B9E55", segs: [{ t: "✓ The furniture " }, { t: "is", hlAt: L.so + 20, boldAt: L.so + 20 }, { t: " expensive." }] },
    { at: L.family, h: 470, kind: "table", render: (fr) => (
      <div style={{ border: "2px solid #DADCE0", borderRadius: 8, overflow: "hidden", fontSize: 38, fontFamily: FONT }}>
        <div style={{ display: "flex", background: "#F1F3F4", fontWeight: 800 }}>
          {["word", "contains", ""].map((h, i) => <div key={i} style={{ flex: i === 1 ? 1.4 : 1, padding: "12px 16px", borderRight: i < 2 ? "2px solid #DADCE0" : undefined }}>{h}</div>)}
        </div>
        {FAMILY.map((m, i) => (
          <div key={m.w} style={{ display: "flex", borderTop: "2px solid #DADCE0", opacity: fr >= L.fam[i].word ? 1 : 0 }}>
            <div style={{ flex: 1, padding: "12px 16px", fontWeight: 800, color: m.c, borderRight: "2px solid #DADCE0" }}>{m.w}</div>
            <div style={{ flex: 1.4, padding: "12px 16px", borderRight: "2px solid #DADCE0", opacity: fr >= L.fam[i].what ? 1 : 0 }}>{m.what.replace(" + ", ", ")}</div>
            <div style={{ flex: 1, padding: "12px 16px", color: "#1B9E55", fontWeight: 800, transform: `scale(${pop(L.fam[i].what + 12)})` }}>ONE UNIT ✓</div>
          </div>
        ))}
      </div>
    ) },
    { at: L.endings, h: 190, kind: "img", render: (fr) => (
      <div style={{ fontSize: 60, fontWeight: 800, fontFamily: FONT, display: "flex", flexWrap: "wrap", gap: "6px 28px" }}>
        {ENDINGS.map(([r, s], i) => fr >= L.endWords[i] && (
          <span key={r}>{r}<span style={{ color: fr >= L.endNote ? "#E07A10" : undefined, background: fr >= L.endNote ? HL : undefined, borderRadius: 6 }}>{s}</span></span>
        ))}
      </div>
    ) },
    { at: L.endNote, h: 150, kind: "p", size: 46, segs: [{ t: "these endings often build a word for a " }, { t: "whole collection", hlAt: L.endNote + 30, boldAt: L.endNote + 30 }] },
    ...["The luggage is heavy.", "The equipment is new.", "My clothing is wet."].map((t, i) => ({ at: L.verbs[i], h: 80, kind: "p" as const, size: 48, color: "#1B9E55", segs: [{ t: "✓ " + t.split(" is ")[0] + " " }, { t: "is", hlAt: L.verbs[i] + 18, boldAt: L.verbs[i] + 18 }, { t: " " + t.split(" is ")[1] }] })),
    { at: L.count, h: 80, kind: "p", size: 46, segs: [{ t: "Need a number? Count a " }, { t: "piece", boldAt: L.count + 20, color: "#E07A10" }, { t: ":" }] },
    ...["two pieces of furniture", "three pieces of luggage", "an item of clothing"].map((t, i) => {
      const w = i === 2 ? "item" : "pieces";
      return { at: L.pieces[i], h: 80, kind: "p" as const, size: 48, segs: [{ t: "• " + t.split(w)[0] }, { t: w, hlAt: L.pieces[i] + 16, boldAt: L.pieces[i] + 16, color: "#E07A10" }, { t: t.split(w)[1] }] };
    }),
    { at: L.dont, h: 260, kind: "callout", render: (fr) => (
      <div style={{ background: "#E8F0FE", borderLeft: "10px solid #1A73E8", borderRadius: 12, padding: "24px 28px", fontSize: 46, fontFamily: FONT, lineHeight: 1.35 }}>
        <span style={{ textDecoration: "line-through #E63946 5px" }}>Memorise the list</span> 💡 <b>See the unit:</b><br />
        {["many things", "one name", "one verb"].map((t, i) => fr >= L.rule[i] && <span key={t}>{i > 0 ? " → " : ""}<b style={{ color: i === 2 ? "#1B9E55" : "#1A73E8" }}>{t}</b></span>)}
      </div>
    ) },
  ];

  // layout and auto-scroll
  let y = 0;
  const ys = blocks.map((b) => { const v = y; y += b.h + 20; return v; });
  const visible = blocks.map((b) => f >= b.at);
  const targets = blocks.map((b, i) => [b.at, Math.max(0, ys[i] + b.h - 1180)] as [number, number]).filter(([a]) => a > -50);
  let scroll = 0;
  for (const [a, t] of targets) {
    if (f < a) break;
    const s = spring({ frame: f - a, fps, config: { damping: 20, stiffness: 90 } });
    scroll = interpolate(s, [0, 1], [scroll, Math.max(scroll, t)]);
  }
  const lastTyping = blocks.reduce((acc, b, i) => (f >= b.at && b.kind === "p" ? i : acc), -1);

  const popupOn = f >= L.wrong && f < L.look + 4;
  const tapAt = L.look - 10;

  return (
    <Full bg="#F1F3F4">
      {/* doc page */}
      <div style={{ position: "absolute", left: 30, right: 30, top: 300, bottom: 0, background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.12)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 50, right: 50, top: 40 - scroll }}>
          {blocks.map((b, i) => visible[i] && (
            <div key={i} style={{ position: "absolute", left: 0, right: 0, top: ys[i], opacity: b.kind === "p" ? 1 : clamp((f - b.at) / 8), transform: b.kind === "p" ? undefined : `translateY(${(1 - clamp((f - b.at) / 8)) * 20}px)` }}>
              {b.kind === "p" ? <Typed segs={b.segs!} at={b.at} f={f} size={b.size!} color={b.color} showCursor={i === lastTyping} /> : b.render!(f)}
            </div>
          ))}
          {/* grammar-checker suggestion card under the first sentence */}
          {popupOn && (
            <div style={{ position: "absolute", left: 60, top: ys[1] + 90, width: 780, background: "#fff", borderRadius: 18, boxShadow: "0 10px 30px rgba(0,0,0,0.25)", padding: "22px 26px", fontFamily: FONT, transform: `scale(${pop(L.wrong)})`, transformOrigin: "top left", zIndex: 5 }}>
              <div style={{ fontSize: 30, color: "#5F6368", fontWeight: 700 }}>⚠️ Grammar</div>
              <div style={{ fontSize: 42, marginTop: 6 }}><span style={{ textDecoration: "line-through", color: "#E63946" }}>are</span> → <b style={{ color: "#1B9E55" }}>is</b></div>
              <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
                <div style={{ background: "#1A73E8", color: "#fff", fontSize: 32, fontWeight: 800, padding: "10px 22px", borderRadius: 999 }}>Accept</div>
                <div style={{ border: "3px solid #1A73E8", color: "#1A73E8", fontSize: 32, fontWeight: 800, padding: "8px 22px", borderRadius: 999, position: "relative" }}>
                  Why? ▸
                  {f >= tapAt && f < tapAt + 16 && <div style={{ position: "absolute", left: "50%", top: "50%", width: 30 + (f - tapAt) * 8, height: 30 + (f - tapAt) * 8, marginLeft: -(15 + (f - tapAt) * 4), marginTop: -(15 + (f - tapAt) * 4), borderRadius: "50%", background: "rgba(26,115,232,0.25)" }} />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* app chrome */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 290, background: "#fff", borderBottom: "2px solid #E0E0E0", fontFamily: FONT }}>
        <div style={{ position: "absolute", left: 50, top: 22, fontSize: 34, fontWeight: 700 }}>9:41</div>
        <div style={{ position: "absolute", left: 40, top: 100, fontSize: 56, color: "#5F6368" }}>←</div>
        <div style={{ position: "absolute", left: 130, top: 96, width: 60, height: 76, background: "#4285F4", borderRadius: 6 }}><div style={{ margin: "18px 12px", height: 6, background: "#fff", boxShadow: "0 14px 0 #fff, 0 28px 0 #fff" }} /></div>
        <div style={{ position: "absolute", left: 215, top: 100, fontSize: 44, fontWeight: 700 }}>Grammar notes</div>
        <div style={{ position: "absolute", left: 215, top: 156, fontSize: 28, color: "#5F6368" }}>{f % 90 < 45 && f > L.q ? "Saving…" : "All changes saved"}</div>
        <div style={{ position: "absolute", left: 40, right: 40, top: 215, display: "flex", gap: 38, fontSize: 40, color: "#444" }}>
          <b>B</b><i>I</i><u>U</u><span style={{ background: HL, padding: "0 10px" }}>A</span><span>≡</span><span>☰</span><span style={{ marginLeft: "auto", color: "#1B9E55", fontWeight: 800, fontSize: 32 }}>{fixed ? "✓ 0 issues" : f >= L.wrong ? <span style={{ color: "#E63946" }}>⚠️ 1 issue</span> : ""}</span>
        </div>
      </div>
      {/* snackbar */}
      {f >= L.so && f < L.so + 80 && (
        <div style={{ position: "absolute", left: 80, right: 80, top: 1500, background: "#323232", color: "#fff", fontSize: 38, borderRadius: 14, padding: "22px 30px", fontFamily: FONT, transform: `translateY(${(1 - pop(L.so)) * 80}px)` }}>✓ Fixed: “furniture <b style={{ color: "#8AB4F8" }}>is</b>” (one unit)</div>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1650, bottom: 0, background: "linear-gradient(rgba(32,33,36,0), rgba(32,33,36,0.88) 30%)" }} />
      <Karaoke cues={CAPS.sm} top={1720} />
      <TrackAudio id="sm" />
      {blocks.filter((b) => b.kind === "p" && b.at > 0).flatMap((b, i) => Array.from({ length: 6 }, (_, k) => <Fx key={`${i}_${k}`} at={b.at + k * 4} name="click" volume={0.1} />))}
      <Fx at={L.wrong} name="buzzer" volume={0.12} />
      <Fx at={tapAt} name="tick" volume={0.3} />
      <Fx at={L.so} name="correct" volume={0.22} />
      {L.fam.map((m, i) => <Fx key={`t${i}`} at={m.what + 12} name="pop" volume={0.15} />)}
    </Full>
  );
};
