import React, { useState, useEffect } from 'react';
import instance from './Instance';
import LoginBar from './LoginBar';
import MenuBar from './MenuBar';

const Portfolio = () => {
  const [name, setName] = useState(0);
  const [balance, setBalance] = useState(0);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await instance.get('/portfolio')
        .then(response => {
          setName(response.data.username);
          setBalance(response.data.USDBalance);
          setHoldings(response.data.tokens);
        })
        .catch(error =>{
          console.log(`Failed to authenticate: ${error}`);
        })
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-screen">
        <MenuBar />
        <div className="p-8 border rounded shadow-lg bg-gray-800 m-8">
            <h2 className="text-3xl font-bold mb-4 text-white">Portfolio</h2>
            <div className="mb-4">
                <p className="text-lg text-gray-400">
                    <span className="font-bold text-white">User:</span> {name}
                </p>
                <p className="text-lg text-gray-400">
                    <span className="font-bold text-white">Balance:</span> ${balance}
                </p>
            </div>
            <div>
                <p className="text-lg font-bold mb-2 text-white">Holdings:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {holdings.map((stock, index) => (
                        <a
                            key={index}
                            href={`/details/${stock.stockTicker}`}
                            rel="noopener noreferrer"
                            className="p-4 bg-gray-700 text-white rounded-md shadow-md block transition duration-300 transform hover:scale-105"
                        >
                            <p className="text-xl font-bold mb-2 text-gray-400">
                                <span className="text-white">Stock Name:</span> {stock.stockTicker}
                            </p>
                            <p className="text-lg text-gray-400">
                                <span className="text-white">Balance:</span> {stock.balance}
                            </p>
                        </a>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);


};

export default Portfolio;
