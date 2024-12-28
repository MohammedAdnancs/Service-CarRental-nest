import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

      try {
        const response = await fetch('http://localhost:3002/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          // Save user data in session storage
          sessionStorage.setItem('userProfile', JSON.stringify({
            username: data.userProfile.username,
            birthdate: data.userProfile.birthday,
            nationalId: data.userProfile.national_id,
            email: data.userProfile.email,
            phoneNumber: data.userProfile.phonenumber,
          }));
    
          // Optional: Navigate to another page (e.g., dashboard)
          navigate('/');
        } else {
          setError(data.message || 'Login failed. Please try again.');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
        console.error(err);
      }
  };

  return (
    <div className="signup-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;