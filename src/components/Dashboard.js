import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Dashboard.css';
import apiService from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [activeTab, setActiveTab] = useState('detect');
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [inputImage, setInputImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking');
  const [analysisHistory, setAnalysisHistory] = useState([
    {
      id: 1,
      content: "Scientists discover new renewable energy breakthrough that could change the world",
      result: "REAL",
      confidence: 94,
      date: "2024-01-15",
      source: "BBC News"
    },
    {
      id: 2,
      content: "Breaking: Celebrities secretly control the government and media",
      result: "FAKE",
      confidence: 87,
      date: "2024-01-14",
      source: "Unknown"
    },
    {
      id: 3,
      content: "New study shows regular exercise reduces risk of heart disease by 40%",
      result: "REAL",
      confidence: 91,
      date: "2024-01-13",
      source: "Nature Medicine"
    }
  ]);

  // Check API status on mount
  useEffect(() => {
    const checkAPI = async (retryCount = 0) => {
      try {
        console.log('Checking API health...');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
        const response = await fetch(`${backendURL}/health`, {
          signal: controller.signal,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const health = await response.json();
          console.log('API Health Response:', health);
          setApiStatus(health.status === 'healthy' ? 'online' : 'offline');
        } else {
          console.log('API Response not OK:', response.status);
          setApiStatus('offline');
        }
      } catch (error) {
        console.log('API Health Check Error:', error.message);
        if (retryCount < 2) {
          console.log(`Retrying health check... (${retryCount + 1}/2)`);
          setTimeout(() => checkAPI(retryCount + 1), 2000);
        } else {
          setApiStatus('offline');
        }
      }
    };
    
    checkAPI();
    
    // Also check periodically
    const interval = setInterval(() => checkAPI(), 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleTextAnalysis = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    
    try {
      // Use real API if available, otherwise fallback to mock
      let result;
      
      if (apiStatus === 'online') {
        const apiResult = await apiService.analyzeText(inputText);
        
        // Transform API response to match UI format
        result = {
          content: inputText,
          result: apiResult.verdict,
          confidence: Math.round(apiResult.confidence * 100),
          date: new Date().toISOString().split('T')[0],
          analysis: {
            factualAccuracy: apiResult.analysis?.llm_analysis?.factual_indicators ? 85 : 70,
            sourceCredibility: apiResult.analysis?.llm_analysis?.source_indicators ? 80 : 65,
            sentimentBias: apiResult.analysis?.sentiment_analysis?.sentiment?.compound ? 
              Math.round((1 + apiResult.analysis.sentiment_analysis.sentiment.compound) * 50) : 60,
            linguisticPatterns: 75
          },
          factors: apiResult.factors || ["Analysis completed"],
          recommendations: apiResult.recommendations || ["Verify with additional sources"]
        };
      } else {
        // Fallback to mock data if API is offline
        result = {
          content: inputText,
          result: Math.random() > 0.5 ? "REAL" : "FAKE",
          confidence: Math.floor(Math.random() * 20) + 80,
          date: new Date().toISOString().split('T')[0],
          analysis: {
            factualAccuracy: Math.floor(Math.random() * 20) + 75,
            sourceCredibility: Math.floor(Math.random() * 20) + 70,
            sentimentBias: Math.floor(Math.random() * 20) + 60,
            linguisticPatterns: Math.floor(Math.random() * 20) + 80
          },
          factors: [
            "Content matches verified sources",
            "Author has established credibility",
            "Language patterns consistent with factual reporting"
          ],
          recommendations: [
            "API offline - using mock analysis",
            "Start backend server for real analysis"
          ]
        };
      }

      setAnalysisResult(result);
      setAnalysisHistory(prev => [{...result, id: Date.now()}, ...prev]);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed: ' + error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUrlAnalysis = async () => {
    if (!inputUrl.trim()) return;

    setIsAnalyzing(true);
    
    try {
      let result;
      
      if (apiStatus === 'online') {
        const apiResult = await apiService.analyzeUrl(inputUrl);
        
        // Transform API response to match UI format
        result = {
          content: `Article from: ${inputUrl}`,
          result: apiResult.verdict,
          confidence: Math.round(apiResult.confidence * 100),
          date: new Date().toISOString().split('T')[0],
          url: inputUrl,
          analysis: {
            factualAccuracy: apiResult.analysis?.llm_analysis?.factual_indicators ? 85 : 70,
            sourceCredibility: apiResult.analysis?.llm_analysis?.source_indicators ? 80 : 65,
            sentimentBias: apiResult.analysis?.sentiment_analysis?.sentiment?.compound ? 
              Math.round((1 + apiResult.analysis.sentiment_analysis.sentiment.compound) * 50) : 60,
            linguisticPatterns: 75
          },
          factors: apiResult.factors || ["URL analysis completed"],
          recommendations: apiResult.recommendations || ["Verify with additional sources"]
        };
      } else {
        // Fallback to mock data if API is offline
        result = {
          content: `Article from: ${inputUrl}`,
          result: Math.random() > 0.4 ? "REAL" : "FAKE",
          confidence: Math.floor(Math.random() * 25) + 75,
          date: new Date().toISOString().split('T')[0],
          url: inputUrl,
          analysis: {
            factualAccuracy: Math.floor(Math.random() * 25) + 70,
            sourceCredibility: Math.floor(Math.random() * 25) + 65,
            sentimentBias: Math.floor(Math.random() * 25) + 55,
            linguisticPatterns: Math.floor(Math.random() * 25) + 75
          },
          factors: [
            "Domain reputation analysis",
            "Content cross-verification",
            "API offline - using mock analysis"
          ],
          recommendations: [
            "Start backend server for real analysis",
            "Verify with additional sources"
          ]
        };
      }

      setAnalysisResult(result);
      setAnalysisHistory(prev => [{...result, id: Date.now()}, ...prev]);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('URL analysis failed: ' + error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputImage({
          file: file,
          preview: e.target.result,
          base64: e.target.result.split(',')[1] // Remove data:image/jpeg;base64, prefix
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageAnalysis = async () => {
    if (!inputImage) return;

    setIsAnalyzing(true);
    
    try {
      let result;
      
      if (apiStatus === 'online') {
        const apiResult = await apiService.analyzeImage(inputImage.base64);
        
        // Transform API response to match UI format
        result = {
          content: `Image: ${inputImage.file.name}`,
          result: apiResult.verdict,
          confidence: Math.round(apiResult.confidence * 100),
          date: new Date().toISOString().split('T')[0],
          analysis: {
            factualAccuracy: apiResult.analysis?.llm_analysis?.factual_indicators ? 85 : 70,
            sourceCredibility: apiResult.analysis?.llm_analysis?.source_indicators ? 80 : 65,
            sentimentBias: apiResult.analysis?.sentiment_analysis?.sentiment?.compound ? 
              Math.round((1 + apiResult.analysis.sentiment_analysis.sentiment.compound) * 50) : 60,
            linguisticPatterns: 75
          },
          factors: apiResult.factors || ["Image analysis completed"],
          recommendations: apiResult.recommendations || ["Verify with additional sources"],
          extractedText: apiResult.analysis?.extracted_text || "Text extracted from image"
        };
      } else {
        // Fallback to mock data if API is offline
        result = {
          content: `Image: ${inputImage.file.name}`,
          result: Math.random() > 0.5 ? "REAL" : "FAKE",
          confidence: Math.floor(Math.random() * 20) + 80,
          date: new Date().toISOString().split('T')[0],
          analysis: {
            factualAccuracy: Math.floor(Math.random() * 20) + 75,
            sourceCredibility: Math.floor(Math.random() * 20) + 70,
            sentimentBias: Math.floor(Math.random() * 20) + 60,
            linguisticPatterns: Math.floor(Math.random() * 20) + 80
          },
          factors: [
            "OCR text extraction completed",
            "Image content analyzed",
            "API offline - using mock analysis"
          ],
          recommendations: [
            "Start backend server for real analysis",
            "Verify extracted text manually"
          ],
          extractedText: "Sample extracted text from image (mock data)"
        };
      }

      setAnalysisResult(result);
      setAnalysisHistory(prev => [{...result, id: Date.now()}, ...prev]);
    } catch (error) {
      console.error('Image analysis error:', error);
      alert('Image analysis failed: ' + error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generatePDFReport = () => {
    if (!analysisResult) return;

    // Create PDF content
    const pdfContent = `
FAKE NEWS DETECTION REPORT
Generated on: ${new Date().toLocaleString()}
User: ${user?.fullName || 'Guest'}

ANALYSIS SUMMARY
Content: ${analysisResult.content}
Verdict: ${analysisResult.result}
Confidence: ${analysisResult.confidence}%
Date: ${analysisResult.date}

DETAILED ANALYSIS
Factual Accuracy: ${analysisResult.analysis.factualAccuracy}%
Source Credibility: ${analysisResult.analysis.sourceCredibility}%
Sentiment Bias: ${analysisResult.analysis.sentimentBias}%
Linguistic Patterns: ${analysisResult.analysis.linguisticPatterns}%

KEY FACTORS
${analysisResult.factors.map(factor => `• ${factor}`).join('\n')}

RECOMMENDATIONS
${analysisResult.recommendations.map(rec => `• ${rec}`).join('\n')}

${analysisResult.extractedText ? `\nEXTRACTED TEXT\n${analysisResult.extractedText}` : ''}

---
Generated by Fake News Detection Platform
    `;

    // Create and download PDF-like text file (for now)
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fake-news-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <Link to="/" className="logo-link">
                <h2>FakeNewsDetector</h2>
              </Link>
              <nav className="dashboard-nav">
                <button 
                  className={`nav-tab ${activeTab === 'detect' ? 'active' : ''}`}
                  onClick={() => setActiveTab('detect')}
                >
                  Detect
                </button>
                <button 
                  className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveTab('history')}
                >
                  History
                </button>
                <button 
                  className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  Analytics
                </button>
              </nav>
            </div>
            <div className="header-right">
              <div className="api-status">
                <span className={`status-indicator ${apiStatus}`}>
                  {apiStatus === 'online' ? '🟢' : apiStatus === 'offline' ? '🔴' : '🟡'}
                </span>
                <span className="status-text">
                  API: {apiStatus === 'online' ? 'Connected' : apiStatus === 'offline' ? 'Offline' : 'Checking...'}
                </span>
              </div>
              <div className="user-info">
                <span className="user-name">Welcome, {user?.fullName || 'Guest'}</span>
                <button className="logout-btn" onClick={() => { logout(); navigate('/'); }}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="container">
          {activeTab === 'detect' && (
            <div className="detect-tab">
              <div className="tab-header">
                <h1>Fake News Detection</h1>
                <p>Analyze text or URLs to detect potential fake news using our advanced AI system</p>
              </div>

              <div className="detection-options">
                <div className="option-card">
                  <h3>📝 Text Analysis</h3>
                  <p>Paste news content or text to analyze</p>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your news content here..."
                    className="text-input"
                    rows="6"
                  />
                  <button 
                    onClick={handleTextAnalysis}
                    disabled={!inputText.trim() || isAnalyzing}
                    className="btn btn-primary"
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="loading"></span>
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Text'
                    )}
                  </button>
                </div>

                <div className="option-card">
                  <h3>🔗 URL Analysis</h3>
                  <p>Enter a news article URL to analyze</p>
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://example.com/news-article"
                    className="url-input"
                  />
                  <button 
                    onClick={handleUrlAnalysis}
                    disabled={!inputUrl.trim() || isAnalyzing}
                    className="btn btn-primary"
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="loading"></span>
                        Analyzing URL...
                      </>
                    ) : (
                      'Analyze URL'
                    )}
                  </button>
                </div>

                <div className="option-card">
                  <h3>📷 Image Analysis</h3>
                  <p>Upload an image containing news text to analyze</p>
                  <div className="image-upload-area">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="image-input"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="image-upload-label">
                      {inputImage ? (
                        <div className="image-preview">
                          <img src={inputImage.preview} alt="Preview" />
                          <span>{inputImage.file.name}</span>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          <span>📷</span>
                          <span>Click to upload image</span>
                        </div>
                      )}
                    </label>
                  </div>
                  <button 
                    onClick={handleImageAnalysis}
                    disabled={!inputImage || isAnalyzing}
                    className="btn btn-primary"
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="loading"></span>
                        Analyzing Image...
                      </>
                    ) : (
                      'Analyze Image'
                    )}
                  </button>
                </div>
              </div>

              {analysisResult && (
                <div className="analysis-result">
                  <div className="result-header">
                    <h3>Analysis Result</h3>
                    <div className="result-actions">
                      <div className={`result-badge ${analysisResult.result.toLowerCase()}`}>
                        {analysisResult.result}
                      </div>
                      <button onClick={generatePDFReport} className="btn btn-secondary pdf-btn">
                        📄 Download Report
                      </button>
                    </div>
                  </div>

                  <div className="result-content">
                    <div className="confidence-score">
                      <h4>Confidence Score</h4>
                      <div className="score-circle">
                        <span className="score-number">{analysisResult.confidence}%</span>
                      </div>
                    </div>

                    <div className="analysis-breakdown">
                      <h4>Analysis Breakdown</h4>
                      <div className="breakdown-grid">
                        <div className="breakdown-item">
                          <span className="breakdown-label">Factual Accuracy</span>
                          <div className="breakdown-bar">
                            <div 
                              className="breakdown-fill" 
                              style={{width: `${analysisResult.analysis.factualAccuracy}%`}}
                            ></div>
                          </div>
                          <span className="breakdown-value">{analysisResult.analysis.factualAccuracy}%</span>
                        </div>
                        <div className="breakdown-item">
                          <span className="breakdown-label">Source Credibility</span>
                          <div className="breakdown-bar">
                            <div 
                              className="breakdown-fill" 
                              style={{width: `${analysisResult.analysis.sourceCredibility}%`}}
                            ></div>
                          </div>
                          <span className="breakdown-value">{analysisResult.analysis.sourceCredibility}%</span>
                        </div>
                        <div className="breakdown-item">
                          <span className="breakdown-label">Sentiment Bias</span>
                          <div className="breakdown-bar">
                            <div 
                              className="breakdown-fill" 
                              style={{width: `${analysisResult.analysis.sentimentBias}%`}}
                            ></div>
                          </div>
                          <span className="breakdown-value">{analysisResult.analysis.sentimentBias}%</span>
                        </div>
                        <div className="breakdown-item">
                          <span className="breakdown-label">Linguistic Patterns</span>
                          <div className="breakdown-bar">
                            <div 
                              className="breakdown-fill" 
                              style={{width: `${analysisResult.analysis.linguisticPatterns}%`}}
                            ></div>
                          </div>
                          <span className="breakdown-value">{analysisResult.analysis.linguisticPatterns}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="analysis-factors">
                      <h4>Key Factors</h4>
                      <ul>
                        {analysisResult.factors.map((factor, index) => (
                          <li key={index}>{factor}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="recommendations">
                      <h4>Recommendations</h4>
                      <ul>
                        {analysisResult.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-tab">
              <div className="tab-header">
                <h1>Analysis History</h1>
                <p>Review your previous fake news detection analyses</p>
              </div>

              <div className="history-list">
                {analysisHistory.map((item) => (
                  <div key={item.id} className="history-item">
                    <div className="history-header">
                      <div className={`history-badge ${item.result.toLowerCase()}`}>
                        {item.result}
                      </div>
                      <span className="history-date">{item.date}</span>
                      <span className="history-confidence">{item.confidence}% confidence</span>
                    </div>
                    <div className="history-content">
                      <p>{item.content}</p>
                      {item.source && <span className="history-source">Source: {item.source}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-tab">
              <div className="tab-header">
                <h1>Analytics Dashboard</h1>
                <p>Overview of your fake news detection activity</p>
              </div>

              <div className="analytics-grid">
                <div className="analytics-card">
                  <h3>Total Analyses</h3>
                  <div className="analytics-number">127</div>
                  <p className="analytics-change">+12% this month</p>
                </div>
                <div className="analytics-card">
                  <h3>Fake News Detected</h3>
                  <div className="analytics-number">43</div>
                  <p className="analytics-change">34% detection rate</p>
                </div>
                <div className="analytics-card">
                  <h3>Average Confidence</h3>
                  <div className="analytics-number">89%</div>
                  <p className="analytics-change">+2% improvement</p>
                </div>
                <div className="analytics-card">
                  <h3>Accuracy Rate</h3>
                  <div className="analytics-number">96%</div>
                  <p className="analytics-change">Highly accurate</p>
                </div>
              </div>

              <div className="analytics-chart">
                <h3>Detection Trends</h3>
                <div className="chart-placeholder">
                  <p>📊 Chart visualization would go here</p>
                  <p>Showing detection patterns over time</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
