# Build Ultimate Comprehensive Sitemap - All 1,640 URLs
$allUrls = Get-Content "unique-urls-backup.txt" | Where-Object { $_ -and $_ -match '^https://' }

$enhanced19 = @(
  'https://moneycal.in/calculators/emi-calculator',
  'https://moneycal.in/calculators/sip-calculator',
  'https://moneycal.in/calculators/home-loan-calculator',
  'https://moneycal.in/calculators/personal-loan-calculator',
  'https://moneycal.in/calculators/nps-calculator',
  'https://moneycal.in/calculators/retirement-calculator',
  'https://moneycal.in/calculators/gst-calculator',
  'https://moneycal.in/calculators/mutual-fund-returns-calculator',
  'https://moneycal.in/calculators/income-tax-calculator',
  'https://moneycal.in/calculators/compound-interest-calculator',
  'https://moneycal.in/calculators/car-loan-calculator',
  'https://moneycal.in/calculators/gratuity-calculator',
  'https://moneycal.in/calculators/hra-exemption-calculator',
  'https://moneycal.in/calculators/credit-card-emi-calculator',
  'https://moneycal.in/calculators/life-insurance-calculator',
  'https://moneycal.in/calculators/health-insurance-calculator',
  'https://moneycal.in/calculators/term-insurance-calculator',
  'https://moneycal.in/calculators/advance-tax-calculator',
  'https://moneycal.in/calculators/capital-gains-tax-calculator'
)

$sitemap = @'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- 
    ULTIMATE COMPREHENSIVE SITEMAP FOR MONEYCAL.IN
    Generated: 2025-01-20
    Total URLs: 1640+ (All unique URLs from complete site scan)
    
    Priority Strategy:
    1.0: Homepage
    0.9: 19 Enhanced Calculators (Updated TODAY!)
    0.9: Hub Pages
    0.8: All Other Calculators  
    0.7: Blog Posts, Crypto Articles
    0.6: Tools & Utilities
    0.5-0.4: Supporting Pages
  -->

  <!-- PRIORITY 1.0: Homepage -->
  <url>
    <loc>https://moneycal.in/</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- PRIORITY 0.9: TOP 19 ENHANCED CALCULATORS - Updated Today! -->

'@

# Add 19 enhanced calculators
foreach ($url in $enhanced19) {
  $sitemap += @"
  <url>
    <loc>$url</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

"@
}

$sitemap += "`n  <!-- ALL OTHER URLS -->`n"

# Add remaining URLs
foreach ($url in $allUrls) {
  if ($url -ne 'https://moneycal.in/' -and $enhanced19 -notcontains $url) {
    $priority = '0.7'
    $changefreq = 'monthly'
    $lastmod = '2024-12-20'
    
    # Set priorities based on URL type
    if ($url -match '/calculators/') { $priority = '0.8'; $changefreq = 'monthly' }
    elseif ($url -match '/blog/category/') { $priority = '0.7'; $changefreq = 'weekly' }
    elseif ($url -match '/(tools|finance-tools|tax-tools|gst-tools|insurance-tools|loan-tools)$') { $priority = '0.9'; $changefreq = 'weekly'; $lastmod = '2025-01-20' }
    elseif ($url -match '/blog/') { $priority = '0.7'; $changefreq = 'monthly' }
    elseif ($url -match '/crypto/') { $priority = '0.6'; $changefreq = 'monthly' }
    elseif ($url -match '/government-schemes/') { $priority = '0.6'; $changefreq = 'monthly' }
    elseif ($url -match '/tools/') { $priority = '0.6'; $changefreq = 'monthly' }
    elseif ($url -match '/festival-tools/') { $priority = '0.5'; $changefreq = 'monthly' }
    elseif ($url -match '/(about|contact|privacy|terms|disclaimer|cookie)') { $priority = '0.4'; $changefreq = 'yearly'; $lastmod = '2024-01-20' }
    
    $sitemap += @"
  <url>
    <loc>$url</loc>
    <lastmod>$lastmod</lastmod>
    <changefreq>$changefreq</changefreq>
    <priority>$priority</priority>
  </url>

"@
  }
}

$sitemap += @'

</urlset>
'@

# Save sitemap
$sitemap | Out-File "public/sitemap.xml" -Encoding UTF8 -NoNewline

$totalUrls = ($sitemap -split '<url>').Count - 1
Write-Host "✅ ULTIMATE COMPREHENSIVE SITEMAP CREATED!"
Write-Host "📁 Saved to: public/sitemap.xml"
Write-Host "📊 Total URLs: $totalUrls"
Write-Host "🎯 19 Enhanced calculators at Priority 0.9 with today's date!"
Write-Host "🚀 Ready for Google Search Console submission!"

