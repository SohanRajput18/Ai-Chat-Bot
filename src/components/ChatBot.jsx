import { useState } from "react";
import axios from "axios";

export default function ChatBot({ chat, onUpdateChat }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  async function generateAnswer() {
    if (!question.trim()) return;

    setLoading(true);

    const userMessage = {
      role: "user",
      text: question,
    };

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });

      const aiMessage = {
        role: "ai",
        text: response.data.candidates[0].content.parts[0].text,
      };

      onUpdateChat(chat.id, [...chat.messages, userMessage, aiMessage]);
      setQuestion("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chat.messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xl px-4 py-3 rounded-xl text-sm
              ${
                msg.role === "user"
                  ? "ml-auto bg-blue-600"
                  : "mr-auto bg-gray-800"
              }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
          rows={2}
          className="w-full resize-none rounded-xl bg-gray-800 border border-gray-700 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={generateAnswer}
          disabled={loading}
          className="mt-3 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
