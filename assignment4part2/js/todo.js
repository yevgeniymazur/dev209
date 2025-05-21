// js/todo.js

const API_URL = 'http://localhost:3000';
const authToken = getCookie('authToken');

// Redirect to login if no token
if (!authToken) {
  window.location.href = 'index.html';
}

// DOM elements
const todoList = document.getElementById('todoList');
const todoForm = document.getElementById('todoForm');

// Load todos on page load
window.addEventListener('DOMContentLoaded', loadTodos);

// Form submit → create new todo
if (todoForm) {
  todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();

    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error('Failed to add todo');
      todoForm.reset();
      loadTodos(); // reload list
    } catch (err) {
      showError();
    }
  });
}

// Load all todos for this user
async function loadTodos() {
  todoList.innerHTML = '';
  try {
    const res = await fetch(`${API_URL}/todos`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch todos');

    const todos = await res.json();
    todos.forEach(todo => renderTodo(todo));
  } catch (err) {
    showError();
  }
}

// Render a single todo
function renderTodo(todo) {
  const li = document.createElement('li');
  li.className = 'todo-item';

  const text = document.createElement('div');
  text.className = 'todo-text';
  text.textContent = `${todo.title} - ${todo.description}`;

  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'button-group';

  // COMPLETE / UNDO
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = todo.completed ? 'Undo' : 'Complete';
  toggleBtn.classList.add('complete');
  toggleBtn.addEventListener('click', () => toggleComplete(todo));
  buttonGroup.appendChild(toggleBtn);

  // EDIT
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit');
  editBtn.addEventListener('click', () => editTodoPrompt(todo));
  buttonGroup.appendChild(editBtn);

  // DELETE
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete');
  deleteBtn.addEventListener('click', () => deleteTodo(todo.id)); // ✅ FIXED
  buttonGroup.appendChild(deleteBtn);

  li.appendChild(text);
  li.appendChild(buttonGroup);
  todoList.appendChild(li);
}

async function toggleComplete(todo) {
  try {
    await fetch(`${API_URL}/todos/${todo.id}`, { // ✅ FIXED
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    loadTodos();
  } catch (err) {
    showError();
  }
}

async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    loadTodos();
  } catch (err) {
    showError();
  }
}

function editTodoPrompt(todo) {
  const newTitle = prompt('Edit title:', todo.title);
  const newDesc = prompt('Edit description:', todo.description);
  if (newTitle !== null && newDesc !== null) {
    updateTodo(todo.id, newTitle.trim(), newDesc.trim(), todo.completed); // ✅ FIXED
  }
}

async function updateTodo(id, title, description, completed) {
  try {
    await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ title, description, completed }),
    });
    loadTodos();
  } catch (err) {
    showError();
  }
}

function showError() {
  const err = document.getElementById('todoError');
  if (err) err.style.display = 'block';
}
