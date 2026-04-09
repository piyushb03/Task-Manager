import { useState } from 'react';

export default function TaskForm({ onAdd, disabled }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setError('Task title cannot be empty.');
      return;
    }
    if (trimmed.length > 200) {
      setError('Title must be 200 characters or less.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await onAdd(trimmed);
      setTitle('');
    } catch {
      setError('Failed to add task. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          id="new-task-input"
          type="text"
          placeholder="Add a new task…"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          disabled={disabled || loading}
          maxLength={200}
          autoComplete="off"
        />
        <button
          id="add-task-btn"
          type="submit"
          className="btn-primary"
          disabled={disabled || loading}
        >
          {loading ? 'Adding…' : 'Add Task'}
        </button>
      </form>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
