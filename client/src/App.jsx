import React, { useState } from 'react';
import io from 'socket.io-client';
import ChatRoom from './components/ChatRoom';
import GroupList from './components/GroupList';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinGroup = (groupName) => {
    if (username !== "" && groupName !== "") {
      setRoom(groupName);
      socket.emit("join_room", groupName);
      setShowChat(true);
    } else {
      alert("Please enter a username first!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      {!showChat ? (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden p-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-secondary mb-2">DockerShell</h1>
            <p className="text-accent">Unlock Collaboration. Join a Topic Group.</p>
          </div>
          
          <div className="max-w-md mx-auto mb-10">
            <input
              type="text"
              placeholder="Enter your Username..."
              onChange={(event) => setUsername(event.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-colors text-lg"
            />
          </div>
          
          <GroupList joinGroup={joinGroup} />
        </div>
      ) : (
        <ChatRoom socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
