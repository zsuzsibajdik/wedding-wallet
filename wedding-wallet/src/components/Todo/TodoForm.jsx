import { useState } from "react";

export default function TodoForm({ onSave, initialText = "",initialDetails = "" }) {
  const [title, setTitle] = useState(initialText);
  const [details, setDetails] = useState(initialDetails)

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "" || details.trim() === "") return;
    onSave(title, details);
    setTitle("");
    setDetails("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New todo..."
      />
      <input
        value={details}
        onChange={e => setDetails(e.target.value)}
        placeholder="Details..."
      />
      <button type="submit">Save</button>
    </form>
  );
}
