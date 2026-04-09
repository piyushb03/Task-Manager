const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '../../data/tasks.json');

// Ensure data directory and file exist
function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

// Load tasks from file into memory
function loadFromFile() {
  try {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Persist current state to file
function saveToFile(tasks) {
  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error('Failed to persist tasks:', err.message);
  }
}

// In-memory store (loaded from file on startup)
let tasks = loadFromFile();

const taskStore = {
  getAll() {
    return tasks;
  },

  getById(id) {
    return tasks.find((t) => t.id === id) || null;
  },

  create(title) {
    const task = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    saveToFile(tasks);
    return task;
  },

  update(id, fields) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;

    tasks[index] = { ...tasks[index], ...fields };
    saveToFile(tasks);
    return tasks[index];
  },

  delete(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;

    tasks.splice(index, 1);
    saveToFile(tasks);
    return true;
  },
};

module.exports = taskStore;
