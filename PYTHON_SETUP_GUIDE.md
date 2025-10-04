# 🐍 Python Setup Guide for Fake News Detection Platform

## 🚨 Current Issue
The "Import could not be resolved" errors are happening because Python packages are not installed in your system.

## 🔧 Solution Steps

### Step 1: Install Python

**Option A: Microsoft Store (Recommended)**
1. Open Microsoft Store (the window should have opened automatically)
2. Search for "Python 3.11" or "Python 3.12"
3. Click "Install" or "Get"
4. Wait for installation to complete

**Option B: Official Python Website**
1. Go to: https://www.python.org/downloads/
2. Download Python 3.11 or 3.12
3. Run the installer
4. **IMPORTANT**: Check "Add Python to PATH" during installation

### Step 2: Verify Python Installation

Open a new Command Prompt or PowerShell and run:
```cmd
python --version
```

You should see something like:
```
Python 3.11.7
```

### Step 3: Install Dependencies

**Option A: Use the Batch File (Easiest)**
1. Double-click `install_dependencies.bat`
2. Follow the prompts

**Option B: Manual Installation**
```cmd
# Navigate to backend folder
cd Backened

# Upgrade pip
python -m pip install --upgrade pip

# Install all required packages
python -m pip install -r requirements.txt
```

### Step 4: Download Training Data

1. **Go to Kaggle**: https://www.kaggle.com/datasets/saurabhshahane/fake-news-classification
2. **Download**: `WELFake_Dataset.csv`
3. **Place file in**: `Backened/WELFake_Dataset.csv`

### Step 5: Train Models

```cmd
cd Backened
python modeltrain.py
```

### Step 6: Start the Platform

```cmd
# Terminal 1 - Backend
cd Backened
python run_server.py

# Terminal 2 - Frontend
cd ..
npm start
```

## 📦 Required Python Packages

The following packages will be installed automatically:

- **FastAPI** - Web framework for APIs
- **uvicorn** - ASGI server
- **scikit-learn** - Machine learning library
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **nltk** - Natural language processing
- **spacy** - Advanced NLP
- **transformers** - Hugging Face transformers
- **torch** - PyTorch deep learning
- **google-generativeai** - Google Gemini AI
- **pytesseract** - OCR for images
- **Pillow** - Image processing

## 🚨 Common Issues & Solutions

### Issue 1: "Python was not found"
**Solution**: Install Python from Microsoft Store or python.org

### Issue 2: "pip is not recognized"
**Solution**: Use `python -m pip` instead of just `pip`

### Issue 3: "Permission denied"
**Solution**: Run Command Prompt as Administrator

### Issue 4: "Module not found" after installation
**Solution**: Restart your IDE/editor after installing Python

### Issue 5: "spaCy model not found"
**Solution**: After installing packages, run:
```cmd
python -m spacy download en_core_web_sm
```

## ✅ Verification Checklist

After completing the setup, verify everything works:

- [ ] `python --version` shows Python 3.11+
- [ ] `pip list` shows all required packages
- [ ] `python modeltrain.py` runs without errors
- [ ] `python run_server.py` starts the API server
- [ ] No "Import could not be resolved" errors in IDE

## 🎯 Expected Installation Time

- **Python installation**: 2-5 minutes
- **Package installation**: 5-15 minutes (depending on internet speed)
- **Model training**: 5-10 minutes (first time only)

## 🔍 Troubleshooting

### If Python installation fails:
1. Try Microsoft Store version first
2. If that fails, download from python.org
3. Make sure to check "Add to PATH" during installation

### If package installation fails:
1. Update pip: `python -m pip install --upgrade pip`
2. Try installing packages one by one
3. Check your internet connection
4. Disable antivirus temporarily if needed

### If IDE still shows import errors:
1. Restart your IDE completely
2. Check that IDE is using the correct Python interpreter
3. In VS Code: Ctrl+Shift+P → "Python: Select Interpreter"

## 🎉 Success!

Once all packages are installed successfully:
1. The import errors will disappear
2. Your backend server will start without issues
3. The fake news detection platform will work completely

## 📞 Need Help?

If you encounter any issues:
1. Check the error messages carefully
2. Try the troubleshooting steps above
3. Restart your computer if needed
4. Reinstall Python if problems persist

The most common issue is Python not being properly added to PATH during installation. Make sure to check that option!

