# loop-site

The public pages for Loop, the NYC run builder: the waitlist (`/`) and the privacy page (`/privacy/`).
Two static HTML files, one stylesheet, one small script for the form, no framework, served by GitHub Pages from `main`.

The copy is `pages-copy-v1.md` (2026-11-23). The type and colours are the app's own tokens
(`ios/Loop/Design/Colors.swift` and `Typography.swift` in [project_loop](https://github.com/jaredjgrossi/project_loop)):
Fraunces for headlines, Instrument Sans for body, the Paper palette by default and Night under `prefers-color-scheme: dark`.
Both fonts are SIL OFL 1.1; the licences ship in `assets/fonts/`.

## The form

The waitlist is the site's own HTML form (`index.html`, styled in `assets/site.css`). `assets/form.js` posts each
entry to Tally's respond endpoint for form `xVJzGG` (`https://api.tally.so/forms/xVJzGG/respond`), with the same
payload Tally's own page sends: the questions' group ids as keys, choices as arrays of option ids. Entries land in
Tally like any other. If a post fails, the page says so and links to the form on Tally.

The Tally form has these questions, in this order; the ids in `form.js` come from its definition (`tally.so/r/xVJzGG`):

1. Email (required)
2. Where do you usually start your runs? (neighborhood, free text)
3. Usual distance (under 3 mi · 3–5 · 5–8 · 8+)
4. What do you run with? (Apple Watch · Garmin · phone only · other)
5. iPhone? (yes / no) — the beta is iPhone only
6. Anything you want Loop to get right? (optional, free text)

Button: **Put me on the list**. After submit the page shows: *You're on it. I'll be in touch when the first build is
ready. Until then, the code and every decision behind it are on GitHub.*

If a question is added or reordered in Tally, update the ids in `form.js`.

## Contact

The contact address is `tryloopnyc@gmail.com`, in `privacy/index.html` (two places).

## Working on it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```
