# MoneyCal Email Sender - Send to ALL Subscribers
# Professional version with anti-spam features

# Load configuration
$configFile = Join-Path $PSScriptRoot "config-DONOTCOMMIT.ps1"
if (Test-Path $configFile) {
    . $configFile
    Write-Host "✅ Configuration loaded (Using App Password)" -ForegroundColor Green
} else {
    $script:SenderEmail = "moneycalx9@gmail.com"
    $script:SenderPassword = "oznlyjmjwghujtfq"
    $script:SenderName = "MoneyCal - Your Financial Companion"
}

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "  MONEYCAL EMAIL BLAST - SENDING TO ALL SUBSCRIBERS" -ForegroundColor Cyan
Write-Host "============================================================`n" -ForegroundColor Cyan

# Load subscribers
Write-Host "Loading subscribers..." -ForegroundColor Yellow
$subscribersPath = Join-Path $PSScriptRoot "subscribers.json"
$subscribersData = Get-Content -Path $subscribersPath -Raw | ConvertFrom-Json
$activeSubscribers = $subscribersData.subscribers | Where-Object { $_.active -eq $true }

Write-Host "Found $($activeSubscribers.Count) active subscribers" -ForegroundColor Green
Write-Host ""

# Load content database
Write-Host "Loading content database..." -ForegroundColor Yellow
$contentPath = Join-Path $PSScriptRoot "content-database-FULL.json"
$contentData = Get-Content -Path $contentPath -Raw | ConvertFrom-Json

# Collect all content
$allContent = @()
$categories = @('latest_tools', 'finance_tools', 'tax_tools', 'festival_tools', 'loan_tools', 'insurance_tools', 'government_schemes', 'gst_tools', 'educational', 'astro_finance', 'trending_calculators', 'festival_dates', 'bank_tools', 'business_tools', 'crypto')

foreach ($category in $categories) {
    if ($contentData.$category) {
        foreach ($item in $contentData.$category) {
            $allContent += [PSCustomObject]@{
                title = $item.title
                url = $item.url
                description = $item.description
                category = $item.category
            }
        }
    }
}

Write-Host "Loaded $($allContent.Count) content items" -ForegroundColor Green
Write-Host ""

# Select random content for this batch
$randomContent = Get-Random -InputObject $allContent

Write-Host "📧 Selected Content for this batch:" -ForegroundColor Cyan
Write-Host "   Title: $($randomContent.title)" -ForegroundColor White
Write-Host "   Category: $($randomContent.category)" -ForegroundColor Yellow
Write-Host "   URL: $($randomContent.url)" -ForegroundColor Blue
Write-Host ""

# Load professional email template
$templatePath = Join-Path $PSScriptRoot "email-template-PROFESSIONAL.html"
$emailTemplate = Get-Content -Path $templatePath -Raw -Encoding UTF8

# Counters
$successCount = 0
$failCount = 0

# Send to each subscriber
foreach ($subscriber in $activeSubscribers) {
    Write-Host "📤 Sending to: $($subscriber.email) ($($subscriber.name))..." -ForegroundColor Yellow
    
    try {
        # Personalize email for this subscriber
        $personalizedHTML = $emailTemplate
        $personalizedHTML = $personalizedHTML.Replace('{{SUBSCRIBER_NAME}}', $subscriber.name)
        $personalizedHTML = $personalizedHTML.Replace('{{SUBJECT}}', $randomContent.title)
        $personalizedHTML = $personalizedHTML.Replace('{{CATEGORY}}', $randomContent.category)
        $personalizedHTML = $personalizedHTML.Replace('{{TITLE}}', $randomContent.title)
        $personalizedHTML = $personalizedHTML.Replace('{{DESCRIPTION}}', $randomContent.description)
        $personalizedHTML = $personalizedHTML.Replace('{{URL}}', $randomContent.url)
        $personalizedHTML = $personalizedHTML.Replace('{{UNSUBSCRIBE_URL}}', 'https://moneycal.in/unsubscribe')
        
        # Create SMTP client
        $smtp = New-Object System.Net.Mail.SmtpClient
        $smtp.Host = "smtp.gmail.com"
        $smtp.Port = 587
        $smtp.EnableSsl = $true
        $smtp.Credentials = New-Object System.Net.NetworkCredential($script:SenderEmail, $script:SenderPassword)
        
        # Create message
        $message = New-Object System.Net.Mail.MailMessage
        $message.From = New-Object System.Net.Mail.MailAddress($script:SenderEmail, $script:SenderName)
        $message.To.Add($subscriber.email)
        $message.Subject = "🌟 $($randomContent.title) | MoneyCal"
        $message.Body = $personalizedHTML
        $message.IsBodyHtml = $true
        $message.Priority = [System.Net.Mail.MailPriority]::Normal
        
        # Anti-spam headers
        $message.Headers.Add("List-Unsubscribe", "<https://moneycal.in/unsubscribe>")
        $message.Headers.Add("X-Mailer", "MoneyCal Email System")
        $message.Headers.Add("Precedence", "bulk")
        
        # Send
        $smtp.Send($message)
        
        Write-Host "   ✅ Sent successfully!" -ForegroundColor Green
        $successCount++
        
        # Small delay to avoid rate limiting
        Start-Sleep -Seconds 2
        
    } catch {
        Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
}

# Summary
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  📊 BATCH SUMMARY" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Successfully sent: $successCount emails" -ForegroundColor Green
Write-Host "❌ Failed: $failCount emails" -ForegroundColor Red
Write-Host "📧 Total subscribers: $($activeSubscribers.Count)" -ForegroundColor Cyan
Write-Host "🕐 Sent at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

if ($successCount -gt 0) {
    Write-Host "SUCCESS! Emails have been sent!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Check these inboxes:" -ForegroundColor Cyan
    foreach ($subscriber in $activeSubscribers) {
        Write-Host "   $($subscriber.email)" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "If not in inbox, check Promotions or Spam folders" -ForegroundColor Yellow
}

Write-Host ""

