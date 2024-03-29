import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
    const { symbol } = useParams('');

  const fetchQuotes = React.useCallback(() => {
    fetch(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const quotesData = data.payload[symbol] || [];
          const sortingQuotes = sortQuotes(quotesData);
          setQuotes(sortingQuotes);
        }
      })
       .catch(() => console.log('Error fetching'));
   }, [symbol]);

  useEffect(() => {
    fetchQuotes(); 

    const intervalId = setInterval(() => {
      window.location.reload(); 
    }, 20000);

    return () => {
      clearInterval(intervalId); 
    };
  }, [fetchQuotes]);
  
  const sortQuotes = (quotesData) => {
    const sortingQuotes = [...quotesData].sort((a, b) => {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();
      return timeA - timeB; 
    });
    return sortingQuotes;
  };

  return (
    <div>
      <h1>Welcome to {symbol}</h1>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Price</th>
            <th>Valid Till</th>
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