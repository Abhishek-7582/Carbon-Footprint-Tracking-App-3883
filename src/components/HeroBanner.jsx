import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';

const HeroBanner = () => {
  const banners = [
    {
      id: 1,
      title: 'Big Billion Days',
      subtitle: 'Biggest Sale of the Year',
      description: 'Up to 80% off on Electronics, Fashion & More',
      image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&h=400&fit=crop',
      cta: 'Shop Now'
    },
    {
      id: 2,
      title: 'Fashion Week',
      subtitle: 'Latest Trends',
      description: 'Discover the hottest fashion trends of the season',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
      cta: 'Explore'
    },
    {
      id: 3,
      title: 'Electronics Sale',
      subtitle: 'Tech Deals',
      description: 'Best prices on smartphones, laptops & more',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=400&fit=crop',
      cta: 'Shop Electronics'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  };

  return (
    <div className="relative overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="relative h-96 md:h-[500px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40" />
            </div>
            
            <div className="relative z-10 flex items-center justify-center h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center text-white px-4"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-2">{banner.title}</h1>
                <h2 className="text-xl md:text-2xl mb-4">{banner.subtitle}</h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">{banner.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-colors"
                >
                  {banner.cta}
                </motion.button>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner;