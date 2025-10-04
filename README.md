# Fake News Detection Platform

A comprehensive fake news detection platform with LLM integration, multi-input support, and real-time analysis capabilities.

## 🚀 Features

### Multi-Input Support
- **Text Analysis**: Analyze news articles via title & body text
- **URL Analysis**: Extract and analyze content from article URLs
- **Image Analysis**: OCR-extracted text analysis from images

### Advanced Detection
- **LLM Integration**: OpenAI GPT-powered analysis for nuanced detection
- **Traditional ML**: Random Forest classifier for baseline detection
- **Sentiment Analysis**: NLTK-based emotional and bias detection
- **Linguistic Analysis**: spaCy-powered text pattern analysis

### Evidence Integration
- **External Sources**: Integration with Twitter/X, Reddit, and fact-checking sites
- **Cross-Reference**: Multi-source verification and validation
- **Source Credibility**: Domain reputation and authority analysis

### Interactive Dashboard
- **Real-time Analysis**: Live detection with confidence scores
- **Visual Indicators**: Highlight suspicious text and image cues
- **Analysis Trends**: Historical data and pattern visualization
- **User Feedback**: Interactive feedback and exploration tools

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd Backened
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Install spaCy English model**:
   ```bash
   python -m spacy download en_core_web_sm
   ```

4. **Install Tesseract OCR** (for image analysis):
   - **Windows**: Download from [GitHub releases](https://github.com/UB-Mannheim/tesseract/wiki)
   - **macOS**: `brew install tesseract`
   - **Linux**: `sudo apt-get install tesseract-ocr`

5. **Set up environment variables**:
   ```bash
   # Create .env file
   echo "GEMINI_API_KEY=your-gemini-api-key-here" > .env
   echo "DEBUG=True" >> .env
   ```
   
   **Get your FREE Gemini API key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)

6. **Train the ML models** (optional - will auto-train if models don't exist):
   ```bash
   python modeltrain.py
   ```

7. **Start the backend server**:
   ```bash
   python run_server.py
   ```

   The API will be available at `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`
   - Health Check: `http://localhost:8000/health`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd Frontened/Hackathon-main/Hackathon-main
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

## 📊 API Endpoints

### Text Analysis
```http
POST /analyze/text
Content-Type: application/json

{
  "text": "Your news article text here",
  "title": "Optional title"
}
```

### URL Analysis
```http
POST /analyze/url
Content-Type: application/json

{
  "url": "https://example.com/news-article"
}
```

### Image Analysis
```http
POST /analyze/image
Content-Type: application/json

{
  "image_data": "base64-encoded-image-data"
}
```

### Evidence Gathering
```http
GET /evidence/{query}
```

## 🔧 Configuration

### Environment Variables
- `GEMINI_API_KEY`: Your Google Gemini API key for LLM analysis (FREE!)
- `DEBUG`: Enable debug mode (True/False)
- `TWITTER_API_KEY`: Twitter API key for evidence gathering
- `REDDIT_CLIENT_ID`: Reddit API client ID
- `REDDIT_CLIENT_SECRET`: Reddit API client secret

### Model Configuration
- Models are automatically saved as `rf_model.pkl` and `tfidf_vectorizer.pkl`
- Retrain models by running `python modeltrain.py`
- Models use the WELFake dataset for training

## 🎯 Usage

### Text Analysis
1. Navigate to the Dashboard
2. Select "Text Analysis" tab
3. Paste your news content
4. Click "Analyze Text"
5. View results with confidence scores and detailed breakdown

### URL Analysis
1. Select "URL Analysis" tab
2. Enter a news article URL
3. Click "Analyze URL"
4. Review extracted content and analysis

### Image Analysis
1. Select "Image Analysis" tab
2. Upload an image with text
3. Click "Analyze Image"
4. View OCR-extracted text and analysis

## 📈 Analysis Features

### Detection Metrics
- **Verdict**: REAL / FAKE / UNCERTAIN
- **Confidence Score**: 0-100% confidence level
- **Factual Accuracy**: Claims verification score
- **Source Credibility**: Author and source authority
- **Sentiment Bias**: Emotional language analysis
- **Linguistic Patterns**: Text structure analysis

### Evidence Integration
- **Twitter Mentions**: Social media sentiment
- **Reddit Discussions**: Community discussions
- **Fact-Check Sites**: Snopes, PolitiFact, FactCheck.org
- **News Sources**: Mainstream coverage analysis

## 🏗️ Architecture

### Backend (FastAPI)
- **API Layer**: FastAPI with automatic documentation
- **ML Layer**: scikit-learn Random Forest classifier
- **LLM Layer**: OpenAI GPT integration
- **Analysis Layer**: NLTK, spaCy, sentiment analysis
- **OCR Layer**: Tesseract for image text extraction

### Frontend (React)
- **Dashboard**: Interactive analysis interface
- **Components**: Modular UI components
- **API Integration**: Real-time backend communication
- **Responsive Design**: Mobile and desktop support

## 🔍 Troubleshooting

### Common Issues

1. **Models not found**:
   ```bash
   python modeltrain.py
   ```

2. **spaCy model missing**:
   ```bash
   python -m spacy download en_core_web_sm
   ```

3. **Tesseract not found**:
   - Install Tesseract OCR
   - Add to system PATH

4. **Gemini API errors**:
   - Check API key in .env file
   - Verify API key validity at [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Check rate limits (15 requests/minute, 1M tokens/day)

5. **CORS errors**:
   - Ensure backend is running on port 8000
   - Check CORS configuration in app.py

### Performance Optimization

1. **Model Caching**: Models are loaded once at startup
2. **Async Processing**: Non-blocking API calls
3. **Error Handling**: Graceful fallbacks for API failures
4. **Rate Limiting**: Built-in request throttling

## 📝 Development

### Adding New Features
1. **Backend**: Add new endpoints in `app.py`
2. **Frontend**: Create new components in `src/components/`
3. **Models**: Extend analysis functions in `app.py`

### Testing
```bash
# Backend tests
cd Backened
python -m pytest

# Frontend tests
cd Frontened/Hackathon-main/Hackathon-main
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- WELFake dataset for training data
- OpenAI for LLM capabilities
- spaCy and NLTK for NLP processing
- FastAPI and React for the platform framework
