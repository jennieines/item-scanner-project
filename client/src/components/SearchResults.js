import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const SearchResults = ({ scanItem, searchResults, onImageUpload }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [scanItemURL, setScanItemURL] = useState(null); // State to hold the URL of the scanned item image

  useEffect(() => {
    if (scanItem) {
      // Convert the File object to a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setScanItemURL(reader.result);
      };
      reader.readAsDataURL(scanItem);
    }
  }, [scanItem]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    onImageUpload(file);
  };

  const handleSelectItem = (index) => {
    const selectedItem = searchResults[index];
    const isSelected = selectedItems.find(item => item === selectedItem);

    if (isSelected) {
      // Deselect the item
      setSelectedItems(selectedItems.filter(item => item !== selectedItem));
    } else {
      // Select the item
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  const handleConfirmSave = () => {
    // Logic to save the selected items
    setSaving(true);
    setTimeout(() => {
      // Simulate saving items (replace with actual API call or state update)
      alert('Items saved successfully!');
      setSaving(false);
      setSelectedItems([]);
    }, 2000);
  };

  return (
    <Container fluid>
      <h1>SEARCH RESULTS</h1>
      <div className="grid-container">
        {/* Main Image */}
        <div className="main-image">
          {scanItemURL ? (
            <img src={scanItemURL} alt="Your scanned item" className="img-fluid" style={{ width: '50%', height: 'auto' }} />
          ) : (
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          )}
        </div>

        {/* Search Results */}
        <div className="boxes">
          {searchResults.map((result, index) => (
            <div key={index} className={`box ${selectedItems.includes(result) ? 'selected' : ''}`} onClick={() => handleSelectItem(index)}>
              <Card style={{ height: '100%' }}>
                <Card.Img variant="top" src={result.image} />
                <Card.Body>
                  <Card.Title>{result.title}</Card.Title>
                  <Card.Text>{result.description}</Card.Text>
                  <Card.Text>Price: {result.price}</Card.Text>
                  <Card.Link href={result.website}>Visit Website</Card.Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      {/* Save Button */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button onClick={handleConfirmSave} disabled={selectedItems.length === 0}>Save</Button>
      </div>

      {/* Loading indicator while saving */}
      {saving && <p style={{ textAlign: 'center' }}>Saving items...</p>}
    </Container>
  );
};

export default SearchResults;
