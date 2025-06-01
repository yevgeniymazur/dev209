import React, { useState } from 'react';
import Header from './components/Header';
import LogoutButton from './components/LogoutButton';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

export default function App() {
  const [reload, setReload] = useState(false);
  const toggleReload = () => setReload(prev => !prev);

  return (
    <div id="page">
      <Header />
      <LogoutButton />
      <AddTodoForm onAdd={toggleReload} />
      <TodoList reload={reload} />
    </div>
  );
}
