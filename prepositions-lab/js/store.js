/* Progress, mistakes, bookmarks and notes, saved in this browser.
   Storage can be unavailable (private windows, blocked site data), so every access is
   guarded and the app keeps working from memory. */
(function () {
  const P = (window.PLAB = window.PLAB || {});

  // Lesson files call this as they load.
  P.lessons = P.lessons || {};
  P.registerLesson = (lesson) => {
    P.lessons[lesson.id] = lesson;
  };

  const KEY = "prepositions-lab:v1";
  const MIN = 60 * 1000, DAY = 24 * 60 * MIN;
  // Spaced revision: after a mistake the question returns soon, then at growing intervals.
  const INTERVALS = [10 * MIN, 1 * DAY, 3 * DAY, 7 * DAY, 21 * DAY];

  const empty = () => ({ v: 1, lessons: {}, mistakes: {}, bookmarks: {}, notes: {} });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(empty(), JSON.parse(raw));
    } catch (e) {}
    return empty();
  }

  let data = load();
  const listeners = new Set();

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {}
    listeners.forEach((fn) => fn());
  }

  function lesson(id) {
    return (data.lessons[id] = data.lessons[id] || { furthest: 0, done: false, answered: {} });
  }

  P.store = {
    onChange: (fn) => listeners.add(fn),
    lesson: (id) => lesson(id),

    reachStep(id, step) {
      const l = lesson(id);
      if (step > l.furthest) {
        l.furthest = step;
        save();
      }
    },

    finishLesson(id) {
      lesson(id).done = true;
      save();
    },

    // Called on every answer to a check, inside a lesson or in review.
    answer(q, { correct, chosen, inReview }) {
      const now = Date.now();
      const m = data.mistakes[q.id];
      if (!inReview) {
        const l = lesson(q.lessonId);
        if (correct) l.answered[q.id] = true;
      }
      if (!correct) {
        data.mistakes[q.id] = {
          qid: q.id,
          lessonId: q.lessonId,
          stepId: q.stepId,
          misconception: q.misconception,
          chosen,
          wrong: (m ? m.wrong : 0) + 1,
          box: 0,
          due: now + INTERVALS[0],
          last: now,
        };
      } else if (m && inReview) {
        m.box = Math.min(m.box + 1, INTERVALS.length);
        m.due = m.box >= INTERVALS.length ? Infinity : now + INTERVALS[m.box];
        m.last = now;
      }
      save();
    },

    mistakes: () => Object.values(data.mistakes),
    isMastered: (m) => m.box >= INTERVALS.length,
    isDue: (m) => m.box < INTERVALS.length && m.due <= Date.now(),

    bookmarked: (id) => !!data.bookmarks[id],
    toggleBookmark(id) {
      if (data.bookmarks[id]) delete data.bookmarks[id];
      else data.bookmarks[id] = Date.now();
      save();
    },

    note: (id) => data.notes[id] || "",
    setNote(id, text) {
      if (text.trim()) data.notes[id] = text;
      else delete data.notes[id];
      save();
    },

    reset() {
      data = empty();
      save();
    },
  };
})();
