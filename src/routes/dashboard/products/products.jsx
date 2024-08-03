import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products);
    } catch (error) {
      setError(error.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  if (loading) {
    return (
      <div className="text-center text-2xl">
        <p>Loading...</p>
      
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center">Error: {error}</div>;
  }
 
  return (
    <div className="p-6">
      <h1 className="text-center text-3xl mb-6">Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <li key={product.id} className="border rounded-lg p-4 shadow-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover rounded-md mb-4" 
              aria-label={product.name}
            />
            <h2 className="text-xl mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">Category: {product.category}</p>
            <p className="text-gray-900 font-bold">Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    
    </div>
  );
};

export default ProductList;
