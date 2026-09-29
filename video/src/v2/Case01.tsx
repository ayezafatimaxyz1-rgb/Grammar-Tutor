// Case 01 · UNIT / MASS · furniture. Every point is proved with a visible test before moving on.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Backpack, Bed, Chair, Holdall, Sofa, Suitcase, Table } from "../art";
import { G, Sentence } from "../components";
import { C, MONO } from "../theme";
import { lerp, prog, useCue } from "../timing";
import { HookList, HookTwist } from "./Hook";
import { Card, Fx, K, Label, Lens, ProofBanner, Proven, Slam, Stage, Svg, useSpring, useWaypoints } from "./kit";
import { Box, QMark, Scribble } from "./props";

const A = K.unit;
const ROOM = [
  { k: "chair", x: 300, y: 640, el: <Chair c={A} />, name: "a chair" },
  { k: "table", x: 780, y: 640, el: <Table c={A} />, name: "a table" },
  { k: "sofa", x: 300, y: 1020, el: <Sofa c={A} />, name: "a sofa" },
  { k: "bed", x: 780, y: 1020, el: <Bed c={A} />, name: "a bed" },
];

const Room: React.FC<{ s?: number; dim?: number; y0?: number }> = ({ s = 1.35, dim = 0, y0 = 0 }) => (
  <g opacity={1 - dim * 0.6} transform={`translate(0 ${y0})`}>
    {ROOM.map((o) => <G key={o.k} x={o.x} y={o.y} s={s}>{o.el}</G>)}
  </g>
);

/* ---------------------------------------------------------------- hook */
export const C1HookList: React.FC = () => <HookList highlight="Furniture" />;
export const C1HookTwist: React.FC = () => <HookTwist highlight="Furniture" />;

/* ---------------------------------------------------------------- case opens */
export const C1Case: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const sp = useSpring();
  const t0 = cue("case one");
  const tWord = cue("furniture");
  const tWhy = cue("why is");
  const tWrong = cue("wrong");
  const open = sp(f, t0, { damping: 13 });
  const wob = f > tWrong ? Math.sin((f - tWrong) / 2) * 6 * Math.exp(-(f - tWrong) / 12) : 0;
  return (
    <Stage shakes={[tWord]}>
      <div style={{ position: "absolute", left: 90, top: 330, width: 900, height: 520, transform: `scaleY(${open})`, transformOrigin: "top" }}>
        <div style={{ position: "absolute", left: 0, top: -54, width: 300, height: 70, background: "#E4C98F", borderRadius: "14px 14px 0 0", fontFamily: MONO, fontWeight: 600, fontSize: 38, color: K.ink, display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: 3 }}>CASE 01</div>
        <div style={{ position: "absolute", inset: 0, background: "#E4C98F", borderRadius: "0 18px 18px 18px", boxShadow: "0 24px 50px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: MONO, fontSize: 36, color: "#6B4F1D", letterSpacing: 4 }}>UNIT / MASS</div>
          <Slam at={tWord} size={130} color={K.ink}>furniture</Slam>
        </div>
      </div>
      <Card at={tWhy} y={960} rot={-2}>
        <div style={{ transform: `translateX(${wob}px)` }}>
          <Sentence text="The [furniture|n] [are|x] expensive." mark="wrong" at={tWhy} hlAt={tWrong} accent={C.unit} size={56} />
        </div>
      </Card>
      <Svg><Lens x={880} y={1310} s={0.9} mood="search" look={[-0.6, -0.8]} o={prog(f, tWhy + 6)} /></Svg>
      <Fx at={t0} name="whoosh" />
      <Fx at={tWord} name="slam" volume={0.3} />
      <Fx at={tWrong} name="buzzer" volume={0.18} />
    </Stage>
  );
};

/* ---------------------------------------------------------------- proof 1: point test */
export const C1Point: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const wp = useWaypoints();
  const t0 = cue("point to");
  const tChair = cue("this", 0, 0);
  const tTable = cue("this", 0, 1);
  const tSofa = cue("a sofa");
  const tBed = cue("a bed");
  const tEvery = cue("every object");
  const hits = [cue("a chair"), cue("a table"), tSofa, tBed];
  const [lx, ly] = wp(f, [
    { at: 0, x: 540, y: 1330 },
    { at: tChair - 6, x: 390, y: 560 },
    { at: tTable - 6, x: 870, y: 560 },
    { at: tSofa - 8, x: 390, y: 940 },
    { at: tBed - 8, x: 870, y: 940 },
    { at: tEvery, x: 950, y: 1400 },
  ]);
  const pulse = f > tEvery ? 1 + 0.06 * Math.sin((f - tEvery) / 3) : 1;
  return (
    <Stage>
      <ProofBanner n={1} text="Point to ‘a furniture’." at={0} />
      <Svg>
        <Room />
        <Lens x={lx} y={ly} s={f > tEvery ? 0.6 : 0.8} mood={f > tEvery ? "happy" : "search"} look={[-0.4, 0.5]} />
      </Svg>
      {ROOM.map((o, i) => (
        <div key={o.k} style={{ transform: `scale(${pulse})` }}>
          <Label at={hits[i]} x={o.x} y={o.y + 150}>{o.name} ✓</Label>
        </div>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1240, textAlign: "center", fontSize: 50, fontWeight: 800, opacity: prog(f, tEvery) }}>
        Every object has <span style={{ color: K.yellow }}>its own name</span>.
      </div>
      <Fx at={t0} name="whoosh" />
      {hits.map((h, i) => <Fx key={i} at={h} name="ding" volume={0.16} />)}
    </Stage>
  );
};

export const C1PointVerdict: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tNothing = cue("nothing here");
  const tSo = cue("so furniture");
  const tStamp = cue("one object", 0.4);
  const sweep = Math.sin(f / 10);
  const shrink = prog(f, tSo - 10, 18);
  return (
    <Stage shakes={[tStamp]}>
      <ProofBanner n={1} text="Point to ‘a furniture’." />
      <Svg>
        <g transform={`translate(${lerp(0, 162, shrink)} ${lerp(0, -40, shrink)}) scale(${lerp(1, 0.7, shrink)})`}>
          <Room dim={prog(f, tNothing)} />
          <Lens x={540 + sweep * 260} y={830} s={0.8} mood="search" look={[sweep, 0]} />
          <QMark x={540 + sweep * 260} y={700} o={1 - shrink} />
        </g>
      </Svg>
      <Label at={tNothing} x={540} y={shrink > 0 ? 880 : 1300} color={K.red} size={48}>‘a furniture’ → not found</Label>
      <Proven at={tStamp} y={1000} text="furniture is not the name of one object" />
      <Fx at={tNothing} name="buzzer" volume={0.2} />
      <Fx at={tStamp} name="stamp" volume={0.4} />
    </Stage>
  );
};

