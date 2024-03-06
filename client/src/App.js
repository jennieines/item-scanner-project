import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SavedItems from './components/SavedItems';
import SearchResults from './components/SearchResults';
import './styles.css';

function App() {
  const [scanItem, setScanItem] = useState("");
  const [savedItems, setSavedItems] = useState([]);

  const handleSaveItems = (items) => {
    console.log('Saving items:', items);
    setSavedItems(items);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home scanItem={scanItem} setScanItem={setScanItem} />}
          />
          <Route
            path="/SavedItems"
            element={<SavedItems initialItems={savedItems} />}
          />
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
