# Cloudflare Pages build

## If build fails with "package-lock.json missing"

1. **Root directory**: In Cloudflare dashboard → **Workers & Pages** → your project → **Settings** → **Builds & deployments** → **Build configuration**. Set **Root directory** to empty (use repo root) so `package-lock.json` at the repo root is used.

2. **Custom install**: If it still fails, set **Build command** to:
   ```bash
   npm install --legacy-peer-deps && npm run build
   ```
   This skips relying on `npm ci` and installs from `package.json` then builds.

## wrangler.toml

`wrangler.toml` includes `pages_build_output_dir = ".open-next"` so Cloudflare accepts the config. The main app config remains in `wrangler.jsonc`.
