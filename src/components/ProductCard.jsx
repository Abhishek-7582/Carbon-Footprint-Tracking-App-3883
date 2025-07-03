import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCart } from '../context/CartContext';

const { FiStar, FiHeart, FiShoppingCart } = FiIcons;

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <Link to={`/product/${product.id}`} className="flex p-4">
          <div className="w-32 h-32 flex-shrink-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <div className="flex-1 ml-4">
            <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
            
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <SafeIcon
                    key={i}
                    icon={FiStar}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">({product.reviews || 0})</span>
            </div>
            
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.discount && (
                <span className="text-sm text-green-600 font-semibold">
                  {product.discount}% off
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
          </div>
          
          <div className="flex flex-col space-y-2 ml-4">
            <button
              onClick={handleAddToCart}
              className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiHeart} className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square p-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <SafeIcon
                  key={i}
                  icon={FiStar}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({product.reviews || 0})</span>
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-gray-900">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {product.discount && (
            <div className="text-sm text-green-600 font-semibold mb-3">
              {product.discount}% off
            </div>
          )}
        </div>
      </Link>
      
      <div className="px-4 pb-4 flex space-x-2">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-yellow-400 text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors text-sm"
        >
          Add to Cart
        </button>
        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <SafeIcon icon={FiHeart} className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;