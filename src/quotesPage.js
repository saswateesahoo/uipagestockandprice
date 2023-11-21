import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const { symbol } = useParams();

  useEffect(() => {
    fetch(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setQuotes(data.payload[symbol] || []);
        }
      })
      .catch((error) => console.log('Error fetching'));
  }, [symbol]);
  return (
    <div>
      <h1>welcome to {symbol}</h1>
      <table>
        <thead>
        
          <tr>
    
            <th>Time</th>
            <th>Price</th>
            <th>ValidTill</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote, index) => (
            <tr key={index}>
              <td>{quote.time}</td>
              <td>{quote.price}</td>
              <td>{quote.valid_till}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default QuotesPage;

