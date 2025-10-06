import React from 'react';
import './TermsModal.css';

const TermsModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const termsContent = {
    terms: {
      title: "Terms of Service",
      content: (
        <div className="terms-content">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using the Fake News Detection Platform, you accept and agree to be bound by the terms and provision of this agreement.</p>

          <h3>2. Use License</h3>
          <p>Permission is granted to temporarily use the Fake News Detection Platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>modify or copy the materials</li>
            <li>use the materials for any commercial purpose or for any public display</li>
            <li>attempt to reverse engineer any software contained on the platform</li>
            <li>remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h3>3. Disclaimer</h3>
          <p>The materials on the Fake News Detection Platform are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h3>4. Analysis Accuracy</h3>
          <p>While we strive to provide accurate fake news detection, our platform:</p>
          <ul>
            <li>Uses AI and machine learning algorithms that may not be 100% accurate</li>
            <li>Should be used as a supplementary tool, not the sole source of verification</li>
            <li>Requires users to verify information through multiple reliable sources</li>
            <li>Cannot guarantee the accuracy of analysis results</li>
          </ul>

          <h3>5. User Responsibilities</h3>
          <p>Users are responsible for:</p>
          <ul>
            <li>Providing accurate information during registration</li>
            <li>Using the platform responsibly and ethically</li>
            <li>Not attempting to manipulate or abuse the analysis system</li>
            <li>Respecting intellectual property rights</li>
          </ul>

          <h3>6. Privacy and Data</h3>
          <p>We collect and process data in accordance with our Privacy Policy. By using our service, you consent to such processing and you warrant that all data provided by you is accurate.</p>

          <h3>7. Limitations</h3>
          <p>In no event shall Fake News Detection Platform or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the platform.</p>

          <h3>8. Revisions</h3>
          <p>We may revise these terms of service at any time without notice. By using this platform, you are agreeing to be bound by the then current version of these terms of service.</p>

          <h3>9. Contact Information</h3>
          <p>If you have any questions about these Terms of Service, please contact us at: support@fakenewsdetector.com</p>
        </div>
      )
    },
    privacy: {
      title: "Privacy Policy",
      content: (
        <div className="terms-content">
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us, such as:</p>
          <ul>
            <li>Name and email address when you create an account</li>
            <li>Organization information (optional)</li>
            <li>Text, URLs, and images you submit for analysis</li>
            <li>Usage data and analytics</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process and analyze content for fake news detection</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Improve our algorithms and detection accuracy</li>
          </ul>

          <h3>3. Information Sharing</h3>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
          <ul>
            <li>With your explicit consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
            <li>In connection with a merger or acquisition</li>
          </ul>

          <h3>4. Data Security</h3>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

          <h3>5. Data Retention</h3>
          <p>We retain your information for as long as your account is active or as needed to provide you services. You may request deletion of your account and associated data at any time.</p>

          <h3>6. Cookies and Tracking</h3>
          <p>We use cookies and similar technologies to enhance your experience, analyze usage patterns, and improve our services.</p>

          <h3>7. Third-Party Services</h3>
          <p>Our platform may use third-party services (like Google's Gemini AI) for analysis. These services have their own privacy policies governing the use of your information.</p>

          <h3>8. Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Data portability</li>
          </ul>

          <h3>9. Children's Privacy</h3>
          <p>Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>

          <h3>10. Changes to Privacy Policy</h3>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

          <h3>11. Contact Us</h3>
          <p>If you have questions about this Privacy Policy, please contact us at: privacy@fakenewsdetector.com</p>
        </div>
      )
    }
  };

  const currentContent = termsContent[type] || termsContent.terms;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{currentContent.title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {currentContent.content}
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
