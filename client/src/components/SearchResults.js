import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../styles.css';

const SearchResults = ({ scanItem, onSaveItems }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (scanItem) {
        try {
          const response = await fetch(`/items/scan?url=${encodeURIComponent(scanItem)}`);
          if (response.ok) {
            const data = await response.json();
            setSearchResults(data);
          } else {
            console.error('Failed to fetch search results:', response.status);
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };

    fetchSearchResults();
  }, [scanItem]);

  const handleSelectItem = (index) => {
    const selectedItem = searchResults[index];
    const isSelected = selectedItems.find(item => item.source === selectedItem.source);

    if (isSelected) {
      setSelectedItems(selectedItems.filter(item => item.source !== selectedItem.source));
    } else {
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  const handleConfirmSave = () => {
    onSaveItems(selectedItems);
    setSaving(true);
    setTimeout(() => {
      alert('Items saved successfully!');
      setSaving(false);
      setSelectedItems([]);
    }, 2000);
  };

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link to="/" style={{ color: 'white' }}>Home</Link>
          </li>
        </ul>
      </nav>
      <h1>SEARCH RESULTS</h1>
      <div className="search-results-container">
        <div className="main-image">
          {scanItem && <img src={scanItem} alt="Your scanned item" className="img-fluid mb-8" />}
        </div>
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div key={index} className={`search-result ${selectedItems.find(item => item.source === result.source) ? 'selected' : ''}`} onClick={() => handleSelectItem(index)}>
              <img src={result.thumbnail} alt={result.source} />
              <div className="info">
                <div className="title">{result.source}</div>
                <div className="price">Price: {result.price}</div>
                <Button variant="primary" href={result.link}>Visit Website</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 text-center">
        <Button onClick={handleConfirmSave} disabled={selectedItems.length === 0 || saving}>Save</Button>
      </div>
      {saving && <p className="text-center">Saving items...</p>}
    </div>
  );
};

export default SearchResults;
