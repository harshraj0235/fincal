/** Minimal 404 page - no Layout/Header/Sidebar, no next/link (avoids cache() build error). */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="text-xl text-gray-600 mt-2">Page not found</p>
      <p className="text-gray-500 mt-1">This page could not be found.</p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Go to Home
      </a>
    </div>
  );
}
