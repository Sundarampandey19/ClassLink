import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <header className="w-full py-6 bg-blue-600 text-white text-center">
        <h1 className="text-3xl font-bold">Institution Chat App</h1>
        <p className="mt-2 text-lg">Streamline communication between teachers and students</p>
      </header>

      <main className="flex flex-col items-center mt-12">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Your Institution's Chat Hub</h2>
        <p className="text-gray-700 mb-8 text-center">
          Connect with teachers and classmates in one place. Sign up now to get started!
        </p>
        <Link to="/signup">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
            Get Started
          </button>
        </Link>
      </main>

      <footer className="w-full py-4 bg-gray-800 text-white text-center mt-auto">
        <p>&copy; 2024 Institution Chat App. All rights reserved.</p>
      </footer>
    </div>
  );
}
