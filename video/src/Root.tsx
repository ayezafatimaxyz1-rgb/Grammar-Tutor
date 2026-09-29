import React from "react";
import { Composition } from "remotion";
import { MainVideo, ShortVideo } from "./Video";
import { TIMINGS } from "./timing";

const total = (segs: { frames: number }[]) => segs.reduce((a, s) => a + s.frames, 0);

export const Root: React.FC = () => (
  <>
    <Composition id="Main" component={MainVideo} width={1920} height={1080} fps={TIMINGS.fps}
      durationInFrames={total(TIMINGS.main)} defaultProps={{ captions: false }} />
    {Object.keys(TIMINGS.shorts).map((id) => (
      <Composition key={id} id={`Short${id.slice(1)}`} component={ShortVideo} width={1080} height={1920} fps={TIMINGS.fps}
        durationInFrames={total(TIMINGS.shorts[id])} defaultProps={{ id, captions: true }} />
    ))}
  </>
);
