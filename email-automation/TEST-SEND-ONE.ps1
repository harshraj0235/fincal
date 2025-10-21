# Test send to ONE email only
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

Write-Host "Testing email send to ONE subscriber..." -ForegroundColor Cyan

# Load configuration
. .\config-DONOTCOMMIT.ps1

# Load content
$contentData = Get-Content "content-database-MASSIVE.json" -Raw | ConvertFrom-Json
$randomContent = $contentData.priority_festival_tools | Get-Random

Write-Host "Selected: $($randomContent.title)" -ForegroundColor Yellow

# Simple email body
$emailBody = @"
<html>
<body>
<h1>Test Email from MoneyCal</h1>
<p>Title: $($randomContent.title)</p>
<p>URL: <a href="$($randomContent.url)">$($randomContent.url)</a></p>
<p>Description: $($randomContent.description)</p>
</body>
</html>
"@

try {
    $mailParams = @{
        To = "harshraj0235@gmail.com"
        From = $SENDER_EMAIL
        Subject = "Test Email from MoneyCal"
        Body = $emailBody
        BodyAsHtml = $true
        SmtpServer = "smtp.gmail.com"
        Port = 587
        UseSsl = $true
        Credential = (New-Object System.Management.Automation.PSCredential($SENDER_EMAIL, (ConvertTo-SecureString $APP_PASSWORD -AsPlainText -Force)))
    }
    
    Send-MailMessage @mailParams
    Write-Host "SUCCESS! Email sent to harshraj0235@gmail.com" -ForegroundColor Green
}
catch {
    Write-Host "FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

