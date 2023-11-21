import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StockPage from './StockPage';
import QuotesPage from './quotesPage';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="/quotes/:symbol" element={<QuotesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;