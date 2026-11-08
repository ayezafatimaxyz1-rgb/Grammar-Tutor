(function () {
  const app = document.getElementById("app");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const KINDS = { pol: "Politics", mil: "War and army", law: "Constitution and courts", eco: "Economy", for: "Foreign affairs", soc: "Society", dis: "Disasters" };
  const ERAS = [
    { name: "Early parliamentary years", a: "1947-08-14", b: "1958-10-07", c: "#2f9e44" },
    { name: "Ayub and Yahya (martial law)", a: "1958-10-07", b: "1971-12-20", c: "#d9480f" },
    { name: "Bhutto's years", a: "1971-12-20", b: "1977-07-05", c: "#1971c2" },
    { name: "Zia's years", a: "1977-07-05", b: "1988-08-17", c: "#a61e4d" },
    { name: "The democratic decade", a: "1988-08-17", b: "1999-10-12", c: "#9c36b5" },
    { name: "Musharraf's years", a: "1999-10-12", b: "2008-08-18", c: "#e67700" },
    { name: "Democracy returns", a: "2008-08-18", b: "2100-01-01", c: "#0b7285" },
  ];
  const eraOf = (date) => (date < ERAS[0].a ? ERAS[0] : ERAS.find((e) => date >= e.a && date < e.b) || ERAS[ERAS.length - 1]);
  const today = new Date().toISOString().slice(0, 10);
  const fmt = (e) => (e.d ? e.d + " " : "") + MONTHS[e.m - 1] + " " + e.y;
  const fmtD = (s) => { if (!s) return "present"; const [y, m, d] = s.split("-").map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };
  const yr = (s) => (s ? s.slice(0, 4) : "present");
  const LANES = { pm: "Prime Ministers", hs: "Heads of state", army: "Army chiefs" };
  const LANE_ONE = { pm: "Prime Minister", hs: "Governor-General or President", army: "Army chief" };

  const leadersAt = (date) => { if (date < "1947-08-15") date = "1947-08-15"; return ["pm", "hs", "army"].map((k) => PAK.leaders.filter((l) => l.lane === k && l.start <= date && (l.end || "9999") >= date).pop()).filter(Boolean); };
  const eraIdx = (date) => ERAS.indexOf(eraOf(date));
  // The hand-drawn rail that connects the events: one wobbly line per era colour.
  (function () {
    const css = ERAS.map((e, i) => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="80" viewBox="0 0 14 80"><path d="M7 0 C3 14 11 24 7 40 C3 56 11 66 7 80" fill="none" stroke="${e.c}" stroke-width="2.6" stroke-linecap="round"/></svg>`;
      return `.era${i}{--ec:${e.c};background:url("data:image/svg+xml,${encodeURIComponent(svg)}") repeat-y left 4px top 0;}`;
    }).join("");
    const st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);
  })();
  const detailHtml = (e) => { const d = PAK.detailOf(e); return d ? `<details class="more"><summary>Why it happened and what came next</summary><p><b>Why:</b> ${esc(d.why)}</p><p><b>Next:</b> ${esc(d.next)}</p></details>` : ""; };
  PAK.detailHtml = detailHtml;
  const evHtml = (e) => {
    const era = eraOf(e.date), who = leadersAt(e.date);
    return `<details class="ev k-${e.kind} era${eraIdx(e.date)}"><summary><span class="dot"></span>
      <div class="ev-pic">${PAK.illus(PAK.illusKey(e), era.c)}</div>
      <div class="ev-sum"><div class="d">${esc(fmt(e))}<span class="kind k-${e.kind}">${KINDS[e.kind]}</span></div><h3>${esc(e.title)}</h3><span class="tap">Tap to read</span></div></summary>
      <div class="ev-open"><p>${esc(e.text)}${e.check ? ' <span class="flag" title="Check this detail against your book">check</span>' : ""}</p>${PAK.detailHtml ? PAK.detailHtml(e).replace('<details class="more">', '<div class="more">').replace("</details>", "</div>").replace(/<summary>.*?<\/summary>/, "") : ""}
      ${who.length ? `<div class="incharge"><span class="muted small">In charge then:</span>${who.map((l) => `<a href="#leader-${l.id}" title="${esc(l.name)}, ${esc(l.post)}">${PAK.bust(l.look, eraOf(l.start).c, l.id)}<small>${esc(l.name.split(" ").slice(-1)[0])}</small></a>`).join("")}</div>` : ""}</div></details>`;
  };
  const eraBanner = (date) => { const e = eraOf(date); return `<div class="era-banner" style="--ec:${e.c}"><b>${esc(e.name)}</b><span>${e.a.slice(0, 4)} to ${e.b.startsWith("2100") ? "now" : e.b.slice(0, 4)}</span></div>`; };
  PAK.fmt = fmt; PAK.eraOf = eraOf; PAK.ERAS = ERAS;
  const years = [...new Set(PAK.events.map((e) => e.y))];

  function home() {
    const tile = (href, title, art, sub) => `<a class="tile" href="${href}"><span class="tile-art">${art}</span><b>${title}</b><small>${sub}</small></a>`;
    const face = (id, c) => PAK.bust(PAK.leaders.find((l) => l.id === id).look, c, id);
    const pyr = `<svg viewBox="0 0 120 90" aria-hidden="true"><g filter="url(#pak-pencil)" stroke-linecap="round"><rect x="8" y="4" width="104" height="82" rx="10" fill="#0b0f12"/><path d="M44 20 H76 V34 H44Z M32 38 H88 V54 H32Z M18 58 H102 V78 H18Z" fill="#161c20" stroke="#d4a017" stroke-width="2"/><circle cx="60" cy="27" r="5" fill="#d4a017"/><circle cx="46" cy="46" r="4" fill="#d4a017"/><circle cx="74" cy="46" r="4" fill="#d4a017"/><circle cx="32" cy="68" r="4" fill="#d4a017"/><circle cx="60" cy="68" r="4" fill="#d4a017"/><circle cx="88" cy="68" r="4" fill="#d4a017"/></g></svg>`;
    app.innerHTML = `<section><p class="eyebrow">Pakistan Story</p><h1>Pakistan, drawn</h1><p class="lede">Pick a picture.</p></section>
      <div class="tiles">
        ${tile("#rulers", "Who ruled Pakistan", `<span class="faces">${face("jinnah", "#2f9e44")}${face("zab", "#1971c2")}${face("benazir1", "#9c36b5")}</span>`, "Leaders in order, with photos")}
        ${tile("#state", "Pyramid of power", pyr, "Who sits where in the state")}
        ${tile("#story", "Story roads", PAK.illus("mountain", "#d9480f"), "Seven eras, seven pictures")}
        ${tile("#timeline", "Timeline", PAK.illus("scroll", "#01411c"), `${PAK.events.length} dated events`)}
        ${tile("#quiz", "Quiz", PAK.illus("ballot", "#1971c2"), "Practice that repeats mistakes")}
        ${tile("#years", "Year by year", PAK.illus("book", "#9c36b5"), "Pick any year")}
      </div>
      <p class="note"><b>Offline:</b> open once with internet, then "Add to Home Screen". Each part has a PDF button, and Share sends it to WhatsApp.</p>
      <p class="pdfrow"><button class="btn" data-pdf="revision">PDF: revision sheet</button> <button class="btn" data-pdf="all">PDF: full timeline</button></p>
      <p class="muted small">Photos are from Wikipedia and Wikimedia Commons under free licences. <a href="#credits">See the credits</a>. Where there is no free photo, a sketch is used.</p>`;
  }

  function credits() {
    const ph = Object.entries(PAK.photos || {});
    app.innerHTML = `<p class="crumbs"><a href="#home">Home</a></p><h1>Photo credits</h1><p class="lede">${ph.length} photos from Wikipedia and Wikimedia Commons, each under a free licence. Tap a file name to see the original page and the photographer.</p>
      ${ph.length ? ph.map(([k, v]) => `<p class="credit"><b>${esc(v.title.replace(/_/g, " "))}</b>: <a href="${esc(v.page)}" target="_blank" rel="noopener">${esc(decodeURIComponent(v.file).slice(0, 48))}</a>, ${esc(v.license)}${v.author ? ", " + esc(v.author) : ""}</p>`).join("") : '<p class="muted">No photos yet.</p>'}`;
  }

  function timeline() {
    const decs = [...new Set(years.map((y) => Math.floor(y / 10) * 10))];
    app.innerHTML = `<p class="eyebrow">Part 1</p><h1>Timeline, 1947 onwards</h1>
      <p class="lede">Every important date in order. Tap a year to see that whole year.</p>
      <p class="pdfrow"><b>Take it offline:</b> <button class="btn" data-pdf="all">PDF of everything</button> <button class="btn" data-pdf="all" data-share="1">Share</button> <button class="btn" data-pdf="revision">Revision sheet</button></p>
      <label class="search"><span class="sr-only"></span><input type="search" id="tq" placeholder="Search: Bhutto, 1971, Kashmir, constitution" autocomplete="off"></label>
      <div class="chips" id="kinds"><button class="chip" aria-pressed="true" data-k="">All</button>${Object.keys(KINDS).map((k) => `<button class="chip" aria-pressed="false" data-k="${k}">${KINDS[k]}</button>`).join("")}</div>
      <div class="chips">${decs.map((d) => `<a class="chip" href="#" data-j="${d}">${d}s</a>`).join("")}</div>
      <p class="muted small" id="tcount"></p><div id="tl"></div>`;
    let kind = "", q = "";
    const draw = () => {
      const es = PAK.events.filter((e) => (!kind || e.kind === kind) && (!q || (e.title + " " + e.text + " " + e.y + " " + MONTHS[e.m - 1]).toLowerCase().includes(q)));
      document.getElementById("tcount").textContent = `${es.length} ${es.length === 1 ? "event" : "events"}`;
      let h = "", cur = 0, era = -1;
      es.forEach((e) => { const ei = eraIdx(e.date); if (ei !== era && !kind && !q) { era = ei; h += eraBanner(e.date); } if (e.y !== cur) { cur = e.y; h += `<div class="year-head" id="y${cur}"><a href="#year-${cur}">${cur}</a><span>see the whole year</span></div>`; } h += evHtml(e); });
      document.getElementById("tl").innerHTML = h || '<p class="muted">Nothing matches.</p>';
    };
    app.querySelector("#kinds").addEventListener("click", (e) => { const b = e.target.closest("[data-k]"); if (!b) return; kind = b.dataset.k; app.querySelectorAll("#kinds .chip").forEach((c) => c.setAttribute("aria-pressed", String(c === b))); draw(); });
    app.querySelector("#tq").addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); draw(); });
    app.querySelectorAll("[data-j]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); const y = years.find((v) => Math.floor(v / 10) * 10 === +a.dataset.j); const el = document.getElementById("y" + y); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }));
    draw();
  }

  function yearsPage() {
    const all = []; for (let y = 1947; y <= 2025; y++) all.push(y);
    app.innerHTML = `<p class="eyebrow">Part 1</p><h1>Year by year</h1><p class="lede">Pick a year. Years with no entry yet are lighter.</p>
      <div class="yeargrid">${all.map((y) => { const n = PAK.events.filter((e) => e.y === y).length; return `<a href="#year-${y}"${n ? "" : ' style="opacity:.5"'}>${y}<small>${n ? n + (n === 1 ? " event" : " events") : "none yet"}</small></a>`; }).join("")}</div>`;
  }

  const overlap = (l, a, b) => l.start <= b && (l.end || "9999") >= a;
  const personChip = (l) => `<a href="#leader-${l.id}">${PAK.bust(l.look, eraOf(l.start).c, l.id)}<span><b>${esc(l.name)}</b><small>${esc(l.post)}, ${yr(l.start)} to ${yr(l.end)}</small></span></a>`;

  function year(y) {
    y = +y;
    const es = PAK.events.filter((e) => e.y === y);
    const a = `${y}-01-01`, b = `${y}-12-31`;
    const lane = (k) => PAK.leaders.filter((l) => l.lane === k && overlap(l, a, b));
    const era = eraOf(`${y}-07-01`);
    app.innerHTML = `<p class="crumbs"><a href="#years">Years</a></p><h1>${y}</h1><p class="eyebrow" style="color:${era.c}">${esc(era.name)}</p>
      ${["pm", "hs", "army"].map((k) => { const ls = lane(k); return `<h2>${LANES[k]} in ${y}</h2>` + (ls.length ? `<div class="who">${ls.map(personChip).join("")}</div>` : `<p class="muted small">${k === "pm" ? "No Prime Minister's office at this time." : "No entry."}</p>`); }).join("")}
      <h2>What happened in ${y}</h2>${es.length ? es.map(evHtml).join("") : '<p class="muted">No events entered for this year yet.</p>'}
      <div class="pager">${y > 1947 ? `<a class="btn" href="#year-${y - 1}">&larr; ${y - 1}</a>` : "<span></span>"}${y < 2025 ? `<a class="btn" href="#year-${y + 1}">${y + 1} &rarr;</a>` : ""}</div>`;
  }

  const GAPS = {
    zab: "December 1971 to August 1973: President Bhutto ruled under an interim Constitution. The Prime Minister's office came back with the 1973 Constitution.",
    junejo: "1977 to 1985: martial law under General Zia. No Prime Minister.",
    jamali: "1999 to 2002: General Musharraf as Chief Executive. No Prime Minister.",
    nurulamin: "1958 to 1971: no Prime Minister. Presidents Ayub Khan and Yahya Khan ruled.",
  };
  function poster() {
    const fig = (l) => `<a class="fig" href="#leader-${l.id}">${PAK.bust(l.look, eraOf(l.start).c, l.id)}<b>${esc(l.name)}</b><small>${yr(l.start)} to ${yr(l.end)}</small></a>`;
    app.innerHTML = `<p class="eyebrow">Part 2</p><h1>Who ruled Pakistan</h1><p class="lede">Era by era. Tap a face for the story.</p>
      <div class="chips"><a class="chip on" href="#rulers">Poster</a>${Object.keys(LANES).map((k) => `<a class="chip" href="#rulers-${k}">${LANES[k]} chain</a>`).join("")}</div>
      <p class="pdfrow"><button class="btn" data-pdf="people">PDF: people in power</button> <button class="btn" data-pdf="people" data-share="1">Share</button></p>
      ${ERAS.map((er, i) => { const inEra = (l) => l.start < er.b && (l.end || "9999") > er.a; const row = (lane, name) => { const ls = PAK.leaders.filter((l) => l.lane === lane && inEra(l)); return ls.length ? `<div class="prow"><span class="plabel">${name}</span><div class="pfigs">${ls.map(fig).join("")}</div></div>` : ""; }; return `<section class="era-poster" style="--ec:${er.c}"><div class="era-banner" style="--ec:${er.c}"><b>${esc(er.name)}</b><span>${er.a.slice(0, 4)} to ${er.b.startsWith("2100") ? "now" : er.b.slice(0, 4)}</span></div>${row("hs", "Head of state")}${row("pm", "Prime Minister")}${row("army", "Army chief")}<a class="btn small" href="#era-${i}">Story road</a></section>`; }).join("")}`;
  }
  function rulers(lane) {
    if (!lane || !LANES[lane]) return poster();
    const ls = PAK.leaders.filter((l) => l.lane === lane);
    const items = [];
    ls.forEach((l, i) => {
      const prev = ls[i - 1];
      if (lane === "pm" && prev && l.start > prev.end && (GAPS[l.id])) items.push({ gap: GAPS[l.id], color: eraOf(prev.end).c });
      const care = /Caretaker/.test(l.post);
      items.push({ id: l.id, name: l.name, years: `${yr(l.start)} to ${yr(l.end)}`, tag: care ? "caretaker" : "", color: eraOf(l.start).c, look: l.look, href: `#leader-${l.id}` });
    });
    app.innerHTML = `<p class="eyebrow">Part 2</p><h1>People in power</h1>
      <p class="lede">Follow the arrows from the first to the latest. The colour is the era. Tap anyone to read their story and what happened in their time.</p>
      <div class="chips">${Object.keys(LANES).map((k) => `<a class="chip${k === lane ? " on" : ""}" href="#rulers-${k}">${LANES[k]}</a>`).join("")}</div>
      <p class="pdfrow"><button class="btn" data-pdf="people">PDF: people in power</button> <button class="btn" data-pdf="people" data-share="1">Share</button></p><div class="legend">${ERAS.map((e) => `<span><i style="background:${e.c}"></i>${esc(e.name)}</span>`).join("")}</div>
      ${PAK.chain(items)}<p class="note">These are sketches that show the idea of a person, not portraits.</p>`;
  }

  function leader(id) {
    const ls = PAK.leaders, i = ls.findIndex((l) => l.id === id);
    if (i < 0) return rulers();
    const l = ls[i], era = eraOf(l.start);
    const same = ls.filter((x) => x.lane === l.lane), j = same.indexOf(l);
    const es = PAK.events.filter((e) => e.date >= l.start && e.date <= (l.end || "9999")).sort((x, y) => (x.date < y.date ? -1 : 1));
    const others = ["pm", "hs", "army"].map((k) => ({ k, ls: ls.filter((x) => x.lane === k && x.id !== l.id && overlap(x, l.start, l.end || "9999") && x.start <= (l.end || "9999")) })).filter((o) => o.ls.length);
    app.innerHTML = `<p class="crumbs"><a href="#rulers-${l.lane}">${LANES[l.lane]}</a></p>
      <div class="leader-head">${PAK.bust(l.look, era.c, l.id, "big-avatar")}<div><p class="eyebrow" style="color:${era.c}">${esc(era.name)}</p><h1>${esc(l.name)}</h1><p class="muted">${esc(l.post)}<br>${fmtD(l.start)} to ${fmtD(l.end)}</p></div></div>
      <p>${esc(l.note)}</p>
      ${others.length ? `<h2>In office at the same time</h2><div class="who">${others.flatMap((o) => o.ls.slice(0, 4)).map(personChip).join("")}</div>` : ""}
      <h2>What happened in this time</h2>${es.length ? es.map(evHtml).join("") : '<p class="muted">No events entered for this period yet.</p>'}
      <div class="pager">${j > 0 ? `<a class="btn" href="#leader-${same[j - 1].id}">&larr; ${esc(same[j - 1].name)}</a>` : "<span></span>"}${j < same.length - 1 ? `<a class="btn" href="#leader-${same[j + 1].id}">${esc(same[j + 1].name)} &rarr;</a>` : ""}</div>`;
  }

  const eraEvents = (er) => PAK.events.filter((e) => e.date >= er.a.slice(0, 4) + "-01-01" && e.date <= (er.b.startsWith("2100") ? "9999" : er.b.slice(0, 4) + "-12-31"));
  const trickOf = (e) => { for (const sc of PAK.scenes) for (const [t, tr] of sc.spots) if (e.title.startsWith(t)) return tr; return ""; };
  function route() {
    const h = decodeURIComponent((location.hash || "#home").slice(1));
    PAK.mountFilter();
    let on = "home";
    if (h === "timeline") { timeline(); on = "timeline"; }
    else if (h === "years") { yearsPage(); on = "years"; }
    else if (h.startsWith("year-")) { year(h.slice(5)); on = "years"; }
    else if (h === "state" || h.startsWith("state-")) { PAK.pyramidPage(app, h.slice(6)); on = "state"; }
    else if (h === "story") { PAK.story.index(app, ERAS); on = "story"; }
    else if (h.startsWith("era-")) { PAK.story.page(app, +h.slice(4), ERAS); on = "story"; }
    else if (h === "quiz") { PAK.quiz.hub(app, ERAS); on = "quiz"; }
    else if (h === "quiz-all") { PAK.quiz.run(app, "Daily practice", PAK.events, years, "#quiz"); on = "quiz"; }
    else if (h.startsWith("quiz-era-")) { const i = +h.slice(9), er = ERAS[i]; const es = eraEvents(er); PAK.quiz.run(app, er.name, es, [...new Set(es.map((e) => e.y))], "#quiz"); on = "quiz"; }
    else if (h === "cards-all") { PAK.quiz.cards(app, PAK.events, "All events", "#quiz", trickOf); on = "quiz"; }
    else if (h.startsWith("cards-")) { const i = +h.slice(6); PAK.quiz.cards(app, eraEvents(ERAS[i]), ERAS[i].name, "#quiz", trickOf); on = "quiz"; }
    else if (h === "credits") { credits(); on = "home"; }
    else if (h === "rulers" || h.startsWith("rulers-")) { rulers(h.slice(7)); on = "rulers"; }
    else if (h.startsWith("leader-")) { leader(h.slice(7)); on = "rulers"; }
    else home();
    document.querySelectorAll(".tabbar a").forEach((a) => a.classList.toggle("on", a.dataset.nav === on));
    window.scrollTo(0, 0);
    document.title = "Pakistan Story";
  }
  window.addEventListener("hashchange", route);
  route();
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
})();
