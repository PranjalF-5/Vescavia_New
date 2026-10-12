# Vescavia — Integrated Creative-Tech Partner

Marketing site for Vescavia, including the OrbitDesk "coming soon" announcement.

**Stack:** React 19 · Vite 6 · Tailwind CSS 3 · framer-motion

## Run locally

Prerequisites: Node.js 20+

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
npm run analyze    # build + bundle report (dist/stats.html — do not deploy this file)
```

## Editing content

- OrbitDesk copy (name, tagline, pillars): `content/orbitdesk.ts`
- Contact form endpoint and public contact details: `content/site.ts`

## Colour palettes

The whole site is themed from CSS variables (see the top of `index.css`). Four presets ship:
`aurora` (default), `sunset`, `acid`, `ultraviolet`.

- Try one: `/?palette=sunset` (remembered in that browser) · `/?palette=default` resets
- On-page picker: `/?lab`
- Make a different one the default: see the note at the top of `content/palettes.ts`

## Security notes

- The production build injects a Content-Security-Policy `<meta>` tag and emits a `_headers`
  file (Netlify / Cloudflare Pages format). Both are generated from the single policy in
  `vite.config.ts`. On other hosts, copy those headers into the host's configuration;
  `frame-ancestors` and `X-Frame-Options` only work as real HTTP headers.
- No API keys are bundled into the client. Do not add secrets to `VITE_*` variables or `define`
  blocks — anything referenced from client code is public.
- `.env*` files are git-ignored (except `.env.example`).
