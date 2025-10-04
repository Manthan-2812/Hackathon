@echo off
echo Installing Python dependencies for Fake News Detection Platform...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed or not in PATH.
    echo Please install Python from the Microsoft Store that just opened.
    echo After installation, run this script again.
    pause
    exit /b 1
)

echo Python found! Installing dependencies...
echo.

REM Navigate to backend directory
cd Backened

REM Install requirements
echo Installing Python packages...
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

if %errorlevel% equ 0 (
    echo.
    echo ✅ All dependencies installed successfully!
    echo.
    echo Next steps:
    echo 1. Download WELFake_Dataset.csv from Kaggle
    echo 2. Place it in the Backened folder
    echo 3. Run: python modeltrain.py
    echo 4. Start the server: python run_server.py
) else (
    echo.
    echo ❌ Some dependencies failed to install.
    echo Please check the error messages above.
)

echo.
pause

