@echo off
title TypeScript/TSX Code Mapper
echo ========================================
echo   TypeScript/TSX Code Mapper
echo ========================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is required. Install from https://nodejs.org
    pause
    exit /b
)

echo Running analysis...
echo.

node "%~dp0analyze_ts.js" "%CD%" "code_map_report.txt"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Done! Report: code_map_report.txt
    start "" notepad "code_map_report.txt"
) else (
    echo.
    echo [ERROR] Failed with code: %ERRORLEVEL%
)

pause
exit /b