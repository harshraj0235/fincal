# MoneyCal - AUTOMATIC EMAIL SYSTEM (Every 3 Hours)
# Step 1: Extract latest content from sitemap
# Step 2: Send emails to all subscribers
# Step 3: Prioritize newest content

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "  MONEYCAL AUTOMATED EMAIL SYSTEM - FULL AUTO MODE" -ForegroundColor Cyan
Write-Host "============================================================`n" -ForegroundColor Cyan

# Load configuration
$configFile = Join-Path $PSScriptRoot "config-DONOTCOMMIT.ps1"
if (Test-Path $configFile) {
    . $configFile
} else {
    Write-Host "ERROR: Configuration file not found!" -ForegroundColor Red
    Write-Host "Create config-DONOTCOMMIT.ps1 with your credentials" -ForegroundColor Yellow
    exit
}

Write-Host "[1/4] Extracting latest content from sitemap..." -ForegroundColor Yellow

# Load and parse sitemap
$sitemapPath = Resolve-Path "..\public\sitemap.xml"
[xml]$sitemap = Get-Content $sitemapPath -Encoding UTF8

# Extract URLs (priority 1.0 and 0.9 only - latest and most important)
$highPriorityUrls = $sitemap.urlset.url | Where-Object { 
    [double]$_.priority -ge 0.9 -and 
    $_.loc -notlike "*#*" -and
    $_.loc -ne "https://moneycal.in/" -and
    $_.loc -notmatch '/$'
} | Sort-Object lastmod -Descending | Select-Object -First 50

# Smart title generation
function Get-SmartTitle($url, $category) {
    $titles = @{
        "akshaya-tritiya-muhurat" = "Akshaya Tritiya 2025 Gold Muhurat - Best Time to Buy Gold"
        "puja-vidhi-generator" = "Complete Puja Vidhi Generator - Hindu Rituals in Hindi"
        "chhath-puja-arghya" = "Chhath Puja 2025 Arghya Time Finder"
        "sip-calculator" = "SIP Calculator - See Rs.5K Become Rs.50 Lakhs"
        "emi-calculator" = "EMI Calculator - Home, Car & Personal Loans"
        "income-tax-calculator" = "Income Tax Calculator 2025-26"
        "diwali-date-finder" = "Diwali 2025 Complete 5-Day Schedule"
        "navratri-dates" = "Navratri 2025 - 9-Day Durga Puja Guide"
    }
    
    foreach ($key in $titles.Keys) {
        if ($url -like "*$key*") {
            return $titles[$key]
        }
    }
    
    # Fallback: Generate from URL
    $path = $url -replace 'https://moneycal.in/', '' -replace '/', ' '
    $titleParts = $path -split '-' | ForEach-Object { 
        if ($_.Length -gt 0) {
            $_.Substring(0,1).ToUpper() + $_.Substring(1)
        }
    }
    $title = $titleParts -join ' '
    return $title
}

# Smart description generation
function Get-SmartDescription($url, $category) {
    $descriptions = @{
        "akshaya-tritiya" = "Find exact Abhijit Muhurat for gold buying! Historical prices Rs.47K to Rs.78K, Rahu Kaal timings, 30+ cities covered."
        "puja-vidhi" = "Step-by-step puja procedures with mantras, samagri lists, regional variations. Hindi and English supported!"
        "chhath-puja" = "Exact Sandhya Arghya sunset and Usha Arghya sunrise times for 50+ cities. Complete 4-day guide!"
        "sip-calculator" = "Advanced SIP calculator with year-by-year breakdown. See your wealth grow with systematic investing!"
        "diwali" = "Complete Diwali schedule with Lakshmi puja muhurat, Dhanteras, Govardhan Puja dates!"
        "navratri" = "9-day calendar with goddess forms, colors, offerings, and Kanya Puja timings!"
    }
    
    foreach ($key in $descriptions.Keys) {
        if ($url -like "*$key*") {
            return $descriptions[$key]
        }
    }
    
    return "Discover this valuable financial and festival resource from MoneyCal.in! Click to explore our comprehensive tool."
}

