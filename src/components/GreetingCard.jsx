import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSun, FiMoon } = FiIcons;

const GreetingCard = () => {
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 mb-8 text-white"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={isDay ? FiSun : FiMoon} className="text-2xl" />
            <h2 className="text-2xl font-bold">
              {isDay ? 'Good Morning' : 'Good Evening'}!
            </h2>
          </div>
          <p className="text-green-100 text-lg">
            Track your carbon footprint with Greta AI's guidance
          </p>
        </div>
        <div className="hidden md:block">
          <div className="bg-white/20 rounded-full p-4">
            <SafeIcon icon={FiSun} className="text-4xl text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GreetingCard;