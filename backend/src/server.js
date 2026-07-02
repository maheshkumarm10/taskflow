const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Simple test route to verify backend + DB
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend and MongoDB are running' });
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // In a real app, you would compare hashed passwords here
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.json({ message: 'Login successful', email: user.email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Register route
app.use('/api/tasks', taskRoutes);

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Register attempt:', { name, email }); // Debug log

  if (!name || !email || !password) {
    console.log('Missing fields');
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    console.log('User saved successfully:', savedUser);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


