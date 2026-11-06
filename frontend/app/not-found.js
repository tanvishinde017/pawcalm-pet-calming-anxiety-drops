import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-8">Page not found.</p>
        <Link href="/" className="px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">Go Home</Link>
      </div>
    </main>
  );
}
