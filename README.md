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
* Marker with 10 colours, 5 thicknesses and an opacity slider
* Highlighter that blends with whatever is underneath
* Eraser in two modes: erase ink (pixel eraser) or erase a whole object
* Shapes: rectangle, ellipse, line and arrow, filled or outlined (hold Shift for square/circle)
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

**Pages**
* Next and back buttons plus numbered page chips along the bottom
* Add and delete pages, arrow keys also move between them

**Photos**
* Add photo from the gallery or camera roll, or paste, or drag and drop
* Drag to move, corner handles to resize, Del to remove

**Recording with voice**
* Record the whiteboard itself, or the whole screen on desktop
* Microphone is mixed in, so you can narrate while you teach
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
| Add photo | `I` |
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

Recording and microphone capture need a secure context, so use `https://` or `localhost`.
Screen capture of the whole screen is a desktop browser feature; on phones the whiteboard
records itself, which is what you usually want anyway.

## Browser support

Chrome, Edge, Firefox and Safari 15+. Video is saved as WebM, or MP4 on Safari.
