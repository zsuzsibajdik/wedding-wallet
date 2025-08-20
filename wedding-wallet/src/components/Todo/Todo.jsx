import { useState } from "react";
import TodoForm from "./TodoForm";

export default function Todo({ id, text, done, inProgress, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="todo-item">
      {editing ? (
        <TodoForm
          initialText={text}
          onSave={(newText) => {
            onUpdate(id, newText, done, inProgress);
            setEditing(false);
          }}
        />
      ) : (
        <>
          <span
            style={{
              textDecoration: done ? "line-through" : inProgress ? "underline" : "none",
            }}
          >
            {text}
          </span>
          <button onClick={() => setEditing(!editing)}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>
          <button onClick={() => onUpdate(id, text, !done, inProgress)}>
            {done ? "Undo" : "Done"}
          </button>
          <button onClick={() => onUpdate(id, text, done ? !done : done, !inProgress)}>
            {inProgress && !done ? "Remove In Progress" : "Set In Progress"}
          </button>
        </>
      )}
    </div>
  );
}
