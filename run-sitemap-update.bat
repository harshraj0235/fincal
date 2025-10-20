@echo off
REM Quick run script for sitemap date update

echo ====================================
echo   FinCal Sitemap Date Updater
echo ====================================
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0auto-update-sitemap-dates.ps1"

echo.
echo ====================================
echo Press any key to close...
pause >nul

