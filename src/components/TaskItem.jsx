import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  // Check if the status from the database is "completed"
  const isCompleted = task.status === 'completed';

  return (
    <li className="border border-gray-200 rounded-md p-4 flex justify-between items-start hover:bg-indigo-100 transition-colors bg-white/50">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(task.id)}
          className="cursor-pointer accent-indigo-500 w-4 h-4"
        />
        <span className={`text-sm ${isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
          {task.text}
        </span>
      </div>

      <div className="text-xs flex items-center gap-4">
        <span className="uppercase font-semibold text-indigo-500">{task.priority}</span>
        <span className="text-gray-500">{task.date}</span>
        <div className="flex gap-3">
          <button 
            onClick={() => onDelete(task.id)} 
            className="text-gray-400 hover:text-red-500 transition-colors text-lg"
            title="Delete Task"
          >
            🗑️
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;