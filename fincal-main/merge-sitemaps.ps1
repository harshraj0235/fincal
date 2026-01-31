# Smart Sitemap Merger - Add important URLs from backup, remove duplicates
$backupUrls = Get-Content "unique-urls-backup.txt"
$currentUrls = Get-Content "unique-urls-current.txt"

# Find URLs in backup but not in current
$missingUrls = $backupUrls | Where-Object { $currentUrls -notcontains $_ }

Write-Host "Backup URLs: $($backupUrls.Count)"
Write-Host "Current URLs: $($currentUrls.Count)"
Write-Host "Missing URLs to add: $($missingUrls.Count)"

# Categorize missing URLs by importance
$highPriority = $missingUrls | Where-Object { 
    $_ -match '/calculators/' -or 
    $_ -match '/blog/' -or 
    $_ -match '/finance-blog/' -or
    $_ -match '/excel-tools/' -or
    $_ -match '/government-schemes/'
}

$mediumPriority = $missingUrls | Where-Object {
    $_ -match '/crypto/' -or
    $_ -match '/tools/' -or
    $_ -match '/astro-finance/'
}

Write-Host "`nHigh Priority URLs (calculators, blogs): $($highPriority.Count)"
Write-Host "Medium Priority URLs (crypto, tools): $($mediumPriority.Count)"

# Save categorized URLs
$highPriority | Out-File "high-priority-urls.txt" -Encoding UTF8
$mediumPriority | Out-File "medium-priority-urls.txt" -Encoding UTF8

Write-Host "`n✅ URL analysis complete!"
Write-Host "📁 Check: high-priority-urls.txt and medium-priority-urls.txt"

