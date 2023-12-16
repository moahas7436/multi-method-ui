import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Change to useNavigate
import './NavigationBar.css';
import Cookies from 'js-cookie';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();  // Use useNavigate instead of useHistory


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    // Perform logout actions, e.g., clear user session
    Cookies.remove('user_id');
    // Redirect to the home page after logout
    navigate('/')
  };

  return (
    <nav className="navbar">

      <ul className="nav-links">
        <li><Link to="/home" onClick={toggleMenu}>Home</Link></li>
        {/* <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
          <li><Link to="/register" onClick={toggleMenu}>Register</Link></li> */}
        <li><Link to="/study-methods" onClick={toggleMenu}>Study Methods</Link></li>
        <li><Link to="/sessionhistory" onClick={toggleMenu}>Session History</Link></li>
        <li><Link to="/profile" onClick={toggleMenu}>My Profile </Link></li>\
        <li><button onClick={handleLogout}>Logout</button></li>

      </ul>
    </nav>
  );
};

export default NavigationBar;
