import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const Home = ({ scanItem, setScanItem}) => {
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

  useEffect(() => {
    console.log("scan item in home: ", scanItem);
  }, [scanItem]);

//function to upload and scan an item.
  const uploadAndScanItem = async () => {
    try {
      setLoading(true);
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (event) => {
        const file = event.target.files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Optional: observe state change events such as progress, pause, and resume
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error('Upload error:', error);
            setLoading(false);
          },
          () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { // Get the download URL of the uploaded file
            console.log('File available at', downloadURL); // Log the download URL
            setScanItem(downloadURL); // Set the scanItem to the download URL
            setLoading(false);
            navigate('/SearchResults'); // Navigate to the SearchResults page
          });
          }
        );
      };
      input.click();
    } catch (error) {
      console.error('Error scanning item:', error.message);
      setLoading(false);
    }
  };

    // Function to log in
  const logIn = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username: loginUsername,
        password: loginPassword,
      });

      if (response.status === 200) {
        setLoggedInUsername(loginUsername); 
        setIsLoggedIn(true); 
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        setShowLogin(false); // Hide login popup
        alert('Login successful!');
      } else {
        alert('Login failed. Invalid credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Error during login. Please try again.');
    }
  };

    // Function to log out
  const logOut = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    setLoggedInUsername(''); 
  };

    // Function to handle click on login button
  const handleLoginClick = () => {
    setShowLogin(true); //Show login popup
    setShowRegister(false); // Hide registration popup
  };

    // Function to handle click on register button
  const handleRegisterClick = () => {
    setShowRegister(true); // Show registration popup
    setShowLogin(false); // Hide login popup
  };

    // Function to register a new user
  const register = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/register', {
        username: registerUsername,
        password: registerPassword,
      });

      if (response.status === 200) {
        alert('Registration successful!');
        setShowRegister(false); // Hide registration popup
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
      <button onClick={uploadAndScanItem} disabled={loading}>
        {loading ? 'Scanning...' : 'Scan Item'}
      </button>

       {/* Button to view saved items if logged in */}
      {isLoggedIn && (
        <button onClick={() => navigate('/SavedItems')} className="view-saved-items-button">
          View Saved Items
        </button>
      )}
      <h2> 😬</h2>
      {/* Display message if not logged in */}
      {isLoggedIn ? null : <h3>Create an account to save your items!</h3>}
      {/* Button to logout if logged in, otherwise button to login */}
      {isLoggedIn ? (
        <button onClick={logOut}>Logout</button>
      ) : (
        <button onClick={handleLoginClick} id="logIn">
          Login
        </button>
      )}

      {/* Login popup */}
      {showLogin && (
        <div className="popup-container">
          <div className="popup">
            <p>Welcome Back!</p>
      {/* Input fields for username and password */}
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
          {/* Button to login */}
            <button onClick={logIn}>Login</button>
            <p>
              Don't have an account?{' '}
          {/* Button to register */}
             <button onClick={handleRegisterClick} className="link-button">
                Register
              </button>
            </p>
          </div>
        </div>
      )}

     {/* Registration popup */}
      {showRegister && (
        <div className="popup-container">
          <div className="popup">
            <p>Thanks for joining!</p>
    {/* Input fields for username and password */}
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
        {/* Button to register */}
            <button onClick={register}>Register</button>
          </div>
        </div>
      )}
        {/* Welcome message for logged-in user */}
      {loggedInUsername && (
        <div>
          <p className="welcome-message">Welcome, {loggedInUsername}!</p>
        </div>
      )}
      {/* Images */}
      <img src="meme-cat.png" alt="cat making face" className="rotate-image image1" />
      <img src="garagesale.png" alt="yard sale" className="rotate-image image2" />
      <img src="cat.png" alt="cat selfie" className="rotate-image image3" />
      <img src="shrubbery.png" alt="Knights who say ni" className="rotate-image image4" />
    </div>
  );
};

export default Home;
