import React, { useState } from 'react';

const AddBooking = () => {
  const [bookingDate, setBookingDate] = useState('');
  const [seats, setSeats] = useState('');
  const [tripType, setTripType] = useState('one-day');
  const [message, setMessage] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  console.log('API URL:', apiUrl);

  // Validate inputs
  if (!bookingDate) {
    setMessage('Please select a booking date');
    return;
  }
  if (!seats || isNaN(seats) || parseInt(seats, 10) <= 0) {
    setMessage('Please enter a valid number of seats');
    return;
  }
  if (!['one-day', 'multi-day', 'char-dham', 'ek-dham'].includes(tripType)) {
    setMessage('Please select a valid trip type');
    return;
  }

  const bookingData = {
    booking_date: bookingDate,
    seats: parseInt(seats, 10),
    tripType,
  };
  console.log('Sending booking data:', bookingData);

  try {
    const response = await fetch(`${apiUrl}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    const result = await response.json();
    if (response.ok) {
      setMessage(`Booking created with ID: ${result.insertId}`);
      setBookingDate('');
      setSeats('');
      setTripType('one-day');
    } else {
      setMessage(result.message || 'Error creating booking');
    }
  } catch (error) {
    console.error('Fetch error:', error);
    setMessage('Failed to connect to the server');
  }
};

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg transform transition-all hover:shadow-2xl duration-300 mt-10">
      <h2 className="text-2xl font-extrabold text-center mb-6 text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Add New Booking Slot
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Booking Date
          </label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Seats
          </label>
          <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400"
            required
            min="1"
            placeholder="e.g., 5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trip Type
          </label>
          <select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-800"
          >
            <option value="one-day">One Day</option>
            <option value="multi-day">Multi Day</option>
            <option value="char-dham">Char Dham</option>
            <option value="ek-dham">Ek Dham</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Add Booking
        </button>
      </form>
      {message && (
        <p
          className={`mt-6 text-center text-sm font-medium animate-fade-in ${
            message.includes('created') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AddBooking;