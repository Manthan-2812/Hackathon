import os
from dotenv import load_dotenv

load_dotenv()

# API Configuration
API_HOST = "0.0.0.0"
API_PORT = 8000
DEBUG = True

# Google Gemini Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Model Configuration
MODEL_PATH = "rf_model.pkl"
VECTORIZER_PATH = "tfidf_vectorizer.pkl"

# CORS Configuration
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001"
]

# Analysis Configuration
MIN_CONFIDENCE_THRESHOLD = 0.6
MAX_TEXT_LENGTH = 10000
MAX_IMAGE_SIZE = 10 * 1024 * 1024  # 10MB

# External APIs (for evidence gathering)
TWITTER_API_KEY = os.getenv("TWITTER_API_KEY", "")
REDDIT_CLIENT_ID = os.getenv("REDDIT_CLIENT_ID", "")
REDDIT_CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET", "")

# Database Configuration (if needed)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./fakenews.db")
