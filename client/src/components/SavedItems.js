import React, { useState } from 'react';
import './styles.css';


const SavedItems = () => {
  const [savedItems, setSavedItems] = useState([]);

  // Function to handle saving items
  const saveItem = (item) => {
    setSavedItems((prevItems) => [...prevItems, item]);
  };

  // Function to handle deleting items
  const deleteItem = (itemId) => {
    setSavedItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Example usage of saveItem function
  const handleSave = () => {
    const newItem = { id: 1, name: 'New Item', price: 9.99 }; // Replace with actual item data
    saveItem(newItem);
  };

  return (
    <div>
      <h2>Saved Items</h2>
      <button onClick={handleSave}>Save Item</button>
      {/* Display saved items */}
      <ul>
        {savedItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedItems;
