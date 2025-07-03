import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShield, FiMapPin, FiClock, FiStar, FiCheck } = FiIcons;

const Offsets = () => {
  const [selectedOffset, setSelectedOffset] = useState(null);

  const offsetProjects = [
    {
      id: 1,
      name: 'Amazon Rainforest Conservation',
      location: 'Brazil',
      type: 'Forest Protection',
      price: '$12/tCO₂',
      rating: 4.9,
      verified: true,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      description: 'Protecting 10,000 hectares of pristine rainforest'
    },
    {
      id: 2,
      name: 'Wind Energy Project',
      location: 'India',
      type: 'Renewable Energy',
      price: '$8/tCO₂',
      rating: 4.7,
      verified: true,
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop',
      description: 'Clean wind energy generation facility'
    },
    {
      id: 3,
      name: 'Reforestation Initiative',
      location: 'Kenya',
      type: 'Tree Planting',
      price: '$15/tCO₂',
      rating: 4.8,
      verified: true,
      image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=300&fit=crop',
      description: 'Planting native trees in degraded areas'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Carbon Offsets</h1>
        <p className="text-gray-600">Purchase verified carbon credits to neutralize your emissions</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Offset Calculator</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Monthly Emissions</p>
              <p className="text-2xl font-bold text-gray-900">2.4 tCO₂</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 mb-1">Offset Cost</p>
              <p className="text-2xl font-bold text-green-600">$28.80</p>
            </div>
            <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Calculate Custom Offset
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-6">
            {offsetProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                          <SafeIcon icon={FiMapPin} className="text-xs" />
                          <span>{project.location}</span>
                          <span>•</span>
                          <span>{project.type}</span>
                        </div>
                      </div>
                      {project.verified && (
                        <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                          <SafeIcon icon={FiShield} className="text-green-600 text-xs" />
                          <span className="text-xs text-green-700 font-medium">Verified</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiStar} className="text-yellow-500 text-sm" />
                          <span className="text-sm font-medium">{project.rating}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{project.price}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedOffset(project.id)}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                      >
                        Select
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {selectedOffset && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedOffset(null)}
        >
          <div className="bg-white rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Purchase Carbon Offsets</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Selected Project</p>
                <p className="font-medium">{offsetProjects.find(p => p.id === selectedOffset)?.name}</p>
              </div>
              <div className="flex justify-between items-center">
                <span>Amount: 2.4 tCO₂</span>
                <span className="font-bold">$28.80</span>
              </div>
              <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                <SafeIcon icon={FiCheck} />
                <span>Purchase Offsets</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Offsets;