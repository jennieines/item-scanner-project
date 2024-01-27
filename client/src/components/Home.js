import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';

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
      
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      input.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        console.log('Selected file:', file); // Placeholder for actual file handling logic

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
      const response = await axios.post('http://localhost:3001/login', {
        username: loginUsername,
        password: loginPassword
      });

      if (response.status === 200) {
        alert('Login successful!');
      } else {
        alert('Login failed. Invalid credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Error during login. Please try again.');
    }
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const register = async () => {
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username: registerUsername,
        password: registerPassword
      });

      if (response.status === 200) {
        alert('Registration successful!');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      alert('Error during registration. Please try again.');
    }
  };

  return (
    <div>
      <h1>Try Scanning Something!! :3</h1>
      <button onClick={scanItem} disabled={loading}>
        {loading ? 'Scanning...' : 'Scan Item'}
      </button>
      <h2>Want to keep track of your items?</h2>
      <h3>Login to save it!</h3>
      <button onClick={handleLoginClick} id="logIn">
        Login
      </button>

      {/* Popup for login */}
      {showLogin && (
        <div className="popup-container">
          <div className="popup">
            <p>Welcome Back!</p>
            <label>
              Username:
              <input
                type="text"
                placeholder="Enter your email"
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
            <p>Don't have an account? <button onClick={handleRegisterClick} className="link-button">Register</button></p>
          </div>
        </div>
      )}

      {/* Popup for registration */}
      {showRegister && (
        <div className="popup-container">
          <div className="popup">
            <p>Thanks for joining!</p>
            <label>
              Username:
              <input
                type="text"
                placeholder="Enter your email"
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
        </div>
      )}
    </div>
  );
};

export default Home;
