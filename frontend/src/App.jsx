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
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-blue-50 text-gray-800 font-sans relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#dbeafe_1px,transparent_1px)] [background-size:20px_20px] opacity-60 -z-10"></div>

      <main className="container mx-auto px-4 py-8 sm:py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Main Header */}
        <div className="w-full max-w-2xl bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-8 sm:p-12 text-center animate-fade-in-up">
          <h1 className="text-4xl pb-2 sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 drop-shadow-md">
            🔗 Link Leap
          </h1>
          <p className="text-gray-700 mt-4 text-base sm:text-lg leading-relaxed">
            Create short, elegant, and powerful links in seconds.
          </p>

          {/* URL Form */}
          <div className="mt-10">
            <UrlForm onShorten={handleNewUrl} />
          </div>
        </div>

        {/* URL List */}
        {urls.length > 0 && (
          <div className="w-full max-w-2xl mt-10 animate-fade-in-up">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              ✨ Your Recent Links
            </h2>
            <UrlList urls={urls} />
          </div>
        )}

        {/* Footer */}
        <footer className="w-full max-w-2xl mt-16 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-indigo-600">URL Shortener</span>.  
            Built with ❤️ for the web.
          </p>
        </footer>
      </main>

      {/* Styles for animation and hover effects */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap");

        body {
          font-family: "Plus Jakarta Sans", sans-serif;
          background-attachment: fixed;
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
