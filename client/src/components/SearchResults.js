import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const SearchResults = ({ scanItem, onSaveItems }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [searchResults, setSearchResults] = useState([1, 2, 3]);  
  

useEffect(() => {
  const fetchSearchResults = async () => {
    if (scanItem) {
      try {
        // Send a request to your server to fetch search results using scanItem URL
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
      // Simulate saving items (replace with actual API call or state update)
      alert('Items saved successfully!');
      setSaving(false);
      setSelectedItems([]);
      onSaveItems(selectedItems);
    }, 2000);
  };

  return (
    <Container fluid>
      <nav>
        <ul>
          <li>
            <Link to="/" style={{ color: 'white' }}>Home</Link>
          </li>
        </ul>
      </nav>
      <h1>SEARCH RESULTS</h1>
      <h3>scanItem: {scanItem}</h3>
      <div className="grid-container">
        <div className="main-image">
          {scanItem ? (
            <img src={scanItem} alt="Your scanned item" className="img-fluid" style={{ width: '50%', height: 'auto' }} />
          ) : null}
        </div>

        {/* Search Results */}
        <div className="boxes">
        {searchResults.map((result, index) => (
  <div key={index} className={`box ${selectedItems.find(item => item.source === result.source) ? 'selected' : ''}`} onClick={() => handleSelectItem(index)}>
    <Card style={{ height: '100%' }}>
      <Card.Img variant="top" src={result.source_logo} />
      <Card.Body>
        <Card.Title>{result.source}</Card.Title>
        <Card.Text>{result.snippet}</Card.Text>
        <Card.Text>Price: {result.price}</Card.Text>
        <Card.Link href={result.link}>Visit Website</Card.Link>
      </Card.Body>
    </Card>
  </div>
))}
        </div>
      </div>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button onClick={handleConfirmSave} disabled={selectedItems.length === 0}>Save</Button>
      </div>

      {saving && <p style={{ textAlign: 'center' }}>Saving items...</p>}
    </Container>
  );
};

export default SearchResults;
