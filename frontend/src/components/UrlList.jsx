// frontend/src/components/UrlList.jsx
export default function UrlList({ urls }) {
    if (urls.length === 0) {
      return <p className="text-gray-500">No URLs shortened yet.</p>;
    }
  
    return (
      <div className="w-full max-w-md bg-white shadow-md rounded p-4">
        <h2 className="text-lg font-semibold mb-3">Shortened URLs</h2>
        <ul className="space-y-2">
          {urls.map((url, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b pb-2"
            >
              <a
                href={url.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {url.shortUrl}
              </a>
              <span className="text-gray-500 text-sm truncate max-w-[150px]">
                {url.originalUrl}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  