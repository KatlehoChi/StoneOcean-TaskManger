import React from "react";

function TaskCard({ task, onStatusChange, onDelete }) {
  return (
    <article className="task-card">
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      {task.deadline && (
        <p>Due {new Date(task.deadline).toLocaleDateString()}</p>
      )}
      <label>
        Status
        <select
          value={task.status}
          onChange={(event) => onStatusChange(task._id, event.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </label>
      <button type="button" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </article>
  );
}

export default TaskCard;
