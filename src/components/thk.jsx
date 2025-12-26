import { useState } from "react";
import TaskItem from "./TaskItem";

function Dashboard() {

  // STATE (Dummy Data)
  const [tasks, setTasks] = useState([
    { id: 1, title: "Revise HTML", status: "Pending", priority: "Medium", date: "2025-12-25" },
    { id: 2, title: "Learn React", status: "Completed", priority: "High", date: "2025-12-30" },
  ]);

  // INPUT STATES
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [date, setDate] = useState("");

  // ADD TASK (EVENT)
  function addTask() {
    if (!title || !date) return;

    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        title,
        status: "Pending",
        priority,
        date,
      },
    ]);

    setTitle("");
    setPriority("Low");
    setDate("");
  }

  // DELETE TASK (EVENT)
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  // COUNTS
  const pendingCount = tasks.filter(t => t.status === "Pending").length;
  const completedCount = tasks.filter(t => t.status === "Completed").length;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* COUNTS */}
      <div className="flex gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded">Pending: {pendingCount}</div>
        <div className="bg-gray-800 p-4 rounded">Completed: {completedCount}</div>
      </div>

      {/* ADD TASK UI */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="md:col-span-2 px-4 py-2 rounded text-black"
        />

        {/* PRIORITY DROPDOWN */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 rounded text-black"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* DATE PICKER */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-2 rounded text-black"
        />

        <button
          onClick={addTask}
          className="bg-green-600 rounded px-4 py-2"
        >
          + Add
        </button>
      </div>

      {/* DUMMY DATA LOOP */}
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
          />
        ))}
      </div>

    </div>
  );
}

export default Dashboard;