import { useEffect, useState } from "react";

const URL = "http://localhost:5000/todoList";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [editID, setEditID] = useState(null);
  const [editTask, setEditTask] = useState("");

  function loadTodos() {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Görevler yüklenemedi:", err));
  }

  useEffect(() => {
    loadTodos();
  }, []);

  function handleAdd(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskText = (formData.get("taskInput") || "").toString().trim();
    if (!taskText) return;
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: taskText, completed: false }),
    })
      .then(() => {
        event.target.reset();
        loadTodos();
      })
      .catch((err) => console.error("Ekleme hatası:", err));
  }

  function handleDelete(todo) {
    fetch(URL + "/" + todo.id, { method: "DELETE" })
      .then(loadTodos)
      .catch((err) => console.error("Silme hatası:", err));
  }

  function handleToggle(todo) {
    fetch(URL + "/" + todo.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then(loadTodos)
      .catch((err) => console.error("Toggle hatası:", err));
  }

  function handleEdit(todo) {
    setEditID(todo.id);
    setEditTask(todo.task);
  }

  function handleCancel() {
    setEditID(null);
    setEditTask("");
  }

  function handleSave(todo) {
    const newTitle = editTask.trim();
    if (!newTitle) return;
    fetch(URL + "/" + todo.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    })
      .then(() => {
        setEditID(null);
        setEditTask("");
        loadTodos();
      })
      .catch((err) => console.error("Save hatası:", err));
  }

  return (
    <div>
      <h1>Todo App</h1>
      <hr />
      <form onSubmit={handleAdd}>
        <input type="text" name="taskInput" placeholder="Add new task..." />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editID === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={(event) => setEditTask(event.target.value)}
                />
                <button onClick={() => handleSave(todo)}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo)}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.task}
                </span>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
