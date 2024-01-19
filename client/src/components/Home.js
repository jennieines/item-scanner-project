// Home.js

import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const scanItem = async () => {
    try {
      setLoading(true);

      // Open a file input dialog to let the user choose between file upload and camera access
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      // Handle the selected file or camera capture
      input.addEventListener('change', async (event) => {
        const file = event.target.files[0];

        if (file) {
          // File upload logic (you can send the file to the server here)
          const formData = new FormData();
          formData.append('image', file);

          const response = await axios.post('/items/upload', formData);
          console.log(response.data); // Adjust this part as needed
        } else {
          // Camera capture logic (you can use a library like react-camera for this)
          // This part may require additional setup and libraries
          console.log('Capture from camera');
        }

        setLoading(false);
      });

      input.click();
    } catch (error) {
      console.error('Error scanning item:', error.message);
      setLoading(false);
    }
  };

  const logIn = async () => {
    try {
      if (!loginUsername || !loginPassword) {
        alert('Please enter both username and password.');
        return;
      }

      // Your login logic
      // const response = await axios.post('/api/auth/login', { loginUsername, loginPassword });
      // Handle successful login, e.g., store the token in state or local storage
      setShowLogin(false);
      alert('You are in!');
    } catch (error) {
      console.error('Oh no.. your login.. its broken', error.message);
    }
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const register = async () => {
    try {
      if (!registerUsername || !registerPassword) {
        alert('Please enter both username and password.');
        return;
      }

      // Your registration logic
      // This could be similar to the login logic, sending a request to register a new user
      setShowRegister(false);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  return (
    <div>
      <h1>Welcome! Try Scanning Something!! :3</h1>
      <p>DO IT NOW... please</p>
      <button onClick={scanItem} disabled={loading}>
        {loading ? 'Scanning...' : 'Scan Item'}
      </button>
      <h2>Like what you see? Save it!</h2>
      <p>You know you want too..</p>
      <button onClick={handleLoginClick} id="logIn">
        Login
      </button>
      <button onClick={handleRegisterClick} id="register">
        Register
      </button>

      {/* Render the login form when showLogin is true */}
      {showLogin && (
        <div>
          <h2>Welcome Back!</h2>
          <p>I missed you</p>
          <p>call me?</p>
          <label>
            Username:
            <input
              type="text"
              placeholder="Enter your username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </label>
          <button onClick={logIn}>Login</button>
        </div>
      )}

      {/* Render the register form when showRegister is true */}
      {showRegister && (
        <div>
          <h4>Register Here!</h4>
          {/* Your registration form */}
          <label>
            Username:
            <input
              type="text"
              placeholder="Enter your username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              placeholder="Enter your password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </label>
          <button onClick={register}>Register</button>
        </div>
      )}
    </div>
  );
};

export default Home;
