require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');

// Import Models
const Group = require('./models/Group');
const Message = require('./models/Message');

// Initialize App
const app = express();
const server = http.createServer(app);

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// --- REST API ROUTES ---

// Get all active study groups
app.get('/api/groups', async (req, res) => {
  try {
    // Seed data if empty (for demo purposes)
    const count = await Group.countDocuments();
    if (count === 0) {
      await Group.create([
        { name: "Python Beginners", topic: "Programming", description: "Master Python basics from scratch." },
        { name: "Data Structures", topic: "CS Fundamentals", description: "Deep dive into Trees, Graphs, and BFS/DFS." },
        { name: "UI/UX Design", topic: "Design", description: "Collaborate on Figma prototypes and wireframes." },
        { name: "React Developers", topic: "Web Dev", description: "Discussing Hooks, Context API, and Redux." }
      ]);
    }
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Create a new group (Optional feature)
app.post('/api/groups', async (req, res) => {
  try {
    const { name, topic, description } = req.body;
    const newGroup = new Group({ name, topic, description });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ message: "Error creating group" });
  }
});

// --- SOCKET.IO REAL-TIME LOGIC ---

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // 1. Join Room Event
  socket.on('join_room', async (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room: ${room}`);
    
    try {
      // Update group status to 'open'
      const group = await Group.findOneAndUpdate(
        { name: room },
        { status: 'open' },
        { new: true }
      );
      if (group) {
        console.log(`Group ${room} status updated to: ${group.status}`);
      }
    } catch (err) {
      console.error("Error updating group status:", err);
    }
  });

  // 2. Chat Message Event
  socket.on('send_message', async (data) => {
    // data: { group, sender, content, time }
    try {
      // Save to MongoDB for persistence
      const newMessage = new Message({
        group: data.group,
        sender: data.sender,
        content: data.content
      });
      await newMessage.save();

      // Broadcast to everyone else in the room
      socket.to(data.group).emit('receive_message', data);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  // 3. Collaborative Notes Event
  socket.on('send_notes', (data) => {
    // data: { room, content }
    // Broadcast note changes to others in the room
    socket.to(data.room).emit('receive_notes', data.content);
  });

  // 4. Disconnect
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});