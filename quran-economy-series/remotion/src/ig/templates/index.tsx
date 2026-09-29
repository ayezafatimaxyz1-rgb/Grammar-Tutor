import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {geoDistance, geoEqualEarth, geoGraticule10, geoInterpolate, geoOrthographic, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import type {FeatureCollection, Geometry} from 'geojson';
import world from 'world-atlas/countries-110m.json';
import {Navy, Paper} from '../../components/Backdrop';
import {inOut, progress} from '../../components/motion';
import {uthmani} from '../../components/uthmani';
import {BADGE_COLORS, BADGE_TEXT, BadgeKind, C, FE, FPS, SAFE} from '../theme';
import {useCue, useScene} from '../sceneContext';
import {ICONS} from '../Icons';

const countries = feature(world as any, (world as any).objects.countries) as unknown as FeatureCollection<Geometry>;

/** Plays a sound effect at a scene-relative frame. */
export const Sfx: React.FC<{name: string; at: number; volume?: number}> = ({name, at, volume = 0.5}) => (
  <Sequence from={Math.max(0, Math.round(at))} durationInFrames={FPS * 4} name={`sfx ${name}`} layout="none">
    <Audio src={staticFile(`ig/sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

const rise = (f: number, at: number, dist = 26, dur = 16) => {
  const p = progress(f, at, dur);
  return {opacity: p, transform: `translateY(${(1 - p) * dist}px)`};
};

// ---------------------------------------------------------------- globe (present-day hook)
const PORTS: Record<string, [number, number]> = {
  shanghai: [121.5, 31.2], singapore: [103.8, 1.3], rotterdam: [4.5, 51.9], newyork: [-74, 40.7],
  santos: [-46.3, -23.9], jebelali: [55.0, 25.0], mumbai: [72.8, 19.0], durban: [31.0, -29.9], losangeles: [-118.2, 33.7],
};
const ROUTES: [string, string][] = [
  ['shanghai', 'rotterdam'], ['singapore', 'jebelali'], ['santos', 'rotterdam'], ['newyork', 'rotterdam'],
  ['mumbai', 'durban'], ['shanghai', 'losangeles'], ['jebelali', 'rotterdam'],
];

export const Globe: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const {scene} = useScene();
  const q = cue(2);
  const shrink = progress(f, q, 24);
  const r = 400 - 60 * shrink;
  const cy = 760 + 30 * shrink;
  const rot: [number, number, number] = [-40 - f * 0.18, -22, 0];
  const {land, grat, sphere, lines, project, center} = useMemo(() => {
    const proj = geoOrthographic().scale(r).translate([540, cy]).rotate(rot).clipAngle(90);
    const gp = geoPath(proj);
    return {
      land: countries.features.map((ft) => gp(ft) ?? ''),
      grat: gp(geoGraticule10()) ?? '',
      sphere: gp({type: 'Sphere'} as any) ?? '',
      lines: ROUTES.map(([a, b]) => ({a: PORTS[a], b: PORTS[b], d: gp({type: 'LineString', coordinates: [PORTS[a], PORTS[b]]} as any) ?? ''})),
      project: (p: [number, number]) => proj(p) as [number, number],
      center: [-rot[0], -rot[1]] as [number, number],
    };
  }, [f, r, cy]);
  const routesIn = progress(f, 10, 40);
  const legend = progress(f, cue(1), 14);
  const dots = (a: [number, number], b: [number, number], color: string, dir: 1 | -1, k: number) => {
    const interp = geoInterpolate(a, b);
    return [0, 0.25, 0.5, 0.75].map((o) => {
      let t = (f / 150 + o + k * 0.11) % 1;
      if (dir === -1) t = 1 - t;
      const p = interp(t) as [number, number];
      if (geoDistance(p, center) > Math.PI / 2 - 0.05) return null;
      const [x, y] = project(p);
      return <circle key={`${color}${o}`} cx={x} cy={y} r={dir === 1 ? 7 : 5} fill={color} opacity={routesIn} />;
    });
  };
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={sphere} fill="rgba(184,137,45,0.06)" stroke={C.gold} strokeOpacity={0.7} strokeWidth={2.5} />
        <path d={grat} fill="none" stroke={C.gold} strokeOpacity={0.18} strokeWidth={1} />
        {land.map((d, i) => <path key={i} d={d} fill="rgba(184,137,45,0.10)" stroke={C.ink} strokeOpacity={0.55} strokeWidth={0.9} />)}
        {lines.map((l, i) => (
          <g key={i}>
            <path d={l.d} fill="none" stroke={C.gold} strokeOpacity={0.6 * routesIn} strokeWidth={2} />
            {dots(l.a, l.b, C.gold, 1, i)}
            {dots(l.a, l.b, C.sepia, -1, i + 3)}
          </g>
        ))}
      </svg>
      <div style={{position: 'absolute', top: 1150, left: 0, width: 1080, display: 'flex', justifyContent: 'center', gap: 60, opacity: legend,
        fontFamily: FE.sans, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>
        <span style={{color: C.gold}}>● {scene.props.goodsLabel} →</span>
        <span style={{color: C.sepia}}>← {scene.props.moneyLabel} ●</span>
      </div>
      <div style={{position: 'absolute', top: 262, width: 1080, textAlign: 'center', fontFamily: FE.display, fontWeight: 700, fontSize: 78,
        lineHeight: 1.05, color: C.ink, ...rise(f, q)}}>
        {scene.props.question ?? 'Does the Qur\'an speak to this?'}
      </div>
      <Sfx name="ping" at={12} volume={0.5} />
      <Sfx name="swish" at={cue(1)} volume={0.4} />
      <Sfx name="pop" at={q} volume={0.5} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- title card
export const Title: React.FC = () => {
  const f = useCurrentFrame();
  const {ep} = useScene();
  const mapPath = useMemo(() => {
    const proj = geoEqualEarth().fitExtent([[40, 560], [1040, 1100]], {type: 'Sphere'} as any);
    return geoPath(proj)(countries as any) ?? '';
  }, []);
  const words = ['GLOBAL', 'ECONOMY'];
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.18 * progress(f, 0, 30)}}>
        <path d={mapPath} fill="none" stroke={C.gold} strokeWidth={1.2} />
      </svg>
      <div style={{position: 'absolute', top: 520, width: 1080, textAlign: 'center'}}>
        <div style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 40, letterSpacing: 16, color: C.gold, ...rise(f, 4)}}>QURAN AND</div>
        {words.map((w, i) => (
          <div key={w} style={{fontFamily: FE.display, fontWeight: 700, fontSize: 150, lineHeight: 0.98, color: C.ink, letterSpacing: 4, ...rise(f, 10 + i * 6, 40, 20)}}>
            {w}
          </div>
        ))}
        <svg width={420} height={40} style={{marginTop: 26, opacity: progress(f, 22, 14)}}>
          <line x1={0} y1={20} x2={170} y2={20} stroke={C.gold} strokeWidth={2} />
          <path d="M 210 4 L 216 14 L 226 20 L 216 26 L 210 36 L 204 26 L 194 20 L 204 14 Z" fill={C.gold} />
          <line x1={250} y1={20} x2={420} y2={20} stroke={C.gold} strokeWidth={2} />
        </svg>
        <div style={{marginTop: 30, display: 'inline-block', fontFamily: FE.sans, fontWeight: 800, fontSize: 34, letterSpacing: 8,
          padding: '12px 30px', border: `2.5px solid ${C.gold}`, borderRadius: 999, color: C.ink, ...rise(f, 26)}}>
          EPISODE {ep.number}
        </div>
        <div style={{marginTop: 34, fontFamily: FE.display, fontStyle: 'italic', fontWeight: 600, fontSize: 84, lineHeight: 1.05, color: C.sepia,
          padding: '0 60px', ...rise(f, 34)}}>
          {ep.title}
        </div>
        {ep.scenes[1]?.props?.subtitle ? (
          <div style={{marginTop: 40, padding: '0 90px', fontFamily: FE.sans, fontWeight: 700, fontSize: 32, lineHeight: 1.35, letterSpacing: 1, color: C.inkSoft, ...rise(f, 50)}}>
            {ep.scenes[1].props.subtitle}<br />{ep.scenes[1].props.subtitle2}
          </div>
        ) : null}
        {ep.scenes[1]?.props?.credit ? (
          <div style={{marginTop: 30, fontFamily: FE.display, fontStyle: 'italic', fontWeight: 600, fontSize: 36, color: C.gold, ...rise(f, useCue()(1))}}>
            {ep.scenes[1].props.credit}
          </div>
        ) : null}
      </div>
      <Sfx name="hit" at={8} volume={0.7} />
      <Sfx name="chime" at={30} volume={0.35} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- legend (how to watch)
export const Legend: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const {scene} = useScene();
  const {heading, items, footer, footerAt} = scene.props;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 300, width: 1080, textAlign: 'center', fontFamily: FE.display, fontWeight: 700, fontSize: 96, color: C.ink, ...rise(f, 4)}}>
        {heading}
      </div>
      <div style={{position: 'absolute', top: 470, left: 110, width: 860, textAlign: 'center', fontFamily: FE.sans, fontSize: 34, lineHeight: 1.35, color: C.inkSoft, ...rise(f, cue(1))}}>
        Every verse checked against the Arabic, a trusted translation and classical tafsir
      </div>
      {(scene.props.checks ?? []).map((c: any, i: number) => {
        const at = cue(c.at);
        const out = 1 - progress(f, cue(items[0].at) - 8, 12);
        return (
          <div key={c.label} style={{position: 'absolute', top: 660 + i * 110, left: 200, width: 700, display: 'flex', alignItems: 'center', gap: 28,
            fontFamily: FE.display, fontWeight: 700, fontSize: 60, color: C.ink, ...rise(f, at, 20, 12), opacity: progress(f, at, 12) * out}}>
            <span style={{display: 'grid', placeItems: 'center', width: 70, height: 70, borderRadius: '50%', background: C.teal, color: '#06201D', fontSize: 44, fontFamily: FE.sans}}>✓</span>
            {c.label}
            <Sfx name="tick" at={at} volume={0.6} />
          </div>
        );
      })}
      <div style={{position: 'absolute', top: 640, left: 110, width: 860, display: 'flex', flexDirection: 'column', gap: 26}}>
        {items.map((it: any, i: number) => {
          const at = cue(it.at);
          const c = BADGE_COLORS[it.kind as BadgeKind];
          return (
            <div key={it.kind} style={{display: 'flex', alignItems: 'center', gap: 26, ...rise(f, at, 20, 12)}}>
              <div style={{width: 360, textAlign: 'center', fontFamily: FE.sans, fontWeight: 800, fontSize: 26, letterSpacing: 2, padding: '16px 0', borderRadius: 999, background: c.bg, color: c.fg}}>
                {BADGE_TEXT[it.kind as BadgeKind]}
              </div>
              <div style={{fontFamily: FE.display, fontWeight: 600, fontSize: 44, color: C.ink}}>{it.note}</div>
              <Sfx name="tick" at={at} volume={0.6} />
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', top: 1090, left: 110, width: 860, textAlign: 'center', fontFamily: FE.sans, fontWeight: 700, fontSize: 32, color: C.coral, ...rise(f, cue(footerAt))}}>
        ✎ {footer}
      </div>
      <Sfx name="paper" at={2} volume={0.5} />
      <Sfx name="pop" at={cue(footerAt)} volume={0.5} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- split (deen / dunya)
export const Split: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const {scene} = useScene();
  const {heading, top, bottom, crackAt, question, questionAt} = scene.props;
  const crack = progress(f, cue(crackAt, 6), 20);
  const gap = crack * 22;
  const Top = ICONS[top.icon];
  const Bot = ICONS[bottom.icon];
  const zig = Array.from({length: 13}, (_, i) => `${i * 90},${960 + (i % 2 ? -18 : 18)}`).join(' ');
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 0 ${960 + gap}px 0)`}}><Paper /></div>
      <div style={{position: 'absolute', inset: 0, clipPath: `inset(${960 + gap}px 0 0 0)`}}><Paper /><AbsoluteFill style={{background: 'rgba(138,90,43,0.10)'}} /></div>
      <div style={{position: 'absolute', top: 262, width: 1080, textAlign: 'center', fontFamily: FE.display, fontWeight: 700, fontSize: 72, color: C.ink, ...rise(f, 4)}}>
        {heading}
      </div>
      <div style={{position: 'absolute', top: 380 - gap, width: 1080, display: 'flex', flexDirection: 'column', alignItems: 'center', ...rise(f, cue(top.at), 20)}}>
        <Top c={C.ink} draw={progress(f, cue(top.at), 40)} size={300} />
        <div style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 44, letterSpacing: 10, color: C.gold, marginTop: 6}}>{top.label}</div>
        <div style={{fontFamily: FE.display, fontWeight: 600, fontSize: 44, color: C.ink}}>{top.caption}</div>
      </div>
      <div style={{position: 'absolute', top: 1000 + gap, left: 80, width: 920, display: 'flex', alignItems: 'center', gap: 30, ...rise(f, cue(bottom.at), 20)}}>
        <Bot c={C.ink} draw={progress(f, cue(bottom.at), 40)} size={210} />
        <div>
          <div style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 44, letterSpacing: 10, color: C.sepia}}>{bottom.label}</div>
          <div style={{fontFamily: FE.display, fontWeight: 600, fontSize: 44, lineHeight: 1.1, color: C.ink}}>{bottom.caption}</div>
        </div>
      </div>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <polyline points={zig} fill="none" stroke={C.gold} strokeWidth={5} strokeDasharray={1300} strokeDashoffset={1300 * (1 - crack)} />
      </svg>
      <div style={{position: 'absolute', top: 925, width: 1080, display: 'flex', justifyContent: 'center', ...rise(f, cue(questionAt), 10)}}>
        <div style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 40, padding: '12px 34px', borderRadius: 999, background: C.ink, color: '#FFF8EA'}}>
          {question}
        </div>
      </div>
      <Sfx name="strike" at={cue(crackAt, 6)} volume={0.6} />
      <Sfx name="pop" at={cue(questionAt)} volume={0.5} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- ayah (Qur'anic text)
const Highlighted: React.FC<{text: string; phrase?: string; sweep: number}> = ({text, phrase, sweep}) => {
  if (!phrase || !text.includes(phrase)) return <>{text}</>;
  const [a, b] = text.split(phrase);
  return (
    <>
      {a}
      <span style={{backgroundImage: `linear-gradient(transparent 62%, rgba(212,166,74,0.55) 62%)`, backgroundSize: `${sweep * 100}% 100%`,
        backgroundRepeat: 'no-repeat', color: C.ink, fontWeight: 700}}>
        {phrase}
      </span>
      {b}
    </>
  );
};

export const Ayah: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const {scene} = useScene();
  const p = scene.props;
  const aAt = cue(p.arabicAt, 4);
  const reveal = progress(f, aAt, 40);
  const edge = 10;
  const pos = (1 - reveal) * (100 + edge) - edge;
  const mask = `linear-gradient(to left, #000 0%, #000 ${100 - pos - edge}%, transparent ${100 - pos}%)`;
  const Icon = p.icon ? ICONS[p.icon] : null;
  const hasTop = Boolean(p.kicker || Icon);
  const y0 = hasTop ? 470 : 360;
  const enAt = aAt + 24;
  return (
    <AbsoluteFill>
      {p.kicker ? (
        <div style={{position: 'absolute', top: 280, width: 1080, textAlign: 'center', fontFamily: FE.display, fontStyle: 'italic', fontWeight: 700, fontSize: 76, color: C.sepia, ...rise(f, cue(p.kickerAt))}}>
          {p.kicker}
        </div>
      ) : Icon ? (
        <div style={{position: 'absolute', top: 262, width: 1080, display: 'flex', justifyContent: 'center', opacity: progress(f, 2, 12)}}>
          <Icon c={C.ink} draw={progress(f, 2, 36)} size={190} />
        </div>
      ) : null}
      <div style={{position: 'absolute', top: y0, width: 1080, display: 'flex', justifyContent: 'center', ...rise(f, 6, 12)}}>
        <div style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 26, letterSpacing: 4, padding: '10px 24px', border: `2px solid ${C.gold}`, borderRadius: 999, color: C.gold}}>
          {p.ref.toUpperCase()}
        </div>
      </div>
      <div dir="rtl" lang="ar" style={{position: 'absolute', top: y0 + 80, left: 70, width: 940, textAlign: 'center', fontFamily: FE.quran, fontSize: p.arabic.length > 70 ? 64 : p.arabic.length > 38 ? 66 : 76, lineHeight: 1.75, color: C.ink, textWrap: 'balance' as any,
        WebkitMaskImage: mask, maskImage: mask}}>
        {uthmani(p.arabic)}
      </div>
      <div style={{position: 'absolute', top: y0 + 380, left: 90, width: 900, textAlign: 'center', fontFamily: FE.display, fontStyle: 'italic', fontWeight: 500, fontSize: 54, lineHeight: 1.22, color: C.inkSoft, ...rise(f, enAt, 16)}}>
        <Highlighted text={p.english} phrase={p.highlight} sweep={progress(f, Math.max(enAt + 30, cue(p.highlightAt ?? p.arabicAt, 30)), 24)} />
      </div>
      {p.note ? (
        <div style={{position: 'absolute', top: 1110, left: 90, width: 900, display: 'flex', justifyContent: 'center', ...rise(f, cue(p.noteAt), 14)}}>
          <div style={{fontFamily: FE.sans, fontWeight: 700, fontSize: 32, lineHeight: 1.3, padding: '14px 26px', borderRadius: 16, textAlign: 'center',
            background: BADGE_COLORS[(p.noteKind ?? 'tafsir') as BadgeKind].bg, color: BADGE_COLORS[(p.noteKind ?? 'tafsir') as BadgeKind].fg}}>
            {p.note}
          </div>
        </div>
      ) : null}
      <Sfx name="chime" at={aAt} volume={0.4} />
      {p.note ? <Sfx name="pop" at={cue(p.noteAt)} volume={0.45} /> : null}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- quote (hadith / scholar)
