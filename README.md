# Digital Whiteboard

A single file interactive whiteboard that runs in any modern browser, on desktop and on phones.
Open `index.html` and it works. No build step, no server, no dependencies.

## Features

**The board**
* The whole screen is the board, edge to edge, with no page frame and no grid
* Controls float on the board itself: tools down the right side, pages along the bottom
* The surface keeps going in every direction, so pan and zoom instead of running out of room
* Fullscreen with `F`, and the percentage button brings everything back into view

**Drawing**
* Pen for writing: a fine nib that thins and thickens with the speed of your hand, and is
  never turned into a shape
* Marker with 10 colours, 5 thicknesses and an opacity slider
* Highlighter that blends with whatever is underneath
* Eraser in two modes: erase ink (pixel eraser) or erase a whole object
* A library of 69 shapes across five groups: Basic (square, circle, polygons, cube, ring, cross…),
  Arrows (plain, double, dashed, block, chevron, elbow, curved, U turn, zigzag, wave), Symbols
  (stars, heart, cloud, moon, sun, lightning, tick, cross out…), Flowchart (start/end, document,
  database, decision, subprocess, off page…) and Callouts (speech and thought bubbles, banner,
  tag, frame, braces, brackets, table, number line). Square and circle stay perfectly square
  whichever way you drag, so no Shift key is needed on a touch screen. Any closed shape can be
  filled, and you can write on top of any of them with the pen.
* Text, double click any text to edit it again
* Shape recognition: draw a rough box, circle, triangle, diamond, arrow or line freehand and it
  is redrawn cleanly the moment you lift the pen. A box drawn almost square becomes a square, a
  nearly round circle becomes a circle, and a nearly level line becomes level. Handwriting, small
  marks, curves, checkmarks and scribbles are left exactly as drawn. Undo once to keep your
  original sketch. Toggle it in the marker panel or with `S`.
* Text boxes flow onto new lines as you type instead of running off in one long line, and a tap
  somewhere else starts the next one right there
* Select tool to move, resize and delete anything on the board
* Unlimited undo and redo per page
* Stylus only mode, so a resting palm does not draw on a tablet

**Pages**
* Next and back buttons plus numbered page chips along the bottom
* Add and delete pages, arrow keys also move between them

**Photos, videos and PDFs**
* Add a photo from the gallery or camera roll, a video, or a PDF, from one button
* Paste or drag and drop works too
* A video sits on the board with its own play button, and you can write on it while it plays
* A PDF becomes one board page per page, so you can annotate a worksheet or a handout. The first
  page appears straight away and the rest arrive while you are already writing.
* Document mode turns pages by scrolling, by a two finger swipe, or with the arrows at the
  edges of the board. It switches on by itself when you open a PDF.
* Drag to move, corner handles to resize, Del to remove
* Media is kept in the browser's own storage, so big files do not fill up the saved board.
  Saving a `.json` board file packs the media inside it, so the file opens on another device.

**Voice and recording**
* Record the whiteboard itself, or the whole screen on desktop
* Your voice is mixed in, with a live level meter while you record, so you can see it working
* Test my voice records three seconds and plays it back, before you commit to a recording
* Voice changer: Normal, Deep, High, Robot, Echo and Radio, applied as you record
* Voice notes: record just your voice and leave it on the board as something to tap and play.
  This works on a phone, where a screen recording usually cannot.
* If the microphone is blocked, the board says so and explains how to allow it, instead of
  quietly giving you a silent video
* The sound of a video playing on the board is recorded too
* Optional system/tab audio, pause and resume, live timer
* Preview when you stop, then download the video

**Theme**
* White board and black board, switched with one button or the `D` key
* Ink written with the default marker flips colour with the board so it stays readable.
  A colour you picked yourself is never changed.

**Other**
* Pinch to zoom and two finger pan on touch, `Ctrl` + scroll on desktop
* Everything autosaves in the browser, so a refresh does not lose work
* Export the current page or all pages as PNG, trimmed to what you actually drew, or save the whole board as a `.json` file you can open later

## Keyboard shortcuts

| Action | Key |
| --- | --- |
| Marker / Highlighter / Eraser | `P` / `M` / `E` |
| Shapes / Text / Select / Pan | `R` / `T` / `V` / `H` |
| Add photo, video or PDF | `I` |
| Undo / Redo | `Ctrl+Z` / `Ctrl+Y` |
| New page | `Ctrl+N` |
| Previous / next page | `←` / `→` |
| Fit the board to screen | `0` |
| Fullscreen | `F` |
| Tidy sketches into shapes | `S` |
| Black / white theme | `D` |
| Start or stop recording | `Ctrl+Shift+R` |
| Save page as PNG | `Ctrl+S` |

Tap a tool a second time to open its options panel.

## Opening it

* **Desktop:** double click `index.html`.
* **Phone or tablet:** put the file on any static host (GitHub Pages works: repository
  Settings, Pages, deploy from the `main` branch) and open the URL. Add it to the home screen
  for a full screen app.

When the board is embedded in a host that mediates file saving, it asks the host to save
exports and recordings; opened as a normal page it saves them itself.

Opening a PDF fetches a renderer from a CDN the first time, so that one feature needs an
internet connection. Everything else works offline.

Recording and microphone capture need a secure context, so use `https://` or `localhost`.
Screen capture of the whole screen is a desktop browser feature; on phones the whiteboard
records itself, which is what you usually want anyway.

## Browser support

Chrome, Edge, Firefox and Safari 15+. Video is saved as WebM, or MP4 on Safari.
