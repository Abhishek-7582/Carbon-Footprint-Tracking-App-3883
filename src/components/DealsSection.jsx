import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DealsSection = () => {
  const deals = [
    {
      id: 1,
      title: 'Electronics Sale',
      description: 'Up to 70% off on smartphones, laptops & more',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop',
      category: 'electronics',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Fashion Week',
      description: 'Trending styles at unbeatable prices',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      category: 'fashion',
      color: 'bg-pink-500'
    },
    {
      id: 3,
      title: 'Home Essentials',
      description: 'Transform your space with our deals',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      category: 'home-kitchen',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-900 mb-8"
      >
        Today's Deals
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deals.map((deal, index) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Link to={`/products/${deal.category}`}>
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-video">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                    <p className="text-sm mb-3">{deal.description}</p>
                    <div className={`inline-block px-4 py-2 ${deal.color} rounded-lg text-white font-semibold`}>
                      Shop Now
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DealsSection;