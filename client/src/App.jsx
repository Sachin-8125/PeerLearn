import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import ChatRoom from './components/ChatRoom';
import JoinRoom from './components/JoinRoom';

const socket = io.connect("http://localhost:3001");

function AppContent() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const joinGroup = (groupName) => {
    if (username !== "" && groupName !== "") {
      setRoom(groupName);
      socket.emit("join_room", groupName);
      navigate(`/chat/${groupName}`);
    } else {
      alert("Please enter a username first!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Routes>
        <Route 
          path="/" 
          element={<JoinRoom joinGroup={joinGroup} setUsername={setUsername} />} 
        />
        <Route 
          path="/chat/:roomName" 
          element={<ChatRoom socket={socket} username={username} room={room} />} 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
