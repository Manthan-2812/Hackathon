# 📦 Missing Dependencies & Setup Guide

## ⚠️ Required But Not Included

The following items are **required** but not included in the repository:

### 1. 🤖 ML Model Files (Optional but Recommended)

**Files:**
- `rf_model.pkl` - Random Forest classifier model
- `tfidf_vectorizer.pkl` - TF-IDF text vectorizer

**Why missing?** These are large binary files (50-200MB) generated during training.

**How to get them:**

#### Option A: Train Your Own (Recommended)
```bash
# 1. Download WELFake Dataset
# Visit: https://www.kaggle.com/datasets/saurabhshahane/fake-news-classification
# Download and extract to get WELFake_Dataset.csv

# 2. Place dataset in Backened folder
# File should be: Backened/WELFake_Dataset.csv

# 3. Train the model
cd Backened
python modeltrain.py

# This will create:
# - rf_model.pkl
# - tfidf_vectorizer.pkl
```

**Training specs:**
- Time: ~5-15 minutes (depending on your CPU)
- RAM: ~4-8GB required
- Dataset size: ~72,000 news articles

#### Option B: Use Without ML Models
The API will work without these files using only:
- ✅ Google Gemini LLM analysis
- ✅ Sentiment analysis (NLTK)
- ✅ Linguistic pattern detection

**Impact:** ML-based predictions will return "UNCERTAIN" but LLM analysis will still work.

### 2. 📊 Dataset File

**File:** `WELFake_Dataset.csv`

**Why missing?** Large file (100MB+) with licensing restrictions.

**How to get it:**
1. Visit [Kaggle WELFake Dataset](https://www.kaggle.com/datasets/saurabhshahane/fake-news-classification)
2. Download the dataset
3. Extract `WELFake_Dataset.csv`
4. Place in `Backened/` folder

**Alternative datasets:**
Any CSV with these columns works:
- `title` - News article title
- `text` - News article content
- `label` - 0 (real) or 1 (fake)

### 3. 🧠 spaCy Language Model

**Model:** `en_core_web_sm`

**Why missing?** Large download (40MB+) installed separately.

**How to install:**
```bash
python -m spacy download en_core_web_sm
```

**What it does:**
- Named entity recognition
- Part-of-speech tagging
- Linguistic analysis

**Without it:** Linguistic features will be limited but analysis still works.

### 4. 📚 NLTK Data

**Data:** Vader lexicon, stopwords

**Why missing?** Downloaded on first run or manually.

**How to install:**
```bash
python -c "import nltk; nltk.download('vader_lexicon'); nltk.download('stopwords')"
```

**What it does:**
- Sentiment analysis
- Text preprocessing

### 5. 🔑 API Keys (Critical)

**File:** `.env` (already created with your key)

**Current status:** ✅ Already configured
```
GEMINI_API_KEY=AIzaSyB5WEzIFDW3Y0fa1qSkG5WIXnt2xpt6mlk
```

**⚠️ Security Warning:**
- Never commit this file to public repositories
- Rotate keys if exposed
- Monitor usage at [Google AI Studio](https://makersuite.google.com/)

**Optional API keys** (for enhanced evidence gathering):
```bash
# Add to .env file
TWITTER_API_KEY=your_twitter_key
REDDIT_CLIENT_ID=your_reddit_id
REDDIT_CLIENT_SECRET=your_reddit_secret
```

## 🚀 Quick Start Without Optional Dependencies

You can run the application **immediately** without:
- ❌ ML model files
- ❌ Dataset
- ❌ Optional API keys

**What you MUST have:**
- ✅ Python packages (from requirements.txt)
- ✅ Gemini API key (already configured)
- ✅ spaCy model (auto-installed by run_server.py)
- ✅ NLTK data (auto-downloaded)

## 📊 Feature Availability Matrix

| Feature | Without ML Models | With ML Models |
|---------|------------------|----------------|
| LLM Analysis | ✅ Full | ✅ Full |
| Sentiment Analysis | ✅ Full | ✅ Full |
| Linguistic Patterns | ✅ Full | ✅ Full |
| ML Predictions | ⚠️ Returns "UNCERTAIN" | ✅ Full |
| Confidence Scores | ✅ LLM-based only | ✅ Combined LLM+ML |
| Evidence Gathering | ✅ Mock data | ✅ Mock data |

## 🔧 Installation Priority

### Must Install (Critical):
1. ✅ Python packages: `pip install -r requirements.txt`
2. ✅ Gemini API key: Already configured in `.env`
3. ✅ spaCy model: `python -m spacy download en_core_web_sm`

### Should Install (Recommended):
4. 📊 Train ML models: Download dataset + run `modeltrain.py`

### Optional (Enhanced Features):
5. 🔑 Additional API keys for evidence gathering

## 🐛 Common Issues

### "Models not found" Warning
```
⚠️ Pre-trained models not found. Run modeltrain.py first.
```
**Solution:** Either train models or ignore (API still works with LLM)

### "Dataset not found" Error
```
❌ Dataset not found: WELFake_Dataset.csv
```
**Solution:** Download dataset from Kaggle or use API without ML models

### "spaCy model not found" Error
```
OSError: [E050] Can't find model 'en_core_web_sm'
```
**Solution:** `python -m spacy download en_core_web_sm`

### Gemini API Errors
```
ValueError: GEMINI_API_KEY not properly configured
```
**Solution:** Check `.env` file exists and has valid key

## 📝 Summary

**To run with full features:**
```bash
# 1. Install Python packages
pip install -r requirements.txt

# 2. Install spaCy model
python -m spacy download en_core_web_sm

# 3. Download dataset (optional)
# Get WELFake_Dataset.csv from Kaggle

# 4. Train models (optional)
python modeltrain.py

# 5. Start server
python run_server.py
```

**To run with minimal setup:**
```bash
# 1. Install Python packages
pip install -r requirements.txt

# 2. Start server (will auto-install spaCy model)
python run_server.py
```

Both approaches work! The second is faster but uses only LLM analysis.

---

**Need Help?** Check `SETUP_INSTRUCTIONS.md` in the project root.
