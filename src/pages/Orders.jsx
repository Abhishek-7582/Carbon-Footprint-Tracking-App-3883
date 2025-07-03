import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPackage, FiTruck, FiCheck, FiClock, FiX } = FiIcons;

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all');

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 1349.00,
      status: 'delivered',
      items: [
        {
          name: 'iPhone 15 Pro Max',
          price: 1349.00,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop'
        }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-12',
      total: 309.98,
      status: 'shipped',
      items: [
        {
          name: 'Nike Air Max 270',
          price: 129.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop'
        },
        {
          name: 'Adidas Ultraboost',
          price: 179.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=100&h=100&fit=crop'
        }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-10',
      total: 899.99,
      status: 'processing',
      items: [
        {
          name: 'Dell XPS 13',
          price: 899.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop'
        }
      ]
    },
    {
      id: 'ORD-004',
      date: '2024-01-08',
      total: 29.99,
      status: 'cancelled',
      items: [
        {
          name: 'The Alchemist',
          price: 29.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop'
        }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return FiCheck;
      case 'shipped': return FiTruck;
      case 'processing': return FiClock;
      case 'cancelled': return FiX;
      default: return FiPackage;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredOrders = activeTab === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === activeTab);

  const orderCounts = {
    all: mockOrders.length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    shipped: mockOrders.filter(o => o.status === 'shipped').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length,
    cancelled: mockOrders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-1">Track and manage your orders</p>
      </motion.div>

      {/* Order Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'all', label: 'All Orders' },
              { key: 'processing', label: 'Processing' },
              { key: 'shipped', label: 'Shipped' },
              { key: 'delivered', label: 'Delivered' },
              { key: 'cancelled', label: 'Cancelled' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {orderCounts[tab.key] > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {orderCounts[tab.key]}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <SafeIcon icon={FiPackage} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">
                {activeTab === 'all' 
                  ? "You haven't placed any orders yet" 
                  : `No ${activeTab} orders found`}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          <SafeIcon icon={getStatusIcon(order.status)} className="w-4 h-4 mr-1" />
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">{order.items.length} item(s)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex space-x-3">
                        {order.status === 'delivered' && (
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            Write Review
                          </button>
                        )}
                        {order.status !== 'cancelled' && order.status !== 'delivered' && (
                          <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                            Cancel Order
                          </button>
                        )}
                        <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                          View Details
                        </button>
                      </div>
                      
                      {order.status === 'delivered' && (
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                          Buy Again
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;