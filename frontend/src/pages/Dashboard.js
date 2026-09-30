import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskBoard from "../components/TaskBoard";

const baseUrl = "http://localhost:5000/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "To Do",
    deadline: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: token },
  });

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const loadTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Unable to load tasks");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await api.post("/tasks", form);
      setTasks((prev) => [...prev, res.data]);
      setForm({ title: "", description: "", status: "To Do", deadline: "" });
      setMessage("Task created successfully.");
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to create task");
    }
  };

  const handleStatusChange = async (id, status) => {
    setError("");
    try {
      const res = await api.put(`/tasks/${id}`, { status });
      setTasks((prev) => prev.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to update task status");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to delete task");
    }
  };

  if (!token) {
    return (
      <div className="page page-dashboard">
        <h1>Dashboard</h1>
        <p>Please log in to see your tasks.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page page-dashboard">
        <h1>Dashboard</h1>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="page page-dashboard">
      <h1>Your Task Dashboard</h1>
      <div className="task-form">
        <h2>Create a new task</h2>
        {error && <p className="form-error">{error}</p>}
        {message && <p className="form-success">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <label>
            Status
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </label>
          <label>
            Deadline
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Create Task</button>
        </form>
      </div>

      <TaskBoard tasks={tasks} onStatusChange={handleStatusChange} onDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;
