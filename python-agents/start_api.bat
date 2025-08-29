@echo off
echo 🚀 Starting Shakti Scribe Python Agent API
echo =========================================

echo 📂 Navigating to python-agents directory...
cd /d "c:\Users\anjal\SHAKTI-SCRIBE\python-agents"

echo 🔧 Checking environment...
if not exist ".env" (
    echo ❌ .env file not found! Please create it from .env.example
    pause
    exit /b 1
)

echo 🌐 Starting FastAPI server...
echo Server will be available at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

python -m uvicorn api.main:app --reload --host 0.0.0.0 --port 8000

pause
