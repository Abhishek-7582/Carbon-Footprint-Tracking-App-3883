import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiUsers, FiUser, FiBookOpen, FiMapPin, FiLayers, FiHelpCircle, FiLogOut, FiX } = FiIcons;

const Sidebar = ({ isOpen, onClose, onLogout }) => {
  const { user } = useAuth();
  
  const menuItems = [
    { icon: FiHome, label: 'Dashboard', active: true },
    { icon: FiUsers, label: 'Students', active: false },
    { icon: FiUser, label: 'Instructors', active: false },
    { icon: FiBookOpen, label: 'Classes', active: false },
    { icon: FiMapPin, label: 'Locations', active: false },
    { icon: FiLayers, label: 'Course Templates', active: false },
    { icon: FiHelpCircle, label: 'Help', active: false },
  ];

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          <SidebarContent 
            menuItems={menuItems} 
            onLogout={onLogout}
            onClose={onClose}
            user={user}
            getInitials={getInitials}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-gray-200 lg:hidden"
      >
        <SidebarContent 
          menuItems={menuItems} 
          onLogout={onLogout}
          onClose={onClose}
          showCloseButton={true}
          user={user}
          getInitials={getInitials}
        />
      </motion.div>
    </>
  );
};

const SidebarContent = ({ menuItems, onLogout, onClose, showCloseButton, user, getInitials }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {getInitials(user?.name)}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500">
              {user?.role || 'Instructor'}
            </p>
          </div>
        </div>
        {showCloseButton && (
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={FiX} className="text-gray-500" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href="#"
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={item.icon} className="mr-3 text-lg" />
                <span className="font-medium">{item.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <SafeIcon icon={FiLogOut} className="mr-3 text-lg" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;