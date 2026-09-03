# Sarwar's English Lab

Launch website for the **Sarwar's English Lab** (Instagram: [@english.with.mahmood.sarwar](https://instagram.com/english.with.mahmood.sarwar)) — grammar lessons plus the live courses run out of xSEL Academy, G-11 Markaz, Islamabad.

## What's here

A static site — no build step, no dependencies to install.

```
index.html         Landing page (offer bar, hero, courses, watch & follow, why choose us, reviews, about)
css/styles.css      Styling (navy/gold academic theme, responsive)
js/script.js        Mobile nav, countdown, enroll modal — fetches its content from content/*.json
content/courses.json       Course names, prices, schedules, offer deadlines
content/testimonials.json  Review cards in "What learners say"
content/stats.json         The "30/25/25 successful batches" numbers
content/about.json         The two founder-bio paragraphs
admin/                     The content editor (see "Editing content" below)
```

Page order is deliberately Courses right after the hero, since courses are the primary focus.

## Running locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Courses

The courses shown (Spoken English Course, Precis & Composition, Fundamentals of Grammar 2.0) live in `content/courses.json`, and `js/script.js` fetches and renders them on page load. Each course has `features`, `schedule`, `mode`, `duration`, `startDate`, `priceOriginal`/`priceDiscounted`, and `offerEndsAt` (an ISO date/time — this drives both the course card's countdown and the sticky "early-bird" bar at the top of every page). A course's internal ID is generated automatically from its name, so renaming a course is safe.

There's no payment processor wired up. Tapping "View Details & Enroll" opens a modal with the full course info and two buttons: **Enroll via WhatsApp** (opens `wa.me` with the course pre-filled in the message) and **Message on Instagram**. If you want real online payment collection later, that needs a payment provider account (e.g. JazzCash, Easypaisa, Stripe) wired up separately.

### Before opening a new batch

Update the relevant course entry in `content/courses.json` (directly, or through the `/admin` content editor — see below):
- `priceOriginal` / `priceDiscounted` — the "10% OFF" label text itself is still hardcoded in `js/script.js` (search for `10% OFF`) if the discount percentage ever changes.
- `offerEndsAt` — the early-bird deadline for that batch.
- `startDate`, `schedule`, `mode`, `duration`, `features`.

## Editing content without touching code

`/admin` is a content editor (Decap CMS) that lets a non-technical person log in and edit courses, testimonials, the "Why Choose Us" numbers, and the About bio through simple forms — no code, no GitHub required day-to-day. Editing anything else (layout, colors, adding new sections) still needs a developer.

**One-time setup, after deploying to Netlify:**
1. In the Netlify dashboard for this site: **Site configuration → Identity → Enable Identity**.
2. Still under Identity: **Services → Git Gateway → Enable Git Gateway**. This is what lets the admin panel save changes back to GitHub on the editor's behalf.
3. Under **Identity → Invite users**, invite the client's email address.
4. They'll get an email invite — clicking it lets them set a password, and drops them straight into `yoursite.com/admin/`.

After that, they visit `yoursite.com/admin` any time, log in, edit a field, and click **Publish** — the live site updates automatically within a minute or two (Netlify rebuilds and redeploys on every save).

This only works once the site is live on Netlify — there's nothing to log into locally or in a preview.

## Before launch

- The WhatsApp number (`0301-5095042` / `923015095042` international format) and Instagram handle (`english.with.mahmood.sarwar`) are already the real ones — double check them in `js/script.js` (`WHATSAPP_NUMBER`, `INSTAGRAM_HANDLE`) before going live.
- The course dates/prices are current as of when this site was built — refresh them before each new batch (see above).

## Deploying

Deploy to **Netlify** to get the `/admin` content editor working (see above) — connect this GitHub repo and it auto-deploys on every push, free. GitHub Pages, Vercel, or Cloudflare Pages also work as plain static hosts if the content editor isn't needed, but they don't support `/admin` out of the box. No build command is needed either way; the site is plain HTML/CSS/JS.
