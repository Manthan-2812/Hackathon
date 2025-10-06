import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import TermsModal from './TermsModal';
import './SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [modalType, setModalType] = useState('terms');

  const handleTermsClick = (e) => {
    e.preventDefault();
    setModalType('terms');
    setShowTermsModal(true);
  };

  const handlePrivacyClick = (e) => {
    e.preventDefault();
    setModalType('privacy');
    setShowTermsModal(true);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save user data and login
      login(formData);
      
      // Navigate to dashboard after successful signup
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign up error:', error);
      setErrors({ submit: 'An error occurred during sign up. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-form-container">
          <div className="signup-header">
            <Link to="/" className="logo-link">
              <h2>FakeNewsDetector</h2>
            </Link>
            <h1>Create Your Account</h1>
            <p>Join our platform to start detecting fake news with AI-powered analysis</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="firstName" className="input-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`input-field ${errors.firstName ? 'error' : ''}`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="lastName" className="input-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`input-field ${errors.lastName ? 'error' : ''}`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`input-field ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="organization" className="input-label">Organization (Optional)</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Your company or organization"
              />
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="password" className="input-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input-field ${errors.password ? 'error' : ''}`}
                  placeholder="Create a password"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="input-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-text">
                  I agree to the <button className="link-button" onClick={handleTermsClick}>Terms of Service</button> and <button className="link-button" onClick={handlePrivacyClick}>Privacy Policy</button>
                </span>
              </label>
              {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
            </div>

            {errors.submit && (
              <div className="error-message submit-error">{errors.submit}</div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-large submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/dashboard" className="link">Sign in</Link></p>
          </div>
        </div>

        <div className="signup-visual">
          <div className="visual-content">
            <div className="feature-highlight">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Detection</h3>
              <p>Advanced machine learning algorithms analyze content authenticity with 99.2% accuracy</p>
            </div>
            <div className="feature-highlight">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Analysis</h3>
              <p>Get instant results for news articles, social media posts, and web content</p>
            </div>
            <div className="feature-highlight">
              <div className="feature-icon">📊</div>
              <h3>Detailed Reports</h3>
              <p>Comprehensive analysis with confidence scores and detailed explanations</p>
            </div>
          </div>
        </div>
      </div>

      <TermsModal 
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        type={modalType}
      />
    </div>
  );
};

export default SignUpPage;
