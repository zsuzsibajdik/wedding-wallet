import TodoForm from "./TodoForm";

export default function Todo({ id, title, details, done, inProgress, onUpdate, onDelete }) {
  return (
    <tr key={id}>
      <td
        style={{
          textDecoration: done ? "line-through" : inProgress ? "underline" : "none",
        }}
      >
        {title}
      </td>
      <td
        style={{
          textDecoration: done ? "line-through" : inProgress ? "underline" : "none",
        }}
      >
        {details}
      </td>
      <td>
        <button className="todo-btn" onClick={() => onDelete(id)}>Delete</button>
        <button
          className="todo-btn"
          onClick={() => onUpdate(id, title, details, !done, inProgress)}
        >
          {done ? "Undo" : "Done"}
        </button>
        <button
          className="todo-btn"
          onClick={() => onUpdate(id, title, details, done ? !done : done, !inProgress)}
        >
          {inProgress && !done ? "Remove In Progress" : "Set In Progress"}
        </button>
      </td>
    </tr>
  );
}