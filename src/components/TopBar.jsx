import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMenu, FiGrid, FiList, FiSettings, FiChevronDown } = FiIcons;

const TopBar = ({ onMenuClick, activeTab, setActiveTab }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [showSettings, setShowSettings] = useState(false);

  const tabs = ['Summary', "What's New", 'Download Workbook'];

  return (
    <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md hover:bg-white/10 transition-colors lg:hidden"
          >
            <SafeIcon icon={FiMenu} className="text-xl" />
          </button>
          <h1 className="text-xl font-bold">dSAT</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Toggle */}
          <div className="flex items-center bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <SafeIcon icon={FiGrid} className="text-lg" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <SafeIcon icon={FiList} className="text-lg" />
            </button>
          </div>

          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <SafeIcon icon={FiSettings} className="text-lg" />
              <SafeIcon icon={FiChevronDown} className="text-sm" />
            </button>

            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              >
                <div className="py-2">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Account Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Preferences
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                    Notifications
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="px-4 pb-3">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative py-2 px-1 text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? 'text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;