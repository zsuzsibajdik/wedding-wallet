import { useState } from "react";
import TodoForm from "./TodoForm";

export default function Todo({ id, title, details, done, inProgress, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="todo-item">
      {editing ? (
        <TodoForm
          initialText={title}
          initialDetails={details}
          onSave={(newTitle) => {
            onUpdate(id, newTitle, done, inProgress);
            setEditing(false);
          }}
        />
      ) : (
        <>
          <span
            id="title"
            style={{
              textDecoration: done ? "line-through" : inProgress ? "underline" : "none",
            }}
          >
            {title}
          </span>
          <span
            id="details"
            style={{
              textDecoration: done ? "line-through" : inProgress ? "underline" : "none",
            }}
          >
            {details}
          </span>
          <button onClick={() => setEditing(!editing)}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>
          <button onClick={() => onUpdate(id, title, !done, inProgress)}>
            {done ? "Undo" : "Done"}
          </button>
          <button onClick={() => onUpdate(id, title, done ? !done : done, !inProgress)}>
            {inProgress && !done ? "Remove In Progress" : "Set In Progress"}
          </button>
        </>
      )}
    </div>
  );
}
