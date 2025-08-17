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
    body: JSON.stringify({ taskText: text, completed: false }),
  })
  .then(() => {
    event.target.reset();
    loadTodos();
  })
  .catch((err) => console.error('Eklenemedi: ', err));
}

function handleTask(event, todo){
  event.preventDefault();

  const formData = new FormData(event.target);
  const action = formData.get("action");
  const completed = formData.get("completed") === "on";

  if(action === "delete"){
    fetch(URL+"/"+todo.id, {
      method: "DELETE",
    })
    .then(loadTodos)
    .catch((err) => console.error("Delete error:", err));
  return;
  }

  if (action === null){
    fetch(URL + "/" +todo.id, {
      method:"PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    })
    .then(loadTodos)
    .catch((err) => console.error("Edit error: ", err))
    return;
  }

  if(action === "edit"){

  }
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
            <form onSubmit={(event) => handleTask(event,todo)}>
              <input
                type="checkbox"
                name="completed"
                defaultChecked={todo.completed}
                onChange={(event) => event.target.form.requestSubmit()}
              />
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
