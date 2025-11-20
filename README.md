# 🛡️ DockerShell - Unlocking Collaboration
> **Idea Hack 1.0 Submission** | *Team DockerShell*

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue?style=for-the-badge)
![Socket.IO](https://img.shields.io/badge/Socket.io-Realtime-black?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Prototype-green?style=for-the-badge)

**DockerShell** is a community web application designed to bridge the gap in student collaboration. By connecting isolated learners through virtual study sessions, topic-based groups, and real-time tools, we foster a dynamic and supportive learning environment.

---

## 🚀 The Problem
Many students struggle with **isolated learning** and **missed connections**, lacking effective platforms to find peers with similar academic interests. Existing tools are often clunky or not optimized for real-time study.

## 💡 Our Solution
A seamless virtual study platform featuring:
* **Topic-Based Groups:** Organized spaces for specific subjects (e.g., "Python Beginners", "UI/UX Design").
* **Dynamic Chat Rooms:** Instant messaging for real-time problem solving.
* **Collaborative Note-Taking:** Shared digital whiteboards for collective knowledge building.

---

## 🛠️ Tech Stack (MERN + Socket.IO)

* **Frontend:** [React.js](https://reactjs.org/) - Dynamic User Interface
* **Backend:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) - Robust Server-side runtime
* **Database:** [MongoDB](https://www.mongodb.com/) - Flexible NoSQL database
* **Real-time Engine:** [Socket.IO](https://socket.io/) - Bidirectional communication for Chat & Notes
* **Editor:** React-Quill - Rich text editing

---

## 📂 Project Structure

```bash
DockerShell-Project/
├── server/                 # Backend API & Socket Logic
│   ├── config/             # DB Connections
│   ├── models/             # Mongoose Schemas (User, Group, Message)
│   └── index.js            # Server Entry Point
│
└── client/                 # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── ChatRoom.js          # Real-time Chat UI
    │   │   ├── GroupList.js         # Topic Discovery
    │   │   └── CollaborativeNotes.js # Shared Whiteboard
    │   └── App.js
    └── package.json
