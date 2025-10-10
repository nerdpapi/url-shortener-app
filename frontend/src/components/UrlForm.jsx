// frontend/src/components/UrlForm.jsx
import { useState } from "react";
import axios from "axios";

export default function UrlForm({ onShorten }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    try {
      const res = await axios.post("https://url-shortener-app-backend-kt8e.onrender.com/api/url/shorten", {
        originalUrl: url,
      });
      onShorten(res.data);
      setUrl("");
    } catch (err) {
      console.error("Error shortening URL:", err.message);
      alert("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
                 rounded-2xl p-6 w-full max-w-xl border border-white/50 
                 transition-all duration-300"
    >
      <input
        type="url"
        placeholder="Enter your URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/70 border border-gray-300 
                   shadow-inner placeholder-gray-400 text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 
                   focus:border-indigo-400 transition mb-4"
        required
      />
      <button
        type="submit"
        className="w-full py-3 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 
                   shadow-lg hover:shadow-indigo-300/50 hover:scale-[1.02] 
                   active:scale-[0.98] transition-all duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "⏳ Shortening..." : "✨ Shorten URL"}
      </button>
    </form>
  );
}
