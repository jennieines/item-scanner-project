import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [scannedItems, setScannedItems] = useState([]);

  const scanItem = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/items/scan');
      setScannedItems(response.data);
    } catch (error) {
      console.error('Error scanning item:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
