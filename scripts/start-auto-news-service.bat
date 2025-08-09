@echo off
title MoneyCal Auto News Generator Service
echo ========================================
echo MoneyCal India - Auto News Generator
echo ========================================
echo.
echo Starting automated news blog generation service...
echo.
echo Features:
echo - Generates 10 new blogs every 36 hours
echo - Auto-syncs with GitHub every 12 hours
echo - Updates blog dates every 24 hours
echo - Runs continuously in background
echo.
echo Service will start in 5 seconds...
echo Press Ctrl+C to stop the service
echo.
timeout /t 5 /nobreak >nul

echo 🚀 Starting service...
echo 📝 Logs will be displayed below:
echo.

cd /d "%~dp0.."
node scripts/auto-news-generator.cjs

echo.
echo Service stopped. Press any key to exit...
pause >nul
