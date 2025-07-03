import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiX, FiPlus, FiLogOut } = FiIcons;

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { getTotalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products/search?q=${searchQuery}`);
      setShowMobileMenu(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  const categories = [
    'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Automotive', 'Health & Beauty', 'Toys & Games'
  ];

  // Don't render header on login page if not authenticated
  if (!isAuthenticated && window.location.hash.includes('/login')) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-purple-600"
            >
              MarketPlace
            </motion.div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 pr-12 text-gray-900 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <SafeIcon icon={FiSearch} className="text-lg" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Sell Button */}
            <Link
              to="/sell"
              className="hidden md:flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="text-sm" />
              <span className="text-sm font-medium">Sell</span>
            </Link>

            {/* User Menu */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <SafeIcon icon={FiUser} className="text-lg text-gray-600" />
                  <span className="hidden md:block text-sm text-gray-700">{user?.name}</span>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My Orders
                      </Link>
                      {user?.isSeller && (
                        <Link
                          to="/seller-dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Seller Dashboard
                        </Link>
                      )}
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiLogOut} className="text-sm" />
                          <span>Logout</span>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <SafeIcon icon={FiShoppingCart} className="text-lg text-gray-600" />
              <span className="hidden md:block text-sm text-gray-700">Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2"
            >
              <SafeIcon icon={showMobileMenu ? FiX : FiMenu} className="text-xl text-gray-600" />
            </button>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="hidden md:flex items-center space-x-8 py-3 border-t border-gray-200">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors whitespace-nowrap"
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pr-12 text-gray-900 bg-gray-100 rounded-full focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-purple-600"
                >
                  <SafeIcon icon={FiSearch} className="text-lg" />
                </button>
              </div>
            </form>

            {/* Mobile Sell Button */}
            <Link
              to="/sell"
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors mb-4"
              onClick={() => setShowMobileMenu(false)}
            >
              <SafeIcon icon={FiPlus} className="text-sm" />
              <span className="text-sm font-medium">Sell Product</span>
            </Link>

            {/* Mobile Categories */}
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;