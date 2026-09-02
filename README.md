# Sarwar's English Lab

Launch website for the **Sarwar's English Lab** (Instagram: [@english.with.mahmood.sarwar](https://instagram.com/english.with.mahmood.sarwar)) — grammar lessons plus the live courses run out of xSEL Academy, G-11 Markaz, Islamabad.

## What's here

A static site — no build step, no dependencies to install.

```
index.html      Landing page (offer bar, hero, courses, watch & follow, why choose us, reviews, about)
css/styles.css  Styling (navy/gold academic theme, responsive)
js/script.js    Mobile nav, course data + countdown + enroll modal
```

Page order is deliberately Courses right after the hero, since courses are the primary focus.

## Running locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Courses

The courses shown (Spoken English Course, Precis & Composition, Fundamentals of Grammar 2.0) are defined in one place: the `courses` array near the top of `js/script.js`. Each course has `features`, `schedule`, `mode`, `duration`, `startDate`, `priceOriginal`/`priceDiscounted`, and `offerEndsAt` (an ISO date/time — this drives both the course card's countdown and the sticky "early-bird" bar at the top of every page).

There's no payment processor wired up. Tapping "View Details & Enroll" opens a modal with the full course info and two buttons: **Enroll via WhatsApp** (opens `wa.me` with the course pre-filled in the message) and **Message on Instagram**. If you want real online payment collection later, that needs a payment provider account (e.g. JazzCash, Easypaisa, Stripe) wired up separately.

### Before opening a new batch

Update per course in the `courses` array in `js/script.js`:
- `priceOriginal` / `priceDiscounted` and the `10% OFF` label in both `index.html`'s course-card markup pattern (auto-generated, no manual edit needed) if the discount percentage changes — the "10% OFF" text is currently hardcoded in `js/script.js` in two spots (`course-price-off` in the card render and in `openCourseModal`), so search for `10% OFF` if the percentage changes.
- `offerEndsAt` — the early-bird deadline for that batch.
- `startDate`, `schedule`, `mode`, `duration`, `features`.

## Before launch

- The WhatsApp number (`0301-5095042` / `923015095042` international format) and Instagram handle (`english.with.mahmood.sarwar`) are already the real ones — double check them in `js/script.js` (`WHATSAPP_NUMBER`, `INSTAGRAM_HANDLE`) before going live.
- The course dates/prices are current as of when this site was built — refresh them before each new batch (see above).

## Deploying

Any static host works — GitHub Pages, Netlify, Vercel, or Cloudflare Pages. No build command is needed; the site is plain HTML/CSS/JS.
