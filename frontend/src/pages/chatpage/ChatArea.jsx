import { authState } from '@/store/authState';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { io } from 'socket.io-client';

export default function ChatArea({ selectedChat }) {
  // console.log(selectedChat)
  const auth = useRecoilValue(authState);
  // console.log(auth)

  const [message, setmessage] = useState("")
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    const newSocket = io('http://localhost:3000', {
      auth: {
        token: token // Send the token to authenticate
      }
    });
    
    setSocket(newSocket);

    // Join room when a friend is selected
    if (selectedChat) {
      newSocket.emit('joinRoom', { roomId: selectedChat.chat_uid });
    }

    // Listen for incoming messages
    newSocket.on('receiveMessage', (message) => {
      console.log("somethis")  
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log(messages)
    });

    return () => {
      newSocket.disconnect();
    };
  }, [selectedChat]);

  function sendMessage() {
    console.log(message)
    if (message.trim() && socket) {
      const chatMessage = {
        roomId: selectedChat.chat_uid,
        sender: auth.username,  // You can replace this with the actual sender name/ID
        message,
      };
      socket.emit('message', chatMessage);  // Emit message to the server
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
      setmessage("");
    }         
  }
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex flex-col h-full">
      {selectedChat ? (
        <>
          <div className="p-4 bg-gray-200 dark:bg-gray-700 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Chat with {selectedChat.name}
            </h2>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100 dark:bg-gray-900">
            {JSON.stringify(messages)}  
            {/* {chats[selectedChat.user_id]?.map((chat, index) => (
                        <div
                          key={index}
                          className={`p-2 mb-2 rounded-lg ${
                            chat.sender === 'You' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          <p>{chat.message}</p>
                        </div>
                      ))} */}

          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the page from refreshing
              sendMessage(); // Call the sendMessage function
            }}
            className="p-4 flex gap-4 bg-gray-200 dark:bg-gray-700 border-t dark:border-gray-700"
          >
            <textarea
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              rows="1"
              style={{ resize: 'none' }}
            />
            <button className='btn btn-primary' type='submit'>Send</button>
          </form>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-600 dark:text-gray-400">
          Select a contact to start chatting.
        </div>
      )
      }
    </div >
  );
}
