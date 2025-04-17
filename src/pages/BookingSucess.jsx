import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';

const BookingSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <Navigate to="/" replace />;

  const { formData = [], travelDate, tripType, pnr, bookings = [] } = state;

  const formattedDate = travelDate
    ? new Date(travelDate).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'N/A';

  const itinerary = tripType === 'one-day'
    ? [
        { label: '09:30 AM', text: 'Report at Sahastradhara Helipad, Dehradun', icon: '🕤' },
        { label: '10:00 AM', text: 'Helicopter → Kedarnath → Temple Darshan', icon: '🚁' },
        { label: '01:00 PM', text: 'Kedarnath → Badrinath → Temple Darshan → Mana Village', icon: '🏞️' },
        { label: '04:30 PM', text: 'Return to Dehradun — Tour Concludes', icon: '🏁' },
      ]
    : [
        { label: 'Day 1', text: 'Arrival → Hotel Check-in → Evening Briefing', icon: '🏨' },
        { label: 'Day 2', text: 'Dehradun → Kedarnath (Helicopter) → Temple Darshan', icon: '🚁' },
        { label: 'Day 3', text: 'Kedarnath → Badrinath (Helicopter) → Temple Darshan → Mana Village', icon: '🏞️' },
        { label: 'Day 4', text: 'Badrinath → Dehradun (Helicopter) → Departure', icon: '✈️' },
      ];

  const totalCost = tripType === 'one-day' ? 1100000 : 1500000;

  const handleViewBoardingPass = () => {
    navigate('/boding-pass', { state: { formData, travelDate, tripType, pnr, bookings } });
  };

  const handleResendNotifications = async () => {
    try {
      const response = await fetch('https://chardham.flyola.in/backend/customers/resend-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ pnr }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend notifications');
      }

      if (data.status === 'success') {
        let message = 'Notifications resent successfully!\n';
        message += data.email_sent ? '- Email sent\n' : '- Email failed\n';
        message += data.whatsapp_sent ? '- WhatsApp sent' : '- WhatsApp failed';
        alert(message);
      } else {
        throw new Error(data.message || 'Notification resend failed');
      }
    } catch (err) {
      console.error('Resend notifications error:', err);
      alert(`Failed to resend notifications: ${err.message}`);
    }
  };

  return (
    <div className="py-40 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="bg-white rounded-xl w-full max-w-5xl flex flex-col overflow-hidden transform transition-all hover:shadow-3xl">
        <div className="bg-gradient-to-r from-orange-600 to-orange-600 text-white p-6">
          <h1 className="text-2xl font-bold">
            {tripType === 'one-day' ? 'One-Day Trip Confirmation' : 'Multi-Day Trip Confirmation'}
          </h1>
          <p className="text-sm mt-1">Travel Date: {formattedDate}</p>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-sm font-semibold">PNR NO:</p>
              <p className="text-lg font-bold">{pnr || 'N/A'}</p>
            </div>
            <p className="text-lg font-semibold">
              Total Cost: ₹{totalCost.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <div className="p-6 flex flex-col space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Itinerary:</h2>
            <div className="grid grid-cols-2 gap-4 relative">
              {itinerary.map(({ label, text, icon }, idx) => (
                <div
                  key={idx}
                  className="bg-indigo-50 p-4 rounded-lg shadow-md flex items-start space-x-3 hover:bg-indigo-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-200 rounded-full">
                    <span className="text-lg">{icon}</span>
                  </div>
                  <div>
                    <p className="text-indigo-700 font-semibold">{label}</p>
                    <p className="text-gray-600 text-sm">{text}</p>
                  </div>
                </div>
              ))}
              {tripType !== 'one-day' && (
                <>
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center">
                    <span className="text-indigo-500 text-2xl">➡️</span>
                  </div>
                  <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 w-12 h-12 flex items-center justify-center">
                    <span className="text-indigo-500 text-2xl mb-16">⬇️</span>
                  </div>
                  <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center">
                    <span className="text-indigo-500 text-2xl">⬅️</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto max-h-64">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Passenger(s):</h2>
            {formData.length > 0 && bookings.length > 0 ? (
              formData.map((p, i) => (
                <div
                  key={i}
                  className="flex justify-between items-start text-base mb-3 pb-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-gray-800">
                      <span className="font-bold">{i + 1}. </span>
                      <strong>{p.name}</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Phone:</strong> {p.phone}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Email:</strong> {p.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>ID Type:</strong>{' '}
                      {idOptions.find((opt) => opt.value === p.idType)?.label || 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      <strong>Booking ID:</strong> {bookings[i]?.booking_id || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">
                      <strong>Weight:</strong> {p.weight} kg
                    </p>
                    <p className="text-xs text-gray-500">
                      <strong>Age:</strong> {p.age || 'N/A'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-red-500 text-sm">
                Booking details are missing.
              </p>
            )}
          </div>

          <div className="bg-green-100 p-3 rounded-b-lg text-center">
            <p className="text-green-700 font-semibold text-sm">
              BOOKING CONFIRMED 🎉
            </p>
          </div>

          <div className="text-center mt-6 space-x-4">
            <button
              onClick={handleViewBoardingPass}
              className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
            >
              View Boarding Pass
            </button>
            <button
              onClick={handleResendNotifications}
              className="py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition-all duration-300"
            >
              Resend Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const idOptions = [
  { value: '', label: 'Select ID Type' },
  { value: 'aadhar', label: 'Aadhar Card' },
  { value: 'pan', label: 'PAN Card' },
  { value: 'passport', label: 'Passport' },
  { value: 'voterid', label: 'Voter ID' },
];

export default BookingSuccess;