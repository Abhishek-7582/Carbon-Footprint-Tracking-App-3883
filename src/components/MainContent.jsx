import React from 'react';
import { motion } from 'framer-motion';
import TargetScoreCard from './TargetScoreCard';
import ImprovementChart from './ImprovementChart';
import PipelineStats from './PipelineStats';
import AverageMetrics from './AverageMetrics';

const MainContent = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'Summary':
        return <SummaryTab />;
      case "What's New":
        return <WhatsNewTab />;
      case 'Download Workbook':
        return <DownloadTab />;
      default:
        return <SummaryTab />;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

const SummaryTab = () => {
  return (
    <div className="space-y-6">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TargetScoreCard />
        <div className="lg:col-span-2">
          <ImprovementChart />
        </div>
      </div>

      {/* Pipeline Stats */}
      <PipelineStats />

      {/* Average Metrics */}
      <AverageMetrics />
    </div>
  );
};

const WhatsNewTab = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">What's New</h2>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="font-semibold text-gray-900">New Practice Tests Added</h3>
          <p className="text-gray-600">5 new SAT practice tests have been added to your course library.</p>
          <p className="text-sm text-gray-500 mt-1">2 days ago</p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <h3 className="font-semibold text-gray-900">Performance Analytics Update</h3>
          <p className="text-gray-600">Enhanced analytics dashboard with detailed progress tracking.</p>
          <p className="text-sm text-gray-500 mt-1">1 week ago</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <h3 className="font-semibold text-gray-900">Mobile App Improvements</h3>
          <p className="text-gray-600">Better offline support and faster loading times.</p>
          <p className="text-sm text-gray-500 mt-1">2 weeks ago</p>
        </div>
      </div>
    </div>
  );
};

const DownloadTab = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Download Workbook</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">SAT Math Workbook</h3>
          <p className="text-gray-600 text-sm mb-4">Complete practice problems and solutions</p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Download PDF
          </button>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">SAT Reading Workbook</h3>
          <p className="text-gray-600 text-sm mb-4">Reading comprehension strategies and practice</p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Download PDF
          </button>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">SAT Writing Workbook</h3>
          <p className="text-gray-600 text-sm mb-4">Grammar rules and writing techniques</p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Download PDF
          </button>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Complete Study Guide</h3>
          <p className="text-gray-600 text-sm mb-4">All-in-one comprehensive study materials</p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;