export const Quote: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const {scene} = useScene();
  const p = scene.props;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 300, width: 1080, display: 'flex', justifyContent: 'center', ...rise(f, 4)}}>
        <div style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 30, letterSpacing: 6, padding: '10px 28px', borderRadius: 999, background: C.sepia, color: '#FFF4E4'}}>
          {p.label.toUpperCase()}
        </div>
      </div>
      <div style={{position: 'absolute', top: 420, left: 110, width: 860, textAlign: 'center', fontFamily: FE.sans, fontSize: 36, lineHeight: 1.35, color: C.inkSoft, ...rise(f, 10)}}>
        {p.context}
      </div>
      <div style={{position: 'absolute', top: 640, left: 80, width: 920, textAlign: 'center', fontFamily: FE.display, fontStyle: 'italic', fontWeight: 700, fontSize: 88, lineHeight: 1.08, color: C.ink, ...rise(f, cue(p.quoteAt, 4), 30, 20)}}>
        {p.quote}
      </div>
      <div style={{position: 'absolute', top: 1040, width: 1080, textAlign: 'center', fontFamily: FE.sans, fontWeight: 700, fontSize: 30, letterSpacing: 2, color: C.gold, ...rise(f, cue(p.quoteAt, 20))}}>
        {p.cite}
      </div>
      <Sfx name="paper" at={2} volume={0.45} />
      <Sfx name="chime" at={cue(p.quoteAt, 4)} volume={0.3} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- correction
