@echo off
title Rive Digitals — Push to GitHub
echo ========================================================
echo   Pushing Rive Digitals to GitHub:
echo   https://github.com/Christyomolayo20/rive-digitals.git
echo ========================================================
cd /d "%~dp0"
set "PATH=C:\Users\chris\.gemini\antigravity\scratch\.git-bin\cmd;%PATH%"
git config http.sslVerify false
echo Staging and committing any recent changes...
git add -A
git commit -m "feat: complete responsive website, photorealistic imagery, admin studio, and Supabase integration"
echo.
echo Pushing to GitHub (origin main)...
echo If a GitHub sign-in window appears, please authorize in your browser.
git push -u origin main --force
echo.
echo ========================================================
echo   Push completed! Check https://github.com/Christyomolayo20/rive-digitals
echo ========================================================
pause
