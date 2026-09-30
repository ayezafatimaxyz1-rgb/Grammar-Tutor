import '../ig/fonts';
import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Img, Loop, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {geoConicConformal, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import type {FeatureCollection, Geometry} from 'geojson';
import world50 from 'world-atlas/countries-50m.json';
import {Paper} from '../components/Backdrop';
import {progress} from '../components/motion';
import {uthmani} from '../components/uthmani';
import {C, FE} from '../ig/theme';
import timing from './sample.timing.json';

export type StyleName = 'engraving' | 'painted' | 'kinetic' | 'infographic';
const FPS = 30;
type Line = {text: string; beat: string; start: number; end: number; words: {w: string; start: number; end: number}[]};
const LINES = timing.lines as Line[];
export const STYLE_FRAMES = Math.round(timing.duration * FPS);
const fr = (s: number) => Math.round(s * FPS);
const L = (beat: string) => LINES.find((l) => l.beat === beat)!;
const span = (beat: string) => {
  const i = LINES.findIndex((l) => l.beat === beat);
  return {from: fr(LINES[i].start) - 3, to: i + 1 < LINES.length ? fr(LINES[i + 1].start) - 3 : STYLE_FRAMES};
};
/** Scene-relative frame at which word `k` of a beat's line is spoken. */
const wordAt = (beat: string, k: number) => fr(L(beat).words[Math.min(k, L(beat).words.length - 1)].start) - span(beat).from;
const land = feature(world50 as any, (world50 as any).objects.countries) as unknown as FeatureCollection<Geometry>;

// ------------------------------------------------------------------ shared pieces
const Sfx: React.FC<{name: string; at: number; volume?: number}> = ({name, at, volume = 0.5}) => (
  <Sequence from={Math.max(0, at)} durationInFrames={FPS * 3} layout="none"><Audio src={staticFile(`ig/sfx/${name}.wav`)} volume={volume} /></Sequence>
);
const Push: React.FC<{dur: number; from?: number; to?: number; children: React.ReactNode}> = ({dur, from = 1.03, to = 1.12, children}) => {
  const f = useCurrentFrame();
  const s = interpolate(Math.min(1, f / Math.max(1, dur)), [0, 1], [from, to]);
  return <AbsoluteFill style={{transform: `scale(${s})`}}>{children}</AbsoluteFill>;
};
const Plate: React.FC<{src: string; dur: number; zoom?: [number, number]; pan?: [number, number]; blend?: boolean}> = ({src, dur, zoom = [1.05, 1.18], pan = [0, 0], blend}) => {
  const f = useCurrentFrame();
  const t = Math.min(1, f / Math.max(1, dur));
  const s = interpolate(t, [0, 1], zoom), px = interpolate(t, [0, 1], pan);
  const st = (k: number): React.CSSProperties => ({position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1 + (s - 1) * k}) translateX(${px * k}px)`});
  return (
    <AbsoluteFill style={{backgroundColor: C.paper}}>
      <Img src={staticFile(src)} style={{...st(0.55), filter: 'blur(16px)', opacity: 0.75}} />
      <Img src={staticFile(src)} style={{...st(1), mixBlendMode: blend ? 'multiply' : 'normal'}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 45%, rgba(43,33,24,0.5) 100%)'}} />
    </AbsoluteFill>
  );
};
const Slam: React.FC<{words: {w: string; at: number}[]; gold?: string[]; dark?: boolean; size?: number; top?: number}> = ({words, gold = [], dark, size = 150, top}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: top ? 'flex-start' : 'center', paddingTop: top}}>
      <div style={{width: 960, textAlign: 'center', lineHeight: 0.98}}>
        {words.map((w, i) => {
          const p = progress(f, w.at, 6);
          const g = gold.includes(w.w.replace(/[^\w']/g, '').toLowerCase());
          return (
            <span key={i} style={{display: 'inline-block', margin: '0 14px', opacity: p, transform: `scale(${interpolate(p, [0, 1], [1.6, 1])})`,
              fontFamily: FE.display, fontWeight: 700, fontSize: size, color: g ? C.goldBright : dark ? '#FFF8EA' : C.ink}}>
              {w.w.toUpperCase()}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
const words = (beat: string, from = 0, to?: number) => L(beat).words.slice(from, to).map((w) => ({w: w.w, at: fr(w.start) - span(beat).from}));

const Captions: React.FC<{hide: string[]; top?: number; boxed?: boolean}> = ({hide, top = 1090, boxed}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const line = LINES.find((l) => t >= l.start - 0.03 && t <= l.end + 0.12);
  if (!line || hide.includes(line.beat)) return null;
  const chunks: Line['words'][] = [];
  let cur: Line['words'] = [];
  line.words.forEach((w, i) => {
    cur.push(w);
    if (i === line.words.length - 1 || cur.length >= 3 || /[,.?!:]$/.test(w.w)) { chunks.push(cur); cur = []; }
  });
  const chunk = chunks.find((c) => t < c[c.length - 1].end + 0.02) ?? chunks[chunks.length - 1];
  const pop = progress(f, chunk[0].start * FPS - 1, 5);
  const key = chunk.reduce((a, w) => (w.w.length > a.w.length ? w : a), chunk[0]);
  return (
    <div style={{position: 'absolute', top, width: 1080, display: 'flex', justifyContent: 'center', opacity: pop, transform: `scale(${interpolate(pop, [0, 1], [0.85, 1])})`}}>
      <div style={{maxWidth: 1000, textAlign: 'center', padding: boxed ? '10px 26px 16px' : 0, borderRadius: 18, background: boxed ? 'rgba(43,33,24,0.9)' : 'transparent'}}>
        {chunk.map((w, i) => (
          <span key={i} style={{display: 'inline-block', margin: '0 12px', fontFamily: FE.sans, fontWeight: 800, fontSize: 92, lineHeight: 1.05,
            color: w === key ? C.goldBright : '#FFFFFF', WebkitTextStroke: boxed ? '0' : '10px rgba(43,33,24,0.92)', paintOrder: 'stroke fill'}}>
            {w.w.replace(/[,:]$/, '').toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 12, background: 'rgba(43,33,24,0.25)'}}>
      <div style={{height: '100%', width: `${(f / STYLE_FRAMES) * 100}%`, background: C.goldBright}} />
    </div>
  );
};
const Tag: React.FC<{text: string; at: number; top?: number}> = ({text, at, top = 330}) => {
  const f = useCurrentFrame();
  const p = progress(f, at, 8);
  return (
    <div style={{position: 'absolute', top, width: 1080, display: 'flex', justifyContent: 'center', opacity: p, transform: `translateY(${(1 - p) * -20}px)`}}>
      <div style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 46, letterSpacing: 6, padding: '16px 34px', borderRadius: 14, background: C.ink, color: C.goldBright}}>{text}</div>
    </div>
  );
};
const Stamp: React.FC<{text: string; at: number; top?: number; size?: number}> = ({text, at, top = 470, size = 96}) => {
  const f = useCurrentFrame();
  const p = progress(f, at, 7);
  return (
    <div style={{position: 'absolute', top, width: 1080, display: 'flex', justifyContent: 'center'}}>
      <div style={{transform: `rotate(-7deg) scale(${interpolate(p, [0, 1], [2.2, 1])})`, opacity: p, fontFamily: FE.sans, fontWeight: 800, fontSize: size, letterSpacing: 4, whiteSpace: 'nowrap',
        color: '#FFF8EA', background: 'rgba(138,90,43,0.94)', padding: '10px 38px', border: `6px solid ${C.goldBright}`, borderRadius: 12}}>{text}</div>
    </div>
  );
};

// ------------------------------------------------------------------ drawn graphics (used by several styles)
const Venn: React.FC<{dark?: boolean; labels?: [string, string]; center?: string; centerAt: number}> = ({dark, labels = ['SECURITY', 'PROSPERITY'], center = 'THE STATE SURVIVES', centerAt}) => {
  const f = useCurrentFrame();
  const merge = progress(f, 4, 26), draw = progress(f, 0, 24), mid = progress(f, centerAt, 10);
  const gap = interpolate(merge, [0, 1], [260, 130]), r = 250, cy = 760, circ = 2 * Math.PI * r;
  const ink = dark ? '#FFF8EA' : C.ink;
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[-1, 1].map((sd) => <circle key={sd} cx={540 + sd * gap} cy={cy} r={r} fill={`rgba(212,166,74,${0.1 + 0.12 * mid})`} stroke={C.goldBright} strokeWidth={6}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - draw)} transform={`rotate(${sd * 90} ${540 + sd * gap} ${cy})`} />)}
        <circle cx={540} cy={cy} r={20 * mid} fill={C.goldBright} />
      </svg>
      {labels.map((t, i) => (
        <div key={t} style={{position: 'absolute', top: cy - 30, left: 540 + (i ? 1 : -1) * (gap + 120) - 170, width: 340, textAlign: 'center', fontFamily: FE.sans, fontWeight: 800,
          fontSize: 42, letterSpacing: 3, color: ink, opacity: progress(f, 8 + i * 5, 8)}}>{t}</div>
      ))}
      <div style={{position: 'absolute', top: cy + 300, width: 1080, textAlign: 'center', fontFamily: FE.display, fontStyle: 'italic', fontWeight: 700, fontSize: 84,
        color: C.goldBright, opacity: mid, transform: `scale(${interpolate(mid, [0, 1], [1.3, 1])})`}}>{center}</div>
    </AbsoluteFill>
  );
};

const RouteMap: React.FC<{dark?: boolean; dur: number}> = ({dark, dur}) => {
  const f = useCurrentFrame();
  const {paths, P} = useMemo(() => {
    const proj = geoConicConformal().parallels([15, 40]).rotate([-33, 0]);
    proj.fitExtent([[40, 420], [1040, 1320]], {type: 'MultiPoint', coordinates: [[20, 8], [56, 8], [20, 42], [56, 42]]} as any);
    const gp = geoPath(proj);
    return {paths: land.features.map((ft) => gp(ft) ?? ''), P: (ll: [number, number]) => proj(ll) as [number, number]};
  }, []);
  const o = P([39.83, 21.42]);
  const dests: {n: string; ll: [number, number]; off: [number, number]}[] = [
    {n: 'YEMEN', ll: [44.2, 15.35], off: [110, -10]}, {n: 'SHAM', ll: [36.3, 33.5], off: [100, -50]},
    {n: 'AFRICA', ll: [30, 15], off: [-40, 30]}, {n: 'EUROPE', ll: [23.7, 37.9], off: [0, -80]}];
  const zoom = interpolate(Math.min(1, f / dur), [0, 1], [1.0, 1.12]);
  const ink = dark ? 'rgba(255,248,234,0.55)' : 'rgba(43,33,24,0.5)';
  return (
    <AbsoluteFill style={{transform: `scale(${zoom})`, transformOrigin: `${o[0]}px ${o[1]}px`}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {paths.map((d, i) => <path key={i} d={d} fill={dark ? 'rgba(212,166,74,0.10)' : 'rgba(184,137,45,0.12)'} stroke={ink} strokeWidth={1.1} />)}
        {dests.map((d, i) => {
          const e = P(d.ll), mx = (o[0] + e[0]) / 2, my = (o[1] + e[1]) / 2, c = [mx - (e[1] - o[1]) * 0.18, my + (e[0] - o[0]) * 0.18];
          const t = progress(f, 8 + i * 6, 22);
          return (
            <g key={d.n}>
              <path d={`M ${o[0]} ${o[1]} Q ${c[0]} ${c[1]} ${e[0]} ${e[1]}`} fill="none" stroke={C.goldBright} strokeWidth={7} strokeLinecap="round" strokeDasharray={1500} strokeDashoffset={1500 * (1 - t)} />
              {t >= 1 ? [0, 0.5].map((k) => {
                const u = (f / 45 + k + i * 0.2) % 1;
                const x = (1 - u) ** 2 * o[0] + 2 * (1 - u) * u * c[0] + u * u * e[0], y = (1 - u) ** 2 * o[1] + 2 * (1 - u) * u * c[1] + u * u * e[1];
                return <circle key={k} cx={x} cy={y} r={9} fill={dark ? '#FFF8EA' : C.sepia} />;
              }) : null}
              <circle cx={e[0]} cy={e[1]} r={12} fill={C.goldBright} opacity={t} />
              <text x={e[0] + d.off[0]} y={e[1] + d.off[1]} textAnchor="middle" fontFamily="DM Sans" fontWeight={800} fontSize={38} letterSpacing={3} fill={dark ? '#FFF8EA' : C.ink} opacity={t}>{d.n}</text>
            </g>
          );
        })}
        <circle cx={o[0]} cy={o[1]} r={26 + 8 * Math.sin(f / 5)} fill="none" stroke={C.goldBright} strokeWidth={4} />
        <circle cx={o[0]} cy={o[1]} r={15} fill={C.goldBright} />
        <text x={o[0] - 130} y={o[1] + 12} textAnchor="middle" fontFamily="DM Sans" fontWeight={800} fontSize={46} letterSpacing={3} fill={C.goldBright}>MAKKAH</text>
      </svg>
    </AbsoluteFill>
  );
};

const Icon: React.FC<{kind: 'shield' | 'basket' | 'valley' | 'camel'; at: number; c: string; size?: number}> = ({kind, at, c, size = 420}) => {
  const f = useCurrentFrame();
  const d = progress(f, at, 26);
  const st = (len: number) => ({fill: 'none', stroke: c, strokeWidth: 7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, strokeDasharray: len, strokeDashoffset: len * (1 - d)});
  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" style={{transform: `scale(${interpolate(progress(f, at, 10), [0, 1], [0.7, 1])})`}}>
      {kind === 'shield' && <><path d="M 0 -85 L 70 -60 V 0 C 70 45 35 72 0 88 C -35 72 -70 45 -70 0 V -60 Z" {...st(560)} /><path d="M -30 0 L -8 22 L 34 -24" {...st(120)} /></>}
      {kind === 'basket' && <><path d="M -80 -5 H 80 L 62 75 H -62 Z M -60 -5 C -60 -60 60 -60 60 -5" {...st(700)} />{[-40, -8, 26].map((x) => <circle key={x} cx={x} cy={-25} r={20} {...st(130)} />)}</>}
      {kind === 'valley' && <><path d="M -98 70 L -55 -30 L -25 20 L 0 -60 L 30 10 L 55 -25 L 98 70 Z" {...st(700)} /><path d="M -10 70 L 0 50 L 10 70" {...st(60)} /></>}
      {kind === 'camel' && <path d="M -80 60 V 20 C -80 0 -60 -10 -45 -10 C -35 -45 -15 -45 -5 -10 C 5 -40 25 -40 35 -10 H 55 V -40 L 70 -50 L 80 -40 L 75 -30 V 20 M -60 20 V 60 M 40 20 V 60 M 60 20 V 60" {...st(900)} />}
    </svg>
  );
};

// ------------------------------------------------------------------ the four styles
const ImageStyle: React.FC<{kind: 'eng' | 'paint'}> = ({kind}) => {
  const img = (i: number) => `ig2/security/${kind}${i}.png`;
  const blend = kind === 'eng';
  const S = (b: string) => span(b);
  const seq = (b: string, node: React.ReactNode) => <Sequence key={b} from={S(b).from} durationInFrames={S(b).to - S(b).from} name={b}>{node}</Sequence>;
  const dur = (b: string) => S(b).to - S(b).from;
  return (
    <>
      {seq('hook', <Push dur={dur('hook')} from={1} to={1.06}><Plate src={img(0)} dur={60} zoom={[1.2, 1.25]} blend={blend} /><AbsoluteFill style={{background: 'rgba(43,33,24,0.55)'}} /><Slam words={words('hook')} gold={['economy']} dark /></Push>)}
      {seq('tease', <><Plate src={img(1)} dur={dur('tease')} zoom={[1.25, 1.1]} blend={blend} /><AbsoluteFill style={{background: 'rgba(43,33,24,0.35)'}} /></>)}
      {seq('valley', <><Plate src={img(0)} dur={dur('valley')} zoom={[1.02, 1.22]} blend={blend} /><Tag text="TWO REQUESTS" at={wordAt('valley', 7)} top={300} /></>)}
      {seq('secure', <><Plate src={img(1)} dur={dur('secure')} zoom={[1.1, 1.25]} blend={blend} /><Stamp text="SECURITY" at={wordAt('secure', 4)} top={380} /></>)}
      {seq('fruits', <><Plate src={img(2)} dur={dur('fruits')} zoom={[1.1, 1.25]} pan={[0, 40]} blend={blend} /><Stamp text="PROSPERITY" at={wordAt('fruits', 5)} top={380} /></>)}
      {seq('venn', <><Plate src={img(2)} dur={dur('venn')} zoom={[1.25, 1.3]} blend={blend} /><AbsoluteFill style={{background: 'rgba(43,33,24,0.72)'}} /><Venn dark centerAt={wordAt('venn', 6)} /></>)}
      {seq('without', (
        <>
          <div style={{position: 'absolute', inset: 0, clipPath: 'inset(0 0 50% 0)'}}><Plate src={img(1)} dur={dur('without')} zoom={[1.1, 1.2]} blend={blend} /></div>
          <div style={{position: 'absolute', inset: 0, clipPath: 'inset(50% 0 0 0)'}}><Plate src={img(2)} dur={dur('without')} zoom={[1.1, 1.2]} blend={blend} /></div>
          <div style={{position: 'absolute', top: 956, left: 0, right: 0, height: 8, background: C.goldBright}} />
          <Stamp text="NO ECONOMY, NO SECURITY" at={wordAt('without', 4)} top={360} size={58} />
          <Stamp text="NO SECURITY, NO WEALTH" at={wordAt('without', 9)} top={1500} size={58} />
        </>
      ))}
      {seq('map', <Push dur={dur('map')}><Paper /><RouteMap dur={dur('map')} /></Push>)}
      {seq('caravan', <><Plate src={img(3)} dur={dur('caravan')} zoom={[1.05, 1.22]} pan={[30, -30]} blend={blend} /><Tag text="WINTER · SUMMER" at={wordAt('caravan', 7)} top={300} /></>)}
      {seq('loop', <Push dur={dur('loop')} from={1.06} to={1}><Plate src={img(0)} dur={60} zoom={[1.2, 1.25]} blend={blend} /><AbsoluteFill style={{background: 'rgba(43,33,24,0.6)'}} /><Slam words={words('loop')} gold={['food', 'safety.', 'survive.']} dark size={120} /></Push>)}
      <Captions hide={['hook', 'loop', 'map']} />
    </>
  );
};

const KineticStyle: React.FC = () => {
  const f = useCurrentFrame();
  const S = (b: string) => span(b);
  const seq = (b: string, node: React.ReactNode, dark = false) => (
    <Sequence key={b} from={S(b).from} durationInFrames={S(b).to - S(b).from} name={b}>
      <Push dur={S(b).to - S(b).from} from={1} to={1.07}>{dark ? <AbsoluteFill style={{backgroundColor: C.ink}} /> : <Paper />}{node}</Push>
    </Sequence>
  );
  const ring = (at: number, dark: boolean) => {
    const p = progress(f, at, 20);
    return <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><circle cx={540} cy={900} r={interpolate(p, [0, 1], [100, 470])} fill="none" stroke={C.goldBright} strokeWidth={4} opacity={(1 - p) * (dark ? 0.9 : 0.6)} /></svg>;
  };
  return (
    <>
      {seq('hook', <Slam words={words('hook')} gold={['economy.']} dark size={165} />, true)}
      {seq('tease', <Slam words={words('tease')} gold={['survive.']} size={110} />)}
      {seq('valley', <><Slam words={words('valley', 0, 3)} size={120} top={420} /><Slam words={words('valley', 6)} gold={['two']} size={96} top={1000} /></>)}
      {seq('secure', <><div style={{position: 'absolute', top: 360, width: 1080, textAlign: 'center', fontFamily: FE.sans, fontWeight: 800, fontSize: 60, letterSpacing: 16, color: C.goldBright}}>01</div><Slam words={words('secure', 1)} gold={['secure.']} dark size={140} /></>, true)}
      {seq('fruits', <><div style={{position: 'absolute', top: 360, width: 1080, textAlign: 'center', fontFamily: FE.sans, fontWeight: 800, fontSize: 60, letterSpacing: 16, color: C.gold}}>02</div><Slam words={words('fruits', 1)} gold={['fruits.']} size={120} /></>)}
      {seq('venn', <><Slam words={[{w: 'SECURITY', at: wordAt('venn', 2)}]} size={120} top={480} /><Slam words={[{w: '+', at: wordAt('venn', 3)}]} gold={['+']} size={140} top={680} /><Slam words={[{w: 'PROSPERITY', at: wordAt('venn', 4)}]} size={120} top={860} /><Slam words={[{w: '=', at: wordAt('venn', 5)}, {w: 'SURVIVAL', at: wordAt('venn', 7)}]} gold={['survival']} size={120} top={1080} />{ring(wordAt('venn', 7), false)}</>)}
      {seq('without', <><Slam words={words('without', 0, 5)} gold={['cannot']} dark size={92} top={430} /><div style={{position: 'absolute', top: 960, left: 140, right: 140, height: 6, background: C.goldBright, transform: `scaleX(${progress(f - S('without').from, wordAt('without', 5), 10)})`}} /><Slam words={words('without', 5)} gold={['never']} dark size={92} top={1040} /></>, true)}
      {seq('map', <><Slam words={words('map')} gold={['global']} size={120} />{ring(wordAt('map', 3), false)}</>)}
      {seq('caravan', <><Slam words={words('caravan', 0, 5)} size={96} top={420} /><Slam words={words('caravan', 5)} gold={['winter', 'summer.']} size={120} top={880} /></>)}
      {seq('loop', <Slam words={words('loop')} gold={['food.', 'safety.', 'survive.']} dark size={120} />, true)}
    </>
  );
};

const InfoStyle: React.FC = () => {
  const S = (b: string) => span(b);
  const dur = (b: string) => S(b).to - S(b).from;
  const seq = (b: string, node: React.ReactNode, dark = false) => (
    <Sequence key={b} from={S(b).from} durationInFrames={dur(b)} name={b}>
      <Push dur={dur(b)} from={1} to={1.06}>{dark ? <AbsoluteFill style={{backgroundColor: C.ink}} /> : <Paper />}{node}</Push>
    </Sequence>
  );
  const center = (n: React.ReactNode, top = 560) => <div style={{position: 'absolute', top, width: 1080, display: 'flex', justifyContent: 'center'}}>{n}</div>;
  return (
    <>
      {seq('hook', <><Slam words={words('hook')} gold={['economy.']} dark size={150} top={330} />{center(<Icon kind="valley" at={4} c={C.goldBright} size={380} />, 1000)}</>, true)}
      {seq('tease', <>{center(<Icon kind="shield" at={2} c={C.ink} size={360} />, 480)}<Tag text="WHICH NATIONS SURVIVE?" at={wordAt('tease', 4)} top={940} /></>)}
      {seq('valley', <>{center(<Icon kind="valley" at={2} c={C.ink} size={460} />, 420)}<Tag text="1 VALLEY · 2 REQUESTS" at={wordAt('valley', 7)} top={960} /></>)}
      {seq('secure', <>{center(<Icon kind="shield" at={2} c={C.goldBright} />, 420)}<Tag text="01 · SECURITY" at={wordAt('secure', 4)} top={960} /></>, true)}
      {seq('fruits', <>{center(<Icon kind="basket" at={2} c={C.ink} />, 420)}<Tag text="02 · PROSPERITY" at={wordAt('fruits', 5)} top={960} /></>)}
      {seq('venn', <Venn centerAt={wordAt('venn', 6)} />)}
      {seq('without', (
        <>
          <div style={{position: 'absolute', top: 330, left: 90, right: 90, display: 'flex', flexDirection: 'column', gap: 60}}>
            {[{t: 'ECONOMY ✕', r: 'SECURITY FALLS', k: 1}, {t: 'SECURITY ✕', r: 'WEALTH UNSAFE', k: 6}].map((row) => (
              <Row key={row.t} left={row.t} right={row.r} at={wordAt('without', row.k)} />
            ))}
          </div>
        </>
      ))}
      {seq('map', <RouteMap dur={dur('map')} />)}
      {seq('caravan', <>{center(<Icon kind="camel" at={2} c={C.ink} size={440} />, 400)}<div style={{position: 'absolute', top: 900, width: 1080, textAlign: 'center'}}><div dir="rtl" style={{fontFamily: FE.quran, fontSize: 80, color: C.ink}}>{uthmani('رِحۡلَةَ ٱلشِّتَآءِ وَٱلصَّيۡفِ')}</div></div><Tag text="QURAYSH 106:2" at={wordAt('caravan', 4)} top={300} /></>)}
      {seq('loop', <><Slam words={words('loop')} gold={['food.', 'safety.', 'survive.']} dark size={110} top={380} />{center(<div style={{display: 'flex', gap: 40}}><Icon kind="basket" at={wordAt('loop', 2)} c={C.goldBright} size={260} /><Icon kind="shield" at={wordAt('loop', 4)} c={C.goldBright} size={260} /></div>, 1060)}</>, true)}
      <Captions hide={['hook', 'loop']} top={1330} boxed />
    </>
  );
};

const Row: React.FC<{left: string; right: string; at: number}> = ({left, right, at}) => {
  const f = useCurrentFrame();
  const p = progress(f, at, 12), q = progress(f, at + 10, 12);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 24, opacity: p}}>
      <div style={{flex: 1, textAlign: 'center', fontFamily: FE.sans, fontWeight: 800, fontSize: 46, padding: '26px 10px', borderRadius: 16, background: C.ink, color: C.goldBright}}>{left}</div>
      <svg width={90} height={40}><path d="M 0 20 H 70 M 55 6 L 76 20 L 55 34" fill="none" stroke={C.gold} strokeWidth={6} strokeDasharray={120} strokeDashoffset={120 * (1 - q)} /></svg>
      <div style={{flex: 1, textAlign: 'center', fontFamily: FE.display, fontWeight: 700, fontSize: 54, color: C.sepia, opacity: q}}>{right}</div>
    </div>
  );
};

// ------------------------------------------------------------------ composition
const NAMES: Record<StyleName, string> = {engraving: 'A · ENGRAVED', painted: 'B · PAINTED', kinetic: 'C · KINETIC', infographic: 'D · INFOGRAPHIC'};

export const StyleSampleV2: React.FC<{style: StyleName}> = ({style}) => {
  const f = useCurrentFrame();
  const hook = span('hook');
  const shake = (at: number) => { const d = f - at; return d >= 0 && d < 8 ? Math.sin(d * 2.4) * (8 - d) * 1.6 : 0; };
  const k = shake(hook.from + 2) + shake(span('loop').from + 2);
  return (
    <AbsoluteFill style={{backgroundColor: C.paper, transform: `translate(${k}px, ${k * 0.6}px)`}}>
      {style === 'engraving' && <ImageStyle kind="eng" />}
      {style === 'painted' && <ImageStyle kind="paint" />}
      {style === 'kinetic' && <KineticStyle />}
      {style === 'infographic' && <InfoStyle />}
      <ProgressBar />
      <div style={{position: 'absolute', top: 44, left: 44, fontFamily: FE.sans, fontWeight: 800, fontSize: 24, letterSpacing: 4, color: C.ink, background: 'rgba(243,233,210,0.85)', padding: '6px 14px', borderRadius: 8}}>
        QURAN AND GLOBAL ECONOMY · EPI 3
      </div>
      <div style={{position: 'absolute', top: 44, right: 44, fontFamily: FE.sans, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: '#FFF8EA', background: C.sepia, padding: '6px 14px', borderRadius: 8}}>
        STYLE {NAMES[style]}
      </div>
      <Audio src={staticFile('ig2/sample/voice.wav')} />
      <Loop durationInFrames={20 * FPS}><Audio src={staticFile('ig/sfx/pulse.wav')} volume={0.2} /></Loop>
      <Sfx name="impact" at={hook.from + 1} volume={0.7} />
      <Sfx name="riser" at={span('tease').to - 40} volume={0.35} />
      {LINES.slice(2).map((l) => <Sfx key={l.beat} name={l.beat === 'loop' ? 'impact' : 'whoosh'} at={span(l.beat).from - 3} volume={l.beat === 'loop' ? 0.6 : 0.35} />)}
      <Sfx name="hit" at={span('secure').from + wordAt('secure', 4)} volume={0.45} />
      <Sfx name="hit" at={span('fruits').from + wordAt('fruits', 5)} volume={0.45} />
      <Sfx name="impact" at={span('venn').from + wordAt('venn', 6)} volume={0.5} />
      <Sfx name="strike" at={span('without').from + wordAt('without', 4)} volume={0.5} />
      <Sfx name="strike" at={span('without').from + wordAt('without', 9)} volume={0.5} />
      {[0, 1, 2, 3].map((i) => <Sfx key={i} name="ping" at={span('map').from + 8 + i * 6} volume={0.4} />)}
      <Sfx name="chime" at={span('caravan').from + wordAt('caravan', 5)} volume={0.35} />
    </AbsoluteFill>
  );
};
