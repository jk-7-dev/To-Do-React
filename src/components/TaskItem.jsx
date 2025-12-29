const TaskItem = ({ task, onToggle, onDelete, isDragging }) => {
  const isCompleted = task.status === 'completed';

  return (
    <div className={`
      border border-gray-200 rounded-xl p-4 flex justify-between items-center 
      transition-all duration-200
      /* When dragging, we make the background solid white to look better against the body */
      ${isDragging ? "bg-white shadow-2xl scale-[1.02] border-indigo-300" : "bg-white/60 backdrop-blur-sm shadow-sm"}
    `}>
      <div className="flex items-center gap-4">
        <div className="text-gray-400">⠿</div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggle(task.id)}
            className="cursor-pointer accent-indigo-500 w-5 h-5 rounded-full"
          />
          <span className={`text-base font-medium ${isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
            {task.text}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border ${
          task.priority === 'high' ? 'bg-red-50 text-red-600 border-red-100' : 
          task.priority === 'medium' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 
          'bg-green-50 text-green-600 border-green-100'
        }`}>
          {task.priority}
        </span>
        <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-500 transition-all p-1">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;