<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=Jost:wght@300;400;500&display=swap">
  <style>
    body { margin: 0; }
    a { color: #B08D57; text-decoration: none; } a:hover { color: #E8D2A6; }
  </style>
</helmet>

<div style="width: 1440px; height: 900px; position: relative; overflow: hidden; background: #0B0A09; font-family: Jost, 'Helvetica Neue', sans-serif; color: #E8E3DA;">

  <div style="position: absolute; inset: 0; background: radial-gradient(44% 40% at 50% 34%, rgba(176,141,87,0.2) 0%, rgba(176,141,87,0.05) 44%, rgba(11,10,9,0) 74%);"></div>
  <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 300px; background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));"></div>

  <svg width="0" height="0" style="position: absolute;" aria-hidden="true">
    <filter id="mkGrain"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
  </svg>
  <div style="position: absolute; inset: 0; filter: url(#mkGrain); opacity: 0.15; mix-blend-mode: overlay; pointer-events: none;"></div>

  <!-- nav -->
  <div style="position: absolute; top: 0; left: 0; right: 0; height: 74px; display: flex; align-items: center; justify-content: space-between; padding: 0 56px; box-sizing: border-box; border-bottom: 1px solid rgba(232,227,218,0.09); z-index: 3;">
    <div style="display: flex; gap: 34px; align-items: center; font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(232,227,218,0.6);">
      <span>Men</span><span>Women</span><span>The Markhor</span>
    </div>
    <div style="font-family: 'Bodoni Moda', Didot, serif; font-size: 19px; letter-spacing: 0.46em; padding-left: 0.46em; color: #E8E3DA;">MARKHOOR</div>
    <div style="display: flex; gap: 22px; align-items: center;">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(232,227,218,0.62)" stroke-width="1.4"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21" stroke-linecap="round"/></svg>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(232,227,218,0.62)" stroke-width="1.4"><path d="M5 8h14l-1.2 12.5H6.2z" stroke-linejoin="round"/><path d="M8.6 8V6.2a3.4 3.4 0 0 1 6.8 0V8" stroke-linecap="round"/></svg>
    </div>
  </div>

  <!-- stacked hero -->
  <div style="position: absolute; top: 74px; left: 0; right: 0; bottom: 46px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; z-index: 2;">

    <div style="font-size: 10px; letter-spacing: 0.34em; text-transform: uppercase; color: rgba(176,141,87,0.92); margin-bottom: 22px;">Leather &middot; Est 2026 &middot; United Arab Emirates</div>

    <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
      <svg viewBox="-34 -272 96 286" width="94" height="280" style="display: block; overflow: visible; filter: drop-shadow(0 26px 40px rgba(0,0,0,0.7));"><!--HORN mk 0.64--></svg>
      <div style="width: 210px; height: 12px; border-radius: 50%; background: radial-gradient(closest-side, rgba(176,141,87,0.28), rgba(176,141,87,0)); margin-top: 2px;"></div>
    </div>

    <h1 style="margin: 26px 0 0; font-family: 'Bodoni Moda', Didot, serif; font-weight: 400; font-size: 76px; line-height: 1; letter-spacing: -0.012em; color: #F3EFE8; text-align: center;">Built for the climb</h1>

    <p style="margin: 20px 0 0; max-width: 448px; font-size: 14.5px; font-weight: 300; line-height: 1.76; color: rgba(232,227,218,0.6); text-align: center; text-wrap: pretty;">Five jackets, cut heavy and worn close. Named for the markhor, the horned goat that holds the cliff face when nothing else can.</p>

    <div style="margin-top: 30px; padding: 15px 32px; border: 1px solid rgba(176,141,87,0.85); color: #E8D2A6; font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase;">See the collection</div>
  </div>

  <!-- scroll cue -->
  <div style="position: absolute; left: 50%; bottom: 68px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 11px; z-index: 3;">
    <div style="width: 1px; height: 38px; background: linear-gradient(to bottom, rgba(176,141,87,0), rgba(176,141,87,0.9));"></div>
    <div style="font-size: 9px; letter-spacing: 0.34em; color: rgba(232,227,218,0.45);">SCROLL</div>
  </div>

  <!-- trust strip -->
  <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 46px; display: flex; align-items: center; justify-content: center; gap: 48px; border-top: 1px solid rgba(232,227,218,0.08); font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(232,227,218,0.4); z-index: 3; background: #0B0A09;">
    <span>Free shipping</span><span style="color: rgba(176,141,87,0.5);">&bull;</span><span>UAE delivery in 2 days</span><span style="color: rgba(176,141,87,0.5);">&bull;</span><span>Priced in AED</span>
  </div>

</div>
</x-dc>
</body>
</html>
