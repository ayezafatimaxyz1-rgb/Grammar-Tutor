// Grammar Logic Series: Uncountable Nouns (16:9 YouTube). A hand works through the book's five
// categories on a whiteboard: the error, the category, the logic with real pictures, the rule box,
// the old school rule versus the logic, examples, and a closing board with every example.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Fx } from "../v2/kit";
import { Pt } from "../samples/common";
import { TrackAudio } from "../samples/common";
import { Anchor, C, Draw, Eraser, Font, Hand, Item, VH, VW, W, arrow, check, cross, loop, strike, tipOf, tw, under, useBeatCue, writeDur } from "./engine";
import SIZES from "./sizes.json";

const SZ = SIZES as unknown as Record<string, [number, number]>;
const V = "ul";

export const Uncountable: React.FC = () => {
  const f = useCurrentFrame();
  const { cue, has, start, segs } = useBeatCue(V);
  const END = segs.reduce((a, s) => a + s.frames, 0);
  const items: Item[] = [];
  const boards: number[] = [];
  const chipAt: { at: number; label: string }[] = [];
  let B = -1;

  /* ------------------------------------------------------------ builders */
  const board = (beat: string, label: string) => {
    boards.push(start(beat));
    B = boards.length - 1;
    if (!chipAt.length || chipAt[chipAt.length - 1].label !== label) chipAt.push({ at: start(beat), label });
  };
  const text = (t: string, x: number, y: number, size: number, color: string, at: number, o: { font?: Font; anchor?: Anchor; dur?: number; hand?: boolean } = {}) => {
    const font = o.font ?? "hand", hand = o.hand ?? (font === "hand" || font === "script");
    items.push({ k: "text", b: B, text: t, x, y, size, color, font, at, dur: o.dur ?? (hand ? writeDur(t) : 12), anchor: o.anchor ?? "start", hand });
    const w = tw(t, size, font);
    const x0 = o.anchor === "middle" ? x - w / 2 : x;
    return { x0, x1: x0 + w, w, end: at + (o.dur ?? (hand ? writeDur(t) : 12)) };
  };
  const formal = (t: string, x: number, y: number, size: number, color: string, at: number, font: Font = "f800", anchor: Anchor = "start") => text(t, x, y, size, color, at, { font, anchor, hand: false });
  const ink = (strokes: Pt[][], at: number, dur: number, color: string, width = 7) => { items.push({ k: "ink", b: B, strokes, at, dur, color, width }); return at + dur; };
  const photo = (src: string, cx: number, cy: number, bw: number, bh: number, at: number, dur = 14) => {
    const path = src.includes("/") ? src : src.startsWith("ik:") ? `wb/${src.slice(3)}.png` : `wb/fx/${src}.png`;
    const [nw, nh] = SZ[path] ?? [256, 256];
    const s = Math.min(bw / nw, bh / nh);
    items.push({ k: "photo", b: B, src: path, x: cx - (nw * s) / 2, y: cy - (nh * s) / 2, w: nw * s, h: nh * s, at, dur });
  };
  const rect = (x: number, y: number, w: number, h: number, fill: string, at: number, o: { stroke?: string; sw?: number; r?: number; mode?: "pop" | "grow"; dur?: number } = {}) =>
    items.push({ k: "rect", b: B, x, y, w, h, fill, stroke: o.stroke, sw: o.sw, r: o.r, at, dur: o.dur ?? (o.mode === "grow" ? 10 : 12), mode: o.mode ?? "pop" });
  /** coloured runs on one line, written one after the other */
  const line = (parts: [string, string][], x: number, y: number, size: number, at: number, o: { font?: Font; anchor?: Anchor; hand?: boolean; hl?: number } = {}) => {
    const font = o.font ?? "hand";
    const total = parts.reduce((a, [t]) => a + tw(t, size, font), 0);
    const x0 = o.anchor === "middle" ? x - total / 2 : x;
    let cx = x0, t0 = at;
    const spans: { x0: number; x1: number }[] = [];
    parts.forEach(([t, c], i) => {
      if (o.hl === i) rect(cx - 6, y - size * 0.82, tw(t, size, font) + 12, size * 1.0, C.yellow, t0, { mode: "grow", r: 6 });
      const r = text(t, cx, y, size, c, t0 + (o.hl === i ? 6 : 0), { font, hand: o.hand });
      spans.push(r);
      t0 = (o.hand ?? (font === "hand" || font === "script")) ? r.end : t0 + 4;
      cx = r.x1;
    });
    return { spans, x0, x1: x0 + total, end: t0 };
  };

  /* -------- book patterns */
  const errorHead = (beat: string, wrong: string, keyWrong: string, right: string) => {
    const first = wrong.split(" ").slice(0, 2).join(" "), second = right.split(" ").slice(0, 2).join(" ");
    const a1 = cue(beat, first), a2 = cue(beat, second, 0, first === second ? 1 : 0);
    ink(cross(172, 166, 13, 1), a1 - 8, 7, C.red, 6);
    const w = text(wrong, 205, 182, 54, C.red, a1);
    const i = wrong.indexOf(keyWrong), kx = 205 + tw(wrong.slice(0, i), 54), kw = tw(keyWrong, 54);
    ink(loop(kx + kw / 2, 164, kw / 2 + 16, 34, 3), cue(beat, "wrong"), 12, C.red, 5);
    ink(check(172, 250, 14, 2), a2 - 8, 7, C.green, 7);
    text(right, 205, 265, 54, C.green, a2);
    return w;
  };
  const categoryHead = (beat: string, heading: string, headCue: string, box: string, boxCue: string, desc: string[], descCue: string[], color: string) => {
    formal(heading, 150, 356, 40, color, cue(beat, headCue));
    formal("NOUN", 150, 446, 44, C.ink, cue(beat, boxCue) - 10);
    ink(arrow(290, 431, 385, 431, 11), cue(beat, boxCue) - 6, 6, C.navy, 5);
    const bw = Math.max(240, tw(box, 38, "f800") + 70);
    rect(405, 396, bw, 70, "#FFFFFF", cue(beat, boxCue), { stroke: C.navy, sw: 4, r: 6 });
    formal(box, 405 + bw / 2, 444, 38, C.navy, cue(beat, boxCue) + 4, "f800", "middle");
    ink(arrow(405 + bw + 22, 431, 405 + bw + 110, 431, 12), cue(beat, descCue[0]) - 6, 6, C.gold, 5);
    desc.forEach((d, i) => formal(d, 405 + bw + 130, 422 + i * 42, 32, i ? C.grey : C.gold, cue(beat, descCue[i] ?? descCue[0]) + i * 6, "f400i"));
  };
  const yellowBox = (x: number, y: number, w: number, lines: string[], at: number, size = 36) => {
    const h = lines.length * size * 1.4 + 44;
    rect(x, y, w, h, C.cream, at, { stroke: C.gold, sw: 3, r: 14 });
    lines.forEach((l, i) => formal(l, x + w / 2, y + 22 + size * 1.02 + i * size * 1.4, size, C.ink, at + 6 + i * 8, "f800", "middle"));
    return y + h;
  };
  const scriptSentence = (parts: [string, string][], hl: number, y: number, at: number, size = 92) => {
    const r = line(parts, 1000, y, size, at + 10, { font: "script", anchor: "middle", hl });
    ink(arrow(r.x0 - 150, y - size * 0.28, r.x0 - 40, y - size * 0.28, 20), at, 8, C.blue, 6);
    ink(check(r.x1 + 55, y - size * 0.3, 26, 21), r.end + 2, 8, C.green, 8);
    return r;
  };
  const oldVsLogic = (x: number, y: number, w: number, old: string[], logic: string[], cOld: number, cSkip: number, cLogic: number) => {
    ink(cross(x + 18, y + 26, 11, 30), cOld - 6, 6, C.red, 5);
    formal("OLD SCHOOL RULE: SKIP THIS", x + 44, y + 38, 30, C.ink, cOld);
    const gh = old.length * 38 + 30;
    rect(x, y + 58, w, gh, C.paper, cOld + 4, { r: 10 });
    old.forEach((l, i) => formal(l, x + 24, y + 58 + 44 + i * 38, 27, C.grey, cOld + 8 + i * 6, "f400i"));
    ink([W([[x + 10, y + 58 + gh - 12], [x + w - 10, y + 70]], 31, 2)], cSkip, 10, C.red, 6);
    const ly = y + 58 + gh + 30;
    ink(check(x + 18, ly + 22, 12, 32), cLogic - 6, 6, C.green, 6);
    formal("THE LOGIC", x + 44, ly + 36, 30, C.ink, cLogic);
    const lh = logic.length * 40 + 32;
    rect(x, ly + 56, w, lh, C.cream, cLogic + 4, { stroke: C.gold, sw: 3, r: 10 });
    logic.forEach((l, i) => formal(l, x + 24, ly + 56 + 46 + i * 40, 29, C.ink, cLogic + 8 + i * 8, "f700"));
    return ly + 56 + lh;
  };
  const think = (txt: string, y: number, at: number) => {
    rect(160, y, 1600, 100, C.paper, at, { r: 12 });
    formal(txt, 960, y + 62, 36, C.ink, at + 6, "f400i", "middle");
  };
  /** photo + name + two note lines, used for the "visualize it" rows */
  const viz = (src: string | string[], cx: number, y: number, name: string, color: string, notes: string[], at: number) => {
    const srcs = Array.isArray(src) ? src : [src];
    srcs.forEach((s, i) => photo(s, cx + (i - (srcs.length - 1) / 2) * 120, y, srcs.length > 1 ? 115 : 140, 115, at + i * 8, 12));
    formal(name, cx, y + 110, 36, color, at + 10, "f800", "middle");
    notes.forEach((n, i) => formal(n, cx, y + 146 + i * 27, 21, C.grey, at + 14, "f400i", "middle"));
  };

  /* ================================================================ INTRO */
  board("in1", "ERROR 1");
  {
    const t = text("UNCOUNTABLE NOUNS", 960, 235, 90, C.navy, cue("in1", "uncountable nouns"), { anchor: "middle", dur: 30 });
    ink(under(t.x0, t.x1, 258, 1), t.end, 10, C.red, 7);
    text("Why can't we add S?", 960, 335, 58, C.red, cue("in1", "why cant we"), { anchor: "middle" });
    text("Why can't they take a PLURAL verb?", 960, 415, 58, C.red, cue("in1", "and why"), { anchor: "middle" });

    rect(110, 470, 800, 560, "#EAF6EE", cue("in2", "countable nouns"), { r: 18 });
    formal("COUNTABLE", 510, 535, 40, C.green, cue("in2", "countable nouns") + 4, "f800", "middle");
    photo("ik:chair", 230, 690, 130, 170, cue("in2", "a chair"));
    text("a chair", 230, 815, 44, C.ink, cue("in2", "a chair") + 12, { anchor: "middle" });
    photo("ik:chair", 400, 690, 110, 160, cue("in2", "two chairs"), 10);
    photo("ik:chair", 490, 690, 110, 160, cue("in2", "two chairs") + 8, 10);
    text("two chairs", 445, 815, 44, C.ink, cue("in2", "two chairs") + 14, { anchor: "middle" });
    [0, 1, 2].forEach((k) => photo("light_bulb", 650 + k * 85, 690, 90, 110, cue("in2", "three ideas") + k * 6, 8));
    text("three ideas", 735, 815, 44, C.ink, cue("in2", "three ideas") + 18, { anchor: "middle" });
    line([["counted one by one ", C.ink], ["+ s", C.green]], 510, 940, 52, cue("in2", "we count"), { anchor: "middle" });
    ink(check(790, 918, 22, 3), cue("in2", "so they can"), 8, C.green, 8);

    rect(1010, 470, 800, 560, "#FCECEC", cue("in3", "but what about"), { r: 18 });
    formal("UNCOUNTABLE", 1410, 535, 40, C.red, cue("in3", "but what about") + 4, "f800", "middle");
    ([["droplet", "water", 1120], ["cooked_rice", "rice", 1310], ["handshake", "honesty", 1500], ["musical_notes", "music", 1690]] as const).forEach(([s, n, x]) => {
      photo(s, x, 680, 140, 130, cue("in3", n));
      text(n, x, 800, 44, C.ink, cue("in3", n) + 12, { anchor: "middle" });
    });
    const w1 = text("two waters", 1210, 930, 50, C.ink, cue("in3", "two waters"), { anchor: "middle" });
    ink(strike(w1.x0, w1.x1, 914, 4), w1.end, 8, C.red, 6);
    const w2 = text("three honesties", 1600, 930, 50, C.ink, cue("in3", "three honesties"), { anchor: "middle" });
    ink(strike(w2.x0, w2.x1, 914, 5), w2.end, 8, C.red, 6);
  }
  board("in4", "ERROR 1");
  {
    const o = text("Old way: memorise a list", 150, 200, 56, C.grey, cue("in4", "most books"));
    ink(strike(o.x0, o.x1, 182, 6), cue("in4", "we wont"), 8, C.red, 7);
    line([["New way: ", C.ink], ["LOGIC", C.green]], 1050, 200, 56, cue("in4", "well use logic"));
    const at = cue("in4", "five categories");
    rect(170, 515, 480, 96, C.navy, at, { r: 14 });
    formal("UNCOUNTABLE NOUNS", 410, 577, 38, "#FFFFFF", at + 4, "f800", "middle");
    const cats: [string, string, string, string][] = [
      ["1.  UNIT / MASS", C.blue, "unit", "ik:sofa"], ["2.  MATERIAL", C.teal, "material", "brick"], ["3.  MEASURED", C.orange, "measured", "cooked_rice"],
      ["4.  ABSTRACT", C.purple, "abstract", "light_bulb"], ["5.  ACTIVITY / PROCESS", C.pink, "activity", "briefcase"],
    ];
    ink([W([[700, 330], [700, 890]], 7, 1)], cue("in5", "unit") - 12, 12, C.navy, 5);
    ink([W([[650, 563], [700, 563]], 8, 1)], cue("in5", "unit") - 14, 4, C.navy, 5);
    cats.forEach(([t, c, w, src], i) => {
      const y = 330 + i * 140, a = cue("in5", w);
      ink(arrow(700, y, 800, y, 40 + i, 18), a - 6, 6, c, 5);
      formal(t, 830, y + 17, 52, c, a);
      photo(src, 1620, y, 150, 110, a + 4, 10);
    });
    text("Let's prove them one at a time.", 960, 1010, 50, C.navy, cue("in6", "lets prove"), { anchor: "middle" });
  }

  /* ================================================================ ERROR 1 */
  board("a1", "ERROR 1");
  {
    errorHead("a1", "Furniture are expensive.", "are", "Furniture is expensive.");
    text("WHY?", 1650, 250, 110, C.red, cue("a1", "but why"), { anchor: "middle" });
    categoryHead("a2", "UNIT / MASS", "category one", "UNIT", "a unit", ["contains", "many things"], ["contains many", "contains many"], C.navy);
    const row: [string, string, number][] = [["ik:chair", "chair", 300], ["ik:table", "table", 560], ["ik:bed", "bed", 820], ["ik:sofa", "sofa", 1080], ["ik:desk", "desk", 1340]];
    row.forEach(([s, n, x]) => {
      const a = cue("a3", `a ${n}`);
      photo(s, x, 640, 200, 150, a);
      text(n, x, 772, 44, C.blue, a + 14, { anchor: "middle" });
    });
    text("many individual", 1735, 620, 44, C.ink, cue("a3", "many individual"), { anchor: "middle" });
    text("things", 1735, 668, 44, C.ink, cue("a3", "many individual") + 22, { anchor: "middle" });
    text("grouped together", 1735, 770, 44, C.navy, cue("a4", "groups them"), { anchor: "middle" });
    ink(loop(820, 688, 700, 188, 9), cue("a4", "draws one circle"), 34, C.navy, 8);
    ink(arrow(820, 885, 820, 925, 10, 16), cue("a4", "as one unit") - 8, 6, C.navy, 5);
    text("ONE UNIT", 820, 985, 66, C.navy, cue("a4", "as one unit"), { anchor: "middle" });
    formal("(treated as one whole: ‘furniture’)", 820, 1030, 28, C.grey, cue("a4", "called furniture"), "f400i", "middle");
  }
  board("a5", "ERROR 1");
  {
    text("WHY?", 500, 235, 110, C.red, cue("a5", "why because"), { anchor: "middle", dur: 14 });
    text("furniture is NOT one object", 500, 345, 50, C.ink, cue("a5", "not the name"), { anchor: "middle" });
    line([["= the ", C.blue], ["WHOLE", C.orange], [" collection", C.blue]], 500, 440, 60, cue("a5", "whole collection"), { anchor: "middle" });
    rect(110, 510, 780, 190, C.cream, cue("a5", "comes from"), { stroke: C.gold, sw: 3, r: 14 });
    formal("furnish  →  furniture", 500, 590, 52, C.navy, cue("a5", "comes from") + 6, "f800", "middle");
    formal("everything you furnish a room with", 500, 660, 34, C.grey, cue("a5", "everything you"), "f400i", "middle");
    ink(arrow(905, 600, 1160, 215, 12, 22), start("a6", 0.2), 10, C.orange, 5);

    // the notes' design: 'unit' means 1, +s crossed out
    formal("‘unit’ means", 1400, 200, 54, C.orange, cue("a6", "unit means"), "f800", "middle");
    rect(1318, 228, 164, 214, C.yellow, cue("a6", "means one"), { mode: "grow", r: 8 });
    formal("1", 1400, 412, 220, C.orange, cue("a6", "means one") + 4, "f800", "middle");
    text("+s", 1650, 372, 100, C.red, cue("a6", "add s"), { anchor: "middle", dur: 8 });
    ink([W([[1570, 280], [1740, 405]], 12, 1.5), W([[1570, 405], [1740, 280]], 13, 1.5)], cue("a6", "add s") + 10, 10, C.red, 9);
    // 1 is always SINGULAR + the rule box
    ink(arrow(1400, 458, 1400, 525, 14, 18), cue("a7", "one is always") - 8, 6, C.green, 6);
    line([["1 is always ", C.green], ["SINGULAR", C.green]], 1400, 600, 58, cue("a7", "one is always"), { font: "f800", anchor: "middle", hand: false, hl: 1 });
    const yb = yellowBox(1060, 640, 680, ["We can’t add ‘-s’ to 1.", "So the word stays singular."], cue("a7", "we cant add"));
    void yb;
    scriptSentence([["The furniture ", C.blue], ["IS", C.blue], [" expensive", C.blue]], 1, 950, cue("a8", "the furniture is"));
  }
  board("a9", "ERROR 1");
  {
    oldVsLogic(110, 140, 900, ["Furniture, luggage, baggage, crockery ... are always singular.", "Handed to you as a fact to memorise, with no reason why."],
      ["Many individual things are named as one unit / mass.", "‘Unit’ means 1, and 1 is always singular: no ‘s’."], cue("a9", "the old school"), cue("a9", "skip that"), cue("a9", "heres the logic"));
    formal("VISUALIZE IT", 1100, 180, 34, C.gold, cue("a10", "the same logic"));
    viz(["luggage", "backpack"], 1235, 290, "Luggage", C.blue, ["bags + suitcases", "→ one whole"], cue("a10", "luggage"));
    viz(["t-shirt", "jeans"], 1485, 290, "Clothing", C.teal, ["shirts + trousers", "→ one category"], cue("a10", "clothing"));
    viz(["ik:plate", "ik:mug"], 1735, 290, "Crockery", C.orange, ["plates + cups", "→ one collection"], cue("a10", "crockery"));
    line([["Need a number?  Count a ", C.ink], ["PIECE", C.orange]], 960, 700, 58, cue("a11", "if you need"), { anchor: "middle" });
    ([["a piece of furniture", "furniture", 380, "ik:chair"], ["a piece of luggage", "luggage", 960, "luggage"], ["an item of clothing", "clothing", 1540, "t-shirt"]] as const).forEach(([t, w, x, s]) => {
      const a = cue("a11", t);
      photo(s, x - tw(t, 50) / 2 - 60, 790, 80, 80, a, 8);
      const r = text(t, x + 20, 805, 50, C.ink, a + 6, { anchor: "middle" });
      const k = t.startsWith("an") ? "item" : "piece", i = t.indexOf(k);
      ink(under(r.x0 + tw(t.slice(0, i), 50), r.x0 + tw(t.slice(0, i + k.length), 50), 822, 20), r.end, 6, C.orange, 5);
      void w;
    });
    think("Now think about it: why can you say “two chairs”, but not “two rice”?", 900, cue("a12", "now think"));
  }

  /* ================================================================ ERROR 2 */
  board("b1", "ERROR 2");
  {
    errorHead("b1", "This ring is made of golds.", "golds", "This ring is made of gold.");
    categoryHead("b2", "MATERIAL", "category two", "MATERIAL", "material a", ["from which something is or can be made", "a substance: measured, used to make other things"], ["made from", "a substance"], C.navy);
    ink([W(ellipse2(330, 700, 135, 80), 3, 5)], cue("b3", "take gold"), 16, C.teal, 6);
    text("GOLD", 330, 722, 66, C.teal, cue("b3", "take gold") + 8, { anchor: "middle", dur: 10 });
    text("a substance", 330, 840, 46, C.ink, cue("b3", "its a substance"), { anchor: "middle" });
    ink(arrow(485, 700, 600, 700, 4), cue("b3", "used to make"), 6, C.navy, 5);
    line([["used to make ", C.navy], ["MANY", C.navy], [" different things", C.navy]], 1000, 565, 46, cue("b3", "used to make"), { anchor: "middle" });
    ([["ring", 760], ["coin", 1000], ["crown", 1240]] as const).forEach(([n, x]) => {
      photo(n, x, 690, 150, 140, cue("b3", `a ${n}`));
      text(n, x, 810, 42, C.grey, cue("b3", `a ${n}`) + 12, { anchor: "middle" });
    });
    text("one ring", 760, 880, 44, C.green, cue("b4", "one ring"), { anchor: "middle" });
    photo("coin", 1070, 715, 110, 110, cue("b4", "two coins"), 8);
    text("two coins", 1010, 880, 44, C.green, cue("b4", "two coins"), { anchor: "middle" });
    ink(arrow(1335, 690, 1440, 690, 5), cue("b4", "but the substance"), 6, C.orange, 5);
    photo("balance_scale", 1650, 650, 190, 170, cue("b4", "but the substance") + 4);
    line([["the ", C.orange], ["SUBSTANCE", C.orange], [" itself", C.orange]], 1650, 800, 42, cue("b4", "substance itself"), { anchor: "middle" });
    line([["is ", C.orange], ["MEASURED", C.orange], [", not counted", C.orange]], 1650, 852, 42, cue("b4", "is measured"), { anchor: "middle" });
    text("gold: weighed in grams", 1650, 950, 44, C.navy, cue("b4", "we weigh"), { anchor: "middle" });
  }
  board("b5", "ERROR 2");
  {
    const yb = yellowBox(560, 140, 800, ["A material noun, used as a material,", "is not made plural."], cue("b5", "so a material"));
    ink(arrow(960, yb + 12, 960, yb + 62, 6, 16), cue("b5", "this ring") - 8, 6, C.navy, 5);
    scriptSentence([["This ring is made of ", C.navy], ["GOLD", C.navy], [".", C.navy]], 1, 420, cue("b5", "this ring"), 84);
    oldVsLogic(110, 500, 900, ["Brick, sand, milk, glass, water, soap ... are always singular.", "Handed to you as a fact to memorise, with no reason why."],
      ["It is the material used to make other things,", "so you MEASURE it rather than count it."], cue("b6", "the old school"), cue("b6", "skip that"), cue("b6", "the logic"));
    formal("VISUALIZE IT", 1100, 545, 34, C.gold, cue("b7", "silver"));
    viz("ring", 1235, 660, "Silver", C.purple, ["used for jewellery →", "measured, not counted"], cue("b7", "silver"));
    viz("wood", 1485, 660, "Wood", C.green, ["used for furniture →", "measured in cubic metres"], cue("b7", "wood"));
    viz("droplet", 1735, 660, "Water", C.blue, ["used for drinking →", "measured in litres"], cue("b7", "water"));
  }
  board("b8", "ERROR 2");
  {
    text("One careful note", 960, 200, 64, C.navy, cue("b8", "one careful note"), { anchor: "middle" });
    photo("brick", 330, 390, 190, 160, cue("b8", "a wall made"));
    line([["a wall made of ", C.ink], ["bricks", C.green]], 520, 380, 54, cue("b8", "a wall made"));
    formal("separate blocks: countable", 520, 432, 30, C.grey, cue("b8", "a wall made") + 20, "f400i");
    photo("potable_water", 330, 590, 170, 150, cue("b8", "two glasses"));
    line([["two ", C.ink], ["glasses", C.green], [" of water", C.ink]], 520, 580, 54, cue("b8", "two glasses"));
    formal("separate cups: countable", 520, 632, 30, C.grey, cue("b8", "two glasses") + 20, "f400i");
    ink(check(1330, 360, 22, 7), cue("b8", "bricks") + 12, 8, C.green, 8);
    ink(check(1330, 560, 22, 8), cue("b8", "water") + 6, 8, C.green, 8);
    line([["as a material: ", C.teal], ["brick", C.teal], [", ", C.teal], ["glass", C.teal], [" (no s)", C.red]], 960, 770, 60, cue("b8", "but as a material"), { anchor: "middle" });
    think("Now think about it: do we say “one milk”... or “one litre of milk”?", 900, cue("b9", "now think"));
  }

  /* ================================================================ ERROR 3 */
  board("c1", "ERROR 3");
  {
    errorHead("c1", "I ate too many rice for lunch.", "many", "I ate too much rice for lunch.");
    categoryHead("c2", "MEASURED  (food / substance)", "category three", "FOOD / SUBSTANCE", "food and", ["measured by amount:", "not counted as separate items"], ["measured by amount", "not counted"], C.navy);
    photo("cooked_rice", 250, 690, 210, 190, cue("c3", "rice comes"));
    const g0 = cue("c3", "many tiny grains");
    const grains: Pt[][] = Array.from({ length: 22 }, (_, i) => {
      const x = 440 + ((i * 97) % 330), y = 620 + ((i * 53) % 150), a = (i * 0.7) % Math.PI;
      return W([[x - 9 * Math.cos(a), y - 9 * Math.sin(a)], [x + 9 * Math.cos(a), y + 9 * Math.sin(a)]], i, 0.5);
    });
    ink(grains, g0, 26, C.orange, 9);
    text("many tiny grains of rice", 600, 850, 44, C.ink, g0 + 10, { anchor: "middle" });
    ink(arrow(830, 690, 930, 690, 3), cue("c3", "we dont count"), 6, C.orange, 5);
    text("we don't count them", 1140, 620, 46, C.orange, cue("c3", "we dont count"), { anchor: "middle" });
    const n = text("1, 2, 3, 4 ...", 1140, 700, 50, C.grey, cue("c3", "one by one"), { anchor: "middle" });
    ink(strike(n.x0, n.x1, 684, 4), n.end, 8, C.red, 6);
    ink([W([[1450, 590], [1475, 790], [1605, 790], [1630, 590]], 5, 1.5), W([[1455, 630], [1490, 630]], 6, 1), W([[1461, 680], [1496, 680]], 7, 1), W([[1467, 730], [1502, 730]], 8, 1)], cue("c3", "we measure"), 16, C.navy, 6);
    line([["we ", C.navy], ["MEASURE", C.navy], [" the amount", C.navy]], 1540, 860, 46, cue("c3", "we measure") + 8, { anchor: "middle" });
    ([["a cup of rice", 520], ["a kilo of rice", 960], ["a plate of rice", 1400]] as const).forEach(([t, x]) => text(t, x, 975, 52, C.green, cue("c3", t), { anchor: "middle" }));
  }
  board("c4", "ERROR 3");
  {
    const yb = yellowBox(560, 140, 800, ["Measured, not counted → always", "takes a SINGULAR verb."], cue("c4", "measured not counted"));
    ink(arrow(960, yb + 12, 960, yb + 62, 6, 16), cue("c4", "this rice") - 8, 6, C.navy, 5);
    scriptSentence([["This rice ", C.navy], ["IS", C.navy], [" delicious.", C.navy]], 1, 420, cue("c4", "this rice"), 88);
    formal("Students often confuse these with MATERIAL or UNIT / MASS nouns:", 110, 520, 27, C.ink, cue("c5", "students often"), "f700");
    formal("just remember, they are MEASURED instead of counted.", 110, 556, 27, C.ink, cue("c5", "so just check"), "f700");
    oldVsLogic(110, 580, 900, ["Food, meat, sugar, salt, tea, bread ... are always singular.", "Handed to you as a fact to memorise, with no reason why."],
      ["They are measured, not directly counted."], cue("c5", "the old school"), cue("c5", "always singular"), cue("c5", "the logic"));
    formal("VISUALIZE IT", 1100, 545, 34, C.gold, cue("c6", "bread"));
    viz("bread", 1235, 660, "Bread", C.orange, ["measured by", "loaves / slices"], cue("c6", "bread"));
    viz("glass_of_milk", 1485, 660, "Milk", C.blue, ["measured in litres,", "not counted"], cue("c6", "milk"));
    viz("salt", 1735, 660, "Salt", C.grey, ["measured by weight,", "not counted"], cue("c6", "salt"));
    think("Now think about it: can you say “two rice”, or do you need “two kilos of rice”?", 945, cue("c7", "now think"));
  }

  /* ================================================================ ERROR 4 */
  board("d1", "ERROR 4");
  {
    errorHead("d1", "He has many knowledges about art.", "knowledges", "He has a lot of knowledge about art.");
    categoryHead("d2", "ABSTRACT", "category four", "ABSTRACT", "abstract noun", ["no physical form:", "cannot be held or touched"], ["no physical", "cant be held"], C.navy);
    const a = cue("d3", "its an idea");
    photo("thought_balloon", 330, 670, 280, 220, a);
    photo("light_bulb", 330, 660, 100, 110, a + 14, 10);
    ink([loop(210, 810, 16, 16, 1)[0], loop(180, 850, 9, 9, 2)[0]], a + 10, 8, C.purple, 5);
    text("an idea, a quality, or a state", 360, 900, 42, C.ink, cue("d3", "a quality"), { anchor: "middle" });
    ([["books", "knowledge", 800], ["handshake", "honesty", 1050], ["speech_balloon", "advice", 1300], ["smiling_face_with_smiling_eyes", "happiness", 1550]] as const).forEach(([s, n, x]) => {
      photo(s, x, 680, 150, 140, cue("d3", n));
      text(n, x, 800, 44, C.purple, cue("d3", n) + 12, { anchor: "middle" });
    });
    text("you can't touch them, or count them", 1175, 910, 50, C.red, cue("d3", "you cant put"), { anchor: "middle" });
  }
  board("d4", "ERROR 4");
  {
    const yb = yellowBox(520, 140, 880, ["You experience, show, or possess it:", "you never count it → SINGULAR."], cue("d4", "you experience"));
    ink(arrow(960, yb + 12, 960, yb + 62, 6, 16), cue("d4", "her knowledge") - 8, 6, C.navy, 5);
    scriptSentence([["Her knowledge ", C.navy], ["IS", C.navy], [" impressive.", C.navy]], 1, 420, cue("d4", "her knowledge"), 88);
    oldVsLogic(110, 500, 900, ["Advice, information, evidence, knowledge ... are always singular.", "Handed to you as a fact to memorise, with no reason why."],
      ["We cannot physically hold or normally count them directly."], cue("d5", "the old school"), cue("d5", "skip that"), cue("d5", "the logic"));
    line([["Need a number?  Use a ", C.ink], ["PIECE", C.orange]], 1440, 580, 50, cue("d5", "need a number"), { anchor: "middle" });
    ([["a piece of advice", "speech_balloon"], ["a piece of information", "page_facing_up"], ["a piece of evidence", "magnifying_glass_tilted_left"]] as const).forEach(([t, s], i) => {
      const at = cue("d5", t), y = 690 + i * 95;
      photo(s, 1150, y - 16, 70, 70, at, 8);
      const r = text(t, 1210, y, 48, C.ink, at + 4);
      ink(under(r.x0 + tw("a ", 48), r.x0 + tw("a piece", 48), y + 16, 40 + i), r.end, 6, C.orange, 5);
    });
    think("Now think about it: can you hold “honesty” in your hand, or only show it, have it, or experience it?", 945, cue("d6", "now think"));
  }

  /* ================================================================ ERROR 5 */
  board("e1", "ERROR 5");
  {
    errorHead("e1", "She does many works every day.", "works", "She does a lot of work every day.");
    categoryHead("e2", "ACTIVITY / PROCESS", "category five", "ACTIVITY / PROCESS", "activity or", ["an ongoing process as a whole:", "not separate actions"], ["an ongoing", "not as separate"], C.navy);
    const steps: [string, string, number][] = [["envelope", "emails", 250], ["telephone_receiver", "calls", 470], ["busts_in_silhouette", "meetings", 690], ["page_facing_up", "reports", 910]];
    steps.forEach(([s, n, x], i) => {
      const at = cue("e3", n);
      ink(loop(x, 680, 62, 62, 50 + i, 1.02), at - 4, 10, C.pink, 5);
      if (i) ink([W([[x - 158, 680], [x - 62, 680]], 60 + i, 1)], at - 8, 5, C.pink, 5);
      photo(s, x, 680, 78, 78, at + 4, 8);
      text(n, x, 790, 40, C.ink, at + 8, { anchor: "middle" });
    });
    text("many small steps / actions", 580, 870, 44, C.ink, cue("e3", "many small steps"), { anchor: "middle" });
    ink(arrow(1010, 680, 1130, 680, 9), cue("e3", "but we talk"), 6, C.pink, 5);
    const r0 = cue("e3", "one ongoing whole");
    const arc: Pt[] = Array.from({ length: 60 }, (_, i) => { const a = -1.2 + (i / 59) * Math.PI * 1.7; return [1400 + Math.cos(a) * 115, 680 + Math.sin(a) * 115] as Pt; });
    const tip = arc[arc.length - 1], prev = arc[arc.length - 4];
    const ang = Math.atan2(tip[1] - prev[1], tip[0] - prev[0]);
    ink([W(arc, 10, 1.5), W([[tip[0] - 26 * Math.cos(ang - 0.5), tip[1] - 26 * Math.sin(ang - 0.5)], tip, [tip[0] - 26 * Math.cos(ang + 0.5), tip[1] - 26 * Math.sin(ang + 0.5)]], 11, 1)], r0 - 6, 14, C.navy, 7);
    photo("briefcase", 1400, 680, 120, 110, r0 + 6, 10);
    text("but we talk about it as", 1400, 850, 42, C.pink, cue("e3", "but we talk"), { anchor: "middle" });
    line([["ONE", C.pink], [" ongoing whole", C.pink]], 1400, 905, 48, r0, { anchor: "middle" });
  }
  board("e4", "ERROR 5");
  {
    const yb = yellowBox(560, 140, 800, ["One process, not separate", "actions → SINGULAR verb."], cue("e4", "one process"));
    ink(arrow(960, yb + 12, 960, yb + 62, 6, 16), cue("e4", "her research") - 8, 6, C.navy, 5);
    scriptSentence([["Her research ", C.navy], ["IS", C.navy], [" impressive.", C.navy]], 1, 420, cue("e4", "her research"), 88);
    oldVsLogic(110, 500, 900, ["Work, research, progress, travel, exercise ... are always singular.", "Handed to you as a fact to memorise, with no reason why."],
      ["You are talking about an activity or process as a whole,", "not separate individual actions or units."], cue("e5", "the old school"), cue("e5", "skip that"), cue("e5", "the logic"));
    ([["microscope", "Research", "the whole process of studying", "research the whole"], ["airplane", "Travel", "going from place to place", "travel going"], ["shopping_cart", "Shopping", "the whole activity of buying things", "shopping the whole"]] as const).forEach(([s, n, d, c0], i) => {
      const at = cue("e5", c0), y = 600 + i * 120;
      photo(s, 1150, y, 90, 90, at, 8);
      formal(n, 1220, y + 2, 38, C.pink, at + 4);
      formal(d, 1220, y + 40, 26, C.grey, at + 8, "f400i");
    });
    think("Now think about it: do we say “I do a work”, or “I do work”?", 945, cue("e6", "now think"));
  }

  /* ================================================================ SUMMARY: every example in the book */
  const chips = (words: string[], beat: string, x: number, y: number, w: number, color: string, size = 26) => {
    let cx = x, cy = y, last = start(beat, 0.6);
    const h = size * 1.75, gap = 12;
    words.forEach((wd) => {
      const cw = tw(wd, size, "f700") + 34;
      if (cx + cw > x + w) { cx = x; cy += h + gap; }
      const at = has(beat, wd) ? cue(beat, wd) : last + 4;
      last = at;
      rect(cx, cy, cw, h, "#FFFFFF", at, { stroke: color, sw: 2.5, r: h / 2, dur: 8 });
      formal(wd, cx + cw / 2, cy + h * 0.68, size, C.ink, at + 2, "f700", "middle");
      cx += cw + gap;
    });
    return cy + h;
  };
  const panel = (x: number, y: number, w: number, h: number, head: string, color: string, tint: string, words: string[], beat: string, foot: string, footCue: string, size = 26) => {
    rect(x, y, w, h, tint, start(beat), { r: 18 });
    formal(head, x + 30, y + 58, 38, color, start(beat) + 4);
    chips(words, beat, x + 30, y + 90, w - 60, color, size);
    text(foot, x + w / 2, y + h - 34, 44, color, cue(beat, footCue), { anchor: "middle" });
  };
  board("s1", "ALL EXAMPLES");
  {
    text("ALL THE EXAMPLES", 960, 190, 72, C.navy, cue("s1", "all the examples"), { anchor: "middle" });
    panel(80, 240, 860, 800, "1.  UNIT / MASS", C.blue, "#EEF3FB",
      ["furniture", "luggage", "baggage", "equipment", "machinery", "garbage", "rubbish", "clothing", "stationery", "crockery", "cutlery", "scenery", "traffic"], "s2", "many things, one unit", "many things", 36);
    panel(980, 240, 860, 800, "2.  MATERIAL", C.teal, "#EAF6F4",
      ["gold", "silver", "iron", "copper", "steel", "wood", "stone", "brick", "sand", "clay", "cotton", "wool", "silk", "leather", "plastic", "glass", "paper", "water", "milk", "oil", "sugar", "salt", "flour", "rice", "soap", "shampoo", "grass"], "s3", "what things are made of", "what things", 32);
  }
  board("s4", "ALL EXAMPLES");
  {
    panel(60, 130, 580, 760, "3.  MEASURED", C.orange, "#FDF3E7",
      ["food", "rice", "bread", "butter", "cheese", "meat", "sugar", "flour", "salt", "milk", "water", "tea", "coffee", "honey"], "s4", "measured by amount", "by amount", 32);
    panel(670, 130, 580, 760, "4.  ABSTRACT", C.purple, "#F5EDF9",
      ["advice", "information", "knowledge", "education", "honesty", "justice", "patience", "courage", "wisdom", "happiness", "freedom", "peace", "evidence", "progress"], "s5", "no physical form", "no physical", 32);
    panel(1280, 130, 580, 760, "5.  ACTIVITY / PROCESS", C.pink, "#FCEDF3",
      ["work", "research", "progress", "travel", "exercise", "training", "sleep", "shopping", "business"], "s6", "one whole activity", "one whole", 34);
    const m = text("memorise the list", 520, 985, 54, C.grey, cue("s7", "dont memorise"), { anchor: "middle" });
    ink(strike(m.x0, m.x1, 968, 90), m.end, 8, C.red, 7);
    line([["find the ", C.navy], ["CATEGORY", C.green], [": no s + a singular verb", C.navy]], 1340, 985, 54, cue("s7", "find the category"), { anchor: "middle" });
  }

  /* ------------------------------------------------------------ the hand */
  let tip: Pt | null = null, color = C.ink;
  let last: { it: Item; endF: number } | null = null;
  for (const it of items) {
    const p = (f - it.at) / it.dur;
    const t = p > 0 && p < 1 ? tipOf(it, p) : null;
    if (t) { tip = t; color = it.k === "text" || it.k === "ink" ? it.color : C.ink; }
    if (tipOf(it, 1) && f >= it.at + it.dur && (!last || it.at + it.dur > last.endF)) last = { it, endF: it.at + it.dur };
  }
  const REST: Pt = [VW + 280, VH + 220];
  if (!tip && last) {
    const idle = f - last.endF, from = tipOf(last.it, 1) as Pt;
    const k = Math.max(0, Math.min(1, (idle - 14) / 18)), e = k * k * (3 - 2 * k);
    tip = [from[0] + (REST[0] - from[0]) * e, from[1] + (REST[1] - from[1]) * e];
    color = last.it.k === "text" || last.it.k === "ink" ? last.it.color : C.ink;
  }
  if (!tip) tip = REST;

  const bEnds = [...boards.slice(1), END];
  const cur = Math.max(0, boards.findIndex((s, i) => f >= s && f < bEnds[i]));
  const wipe = (b: number) => (b + 1 < boards.length ? Math.max(0, Math.min(1, (f - (boards[b + 1] - 16)) / 16)) : 0);
  const chip = [...chipAt].reverse().find((c) => f >= c.at) ?? chipAt[0];

  return (
    <AbsoluteFill style={{ background: "#D9DDE3" }}>
      <div style={{ position: "absolute", left: 14, top: 14, right: 14, bottom: 14, borderRadius: 10, background: "linear-gradient(#EEF0F3, #C7CCD3)", boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }} />
      <div style={{ position: "absolute", left: 30, top: 30, right: 30, bottom: 30, background: "#FDFDFB", borderRadius: 4, boxShadow: "inset 0 0 40px rgba(0,0,0,0.06)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 22% 30%, rgba(120,130,150,0.05), transparent 45%), radial-gradient(ellipse at 78% 72%, rgba(120,130,150,0.06), transparent 50%)" }} />
      </div>
      <svg width={VW} height={VH} style={{ position: "absolute", inset: 0 }}>
        {/* printed header: series name and the current error */}
        <text x={62} y={88} fontFamily="Inter" fontWeight={800} fontSize={34} letterSpacing={2} fill={C.navy}>GRAMMAR LOGIC SERIES</text>
        <rect x={62} y={100} width={tw("GRAMMAR LOGIC SERIES", 34, "f800") + 40} height={4} fill={C.red} />
        <g>
          <rect x={VW - 90 - tw(chip.label, 34, "f800") - 44} y={50} width={tw(chip.label, 34, "f800") + 44} height={54} rx={10} fill={C.navy} />
          <text x={VW - 90 - 22} y={89} textAnchor="end" fontFamily="Inter" fontWeight={800} fontSize={34} fill="#FFFFFF">{chip.label}</text>
        </g>
        {boards.map((_, b) => {
          if (b !== cur && !(b === cur - 1 && wipe(b) < 1)) return null;
          const er = wipe(b);
          return (
            <g key={b}>
              <defs><clipPath id={`bd${b}`}><rect x={VW * er} y={0} width={VW} height={VH} /></clipPath></defs>
              <g clipPath={`url(#bd${b})`}>
                {items.map((it, i) => (it.b === b ? <Draw key={i} it={it} f={f} id={`i${i}`} /> : null))}
              </g>
            </g>
          );
        })}
        {boards.slice(1).map((bf, i) => {
          const p = wipe(i);
          return p > 0 && p < 1 ? <Eraser key={i} x={VW * p} /> : null;
        })}
        <Hand x={tip[0]} y={tip[1]} color={color} />
      </svg>
      <TrackAudio id={V} />
      {items.filter((it) => tipOf(it, 0.5)).filter((it, i, arr) => arr.findIndex((o) => Math.abs(o.at - it.at) < 30) === i).map((it, i) => <Fx key={`s${i}`} at={it.at} name="scratch" volume={0.04} />)}
      {items.filter((it) => it.k === "rect" && it.mode === "pop" && it.w > 300).map((it, i) => <Fx key={`p${i}`} at={it.at} name="pop" volume={0.05} />)}
      {boards.slice(1).map((bf, i) => <Fx key={`e${i}`} at={bf - 16} name="whoosh" volume={0.06} />)}
    </AbsoluteFill>
  );
};

/** wobbly blob outline (the notes' hand-drawn "GOLD" shape) */
const ellipse2 = (cx: number, cy: number, rx: number, ry: number): Pt[] =>
  Array.from({ length: 80 }, (_, i) => {
    const a = -2 + (i / 79) * Math.PI * 2.05;
    const r = 1 + 0.08 * Math.sin(a * 3 + 1);
    return [cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r] as Pt;
  });
