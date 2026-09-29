// Vertical (1080 × 1920) lessons. Diagrams are recomposed for a tall frame:
// case tab + hook at the top, the picture in the middle, sentences below it,
// burned-in captions in the lower third (clear of platform buttons).
import React from "react";
import { useCurrentFrame } from "remotion";
import {
  Backpack, Bed, BrickWall, Bowl, Chair, Coin, GoldBlob, Grain, Holdall, Loaf, Necklace, Painting, Ring, Scale, Slice, Sofa, Suitcase, Table,
} from "../art";
import { CaseTab, G, Layer, Note, Sentence, Sfx, Stamp, Tag } from "../components";
import { C, FONT, SECTIONS } from "../theme";
import { fadeUp, lerp, prog, useCue, usePop } from "../timing";
import { ART_FACTS, DrawPath, DrawRect, Ideas, KnowledgeMap, ProcessLoop, TaskCard } from "./shared";

const VW = 1080;
const VH = 1920;
const LX = 70; // left margin for sentences
const SENT_W = 900;

const Tab: React.FC<{ i: number }> = ({ i }) => {
  const s = SECTIONS[i];
  return <CaseTab num={s.num} title={s.title} color={C[s.key]} x={LX} y={130} scale={1.15} />;
};

const Hook: React.FC<{ children: React.ReactNode; at: number; top?: number; size?: number }> = ({ children, at, top = 260, size = 64 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: LX, top, width: SENT_W, fontSize: size, fontWeight: 800, lineHeight: 1.15, ...fadeUp(f, at) }}>
      {children}
    </div>
  );
};

const sent = (top: number): React.CSSProperties => ({ position: "absolute", left: LX, top, maxWidth: SENT_W });

/* ====================================================== SHORT 1 · UNIT / MASS */
const GRID = [
  { k: "chair", x: 330, y: 700, el: <Chair c={C.unit} />, label: "chair" },
  { k: "table", x: 750, y: 700, el: <Table c={C.unit} />, label: "table" },
  { k: "sofa", x: 330, y: 1000, el: <Sofa c={C.unit} />, label: "sofa" },
  { k: "bed", x: 750, y: 1000, el: <Bed c={C.unit} />, label: "bed" },
];

const FurnitureGrid: React.FC<{ at: number[]; bracket: number; chips?: number[]; chipLabels?: string[] }> = ({ at, bracket, chips = [], chipLabels = [] }) => {
  const f = useCurrentFrame();
  const pop = usePop();
  return (
    <Layer w={VW} h={VH}>
      <DrawRect x={110} y={540} w={860} h={640} p={bracket} color={C.unit} sw={8} />
      {GRID.map((o, i) => (
        <g key={o.k}>
          <G x={o.x} y={o.y} s={pop(f, at[i]) * 1.15}>{o.el}</G>
          <text x={o.x} y={o.y + 140} textAnchor="middle" fontSize={36} fontWeight={600} fill={C.ink} fontFamily={FONT} opacity={prog(f, at[i])}>{o.label}</text>
        </g>
      ))}
      {chips.map((c, i) => (
        <g key={i} transform={`translate(${GRID[i].x - 120} ${GRID[i].y - 70}) scale(${pop(f, c)})`}>
          <circle r={34} fill={C.unit} />
          <text y={12} textAnchor="middle" fontSize={36} fontWeight={800} fill="#fff" fontFamily={FONT}>{chipLabels[i] ?? i + 1}</text>
        </g>
      ))}
    </Layer>
  );
};

export const S1Hook: React.FC = () => {
  const cue = useCue();
  const t0 = cue("four objects");
  const tWhy = cue("so why");
  return (
    <>
      <Tab i={0} />
      <Hook at={t0}>Four objects.</Hook>
      <Hook at={tWhy} top={345}>Why does <span style={{ color: C.unit }}>furniture</span> take <span style={{ color: C.correct }}>is</span>?</Hook>
      <FurnitureGrid at={[t0 - 6, t0 - 2, t0 + 2, t0 + 6]} bracket={0} chips={[t0 + 4, t0 + 8, t0 + 12, t0 + 16]} />
      <Sentence text="The [furniture|n] [are|x] expensive." mark="wrong" at={tWhy} hlAt={tWhy + 20} accent={C.unit} size={52} style={sent(1260)} />
      <Sfx at={tWhy} name="wrong" />
    </>
  );
};

