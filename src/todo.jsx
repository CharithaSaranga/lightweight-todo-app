import React, { useState } from "react";
import "./styles.css";

function generateId() {
  return Math.floor(Math.random() * 1000);
}

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [filter, setFilter] = useState("all"); // Filter for completed, active, or all tasks

  const handleSubmit = () => {
    if (input.trim() !== "") {
      setTodos((todos) =>
        todos.concat({
          id: generateId(),
          text: input,
          priority,
          dueDate,
          notes,
          subtasks,
          completed: false,
        })
      );
      setInput("");
      setPriority("medium");
      setDueDate("");
      setNotes("");
      setSubtasks([]);
    }
  };

  const removeTodo = (id) => {
    setTodos((todos) => todos.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((todos) =>
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const resetTodos = () => {
    setTodos([]);
  };

  const filterTodos = () => {
    if (filter === "all") return todos;
    if (filter === "completed") return todos.filter((t) => t.completed);
    if (filter === "active") return todos.filter((t) => !t.completed);
    return todos;
  };

  return (
    <div className="container">
      <h1>LightWeight Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New Todo"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          placeholder="Due Date"
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
        />
        <button onClick={handleSubmit}>Add Todo</button>
      </div>
      <div className="filter-container">
        <label>Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
        <button onClick={resetTodos} className="reset-button">
          Reset
        </button>
      </div>
      <ul className="todos-list">
        {filterTodos().map(
          ({ id, text, priority, dueDate, notes, completed }) => (
            <li className={`todo ${completed ? "completed" : ""}`} key={id}>
              <div className="todo-header">
                <span>{text}</span>
                <span className={`priority ${priority}`}>{priority}</span>
              </div>
              {dueDate && <span className="due-date">Due: {dueDate}</span>}
              {notes && <div className="note">Note: {notes}</div>}
              <div className="todo-actions">
                <button className="complete" onClick={() => toggleComplete(id)}>
                  {completed ? "Undo" : "Complete"}
                </button>
                <button className="close" onClick={() => removeTodo(id)}>
                  X
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Todo;
