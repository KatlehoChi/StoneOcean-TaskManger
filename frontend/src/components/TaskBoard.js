import React from "react";
import TaskCard from "./TaskCard";

const columns = ["To Do", "In Progress", "Done"];

function TaskBoard({ tasks, onStatusChange, onDelete }) {
  return (
    <section className="task-board" aria-label="Task board">
      {columns.map((status) => (
        <div className="task-column" key={status}>
          <h2>{status}</h2>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))}
        </div>
      ))}
    </section>
  );
}

export default TaskBoard;
