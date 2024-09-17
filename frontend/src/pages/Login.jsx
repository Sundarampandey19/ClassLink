import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { authState } from '@/store/authState';
import { useRecoilState } from 'recoil';

export default function Login() {
  const navigate = useNavigate();
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

    if (!username || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        const token = localStorage.getItem("token");

        // Fetch user info with the token
        const response2 = await fetch('http://localhost:3000/me', {
          method: 'POST',
          headers: { authorization: `Bearer ${token}` }
        });

        const data2 = await response2.json();
        if (data2.username) {
          setAuth({ token: token, username: data2.username, uid: data2.uid });
          navigate("/chats");
          toast.success('Logged In successfully!');
        } else {
          toast.error("Unable to retrieve user info");
        }
      } else {
        toast.error("Invalid login credentials");
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Log In</h2>
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
