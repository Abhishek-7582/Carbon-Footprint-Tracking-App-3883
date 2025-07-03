import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';

const CarbonChart = () => {
  const option = {
    title: {
      text: 'Carbon Emissions Trend',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} tCO₂'
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      type: 'value',
      name: 'tCO₂'
    },
    series: [
      {
        data: [3.2, 2.8, 2.5, 2.7, 2.3, 2.4],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#10b981',
          width: 3
        },
        itemStyle: {
          color: '#10b981'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.1)' }
            ]
          }
        }
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <ReactECharts option={option} style={{ height: '300px' }} />
    </motion.div>
  );
};

export default CarbonChart;