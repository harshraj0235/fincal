# MoneyCal - Send Emails to All Subscribers
# Clean version without special characters

# Configuration
. (Join-Path $PSScriptRoot "config-DONOTCOMMIT.ps1")

Write-Host "`nMONEYCAL EMAIL SYSTEM - SENDING TO ALL SUBSCRIBERS`n" -ForegroundColor Cyan

# Load subscribers
$subscribersData = Get-Content (Join-Path $PSScriptRoot "subscribers.json") -Raw | ConvertFrom-Json
$activeSubscribers = $subscribersData.subscribers | Where-Object { $_.active -eq $true }

Write-Host "Active subscribers: $($activeSubscribers.Count)" -ForegroundColor Green

# Load MASSIVE content database
$contentData = Get-Content (Join-Path $PSScriptRoot "content-database-MASSIVE.json") -Raw | ConvertFrom-Json

$allContent = @()
@('priority_festival_tools', 'top_calculators', 'finance_tools_advanced', 'tax_tools_essential', 'government_schemes_popular', 'festival_tools_complete', 'trending_calculators', 'insurance_tools', 'crypto_finance', 'religious_spiritual', 'education_finance', 'astro_finance') | ForEach-Object {
    if ($contentData.$_) {
        $contentData.$_ | ForEach-Object { $allContent += $_ }
    }
}

Write-Host "Content items loaded: $($allContent.Count) (from sitemap & codebase)`n" -ForegroundColor Green

# Prioritize latest/high priority content (70% chance)
$highPriorityContent = $allContent | Where-Object { $_.priority -eq 'high' -or $_.category -like '*NEW*' }
if ($highPriorityContent -and ((Get-Random -Minimum 1 -Maximum 100) -le 70)) {
    $content = Get-Random -InputObject $highPriorityContent
    Write-Host "Selected HIGH PRIORITY content" -ForegroundColor Magenta
} else {
    $content = Get-Random -InputObject $allContent
}

Write-Host "Selected: $($content.title)" -ForegroundColor Yellow
Write-Host "Category: $($content.category)" -ForegroundColor Cyan
Write-Host "URL: $($content.url)`n" -ForegroundColor Blue

# Load ULTIMATE professional template (inbox-optimized)
Write-Host "Loading ultimate professional email template...`n" -ForegroundColor Yellow
$template = Get-Content (Join-Path $PSScriptRoot "email-template-ULTIMATE.html") -Raw -Encoding UTF8

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
        $msg.Priority = [System.Net.Mail.MailPriority]::Normal
        
        # Anti-spam headers (ensures inbox delivery)
        $msg.Headers.Add("List-Unsubscribe", "<https://moneycal.in/unsubscribe>")
        $msg.Headers.Add("List-Unsubscribe-Post", "List-Unsubscribe=One-Click")
        $msg.Headers.Add("X-Auto-Response-Suppress", "OOF, DR, RN, NRN, AutoReply")
        $msg.Headers.Add("Importance", "Normal")
        $msg.Headers.Add("X-Priority", "3")
        $msg.Headers.Add("X-MSMail-Priority", "Normal")
        
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

