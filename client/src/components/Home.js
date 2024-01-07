import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [scannedItems, setScannedItems] = useState([]);

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

  return (
    <div>
      <p>Welcome! Try Scanning Something!! :3</p>
      <h2>Home Page</h2>
      <button onClick={scanItem} disabled={loading}>
        {loading ? 'Scanning...' : 'Scan Item'}
      </button>
      {/* Display scanned items */}
      <ul>
        {scannedItems.map((item) => (
          <li key={item.id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
