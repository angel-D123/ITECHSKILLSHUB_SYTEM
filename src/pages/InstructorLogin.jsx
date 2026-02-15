import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InstructorLogin.css';

const InstructorLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // For demo purposes - simulate Google login
  const handleGoogleLogin = () => {
    setLoading(true);

    // Simulate Google OAuth flow
    setTimeout(() => {
      // Store instructor data
      localStorage.setItem('user', JSON.stringify({
        id: 2,
        name: 'Prof. Maria Santos',
        email: 'instructor@techskillshub.com',
        role: 'instructor',
        photoUrl: 'https://ui-avatars.com/api/?name=Maria+Santos&background=3b82f6&color=fff'
      }));

      // Redirect to instructor dashboard
      navigate('/instructor/dashboard');
    }, 1500);
  };

  // Alternative: Email/Password login for instructors
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo instructor credentials
    const instructorCredentials = {
      email: 'instructor@example.com',
      password: 'demo_instructor_password'
    };

    setTimeout(() => {
      if (formData.email === instructorCredentials.email && formData.password === instructorCredentials.password) {
        localStorage.setItem('user', JSON.stringify({
          id: 2,
          name: 'Prof. Maria Santos',
          email: formData.email,
          role: 'instructor'
        }));
        navigate('/instructor/dashboard');
      } else {
        setError('Invalid instructor credentials');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="instructor-login-page">
      <div className="instructor-login-container">
        <div className="instructor-login-card">
          {/* Header */}
          <div className="instructor-login-header">
            <div className="instructor-badge">INSTRUCTOR</div>
            <h1 className="instructor-login-title">Instructor Portal</h1>
            <p className="instructor-login-subtitle">
              Sign in to manage your courses and students
            </p>
          </div>

          {!showEmailLogin ? (
            <>
              {/* Google Sign In */}
              <button 
                onClick={handleGoogleLogin}
                className="google-signin-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="instructor-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting to Google...
                  </>
                ) : (
                  <>
                    <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>

              <div className="divider">
                <span>OR</span>
              </div>

              <button 
                onClick={() => setShowEmailLogin(true)}
                className="email-login-toggle-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Sign in with Email
              </button>

              {/* Demo Note */}
              <div className="demo-note">
                <p>Demo: Click "Continue with Google" to proceed</p>
                <p className="demo-small">Or use email: instructor@techskillshub.com / instructor123</p>
              </div>
            </>
          ) : (
            <>
              {/* Email/Password Form */}
              {error && (
                <div className="instructor-error-message">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleEmailLogin} className="instructor-email-form">
                <div className="instructor-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="instructor-form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button type="submit" className="instructor-submit-btn" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <button 
                onClick={() => setShowEmailLogin(false)}
                className="back-to-google-btn"
              >
                ← Back to Google Sign In
              </button>
            </>
          )}

          {/* Footer Links */}
          <div className="instructor-login-footer">
            <a href="/login" className="instructor-footer-link">
              ← Back to Main Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorLogin;