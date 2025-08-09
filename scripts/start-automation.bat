@echo off
title Fincal Automation Service
color 0A

echo.
echo ========================================
echo    FINCAL AUTOMATION SERVICE
echo ========================================
echo.
echo Starting automation service...
echo This will run all scripts every 36 hours
echo and automatically sync with GitHub
echo.
echo Press Ctrl+C to stop the service
echo.

cd /d "%~dp0.."

echo Current directory: %CD%
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo Git version:
git --version
echo.

REM Check if this is a Git repository
if not exist ".git" (
    echo ERROR: This directory is not a Git repository
    echo Please run 'git init' and configure the repository
    pause
    exit /b 1
)

echo Git repository status:
git status --porcelain
echo.

echo Starting automation service...
echo Scripts will run every 36 hours automatically
echo.

REM Start the automation service
node "scripts/auto-runner.cjs"

echo.
echo Automation service stopped.
pause
