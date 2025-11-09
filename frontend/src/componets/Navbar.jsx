import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react"; // install lucide-react if not installed

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-[#E8F9E9] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-semibold text-green-700 hover:text-green-800"
          >
            ShopEase
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600 transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-green-600 transition duration-200"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-green-600 transition duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-green-600 transition duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-green-700 hover:text-green-800" />
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </Link>

            {/* Login & Signup */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/login"
                className="text-gray-700 hover:text-green-600 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm transition duration-200"
              >
                Sign Up
              </Link>
            </div>

            {/* Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-green-700 focus:outline-none"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-inner">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-green-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-gray-700 hover:text-green-600"
              onClick={toggleMenu}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-green-600"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-green-600"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <hr className="border-gray-200" />
            <Link
              to="/login"
              className="block text-gray-700 hover:text-green-600"
              onClick={toggleMenu}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg"
              onClick={toggleMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