# Categorize URL
function Get-SmartCategory($url) {
    switch -Wildcard ($url) {
        "*festival-tools/akshaya*" { return "Gold & Festival - NEW" }
        "*religious-tools/puja*" { return "Religious Tool - NEW" }
        "*festival-tools/chhath*" { return "Festival Tool - NEW" }
        "*festival-tools/diwali*" { return "Festival Calendar" }
        "*festival-tools/navratri*" { return "Festival Tool" }
        "*calculators/sip*" { return "SIP Calculator" }
        "*calculators/emi*" { return "EMI Calculator" }
        "*calculators/income-tax*" { return "Tax Calculator" }
        "*calculators/*" { return "Financial Calculator" }
        "*finance-tools/*" { return "Advanced Finance Tool" }
        "*tax-tools/*" { return "Tax Planning Tool" }
        "*government-schemes/*" { return "Government Scheme" }
        "*crypto/*" { return "Crypto Finance" }
        "*blog/*" { return "Financial Blog" }
        default { return "Finance & Festival Tool" }
    }
}

# Build auto content database
$autoContent = @()
$today = Get-Date

foreach ($urlItem in $highPriorityUrls) {
    $url = $urlItem.loc
    $lastmod = [datetime]$urlItem.lastmod
    $daysSinceUpdate = ($today - $lastmod).Days
    
    $item = [PSCustomObject]@{
        title = Get-SmartTitle $url (Get-SmartCategory $url)
        url = $url
        description = Get-SmartDescription $url (Get-SmartCategory $url)
        category = Get-SmartCategory $url
        priority = if ($daysSinceUpdate -le 7) { "very_high" } elseif ($daysSinceUpdate -le 30) { "high" } else { "medium" }
        lastmod = $urlItem.lastmod
        daysSinceUpdate = $daysSinceUpdate
    }
    
    $autoContent += $item
}

Write-Host "Generated $($autoContent.Count) items with smart categorization" -ForegroundColor Green
Write-Host "Very High Priority (< 7 days old): $(($autoContent | Where-Object {$_.priority -eq 'very_high'}).Count)" -ForegroundColor Magenta
Write-Host "High Priority (< 30 days old): $(($autoContent | Where-Object {$_.priority -eq 'high'}).Count)" -ForegroundColor Yellow

Write-Host "`n[2/4] Loading subscribers..." -ForegroundColor Yellow
$subscribersData = Get-Content (Join-Path $PSScriptRoot "subscribers.json") -Raw | ConvertFrom-Json
$activeSubscribers = $subscribersData.subscribers | Where-Object { $_.active -eq $true }
Write-Host "Active subscribers: $($activeSubscribers.Count)" -ForegroundColor Green

Write-Host "`n[3/4] Selecting BEST content to send..." -ForegroundColor Yellow

# Smart content selection (85% chance for very high/high priority)
$rand = Get-Random -Minimum 1 -Maximum 100
if ($rand -le 85) {
    $priorityContent = $autoContent | Where-Object { $_.priority -in @('very_high', 'high') }
    if ($priorityContent) {
        $selectedContent = Get-Random -InputObject $priorityContent
        Write-Host "Selected LATEST/HIGH PRIORITY content!" -ForegroundColor Magenta
    } else {
        $selectedContent = Get-Random -InputObject $autoContent
    }
} else {
    $selectedContent = Get-Random -InputObject $autoContent
}

Write-Host "`nSelected Content:" -ForegroundColor Green
Write-Host "  Title: $($selectedContent.title)" -ForegroundColor White
Write-Host "  Category: $($selectedContent.category)" -ForegroundColor Cyan
Write-Host "  URL: $($selectedContent.url)" -ForegroundColor Blue
Write-Host "  Priority: $($selectedContent.priority)" -ForegroundColor Magenta
Write-Host "  Last Updated: $($selectedContent.lastmod) ($($selectedContent.daysSinceUpdate) days ago)" -ForegroundColor Yellow

Write-Host "`n[4/4] Sending emails to all subscribers..." -ForegroundColor Yellow

# Load PROFESSIONAL email template
$templatePath = Join-Path $PSScriptRoot "email-template-PROFESSIONAL.html"
$template = Get-Content $templatePath -Raw -Encoding UTF8

