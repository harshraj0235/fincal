@echo off
echo ========================================
echo   GIT IDENTITY SETUP
echo ========================================
echo.
echo This is a ONE-TIME setup for git commits
echo.

set /p email="Enter your email: "
set /p name="Enter your name: "

echo.
echo Setting up git identity...
git config user.email "%email%"
git config user.name "%name%"

echo.
echo ✓ Git identity configured!
echo   Email: %email%
echo   Name: %name%
echo.
echo Now you can run: deploy-now.bat
echo.
pause

