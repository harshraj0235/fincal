@echo off
title Fincal Automation Service
color 0A

echo ========================================
echo    FINCAL AUTOMATION SERVICE
echo ========================================
echo.

:: Set working directory
cd /d "%~dp0.."
echo Current directory: %CD%
echo.

:: Check if Node.js is installed
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js found: 
node --version
echo.

:: Check if Git is installed
echo Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)
echo Git found:
git --version
echo.

:: Check if automation scripts exist
echo Checking automation scripts...
if not exist "scripts\auto-runner.cjs" (
    echo ERROR: auto-runner.cjs not found
    pause
    exit /b 1
)
if not exist "scripts\automation-service.cjs" (
    echo ERROR: automation-service.cjs not found
    pause
    exit /b 1
)
echo All automation scripts found.
echo.

:: Create log directory if it doesn't exist
if not exist "scripts\logs" mkdir "scripts\logs"

:: Set environment variables
set AUTOMATION_MODE=ENHANCED
set NODE_ENV=production
set MAX_RESTARTS=10
set RESTART_DELAY=30

echo ========================================
echo Starting Fincal Automation Service...
echo ========================================
echo.
echo Configuration:
echo - Mode: %AUTOMATION_MODE%
echo - Environment: %NODE_ENV%
echo - Max Restarts: %MAX_RESTARTS%
echo - Restart Delay: %RESTART_DELAY% seconds
echo - Log File: scripts\auto-runner.log
echo - Service Log: scripts\service.log
echo.

:: Function to start automation
:start_automation
echo [%date% %time%] Starting automation service...
echo.

:: Start the automation service
node "scripts\automation-service.cjs"

:: Check if the process exited with an error
if %errorlevel% neq 0 (
    echo.
    echo [%date% %time%] Automation service exited with error code: %errorlevel%
    echo [%date% %time%] Restarting in %RESTART_DELAY% seconds...
    echo.
    
    :: Wait before restarting
    timeout /t %RESTART_DELAY% /nobreak >nul
    
    :: Restart the automation
    goto start_automation
) else (
    echo.
    echo [%date% %time%] Automation service stopped normally.
    echo.
)

echo ========================================
echo Automation service stopped.
echo Press any key to exit...
echo ========================================
pause >nul
