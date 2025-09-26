import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import './AboutUs.css';

const AboutUs = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // Redirect to login if not authenticated
        window.location.href = '/';
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleBackToDashboard = () => {
    window.location.href = '/dashboard';
  };

  if (loading) {
    return (
      <div className="about-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="about-container">
      <div className="water-background">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <div className="floating-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <div className="logo-icon">💧</div>
            </div>
            <h1 className="app-name">HydroLens</h1>
          </div>
          
          <div className="nav-buttons">
            <button 
              onClick={handleBackToDashboard} 
              className="back-btn"
            >
              ← Back to Dashboard
            </button>
          </div>
          
          <div className="user-section">
            <div className="user-info">
              <span className="user-id">ID: {user?.uid?.slice(-8) || 'N/A'}</span>
              <span className="user-name">{user?.displayName || user?.email?.split('@')[0] || 'User'}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="about-content">
        <div className="about-island">
          <div className="about-header">
            <h1 className="about-title">About HydroLens</h1>
            <p className="about-subtitle">Advanced Water Management Intelligence Platform</p>
          </div>

          <div className="about-sections">
            <div className="about-section">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-content">
                HydroLens is dedicated to revolutionizing water resource management through cutting-edge 
                technology and data-driven insights. We provide comprehensive groundwater monitoring, 
                extraction analysis, and AI-powered recommendations to ensure sustainable water usage 
                for communities and industries.
              </p>
            </div>

            <div className="about-section">
              <h2 className="section-title">What We Do</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">📊</div>
                  <h3>Real-time Monitoring</h3>
                  <p>Continuous tracking of groundwater extraction levels and contamination status</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🤖</div>
                  <h3>AI Analysis</h3>
                  <p>Advanced AI models provide insights and recommendations for water management</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">📈</div>
                  <h3>Data Visualization</h3>
                  <p>Interactive dashboards and reports for comprehensive water resource analysis</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🌍</div>
                  <h3>Sustainability Focus</h3>
                  <p>Promoting sustainable water practices and environmental conservation</p>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2 className="section-title">Technology Stack</h2>
              <div className="tech-stack">
                <div className="tech-item">
                  <span className="tech-label">Frontend:</span>
                  <span className="tech-value">React, TypeScript, Vite</span>
                </div>
                <div className="tech-item">
                  <span className="tech-label">Backend:</span>
                  <span className="tech-value">Node.js, Express.js</span>
                </div>
                <div className="tech-item">
                  <span className="tech-label">Authentication:</span>
                  <span className="tech-value">Firebase Auth</span>
                </div>
                <div className="tech-item">
                  <span className="tech-label">AI Integration:</span>
                  <span className="tech-value">Cloud AI Models</span>
                </div>
                <div className="tech-item">
                  <span className="tech-label">Data Source:</span>
                  <span className="tech-value">IN-GRES Database</span>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2 className="section-title">Our Team</h2>
              <p className="section-content">
                HydroLens is developed by a dedicated team of water resource engineers, 
                data scientists, and software developers who are passionate about 
                environmental sustainability and technological innovation. Our team 
                combines decades of experience in water management with cutting-edge 
                software development practices.
              </p>
            </div>

            <div className="about-section">
              <h2 className="section-title">Contact Information</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <span className="contact-value">info@hydrolens.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Phone:</span>
                  <span className="contact-value">+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Address:</span>
                  <span className="contact-value">123 Water Management Ave, Tech City, TC 12345</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
