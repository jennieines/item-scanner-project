// src/components/Home.js

import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [scannedItems, setScannedItems] = useState([]);

  // Function to handle item scanning
  const scanItem = async () => {
    try {
      // Update with the correct server URL and endpoint
      const response = await axios.get('http://localhost:3001/items/scan');
      setScannedItems(response.data);
    } catch (error) {
      console.error('Error scanning item:', error.message);
    }
  };

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={scanItem}>Scan Item</button>
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
