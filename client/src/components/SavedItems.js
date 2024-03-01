import React, { useState } from 'react';

const SavedItems = ({ initialItems = [] }) => {
  const [savedItems, setSavedItems] = useState(initialItems);

  const handleDelete = (itemId) => {
    setSavedItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const toggleSelected = (itemId) => {
    const updatedItems = savedItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    setSavedItems(updatedItems);
  };

  return (
    <div>
      <h4>Saved Items</h4>
      {savedItems.length === 0 ? (
        <p1>Oh no... there are no items saved yet 😕 </p1>
      ) : (
        <ul>
          {savedItems.map((item) => (
            <li key={item.id} style={{ outline: item.selected ? '2px solid blue' : 'none' }}>
              {item.name} - ${item.price}
              <button onClick={() => handleDelete(item.id)}>Delete</button>
              <button onClick={() => toggleSelected(item.id)}>Toggle Selection</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedItems;
