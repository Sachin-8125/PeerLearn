import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import CollaborativeNotes from "./CollaborativeNotes";

function ChatRoom({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        group: room,
        sender: username,
        content: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const handler = (data) => setMessageList((list) => [...list, data]);
    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  }, [socket]);

  return (
    <div className="w-full h-screen max-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      
      {/* LEFT: Chat Area */}
      <div className="w-full md:w-1/3 flex flex-col border-r border-slate-200 h-full">
        {/* Header */}
        <div className="bg-secondary p-4 text-white flex justify-between items-center shadow-md z-10">
          <div>
            <p className="font-bold text-lg">Live Chat</p>
            <p className="text-xs text-slate-300">Room: {room}</p>
          </div>
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 bg-slate-50 relative overflow-hidden">
            <ScrollToBottom className="h-full w-full p-4 overflow-y-auto">
            {messageList.map((messageContent, index) => {
                const isMe = username === messageContent.sender;
                return (
                <div
                    key={index}
                    className={`flex mb-4 ${isMe ? "justify-end" : "justify-start"}`}
                >
                    <div className={`max-w-[75%] ${isMe ? "order-2" : "order-1"}`}>
                        <div className={`px-4 py-2 rounded-lg shadow-sm break-words ${
                            isMe ? "bg-primary text-white rounded-br-none" : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                        }`}>
                            <p>{messageContent.content}</p>
                        </div>
                        <div className={`flex gap-2 text-[10px] text-slate-400 mt-1 ${isMe ? "justify-end" : "justify-start"}`}>
                            <span className="font-bold">{messageContent.sender}</span>
                            <span>{messageContent.time}</span>
                        </div>
                    </div>
                </div>
                );
            })}
            </ScrollToBottom>
        </div>

        {/* Footer Input */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentMessage}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              onChange={(event) => setCurrentMessage(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && sendMessage()}
            />
            <button 
                onClick={sendMessage}
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors shadow-sm"
            >
              &#9658;
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Collaborative Notes */}
      <div className="hidden md:flex md:w-2/3 bg-slate-50 flex-col h-full">
        <div className="p-6 h-full flex flex-col">
            <div className="bg-white rounded-xl shadow-lg h-full flex flex-col overflow-hidden border border-slate-200">
                 <CollaborativeNotes socket={socket} room={room} />
            </div>
        </div>
      </div>

    </div>
  );
}

export default ChatRoom;