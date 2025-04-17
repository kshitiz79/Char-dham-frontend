import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitSection = ({ selectedDate, onDateChange, tripType }) => {
  const [passengers, setPassengers] = useState(1);
  const [passengerData, setPassengerData] = useState([{ name: '', weight: 0 }]);
  const navigate = useNavigate();

  const handlePassengerChange = (e) => {
    const num = Number(e.target.value);
    setPassengers(num);
    setPassengerData((prev) => {
      const newData = Array(num).fill({ name: '', weight: 0 });
      for (let i = 0; i < Math.min(prev.length, num); i++) {
        newData[i] = prev[i];
      }
      return newData;
    });
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...passengerData];
    newData[index] = {
      ...newData[index],
      [field]: field === 'weight' ? Number(value) || 0 : value,
    };
    setPassengerData(newData);
  };

  // Validations
  const totalWeight = passengerData.reduce((sum, p) => sum + p.weight, 0);
  const isWeightExceeded = totalWeight > 375;
  const isFormValid =
    passengerData.every((p) => p.name.trim() !== '' && p.weight > 0) &&
    selectedDate !== null &&
    !isWeightExceeded;

  const handleSubmit = () => {
    if (!isFormValid) return;
    navigate('/confirm-booking', {
      state: { passengers: passengerData, travelDate: selectedDate, tripType }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-8 flex justify-between">
        {/* LEFT SIDE: Booking Form */}
        <div className="w-1/3 space-y-8">
          <h3 className="text-3xl uppercase font-bold mb-8 text-center">
            Complete Your Booking
          </h3>
          {/* Disabled Date Picker */}
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Selected Travel Date
            </label>
            <input
              type="date"
              value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
              disabled
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              min={new Date().toISOString().split('T')[0]}
            />
            {selectedDate && (
              <p className="mt-2 text-gray-600 text-sm">
                Selected Date: <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
              </p>
            )}
          </div>
          {/* Passenger Count */}
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Number of Passengers
            </label>
            <select
              value={passengers}
              onChange={handlePassengerChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Passenger' : 'Passengers'}
                </option>
              ))}
            </select>
          </div>
          {/* Passenger Details */}
          <div className="space-y-6">
            <label className="block text-gray-700 mb-2 font-semibold">
              Passenger Details
            </label>
            {passengerData.map((passenger, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="mb-3">
                  <span className="text-gray-700 font-medium">
                    Passenger {index + 1}
                  </span>
                </div>
                <input
                  type="text"
                  value={passenger.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-3"
                  placeholder="Full Name"
                />
                <input
                  type="number"
                  min="0"
                  value={passenger.weight || ''}
                  onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Weight in kg"
                />
              </div>
            ))}
            <p className="text-gray-600 text-sm">
              Total Weight: <span className={isWeightExceeded ? 'text-red-600 font-bold' : ''}>{totalWeight} kg</span>
            </p>
          </div>
          {/* Warning */}
          <div className="text-sm text-gray-600 flex items-center justify-center space-x-2 bg-red-50 p-3 rounded-lg">
            <span className="text-red-600 text-lg animate-pulse">⚠️</span>
            <p>Weight Restriction: Max 375 kg combined limit.</p>
          </div>
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
              !isFormValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
            }`}
          >
            Proceed to Book
          </button>
          <p className="text-sm text-gray-600 text-center">
            Total Cost: ₹{(11_00_000).toLocaleString('en-IN')}
          </p>
        </div>
        {/* RIGHT SIDE: Booking Information */}
        <div className="w-2/3 pl-8">
          <h3 className="text-3xl uppercase font-bold mb-8 text-gray-800 text-center">
            Booking Information
          </h3>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Important Policies</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start">
                  <span className="text-red-600 text-lg animate-pulse mr-2">⚠️</span>
                  <p>Luggage Allowance: 5 kg per passenger (no large suitcases).</p>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 text-lg animate-pulse mr-2">⚠️</span>
                  <p>Weight Limit: 375 kg—exceeding may result in deboarding.</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <p>Full refund minus ₹60,000 flight prep charges if canceled.</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <p>Extra flying hours: ₹300,000/hour + taxes if required.</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <p>VIP Restrictions: Not available for certain high-profile officials.</p>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Additional Notes</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <p>Flight timings may change due to weather or operational reasons.</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <p>Passengers must carry valid ID (Aadhar, Passport, etc.).</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3"></span>
                  <p>Recommended: Warm clothing, trekking shoes, personal meds.</p>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm italic">
                For inquiries, contact FlyOla India at [contact details].
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitSection;
