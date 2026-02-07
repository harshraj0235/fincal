# Run from project root. Uses npm from PATH.
# Build: npm install --legacy-peer-deps && npx opennextjs-cloudflare build
# Deploy: npx opennextjs-cloudflare deploy
Set-Location $PSScriptRoot
$ErrorActionPreference = "Stop"
Write-Host "Installing deps (legacy-peer-deps)..." -ForegroundColor Cyan
npm install --legacy-peer-deps
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Building for Cloudflare (OpenNext)..." -ForegroundColor Cyan
npx opennextjs-cloudflare build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Deploying to Cloudflare..." -ForegroundColor Cyan
npx opennextjs-cloudflare deploy
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Done." -ForegroundColor Green
