// src/components/SavedItems.js

import React, { useState } from 'react';

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

  return (
    <div>
      <h2>Saved Items</h2>
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
