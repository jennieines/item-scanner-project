import React, { useState } from 'react';
import '../styles.css';

const SavedItems = ({ initialItems = [] }) => {
  const [savedItems, setSavedItems] = useState(initialItems);

  const handleToggleSelected = (itemId) => {
    setSavedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleDeleteSelected = () => {
    setSavedItems((prevItems) => prevItems.filter((item) => !item.selected));
  };

  return (
    <div>
      <h4>Saved Items</h4>
      {savedItems.length === 0 ? (
        <p1>Oh no... there are no items saved yet 😕 </p1>
      ) : (
        <div>
          <ul>
            {savedItems.map((item) => (
              <li
                key={item.id}
                className={`item ${item.selected ? 'selected' : ''}`}
                onClick={() => handleToggleSelected(item.id)}
              >
                {item.name} - <span style={{ color: 'blue' }}>${item.price}</span>
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