/* ---------------------------------------------------------------- proof 2: the box */
const LINE = [
  { k: "chair", x: 170, el: <Chair c={A} /> },
  { k: "table", x: 410, el: <Table c={A} /> },
  { k: "sofa", x: 660, el: <Sofa c={A} /> },
  { k: "bed", x: 900, el: <Bed c={A} /> },
];
const INBOX = [{ x: 380, y: 1010 }, { x: 490, y: 1030 }, { x: 610, y: 1010 }, { x: 710, y: 1030 }];

export const C1BoxIt: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const sp = useSpring();
  const tGroup = cue("whole group");
  const ats = [cue("chair"), cue("table"), cue("sofa"), cue("bed")];
  const tBox = cue("one box");
  const tLabel = cue("one label");
  return (
    <Stage shakes={[tLabel]}>
      <ProofBanner n={2} text="So what is ‘furniture’?" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontSize: 48, fontWeight: 800, opacity: prog(f, tGroup) }}>
        the name for the <span style={{ color: K.yellow }}>whole group</span>
      </div>
      <Svg>
        <Box x={540} y={1060} close={prog(f, tBox, 14)} label="FURNITURE" labelP={sp(f, tLabel, { damping: 8 })}>
          {LINE.map((o, i) => {
            const p = prog(f, ats[i], 16);
            const x = lerp(o.x, INBOX[i].x, p);
            const y = lerp(560, INBOX[i].y, p) - Math.sin(p * Math.PI) * 220;
            return <G key={o.k} x={x} y={y} s={lerp(0.95, 0.55, p)}>{o.el}</G>;
          })}
        </Box>
      </Svg>
      {ats.map((a, i) => <Fx key={i} at={a + 10} name="pop" />)}
      <Fx at={tBox} name="whoosh" />
      <Fx at={tLabel} name="slam" volume={0.35} />
    </Stage>
  );
};

