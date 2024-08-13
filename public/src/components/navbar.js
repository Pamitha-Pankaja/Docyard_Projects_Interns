import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">DOC CAFE CANTEEN</div>
        <div className="space-x-4">
          <Link to="/" className="text-lg">Home</Link>
          <Link to="/menu" className="text-lg">Menu</Link>
          <Link to="/order" className="text-lg">Order</Link>
          <Link to="/about" className="text-lg">About</Link>
          <Link to="/contact" className="text-lg">Contact</Link>
        </div>
        <div className="flex items-center">
          <FaUserCircle size={32} className="text-gray-700" />
          <div className="ml-2 text-lg">Jhon</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
