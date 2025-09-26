import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import './HomeDashboard.css';

const HomeDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // AI Chat states
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Shared groundwater extraction data
  const groundwaterExtraction = 120; // This is the main variable that controls both displays
  
  // Function to determine status based on extraction value
  const getExtractionStatus = (value: number) => {
    if (value <= 70) return 'SAFE';
    if (value <= 90) return 'SEMI-CRITICAL';
    if (value <= 100) return 'CRITICAL';
    return 'OVER-EXPLOITED';
  };
  
  const extractionStatus = getExtractionStatus(groundwaterExtraction);
  
  // Calculate stroke-dashoffset for the gauge
  // When percentage is above 100%, the bar should be completely filled (no empty space)
  const strokeDashoffset = groundwaterExtraction > 100 ? 0 : 314 - (314 * groundwaterExtraction / 100);

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

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      // Simulate AI API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response - replace with actual AI response
      const mockResponse = `Based on the current groundwater extraction data showing ${groundwaterExtraction}% extraction rate, here's my analysis:

The groundwater extraction in Karnataka State is currently in the OVER-EXPLOITED category, which indicates severe stress on the groundwater resources. This level of extraction (${groundwaterExtraction}%) exceeds the sustainable limit and requires immediate attention.

Key recommendations:
1. Implement strict water conservation measures
2. Promote rainwater harvesting initiatives
3. Consider artificial recharge techniques
4. Monitor extraction rates more frequently
5. Develop alternative water sources

The current status suggests urgent intervention is needed to prevent further depletion of groundwater resources.`;
      
      setAiResponse(mockResponse);
    } catch (error) {
      console.error('AI API error:', error);
      setAiResponse('Sorry, there was an error processing your request. Please try again.');
    } finally {
      setIsLoading(false);
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

      <div className="floating-header">
        <div className="header-content">
          <div className="search-section">
            <div className="search-bar">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Search Location" className="search-input" />
              <div className="keyboard-shortcut">⌘F</div>
            </div>
          </div>
          
          <div className="nav-buttons">
            <button 
              onClick={() => window.location.href = '/about'} 
              className="about-btn"
            >
              About Us
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

      <div className="dashboard-content">
        <div className="location-heading">
          <h1 className="main-location-title">Karnataka State, India</h1>
        </div>
        
        <div className="main-body-island">
          <div className="contamination-meter-section">
            <div className="meter-container">
              <h3 className="meter-title">Groundwater Extraction Exploitation</h3>
              <div className="semi-circular-gauge">
                <svg className="gauge-svg" viewBox="0 0 280 160">
                  {/* Background arc */}
                  <path
                    d="M 40 140 A 100 100 0 0 1 240 140"
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.2)"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  
                  {/* Progress arc */}
                  <path
                    d="M 40 140 A 100 100 0 0 1 240 140"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray="314"
                    strokeDashoffset={strokeDashoffset}
                    className="progress-arc"
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="70%" stopColor="#60a5fa" />
                      <stop offset="90%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="gauge-center">
                  <div className="gauge-percentage">{groundwaterExtraction}%</div>
                  <div className="gauge-status">{extractionStatus}</div>
                </div>
              </div>
              
              <div className="gauge-legend">
                <div className="legend-item">
                  <div className="legend-color safe"></div>
                  <span className="legend-range">0 - 70</span>
                  <span className="legend-status">SAFE</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color semi-critical"></div>
                  <span className="legend-range">70 - 90</span>
                  <span className="legend-status">SEMI-CRITICAL</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color critical"></div>
                  <span className="legend-range">90 - 100</span>
                  <span className="legend-status">CRITICAL</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color over-exploited"></div>
                  <span className="legend-range">&gt;100</span>
                  <span className="legend-status">OVER-EXPLOITED</span>
                </div>
              </div>
              <div className="data-source">Data-Source: IN-GRES</div>
            </div>
          </div>
          
          <div className="stats-section">
            <div className="stats-table-container">
              <h4 className="stats-title">Groundwater Statistics</h4>
              <div className="stats-table">
                <div className="table-header">
                  <div className="header-cell">Parameter</div>
                  <div className="header-cell">C (Command Area)</div>
                  <div className="header-cell">NC (Non Command Area)</div>
                  <div className="header-cell">Total</div>
                </div>
                
                <div className="table-row">
                  <div className="row-label">Recharge Worthy</div>
                  <div className="row-value">2,450</div>
                  <div className="row-value">1,890</div>
                  <div className="row-value total">4,340</div>
                </div>
                
                <div className="table-row">
                  <div className="row-label">Annual Extractable Ground Water Resource</div>
                  <div className="row-value">1,850</div>
                  <div className="row-value">1,420</div>
                  <div className="row-value total">3,270</div>
                </div>
                
                <div className="table-row">
                  <div className="row-label">Ground Water Extraction</div>
                  <div className="row-value">1,650</div>
                  <div className="row-value">1,180</div>
                  <div className="row-value total">2,830</div>
                </div>
                
                <div className="table-row">
                  <div className="row-label">Stage of Ground Water Extraction</div>
                  <div className="row-value">{groundwaterExtraction}%</div>
                  <div className="row-value">{groundwaterExtraction}%</div>
                  <div className="row-value total">{groundwaterExtraction}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="ai-chat-island">
          <div className="ai-chat-container">
            <h3 className="ai-chat-title">Got Questions? Ask AI Assistant</h3>
            
            <div className="ai-chat-sections">
              <div className="prompt-section">
                <h4 className="section-title">Ask AI Assistant</h4>
                <form onSubmit={handlePromptSubmit} className="prompt-form">
                  <div className="input-group">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Ask about groundwater management, extraction strategies, or water conservation..."
                      className="prompt-input"
                      rows={4}
                      disabled={isLoading}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isLoading || !prompt.trim()}
                  >
                    {isLoading ? (
                      <>
                        <div className="spinner-small"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                        </svg>
                        Send to AI
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              <div className="response-section">
                <h4 className="section-title">AI Response</h4>
                <div className="response-container">
                  {isLoading ? (
                    <div className="loading-response">
                      <div className="spinner-small"></div>
                      <p>AI is analyzing your request...</p>
                    </div>
                  ) : aiResponse ? (
                    <div className="ai-response">
                      <pre className="response-text">{aiResponse}</pre>
                    </div>
                  ) : (
                    <div className="empty-response">
                      <svg className="ai-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      <p>Submit a prompt to get AI insights about water management</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
