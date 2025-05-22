
// js/todolist.js
const React = window.React;
import { getCookie } from './utils.js';

export function TodoList({ reload }) {
  const [todos, setTodos] = React.useState([]);
  const token = getCookie('authToken');
  const API_URL = 'http://localhost:3000';

  React.useEffect(() => {
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

  async function toggleComplete(todo) {
    await fetch(`${API_URL}/todos/${todo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    loadTodos();
  }

  async function deleteTodo(id) {
    await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    loadTodos();
  }

  async function editTodo(todo) {
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
  }

  return React.createElement('div', null, [
    React.createElement('h2', { key: 'h2' }, 'Your Todos'),
    React.createElement('ul', { id: 'todoList', key: 'ul' },
      todos.map(todo =>
        React.createElement('li', {
          className: 'todo-item',
          key: todo._id
        }, [
          React.createElement('div', { className: 'todo-text', key: 'text' }, `${todo.title} - ${todo.description}`),
          React.createElement('div', { className: 'button-group', key: 'btns' }, [
            React.createElement('button', {
              className: 'complete',
              key: 'complete',
              onClick: () => toggleComplete(todo)
            }, todo.completed ? 'Undo' : 'Complete'),
            React.createElement('button', {
              className: 'edit',
              key: 'edit',
              onClick: () => editTodo(todo)
            }, 'Edit'),
            React.createElement('button', {
              className: 'delete',
              key: 'delete',
              onClick: () => deleteTodo(todo._id)
            }, 'Delete')
          ])
        ])
      )
    )
  ]);
}
