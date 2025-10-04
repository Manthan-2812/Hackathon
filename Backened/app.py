from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import requests
import json
import re
import os
from typing import Optional, List, Dict, Any
from pydantic import BaseModel
import base64
from PIL import Image
import io
import pytesseract
from datetime import datetime
import google.generativeai as genai
from transformers import pipeline
import torch
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from nltk.corpus import stopwords
import spacy

# Download required NLTK data
try:
    nltk.download('vader_lexicon', quiet=True)
    nltk.download('stopwords', quiet=True)
except:
    pass

app = FastAPI(title="Fake News Detection API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for models
sentiment_analyzer = None
nlp = None
rf_model = None
tfidf_vectorizer = None

class TextAnalysisRequest(BaseModel):
    text: str
    title: Optional[str] = None

class URLAnalysisRequest(BaseModel):
    url: str

class ImageAnalysisRequest(BaseModel):
    image_data: str  # base64 encoded image

class AnalysisResponse(BaseModel):
    verdict: str  # "REAL", "FAKE", "UNCERTAIN"
    confidence: float
    analysis: Dict[str, Any]
    factors: List[str]
    recommendations: List[str]
    evidence: Optional[Dict[str, Any]] = None
    timestamp: str

# Initialize models
def initialize_models():
    global sentiment_analyzer, nlp, rf_model, tfidf_vectorizer
    
    try:
        # Initialize sentiment analyzer
        sentiment_analyzer = SentimentIntensityAnalyzer()
        
        # Load spaCy model
        try:
            nlp = spacy.load("en_core_web_sm")
        except OSError:
            print("spaCy model not found. Install with: python -m spacy download en_core_web_sm")
            nlp = None
        
        # Load pre-trained models
        try:
            with open("rf_model.pkl", "rb") as f:
                rf_model = pickle.load(f)
            with open("tfidf_vectorizer.pkl", "rb") as f:
                tfidf_vectorizer = pickle.load(f)
            print("✅ Pre-trained models loaded successfully")
        except FileNotFoundError:
            print("⚠️ Pre-trained models not found. Run modeltrain.py first.")
            rf_model = None
            tfidf_vectorizer = None
            
    except Exception as e:
        print(f"Error initializing models: {e}")

# LLM-based analysis using Google Gemini
def analyze_with_llm(text: str, title: str = None) -> Dict[str, Any]:
    """
    Use Google Gemini to analyze text for fake news indicators
    """
    try:
        # Configure Gemini API
        api_key = os.getenv("GEMINI_API_KEY", "AIzaSyBBndYY7C97GtA1OzVgqyub9mcp_S9Zh5U")
        genai.configure(api_key=api_key)
        
        # Initialize the model
        model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"""
        Analyze the following news content for fake news indicators. Provide a detailed analysis in JSON format.

        Title: {title or "No title provided"}
        Content: {text}

        Please analyze and return a JSON response with the following structure:
        {{
            "verdict": "REAL/FAKE/UNCERTAIN",
            "confidence": 0.85,
            "factual_indicators": {{
                "claims_verifiable": true,
                "specific_dates": true,
                "named_sources": true,
                "quotes_attributed": true
            }},
            "linguistic_indicators": {{
                "emotional_language": 0.3,
                "exaggeration": 0.2,
                "bias_indicators": 0.4,
                "clickbait_elements": 0.1
            }},
            "source_indicators": {{
                "authority_claims": 0.2,
                "conspiracy_theory_language": 0.1,
                "unverified_claims": 0.3
            }},
            "key_factors": [
                "List of key factors influencing the decision"
            ],
            "recommendations": [
                "List of recommendations for verification"
            ]
        }}
        """
        
        # Generate content using Gemini
        response = model.generate_content(prompt)
        
        # Extract JSON from response
        response_text = response.text
        
        # Try to extract JSON from the response
        try:
            # Look for JSON in the response
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            if json_start != -1 and json_end != 0:
                json_str = response_text[json_start:json_end]
                result = json.loads(json_str)
            else:
                # Fallback if no JSON found
                result = {
                    "verdict": "UNCERTAIN",
                    "confidence": 0.5,
                    "factual_indicators": {"claims_verifiable": False, "specific_dates": False, "named_sources": False, "quotes_attributed": False},
                    "linguistic_indicators": {"emotional_language": 0.5, "exaggeration": 0.5, "bias_indicators": 0.5, "clickbait_elements": 0.5},
                    "source_indicators": {"authority_claims": 0.5, "conspiracy_theory_language": 0.5, "unverified_claims": 0.5},
                    "key_factors": ["Analysis completed but JSON parsing failed"],
                    "recommendations": ["Please verify with additional sources"]
                }
        except json.JSONDecodeError:
            # Fallback if JSON parsing fails
            result = {
                "verdict": "UNCERTAIN",
                "confidence": 0.5,
                "factual_indicators": {"claims_verifiable": False, "specific_dates": False, "named_sources": False, "quotes_attributed": False},
                "linguistic_indicators": {"emotional_language": 0.5, "exaggeration": 0.5, "bias_indicators": 0.5, "clickbait_elements": 0.5},
                "source_indicators": {"authority_claims": 0.5, "conspiracy_theory_language": 0.5, "unverified_claims": 0.5},
                "key_factors": ["Analysis completed but response format unexpected"],
                "recommendations": ["Please verify with additional sources"]
            }
        
        return result
        
    except Exception as e:
        print(f"Gemini LLM analysis error: {e}")
        return {
            "verdict": "UNCERTAIN",
            "confidence": 0.5,
            "factual_indicators": {"claims_verifiable": False, "specific_dates": False, "named_sources": False, "quotes_attributed": False},
            "linguistic_indicators": {"emotional_language": 0.5, "exaggeration": 0.5, "bias_indicators": 0.5, "clickbait_elements": 0.5},
            "source_indicators": {"authority_claims": 0.5, "conspiracy_theory_language": 0.5, "unverified_claims": 0.5},
            "key_factors": ["Analysis unavailable due to API error"],
            "recommendations": ["Please try again or use alternative verification methods"]
        }

# Traditional ML analysis
def analyze_with_ml(text: str) -> Dict[str, Any]:
    """
    Use traditional ML models for analysis
    """
    if rf_model is None or tfidf_vectorizer is None:
        return {
            "verdict": "UNCERTAIN",
            "confidence": 0.5,
            "ml_analysis": "Models not available"
        }
    
    try:
        # Clean text
        def clean_text(text):
            text = str(text).lower()
            text = re.sub(r"http\S+|www\S+", " ", text)
            text = re.sub(r"[^a-z\s]", " ", text)
            text = re.sub(r"\s+", " ", text).strip()
            return text
        
        cleaned_text = clean_text(text)
        text_tfidf = tfidf_vectorizer.transform([cleaned_text])
        prediction = rf_model.predict(text_tfidf)[0]
        confidence = max(rf_model.predict_proba(text_tfidf)[0])
        
        return {
            "verdict": "FAKE" if prediction == 1 else "REAL",
            "confidence": float(confidence),
            "ml_analysis": "Random Forest prediction"
        }
    except Exception as e:
        print(f"ML analysis error: {e}")
        return {
            "verdict": "UNCERTAIN",
            "confidence": 0.5,
            "ml_analysis": f"Error: {str(e)}"
        }

# Sentiment and linguistic analysis
def analyze_sentiment_and_linguistics(text: str) -> Dict[str, Any]:
    """
    Analyze sentiment and linguistic patterns
    """
    try:
        # Sentiment analysis
        sentiment_scores = sentiment_analyzer.polarity_scores(text)
        
        # Linguistic analysis with spaCy
        linguistic_features = {}
        if nlp:
            doc = nlp(text)
            linguistic_features = {
                "sentence_count": len(list(doc.sents)),
                "word_count": len([token for token in doc if not token.is_space]),
                "avg_word_length": np.mean([len(token.text) for token in doc if not token.is_space]),
                "named_entities": len(list(doc.ents)),
                "pos_tags": {tag: count for tag, count in doc.count_by(spacy.attrs.POS).items()}
            }
        
        # Detect emotional language patterns
        emotional_words = ['amazing', 'shocking', 'incredible', 'unbelievable', 'outrageous', 'devastating']
        emotional_count = sum(1 for word in emotional_words if word in text.lower())
        
        # Detect clickbait patterns
        clickbait_patterns = [
            r'you won\'t believe',
            r'shocking truth',
            r'doctors hate',
            r'this one trick',
            r'what happens next'
        ]
        clickbait_score = sum(1 for pattern in clickbait_patterns if re.search(pattern, text.lower()))
        
        return {
            "sentiment": sentiment_scores,
            "linguistic_features": linguistic_features,
            "emotional_language": emotional_count,
            "clickbait_score": clickbait_score
        }
    except Exception as e:
        print(f"Sentiment analysis error: {e}")
        return {
            "sentiment": {"compound": 0, "pos": 0, "neu": 1, "neg": 0},
            "linguistic_features": {},
            "emotional_language": 0,
            "clickbait_score": 0
        }

# Evidence gathering from external sources
def gather_evidence(text: str, title: str = None) -> Dict[str, Any]:
    """
    Gather evidence from external sources (simplified implementation)
    """
    try:
        # This is a simplified implementation
        # In a real system, you would integrate with Twitter API, Reddit API, etc.
        
        # Extract key terms for search
        search_terms = []
        if title:
            search_terms.extend(title.split()[:3])
        
        # Extract key phrases from text
        words = text.split()
        search_terms.extend([word for word in words if len(word) > 5][:5])
        
        # Mock evidence data
        evidence = {
            "twitter_mentions": {
                "count": np.random.randint(0, 50),
                "sentiment": "mixed",
                "top_tweets": [
                    "This seems suspicious...",
                    "Need to verify this claim",
                    "Source credibility questionable"
                ]
            },
            "reddit_discussions": {
                "count": np.random.randint(0, 20),
                "subreddits": ["r/news", "r/politics", "r/conspiracy"],
                "sentiment": "skeptical"
            },
            "fact_check_sites": {
                "snopes": "No recent fact-check found",
                "politifact": "Under review",
                "factcheck_org": "Not yet analyzed"
            },
            "news_sources": {
                "mainstream_coverage": np.random.choice(["Limited", "Extensive", "None"]),
                "source_diversity": np.random.randint(1, 10)
            }
        }
        
        return evidence
    except Exception as e:
        print(f"Evidence gathering error: {e}")
        return {"error": "Evidence gathering unavailable"}

# OCR for image analysis
def extract_text_from_image(image_data: str) -> str:
    """
    Extract text from image using OCR
    """
    try:
        # Decode base64 image
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Extract text using Tesseract
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        print(f"OCR error: {e}")
        return ""

# Main analysis function
def comprehensive_analysis(text: str, title: str = None, source_type: str = "text") -> AnalysisResponse:
    """
    Perform comprehensive fake news analysis
    """
    try:
        # LLM Analysis
        llm_result = analyze_with_llm(text, title)
        
        # Traditional ML Analysis
        ml_result = analyze_with_ml(text)
        
        # Sentiment and Linguistic Analysis
        sentiment_result = analyze_sentiment_and_linguistics(text)
        
        # Evidence Gathering
        evidence = gather_evidence(text, title)
        
        # Combine results
        verdicts = [llm_result["verdict"], ml_result["verdict"]]
        confidences = [llm_result["confidence"], ml_result["confidence"]]
        
        # Determine final verdict
        if "FAKE" in verdicts and llm_result["confidence"] > 0.7:
            final_verdict = "FAKE"
        elif "REAL" in verdicts and llm_result["confidence"] > 0.7:
            final_verdict = "REAL"
        else:
            final_verdict = "UNCERTAIN"
        
        # Calculate weighted confidence
        final_confidence = (llm_result["confidence"] * 0.7 + ml_result["confidence"] * 0.3)
        
        # Prepare analysis breakdown
        analysis = {
            "llm_analysis": llm_result,
            "ml_analysis": ml_result,
            "sentiment_analysis": sentiment_result,
            "source_type": source_type,
            "text_length": len(text),
            "word_count": len(text.split())
        }
        
        # Prepare factors and recommendations
        factors = llm_result.get("key_factors", [])
        recommendations = llm_result.get("recommendations", [])
        
        return AnalysisResponse(
            verdict=final_verdict,
            confidence=round(final_confidence, 2),
            analysis=analysis,
            factors=factors,
            recommendations=recommendations,
            evidence=evidence,
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        print(f"Analysis error: {e}")
        return AnalysisResponse(
            verdict="UNCERTAIN",
            confidence=0.5,
            analysis={"error": str(e)},
            factors=["Analysis failed due to error"],
            recommendations=["Please try again"],
            timestamp=datetime.now().isoformat()
        )

# API Endpoints
@app.on_event("startup")
async def startup_event():
    initialize_models()

@app.get("/")
async def root():
    return {"message": "Fake News Detection API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "models_loaded": rf_model is not None}

@app.post("/analyze/text", response_model=AnalysisResponse)
async def analyze_text(request: TextAnalysisRequest):
    """
    Analyze text content for fake news
    """
    try:
        result = comprehensive_analysis(request.text, request.title, "text")
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/url", response_model=AnalysisResponse)
async def analyze_url(request: URLAnalysisRequest):
    """
    Analyze content from URL
    """
    try:
        # Fetch content from URL
        response = requests.get(request.url, timeout=10)
        response.raise_for_status()
        
        # Extract text from HTML (simplified)
        text = response.text
        # Remove HTML tags
        text = re.sub(r'<[^>]+>', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()
        
        # Extract title from HTML
        title_match = re.search(r'<title>(.*?)</title>', response.text, re.IGNORECASE)
        title = title_match.group(1) if title_match else None
        
        result = comprehensive_analysis(text, title, "url")
        result.analysis["url"] = request.url
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"URL analysis failed: {str(e)}")

@app.post("/analyze/image", response_model=AnalysisResponse)
async def analyze_image(request: ImageAnalysisRequest):
    """
    Analyze image content using OCR
    """
    try:
        # Extract text from image
        extracted_text = extract_text_from_image(request.image_data)
        
        if not extracted_text:
            raise HTTPException(status_code=400, detail="No text found in image")
        
        result = comprehensive_analysis(extracted_text, None, "image")
        result.analysis["extracted_text"] = extracted_text
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image analysis failed: {str(e)}")

@app.get("/evidence/{query}")
async def get_evidence(query: str):
    """
    Get evidence for a specific query
    """
    try:
        evidence = gather_evidence(query)
        return evidence
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
