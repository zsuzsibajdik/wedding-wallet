import { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const BASE_URL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/';

export default function TodoList() {
  const [todos, setTodos] = useState([]);


  const [filterStatus, setFilterStatus] = useState("all");
  const [searchText, setSearchText] = useState("");

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

  function handleSave(title, details) {
    const newTodo = { title, details, done: false, inProgress: false };
    fetch(`${BASE_URL}todos.json`, {
      method: "POST",
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then(data => {
        setTodos(prev => [...prev, { id: data.name, ...newTodo }]);
      });
  }

  function handleUpdate(id, title, details, done, inProgress) {
    fetch(`${BASE_URL}todos/${id}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, details, done, inProgress })
    })
      .then(() => {
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? { ...todo, title, details, done, inProgress } : todo
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


  const filteredTodos = todos.filter(todo => {
    if (filterStatus === "done" && !todo.done) 
      return false;
    if (filterStatus === "inProgress" && !todo.inProgress) 
      return false;


    const q = searchText.trim().toLowerCase();
    if (q) {
      const inTitle = (todo.title || "").toLowerCase().includes(q);
      const inDetails = (todo.details || "").toLowerCase().includes(q);
      if (!inTitle && !inDetails) return false;
    }

    return true;
  });

  return (
    <div className="vendors">
      <h2>Todos</h2>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="inProgress">In Progress</option>
        </select>

        <input
          placeholder="Search title/details..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button type="button" onClick={() => { setFilterStatus("all"); setSearchText(""); }}>
          Reset
        </button>
      </div>

      <TodoForm onSave={handleSave} />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(filteredTodos).map(todo => (
            <Todo
              key={todo.id}
              {...todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
          {filteredTodos.length === 0 && (
            <tr>
              <td colSpan="3" style={{ opacity: 0.7 }}>No todos match your filters.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}