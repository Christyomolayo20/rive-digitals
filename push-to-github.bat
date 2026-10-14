@echo off
setlocal enabledelayedexpansion
title Rive Digitals — Push to GitHub
echo ========================================================
echo   Pushing Rive Digitals to GitHub:
echo   https://github.com/Christyomolayo20/rive-digitals.git
echo ========================================================
echo.
cd /d "%~dp0"
set "PATH=C:\Users\chris\.gemini\antigravity\scratch\.git-bin\cmd;C:\Users\chris\.gemini\antigravity\scratch\.git-bin\mingw64\bin;%PATH%"

git config http.sslVerify false

echo Staging all project files and images...
git add -A
git commit -m "feat: complete responsive website, photorealistic imagery, admin studio, and Supabase integration" 2>nul

echo.
echo Pushing commits to branch 'main'...
echo Note: If prompted, choose 'Sign in with your browser' or paste a GitHub Personal Access Token.
echo.

git push -u origin main --force

if errorlevel 1 (
    echo.
    echo ========================================================
    echo   [NOTICE] GitHub requires authentication to write to the repo.
    echo ========================================================
    echo.
    echo If you have a GitHub Personal Access Token:
    echo 1. Generate one at: https://github.com/settings/tokens/new
    echo 2. Check the 'repo' scope and click 'Generate token'.
    echo.
    set /p GHP_TOKEN="Paste your GitHub token here (or press Enter to cancel): "
    if defined GHP_TOKEN (
        echo Pushing to GitHub using token...
        git push https://!GHP_TOKEN!@github.com/Christyomolayo20/rive-digitals.git main --force
        if errorlevel 1 (
            echo Push with token failed. Please check token permissions.
        ) else (
            echo SUCCESS! Pushed to https://github.com/Christyomolayo20/rive-digitals
        )
    )
) else (
    echo.
    echo ========================================================
    echo   SUCCESS! All files are now live on GitHub:
    echo   https://github.com/Christyomolayo20/rive-digitals
    echo ========================================================
)

echo.
pause
