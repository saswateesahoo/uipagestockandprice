import React, { useState, useEffect } from 'react';

const StockPage = () => {
  const [stock, setStock] = useState([]);
  const [Stockfiltered, setStockfiltered] = useState([]);
  const [searchitem, setSearchitem] = useState([]);

  useEffect(() => {
    fetch('https://prototype.sbulltech.com/api/v2/instruments')
      .then((response) => response.text())
      .then((data) => {
        const jsonData = convertCSVtoJSON(data);
        setStock(jsonData);
        setStockfiltered(jsonData);
      })
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
    const value = e.target.value.toLowerCase();
    setSearchitem(value);
    const filtered = stock.filter(
      (stock) =>
        stock.Symbol.toLowerCase().includes(value) ||
        stock.Name.toLowerCase().includes(value)   ||
        stock.Sector.toLowerCase().includes(value)  ||
        stock.Validtill.toLowerCase().includes(value)
    );
    setStockfiltered(filtered);
  };

  return (
    <div>
      
      <input
        type="text"
         placeholder="Search here .."
        value={searchitem}
        onChange={handleSearch}
      />
      <table>
        <thead> 
        <br></br>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Sector</th>
            <th>Validtill</th>
          </tr>
         </thead> 
        <tbody>
          {Stockfiltered.map((stock, index) => (
            <tr key={index}>
              <td>{stock.Symbol}</td>
              <td>{stock.Name}</td>
              <td>{stock.Sector}</td>
              <td>{stock.Validtill}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
 };

export default StockPage;
