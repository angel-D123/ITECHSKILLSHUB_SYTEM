import React, { useState } from 'react';
import '../styles/Footer.css';
import logo from '../assets/Logo1.svg';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribing with email:', email);
  };

  return (
    <footer className="footer footer-safe">
      <div className="footer-container">
        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-text">
            <h3>Stay informed always</h3>
            <p>Get the latest updates on courses and industry insights</p>
          </div>
          <div className="newsletter-form-wrapper">
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Your email here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </div>
            </form>
            <p className="privacy-notice">By subscribing you agree to our Privacy Policy</p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <div className="footer-column logo-column">
            <img src={logo} alt="TechSkills Hub" className="footer-logo" />
          </div>

          <div className="footer-column">
            <h4>Platform</h4>
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Learning</h4>
            <ul>
              <li><a href="/student-portal">Student portal</a></li>
              <li><a href="/instructor-portal">Instructor portal</a></li>
              <li><a href="/admin-portal">Admin portal</a></li>
              <li><a href="/resources">Resources</a></li>
              <li><a href="/documentation">Documentation</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="/community">Community</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/company">Company</a></li>
              <li><a href="/about-us">About us</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Press</h4>
            <ul>
              <li><a href="/partners">Partners</a></li>
              <li><a href="/legal">Legal</a></li>
              <li><a href="/terms">Terms</a></li>
              <li><a href="/cookies">Cookies</a></li>
              <li><a href="/compliance">Compliance</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Certifications</h4>
            <ul>
              <li><a href="/tesda-aligned">TESDA aligned</a></li>
              <li><a href="/industry-standards">Industry standards</a></li>
              <li><a href="/quality-assurance">Quality assurance</a></li>
              <li><a href="/accreditation">Accreditation</a></li>
              <li><a href="/recognition">Recognition</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="copyright">© 2025 TechSkills Hub. All rights reserved.</p>
            <div className="footer-legal">
              <a href="/privacy-policy">Privacy policy</a>
              <a href="/terms-of-service">Terms of service</a>
              <a href="/cookies-settings">Cookies settings</a>
            </div>
          </div>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;