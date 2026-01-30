import { useState } from "react";
import axios from "axios";

export default function ChatBot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  async function generateAnswer() {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

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

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gray-900 text-white rounded-2xl shadow-xl p-6 space-y-6">
        
        <h1 className="text-3xl font-semibold text-center text-blue-400">
          Chat AI
        </h1>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything..."
          rows={6}
          className="w-full resize-none rounded-xl bg-gray-800 border border-gray-700 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={generateAnswer}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Thinking..." : "Generate Answer"}
        </button>

        {answer && (
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-sm whitespace-pre-wrap leading-relaxed">
              {answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