const Row: React.FC<{said: string; fix: string; at: number; top: number}> = ({said, fix, at, top}) => {
  const f = useCurrentFrame();
  const strike = progress(f, at, 12);
  return (
    <div style={{position: 'absolute', top, left: 90, width: 900}}>
      <div style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 24, letterSpacing: 4, color: C.inkSoft, ...rise(f, at - 30, 10)}}>THE NOTES SAID</div>
      <div style={{position: 'relative', display: 'inline-block', marginTop: 8, fontFamily: FE.display, fontWeight: 600, fontSize: 54, lineHeight: 1.12, color: strike > 0.5 ? 'rgba(43,33,24,0.45)' : C.ink, ...rise(f, at - 30, 10)}}>
        {said}
        <span style={{position: 'absolute', left: 0, top: '52%', height: 5, width: `${strike * 100}%`, background: C.coral}} />
      </div>
      <div style={{marginTop: 22, fontFamily: FE.sans, fontWeight: 800, fontSize: 24, letterSpacing: 4, color: C.teal, ...rise(f, at + 8, 10)}}>ACCURATE</div>
      <div style={{marginTop: 8, fontFamily: FE.display, fontWeight: 700, fontSize: 58, lineHeight: 1.1, color: C.ink, ...rise(f, at + 12, 14)}}>✓ {fix}</div>
      <Sfx name="strike" at={at} volume={0.6} />
    </div>
  );
};

