import React, { useState } from 'react';
import './SignupPage.css'; // Import the CSS file
import Button from '../components/Button/Button'; // Import the Button component
import TextInputfield from '../components/Text_inputfield/TextInputfiled'; // Import the TextInputfield component
const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [national_id, setNational_id] = useState('');
  const [error, setError] = useState(null);
  const [successModal, setSuccessModal] = useState(false); // State for modal visibility

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    try {
      const response = await fetch('http://localhost:3002/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
          birthday,
          phonenumber,
          national_id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setSuccessModal(true); // Show success popup
        setError(null);

        // Optionally, reset the fields
        setUsername('');
        setPassword('');
        setEmail('');
        setBirthday('');
        setNational_id('');
        setPhonenumber('');

      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to register user.');
      }
      console.log(username, password, email, birthday, phonenumber, national_id);
    } catch (err) {
      setError('An error occurred while registering the user.');
    }
  };

  const closeModal = () => {
    setSuccessModal(false); // Hide the modal when the user closes it
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup}>
        <div className="form-group">
          
          <TextInputfield
            type="email"
            placeholder="Enter your Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          
          <TextInputfield
            type="text"
            placeholder="Enter your Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          
          <TextInputfield
            type="text"
            placeholder="Enter your Phonenumber"
            id="phonenumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          
          <TextInputfield
            type="date"
            placeholder="Enter your Birthday"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
         
          <TextInputfield
            type="text"
            placeholder="Enter your National ID"
            id="national_id"
            value={national_id}
            onChange={(e) => setNational_id(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          
          <TextInputfield
            placeholder="Enter your Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button  color= "#white" backgroundColor="#555" width="100%" height="5dvh" type="submit" text="SignUp" />
      </form>

      {/* Modal to display success message */}
      {successModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;