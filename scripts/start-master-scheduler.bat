@echo off
chcp 65001 >nul
title MoneyCal Master Scheduler

echo.
echo ========================================
echo    MoneyCal Master Scheduler
echo ========================================
echo.

REM Check if PowerShell is available
powershell -Command "Write-Host 'PowerShell available'" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PowerShell is not available. Please install PowerShell.
    pause
    exit /b 1
)

REM Navigate to scripts directory
cd /d "%~dp0"

echo 🚀 Starting MoneyCal Master Scheduler...
echo 📁 Working Directory: %CD%
echo ⏰ Schedule: Every 36 hours
echo 🔄 Git Sync: Every 12 hours
echo 🌐 Repository: https://github.com/harshraj0235/fincal
echo.

REM Start the scheduler using PowerShell
powershell -ExecutionPolicy Bypass -File "start-master-scheduler.ps1"

echo.
echo ✅ Scheduler operation completed.
pause
