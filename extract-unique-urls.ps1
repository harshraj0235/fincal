# Extract unique URLs from backup sitemap and create comprehensive sitemap
$backupFile = "public/sitemap-backup-original.xml"
$outputFile = "public/sitemap-comprehensive.xml"

# Extract all URLs
$content = Get-Content $backupFile -Raw
$urls = [regex]::Matches($content, '<loc>(https://moneycal\.in[^<]+)</loc>') | ForEach-Object { $_.Groups[1].Value }

# Remove duplicates and sort
$uniqueUrls = $urls | Select-Object -Unique | Sort-Object

Write-Host "Total URLs found: $($urls.Count)"
Write-Host "Unique URLs: $($uniqueUrls.Count)"
Write-Host "Duplicates removed: $($urls.Count - $uniqueUrls.Count)"

# Save to file for review
$uniqueUrls | Out-File "unique-urls.txt" -Encoding UTF8

Write-Host "`n✅ Unique URLs saved to: unique-urls.txt"
Write-Host "📊 Total unique URLs: $($uniqueUrls.Count)"

