# ⚠️ Cloudflare Build Failing?

**You must configure the Cloudflare dashboard.** See **[CLOUDFLARE_DASHBOARD_SETUP.md](./CLOUDFLARE_DASHBOARD_SETUP.md)** for exact steps.

Quick fix:
1. Add env var `SKIP_DEPENDENCY_INSTALL` = `1`
2. Set Build command: `bash build.sh`
3. Set Build output directory: `.open-next`
