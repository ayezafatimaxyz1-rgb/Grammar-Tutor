import React, {useMemo} from 'react';
import {geoConicConformal, geoGraticule10, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import type {FeatureCollection, Geometry} from 'geojson';
import type {Topology} from 'topojson-specification';
import world from 'world-atlas/countries-50m.json';
import {AbsoluteFill, interpolate} from 'remotion';
import {useSceneFrame} from '../components/sceneTime';
import {Navy} from '../components/Backdrop';
import {inOut, progress} from '../components/motion';
import {SceneChrome} from '../components/Scene';
import {KineticHeading, UrduLine} from '../components/Type';
import {FPS, SCENES, TEXT} from '../data/pilot';
import {C, F} from '../theme';

// ISO 3166-1 numeric ids used by Natural Earth / world-atlas
const RUSSIA = '643';
const UKRAINE = '804';

// Export ports and importing cities (lon, lat). Routes are schematic, not volumes.
const ORIGINS: [number, number][] = [
  [30.73, 46.48], // Odesa
  [37.77, 44.72], // Novorossiysk
];
const DESTS: [number, number][] = [
  [31.24, 30.04], // Cairo
  [3.06, 36.75], // Algiers
  [10.18, 36.8], // Tunis
  [35.5, 33.89], // Beirut
  [44.2, 15.35], // Sana'a
  [46.7, 24.7], // Riyadh
];

const W = 1920;
const H = 1080;
const MAP_BOX: [[number, number], [number, number]] = [[640, 190], [1790, 880]];

const countries = feature(world as unknown as Topology, (world as any).objects.countries) as unknown as FeatureCollection<Geometry, {name: string}>;

export const S4Map: React.FC<{subtitles: boolean}> = ({subtitles}) => {
  const f = useSceneFrame();
  const spec = SCENES.map;

  const {path, project, shapes, graticule} = useMemo(() => {
    const projection = geoConicConformal().parallels([30, 50]).rotate([-28, 0]);
    projection.fitExtent(MAP_BOX, {
      type: 'MultiPoint',
      coordinates: [[-12, 12], [62, 12], [-12, 56], [62, 56], [28, 60]],
    } as any);
    const gp = geoPath(projection);
    return {
      path: gp,
      project: (p: [number, number]) => projection(p) as [number, number],
      shapes: countries.features.map((ft) => ({id: String(ft.id), d: gp(ft) ?? ''})),
      graticule: gp(geoGraticule10()) ?? '',
    };
  }, []);

  const mapIn = progress(f, 0, 30);
  const highlight = progress(f, 5.6 * FPS, 24);
  const arcs = progress(f, 7.4 * FPS, 50);
  const counter = Math.round(interpolate(progress(f, 6.0 * FPS, 60), [0, 1], [0, TEXT.map.statValue]));
  const strike = progress(f, 16.8 * FPS, 14);
  const verdict = progress(f, 17.6 * FPS, 16);
  const claimIn = progress(f, 0.5 * FPS, 16);

  // quadratic arcs between origin and destination in screen space
  const routes = DESTS.flatMap((d, i) => {
    const o = project(ORIGINS[i % 2]);
    const e = project(d);
    const mx = (o[0] + e[0]) / 2;
    const my = (o[1] + e[1]) / 2;
    const dx = e[0] - o[0];
    const dy = e[1] - o[1];
    const bend = 0.22;
    const c: [number, number] = [mx - dy * bend, my + dx * bend];
    return [{o, e, c, i}];
  });
  const qPoint = (o: number[], c: number[], e: number[], t: number) => [
    (1 - t) ** 2 * o[0] + 2 * (1 - t) * t * c[0] + t ** 2 * e[0],
    (1 - t) ** 2 * o[1] + 2 * (1 - t) * t * c[1] + t ** 2 * e[1],
  ];

  const label = (text: string, ll: [number, number], size: number, color: string, at: number, dy = 0) => {
    const [x, y] = project(ll);
    return (
      <div
        key={text}
        dir="rtl"
        style={{
          position: 'absolute', left: x - 160, top: y - 34 + dy, width: 320, textAlign: 'center',
          fontFamily: F.urdu, fontSize: size, lineHeight: 2, color, opacity: progress(f, at, 16),
          textShadow: `0 0 10px ${C.navy}, 0 0 4px ${C.navy}`,
        }}
      >
        {text}
      </div>
    );
  };

  return (
    <Navy>
      <SceneChrome spec={spec} subtitles={subtitles} dark>
        <svg width={W} height={H} style={{position: 'absolute', inset: 0, opacity: mapIn}}>
          <defs>
            <clipPath id="mapclip">
              <rect x={MAP_BOX[0][0] - 30} y={MAP_BOX[0][1] - 20} width={MAP_BOX[1][0] - MAP_BOX[0][0] + 60} height={MAP_BOX[1][1] - MAP_BOX[0][1] + 40} rx={6} />
            </clipPath>
          </defs>
          <g clipPath="url(#mapclip)">
            <path d={graticule} fill="none" stroke={C.navyLine} strokeWidth={0.8} />
            {shapes.map(({id, d}) => {
              const hot = id === RUSSIA || id === UKRAINE;
              return (
                <path
                  key={id + d.length}
                  d={d}
                  fill={hot ? `rgba(47,181,168,${0.08 + 0.32 * highlight})` : 'rgba(217,236,239,0.06)'}
                  stroke={hot ? C.teal : 'rgba(217,236,239,0.42)'}
                  strokeWidth={hot ? 1 + highlight : 0.7}
                />
              );
            })}
            {routes.map(({o, e, c, i}) => {
              const len = 1000;
              const p = Math.max(0, Math.min(1, arcs * 1.4 - i * 0.07));
              return (
                <g key={i}>
                  <path
                    d={`M ${o[0]} ${o[1]} Q ${c[0]} ${c[1]} ${e[0]} ${e[1]}`}
                    fill="none" stroke={C.goldBright} strokeWidth={1.8} opacity={0.85}
                    strokeDasharray={len} strokeDashoffset={len * (1 - p)}
                  />
                  {p >= 1
                    ? [0, 0.33, 0.66].map((k) => {
                        const t = (f / 90 + k + i * 0.13) % 1;
                        const [x, y] = qPoint(o, c, e, t);
                        return <circle key={k} cx={x} cy={y} r={4.5} fill={C.goldBright} opacity={Math.min(t / 0.1, (1 - t) / 0.1, 1)} />;
                      })
                    : null}
                  <circle cx={e[0]} cy={e[1]} r={4} fill="none" stroke={C.goldBright} strokeWidth={1.4} opacity={p} />
                </g>
              );
            })}
            {ORIGINS.map((o) => {
              const [x, y] = project(o);
              return <circle key={x} cx={x} cy={y} r={6} fill={C.teal} opacity={highlight} />;
            })}
          </g>
          <rect x={MAP_BOX[0][0] - 30} y={MAP_BOX[0][1] - 20} width={MAP_BOX[1][0] - MAP_BOX[0][0] + 60} height={MAP_BOX[1][1] - MAP_BOX[0][1] + 40} rx={6} fill="none" stroke="rgba(217,236,239,0.25)" />
        </svg>

        {label(TEXT.map.labels.russia, [44, 55], 34, C.ice, 5.8 * FPS)}
        {label(TEXT.map.labels.ukraine, [31.5, 49.2], 26, C.ice, 5.8 * FPS)}
        {label(TEXT.map.labels.blackSea, [33.2, 42.9], 20, 'rgba(217,236,239,0.7)', 2 * FPS)}
        {label(TEXT.map.labels.northAfrica, [9, 29], 26, C.goldBright, 8.4 * FPS)}
        {label(TEXT.map.labels.middleEast, [45, 29.5], 26, C.goldBright, 8.8 * FPS)}

        <div dir="rtl" style={{position: 'absolute', left: MAP_BOX[0][0] - 10, top: MAP_BOX[1][1] - 16, width: 520, fontFamily: F.urdu, fontSize: 18, lineHeight: 2, color: 'rgba(217,236,239,0.6)', opacity: arcs, textAlign: 'left'}}>
          {TEXT.map.schematic}
        </div>

        <div style={{position: 'absolute', top: 168, left: 110, width: 480}}>
          <KineticHeading text={TEXT.map.heading} start={0} size={42} color={C.ice} style={{textAlign: 'right'}} />
        </div>

        {/* Left panel: claim → evidence → verdict */}
        <div style={{position: 'absolute', left: 110, top: 330, width: 480}}>
          <div
            dir="rtl"
            style={{
              fontFamily: F.urdu, fontSize: 25, lineHeight: 2.1, color: C.ice, opacity: claimIn * (1 - 0.45 * highlight),
              borderInlineStart: `3px solid ${C.coral}`, paddingInlineStart: 16,
            }}
          >
            {TEXT.map.claim}
          </div>
          <div style={{marginTop: 30, opacity: progress(f, 5.8 * FPS, 16)}}>
            <UrduLine text={TEXT.map.stat} start={5.8 * FPS} size={24} color={C.ice} style={{textAlign: 'right'}} />
            <div dir="ltr" style={{fontFamily: F.naskh, fontWeight: 700, fontSize: 116, lineHeight: 1.15, color: C.teal, textAlign: 'right'}}>
              {counter}%
            </div>
            <UrduLine text={TEXT.map.statNote} start={8 * FPS} size={20} color="rgba(217,236,239,0.7)" style={{textAlign: 'right'}} />
          </div>
          <div dir="rtl" style={{marginTop: 26, display: 'flex', gap: 26, alignItems: 'center', justifyContent: 'flex-start', opacity: progress(f, 16.6 * FPS, 12)}}>
            <span style={{position: 'relative', fontFamily: F.urdu, fontSize: 40, lineHeight: 2, color: 'rgba(217,236,239,0.55)'}}>
              {TEXT.map.verdictStruck}
              <span style={{position: 'absolute', right: 0, top: '55%', height: 3, width: `${strike * 100}%`, background: C.coral}} />
            </span>
            <span style={{fontFamily: F.urdu, fontSize: 44, fontWeight: 700, lineHeight: 2, color: C.teal, opacity: verdict, transform: `translateY(${(1 - verdict) * 10}px)`}}>
              {TEXT.map.verdict}
            </span>
          </div>
        </div>
      </SceneChrome>
    </Navy>
  );
};
