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

<div style="width: 1440px; height: 1100px; box-sizing: border-box; background: #0B0A09; font-family: Jost, sans-serif; color: #E8E3DA; position: relative; overflow: hidden;">

  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <linearGradient id="pdHide" x1="0.12" y1="0" x2="0.88" y2="1">
      <stop offset="0" stop-color="#8A5D46"/><stop offset="0.34" stop-color="#5A3A2E"/>
      <stop offset="0.68" stop-color="#3A2319"/><stop offset="1" stop-color="#5A3A2E"/>
    </linearGradient>
    <radialGradient id="pdSheen" cx="0.32" cy="0.2" r="0.6">
      <stop offset="0" stop-color="#FFE8D0" stop-opacity="0.34"/><stop offset="1" stop-color="#FFE8D0" stop-opacity="0"/>
    </radialGradient>
  </svg>

  <!-- nav -->
  <div style="height: 74px; display: flex; align-items: center; justify-content: space-between; padding: 0 56px; box-sizing: border-box; border-bottom: 1px solid rgba(232,227,218,0.09);">
    <div style="display: flex; gap: 34px; font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(232,227,218,0.6);">
      <span style="color: #E8D2A6;">Men</span><span>Women</span><span>The Markhor</span>
    </div>
    <div style="font-family: 'Bodoni Moda', Didot, serif; font-size: 19px; letter-spacing: 0.46em; padding-left: 0.46em;">MARKHOOR</div>
    <div style="display: flex; gap: 22px;">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(232,227,218,0.62)" stroke-width="1.4"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21" stroke-linecap="round"/></svg>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(232,227,218,0.62)" stroke-width="1.4"><path d="M5 8h14l-1.2 12.5H6.2z" stroke-linejoin="round"/><path d="M8.6 8V6.2a3.4 3.4 0 0 1 6.8 0V8" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 838px minmax(0, 1fr); height: 1026px;">

    <!-- ============ VIEWER STAGE ============ -->
    <div onMouseMove="{{ scrub }}" style="position: relative; border-right: 1px solid rgba(232,227,218,0.09); background: radial-gradient(56% 50% at 50% 42%, rgba(176,141,87,0.15), rgba(11,10,9,0) 70%); display: flex; align-items: center; justify-content: center; cursor: ew-resize; overflow: hidden;">

      <!-- angle rail -->
      <div style="position: absolute; left: 44px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 14px; align-items: flex-start;">
        <div style="display: flex; align-items: baseline; gap: 4px; margin-bottom: 12px;">
          <span style="font-family: 'Bodoni Moda', serif; font-size: 34px; color: #E8D2A6; line-height: 1;">{{ label }}</span>
          <span style="font-size: 11px; color: rgba(232,227,218,0.38);">/ 12</span>
        </div>
        <sc-for list="{{ ticks }}" as="t" hint-placeholder-count="12">
          <div onClick="{{ t.pick }}" style="height: 12px; display: flex; align-items: center; cursor: pointer;">
            <div style="{{ t.style }}"></div>
          </div>
        </sc-for>
      </div>

      <!-- ghosted neighbour frames -->
      <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; perspective: 1400px; pointer-events: none;">
        <div style="{{ ghostA }}">
          <svg viewBox="0 0 320 300" width="430" height="403">
            <path d="M186,38 L248,58 C280,72 300,116 300,168 L298,206 L254,212 C256,180 250,140 236,112 L236,248 L84,248 L84,112 C70,140 64,180 66,212 L22,206 L20,168 C20,116 40,72 72,58 L134,38 C150,45 170,45 186,38 Z" fill="#2A1C14"/>
          </svg>
        </div>
      </div>

      <!-- the jacket -->
      <div style="perspective: 1400px; position: relative;">
        <div style="{{ jacketStyle }}">
          <svg viewBox="0 0 320 300" width="470" height="441" style="display: block; filter: drop-shadow(0 34px 46px rgba(0,0,0,0.62));">
            <path d="M186,38 L248,58 C280,72 300,116 300,168 L298,206 L254,212 C256,180 250,140 236,112 L236,248 L84,248 L84,112 C70,140 64,180 66,212 L22,206 L20,168 C20,116 40,72 72,58 L134,38 C150,45 170,45 186,38 Z" fill="url(#pdHide)"/>
            <rect x="84" y="220" width="152" height="28" fill="#2C1B12" opacity="0.62"/>
            <g stroke="#1E120C" stroke-opacity="0.4" stroke-width="1.2">
              <path d="M96,220 V248 M112,220 V248 M128,220 V248 M144,220 V248 M160,220 V248 M176,220 V248 M192,220 V248 M208,220 V248 M224,220 V248"/>
            </g>
            <path d="M21,180 L67,194 L66,212 L22,206 Z" fill="#2C1B12" opacity="0.6"/>
            <path d="M299,180 L253,194 L254,212 L298,206 Z" fill="#2C1B12" opacity="0.6"/>
            <rect x="157" y="56" width="6" height="166" fill="#20140E" opacity="0.75"/>
            <line x1="160" y1="58" x2="160" y2="220" stroke="#C8B08A" stroke-opacity="0.5" stroke-width="2.4" stroke-dasharray="1.6 3.4"/>
            <path d="M136,38 L160,56 L142,88 L120,50 Z" fill="#6A4534" stroke="#2C1B12" stroke-opacity="0.45"/>
            <path d="M184,38 L160,56 L178,88 L200,50 Z" fill="#4E3226" stroke="#2C1B12" stroke-opacity="0.45"/>
            <g fill="none" stroke="#1E120C" stroke-opacity="0.5" stroke-width="1.4">
              <rect x="100" y="120" width="48" height="46" rx="2"/><rect x="98" y="114" width="52" height="15" rx="2" fill="#4A2E22" fill-opacity="0.5"/>
              <rect x="172" y="120" width="48" height="46" rx="2"/><rect x="170" y="114" width="52" height="15" rx="2" fill="#4A2E22" fill-opacity="0.5"/>
            </g>
            <ellipse cx="118" cy="96" rx="76" ry="58" fill="url(#pdSheen)"/>
          </svg>
        </div>
      </div>

      <!-- hint -->
      <div style="position: absolute; bottom: 116px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 12px; font-size: 9.5px; letter-spacing: 0.28em; color: rgba(232,227,218,0.46);">
        <svg width="26" height="9" viewBox="0 0 26 9" fill="none" stroke="rgba(176,141,87,0.85)" stroke-width="1.2"><path d="M1 4.5h24M21 1l4 3.5-4 3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>MOVE ACROSS TO TURN &middot; SCROLL ON THE LIVE SITE</span>
      </div>

      <!-- filmstrip -->
      <div style="position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px;">
        <sc-for list="{{ strip }}" as="s" hint-placeholder-count="6">
          <div style="{{ s.style }}">
            <svg viewBox="0 0 320 300" width="34" height="32" style="opacity: 0.85;">
              <path d="M186,38 L248,58 C280,72 300,116 300,168 L298,206 L254,212 C256,180 250,140 236,112 L236,248 L84,248 L84,112 C70,140 64,180 66,212 L22,206 L20,168 C20,116 40,72 72,58 L134,38 C150,45 170,45 186,38 Z" fill="#6B4735"/>
            </svg>
          </div>
        </sc-for>
      </div>
    </div>

    <!-- ============ DETAILS ============ -->
    <div style="padding: 62px 56px; box-sizing: border-box; display: flex; flex-direction: column; gap: 26px;">

      <div style="font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(232,227,218,0.34);">Men &nbsp;/&nbsp; Jackets &nbsp;/&nbsp; No. 004</div>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        <h1 style="margin: 0; font-family: 'Bodoni Moda', Didot, serif; font-weight: 400; font-size: 52px; line-height: 1.04; color: #F3EFE8;">The Maillard</h1>
        <div style="font-size: 13.5px; font-weight: 300; line-height: 1.7; color: rgba(232,227,218,0.56); max-width: 400px; text-wrap: pretty;">Double-layer collar, zip hand pockets, elasticated hem. Cut loose through the shoulder so it sits over a knit without pulling.</div>
      </div>

      <div style="display: flex; align-items: baseline; gap: 14px;">
        <span style="font-family: 'Bodoni Moda', serif; font-size: 30px; color: #E8D2A6;">AED 97.20</span>
        <span style="font-size: 14px; color: rgba(232,227,218,0.3); text-decoration: line-through;">482.99</span>
        <span style="font-size: 9.5px; letter-spacing: 0.16em; padding: 4px 9px; border: 1px solid rgba(92,31,42,0.9); color: #C88896;">79% OFF</span>
      </div>

      <div style="display: flex; align-items: center; gap: 10px; font-size: 11.5px; color: rgba(232,227,218,0.5);">
        <div style="display: flex; gap: 2px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#B08D57"><path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8z"/></svg>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#B08D57"><path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8z"/></svg>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#B08D57"><path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8z"/></svg>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#B08D57"><path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8z"/></svg>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#B08D57"><path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8z"/></svg>
        </div>
        <span>4.9</span><span style="color: rgba(232,227,218,0.24);">&bull;</span><span>167 sold</span>
      </div>

      <div style="height: 1px; background: rgba(232,227,218,0.1);"></div>

      <div style="display: flex; flex-direction: column; gap: 13px;">
        <div style="font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(232,227,218,0.42);">Colour &nbsp;&mdash;&nbsp; <span style="color: #E8D2A6;">Maillard Brown</span></div>
        <div style="display: flex; gap: 12px;">
          <div style="width: 40px; height: 40px; background: #5A3A2E; outline: 1px solid #B08D57; outline-offset: 3px;"></div>
          <div style="width: 40px; height: 40px; background: #1A1614; outline: 1px solid rgba(232,227,218,0.16); outline-offset: 3px;"></div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 13px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div style="font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(232,227,218,0.42);">Size (AE)</div>
          <div style="font-size: 10.5px; color: rgba(176,141,87,0.9);">Size guide</div>
        </div>
        <div style="display: flex; gap: 9px;">
          <div style="min-width: 58px; height: 46px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(232,227,218,0.18); font-size: 12.5px; color: rgba(232,227,218,0.66);">S</div>
          <div style="min-width: 58px; height: 46px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(232,227,218,0.18); font-size: 12.5px; color: rgba(232,227,218,0.66);">M</div>
          <div style="min-width: 58px; height: 46px; display: flex; align-items: center; justify-content: center; border: 1px solid #B08D57; background: rgba(176,141,87,0.12); font-size: 12.5px; color: #E8D2A6;">L</div>
          <div style="min-width: 58px; height: 46px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(232,227,218,0.18); font-size: 12.5px; color: rgba(232,227,218,0.66);">XL</div>
          <div style="min-width: 58px; height: 46px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(232,227,218,0.1); font-size: 12.5px; color: rgba(232,227,218,0.2); text-decoration: line-through;">XXL</div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 11px; margin-top: 4px;">
        <div style="height: 54px; display: flex; align-items: center; justify-content: center; background: #B08D57; color: #14100B; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 500;">Add to bag</div>
        <div style="height: 54px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(232,227,218,0.2); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(232,227,218,0.7);">Ask on WhatsApp</div>
      </div>

      <div style="display: flex; flex-direction: column; margin-top: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 17px 0; border-top: 1px solid rgba(232,227,218,0.1); font-size: 12px; color: rgba(232,227,218,0.72);">
          <span>Materials &amp; care</span><span style="color: rgba(176,141,87,0.8); font-size: 15px;">+</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 17px 0; border-top: 1px solid rgba(232,227,218,0.1); font-size: 12px; color: rgba(232,227,218,0.72);">
          <span>Fit &amp; measurements</span><span style="color: rgba(176,141,87,0.8); font-size: 15px;">+</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 17px 0; border-top: 1px solid rgba(232,227,218,0.1); border-bottom: 1px solid rgba(232,227,218,0.1); font-size: 12px; color: rgba(232,227,218,0.72);">
          <span>Delivery &mdash; 2 days across the UAE</span><span style="color: rgba(176,141,87,0.8); font-size: 15px;">+</span>
        </div>
      </div>

    </div>
  </div>
