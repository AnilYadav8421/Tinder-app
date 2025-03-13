import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/tinder-bg.jpg';
import Homelogo from '../assets/white logo.png';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040404] to-[#d2d2d1] opacity-40"></div>

      {/* Logo at the Top Right Corner */}
      <div className="absolute top-4 left-4">
        <img src={Homelogo} alt="App Logo" className="w-20 h-20 md:w-28 md:h-28" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center justify-center gap-y-8 sm:gap-y-12 px-4">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8">
          Start Something Epic.
        </h1>

        <div className="relative w-full flex justify-center mt-8 sm:mt-12">
          {!userData ? (
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 text-lg font-semibold text-white rounded-full shadow-lg bg-gradient-to-r from-[#fd5564] to-[#ef4a75] hover:opacity-80 transition">
              Signup / Login
            </button>
          ) : (
            <button
              onClick={() => navigate("/feed")}
              className="px-8 py-3 text-lg font-semibold text-white rounded-full shadow-lg bg-gradient-to-r from-[#fd5564] to-[#ef4a75] hover:opacity-80 transition">
              Go to Feed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
