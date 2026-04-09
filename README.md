# 📝 Task Manager

A simple full-stack task manager built with **React + Vite** (frontend) and **Node.js + Express** (backend).

<img width="1184" height="577" alt="image" src="https://github.com/user-attachments/assets/b64cf460-d768-4964-8065-b0dc5bf44d3f" />


---

## 🔗 Live Links & Repository

* **GitHub Repository:**
  https://github.com/your-username/task-manager

* **Frontend (Vercel):**
  https://your-frontend.vercel.app

* **Backend (Render):**
  https://your-backend.onrender.com/tasks

---

## ⚙️ Setup & Run

### Prerequisites

* Node.js v18+
* npm

---

### ▶️ Run Backend (Local)

```bash
cd backend
npm install
npm start
```

Backend runs on:
http://localhost:3001

---

### ▶️ Run Frontend (Local)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
http://localhost:5173

---

### 🌐 Production Deployment

* Frontend deployed on Vercel
* Backend deployed on Render

The frontend communicates with the backend using the deployed API URL.

---

## 📡 API Endpoints

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| GET    | /tasks     | Get all tasks |
| POST   | /tasks     | Create a task |
| PATCH  | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

---

## 📦 Response Format

### ✅ Success

```json
{
  "data": {
    "id": "...",
    "title": "...",
    "completed": false,
    "createdAt": "..."
  }
}
```

### ❌ Error

```json
{
  "error": "descriptive message"
}
```

---

## ✨ Features

* Create tasks with a title
* Mark tasks as complete/incomplete
* Inline edit task titles
* Delete tasks
* Filter tasks (All / Active / Completed)
* Persistent storage using `tasks.json`
* Loading spinner on initial fetch
* Error handling with retry option

---

## 🧠 Assumptions & Trade-offs

### 1. File-based Storage

Tasks are stored in a local JSON file (`tasks.json`) instead of a database.

**Reason:**
Simple setup, no external dependencies, fast development

**Trade-off:**
Not scalable and not suitable for concurrent access in production

---

### 2. Backend Hosting (Render)

Backend is deployed on Render instead of serverless platforms.

**Reason:**
Supports Express server without modification

**Trade-off:**
Cold starts on free tier (initial delay)

---

### 3. Open CORS Policy

CORS is set to allow all origins.

**Reason:**
Avoids frontend-backend connectivity issues

**Trade-off:**
Less secure than restricting domains

---

### 4. No Authentication

No user login or multi-user support.

**Reason:**
Focus kept on core task management functionality

**Trade-off:**
Not suitable for multi-user environments

---

### 5. UI Simplicity

Minimal UI with focus on functionality.

**Reason:**
Prioritized clarity and correctness

**Trade-off:**
Could be enhanced with better design and UX

---

## 📁 Project Structure

```
Task_Manager/
├── backend/
│   ├── src/
│   │   ├── controllers/taskController.js
│   │   ├── middleware/validate.js
│   │   ├── routes/tasks.js
│   │   └── store/taskStore.js
│   ├── data/tasks.json
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

## 📌 Submission Note

This project is a simple full-stack task manager built using React (Vite) and Node.js (Express).

The implementation focuses on clean structure, clear separation of concerns, and reliable core functionality. It supports creating, updating, deleting, and filtering tasks, with persistence handled via a JSON file.

The solution reflects a practical approach to building a small feature — prioritizing clarity, correctness, and sensible trade-offs while keeping the implementation simple and maintainable.

The application is fully functional, deployed, and can be run locally using the provided instructions.
