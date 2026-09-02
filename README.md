# Sarwar's English Lab

Launch website for the **Sarwar's English Lab** Instagram account, teaching English grammar through short, no-jargon lessons.

## What's here

A static site — no build step, no dependencies to install.

```
index.html      Landing page (hero, tips, quiz, Instagram feed preview, reviews, about)
css/styles.css  Styling (navy/cream academic theme, responsive)
js/script.js    Mobile nav, grammar tip generator, interactive quiz, feed grid
```

## Running locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Before launch

- Swap `sarwars.english.lab` (used in the Instagram links) for the real handle throughout `index.html` and `js/script.js`.
- Replace the `hello@sarwarsenglishlab.com` placeholder email in the footer with a real contact address.
- Swap in real Instagram post screenshots/graphics for the feed grid if you'd like actual thumbnails instead of the styled placeholder cards.

## Deploying

Any static host works — GitHub Pages, Netlify, Vercel, or Cloudflare Pages. No build command is needed; the site is plain HTML/CSS/JS.
