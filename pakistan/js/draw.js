/* Pencil-sketch drawing helpers: wobbly lines, cartoon busts and the chain diagram. */
PAK = window.PAK || {};
(function () {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function rng(seed) {
    let h = 2166136261;
    for (const ch of String(seed)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) / 4294967296);
  }

  // One hidden filter shared by every drawing: it makes edges slightly hand-drawn.
  PAK.mountFilter = function () {
    if (document.getElementById("pak-defs")) return;
    const d = document.createElement("div");
    d.id = "pak-defs";
    d.innerHTML = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><filter id="pak-pencil" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/></filter></defs></svg>';
    document.body.appendChild(d);
  };

  // A cartoon bust. Not a portrait: a few features per person so each looks different.
  function bust(look, color, id) {
    const has = (k) => look.includes(k);
    const R = rng(id);
    const ink = "#2a2520", skin = ["#f1c9a5", "#e8b98f", "#f5d3b3", "#dcae83"][Math.floor(R() * 4)];
    const coat = has("uniform") ? "#6b7a3e" : has("tie") ? "#2f4468" : has("dupatta") ? "#c2255c" : has("sherwani") ? "#e6dcc6" : "#4b5563";
    let g = `<circle cx="50" cy="50" r="47" fill="${color}" fill-opacity=".16" stroke="${color}" stroke-width="1.5"/>`;
    g += `<path d="M16 96 Q18 70 50 68 Q82 70 84 96 A47 47 0 0 1 16 96Z" fill="${coat}" stroke="${ink}" stroke-width="1.6"/>`;
    if (has("tie")) g += `<path d="M42 70 L50 82 L58 70Z" fill="#fff" stroke="${ink}" stroke-width="1.2"/><path d="M48 72 L52 72 L53 90 L50 94 L47 90Z" fill="#a61e4d" stroke="${ink}" stroke-width="1"/>`;
    if (has("sherwani")) g += [76, 84, 92].map((y) => `<circle cx="50" cy="${y}" r="1.8" fill="${ink}"/>`).join("");
    if (has("uniform")) g += `<path d="M30 76 h10 M60 76 h10" stroke="#e0c15a" stroke-width="3"/>`;
    if (has("dupatta")) g += `<path d="M28 44 Q27 16 50 14 Q73 16 72 44 Q76 66 68 80 L32 80 Q24 66 28 44Z" fill="#fde7ef" stroke="${ink}" stroke-width="1.6"/>`;
    g += `<ellipse cx="50" cy="46" rx="${has("dupatta") ? 14 : 17}" ry="${has("dupatta") ? 17 : 20}" fill="${skin}" stroke="${ink}" stroke-width="1.6"/>`;
    if (!has("dupatta") && !has("cap") && !has("turban") && !has("uniform")) g += `<path d="M33 40 Q34 24 50 24 Q66 24 67 40 Q60 31 50 31 Q40 31 33 40Z" fill="${["#2a2520", "#59544d", "#8b8680"][Math.floor(R() * 3)]}" stroke="${ink}" stroke-width="1.2"/>`;
    if (has("cap")) g += `<path d="M32 36 Q50 8 68 36 Q50 28 32 36Z" fill="#5b5148" stroke="${ink}" stroke-width="1.6"/>`;
    if (has("turban")) g += `<ellipse cx="50" cy="29" rx="21" ry="12" fill="#efe9dc" stroke="${ink}" stroke-width="1.6"/><path d="M33 31 Q50 22 67 31" fill="none" stroke="${ink}" stroke-width="1"/>`;
    if (has("uniform")) g += `<path d="M31 36 Q50 8 69 36 L72 40 L28 40Z" fill="#6b7a3e" stroke="${ink}" stroke-width="1.6"/><path d="M31 36 H69" stroke="#e0c15a" stroke-width="3"/>`;
    const ey = 44;
    g += `<circle cx="44" cy="${ey}" r="1.8" fill="${ink}"/><circle cx="56" cy="${ey}" r="1.8" fill="${ink}"/>`;
    if (has("glasses")) g += `<circle cx="44" cy="${ey}" r="5.5" fill="none" stroke="${ink}" stroke-width="1.4"/><circle cx="56" cy="${ey}" r="5.5" fill="none" stroke="${ink}" stroke-width="1.4"/><path d="M49.5 ${ey} h1" stroke="${ink}" stroke-width="1.4"/>`;
    if (has("moustache")) g += `<path d="M42 54 Q50 49 58 54" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`;
    if (has("beard")) g += `<path d="M34 52 Q50 74 66 52 Q58 62 50 62 Q42 62 34 52Z" fill="${ink}" fill-opacity=".8"/>`;
    g += `<path d="M45 58 Q50 61 55 58" fill="none" stroke="${ink}" stroke-width="1.4" stroke-linecap="round"/>`;
    return g;
  }
  PAK.bustInner = bust;
  PAK.bust = (look, color, id, cls = "") => `<svg class="${cls}" viewBox="0 0 100 100" role="img" aria-label="Sketch of ${esc(id)}"><g filter="url(#pak-pencil)" stroke-linecap="round" stroke-linejoin="round">${bust(look, color, id)}</g></svg>`;

  const wrap = (t, n) => {
    const out = [];
    let line = "";
    String(t).split(" ").forEach((w) => {
      if ((line + " " + w).trim().length > n && line) { out.push(line); line = w; } else line = (line + " " + w).trim();
    });
    if (line) out.push(line);
    return out;
  };

  function box(R, x, y, w, h) {
    const j = (v) => v + (R() - 0.5) * 2.4;
    return `M${j(x + 8)} ${j(y)} L${j(x + w - 8)} ${j(y)} Q${j(x + w)} ${j(y)} ${j(x + w)} ${j(y + 8)} L${j(x + w)} ${j(y + h - 8)} Q${j(x + w)} ${j(y + h)} ${j(x + w - 8)} ${j(y + h)} L${j(x + 8)} ${j(y + h)} Q${j(x)} ${j(y + h)} ${j(x)} ${j(y + h - 8)} L${j(x)} ${j(y + 8)} Q${j(x)} ${j(y)} ${j(x + 8)} ${j(y)}Z`;
  }

  // items: [{id, name, years, color, look, href}] or {gap: "text", color}
  PAK.chain = function (items) {
    const W = 340, NW = 158, NH = 74, GAPH = 44, STEP = 38;
    const R = rng(items.length + "chain");
    let y = 14, d = "", t = "", lastBottom = null, side = 0;
    items.forEach((it, i) => {
      if (it.gap) {
        const lines = wrap(it.gap, 44);
        const h = 16 + lines.length * 15;
        const cx = W / 2, top = y;
        if (lastBottom) d += `<path class="dline" pathLength="1" d="M${lastBottom.x} ${lastBottom.y} C${lastBottom.x} ${top - 12} ${cx} ${top - 14} ${cx} ${top}" stroke="${it.color}" stroke-width="2.2" fill="none" stroke-dasharray="1"/>`;
        d += `<path d="${box(R, 20, top, W - 40, h)}" stroke="${it.color}" stroke-width="1.8" fill="${it.color}" fill-opacity=".08" stroke-dasharray="6 5"/>`;
        lines.forEach((ln, q) => (t += `<text x="${cx}" y="${top + 17 + q * 15}" text-anchor="middle" font-size="11.5" fill="#444">${esc(ln)}</text>`));
        lastBottom = { x: cx, y: top + h };
        y = top + h + STEP;
        return;
      }
      const left = side % 2 === 0;
      side++;
      const x = left ? 4 : W - NW - 4;
      const cx = x + NW / 2, top = y;
      if (lastBottom) d += `<path class="dline" pathLength="1" d="M${lastBottom.x} ${lastBottom.y} C${lastBottom.x} ${top - 16} ${cx} ${top - 22} ${cx} ${top}" stroke="${it.color}" stroke-width="2.4" fill="none"/><path d="M${cx - 5} ${top - 7} L${cx} ${top} L${cx + 5} ${top - 7}" stroke="${it.color}" stroke-width="2.2" fill="none"/>`;
      d += `<path d="${box(R, x, top, NW, NH)}" stroke="${it.color}" stroke-width="2.4" fill="#fff"/>`;
      const lines = wrap(it.name, 14).slice(0, 2);
      let body = `<g filter="url(#pak-pencil)"><g transform="translate(${x + 6} ${top + 13}) scale(.48)">${bust(it.look, it.color, it.id)}</g></g>`;
      lines.forEach((ln, q) => (body += `<text x="${x + 62}" y="${top + 26 + q * 14}" font-size="12.5" font-weight="700" fill="#1b2330">${esc(ln)}</text>`));
      body += `<text x="${x + 62}" y="${top + 26 + lines.length * 14 + 2}" font-size="11" fill="${it.color}" font-weight="700">${esc(it.years)}</text>`;
      if (it.tag) body += `<text x="${x + 62}" y="${top + 26 + lines.length * 14 + 15}" font-size="10" fill="#5a6577">${esc(it.tag)}</text>`;
      t += `<a class="node" href="${it.href}"><rect x="${x}" y="${top}" width="${NW}" height="${NH}" fill="transparent"/>${body}</a>`;
      lastBottom = { x: cx, y: top + NH };
      y = top + NH + STEP;
    });
    return `<svg class="diagram" viewBox="0 0 ${W} ${y - STEP + 14}" role="img" aria-label="Chain of leaders in order"><g filter="url(#pak-pencil)" stroke-linecap="round" stroke-linejoin="round">${d}</g>${t}</svg>`;
  };
})();
