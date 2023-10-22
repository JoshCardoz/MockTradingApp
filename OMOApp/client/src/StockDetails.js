
import React, { useState } from 'react';
import {useParams } from 'react-router-dom';
import instance from './Instance';
import axios from 'axios';
import StockGraph from './StockGraph';
import MenuBar from './MenuBar';

const StockDetails = () => {
    const [balance, setBalance] = useState('');
    const [data, setData] = useState('');
    const [stockInfo, setStockInfo] = useState('');
    const [notification, setNotification] = useState(null);

    const { symbol } = useParams();
    const ticker = symbol;
    
    const getStockInfo = async () => {
        try{
            const response = await axios.get(`/api/search/${ticker}`);
            const search = response.data;
            const selectedSearch = search.data.find((stock) => stock.symbol === ticker)
            setStockInfo(selectedSearch);
            console.log(stockInfo);
        }
        catch(error){
            console.log(error);
        }
    }

    if(stockInfo === ''){
        getStockInfo();
    }
    
    const fetchData = async () => {
        try {
          const response = await axios.get(`/contract/${ticker}`);
          setData(response.data);
          console.log(data);
        }
        catch(error){
            console.log(error);
        }};

    if(data === ''){
        fetchData();
    }

    const handleSell = async (e) => {
        e.preventDefault();
    
        console.log('Balance:', balance);
    
        const request = {
            stockTicker: stockInfo.symbol, 
            balance: balance
        };
    
        const response = await instance.post('/portfolio/sell', request);
    
        setNotification(`Successful Sell`);
  
    
        setBalance('');
      };

      const handleBuy = async (e) => {
        e.preventDefault();
    
        console.log('Balance:', balance);
    
        const request = {
            stockTicker: stockInfo.symbol, 
            balance: balance
        };
    
        const response = await instance.post('/portfolio/buy', request);
    
        setNotification(`Successful Buy`);
    
        setBalance('');
      };

      return (       
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-screen">
        <MenuBar/>
            <div className="p-6 border rounded shadow-lg bg-gray-800 m-8">
              {notification && (
          <div className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
              {notification}
          </div>
      )}
                <h2 className="text-3xl font-bold mb-4 text-white"> {stockInfo.instrument_name}</h2>
                <p className="text-lg text-gray-400">
                    <span className="font-bold text-white">Price:</span> {data.stockPrice}
                </p>
                <form className="mt-4">
                    <label className="block mb-2 text-white">
                        Balance:
                        <input
                            type="text"
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                            required
                            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </label>
    
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={handleSell}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sell
                        </button>
                        <button
                            type="button"
                            onClick={handleBuy}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Buy
                        </button>
                    </div>
                </form>
                <div>
                    <StockGraph ticker={stockInfo.symbol} />
                </div>
            </div>
        </div>
    );    
};

export default StockDetails;
