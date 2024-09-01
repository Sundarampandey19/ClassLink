import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { authState } from '@/store/authState';
import { useRecoilState } from 'recoil';

export default function Login(){
  const navigate = useNavigate()
  const [auth, setAuth] = useRecoilState(authState);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username ||  !password) {
      setError('All fields are required');
      return;
    }

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  username, password })
    });
    console.log(response) 
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setAuth({ token: data.token, username });
      console.log("token:",data.token)
      navigate("/chats");
      toast.success('Logged In successfully!');
    } else {
      alert("Error while signing up");
    }

    console.log('Form submitted:', formData);
    setError(''); // Clear the error if the form is submitted successfully
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 dark:bg-blue-700 text-white p-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800 transition"
          >
            Log in
          </button>
          <Toaster />
        </form>
      </div>
    </div>
  );
}
