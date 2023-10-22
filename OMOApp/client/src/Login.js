import React, { useState } from 'react';
import axios from 'axios';
import MenuBar from './MenuBar';
import LoginBar from './LoginBar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/login', {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      window.location.href = '/portfolio';
    } catch (error) {
      console.error('Login failed:', error);
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <LoginBar/>
    <div className="h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
        <form className="w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-8 border rounded shadow-lg bg-gray-800" onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>

            {message && (
            <div className="mb-4 text-center p-2 rounded bg-red-500 text-white">
              {message}
            </div>
          )}

            <label className="block mb-4" htmlFor="username">
                <span className="text-gray-400">Username:</span>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    className="form-input mt-1 block w-full p-2 rounded bg-gray-700 text-white border-0 focus:ring-0"
                />
            </label>

            <label className="block mb-6" htmlFor="password">
                <span className="text-gray-400">Password:</span>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="form-input mt-1 block w-full p-2 rounded bg-gray-700 text-white border-0 focus:ring-0"
                />
            </label>

            <button
                type="submit"
                className="bg-violet-700 text-white w-full py-3 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
                Login
            </button>
        </form>
    </div>
    </div>
);


};

export default Login;
