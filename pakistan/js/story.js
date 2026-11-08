/* Story scenes: each era is a winding road with a picture for each event. Tap a picture to open it. */
(function () {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const S = (PAK.story = {});

  S.spots = (eraIdx, era) => PAK.scenes[eraIdx].spots.map(([t, trick]) => {
    const e = PAK.events.find((x) => x.title.startsWith(t) && x.date >= era.a.slice(0, 4) + "-01-01" && x.date <= (era.b.startsWith("2100") ? "9999" : era.b.slice(0, 4) + "-12-31"));
    return e ? { e, trick, key: PAK.illusKey(e) } : null;
  }).filter(Boolean);

  function road(spots, color) {
    const W = 360, STEP = 112, TOP = 46;
    const xs = (i) => (i % 2 ? 250 : 110);
    const H = TOP + spots.length * STEP + 20;
    let d = `M${W / 2} 8`, t = "", sky = "";
    spots.forEach((s, i) => { d += ` C${W / 2 + (i % 2 ? 60 : -60)} ${TOP + i * STEP - 30} ${xs(i) + (i % 2 ? -50 : 50)} ${TOP + i * STEP - 10} ${xs(i)} ${TOP + i * STEP + 40}`; });
    d += ` L${W / 2} ${H}`;
    spots.forEach((s, i) => {
      const x = xs(i), y = TOP + i * STEP;
      const lx = i % 2 ? x - 118 : x + 14;
      t += `<g class="hot" data-i="${i}" tabindex="0" role="button" aria-label="${esc(s.e.title)}">
        <g transform="translate(${x - 54} ${y - 6}) scale(.9)"><rect x="-6" y="-4" width="132" height="98" rx="14" fill="#fff" fill-opacity=".92" stroke="${color}" stroke-width="2"/>${PAK.motif(s.key, color)}</g>
        <circle cx="${x - 58}" cy="${y - 2}" r="13" fill="${color}"/><text x="${x - 58}" y="${y + 3}" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">${i + 1}</text></g>`;
      t += `<text x="${i % 2 ? 36 : 324}" y="${y + 28}" text-anchor="${i % 2 ? "start" : "end"}" font-size="22" font-weight="700" fill="${color}">${s.e.y}</text>`;
      const words = s.e.title.length > 20 ? [s.e.title.slice(0, s.e.title.lastIndexOf(" ", 20)), s.e.title.slice(s.e.title.lastIndexOf(" ", 20) + 1)] : [s.e.title];
      words.forEach((w, q) => (t += `<text x="${i % 2 ? 36 : 324}" y="${y + 46 + q * 14}" text-anchor="${i % 2 ? "start" : "end"}" font-size="12" fill="#333">${esc(w)}</text>`));
    });
    return `<svg class="scene" viewBox="0 0 ${W} ${H}" role="group" aria-label="Story road"><rect x="0" y="0" width="${W}" height="${H}" rx="18" fill="${color}" fill-opacity=".07"/><g filter="url(#pak-pencil)" stroke-linecap="round"><path d="${d}" fill="none" stroke="${color}" stroke-width="7" opacity=".25"/><path d="${d}" fill="none" stroke="${color}" stroke-width="2.4" stroke-dasharray="7 8"/></g>${t}</svg>`;
  }

  S.open = function (spot, color, eraIdx, i, spots) {
    const e = spot.e;
    let box = document.getElementById("sheet");
    if (box) box.remove();
    box = document.createElement("div");
    box.id = "sheet";
    box.className = "sheet-overlay";
    const prev = spots[i - 1], next = spots[i + 1];
    box.innerHTML = `<div class="sheet" role="dialog" aria-modal="true"><button class="sheet-x" aria-label="Close">&times;</button>
      <div class="sheet-pic">${PAK.illus(spot.key, color)}</div>
      <p class="eyebrow" style="color:${color}">${i + 1} of ${spots.length}</p><h2>${esc(e.title)}</h2>
      <p class="d"><b>${esc(PAK.fmt(e))}</b></p><p>${esc(e.text)}</p>
      <div class="trick"><b>Remember:</b> ${esc(spot.trick)}</div>
      <div class="pager">${prev ? `<button class="btn" data-go="${i - 1}">&larr; ${esc(prev.e.y)}</button>` : "<span></span>"}${next ? `<button class="btn" data-go="${i + 1}">${esc(next.e.y)} &rarr;</button>` : ""}</div></div>`;
    document.body.appendChild(box);
    const close = () => { box.remove(); document.removeEventListener("keydown", key); };
    const key = (ev) => ev.key === "Escape" && close();
    document.addEventListener("keydown", key);
    box.addEventListener("click", (ev) => {
      if (ev.target === box || ev.target.closest(".sheet-x")) return close();
      const g = ev.target.closest("[data-go]");
      if (g) { const n = +g.dataset.go; close(); S.open(spots[n], color, eraIdx, n, spots); }
    });
    box.querySelector(".sheet-x").focus();
  };

  S.page = function (app, eraIdx, ERAS) {
    const era = ERAS[eraIdx], spots = S.spots(eraIdx, era);
    app.innerHTML = `<p class="crumbs"><a href="#story">Story</a></p>
      <p class="eyebrow" style="color:${era.c}">Era ${eraIdx + 1} of ${ERAS.length} &middot; ${era.a.slice(0, 4)} to ${era.b.startsWith("2100") ? "now" : era.b.slice(0, 4)}</p>
      <h1>${esc(era.name)}</h1>
      <div class="oneline" style="--ec:${era.c}"><b>Learn this first:</b> ${esc(PAK.scenes[eraIdx].summary)}</div>
      <p class="lede">Follow the road from picture 1. Tap each picture to read it and see a trick to remember it.</p>
      ${road(spots, era.c)}
      <div class="pager">${eraIdx > 0 ? `<a class="btn" href="#era-${eraIdx - 1}">&larr; ${esc(ERAS[eraIdx - 1].name)}</a>` : "<span></span>"}${eraIdx < ERAS.length - 1 ? `<a class="btn" href="#era-${eraIdx + 1}">${esc(ERAS[eraIdx + 1].name)} &rarr;</a>` : ""}</div>
      <p><a class="btn" href="#quiz-era-${eraIdx}">Test yourself on this era</a> <a class="btn" href="#cards-${eraIdx}">Flashcards</a></p>`;
    app.querySelectorAll(".hot").forEach((g) => {
      const go = () => S.open(spots[+g.dataset.i], era.c, eraIdx, +g.dataset.i, spots);
      g.addEventListener("click", go);
      g.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), go()));
    });
  };

  S.index = function (app, ERAS) {
    app.innerHTML = `<p class="eyebrow">Story</p><h1>Seven eras, seven story roads</h1>
      <p class="lede">Each era is one picture road. Learn the one line, then walk the road.</p>
      <div class="cards">${ERAS.map((e, i) => `<a class="card" href="#era-${i}" style="border-left:6px solid ${e.c}"><span class="badge" style="color:${e.c}">${e.a.slice(0, 4)} to ${e.b.startsWith("2100") ? "now" : e.b.slice(0, 4)}</span><b>${esc(e.name)}</b><span class="t">${esc(PAK.scenes[i].summary)}</span></a>`).join("")}</div>`;
  };
})();
