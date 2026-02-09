# Cloudflare Pages – Required Dashboard Setup

This project uses **static export** (no OpenNext, no 25 MiB limit). Configure the dashboard as below.

## 1. Build configuration

1. **Workers & Pages** → your project → **Settings** → **Builds & deployments**
2. Under **Build configuration** set:

| Setting | Value |
|--------|--------|
| **Framework preset** | **Next.js (Static HTML Export)** or **None** |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | *(leave empty)* |

Do **not** use the default **Next.js** preset (it uses OpenNext and produces an 88 MiB handler that fails).

## 2. Optional: skip Cloudflare’s install

If you want the build to use your own install step:

1. **Settings** → **Environment variables**
2. Add (Production and Preview):
   - **Name:** `SKIP_DEPENDENCY_INSTALL`
   - **Value:** `1`

Then set **Build command** to: `bash build.sh`  
(build.sh runs `npm install --legacy-peer-deps` then `npm run build`; output is still `out`).

## 3. Redeploy

Click **Retry deployment** or push a new commit.

---

See **CLOUDFLARE_PAGES_SETUP.md** for more detail.
