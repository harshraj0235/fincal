# MoneyCal - Send Emails to All Subscribers
# Clean version without special characters

# Configuration
. (Join-Path $PSScriptRoot "config-DONOTCOMMIT.ps1")

Write-Host "`nMONEYCAL EMAIL SYSTEM - SENDING TO ALL SUBSCRIBERS`n" -ForegroundColor Cyan

# Load subscribers
$subscribersData = Get-Content (Join-Path $PSScriptRoot "subscribers.json") -Raw | ConvertFrom-Json
$activeSubscribers = $subscribersData.subscribers | Where-Object { $_.active -eq $true }

Write-Host "Active subscribers: $($activeSubscribers.Count)" -ForegroundColor Green

# Load content
$contentData = Get-Content (Join-Path $PSScriptRoot "content-database-FULL.json") -Raw | ConvertFrom-Json

$allContent = @()
@('latest_tools', 'finance_tools', 'tax_tools', 'festival_tools', 'loan_tools', 'insurance_tools', 'government_schemes', 'gst_tools', 'educational', 'astro_finance', 'trending_calculators', 'festival_dates', 'bank_tools', 'business_tools', 'crypto') | ForEach-Object {
    if ($contentData.$_) {
        $contentData.$_ | ForEach-Object { $allContent += $_ }
    }
}

Write-Host "Content items loaded: $($allContent.Count)`n" -ForegroundColor Green

# Select random content
$content = Get-Random -InputObject $allContent

Write-Host "Selected: $($content.title)" -ForegroundColor Yellow
Write-Host "Category: $($content.category)" -ForegroundColor Cyan
Write-Host "URL: $($content.url)`n" -ForegroundColor Blue

# Load template
$template = Get-Content (Join-Path $PSScriptRoot "email-template-PROFESSIONAL.html") -Raw -Encoding UTF8

# Send to each subscriber
$success = 0
$failed = 0

foreach ($sub in $activeSubscribers) {
    Write-Host "Sending to: $($sub.email)..." -ForegroundColor Yellow
    
    try {
        $html = $template
        $html = $html.Replace('{{SUBSCRIBER_NAME}}', $sub.name)
        $html = $html.Replace('{{SUBJECT}}', $content.title)
        $html = $html.Replace('{{CATEGORY}}', $content.category)
        $html = $html.Replace('{{TITLE}}', $content.title)
        $html = $html.Replace('{{DESCRIPTION}}', $content.description)
        $html = $html.Replace('{{URL}}', $content.url)
        $html = $html.Replace('{{UNSUBSCRIBE_URL}}', 'https://moneycal.in/unsubscribe')
        
        $smtp = New-Object System.Net.Mail.SmtpClient("smtp.gmail.com", 587)
        $smtp.EnableSsl = $true
        $smtp.Credentials = New-Object System.Net.NetworkCredential($script:SenderEmail, $script:SenderPassword)
        
        $msg = New-Object System.Net.Mail.MailMessage
        $msg.From = New-Object System.Net.Mail.MailAddress($script:SenderEmail, $script:SenderName)
        $msg.To.Add($sub.email)
        $msg.Subject = "$($content.title) | MoneyCal"
        $msg.Body = $html
        $msg.IsBodyHtml = $true
        $msg.Headers.Add("List-Unsubscribe", "<https://moneycal.in/unsubscribe>")
        
        $smtp.Send($msg)
        
        Write-Host "  SUCCESS - Sent to $($sub.email)" -ForegroundColor Green
        $success++
        
        Start-Sleep -Seconds 2
        
    } catch {
        Write-Host "  FAILED - $($sub.email): $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Successful: $success" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red
Write-Host "Total: $($activeSubscribers.Count)" -ForegroundColor White
Write-Host "Time: $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor White
Write-Host "============================================================`n" -ForegroundColor Cyan

if ($success -gt 0) {
    Write-Host "EMAIL SENT! Check these inboxes:" -ForegroundColor Green
    $activeSubscribers | ForEach-Object { Write-Host "  $($_.email)" -ForegroundColor White }
}

