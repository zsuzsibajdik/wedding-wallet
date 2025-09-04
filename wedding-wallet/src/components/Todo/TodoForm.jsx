import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TodoForm({ onSave, initialText = "", initialDetails = ""}) {
  const [title, setTitle] = useState(initialText);
  const [details, setDetails] = useState(initialDetails);
  const [dueDate, setDueDate] = useState(new Date())


  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "" || details.trim() === "") return;
    onSave(title, details, dueDate);
    setTitle("");
    setDetails("")
    setDueDate(Date())
  }

  return (
    <form key="todo-form" onSubmit={handleSubmit}>
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
      <DatePicker dateFormat="YYYY-MM-dd" selected={dueDate} onChange={(date) => {
        const convertedDate = new Date(date);
        setDueDate(convertedDate.toISOString());
      }} />
      <button type="submit">Save</button>
    </form>
  );
}
