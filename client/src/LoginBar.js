import React from 'react';
import { Link } from 'react-router-dom'; 

const LoginBar = () => {
    return (
        <div className="bg-gray-950 text-white p-4 flex justify-between">
          <a href="/">
            <div className="text-2xl font-bold">Paper.io</div>
        </a>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/register">
              <button className="bg-violet-700 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button
                className="bg-violet-700 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full ml-4"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      );
};

export default LoginBar;