const express = require('express');
const router = express.Router();
const { validateCreate, validateUpdate } = require('../middleware/validate');
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

router.get('/', getAllTasks);
router.post('/', validateCreate, createTask);
router.patch('/:id', validateUpdate, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
