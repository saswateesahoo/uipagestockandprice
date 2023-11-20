import React from 'react';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StocksPage from './StockPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StocksPage />} />
      </Routes>
    </Router>
  );
};

export default App;


