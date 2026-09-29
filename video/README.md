# Grammar Detective: Why these nouns are uncountable

An editable [Remotion](https://www.remotion.dev) (React) project that renders:

* a 16:9 YouTube explainer, `out/video/main_16x9.mp4` (1920 × 1080, about 5.4 minutes)
* five vertical lessons for Instagram Reels / YouTube Shorts, `out/video/short{1-5}_*_9x16.mp4` (1080 × 1920), with burned-in captions

It also produces subtitles (`out/subtitles/*.srt`, `*.vtt`) and narration transcripts (`out/transcripts/*.txt`).

The scene-by-scene plan is in [`docs/storyboard.md`](docs/storyboard.md).

## How it fits together

| File | What it holds |
|---|---|
| `src/script.json` | **Single source of truth**: narration text for every scene and Short beat, scene names, pauses. |
| `public/audio/*.mp3` | Narration clips (ElevenLabs, voice “Alice”, British English). One clip per scene/beat. |
| `scripts/prepare.py` | Measures each clip, finds real pauses, estimates when each word is spoken, then writes `src/timings.json`, subtitles, transcripts and the quiet sound effects in `public/sfx/`. |
| `src/timing.tsx` | `useCue("phrase")` turns a phrase in the narration into a frame number, so animations stay synced to the words. |
| `src/scenes/MainScenes.tsx` | The 19 scenes of the main video. |
| `src/scenes/ShortScenes.tsx` | The vertical lessons, recomposed for 9:16 rather than cropped. |
| `src/art.tsx`, `src/scenes/shared.tsx` | Original vector drawings (furniture, gold, rice, knowledge map, task cards…). |
| `src/components.tsx` | Case-file tab, sentences with noun highlights, error strikes, agreement brackets and counter chips, captions. |
| `src/theme.ts` | Colours: warm paper, charcoal ink, red errors, green corrections, one accent per heading. |

## Editing

```bash
npm install
npm run studio          # live preview and timeline in the browser
```

* **Change wording on screen:** edit the scene component. Sentences use a small markup:
  `"The [furniture|nL] [is|vL] expensive."` where `n` highlights the noun, `v` colours the verb, `x` strikes an error,
  `g` marks a green quantity word, `L` joins tokens with an agreement bracket, and `c2` lands a counter chip “2” on the token.
* **Change narration:** edit `src/script.json`, replace the matching clip in `public/audio/` (same file name), then run
  `python3 scripts/prepare.py`. Scene lengths, animation cues, captions and subtitles all follow the new audio.
* **Change timing of an animation:** each scene keys its animations to phrases, for example `cue("two pieces")`; add an offset in
  seconds with `cue("two pieces", 0.5)`.
* **Burned-in captions on the main video:** set the `captions` prop of the `Main` composition to `true` (off by default; YouTube gets the `.srt`).

## Rendering

```bash
npm run render:all              # prepare + render every video
npm run render:all -- Short2    # one composition
```

Remotion downloads its own headless Chrome unless `REMOTION_BROWSER` points to one.

## Content notes

* “This house is made of **bricks**” (individual blocks) and “made of **brick**” (the material) are both shown as correct.
* The five headings are presented as ways of picturing these examples, not a test that sorts every noun. The video shows
  countable exceptions (*three ideas*, *three works of art*) and the overlap between MEASURED and MATERIAL.
* Furniture is never described as a single object; the four objects stay visible inside the FURNITURE label.
