import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { CaseVideo, SCENES } from "./Video";
import { Seg, TIMINGS } from "./timing";
import { ChatSample } from "./samples/Chat";
import { NotesSample } from "./samples/NotesAlive";
import { WhiteboardSample } from "./samples/Whiteboard";
import { QuizSample } from "./samples/Quiz";
import { VersusSample } from "./samples/Versus";
import { PaperCutSample } from "./samples/PaperCut";
import { TalkingSample } from "./samples/Talking";
import { DocSample } from "./samples/DocPOV";
import { Error1 } from "./wb/Error1";

const videos = (TIMINGS as unknown as { videos: Record<string, Seg[]> }).videos;
const total = (segs: { frames: number }[]) => segs.reduce((a, s) => a + s.frames, 0);
const wrap = (C: React.FC) => () => <AbsoluteFill><C /></AbsoluteFill>;

export const Root: React.FC = () => (
  <>
    {Object.keys(videos).filter((id) => SCENES[id]).map((id) => (
      <Composition key={id} id={`Case0${id.slice(1)}`} component={CaseVideo} width={1080} height={1920} fps={TIMINGS.fps}
        durationInFrames={total(videos[id])} defaultProps={{ id, captions: true }} />
    ))}
    {videos.wb && <Composition id="Error1" component={Error1} width={1920} height={1080} fps={TIMINGS.fps} durationInFrames={total(videos.wb)} />}
    {videos.sm && (
      <>
        <Composition id="SampleNotes" component={wrap(NotesSample)} width={1080} height={1920} fps={TIMINGS.fps} durationInFrames={total(videos.sm)} />
        <Composition id="SampleWhiteboard" component={wrap(WhiteboardSample)} width={1080} height={1920} fps={TIMINGS.fps} durationInFrames={total(videos.sm)} />
        <Composition id="SampleChat" component={wrap(ChatSample)} width={1080} height={1920} fps={TIMINGS.fps} durationInFrames={total(videos.sm)} />
        <Composition id="SampleQuiz" component={wrap(QuizSample)} width={1080} height={1920} fps={TIMINGS.fps} durationInFrames={total(videos.sm)} />
        <Composition id="SampleVersus" component={wrap(VersusSample)} width={1080} height={1920} fps={TIMINGS.fps} durationInFrames={total(videos.sm)} />
        <Composition id="SamplePaperCut" component={wrap(PaperCutSample)} width={1080} height={1920} fps={TIMINGS.fps} durationInFrames={total(videos.sm)} />
        <Composition id="SampleTalking" component={wrap(TalkingSample)} width={1080} height={1920} fps={TIMINGS.fps} durationInFrames={total(videos.sm)} />
        <Composition id="SampleDoc" component={wrap(DocSample)} width={1080} height={1920} fps={TIMINGS.fps} durationInFrames={total(videos.sm)} />
      </>
    )}
  </>
);
