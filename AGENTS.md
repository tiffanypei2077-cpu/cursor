# AGENTS.md

## Cursor Cloud specific instructions

This repository is a **zero-dependency static prototype** (plain HTML/CSS/JS). There is no
package manager, no build step, no automated tests, and no lint config. See `README.md` for
the product overview and screen list.

### Running the app (dev)

Serve the repo root with any static file server; hash routing is more reliable behind an
HTTP server than opening files directly. Python 3 is preinstalled:

```bash
python3 -m http.server 8123
```

- Overview / gallery of all screens: `http://localhost:8123/index.html`
- Interactive clickable prototype: `http://localhost:8123/prototype.html`
  (deep links supported, e.g. `prototype.html#chat`)

### Notes / gotchas

- All screens are defined in `assets/js/screens.js` as `render(state)` functions; the gallery
  (`index.html`) and interactive prototype (`prototype.html`) share this single source, so
  editing `screens.js` updates both.
- UI copy lives in `assets/js/i18n.js`; only `en`/`zh` are fully translated (others fall back
  to English). Taught Chinese content always stays in Chinese.
- No dependencies to install — the update script is effectively a no-op (just verifies Python
  exists). Do not add a build/lint/test step unless the project introduces one.
- Deployment is via GitHub Pages (`.github/workflows/pages.yml`), which just uploads the repo
  root as-is; there is nothing to build.
