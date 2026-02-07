# Cloudflare Pages – Required Dashboard Setup

The build fails because Cloudflare runs `npm ci` before your build. You **must** apply these settings in the Cloudflare dashboard.

> **Important:** The build command must be `bash build.sh` or `npm run build:cf:ci`, **NOT** `npm run build`. Using `npm run build` would cause an infinite recursion loop.

## 1. Environment variable

1. **Workers & Pages** → your project → **Settings** → **Environment variables**
2. Add (Production and Preview):
   - **Name:** `SKIP_DEPENDENCY_INSTALL`
   - **Value:** `1`

## 2. Build configuration

1. **Settings** → **Builds & deployments** → **Build configuration**
2. Set:
   - **Build command:** `bash build.sh` (or `npm run build:cf:ci`)
   - **Build output directory:** `.open-next`
   - **Root directory:** *(leave empty)*

## 3. Redeploy

Click **Retry deployment** or push a new commit.

---

After this, Cloudflare skips `npm ci` and `build.sh` will install dependencies and run the OpenNext build.
