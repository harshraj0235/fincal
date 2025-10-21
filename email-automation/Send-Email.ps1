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

# Load content database
Write-Host "Loading content database..." -ForegroundColor Yellow
$contentPath = Join-Path $PSScriptRoot "content-database.json"
$contentData = Get-Content -Path $contentPath -Raw | ConvertFrom-Json

# Collect all content
$allContent = @()
foreach ($tool in $contentData.tools) {
    $allContent += [PSCustomObject]@{
        title = $tool.title
        url = $tool.url
        description = $tool.description
        category = $tool.category
    }
}

# Select random content
$randomContent = Get-Random -InputObject $allContent

Write-Host "Selected Content:" -ForegroundColor Green
Write-Host "  Title: $($randomContent.title)" -ForegroundColor White
Write-Host "  Category: $($randomContent.category)" -ForegroundColor Yellow
Write-Host "  URL: $($randomContent.url)`n" -ForegroundColor Blue

# Create email HTML
$emailHTML = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); padding: 30px; text-align: center; }
        .logo { font-size: 32px; font-weight: bold; color: white; margin-bottom: 10px; }
        .tagline { color: white; font-size: 14px; }
        .content { padding: 30px 20px; }
        .greeting { font-size: 18px; color: #333; margin-bottom: 20px; }
        .featured { background: linear-gradient(135deg, #FFF5E6 0%, #FFE8CC 100%); border-radius: 12px; padding: 25px; margin: 20px 0; border-left: 4px solid #FF6B35; }
        .badge { display: inline-block; background: #FF6B35; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; margin-bottom: 15px; }
        .title { font-size: 24px; font-weight: bold; color: #222; margin-bottom: 12px; }
        .description { font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 20px; }
        .button { display: inline-block; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; }
        .footer { background: #2C3E50; color: white; padding: 25px; text-align: center; font-size: 13px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">💰 MoneyCal</div>
            <div class="tagline">Your Trusted Financial & Festival Companion</div>
        </div>
        <div class="content">
            <div class="greeting">🙏 Namaste $ToName,</div>
            <p style="font-size: 15px; color: #555; margin-bottom: 25px;">
                We thought you'd love this! Here's something special we handpicked for you from MoneyCal:
            </p>
            <div class="featured">
                <span class="badge">$($randomContent.category)</span>
                <h2 class="title">$($randomContent.title)</h2>
                <p class="description">$($randomContent.description)</p>
                <a href="$($randomContent.url)" class="button">📖 Read Full Article →</a>
            </div>
            <div style="text-align: center; margin: 20px 0;">
                <div style="display: inline-block; margin: 0 15px; text-align: center;">
                    <div style="font-size: 28px; font-weight: bold; color: #FF6B35;">500+</div>
                    <div style="font-size: 12px; color: #777;">Calculators</div>
                </div>
                <div style="display: inline-block; margin: 0 15px; text-align: center;">
                    <div style="font-size: 28px; font-weight: bold; color: #FF6B35;">50+</div>
                    <div style="font-size: 12px; color: #777;">Festival Tools</div>
                </div>
                <div style="display: inline-block; margin: 0 15px; text-align: center;">
                    <div style="font-size: 28px; font-weight: bold; color: #FF6B35;">100%</div>
                    <div style="font-size: 12px; color: #777;">Free</div>
                </div>
            </div>
        </div>
        <div class="footer">
            <strong>MoneyCal.in</strong> - Making Finance Simple & Spiritual<br>
            <a href="https://moneycal.in/unsubscribe" style="color: #FF6B35; margin-top: 10px; display: inline-block;">Unsubscribe</a>
        </div>
    </div>
</body>
</html>
"@

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
