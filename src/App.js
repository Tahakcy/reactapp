import { useEffect, useState } from "react";

const URL = "http://localhost:3000/todoList";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Görevler yüklenemedi:", err));
  }, []);

  return (
    <div>
      <h1>Todo App</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed}/>
            <span>{todo.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
