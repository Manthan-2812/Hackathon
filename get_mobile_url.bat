@echo off
echo.
echo === MOBILE ACCESS SETUP ===
echo.

echo Getting your computer's IP address...
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /i "IPv4"') do (
    for /f "tokens=1" %%j in ("%%i") do (
        set IP=%%j
        goto :found
    )
)

:found
echo.
echo Your computer's IP address: %IP%
echo.
echo === MOBILE ACCESS URLS ===
echo Frontend: http://%IP%:3000
echo Backend API: http://%IP%:8000
echo.
echo === INSTRUCTIONS ===
echo 1. Make sure your mobile is connected to the same WiFi network
echo 2. Open your mobile browser
echo 3. Go to: http://%IP%:3000
echo 4. Your Fake News Detection Platform will load!
echo.
echo === QR CODE OPTION ===
echo You can also create a QR code for: http://%IP%:3000
echo Use any QR code generator website to create a QR code
echo.
pause
