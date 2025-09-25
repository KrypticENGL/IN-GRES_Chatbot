import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import './HomeDashboard.css';

const HomeDashboard = () => {
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

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="water-background">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <div className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <div className="logo-icon">💧</div>
            </div>
            <h1 className="app-name">HydroLens</h1>
          </div>
          
          <div className="user-section">
            <div className="user-info">
              <span className="user-name">{user?.displayName || user?.email}</span>
              <span className="user-email">{user?.email}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome to HydroLens</h2>
          <p>Your water management dashboard is ready for customization.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Quick Stats</h3>
            <p>Dashboard content will be added here step by step.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Recent Activity</h3>
            <p>Activity feed will be implemented here.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Water Management</h3>
            <p>Water-related features will be added here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
