import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  // Initialize the theme state based on localStorage or default to light mode
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // Apply the theme class to the body
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? (
        <svg
          className="w-6 h-6 text-gray-800 dark:text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m-9-9h1m16 0h1m-12-9a9 9 0 110 18 9 9 0 010-18z"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 text-gray-800 dark:text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m-9-9h1m16 0h1m-12-9a9 9 0 0118 0 9 9 0 01-18 0z"
          />
        </svg>
      )}
    </button>
  );
}
