import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthToken } from '../api';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Check if user is logged in
    const token = getAuthToken();
    if (token) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  const handleEnter = () => {
    // Same logic as Get Started
    const token = getAuthToken();
    if (token) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="landing-page">
      {/* Header / Navbar */}
      <header className="landing-header">
        <div className="header-container">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#ff4757" />
                <path d="M16 10L20 14H18V20H14V14H12L16 10Z" fill="white" />
                <circle cx="16" cy="22" r="2" fill="white" />
              </svg>
            </div>
            <span className="logo-text">QPoint</span>
          </Link>
          <nav className="header-nav">
            <Link to="/documentation" className="nav-link">Documentation</Link>
            <Link to="/support" className="nav-link">Support</Link>
            <Link to="/login" className="sign-in-btn">Sign In</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <h1 className="hero-headline">
              Ask Better Questions,<br />
              <span className="highlight">Get Smarter Answers</span>
            </h1>
            <p className="hero-subheading">
              QPoint helps you ask, answer, and discover knowledge
              with AI-powered insights and a trusted community.
            </p>
            <div className="hero-cta-buttons">
              <button onClick={handleGetStarted} className="hero-cta-btn primary">
                Get Started
              </button>
              <button onClick={handleEnter} className="hero-cta-btn secondary">
                Enter ↗
              </button>
            </div>
            <div className="hero-note">
              <svg className="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7" fill="#10b981" stroke="#10b981" />
                <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>No credit card required</span>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-illustration-card">
              <div className="illustration-content">
                {/* Question Mark Icon */}
                <div className="illustration-question">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="35" fill="#ff4757" opacity="0.1" />
                    <path d="M40 25C35.5817 25 32 28.5817 32 33C32 33.5523 32.4477 34 33 34C33.5523 34 34 33.5523 34 33C34 29.6863 36.6863 27 40 27C43.3137 27 46 29.6863 46 33C46 36.3137 43.3137 39 40 39C39.4477 39 39 39.4477 39 40V45C39 45.5523 39.4477 46 40 46C40.5523 46 41 45.5523 41 45V41.5C44.5899 41.5 47.5 38.5899 47.5 35C47.5 31.4101 44.5899 28.5 41 28.5C37.4101 28.5 34.5 31.4101 34.5 35C34.5 35.5523 34.0523 36 33.5 36C32.9477 36 32.5 35.5523 32.5 35C32.5 30.5817 36.0817 27 40.5 27C44.9183 27 48.5 30.5817 48.5 35C48.5 39.4183 44.9183 43 40.5 43C40.2239 43 40 43.2239 40 43.5V45.5C40 45.7761 40.2239 46 40.5 46C40.7761 46 41 45.7761 41 45.5V43.5C41 43.2239 40.7761 43 40.5 43Z" fill="#ff4757" />
                    <circle cx="40" cy="52" r="3" fill="#ff4757" />
                  </svg>
                </div>
                {/* Chat Bubbles */}
                <div className="illustration-bubble bubble-1">
                  <div className="bubble-content">
                    <div className="bubble-dot"></div>
                    <div className="bubble-dot"></div>
                    <div className="bubble-dot"></div>
                  </div>
                </div>
                <div className="illustration-bubble bubble-2">
                  <div className="bubble-content">
                    <div className="bubble-line"></div>
                    <div className="bubble-line short"></div>
                  </div>
                </div>
                {/* Abstract Cards */}
                <div className="illustration-card card-1">
                  <div className="card-lines">
                    <div className="card-line"></div>
                    <div className="card-line"></div>
                    <div className="card-line short"></div>
                  </div>
                </div>
                <div className="illustration-card card-2">
                  <div className="card-lines">
                    <div className="card-line"></div>
                    <div className="card-line short"></div>
                  </div>
                </div>
                {/* AI Sparkle */}
                <div className="illustration-sparkle sparkle-1">✨</div>
                <div className="illustration-sparkle sparkle-2">💡</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="feature-section">
        <div className="feature-container">
          <div className="feature-label">FEATURES</div>
          <h2 className="feature-heading">Why trust QPoint?</h2>
          <p className="feature-subtext">
            Built for meaningful discussions, fast answers, and trusted knowledge.
          </p>
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="feature-card-title">Smart AI Answers</h3>
              <p className="feature-card-description">
                Get instant, context-aware answers powered by AI.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="feature-card-title">Community Driven</h3>
              <p className="feature-card-description">
                Upvote, downvote, and discuss with real people.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="feature-card-title">Reliable & Scalable</h3>
              <p className="feature-card-description">
                Built for performance with enterprise-grade reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-logo">
            <div className="logo-icon small">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#ff4757" />
                <path d="M16 10L20 14H18V20H14V14H12L16 10Z" fill="white" />
                <circle cx="16" cy="22" r="2" fill="white" />
              </svg>
            </div>
            <span className="logo-text">QPoint</span>
          </div>
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/support" className="footer-link">Contact Support</Link>
          </div>
          <div className="footer-copyright">
            © 2024 QPoint Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}