import React from 'react';
import { format } from 'date-fns';

export const Summery = ({ travelDate, tripType, passengers = [] }) => {
  // Define pricing based on trip type
  const basePrice =
    tripType === 'one-day' ? 1350000 :
    tripType === 'multi-day' ? 1350000 : // do-dham
    tripType === 'char-dham' ? 2000000 :
    tripType === 'ek-dham' ? 800000 : 1350000; // Default to do-dham price

  const gstRate = 0.18; // 18% GST
  const totalCostWithGST = Math.round(basePrice * (1 + gstRate));

  // Define itineraries for each trip type
  const itineraries = {
    'one-day': [
      { label: '06:30 AM', text: 'Report at Dehradun Airport for your Char Dham Helicopter journey.', icon: '🛫' },
      { label: '07:30 AM - 08:05 AM', text: 'Helicopter departs for Sersi/Phata/Guptkashi. Arrival at Sersi/Phata/Guptkashi or direct landing at Kedarnath.', icon: '🚁' },
      { label: '08:05 AM - 10:50 AM', text: 'Shuttle to Kedarnath Temple for VIP Darshan (~2 hrs).', icon: '🛕' },
      { label: '10:50 AM - 11:20 AM', text: 'Helicopter departs from Sersi/Phata/Guptkashi to Badrinath. Arrival at Badrinath Helipad.', icon: '🚁' },
      { label: '11:20 AM - 01:00 PM', text: 'Transfer to Badrinath Temple for VIP Darshan (~1.5 hrs).', icon: '🙏' },
      { label: '01:00 PM - 02:25 PM', text: 'Helicopter departs from Badrinath to Dehradun. Arrival at Dehradun Helipad.', icon: '🚁' },
      { label: '02:25 PM', text: 'Drop-off at Dehradun Airport / Railway Station. Tour concludes.', icon: '🏁' },
    ],
    'multi-day': [
      { label: 'Day 1', text: 'Report at Dehradun Airport. Helicopter departs for Badrinath at 06:40 AM.', icon: '🛫' },
      { label: 'Day 1', text: 'Arrival at Badrinath (07:10 AM). VIP Darshan at Badrinath Temple (~1.5 hrs). Overnight stay.', icon: '🙏' },
      { label: 'Day 2', text: 'Helicopter departs for Sersi/Phata/Guptkashi at 07:00 AM. Arrival and shuttle to Kedarnath Temple for VIP Darshan (~2 hrs).', icon: '🚁' },
      { label: 'Day 2', text: 'Return to Dehradun by 12:00 PM. Drop-off at Airport/Railway Station. Tour concludes.', icon: '🏁' },
    ],
    'char-dham': [
      { label: 'Day 1, 06:30 AM', text: 'Report at Dehradun Airport. Helicopter departs for Yamunotri.', icon: '🛫' },
      { label: 'Day 1, 07:00 AM - 09:00 AM', text: 'Arrival at Yamunotri. VIP Darshan at Yamunotri Temple (~1.5 hrs).', icon: '🙏' },
      { label: 'Day 1, 09:30 AM - 11:00 AM', text: 'Helicopter departs for Gangotri. Arrival and VIP Darshan at Gangotri Temple (~1.5 hrs).', icon: '🚁' },
      { label: 'Day 1, Evening', text: 'Overnight stay near Gangotri or transfer to nearby helipad.', icon: '🌙' },
      { label: 'Day 2, 06:30 AM - 08:30 AM', text: 'Helicopter departs for Kedarnath. Arrival and shuttle to Kedarnath Temple for VIP Darshan (~1.5 hrs).', icon: '🚁' },
      { label: 'Day 2, 09:00 AM - 11:00 AM', text: 'Helicopter departs for Badrinath. Arrival and VIP Darshan at Badrinath Temple (~1.5 hrs).', icon: '🙏' },
      { label: 'Day 2, 11:30 AM - 01:00 PM', text: 'Helicopter returns to Dehradun. Drop-off at Airport/Railway Station. Tour concludes.', icon: '🏁' },
    ],
    'ek-dham': [
      { label: '06:30 AM', text: 'Report at Dehradun Airport for your Ek Dham Helicopter journey.', icon: '🛫' },
      { label: '07:00 AM - 07:30 AM', text: 'Helicopter departs for Kedarnath. Arrival at Kedarnath Helipad.', icon: '🚁' },
      { label: '07:30 AM - 09:30 AM', text: 'Shuttle to Kedarnath Temple for VIP Darshan (~2 hrs).', icon: '🛕' },
      { label: '09:30 AM - 10:00 AM', text: 'Helicopter departs from Kedarnath to Dehradun. Arrival at Dehradun Helipad.', icon: '🚁' },
      { label: '10:00 AM', text: 'Drop-off at Dehradun Airport / Railway Station. Tour concludes.', icon: '🏁' },
    ],
  };

  const itinerary = itineraries[tripType] || itineraries['multi-day']; // Default to multi-day if tripType is invalid

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 max-w-7xl mb-8 transform transition-all hover:shadow-xl">
      {/* Header */}
      <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {tripType === 'one-day' ? 'One-Day Itinerary' :
         tripType === 'multi-day' ? 'Do-Dham Itinerary' :
         tripType === 'char-dham' ? 'Char-Dham Itinerary' :
         'Ek-Dham Itinerary'}
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
              {travelDate ? new Date(travelDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }) : 'Not selected'}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-700 font-medium">Total Passengers</p>
            <p className="text-lg font-bold text-purple-900">{passengers.length}</p>
          </div>
        </div>

        {/* Total Cost including GST */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg mb-4">
          <p className="text-sm text-indigo-700 font-medium">Total Cost (Including 18% GST)</p>
          <p className="text-2xl font-bold text-purple-900">
            ₹{totalCostWithGST.toLocaleString('en-IN')}
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