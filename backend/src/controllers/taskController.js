const taskStore = require('../store/taskStore');

/**
 * GET /tasks
 * Query param: ?status=active|completed
 */
function getAllTasks(req, res) {
  const { status } = req.query;
  let tasks = taskStore.getAll();

  if (status === 'completed') {
    tasks = tasks.filter((t) => t.completed);
  } else if (status === 'active') {
    tasks = tasks.filter((t) => !t.completed);
  }

  res.json({ data: tasks });
}

/**
 * POST /tasks
 * Body: { title }
 */
function createTask(req, res) {
  const { title } = req.body;
  const task = taskStore.create(title);
  res.status(201).json({ data: task });
}

/**
 * PATCH /tasks/:id
 * Body: { title?, completed? }
 */
function updateTask(req, res) {
  const { id } = req.params;
  const { title, completed } = req.body;

  const fields = {};
  if (title !== undefined) fields.title = title.trim();
  if (completed !== undefined) fields.completed = completed;

  const task = taskStore.update(id, fields);
  if (!task) {
    return res.status(404).json({ error: `Task with id "${id}" not found` });
  }

  res.json({ data: task });
}

/**
 * DELETE /tasks/:id
 */
function deleteTask(req, res) {
  const { id } = req.params;
  const deleted = taskStore.delete(id);

  if (!deleted) {
    return res.status(404).json({ error: `Task with id "${id}" not found` });
  }

  res.status(200).json({ message: 'Task deleted successfully' });
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
