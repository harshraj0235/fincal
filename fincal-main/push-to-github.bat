@echo off
REM Push fincal to https://github.com/harshraj0235/fincal
cd /d "%~dp0"

echo Checking git...
git --version
if errorlevel 1 (
  echo ERROR: Git not found. Install Git from https://git-scm.com/ and add it to PATH.
  pause
  exit /b 1
)

echo.
echo Setting remote to https://github.com/harshraj0235/fincal ...
git remote remove origin 2>nul
git remote add origin https://github.com/harshraj0235/fincal.git

echo.
echo Staging all changes...
git add -A

echo.
echo Committing...
git commit -m "fix: LCP improvements, canonical/sitemap URL normalization for indexing" 2>nul || git commit -m "fix: LCP improvements, canonical/sitemap URL normalization for indexing" --allow-empty

echo.
echo Pushing to GitHub...
git branch -M main 2>nul
git push -u origin main

if errorlevel 1 (
  echo.
  echo If push failed: ensure you have access to harshraj0235/fincal and use a Personal Access Token if prompted for password.
  pause
  exit /b 1
)

echo.
echo Done. Check https://github.com/harshraj0235/fincal
pause
