import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const SearchResults = ({ scanItem, searchResults, onImageUpload }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      onImageUpload(reader.result);
    };

    reader.readAsDataURL(file);
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
      <div className="grid-container">
        {/* Main Image */}
        <div className="main-image">
          {scanItem ? (
            <img src={scanItem} alt="Your scanned item" className="img-fluid" style={{ width: '50%', height: 'auto' }} />
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
      
      {/* Button to start saving */}
      {selectedItems.length > 0 && !saving && (
        <Button onClick={handleConfirmSave}>Confirm Save</Button>
      )}

      {/* Loading indicator while saving */}
      {saving && <p>Saving items...</p>}
    </Container>
  );
};

export default SearchResults;
