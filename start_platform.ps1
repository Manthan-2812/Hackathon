# Fake News Detection Platform Startup Script
Write-Host "Starting Fake News Detection Platform..." -ForegroundColor Green
Write-Host ""

# Start Backend Server
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Set-Location "Backened"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python run_server.py"

# Wait for backend to start
Write-Host "Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start Frontend Server
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Set-Location "..\Frontened\Hackathon-main\Hackathon-main"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"

Write-Host ""
Write-Host "Platform is starting up..." -ForegroundColor Green
Write-Host "Backend: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
