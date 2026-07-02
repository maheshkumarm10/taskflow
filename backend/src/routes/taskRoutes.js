const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');
const { sendSlackNotification } = require('../utils/slack');

// Create a new task
router.post('/', async (req, res) => {
    console.log('Received task creation request:', req.body);
    const { title, description, status, email, arenaTaskUrl, estimatedTime } = req.body; // Using email to identify user for now

    if (!title || !email) {
        return res.status(400).json({ message: 'Title and user email are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newTask = new Task({
            title,
            description,
            status,
            userId: user._id,
            arenaTaskUrl,
            estimatedTime,
        });

        const savedTask = await newTask.save();

        // Send Slack notification
        const message = `📢 *New Task Created* \n\n*Title:* ${savedTask.title}\n*Status:* ${savedTask.status}\n*Created by:* ${user.name} (${user.email})`;
        sendSlackNotification(message);

        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all tasks (for All Tasks page)
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('userId', 'name email');
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching all tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get tasks for a specific user (for My Tasks page)
router.get('/my', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'User email is required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const tasks = await Task.find({ userId: user._id });
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching user tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    const { title, description, status, arenaTaskUrl, estimatedTime } = req.body;

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.arenaTaskUrl = arenaTaskUrl || task.arenaTaskUrl;
        task.estimatedTime = estimatedTime || task.estimatedTime;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