export const Correction: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const {scene} = useScene();
  const p = scene.props;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 280, width: 1080, textAlign: 'center', fontFamily: FE.display, fontWeight: 700, fontSize: 96, color: C.coral, ...rise(f, 4)}}>
        Correction
      </div>
      <Row said={p.said} fix={p.fix} at={cue(p.fixAt, 10)} top={450} />
      {p.said2 ? <Row said={p.said2} fix={p.fix2} at={cue(p.fix2At, 10)} top={800} /> : null}
      <Sfx name="pop" at={4} volume={0.45} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- lens (three readings)
export const Lens: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const {scene} = useScene();
  const items = scene.props.items as {icon: string; label: string; sub?: string; at: number; focus?: boolean}[];
  const focusAt = cue(scene.props.focusAt ?? 1);
  const focus = progress(f, focusAt, 22);
  const xs = [220, 540, 860];
  const glide = progress(f, cue(0, 20), 40);
  const lensX = interpolate(focus, [0, 1], [interpolate(glide, [0, 1], [xs[0], xs[1]]), xs[2]]);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 290, width: 1080, textAlign: 'center', fontFamily: FE.display, fontWeight: 700, fontSize: 80, lineHeight: 1.05, color: C.ink, ...rise(f, 4)}}>
        {scene.props.heading ?? 'How we read the Qur\'an here'}
      </div>
      {items.map((it, i) => {
        const Icon = ICONS[it.icon];
        const dim = it.focus ? 1 : 1 - 0.55 * focus;
        const lit = Boolean(it.focus) && focus > 0.5;
        return (
          <div key={it.label} style={{position: 'absolute', top: 640, left: xs[i] - 150, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', ...rise(f, cue(it.at, i * 8), 20), opacity: dim * progress(f, cue(it.at, i * 8), 16)}}>
            <div style={{width: 220, height: 220, borderRadius: '50%', border: `3px solid ${lit ? C.gold : 'rgba(43,33,24,0.35)'}`, display: 'grid', placeItems: 'center',
              background: lit ? `rgba(184,137,45,${0.18 * focus})` : 'transparent'}}>
              <Icon c={lit ? C.gold : C.ink} draw={progress(f, cue(it.at, i * 8), 30)} size={150} />
            </div>
            <div style={{marginTop: 18, fontFamily: FE.sans, fontWeight: 800, fontSize: 38, color: lit ? C.gold : C.ink}}>{it.label}</div>
            {it.sub ? <div style={{fontFamily: FE.sans, fontSize: 24, color: C.inkSoft}}>{it.sub}</div> : null}
          </div>
        );
      })}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: progress(f, 20, 12)}}>
        <circle cx={lensX} cy={750} r={138} fill="none" stroke={C.sepia} strokeWidth={6} />
        <line x1={lensX + 98} y1={848} x2={lensX + 150} y2={900} stroke={C.sepia} strokeWidth={14} strokeLinecap="round" />
      </svg>
      <Sfx name="swish" at={focusAt} volume={0.5} />
      <Sfx name="pop" at={focusAt + 20} volume={0.5} />
    </AbsoluteFill>
  );
};


