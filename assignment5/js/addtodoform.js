// js/addtodoform.js
const React = window.React;
import { getCookie } from './utils.js';

export function AddTodoForm({ onAdd }) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const token = getCookie('authToken');
  const API_URL = 'http://localhost:3000';

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
      onAdd(); // refresh the todo list
    } catch {
      alert('Failed to add todo');
    }
  }

  return React.createElement('form', { onSubmit: handleSubmit }, [
    React.createElement('h2', { key: 'label' }, 'Add New Todo'),
    React.createElement('p', { key: 'input1' },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Title',
        required: true,
        value: title,
        onChange: e => setTitle(e.target.value)
      })
    ),
    React.createElement('p', { key: 'input2' },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Description',
        required: true,
        value: description,
        onChange: e => setDescription(e.target.value)
      })
    ),
    React.createElement('p', { key: 'button' },
      React.createElement('button', { type: 'submit' }, 'Add Todo')
    )
  ]);
}