export const S1Label: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tOne = cue("one chair");
  const tTwo = cue("two chairs");
  const tLabel = cue("overall label");
  const tNot = cue("not the name");
  return (
    <>
      <Tab i={0} />
      <Hook at={tOne} size={56}>1 chair, <span style={{ ...fadeUp(f, tTwo), display: "inline-block" }}>2 chairs…</span></Hook>
      <FurnitureGrid at={[-50, -50, -50, -50]} bracket={prog(f, tLabel, 22)} chips={[tOne, tTwo]} chipLabels={["1", "2"]} />
      <Tag color={C.unit} at={tLabel + 8} x={540} y={540} size={44} solid>FURNITURE</Tag>
      <Note at={tLabel + 10} x={540} y={1250} w={940} size={44} color={C.unit}><b>furniture</b> = the overall label</Note>
      <Note at={tNot} x={540} y={1320} w={940} size={38}>not the name of each item</Note>
      <Sfx at={tOne} name="pop" />
      <Sfx at={tTwo} name="pop" />
      <Sfx at={tLabel} name="whoosh" />
    </>
  );
};

export const S1Fix: React.FC = () => {
  const cue = useCue();
  const tUnc = cue("uncountable");
  const tFix = cue("the furniture is");
  return (
    <>
      <Tab i={0} />
      <Hook at={tUnc} size={52}>English treats <span style={{ color: C.unit }}>furniture</span> as uncountable.</Hook>
      <FurnitureGrid at={[-50, -50, -50, -50]} bracket={1} />
      <Tag color={C.unit} at={-50} x={540} y={540} size={44} solid>FURNITURE</Tag>
      <Sentence text="The [furniture|n] [are|x] expensive." mark="wrong" at={0} hlAt={0} accent={C.unit} size={50} style={{ ...sent(1230), opacity: 0.6 }} />
      <Sentence text="The [furniture|nL] [is|vL] expensive." mark="right" at={tFix} linkAt={tFix + 16} accent={C.unit} size={56} style={sent(1330)} />
      <Sfx at={tFix} name="correct" />
    </>
  );
};

export const S1Pieces: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tNum = cue("need a number");
  const tTwo = cue("two pieces");
  const tAre = cue("are expensive");
  const tGoes = cue("the number goes");
  return (
    <>
      <Tab i={0} />
      <Hook at={tNum} size={56}>Need a number? Count <span style={{ color: C.unit }}>pieces</span>.</Hook>
      <FurnitureGrid at={[-50, -50, -50, -50]} bracket={1} chips={[tTwo + 10, tTwo + 16]} chipLabels={["1", "2"]} />
      <Sentence text="[Two|g] [pieces|nLc2] of furniture [are|vL] expensive." mark="right" at={tTwo - 6} chipAt={tTwo} linkAt={tAre} accent={C.unit} size={54} style={sent(1240)} />
      <Note at={tGoes} x={540} y={1440} w={940} size={36} color={C.unit}>number on <b>pieces</b> → plural verb</Note>
      <Sfx at={tTwo} name="pop" />
      <Sfx at={tAre} name="correct" />
    </>
  );
};

