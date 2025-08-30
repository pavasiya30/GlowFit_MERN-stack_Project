import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './CallToActionSection.css';
import yoga4 from '../assets/y12.1.jpg';

const CallToActionSection = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="cta-section">
      <div className="container">
        <div className="cta-content">
          <div className="cta-text">
            <h2 className="cta-title">Ready to Transform Your Life?</h2>
            <p className="cta-description">
              Join thousands of yogis who have discovered the power of mindful movement and inner peace. 
              Start your journey today and experience the transformative benefits of yoga.
            </p>
            
            <div className="cta-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">🧘‍♀️</span>
                <span className="benefit-text">Improve Flexibility & Strength</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🧘‍♂️</span>
                <span className="benefit-text">Reduce Stress & Anxiety</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💪</span>
                <span className="benefit-text">Build Mental Resilience</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🌟</span>
                <span className="benefit-text">Find Inner Peace</span>
              </div>
            </div>

            <div className="cta-buttons">
              {isLoggedIn ? (
                <Link to="/dashboard" className="cta-btn primary">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="cta-btn primary">
                    Start Free Trial
                  </Link>
                  <Link to="/login" className="cta-btn secondary">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="cta-image">
            <img src={yoga4} alt="Yoga Practice" className="cta-img" />
            <div className="cta-overlay">
              <div className="overlay-content">
                <h3>Begin Your Journey</h3>
                <p>Transform your mind, body, and spirit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;
