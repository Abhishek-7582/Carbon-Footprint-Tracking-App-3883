import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReactECharts from 'echarts-for-react';

const { FiTrendingUp, FiTrendingDown, FiAlertTriangle, FiCheckCircle, FiTarget } = FiIcons;

const Insights = () => {
  const pieOption = {
    title: {
      text: 'Emissions by Category',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} tCO₂ ({d}%)'
    },
    series: [
      {
        name: 'Emissions',
        type: 'pie',
        radius: '70%',
        data: [
          { value: 1.2, name: 'Transportation' },
          { value: 0.8, name: 'Energy' },
          { value: 0.3, name: 'Water' },
          { value: 0.1, name: 'Waste' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const recommendations = [
    {
      title: 'Switch to Electric Vehicles',
      impact: 'High',
      savings: '40% reduction',
      icon: FiTrendingDown,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Optimize Delivery Routes',
      impact: 'Medium',
      savings: '25% reduction',
      icon: FiTarget,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'LED Lighting Upgrade',
      impact: 'Medium',
      savings: '30% reduction',
      icon: FiCheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Waste Recycling Program',
      impact: 'Low',
      savings: '15% reduction',
      icon: FiAlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Insights</h1>
        <p className="text-gray-600">Greta AI's data-driven recommendations for your business</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <ReactECharts option={pieOption} style={{ height: '300px' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiTrendingDown} className="text-green-600 text-xl" />
                <div>
                  <p className="font-medium text-gray-900">Total Emissions</p>
                  <p className="text-sm text-gray-600">Down 12% from last month</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600">2.4 tCO₂</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiTrendingUp} className="text-blue-600 text-xl" />
                <div>
                  <p className="font-medium text-gray-900">Efficiency Score</p>
                  <p className="text-sm text-gray-600">Up 8% from last month</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">78%</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Greta AI Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`p-6 rounded-lg border ${rec.bgColor} border-gray-200`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white rounded-lg">
                  <SafeIcon icon={rec.icon} className={`text-xl ${rec.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{rec.title}</h4>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-600">Impact: {rec.impact}</span>
                    <span className={`font-medium ${rec.color}`}>{rec.savings}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Insights;