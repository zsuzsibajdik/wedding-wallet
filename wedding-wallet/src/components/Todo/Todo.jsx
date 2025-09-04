import TodoForm from "./TodoForm";

export default function Todo({ id, title, details, dueDate, done, inProgress, onUpdate, onDelete }) {

  return (
        <tr key={id}>
            <td style={{
              textDecoration: done ? "line-through" : inProgress ? "underline" : "none",
            }}>
              {title}
            </td>
            <td style={{
              textDecoration: done ? "line-through" : inProgress ? "underline" : "none",
            }}>
              {details}
            </td>
            <td style={{
              textDecoration: done ? "line-through" : inProgress ? "underline" : "none",
            }}>
              {dueDate.slice(0, 10)}
            </td>
            <td>
              <button onClick={() => onDelete(id)}>Delete</button>
              <button onClick={() => onUpdate(id, title, details, dueDate, !done, inProgress)}>
                {done ? "Undo" : "Done"}
              </button>
              <button onClick={() => onUpdate(id, title, details, dueDate, done ? !done : done, !inProgress)}>
                {inProgress && !done ? "Remove In Progress" : "Set In Progress"}
              </button>
            </td>
          {!id && (
            <tr>
              <td colSpan="5">No todos yet.</td>
            </tr>
          )}
      </tr>
  );
}