# Send to each subscriber
$success = 0
$failed = 0

foreach ($sub in $activeSubscribers) {
    Write-Host "`nSending to: $($sub.email) ($($sub.name))..." -ForegroundColor Yellow
    
    try {
        # Personalize email
        $html = $template
        $html = $html.Replace('{{SUBSCRIBER_NAME}}', $sub.name)
        $html = $html.Replace('{{SUBJECT}}', $selectedContent.title)
        $html = $html.Replace('{{CATEGORY}}', $selectedContent.category)
        $html = $html.Replace('{{TITLE}}', $selectedContent.title)
        $html = $html.Replace('{{DESCRIPTION}}', $selectedContent.description)
        $html = $html.Replace('{{URL}}', $selectedContent.url)
        $html = $html.Replace('{{UNSUBSCRIBE_URL}}', 'https://moneycal.in/unsubscribe')
        
        # Create SMTP client
        $smtp = New-Object System.Net.Mail.SmtpClient("smtp.gmail.com", 587)
        $smtp.EnableSsl = $true
        $smtp.Credentials = New-Object System.Net.NetworkCredential($SENDER_EMAIL, $APP_PASSWORD)
        
        # Create message with INBOX-optimized headers
        $msg = New-Object System.Net.Mail.MailMessage
        $msg.From = New-Object System.Net.Mail.MailAddress($SENDER_EMAIL, $SENDER_NAME)
        $msg.To.Add($sub.email)
        $msg.Subject = "$($selectedContent.title) | MoneyCal"
        $msg.Body = $html
        $msg.IsBodyHtml = $true
        $msg.Priority = [System.Net.Mail.MailPriority]::Normal
        
        # INBOX delivery headers
        $msg.Headers.Add("List-Unsubscribe", "<https://moneycal.in/unsubscribe>")
        $msg.Headers.Add("List-Unsubscribe-Post", "List-Unsubscribe=One-Click")
        $msg.Headers.Add("Importance", "Normal")
        $msg.Headers.Add("X-Priority", "3")
        
        # Send
        $smtp.Send($msg)
        Write-Host "  SUCCESS!" -ForegroundColor Green
        $success++
        
        # Delay to avoid rate limiting
        Start-Sleep -Seconds 2
        
    } catch {
        Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

# Log activity
$logEntry = @{
    timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    content_title = $selectedContent.title
    content_url = $selectedContent.url
    content_category = $selectedContent.category
    content_priority = $selectedContent.priority
    content_age_days = $selectedContent.daysSinceUpdate
    success_count = $success
    fail_count = $failed
    total_subscribers = $activeSubscribers.Count
}

$logFile = Join-Path $PSScriptRoot "email-activity-log.json"
$logs = @()
if (Test-Path $logFile) {
    $existingLogs = Get-Content $logFile -Raw | ConvertFrom-Json
    $logs = @($existingLogs)
}
$logs += $logEntry
$logs | Select-Object -Last 100 | ConvertTo-Json -Depth 5 | Set-Content $logFile -Encoding UTF8

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "  BATCH SUMMARY" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Content Selected: $($selectedContent.title)" -ForegroundColor White
Write-Host "Category: $($selectedContent.category)" -ForegroundColor Cyan
Write-Host "Priority: $($selectedContent.priority)" -ForegroundColor Magenta
Write-Host "Age: $($selectedContent.daysSinceUpdate) days old" -ForegroundColor Yellow
Write-Host "Success: $success" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red
Write-Host "Time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White
Write-Host "Next Send: In 3 hours ($(Get-Date (Get-Date).AddHours(3) -Format 'HH:mm'))" -ForegroundColor Cyan
Write-Host "============================================================`n" -ForegroundColor Cyan

if ($success -gt 0) {
    Write-Host "EMAILS SENT TO PRIMARY INBOX!" -ForegroundColor Green
    Write-Host "`nCheck these emails:" -ForegroundColor Cyan
    foreach ($sub in $activeSubscribers) {
        Write-Host "  >> $($sub.email)" -ForegroundColor White
    }
    Write-Host ""
}

Write-Host "System will auto-run again in 3 hours...`n" -ForegroundColor Yellow

