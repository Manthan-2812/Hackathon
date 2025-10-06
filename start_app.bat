@echo off
echo Starting Fake News Detection Platform...
echo.

echo Checking and fixing dependencies...
echo Ensuring react-scripts is properly installed...

REM Fix package.json if needed
powershell -Command "(Get-Content package.json) -replace '\"react-scripts\": \"\^0\.0\.0\"', '\"react-scripts\": \"5.0.1\"' | Set-Content package.json"

REM Ensure react-scripts is installed
if not exist "node_modules\react-scripts" (
    echo Installing react-scripts...
    call npm install react-scripts@5.0.1 --save
)

echo Starting Backend Server...
start "Backend" cmd /k "cd Backened && python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

REM Get IP address for mobile access
for /f "tokens=14" %%i in ('ipconfig ^| findstr /i "IPv4"') do (
    set COMPUTER_IP=%%i
    goto :start_frontend
)

:start_frontend
echo Starting Frontend...
echo Computer IP detected: %COMPUTER_IP%
set REACT_APP_BACKEND_URL=http://%COMPUTER_IP%:8000
start "Frontend" cmd /k "set HOST=0.0.0.0 && set REACT_APP_BACKEND_URL=http://%COMPUTER_IP%:8000 && npm start"

echo.
echo Both servers are starting...
echo.
echo === LOCAL ACCESS ===
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo === MOBILE ACCESS ===
echo Frontend: http://%COMPUTER_IP%:3000
echo Backend API: http://%COMPUTER_IP%:8000
echo.
echo Make sure your mobile is on the same WiFi network!
echo Run get_mobile_url.bat for detailed mobile setup instructions.
echo.
echo Press any key to exit...
pause > nul
