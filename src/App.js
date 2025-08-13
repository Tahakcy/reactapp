import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Product from './product.js';
const URL = 'http://localhost:5000/todoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    function loadTodos() {
      fetch(URL)
      .then(res => res.json())
      .then(todos => setTodos(todos));
    } 
    loadTodos();
  }, []);

    return (
      <div>
        <h1>To-do App</h1> 
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input type='checkbox' checked={todo.completed}/>
              {todo.task}
            </li>
          ))}
        </ul>
      </div>
    );
}

export default App;
