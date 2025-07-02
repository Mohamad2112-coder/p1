const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files like index.html, CSS, JS

// In-memory task list
let tasks = [];

// REST API: Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// REST API: Add a new task
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    const newTask = {
        id: Date.now(),
        title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// ✅ REST API: Delete a task by ID
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).send(); // No content
});


/// Toggle task completion status by ID
app.put('/api/tasks/:id/toggle', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Clear all tasks
app.delete('/api/tasks', (req, res) => {
    tasks = [];
    res.status(204).send(); // No content
});
