# 🔧 Troubleshooting Guide

## API Connection Failed - Step by Step Solution

### Step 1: Start Backend First

**Option A: Use the simple batch file**
```cmd
# Double-click or run in Command Prompt
start_backend_simple.bat
```

**Option B: Manual start**
```cmd
cd D:\fakenewsapp\Backened
pip install -r requirements.txt
python app.py
```

**Expected output:**
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 2: Test Backend Connection

**Open a new Command Prompt and run:**
```cmd
cd D:\fakenewsapp
python test_backend.py
```

**Expected output:**
```
Testing backend health...
Health check status: 200
Health check response: {'status': 'healthy', 'models_loaded': True}
Testing text analysis...
Analysis status: 200
Analysis result: REAL/FAKE/UNCERTAIN
Confidence: 0.85
✅ Backend is working correctly!
```

### Step 3: Start Frontend

**Option A: Use the simple batch file**
```cmd
# Double-click or run in new Command Prompt
start_frontend_simple.bat
```

**Option B: Manual start**
```cmd
cd D:\fakenewsapp\Frontened\Hackathon-main\Hackathon-main
npm install
npm start
```

**Expected output:**
```
Compiled successfully!
You can now view fake-news-detection-platform in the browser.
Local:            http://localhost:3000
```

### Step 4: Test the Full Platform

1. **Open browser**: Go to `http://localhost:3000`
2. **Navigate to Dashboard**: Click "Get Started" or go to `/dashboard`
3. **Test text analysis**: Enter some text and click "Analyze Text"
4. **Check results**: Should show analysis with confidence scores

## 🚨 Common Issues & Solutions

### Issue 1: "API connection failed" in frontend

**Causes:**
- Backend not running
- Wrong port (should be 8000)
- CORS issues
- Firewall blocking

**Solutions:**
1. **Check if backend is running:**
   ```cmd
   curl http://localhost:8000/health
   ```
   Should return: `{"status":"healthy","models_loaded":true}`

2. **Check backend logs** for errors

3. **Restart backend** if needed

### Issue 2: "Cannot connect to backend"

**Causes:**
- Backend not started
- Port 8000 already in use
- Python dependencies missing

**Solutions:**
1. **Kill processes on port 8000:**
   ```cmd
   netstat -ano | findstr :8000
   taskkill /PID <PID_NUMBER> /F
   ```

2. **Reinstall dependencies:**
   ```cmd
   cd D:\fakenewsapp\Backened
   pip install -r requirements.txt --force-reinstall
   ```

3. **Check Python version:**
   ```cmd
   python --version
   ```
   Should be Python 3.8+

### Issue 3: Frontend shows "Analyzing..." forever

**Causes:**
- Backend API timeout
- Gemini API issues
- Network problems

**Solutions:**
1. **Check backend logs** for errors
2. **Test with simple text** first
3. **Check internet connection** (needed for Gemini API)

### Issue 4: "Module not found" errors

**Causes:**
- Dependencies not installed
- Wrong Python environment

**Solutions:**
1. **Install all dependencies:**
   ```cmd
   cd D:\fakenewsapp\Backened
   pip install -r requirements.txt
   ```

2. **Check if all packages are installed:**
   ```cmd
   pip list | findstr google
   pip list | findstr fastapi
   ```

### Issue 5: Gemini API errors

**Causes:**
- Invalid API key
- Rate limit exceeded
- Network issues

**Solutions:**
1. **Verify API key** is correct
2. **Check rate limits** (15 requests/minute)
3. **Test API key** at Google AI Studio

## 🔍 Debug Steps

### 1. Check Backend Status
```cmd
curl http://localhost:8000/health
```

### 2. Check Backend Logs
Look for error messages in the backend console

### 3. Test API Directly
```cmd
python test_backend.py
```

### 4. Check Frontend Console
Open browser Developer Tools (F12) and check Console tab for errors

### 5. Check Network Tab
In browser Developer Tools, check Network tab for failed requests

## ✅ Success Indicators

**Backend is working when you see:**
- `INFO: Uvicorn running on http://0.0.0.0:8000`
- Health check returns `{"status":"healthy"}`
- Test script shows "✅ Backend is working correctly!"

**Frontend is working when you see:**
- `Compiled successfully!`
- Dashboard loads without errors
- Analysis returns results (not "API connection failed")

**Full platform is working when:**
- Text analysis returns verdict and confidence
- URL analysis works
- Image analysis works
- No "API connection failed" messages

## 🆘 Still Having Issues?

If you're still experiencing problems:

1. **Check all error messages** carefully
2. **Restart both backend and frontend**
3. **Clear browser cache** (Ctrl+Shift+R)
4. **Check Windows Firewall** settings
5. **Try a different browser**

The most common issue is that the backend isn't running when the frontend tries to connect to it. Always start the backend first!
