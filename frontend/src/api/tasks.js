import axios from 'axios';

// Use relative path — Vite proxy forwards /tasks → http://localhost:3001/tasks
const BASE = '/tasks';

export const fetchTasks = () =>
  axios.get(BASE).then((res) => res.data.data);

export const createTask = (title) =>
  axios.post(BASE, { title }).then((res) => res.data.data);

export const updateTask = (id, fields) =>
  axios.patch(`${BASE}/${id}`, fields).then((res) => res.data.data);

export const deleteTask = (id) =>
  axios.delete(`${BASE}/${id}`).then((res) => res.data);
