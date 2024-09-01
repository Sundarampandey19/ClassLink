import React from 'react';

export default function WhatsAppWebHome() {
  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">

      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 dark:bg-gray-800 border-r dark:border-gray-700">
        {/* <div className="p-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">WhatsApp</h1>
        </div> */}
        <div className="p-4 border-b dark:border-gray-700">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="overflow-y-auto">
          {/* Add list of contacts/chats here */}
          <div className="p-4 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">John Doe</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Hey! How are you?</p>
          </div>
          <div className="p-4 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Jane Smith</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Let's catch up soon!</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <div className="text-center px-8">
          {/* <img
            src="https://web.whatsapp.com/img/intro-connection-light_2001fc19a6368ed0d2a5abe33d04c180.jpg"
            alt="WhatsApp Intro"
            className="mb-8"
          /> */}
          <h2 className="text-3xl font-light mb-4 text-gray-900 dark:text-white">Keep your phone connected</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Class Link connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.
          </p>
          <hr className="w-full mb-4 border-gray-300 dark:border-gray-600" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="text-blue-500 dark:text-blue-400">
              Need help getting started?
            </a>
          </p>
        </div>
      </div>

    </div>
  );
}
