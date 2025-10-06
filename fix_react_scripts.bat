@echo off
echo Fixing react-scripts issue...
echo.

REM Fix package.json
echo Fixing package.json...
powershell -Command "(Get-Content package.json) -replace '\"react-scripts\": \"\^0\.0\.0\"', '\"react-scripts\": \"5.0.1\"' | Set-Content package.json"

REM Remove and reinstall react-scripts
echo Reinstalling react-scripts...
call npm uninstall react-scripts
call npm install react-scripts@5.0.1 --save

echo.
echo ✅ Fixed! You can now run npm start
echo.
pause
