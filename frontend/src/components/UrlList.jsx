// frontend/src/components/UrlList.jsx
import { useState } from "react";

const UrlCard = ({ originalUrl, shortUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => console.error("Failed to copy text:", err));
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up">
  {/* Original URL */}
  <p
    className="text-gray-600 truncate text-sm sm:text-base text-center sm:text-left max-w-full sm:max-w-[60%] break-words"
    title={originalUrl}
  >
    {originalUrl}
  </p>

      {/* Shortened URL + Copy Button */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors text-sm"
        >
          {shortUrl.replace(/^https?:\/\//, "")}
        </a>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-300 ${
            copied
              ? "bg-green-500 hover:bg-green-600 focus:ring-green-500"
              : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default function UrlList({ urls }) {
  return (
    <div className="space-y-4">
      {urls.map((url, index) => (
        <UrlCard
          key={index}
          originalUrl={url.originalUrl}
          shortUrl={url.shortUrl}
        />
      ))}
    </div>
  );
}
