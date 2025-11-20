import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GroupList({ joinGroup }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/groups')
      .then((response) => {
        setGroups(response.data);
      })
      .catch(() => {
        // Fallback data if server isn't running immediately
        setGroups([
            { _id: 1, name: "Python Beginners", topic: "Programming", description: "Learn Python basics" },
            { _id: 2, name: "Data Structures", topic: "CS Fundamentals", description: "Trees and Graphs" },
            { _id: 3, name: "UI/UX Design", topic: "Design", description: "Figma and Wireframing" }
        ]);
      });
  }, []);

  return (
    <div className="text-left">
      <h3 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-2">Available Study Rooms</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div 
            key={group._id} 
            onClick={() => joinGroup(group.name)}
            className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-primary hover:shadow-lg cursor-pointer transition-all transform hover:-translate-y-1 group"
          >
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg text-slate-800 group-hover:text-primary">{group.name}</h4>
                <span className="px-2 py-1 bg-green-100 text-primary text-xs rounded-full font-medium">{group.topic}</span>
            </div>
            <p className="text-sm text-slate-500 mb-4">{group.description}</p>
            <button className="w-full py-2 bg-white border border-primary text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors font-medium text-sm">
                Join Room
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupList;