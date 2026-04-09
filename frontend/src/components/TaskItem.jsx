import { useState } from 'react';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const [saving, setSaving] = useState(false);

  async function handleToggle() {
    await onToggle(task.id, !task.completed);
  }

  async function handleDelete() {
    await onDelete(task.id);
  }

  function startEdit() {
    setEditValue(task.title);
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
    setEditValue(task.title);
  }

  async function saveEdit() {
    const trimmed = editValue.trim();
    if (!trimmed || trimmed === task.title) {
      cancelEdit();
      return;
    }
    setSaving(true);
    try {
      await onEdit(task.id, trimmed);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        id={`toggle-${task.id}`}
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={handleToggle}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />

      {editing ? (
        <input
          className="task-edit-input"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={200}
          autoFocus
        />
      ) : (
        <span className="task-title" title={task.title}>
          {task.title}
        </span>
      )}

      <div className="task-actions">
        {editing ? (
          <>
            <button
              id={`save-${task.id}`}
              className="btn-icon save"
              onClick={saveEdit}
              disabled={saving}
              title="Save"
            >
              {saving ? '…' : 'Save'}
            </button>
            <button
              className="btn-icon"
              onClick={cancelEdit}
              title="Cancel"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {!task.completed && (
              <button
                id={`edit-${task.id}`}
                className="btn-icon"
                onClick={startEdit}
                title="Edit task"
              >
                Edit
              </button>
            )}
            <button
              id={`delete-${task.id}`}
              className="btn-icon danger"
              onClick={handleDelete}
              title="Delete task"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
