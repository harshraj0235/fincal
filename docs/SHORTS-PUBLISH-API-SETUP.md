# News Shorts – Publish to GitHub (all devices)

When you add a short from **any device** at `/add-shorts-news`, it can be written **directly to GitHub** so that after the next deploy (Cloudflare Pages / Vercel), **everyone** sees it.

## Flow

1. You submit a short at `/add-shorts-news` (password: **Harson**).
2. Frontend POSTs to **`/api/publish-short`** with `{ password, short }`.
3. The API appends the short to **`public/custom-shorts.json`** in your repo via GitHub API and commits.
4. GitHub push triggers your **Cloudflare Pages** or **Vercel** rebuild.
5. New deploy serves updated **`/custom-shorts.json`**; the app loads it and merges with static shorts → **all users see the new short**.

## 1. GitHub token

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** (or fine-grained).
2. Create a token with **repo** scope (or **Contents: read and write** for the repo).
3. Copy the token; you’ll set it as **`GITHUB_TOKEN`** in your host.

## 2. Environment variables

Set these in your hosting dashboard (Vercel or Cloudflare Pages):

| Variable | Example | Required |
|---------|--------|----------|
| **ADD_SHORTS_PASSWORD** | `Harson` | Yes (must match what you enter on the form) |
| **GITHUB_TOKEN** | `ghp_xxxx` | Yes |
| **GITHUB_REPO** | `yourusername/fincal-main` | Yes (owner/repo) |
| **GITHUB_FILE_PATH** | `public/custom-shorts.json` | No (default above) |

## 3a. Vercel

- Project root must contain the **`api/`** folder (with **`api/publish-short.js`**).
- In **Vercel** → **Project** → **Settings** → **Environment Variables**, add the four variables above.
- Redeploy. `POST /api/publish-short` will be available at your Vercel URL.

## 3b. Cloudflare Pages

- Project root must contain the **`functions/`** folder (with **`functions/api/publish-short.js`**).
- In **Cloudflare Dashboard** → **Pages** → your project → **Settings** → **Environment variables**, add the same variables (for Production and/or Preview).
- Redeploy. `POST /api/publish-short` will be available at `https://your-site.pages.dev/api/publish-short`.

## 4. Connect GitHub → deploy

- **Vercel**: Connect the GitHub repo; every push (including the one from the API) triggers a new build.
- **Cloudflare Pages**: Connect the same repo; every push triggers a new Pages build.

So when the API commits to **`public/custom-shorts.json`**, the next build will include that file and all users will get the new shorts.

## 5. If the API is not set up

- The frontend still works: it falls back to **localStorage** on the device where you clicked Publish.
- That short will only appear on **that browser** until you configure the API and env vars as above.

## File layout

- **`public/custom-shorts.json`** – JSON array of custom shorts (committed; API appends to it).
- **`api/publish-short.js`** – Vercel serverless handler.
- **`functions/api/publish-short.js`** – Cloudflare Pages Function handler.
