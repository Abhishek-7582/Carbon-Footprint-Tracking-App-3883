import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiChevronDown, FiChevronUp } = FiIcons;

const FilterSidebar = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    brands: [],
    rating: 0,
    categories: []
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    rating: true,
    category: true
  });

  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG', 'HP', 'Dell'];
  const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports', 'Beauty'];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleBrandChange = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters(prev => ({
      ...prev,
      rating: rating
    }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 100000],
      brands: [],
      rating: 0,
      categories: []
    });
    onApplyFilters({
      priceRange: [0, 100000],
      brands: [],
      rating: 0,
      categories: []
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-purple-600 hover:text-purple-800"
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="font-medium text-gray-900">Price Range</span>
          <SafeIcon
            icon={expandedSections.price ? FiChevronUp : FiChevronDown}
            className="w-4 h-4"
          />
        </button>
        
        {expandedSections.price && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 space-y-2"
          >
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]]
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Min"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  priceRange: [prev.priceRange[0], parseInt(e.target.value) || 100000]
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Max"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Brands */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="font-medium text-gray-900">Brand</span>
          <SafeIcon
            icon={expandedSections.brand ? FiChevronUp : FiChevronDown}
            className="w-4 h-4"
          />
        </button>
        
        {expandedSections.brand && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 space-y-2"
          >
            {brands.map((brand) => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </motion.div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="font-medium text-gray-900">Rating</span>
          <SafeIcon
            icon={expandedSections.rating ? FiChevronUp : FiChevronDown}
            className="w-4 h-4"
          />
        </button>
        
        {expandedSections.rating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 space-y-2"
          >
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">{rating}★ & above</span>
              </label>
            ))}
          </motion.div>
        )}
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;