import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function CollaborativeNotes({ socket, room }) {
  const [value, setValue] = useState("");
  const [isRemoteUpdate, setIsRemoteUpdate] = useState(false);

  useEffect(() => {
    socket.on("receive_notes", (content) => {
      setIsRemoteUpdate(true);
      setValue(content);
    });
    return () => socket.off("receive_notes");
  }, [socket]);

  const handleChange = (content, delta, source) => {
    if (source === 'user') {
      setValue(content);
      socket.emit("send_notes", { room, content });
    } else if (isRemoteUpdate) {
      setIsRemoteUpdate(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-700 flex items-center gap-2">
          <span className="text-xl">📝</span> Shared Study Notes
        </h3>
        <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
            Live Sync Active
        </span>
      </div>
      <div className="flex-1 bg-white overflow-hidden flex flex-col">
        {/* ReactQuill Container Override */}
        <style>{`
            .quill { display: flex; flex-direction: column; height: 100%; }
            .ql-container { flex: 1; overflow-y: auto; font-size: 1.1rem; }
            .ql-toolbar { border-top: none !important; border-left: none !important; border-right: none !important; background: #f8fafc; }
            .ql-container.ql-snow { border: none !important; }
        `}</style>
        <ReactQuill 
          theme="snow" 
          value={value} 
          onChange={handleChange} 
          placeholder="Start typing notes here to collaborate with your group in real-time..."
          className="h-full"
        />
      </div>
    </div>
  );
}

export default CollaborativeNotes;