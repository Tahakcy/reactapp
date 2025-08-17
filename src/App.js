import { useEffect, useState } from "react";

const URL = "http://localhost:5000/todoList";

export default function App() {
  const [todos, setTodos] = useState([]);

function loadTodos() {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => setTodos(data))
    .catch((err) => console.error("Görevler yüklenemedi:", err));
}

  useEffect(() => {
    loadTodos();
  }, []);

function handleAdd(event){
  event.preventDefault();

  const formData = new FormData(event.target);
  const taskText = (formData.get("taskInput") || "").toString().trim();

  if(!taskText) return;

  fetch(URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ task: text, completed: false }),
  })
  .then(() => {
    event.target.reset();
    loadTodos();
  })
  .catch((err) => console.error('Eklenemedi: ', err));
}

  return (
    <div>
      <h1>Todo App</h1><hr></hr>
      
       <form onSubmit={handleAdd}>
        <input type="text" name="taskInput" placeholder="Add new task..."/>
        <button type="submit">Add</button>
       </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <form>
              <input type="checkbox" checked={todo.completed}/>
              <span>{todo.task}</span>
              <button type="submit" name="action" value="edit">Edit</button>
              <button type="submit" name="action" value="delete">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
