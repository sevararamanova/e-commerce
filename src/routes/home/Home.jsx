import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to manage liked products
  const [likedProducts, setLikedProducts] = useState(new Set());

  // State to manage cart items
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLike = (productId) => {
    setLikedProducts((prevLikedProducts) => {
      const newLikedProducts = new Set(prevLikedProducts);
      if (newLikedProducts.has(productId)) {
        newLikedProducts.delete(productId);
      } else {
        newLikedProducts.add(productId);
      }
      return newLikedProducts;
    });
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[product.id]) {
        newCart[product.id] += 1;
      } else {
        newCart[product.id] = 1;
      }
      return newCart;
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getCartItemQuantity = (productId) => {
    return cart[productId] || 0;
  };

  if (loading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl mb-6">Home Page</h1>

      {/* Cart Section */}
      <div className="mb-6">
        <h2 className="text-2xl mb-4">Shopping Cart</h2>
        <div>
          {Object.keys(cart).map((productId) => {
            const product = products.find(p => p.id === Number(productId));
            if (!product) return null;
            return (
              <div key={product.id} className="border rounded-lg p-4 mb-4">
                <h3 className="text-xl">{product.name}</h3>
                <p>Quantity: {cart[product.id]}</p>
                <p>Price: ${product.price * cart[product.id]}</p>
                <button
                  onClick={() => handleRemoveFromCart(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">Category: {product.category}</p>
            <p className="text-gray-900 font-bold">Price: ${product.price}</p>

            {/* Like Button */}
            <button
              onClick={() => handleLike(product.id)}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded transition-colors duration-200"
              style={{
                backgroundColor: likedProducts.has(product.id) ? '#ff4d4d' : '#e2e2e2',
                color: likedProducts.has(product.id) ? '#fff' : '#000',
              }}
            >
              {likedProducts.has(product.id) ? (
                <FaHeart />
              ) : (
                <FaRegHeart />
              )}
              <span>{likedProducts.has(product.id) ? '' : ''}</span>
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>

            {/* Quantity Controls */}
            {getCartItemQuantity(product.id) > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => handleRemoveFromCart(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  -
                </button>
                <span>{getCartItemQuantity(product.id)}</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
