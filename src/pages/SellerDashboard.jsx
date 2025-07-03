import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiDollarSign, FiPackage, FiTrendingUp } = FiIcons;

const SellerDashboard = () => {
  const { userProducts, updateProduct, deleteProduct } = useProducts();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  const stats = [
    {
      label: 'Active Listings',
      value: userProducts.filter(p => p.status === 'active').length,
      icon: FiPackage,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Total Sales',
      value: '$2,450',
      icon: FiDollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Views This Month',
      value: '1,234',
      icon: FiEye,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      label: 'Success Rate',
      value: '94%',
      icon: FiTrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ];

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updateProduct(id, { status: newStatus });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
            </div>
            <Link
              to="/sell"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiPlus} />
              <span>Add Product</span>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['products', 'orders', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'products' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Products</h3>
                
                {userProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiPackage} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No products listed yet</h4>
                    <p className="text-gray-600 mb-6">Start selling by adding your first product</p>
                    <Link
                      to="/sell"
                      className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center space-x-2"
                    >
                      <SafeIcon icon={FiPlus} />
                      <span>Add Your First Product</span>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.category}</p>
                            <p className="font-bold text-purple-600">${product.price}</p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {product.status}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleToggleStatus(product.id, product.status)}
                              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                              title={product.status === 'active' ? 'Deactivate' : 'Activate'}
                            >
                              <SafeIcon icon={FiEye} />
                            </button>
                            <button
                              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                              title="Edit"
                            >
                              <SafeIcon icon={FiEdit} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <SafeIcon icon={FiTrash2} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Orders</h3>
                <div className="text-center py-12">
                  <p className="text-gray-600">No orders yet. Orders will appear here when customers purchase your products.</p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics</h3>
                <div className="text-center py-12">
                  <p className="text-gray-600">Analytics dashboard coming soon. Track your sales performance and customer insights.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;