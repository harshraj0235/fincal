import React, { useState, FormEvent } from "react";
import { JSX } from "react/jsx-runtime";

interface NewsSearchBarProps {
  onResults: (results: string[]) => void;
}

const API_KEY = "sk-eb4865dd01204224a1d97f3a30a2eb83";
const API_URL = "https://api.deepseek.com/v1/chat/completions";

const NewsSearchBar: React.FC<NewsSearchBarProps> = ({ onResults }) => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const prompt = `ताज़ा वित्तीय समाचार खोजें: ${query} (केवल हिंदी में, Moneycal ब्लॉग, सरकारी योजनाएँ, क्रिप्टो से संबंधित)`;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: "आप एक वित्तीय समाचार सहायक हैं, जो हिंदी में Moneycal ब्लॉग, सरकारी योजनाएँ, और क्रिप्टो से संबंधित ताज़ा समाचार देता है। उत्तर संक्षिप्त और बिंदुवार दें।" },
            { role: "user", content: prompt },
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      });
      if (!response.ok) throw new Error("API त्रुटि");
      const data = await response.json();
      // Parse the response to extract bullet points or lines
      const content: string = data.choices?.[0]?.message?.content || "";
      // Split by line or bullet
      const results = content
        .split(/\n|•|\d+\./)
        .map(s => s.trim())
        .filter(s => s.length > 0);
      onResults(results);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("AI से समाचार प्राप्त करने में समस्या आई, कृपया पुनः प्रयास करें।");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
      <input
        type="text"
        className="flex-1 p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
        placeholder="यहाँ वित्तीय समाचार खोजें (हिंदी में)"
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="वित्तीय समाचार खोजें"
        required
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
        disabled={loading}
      >
        {loading ? "खोज रहा है..." : "खोजें"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

export default NewsSearchBar; 