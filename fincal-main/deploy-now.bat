@echo off
echo ========================================
echo   DEPLOYING 42 NEW LESSONS TO PRODUCTION
echo ========================================
echo.

REM Check if git is configured
git config user.email >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git identity not configured!
    echo.
    echo Please run these commands first:
    echo   git config user.email "your@email.com"
    echo   git config user.name "Your Name"
    echo.
    pause
    exit /b 1
)

echo Step 1: Committing changes...
git commit -m "🎊 Add 42 new lessons: Gold (10), Credit Cards (20), Credit Score (10) - 12k+ lines, SEO optimized, E-E-A-T compliant"

if %errorlevel% equ 0 (
    echo ✓ Commit successful!
    echo.
    echo Step 2: Pushing to production...
    git push origin main
    
    if %errorlevel% equ 0 (
        echo.
        echo ========================================
        echo   🎉 DEPLOYMENT SUCCESSFUL!
        echo ========================================
        echo.
        echo Your 42 new lessons are now deploying!
        echo.
        echo Netlify will build and deploy in 2-3 minutes
        echo Check: https://moneycal.in
        echo.
        echo New URLs going live:
        echo   - /learn/gold-loans (10 lessons)
        echo   - /learn/credit-cards (20 lessons)
        echo   - /learn/credit-score (10 lessons)
        echo.
        echo Total: 142 lessons across 9 categories!
        echo.
    ) else (
        echo.
        echo ❌ Push failed! Check your internet connection.
        echo.
    )
) else (
    echo.
    echo ❌ Commit failed! 
    echo This might mean git identity is not set up.
    echo.
    echo Run:
    echo   git config user.email "your@email.com"
    echo   git config user.name "Your Name"
    echo.
)

pause

