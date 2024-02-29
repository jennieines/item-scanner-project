import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const SearchResults = ({ scanItem, searchResults, onImageUpload, onSaveItems }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [scanItemURL, setScanItemURL] = useState(null); // State to hold the URL of the scanned item image

  const fakeSearchResults = [
    {
      source: "Fake News Network",
      source_logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtIr33VxAQUpJFAceFeeavazsHj7-ePc7UQ&usqp=CAU",
      price: "$19.99",
      extracted_price: "$15.99",
      link: "https://fakeexample.com",
      snippet: "This is a snippet of fake news data."
    },
    {
      source: "Phony Times",
      source_logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtIr33VxAQUpJFAceFeeavazsHj7-ePc7UQ&usqp=CAU",
      price: "$29.99",
      extracted_price: "$24.99",
      link: "https://phonyexample.com",
      snippet: "This is a snippet of phony news data."
    },
    {
      source: "Fabricated Gazette",
      source_logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtIr33VxAQUpJFAceFeeavazsHj7-ePc7UQ&usqp=CAU",
      price: "$14.99",
      extracted_price: "$12.49",
      link: "https://fabricatedexample.com",
      snippet: "This is a snippet of fabricated news data."
    },
    {
      source: "Faux Journal",
      source_logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtIr33VxAQUpJFAceFeeavazsHj7-ePc7UQ&usqp=CAU",
      price: "$22.99",
      extracted_price: "$19.99",
      link: "https://fauxexample.com",
      snippet: "This is a snippet of faux news data."
    },
    {
      source: "Deceptive Digest",
      source_logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtIr33VxAQUpJFAceFeeavazsHj7-ePc7UQ&usqp=CAU",
      price: "$34.99",
      extracted_price: "$29.99",
      link: "https://deceptiveexample.com",
      snippet: "This is a snippet of deceptive news data."
    },
    {
      source: "Counterfeit Chronicle",
      source_logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtIr33VxAQUpJFAceFeeavazsHj7-ePc7UQ&usqp=CAU",
      price: "$39.99",
      extracted_price: "$34.99",
      link: "https://counterfeitexample.com",
      snippet: "This is a snippet of counterfeit news data."
    }
  ];  
  
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
    const selectedItem = fakeSearchResults[index];
    const isSelected = selectedItems.find(item => item.source === selectedItem.source);
  
    if (isSelected) {
      // Deselect the item
      setSelectedItems(selectedItems.filter(item => item.source !== selectedItem.source));
    } else {
      // Select only the clicked item
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };
  
  const handleConfirmSave = () => {
    // Logic to save the selected items
    onSaveItems(selectedItems); // Call onSaveItems with selectedItems as parameter
    setSaving(true);
    setTimeout(() => {
      // Simulate saving items (replace with actual API call or state update)
      alert('Items saved successfully!');
      setSaving(false);
      setSelectedItems([]);
      // Pass selected items to onSaveItems function
      onSaveItems(selectedItems);
    }, 2000);
  };

  return (
    <Container fluid>
      {/* Navigation links */}
      <nav>
        <ul>
          <li>
            <Link to="/" style={{ color: 'white' }}>Home</Link>
          </li>
        </ul>
      </nav>
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
        {fakeSearchResults.map((result, index) => (
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
