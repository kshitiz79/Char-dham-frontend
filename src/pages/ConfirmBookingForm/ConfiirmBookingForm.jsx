import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Summery } from './Summery';

const ConfirmBookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const passengers = state?.passengers || [];
  const travelDate = state?.travelDate || null;
  const tripType = state?.tripType || 'multi-day';

  // Define total cost based on tripType
  const totalCost = tripType === 'one-day' ? 1100000 : tripType === 'char-dham' ? 1800000 : 1500000; // ₹11,00,000 for one-day, ₹15,00,000 for multi-day, ₹18,00,000 for char-dham

  const [formData, setFormData] = useState(
    passengers.map((p) => ({
      name: p.name,
      weight: p.weight,
      phone: '',
      email: '',
      age: '',
      idType: '',
    }))
  );
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const handleInputChange = (index, field, value) => {
    setFormData((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Validate form data
    for (const passenger of formData) {
      if (!passenger.phone || !passenger.email || !passenger.age || !passenger.idType) {
        setMessage('Please fill in all required fields for all passengers.');
        setLoading(false);
        return;
      }
    }

    const payload = {
      passengers: formData,
      bookingDate: travelDate ? travelDate.toISOString().split('T')[0] : null,
      tripType,
      totalCost,
    };

    try {
      const response = await fetch(`${apiUrl}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let responseBody;
      try {
        responseBody = await response.json();
      } catch (jsonErr) {
        throw new Error(`Invalid JSON response: ${await response.text()}`);
      }

      // Log the response for debugging
      console.log('POST /customers response:', { status: response.status, body: responseBody });

      if (!response.ok) {
        const errorMsg = responseBody.message || `Booking failed (HTTP ${response.status})`;
        throw new Error(errorMsg);
      }

      // Check response structure
      if (!responseBody.status || !responseBody.data) {
        throw new Error('Invalid response structure: Missing status or data');
      }

      if (responseBody.status !== 'success') {
        throw new Error(`Booking failed: ${responseBody.message || 'Invalid response from server'}`);
      }

      const { pnr, bookings, email_sent, whatsapp_sent, total_cost } = responseBody.data;
      if (!pnr || !bookings) {
        throw new Error('Invalid response data: Missing pnr or bookings');
      }

      // Construct success message based on notification status
      let successMessage = `Booking successful! Your PNR is ${pnr}. `;
      if (email_sent) {
        successMessage += `A confirmation email has been sent to your provided email address(es). `;
      } else {
        successMessage += `Email confirmation could not be sent. Please contact support. `;
      }
      if (whatsapp_sent) {
        successMessage += `A WhatsApp confirmation has been sent to your provided phone number(s).`;
      } else {
        successMessage += `WhatsApp confirmation could not be sent. Please verify your phone number(s).`;
      }

      setMessage(successMessage);
      navigate('/booking-success', {
        state: { formData, travelDate, tripType, pnr, bookings, total_cost, email_sent, whatsapp_sent },
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const idOptions = [
    { value: '', label: 'Select ID Type' },
    { value: 'aadhar', label: 'Aadhar Card' },
    { value: 'pan', label: 'PAN Card' },
    { value: 'passport', label: 'Passport' },
    { value: 'voterid', label: 'Voter ID' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
          Confirm Your Booking
        </h2>

        {/* Main Container */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left Side: Summery (3/5) */}
          <div className="md:col-span-3">
            <Summery travelDate={travelDate} tripType={tripType} passengers={passengers} />
          </div>

          {/* Right Side: Form (2/5) */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6 h-[54rem]">
            <form onSubmit={handleConfirm} className="space-y-7">
              {/* Travel Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Travel Date
                </label>
                <input
                  type="text"
                  value={travelDate ? travelDate.toLocaleDateString() : 'Not Selected'}
                  disabled
                  className="w-full p-3 bg-gray-100 text-gray-600 rounded-lg border border-gray-200 shadow-sm cursor-not-allowed"
                />
              </div>

              {/* Total Cost Display */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Cost
                </label>
                <input
                  type="text"
                  value={`₹${totalCost.toLocaleString('en-IN')}`}
                  disabled
                  className="w-full p-3 bg-gray-100 text-gray-600 rounded-lg border border-gray-200 shadow-sm cursor-not-allowed"
                />
              </div>

              {/* Passenger Details */}
              <div className="space-y-4 h-[40rem] overflow-y-auto pr-2">
                {formData.map((passenger, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-50 to-indigo-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                      Passenger {index + 1}
                    </h3>
                    <div className="space-y-3">
                      {/* Name & Weight */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600">Name</label>
                          <input
                            type="text"
                            value={passenger.name}
                            disabled
                            className="w-full p-2 bg-gray-100 text-gray-500 rounded-lg border border-gray-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600">Weight (kg)</label>
                          <input
                            type="number"
                            value={passenger.weight}
                            disabled
                            className="w-full p-2 bg-gray-100 text-gray-500 rounded-lg border border-gray-200"
                          />
                        </div>
                      </div>
                      {/* Phone & Email */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600">Phone</label>
                          <input
                            type="tel"
                            placeholder="e.g. 9876543210"
                            value={passenger.phone}
                            onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600">Email</label>
                          <input
                            type="email"
                            placeholder="e.g. user@example.com"
                            value={passenger.email}
                            onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          />
                        </div>
                      </div>
                      {/* Age & ID Type */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600">Age</label>
                          <input
                            type="number"
                            placeholder="30"
                            min="1"
                            value={passenger.age}
                            onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600">ID Type</label>
                          <select
                            value={passenger.idType}
                            onChange={(e) => handleInputChange(index, 'idType', e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                          >
                            {idOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300
                  ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105'}`}
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>

            {/* Message */}
            {message && (
              <p
                className={`mt-4 text-center font-medium ${
                  message.includes('successful') ? 'text-green-600' : 'text-red-600'
                } animate-fade-in`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingForm;