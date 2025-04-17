import React from 'react';

export const Summery = ({ travelDate, tripType, passengers = [] }) => {
  const itinerary = tripType === 'one-day'
    ? [
        { label: '09:30 AM', text: 'Report at Sahastradhara Helipad, Dehradun', icon: '🕤' },
        { label: '10:00 AM', text: 'Helicopter → Kedarnath → Temple Darshan', icon: '🚁' },
        { label: '01:00 PM', text: 'Kedarnath → Badrinath → Temple Darshan → Mana Village', icon: '🏞️' },
        { label: '04:30 PM', text: 'Return to Dehradun — Tour Concludes', icon: '🏁' }
      ]
    : [
        { label: 'Day 1', text: 'Arrival → Hotel Check‑in → Evening Briefing', icon: '🏨' },
        { label: 'Day 2', text: 'Dehradun → Kedarnath (Helicopter) → Temple Darshan', icon: '🚁' },
        { label: 'Day 3', text: 'Kedarnath → Badrinath (Helicopter) → Temple Darshan → Mana Village', icon: '🏞️' },
        { label: 'Day 4', text: 'Badrinath → Dehradun (Helicopter) → Departure', icon: '✈️' }
      ];

  // Define the price based on tripType
  const totalCost = tripType === 'one-day' ? 1100000 : 1500000; // ₹11,00,000 for one-day, ₹15,00,000 for multi-day

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 max-w-7xl mb-8 transform transition-all hover:shadow-xl">
      {/* Header */}
      <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {tripType === 'one-day' ? 'One-Day Itinerary' : 'Multi-Day Itinerary'}
      </h2>

      {/* Itinerary Timeline */}
      <div className="relative mb-8">
        <div className="absolute h-full w-1 bg-indigo-200 left-6 top-0 rounded-full"></div>
        <ul className="space-y-6">
          {itinerary.map(({ label, text, icon }, idx) => (
            <li key={idx} className="relative flex items-start">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-full mr-4 z-10">
                <span className="text-xl">{icon}</span>
              </div>
              <div className="flex-1">
                <div className="text-indigo-600 font-semibold text-lg">{label}</div>
                <div className="text-gray-600">{text}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Booking Details */}
      <div className="border-t pt-6 border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Booking Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-sm text-indigo-700 font-medium">Travel Date</p>
            <p className="text-lg font-bold text-indigo-900">
              {new Date(travelDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-700 font-medium">Total Passengers</p>
            <p className="text-lg font-bold text-purple-900">{passengers.length}</p>
          </div>
        </div>

        {/* Total Cost */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg mb-4">
          <p className="text-sm text-indigo-700 font-medium">Total Cost</p>
          <p className="text-2xl font-bold text-purple-900">
            ₹{totalCost.toLocaleString('en-IN')}
          </p>
        </div>

        {/* Passenger List */}
        {passengers.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-medium text-gray-700 mb-3">Passenger Details</h4>
            <div className="grid gap-3">
              {passengers.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-indigo-500 text-white rounded-full mr-3">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">{p.name}</p>
                    <p className="text-sm text-gray-600">{p.weight} kg</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};