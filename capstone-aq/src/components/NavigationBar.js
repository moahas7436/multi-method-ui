import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        <i>☰</i> {/* Hamburger Icon */}
      </div>
      {isOpen && (
        <ul className="nav-links">
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
          <li><Link to="/register" onClick={toggleMenu}>Register</Link></li>
          <li><Link to="/study-methods" onClick={toggleMenu}>Study Methods</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavigationBar;
