# ⚠️ Cloudflare build failing? Do this (2 min)

Your build fails at **"npm ci"** because Cloudflare runs `npm ci` before your build. Fix it:

## Step 1: Cloudflare Dashboard

1. Go to **Cloudflare Dashboard** → **Workers & Pages** → your **moneycal** project
2. **Settings** → **Environment variables**
3. Add (for **Production** and **Preview**):
   - **Variable name:** `SKIP_DEPENDENCY_INSTALL`
   - **Value:** `1`

## Step 2: Build command

1. **Settings** → **Builds & deployments** → **Build configuration**
2. Set **Build command** to:
   ```
   npm install --legacy-peer-deps && npm run build
   ```
3. **Root directory:** leave empty (use repo root)

## Step 3: Redeploy

Click **Retry deployment** or push a commit.

---

After this, Cloudflare will skip `npm ci` and your build command will install dependencies.
