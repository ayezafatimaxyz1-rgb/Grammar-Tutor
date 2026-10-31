/* Views and navigation: the lesson library, the lesson player, and the mistake notebook. */
(function () {
  const P = (window.PLAB = window.PLAB || {});
  const store = P.store;
  const $ = (sel, root = document) => root.querySelector(sel);
  const app = $("#app");

  const STATUS = ["planned", "drafted", "implemented", "tested", "complete"];
  const STATUS_LABEL = { planned: "Planned", drafted: "Drafted", implemented: "Built", tested: "Tested", complete: "Complete" };
  const FLAG_LABEL = { formal: "formal", literary: "literary", archaic: "archaic", regional: "BrE / AmE", disputed: "disputed usage" };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  // **key word** and _example_ in lesson text.
  // A run of three or more underscores is a blank to fill, not an italic marker.
  const rich = (s) => esc(s).replace(/_{3,}/g, '<span class="blank" aria-label="blank">\u2003\u2003\u2003</span>').replace(/\*\*(.+?)\*\*/g, '<strong class="key">$1</strong>').replace(/(^|[\s(])_(.+?)_(?=[\s.,;:)!?]|$)/g, '$1<em class="ex">$2</em>');

  /* ---------- content registry ---------- */

  function allLessons() {
    return P.curriculum.phases.flatMap((ph) => ph.units.flatMap((u) => u.lessons.map((l) => ({ ...l, phase: ph, unit: u }))));
  }

  function unitOf(lesson) {
    for (const ph of P.curriculum.phases) for (const u of ph.units) if (u.id === lesson.unit) return u;
    return null;
  }

  // Every check question in the course, with where it lives.
  function questions() {
    const out = {};
    for (const lesson of Object.values(P.lessons))
      lesson.steps.forEach((step, i) => {
        if (step.check) out[step.check.id] = { ...step.check, lessonId: lesson.id, stepId: step.id, stepIndex: i };
      });
    return out;
  }

  /* ---------- routing ---------- */

  let teardown = null;
  let askPrefill = {};

  function route() {
    if (teardown) teardown();
    teardown = null;
    const hash = location.hash.slice(1);
    document.querySelectorAll("[data-nav]").forEach((a) => a.removeAttribute("aria-current"));
    if (hash.startsWith("lesson-") && P.lessons[hash.slice(7)]) {
      const lesson = P.lessons[hash.slice(7)];
      teardown = renderLesson(lesson);
      $(`[data-nav="${lesson.generated ? "ask" : "lesson"}"]`).setAttribute("aria-current", "page");
    } else if (hash === "ask") {
      P.ask.render(app, { esc, prefill: askPrefill.q, context: askPrefill.context });
      askPrefill = {};
      $('[data-nav="ask"]').setAttribute("aria-current", "page");
    } else if (hash === "prepositions" || hash.startsWith("prep-")) {
      P.prepbook.render(app, { esc, rich, prep: hash.startsWith("prep-") ? hash.slice(5) : null });
      $('[data-nav="prepositions"]').setAttribute("aria-current", "page");
    } else if (hash === "notebook") {
      renderNotebook();
      $('[data-nav="notebook"]').setAttribute("aria-current", "page");
    } else {
      renderLibrary();
      $('[data-nav="library"]').setAttribute("aria-current", "page");
    }
    window.scrollTo(0, 0);
    updateBadge();
  }

  function updateBadge() {
    const due = store.mistakes().filter(store.isDue).length;
    const badge = $("#due-badge");
    badge.textContent = due;
    badge.hidden = due === 0;
  }

  /* ---------- library ---------- */

  function renderLibrary() {
    const lessons = allLessons();
    const counts = Object.fromEntries(STATUS.map((s) => [s, 0]));
    lessons.forEach((l) => counts[l.status]++);
    const done = (id) => store.lesson(id).done;

    app.innerHTML = `
      <section class="intro">
        <p class="eyebrow">CSS English Precis and Composition</p>
        <h1>Prepositions Lab</h1>
        <p class="lede">Learn how English prepositions work, one idea at a time, on a board that draws each explanation as you watch. Start with the core sense of <em>in</em>.</p>
        <a class="button primary" href="#lesson-in-core">Start lesson 1: IN</a>
      </section>

      <section class="tracker" aria-labelledby="tracker-h">
        <div class="section-head">
          <h2 id="tracker-h">Coverage tracker</h2>
          <p class="muted">${lessons.length} lessons in the curriculum. Only lessons marked Built or later can be opened.</p>
        </div>
        <div class="bar" role="img" aria-label="${STATUS.map((s) => `${counts[s]} ${STATUS_LABEL[s]}`).join(", ")}">
          ${STATUS.map((s) => (counts[s] ? `<span class="bar-seg st-${s}" style="flex-grow:${counts[s]}"></span>` : "")).join("")}
        </div>
        <dl class="counts">
          ${STATUS.map((s) => `<div><dt><span class="dot st-${s}"></span>${STATUS_LABEL[s]}</dt><dd>${counts[s]}</dd></div>`).join("")}
        </dl>
        <details class="gaps">
          <summary>Known gaps (${P.curriculum.gaps.length})</summary>
          <ul>${P.curriculum.gaps.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>
        </details>
      </section>

      <section class="curriculum" aria-labelledby="curr-h">
        <div class="section-head">
          <h2 id="curr-h">Curriculum</h2>
          <label class="search">
            <span class="sr-only">Search the curriculum</span>
            <input id="search" type="search" placeholder="Search a word or phrase, e.g. between, apply for" autocomplete="off">
          </label>
        </div>
        <p id="search-count" class="muted" aria-live="polite"></p>
        ${P.curriculum.phases
          .map(
            (ph) => `
          <div class="phase" data-phase>
            <h3>${esc(ph.title)}</h3>
            <p class="muted">${esc(ph.intro)}</p>
            ${ph.units
              .map(
                (u) => `
              <div class="unit" data-unit>
                <h4>${esc(u.title)}</h4>
                <ol class="rows">
                  ${u.lessons
                    .map((l) => {
                      const open = l.lessonId && P.lessons[l.lessonId];
                      const title = open ? `<a href="#lesson-${l.lessonId}">${esc(l.title)}</a>` : esc(l.title);
                      return `<li class="row${open ? " is-open" : ""}" data-search="${esc((l.title + " " + l.flags.join(" ") + " " + u.title).toLowerCase())}">
                        <span class="row-title">${title}${open && store.bookmarked(l.lessonId) ? ' <span class="tag">bookmarked</span>' : ""}</span>
                        <span class="row-meta">
                          ${l.flags.map((f) => `<span class="flag">${FLAG_LABEL[f]}</span>`).join("")}
                          ${open && done(l.lessonId) ? '<span class="chip st-complete">Finished</span>' : ""}
                          <span class="chip st-${l.status}">${STATUS_LABEL[l.status]}</span>
                        </span>
                      </li>`;
                    })
                    .join("")}
                </ol>
              </div>`
              )
              .join("")}
          </div>`
          )
          .join("")}
      </section>`;

    const input = $("#search");
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      app.querySelectorAll(".row").forEach((row) => {
        const hit = !q || row.dataset.search.includes(q);
        row.hidden = !hit;
        if (hit) shown++;
      });
      app.querySelectorAll("[data-unit]").forEach((u) => (u.hidden = !u.querySelector(".row:not([hidden])")));
      app.querySelectorAll("[data-phase]").forEach((p) => (p.hidden = !p.querySelector("[data-unit]:not([hidden])")));
      $("#search-count").textContent = q ? `${shown} matching ${shown === 1 ? "lesson" : "lessons"}` : "";
    });
  }

  /* ---------- lesson player ---------- */

  function renderLesson(lesson) {
    const unit = unitOf(lesson);
    const progress = store.lesson(lesson.id);
    app.innerHTML = `
      <section class="lesson-head">
        <div>
          <p class="eyebrow">${lesson.generated ? "Drawn on request · not part of the reviewed course" : `${esc(unit ? unit.title : "")} · ${esc(lesson.level)}`} · about ${lesson.minutes} min</p>
          <h1>${esc(lesson.title)}</h1>
        </div>
        <button id="bookmark" class="button ghost" type="button" aria-pressed="false"></button>
      </section>

      <div class="player">
        <div class="board-col">
          <div class="board" id="board-wrap">
            <svg id="board" viewBox="0 0 960 600" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="board-alt">
              <title id="board-alt"></title>
              <defs></defs>
              <g id="board-main"></g>
              <g id="board-overlay"></g>
            </svg>
            <div class="board-tray" aria-hidden="true"><span></span><span></span><span></span></div>
            <div id="overlay-bar" class="overlay-bar" hidden>
              <span>Comparison drawing</span>
              <button id="overlay-close" class="button small" type="button">Back to the lesson board</button>
            </div>
          </div>

          <div class="controls" role="group" aria-label="Board controls">
            <button id="prev" class="icon-btn" type="button" aria-label="Previous step" title="Previous step (←)">${icon("prev")}</button>
            <button id="play" class="icon-btn primary" type="button" aria-label="Pause" title="Play or pause (Space)">${icon("pause")}</button>
            <button id="replay" class="icon-btn" type="button" aria-label="Replay this step" title="Replay this step (R)">${icon("replay")}</button>
            <label class="scrub">
              <span class="sr-only">Position in this step</span>
              <input id="scrub" type="range" min="0" max="1000" value="0">
            </label>
            <button id="speed" class="speed" type="button" aria-label="Drawing speed">1×</button>
            <button id="next" class="button primary next" type="button">Next</button>
          </div>

          <ol class="steps" id="steps" aria-label="Lesson steps"></ol>
        </div>

        <aside class="side" aria-live="polite">
          <p class="step-count" id="step-count"></p>
          <h2 id="step-title"></h2>
          <div id="say" class="say"></div>
          <div id="check" class="check" hidden></div>
          <div id="finish" class="finish" hidden></div>
        </aside>
      </div>

      <section class="lesson-foot">
        <details>
          <summary>What this lesson teaches</summary>
          <p>${esc(lesson.summary)}</p>
          <ul>${lesson.objectives.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>
        </details>
        <label class="notes">
          <span>My notes for this lesson</span>
          <textarea id="notes" rows="4" placeholder="Write the idea in your own words. Notes are saved in this browser."></textarea>
        </label>
        <form class="ask-inline" id="ask-inline">
          <label for="ask-inline-q">Ask the board to sketch something about this lesson</label>
          <div class="ask-inline-row">
            <input id="ask-inline-q" type="text" maxlength="300" placeholder="e.g. Why do we say in the car but on the bus?">
            <button class="button" type="submit">Ask</button>
          </div>
        </form>
        ${lesson.generated ? '<p><button id="forget" class="button ghost small" type="button">Delete this explanation</button></p>' : ""}
        <p class="muted keys">Keyboard: Space plays or pauses, ← and → move between steps, R replays the step.</p>
      </section>`;

    const svg = $("#board");
    const ui = {
      play: $("#play"), prev: $("#prev"), next: $("#next"), replay: $("#replay"), scrub: $("#scrub"), speed: $("#speed"),
      steps: $("#steps"), count: $("#step-count"), title: $("#step-title"), say: $("#say"), check: $("#check"), finish: $("#finish"),
      alt: $("#board-alt"), overlayBar: $("#overlay-bar"),
    };

    const state = { step: 0, t: 0, playing: false, speed: 1, raf: 0, last: 0, overlay: null, ready: false };
    let scene = null;
    const SPEEDS = [0.75, 1, 1.25, 1.5];

    // Bookmark and notes
    const bm = $("#bookmark");
    const paintBookmark = () => {
      const on = store.bookmarked(lesson.id);
      bm.setAttribute("aria-pressed", on);
      bm.innerHTML = `${icon(on ? "bookmarked" : "bookmark")}<span>${on ? "Bookmarked" : "Bookmark"}</span>`;
    };
    paintBookmark();
    bm.addEventListener("click", () => {
      store.toggleBookmark(lesson.id);
      paintBookmark();
    });
    const notes = $("#notes");
    notes.value = store.note(lesson.id);
    let noteTimer;
    notes.addEventListener("input", () => {
      clearTimeout(noteTimer);
      noteTimer = setTimeout(() => store.setNote(lesson.id, notes.value), 400);
    });

    $("#ask-inline").addEventListener("submit", (e) => {
      e.preventDefault();
      askPrefill = { q: $("#ask-inline-q").value.trim(), context: lesson.title };
      location.hash = "ask";
    });
    if (lesson.generated)
      $("#forget").addEventListener("click", () => {
        P.ask.forget(lesson.id);
        location.hash = "ask";
      });

    const answered = (step) => !step.check || !!store.lesson(lesson.id).answered[step.check.id];
    const len = () => scene.length(state.step);

    function stepStrip() {
      const furthest = store.lesson(lesson.id).furthest;
      ui.steps.innerHTML = lesson.steps
        .map((s, i) => {
          const cls = i === state.step ? "is-current" : i <= furthest ? "is-seen" : "";
          return `<li><button type="button" class="${cls}${s.check ? " is-check" : ""}" data-step="${i}" ${i > furthest ? "disabled" : ""}
            aria-label="Step ${i + 1}: ${esc(s.title)}" ${i === state.step ? 'aria-current="step"' : ""} title="${esc(s.title)}">${i + 1}</button></li>`;
        })
        .join("");
    }

    function paintSay() {
      const step = lesson.steps[state.step];
      const lines = step.say || [];
      let current = -1;
      lines.forEach((l, i) => {
        if (state.t >= (l.cue ? scene.startOf(state.step, l.cue) : 0)) current = i;
      });
      ui.say.querySelectorAll("p").forEach((p, i) => {
        p.classList.toggle("is-said", i <= current);
        p.classList.toggle("is-now", i === current);
      });
    }

    function paintControls() {
      ui.play.innerHTML = icon(state.playing ? "pause" : "play");
      ui.play.setAttribute("aria-label", state.playing ? "Pause" : "Play");
      ui.scrub.value = Math.round((state.t / len()) * 1000);
      ui.prev.disabled = state.step === 0;
      const step = lesson.steps[state.step];
      const last = state.step === lesson.steps.length - 1;
      ui.next.textContent = last ? "Finish lesson" : "Next";
      ui.next.disabled = !answered(step) || (last && store.lesson(lesson.id).done);
      ui.next.classList.toggle("is-ready", !state.playing && state.t >= len() && !ui.next.disabled);
    }

    function draw() {
      scene.render(state.step, state.t);
      paintSay();
      paintControls();
      const step = lesson.steps[state.step];
      if (step.check && ui.check.hidden && state.t >= len()) showCheck(step);
    }

    function tick(now) {
      const dt = Math.min(64, now - state.last);
      state.last = now;
      if (state.playing) {
        state.t = Math.min(len(), state.t + dt * state.speed);
        if (state.t >= len()) state.playing = false;
        draw();
      }
      state.raf = state.playing ? requestAnimationFrame(tick) : 0;
    }

    function play() {
      if (state.t >= len()) state.t = 0;
      state.playing = true;
      state.last = performance.now();
      if (!state.raf) state.raf = requestAnimationFrame(tick);
      paintControls();
    }

    function pause() {
      state.playing = false;
      paintControls();
    }

    function goTo(i, { animate = true } = {}) {
      closeOverlay();
      state.step = Math.max(0, Math.min(lesson.steps.length - 1, i));
      store.reachStep(lesson.id, state.step);
      const step = lesson.steps[state.step];
      ui.count.textContent = `Step ${state.step + 1} of ${lesson.steps.length}`;
      ui.title.textContent = step.title;
      ui.alt.textContent = step.alt || step.title;
      ui.say.innerHTML = (step.say || []).map((l) => `<p>${rich(l.text)}</p>`).join("");
      ui.check.hidden = true;
      ui.finish.hidden = true;
      stepStrip();
      state.t = animate && !reducedMotion ? 0 : len();
      draw();
      if (animate && !reducedMotion) play();
      else pause();
    }

    /* comprehension checks */

    function showCheck(step) {
      const c = step.check;
      const done = answered(step);
      ui.check.hidden = false;
      ui.check.innerHTML = `
        <p class="check-label">Your turn${c.source === "original" ? ' <span class="tag">original practice question</span>' : ""}${c.source === "past-paper" ? ` <span class="tag tag--paper" title="${esc(c.citation)}">CSS past paper · ${c.year ? c.year : "year not confirmed"}${c.question ? " · " + esc(c.question) : ""}</span>` : ""}</p>
        <p class="check-prompt" id="q-${c.id}">${rich(c.prompt)}</p>
        <div class="options" role="group" aria-labelledby="q-${c.id}">
          ${c.options.map((o, i) => `<button type="button" class="option" data-i="${i}">${rich(o.text)}</button>`).join("")}
        </div>
        <div class="feedback" id="feedback"></div>`;
      const fb = $("#feedback", ui.check);
      const buttons = [...ui.check.querySelectorAll(".option")];
      const q = { ...c, lessonId: lesson.id, stepId: step.id };

      function revealCorrect(o) {
        buttons.forEach((b) => (b.disabled = true));
        buttons[c.options.indexOf(o)].classList.add("is-right");
        fb.innerHTML = `<div class="fb fb-right"><p class="fb-head">${icon("check")} Correct</p><p>${rich(o.why)}</p></div>`;
      }

      if (done) {
        revealCorrect(c.options.find((o) => o.correct));
        fb.insertAdjacentHTML("beforeend", '<p class="muted">You have already answered this check.</p>');
      }

      buttons.forEach((b) =>
        b.addEventListener("click", () => {
          const o = c.options[+b.dataset.i];
          if (o.correct) {
            store.answer(q, { correct: true, chosen: o.text });
            revealCorrect(o);
            closeOverlay();
          } else {
            store.answer({ ...q, misconception: o.misconception }, { correct: false, chosen: o.text });
            b.classList.add("is-wrong");
            b.disabled = true;
            const mc = P.misconceptions[o.misconception];
            fb.innerHTML = `<div class="fb fb-wrong">
              <p class="fb-head">${icon("cross")} Not quite</p>
              <p>${rich(o.why)}</p>
              ${mc ? `<p class="fb-mc"><strong>What usually causes this:</strong> ${esc(mc.label)}. ${esc(mc.explain)}</p>` : ""}
              ${o.show ? '<button type="button" class="button small" id="show-me">Show me on the board</button>' : ""}
              <p class="muted">Saved to your mistake notebook. Try another answer.</p>
            </div>`;
            if (o.show) $("#show-me", fb).addEventListener("click", () => openOverlay(o.show, `${c.id}-${b.dataset.i}`));
          }
          updateBadge();
          paintControls();
        })
      );
    }

    /* comparison drawings for wrong answers */

    function openOverlay(actions, key) {
      closeOverlay();
      pause();
      const g = $("#board-overlay");
      const o = { scene: new P.Scene(svg, g, [{ actions }], `${lesson.id}-ov-${key}`), t: 0, raf: 0 };
      state.overlay = o;
      $("#board-main").classList.add("is-dimmed");
      ui.overlayBar.hidden = false;
      const total = o.scene.length(0);
      if (reducedMotion) return o.scene.render(0, total);
      let last = performance.now();
      const run = (now) => {
        o.t = Math.min(total, o.t + (now - last) * state.speed);
        last = now;
        o.scene.render(0, o.t);
        o.raf = o.t < total ? requestAnimationFrame(run) : 0;
      };
      o.raf = requestAnimationFrame(run);
    }

    function closeOverlay() {
      const o = state.overlay;
      if (!o) return;
      cancelAnimationFrame(o.raf);
      o.scene.destroy();
      state.overlay = null;
      $("#board-main").classList.remove("is-dimmed");
      ui.overlayBar.hidden = true;
    }

    function finish() {
      store.finishLesson(lesson.id);
      const checks = lesson.steps.filter((s) => s.check);
      const missed = checks.filter((s) => store.mistakes().some((m) => m.qid === s.check.id)).length;
      ui.finish.hidden = false;
      ui.finish.innerHTML = `
        <h3>Lesson complete</h3>
        <p>You answered ${checks.length - missed} of ${checks.length} checks correctly on the first try.${missed ? " The others are in your mistake notebook, ready for review." : ""}</p>
        ${lesson.generated ? '<p>Ask a follow-up below, or return to the course.</p>' : nextLessonHtml(lesson)}
        <div class="row-buttons">
          <a class="button primary" href="#notebook">Open the notebook</a>
          <a class="button ghost" href="#library">Back to the library</a>
        </div>`;
      paintControls();
      ui.finish.scrollIntoView({ block: "nearest", behavior: reducedMotion ? "auto" : "smooth" });
    }

    /* wiring */

    ui.play.addEventListener("click", () => (state.playing ? pause() : play()));
    ui.replay.addEventListener("click", () => {
      closeOverlay();
      state.t = 0;
      draw();
      play();
    });
    ui.prev.addEventListener("click", () => goTo(state.step - 1));
    ui.next.addEventListener("click", () => {
      if (state.step === lesson.steps.length - 1) finish();
      else goTo(state.step + 1);
    });
    ui.scrub.addEventListener("input", () => {
      const at = (ui.scrub.value / 1000) * len();
      closeOverlay();
      state.playing = false;
      state.t = at;
      draw();
    });
    ui.speed.addEventListener("click", () => {
      state.speed = SPEEDS[(SPEEDS.indexOf(state.speed) + 1) % SPEEDS.length];
      ui.speed.textContent = `${state.speed}×`;
    });
    ui.steps.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-step]");
      if (b && !b.disabled) goTo(+b.dataset.step);
    });
    $("#overlay-close").addEventListener("click", closeOverlay);

    const onKey = (e) => {
      if (!state.ready || e.target.closest("input, textarea, select") || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === " " && !e.target.closest("button, a")) {
        e.preventDefault();
        state.playing ? pause() : play();
      } else if (e.key === "ArrowRight" && !ui.next.disabled) {
        ui.next.click();
      } else if (e.key === "ArrowLeft" && state.step > 0) {
        goTo(state.step - 1);
      } else if (e.key === "r" || e.key === "R") {
        ui.replay.click();
      }
    };
    document.addEventListener("keydown", onKey);

    // Measure handwriting only after the board font has loaded.
    let alive = true;
    whenFontsReady().then(() => {
      if (!alive) return;
      try {
        scene = new P.Scene(svg, $("#board-main"), lesson.steps, lesson.id);
      } catch (err) {
        ui.say.innerHTML = `<p class="is-said">This drawing could not be built (${esc(err.message)}). ${lesson.generated ? "Delete it and ask again." : ""}</p>`;
        return;
      }
      state.ready = true;
      // Continue where the learner stopped, but never past an unanswered check.
      let start = Math.min(progress.furthest, lesson.steps.length - 1);
      // Ask's free lookup can send the learner straight to one step of a lesson.
      try {
        const jump = JSON.parse(sessionStorage.getItem("prepositions-lab:jump") || "null");
        sessionStorage.removeItem("prepositions-lab:jump");
        const at = jump && jump.lesson === lesson.id ? lesson.steps.findIndex((x) => x.id === jump.step) : -1;
        if (at >= 0) {
          start = at;
          if (progress.furthest < at) progress.furthest = at;
        }
      } catch (e) {}
      while (start > 0 && !answered(lesson.steps[start - 1])) start--;
      goTo(start, { animate: start === 0 });
    });

    return () => {
      alive = false;
      cancelAnimationFrame(state.raf);
      closeOverlay();
      document.removeEventListener("keydown", onKey);
      clearTimeout(noteTimer);
      if (notes.value !== store.note(lesson.id)) store.setNote(lesson.id, notes.value);
    };
  }

  // The next lesson in curriculum order that can be opened.
  function nextLessonHtml(lesson) {
    const list = allLessons();
    const at = list.findIndex((l) => l.lessonId === lesson.id);
    const next = list.slice(at + 1).find((l) => l.lessonId && P.lessons[l.lessonId]);
    return next ? `<p>Next: <a href="#lesson-${next.lessonId}">${esc(next.title)}</a></p>` : "<p>That is the last lesson built so far.</p>";
  }

  function whenFontsReady() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    const timeout = new Promise((r) => setTimeout(r, 2500));
    return Promise.race([Promise.all([document.fonts.load('400 38px "Kalam"'), document.fonts.load('700 38px "Kalam"')]), timeout]).catch(() => {});
  }

  /* ---------- notebook ---------- */

  function renderNotebook() {
    const qs = questions();
    const mistakes = store.mistakes().filter((m) => qs[m.qid]);
    const due = mistakes.filter(store.isDue);
    const groups = {};
    mistakes.forEach((m) => (groups[m.misconception] = groups[m.misconception] || []).push(m));
    const bookmarks = Object.values(P.lessons).filter((l) => store.bookmarked(l.id) || store.note(l.id));

    app.innerHTML = `
      <section class="intro compact">
        <p class="eyebrow">Your notebook</p>
        <h1>Mistakes, review and notes</h1>
        <p class="lede">Wrong answers are grouped by the misunderstanding behind them. Each one comes back for review after 10 minutes, then after 1, 3, 7 and 21 days as long as you keep getting it right.</p>
      </section>

      <section class="review-box" aria-labelledby="rev-h">
        <h2 id="rev-h">Review</h2>
        <p>${due.length ? `${due.length} ${due.length === 1 ? "question is" : "questions are"} due now.` : mistakes.length ? "Nothing is due right now. Come back later, or practise early." : "No mistakes yet. Questions you answer wrongly in a lesson will appear here."}</p>
        <div class="row-buttons">
          ${due.length ? '<button id="review-due" class="button primary" type="button">Start review</button>' : ""}
          ${mistakes.length ? '<button id="review-all" class="button ghost" type="button">Practise all mistakes now</button>' : ""}
        </div>
        <div id="review" class="review" hidden></div>
      </section>

      ${
        mistakes.length
          ? `<section aria-labelledby="mc-h"><h2 id="mc-h">By misunderstanding</h2>
        ${Object.entries(groups)
          .map(([tag, list]) => {
            const mc = P.misconceptions[tag] || { label: "Other", explain: "" };
            return `<div class="mc-group">
              <h3>${esc(mc.label)} <span class="count">${list.length}</span></h3>
              <p class="muted">${esc(mc.explain)}</p>
              <ul class="mistakes">
                ${list
                  .map((m) => {
                    const q = qs[m.qid];
                    const right = q.options.find((o) => o.correct);
                    const when = store.isMastered(m) ? "Mastered" : store.isDue(m) ? "Due now" : `Next review ${relTime(m.due)}`;
                    return `<li>
                      <p class="m-prompt">${rich(q.prompt)}</p>
                      <p><span class="m-label">Your answer</span> <span class="m-wrong">${rich(m.chosen)}</span></p>
                      <p><span class="m-label">Correct</span> <span class="m-right">${rich(right.text)}</span></p>
                      <p class="m-foot"><span>${when}</span> · <span>wrong ${m.wrong}×</span> · <a href="#lesson-${q.lessonId}">${esc(P.lessons[q.lessonId].title)}</a></p>
                    </li>`;
                  })
                  .join("")}
              </ul>
            </div>`;
          })
          .join("")}</section>`
          : ""
      }

      <section aria-labelledby="bm-h">
        <h2 id="bm-h">Bookmarks and notes</h2>
        ${
          bookmarks.length
            ? `<ul class="bm-list">${bookmarks
                .map((l) => `<li><a href="#lesson-${l.id}">${esc(l.title)}</a>${store.bookmarked(l.id) ? ' <span class="tag">bookmarked</span>' : ""}${store.note(l.id) ? `<p class="note">${esc(store.note(l.id))}</p>` : ""}</li>`)
                .join("")}</ul>`
            : '<p class="muted">Bookmark a lesson or write notes on its page, and they will be collected here.</p>'
        }
      </section>`;

    const start = (list) => runReview(list.map((m) => qs[m.qid]));
    const rd = $("#review-due"), ra = $("#review-all");
    if (rd) rd.addEventListener("click", () => start(due));
    if (ra) ra.addEventListener("click", () => start(mistakes));
  }

  function runReview(list) {
    const box = $("#review");
    box.hidden = false;
    let i = 0;
    const show = () => {
      if (i >= list.length) {
        box.innerHTML = `<p class="fb-head">Review finished.</p><button class="button ghost" type="button" id="review-done">Refresh the notebook</button>`;
        $("#review-done").addEventListener("click", renderNotebook);
        updateBadge();
        return;
      }
      const q = list[i];
      box.innerHTML = `
        <p class="step-count">Question ${i + 1} of ${list.length}</p>
        <p class="check-prompt">${rich(q.prompt)}</p>
        <div class="options">${q.options.map((o, k) => `<button type="button" class="option" data-k="${k}">${rich(o.text)}</button>`).join("")}</div>
        <div class="feedback"></div>`;
      box.querySelectorAll(".option").forEach((b) =>
        b.addEventListener("click", () => {
          const o = q.options[+b.dataset.k];
          box.querySelectorAll(".option").forEach((x) => (x.disabled = true));
          const right = q.options.find((x) => x.correct);
          box.querySelectorAll(".option")[q.options.indexOf(right)].classList.add("is-right");
          if (!o.correct) b.classList.add("is-wrong");
          store.answer(o.correct ? q : { ...q, misconception: o.misconception }, { correct: !!o.correct, chosen: o.text, inReview: true });
          $(".feedback", box).innerHTML = `<div class="fb ${o.correct ? "fb-right" : "fb-wrong"}">
            <p class="fb-head">${o.correct ? `${icon("check")} Correct` : `${icon("cross")} Not quite`}</p>
            <p>${rich(o.why)}</p>${o.correct ? "" : `<p>${rich(right.why)}</p>`}
            <button type="button" class="button small primary" id="review-next">${i + 1 < list.length ? "Next question" : "Finish"}</button></div>`;
          $("#review-next").addEventListener("click", () => {
            i++;
            show();
          });
          $("#review-next").focus();
        })
      );
    };
    show();
  }

  function relTime(ts) {
    const m = Math.round((ts - Date.now()) / 60000);
    if (m < 60) return `in ${m} min`;
    const h = Math.round(m / 60);
    if (h < 36) return `in ${h} h`;
    return `in ${Math.round(h / 24)} days`;
  }

  /* ---------- icons ---------- */

  function icon(name) {
    const paths = {
      play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none"/>',
      pause: '<path d="M8 5.5v13M16 5.5v13" stroke-width="3"/>',
      replay: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 4.5v4h4"/>',
      prev: '<path d="M15 5.5 8.5 12l6.5 6.5"/>',
      check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
      cross: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
      bookmark: '<path d="M7 4.5h10v15l-5-3.5-5 3.5z"/>',
      bookmarked: '<path d="M7 4.5h10v15l-5-3.5-5 3.5z" fill="currentColor"/>',
    };
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
  }

  /* ---------- start ---------- */

  window.addEventListener("hashchange", route);
  store.onChange(updateBadge);
  route();
})();
