# Next.js migration (SSG + ISR) – Google-friendly

The codebase supports **two run modes**. You can keep using Vite or switch to Next.js. Next.js build is tuned for **Google ranking**: SSG/ISR, sitemap, robots, JSON-LD, metadata.

## Run modes

| Purpose        | Vite (current)              | Next.js (SSG + ISR)        |
|----------------|-----------------------------|-----------------------------|
| **Dev**        | `npm run dev`               | `npm run dev:next`          |
| **Build**      | `npm run build`             | `npm run build:next`         |
| **Preview**    | `npm run preview`           | `npm run start:next`         |

- **Vite:** `npm run dev` / `npm run build` → unchanged; same SPA as before.
- **Next.js:** `npm run dev:next` / `npm run build:next` / `npm run start:next` → App Router, SSG, and ISR (`revalidate`).

## Branch workflow

- The Next.js migration lives on the **`nextjs-migration`** branch.
- Test there first, then merge into `main` when ready:

```bash
git checkout nextjs-migration
npm install
npm run build:next
npm run start:next
# Manual test: /, /blog, /calculators/emi-calculator, /news, etc.

git checkout main
git merge nextjs-migration
git push origin main
```

## After merging

You can:

- Keep both: use `dev`/`build` for Vite and `dev:next`/`build:next` for Next.
- Or standardize on Next: point your deploy to `npm run build:next` and `npm run start:next`.
