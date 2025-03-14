import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Tinder Logo & About */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold text-red-500">Tinder</h2>
          <p className="text-sm text-gray-400 mt-2">Find new connections and meet amazing people near you.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold">Company</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Press</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold">Support</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Safety Tips</a></li>
            <li><a href="#" className="hover:text-white transition">Community Guidelines</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-red-500 transition"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-red-500 transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-red-500 transition"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-red-500 transition"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Tinder-App By Anil. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

