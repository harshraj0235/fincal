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

The workflow **Build and Deploy to Cloudflare** deploys the built site to Cloudflare Pages on push to `main`. To enable deploy, create an API token and add it in GitHub.

---

## Cloudflare API token – settings guide

Use this when you see **Create Custom Token** under **Account** → **API Tokens** (or **My Profile** → **API Tokens**).

### 1. Open token creation

- **Manage account** → **API tokens** → **Create Token** → **Create Custom Token**.

### 2. Token name

- **Token name:** e.g. `MONEYCAL` or `MoneyCal Pages Deploy`  
- Any descriptive name so you can recognise it later.

### 3. Permissions

Add **one** row with these values:

| Field        | Value |
|-------------|--------|
| **Resources** | **Account** |
| **Permissions** | **Edit** (or at least **Cloudflare Pages: Edit**) |

- If you see a template, **“Edit Cloudflare Workers”** is also enough (it includes Pages).
- If you only see granular: use **Account** → **Edit**, or **Account** → **Cloudflare Pages** → **Edit**.

### 4. Client IP Address Filtering (optional)

- **Operator:** leave default (e.g. “is in”) or “all”.
- **Value:** leave empty so the token works from **any** IP (needed for GitHub Actions).  
- Only add IPs if you want to restrict use to specific machines.

### 5. TTL (optional)

- Leave **default** (no expiry) so the token works until you revoke it.  
- Or set an expiry (e.g. 1 year) and recreate the token before it expires.

### 6. Create and copy

- Click **Continue to summary** → **Create Token**.
- **Copy the token immediately** (it’s shown only once).  
- Store it somewhere safe; you’ll paste it into GitHub in the next section.

---

## Add token to GitHub (so deploy works)

1. In your repo: **Settings** → **Secrets and variables** → **Actions**.
2. **New repository secret**.
3. **Name:** `CLOUDFLARE_API_TOKEN`  
4. **Value:** paste the token you copied.  
5. (Optional) Add **`CLOUDFLARE_ACCOUNT_ID`** with your Cloudflare Account ID (from dashboard URL or Account sidebar).

After saving, the next run of **Build and Deploy to Cloudflare** will deploy to Cloudflare Pages (if the secret is set).

---

The **Next.js** app is in the **`next-app/`** folder. To build or run it locally: `cd next-app && npm install && npm run build`.
