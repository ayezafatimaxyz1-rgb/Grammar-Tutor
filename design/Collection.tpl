<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400&family=Jost:wght@300;400;500&display=swap">
  <style>
    body { margin: 0; }
    a { color: #B08D57; } a:hover { color: #E8D2A6; }
  </style>
</helmet>

<div style="width: 1440px; height: 1060px; box-sizing: border-box; background: #0B0A09; font-family: Jost, sans-serif; color: #E8E3DA; overflow: hidden;">

  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <radialGradient id="clSheen" cx="0.3" cy="0.18" r="0.62">
      <stop offset="0" stop-color="#FFF3E2" stop-opacity="0.26"/><stop offset="1" stop-color="#FFF3E2" stop-opacity="0"/>
    </radialGradient>
  </svg>

  <!-- nav -->
  <div style="height: 74px; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; box-sizing: border-box; border-bottom: 1px solid rgba(232,227,218,0.09);">
    <div style="display: flex; gap: 34px; font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(232,227,218,0.6);">
      <span>Men</span><span>Women</span><span>The Markhor</span>
    </div>
    <div style="font-family: 'Bodoni Moda', Didot, serif; font-size: 19px; letter-spacing: 0.46em; padding-left: 0.46em;">MARKHOOR</div>
    <div style="display: flex; gap: 22px;">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(232,227,218,0.62)" stroke-width="1.4"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21" stroke-linecap="round"/></svg>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(232,227,218,0.62)" stroke-width="1.4"><path d="M5 8h14l-1.2 12.5H6.2z" stroke-linejoin="round"/><path d="M8.6 8V6.2a3.4 3.4 0 0 1 6.8 0V8" stroke-linecap="round"/></svg>
    </div>
  </div>

  <div style="padding: 44px 48px 0;">

    <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 30px;">
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <h2 style="margin: 0; font-family: 'Bodoni Moda', Didot, serif; font-weight: 400; font-size: 46px; line-height: 1;">The whole line</h2>
        <div style="font-size: 12px; font-weight: 300; color: rgba(232,227,218,0.48);">Five jackets. Everything we make, on one page.</div>
      </div>
      <div style="display: flex; gap: 8px; align-items: center;">
        <div style="padding: 10px 20px; border: 1px solid #B08D57; background: rgba(176,141,87,0.1); color: #E8D2A6; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;">All 5</div>
        <div style="padding: 10px 20px; border: 1px solid rgba(232,227,218,0.16); color: rgba(232,227,218,0.6); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;">Women 3</div>
        <div style="padding: 10px 20px; border: 1px solid rgba(232,227,218,0.16); color: rgba(232,227,218,0.6); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;">Men 2</div>
        <div style="width: 1px; height: 26px; background: rgba(232,227,218,0.14); margin: 0 8px;"></div>
        <div style="display: flex; gap: 7px; align-items: center;">
          <div style="width: 17px; height: 17px; border-radius: 50%; background: #1A1614; outline: 1px solid rgba(232,227,218,0.22);"></div>
          <div style="width: 17px; height: 17px; border-radius: 50%; background: #4A3225; outline: 1px solid rgba(232,227,218,0.14);"></div>
          <div style="width: 17px; height: 17px; border-radius: 50%; background: #5A3A2E; outline: 1px solid rgba(232,227,218,0.14);"></div>
          <div style="width: 17px; height: 17px; border-radius: 50%; background: #5C1F2A; outline: 1px solid rgba(232,227,218,0.14);"></div>
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px;">
      <sc-for list="{{ products }}" as="p" hint-placeholder-count="5">
        <div style="display: flex; flex-direction: column; gap: 0;">

          <div style="{{ p.stage }}">
            <div style="{{ p.noStyle }}">{{ p.no }}</div>
            <sc-if value="{{ p.tag }}" hint-placeholder-val="{{ true }}">
              <div style="{{ p.tagStyle }}">{{ p.tag }}</div>
            </sc-if>

            <svg viewBox="0 0 320 300" width="252" height="236" style="filter: drop-shadow(0 20px 26px rgba(0,0,0,0.5));">
              <path d="M186,38 L248,58 C280,72 300,116 300,168 L298,206 L254,212 C256,180 250,140 236,112 L236,248 L84,248 L84,112 C70,140 64,180 66,212 L22,206 L20,168 C20,116 40,72 72,58 L134,38 C150,45 170,45 186,38 Z" fill="{{ p.hide }}"/>
              <path d="M236,112 L236,248 L160,248 L160,52 L184,38 L248,58 C280,72 300,116 300,168 L298,206 L254,212 C256,180 250,140 236,112 Z" fill="#000" fill-opacity="0.2"/>
              <rect x="84" y="220" width="152" height="28" fill="#000" fill-opacity="0.32"/>
              <path d="M21,180 L67,194 L66,212 L22,206 Z" fill="#000" fill-opacity="0.3"/>
              <path d="M299,180 L253,194 L254,212 L298,206 Z" fill="#000" fill-opacity="0.3"/>
              <rect x="157" y="56" width="6" height="166" fill="#000" fill-opacity="0.42"/>
              <line x1="160" y1="58" x2="160" y2="220" stroke="#D8C4A2" stroke-opacity="0.4" stroke-width="2.2" stroke-dasharray="1.6 3.4"/>
              <path d="M136,38 L160,56 L142,88 L120,50 Z" fill="#FFF" fill-opacity="0.07"/>
              <path d="M184,38 L160,56 L178,88 L200,50 Z" fill="#000" fill-opacity="0.16"/>
              <g fill="none" stroke="#000" stroke-opacity="0.32" stroke-width="1.3">
                <rect x="100" y="120" width="48" height="46" rx="2"/><rect x="98" y="114" width="52" height="15" rx="2"/>
                <rect x="172" y="120" width="48" height="46" rx="2"/><rect x="170" y="114" width="52" height="15" rx="2"/>
              </g>
              <ellipse cx="116" cy="94" rx="72" ry="54" fill="url(#clSheen)"/>
            </svg>
          </div>

          <div style="padding: 18px 2px 0; display: flex; flex-direction: column; gap: 9px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px;">
              <div style="font-family: 'Bodoni Moda', Didot, serif; font-size: 22px; color: #F3EFE8;">{{ p.name }}</div>
              <div style="display: flex; align-items: baseline; gap: 8px; white-space: nowrap;">
                <span style="font-size: 15px; color: #E8D2A6;">AED {{ p.price }}</span>
                <span style="font-size: 11px; color: rgba(232,227,218,0.26); text-decoration: line-through;">{{ p.was }}</span>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="font-size: 10.5px; letter-spacing: 0.13em; text-transform: uppercase; color: rgba(232,227,218,0.4);">{{ p.cat }}</div>
              <div style="display: flex; gap: 6px; align-items: center;">
                <sc-for list="{{ p.dots }}" as="d" hint-placeholder-count="2">
                  <div style="{{ d.style }}"></div>
                </sc-for>
              </div>
            </div>
          </div>

        </div>
      </sc-for>
    </div>
  </div>
</div>
</x-dc>

<script data-dc-script data-props='{"$preview":{"width":1440,"height":1060}}'>
class Component extends DCLogic {
  renderVals() {
    const dot = (c) => ({ style: 'width: 13px; height: 13px; border-radius: 50%; background: ' + c + '; outline: 1px solid rgba(232,227,218,0.2); outline-offset: 1px;' });

    const base = 'height: 330px; display: flex; align-items: center; justify-content: center; position: relative;';
    // dark plate for the coloured hides, bone plate for the blacks (which vanish on black)
    const dark = (tint) => base + 'background: radial-gradient(64% 58% at 50% 42%, ' + tint + ', rgba(11,10,9,0) 74%), rgba(232,227,218,0.025);'
      + 'border: 1px solid rgba(232,227,218,0.08);';
    const bone = base + 'background: radial-gradient(70% 62% at 46% 36%, #F4F1EB, #DED8CC 78%);'
      + 'border: 1px solid rgba(232,227,218,0.14);';

    const noD = 'position: absolute; top: 16px; left: 16px; font-size: 8.5px; letter-spacing: 0.22em; color: rgba(232,227,218,0.32);';
    const noL = 'position: absolute; top: 16px; left: 16px; font-size: 8.5px; letter-spacing: 0.22em; color: rgba(23,19,15,0.42);';
    const tagD = 'position: absolute; top: 14px; right: 14px; font-size: 8.5px; letter-spacing: 0.16em; padding: 5px 9px; border: 1px solid rgba(176,141,87,0.6); color: #E8D2A6;';
    const tagL = 'position: absolute; top: 14px; right: 14px; font-size: 8.5px; letter-spacing: 0.16em; padding: 5px 9px; border: 1px solid rgba(23,19,15,0.3); color: rgba(23,19,15,0.72);';

    return {
      products: [
        { no: 'NO. 001', name: 'The Ridge',    cat: 'Women · Cropped lapel', price: '137', was: '199', hide: '#1A1614', tag: '',           dots: [dot('#1A1614')],                 stage: bone,                        noStyle: noL, tagStyle: tagL },
        { no: 'NO. 002', name: 'The Drift',    cat: 'Women · Bomber',        price: '49',  was: '287', hide: '#4A3225', tag: '8.7K SOLD',  dots: [dot('#4A3225'), dot('#1A1614')], stage: dark('rgba(176,141,87,0.15)'), noStyle: noD, tagStyle: tagD },
        { no: 'NO. 003', name: 'The Hunza',    cat: 'Men · Loose flap',      price: '74',  was: '423', hide: '#1F1B18', tag: '',           dots: [dot('#1F1B18'), dot('#5A3A2E')], stage: bone,                        noStyle: noL, tagStyle: tagL },
        { no: 'NO. 004', name: 'The Maillard', cat: 'Men · Double collar',   price: '97',  was: '482', hide: '#5A3A2E', tag: '4.9 ★', dots: [dot('#5A3A2E'), dot('#1A1614')], stage: dark('rgba(176,141,87,0.18)'), noStyle: noD, tagStyle: tagD },
        { no: 'NO. 005', name: 'The Ember',    cat: 'Women · Cropped zip',   price: '60',  was: '256', hide: '#5C1F2A', tag: '31K SOLD',   dots: [dot('#5C1F2A'), dot('#1A1614')], stage: dark('rgba(142,58,70,0.2)'),   noStyle: noD, tagStyle: tagD }
      ]
    };
  }
}
</script>
</body>
</html>
