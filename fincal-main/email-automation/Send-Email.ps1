# MoneyCal Email Sender - PowerShell Version
# No installation needed - works on Windows natively!

param(
    [string]$ToEmail = "harshraj0235@gmail.com",
    [string]$ToName = "Harsh Raj"
)

# Email Configuration
$senderEmail = "moneycalx9@gmail.com"
$senderPassword = "YOUR_PASSWORD_HERE"  # Replace with your Gmail password or App Password
$senderName = "MoneyCal Financial Companion"

# Alternative: Load from config file (recommended for security)
$configFile = Join-Path $PSScriptRoot "config-DONOTCOMMIT.ps1"
if (Test-Path $configFile) {
    . $configFile  # Load config if exists
    Write-Host "Loaded configuration from config file" -ForegroundColor Green
}

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "  MONEYCAL EMAIL AUTOMATION SYSTEM" -ForegroundColor Cyan
Write-Host "============================================================`n" -ForegroundColor Cyan

# Load content database (FULL version with all tools)
Write-Host "Loading comprehensive content database..." -ForegroundColor Yellow
$contentPath = Join-Path $PSScriptRoot "content-database-FULL.json"
$contentData = Get-Content -Path $contentPath -Raw | ConvertFrom-Json

# Collect all content from all categories
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
                priority = if ($item.priority) { $item.priority } else { 'medium' }
            }
        }
    }
}

Write-Host "Loaded $($allContent.Count) content items from MoneyCal" -ForegroundColor Green

# Select random content
$randomContent = Get-Random -InputObject $allContent

Write-Host "Selected Content:" -ForegroundColor Green
Write-Host "  Title: $($randomContent.title)" -ForegroundColor White
Write-Host "  Category: $($randomContent.category)" -ForegroundColor Yellow
Write-Host "  URL: $($randomContent.url)`n" -ForegroundColor Blue

# Load professional email template
Write-Host "Loading professional email template..." -ForegroundColor Yellow
$templatePath = Join-Path $PSScriptRoot "email-template-PROFESSIONAL.html"
$emailTemplate = Get-Content -Path $templatePath -Raw -Encoding UTF8

# Replace placeholders in template
$emailHTML = $emailTemplate
$emailHTML = $emailHTML.Replace('{{SUBSCRIBER_NAME}}', $ToName)
$emailHTML = $emailHTML.Replace('{{SUBJECT}}', $randomContent.title)
$emailHTML = $emailHTML.Replace('{{CATEGORY}}', $randomContent.category)
$emailHTML = $emailHTML.Replace('{{TITLE}}', $randomContent.title)
$emailHTML = $emailHTML.Replace('{{DESCRIPTION}}', $randomContent.description)
$emailHTML = $emailHTML.Replace('{{URL}}', $randomContent.url)
$emailHTML = $emailHTML.Replace('{{UNSUBSCRIBE_URL}}', 'https://moneycal.in/unsubscribe')

# Send email
try {
    Write-Host "Connecting to Gmail SMTP..." -ForegroundColor Yellow
    
    $smtp = New-Object System.Net.Mail.SmtpClient
    $smtp.Host = "smtp.gmail.com"
    $smtp.Port = 587
    $smtp.EnableSsl = $true
    $smtp.Credentials = New-Object System.Net.NetworkCredential($senderEmail, $senderPassword)
    
    $message = New-Object System.Net.Mail.MailMessage
    $message.From = New-Object System.Net.Mail.MailAddress($senderEmail, $senderName)
    $message.To.Add($ToEmail)
    $message.Subject = $subject
    $message.Body = $emailHTML
    $message.IsBodyHtml = $true
    
    Write-Host "Sending email to $ToEmail..." -ForegroundColor Yellow
    $smtp.Send($message)
    
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "  EMAIL SENT SUCCESSFULLY!" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Email sent to: $ToEmail" -ForegroundColor Green
    Write-Host "Subject: $subject" -ForegroundColor Cyan
    Write-Host "Time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "CHECK YOUR INBOX NOW!" -ForegroundColor Green -BackgroundColor Black
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "If authentication failed, you may need to:" -ForegroundColor Yellow
    Write-Host "1. Enable Less Secure Apps: https://myaccount.google.com/lesssecureapps" -ForegroundColor White
    Write-Host "2. Or use App Password: https://myaccount.google.com/apppasswords" -ForegroundColor White
    Write-Host ""
}
