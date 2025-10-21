# ===================================================
# SEND ONE EMAIL TO ALL SUBSCRIBERS NOW
# ===================================================
# Run this ONCE to send one email immediately to all subscribers

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   SENDING ONE EMAIL TO ALL SUBSCRIBERS" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Load configuration
. .\config-DONOTCOMMIT.ps1

# Load subscribers
$subscribersData = Get-Content "subscribers.json" -Raw | ConvertFrom-Json
$activeSubscribers = $subscribersData.subscribers | Where-Object { $_.active -eq $true }
$totalSubscribers = $activeSubscribers.Count

Write-Host "[+] Total Active Subscribers: $totalSubscribers" -ForegroundColor Green
Write-Host ""

# Load content database
$contentData = Get-Content "content-database-MASSIVE.json" -Raw | ConvertFrom-Json
$allContent = $contentData.priority_festival_tools

# Pick one random content
$randomContent = $allContent | Get-Random

# Map category to simple icon (no emojis - PowerShell encoding issue)
$categoryIcon = "[NEW]"
if ($randomContent.category -like "*Gold*") { $categoryIcon = "[GOLD]" }
if ($randomContent.category -like "*Festival*") { $categoryIcon = "[FESTIVAL]" }
if ($randomContent.category -like "*Religious*") { $categoryIcon = "[RELIGIOUS]" }
if ($randomContent.category -like "*Loan*") { $categoryIcon = "[LOAN]" }
if ($randomContent.category -like "*Calculator*") { $categoryIcon = "[CALCULATOR]" }

Write-Host "[*] Selected Content:" -ForegroundColor Yellow
Write-Host "   Title: $($randomContent.title)" -ForegroundColor White
Write-Host "   URL: $($randomContent.url)" -ForegroundColor White
Write-Host "   Category: $($randomContent.category)" -ForegroundColor Cyan
Write-Host ""

# Load professional email template
$templatePath = Join-Path $PSScriptRoot "email-template-PROFESSIONAL.html"
$emailBodyTemplate = Get-Content $templatePath -Raw -Encoding UTF8

# Create email body with all placeholders
$emailBody = $emailBodyTemplate `
    -replace "{{TITLE}}", $randomContent.title `
    -replace "{{DESCRIPTION}}", $randomContent.description `
    -replace "{{URL}}", $randomContent.url `
    -replace "{{CATEGORY}}", $randomContent.category `
    -replace "{{SUBSCRIBER_NAME}}", "Finance Enthusiast" `
    -replace "{{UNSUBSCRIBE_URL}}", "mailto:moneycalx9@gmail.com?subject=Unsubscribe"

# Send to all subscribers
$successCount = 0
$failCount = 0

Write-Host "[>>] Starting email send to $totalSubscribers subscribers..." -ForegroundColor Cyan
Write-Host ""

foreach ($subscriber in $activeSubscribers) {
    try {
        $mailParams = @{
            To = $subscriber.email
            From = $SENDER_EMAIL
            Subject = "New Financial Tool from MoneyCal"
            Body = $emailBody
            BodyAsHtml = $true
            SmtpServer = "smtp.gmail.com"
            Port = 587
            UseSsl = $true
            Credential = (New-Object System.Management.Automation.PSCredential($SENDER_EMAIL, (ConvertTo-SecureString $APP_PASSWORD -AsPlainText -Force)))
            Priority = "Normal"
        }
        
        Send-MailMessage @mailParams
        $successCount++
        Write-Host "[OK] Sent to: $($subscriber.email)" -ForegroundColor Green
        
        # Delay to avoid rate limiting (1 second between emails)
        Start-Sleep -Seconds 1
    }
    catch {
        $failCount++
        Write-Host "[FAIL] Failed to send to: $($subscriber.email) - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   EMAIL CAMPAIGN COMPLETED" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "[SUCCESS] Successfully sent: $successCount emails" -ForegroundColor Green
Write-Host "[FAILED] Failed: $failCount emails" -ForegroundColor Red
Write-Host "[TOTAL] Total attempted: $totalSubscribers emails" -ForegroundColor Cyan
Write-Host ""
Write-Host "[CONTENT] Content sent: $($randomContent.title)" -ForegroundColor Yellow
Write-Host "[URL] $($randomContent.url)" -ForegroundColor White
Write-Host ""
Write-Host "[DONE] ALL DONE! Check your email for results." -ForegroundColor Green
Write-Host ""

