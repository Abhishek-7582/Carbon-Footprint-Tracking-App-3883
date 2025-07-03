import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiClock, FiFileText, FiBook } = FiIcons;

const AverageMetrics = () => {
  const metrics = [
    {
      title: 'Hours of Instruction',
      value: '0',
      unit: 'hours',
      icon: FiClock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Practice Tests',
      value: '1.7',
      unit: 'tests',
      icon: FiFileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Lessons',
      value: '26.3',
      unit: 'lessons',
      icon: FiBook,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Averages</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`${metric.bgColor} rounded-lg p-4`}
          >
            <div className="flex items-center justify-between mb-3">
              <SafeIcon icon={metric.icon} className={`${metric.color} text-xl`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-gray-600">{metric.title}</div>
            <div className="text-xs text-gray-500 mt-1">{metric.unit}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AverageMetrics;