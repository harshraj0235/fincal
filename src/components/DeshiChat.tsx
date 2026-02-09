import React, { useState, useRef } from "react";
import { optimizedBlogPosts } from "../data/optimizedBlogPosts";

const API_KEY = "sk-eb4865dd01204224a1d97f3a30a2eb83";
const API_URL = "https://api.deepseek.com/v1/chat/completions";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const DeshiChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    sender: "bot",
    text: "नमस्ते! मैं मनीकल देशी AI चैटबोट हूँ। वित्त, सरकारी योजनाएँ, क्रिप्टो या मनी से जुड़े सवाल पूछें।"
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user" as const, text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    scrollToBottom();
    try {
      const prompt = `सवाल: ${input}\nउत्तर हिंदी में संक्षिप्त और स्पष्ट दें। यदि संभव हो तो Moneycal ब्लॉग से संबंधित ब्लॉग टाइटल भी सुझाएँ।`;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: "आप एक वित्तीय सहायक हैं, जो हिंदी में Moneycal ब्लॉग, सरकारी योजनाएँ, और क्रिप्टो से जुड़े सवालों के उत्तर देता है। उत्तर संक्षिप्त, स्पष्ट और बिंदुवार दें।" },
            { role: "user", content: prompt },
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      });
      if (!response.ok) throw new Error("API त्रुटि");
      const data = await response.json();
      let content: string = data.choices?.[0]?.message?.content || "";
      // Try to extract blog suggestions if present
      let blogSuggestions: string[] = [];
      const blogRegex = /ब्लॉग (?:टाइटल|शीर्षक|suggestions|सुझाव):?([\s\S]*)/i;
      const match = content.match(blogRegex);
      if (match && match[1]) {
        blogSuggestions = match[1]
          .split(/\n|•|\d+\./)
          .map(s => s.trim())
          .filter(s => s.length > 0);
        content = content.replace(blogRegex, "").trim();
      }
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: content },
        ...(blogSuggestions.length > 0
          ? [{ sender: "bot", text: `पढ़ें: ${blogSuggestions.join(", ")}` }]
          : []),
      ]);
      setLoading(false);
      scrollToBottom();
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "उत्तर प्राप्त करने में समस्या आई, कृपया पुनः प्रयास करें।" },
      ]);
      setLoading(false);
      scrollToBottom();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-4 flex flex-col h-[500px] md:h-[600px]">
      <div className="flex-1 overflow-y-auto space-y-3 pb-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-2xl px-4 py-2 max-w-[80%] text-base shadow-sm ${
                msg.sender === "user"
                  ? "bg-green-100 text-green-900 self-end"
                  : "bg-gray-100 text-gray-800 self-start"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2 mt-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
          placeholder="यहाँ अपना सवाल पूछें (हिंदी में)"
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-label="सवाल पूछें"
          disabled={loading}
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
          disabled={loading || !input.trim()}
        >
          {loading ? "भेज रहा है..." : "भेजें"}
        </button>
      </form>
    </div>
  );
};

export default DeshiChat; 