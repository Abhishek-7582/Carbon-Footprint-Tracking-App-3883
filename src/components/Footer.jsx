import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-purple-400 mb-4">MarketPlace</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop marketplace for buying and selling everything. 
              Join millions of users trading safely and securely.
            </p>
            <div className="flex space-x-4">
              <SafeIcon icon={FiFacebook} className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <SafeIcon icon={FiTwitter} className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <SafeIcon icon={FiInstagram} className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products/all" className="text-gray-300 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/sell" className="text-gray-300 hover:text-white transition-colors">Sell Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/products/electronics" className="text-gray-300 hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/products/fashion" className="text-gray-300 hover:text-white transition-colors">Fashion</Link></li>
              <li><Link to="/products/home-garden" className="text-gray-300 hover:text-white transition-colors">Home & Garden</Link></li>
              <li><Link to="/products/sports" className="text-gray-300 hover:text-white transition-colors">Sports</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">support@marketplace.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMapPin} className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">123 Market St, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 MarketPlace. All rights reserved. | Terms of Service | Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;