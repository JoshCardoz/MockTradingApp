import React from 'react';
import { Link } from 'react-router-dom'; 

const MenuBar = () => {
    return (
        <div className="bg-gray-950 text-white p-4 flex justify-between">
          
          <a href="/">
            <div className="text-2xl font-bold">Paper.io</div>
        </a>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/portfolio">
              <button className="bg-violet-700 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
                Portfolio
              </button>
            </Link>
            <Link to="/search">
              <button
                className="bg-violet-700 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full ml-4"
              >
                Search
              </button>
            </Link>
          </div>
        </div>
      );
};

export default MenuBar;