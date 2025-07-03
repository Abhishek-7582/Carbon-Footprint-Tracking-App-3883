import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTruck, FiZap, FiDroplet, FiTrash2 } = FiIcons;

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: 'Transportation',
      description: 'Delivery truck - 120 km',
      emissions: '0.8 tCO₂',
      time: '2 hours ago',
      icon: FiTruck,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'Energy',
      description: 'Office electricity usage',
      emissions: '1.2 tCO₂',
      time: '5 hours ago',
      icon: FiZap,
      color: 'text-yellow-600'
    },
    {
      id: 3,
      type: 'Water',
      description: 'Manufacturing process',
      emissions: '0.3 tCO₂',
      time: '1 day ago',
      icon: FiDroplet,
      color: 'text-cyan-600'
    },
    {
      id: 4,
      type: 'Waste',
      description: 'Packaging waste disposal',
      emissions: '0.1 tCO₂',
      time: '2 days ago',
      icon: FiTrash2,
      color: 'text-red-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-8"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-lg">
                <SafeIcon icon={activity.icon} className={`text-lg ${activity.color}`} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{activity.type}</h4>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{activity.emissions}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivities;