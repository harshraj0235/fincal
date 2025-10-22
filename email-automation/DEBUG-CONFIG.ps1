# Debug config loading
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

Write-Host "Loading config..." -ForegroundColor Cyan

. .\config-DONOTCOMMIT.ps1

Write-Host "SENDER_EMAIL: [$SENDER_EMAIL]" -ForegroundColor Yellow
Write-Host "APP_PASSWORD length: $($APP_PASSWORD.Length)" -ForegroundColor Yellow
Write-Host "APP_PASSWORD first 4 chars: $($APP_PASSWORD.Substring(0,4))..." -ForegroundColor Yellow




