# Cloudflare Pages build

## Build command (auto-detects Cloudflare)

Use **Build command**: `npm run build`

The build script auto-detects Cloudflare Pages (CF_PAGES=1) and runs the OpenNext build. Output goes to `.open-next` (required by wrangler.toml).

## Alternative: explicit Cloudflare build

If auto-detect fails, set **Build command** to:
```bash
npm run build:cf:ci
```
Or:
```bash
bash build.sh
```

## If build fails with "package-lock.json missing"

1. **Root directory**: In Cloudflare dashboard → **Workers & Pages** → your project → **Settings** → **Builds & deployments** → **Build configuration**. Set **Root directory** to empty (use repo root) so `package-lock.json` at the repo root is used.

2. **Node version**: Set **Node.js version** to 20 (or 18) in Environment variables: `NODE_VERSION=20`

## wrangler.toml

`wrangler.toml` includes `pages_build_output_dir = ".open-next"` so Cloudflare accepts the config. The main app config remains in `wrangler.jsonc`.
