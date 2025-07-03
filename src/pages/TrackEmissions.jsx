import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTruck, FiZap, FiDroplet, FiTrash2, FiPlus, FiCamera } = FiIcons;

const TrackEmissions = () => {
  const [selectedCategory, setSelectedCategory] = useState('transportation');
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    unit: 'km'
  });

  const categories = [
    { id: 'transportation', name: 'Transportation', icon: FiTruck, color: 'bg-blue-500' },
    { id: 'energy', name: 'Energy', icon: FiZap, color: 'bg-yellow-500' },
    { id: 'water', name: 'Water', icon: FiDroplet, color: 'bg-cyan-500' },
    { id: 'waste', name: 'Waste', icon: FiTrash2, color: 'bg-red-500' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { category: selectedCategory, ...formData });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Emissions</h1>
        <p className="text-gray-600">Log your daily activities to monitor carbon footprint</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Category</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center space-x-3 p-4 rounded-lg border transition-all ${
                  selectedCategory === category.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`p-2 ${category.color} rounded-lg`}>
                  <SafeIcon icon={category.icon} className="text-white text-lg" />
                </div>
                <span className="font-medium text-gray-900">{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Add Activity</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <SafeIcon icon={FiCamera} className="text-gray-600" />
              <span className="text-sm text-gray-600">Scan Receipt</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g., Delivery truck to warehouse"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="km">Kilometers</option>
                  <option value="kwh">kWh</option>
                  <option value="liters">Liters</option>
                  <option value="kg">Kilograms</option>
                </select>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Greta AI Suggestion</h4>
              <p className="text-sm text-green-800">
                Based on your input, this activity will generate approximately <strong>0.8 tCO₂</strong> emissions. 
                Consider using electric vehicles or optimizing routes to reduce impact.
              </p>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiPlus} />
              <span>Add Activity</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackEmissions;