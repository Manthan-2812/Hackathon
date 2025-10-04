#!/usr/bin/env python3
"""
Fake News Detection API Server Startup Script
"""

import os
import sys
import subprocess
import uvicorn
from pathlib import Path

def check_requirements():
    """Check if all required packages are installed"""
    try:
        import fastapi
        import uvicorn
        import pandas
        import sklearn
        import nltk
        import spacy
        import google.generativeai as genai
        import transformers
        import torch
        import PIL
        import pytesseract
        print("✅ All required packages are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing required package: {e}")
        print("Please install requirements: pip install -r requirements.txt")
        return False

def check_models():
    """Check if trained models exist"""
    model_path = Path("rf_model.pkl")
    vectorizer_path = Path("tfidf_vectorizer.pkl")
    
    if not model_path.exists() or not vectorizer_path.exists():
        print("⚠️  Trained models not found. Training models...")
        try:
            subprocess.run([sys.executable, "modeltrain.py"], check=True)
            print("✅ Models trained successfully")
        except subprocess.CalledProcessError as e:
            print(f"❌ Model training failed: {e}")
            return False
    else:
        print("✅ Trained models found")
    
    return True

def check_spacy_model():
    """Check if spaCy English model is installed"""
    try:
        import spacy
        nlp = spacy.load("en_core_web_sm")
        print("✅ spaCy English model found")
        return True
    except OSError:
        print("⚠️  spaCy English model not found. Installing...")
        try:
            subprocess.run([sys.executable, "-m", "spacy", "download", "en_core_web_sm"], check=True)
            print("✅ spaCy English model installed")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to install spaCy model. Some features may not work.")
            return False

def setup_environment():
    """Setup environment variables"""
    if not os.getenv("GEMINI_API_KEY"):
        print("⚠️  GEMINI_API_KEY not set. LLM features will be limited.")
        print("Get your free Gemini API key from: https://makersuite.google.com/app/apikey")
        print("Set your Gemini API key: export GEMINI_API_KEY='AIzaSyB5WEzIFDW3Y0fa1qSkG5WIXnt2xpt6mlk'")
    
    # Create .env file if it doesn't exist
    env_file = Path(".env")
    if not env_file.exists():
        with open(env_file, "w") as f:
            f.write("# Fake News Detection API Configuration\n")
            f.write("GEMINI_API_KEY=AIzaSyBBndYY7C97GtA1OzVgqyub9mcp_S9Zh5U\n")
            f.write("DEBUG=True\n")
        print("✅ Created .env file template")

def main():
    """Main startup function"""
    print("🚀 Starting Fake News Detection API Server")
    print("=" * 50)
    
    # Check requirements
    if not check_requirements():
        sys.exit(1)
    
    # Setup environment
    setup_environment()
    
    # Check spaCy model
    check_spacy_model()
    
    # Check models
    if not check_models():
        print("❌ Failed to prepare models. Exiting.")
        sys.exit(1)
    
    print("\n🌐 Starting API server...")
    print("API will be available at: http://localhost:8000")
    print("API documentation: http://localhost:8000/docs")
    print("Press Ctrl+C to stop the server")
    print("-" * 50)
    
    # Start the server
    try:
        uvicorn.run(
            "app:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
