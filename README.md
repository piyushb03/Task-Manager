# Task Manager

A simple full-stack task manager built with **React + Vite** (frontend) and **Node.js + Express** (backend).

<img width="1184" height="577" alt="image" src="https://github.com/user-attachments/assets/d4d68051-0e26-4026-8961-7af17b70726a" />

---

## Setup & Run

### Prerequisites
- Node.js v18+ installed

### 1. Start the Backend (port 3001)
```bash
cd backend
npm install
npm start
```

### 2. Start the Frontend (port 5173)
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> The Vite dev server proxies all `/tasks` requests to `http://localhost:3001` automatically.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a task|
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

### Response format

**Success:**
```json
{ "data": { "id": "...", "title": "...", "completed": false, "createdAt": "..." } }
```

**Error:**
```json
{ "error": "descriptive message" }
```

---

## Features

- **Create** tasks with a title
- **Complete/uncomplete** tasks via checkbox
- **Inline edit** a task title (click Edit → type → Enter or Save)
- **Delete** tasks
- **Filter** by All / Active / Completed with counts
- **Persist** tasks to `backend/data/tasks.json` — survives restarts
- **Loading** spinner on initial fetch
- **Error** banner with retry button if backend is unreachable

---

## Project Structure

```
Task_Manager/
├── backend/
│   ├── src/
│   │   ├── controllers/taskController.js
│   │   ├── middleware/validate.js
│   │   ├── routes/tasks.js
│   │   └── store/taskStore.js
│   ├── data/tasks.json          ← auto-created on first run
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── api/tasks.js
│   │   ├── components/
│   │   │   ├── FilterBar.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskList.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── index.html
│   └── vite.config.js
│
└── README.md
```

---