export const S1Luggage: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tLug = cue("with luggage");
  const tIs = cue("the luggage is heavy");
  const tThree = cue("three pieces");
  const tAre = cue("are heavy");
  const tSee = cue("see what the noun names");
  const gather = prog(f, tLug + 10, 20);
  const split = prog(f, tThree, 20);
  const g = gather * (1 - split);
  const items = [<Suitcase c={C.unit} />, <Holdall c={C.unit} />, <Backpack c={C.unit} />];
  return (
    <>
      <Tab i={0} />
      <Hook at={tLug} size={56}>Same picture: <span style={{ color: C.unit }}>luggage</span></Hook>
      <Layer w={VW} h={VH}>
        <DrawRect x={130} y={560} w={820} h={420} p={g} color={C.unit} sw={8} />
        {items.map((el, i) => <G key={i} x={540 + (i - 1) * lerp(320, 250, g)} y={780} s={pop(f, tLug + i * 4) * 1.1}>{el}</G>)}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${540 + (i - 1) * 320} 620) scale(${pop(f, tThree + 8 + i * 5)})`}>
            <circle r={32} fill={C.unit} />
            <text y={12} textAnchor="middle" fontSize={34} fontWeight={800} fill="#fff" fontFamily={FONT}>{i + 1}</text>
          </g>
        ))}
      </Layer>
      <div style={{ opacity: 1 - split }}><Tag color={C.unit} at={tLug + 20} x={540} y={560} size={40} solid>LUGGAGE</Tag></div>
      <Sentence text="The [luggage|nL] [is|vL] heavy." mark="right" at={tIs} linkAt={tIs + 14} accent={C.unit} size={52} style={sent(1010)} />
      <Sentence text="Three [pieces|nLc3] of luggage [are|vL] heavy." mark="right" at={tThree - 4} chipAt={tThree} linkAt={tAre} accent={C.unit} size={52} style={sent(1180)} />
      <Note at={tSee} x={540} y={1400} w={960} size={40} color={C.ink}><b>See what the noun names → choose the verb.</b></Note>
      <Sfx at={tIs} name="correct" />
      <Sfx at={tThree} name="pop" />
    </>
  );
};

/* ====================================================== SHORT 2 · MATERIAL */
const HouseWalls: React.FC<{ leftMode: number; rightMode: number; counted?: number; show?: number }> = ({ leftMode, rightMode, counted = 0, show = 1 }) => (
  <Layer w={VW} h={VH}>
    <g opacity={show}>
      <G x={540} y={720} s={1.6}><BrickWall mode={leftMode} counted={counted} w={420} h={180} /></G>
      <G x={540} y={1060} s={1.6}><BrickWall mode={rightMode} w={420} h={180} /></G>
    </g>
  </Layer>
);

export const S2Hook: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const t0 = cue("is a house");
  const tBoth = cue("both are correct");
  return (
    <>
      <Tab i={1} />
      <Hook at={t0}>Made of <span style={{ color: C.material }}>brick</span> or <span style={{ color: C.material }}>bricks</span>?</Hook>
      <HouseWalls leftMode={0} rightMode={1} show={prog(f, t0)} />
      <Stamp text="BOTH ✓" at={tBoth} x={540} y={890} size={70} color={C.correct} />
      <Sfx at={tBoth} name="correct" />
    </>
  );
};

export const S2Gold: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tGold = cue("think of gold");
  const at = [cue("a ring"), cue("a coin"), cue("a necklace")];
  const tSub = cue("the substance");
  const tMuch = cue("how much gold");
  const objs = [{ x: 230, el: <Ring /> }, { x: 540, el: <Coin /> }, { x: 850, el: <Necklace /> }];
  return (
    <>
      <Tab i={1} />
      <Layer w={VW} h={VH}>
        <G x={540} y={620} s={pop(f, tGold) * 1.4}><GoldBlob wobble={f / 10} /></G>
        {objs.map((o, i) => (
          <g key={i}>
            <DrawPath d={`M540 700 C 540 850, ${o.x} 850, ${o.x} 940`} p={prog(f, at[i] - 6, 16)} color={C.gold} sw={10} />
            <G x={o.x} y={1030} s={pop(f, at[i] + 6)}>{o.el}</G>
          </g>
        ))}
      </Layer>
      <Tag color={C.material} at={tSub} x={540} y={470} size={40} solid>GOLD · material</Tag>
      <Note at={at[2] + 10} x={540} y={1160} w={900} size={38}>three separate things</Note>
      <Sentence text="How [much|g] [gold|n]?" at={tMuch} accent={C.material} size={72} style={{ ...sent(1270), left: 0, right: 0, maxWidth: VW, justifyContent: "center" }} />
      <Sfx at={tMuch} name="pop" />
    </>
  );
};

export const S2Count: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tRings = cue("three rings");
  const tGrams = cue("twenty grams");
  const tNum = cue("the number goes");
  const needle = prog(f, tGrams, 30);
  return (
    <>
      <Tab i={1} />
      <Layer w={VW} h={VH}>
        {[0, 1, 2].map((i) => <G key={i} x={300 + i * 240} y={520} s={pop(f, tRings + i * 4) * 0.9}><Ring /></G>)}
        <G x={540} y={960} s={pop(f, tGrams - 8) * 1.2}>
          <Scale value={needle * 0.55} label={needle > 0.95 ? "20 g" : ""} />
          <g transform="translate(0 -125) scale(0.45)"><GoldBlob wobble={f / 14} /></g>
        </G>
      </Layer>
      <Sentence text="three [rings|nc3]" at={tRings - 4} chipAt={tRings + 4} accent={C.material} size={60} style={{ ...sent(640), left: 330 }} />
      <Sentence text="twenty [grams|nc20] of gold" at={tGrams - 4} chipAt={tGrams + 4} accent={C.material} size={60} style={{ ...sent(1180), left: 220 }} />
      <div style={{ position: "absolute", left: LX, width: SENT_W, top: 1330, textAlign: "center", fontSize: 44, fontWeight: 700, ...fadeUp(f, tNum) }}>
        number on <span style={{ color: C.material }}>rings</span> / <span style={{ color: C.material }}>grams</span>, not on <span style={{ textDecoration: `line-through ${C.error} 5px` }}>gold</span>
      </div>
      <Sfx at={tRings + 4} name="pop" />
      <Sfx at={tGrams + 4} name="pop" />
    </>
  );
};

export const S2Brick: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tBricks = cue("made of bricks");
  const tMat = cue("names the material");
  const tBoth = cue("both are right");
  const counted = Math.floor(prog(f, cue("individual blocks"), 40) * 18);
  return (
    <>
      <Tab i={1} />
      <HouseWalls leftMode={0} rightMode={prog(f, tMat, 25)} counted={counted} />
      <Sentence text="made of [bricks|n]" mark="right" at={tBricks} accent={C.material} size={54} style={sent(420)} />
      <Tag color={C.material} at={tBricks + 20} x={540} y={900} size={32}>individual blocks you could count</Tag>
      <Sentence text="made of [brick|n]" mark="right" at={tMat - 8} accent={C.material} size={54} style={sent(1230)} />
      <Tag color={C.material} at={tMat + 10} x={540} y={1370} size={32} solid>the material</Tag>
      <Note at={tBoth} x={540} y={1440} w={960} size={38} color={C.ink}><b>What does the word name in your sentence?</b></Note>
      <Sfx at={tBricks} name="correct" />
      <Sfx at={tMat} name="correct" />
    </>
  );
};

/* ====================================================== SHORT 3 · MEASURED */
const Grains: React.FC<{ n: number; s: number; spread: number; cx: number; cy: number }> = ({ n, s, spread, cx, cy }) => (
  <g transform={`translate(${cx} ${cy})`}>
    {Array.from({ length: n }, (_, i) => (
      <G key={i} x={(((i * 71) % 700) - 350) * spread} y={(((i * 43) % 600) - 300) * spread} s={s} r={(i * 57) % 180}><Grain /></G>
    ))}
  </g>
);

export const S3Hook: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const t0 = cue("thousands of grains");
  const tWhy = cue("so why not");
  return (
    <>
      <Tab i={2} />
      <Hook at={t0}>Thousands of grains…</Hook>
      <Layer w={VW} h={VH}><Grains n={50} s={lerp(1, 2.4, prog(f, t0, 30))} spread={0.9} cx={540} cy={820} /></Layer>
      <Sentence text="I ate too [many|x] [rice|n] for lunch." mark="wrong" at={tWhy} hlAt={tWhy + 20} accent={C.measured} size={54} style={sent(1240)} />
      <Sfx at={tWhy} name="wrong" />
    </>
  );
};

export const S3Zoom: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tFood = cue("rice as food");
  const tBowl = cue("amount in the bowl");
  const tList = cue("not a list");
  const back = prog(f, tFood, 25);
  return (
    <>
      <Tab i={2} />
      <Layer w={VW} h={VH}>
        <g opacity={1 - back}><Grains n={50} s={2.4} spread={0.9} cx={540} cy={820} /></g>
        <G x={540} y={820} s={lerp(0.5, 2.1, back)} o={back}><Bowl marks /></G>
        <g transform="translate(940 820)" opacity={prog(f, tBowl - 4)}>
          <rect x={-28} y={-180} width={56} height={320} rx={14} fill={C.card} stroke={C.measured} strokeWidth={5} />
          <rect x={-20} y={132 - 300 * 0.6 * prog(f, tBowl, 25)} width={40} height={300 * 0.6 * prog(f, tBowl, 25)} rx={8} fill={C.measured} opacity={0.6} />
        </g>
      </Layer>
      <Tag color={C.measured} at={tFood} x={540} y={560} size={42} solid>RICE · food</Tag>
      <Note at={tBowl} x={540} y={1130} w={900} size={42} color={C.measured}><b>the amount in the bowl</b></Note>
      <Note at={tList} x={540} y={1210} w={900} size={38}>not <span style={{ textDecoration: `line-through ${C.error} 4px` }}>1, 2, 3, 4… grains</span></Note>
      <Sfx at={tFood} name="whoosh" />
    </>
  );
};

export const S3Fix: React.FC = () => {
  const cue = useCue();
  const tFix = cue("i ate too much");
  const tNot = cue("not too many");
  return (
    <>
      <Tab i={2} />
      <Layer w={VW} h={VH}><G x={540} y={780} s={2.1}><Bowl marks /></G></Layer>
      <Sentence text="I ate too [many|x] [rice|n] for lunch." mark="wrong" at={tNot} hlAt={tNot} accent={C.measured} size={46} style={{ ...sent(1120), opacity: 0.7 }} />
      <Sentence text="I ate too [much|g] [rice|n] for lunch." mark="right" at={tFix} accent={C.measured} size={56} style={sent(1230)} />
      <Sfx at={tFix} name="correct" />
    </>
  );
};

export const S3Units: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tUnit = cue("choose a unit");
  const tGrains = cue("many grains");
  const tBowls = cue("two bowls");
  const tGoes = cue("the number goes");
  return (
    <>
      <Tab i={2} />
      <Hook at={tUnit} size={56}>Want to count? Choose a <span style={{ color: C.measured }}>unit</span>.</Hook>
      <Layer w={VW} h={VH}>
        <g opacity={prog(f, tGrains - 4)}><Grains n={14} s={2} spread={0.35} cx={540} cy={560} /></g>
        <G x={380} y={960} s={pop(f, tBowls)}><Bowl /></G>
        <G x={700} y={960} s={pop(f, tBowls + 5)}><Bowl /></G>
      </Layer>
      <Sentence text="[many|gL] [grains|nL] of rice" at={tGrains} linkAt={tGrains + 10} accent={C.measured} size={56} style={{ ...sent(700), left: 250 }} />
      <Sentence text="[two|gL] [bowls|nLc2] of rice" at={tBowls} chipAt={tBowls + 6} linkAt={tBowls + 12} accent={C.measured} size={56} style={{ ...sent(1120), left: 260 }} />
      <Note at={tGoes} x={540} y={1280} w={940} size={40} color={C.measured}>the number goes onto <b>grains</b> or <b>bowls</b></Note>
      <Sfx at={tBowls + 6} name="pop" />
    </>
  );
};

export const S3Bread: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tBread = cue("bread works");
  const tSlices = cue("three slices");
  const tPic = cue("picture the amount");
  return (
    <>
      <Tab i={2} />
      <Hook at={tBread} size={56}><span style={{ color: C.measured }}>Bread</span> works the same way.</Hook>
      <Layer w={VW} h={VH}>
        <G x={540} y={640} s={pop(f, tBread) * 1.3}><Loaf /></G>
        {[0, 1, 2].map((i) => <G key={i} x={300 + i * 240} y={960} s={pop(f, tSlices + 4 + i * 5) * 1.1} r={-6 + i * 6}><Slice /></G>)}
      </Layer>
      <Sentence text="three [slices|nc3] of bread" mark="right" at={tSlices} chipAt={tSlices + 4} accent={C.measured} size={58} style={{ ...sent(1180), left: 180 }} />
      <Note at={tPic} x={540} y={1340} w={960} size={40} color={C.ink}><b>Picture the amount → pick the unit.</b></Note>
      <Sfx at={tSlices + 4} name="pop" />
    </>
  );
};

/* ====================================================== SHORT 4 · ABSTRACT */
export const S4Hook: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const t0 = cue("a lot of knowledge");
  const tIdeas = cue("three ideas");
  return (
    <>
      <Tab i={3} />
      <Hook at={t0 - 6} size={60}>a lot of <span style={{ color: C.abstract }}>knowledge</span>…</Hook>
      <Hook at={tIdeas} top={420} size={60}>…but three <span style={{ color: C.abstract }}>ideas</span>?</Hook>
      <Layer w={VW} h={VH}>
        <G x={540} y={880} s={0.9}><KnowledgeMap show={prog(f, t0, 20)} join={prog(f, t0 + 10, 20)} /></G>
        <G x={540} y={1260} s={0.8} o={prog(f, tIdeas)}><Ideas n={3} gap={220} /></G>
      </Layer>
      <Sfx at={tIdeas} name="pop" />
    </>
  );
};

export const S4Body: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tFacts = cue("many facts");
  const tBody = cue("whole body");
  const tNot = cue("so not");
  return (
    <>
      <Tab i={3} />
      <Layer w={VW} h={VH}>
        <G x={540} y={800} s={1.2}><KnowledgeMap show={prog(f, tFacts - 10, 40)} join={prog(f, tBody, 30)} labels={ART_FACTS} /></G>
      </Layer>
      <Tag color={C.abstract} at={tBody + 12} x={540} y={500} size={44} solid>KNOWLEDGE</Tag>
      <Note at={tBody + 10} x={540} y={1120} w={940} size={40} color={C.abstract}><b>one whole body of understanding</b></Note>
      <Sentence text="He has many [knowledges|x] about art." mark="wrong" at={tNot} hlAt={tNot + 10} accent={C.abstract} size={50} style={sent(1230)} />
      <Sfx at={tBody} name="whoosh" />
      <Sfx at={tNot} name="wrong" />
    </>
  );
};

export const S4Fix: React.FC = () => {
  const cue = useCue();
  const tFix = cue("he has a lot");
  const tSome = cue("some advice");
  const tTwo = cue("two pieces");
  return (
    <>
      <Tab i={3} />
      <Layer w={VW} h={VH}><G x={540} y={640} s={0.85}><KnowledgeMap show={1} join={1} labels={ART_FACTS} /></G></Layer>
      <Sentence text="He has [a lot of|g] [knowledge|n] about art." mark="right" at={tFix} accent={C.abstract} size={54} style={sent(900)} />
      <Sentence text="[some|g] [advice|n]" at={tSome} accent={C.abstract} size={54} style={sent(1100)} />
      <Sentence text="two [pieces|nc2] of advice" at={tTwo} chipAt={tTwo + 4} accent={C.abstract} size={54} style={sent(1250)} />
      <Sfx at={tFix} name="correct" />
      <Sfx at={tTwo + 4} name="pop" />
    </>
  );
};

export const S4Ideas: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tIdea = cue("an idea is abstract");
  const tThree = cue("three ideas");
  const tDec = cue("abstract doesnt decide");
  const tAsk = cue("one undivided body");
  return (
    <>
      <Tab i={3} />
      <Layer w={VW} h={VH}>
        {[0, 1, 2].map((i) => <G key={i} x={300 + i * 240} y={600} s={pop(f, tIdea + i * 5)}><Ideas n={1} /></G>)}
        <G x={540} y={1110} s={0.6} o={prog(f, tAsk)}><KnowledgeMap show={1} join={1} /></G>
      </Layer>
      <Sentence text="three [ideas|nc3]" mark="right" at={tThree} chipAt={tThree + 4} accent={C.abstract} size={64} style={{ ...sent(780), left: 280 }} />
      <Note at={tDec} x={540} y={900} w={940} size={40} color={C.ink}><b>“Abstract” doesn’t decide it.</b></Note>
      <div style={{ position: "absolute", left: LX, width: SENT_W, top: 1290, textAlign: "center", fontSize: 40, fontWeight: 700, ...fadeUp(f, tAsk) }}>
        one <span style={{ color: C.abstract }}>undivided body</span> or <span style={{ color: C.abstract }}>separate items</span>?
      </div>
      <Sfx at={tThree} name="correct" />
    </>
  );
};

/* ====================================================== SHORT 5 · ACTIVITY / PROCESS */
const ACTS = [
  { kind: "type" as const, label: "type" }, { kind: "plan" as const, label: "plan" },
  { kind: "call" as const, label: "call" }, { kind: "clean" as const, label: "clean" },
];
const cardPos = (i: number) => ({ x: i % 2 ? 750 : 330, y: i < 2 ? 640 : 900 });

export const S5Hook: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const t0 = cue("a lot of work");
  const tTasks = cue("four tasks");
  return (
    <>
      <Tab i={4} />
      <Hook at={t0 - 6} size={60}>a lot of <span style={{ color: C.activity }}>work</span>…</Hook>
      <Hook at={tTasks} top={420} size={60}>…but four <span style={{ color: C.activity }}>tasks</span>?</Hook>
      <Layer w={VW} h={VH}>
        <G x={540} y={900} s={1.3} o={prog(f, t0)}><ProcessLoop fuse={1} /></G>
      </Layer>
      <Sfx at={tTasks} name="pop" />
    </>
  );
};

export const S5Merge: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const at = [cue("types"), cue("plans"), cue("calls"), cue("cleans")];
  const tWork = cue("but work");
  const tOne = cue("one ongoing activity");
  const fuse = prog(f, tWork, 30);
  return (
    <>
      <Tab i={4} />
      <Layer w={VW} h={VH}>
        <rect x={140} y={730} width={800 * fuse} height={100} rx={50} fill={C.activity} opacity={0.85} />
        {ACTS.map((a, i) => {
          const p = cardPos(i);
          return <G key={a.kind} x={lerp(p.x, 240 + i * 200, fuse)} y={lerp(p.y, 780, fuse)} s={pop(f, at[i]) * lerp(1.1, 0.4, fuse)}><TaskCard kind={a.kind} label={a.label} /></G>;
        })}
        <G x={540} y={1080} s={1} o={prog(f, tOne)}><ProcessLoop fuse={prog(f, tOne, 25)} /></G>
      </Layer>
      <Tag color={C.activity} at={tWork + 20} x={540} y={620} size={42} solid>WORK · activity</Tag>
      <Note at={tOne} x={540} y={1250} w={940} size={40} color={C.activity}><b>one ongoing activity</b></Note>
      {at.map((a, i) => <Sfx key={i} at={a} name="tick" />)}
      <Sfx at={tWork} name="whoosh" />
    </>
  );
};

export const S5Fix: React.FC = () => {
  const cue = useCue();
  const tFix = cue("she does a lot");
  const tNot = cue("not many works");
  return (
    <>
      <Tab i={4} />
      <Layer w={VW} h={VH}>
        <rect x={140} y={730} width={800} height={100} rx={50} fill={C.activity} opacity={0.85} />
        <G x={540} y={1000} s={0.9}><ProcessLoop fuse={1} /></G>
      </Layer>
      <Tag color={C.activity} at={-50} x={540} y={620} size={42} solid>WORK · activity</Tag>
      <Sentence text="She does [a lot of|g] [work|n] every day." mark="right" at={tFix} accent={C.activity} size={56} style={sent(1150)} />
      <Sentence text="She does many [works|x] every day." mark="wrong" at={tNot} hlAt={tNot + 6} accent={C.activity} size={44} style={{ ...sent(1330), opacity: 0.75 }} />
      <Sfx at={tFix} name="correct" />
    </>
  );
};

export const S5Tasks: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tCount = cue("to count the actions");
  const tTasks = cue("four tasks");
  const split = prog(f, tCount, 25);
  return (
    <>
      <Tab i={4} />
      <Hook at={tCount} size={56}>To count the actions, choose another noun.</Hook>
      <Layer w={VW} h={VH}>
        <rect x={140} y={730} width={800} height={100} rx={50} fill={C.activity} opacity={0.85 * (1 - split)} />
        {ACTS.map((a, i) => {
          const p = cardPos(i);
          return (
            <g key={a.kind}>
              <G x={lerp(240 + i * 200, p.x, split)} y={lerp(780, p.y, split)} s={lerp(0.4, 1.1, split)} o={split}><TaskCard kind={a.kind} label={`task ${i + 1}`} /></G>
              <g transform={`translate(${p.x - 95} ${p.y - 100}) scale(${pop(f, tTasks + 6 + i * 4)})`}>
                <circle r={32} fill={C.activity} />
                <text y={12} textAnchor="middle" fontSize={34} fontWeight={800} fill="#fff" fontFamily={FONT}>{i + 1}</text>
              </g>
            </g>
          );
        })}
      </Layer>
      <Sentence text="She completes four [tasks|nc4] every day." mark="right" at={tTasks - 6} chipAt={tTasks} accent={C.activity} size={54} style={sent(1150)} />
      <Sfx at={tTasks} name="pop" />
    </>
  );
};

export const S5Art: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tThree = cue("three works of art");
  const tCorrect = cue("correct");
  const tMean = cue("the meaning has changed");
  return (
    <>
      <Tab i={4} />
      <Layer w={VW} h={VH}>
        <rect x={60} y={450} width={960} height={620} rx={10} fill={C.paperDeep} opacity={prog(f, tThree - 6)} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <G x={i === 1 ? 540 : i === 0 ? 290 : 790} y={i === 1 ? 900 : 640} s={pop(f, tThree + i * 5) * 1.25}><Painting v={i} /></G>
          </g>
        ))}
      </Layer>
      <Sentence text="three [works|nc3] of art" mark="right" at={tCorrect - 4} chipAt={tCorrect + 2} accent={C.activity} size={62} style={{ ...sent(1130), left: 180 }} />
      <Tag color={C.activity} at={tCorrect + 20} x={540} y={1290} size={36} solid>works = created pieces</Tag>
      <Note at={tMean} x={540} y={1370} w={960} size={40} color={C.ink}><b>New meaning → new grammar.</b></Note>
      <Sfx at={tCorrect} name="correct" />
    </>
  );
};

export const SHORT_SCENES: Record<string, React.FC> = {
  S1Hook, S1Label, S1Fix, S1Pieces, S1Luggage,
  S2Hook, S2Gold, S2Count, S2Brick,
  S3Hook, S3Zoom, S3Fix, S3Units, S3Bread,
  S4Hook, S4Body, S4Fix, S4Ideas,
  S5Hook, S5Merge, S5Fix, S5Tasks, S5Art,
};
