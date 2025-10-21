# MoneyCal - ONE-CLICK AUTO SETUP
# Run this script to enable automatic email sending every 3 hours

Write-Host "`n=========================================" -ForegroundColor Cyan
Write-Host "  MONEYCAL AUTO EMAIL SETUP" -ForegroundColor Cyan
Write-Host "=========================================`n" -ForegroundColor Cyan

Write-Host "This will configure Windows to automatically send emails every 3 hours!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press ENTER to continue or CTRL+C to cancel..." -ForegroundColor White
$null = Read-Host

try {
    Write-Host "`nCreating scheduled task..." -ForegroundColor Yellow
    
    $scriptPath = Join-Path $PSScriptRoot "Auto-Send-Every-3-Hours.ps1"
    
    $action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"$scriptPath`""
    
    $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(5) -RepetitionInterval (New-TimeSpan -Hours 3) -RepetitionDuration ([TimeSpan]::MaxValue)
    
    $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
    
    Register-ScheduledTask -TaskName "MoneyCal Auto Email Sender" -Action $action -Trigger $trigger -Settings $settings -Description "Sends automated emails every 3 hours with latest content from MoneyCal.in" -Force | Out-Null
    
    Write-Host "`n=========================================" -ForegroundColor Green
    Write-Host "  SUCCESS!" -ForegroundColor Green
    Write-Host "=========================================`n" -ForegroundColor Green
    
    Write-Host "Automated email system is now ACTIVE!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Schedule:" -ForegroundColor Cyan
    Write-Host "  - First email: In 5 minutes ($(Get-Date (Get-Date).AddMinutes(5) -Format 'HH:mm'))" -ForegroundColor White
    Write-Host "  - Then: Every 3 hours automatically" -ForegroundColor White
    Write-Host "  - Emails per day: 8" -ForegroundColor White
    Write-Host "  - Subscribers: 4 (Harsh, Anand, Prit, Harshit)" -ForegroundColor White
    Write-Host ""
    Write-Host "To verify:" -ForegroundColor Cyan
    Write-Host "  1. Open Task Scheduler (taskschd.msc)" -ForegroundColor White
    Write-Host "  2. Look for: MoneyCal Auto Email Sender" -ForegroundColor White
    Write-Host "  3. Check: email-activity-log.json for entries" -ForegroundColor White
    Write-Host ""
    Write-Host "To disable:" -ForegroundColor Cyan
    Write-Host "  Disable-ScheduledTask -TaskName 'MoneyCal Auto Email Sender'" -ForegroundColor White
    Write-Host ""
    Write-Host "To remove completely:" -ForegroundColor Cyan
    Write-Host "  Unregister-ScheduledTask -TaskName 'MoneyCal Auto Email Sender' -Confirm:`$false" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host "`nERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible fixes:" -ForegroundColor Yellow
    Write-Host "  1. Run PowerShell as Administrator" -ForegroundColor White
    Write-Host "  2. Check if task already exists (remove it first)" -ForegroundColor White
    Write-Host ""
}

Write-Host "Press ENTER to exit..." -ForegroundColor White
$null = Read-Host

