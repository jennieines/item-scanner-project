import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SavedItems from './components/SavedItems';
import SearchResults from './components/SearchResults';
import './styles.css';

function App() {
  //scanItem will ultimately store the URL to our hosted image
  const [scanItem, setScanItem] = useState("");

  const handleImageUpload = (imageData) => {
    setScanItem(imageData);
  };

  const handleSaveItems = (items) => {
    console.log('Saving items:', items);
  };

  useEffect(() => {
    console.log("scanItem has changed to: ", scanItem);
  }, [scanItem]);
  // Sample data for search results
  // const searchResults = [
  //   { image: 'path_to_image_1.jpg', title: 'Result 1', description: 'Description 1', price: '$10', website: 'https://example.com' },
  //   { image: 'path_to_image_2.jpg', title: 'Result 2', description: 'Description 2', price: '$20', website: 'https://example.com' },
  //   { image: 'path_to_image_3.jpg', title: 'Result 3', description: 'Description 3', price: '$15', website: 'https://example.com' },
  //   { image: 'path_to_image_4.jpg', title: 'Result 4', description: 'Description 4', price: '$12', website: 'https://example.com' },
  //   { image: 'path_to_image_5.jpg', title: 'Result 5', description: 'Description 5', price: '$100', website: 'https://example.com' },
  //   { image: 'path_to_image_6.jpg', title: 'Result 6', description: 'Description 6', price: '$23', website: 'https://example.com' },
  //   { image: 'path_to_image_7.jpg', title: 'Result 7', description: 'Description 7', price: '$46', website: 'https://example.com' },
  //   { image: 'path_to_image_8.jpg', title: 'Result 8', description: 'Description 8', price: '$54', website: 'https://example.com' },
  //   { image: 'path_to_image_9.jpg', title: 'Result 9', description: 'Description 9', price: '$67', website: 'https://example.com' }
  // ];

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home scanItem={scanItem} setScanItem={setScanItem} />} />
          <Route path="/SavedItems" element={<SavedItems />} />
          <Route
            path="/SearchResults"
            element={
              <SearchResults
                scanItem={scanItem}
                onSaveItems={handleSaveItems} 
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;