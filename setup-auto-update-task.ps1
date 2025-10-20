# Setup Windows Scheduled Task for Sitemap Auto-Update
# Runs every 36 hours automatically

Write-Host "🚀 Setting up Auto-Update Task..." -ForegroundColor Cyan

# Task details
$taskName = "FinCal-Sitemap-AutoUpdate"
$scriptPath = Join-Path $PSScriptRoot "auto-update-sitemap-dates.ps1"
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$scriptPath`""

# Trigger: Every 36 hours
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 36) -RepetitionDuration ([TimeSpan]::MaxValue)

# Settings
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

# Register task (requires admin)
try {
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description "Auto-updates FinCal sitemap dates every 36 hours for Google freshness" -Force
    
    Write-Host "✅ Scheduled Task Created!" -ForegroundColor Green
    Write-Host "📋 Task Name: $taskName" -ForegroundColor Cyan
    Write-Host "⏰ Frequency: Every 36 hours" -ForegroundColor Yellow
    Write-Host "📂 Script: $scriptPath" -ForegroundColor Magenta
    Write-Host ""
    Write-Host "🎯 To verify: Open Task Scheduler → $taskName" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Solution: Run as Administrator" -ForegroundColor Yellow
    Write-Host "   Right-click PowerShell → Run as Administrator" -ForegroundColor Yellow
}

