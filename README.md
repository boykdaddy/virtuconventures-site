# virtuconventures.com

Plain static site, served by GitHub Pages from the `main` branch root. No WordPress, no CMS, no server.

## Files
- `index.html`, `info/`, `incubations/`, `contact/`, `404.html` — the pages (generated)
- `assets/` — CSS, clock script, logo (`v.svg`), favicon, share image, bundled 3D logo (`v3d.js`)
- `src/make_pages.py` — page text lives here (description, incubations list, contact email). Edit this, not the HTML.
- `src/v3d.js` — the spinning 3D "V" (Three.js). Colour `#BF00FF` on `#050505`.

## Changing the site
1. Edit `src/make_pages.py` (copy) or `src/v3d.js` (logo).
2. `npm install && npm run build`
3. Commit and push to `main`. Live in about a minute.

Add `#still` to any URL to stop the logo spinning (for screenshots).
