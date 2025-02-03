import "../styles/LandingPage.css";
import carLogo from "../images/car-logo.jpg"; // Replace with your logo image
import carImage from "../images/car-image.jpg"; // Replace with your car image
import userIcon from "../images/user-icon.png"; // Replace with your user icon image
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const aboutRef = useRef(null);
  const homeRef = useRef(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      // Close mobile menu when clicking outside
      if (!event.target.closest('.nav-links') && !event.target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigation = (path) => {
    if (path === '/about') {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (path === '/') {
      homeRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (path === '/login') {
      navigate('/login');
    } else if (path === '/register') {
      navigate('/register');
    } else if (path === '/profile') {
      navigate('/profile');
    } else if (path === '/cars') {
      // Add buy car logic
      navigate('/cars');
      console.log('Buying a car');
    } else if (path === '/sell') {
      // Add sell car logic
      navigate('/login');
      console.log('Selling a car');
    } else if (path === '/service') {
      // Add service booking logic
      console.log('Booking service');
    } else {
      console.log(`Navigating to ${path}`);
    }
  };

  return (
    <div className="main-container">
      {/* Header Section */}
      <div className="header">
        <div className="logo">
          <img src={carLogo} alt="Car Connect Logo" />
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <button onClick={() => handleNavigation('/')}>Home</button>
          <button onClick={() => handleNavigation('/about')}>About Us</button>
        </nav>
        
        <div className="user-section">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button className="search-btn">Search</button>
          </div>
          
          <div className="user-icon" ref={menuRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img src={userIcon} alt="User Icon" />
            {isMenuOpen && (
              <div className="user-menu">
                <button onClick={() => handleNavigation('/login')}>Login</button>
                <button onClick={() => handleNavigation('/register')}>Sign Up</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section" ref={homeRef} style={{ backgroundImage: `url(${carImage})` }}>
        <div className="content-left">
          <h1>
            <span className="car-text">CAR</span>
            <span className="ct-text">CNT</span>
          </h1>
          <h3>Discover Your Ideal Vehicle</h3>
          <p>Your one-stop destination for buying, selling, and servicing vehicles.</p>
        </div>
        
        <div className="content-right">
          <div className="feature-card">
            <ul className="button-list">
              <li><button className="action-btn" onClick={() => handleNavigation('/cars')}>Buy a Car</button></li>
              <li><button className="action-btn" onClick={() => handleNavigation('/sell')}>Sell Your Car</button></li>
              <li><button className="action-btn" onClick={() => handleNavigation('/service')}>Book Service</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section" ref={aboutRef}>
        <h2>About Us</h2>
        <div className="about-content">
          <div className="about-text">
            <h3>Your Trusted Car Partner</h3>
            <p>We are committed to providing the best automotive solutions for our customers. With years of experience in the industry, we offer:</p>
            <ul>
              <li>Wide selection of quality vehicles</li>
              <li>Professional car maintenance services</li>
              <li>Transparent buying and selling process</li>
              <li>Expert guidance and support</li>
            </ul>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <h4>1000+</h4>
              <p>Cars Sold</p>
            </div>
            <div className="stat-item">
              <h4>500+</h4>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h4>50+</h4>
              <p>Expert Mechanics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
