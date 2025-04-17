import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../../public/logo-04.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-black shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center ml-20 sm:ml-0">
            <img src={logo} alt="logo" className="w-40 h-auto rounded-lg" />
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className="lg:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className="px-4 py-2 rounded-full text-blue border border-blue-600 font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-md"
            >
              Downloads
            </Link>
            <Link
              to="/char-dham"
              className="px-4 py-2 rounded-full text-blue border border-blue-600 font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-md"
            >
              Raise Refund
            </Link>
            <Link
              to="/get-ticket"
              className="px-4 py-2 rounded-full text-blue border border-blue-600 font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-md"
            >
              Get Ticket
            </Link>
            <Link
              to="/do-dham"
              className="px-4 py-2 rounded-full text-blue border border-blue-600 font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-md"
            >
              T & C
            </Link>
            <Link
              to="/do-dham-oneday"
              className="px-4 py-2 rounded-full border border-yellow-500 text-blue-900 font-semibold hover:bg-yellow-500 hover:text-blue-950 transition-all duration-300 shadow-md"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Slider */}
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="p-6">
              <button
                className="mb-6 text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
             
              </button>
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="px-4 py-2 rounded-full text-blue border border-blue-600 font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Downloads
                </Link>
                <Link
                  to="/char-dham"
                  className="px-4 py-2 rounded-full text-blue border border-blue-600 font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Raise Refund
                </Link>
                <Link
                  to="/do-dham"
                  className="px-4 py-2 rounded-full text-blue border border-blue-600 font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  T & C
                </Link>
                <Link
                  to="/do-dham-oneday"
                  className="px-4 py-2 rounded-full border border-yellow-500 text-blue-900 font-semibold hover:bg-yellow-500 hover:text-blue-950 transition-all duration-300 shadow-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;