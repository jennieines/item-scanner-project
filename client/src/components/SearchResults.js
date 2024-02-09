import React from 'react';
import { Container, Card } from 'react-bootstrap';

const SearchResults = ({ mainImage, searchResults, onImageUpload }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      onImageUpload(reader.result);
    };

    reader.readAsDataURL(file);
  };

  console.log('Number of search results:', searchResults.length); // Add this line

  return (
    <Container fluid>
      <div className="grid-container">
        {/* Main Image */}
        <div className="main-image">
          {mainImage ? (
            <img src={mainImage} alt="Your scanned item" className="img-fluid" style={{ width: '50%', height: 'auto' }} />
          ) : (
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          )}
        </div>

        {/* Search Results */}
        <div className="boxes">
          {searchResults.slice(0, 9).map((result, index) => (
            <div key={index} className="box">
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
          {/* Add empty boxes to fill up the grid */}
          {Array.from({ length: 9 - searchResults.length }, (_, index) => (
            <div key={`empty-${index}`} className="empty-box"></div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default SearchResults;
