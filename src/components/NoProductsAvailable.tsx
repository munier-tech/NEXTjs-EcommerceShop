import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils'; // Make sure you have cn utility

interface NoProductsAvailableProps {
  selectedTab: string;
  className?: string;
}

const NoProductsAvailable = ({ selectedTab, className }: NoProductsAvailableProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center min-h-[400px] p-8 text-center",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Icon */}
      <motion.div
        className="mb-6 p-4 bg-gray-100 rounded-full"
        variants={iconVariants}
        whileHover="hover"
      >
        <svg
          className="w-16 h-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"
          />
        </svg>
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-gray-800 mb-3"
        variants={itemVariants}
      >
        No Products Available
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-gray-600 mb-2 max-w-md"
        variants={itemVariants}
      >
        {selectedTab === 'all' || !selectedTab ? (
          "We're currently updating our inventory. Please check back later for new products."
        ) : (
          <>
            No products found in <span className="font-semibold text-green-600">{selectedTab}</span> category.
          </>
        )}
      </motion.p>

      <motion.p
        className="text-gray-500 text-sm mb-8"
        variants={itemVariants}
      >
        Try selecting a different category or check our full collection.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        variants={itemVariants}
      >
        <motion.button
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-md"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          Browse All Categories
        </motion.button>
        
        <motion.button
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Support
        </motion.button>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-30" />
      </motion.div>
    </motion.div>
  );
};

export default NoProductsAvailable;