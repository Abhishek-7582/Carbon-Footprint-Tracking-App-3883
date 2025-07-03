import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiClock, FiPlay, FiArchive } = FiIcons;

const PipelineStats = () => {
  const stats = [
    {
      title: 'Unactivated',
      value: 1,
      icon: FiClock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Current',
      value: 2,
      icon: FiPlay,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Archived',
      value: 0,
      icon: FiArchive,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-lg p-4`}
          >
            <div className="flex items-center justify-between mb-2">
              <SafeIcon icon={stat.icon} className={`${stat.color} text-xl`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PipelineStats;