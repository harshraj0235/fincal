# Run from project root. Uses npm from PATH.
# Static export for Cloudflare Pages (no 25 MiB handler limit)
# Build: npm run build  ->  output in out/
# Deploy: npx wrangler pages deploy out --project-name=moneycal
Set-Location $PSScriptRoot
$ErrorActionPreference = "Stop"
Write-Host "Installing deps (legacy-peer-deps)..." -ForegroundColor Cyan
npm install --legacy-peer-deps
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Building static export for Cloudflare Pages..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Deploying out/ to Cloudflare Pages..." -ForegroundColor Cyan
npx wrangler pages deploy out --project-name=moneycal
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Done." -ForegroundColor Green
