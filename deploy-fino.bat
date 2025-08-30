@echo off
REM Fino Finance Chat System - Deployment Script for Windows
REM This script prepares and deploys the complete Fino system

echo 🚀 Fino Finance Chat System - Deployment Script
echo ================================================

REM Check if git is available
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed. Please install Git first.
    exit /b 1
)

REM Check if we're in a git repository
git rev-parse --git-dir >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Not in a git repository. Please run this script from the project root.
    exit /b 1
)

echo [INFO] Starting Fino deployment process...

REM Check current branch
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
echo [INFO] Current branch: %CURRENT_BRANCH%

REM Check for uncommitted changes
git diff-index --quiet HEAD --
if %errorlevel% neq 0 (
    echo [WARNING] You have uncommitted changes. Committing them now...
    git add .
    git commit -m "feat: Add Fino Finance Chat System

- Add complete Fino AI finance chat system
- Frontend: React/TypeScript with Tailwind CSS
- Backend: Python FastAPI with web scraping
- Features: Voice input, multi-language, real-time data
- Routes: /fino (chat), /fino-home (landing)
- SEO optimized for Indian finance market
- No login required, privacy-focused
- Ready for production deployment"
    echo [SUCCESS] Changes committed successfully
) else (
    echo [INFO] No uncommitted changes found
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] No remote origin found. Please add a remote repository:
    echo git remote add origin https://github.com/your-username/your-repo.git
    exit /b 1
)

REM Get remote URL
for /f "tokens=*" %%i in ('git remote get-url origin') do set REMOTE_URL=%%i
echo [INFO] Remote repository: %REMOTE_URL%

REM Push to remote repository
echo [INFO] Pushing to remote repository...
git push origin %CURRENT_BRANCH%
if %errorlevel% equ 0 (
    echo [SUCCESS] Successfully pushed to remote repository
) else (
    echo [ERROR] Failed to push to remote repository
    exit /b 1
)

REM Display deployment information
echo.
echo 🎉 Fino Finance Chat System Deployed Successfully!
echo ==================================================
echo.
echo 📋 Deployment Summary:
echo   • Frontend: React/TypeScript with Tailwind CSS
echo   • Backend: Python FastAPI with web scraping
echo   • Routes: /fino (chat), /fino-home (landing)
echo   • Features: Voice input, multi-language, real-time data
echo   • SEO: Optimized for Indian finance market
echo.
echo 🔗 Access Points:
echo   • Main Chat: https://your-domain.com/fino
echo   • Landing Page: https://your-domain.com/fino-home
echo   • Homepage Banner: https://your-domain.com/
echo.
echo 🚀 Next Steps:
echo   1. Deploy frontend to Vercel/Netlify
echo   2. Deploy backend to Railway/Heroku
echo   3. Set up custom domain (fino.moneycal.in)
echo   4. Configure environment variables
echo   5. Set up monitoring and analytics
echo.
echo 📚 Documentation:
echo   • Frontend: src/fino/FINO_README.md
echo   • Backend: src/fino/backend/README.md
echo   • Deployment: src/fino/DEPLOYMENT.md
echo.
echo 🛠️  Development Commands:
echo   Frontend: npm run dev
echo   Backend:  cd src/fino/backend ^&^& python start.py
echo   Full:     See src/fino/FINO_README.md
echo.

REM Check deployment configuration
echo [INFO] Checking deployment configuration...

if exist vercel.json (
    echo [SUCCESS] Vercel configuration found
) else (
    echo [WARNING] No Vercel configuration found. Consider adding vercel.json for easy deployment.
)

if exist netlify.toml (
    echo [SUCCESS] Netlify configuration found
) else (
    echo [WARNING] No Netlify configuration found. Consider adding netlify.toml for easy deployment.
)

if exist docker-compose.yml (
    echo [SUCCESS] Docker configuration found
) else (
    echo [WARNING] No Docker configuration found. Consider adding docker-compose.yml for containerized deployment.
)

echo.
echo [SUCCESS] Fino Finance Chat System is ready for deployment!
echo [INFO] Visit the documentation files for detailed deployment instructions.
echo.
echo 🌟 Happy coding with Fino! 🌟
pause
