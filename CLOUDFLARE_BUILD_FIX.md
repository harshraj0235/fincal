# Fix Cloudflare build (do this in the dashboard)

Your build fails because **Cloudflare runs `npm ci`**, which needs `package-lock.json` to match `package.json`. The lock file in this repo is out of date.

**Fix in Cloudflare (about 2 minutes):**

## Step 1 – Skip automatic install

1. Open **Cloudflare Dashboard** → **Workers & Pages** → your **fincal** project.
2. Go to **Settings** → **Environment variables**.
3. Click **Add variable** (for **Production**; add for **Preview** too if you use it):
   - **Variable name:** `SKIP_DEPENDENCY_INSTALL`
   - **Value:** `1`
4. Save.

## Step 2 – Build command does install + OpenNext

1. In the same project, go to **Settings** → **Builds & deployments** → **Build configuration**.
2. Set **Build command** to exactly:
   ```bash
   npm install --legacy-peer-deps && npx opennextjs-cloudflare build
   ```
3. Save.

## Step 3 – Redeploy

- Open the **Deployments** tab and click **Retry deployment** on the latest build (or push a commit to trigger a new build).

After this, Cloudflare will no longer run `npm ci`. Your build command will run `npm install --legacy-peer-deps` (so the lock file does not need to be in sync), then the OpenNext build.

---

For more options (e.g. updating the lock file and using `npm ci` again), see **CLOUDFLARE_DEPLOY.md** → section “Fix: npm ci / lock file out of sync”.
