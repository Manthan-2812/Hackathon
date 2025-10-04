# Fake News Detection API Backend

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd Backened
pip install -r requirements.txt
```

### 2. Setup Environment
```bash
# Copy the environment template
copy env_template.txt .env

# Edit .env file and add your Gemini API key
# Get free API key: https://makersuite.google.com/app/apikey
```

### 3. Download Training Data
```bash
# Download WELFake_Dataset.csv from:
# https://www.kaggle.com/datasets/saurabhshahane/fake-news-classification

# Place the file in the Backened folder
```

### 4. Train Models
```bash
python modeltrain.py
```

### 5. Start Server
```bash
python run_server.py
```

## 🔧 API Endpoints

- **Health Check**: `GET /health`
- **Text Analysis**: `POST /analyze/text`
- **URL Analysis**: `POST /analyze/url`
- **Image Analysis**: `POST /analyze/image`
- **Evidence Gathering**: `GET /evidence/{query}`

## 📊 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔑 Required API Keys

### Google Gemini API
1. Visit: https://makersuite.google.com/app/apikey
2. Create a free API key
3. Add to `.env` file: `GEMINI_API_KEY=your-key-here`

## 🐛 Troubleshooting

### Common Issues:

1. **"Module not found" errors**:
   ```bash
   pip install -r requirements.txt --force-reinstall
   ```

2. **"spaCy model not found"**:
   ```bash
   python -m spacy download en_core_web_sm
   ```

3. **"Models not found"**:
   ```bash
   python modeltrain.py
   ```

4. **API key errors**:
   - Check `.env` file exists
   - Verify API key is correct
   - Restart server after adding key

## 📁 File Structure

```
Backened/
├── app.py              # Main FastAPI application
├── config.py           # Configuration settings
├── modeltrain.py       # Model training script
├── run_server.py       # Server startup script
├── requirements.txt    # Python dependencies
├── .env               # Environment variables (create from template)
├── rf_model.pkl       # Trained Random Forest model (generated)
├── tfidf_vectorizer.pkl # TF-IDF vectorizer (generated)
└── WELFake_Dataset.csv # Training dataset (download required)
```

## 🎯 Features

- **Multi-Agent Analysis**: Combines LLM, ML, and linguistic analysis
- **Text Processing**: TF-IDF vectorization with Random Forest
- **Sentiment Analysis**: NLTK-based sentiment scoring
- **Linguistic Analysis**: spaCy-based text processing
- **Evidence Gathering**: External source verification
- **Image OCR**: Text extraction from images
- **URL Processing**: Content extraction from web pages

## 🔒 Security

- API keys stored in environment variables
- Input validation on all endpoints
- Rate limiting (configured in production)
- CORS protection for frontend integration

## 📈 Performance

- **Response Time**: ~2-5 seconds per analysis
- **Throughput**: ~10-15 requests per minute (Gemini API limit)
- **Accuracy**: ~85-90% on WELFake dataset
- **Memory Usage**: ~2-4GB with all models loaded