export const C1CountBox: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const sp = useSpring();
  const t1 = cue("one furniture");
  const t2 = cue("two furnitures");
  const tFail = cue("it fails");
  const tInside = cue("we count");
  const tC1 = cue("one chair");
  const tC2 = cue("two chairs");
  const tStamp = cue("two chairs", 0.9);
  const see = prog(f, tInside, 16);
  const open = 1 - see;
  const wob = f > t2 && f < tFail ? Math.sin((f - t2) / 2) * 5 : 0;
  return (
    <Stage shakes={[tFail, tStamp]}>
      <ProofBanner n={2} text="Can you count the label?" />
      <Svg>
        <Box x={540} y={720} close={open} label="FURNITURE" labelP={1} see={see}>
          <g opacity={see}>
            <G x={370} y={700} s={0.6}><Chair c={A} /></G>
            <G x={500} y={720} s={0.55}><Table c={A} /></G>
            <G x={630} y={710} s={0.5}><Sofa c={A} /></G>
            <G x={750} y={720} s={0.45}><Bed c={A} /></G>
          </g>
        </Box>
        {f >= tC2 && <G x={260} y={1110} s={sp(f, tC2) * 0.9}><Chair c={A} /></G>}
        {f >= tC1 && <G x={130} y={1110} s={sp(f, tC1) * 0.9}><Chair c={A} /></G>}
        <g opacity={1 - prog(f, tInside, 8)}><Scribble x={700} y={1080} w={560} h={260} p={prog(f, tFail, 10)} /></g>
      </Svg>
      <div style={{ position: "absolute", left: 480, top: 980, transform: `rotate(${wob}deg)`, opacity: 1 - prog(f, tInside, 10) }}>
        <div style={{ fontSize: 64, fontWeight: 900, opacity: prog(f, t1) }}>1 furniture</div>
        <div style={{ fontSize: 64, fontWeight: 900, opacity: prog(f, t2) }}>2 furnitures?</div>
      </div>
      <Label at={tC1} x={130} y={960}>1</Label>
      <Label at={tC2} x={260} y={960}>2</Label>
      <div style={{ position: "absolute", left: 360, top: 1060, fontSize: 52, fontWeight: 800, opacity: prog(f, tC1) }}>chairs ✓ countable</div>
      <Proven at={tStamp} y={1240} text="count the things, not the group name" />
      <Fx at={t1} name="tick" />
      <Fx at={t2} name="tick" />
      <Fx at={tFail} name="buzzer" volume={0.25} />
      <Fx at={tC1} name="ding" volume={0.16} />
      <Fx at={tC2} name="ding" volume={0.16} />
      <Fx at={tStamp} name="stamp" volume={0.4} />
    </Stage>
  );
};

/* ---------------------------------------------------------------- proof 3: the verb */
export const C1Verb: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const sp = useSpring();
  const tWhole = cue("one whole");
  const tSing = cue("verb is singular");
  const tFix = cue("the furniture is");
  const tStamp = tFix + 50;
  const areDrop = prog(f, tSing, 20);
  const isFly = prog(f, tSing + 12, 14);
  return (
    <Stage shakes={[tStamp]}>
      <ProofBanner n={3} text="One whole → which verb?" />
      <Svg>
        <Box x={540} y={520} w={420} h={240} close={1} label="FURNITURE" labelP={1} />
      </Svg>
      <Label at={tWhole} x={540} y={700} size={44}>ONE whole</Label>
      <Card at={10} y={800}>
        <div style={{ fontSize: 52, fontWeight: 700, textAlign: "center", whiteSpace: "nowrap" }}>
          The furniture{" "}
          <span style={{ display: "inline-block", minWidth: 110, borderBottom: `6px solid ${K.ink}`, color: C.correct, fontWeight: 900, transform: `scale(${f >= tSing + 26 ? sp(f, tSing + 26) : 1})` }}>
            {f >= tSing + 26 ? "is" : " "}
          </span>{" "}
          expensive.
        </div>
      </Card>
      {/* tiles */}
      <div style={{ position: "absolute", left: 250, top: 1080, fontSize: 70, fontWeight: 900, background: K.card, color: C.correct, padding: "10px 40px", borderRadius: 16,
        transform: `translate(${isFly * 280}px, ${-isFly * 230}px) scale(${1 - isFly * 0.4})`, opacity: 1 - prog(f, tSing + 24, 4) }}>is</div>
      <div style={{ position: "absolute", left: 640, top: 1080, fontSize: 70, fontWeight: 900, background: K.card, color: K.red, padding: "10px 40px", borderRadius: 16,
        transform: `translateY(${areDrop * areDrop * 900}px) rotate(${areDrop * 60 + (f > tSing - 20 && f < tSing ? Math.sin(f) * 6 : 0)}deg)`, opacity: 1 - areDrop * 0.8 }}>are</div>
      {f >= tFix && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 1080, display: "flex", justifyContent: "center" }}>
          <Sentence text="The [furniture|nL] [is|vL] expensive." mark="right" at={tFix} linkAt={tFix + 12} accent={C.unit} size={58} style={{ background: K.card, padding: "18px 30px", borderRadius: 16 }} />
        </div>
      )}
      <Proven at={tStamp} y={1260} text="group name → singular verb" />
      <Fx at={tSing} name="buzzer" volume={0.18} />
      <Fx at={tSing + 26} name="click" volume={0.4} />
      <Fx at={tFix} name="correct" volume={0.2} />
      <Fx at={tStamp} name="stamp" volume={0.4} />
    </Stage>
  );
};

