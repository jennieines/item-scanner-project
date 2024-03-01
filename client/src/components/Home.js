import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = ({ setScanItem}) => {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const scanItem = async () => {
    try {
      setLoading(true);

      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      input.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        console.log('Selected file:', file); 
        setScanItem(file);
        
        setLoading(false);
        navigate('/SearchResults');
      });

      input.click();
    } catch (error) {
      console.error('Error scanning item:', error.message);
      setLoading(false);
    }
  };

  const logIn = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username: loginUsername,
        password: loginPassword,
      });

      if (response.status === 200) {
        setLoggedInUsername(loginUsername); 
        setIsLoggedIn(true); 
        localStorage.setItem('token', response.data.token); 
        setShowLogin(false); 
        alert('Login successful!');
      } else {
        alert('Login failed. Invalid credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Error during login. Please try again.');
    }
  };

  const logOut = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    setLoggedInUsername(''); 
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
      const response = await axios.post('http://localhost:3001/auth/register', {
        username: registerUsername,
        password: registerPassword,
      });

      if (response.status === 200) {
        alert('Registration successful!');
        setShowRegister(false); 
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
      <h1>Try Scanning Something!! </h1>
      <button onClick={scanItem} disabled={loading}>
        {loading ? 'Scanning...' : 'Scan Item'}
      </button>

      
      {isLoggedIn && (
        <button onClick={() => navigate('/SavedItems')} className="view-saved-items-button">
          View Saved Items
        </button>
      )}
      <h2> 😬</h2>
      {isLoggedIn ? null : <h3>Create an account to save your items!</h3>}
      {isLoggedIn ? (
        <button onClick={logOut}>Logout</button>
      ) : (
        <button onClick={handleLoginClick} id="logIn">
          Login
        </button>
      )}

      {showLogin && (
        <div className="popup-container">
          <div className="popup">
            <p>Welcome Back!</p>
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
                onKeyPress={(e) => e.key === 'Enter' && logIn()} 
              />
            </label>
            <button onClick={logIn}>Login</button>
            <p>
              Don't have an account?{' '}
              <button onClick={handleRegisterClick} className="link-button">
                Register
              </button>
            </p>
          </div>
        </div>
      )}

      {showRegister && (
        <div className="popup-container">
          <div className="popup">
            <p>Thanks for joining!</p>
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
                onKeyPress={(e) => e.key === 'Enter' && register()} 
              />
            </label>
            <button onClick={register}>Register</button>
          </div>
        </div>
      )}

      {loggedInUsername && (
        <div>
          <p className="welcome-message">Welcome, {loggedInUsername}!</p>
        </div>
      )}

      <img src="meme-cat.png" alt="cat making face" className="rotate-image image1" />
      <img src="garagesale.png" alt="yard sale" className="rotate-image image2" />
      <img src="cat.png" alt="cat selfie" className="rotate-image image3" />
      <img src="shrubbery.png" alt="Knights who say ni" className="rotate-image image4" />
    </div>
  );
};

export default Home;
