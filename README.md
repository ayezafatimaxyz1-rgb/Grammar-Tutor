# Digital Whiteboard

A single file interactive whiteboard that runs in any modern browser, on desktop and on phones.
Open `index.html` and it works. No build step, no server, no dependencies.

## Features

**The board**
* The whole screen is the board, edge to edge, with no page frame and no grid
* Controls float on the board itself: tools down the right side, pages along the bottom
* The surface keeps going in every direction, so pan and zoom instead of running out of room
* Fullscreen with `F`, and the percentage button brings everything back into view
* Everything is drawn at the full resolution of the screen, up to 3x, so ink, text and shapes are
  as sharp as the display can show them. Retina laptops, phones and 4K monitors all get their own
  true pixels rather than a scaled up picture, and photos and PDF pages are resampled with the
  browser's best filter so they stay clean when you zoom.

**Drawing**
* The three writing tools look like what they do: a fine nib for the pen, a fat nib with a thick
  stroke for the marker, and a band of colour across a line of text for the highlighter
* Pen for writing: a fine nib that thins and thickens with the speed of your hand, and is
  never turned into a shape
* Marker with 10 colours, 5 thicknesses and an opacity slider
* Highlighter that blends with whatever is underneath
* Eraser in two modes: erase ink (pixel eraser) or erase a whole object. Either way it goes through
  writing, shapes and text only: photos, videos and PDF pages are never rubbed out or cut into, so
  you can wipe your working off a worksheet and the worksheet is still there. To remove a file,
  pick it with the select tool and press Del.
* **Rub out everything written** clears the page of writing, shapes and text in one go and leaves
  the photos, videos and PDF pages behind, so the same worksheet is ready for the next take. It is
  in the eraser panel, or `Shift`+`E`, and one undo brings it all back. **Remove everything, files
  too** is next to it, and the bin in the tool rail does the same.
* A library of 107 shapes across five groups: Basic (square, circle, polygons, cube, ring, cross…),
  Arrows (plain, double, dashed, block, chevron, elbow, curved, U turn, zigzag, wave), Symbols
  (stars, heart, cloud, moon, sun, lightning, tick, cross out…), Flowchart (start/end, document,
  database, decision, subprocess, off page…) and Callouts (speech and thought bubbles, banner,
  tag, frame, braces, brackets, table, number line). Square and circle stay perfectly square
  whichever way you drag, so no Shift key is needed on a touch screen. Any closed shape can be
  filled, and you can write on top of any of them with the pen.
* Text in four styles — **Clean**, **Hand**, **Serif** and **Typed** — and four sizes at a tap,
  Small, Medium, Large and Huge, with a slider for anything in between. Pick a piece of text with
  the select tool and the panel shows its own style, so changing the style or the size there
  changes that text. Double click any text to edit it again.
* Shape recognition: draw a rough box, circle, triangle, diamond, arrow or line freehand and it
  is redrawn cleanly the moment you lift the pen. A figure drawn with even sides becomes an even
  one: an equilateral triangle, a square, a regular pentagon, a benzene hexagon. Circles and ovals
  stay curves. A box drawn almost square becomes a square, a
  nearly round circle becomes a circle, and a nearly level line becomes level. Handwriting, small
  marks, curves, checkmarks and scribbles are left exactly as drawn. Undo once to keep your
  original sketch. Toggle it in the marker panel or with `S`.
* Text has no box and no outline: tap anywhere, high or low, and type. Double tap on empty board
  with any tool in hand to start typing there without switching tools first. The line keeps going as far as you write
  and only Enter starts a new one. A tap somewhere else starts the next piece of text right there.
* Handwriting becomes typed text: print letters or numbers with the pen and they are typed out a
  moment after you stop. A to Z, 0 to 9, words and whole numbers. Ink that is not writing (a tick,
  an underline, an arrow, a scribble) is left alone, and undo brings your writing back. Auto works
  out letters from numbers by what you are writing; set Letters or Numbers when a lone mark could
  be an O or a zero.
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
  page appears straight away and the rest arrive while you are already writing. Pages are
  rasterised above screen resolution, so zooming into small print stays readable.
* Size or move one page of a document and every other page of it follows, each keeping its own
  shape, so flipping through never jumps.
* Whatever size you zoom a page or a photo to, next and back bring the following one up at the
  same size in the same place on screen. It works for pages of different shapes and for photos
  that are not the same size as each other.
* Document mode turns pages by scrolling, by a two finger swipe, or with the arrows at the
  edges of the board. It switches on by itself when you open a PDF.
* Drag to move, corner handles to resize, Del to remove
* Media is kept in the browser's own storage, so big files do not fill up the saved board.
  Saving a `.json` board file packs the media inside it, so the file opens on another device.

**Voice and recording**
* Record the whiteboard itself, or the whole screen on desktop
* Pick what the video is for and the board marks out the frame that goes into it:
  **YouTube** (16:9), **Reel** (9:16, which is also YouTube Shorts and TikTok), **Post** (1:1) or
  **Board** (whatever shape your screen is). Everything outside the frame is dimmed, so you can see
  at a glance what is in shot, and the frame never appears in the video itself. A phone held upright
  starts on Reel, a laptop starts on YouTube.
* The file comes out at the real size the site wants: 1920x1080 for YouTube, 1080x1920 for a Reel,
  1080x1080 for a post, with no black bars and nothing cropped off after you upload. 720p and Sharp
  give 1280x720 / 2560x1440 lying down and 720x1280 / 1440x2560 standing up.
* Whole-screen capture is cut to the same shape, taking the middle of the screen.
* Fit to view fits your work into the frame, not just onto the screen
* Videos are saved as MP4 where the browser can, because Instagram and TikTok will not take a WebM
  upload. Browsers that cannot record MP4 yet save WebM and the board says so.
* Quality is yours to pick: 720p, 1080p or Sharp. The picture is built from the same drawing the
  screen uses rather than redrawn at a smaller size, so the video is as sharp as the board, and
  the bitrate scales with the picture so thin ink stays thin instead of turning to mush.
* Your voice is mixed in, with a live level meter while you record, so you can see it working
* Test my voice records three seconds and plays it back, before you commit to a recording
* Voice changer: Normal, Deep, High, Robot, Echo and Radio, applied as you record
* A **?** button next to Test my voice reports exactly what is true: secure address, whether the
  surrounding page allows the microphone, the browser permission, how many microphones were found,
  and whether recording is supported. When a page embeds the board and withholds the microphone,
  no browser setting can help and the board now says so instead of sending you round in circles.
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

## If the microphone will not work

A page that embeds this board can withhold the microphone, and no setting on your side changes
that. Press the **?** beside Test my voice: if it says the surrounding page withholds it, open the
board from its own address instead. The quickest way is GitHub Pages: repository **Settings**,
**Pages**, deploy from the `main` branch, root folder. The board is then at
`https://<your-username>.github.io/<repository>/` with nothing embedding it, and the microphone,
recording and downloads all work normally. Voice notes often work even inside an embedding page.

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
