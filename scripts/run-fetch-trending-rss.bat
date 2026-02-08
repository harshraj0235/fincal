@echo off
cd /d "%~dp0\.."
call npm run fetch-trending-rss
if %ERRORLEVEL% neq 0 (
  echo Run: npm run fetch-trending-rss
  exit /b 1
)
