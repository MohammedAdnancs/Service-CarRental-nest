import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#333', color: '#fff' }}>
      <div>
        <Link to="/" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Home</Link>
        <Link to="/addReview" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Add Review</Link>
      </div>
      <div>
        <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
