/**
 * Validates POST /tasks request body
 * Requires: title (non-empty string, max 200 chars)
 */
function validateCreate(req, res, next) {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required and must be a non-empty string' });
  }

  if (title.trim().length > 200) {
    return res.status(400).json({ error: 'title must not exceed 200 characters' });
  }

  next();
}

/**
 * Validates PATCH /tasks/:id request body
 * Requires: at least one of title or completed
 */
function validateUpdate(req, res, next) {
  const { title, completed } = req.body;
  const hasTitle = title !== undefined;
  const hasCompleted = completed !== undefined;

  if (!hasTitle && !hasCompleted) {
    return res.status(400).json({ error: 'At least one of title or completed must be provided' });
  }

  if (hasTitle) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'title must be a non-empty string' });
    }
    if (title.trim().length > 200) {
      return res.status(400).json({ error: 'title must not exceed 200 characters' });
    }
  }

  if (hasCompleted && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed must be a boolean' });
  }

  next();
}

module.exports = { validateCreate, validateUpdate };
