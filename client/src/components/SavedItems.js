import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../styles.css';

const SavedItems = ({ initialItems = [] }) => {
  const [savedItems, setSavedItems] = useState(initialItems);

    // Function to toggle the selected status of an item
  const handleToggleSelected = (itemId) => {
    setSavedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

    // Function to delete selected items
  const handleDeleteSelected = () => {
    setSavedItems((prevItems) => prevItems.filter((item) => !item.selected));
  };

  return (
    <div>
      <h4>Saved Items</h4>
      {savedItems.length === 0 ? ( // Checking if there are no saved items
        <p1>Oh no... there are no items saved yet 😕 </p1>
      ) : (
        <div>
          <ul>
            {savedItems.map((item) => ( // Mapping over savedItems array to display each saved item
              <li
                key={item.id}
                className={`item ${item.selected ? 'selected' : ''}`}
                onClick={() => handleToggleSelected(item.id)}
              >
              <img src={item.thumbnail} alt={item.source} /> {/* Display the image */}
                <div className="info">
                  <div className="title" style={{ color: 'blue' }}>{item.source}</div> {/* Make the title blue */}
                  <div className="price" style={{ color: 'blue' }}>Price: {item.price}</div> {/* Make the price blue */}
                  <Button variant="primary" href={item.link}>Visit Website</Button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
      )}
    </div>
  );
};

export default SavedItems;

// The SavedItems component will receive the list of saved items,
// including their names, prices, and image URLs, 
// from the SearchResults component. 
// When you click on the "Save" button in the SearchResults page,
// it triggers the handleSaveItems function, 
// which updates the savedItems state in the App component. 
// Then, the SavedItems component, 
// which is rendered when you navigate to the "/SavedItems"
// route, receives this updated list of saved items as props 
// and displays them, including the images.