/* ---------------------------------------------------------------- proof 4: adding a number */
export const C1Pieces: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const sp = useSpring();
  const tNeed = cue("need a number");
  const tStick = cue("wont stick");
  const tCount = cue("something countable");
  const tTwo = cue("two pieces");
  const tAre = cue("are expensive");
  const tStamp = tAre + 45;
  return (
    <Stage shakes={[tStamp]}>
      <ProofBanner n={4} text="Adding a number" />
      <Card at={tNeed} y={380} rot={1.5}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Sentence text="[2|g] [furniture|nb2]" at={tNeed} bounceAt={tStick} accent={C.unit} size={64} mark={f > tStick + 14 ? "wrong" : "none"} />
        </div>
        <div style={{ textAlign: "center", fontSize: 36, color: K.red, fontWeight: 800, marginTop: 10, opacity: prog(f, tStick + 14) }}>won’t stick</div>
      </Card>
      <Card at={tCount} y={720} rot={-1}>
        <Sentence text="Two [pieces|nLc2] of furniture [are|vL] expensive." mark="right" at={tCount} chipAt={tTwo} linkAt={tAre} accent={C.unit} size={54} />
      </Card>
      <Svg>
        <g opacity={1 - prog(f, tStamp - 5, 8)}>
          <G x={330} y={1130} s={sp(f, tTwo + 6)}><Chair c={A} /></G>
          <G x={700} y={1130} s={sp(f, tTwo + 12)}><Sofa c={A} /></G>
        </g>
      </Svg>
      <div style={{ opacity: 1 - prog(f, tStamp - 5, 8) }}>
        <Label at={tTwo + 10} x={330} y={1270}>piece 1</Label>
        <Label at={tTwo + 16} x={700} y={1270}>piece 2</Label>
      </div>
      <Proven at={tStamp} y={1080} text="the number goes on pieces, so the verb is plural" />
      <Fx at={tStick + 12} name="boing" volume={0.3} />
      <Fx at={tTwo + 16} name="click" volume={0.4} />
      <Fx at={tAre} name="correct" volume={0.2} />
      <Fx at={tStamp} name="stamp" volume={0.4} />
    </Stage>
  );
};

