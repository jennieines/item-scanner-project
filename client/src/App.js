import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SavedItems from './components/SavedItems';
import SearchResults from './components/SearchResults';
import './styles.css';

function App() {
  // Sample data for main image and search results
  const mainImage = 'path_to_main_image.jpg';
  const searchResults = [
    { image: 'path_to_image_1.jpg', title: 'Result 1', description: 'Description 1', price: '$10', website: 'https://example.com' },
    { image: 'path_to_image_2.jpg', title: 'Result 2', description: 'Description 2', price: '$20', website: 'https://example.com' },
    // Add more search results as needed
  ];

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SavedItems" element={<SavedItems />} />
          {/* Pass mainImage and searchResults as props to SearchResults component */}
          <Route path="/SearchResults" element={<SearchResults mainImage={mainImage} searchResults={searchResults} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
