import React, { useEffect, useState } from 'react';
import { getCookie } from '../utils';
import TodoItem from './TodoItem';

const API_URL = 'http://localhost:3000';

export default function TodoList({ reload }) {
  const [todos, setTodos] = useState([]);
  const token = getCookie('authToken');

  useEffect(() => {
    loadTodos();
  }, [reload]);

  async function loadTodos() {
    try {
      const res = await fetch(`${API_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error();
      setTodos(data);
    } catch {
      setTodos([]);
    }
  }

  const handleToggle = async (todo) => {
    await fetch(`${API_URL}/todos/${todo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    });
    loadTodos();
  };

  const handleEdit = async (todo) => {
    const title = prompt('Edit title:', todo.title);
    const description = prompt('Edit description:', todo.description);
    if (!title || !description) return;
    await fetch(`${API_URL}/todos/${todo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, completed: todo.completed }),
    });
    loadTodos();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    loadTodos();
  };

  return (
    <div>
      <h2>Your Todos</h2>
      <ul id="todoList">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
