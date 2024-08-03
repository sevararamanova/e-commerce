import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/" className="text-white">
          MyShop
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/liked" className="flex items-center gap-1">
          <FaHeart size={24} />
          <span>Likes</span>
        </Link>
        <Link to="/cart" className="flex items-center gap-1">
          <FaShoppingCart size={24} />
          <span>Cart</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
