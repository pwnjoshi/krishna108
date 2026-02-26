import Link from 'next/link';

/**
 * 404 Not Found Page for Post Routes
 * 
 * Displayed when a post slug doesn't exist in the database
 * 
 * Requirements: 6.2
 */

export default function PostNotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Post Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            The devotional post you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
        </div>

        <div className="bg-saffron/10 border border-saffron/30 rounded-lg p-8 mb-8">
          <p className="text-gray-700 mb-4">
            Perhaps you&apos;d like to explore our latest spiritual insights?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-saffron text-white font-semibold rounded-lg hover:bg-saffron/90 transition-colors"
          >
            Return to Homepage
          </Link>
          <Link
            href="/about"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Learn About Us
          </Link>
        </div>
      </div>
    </main>
  );
}
