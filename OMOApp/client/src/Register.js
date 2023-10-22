import  React, { useEffect, useState }  from 'react';
import axios from 'axios';
import MenuBar from './MenuBar';
import LoginBar from './LoginBar';

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); 

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/users/register', {
        username,
        password,
      });

      console.log('Registration successful:', response.data);
      setMessage('Registration successful!');
      setIsSuccess(true);
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('Registration failed. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <div>
      <LoginBar/>
    <div className="h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
        <form className="w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-8 border rounded shadow-lg bg-gray-800" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-white">Register</h2>

            {message && (
            <div className={`mb-4 text-center p-2 rounded text-white ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
              {message}
            </div>
          )}

            <label className="block mb-4">
                <span className="text-gray-400">Username:</span>
                <input
                    type="text"
                    className="form-input mt-1 block w-full p-2 rounded bg-gray-700 text-white border-0 focus:ring-0"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
            </label>

            <label className="block mb-6">
                <span className="text-gray-400">Password:</span>
                <input
                    type="password"
                    className="form-input mt-1 block w-full p-2 rounded bg-gray-700 text-white border-0 focus:ring-0"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </label>

            <button
                type="submit"
                className="bg-violet-700 text-white w-full py-3 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
                Register
            </button>

            <div className="mt-4 text-center text-gray-400">
                Already have an account? <a href="/login" className="text-purple-500 hover:underline">Log In</a>
            </div>
        </form>
    </div>
    </div>
);


};

export default Register;
