import React from 'react';
import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import BG from '../../public/images/bg-banner.avif';

const Banner = () => {
  return (
    <div
      className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center flex flex-col items-start justify-center px-6 sm:px-12 md:px-16 lg:px-24 text-white relative"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Summer Collection 2023
        </motion.h1>

        <motion.p 
          className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 max-w-md sm:max-w-xl md:max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover our new arrivals with up to 30% off on selected items
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button 
            className="bg-[#4F46E5] text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl flex items-center justify-center gap-1 sm:gap-2 hover:bg-[#4338CA] transition text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now <LuArrowRight className="text-sm sm:text-base" />
          </motion.button>
          <motion.button 
            className="bg-white text-[#4F46E5] px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl border border-[#4F46E5] hover:bg-gray-100 transition text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Collection
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;