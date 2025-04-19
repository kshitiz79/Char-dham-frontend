
import React from 'react';

const OneBanner = () => {
  const itinerary = [
    { day: "05:00 AM", description: "Report at Dehradun Airport " },
    { day: "06:35 AM", description: "Arrival at Sersi/Phata/Guptkashi Helipad " },
    { day: "09:50 AM", description: "Arrival at Badrinath with same-day package yatris" },
    { day: "12:55 PM", description: " Drop-off at Dehradun Airport" },
  ];

  return (
    <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,transparent_70%)]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-3xl uppercase md:text-5xl font-extrabold mb-12 text-center tracking-tight drop-shadow-lg animate-fade-in-down">
          Do Dham Helicopter Yatra (Same Day Return)
        </h1>
        
        <div className="flex flex-wrap justify-center gap-6 perspective-1000">
          {itinerary.map((item, index) => (
            <div
              key={index}
              className="bg-white/15 backdrop-blur-lg rounded-xl p-6 w-full md:w-[47%] relative 
                hover:bg-white/20 hover:shadow-xl 
                border border-white/20 group"
            >
              <div className="absolute -left-4 -top-4 bg-gradient-to-r from-amber-600 to-orange-600 
                text-white rounded-full w-14 h-14 flex items-center justify-center text-[0.6rem] font-bold 
                shadow-md transition-all duration-300 group-hover:scale-110">
                {item.day}
              </div>
              
              <p className="ml-10 text-lg font-medium leading-relaxed transition-colors duration-300 
                group-hover:text-amber-50">
                {item.description.split(' → ').map((part, i) => (
                  <span key={i} className="block">
                    {i > 0 && <span className="text-amber-50 mr-2">→</span>}
                    {part}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OneBanner;
