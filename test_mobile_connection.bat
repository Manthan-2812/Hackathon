@echo off
echo Testing Mobile Connection Setup...
echo.

REM Get IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4" ^| findstr "192.168"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        set IP=%%b
        goto :found
    )
)

:found
echo Your WiFi IP: %IP%
echo.

echo Starting simple test servers...
echo.

REM Start backend
echo Starting Backend on %IP%:8000...
start "Test-Backend" cmd /k "cd Backened && python -m uvicorn app:app --host 0.0.0.0 --port 8000"

timeout /t 5 /nobreak > nul

REM Start frontend  
echo Starting Frontend on %IP%:3000...
start "Test-Frontend" cmd /k "set HOST=0.0.0.0 && set REACT_APP_BACKEND_URL=http://%IP%:8000 && npm start"

echo.
echo ========================================
echo MOBILE TEST READY!
echo ========================================
echo.
echo 1. Make sure your mobile is on same WiFi
echo 2. Try these URLs on your mobile browser:
echo.
echo    Frontend: http://%IP%:3000
echo    Backend:  http://%IP%:8000/health
echo.
echo 3. If URLs don't work, try:
echo    - Check Windows Firewall (allow Node.js/Python)
echo    - Make sure both devices on same WiFi network
echo    - Try http://192.168.1.XXX:3000 (replace XXX with your IP)
echo.
echo Your detected IP: %IP%
echo ========================================
pause
