import React, { useEffect, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import "./Todo.css";
  const todoData="todoData"
const TodoList = () => {
  const [tasks, setTasks] = useState(()=>{
    const tempData=localStorage.getItem(todoData)
    if (!tempData)return[]
    return JSON.parse(tempData) 
  }
  );
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleCompleted = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
useEffect(()=>{
  localStorage.setItem(todoData, JSON.stringify(tasks))
},[tasks])
  return (
    <div className="todo-container">
      <h2>☑️ To-Do List</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a new task..."
        className="todo-input"
      />
      <button onClick={addTask} className="todo-button">
        Add
      </button>

      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`todo-item ${task.completed ? "completed" : ""}`}
          >
            <span> {task.text}</span>
            <button>
              {" "}
              <FaCheck onClick={() => toggleCompleted(index)} />
            </button>
            <button>
              {" "}
              <FaTrash onClick={() => deleteTask(index)} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoList;
