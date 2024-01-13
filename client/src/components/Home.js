import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [scannedItems, setScannedItems] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          setScannedItems(response.data);
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
      //const response = await axios.post('/api/auth/login', { username, password });
      // Handle successful login, e.g., store the token in state or local storage
      setShowLogin(false); // Close the login form after successful login
      //console.log('You are in!', response.data);
      alert('You are in!')
    } catch (error) {
      console.error('Oh no.. your login.. its broken', error.message);
    }
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const Register = async () => {
    try {
      // Your registration logic
      // This could be similar to the login logic, sending a request to register a new user
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };
  
  return (
    <div>
      <h1>Welcome! Try Scanning Something!! :3</h1>
      <p>DO IT NOW... please</p>
      <button onClick={scanItem} disabled={loading}>
        {loading ? 'Scanning...' : 'Scan Item'}
      </button>
      {/* Display scanned items */}
      <ul>
        {scannedItems.map((item) => (
          <li key={item.id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
      <h2>Like what you see? Save it!</h2>
      <p>You know you want too..</p>
      <button onClick={handleLoginClick} id="logIn">Login</button>
      <button onClick={() => setShowRegister(true)} id="register">Register</button>

{/* Render the login form when showLogin is true */}
{showLogin && (
  <div>
    <h2>Welcome Back!</h2>
    <p>I missed you</p>
    <p>call me?</p>
    <label>
      Username:
      <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
    </label>
    <label>
      Password:
      <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button onClick={Register}>Register</button>
</div>
)}
</div>
);
};

export default Home;
