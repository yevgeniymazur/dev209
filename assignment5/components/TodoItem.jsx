import React from 'react';

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  return (
    <li className="todo-item">
      <div className="todo-text">{todo.title} - {todo.description}</div>
      <div className="button-group">
        <button className="complete" onClick={() => onToggle(todo)}>
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button className="edit" onClick={() => onEdit(todo)}>Edit</button>
        <button className="delete" onClick={() => onDelete(todo._id)}>Delete</button>
      </div>
    </li>
  );
}
