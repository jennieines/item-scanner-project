import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SavedItems from './components/SavedItems';
import SearchResults from './components/SearchResults';
import './styles.css';

function App() {
  const [scanItem, setScanItem] = useState("");
  const [savedItems, setSavedItems] = useState([]);

  const handleSaveItems = (items) => { // Function to handle saving items
    console.log('Saving items:', items); // Log the items being saved
    setSavedItems(items); // Update the saved items state
  };

  return (
    <Router> {/* Router component for managing navigation */}
      <div>
        <Routes> 
          <Route // Route for rendering Home component
            path="/"
            element={<Home scanItem={scanItem} setScanItem={setScanItem} />}
          />
          <Route // Route for rendering SavedItems component
            path="/SavedItems"
            element={<SavedItems initialItems={savedItems} />}
          />
          <Route // Route for rendering SearchResults component
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
