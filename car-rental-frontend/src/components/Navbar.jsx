import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();

  // Retrieve user data from session storage
  const user = JSON.parse(sessionStorage.getItem('userProfile'));

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('userProfile'); // Clear user data from session
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      {/* Left-side links */}
      <div className="navbar-left">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        {user && (
          <>
            <Link to="/addListing" className="navbar-link">
              Add Listing
            </Link>
            <Link to="/addComplain" className="navbar-link">
              Add Complain
            </Link>
            <Link to="/cart" className="navbar-link">
              Cart
            </Link>
          </>
        )}
      </div>

      {/* Right-side authentication links */}
      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-welcome">Welcome, {user.username}!</span>
            <button onClick={handleLogout} className="navbar-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="navbar-link">
              Sign Up
            </Link>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
