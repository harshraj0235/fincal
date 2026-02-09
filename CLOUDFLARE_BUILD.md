# Cloudflare Pages – Build configuration (harshraj0235/fincal)

This repo **root** is the **SvelteKit** app. Use this in Cloudflare Pages:

| Setting | Value |
|--------|--------|
| **Build command** | `npm run build` |
| **Build output directory** | `.svelte-kit/cloudflare` |
| **Root directory** | *(leave empty)* |

No environment variables required. The build runs `vite build` and outputs to `.svelte-kit/cloudflare` (adapter-cloudflare).

---

## GitHub Actions: deploy on push

The workflow **Build and Deploy to Cloudflare** deploys `.svelte-kit/cloudflare` to Cloudflare Pages on push to `main`. To enable deploy (otherwise the workflow only builds and skips deploy):

1. Create a Cloudflare API token: https://developers.cloudflare.com/fundamentals/api/get-started/create-token/  
   - Use “Edit Cloudflare Workers” or a custom token with **Account** → **Cloudflare Pages** → **Edit**.
2. In your GitHub repo: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
3. Add:
   - **Name:** `CLOUDFLARE_API_TOKEN`  
   - **Value:** the token from step 1.
4. (Optional) Add **`CLOUDFLARE_ACCOUNT_ID`** with your Cloudflare Account ID (dashboard URL or Account sidebar).

---

The **Next.js** app is in the **`next-app/`** folder. To build or run it locally: `cd next-app && npm install && npm run build`.
