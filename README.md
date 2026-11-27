# A1 Make Up Studio & Unisex Salon — Website

One-page premium site for **A1 Make Up Studio & Unisex Salon**, KIIT Road, Prasanti Vihar, Patia, Bhubaneswar.
Built with React 19 + TypeScript + Vite, animated with GSAP/ScrollTrigger and Lenis.

Everything is static — no backend, no database, no API keys. It can be hosted free anywhere.

---

## 1. Run it on your computer

```bash
npm install
npm run dev
```

Open the printed URL (default http://127.0.0.1:5180).

To make a production build:

```bash
npm run build      # output goes to dist/
npm run preview    # check the built site locally
```

---

## 2. Put it on GitHub

**Easiest (no command line):**

1. Create a new repository on github.com (e.g. `a1-salon-website`). Do **not** tick "Add a README".
2. On your computer, open this folder, select **everything inside it** (including the hidden `.github` folder — in Windows Explorer enable *View → Hidden items*), and drag it into the GitHub upload page, then **Commit changes**.
3. Done — the source is on GitHub.

**With Git (recommended, keeps history):**

```bash
cd github-upload
git init
git add .
git commit -m "A1 Beauty salon website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

`node_modules`, `dist` and `.tmp` are already ignored by `.gitignore`, so only the real source and images are uploaded (~2.6 MB).

---

## 3. Go live (free)

### Option A — GitHub Pages (workflow already included)

`.github/workflows/deploy.yml` is ready. After pushing:

1. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Every push to `main` builds and publishes the site.
3. Live URL: `https://<your-username>.github.io/<repo-name>/`

The workflow builds with `--base=./` so the site also works from a sub-folder URL.

### Option B — Netlify (fastest, drag & drop)

1. `npm run build` on your computer.
2. Open https://app.netlify.com/drop and drag the **`dist`** folder in.
3. Live in seconds. Add your own domain later in *Domain settings*.

To auto-deploy on every push instead: Netlify → *Add new site → Import from GitHub* →
build command `npm run build`, publish directory `dist`.

### Option C — Vercel / Cloudflare Pages

Import the GitHub repo. Framework preset **Vite**, build command `npm run build`, output directory `dist`.

### Custom domain

Buy/point a domain (e.g. `a1makeupstudio.in`) at your host and follow its "custom domain" step.
For GitHub Pages add a `CNAME` file containing the domain in the repo root.

---

## 4. Editing the content

| What | Where |
| --- | --- |
| Phone, address, map links, hours, services, full price list, reviews, marquee words | `src/data.ts` |
| Hero / gallery / service photos | `public/images/` (keep the same file names) |
| Logo | `public/images/a1-logo.png`, `public/images/a1-mark.png` (original artwork kept in `brand/logo-original.png`) |
| Colours, fonts, spacing, animation styling | `src/styles.css` |
| Section text & layout | `src/components/*.tsx` |
| Page title / description / social preview | `index.html` |

Photos: gallery tiles are ~3:4 portrait or 3:2 landscape, ~1200 px on the long edge, JPG.
Replacing a file with the same name needs no code change.

---

## 5. Good to know

- **Opening hours are fixed in `src/data.ts`** (`hours`), taken from the Google listing. The "Open now / Closed" badge is calculated live in the visitor's browser in IST, so it always updates by itself — but if the salon changes its timings, edit `hours` and rebuild.
- No holiday exceptions are handled (a closed day will still show normal hours).
- Google reviews are quoted verbatim; the rating shows **4.9** with 371 reviews.
- The map on the page is Google's keyless embed and needs no API key.

---

© A1 Make Up Studio & Unisex Salon. Photography in `public/images/` is placeholder/editorial imagery — replace with the salon's own photos before a paid campaign.
