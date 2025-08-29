@echo off
echo 🚀 Starting Shakti Scribe Python API (Simplified)
echo ================================================

cd /d "c:\Users\anjal\SHAKTI-SCRIBE\python-agents"

echo 📦 Installing minimal dependencies...
pip install fastapi uvicorn python-dotenv google-generativeai pydantic httpx python-multipart

echo.
echo 🌐 Starting simplified API server...
echo Server will be available at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

python api/simple_main.py

pause
