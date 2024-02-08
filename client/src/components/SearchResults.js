import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const SearchResults = ({ mainImage, searchResults }) => {
  return (
    <Container fluid>
      <Row>
        {/* Main Image */}
        <Col lg={6} md={12}>
          <img src={mainImage} alt="your scanned item" className="img-fluid" />
        </Col>

        {/* Search Results */}
        <Col lg={6} md={12}>
          <Row>
            {searchResults.map((result, index) => (
              <Col lg={4} md={6} sm={12} key={index}>
                <Card>
                  <Card.Img variant="top" src={result.image} />
                  <Card.Body>
                    <Card.Title>{result.title}</Card.Title>
                    <Card.Text>{result.description}</Card.Text>
                    <Card.Text>Price: {result.price}</Card.Text>
                    <Card.Link href={result.website}>Visit Website</Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchResults;
