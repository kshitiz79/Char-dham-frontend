import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "./../assets/backgroung.png"; // Ensure this path is correct
import { FaArrowRight } from "react-icons/fa";
import templeImage from './../../public/images.png';

const TravelCard = ({ days, nights, price, destinations, onClick, sameDay, extraImage }) => (
  <div 
    className="bg-gradient-to-r from-[#ff7f00] to-[#ff6200] rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-orange-300 relative overflow-hidden group min-w-[280px] max-w-[350px] w-full"
    onClick={onClick}
  >
    {/* Subtle glowing effect */}
    <div className="absolute inset-0 bg-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"></div>
    
    <div className="flex flex-col items-center gap-4 relative z-10">
      {/* Image Section */}
      <div className="flex gap-4">
        <img 
          src={templeImage}
          alt="Char Dham Temples" 
          className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-md transform hover:scale-105 transition-transform duration-300"
        />
        {extraImage && (
          <img 
            src={extraImage}
            alt="Additional view" 
            className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-md transform hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      {/* Details Section */}
      <div className="flex-1 w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight drop-shadow-md animate-fade-in">
              {sameDay ? "Same Day Return" : `${nights} Nights / ${days} Days`}
            </h3>
            <div className="flex flex-col gap-2">
                <span className="text-white text-sm  font-extrabold opacity-90">
                Direct Landing at Kedarnath
              </span>
              <span className="text-white text-sm font-medium opacity-90">
                {destinations}
              </span>
              <span className="text-white text-xs font-semibold bg-orange-800 bg-opacity-40 px-3 py-1 rounded-full inline-block animate-pulse-slow">
                With Expert Guide & Complete Assistance
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white drop-shadow-md">₹{price}</p>
            <p className="text-white text-xs font-extrabold tracking-wide opacity-80">+ GST</p>
            <p className="text-white text-xs font-medium tracking-wide opacity-80">ALL INCLUSIVE</p>
            <button
              className="mt-4 px-6 py-2 bg-white text-orange-600 rounded-full hover:bg-orange-100 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group w-full shadow-md"
            >
              <span className="text-sm font-semibold">Book Now</span>
              <FaArrowRight className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  const travelPackages = [
    { 
      days: 2, 
      nights: 1, 
      price: "20,00,000",
      destinations: "Char Dham Yatra",
      route: "/char-dham",
      sameDay: false
    },
    { 
      days: 1,
      price: "13,50,000",
      destinations: "Kedarnath & Badrinath Same Day Return",
      route: "/do-dham-oneday",
      sameDay: true,
    },
      { 
      days: 1,
      price: "8,00,000",
      destinations: "Kedarnath Yatra",
      route: "/ek-dham",
      sameDay: true,
    },
  ];

  return (
    <div 
      className="flex items-center justify-center p-4 md:p-6 bg-gradient-to-b from-black via-gray-900 to-black bg-cover bg-center bg-no-repeat min-h-screen relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="max-w-7xl w-full bg-white shadow-2xl rounded-2xl p-6 md:p-8 my-12 relative z-10 overflow-hidden animate-fade-in-up">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-transparent to-orange-100 opacity-20 pointer-events-none rounded-2xl"></div>

        {/* Header */}
        <div className="mb-10 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500 animate-gradient-text">
              Do Dham Yatra 2025
            </span>
          </h1>
          <p className="text-gray-600 text-base md:text-xl font-medium animate-fade-in delay-200">
            A Journey of Faith, Devotion, and Blessings!
          </p>
        </div>

        {/* Travel Cards */}
        <div className="flex flex-row flex-wrap gap-6 justify-center">
          {travelPackages.map((pkg, index) => (
            <TravelCard
              key={index}
              nights={pkg.nights}
              days={pkg.days}
              price={pkg.price}
              destinations={pkg.destinations}
              onClick={() => navigate(pkg.route)}
              sameDay={pkg.sameDay}
              extraImage={pkg.extraImage}
            />
          ))}
        </div>

        {/* Footer Call-to-Action */}
        <div className="text-center mt-8 md:mt-10">
          <p className="text-gray-700 font-semibold text-xs md:text-sm bg-orange-100 px-4 py-2 rounded-full inline-block animate-pulse">
            Limited Slots Available – Book Your Spiritual Adventure Now!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

// Custom Tailwind Animations (Add these to your CSS file or Tailwind config)
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseSlow {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
  @keyframes gradientText {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-fade-in { animation: fadeIn 1s ease-in-out; }
  .animate-fade-in-up { animation: fadeInUp 1s ease-in-out; }
  .animate-pulse-slow { animation: pulseSlow 2s infinite; }
  .animate-gradient-text {
    background-size: 200% 200%;
    animation: gradientText 4s ease infinite;
  }
  .delay-200 { animation-delay: 0.2s; }
`;