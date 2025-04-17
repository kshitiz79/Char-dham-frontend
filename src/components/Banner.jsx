import React from 'react'

const Banner = () => {
  const itinerary = [
    {
      day: "Day 1",
      description: "Dehradun Arrival → Hotel Check-in → Evening Briefing"
    },
    {
      day: "Day 2",
      description: "Dehradun → Kedarnath (Helicopter) → Temple Darshan"
    },
    {
      day: "Day 3",
      description: "Kedarnath → Badrinath (Helicopter) → Temple Darshan → Mana Village"
    },
    {
      day: "Day 4",
      description: "Badrinath → Dehradun (Helicopter) → Departure"
    }
  ]

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Do Dham Yatra Journey
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {itinerary.map((item, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 w-full md:w-[45%] relative"
            >
              <div className="absolute -left-3 -top-3 bg-white text-orange-600 rounded-full w-12 h-12 flex items-center justify-center font-bold">
                {item.day}
              </div>
              <p className="ml-8 text-lg">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Banner
