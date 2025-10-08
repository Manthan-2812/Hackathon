from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import re
from datetime import datetime

# Pydantic models
class TextAnalysisRequest(BaseModel):
    text: str
    title: Optional[str] = None

class AnalysisResponse(BaseModel):
    verdict: str
    confidence: float
    analysis: Dict[str, Any]
    factors: List[str]
    recommendations: List[str]
    timestamp: str

app = FastAPI(title="Fake News Detection API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

def analyze_with_patterns(text: str, title: str = None) -> Dict[str, Any]:
    """Enhanced pattern-based analysis"""
    try:
        content = (text + " " + (title or "")).lower()
        
        fake_indicators = [
            "breaking:", "urgent:", "shocking", "unbelievable", "free iphone", "free phone",
            "government giving", "all students will receive", "register your name", "viral message",
            "whatsapp", "fraudulent websites", "no such scheme exists", "officials confirmed",
            "conspiracy", "secret", "cover-up", "scientists hate this"
        ]
        
        real_indicators = [
            "according to", "study shows", "research indicates", "data suggests",
            "experts say", "published in", "peer-reviewed", "university", "institute"
        ]
        
        fake_count = sum(1 for indicator in fake_indicators if indicator in content)
        real_count = sum(1 for indicator in real_indicators if indicator in content)
        
        if fake_count >= 2:
            verdict = "FAKE"
            confidence = min(0.95, 0.85 + fake_count * 0.05)
        elif fake_count > real_count:
            verdict = "FAKE"
            confidence = min(0.95, 0.75 + (fake_count - real_count) * 0.1)
        elif real_count > fake_count:
            verdict = "REAL" 
            confidence = min(0.95, 0.75 + (real_count - fake_count) * 0.1)
        else:
            verdict = "REAL"
            confidence = 0.75
        
        return {
            "verdict": verdict,
            "confidence": confidence,
            "key_factors": [
                f"Enhanced pattern analysis completed",
                f"Found {fake_count} suspicious indicators, {real_count} credible indicators"
            ],
            "recommendations": [
                "Cross-reference with multiple reliable sources",
                f"Analysis suggests: {verdict}"
            ]
        }
    except Exception as e:
        return {
            "verdict": "REAL",
            "confidence": 0.5,
            "key_factors": [f"Analysis error: {str(e)}"],
            "recommendations": ["Try again"]
        }

@app.get("/")
async def root():
    return {"message": "Fake News Detection API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "platform": "Vercel"}

@app.post("/analyze/text", response_model=AnalysisResponse)
async def analyze_text(request: TextAnalysisRequest):
    try:
        if not request.text or len(request.text.strip()) < 10:
            raise HTTPException(status_code=400, detail="Text must be at least 10 characters long")
        
        result = analyze_with_patterns(request.text.strip(), request.title)
        
        return AnalysisResponse(
            verdict=result["verdict"],
            confidence=result["confidence"],
            analysis={"source_type": "text"},
            factors=result["key_factors"],
            recommendations=result["recommendations"],
            timestamp=datetime.now().isoformat()
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Analysis failed")

# For Vercel
from mangum import Mangum
handler = Mangum(app)
