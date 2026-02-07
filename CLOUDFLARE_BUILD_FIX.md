# Fix Cloudflare Pages build (npm ci + wrangler)

## Quick fix – 2 minutes in Cloudflare dashboard

Cloudflare runs `npm ci` before your build, which requires `package-lock.json` to be in sync. If it fails, use this:

### Step 1 – Skip automatic install

1. **Cloudflare Dashboard** → **Workers & Pages** → your project
2. **Settings** → **Environment variables**
3. Add variable (Production + Preview):
   - **Name:** `SKIP_DEPENDENCY_INSTALL`
   - **Value:** `1`

### Step 2 – Build command

1. **Settings** → **Builds & deployments** → **Build configuration**
2. Set **Build command** to:
   ```bash
   npm install --legacy-peer-deps && npm run build
   ```
3. **Build output directory:** `.open-next` (or leave default if it uses wrangler)
4. **Root directory:** empty (use repo root)

### Step 3 – Redeploy

Click **Retry deployment** or push a commit.

---

## Alternative – Regenerate lock file

1. GitHub → **Actions** → **Update package-lock.json**
2. **Run workflow**
3. After it pushes, trigger a new Cloudflare deploy
