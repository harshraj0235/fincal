import React, { useState } from "react";

interface Comment {
  name: string;
  text: string;
  date: string;
}

const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setComments([
        {
          name,
          text,
          date: new Date().toLocaleString("hi-IN", { dateStyle: "medium", timeStyle: "short" }),
        },
        ...comments,
      ]);
      setName("");
      setText("");
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 800);
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-green-700 font-semibold mb-1">नाम *</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="अपना नाम लिखें"
          />
        </div>
        <div>
          <label className="block text-green-700 font-semibold mb-1">टिप्पणी *</label>
          <textarea
            className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
            value={text}
            onChange={e => setText(e.target.value)}
            required
            placeholder="अपनी टिप्पणी लिखें (हिंदी में)"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition w-full"
          disabled={loading}
        >
          {loading ? "जोड़ रहा है..." : "टिप्पणी जोड़ें"}
        </button>
        {success && (
          <div className="text-green-700 font-semibold mt-2">आपकी टिप्पणी सफलतापूर्वक जोड़ दी गई!</div>
        )}
      </form>
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-gray-500 text-center">कोई टिप्पणी नहीं है।</div>
        ) : (
          comments.map((c, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-3 shadow-sm">
              <div className="font-bold text-green-700 mb-1">{c.name}</div>
              <div className="text-gray-800 mb-1">{c.text}</div>
              <div className="text-xs text-gray-400 text-right">{c.date}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection; 