import React, { useState } from 'react';
import { getCookie } from '../utils';

const API_URL = 'http://localhost:3000';

export default function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = getCookie('authToken');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      setTitle('');
      setDescription('');
      onAdd();
    } catch {
      alert('Failed to add todo');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Todo</h2>
      <p>
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </p>
      <p>
        <button type="submit">Add Todo</button>
      </p>
    </form>
  );
}
