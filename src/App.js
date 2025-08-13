import { useEffect, useState } from 'react';
import './App.css';
const URL = 'http://localhost:5000/todoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    loadTodos();
  })

  const loadTodos = () => {
    fetch(URL)
    .then(res => res.json())
    .then(data => setTodos(data));
  };

  const handleAddTodo = ()  => {
    if(!inputValue.trim()){
      alert('Boş görev eklenemez!');
      return;
    }
  } 

  fetch(URL, {
    method: 'POST',
    headers: {'Conten-Type':'application/json'},
    body: JSON.stringify({task:inputValue, completed:false})
  })
  .then(() => {
    setInputValue('');
    loadTodos();
  });

  const handleToggleComplete = (id, task, completed) => {
    fetch(URL+'/'+id, {
      method:'PUT',
      headers: {'Conten-Type':'application/json'},
      body: JSON.stringify({
        task:todo.task,
        completed:checkbox.checked
      })
    })
    .then(() => loadTodos())
  }
  
  const handleDeleteTodon = (id) => {
    fetch(URL+'/'+id, {
      method:'DELETE'
    })
    .then(() => loadTodos())
  }
} 

    return (
      <div>
        <h1>To-do App</h1> 
        <ul>
            <li>
            </li> 
        </ul>
      </div>
    );


export default App;
