# Auto-Update Sitemap Dates
# Runs every 36 hours to keep sitemap fresh for Google

$sitemapPath = Join-Path $PSScriptRoot "public\sitemap.xml"
$currentDate = Get-Date -Format "yyyy-MM-dd"

Write-Host "Updating Sitemap Dates..." -ForegroundColor Cyan
Write-Host "Current Date: $currentDate" -ForegroundColor Green

# Read sitemap content
$content = Get-Content $sitemapPath -Raw

# Count existing lastmod tags
$oldMatches = ([regex]::Matches($content, '<lastmod>[\d-]+</lastmod>')).Count
Write-Host "Found $oldMatches date entries" -ForegroundColor Yellow

# Replace ALL dates with current date
$content = $content -replace '<lastmod>[\d-]+</lastmod>', "<lastmod>$currentDate</lastmod>"

# Write back to file
$content | Set-Content $sitemapPath -NoNewline

Write-Host "SUCCESS: Updated all dates to $currentDate" -ForegroundColor Green
Write-Host "Sitemap: $sitemapPath" -ForegroundColor Cyan

# Log the update
$logPath = Join-Path $PSScriptRoot "sitemap-update-log.txt"
$logEntry = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - Updated $oldMatches dates to $currentDate"
Add-Content -Path $logPath -Value $logEntry

Write-Host "Log updated: $logPath" -ForegroundColor Magenta
Write-Host ""
Write-Host "DONE! Google will see fresh content!" -ForegroundColor Green

