// frontend/src/App.jsx
import { useState } from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";

export default function App() {
  const [urls, setUrls] = useState([]);

  const handleNewUrl = (shortenedUrl) => {
    setUrls((prev) => [shortenedUrl, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">🔗 URL Shortener</h1>
      <UrlForm onShorten={handleNewUrl} />
      <UrlList urls={urls} />
    </div>
  );
}
