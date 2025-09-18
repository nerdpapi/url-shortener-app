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
      const res = await axios.post("http://localhost:4000/api/url/shorten", {
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
      className="bg-white shadow-md rounded p-4 w-full max-w-md mb-6"
    >
      <input
        type="url"
        placeholder="Enter your URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-3"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>
  );
}
