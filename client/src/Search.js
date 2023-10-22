import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [queuedSearchTerm, setQueuedSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [allSearch, setAllSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/search/${queuedSearchTerm}`);
      const search = response.data;
      setAllSearch(search);
      setDropdownVisible(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 700);
    return () => clearTimeout(timer); 
  }, [queuedSearchTerm]); 

  const handleInputChange = event => {
    const query = event.target.value;
    setSearchTerm(query);
    setQueuedSearchTerm(query);
  };

  const handleOptionClick = option => {
    const selectedSearch = allSearch.data.find((search) => search.symbol === option.symbol);

    if (selectedSearch) {
      setSearchTerm(option);
      setDropdownVisible(false);
      navigate(`/details/${option.symbol}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-500 h-screen">
        <MenuBar />
        <div className="p-8 border rounded shadow-lg bg-gray-800 m-8 relative">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search..."
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            />
            {dropdownVisible && (
                <ul className="absolute z-10 mt-2 w-full bg-gray-700 border border-gray-600 rounded-md shadow-md">
                    {allSearch.data.map((option, index) => (
                        <li
                            key={index}
                            className="p-2 text-white cursor-pointer hover:bg-gray-600"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.symbol} - {option.instrument_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);

};

export default SearchBar;
