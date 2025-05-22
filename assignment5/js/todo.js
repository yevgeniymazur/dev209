// js/todo.js (React entry point)
const React = window.React;
const ReactDOM = window.ReactDOM;

import { Header } from './header.js';
import { LogoutButton } from './logoutbutton.js';
import { AddTodoForm } from './addtodoform.js';
import { TodoList } from './todolist.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const [reload, setReload] = React.useState(false);
  const toggleReload = () => setReload(prev => !prev);

  return React.createElement('div', { id: 'page' }, [
    React.createElement(Header, { key: 'header' }),
    React.createElement(LogoutButton, { key: 'logout' }),
    React.createElement(AddTodoForm, { key: 'form', onAdd: toggleReload }),
    React.createElement(TodoList, { key: 'list', reload })
  ]);
}

root.render(React.createElement(App));
