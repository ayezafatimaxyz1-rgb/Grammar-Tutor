# Teaching Studio

A browser whiteboard built for people who explain things on video: teachers, tutors, course
creators and faceless educational channels. It is not a brainstorming board. Everything in it
serves one workflow.

**Write → explain → animate → replay → export**

The project is not a recording of a lesson. It *is* the lesson: every stroke keeps the moment and
the speed it was drawn, so the board can play the whole explanation back, follow it with a camera,
and turn it into a video.

Open `index.html`. No build step, no server, no dependencies.

## The layout

* **Top bar** — lesson title, undo, redo, zoom, save state, Record, Preview, Export
* **Left toolbar** — pen, marker, highlighter, eraser, shapes, text, media, camera frame, select, pan
* **Centre** — the infinite canvas with a video-safe frame drawn on it
* **Right panel** — properties for whatever you are doing: the tool, the selected object, or the scene
* **Bottom** — scenes, and a timeline with narration, writing, objects and camera tracks

## Recording a lesson

1. Press **Record**. Your voice is recorded and the lesson clock starts.
2. Write and explain. Every mark is timed against the narration.
3. Press stop, then **Preview**: the writing redraws itself in the order you wrote it, the
   narration plays with it, and the camera follows the work. 0.5×, 1×, 1.5× and 2×.
4. **Export → Lesson video** plays it through once and hands you the file, cropped to the video
   format you chose.

If a mark landed at the wrong moment, open the timeline and drag it.

## What is in this version

**Canvas** — infinite pan and zoom, mouse wheel, trackpad, pinch, two finger pan, `Space`+drag,
`Ctrl`+`+`/`-`/`0`, fit to content.

**Pen** — a nib whose width follows the speed of your hand, with pressure where the device reports
it. Stylus-only mode ignores a resting palm. Writing is never straightened or converted unless you
ask.

**Marker** — thicker ink that also tidies a rough box, circle, triangle, arrow or line into a clean
shape when you want it.

**Highlighter, eraser** (ink or whole object), **text** you can start anywhere by tapping or double
tapping, **69 shapes** across basic, arrows, symbols, flowchart and callouts.

**Handwriting to text** — print letters or numbers and they are typed out. 94% of characters over a
432 character test. Undo brings the writing back.

**Media** — photos, video and PDFs. A PDF becomes one scene per page, the first page arrives at once
and the rest stream in. Size one page and every page of that document follows.

**Scenes and frames** — scenes are the sections of the lesson; a camera frame is a position the
replay moves to. Rename, duplicate, reorder, delete.

**Video formats** — 16:9, 9:16, 1:1, 4:5, with the area outside the frame dimmed so you can see
what is in shot.

**Backgrounds** — plain, warm, dark, blackboard, grid, dots, lined, graph.

**Voice** — narration with a live level meter, a voice test, voice effects, and voice notes you can
leave on the board. A `?` button reports exactly why the microphone is not working when it is not.

**Focus mode** — hides everything but the board while you film.

**Autosave** with a save state in the top bar, and a project file that carries scenes, frames,
timings, narration and media so it opens on another machine.

## Keyboard

| Action | Key |
| --- | --- |
| Pen / marker / highlighter | `W` / `P` / `M` |
| Eraser / shapes / text | `E` / `R` / `T` |
| Select / pan | `V` / `H` or `Space` |
| Photo, video or PDF | `I` |
| Undo / redo | `Ctrl+Z` / `Ctrl+Y` |
| New scene | `Ctrl+N` |
| Previous / next scene | `←` / `→` |
| Zoom | `Ctrl` `+` / `-` / `0` |
| Fit to content | `0` |
| Focus mode | `F` |
| Board colour | `D` |
| Record | `Ctrl+Shift+R` |
| Tidy sketches into shapes | `S` |
| Writing into typed text | `Shift+H` |

## Not in this version

The spec describes much more than the first milestone. Deliberately left for later: connectors that
stay attached, the equation and graph and table tools, diagram blocks, the subject element
libraries, a layers panel, alignment and distribution, templates, brand settings, version history,
the AI assistant, and linking a tablet to a laptop. The MVP was built first, in full, because the
replay has to feel right before anything is stacked on top of it.

## Notes

PDF rendering fetches a renderer from a CDN the first time, so that one feature needs a connection.
Recording needs an `https://` address or `localhost`. A page that embeds the board can withhold the
microphone; press the `?` in the Record panel and it will tell you.
