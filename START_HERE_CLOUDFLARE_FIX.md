# Cloudflare build failing? Fix in 2 minutes

If you see **"npm ci"** or **"package-lock.json"** errors:

1. **Cloudflare Dashboard** → your project → **Settings** → **Environment variables**
2. Add: `SKIP_DEPENDENCY_INSTALL` = `1` (Production + Preview)
3. **Settings** → **Builds & deployments** → **Build command**: `npm install --legacy-peer-deps && npm run build`
4. **Retry deployment**

See **CLOUDFLARE_BUILD_FIX.md** for full details.
