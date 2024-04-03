// hooks/useBooks.js
import { useState, useEffect } from 'react';
import booksData from './Books.json'; // Import the local JSON file

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Fetched data:', booksData); 
        if (Array.isArray(booksData.data)) {
          setBooks(booksData.data); 
        } else {
          throw new Error('Books data is not in the expected format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); 
      }
    };

    fetchData();

    return () => {
    };
  }, []);

  console.log('Books:', books); 

  return [books, loading];
};
