import { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const BASE_URL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/'

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}todos.json`)
      .then(res => res.json())
      .then(data => {
        const loaded = data
          ? Object.entries(data).map(([id, todo]) => ({ id, ...todo }))
          : [];
        setTodos(loaded);
      });
  }, []);

  function handleSave(title, details, dueDate) {
    const newTodo = { title, details, dueDate, done: false, inProgress: false };
    fetch(`${BASE_URL}todos.json`, {
      method: "POST",
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then(data => {
        setTodos(prev => [...prev, { id: data.name, ...newTodo }]);
      });
  }

  function handleUpdate(id, title, details, dueDate, done, inProgress) {
    fetch(`${BASE_URL}todos/${id}.json`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({ id, title, details, dueDate, done, inProgress })
    })
      .then(() => {
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? { ...todo, title, details, dueDate, done, inProgress } : todo
          )
        );
      });
  }

  function handleDelete(id) {
    fetch(`${BASE_URL}todos/${id}.json`, { method: "DELETE" })
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      });
  }

  return (
    <div className="vendors">
      <h2>Todos</h2>
      <TodoForm onSave={handleSave} />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Details</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <Todo
              key={todo.id}
              {...todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
