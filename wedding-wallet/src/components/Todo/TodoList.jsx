import { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const BASE_URL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/'

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/todos.json`)
      .then(res => res.json())
      .then(data => {
        const loaded = data
          ? Object.entries(data).map(([id, todo]) => ({ id, ...todo }))
          : [];
        setTodos(loaded);
        setLoading(false);
      });
  }, []);

  function handleSave(title, details) {
    const newTodo = {title, details, done: false, inProgress: false };
    fetch(`${BASE_URL}/todos.json`, {
      method: "POST",
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then(data => {
        setTodos(prev => [...prev, { id: data.name, ...newTodo }]);
      });
  }

  function handleUpdate(id, title, details, done, inProgress) {
    fetch(`${BASE_URL}/todos/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({id, title, details, done, inProgress })
    })
    .then(() => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, title, done, inProgress } : todo
            )
        );
    });
  }

  function handleDelete(id) {
    fetch(`${BASE_URL}/todos/${id}.json`, { method: "DELETE" })
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      });
  }

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <TodoForm onSave={handleSave} />
      {todos.map(todo => (
        <Todo
          key={todo.id}
          {...todo}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
