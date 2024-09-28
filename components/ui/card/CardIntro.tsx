import React from 'react';
import { Feature } from "@/components/sections/key-feature-section/KeyFeatureSection";
import { useTheme } from "nextra-theme-docs";
import { motion } from 'framer-motion';

const CardIntro: React.FC<Feature & { index: number }> = ({ icon: Icon, title, description, index }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`p-6 rounded-lg backdrop-blur-sm ${theme === 'dark'
          ? 'bg-white/10 text-white'
          : 'bg-black/10 text-black'
        }`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex flex-col items-start space-y-4 cursor-pointer">
        {Icon && <Icon className={`text-4xl ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />}
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{description}</p>
      </div>
    </motion.div>
  );
};

export default CardIntro;