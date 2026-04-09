import { useState, useEffect, useCallback } from 'react';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import * as api from './api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  // Fetch all tasks on mount
  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchTasks();
      setTasks(data);
    } catch {
      setError('Could not load tasks. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Add task
  async function handleAdd(title) {
    const newTask = await api.createTask(title);
    setTasks((prev) => [newTask, ...prev]);
  }

  // Toggle completed
  async function handleToggle(id, completed) {
    const updated = await api.updateTask(id, { completed });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  // Delete task
  async function handleDelete(id) {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // Edit title
  async function handleEdit(id, title) {
    const updated = await api.updateTask(id, { title });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  // Client-side filtering
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  // Counts for filter bar badges
  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <main className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Keep track of what needs to get done.</p>
      </header>

      <TaskForm onAdd={handleAdd} disabled={loading} />

      {error && (
        <div className="error-banner" role="alert">
          <span>⚠️</span> {error}
          <button
            onClick={loadTasks}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'underline', fontSize: '0.82rem' }}
          >
            Retry
          </button>
        </div>
      )}

      <FilterBar current={filter} onChange={setFilter} counts={counts} />

      {!loading && tasks.length > 0 && (
        <p className="task-stats">
          {counts.completed} of {counts.all} task{counts.all !== 1 ? 's' : ''} completed
        </p>
      )}

      <TaskList
        tasks={filteredTasks}
        loading={loading}
        error={error}
        filter={filter}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </main>
  );
}
