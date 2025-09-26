import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import LoginPage from './components/LoginPage';
import HomeDashboard from './components/HomeDashboard';
import AboutUs from './components/AboutUs';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      setLoading(false);
    });

    // Listen for route changes
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      unsubscribe();
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #0a1929 0%, #1a365d 50%, #2d3748 100%)',
        color: 'white'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Route based on current path
  if (currentPath === '/dashboard') {
    return <HomeDashboard />;
  }

  if (currentPath === '/about') {
    return <AboutUs />;
  }

  return <LoginPage />;
}

export default App
