const express = require('express');
const cors = require('cors');
const taskRoutes = require('./src/routes/tasks');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
origin: "*"
}));
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// 404 handler
app.use((req, res) => {
res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ error: 'Internal server error' });
});

// Start server (ONLY ONCE)
app.listen(PORT, () => {
console.log(`Task Manager API running on port ${PORT}`);
});
