import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
      <Row>
        {/* Main scanned image */}
        <Col xs={12} lg={6} className="text-center mb-4 mb-lg-0">
          {scanItem && (
            <img src={scanItem} alt="Your scanned item" className="img-fluid" />
          )}
        </Col>
        {/* Search results */}
        <Col xs={12} lg={6}>
          <Row className="search-results">
            {searchResults.map((result, index) => (
              <Col key={index} xs={12} sm={6} md={4} className="mb-3" onClick={() => handleSelectItem(index)}>
                <Card>
                  <Card.Img variant="top" src={result.thumbnail} />
                  <Card.Body>
                    <Card.Title>{result.source}</Card.Title>
                    <Card.Text>Price: {result.price}</Card.Text>
                    <Button variant="primary" href={result.link}>Visit Website</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <div className="mt-3 text-center">
        <Button onClick={handleConfirmSave} disabled={selectedItems.length === 0}>Save</Button>
      </div>
      {saving && <p className="text-center">Saving items...</p>}
    </Container>
  );
};

export default SearchResults;
