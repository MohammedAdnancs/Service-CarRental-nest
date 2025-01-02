import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; // Import the CSS file
import Button from '../components/Button/Button'; // Import the Button component
import TextInputfield from '../components/Text_inputfield/TextInputfiled'; // Import the TextInputfield component

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
            phonenumbers: data.userProfile.phonenumbers,
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
    <div className="login-container">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          
          <TextInputfield
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
         
          <TextInputfield
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <Button  color= "#white" backgroundColor="#555" width="100%" height="5dvh" type="submit" text="Login" />
      </form>

    </div>
  );
};

export default LoginPage;