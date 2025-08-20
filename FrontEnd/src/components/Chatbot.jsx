import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5002/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      // add AI reply
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply || "Error: no reply" },
      ]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "⚠️ Server error" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-2xl mb-4">Chatbot with Groq</h1>

      <div className="w-full max-w-lg flex-1 overflow-y-auto bg-gray-800 rounded-lg p-4 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 p-2 rounded ${
              msg.role === "user" ? "bg-blue-600 text-right" : "bg-gray-700 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <p className="text-gray-400">🤔 Thinking...</p>}
      </div>

      <div className="flex w-full max-w-lg">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 rounded-l bg-gray-700 border border-gray-600"
          placeholder="Ask me anything..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 px-4 rounded-r"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
