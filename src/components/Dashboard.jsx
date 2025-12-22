import React, { useState } from 'react';

const DUMMY_DATA = [
  { id: 1, text: "Learn React Props", priority: "High" , date: "2025-12-25", completed: false},
  { id: 2, text: "Build a Dashboard", priority: "Medium", date: "2025-12-25", completed: false },
  { id: 3, text: "Master Tailwind", priority: "Low" , date: "2025-12-25", completed: false }
];

const Dashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState(DUMMY_DATA);

  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Select Priority');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    if (!taskText.trim()) return;

    if (priority === 'Select Priority') {
      alert('Please select a priority level.');
      return;
    }

    if (dueDate && isNaN(new Date(dueDate))) {
      alert('Please enter a valid date.');
        return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      priority,
      date: dueDate || "No Date",
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTaskText('');
    setDueDate('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
 <div className="bg-gradient-to-br from-pink-400 to-indigo-200 min-h-screen text-gray-800">    
   
      <nav className="bg-gradient-to-br from-violet-200 to-pink-200 shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-display text-indigo-600">Todo App</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-600">Welcome, User</span>
          <button
            onClick={onLogout}
            className="text-indigo-500 hover:text-indigo-700 font-medium"
          >
            Log Out
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 space-y-8">

        <section className="bg-gradient-to-br from-violet-200 to-pink-200 shadow-md rounded-lg p-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="What needs to be done?"
              className="w-full border border-gray-300 px-3 py-2 text-sm rounded-md
                         focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />

            <div className="flex gap-3 flex-wrap">
              <select
                className="border border-gray-300 px-8 py-2 rounded-md"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                >
                <option disabled>Select Priority</option>
                <option className="text-green-600 font-medium">Low</option>
                <option className="text-yellow-600 font-medium">Medium</option>
                <option className="text-red-600 font-medium">High</option>
            </select>


              <input
                type="date"
                className="border border-gray-300 px-3 py-2 text-sm rounded-md
                           focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <button
                type="button"
                onClick={handleAddTask}
                className="bg-indigo-500 text-white px-4 py-2 text-sm rounded-md
                           hover:bg-indigo-600 transition-colors font-medium"
              >
                ADD TASK
              </button>
            </div>
          </div>
        </section>

        {/* Task List */}
        <section className="bg-gradient-to-br from-violet-200 to-pink-200 shadow-md rounded-lg p-6">
          <header className="font-bold mb-6 text-center text-lg text-indigo-600">
            Active Tasks
          </header>

          <ul className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-sm italic text-center">
                No tasks yet. Add one above!
              </p>
            ) : (
              tasks.map(task => (
                <li
                  key={task.id}
                  className="border border-gray-200 rounded-md p-4 flex justify-between items-start hover:bg-indigo-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      className="cursor-pointer accent-indigo-500"
                    />
                    <span
                      className={`text-sm ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>

                  <div className="text-xs flex items-center gap-4">
                    <span className="uppercase font-semibold text-indigo-500">
                      {task.priority}
                    </span>
                    <span className="text-gray-500">{task.date}</span>
                    <div className="flex gap-3">
                      <button title="Edit" className="hover:text-indigo-600">✏️</button>
                      <button
                        title="Delete"
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
