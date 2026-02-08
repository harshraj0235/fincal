# Deploy via GitHub Actions (avoids Cloudflare 4GB OOM)

Cloudflare Pages build has ~4GB RAM; this Next.js app needs more. Use GitHub Actions (7GB) to build and deploy.

## Setup

1. **Add GitHub secrets** (Settings → Secrets and variables → Actions):
   - `CLOUDFLARE_API_TOKEN` – Create at [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens) with "Edit Cloudflare Workers" + "Edit Cloudflare Pages" permissions
   - `CLOUDFLARE_ACCOUNT_ID` – From [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → Overview

2. **Disable Cloudflare Pages Git build** (otherwise both will run and Cloudflare will OOM):
   - Cloudflare Dashboard → Pages → moneycal → Settings → Builds & deployments
   - Set "Production branch" to a dummy branch (e.g. `deploy-disabled`), **or**
   - Disconnect the Git repository and rely on this workflow for deploys

3. **Push to `main`** – The workflow builds and deploys automatically.

## Flow

- `.github/workflows/build-deploy-cloudflare.yml` runs on push to `main`
- Build runs on GitHub (7GB RAM)
- Output deploys to Cloudflare Pages via `wrangler pages deploy`