// ---------------------------------------------------------------- statement (what the notes say)
const GlobeGrid: React.FC<{draw: number}> = ({draw}) => (
  <svg width={260} height={260} viewBox="-100 -100 200 200">
    {[0, 1, 2].map((k) => <ellipse key={k} cx={0} cy={0} rx={80 - k * 30} ry={80} fill="none" stroke={C.gold} strokeWidth={3} strokeDasharray={520} strokeDashoffset={520 * (1 - draw)} />)}
    {[-40, 0, 40].map((y) => <line key={y} x1={-Math.sqrt(6400 - y * y)} y1={y} x2={Math.sqrt(6400 - y * y)} y2={y} stroke={C.gold} strokeWidth={3} opacity={draw} />)}
  </svg>
);
const Cave: React.FC<{draw: number}> = ({draw}) => (
  <svg width={300} height={220} viewBox="-150 -110 300 220">
    <path d="M -140 90 C -120 -20 -60 -95 0 -95 C 60 -95 120 -20 140 90 M -60 90 C -55 20 -30 -20 0 -20 C 30 -20 55 20 60 90 M -150 90 H 150" fill="none" stroke={C.ink} strokeWidth={3.5} strokeLinecap="round" strokeDasharray={1100} strokeDashoffset={1100 * (1 - draw)} />
  </svg>
);
export const Statement: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const {scene} = useScene();
  const p = scene.props;
  const lines = p.lines as {text: string; at: number; big?: boolean}[];
  const iconDraw = progress(f, 2, 40);
  return (
    <AbsoluteFill>
      {p.kicker ? (
        <div style={{position: 'absolute', top: 300, width: 1080, textAlign: 'center', fontFamily: FE.sans, fontWeight: 800, fontSize: 34, letterSpacing: 10, color: C.gold, ...rise(f, 4)}}>
          {p.kicker.toUpperCase()}
        </div>
      ) : p.icon ? (
        <div style={{position: 'absolute', top: 280, width: 1080, display: 'flex', justifyContent: 'center', opacity: progress(f, 2, 12)}}>
          {p.icon === 'cave' ? <Cave draw={iconDraw} /> : <GlobeGrid draw={iconDraw} />}
        </div>
      ) : null}
      <div style={{position: 'absolute', top: p.kicker ? 430 : 600, left: 80, width: 920, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, textAlign: 'center'}}>
        {lines.map((l, i) => (
          <div key={i} style={{fontFamily: FE.display, fontWeight: l.big ? 700 : 600, fontStyle: l.big ? 'italic' : 'normal', fontSize: l.big ? 104 : 66, lineHeight: 1.08,
            color: l.big ? C.sepia : C.ink, textWrap: 'balance' as any, ...rise(f, cue(l.at, 2), 30, 18)}}>
            {l.text}
            <Sfx name={l.big ? 'hit' : 'swish'} at={cue(l.at, 2)} volume={l.big ? 0.35 : 0.3} />
          </div>
        ))}
        <svg width={420} height={30} style={{opacity: progress(f, cue(lines[lines.length - 1].at, 20), 14)}}>
          <line x1={0} y1={15} x2={170} y2={15} stroke={C.gold} strokeWidth={2} />
          <path d="M 210 3 L 215 11 L 223 15 L 215 19 L 210 27 L 205 19 L 197 15 L 205 11 Z" fill={C.gold} />
          <line x1={250} y1={15} x2={420} y2={15} stroke={C.gold} strokeWidth={2} />
        </svg>
      </div>
      <Sfx name="paper" at={2} volume={0.4} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- outro
export const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const {ep} = useScene();
  const pulse = 1 + 0.04 * Math.sin((f / FPS) * Math.PI * 2 * 0.8) * progress(f, 40, 10);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 470, width: 1080, textAlign: 'center'}}>
        <div style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 34, letterSpacing: 12, color: C.gold, ...rise(f, 2)}}>NEXT · EPISODE {ep.number + 1}</div>
        <div style={{marginTop: 30, padding: '0 80px', fontFamily: FE.display, fontWeight: 700, fontSize: 96, lineHeight: 1.04, color: C.ink, ...rise(f, 8, 30, 20)}}>{ep.next}</div>
        <div style={{marginTop: 70, display: 'inline-block', opacity: progress(f, 30, 16), transform: `translateY(${(1 - progress(f, 30, 16)) * 26}px) scale(${pulse})`}}>
          <div style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 40, letterSpacing: 4, padding: '22px 56px', borderRadius: 999, background: C.gold, color: '#FFF8EA'}}>
            FOLLOW FOR EPI {ep.number + 1}
          </div>
        </div>
        <div style={{marginTop: 60, fontFamily: FE.sans, fontWeight: 700, fontSize: 26, letterSpacing: 6, color: C.inkSoft, ...rise(f, 40)}}>QURAN AND GLOBAL ECONOMY</div>
      </div>
      <Sfx name="riser" at={0} volume={0.35} />
      <Sfx name="hit" at={30} volume={0.5} />
    </AbsoluteFill>
  );
};

export type TemplateDef = {C: React.FC; bg: 'paper' | 'navy' | 'none'; headerDark: boolean; sourceDark: boolean};
export const TEMPLATES: Record<string, TemplateDef> = {
  globe: {C: Globe, bg: 'paper', headerDark: false, sourceDark: false},
  title: {C: Title, bg: 'paper', headerDark: false, sourceDark: false},
  legend: {C: Legend, bg: 'paper', headerDark: false, sourceDark: false},
  split: {C: Split, bg: 'none', headerDark: false, sourceDark: false},
  statement: {C: Statement, bg: 'paper', headerDark: false, sourceDark: false},
  ayah: {C: Ayah, bg: 'paper', headerDark: false, sourceDark: false},
  quote: {C: Quote, bg: 'paper', headerDark: false, sourceDark: false},
  lens: {C: Lens, bg: 'paper', headerDark: false, sourceDark: false},
  outro: {C: Outro, bg: 'paper', headerDark: false, sourceDark: false},
};
