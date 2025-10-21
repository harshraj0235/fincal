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

Write-Host "📧 Total Active Subscribers: $totalSubscribers" -ForegroundColor Green
Write-Host ""

# Load content database
$contentData = Get-Content "content-database-MASSIVE.json" -Raw | ConvertFrom-Json
$allContent = $contentData.content

# Pick one random content
$randomContent = $allContent | Get-Random

Write-Host "📝 Selected Content:" -ForegroundColor Yellow
Write-Host "   Title: $($randomContent.title)" -ForegroundColor White
Write-Host "   URL: $($randomContent.url)" -ForegroundColor White
Write-Host ""

# Email HTML template
$emailBodyTemplate = @"
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f7fa; }
    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
    .header p { margin: 8px 0 0; font-size: 14px; opacity: 0.95; }
    .content { padding: 35px 25px; }
    .emoji { font-size: 48px; text-align: center; margin: 20px 0; }
    .content h2 { color: #667eea; margin: 0 0 15px; font-size: 22px; }
    .content p { margin: 15px 0; color: #555; font-size: 15px; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white !important; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0; text-align: center; transition: transform 0.2s; }
    .cta-button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4); }
    .description { background: #f8f9ff; padding: 18px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0; }
    .features { margin: 25px 0; }
    .feature-item { display: flex; align-items: flex-start; margin: 12px 0; padding: 10px; background: #fafbff; border-radius: 6px; }
    .feature-item span { color: #667eea; font-size: 20px; margin-right: 12px; }
    .footer { background: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e0e0e0; }
    .footer p { margin: 8px 0; font-size: 13px; color: #666; }
    .footer a { color: #667eea; text-decoration: none; font-weight: 500; }
    .social-links { margin: 15px 0; }
    .social-links a { display: inline-block; margin: 0 8px; color: #667eea; text-decoration: none; font-size: 14px; }
    @media (max-width: 600px) {
      .container { margin: 10px; border-radius: 8px; }
      .header { padding: 25px 15px; }
      .header h1 { font-size: 24px; }
      .content { padding: 25px 18px; }
      .cta-button { padding: 12px 24px; font-size: 15px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌟 MoneyCal Learn</h1>
      <p>Your Personal Finance Academy</p>
    </div>
    
    <div class="content">
      <div class="emoji">{{CATEGORY_EMOJI}}</div>
      
      <h2>{{TITLE}}</h2>
      
      <p>Hello Finance Enthusiast! 👋</p>
      
      <p>We've just published a valuable resource on MoneyCal that we think you'll find incredibly useful:</p>
      
      <div class="description">
        <strong>{{DESCRIPTION}}</strong>
      </div>

      <div class="features">
        <div class="feature-item">
          <span>📚</span>
          <div>Comprehensive guides written by finance experts</div>
        </div>
        <div class="feature-item">
          <span>🧮</span>
          <div>Interactive calculators to plan your finances</div>
        </div>
        <div class="feature-item">
          <span>💡</span>
          <div>Real examples from Indian financial scenarios</div>
        </div>
        <div class="feature-item">
          <span>✅</span>
          <div>Step-by-step actionable advice</div>
        </div>
      </div>

      <center>
        <a href="{{URL}}" class="cta-button">Read Full Article →</a>
      </center>

      <p style="margin-top: 25px; padding: 15px; background: #fff9e6; border-left: 4px solid #ffc107; border-radius: 6px;">
        <strong>💬 Please use once and give us your feedback!</strong><br>
        Your opinion helps us improve and create better content for you.
      </p>

      <p style="font-size: 14px; color: #666; margin-top: 20px;">
        This is part of our mission to make financial education accessible to every Indian. We publish new content every week covering loans, investments, taxes, calculators, and government schemes.
      </p>
    </div>
    
    <div class="footer">
      <p><strong>MoneyCal - Your Financial Companion</strong></p>
      <p>India's Trusted Source for Financial Tools & Education</p>
      
      <div class="social-links">
        <a href="https://moneycal.in">🏠 Home</a>
        <a href="https://moneycal.in/learn">📚 Learn</a>
        <a href="https://moneycal.in/calculators">🧮 Calculators</a>
      </div>
      
      <p style="margin-top: 15px; font-size: 12px;">
        You're receiving this because you subscribed to MoneyCal updates.<br>
        <a href="mailto:moneycalx9@gmail.com?subject=Unsubscribe">Unsubscribe</a> | 
        <a href="https://moneycal.in/privacy">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
"@

# Create email body
$emailBody = $emailBodyTemplate `
    -replace "{{TITLE}}", $randomContent.title `
    -replace "{{DESCRIPTION}}", $randomContent.description `
    -replace "{{CATEGORY_EMOJI}}", $randomContent.emoji `
    -replace "{{URL}}", $randomContent.url

# Send to all subscribers
$successCount = 0
$failCount = 0

Write-Host "🚀 Starting email send to $totalSubscribers subscribers..." -ForegroundColor Cyan
Write-Host ""

foreach ($subscriber in $activeSubscribers) {
    try {
        $mailParams = @{
            To = $subscriber.email
            From = $SENDER_EMAIL
            Subject = "📚 New: $($randomContent.title) | MoneyCal Learn"
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
        Write-Host "✅ Sent to: $($subscriber.email)" -ForegroundColor Green
        
        # Delay to avoid rate limiting (1 second between emails)
        Start-Sleep -Seconds 1
    }
    catch {
        $failCount++
        Write-Host "❌ Failed to send to: $($subscriber.email) - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   EMAIL CAMPAIGN COMPLETED" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Successfully sent: $successCount emails" -ForegroundColor Green
Write-Host "❌ Failed: $failCount emails" -ForegroundColor Red
Write-Host "📧 Total attempted: $totalSubscribers emails" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Content sent: $($randomContent.title)" -ForegroundColor Yellow
Write-Host "🔗 URL: $($randomContent.url)" -ForegroundColor White
Write-Host ""
Write-Host "🎉 ALL DONE! Check your email for results." -ForegroundColor Green
Write-Host ""

