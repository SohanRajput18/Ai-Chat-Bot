import { useState } from "react";
import ChatBot from "./components/ChatBot";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [chats, setChats] = useState([
    {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    },
  ]);

  const [activeChat, setActiveChat] = useState(chats[0].id);

  function createNewChat() {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat.id);
  }

  function updateChat(chatId, messages) {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages,
              title: chat.title || messages[0]?.text.slice(0, 25),
            }
          : chat
      )
    );
  }

  const currentChat = chats.find((c) => c.id === activeChat);

  return (
    <div className="h-screen flex">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
        onNewChat={createNewChat}
      />

      <div className="flex-1">
        <ChatBot chat={currentChat} onUpdateChat={updateChat} />
      </div>
    </div>
  );
}
