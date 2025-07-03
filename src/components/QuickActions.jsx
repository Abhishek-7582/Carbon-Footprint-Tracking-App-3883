import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiBarChart3, FiShield, FiCamera } = FiIcons;

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Add Emission',
      description: 'Log new activity',
      icon: FiPlus,
      color: 'bg-blue-500',
      onClick: () => navigate('/track')
    },
    {
      title: 'View Insights',
      description: 'AI recommendations',
      icon: FiBarChart3,
      color: 'bg-purple-500',
      onClick: () => navigate('/insights')
    },
    {
      title: 'Buy Offsets',
      description: 'Verified credits',
      icon: FiShield,
      color: 'bg-green-500',
      onClick: () => navigate('/offsets')
    },
    {
      title: 'Scan Receipt',
      description: 'Auto-track purchase',
      icon: FiCamera,
      color: 'bg-orange-500',
      onClick: () => navigate('/track')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.title}
            onClick={action.onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
          >
            <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
              <SafeIcon icon={action.icon} className="text-white text-lg" />
            </div>
            <h4 className="font-medium text-gray-900 text-sm">{action.title}</h4>
            <p className="text-xs text-gray-600 mt-1">{action.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;