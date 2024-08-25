import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">

      <main className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-600 dark:text-green-400">Welcome to Class Link</h1>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          Your centralized communication tool for universities. 
          Connect with your teachers and classmates seamlessly and stay updated on all academic activities.
        </p>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Features</h2>
          <ul className="list-disc list-inside text-left text-gray-800 dark:text-gray-200">
            <li className="mb-2">Real-time messaging for efficient communication.</li>
            <li className="mb-2">Organized channels for different subjects and groups.</li>
            <li className="mb-2">Seamless integration with your university’s systems.</li>
            <li className="mb-2">User-friendly interface with easy navigation.</li>
          </ul>
        </div>
        <Link to={"/signup"}
          className="mt-8 bg-green-500 dark:bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-600 dark:hover:bg-green-700"
          >
          Get Started 
          </Link>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">© 2024 Class Link. All rights reserved.</p>
      </footer>
    </div>
  );
}
