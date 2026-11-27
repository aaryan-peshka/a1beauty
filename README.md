# A1 Make Up Studio & Unisex Salon — Static Website

One-page editorial website for **A1 Make Up Studio & Unisex Salon**, KIIT Road, Prasanti Vihar, Patia, Bhubaneswar.

This is a **100% pure static website** (plain HTML, CSS, and vanilla JavaScript with local fonts, images, GSAP, and Lenis). It requires **no backend, no database, no Node.js, and no build step** — you can even open `index.html` directly in your browser without running any server.

---

## Structure

- `index.html` — Complete static page markup and content
- `styles.css` — All styles and `@font-face` rules
- `script.js` — Animations, preloader, custom cursor, mobile menu, price menu tabs, and live IST open/closed status
- `assets/fonts/` — Self-hosted Bodoni Moda & Jost variable `.woff2` fonts
- `assets/vendor/` — Local non-module browser builds of GSAP, ScrollTrigger, and Lenis
- `images/` — Salon photography and logos
- `favicon.png` — Site icon

---

## Run or Deploy

### Open locally (no server needed)
Double-click `index.html` to open it directly in any browser (`file://`), or serve the folder with any static server.

### GitHub Pages
1. Push all files to your repository.
2. Go to **Settings → Pages**:
   - Either select **Deploy from a branch** → branch **`main`**, folder **`/ (root)`**, **or**
   - Select **GitHub Actions** (uses `.github/workflows/deploy.yml`).

### Netlify / Vercel / Cloudflare Pages / cPanel
Upload or point directly to this root folder (no build command needed).
