import { useState } from "react";

export default function TodoForm({ onSave, initialText = "" }) {
  const [text, setText] = useState(initialText);

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim() === "") return;
    onSave(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New todo..."
      />
      <button type="submit">Save</button>
    </form>
  );
}
