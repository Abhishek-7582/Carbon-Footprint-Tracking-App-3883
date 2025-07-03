import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiPlusCircle, FiBarChart3, FiShield, FiUser } = FiIcons;

const Navigation = () => {
  const navItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/track', icon: FiPlusCircle, label: 'Track' },
    { path: '/insights', icon: FiBarChart3, label: 'Insights' },
    { path: '/offsets', icon: FiShield, label: 'Offsets' },
    { path: '/profile', icon: FiUser, label: 'Profile' }
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <SafeIcon 
                  icon={item.icon} 
                  className={`text-xl mb-1 ${isActive ? 'text-green-600' : 'text-gray-600'}`} 
                />
                <span className="text-xs">{item.label}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;