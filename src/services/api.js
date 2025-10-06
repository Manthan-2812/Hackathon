// API Service for Fake News Detection Platform

class APIService {
  constructor() {
    // Use environment variable or default to localhost
    this.baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
  }

  /**
   * Analyze text content for fake news
   */
  async analyzeText(text, title = null) {
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
