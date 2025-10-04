# 🚀 Complete Setup Guide for Fake News Detection Platform

## 📋 Prerequisites

- **Python 3.8+** installed
- **Node.js 14+** installed
- **npm** or **yarn** package manager
- **Git** (optional)
- **Internet connection** for API calls

## 🔧 Step-by-Step Setup

### Step 1: Download Training Data

1. **Go to Kaggle**: https://www.kaggle.com/datasets/saurabhshahane/fake-news-classification
2. **Download**: `WELFake_Dataset.csv`
3. **Place file in**: `Backened/WELFake_Dataset.csv`

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd Backened

# Install Python dependencies
pip install -r requirements.txt

# Create environment file
copy env_template.txt .env

# Edit .env file and add your Gemini API key
# Get free API key: https://makersuite.google.com/app/apikey
```

**Edit `.env` file:**
```env
GEMINI_API_KEY=your-actual-gemini-api-key-here
DEBUG=True
DATABASE_URL=sqlite:///./fakenews.db
```

### Step 3: Train Models

```bash
# Still in Backened folder
python modeltrain.py
```

**Expected output:**
```
🚀 Starting Fake News Detection Model Training
==================================================
📊 Loading dataset...
✅ Dataset loaded. Shape: (72134, 3)
✅ Rows with valid labels: 72134
✅ Text preprocessing completed. Final dataset size: 72134
🤖 Training Random Forest model...
📝 Creating TF-IDF vectors...
🌲 Training Random Forest classifier...
✅ Model training completed!
🎯 Accuracy: 89.45%
💾 Saving models...
✅ Models saved successfully!
```

### Step 4: Install spaCy Model

```bash
python -m spacy download en_core_web_sm
```

### Step 5: Test Backend

```bash
# Start the backend server
python run_server.py
```

**Expected output:**
```
🚀 Starting Fake News Detection API Server
==================================================
✅ All required packages are installed
✅ spaCy English model found
✅ Trained models found
✅ Created .env file template

🌐 Starting API server...
API will be available at: http://localhost:8000
API documentation: http://localhost:8000/docs
```

**Test in new terminal:**
```bash
cd ..
python test_backend.py
```

### Step 6: Setup Frontend

```bash
# Navigate to root directory
cd ..

# Install Node.js dependencies
npm install

# Start the frontend
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view fake-news-detection-platform in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.100:3000

Note that the development build is not optimized.
```

## 🎯 Quick Start Commands

### Option 1: Use PowerShell Script
```powershell
# Run the startup script
.\start_platform.ps1
```

### Option 2: Manual Start (Recommended)
```bash
# Terminal 1 - Backend
cd Backened
python run_server.py

# Terminal 2 - Frontend
cd ..
npm start
```

## 🔍 Verification

### 1. Backend Health Check
Visit: http://localhost:8000/health
Should return: `{"status":"healthy","models_loaded":true}`

### 2. Frontend Access
Visit: http://localhost:3000
Should show the landing page

### 3. Full Platform Test
1. Go to Dashboard: http://localhost:3000/dashboard
2. Enter test text: "Scientists discover new renewable energy breakthrough"
3. Click "Analyze Text"
4. Should return analysis results

## 🚨 Common Issues & Solutions

### Issue 1: "Module not found" errors
```bash
cd Backened
pip install -r requirements.txt --force-reinstall
```

### Issue 2: "spaCy model not found"
```bash
python -m spacy download en_core_web_sm
```

### Issue 3: "Dataset not found"
- Download WELFake_Dataset.csv from Kaggle
- Place in Backened folder
- Run: `python modeltrain.py`

### Issue 4: "API key not configured"
- Get Gemini API key: https://makersuite.google.com/app/apikey
- Edit Backened/.env file
- Restart backend server

### Issue 5: "Port already in use"
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill the process
taskkill /PID <PID_NUMBER> /F
```

### Issue 6: Frontend shows "API connection failed"
- Ensure backend is running on port 8000
- Check backend logs for errors
- Verify CORS settings in app.py

## 📊 Expected Performance

- **Model Training**: 5-10 minutes (first time)
- **Backend Startup**: 30-60 seconds
- **Frontend Compilation**: 1-2 minutes
- **Text Analysis**: 2-5 seconds per request
- **Accuracy**: 85-90% on test dataset

## 🔧 Development Tips

### Backend Development
```bash
# Enable debug mode
export DEBUG=True

# View API documentation
# Visit: http://localhost:8000/docs

# Check logs
# Monitor terminal output for errors
```

### Frontend Development
```bash
# Enable hot reload (default)
npm start

# Build for production
npm run build

# Check for linting issues
npm run lint
```

## 📁 Final File Structure

```
your-project/
├── Backened/
│   ├── app.py
│   ├── config.py
│   ├── modeltrain.py
│   ├── run_server.py
│   ├── requirements.txt
│   ├── .env
│   ├── rf_model.pkl
│   ├── tfidf_vectorizer.pkl
│   ├── WELFake_Dataset.csv
│   └── README.md
├── src/
│   ├── components/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── start_platform.ps1
├── test_backend.py
└── SETUP_GUIDE.md
```

## ✅ Success Checklist

- [ ] WELFake_Dataset.csv downloaded and placed correctly
- [ ] Python dependencies installed
- [ ] Gemini API key configured in .env
- [ ] Models trained successfully
- [ ] Backend server starts without errors
- [ ] Frontend compiles successfully
- [ ] Health check returns "healthy"
- [ ] Text analysis works in dashboard
- [ ] No ESLint warnings in frontend
- [ ] All API endpoints respond correctly

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs** in both backend and frontend terminals
2. **Verify all prerequisites** are installed correctly
3. **Ensure all files** are in the correct locations
4. **Test each component** individually
5. **Check network connectivity** for API calls

## 🎉 Next Steps

Once setup is complete:

1. **Customize the UI** in `src/components/`
2. **Add new features** to the API in `Backened/app.py`
3. **Improve the models** by retraining with new data
4. **Deploy to production** using cloud services
5. **Add authentication** for user management

Happy coding! 🚀
