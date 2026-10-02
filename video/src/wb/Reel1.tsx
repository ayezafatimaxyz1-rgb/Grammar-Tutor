// Reel 1 (CSS past paper): "Each furniture in this display is on sale for half price."
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, W, arrow, check, cross, loop, tw, under, useBeatCue } from "./engine";
import { CARD, CardText, ReelShell, makeReel } from "./reelKit";

const V = "rl1", SX = 100, SS = 56;
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
  const R = makeReel();
  const each = wordBox(0, "Each"), furn = wordBox(0, "furniture"), is = wordBox(1, "is");

  R.card();
  R.ink(loop((is.x0 + is.x1) / 2, is.y - 18, 34, 34, 1), cue("r2", "attack the verb"), 10, C.grey, 5);
  R.ink(check(is.x1 + 40, is.y - 30, 14, 2), cue("r2", "the verb is fine"), 6, C.green, 6);
  R.ink(loop((each.x0 + each.x1) / 2, each.y - 18, (each.x1 - each.x0) / 2 + 18, 40, 3), cue("r2", "the word each"), 12, C.red, 7);
  R.ink(under(furn.x0, furn.x1, furn.y + 14, 4), cue("r4", "furniture is uncountable"), 8, C.red, 6);
  const gap = (each.x1 + furn.x0) / 2;
  R.ink([W([[gap - 14, each.y + 18], [gap, each.y - 4], [gap + 14, each.y + 18]], 5, 1)], cue("r5", "each piece of"), 6, C.green, 6);
  R.text("piece of", gap, each.y - 58, 40, C.green, cue("r5", "each piece of") + 4, { anchor: "middle" });

  R.panel(start("r2"));
  R.text("most students:", 540, 880, 52, C.grey, cue("r2", "most students"), { anchor: "middle" });
  const g = R.line([["\"is\" should be ", C.ink], ["\"are\"", C.ink]], 540, 990, 72, cue("r2", "attack the verb"));
  R.ink(cross(g.x1 + 60, 962, 30, 6), g.end + 2, 8, C.red, 10);
  R.line([["the verb is ", C.green], ["fine", C.green]], 540, 1120, 72, cue("r2", "but the verb"));
  R.line([["real problem: ", C.ink], ["EACH", C.red]], 540, 1300, 96, cue("r2", "the real problem"));

  R.panel(start("r3"));
  R.line([["EACH", C.orange], [" = pick one by one", C.navy]], 540, 860, 66, cue("r3", "each means"));
  ([["ik:chair", "chair", 230], ["ik:table", "table", 540], ["ik:sofa", "sofa", 850]] as const).forEach(([s, n, x], i) => {
    const at = cue("r3", `each ${n}`);
    R.photo(s, x, 1060, 230, 180, at);
    R.badge(`${i + 1}`, x + 105, 965, C.orange, at + 8);
    R.text(`each ${n}`, x, 1195, 44, C.orange, at + 6, { anchor: "middle" });
  });
  R.line([["EACH needs something you can ", C.ink], ["COUNT", C.green]], 540, 1320, 50, cue("r3", "needs something"));
  R.line([["FURNITURE", C.blue], [" = UNCOUNTABLE", C.red]], 540, 1425, 60, cue("r4", "furniture is uncountable"));
  R.ink(loop(540, 1080, 505, 185, 9), cue("r4", "grouped together"), 26, C.blue, 9);
  R.text("one unit, named as one", 540, 1510, 46, C.navy, cue("r4", "named as one"), { anchor: "middle" });
  const c = R.line([["EACH out of ", C.red], ["1", C.red], ["?", C.red]], 540, 1615, 64, cue("r4", "you cant pick"));
  R.ink(cross(c.x1 + 50, 1590, 26, 12), c.end + 2, 8, C.red, 9);

  R.panel(start("r5"));
  R.line([["give EACH something ", C.navy], ["countable", C.green]], 540, 860, 58, cue("r5", "so we give"));
  R.photo("ik:chair", 330, 1050, 220, 220, cue("r5", "a piece"));
  R.ink(loop(330, 1050, 140, 135, 20), cue("r5", "a piece") + 10, 12, C.orange, 7);
  R.ink(arrow(500, 1050, 600, 1050, 21), cue("r5", "a piece") + 18, 6, C.orange, 6);
  R.text("a PIECE", 760, 1070, 72, C.orange, cue("r5", "a piece") + 18, { anchor: "middle" });
  const at = cue("r6", "each piece");
  R.answerBox(["Each piece of furniture", "in this display is on sale", "for half price."], 1250, at, [0, "piece of"]);
  R.ink(check(890, 1480, 40, 30), at + 26, 10, C.green, 12);

  R.panel(start("r7"));
  cta(R, cue("r7", "logic not"), cue("r7", "comment"), cue("r7", "for the next"));

  return (
    <ReelShell f={f} video={V} reel={R} end={END} chip="CSS PAST PAPER" prompt="FIND THE ERROR" promptUntil={start("r2")} cardH={540}
      zoom={[{ at: cue("r2", "the word each"), out: start("r3"), ox: each.x0 + 40, oy: each.y - 20, s: 1.32 }]}
      countdown={[cue("r1", "error") + 22, start("r2")]} stamp={{ at: at + 30, text: "CORRECT" }}
      sfx={[{ at: cue("r4", "you cant pick") + 10, name: "wrong", v: 0.1 }]}
      card={<>
        <CardText x={SX} y={CARD.y + 62} size={25} color={C.grey}>CSS · ENGLISH (PRECIS &amp; COMPOSITION)</CardText>
        <CardText x={SX} y={CARD.y + 122} size={33} color={C.navy} weight={800}>Q. Correct the following sentence:</CardText>
        {LINES.map((l, i) => <CardText key={i} x={SX} y={LY[i]} size={SS} color={C.ink}>{l}</CardText>)}
      </>} />
  );
};

export const cta = (R: ReturnType<typeof makeReel>, a: number, b: number, c: number) => {
  R.line([["Logic, ", C.navy], ["not rules.", C.red]], 540, 980, 96, a);
  R.rect(240, 1100, 600, 120, C.navy, b, { r: 60 });
  R.text("Comment  LOGIC", 540, 1180, 54, "#FFFFFF", b + 4, { font: "f800", anchor: "middle", hand: false });
  R.text("for the next one", 540, 1310, 50, C.grey, c, { anchor: "middle" });
};