</div>
</x-dc>

<script data-dc-script data-props='{"$preview":{"width":1440,"height":1100}}'>
class Component extends DCLogic {
  constructor(p) { super(p); this.state = { i: 3 }; }

  renderVals() {
    const n = 12;
    const i = this.state.i;
    const set = (k) => this.setState({ i: Math.max(0, Math.min(n - 1, k)) });

    const ticks = [];
    for (let k = 0; k < n; k++) {
      const on = k === i;
      ticks.push({
        pick: () => set(k),
        style: 'width: ' + (on ? '30px' : '14px') + '; height: ' + (on ? '2px' : '1px')
             + '; background: ' + (on ? '#E8D2A6' : 'rgba(232,227,218,0.26)') + '; transition: all .18s ease;'
      });
    }

    // -70deg .. +70deg across the 12 frames
    const deg = -70 + (i / (n - 1)) * 140;
    const shift = -(deg / 70) * 16;

    const strip = [];
    for (let k = 0; k < 6; k++) {
      const on = Math.round(i / 2) === k;
      strip.push({
        style: 'width: 52px; height: 50px; display: flex; align-items: center; justify-content: center;'
             + 'border: 1px solid ' + (on ? '#B08D57' : 'rgba(232,227,218,0.14)') + ';'
             + 'background: ' + (on ? 'rgba(176,141,87,0.1)' : 'rgba(232,227,218,0.02)') + ';'
      });
    }

    return {
      label: String(i + 1).padStart(2, '0'),
      ticks: ticks,
      strip: strip,
      jacketStyle: 'transform: rotateY(' + deg.toFixed(1) + 'deg) translateX(' + shift.toFixed(1) + 'px);'
                 + 'transform-style: preserve-3d; transition: transform .34s cubic-bezier(.22,.61,.36,1);',
      ghostA: 'position: absolute; transform: rotateY(' + (deg * 0.55).toFixed(1) + 'deg) scale(1.1); opacity: .1;'
            + 'transition: transform .34s cubic-bezier(.22,.61,.36,1);',
      scrub: (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const p = (e.clientX - r.left) / r.width;
        set(Math.round(p * (n - 1)));
      }
    };
  }
}
</script>
</body>
</html>