/* ---------------------------------------------------------------- try it: luggage */
export const C1Luggage: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const sp = useSpring();
  const wp = useWaypoints();
  const tTry = cue("now you try");
  const tPoint = cue("point to");
  const tSuit = cue("a suitcase");
  const tBag = cue("a bag");
  const tGroup = cue("group name");
  const tFix = cue("the luggage is");
  const [lx, ly] = wp(f, [
    { at: 0, x: 540, y: 1300 },
    { at: tSuit - 8, x: 380, y: 560 },
    { at: tBag - 8, x: 860, y: 560 },
    { at: tGroup, x: 960, y: 1060 },
  ]);
  const inP = (i: number) => prog(f, tGroup + i * 5, 16);
  const items = [{ x: 280, el: <Suitcase c={A} /> }, { x: 540, el: <Backpack c={A} /> }, { x: 800, el: <Holdall c={A} /> }];
  return (
    <Stage>
      <ProofBanner n="YOUR TURN" text="luggage" color={K.green} />
      <Label at={tPoint} x={540} y={330} color={K.yellow} size={46}>Point to ‘a luggage’?</Label>
      <Svg>
        <Box x={540} y={1000} w={620} h={300} close={prog(f, tGroup + 22, 12)} label="LUGGAGE" labelP={sp(f, tGroup + 30, { damping: 8 })}>
          {items.map((o, i) => (
            <G key={i} x={lerp(o.x, 420 + i * 120, inP(i))} y={lerp(640, 980, inP(i)) - Math.sin(inP(i) * Math.PI) * 180} s={lerp(1.1, 0.6, inP(i))}>{o.el}</G>
          ))}
        </Box>
        <Lens x={lx} y={ly} s={f > tGroup ? 0.55 : 0.75} mood={f > tFix ? "happy" : "search"} look={[-0.3, 0.6]} />
      </Svg>
      <div style={{ opacity: 1 - prog(f, tGroup, 8) }}>
        <Label at={tSuit} x={280} y={790}>a suitcase ✓</Label>
        <Label at={tBag} x={800} y={790}>a bag ✓</Label>
      </div>
      {f >= tFix && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 1230, display: "flex", justifyContent: "center" }}>
          <Sentence text="The [luggage|nL] [is|vL] heavy." mark="right" at={tFix} linkAt={tFix + 12} accent={C.unit} size={60} style={{ background: K.card, padding: "18px 30px", borderRadius: 16 }} />
        </div>
      )}
      <Fx at={tTry} name="pop" />
      <Fx at={tSuit} name="ding" volume={0.16} />
      <Fx at={tBag} name="ding" volume={0.16} />
      <Fx at={tGroup + 30} name="slam" volume={0.3} />
      <Fx at={tFix} name="correct" volume={0.2} />
    </Stage>
  );
};

/* ---------------------------------------------------------------- the rule */
export const C1Rule: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tDont = cue("dont memorise");
  const tAsk = cue("can i point");
  const tNot = cue("if not");
  const tGroup = cue("group name");
  const tOne = cue("treat it");
  const tClose = tOne + 45;
  const step = (at: number, children: React.ReactNode, bg: string, color = K.ink) => (
    <div style={{ opacity: prog(f, at), transform: `translateY(${(1 - prog(f, at)) * 40}px)`, background: bg, color, fontSize: 52, fontWeight: 900, padding: "22px 36px", borderRadius: 20, textAlign: "center" }}>
      {children}
    </div>
  );
  const arrow = (at: number) => <div style={{ fontSize: 60, color: K.dim, opacity: prog(f, at), lineHeight: 1 }}>↓</div>;
  return (
    <Stage shakes={[tClose]}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 170, textAlign: "center", fontFamily: MONO, fontSize: 44, letterSpacing: 4, opacity: prog(f, tDont) }}>
        <span style={{ textDecoration: `line-through ${K.red} 8px` }}>MEMORISE</span> → <span style={{ color: K.yellow }}>TEST</span>
      </div>
      <div style={{ position: "absolute", left: 90, right: 90, top: 330, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        {step(tAsk, <>Can I point to <span style={{ color: "#2F5DA8" }}>ONE</span> of it?</>, K.card)}
        {arrow(tNot)}
        {step(tNot, "NO", K.red, "#fff")}
        {arrow(tGroup)}
        {step(tGroup, "It’s a group name", K.card)}
        {arrow(tOne)}
        {step(tOne, "Treat it as ONE → singular verb", K.green)}
      </div>
      <Svg><Lens x={150} y={1330} s={0.7} mood="happy" o={prog(f, tOne)} /></Svg>
      <Proven at={tClose} y={1310} label="CASE CLOSED" color={K.yellow} text="" />
      <Fx at={tAsk} name="pop" />
      <Fx at={tNot} name="buzzer" volume={0.15} />
      <Fx at={tGroup} name="pop" />
      <Fx at={tOne} name="correct" volume={0.22} />
      <Fx at={tClose} name="stamp" volume={0.4} />
    </Stage>
  );
};

export const CASE01: Record<string, React.FC> = {
  HookList: C1HookList, HookTwist: C1HookTwist, CaseOpen: C1Case, PointTest: C1Point, PointVerdict: C1PointVerdict,
  BoxIt: C1BoxIt, CountBox: C1CountBox, VerbSnap: C1Verb, PiecesChip: C1Pieces, LuggageTest: C1Luggage, RuleCard: C1Rule,
};
