import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 1. Import Axios
import TaskItem from './TaskItem';

const Dashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    text: '',
    priority: 'medium', // Default to lowercase to match DB
    date: ''
  });

  // Create an Axios instance for cleaner URLs
  const api = axios.create({
    baseURL: 'http://localhost:8080/api'
  });

  // 1. Fetch all tasks using Axios
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const activeTasksCount = tasks.filter((task) => task.status !== 'completed').length;

  // 2. Add Task via POST
  const handleAddTask = async (e) => {
    e.preventDefault();
    const { text, priority, date } = formData;

    if (!text.trim()) return;

    try {
      // Axios automatically handles JSON.stringify
      const response = await api.post('/tasks', {
        text: text,
        priority: priority.toLowerCase(), // FIX: Ensure lowercase for SQLite CHECK constraint
        date: date || "No Date",
        user_id: 1 
      });

      setTasks((prev) => [response.data, ...prev]);
      setFormData({ text: '', priority: 'medium', date: '' });
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
      alert("Error: " + (err.response?.data || "Could not add task"));
    }
  };

  // 3. Delete Task via DELETE
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // 4. Toggle Task status via PUT
  const toggleComplete = async (id) => {
    try {
      const response = await api.put(`/tasks/${id}`);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data : task))
      );
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-400 to-indigo-200 min-h-screen text-gray-800 pb-12 font-sans">
      <nav className="bg-gradient-to-br from-violet-200 to-pink-200 shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-display text-indigo-600 tracking-tight">Todo App</h1>
        <div className="flex items-center gap-6">
          <span className="text-gray-700 font-medium hidden sm:inline">
            Welcome, <span className="text-indigo-600">User</span>
          </span>
          <button
            onClick={onLogout}
            className="bg-white/50 hover:bg-white/80 px-4 py-1.5 rounded-full text-indigo-600 font-semibold transition-all border border-indigo-200 shadow-sm"
          >
            Log Out
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        <section className="bg-gradient-to-br from-violet-200 to-pink-200 shadow-xl rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleAddTask} className="flex flex-col gap-4">
            <input
              name="text"
              type="text"
              placeholder="What needs to be done?"
              className="w-full border-none px-4 py-3 text-lg rounded-xl shadow-inner focus:ring-2 focus:ring-indigo-400 outline-none bg-white/90"
              value={formData.text}
              onChange={handleInputChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                name="priority"
                className="border-none px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none bg-white/90"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>

              <input
                name="date"
                type="date"
                className="border-none px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none bg-white/90 text-gray-600"
                value={formData.date}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition-all font-bold shadow-lg hover:shadow-indigo-400/50 active:scale-95"
              >
                ADD TASK
              </button>
            </div>
          </form>
        </section>

        <section className="bg-white/40 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/30">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-indigo-900">Your Tasks</h2>
            <p className="text-indigo-800/70 font-medium">
              Active Tasks ({activeTasksCount})
            </p>
          </div>

          <ul className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleComplete}
                  onDelete={deleteTask}
                />
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-indigo-900/60 text-lg italic font-medium">
                  Your list is empty! Time to relax.
                </p>
              </div>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;