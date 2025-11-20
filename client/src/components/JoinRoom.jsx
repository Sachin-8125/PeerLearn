import React from 'react';
import GroupList from './GroupList';

function JoinRoom({ joinGroup, setUsername }) {
  return (
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
  );
}

export default JoinRoom;
