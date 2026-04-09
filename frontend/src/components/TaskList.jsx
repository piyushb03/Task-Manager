import TaskItem from './TaskItem';

export default function TaskList({ tasks, loading, error, onToggle, onDelete, onEdit, filter }) {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading tasks…</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    const messages = {
      all: { icon: '📋', text: 'No tasks yet. Add one above!' },
      active: { icon: '✅', text: 'No active tasks. All done!' },
      completed: { icon: '⏳', text: 'No completed tasks yet.' },
    };
    const { icon, text } = messages[filter] || messages.all;
    return (
      <div className="task-list-empty">
        <div className="empty-icon">{icon}</div>
        <p>{text}</p>
      </div>
    );
  }

  return (
    <ul className="task-list" style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </li>
      ))}
    </ul>
  );
}
