// API Service for Fake News Detection Platform

class APIService {
  constructor() {
    // Determine the correct API base URL
    if (window.location.hostname.includes('vercel.app')) {
      // Production Vercel deployment
      this.baseURL = `${window.location.origin}/api`;
    } else if (process.env.REACT_APP_BACKEND_URL) {
      // Custom backend URL
      this.baseURL = process.env.REACT_APP_BACKEND_URL;
    } else {
      // Local development
      this.baseURL = 'http://localhost:8000';
    }
    
    // Check if we're using mock data
    this.useMockData = window.location.hostname.includes('github.io');
  }

  /**
   * Generate mock analysis for GitHub Pages
   */
  generateMockAnalysis(text, title = null, type = 'text') {
    const content = (text + " " + (title || "")).toLowerCase();
    
    // Enhanced fake news detection for demo
    const fakeIndicators = [
      "breaking:", "urgent:", "shocking", "unbelievable", "free iphone", "free phone",
      "government giving", "all students will receive", "register your name", "viral message",
      "whatsapp", "fraudulent websites", "no such scheme exists", "officials confirmed",
      "conspiracy", "secret", "cover-up", "scientists hate this", "doctors don't want you to know"
    ];
    
    const realIndicators = [
      "according to", "study shows", "research indicates", "data suggests",
      "experts say", "published in", "peer-reviewed", "university", "institute"
    ];
    
    const fakeCount = fakeIndicators.filter(indicator => content.includes(indicator)).length;
    const realCount = realIndicators.filter(indicator => content.includes(indicator)).length;
    
    let verdict, confidence;
    if (fakeCount >= 2) {
      verdict = "FAKE";
      confidence = Math.min(95, 85 + fakeCount * 3);
    } else if (fakeCount > realCount) {
      verdict = "FAKE";
      confidence = Math.min(90, 75 + (fakeCount - realCount) * 5);
    } else if (realCount > fakeCount) {
      verdict = "REAL";
      confidence = Math.min(90, 75 + (realCount - fakeCount) * 5);
    } else {
      verdict = "REAL";
      confidence = 78;
    }
    
    return {
      verdict,
      confidence: confidence / 100,
      analysis: {
        factual_indicators: {
          claims_verifiable: realCount > 0,
          specific_dates: /\d{4}|\d{1,2}\/\d{1,2}/.test(text),
          named_sources: realCount > fakeCount,
          quotes_attributed: text.includes('"') && realCount > 0
        },
        sentiment_analysis: {
          sentiment: { compound: 0.1, pos: 0.3, neu: 0.6, neg: 0.1 }
        },
        extracted_text: type === 'image' ? text : undefined
      },
      factors: [
        `Demo Mode: Enhanced pattern analysis completed`,
        `Found ${fakeCount} suspicious indicators, ${realCount} credible indicators`,
        fakeCount >= 2 ? "Multiple scam/hoax patterns detected" : "Standard content analysis"
      ],
      recommendations: [
        "Cross-reference with multiple reliable sources",
        "Check author credentials and publication date",
        `Analysis suggests: ${verdict} (Demo Mode)`
      ],
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Analyze text content for fake news
   */
  async analyzeText(text, title = null) {
    // Use mock data for GitHub Pages only
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      return this.generateMockAnalysis(text, title, 'text');
    }
    
    try {
      const response = await fetch(`${this.baseURL}/analyze/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, title }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Analysis failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Text analysis error:', error);
      throw error;
    }
  }

  /**
   * Analyze URL content for fake news
   */
  async analyzeUrl(url) {
    try {
      const response = await fetch(`${this.baseURL}/analyze/url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'URL analysis failed');
      }

      return await response.json();
    } catch (error) {
      console.error('URL analysis error:', error);
      throw error;
    }
  }

  /**
   * Analyze image content using OCR
   */
  async analyzeImage(imageData) {
    try {
      const response = await fetch(`${this.baseURL}/analyze/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_data: imageData }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Image analysis failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Image analysis error:', error);
      throw error;
    }
  }

  /**
   * Check API health status
   */
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000), // 3 second timeout
      });
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'unavailable', error: error.message };
    }
  }
  /**
   * Get evidence for a query
   */
  async getEvidence(query) {
    try {
      const response = await fetch(`${this.baseURL}/evidence/${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch evidence');
      }

      return await response.json();
    } catch (error) {
      console.error('Evidence fetch error:', error);
      throw error;
    }
  }
}

const apiService = new APIService();
export default apiService;
