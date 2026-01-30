export default function Sidebar({ chats, activeChat, onSelectChat, onNewChat }) {
    return (
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        
        <div className="p-4 border-b border-gray-800">
          <button
            onClick={onNewChat}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            + New Chat
          </button>
        </div>
  
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chats.map((chat, index) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition
                ${
                  activeChat === chat.id
                    ? "bg-gray-800 text-blue-400"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
            >
              {chat.title || `Chat ${index + 1}`}
            </button>
          ))}
        </div>
      </div>
    );
  }
  