# Generate Clean, Optimized Sitemap (PowerShell version)
# Removes duplicates and optimizes for Google ranking

Write-Host "🔍 Analyzing sitemap..." -ForegroundColor Cyan

# Extract all URLs
$allUrls = Select-String -Path "public/sitemap.xml" -Pattern "<loc>(.*?)</loc>" | 
    ForEach-Object { $_.Matches.Groups[1].Value }

# Get unique URLs
$uniqueUrls = $allUrls | Select-Object -Unique | Sort-Object

$totalUrls = $allUrls.Count
$uniqueCount = $uniqueUrls.Count
$duplicates = $totalUrls - $uniqueCount

Write-Host "📊 Total URLs: $totalUrls" -ForegroundColor Yellow
Write-Host "✅ Unique URLs: $uniqueCount" -ForegroundColor Green
Write-Host "🗑️  Duplicates found: $duplicates" -ForegroundColor Red

# Function to determine priority and changefreq
function Get-UrlPriority {
    param($url)
    
    $priority = 0.5
    $changefreq = "monthly"
    $category = "other"
    
    # Homepage
    if ($url -eq "https://moneycal.in/" -or $url -eq "https://moneycal.in") {
        return @{priority=1.0; changefreq="daily"; category="homepage"}
    }
    
    # Top calculators
    if ($url -match "/(emi-calculator|sip-calculator|income-tax-calculator|home-loan-calculator|personal-loan-calculator|fd-calculator|ppf-calculator|nps-calculator|gst-calculator|budget-calculator)$") {
        return @{priority=0.9; changefreq="weekly"; category="top-calculator"}
    }
    
    # Hub pages
    if ($url -match "/(tools|finance-tools|tax-tools|gst-tools|insurance-tools|corporate-finance|loan-tools|blog|calculators)$") {
        return @{priority=0.9; changefreq="weekly"; category="hub"}
    }
    
    # All calculators
    if ($url -match "/calculators/") {
        return @{priority=0.8; changefreq="weekly"; category="calculator"}
    }
    
    # Blog posts and finance blog
    if ($url -match "/(blog|finance-blog)/") {
        return @{priority=0.7; changefreq="weekly"; category="blog"}
    }
    
    # Government schemes
    if ($url -match "/government-schemes/") {
        return @{priority=0.7; changefreq="monthly"; category="government-scheme"}
    }
    
    # Finance/Tax/GST/Loan tools
    if ($url -match "/(finance-tools|tax-tools|gst-tools|loan-tools|insurance-tools)/") {
        return @{priority=0.7; changefreq="weekly"; category="tool"}
    }
    
    # Crypto content
    if ($url -match "/crypto/") {
        return @{priority=0.6; changefreq="monthly"; category="crypto"}
    }
    
    # Excel tools
    if ($url -match "/(excel-tools|exceltool)/") {
        return @{priority=0.6; changefreq="monthly"; category="excel-tool"}
    }
    
    # Stock market
    if ($url -match "/stock-market/") {
        return @{priority=0.6; changefreq="monthly"; category="stock-market"}
    }
    
    # Invoicing tools
    if ($url -match "/invoicing-tools/") {
        return @{priority=0.6; changefreq="monthly"; category="invoicing-tool"}
    }
    
    # Gold tools
    if ($url -match "/gold-tools/") {
        return @{priority=0.6; changefreq="weekly"; category="gold-tool"}
    }
    
    # Important static pages
    if ($url -match "/(about-us|contact-us|privacy-policy|terms-of-service|disclaimer|help-center)$") {
        return @{priority=0.6; changefreq="monthly"; category="static-page"}
    }
    
    # Astro finance
    if ($url -match "/astro-finance/") {
        return @{priority=0.5; changefreq="monthly"; category="astro-finance"}
    }
    
    # Festival tools (seasonal - lower priority)
    if ($url -match "/festival-tools/") {
        return @{priority=0.4; changefreq="yearly"; category="festival-tool"}
    }
    
    # Default
    return @{priority=0.5; changefreq="monthly"; category="other"}
}

# Categorize all URLs
$categorizedUrls = $uniqueUrls | ForEach-Object {
    $info = Get-UrlPriority $_
    [PSCustomObject]@{
        Url = $_
        Priority = $info.priority
        Changefreq = $info.changefreq
        Category = $info.category
    }
} | Sort-Object -Property @{Expression="Priority"; Descending=$true}, Category

# Generate XML
$currentDate = Get-Date -Format "yyyy-MM-dd"
$xml = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Generated: $currentDate -->
  <!-- Total Unique URLs: $uniqueCount (Duplicates removed: $duplicates) -->
  <!-- Optimized for Google ranking with proper priorities -->
  <!-- Last updated: $currentDate -->

"@

$currentPriority = $null

foreach ($item in $categorizedUrls) {
    # Add priority comment when it changes
    if ($item.Priority -ne $currentPriority) {
        $label = switch ($item.Priority) {
            1.0 { "Homepage - Maximum Priority" }
            0.9 { "Top Calculators & Hub Pages - Very High Priority" }
            0.8 { "Calculators - High Priority" }
            0.7 { "Blog, Tools, Schemes - High Priority" }
            0.6 { "Crypto, Excel, Static Pages - Medium Priority" }
            0.5 { "Astro Finance - Medium-Low Priority" }
            0.4 { "Festival Tools - Low Priority (Seasonal)" }
            default { "Other Pages" }
        }
        $xml += "`n  <!-- PRIORITY $($item.Priority): $label -->`n"
        $currentPriority = $item.Priority
    }
    
    $xml += @"
  <url>
    <loc>$($item.Url)</loc>
    <lastmod>$currentDate</lastmod>
    <changefreq>$($item.Changefreq)</changefreq>
    <priority>$($item.Priority)</priority>
  </url>

"@
}

$xml += "</urlset>"

# Save clean sitemap
$xml | Out-File -FilePath "public/sitemap-clean.xml" -Encoding UTF8 -NoNewline

Write-Host "`n✅ Clean sitemap generated!" -ForegroundColor Green
Write-Host "📄 File: public/sitemap-clean.xml" -ForegroundColor Cyan
Write-Host "📊 Unique URLs: $uniqueCount" -ForegroundColor Green
Write-Host "🗑️  Duplicates removed: $duplicates" -ForegroundColor Yellow

# Show statistics
$stats = $categorizedUrls | Group-Object -Property Category | 
    Select-Object @{Name='Category';Expression={$_.Name}}, @{Name='Count';Expression={$_.Count}} |
    Sort-Object -Property Count -Descending

Write-Host "`n📈 URL Distribution by Category:" -ForegroundColor Cyan
$stats | ForEach-Object {
    Write-Host "  $($_.Category): $($_.Count) URLs" -ForegroundColor White
}

Write-Host "`n✅ Done! Review public/sitemap-clean.xml" -ForegroundColor Green
Write-Host "📝 Next: Replace sitemap.xml with sitemap-clean.xml if satisfied" -ForegroundColor Yellow

