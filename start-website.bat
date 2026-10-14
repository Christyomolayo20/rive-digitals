@echo off
title Rive Digitals — Local Server
echo ========================================================
echo   Starting Rive Digitals Local Server
echo   Website:       http://localhost:3000
echo   Admin Studio:  http://localhost:3000/admin
echo ========================================================
cd /d "%~dp0"
set "PATH=C:\Users\chris\.gemini\antigravity\scratch\.node\node-v20.18.1-win-x64;%PATH%"
npm run dev
pause
