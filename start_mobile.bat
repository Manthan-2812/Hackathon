@echo off
echo Setting up Mobile Access for Fake News Detection Platform...
echo.

REM Get the actual IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        set IP=%%b
        goto :found_ip
    )
)

:found_ip
echo Your computer IP: %IP%
echo.

REM Kill any existing processes
taskkill /f /im node.exe 2>nul
taskkill /f /im python.exe 2>nul

echo Starting Backend Server (accessible from mobile)...
start "Backend-Mobile" cmd /k "cd Backened && python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000"

echo Waiting for backend to start...
timeout /t 8 /nobreak > nul

echo Starting Frontend (accessible from mobile)...
start "Frontend-Mobile" cmd /k "set HOST=0.0.0.0 && set REACT_APP_BACKEND_URL=http://%IP%:8000 && npm start"

echo.
echo ========================================
echo MOBILE ACCESS READY!
echo ========================================
echo.
echo On your mobile device:
echo 1. Connect to the same WiFi network
echo 2. Open browser and go to:
echo.
echo    http://%IP%:3000
echo.
echo Backend API: http://%IP%:8000
echo ========================================
echo.
echo Press any key to exit...
pause > nul
