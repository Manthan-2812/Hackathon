@echo off
echo Checking your computer's network configuration...
echo.

echo === ALL IP ADDRESSES ===
ipconfig | findstr "IPv4"
echo.

echo === WIFI/ETHERNET IP ===
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        echo Found IP: %%b
        set IP=%%b
    )
)

echo.
echo === TESTING CONNECTIVITY ===
echo Testing if backend is accessible...
curl -s http://localhost:8000/health
echo.

echo === MOBILE URLS TO TRY ===
echo Try these URLs on your mobile:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        echo http://%%b:3000
    )
)

echo.
echo === FIREWALL CHECK ===
echo Make sure Windows Firewall allows Node.js and Python
echo When prompted, click "Allow access"
echo.
pause
