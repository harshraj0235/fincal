# MoneyCal Auto News Generator Service - PowerShell Script
# Run this script to start the automated news blog generation service

param(
    [switch]$Background,
    [switch]$InstallService,
    [switch]$UninstallService
)

$ServiceName = "MoneyCalAutoNewsGenerator"
$ScriptPath = Join-Path $PSScriptRoot "auto-news-generator.cjs"
$WorkingDir = Split-Path $PSScriptRoot

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "MoneyCal India - Auto News Generator" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($InstallService) {
    Write-Host "Installing as Windows Service..." -ForegroundColor Yellow
    try {
        # Create service using NSSM (if available) or sc.exe
        $serviceExists = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue
        if ($serviceExists) {
            Write-Host "Service already exists. Updating..." -ForegroundColor Yellow
            Stop-Service -Name $ServiceName -Force -ErrorAction SilentlyContinue
            Remove-Service -Name $ServiceName -Force
        }
        
        # Try to create service using sc.exe
        $nodePath = Get-Command node -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source
        if ($nodePath) {
            $binPath = "`"$nodePath`" `"$ScriptPath`""
            $result = sc.exe create $ServiceName binPath= $binPath start= auto
            if ($result -eq 0) {
                sc.exe description $ServiceName "MoneyCal Auto News Generator - Creates Hindi blog posts every 36 hours"
                Write-Host "✅ Service installed successfully!" -ForegroundColor Green
                Write-Host "Start the service with: Start-Service $ServiceName" -ForegroundColor Green
            } else {
                Write-Host "❌ Failed to install service using sc.exe" -ForegroundColor Red
            }
        } else {
            Write-Host "❌ Node.js not found in PATH" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Error installing service: $_" -ForegroundColor Red
    }
    exit
}

if ($UninstallService) {
    Write-Host "Uninstalling Windows Service..." -ForegroundColor Yellow
    try {
        $serviceExists = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue
        if ($serviceExists) {
            Stop-Service -Name $ServiceName -Force -ErrorAction SilentlyContinue
            Remove-Service -Name $ServiceName -Force
            Write-Host "✅ Service uninstalled successfully!" -ForegroundColor Green
        } else {
            Write-Host "Service not found." -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ Error uninstalling service: $_" -ForegroundColor Red
    }
    exit
}

Write-Host "Starting automated news blog generation service..." -ForegroundColor Green
Write-Host ""
Write-Host "Features:" -ForegroundColor White
Write-Host "• Generates 10 new blogs every 36 hours" -ForegroundColor White
Write-Host "• Auto-syncs with GitHub every 12 hours" -ForegroundColor White
Write-Host "• Updates blog dates every 24 hours" -ForegroundColor White
Write-Host "• Runs continuously in background" -ForegroundColor White
Write-Host ""

if ($Background) {
    Write-Host "Starting service in background..." -ForegroundColor Yellow
    Write-Host "Service will run in background. Check logs in Event Viewer." -ForegroundColor Yellow
    
    # Start in background
    Start-Process -FilePath "node" -ArgumentList $ScriptPath -WorkingDirectory $WorkingDir -WindowStyle Hidden
    Write-Host "✅ Service started in background!" -ForegroundColor Green
    Write-Host "To stop: Get-Process | Where-Object {$_.ProcessName -eq 'node'} | Stop-Process" -ForegroundColor Yellow
} else {
    Write-Host "Service will start in 5 seconds..." -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop the service" -ForegroundColor Yellow
    Write-Host ""
    Start-Sleep -Seconds 5
    
    Write-Host "🚀 Starting service..." -ForegroundColor Green
    Write-Host "📝 Logs will be displayed below:" -ForegroundColor White
    Write-Host ""
    
    try {
        Set-Location $WorkingDir
        & node $ScriptPath
    } catch {
        Write-Host "❌ Error running service: $_" -ForegroundColor Red
        Write-Host "Press any key to exit..." -ForegroundColor Yellow
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
}

Write-Host ""
Write-Host "Service stopped. Press any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
