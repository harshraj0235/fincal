import React, { useState } from "react";

interface NewsSubmissionFormProps {
  onSubmitNews?: (news: {
    title: string;
    summary: string;
    category: string;
    author: string;
  }) => void;
}

const categories = [
  "व्यक्तिगत वित्त",
  "निवेश",
  "सरकारी योजना",
  "क्रिप्टो",
  "बीमा",
  "अन्य"
];

const NewsSubmissionForm: React.FC<NewsSubmissionFormProps> = ({ onSubmitNews }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [author, setAuthor] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate file append (in real app, call backend or API)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTitle("");
      setSummary("");
      setCategory(categories[0]);
      setAuthor("");
      if (onSubmitNews) {
        onSubmitNews({ title, summary, category, author });
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div>
        <label className="block text-green-700 font-semibold mb-1">शीर्षक *</label>
        <input
          type="text"
          className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          placeholder="यहाँ न्यूज़/ब्लॉग का शीर्षक लिखें"
        />
      </div>
      <div>
        <label className="block text-green-700 font-semibold mb-1">सारांश *</label>
        <textarea
          className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
          value={summary}
          onChange={e => setSummary(e.target.value)}
          required
          placeholder="संक्षिप्त सारांश लिखें"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-green-700 font-semibold mb-1">श्रेणी *</label>
        <select
          className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-green-700 font-semibold mb-1">लेखक *</label>
        <input
          type="text"
          className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
          placeholder="अपना नाम लिखें"
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition w-full"
        disabled={loading}
      >
        {loading ? "जोड़ रहा है..." : "न्यूज़/ब्लॉग जोड़ें"}
      </button>
      {success && (
        <div className="text-green-700 font-semibold mt-2">आपका न्यूज़/ब्लॉग सफलतापूर्वक जोड़ा गया!</div>
      )}
    </form>
  );
};

export default NewsSubmissionForm; 