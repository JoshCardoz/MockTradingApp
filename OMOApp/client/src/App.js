import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Portfolio from './Portfolio';
import SearchBar from './Search';
import StockDetails from './StockDetails';
import './tailwind.css';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/portfolio" element={<Portfolio/>} />
        <Route path="/search" element = {<SearchBar/>}/>
        <Route path="/details/:symbol" element={<StockDetails/>} />
      </Routes>
    </Router>  
    
  );
};

export default App;

