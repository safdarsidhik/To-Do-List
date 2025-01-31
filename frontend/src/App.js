import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Fetch items from backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  // Add a new item
  const addItem = () => {
    if (newItem.trim() === '') return;

    axios
      .post('http://localhost:5000/api/items', { name: newItem })
      .then(response => {
        setItems([...items, response.data]);
        setNewItem('');
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
  };

  // Delete an item
  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:5000/api/items/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>To-Do-List</h1>
      <input
        type="text"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
        placeholder="Add a new item"
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button onClick={addItem} style={{ padding: '5px 10px' }}>
        Add
      </button>
      <ul>
        {items.map(item => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>{item.name}</span>
            <button
              onClick={() => deleteItem(item.id)}
              style={{
                padding: '5px',
                backgroundColor: 'red',
                color: 'white',
                border: '5px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
