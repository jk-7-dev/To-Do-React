import React, { useState } from 'react'; // Removed useEffect
import ReactDOM from 'react-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';
import TaskItem from './TaskItem';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

const DraggablePortal = ({ children, draggableProps, dragHandleProps, innerRef, isDragging }) => {
  const content = (
    <div
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      style={{
        ...draggableProps.style,
        zIndex: isDragging ? 9999 : 1,
      }}
    >
      {children}
    </div>
  );

  if (isDragging) {
    return ReactDOM.createPortal(content, document.body);
  }

  return content;
};

const Dashboard = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    text: '',
    priority: 'medium',
    date: '',
  });

  // Local state for DnD
  const [orderedTasks, setOrderedTasks] = useState([]);

  // FIX: Use placeholderData or the select/onSuccess pattern to sync state
  const { isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get('/tasks');
      const data = response.data || [];
      // Synchronize local state here to avoid useEffect cascading renders
      setOrderedTasks(data); 
      return data;
    },
    // This ensures data is cached and managed properly by TanStack
    placeholderData: (previousData) => previousData, 
  });

  // REMOVED: useEffect that was calling setOrderedTasks(tasks)

  const addTaskMutation = useMutation({
    mutationFn: (newTask) => api.post('/tasks', newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setFormData({ text: '', priority: 'medium', date: '' });
    },
    onError: (err) => alert("Error: " + (err.response?.data || err.message))
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/tasks/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const toggleMutation = useMutation({
    mutationFn: (id) => api.put(`/tasks/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const items = Array.from(orderedTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setOrderedTasks(items);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!formData.text.trim()) return;
    addTaskMutation.mutate({
      text: formData.text,
      priority: formData.priority,
      date: formData.date || "No Date",
      user_id: 1,
    });
  };

  const handleLogout = () => {
    queryClient.clear();
    router.navigate({ to: '/' });
  };

  const activeTasksCount = orderedTasks.filter((t) => t.status !== 'completed').length;

  if (isLoading && orderedTasks.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 font-sans">
      <p className="text-indigo-600 animate-pulse font-bold">Syncing Tasks...</p>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 font-sans">
      <p className="text-red-600 font-bold">Failed to connect to backend.</p>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-pink-400 to-indigo-200 min-h-screen text-gray-800 pb-12 font-sans">
      <nav className="bg-gradient-to-br from-violet-200 to-pink-200 shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-600">Todo App</h1>
        <div className="flex items-center gap-6">
          <span className="text-gray-700 font-medium hidden sm:inline">Welcome, <span className="text-indigo-600">User</span></span>
          <button onClick={handleLogout} className="bg-white/50 hover:bg-white/80 px-4 py-1.5 rounded-full text-indigo-600 font-semibold border border-indigo-200 shadow-sm transition-all">
            Log Out
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        <section className="bg-white/20 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleAddTask} className="flex flex-col gap-4">
            <input
              name="text"
              type="text"
              placeholder="What needs to be done?"
              className="w-full border-none px-4 py-3 text-lg rounded-xl shadow-inner outline-none bg-white/90 focus:ring-2 focus:ring-indigo-400"
              value={formData.text}
              onChange={handleInputChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select name="priority" className="px-4 py-3 rounded-xl bg-white/90 outline-none" value={formData.priority} onChange={handleInputChange}>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input name="date" type="date" className="px-4 py-3 rounded-xl bg-white/90 outline-none text-gray-600" value={formData.date} onChange={handleInputChange} />
              <button type="submit" disabled={addTaskMutation.isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50">
                {addTaskMutation.isPending ? 'ADDING...' : 'ADD TASK'}
              </button>
            </div>
          </form>
        </section>

        <section className="bg-white/40 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/30">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-indigo-900">Your Tasks</h2>
            <p className="text-indigo-800/70 font-medium">Active Tasks ({activeTasksCount})</p>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks-list">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {orderedTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <DraggablePortal
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                        >
                          <TaskItem 
                            task={task} 
                            onToggle={() => toggleMutation.mutate(task.id)} 
                            onDelete={() => deleteMutation.mutate(task.id)} 
                            isDragging={snapshot.isDragging}
                          />
                        </DraggablePortal>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;