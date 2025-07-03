import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { useProducts } from '../context/ProductContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiFilter, FiGrid, FiList } = FiIcons;

const ProductList = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const { products, getProductsByCategory, searchProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    let filtered = [];

    // Get products based on category or search
    if (category === 'search') {
      const searchQuery = searchParams.get('q');
      filtered = searchQuery ? searchProducts(searchQuery) : [];
    } else if (category === 'all') {
      filtered = products;
    } else {
      filtered = getProductsByCategory(category);
    }

    setFilteredProducts(filtered);
  }, [category, searchParams, products, getProductsByCategory, searchProducts]);

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredProducts];

    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
  };

  const applyFilters = (filters) => {
    let baseProducts = [];
    
    if (category === 'search') {
      const searchQuery = searchParams.get('q');
      baseProducts = searchQuery ? searchProducts(searchQuery) : [];
    } else if (category === 'all') {
      baseProducts = products;
    } else {
      baseProducts = getProductsByCategory(category);
    }

    let filtered = [...baseProducts];

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );
    }

    // Brand filter
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.includes(product.brand)
      );
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // Condition filter
    if (filters.condition && filters.condition.length > 0) {
      filtered = filtered.filter(product => 
        filters.condition.includes(product.condition || 'new')
      );
    }

    setFilteredProducts(filtered);
  };

  const getCategoryTitle = () => {
    if (category === 'search') {
      const searchQuery = searchParams.get('q');
      return `Search Results for "${searchQuery}"`;
    } else if (category === 'all') {
      return 'All Products';
    } else {
      return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getCategoryTitle()}
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <SafeIcon icon={FiGrid} className="text-lg" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <SafeIcon icon={FiList} className="text-lg" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* Filter Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            <SafeIcon icon={FiFilter} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filter Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
          <FilterSidebar onApplyFilters={applyFilters} />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} viewMode={viewMode} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;