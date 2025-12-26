import React, { useState } from 'react';
import TaskItem from './TaskItem';

const DUMMY_DATA = [
  { id: 1, text: "Learn React Props", priority: "High", date: "2025-12-25", completed: false },
  { id: 2, text: "Build a Dashboard", priority: "Medium", date: "2025-12-25", completed: false },
  { id: 3, text: "Master Tailwind", priority: "Low", date: "2025-12-25", completed: false }
];

const Dashboard = ({ onLogout }) => {

  const [tasks, setTasks] = useState(DUMMY_DATA);
  
  const [formData, setFormData] = useState({
    text: '',
    priority: 'Select Priority',
    date: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const activeTasksCount = tasks.filter(task => !task.completed).length;

  const handleAddTask = (e) => {
    e.preventDefault();
    const { text, priority, date } = formData;

    if (!text.trim()) return;
    if (priority === 'Select Priority') {
      alert('Please select a priority level.');
      return;
    }

    const newTask = {
      id: Date.now(),
      text,
      priority,
      date: date || "No Date",
      completed: false
    };

    setTasks([newTask, ...tasks]);
    setFormData({ text: '', priority: 'Select Priority', date: '' });
  };

  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="bg-gradient-to-br from-pink-400 to-indigo-200 min-h-screen text-gray-800 pb-12 font-sans">
      
      {/* Navigation */}
      <nav className="bg-gradient-to-br from-violet-200 to-pink-200 shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-display text-indigo-600 tracking-tight">Todo App</h1>
        <div className="flex items-center gap-6">
          <span className="text-gray-700 font-medium hidden sm:inline">Welcome, <span className="text-indigo-600">User</span></span>
          <button
            onClick={onLogout}
            className="bg-white/50 hover:bg-white/80 px-4 py-1.5 rounded-full text-indigo-600 font-semibold transition-all border border-indigo-200 shadow-sm"
          >
            Log Out
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        
        {/* Input Section */}
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
                <option disabled>Select Priority</option>
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
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

        {/* Task List Section */}
        <section className="bg-white/40 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/30">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-indigo-900">Your Tasks</h2>
            <p className="text-indigo-800/70 font-medium">
              Active Tasks ({activeTasksCount})
            </p>
          </div>

          <ul className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map(task => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onToggle={toggleComplete} 
                  onDelete={deleteTask} 
                />
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-indigo-900/60 text-lg italic font-medium">Your list is empty! Time to relax.</p>
              </div>
            )}
          </ul>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;