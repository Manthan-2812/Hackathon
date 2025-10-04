import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav">
            <div className="logo">
              <h2>FakeNewsDetector</h2>
            </div>
            <nav className="nav-links">
              <a href="#features">Features</a>
              <a href="#how-it-works">How it Works</a>
              <a href="#about">About</a>
              <Link to="/signup" className="btn btn-primary">Get Started</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1>Advanced Fake News Detection Platform</h1>
            <p className="hero-subtitle">
              Harness the power of multi-agent AI to detect and combat fake news with unprecedented accuracy. 
              Our platform uses cutting-edge machine learning to analyze content authenticity across multiple dimensions.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">
                Start Detecting
              </Link>
              <a href="#how-it-works" className="btn btn-outline btn-large">
                Learn More
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">99.2%</span>
                <span className="stat-label">Accuracy Rate</span>
              </div>
              <div className="stat">
                <span className="stat-number">10M+</span>
                <span className="stat-label">Articles Analyzed</span>
              </div>
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Active Users</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="detection-demo">
              <div className="demo-card real">
                <div className="demo-header">
                  <span className="status-badge real">✓ REAL</span>
                </div>
                <div className="demo-content">
                  <h4>Scientists discover new renewable energy breakthrough</h4>
                  <p>Confidence: 94%</p>
                </div>
              </div>
              <div className="demo-card fake">
                <div className="demo-header">
                  <span className="status-badge fake">⚠ FAKE</span>
                </div>
                <div className="demo-content">
                  <h4>Breaking: Celebrities secretly control the government</h4>
                  <p>Confidence: 87%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Powerful Detection Features</h2>
            <p>Our multi-agent system analyzes content from multiple angles to ensure maximum accuracy</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Analysis</h3>
              <p>Advanced machine learning models trained on millions of verified news articles to detect patterns and inconsistencies.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Source Verification</h3>
              <p>Cross-reference information with trusted databases and verify the credibility of news sources in real-time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Sentiment Analysis</h3>
              <p>Analyze emotional tone and bias patterns that are commonly associated with misleading or fake content.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Processing</h3>
              <p>Get instant results with our optimized processing pipeline that analyzes content in seconds, not minutes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Multi-language Support</h3>
              <p>Detect fake news across multiple languages with our comprehensive linguistic analysis capabilities.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Detailed Reports</h3>
              <p>Receive comprehensive analysis reports with confidence scores and detailed explanations for each detection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Our multi-agent system follows a sophisticated 4-step process</p>
          </div>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Content Ingestion</h3>
              <p>Upload or paste news articles, URLs, or social media posts for analysis.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Multi-Agent Analysis</h3>
              <p>Our AI agents analyze content from different perspectives: factual accuracy, source credibility, and linguistic patterns.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Cross-Reference</h3>
              <p>Compare findings with trusted databases and fact-checking sources to validate information.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Generate Report</h3>
              <p>Receive a detailed analysis report with confidence scores and recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Combat Fake News?</h2>
            <p>Join thousands of users who trust our platform to verify news authenticity</p>
            <Link to="/signup" className="btn btn-primary btn-large">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>FakeNewsDetector</h3>
              <p>Advanced AI-powered fake news detection platform.</p>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How it Works</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 FakeNewsDetector. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
