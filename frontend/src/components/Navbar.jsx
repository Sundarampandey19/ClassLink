import React, { useState } from 'react';
import ThemeToggle from './ToogleTheme';
import { Link } from 'react-router-dom';
 // Make sure the import path matches your file structure

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 border-b p-4 flex justify-between items-center">
        <Link to={"/"}>
      <div className="text-xl font-bold text-gray-900 dark:text-white">
        Class Link
      </div>
        </Link>
      <ThemeToggle />
      <div className="relative">
        <button
          className="font-medium text-gray-900 dark:text-white focus:outline-none"
          onClick={handleDropdownToggle}
        >
          Username
        </button>
        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1"
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <a
              href="#logout"
              onClick={handleLogout}
              className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Log out
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
