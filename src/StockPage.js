import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';

const StockPage = () => {
  const [stock, setStock] = useState([]);
  const [stockFiltered, setStockFiltered] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('https://prototype.sbulltech.com/api/v2/instruments')
      .then((response) => response.text())
      .then((data) => {
        const jsonData = convertCSVtoJSON(data);
        setStock(jsonData);
        setStockFiltered(jsonData);
      });
  }, []);

  const convertCSVtoJSON = (csvData) => {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    const jsonData = lines.slice(1).map((line) => {
      const values = line.split(',');
      const object = {};
      headers.forEach((header, index) => {
        object[header] = values[index];
      });
      return object;
    });
    return jsonData;
  };

  const handleSearch = (e) => {
    const value = e.target.value.trim();
    setSearchItem(value);

    if (!value) {
      setStockFiltered(stock);
      return;
    }
    const opt = {
      keys: ['Symbol', 'Name', 'Sector', 'Validtill'],
    };

    const fuse = new Fuse(stock, opt);
    const result = fuse.search(value);
    const filter = result.map((item) => item.item);
    setStockFiltered(filter);
  };

  const navigateToQuotes = (symbol) => {
    console.log(`Redirecting to Quotes page  ${symbol}`);
    navigate(`/quotes/${symbol}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search here.."
        value={searchItem}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Sector</th>
            <th>Validtill</th>
          </tr>
        </thead>
        <tbody>
          {stockFiltered.map((stockItem, index) => (
            <tr key={index}>
              <td
                style={{ cursor: 'pointer'}}
                onClick={() => navigateToQuotes(stockItem.Symbol)}
              >
                {stockItem.Symbol}
              </td>
              <td>{stockItem.Name}</td>
              <td>{stockItem.Sector}</td>
              <td>{stockItem.Validtill}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockPage;