import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animations
import bgImage from '../assets/tinder-bg.jpg';
import Homelogo from '../assets/white logo.png';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040404] to-[#d2d2d1] opacity-40"></div>

      {/* Logo at the Top Left */}
      <div className="absolute top-4 left-4">
        <img src={Homelogo} alt="App Logo" className="w-20 h-20 md:w-28 md:h-28" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center justify-center gap-y-6 sm:gap-y-10 px-4">
        
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold"
        >
          Start Something Epic.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-light opacity-90"
        >
          Meet new people and find your perfect match.
        </motion.p>

        {/* Button with Animation */}
        <motion.div
          className="relative w-full flex justify-center mt-8 sm:mt-12"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        >
          {!userData ? (
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 text-lg font-semibold text-white rounded-full shadow-lg bg-gradient-to-r from-[#fd5564] to-[#ef4a75] hover:scale-105 transition-transform duration-300"
            >
              Signup / Login
            </button>
          ) : (
            <button
              onClick={() => navigate("/feed")}
              className="px-8 py-3 text-lg font-semibold text-white rounded-full shadow-lg bg-gradient-to-r from-[#fd5564] to-[#ef4a75] hover:scale-105 transition-transform duration-300"
            >
              Go to Feed
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
