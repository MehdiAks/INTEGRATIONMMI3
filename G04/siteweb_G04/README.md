# Léon Marchand sur l'eau

Landing page for the (parody) short film **_Léon Marchand sur l'eau_**, built as a
static site from the Figma maquette. Bilingual **FR / EN**, with a **video player**
that opens when you hit **Lecture / Play**.

No framework, no build step — just `index.html`, `styles.css`, `script.js`.

---

## Change the video

Open [`script.js`](script.js) and edit the settings block at the top:

```js
const VIDEO_URL  = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const POSTER_URL = "";   // e.g. "assets/affiche.jpg"
```

**`VIDEO_URL`** accepts:

| Source          | Example |
|-----------------|---------|
| YouTube         | `https://www.youtube.com/watch?v=XXXXXXXXXXX` |
| YouTube short   | `https://youtu.be/XXXXXXXXXXX` · `https://www.youtube.com/shorts/XXXXXXXXXXX` |
| Vimeo           | `https://vimeo.com/XXXXXXXX` |
| **Local file**  | drop the file in `assets/` and set `"assets/ma-video.mp4"` (`.mp4 .webm .ogg .mov`) |
| Remote file     | `https://.../trailer.mp4` |
| Anything else   | loaded as-is in an `<iframe>` |

**`POSTER_URL`** — the still image shown in the box before playback.
Leave `""` for the default blue panel, or point it at your own image
(e.g. `"assets/affiche.jpg"`). The play button + label stay on top of it.

The current link is a placeholder (Rick Astley — *Never Gonna Give You Up*).

---

## Quick editor (no code, no push)

Type the code **`leon`** anywhere on the page (or add `#edit` to the URL) — a panel
opens where you can:

- **load a video straight from your computer** (`.mp4 .webm .mov` …),
- paste a YouTube / Vimeo link,
- **change the image behind the player**.

⚠️ These changes are saved **only in that browser** (video → IndexedDB,
image + link → `localStorage`), so they survive a reload but **nobody else sees
them**. To publish for everyone, edit `VIDEO_URL` / `POSTER_URL` in `script.js`
and push. "Reset everything" in the panel clears the local changes.

Change the code with `const EDIT_CODE = "leon";` at the top of `script.js`
(set it to `""` to disable the editor).

---

## Cast → Wikipedia

Clicking a cast photo opens that person's Wikipedia page in a new tab. The links
live in `index.html` (`<a class="cast-link" href="…">`) — edit them there.

---

## Change the text / translations

All copy lives in the `I18N` object in [`script.js`](script.js), with a `fr` and an
`en` block. Each key matches a `data-i18n` attribute in `index.html`.
The page loads in the visitor's browser language, then remembers their choice
(`localStorage`). FR is the fallback.

To add a language: add a third block (e.g. `de: { … }`) with the same keys and a
matching `<button class="lang-btn" data-lang="de">DE</button>` in the nav.

---

## Change images

Replace the files in [`assets/`](assets/) keeping the same names, or rename them and
update the `src` in `index.html`.

```
assets/
  logo-mmi.png        nav logo (top-left cap)
  logo-nav.png        old wordmark (unused — swap back in index.html if wanted)
  title-logo.png      hero title lockup
  profile.png         nav avatar
  cast/*.jpg          6 cast photos
  reviews/*.jpg       4 reviewer avatars
```

---

## Run locally

Any static server works, e.g.:

```bash
npx serve .
# or
python -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` directly via `file://`
also works, but a server avoids browser quirks.)

---

## Deploy

### Netlify + GitHub (recommended)

1. Push this folder to a GitHub repo.
2. Netlify → **Add new site → Import an existing project** → pick the repo.
3. Build command: *(empty)* · Publish directory: `.`
   (`netlify.toml` already sets this.)
4. Deploy. Every push to the default branch redeploys.

### Netlify drag & drop

Drag the whole folder onto <https://app.netlify.com/drop>.

---

## Notes

- Unofficial fan project. Cast photos / names and the Disney-style layout are used
  for a student integration exercise, not for distribution.
- Accessibility: keyboard-navigable, focus-trapped modal, `Esc` to close,
  `prefers-reduced-motion` respected.
